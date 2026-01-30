'use server'

import { db, PresentationsTable, SlidesTable, Presentation, Slide } from '@/lib/drizzle'
import { desc, eq } from 'drizzle-orm'

export async function getPresentations() {
    try {
        const presentations = await db
            .select()
            .from(PresentationsTable)
            .orderBy(desc(PresentationsTable.createdAt))

        return { presentations, error: null }
    } catch (error) {
        console.error('Error fetching presentations:', error)
        return { presentations: [], error: 'Failed to fetch presentations' }
    }
}

export interface SlideInput {
    content: string
}

export async function createPresentation(
    title: string,
    icon: string,
    slides: SlideInput[]
): Promise<{ success: boolean; presentation?: Presentation; error?: string }> {
    try {
        const [presentation] = await db
            .insert(PresentationsTable)
            .values({
                title,
                icon,
            })
            .returning()

        if (slides.length > 0) {
            await db.insert(SlidesTable).values(
                slides.map((slide) => ({
                    presentationId: presentation.id,
                    slideContent: slide.content,
                }))
            )
        }

        return { success: true, presentation }
    } catch (error) {
        console.error('Error creating presentation:', error)
        return { success: false, error: 'Failed to create presentation' }
    }
}

export async function getPresentation(id: number): Promise<{
    presentation?: Presentation;
    slides?: Slide[];
    error?: string
}> {
    try {
        const [presentation] = await db
            .select()
            .from(PresentationsTable)
            .where(eq(PresentationsTable.id, id))

        if (!presentation) {
            return { error: 'Presentation not found' }
        }

        const slides = await db
            .select()
            .from(SlidesTable)
            .where(eq(SlidesTable.presentationId, id))

        return { presentation, slides }
    } catch (error) {
        console.error('Error fetching presentation:', error)
        return { error: 'Failed to fetch presentation' }
    }
}
