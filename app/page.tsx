import { getPresentations } from './actions'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PresentationGrid from '@/components/PresentationGrid'
import EmptyState from '@/components/EmptyState'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const { presentations, error } = await getPresentations()

  return (
    <div className="min-h-screen animated-gradient">
      <div className="grain-overlay" />
      <div className="scanlines fixed inset-0 pointer-events-none z-10" />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(153,255,228,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(255,199,153,0.06)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <main className="relative z-20">
        <Header />
        
        {presentations.length === 0 ? (
          <>
            <Hero />
            <section className="px-8 md:px-16 lg:px-24 pb-24">
              <div className="max-w-7xl mx-auto">
                <EmptyState />
              </div>
            </section>
          </>
        ) : (
          <PresentationGrid presentations={presentations} />
        )}

        {error && (
          <section className="px-8 md:px-16 lg:px-24 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="rounded-2xl border border-[#FF8080]/20 bg-[#FF8080]/5 p-12 text-center animate-fade-up">
                <p className="text-[#FF8080]">{error}</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
