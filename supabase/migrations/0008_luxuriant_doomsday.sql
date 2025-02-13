CREATE TABLE "project_calendar_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "event_name" text NOT NULL,
  "event_type" text NOT NULL,
  "event_color" text NOT NULL,
  "event_description" text,
  "start_date" date NOT NULL,
  "end_date" date NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "project_calendar_events" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "project_calendar_events"
ADD
  CONSTRAINT "project_calendar_events_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
CREATE POLICY "Users can view calendar events for their projects"
ON "project_calendar_events"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND
    (profile_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM project_collaborators
        WHERE project_id = projects.id AND profile_id = auth.uid()
      )
    )
  )
);

--> statement-breakpoint
CREATE POLICY "Users can create calendar events for their projects"
ON "project_calendar_events"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND
    (profile_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM project_collaborators
        WHERE project_id = projects.id AND profile_id = auth.uid()
      )
    )
  )
);

--> statement-breakpoint
CREATE POLICY "Users can update calendar events for their projects"
ON "project_calendar_events"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND
    (profile_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM project_collaborators
        WHERE project_id = projects.id AND profile_id = auth.uid()
      )
    )
  )
);

--> statement-breakpoint
CREATE POLICY "Users can delete calendar events for their projects"
ON "project_calendar_events"
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM projects
    WHERE id = project_id AND
    (profile_id = auth.uid() OR
      EXISTS (
        SELECT 1 FROM project_collaborators
        WHERE project_id = projects.id AND profile_id = auth.uid()
      )
    )
  )
);
