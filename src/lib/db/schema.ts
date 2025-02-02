import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const profilesTable = pgTable('profiles', {
	id: uuid('id').primaryKey(),
  name: text('name').notNull(),
	email: text('email').notNull(),
	avatarUrl: text('avatar_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});
