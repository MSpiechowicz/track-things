import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

export const teamSettingsCreateSchema = z.object({
	name: z.string().min(3, 'This field is required, and must be at least 3 characters long')
});

export const teamSettingsCreateSchemaValidator = zod(teamSettingsCreateSchema);
