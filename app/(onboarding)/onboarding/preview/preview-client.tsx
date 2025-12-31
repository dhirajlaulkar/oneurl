"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PreviewClient({ profile }: { profile: any }) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch("/api/profile/publish", {
        method: "POST",
      });

      if (res.ok) {
        router.push("/dashboard");
      }
    } catch {
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex justify-center gap-4">
      <Button variant="outline" onClick={() => router.back()}>
        Back
      </Button>
      <Button onClick={handlePublish} disabled={isPublishing}>
        {isPublishing ? "Publishing..." : "Publish Profile"}
      </Button>
    </div>
  );
}
