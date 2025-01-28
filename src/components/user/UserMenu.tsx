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
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/utils/supabase/client";
import { LogOut, Menu, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccountSettingsDialog } from "./UserAccountSettings";

export function UserMenu({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const { id, name, email, displayName } = useUserStore();

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

  const menuContent = (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col">
          <p className="text-lg font-medium">{name}</p>
          <p className="text-sm font-normal">{email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="mx-2 my-2 bg-neutral-200" />
      <div className="flex flex-col gap-1">
        <DropdownMenuItem onClick={() => setShowAccountSettings(true)} className="text-base">
          <div className="mr-1 flex h-7 w-7 items-center justify-center rounded-full bg-custom-dark">
            <User size={16} className="text-white" />
          </div>
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setShowLogoutDialog(true)} className="text-base">
          <div className="mr-1 flex h-7 w-7 items-center justify-center rounded-full bg-custom-dark">
            <LogOut size={16} className="text-white" />
          </div>
          Sign Out
        </DropdownMenuItem>
      </div>
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
        <DropdownMenuContent align="end" className="w-full p-2">
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>

      {id && (
        <AccountSettingsDialog
          open={showAccountSettings}
          onOpenChange={setShowAccountSettings}
          currentDisplayName={displayName}
          userId={id}
        />
      )}

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent className="w-[325px] rounded-xl border sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-xl">Sign Out</DialogTitle>
            <DialogDescription className="text-base text-neutral-600">
              Are you sure you want to sign out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex flex-col gap-3 sm:gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
