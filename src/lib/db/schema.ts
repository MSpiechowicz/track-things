import { boolean, date, pgTable, text, timestamp, uuid, integer } from 'drizzle-orm/pg-core';

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

export const trackingTable = pgTable('tracking', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	name: text('name').notNull(),
	type: text('type').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const trackingRecentTable = pgTable('tracking_recent', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	trackingId: uuid('tracking_id')
		.references(() => trackingTable.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const trackingCollaboratorsTable = pgTable('tracking_collaborators', {
	id: uuid('id').primaryKey().defaultRandom(),
	trackingId: uuid('tracking_id')
		.references(() => trackingTable.id, { onDelete: 'cascade' })
		.notNull(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	emails: text('emails').array().notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const trackingCalendarEventsTable = pgTable('tracking_calendar_events', {
	id: uuid('id').primaryKey().defaultRandom(),
	trackingId: uuid('tracking_id')
		.references(() => trackingTable.id, { onDelete: 'cascade' })
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

export const teamSettingsTable = pgTable('team_settings', {
	id: uuid('id').primaryKey().defaultRandom(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	name: text('name').notNull(),
	trackingIds: uuid('tracking_ids').array(),
	members: integer('members').notNull().default(0),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();

export const teamMembersTable = pgTable('team_members', {
	id: uuid('id').primaryKey().defaultRandom(),
	teamId: uuid('team_id')
		.references(() => teamSettingsTable.id, { onDelete: 'cascade' })
		.notNull(),
	profileId: uuid('profile_id')
		.references(() => profilesTable.id, { onDelete: 'cascade' })
		.notNull(),
	name: text('name'),
	email: text('email').notNull(),
	permissions: text('permissions').notNull().default('edit'),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
}).enableRLS();
