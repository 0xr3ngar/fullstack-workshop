'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    EditorPageHeader,
    SlidesPanel,
    SlideEditor,
    DEFAULT_ICON,
    DEFAULT_SLIDE_CONTENT,
    NEW_SLIDE_CONTENT,
    Slide,
} from '@/components/editor'
import { createPresentation } from '../actions'

export default function NewPresentation() {
    const router = useRouter()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [title, setTitle] = useState('')
    const [selectedIcon, setSelectedIcon] = useState(DEFAULT_ICON)
    const [slides, setSlides] = useState<Slide[]>([
        { id: '1', content: DEFAULT_SLIDE_CONTENT },
    ])
    const [activeSlideId, setActiveSlideId] = useState('1')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showIconPicker, setShowIconPicker] = useState(false)

    const activeSlide = slides.find((s) => s.id === activeSlideId)
    const activeSlideIndex = slides.findIndex((s) => s.id === activeSlideId)
    const hasNextSlide = activeSlideIndex < slides.length - 1
    const canSubmit = title.trim().length > 0

    useEffect(() => {
        textareaRef.current?.focus()
    }, [activeSlideId])

    const addSlide = () => {
        const newSlide: Slide = {
            id: Date.now().toString(),
            content: NEW_SLIDE_CONTENT,
        }
        setSlides([...slides, newSlide])
        setActiveSlideId(newSlide.id)
    }

    const deleteSlide = (id: string) => {
        if (slides.length === 1) return

        const newSlides = slides.filter((s) => s.id !== id)
        setSlides(newSlides)

        if (activeSlideId === id) {
            setActiveSlideId(newSlides[0].id)
        }
    }

    const updateSlideContent = (content: string) => {
        setSlides(
            slides.map((s) => (s.id === activeSlideId ? { ...s, content } : s))
        )
    }

    const handleNextSlide = () => {
        if (!hasNextSlide) return
        setActiveSlideId(slides[activeSlideIndex + 1].id)
    }

    const handleSubmit = async () => {
        if (!canSubmit) return

        setIsSubmitting(true)
        try {
            const result = await createPresentation(
                title.trim(),
                selectedIcon,
                slides.map((s) => ({ content: s.content }))
            )
            if (result.success && result.presentation) {
                router.push('/')
            }
        } catch (error) {
            console.error('Failed to create presentation:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleBack = () => {
        router.push('/')
    }

    return (
        <motion.div
            className="min-h-screen bg-[#101010] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="grain-overlay" />

            <EditorPageHeader
                title={title}
                onTitleChange={setTitle}
                selectedIcon={selectedIcon}
                onSelectIcon={setSelectedIcon}
                showIconPicker={showIconPicker}
                onToggleIconPicker={() => setShowIconPicker(!showIconPicker)}
                onCloseIconPicker={() => setShowIconPicker(false)}
                slideCount={slides.length}
                isSubmitting={isSubmitting}
                canSubmit={canSubmit}
                onSubmit={handleSubmit}
                onBack={handleBack}
            />

            <div className="flex-1 flex overflow-hidden">
                <SlidesPanel
                    slides={slides}
                    activeSlideId={activeSlideId}
                    onReorder={setSlides}
                    onSelectSlide={setActiveSlideId}
                    onAddSlide={addSlide}
                    onDeleteSlide={deleteSlide}
                />

                <SlideEditor
                    ref={textareaRef}
                    content={activeSlide?.content ?? ''}
                    onContentChange={updateSlideContent}
                    currentSlide={activeSlideIndex + 1}
                    totalSlides={slides.length}
                    hasNextSlide={hasNextSlide}
                    onNextSlide={handleNextSlide}
                />
            </div>
        </motion.div>
    )
}
