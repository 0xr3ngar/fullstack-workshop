'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface SlideRendererProps {
    content: string
    slideNumber: number
    totalSlides: number
}

export default function SlideRenderer({ content, slideNumber, totalSlides }: SlideRendererProps) {
    return (
        <motion.div
            key={slideNumber}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-center px-12 md:px-24 lg:px-32 py-16"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto w-full slide-content"
            >
                <ReactMarkdown
                    components={{
                        h1: ({ children }) => (
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[#FFF]">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-[#FFF]">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium mb-3 text-[#99FFE4]">
                                {children}
                            </h3>
                        ),
                        p: ({ children }) => (
                            <p className="text-base md:text-lg lg:text-xl text-[#A0A0A0] leading-relaxed mb-4">
                                {children}
                            </p>
                        ),
                        ul: ({ children }) => (
                            <ul className="space-y-2 list-disc list-inside text-base md:text-lg lg:text-xl text-[#A0A0A0] leading-relaxed mb-4">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="space-y-2 list-decimal list-inside text-base md:text-lg lg:text-xl text-[#A0A0A0] leading-relaxed mb-4">
                                {children}
                            </ol>
                        ),
                        li: ({ children }) => (
                            <li className="pl-2">{children}</li>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-[#FFC799] pl-4 py-1 my-4 text-base md:text-lg lg:text-xl italic text-[#A0A0A0]">
                                {children}
                            </blockquote>
                        ),
                        code: ({ children, className }) => {
                            const isBlock = className?.includes('language-')
                            if (isBlock) {
                                return (
                                    <code className="block text-sm md:text-base font-mono text-[#99FFE4]">
                                        {children}
                                    </code>
                                )
                            }
                            return (
                                <code className="bg-[#1C1C1C] px-1.5 py-0.5 rounded text-[#99FFE4] font-mono text-[0.9em]">
                                    {children}
                                </code>
                            )
                        },
                        pre: ({ children }) => (
                            <pre className="bg-[#0D0D0D] border border-[#282828] rounded-xl p-4 my-4 overflow-x-auto">
                                {children}
                            </pre>
                        ),
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="text-[#99FFE4] underline underline-offset-4 hover:text-[#FFC799] transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {children}
                            </a>
                        ),
                        strong: ({ children }) => (
                            <strong className="text-[#FFF] font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => (
                            <em className="italic text-[#FFC799]">{children}</em>
                        ),
                        hr: () => (
                            <hr className="border-none h-px bg-gradient-to-r from-transparent via-[#282828] to-transparent my-6" />
                        ),
                        img: ({ src, alt }) => (
                            <img
                                src={src}
                                alt={alt ?? ''}
                                className="max-h-64 rounded-xl my-4 mx-auto"
                            />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 right-8 flex items-center gap-2"
            >
                <span className="text-4xl font-bold text-[#99FFE4]">{slideNumber}</span>
                <span className="text-lg text-[#707070]">/ {totalSlides}</span>
            </motion.div>
        </motion.div>
    )
}
