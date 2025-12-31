import { requireAuth } from "@/lib/auth-guard";
import { queryTinybird } from "@/lib/tinybird";
import { db } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function AnalyticsPage() {
  const session = await requireAuth();
  const profile = await db.profile.findUnique({
    where: { userId: session.user.id },
    include: { links: true },
  });

  let stats = {
    totalClicks: 0,
    clicksByLink: [] as Record<string, unknown>[],
    clicksOverTime: [] as Record<string, unknown>[],
  };

  if (profile) {
    const clicksByLink = await queryTinybird("clicks_by_link", {
      profile_id: profile.id,
    });

    const clicksOverTime = await queryTinybird("clicks_over_time", {
      profile_id: profile.id,
    });

      stats = {
        totalClicks:
          clicksByLink?.reduce(
            (sum: number, item: Record<string, unknown>) =>
              sum + (Number(item.clicks) || 0),
            0
          ) || 0,
        clicksByLink: clicksByLink || [],
        clicksOverTime: clicksOverTime || [],
      };
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your link performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats?.totalClicks || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Links</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.clicksByLink && stats.clicksByLink.length > 0 ? (
              <div className="space-y-2">
                {stats.clicksByLink.slice(0, 5).map((item: Record<string, unknown>, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">
                      {String(item.link_id || "Unknown")}
                    </span>
                    <span className="text-sm font-medium">
                      {Number(item.clicks) || 0}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Analytics require Tinybird setup. Configure TINYBIRD_HOST and
            TINYBIRD_TOKEN in your environment variables, and set up the
            corresponding data sources and pipes in Tinybird. See TINYBIRD_SETUP.md
            for detailed instructions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

