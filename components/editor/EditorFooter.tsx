'use client'

import { ChevronRight } from 'lucide-react'

interface EditorFooterProps {
    characterCount: number
    lineCount: number
    hasNextSlide: boolean
    onNextSlide: () => void
}

export default function EditorFooter({
    characterCount,
    lineCount,
    hasNextSlide,
    onNextSlide,
}: EditorFooterProps) {
    return (
        <div className="px-6 py-[19px] border-t border-[#282828] bg-[#0D0D0D]/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-xs text-[#707070]">
                    {characterCount} characters
                </span>
                <span className="text-xs text-[#707070]">
                    {lineCount} lines
                </span>
            </div>

            <div className="flex items-center gap-2">
                {hasNextSlide && (
                    <button
                        type="button"
                        onClick={onNextSlide}
                        className="flex items-center gap-1 text-xs text-[#707070] hover:text-[#FFF] transition-colors"
                    >
                        <span>Next slide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>
        </div>
    )
}
