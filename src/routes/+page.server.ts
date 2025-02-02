import { db } from '$lib/db';

export const load = async () => {
	const profiles = await db.query.profilesTable.findMany();
  
	return {
		profiles
	};
};
