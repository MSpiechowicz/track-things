ALTER TABLE
  "team_members"
ADD
  COLUMN "name" text;

--> statement-breakpoint
ALTER TABLE
  "team_members"
ADD
  COLUMN "permissions" text DEFAULT 'edit' NOT NULL;
