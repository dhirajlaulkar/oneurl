"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { linkSchema } from "@/lib/validations/schemas";

type Link = {
  id: string;
  title: string;
  url: string;
  icon?: string | null;
  position: number;
  isActive: boolean;
};

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data.links || []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      linkSchema.parse({ title, url });
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });

      if (res.ok) {
        setTitle("");
        setUrl("");
        loadLinks();
      }
    } catch {
    }
  };

  const handleUpdate = async (id: string, data: Partial<Link>) => {
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        loadLinks();
        setEditingId(null);
      }
    } catch {
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadLinks();
      }
    } catch {
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await handleUpdate(id, { isActive: !isActive });
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Links</h1>
        <p className="text-muted-foreground mt-2">
          Add, edit, and organize your profile links
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
          <Button onClick={handleAdd}>Add Link</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-muted-foreground">No links yet. Add your first link above.</p>
        ) : (
          links.map((link) => (
            <Card key={link.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex-1">
                  {editingId === link.id ? (
                    <div className="space-y-2">
                      <Input
                        value={link.title}
                        onChange={(e) =>
                          setLinks(
                            links.map((l) =>
                              l.id === link.id
                                ? { ...l, title: e.target.value }
                                : l
                            )
                          )
                        }
                      />
                      <Input
                        value={link.url}
                        onChange={(e) =>
                          setLinks(
                            links.map((l) =>
                              l.id === link.id ? { ...l, url: e.target.value } : l
                            )
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleUpdate(link.id, {
                              title: links.find((l) => l.id === link.id)?.title,
                              url: links.find((l) => l.id === link.id)?.url,
                            })
                          }
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="font-medium">{link.title}</p>
                      <p className="text-sm text-muted-foreground">{link.url}</p>
                    </>
                  )}
                </div>
                {editingId !== link.id && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleActive(link.id, link.isActive)}
                    >
                      {link.isActive ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(link.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive-outline"
                      onClick={() => handleDelete(link.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

