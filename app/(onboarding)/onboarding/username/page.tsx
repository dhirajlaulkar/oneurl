"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { usernameSchema } from "@/lib/validations/schemas";

export default function UsernamePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkAvailability = async (value: string) => {
    if (!value) {
      setIsAvailable(null);
      return;
    }

    try {
      usernameSchema.parse(value);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid username");
      setIsAvailable(false);
      return;
    }

    setIsChecking(true);
    setError("");

    try {
      const res = await fetch("/api/profile/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: value }),
      });

      const data = await res.json();
      if (res.ok && data.available) {
        setIsAvailable(true);
        setError("");
      } else {
        setIsAvailable(false);
        setError(data.error || "Username is not available");
      }
    } catch {
      setError("Failed to check username");
      setIsAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAvailable) return;

    try {
      const res = await fetch("/api/profile/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        router.push("/onboarding/avatar");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to set username");
      }
    } catch {
      setError("Failed to set username");
    }
  };

  return (
    <div className="container mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Choose your username</h2>
          <p className="text-muted-foreground">
            This will be your unique profile URL: oneurl.com/{username || "username"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                oneurl.com/
              </span>
              <Input
                id="username"
                value={username}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();
                  setUsername(value);
                  checkAvailability(value);
                }}
                className="pl-[120px]"
                placeholder="username"
                aria-invalid={error ? "true" : undefined}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            {isAvailable === true && !error && (
              <p className="text-sm text-green-600">Username is available!</p>
            )}
            {isChecking && (
              <p className="text-sm text-muted-foreground">Checking...</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isAvailable || isChecking}
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}

