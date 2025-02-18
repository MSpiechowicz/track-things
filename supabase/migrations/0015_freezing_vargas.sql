ALTER TABLE
  "team_settings"
ADD
  COLUMN "members" integer DEFAULT 0 NOT NULL;

--> statement-breakpoint
-- Create function to update members count
CREATE OR REPLACE FUNCTION update_team_members_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE team_settings
    SET members = members + 1
    WHERE id = NEW.team_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE team_settings
    SET members = members - 1
    WHERE id = OLD.team_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

--> statement-breakpoint
-- Create trigger
CREATE TRIGGER team_members_count_trigger
AFTER
INSERT
  OR DELETE ON team_members FOR EACH ROW EXECUTE FUNCTION update_team_members_count();
