CREATE TABLE "team_members" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "team_id" uuid NOT NULL,
  "profile_id" uuid NOT NULL,
  "email" text NOT NULL,
  "joined_at" timestamp DEFAULT now() NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "team_members" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "team_members"
ADD
  CONSTRAINT "team_members_team_id_team_settings_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team_settings"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
  "team_members"
ADD
  CONSTRAINT "team_members_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE "team_settings" DROP COLUMN "team_ids";

--> statement-breakpoint
CREATE POLICY "View team members" ON team_members FOR
SELECT
  USING (
    EXISTS (
      SELECT
        1
      FROM
        team_settings
      WHERE
        team_settings.id = team_members.team_id
        AND (
          team_settings.profile_id = auth.uid()
          OR team_members.profile_id = auth.uid()
        )
    )
  );

--> statement-breakpoint
CREATE POLICY "Create team members" ON team_members FOR
INSERT
  WITH CHECK (
    EXISTS (
      SELECT
        1
      FROM
        team_settings
      WHERE
        team_settings.id = team_members.team_id
        AND team_settings.profile_id = auth.uid()
    )
  );

--> statement-breakpoint
CREATE POLICY "Delete team members" ON team_members FOR DELETE USING (
  -- Allow team owner or the member themselves to remove
  EXISTS (
    SELECT
      1
    FROM
      team_settings
    WHERE
      team_settings.id = team_members.team_id
      AND team_settings.profile_id = auth.uid()
  )
  OR profile_id = auth.uid()
);

--> statement-breakpoint
CREATE POLICY "View team settings" ON team_settings FOR
SELECT
  USING (
    auth.uid() = profile_id
    OR EXISTS (
      SELECT
        1
      FROM
        team_members
      WHERE
        team_members.team_id = team_settings.id
        AND team_members.profile_id = auth.uid()
    )
  );

--> statement-breakpoint
CREATE POLICY "Create team settings" ON team_settings FOR
INSERT
  WITH CHECK (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Update team settings" ON team_settings FOR
UPDATE
  USING (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Delete team settings" ON team_settings FOR DELETE USING (auth.uid() = profile_id);
