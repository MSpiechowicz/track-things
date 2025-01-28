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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase/client";
import { LogOut, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountSettingsDialog } from "./AccountSettingsDialog";

interface UserMenuProps {
  user: {
    name: string | null;
    email: string | null;
    id: string;
  };
  isMobile?: boolean;
}

export function UserMenu({ user, isMobile }: UserMenuProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setShowLogoutDialog(false);
      toast({
        title: "Successfully signed out",
        description: "You have been logged out of your account.",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
      });
      console.error("Error signing out:", error);
    }
  };

  const handleDisplayNameUpdate = (newName: string) => {
    user.name = newName;
  };

  const menuContent = (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs font-normal">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-neutral-200 mx-2" />
      <DropdownMenuItem onClick={() => setShowAccountSettings(true)}>
        <User className="mr-1 h-4 w-4" />
        Account Settings
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
        <LogOut className="mr-1 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon">
            {isMobile ? <Menu className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountSettingsDialog
        open={showAccountSettings}
        onOpenChange={setShowAccountSettings}
        currentDisplayName={user.name}
        userId={user.id}
        onDisplayNameUpdate={handleDisplayNameUpdate}
      />

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="w-[325px] sm:w-full border rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Sign Out</DialogTitle>
            <DialogDescription className="text-lg text-neutral-600">
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
