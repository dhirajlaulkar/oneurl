import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-guard";
import { profileService } from "@/lib/services/profile.service";
import { usernameSchema } from "@/lib/validations/schemas";

export async function POST(req: Request) {
  try {
    const session = await requireAuth();
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const available = await profileService.checkUsernameAvailable(
      username,
      session.user.id
    );

    return NextResponse.json({ available });
  } catch (error) {
    if (error instanceof Error && error.message.includes("redirect")) {
      throw error;
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid username" },
      { status: 400 }
    );
  }
}

