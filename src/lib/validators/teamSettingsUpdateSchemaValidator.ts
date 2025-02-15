import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

export const teamSettingsUpdateSchema = z.object({
	name: z.string().min(3, 'This field is required, and must be at least 3 characters long'),
	id: z.string().min(1, 'This field is required'),
  emails: z.array(z.string().email()).optional(),
});

export const teamSettingsUpdateSchemaValidator = zod(teamSettingsUpdateSchema);
