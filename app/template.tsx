'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TemplateProps {
    children: ReactNode
}

export default function Template({ children }: TemplateProps) {
    return (
        <>
            <motion.div
                className="fixed inset-0 bg-[#101010] z-[100] pointer-events-none origin-bottom"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                }}
            />

            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#99FFE4] to-transparent z-[101] pointer-events-none"
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{ scaleX: 1, opacity: 0 }}
                transition={{
                    scaleX: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                    opacity: { duration: 0.3, delay: 0.5 },
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {children}
            </motion.div>
        </>
    )
}
