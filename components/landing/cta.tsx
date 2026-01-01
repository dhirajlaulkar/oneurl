import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section className="border-t-2 border-dashed border-zinc-200">
      <div className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8 py-24">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-medium">
            Ready to share your links?
          </h2>
          <p className="text-sm text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who use OneURL to showcase their work. 
            Get started in seconds.
          </p>
          <div className="flex justify-center items-center pt-4">
            <Button 
              render={<Link href="/signup" />}
              className="text-sm font-medium px-6 h-10 bg-foreground text-background hover:bg-foreground/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

