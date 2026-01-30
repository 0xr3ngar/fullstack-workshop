'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Save, Layers } from 'lucide-react'
import IconPicker from './IconPicker'
import { TITLE_PLACEHOLDER } from './constants'

interface EditorPageHeaderProps {
    title: string
    onTitleChange: (title: string) => void
    selectedIcon: string
    onSelectIcon: (icon: string) => void
    showIconPicker: boolean
    onToggleIconPicker: () => void
    onCloseIconPicker: () => void
    slideCount: number
    isSubmitting: boolean
    canSubmit: boolean
    onSubmit: () => void
    onBack: () => void
}

export default function EditorPageHeader({
    title,
    onTitleChange,
    selectedIcon,
    onSelectIcon,
    showIconPicker,
    onToggleIconPicker,
    onCloseIconPicker,
    slideCount,
    isSubmitting,
    canSubmit,
    onSubmit,
    onBack,
}: EditorPageHeaderProps) {
    return (
        <motion.header
            className="relative z-20 px-6 py-4 border-b border-[#282828] bg-[#101010]/80 backdrop-blur-xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <motion.button
                        type="button"
                        onClick={onBack}
                        className="shrink-0 w-10 h-10 rounded-xl border border-[#282828] flex items-center justify-center text-[#A0A0A0] hover:text-[#FFF] hover:border-[#99FFE4] hover:bg-[rgba(153,255,228,0.05)] transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </motion.button>

                    <IconPicker
                        selectedIcon={selectedIcon}
                        onSelectIcon={onSelectIcon}
                        isOpen={showIconPicker}
                        onToggle={onToggleIconPicker}
                        onClose={onCloseIconPicker}
                    />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder={TITLE_PLACEHOLDER}
                        className="flex-1 min-w-0 bg-transparent text-xl font-semibold text-[#FFF] placeholder:text-[#404040] focus:outline-none"
                    />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C1C1C] border border-[#282828]">
                        <Layers className="w-4 h-4 text-[#707070]" />
                        <span className="text-sm text-[#A0A0A0]">
                            {slideCount} slide{slideCount !== 1 ? 's' : ''}
                        </span>
                    </div>

                    <motion.button
                        type="button"
                        onClick={onSubmit}
                        disabled={isSubmitting || !canSubmit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${!canSubmit
                                ? 'bg-[#282828] text-[#707070] cursor-not-allowed'
                                : 'bg-[#FFC799] text-[#000] hover:bg-[#FFCFA8] shadow-lg hover:shadow-[rgba(255,199,153,0.3)]'
                            }`}
                    >
                        {isSubmitting ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-[#000] border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </motion.header>
    )
}
