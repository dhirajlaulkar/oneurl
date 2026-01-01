import { requireAuth } from "@/lib/auth-guard";
import { profileService } from "@/lib/services/profile.service";
import PreviewClient from "./preview-client";
import { getAvatarUrl } from "@/lib/utils";
import { ProfilePreview } from "@/components/profile-preview";
import type { Link } from "@/lib/hooks/use-links";

export default async function PreviewPage() {
  const session = await requireAuth();
  const profile = await profileService.getByUserId(session.user.id);

  if (!profile) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <p>Profile not found</p>
      </div>
    );
  }

  const links: Link[] = (profile.profile?.links || []).map((link) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    icon: link.icon || undefined,
    position: link.position,
    isActive: link.isActive,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 px-4 py-12">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Preview your profile</h2>
        <p className="text-sm text-muted-foreground">
          This is how your profile will look to visitors
        </p>
      </div>

      <div className="mx-auto w-full">
        <ProfilePreview
          name={profile.name}
          username={profile.username}
          bio={profile.bio || null}
          avatarUrl={getAvatarUrl(profile)}
          title={profile.profile?.title || null}
          links={links}
          calLink={profile.profile?.calLink || null}
        />
      </div>

      <PreviewClient />
    </div>
  );
}

