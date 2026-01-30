'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                <motion.div
                    className="fixed inset-0 bg-[#101010] z-[100] pointer-events-none"
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                    style={{ transformOrigin: 'top' }}
                />
                <motion.div
                    className="fixed inset-0 bg-gradient-to-b from-[#99FFE4]/10 to-transparent z-[99] pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                />
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
