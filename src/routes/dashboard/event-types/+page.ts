import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch, depends }) => {
	const { userProfile } = await parent();

	if (!userProfile || !userProfile.id) {
		redirect(302, '/auth/login');
	}

	eventTypesStore.availableTeams = [
		...teamSettingsOwnerStore.data.map((team) => ({
			id: team.id,
			name: team.name
		})),
		...teamSettingsMemberStore.data.map((team) => ({
			id: team.team_id,
			name: team.name
		}))
	].filter((team, index, self) => index === self.findIndex((t) => t.id === team.id));

	depends('app:event-types');

	return {
		userProfile
	};
};
