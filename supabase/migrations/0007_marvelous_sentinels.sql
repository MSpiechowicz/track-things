CREATE TABLE "projects_recent" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "profile_id" uuid NOT NULL,
  "project_id" uuid NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "projects_recent" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "projects_recent"
ADD
  CONSTRAINT "projects_recent_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
  "projects_recent"
ADD
  CONSTRAINT "projects_recent_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
CREATE POLICY "Users can view their own recent projects"
ON "projects_recent"
FOR SELECT
USING (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Users can insert their own recent projects"
ON "projects_recent"
FOR INSERT
WITH CHECK (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Users can update their own recent projects"
ON "projects_recent"
FOR UPDATE
USING (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Users can delete their own recent projects"
ON "projects_recent"
FOR DELETE
USING (auth.uid() = profile_id);
