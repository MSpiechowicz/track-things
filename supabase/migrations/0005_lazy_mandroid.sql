ALTER TABLE "profile_settings" DROP CONSTRAINT "profile_settings_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "profile_settings" ADD CONSTRAINT "profile_settings_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

-- Add these policies if not already present
CREATE POLICY "Users can delete own profile settings"
  ON profile_settings FOR DELETE
  USING ( auth.uid() = profile_id );

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING ( auth.uid() = id );
