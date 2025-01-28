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
import { useUserStore } from "@/store/userStore";
import { updateAccountSettingsDisplayName } from "@/utils/supabase/accountSettings";
import { useState } from "react";

interface UserAccountSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDisplayName: string | null;
  userId: string;
}

export function AccountSettingsDialog({ open, onOpenChange, userId }: UserAccountSettingsProps) {
  const { toast } = useToast();
  const { displayName, setDisplayName } = useUserStore();
  const [inputDisplayName, setInputDisplayName] = useState(displayName ?? "");

  function checkIfDisplayNameIsNotEmpty() {
    if (!inputDisplayName.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid name",
        description: "Display name cannot be empty.",
      });
      return;
    }
  }

  async function handleSave() {
    checkIfDisplayNameIsNotEmpty();

    const result = await updateAccountSettingsDisplayName(userId, inputDisplayName.trim());

    if (result) {
      toast({
        title: "Settings updated",
        description: "Your display name has been updated successfully.",
      });
      onOpenChange(false);
      setDisplayName(inputDisplayName.trim());
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update display name. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[325px] rounded-xl border sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl">Account Settings</DialogTitle>
          <DialogDescription className="text-base text-neutral-600">
            Below you can adjust your personal account information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="displayName" className="text-base">
              Display Name
            </Label>
            <Input
              id="displayName"
              value={inputDisplayName}
              onChange={(e) => setInputDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="text-lg"
            />
          </div>
        </div>
        <DialogFooter className="mt-2 flex flex-col gap-3 sm:gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!inputDisplayName?.trim()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
