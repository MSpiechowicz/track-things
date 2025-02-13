CREATE TABLE "team_settings" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "profile_id" uuid NOT NULL,
  "name" text NOT NULL,
  "team_ids" uuid [] NOT NULL,
  "project_ids" uuid [] NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "team_settings" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "team_settings"
ADD
  CONSTRAINT "team_settings_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
