import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TeamSettingOwnerType } from '$lib/types/teamSettingsOwnerType';
import { sortData } from '$lib/utils/sort';

type SortField = 'name' | 'members' | 'created_at';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const teamSettingsOwnerStore = $state({
	data: [] as TeamSettingOwnerType[],
	dataFiltered: [] as TeamSettingOwnerType[],
	dataSorted: {
		fields: ['name', 'members', 'created_at'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	showUpdateView: false as boolean,
	currentTeamId: null as string | null,
	currentTeamName: null as string | null,
	resetCurrentTeam: () => {
		teamSettingsOwnerStore.currentTeamId = null;
		teamSettingsOwnerStore.currentTeamName = null;
	},
	resetViews: () => {
		teamSettingsOwnerStore.showUpdateView = false;
	},
	sortData: (field: string) => {
		teamSettingsOwnerStore.dataSorted.direction =
			teamSettingsOwnerStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		const modifier = teamSettingsOwnerStore.dataSorted.direction === 'asc' ? 1 : -1;

		teamSettingsOwnerStore.data = sortData(teamSettingsOwnerStore.data, field, modifier);
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
