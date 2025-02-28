import type { EventType } from '$lib/types/eventType';
import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import { sortData } from '$lib/utils/sort';

type SortField = 'title' | 'color' | 'created_at' | 'updated_at';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const eventTypesStore = $state({
	data: [] as EventType[],
	dataFiltered: [] as EventType[],
	dataSorted: {
		fields: ['title', 'color', 'created_at', 'updated_at'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	showUpdateView: false as boolean,
	currentEventTypeId: null as string | null,
	currentEventTypeTitle: null as string | null,
	currentEventTypeColor: null as string | null,
	currentEventTypeTeams: [] as { id: string; name: string }[],
  availableTeams: [] as { id: string; name: string }[],
	resetCurrentEventType: () => {
		eventTypesStore.currentEventTypeId = null;
		eventTypesStore.currentEventTypeTitle = null;
		eventTypesStore.currentEventTypeColor = null;
		eventTypesStore.currentEventTypeTeams = [];
	},
	resetViews: () => {
		eventTypesStore.showUpdateView = false;
	},
	sortData: (field: string) => {
		eventTypesStore.dataSorted.direction =
			eventTypesStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		const modifier = eventTypesStore.dataSorted.direction === 'asc' ? 1 : -1;

		eventTypesStore.data = sortData(eventTypesStore.data, field, modifier);
	},
	filterData: (search: string) => {
		if (search.length === 0) {
			eventTypesStore.dataFiltered = [];
			return;
		}

		eventTypesStore.dataFiltered = eventTypesStore.data.filter((item) => {
			return (
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.title.toLowerCase().includes(search.toLowerCase()) ||
				item.updated_at.toLowerCase().includes(search.toLowerCase()) ||
				item.created_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
