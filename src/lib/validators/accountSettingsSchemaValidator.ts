import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';

export const accountSettingsSchema = z.object({
	displayName: z.string().min(3, 'This field is required, and must be at least 3 characters long')
});

export const accountSettingsSchemaValidator = zod(accountSettingsSchema);
