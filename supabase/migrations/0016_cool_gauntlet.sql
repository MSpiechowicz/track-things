CREATE TABLE "event_type_teams" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "event_type_id" uuid NOT NULL,
  "team_id" uuid NOT NULL,
  "team_name" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "event_type_teams" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
CREATE TABLE "event_types" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" text NOT NULL,
  "color" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE
  "event_types" ENABLE ROW LEVEL SECURITY;

--> statement-breakpoint
ALTER TABLE
  "event_type_teams"
ADD
  CONSTRAINT "event_type_teams_event_type_id_event_types_id_fk" FOREIGN KEY ("event_type_id") REFERENCES "public"."event_types"("id") ON DELETE cascade ON UPDATE no action;

--> statement-breakpoint
ALTER TABLE
  "event_type_teams"
ADD
  CONSTRAINT "event_type_teams_team_id_team_settings_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team_settings"("id") ON DELETE cascade ON UPDATE no action;
