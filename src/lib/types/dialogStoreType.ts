export type DialogStoreType = {
	showLogoutDialog: boolean;
	showAccountSettingsDialog: boolean;
	showDeleteAccountDialog: boolean;
	showEventTypesDeleteDialog: boolean;
	showTeamSettingsCreateDialog: boolean;
	showTeamSettingsDeleteDialog: boolean;
	showTeamSettingsMemberDeleteDialog: boolean;
	showTeamMembersCreateDialog: boolean;
	showTeamMembersDeleteDialog: boolean;
	showTrackingDeleteDialog: boolean;
	closeAll: () => void;
};
