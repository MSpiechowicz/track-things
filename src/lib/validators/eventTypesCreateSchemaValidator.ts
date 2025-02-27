import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const eventTypesCreateSchema = z.object({
	//id: z.string().min(1, 'Please select a team'),
	title: z.string().min(1, 'Please enter a title'),
	color: z.string().min(1, 'Please enter a color'),
	collaborators: z.array(z.string()).optional(),
});

export const eventTypesCreateSchemaValidator = zod(eventTypesCreateSchema);
