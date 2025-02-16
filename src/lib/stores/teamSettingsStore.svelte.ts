import type { TeamMemberType } from '$lib/types/teamMemberType';
import type { TeamSettingType } from '$lib/types/teamSettingsType';

type SortField = 'name' | 'members' | 'createdAt';
type SortDirection = 'asc' | 'desc';

type SortItem = {
	fields: SortField[];
	direction: SortDirection;
};

export const teamSettingsStore = $state({
	data: [] as TeamSettingType[],
	showCreateView: false as boolean,
	showUpdateView: false as boolean,
	currentTeamMembers: [] as TeamMemberType[],
	currentTeamId: null as string | null,
	currentTeamName: null as string | null,
	currentSort: {
		fields: ['name', 'members', 'createdAt'] as SortField[],
		direction: 'asc' as SortDirection
	} as SortItem,
	sortData: (field: SortField) => {
		teamSettingsStore.currentSort.direction =
			teamSettingsStore.currentSort.direction === 'asc' ? 'desc' : 'asc';

		teamSettingsStore.data = [...teamSettingsStore.data].sort((a, b) => {
			const modifier = teamSettingsStore.currentSort.direction === 'asc' ? 1 : -1;

			switch (field) {
				case 'name':
					return modifier * a.name.localeCompare(b.name);
				case 'members':
					return modifier * ((a.members?.length || 0) - (b.members?.length || 0));
				case 'createdAt':
					return modifier * a.updated_at.localeCompare(b.updated_at);
				default:
					return 0;
			}
		});
	}
});
