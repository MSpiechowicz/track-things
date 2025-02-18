import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
import type { PageLoad } from './$types';

async function loadTeamSettings(fetch: any) {
  const responseTeamSettings = await fetch('/api/v1/team-settings/get/all');

  if (!responseTeamSettings.ok) {
    throw new Error('Failed to fetch team settings');
  }

  try {
    const resultTeamSettings = await responseTeamSettings.json();

    teamSettingsOwnerStore.data = resultTeamSettings.data;

    console.log('teamSettingsOwnerStore.data', teamSettingsOwnerStore.data);

    //for (const teamSetting of teamSettingsOwnerStore.data) {
    //  const responseTeamMembers = await fetch(
    //    `/api/v1/team-members/get/all?teamId=${teamSetting.id}`
    //  );

    //  if (!responseTeamMembers.ok) {
    //    throw new Error(`Failed to fetch team members for the team ${teamSetting.id}`);
    //  }

    //  const resultTeamMembers = await responseTeamMembers.json();

    //  if (resultTeamMembers.data) {
    //    teamSetting.members = resultTeamMembers.data;
    //  }
    //}
  } catch (error) {
    console.error('Error loading team settings:', error);
  }
}

async function loadTeamMembers(fetch: any) {
  const response = await fetch(`/api/v1/team-settings/member/get/all`);

  if (!response.ok) {
    throw new Error('Unable to fetch the user member team settings');
  }

  const result = await response.json();

  teamSettingsMemberStore.data = result.data;
}

export const load: PageLoad = async ({ parent, fetch, depends }) => {
  const { userProfile } = await parent();

  await Promise.all([
    loadTeamSettings(fetch),
    loadTeamMembers(fetch)
  ]);

  depends('app:dashboard');

  return {
    userProfile,
  };
};
