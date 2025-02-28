import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const eventTypesCreateSchema = z.object({
	title: z.string().min(3, 'Please enter a valid title (min 3 characters)'),
	color: z.string().min(3, 'Please enter a valid color (min 3 characters)'),
	teams: z.object({ id: z.string(), name: z.string() }).array().optional()
});

export const eventTypesCreateSchemaValidator = zod(eventTypesCreateSchema);
