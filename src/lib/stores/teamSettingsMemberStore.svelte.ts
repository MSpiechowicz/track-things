import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TeamSettingMemberType } from '$lib/types/teamSettingsMemberType';

type SortField = 'name' | 'createdAt';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const teamSettingsMemberStore = $state({
	data: [] as TeamSettingMemberType[],
	dataFiltered: [] as TeamSettingMemberType[],
  dataSorted: {
		fields: ['name', 'createdAt'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	currentMemberTeamId: null as string | null,
	currentMemberTeamName: null as string | null,
	resetCurrentMember: () => {
		teamSettingsMemberStore.currentMemberTeamId = null;
		teamSettingsMemberStore.currentMemberTeamName = null;
	},
	sortData: (field: string) => {
		teamSettingsMemberStore.dataSorted.direction =
			teamSettingsMemberStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		teamSettingsMemberStore.data = [...teamSettingsMemberStore.data].sort((a, b) => {
			const modifier = teamSettingsMemberStore.dataSorted.direction === 'asc' ? 1 : -1;

			switch (field) {
				case 'name':
					return modifier * a.name.localeCompare(b.name);
				case 'createdAt':
					return modifier * a.created_at.localeCompare(b.created_at);
				default:
					return 0;
			}
		});
	},
  filterData: (search: string) => {
    if (search.length === 0) {
      teamSettingsMemberStore.dataFiltered = [];
      return;
    }

		teamSettingsMemberStore.dataFiltered = teamSettingsMemberStore.data.filter((item) => {
			return (
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.created_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
