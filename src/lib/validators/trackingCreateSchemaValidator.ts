import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const trackingCreateSchema = z.object({
	name: z.string().min(3, 'Please enter a valid tracking name (min. 3 characters)'),
	type: z.enum(['calendar_event']).default('calendar_event'),
});

export const trackingCreateSchemaValidator = zod(trackingCreateSchema);
