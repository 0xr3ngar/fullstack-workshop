'use server'

import { db, PresentationsTable } from '@/lib/drizzle'
import { desc } from 'drizzle-orm'

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
