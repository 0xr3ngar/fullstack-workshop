import { getPresentations } from './actions'
import { HeroSection, PresentationsSection, EmptyState } from '@/components/home'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const { presentations, error } = await getPresentations()

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <div className="grain-overlay" />

            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(153,255,228,0.04)_0%,transparent_60%)] blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,199,153,0.03)_0%,transparent_60%)] blur-3xl pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(255,255,255,0.01)_0%,transparent_50%)] pointer-events-none" />

            <main className="relative z-10">
                {presentations.length === 0 ? (
                    <>
                        <HeroSection />
                        <EmptyState />
                    </>
                ) : (
                    <>
                        <HeroSection />
                        <PresentationsSection presentations={presentations} />
                    </>
                )}

                {error && (
                    <section className="px-8 md:px-16 lg:px-24 pb-24">
                        <div className="max-w-7xl mx-auto">
                            <div className="rounded-2xl border border-[#FF8080]/20 bg-[#FF8080]/5 p-12 text-center">
                                <p className="text-[#FF8080]">{error}</p>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}
