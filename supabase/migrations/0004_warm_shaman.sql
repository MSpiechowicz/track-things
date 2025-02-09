ALTER TABLE "profile_settings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING ( auth.uid() = id );

-- Allow authenticated users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- Allow authenticated users to view their own settings
CREATE POLICY "Users can view own profile settings"
  ON profile_settings FOR SELECT
  USING ( auth.uid() = profile_id );

-- Allow authenticated users to update their own settings
CREATE POLICY "Users can update own profile settings"
  ON profile_settings FOR UPDATE
  USING ( auth.uid() = profile_id );

-- Allow authenticated users to insert their own settings
CREATE POLICY "Users can insert own profile settings"
  ON profile_settings FOR INSERT
  WITH CHECK ( auth.uid() = profile_id );

-- Allow authenticated users to delete their own settings
CREATE POLICY "Users can delete own profile settings"
  ON profile_settings FOR DELETE
  USING ( auth.uid() = profile_id );
