import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const eventTypesCreateSchema = z.object({
	title: z.string().min(3, 'Please enter a valid title (min 3 characters)'),
	color: z.string().min(3, 'Please enter a valid color (min 3 characters)'),
	collaborators: z.array(z.string()).optional()
});

export const eventTypesCreateSchemaValidator = zod(eventTypesCreateSchema);
