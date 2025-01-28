"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";

interface AccountSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDisplayName: string | null;
  userId: string;
  onDisplayNameUpdate: (newName: string) => void;
}

export function AccountSettingsDialog({
  open,
  onOpenChange,
  currentDisplayName,
  userId,
  onDisplayNameUpdate,
}: AccountSettingsDialogProps) {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(currentDisplayName || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid name",
        description: "Display name cannot be empty.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("account_settings")
        .update({ display_name: displayName.trim() })
        .eq("user_id", userId);

      if (error) throw error;

      onDisplayNameUpdate(displayName.trim());
      toast({
        title: "Settings updated",
        description: "Your display name has been updated successfully.",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating display name:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update display name. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
          <DialogDescription>
            Update your account settings here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
