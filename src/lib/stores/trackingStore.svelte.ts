import type { SortableDirectionType } from '$lib/types/sortableDirectionType';
import type { TrackingType } from '$lib/types/TrackingType';

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
	sortData: (field: string) => {
		trackingStore.dataSorted.direction =
			trackingStore.dataSorted.direction === 'asc' ? 'desc' : 'asc';

		trackingStore.data = [...trackingStore.data].sort((a, b) => {
			const modifier = trackingStore.dataSorted.direction === 'asc' ? 1 : -1;

			switch (field) {
				case 'name':
					return modifier * a.name.localeCompare(b.name);
				case 'createdAt':
					return modifier * a.created_at.localeCompare(b.created_at);
				case 'updatedAt':
					return modifier * a.updated_at.localeCompare(b.updated_at);
				default:
					return 0;
			}
		});
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
