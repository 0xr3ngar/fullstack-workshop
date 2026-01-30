'use client'

import { FileText } from 'lucide-react'

interface EditorHeaderProps {
    currentSlide: number
    totalSlides: number
}

export default function EditorHeader({
    currentSlide,
    totalSlides,
}: EditorHeaderProps) {
    return (
        <div className="px-6 py-3 border-b border-[#282828] bg-[#0D0D0D]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[#707070]" />
                <span className="text-sm text-[#A0A0A0]">
                    Slide {currentSlide} of {totalSlides}
                </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#707070]">
                <span>Markdown supported</span>
            </div>
        </div>
    )
}
