import { Timer as CountdownTimer } from './countdownTimer.svelte';

export const navigationTimer = new CountdownTimer(500);
export const trackingTimer = new CountdownTimer(1000);
export const trackingCreateTimer = new CountdownTimer(1000);
export const eventTypesTimer = new CountdownTimer(1000);
export const eventTypesUpdateTimer = new CountdownTimer(1000);
export const teamSettingsTimer = new CountdownTimer(1000);
export const teamSettingsUpdateTimer = new CountdownTimer(1000);
export const teamMembersTimer = new CountdownTimer();
