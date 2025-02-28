export type DialogStoreType = {
	showLogoutDialog: boolean;
	showAccountSettingsDialog: boolean;
	showDeleteAccountDialog: boolean;
	showEventTypesCreateDialog: boolean;
	showEventTypesDeleteDialog: boolean;
	showEventTypesUpdateDialog: boolean;
	showTeamSettingsCreateDialog: boolean;
	showTeamSettingsDeleteDialog: boolean;
	showTeamSettingsMemberDeleteDialog: boolean;
	showTeamMembersCreateDialog: boolean;
	showTeamMembersDeleteDialog: boolean;
	showTrackingDeleteDialog: boolean;
	closeAll: () => void;
};
