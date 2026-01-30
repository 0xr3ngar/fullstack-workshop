'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-8 relative">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-32 left-16 w-2 h-2 rounded-full bg-[#99FFE4] blur-[2px]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute top-48 right-24 w-3 h-3 rounded-full bg-[#FFC799] blur-[3px]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="absolute bottom-48 left-32 w-1.5 h-1.5 rounded-full bg-[#FFC799] blur-[2px]"
            />

            <div className="text-center max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#666] font-medium">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#444]" />
                        Presentation Studio
                        <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#444]" />
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight leading-[0.85] mb-8"
                >
                    <span className="block text-white">Create</span>
                    <span className="block animate-gradient bg-gradient-to-r from-[#99FFE4] via-[#FFC799] to-[#99FFE4] bg-[length:200%_auto] bg-clip-text text-transparent">
                        Beautiful
                    </span>
                    <span className="block text-[#444] italic">Presentations</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-[#666] max-w-lg mx-auto leading-relaxed mb-12"
                >
                    Craft stunning slides with markdown.
                    Simple, fast, and <span className="text-[#FFC799]">delightfully</span> minimal.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#99FFE4] transition-all hover:shadow-xl hover:shadow-[#99FFE4]/20 hover:scale-105"
                    >
                        Start Creating
                        <span className="text-lg">→</span>
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2 text-[#444]"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </motion.div>
        </section>
    )
}
