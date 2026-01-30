import { notFound } from 'next/navigation'
import { getPresentation } from '@/app/actions'
import PresentationViewer from '@/components/presentation/PresentationViewer'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function PresentationPage({ params }: PageProps) {
    const { id } = await params
    const presentationId = parseInt(id, 10)

    if (isNaN(presentationId)) {
        notFound()
    }

    const { presentation, slides, error } = await getPresentation(presentationId)

    if (error || !presentation) {
        notFound()
    }

    return (
        <PresentationViewer
            presentation={presentation}
            slides={slides ?? []}
        />
    )
}
