import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    const { db } = await import("@/lib/db");
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.isOnboarded) {
      redirect("/dashboard");
    } else {
      redirect("/onboarding/username");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">OneURL</h1>
          <Button asChild>
            <Link href="/api/auth/sign-in/google">Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-32">
          <div className="max-w-2xl text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              One URL for all your links
            </h1>
            <p className="text-xl text-muted-foreground">
              Create a beautiful profile page to share all your important links
              in one place. Open source alternative to Linktree.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/api/auth/sign-in/google">
                  Get Started with Google
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
