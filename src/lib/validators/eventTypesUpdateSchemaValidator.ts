import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const eventTypesUpdateSchema = z.object({
	id: z.string(),
	title: z.string().min(3, 'Please enter a valid title (min 3 characters)'),
	color: z.string().min(3, 'Please enter a valid color (min 3 characters)'),
	teams: z.object({ team_id: z.string(), team_name: z.string() }).array().optional()
});

export const eventTypesUpdateSchemaValidator = zod(eventTypesUpdateSchema);
