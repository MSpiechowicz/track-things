import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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

export const projectsTable = pgTable('projects', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const projectCollaboratorsTable = pgTable('project_collaborators', {
	id: uuid('id').primaryKey().defaultRandom(),
	projectId: uuid('project_id')
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	email: text('email').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();
