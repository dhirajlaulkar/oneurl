import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-guard";
import { linkService } from "@/lib/services/link.service";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const data = await req.json();

    const link = await db.link.findUnique({ where: { id } });
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const profile = await db.profile.findUnique({
      where: { id: link.profileId },
    });

    if (profile?.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await linkService.update(id, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("redirect")) {
      throw error;
    }
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;

    const link = await db.link.findUnique({ where: { id } });
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const profile = await db.profile.findUnique({
      where: { id: link.profileId },
    });

    if (profile?.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await linkService.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("redirect")) {
      throw error;
    }
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}

