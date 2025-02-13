CREATE TABLE "project_collaborators" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "profile_id" uuid NOT NULL,
  "emails" text[] NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "project_collaborators" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "profile_id" uuid NOT NULL,
  "name" text NOT NULL,
  "type" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "projects" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "project_collaborators"
ADD
  CONSTRAINT "project_collaborators_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
  "project_collaborators"
ADD
  CONSTRAINT "project_collaborators_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
  "projects"
ADD
  CONSTRAINT "projects_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;

CREATE POLICY "Users can view their own projects and collaborated projects"
ON "projects"
FOR SELECT
USING (
  auth.uid() = profile_id OR
  EXISTS (
    SELECT 1 FROM project_collaborators
    WHERE project_id = projects.id AND profile_id = auth.uid()
  )
);

--> statement-breakpoint
CREATE POLICY "Users can create their own projects"
ON "projects"
FOR INSERT
WITH CHECK (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Users can update their own projects"
ON "projects"
FOR UPDATE
USING (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Users can delete their own projects"
ON "projects"
FOR DELETE
USING (auth.uid() = profile_id);

--> statement-breakpoint
CREATE POLICY "Project owners can view collaborators"
ON "project_collaborators"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND profile_id = auth.uid()
  )
);

--> statement-breakpoint
CREATE POLICY "Project owners can add collaborators"
ON "project_collaborators"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND profile_id = auth.uid()
  )
);

--> statement-breakpoint
CREATE POLICY "Project owners can remove collaborators"
ON "project_collaborators"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND profile_id = auth.uid()
  )
);
