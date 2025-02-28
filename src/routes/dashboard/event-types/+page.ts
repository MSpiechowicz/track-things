import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

async function loadEventTypes(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  const response = await fetch('/api/v1/event-types/get/all');

	if (!response.ok) {
		throw new Error('Failed to fetch event types');
	}

	const result = await response.json();
  console.log('result', result);
	eventTypesStore.data = result.data;
	return result.data;
}

export const load: PageLoad = async ({ parent, fetch, depends }) => {
	const { userProfile } = await parent();

	if (!userProfile || !userProfile.id) {
		redirect(302, '/auth/login');
	}

	eventTypesStore.availableTeams = [
		...teamSettingsOwnerStore.data.map((team) => ({
			id: team.id,
			team_name: team.name
		})),
		...teamSettingsMemberStore.data.map((team) => ({
			id: team.team_id,
			team_name: team.name
		}))
	].filter((team, index, self) => index === self.findIndex((t) => t.id === team.id));

	const eventTypes = await loadEventTypes(fetch);

	depends('app:event-types');

	return {
		userProfile,
		eventTypes
	};
};
