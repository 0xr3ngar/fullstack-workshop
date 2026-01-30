'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, Zap, Palette } from 'lucide-react'

const features = [
    {
        icon: Sparkles,
        title: 'Markdown Powered',
        description: 'Write slides in simple markdown syntax',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'No bloat, just pure presentation flow',
    },
    {
        icon: Palette,
        title: 'Beautiful by Default',
        description: 'Stunning dark theme out of the box',
    },
]

export default function EmptyState() {
    return (
        <section className="px-8 md:px-16 lg:px-24 pb-32">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 mx-auto rounded-full border border-dashed border-[#333] flex items-center justify-center mb-6">
                        <span className="text-5xl">✨</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display text-white mb-3">
                        Your canvas awaits
                    </h2>
                    <p className="text-[#555] max-w-md mx-auto">
                        Create your first presentation and start telling your story.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <Link
                        href="/new"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFC799] text-black font-semibold rounded-full hover:bg-[#FFCFA8] transition-all hover:shadow-xl hover:shadow-[#FFC799]/20 hover:scale-105"
                    >
                        Create First Presentation
                        <span className="text-lg">→</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                            className="p-6 rounded-2xl border border-[#1a1a1a] bg-[#0D0D0D]"
                        >
                            <feature.icon className="w-6 h-6 text-[#99FFE4] mb-3 mx-auto" />
                            <h3 className="text-sm font-semibold text-white mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-[#555]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
