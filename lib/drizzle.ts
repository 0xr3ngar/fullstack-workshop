import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    integer,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: process.env.NODE_ENV === 'production' ? 'require' : false,
})

export const UsersTable = pgTable(
    'profiles',
    {
        id: serial('id').primaryKey(),
        name: text('name').notNull(),
        email: text('email').notNull(),
        image: text('image').notNull(),
        createdAt: timestamp('createdAt').defaultNow().notNull(),
    },
    (users) => {
        return {
            uniqueIdx: uniqueIndex('unique_idx').on(users.email),
        }
    }
)

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable>

export const PresentationsTable = pgTable('presentations', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    icon: text('icon'),
    picture: text('picture'),
})

export type Presentation = InferSelectModel<typeof PresentationsTable>
export type NewPresentation = InferInsertModel<typeof PresentationsTable>

export const SlidesTable = pgTable('slides', {
    id: serial('id').primaryKey(),
    presentationId: integer('presentationId')
        .notNull()
        .references(() => PresentationsTable.id, { onDelete: 'cascade' }),
    slideContent: text('slideContent').notNull(),
})

export type Slide = InferSelectModel<typeof SlidesTable>
export type NewSlide = InferInsertModel<typeof SlidesTable>

// Connect to  Postgres
export const db = drizzle(sql)
