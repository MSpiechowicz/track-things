import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const profilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
}).enableRLS();

export const profileSettingsTable = pgTable('profile_settings', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	displayName: text('display_name'),
	hideEmail: boolean('hide_email').default(false),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();
