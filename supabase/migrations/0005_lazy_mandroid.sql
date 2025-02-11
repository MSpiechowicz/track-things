ALTER TABLE
  "profile_settings" DROP CONSTRAINT "profile_settings_profile_id_profiles_id_fk";

--> statement-breakpoint
ALTER TABLE
  "profile_settings"
ADD
  CONSTRAINT "profile_settings_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

CREATE POLICY "Users can delete own profile" ON profiles FOR DELETE USING (auth.uid() = id);

-- Add foreign key from profiles to auth.users
ALTER TABLE
  "public"."profiles"
ADD
  CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;

-- Add RLS policy for deletion
CREATE POLICY "Enable delete for authenticated users only" ON "public"."profiles" FOR DELETE USING (auth.uid() = id);
