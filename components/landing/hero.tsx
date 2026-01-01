import { UsernameClaimForm } from "./username-claim-form";

export function LandingHero() {
  return (
    <section className="mx-auto w-full max-w-lg px-4 sm:px-6 lg:px-8 py-24 md:py-32">
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            One URL for all your links
          </h1>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-lg mx-auto">
            Create a beautiful profile page to share all your important links in one place. Open source alternative to Linktree.
          </p>
        </div>
        <div className="pt-4 flex justify-center">
          <UsernameClaimForm />
        </div>
      </div>
    </section>
  );
}

