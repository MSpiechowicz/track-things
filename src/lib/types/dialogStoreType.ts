export type DialogStoreType = {
	showLogoutDialog: boolean;
	showAccountSettingsDialog: boolean;
	showDeleteAccountDialog: boolean;
	showTeamSettingsDeleteDialog: boolean;
	showTeamMembersCreateDialog: boolean;
	showTeamMembersDeleteDialog: boolean;
	closeAll: () => void;
};
