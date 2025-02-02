import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const profilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
