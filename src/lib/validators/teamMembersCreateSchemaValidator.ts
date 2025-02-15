import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const teamMembersCreateSchema = z.object({
	teamId: z.string().min(1, 'Please select a team'),
	email: z.string().email('Please enter a valid email address'),
});

export const teamMembersCreateSchemaValidator = zod(teamMembersCreateSchema);
