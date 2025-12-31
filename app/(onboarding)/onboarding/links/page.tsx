"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { linkSchema } from "@/lib/validations/schemas";

type Link = {
  id: string;
  title: string;
  url: string;
};

export default function LinksPage() {
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const addLink = () => {
    try {
      const validated = linkSchema.parse({ title, url });
      setLinks([...links, { id: Date.now().toString(), ...validated }]);
      setTitle("");
      setUrl("");
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid link");
    }
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleContinue = async () => {
    if (links.length === 0) {
      setError("Add at least one link");
      return;
    }

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links }),
      });

      if (res.ok) {
        router.push("/onboarding/preview");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save links");
      }
    } catch {
      setError("Failed to save links");
    }
  };

  return (
    <div className="container mx-auto flex max-w-2xl flex-col px-4 py-16">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Add your links</h2>
          <p className="text-muted-foreground">
            Add the links you want to share on your profile
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., My Portfolio"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <Button type="button" onClick={addLink} className="w-full">
            Add Link
          </Button>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {links.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Your Links</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-muted-foreground">{link.url}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleContinue}
          className="w-full"
          disabled={links.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

