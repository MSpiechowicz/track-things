import { db } from "$lib/db";
import { eq } from "drizzle-orm";
import { profileSettingsTable, profilesTable } from "../db/schema";

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetUser();

  if (!user) {
    return;
  }

  const currentProfile = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.id, user.id),
  });

  const currentProfileSettings = await db.query.profileSettingsTable.findFirst({
    where: eq(profileSettingsTable.profileId, user.id),
  });

  if (currentProfile) {
    return {
      ...currentProfile,
      displayName: currentProfileSettings?.displayName || currentProfile.name,
      hideEmail: currentProfileSettings?.hideEmail || false,
    };
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

  return {
    ...newProfile,
    displayName: newProfile?.name,
    hideEmail: false,
  };
}
