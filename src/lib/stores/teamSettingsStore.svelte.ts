import type { TeamMemberType } from '$lib/types/teamMemberType';
import type { TeamSettingType } from '$lib/types/teamSettingsType';
import type { SortableDirectionType } from '$lib/types/sortableDirectionType';

type SortField = 'name' | 'members' | 'createdAt';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const teamSettingsStore = $state({
	data: [] as TeamSettingType[],
	dataFiltered: [] as TeamSettingType[],
  dataSorted: {
		fields: ['name', 'members', 'createdAt'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	showCreateView: false as boolean,
	showUpdateView: false as boolean,
	currentTeamMembers: [] as TeamMemberType[],
	currentTeamId: null as string | null,
	currentTeamName: null as string | null,
	sortData: (field: string) => {
		teamSettingsStore.dataSorted.direction =
			teamSettingsStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		teamSettingsStore.data = [...teamSettingsStore.data].sort((a, b) => {
			const modifier = teamSettingsStore.dataSorted.direction === 'asc' ? 1 : -1;

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
	},
  filterData: (search: string) => {
		teamSettingsStore.dataFiltered = teamSettingsStore.data.filter((item) => {
			return (
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.updated_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
