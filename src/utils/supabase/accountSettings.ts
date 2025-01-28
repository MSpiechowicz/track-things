import { supabase } from "./client";

export const fetchAccountSettingsDisplayName = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("account_settings")
      .select("display_name")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return data?.display_name as string;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    return null;
  }
};

export const updateAccountSettingsDisplayName = async (userId: string, displayName: string) => {
  try {
    const { error } = await supabase
      .from("account_settings")
      .update({ display_name: displayName })
      .eq("user_id", userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error updating user settings:", error);
    return false;
  }
};
