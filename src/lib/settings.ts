import { prisma } from "@/lib/prisma";

const SETTINGS_ID = "singleton";

/** Fetches the singleton Setting row, creating it with defaults if missing. */
export async function getSettings() {
  const existing = await prisma.setting.findUnique({ where: { id: SETTINGS_ID } });
  if (existing) return existing;
  return prisma.setting.create({ data: { id: SETTINGS_ID } });
}
