<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';

	import PageUserMenuContent from '$lib/components/PageUserMenuContent.svelte';
	import PageUserMenuDialog from '$lib/components/PageUserMenuDialog.svelte';

	import IconMenu from '$lib/components/svg/IconMenu.svelte';
	import IconSettings from '$lib/components/svg/IconSettings.svelte';

	const { id, name, email, displayName, isMobile = false } = $props();
</script>

<!--import {
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
import { AccountSettingsDialog } from "./UserAccountSettings";-->

<!--export function UserMenu({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const { id, name, email, displayName } = useUserStore();-->

<!--const handleSignOut = async () => {
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
  };-->

<DropdownMenu>
	<DropdownMenuTrigger asChild>
		<Button size="icon">
			{#if isMobile}
				<IconMenu additionalClass="h-5 w-5" />
			{:else}
				<IconSettings additionalClass="h-5 w-5" />
			{/if}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end" class="w-full p-2">
		<PageUserMenuContent {name} {email} />
	</DropdownMenuContent>
</DropdownMenu>

<!--{id && (
        <AccountSettingsDialog
          open={showAccountSettings}
          onOpenChange={setShowAccountSettings}
          currentDisplayName={displayName}
          userId={id}
        />
      )}-->

<PageUserMenuDialog />
