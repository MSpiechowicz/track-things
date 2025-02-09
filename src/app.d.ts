import type { SupabaseClient, User } from '@supabase/supabase-js';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetUser: () => Promise<{ user: User | null }>;
			user: User | null;
		}
		interface PageData {
			userProfile: UserProfile | null;
		}
	}
}

export { };

