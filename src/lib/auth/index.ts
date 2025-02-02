import { db } from "$lib/db";
import { eq } from "drizzle-orm";
import { profilesTable } from "../db/schema";

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    return;
  }

  const currentProfile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  if (currentProfile) {
    return currentProfile;
  }

  await db.insert(profilesTable).values({
      id: user.id,
      email: user.email || "",
      name: user.user_metadata.name || "",
      avatarUrl: user.user_metadata.avatar_url || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

  const newProfile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  return newProfile;
}
