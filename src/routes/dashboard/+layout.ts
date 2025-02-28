import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

async function loadTeamSettings(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
	const response = await fetch('/api/v1/team-settings/get/all');

	if (!response.ok) {
		throw new Error('Failed to fetch team settings');
	}

	const result = await response.json();
	teamSettingsOwnerStore.data = result.data;
	return result.data;
}

async function loadTeamMembers(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
	const response = await fetch(`/api/v1/team-settings/member/get/all`);

	if (!response.ok) {
		throw new Error('Unable to fetch the user member team settings');
	}

	const result = await response.json();
	teamSettingsMemberStore.data = result.data;
	return result.data;
}

export const load: LayoutLoad = async ({ parent, fetch, depends }) => {
	const { userProfile } = await parent();

	if (!userProfile || !userProfile.id) {
		redirect(302, '/auth/login');
	}

	const [teamSettings, teamMembers] = await Promise.all([
		loadTeamSettings(fetch),
		loadTeamMembers(fetch)
	]);

	depends('app:dashboard');

	return {
		userProfile,
		teamSettings,
		teamMembers
	};
};
