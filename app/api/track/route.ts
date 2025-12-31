import { NextResponse } from "next/server";
import { trackClick } from "@/lib/tinybird";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { linkId, profileId } = await req.json();

    if (!linkId || !profileId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const referrer = headersList.get("referer") || "";
    const userAgent = headersList.get("user-agent") || "";

    const device = /Mobile|Android|iPhone|iPad/.test(userAgent)
      ? "mobile"
      : "desktop";

    const browser = userAgent.includes("Chrome")
      ? "chrome"
      : userAgent.includes("Firefox")
        ? "firefox"
        : userAgent.includes("Safari")
          ? "safari"
          : userAgent.includes("Edge")
            ? "edge"
            : "other";

    const country = headersList.get("cf-ipcountry") || 
                    headersList.get("x-vercel-ip-country") || 
                    undefined;

    const tracked = await trackClick({
      linkId,
      profileId,
      referrer,
      device,
      browser,
      country,
    });

    if (!tracked) {
      console.warn("Tinybird tracking failed - check TINYBIRD_TOKEN configuration");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}

