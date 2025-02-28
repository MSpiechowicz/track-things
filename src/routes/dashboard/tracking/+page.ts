import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();

	// Add any tracking-specific data loading here
	// Example:
	// const trackingData = await loadTrackingData();

	return {
		...data,
		// trackingData
	};
};
