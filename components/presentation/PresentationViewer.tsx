'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronLeft,
    ChevronRight,
    Home,
    Grid3X3
} from 'lucide-react'
import SlideRenderer from './SlideRenderer'
import type { Presentation, Slide } from '@/lib/drizzle'

interface PresentationViewerProps {
    presentation: Presentation
    slides: Slide[]
}

export default function PresentationViewer({ presentation, slides }: PresentationViewerProps) {
    const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [showControls, setShowControls] = useState(true)
    const [showOverview, setShowOverview] = useState(false)

    const totalSlides = slides.length
    const hasNextSlide = currentSlide < totalSlides - 1
    const hasPrevSlide = currentSlide > 0

    const goToNextSlide = useCallback(() => {
        if (!hasNextSlide) return
        setCurrentSlide(prev => prev + 1)
    }, [hasNextSlide])

    const goToPrevSlide = useCallback(() => {
        if (!hasPrevSlide) return
        setCurrentSlide(prev => prev - 1)
    }, [hasPrevSlide])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
        setShowOverview(false)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                case 'Enter':
                    e.preventDefault()
                    goToNextSlide()
                    break
                case 'ArrowLeft':
                case 'Backspace':
                    e.preventDefault()
                    goToPrevSlide()
                    break
                case 'Escape':
                    if (showOverview) {
                        setShowOverview(false)
                    } else {
                        router.push('/')
                    }
                    break
                case 'g':
                    setShowOverview(prev => !prev)
                    break
                case 'Home':
                    setCurrentSlide(0)
                    break
                case 'End':
                    setCurrentSlide(totalSlides - 1)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [goToNextSlide, goToPrevSlide, router, showOverview, totalSlides])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const handleMouseMove = () => {
            setShowControls(true)
            clearTimeout(timeout)
            timeout = setTimeout(() => setShowControls(false), 3000)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(timeout)
        }
    }, [])

    if (slides.length === 0) {
        return (
            <div className="min-h-screen bg-[#101010] flex items-center justify-center">
                <div className="text-center">
                    <span className="text-6xl mb-6 block">{presentation.icon ?? '📊'}</span>
                    <h1 className="text-3xl font-bold text-[#FFF] mb-4">{presentation.title}</h1>
                    <p className="text-[#707070]">This presentation has no slides yet.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#101010] relative overflow-hidden">
            <div className="grain-overlay" />

            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px]"
                    animate={{
                        opacity: [0.03, 0.06, 0.03],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, rgba(153,255,228,0.15) 0%, transparent 70%)' }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px]"
                    animate={{
                        opacity: [0.02, 0.05, 0.02],
                        scale: [1, 0.9, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    style={{ background: 'radial-gradient(circle, rgba(255,199,153,0.12) 0%, transparent 70%)' }}
                />
            </div>

            <AnimatePresence>
                {showControls && (
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <motion.button
                                    type="button"
                                    onClick={() => router.push('/')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-[#1C1C1C]/80 backdrop-blur-xl border border-[#282828] flex items-center justify-center text-[#A0A0A0] hover:text-[#FFF] hover:border-[#99FFE4] transition-all"
                                >
                                    <Home className="w-5 h-5" />
                                </motion.button>

                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{presentation.icon ?? '📊'}</span>
                                    <h1 className="text-lg font-medium text-[#FFF]">{presentation.title}</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <motion.button
                                    type="button"
                                    onClick={() => setShowOverview(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-[#1C1C1C]/80 backdrop-blur-xl border border-[#282828] flex items-center justify-center text-[#A0A0A0] hover:text-[#FFF] hover:border-[#FFC799] transition-all"
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.header>
                )}
            </AnimatePresence>

            <main className="relative z-10 min-h-screen">
                <AnimatePresence mode="wait">
                    <SlideRenderer
                        key={currentSlide}
                        content={slides[currentSlide]?.slideContent ?? ''}
                        slideNumber={currentSlide + 1}
                        totalSlides={totalSlides}
                    />
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {showControls && (
                    <>
                        <motion.button
                            type="button"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: hasPrevSlide ? 1 : 0.3, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={goToPrevSlide}
                            disabled={!hasPrevSlide}
                            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-2xl bg-[#1C1C1C]/80 backdrop-blur-xl border border-[#282828] flex items-center justify-center text-[#A0A0A0] hover:text-[#FFF] hover:border-[#99FFE4] hover:bg-[#1C1C1C] transition-all disabled:cursor-not-allowed disabled:hover:border-[#282828] disabled:hover:text-[#A0A0A0]"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            type="button"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: hasNextSlide ? 1 : 0.3, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onClick={goToNextSlide}
                            disabled={!hasNextSlide}
                            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-2xl bg-[#1C1C1C]/80 backdrop-blur-xl border border-[#282828] flex items-center justify-center text-[#A0A0A0] hover:text-[#FFF] hover:border-[#99FFE4] hover:bg-[#1C1C1C] transition-all disabled:cursor-not-allowed disabled:hover:border-[#282828] disabled:hover:text-[#A0A0A0]"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
                        >
                            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#1C1C1C]/80 backdrop-blur-xl border border-[#282828]">
                                {slides.map((_, index) => (
                                    <button
                                        type="button"
                                        key={slides[index].id}
                                        onClick={() => goToSlide(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? 'w-8 bg-[#99FFE4]'
                                            : 'w-2 bg-[#282828] hover:bg-[#404040]'
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showOverview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#101010]/95 backdrop-blur-xl flex items-center justify-center p-8"
                        onClick={() => setShowOverview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-6xl max-h-[80vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-[#FFF]">All Slides</h2>
                                <span className="text-sm text-[#707070]">Press G or ESC to close</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {slides.map((slide, index) => (
                                    <motion.button
                                        type="button"
                                        key={slide.id}
                                        onClick={() => goToSlide(index)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        whileHover={{ scale: 1.03 }}
                                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${index === currentSlide
                                            ? 'border-[#99FFE4] shadow-lg shadow-[#99FFE4]/20'
                                            : 'border-[#282828] hover:border-[#404040]'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-[#1C1C1C] p-4 overflow-hidden">
                                            <div className="text-left text-xs text-[#A0A0A0] line-clamp-4 leading-relaxed">
                                                {slide.slideContent.slice(0, 150)}...
                                            </div>
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-[#101010]/80 text-xs font-medium text-[#707070]">
                                            {index + 1}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-6 left-6 z-50 flex items-center gap-4 text-xs text-[#707070]"
                    >
                        <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 rounded bg-[#1C1C1C] border border-[#282828]">←</kbd>
                            <kbd className="px-2 py-1 rounded bg-[#1C1C1C] border border-[#282828]">→</kbd>
                            <span className="ml-1">Navigate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 rounded bg-[#1C1C1C] border border-[#282828]">G</kbd>
                            <span className="ml-1">Overview</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 rounded bg-[#1C1C1C] border border-[#282828]">ESC</kbd>
                            <span className="ml-1">Exit</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
