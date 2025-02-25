import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TeamMemberType } from '$lib/types/teamMemberType';
import { sortData } from '$lib/utils/sort';

type SortField = 'name' | 'email' | 'created_at' | 'permissions';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const teamMembersStore = $state({
	data: [] as TeamMemberType[],
	dataFiltered: [] as TeamMemberType[],
	dataSorted: {
		fields: ['name', 'email', 'created_at', 'permissions'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	currentMemberId: null as string | null,
	currentMemberName: null as string | null,
	currentMemberEmail: null as string | null,
	currentMemberTeamId: null as string | null,
	currentMemberPermissions: null as string | null,
	resetCurrentMember: () => {
		teamMembersStore.currentMemberId = null;
		teamMembersStore.currentMemberName = null;
		teamMembersStore.currentMemberEmail = null;
		teamMembersStore.currentMemberTeamId = null;
		teamMembersStore.currentMemberPermissions = null;
	},
	sortData: (field: string) => {
		teamMembersStore.dataSorted.direction =
			teamMembersStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		const modifier = teamMembersStore.dataSorted.direction === 'asc' ? 1 : -1;

		teamMembersStore.data = sortData(teamMembersStore.data, field, modifier);
	},
	filterData: (search: string) => {
		if (search.length === 0) {
			teamMembersStore.dataFiltered = [];
			return;
		}

		teamMembersStore.dataFiltered = teamMembersStore.data.filter((member) => {
			return (
				member.name.toLowerCase().includes(search.toLowerCase()) ||
				member.email.toLowerCase().includes(search.toLowerCase()) ||
				member.permissions.toLowerCase().includes(search.toLowerCase()) ||
				member.created_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
