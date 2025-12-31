import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to OneURL</h1>
          <p className="text-muted-foreground">
            Sign in to create your profile page
          </p>
        </div>
        <Button className="w-full" size="lg" asChild>
          <Link href="/api/auth/sign-in/google">Sign in with Google</Link>
        </Button>
      </div>
    </div>
  );
}

