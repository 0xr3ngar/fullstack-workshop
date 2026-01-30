'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Plus } from 'lucide-react'

interface Presentation {
    id: number
    title: string
    icon: string | null
    picture: string | null
    createdAt: Date
}

interface PresentationsSectionProps {
    presentations: Presentation[]
}

function PresentationCard({ presentation, index }: { presentation: Presentation; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                href={`/presentation/${presentation.id}`}
                className="group block relative"
            >
                <div className="relative bg-[#111] border border-[#222] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#333] hover:bg-[#151515]">
                    <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111]">
                        {presentation.picture ? (
                            <Image
                                src={presentation.picture}
                                alt={presentation.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-7xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
                                    {presentation.icon ?? '📊'}
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="p-5">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#99FFE4] transition-colors duration-300 line-clamp-1 mb-1">
                            {presentation.title}
                        </h3>
                        <p className="text-sm text-[#555]">
                            {new Date(presentation.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#99FFE4] to-[#FFC799] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
            </Link>
        </motion.div>
    )
}

function NewPresentationCard({ index }: { index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link
                href="/new"
                className="group block relative h-full"
            >
                <div className="relative h-full min-h-[280px] bg-[#111] border border-dashed border-[#333] rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#FFC799] hover:bg-[#151515] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center mb-4 group-hover:border-[#FFC799] group-hover:bg-[#FFC799]/10 transition-all duration-300">
                        <Plus className="w-7 h-7 text-[#555] group-hover:text-[#FFC799] transition-colors group-hover:rotate-90 duration-300" />
                    </div>
                    <p className="text-sm font-medium text-[#555] group-hover:text-[#888] transition-colors">
                        New Presentation
                    </p>
                </div>
            </Link>
        </motion.div>
    )
}

export default function PresentationsSection({ presentations }: PresentationsSectionProps) {
    return (
        <section className="px-8 md:px-16 lg:px-24 pb-32">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-end justify-between mb-12 pb-6 border-b border-[#1a1a1a]"
                >
                    <div>
                        <span className="text-xs tracking-[0.2em] uppercase text-[#444] mb-2 block">
                            Your Work
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display text-white">
                            Presentations
                            <span className="text-[#333] ml-3 text-xl">
                                ({presentations.length})
                            </span>
                        </h2>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {presentations.map((presentation, index) => (
                        <PresentationCard
                            key={presentation.id}
                            presentation={presentation}
                            index={index}
                        />
                    ))}
                    <NewPresentationCard index={presentations.length} />
                </div>
            </div>
        </section>
    )
}
