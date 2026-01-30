import Link from 'next/link'
import { Plus } from 'lucide-react'

export default function Header() {
    return (
        <header className="px-8 py-6 md:px-16 lg:px-24 border-b border-[#282828]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-[#FFC799] flex items-center justify-center">
                        <span className="text-[#000] font-bold text-sm">V</span>
                    </div>
                    <span className="text-lg font-semibold text-[#FFF]">Vesper</span>
                </Link>

                <Link
                    href="/new"
                    className="group flex items-center gap-2 rounded-lg bg-[#FFC799] px-4 py-2 text-sm font-medium text-[#000] transition-all hover:bg-[#FFCFA8] hover:shadow-lg hover:shadow-[rgba(255,199,153,0.3)]"
                >
                    <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                    New Presentation
                </Link>
            </div>
        </header>
    )
}
