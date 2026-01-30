'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PRESET_ICONS, CUSTOM_EMOJI_PLACEHOLDER } from './constants'

interface IconPickerProps {
  selectedIcon: string
  onSelectIcon: (icon: string) => void
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export default function IconPicker({
  selectedIcon,
  onSelectIcon,
  isOpen,
  onToggle,
  onClose,
}: IconPickerProps) {
  const handleIconSelect = (icon: string) => {
    onSelectIcon(icon)
    onClose()
  }

  const handleCustomEmojiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (!value) return
    onSelectIcon(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    onClose()
  }

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-10 h-10 rounded-xl bg-[#1C1C1C] border border-[#282828] flex items-center justify-center text-2xl hover:border-[#FFC799] transition-all duration-300"
      >
        {selectedIcon}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-0 mt-2 p-3 bg-[#1C1C1C] border border-[#282828] rounded-xl shadow-2xl z-50 w-[200px]"
          >
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_ICONS.map((icon) => (
                <button
                  type="button"
                  key={icon}
                  onClick={() => handleIconSelect(icon)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200 ${
                    selectedIcon === icon
                      ? 'bg-[#FFC799]/20 border border-[#FFC799]'
                      : 'hover:bg-[#282828] border border-transparent'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="border-t border-[#282828] pt-3">
              <span className="text-[10px] uppercase tracking-wider text-[#707070] mb-2 block">
                Custom emoji
              </span>
              <input
                type="text"
                placeholder={CUSTOM_EMOJI_PLACEHOLDER}
                maxLength={2}
                className="w-full px-3 py-2 bg-[#161616] border border-[#282828] rounded-lg text-center text-xl focus:outline-none focus:border-[#FFC799] transition-colors"
                onChange={handleCustomEmojiChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
