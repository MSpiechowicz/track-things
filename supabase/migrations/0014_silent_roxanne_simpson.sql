ALTER TABLE "project_calendar_events" RENAME TO "tracking_calendar_events";--> statement-breakpoint
ALTER TABLE "project_collaborators" RENAME TO "tracking_collaborators";--> statement-breakpoint
ALTER TABLE "projects_recent" RENAME TO "tracking_recent";--> statement-breakpoint
ALTER TABLE "projects" RENAME TO "tracking";--> statement-breakpoint
ALTER TABLE "tracking_calendar_events" RENAME COLUMN "project_id" TO "tracking_id";--> statement-breakpoint
ALTER TABLE "tracking_collaborators" RENAME COLUMN "project_id" TO "tracking_id";--> statement-breakpoint
ALTER TABLE "tracking_recent" RENAME COLUMN "project_id" TO "tracking_id";--> statement-breakpoint
ALTER TABLE "team_settings" RENAME COLUMN "project_ids" TO "tracking_ids";--> statement-breakpoint
ALTER TABLE "tracking_calendar_events" DROP CONSTRAINT "project_calendar_events_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking_collaborators" DROP CONSTRAINT "project_collaborators_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking_collaborators" DROP CONSTRAINT "project_collaborators_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking_recent" DROP CONSTRAINT "projects_recent_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking_recent" DROP CONSTRAINT "projects_recent_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking" DROP CONSTRAINT "projects_profile_id_profiles_id_fk";
--> statement-breakpoint
ALTER TABLE "tracking_calendar_events" ADD CONSTRAINT "tracking_calendar_events_tracking_id_tracking_id_fk" FOREIGN KEY ("tracking_id") REFERENCES "public"."tracking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_collaborators" ADD CONSTRAINT "tracking_collaborators_tracking_id_tracking_id_fk" FOREIGN KEY ("tracking_id") REFERENCES "public"."tracking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_collaborators" ADD CONSTRAINT "tracking_collaborators_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_recent" ADD CONSTRAINT "tracking_recent_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_recent" ADD CONSTRAINT "tracking_recent_tracking_id_tracking_id_fk" FOREIGN KEY ("tracking_id") REFERENCES "public"."tracking"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;