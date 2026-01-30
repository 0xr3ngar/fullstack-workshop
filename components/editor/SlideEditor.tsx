'use client'

import { RefObject } from 'react'
import { motion } from 'framer-motion'
import EditorHeader from './EditorHeader'
import EditorFooter from './EditorFooter'
import { EDITOR_PLACEHOLDER } from './constants'

interface SlideEditorProps {
    content: string
    onContentChange: (content: string) => void
    currentSlide: number
    totalSlides: number
    hasNextSlide: boolean
    onNextSlide: () => void
    ref?: RefObject<HTMLTextAreaElement | null>
}

export default function SlideEditor({
    content,
    onContentChange,
    currentSlide,
    totalSlides,
    hasNextSlide,
    onNextSlide,
    ref,
}: SlideEditorProps) {
    const characterCount = content.length
    const lineCount = content.split('\n').length

    return (
        <motion.main
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <EditorHeader currentSlide={currentSlide} totalSlides={totalSlides} />

            <div className="flex-1 relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(153,255,228,0.03)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,199,153,0.02)_0%,transparent_70%)] pointer-events-none" />

                <textarea
                    ref={ref}
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    id="slide-editor"
                    placeholder={EDITOR_PLACEHOLDER}
                    className="w-full h-full p-8 bg-transparent text-[#FFF] placeholder:text-[#404040] resize-none focus:outline-none text-lg leading-relaxed font-mono"
                    spellCheck={false}
                />
            </div>

            <EditorFooter
                characterCount={characterCount}
                lineCount={lineCount}
                hasNextSlide={hasNextSlide}
                onNextSlide={onNextSlide}
            />
        </motion.main>
    )
}
