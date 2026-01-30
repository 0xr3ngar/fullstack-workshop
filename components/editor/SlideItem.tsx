'use client'

import { motion, Reorder } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Slide } from './types'
import { EMPTY_SLIDE_LABEL } from './constants'

interface SlideItemProps {
  slide: Slide
  index: number
  isActive: boolean
  canDelete: boolean
  onSelect: () => void
  onDelete: () => void
}

function getSlideTitle(content: string): string {
  const firstLine = content.split('\n')[0]
  const title = firstLine.replace(/^#+ /, '')
  return title || EMPTY_SLIDE_LABEL
}

export default function SlideItem({
  slide,
  index,
  isActive,
  canDelete,
  onSelect,
  onDelete,
}: SlideItemProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete()
  }

  return (
    <Reorder.Item
      value={slide}
      className="cursor-grab active:cursor-grabbing"
    >
      <motion.div
        onClick={onSelect}
        className={`group rounded-xl transition-all duration-300 ${
          isActive
            ? 'bg-[#1C1C1C] border border-[#99FFE4] shadow-lg shadow-[#99FFE4]/20'
            : 'bg-[#161616] border border-transparent hover:border-[#282828]'
        }`}
        whileHover={{ scale: 1.02 }}
        layout
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <span
            className={`text-sm font-medium shrink-0 ${
              isActive ? 'text-[#99FFE4]' : 'text-[#707070]'
            }`}
          >
            {index + 1}
          </span>

          <p
            className={`flex-1 min-w-0 text-sm truncate ${
              isActive ? 'text-[#FFF]' : 'text-[#A0A0A0]'
            }`}
          >
            {getSlideTitle(slide.content)}
          </p>

          {canDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-[#707070] hover:text-[#FF8080] hover:bg-[#FF8080]/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </Reorder.Item>
  )
}
