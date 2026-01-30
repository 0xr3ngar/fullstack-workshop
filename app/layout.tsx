import './globals.css'
import { Instrument_Serif, DM_Sans } from 'next/font/google'
import Cursor from '@/components/Cursor'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://postgres-drizzle.vercel.app'),
    title: 'Vesper — Presentation Studio',
    description: 'Craft beautiful presentations with markdown-powered slides',
}

const instrumentSerif = Instrument_Serif({
    variable: '--font-display',
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})

const dmSans = DM_Sans({
    variable: '--font-body',
    subsets: ['latin'],
    display: 'swap',
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${instrumentSerif.variable} ${dmSans.variable} font-body`}>
                <Cursor />
                {children}
            </body>
        </html>
    )
}
