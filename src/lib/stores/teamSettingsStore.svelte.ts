import type { TeamMemberType } from '$lib/types/teamMemberType';
import type { TeamSettingType } from '$lib/types/teamSettingsType';

type SortField = 'name' | 'members' | 'createdAt';
type SortDirection = 'asc' | 'desc';

type SortItem = {
	field: SortField;
	direction: SortDirection;
};

export const teamSettingsStore = $state({
	data: [] as TeamSettingType[],
	showCreateView: false as boolean,
	showUpdateView: false as boolean,
	currentTeamMembers: [] as TeamMemberType[],
	currentTeamId: null as string | null,
	currentTeamName: null as string | null,
	currentSort: [{
    field: 'name',
    direction: 'asc'
  }, {
    field: 'members',
    direction: 'asc'
  }, {
    field: 'createdAt',
    direction: 'asc'
  }] as SortItem[],
	sortData: (field: SortField) => {
		const itemIndex = teamSettingsStore.currentSort.findIndex((item) => item.field === field);


    console.log(' old team field sort', teamSettingsStore.currentSort[itemIndex]);

		teamSettingsStore.currentSort[itemIndex].direction =
			teamSettingsStore.currentSort[itemIndex].direction === 'asc' ? 'desc' : 'asc';



		teamSettingsStore.data = [...teamSettingsStore.data].sort((a, b) => {
			const modifier = teamSettingsStore.currentSort[itemIndex].direction === 'asc' ? 1 : -1;

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

    console.log(' new team field sort', teamSettingsStore.currentSort[itemIndex]);
	}
});
