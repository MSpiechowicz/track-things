import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TrackingType } from '$lib/types/TrackingType';
import { sortData } from '$lib/utils/sort';
type SortField = 'name' | 'createdAt' | 'updatedAt';

type SortItem = {
	fields: SortField[];
	direction: SortableDirectionType;
};

export const trackingStore = $state({
	data: [] as TrackingType[],
	dataFiltered: [] as TrackingType[],
	dataSorted: {
		fields: ['name', 'createdAt', 'updatedAt'] as SortField[],
		direction: 'desc' as SortableDirectionType
	} as SortItem,
	showCreateView: false as boolean,
	showUpdateView: false as boolean,
	currentTrackingId: null as string | null,
	currentTrackingName: null as string | null,
	resetCurrentTracking: () => {
		trackingStore.currentTrackingId = null;
		trackingStore.currentTrackingName = null;
	},
	resetViews: () => {
		trackingStore.showCreateView = false;
		trackingStore.showUpdateView = false;
	},
	sortData: (field: string) => {
		trackingStore.dataSorted.direction =
			trackingStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		const modifier = trackingStore.dataSorted.direction === 'asc' ? 1 : -1;

		trackingStore.data = sortData(trackingStore.data, field, modifier);
	},
	filterData: (search: string) => {
		if (search.length === 0) {
			trackingStore.dataFiltered = [];
			return;
		}

		trackingStore.dataFiltered = trackingStore.data.filter((item) => {
			return (
				item.id.toLowerCase().includes(search.toLowerCase()) ||
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.created_at.toLowerCase().includes(search.toLowerCase()) ||
				item.updated_at.toLowerCase().includes(search.toLowerCase())
			);
		});
	}
});
