import { boolean, date, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const profilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
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

export const projectsRecentTable = pgTable('projects_recent', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	projectId: uuid('project_id')
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull(),
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
	emails: text('emails').array().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const projectCalendarEventsTable = pgTable('project_calendar_events', {
	id: uuid('id').primaryKey().defaultRandom(),
	projectId: uuid('project_id')
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull(),
	eventName: text('event_name').notNull(),
	eventType: text('event_type').notNull(),
	eventColor: text('event_color').notNull(),
	eventDescription: text('event_description'),
	startDate: date('start_date').notNull(),
	endDate: date('end_date').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();
