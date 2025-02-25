import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TeamSettingOwnerType } from '$lib/types/teamSettingsOwnerType';

type SortField = 'name' | 'members' | 'createdAt';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const teamSettingsOwnerStore = $state({
	data: [] as TeamSettingOwnerType[],
	dataFiltered: [] as TeamSettingOwnerType[],
	dataSorted: {
		fields: ['name', 'members', 'createdAt'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	showUpdateView: false as boolean,
	currentTeamId: null as string | null,
	currentTeamName: null as string | null,
	resetCurrentTeam: () => {
		teamSettingsOwnerStore.currentTeamId = null;
		teamSettingsOwnerStore.currentTeamName = null;
	},
	sortData: (field: string) => {
		teamSettingsOwnerStore.dataSorted.direction =
			teamSettingsOwnerStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		teamSettingsOwnerStore.data = [...teamSettingsOwnerStore.data].sort((a, b) => {
			const modifier = teamSettingsOwnerStore.dataSorted.direction === 'asc' ? 1 : -1;

			switch (field) {
				case 'name':
					return modifier * a.name.localeCompare(b.name);
				case 'members':
					return modifier * (a.members - b.members);
				case 'createdAt':
					return modifier * a.updated_at.localeCompare(b.updated_at);
				default:
					return 0;
			}
		});
	},
	filterData: (search: string) => {
		if (search.length === 0) {
			teamSettingsOwnerStore.dataFiltered = [];
			return;
		}

		teamSettingsOwnerStore.dataFiltered = teamSettingsOwnerStore.data.filter((item) => {
			return (
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.updated_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
