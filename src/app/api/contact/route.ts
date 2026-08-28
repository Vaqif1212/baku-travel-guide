import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, contact, text } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    typeof text !== "string" ||
    !name.trim() ||
    !contact.trim() ||
    !text.trim()
  ) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  if (name.length > 200 || contact.length > 200 || text.length > 4000) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  await prisma.message.create({
    data: { name: name.trim(), contact: contact.trim(), text: text.trim() },
  });

  return NextResponse.json({ ok: true });
}
