'use client'

import { motion, Reorder } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Slide } from './types'
import SlideItem from './SlideItem'

interface SlidesPanelProps {
    slides: Slide[]
    activeSlideId: string
    onReorder: (slides: Slide[]) => void
    onSelectSlide: (id: string) => void
    onAddSlide: () => void
    onDeleteSlide: (id: string) => void
}

export default function SlidesPanel({
    slides,
    activeSlideId,
    onReorder,
    onSelectSlide,
    onAddSlide,
    onDeleteSlide,
}: SlidesPanelProps) {
    const canDeleteSlides = slides.length > 1

    return (
        <motion.aside
            className="w-64 border-r border-[#282828] bg-[#0D0D0D] flex flex-col"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <div className="p-2 border-b border-[#282828]">
                <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#707070] font-medium pl-2">
                        Slides
                    </span>
                    <motion.button
                        type="button"
                        onClick={onAddSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-7 h-7 rounded-lg bg-[#99FFE4] flex items-center justify-center text-[#000] hover:bg-[#7EECD0] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <Reorder.Group
                    axis="y"
                    values={slides}
                    onReorder={onReorder}
                    className="space-y-2"
                >
                    {slides.map((slide, index) => (
                        <SlideItem
                            key={slide.id}
                            slide={slide}
                            index={index}
                            isActive={activeSlideId === slide.id}
                            canDelete={canDeleteSlides}
                            onSelect={() => onSelectSlide(slide.id)}
                            onDelete={() => onDeleteSlide(slide.id)}
                        />
                    ))}
                </Reorder.Group>
            </div>

            <div className="p-3 border-t border-[#282828]">
                <motion.button
                    type="button"
                    onClick={onAddSlide}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-1 rounded-xl border border-dashed border-[#282828] text-[#707070] hover:border-[#99FFE4] hover:text-[#99FFE4] hover:bg-[#99FFE4]/5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm">Add Slide</span>
                </motion.button>
            </div>
        </motion.aside>
    )
}
