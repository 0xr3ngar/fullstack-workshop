import { Plus, ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="px-8 py-20 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#99FFE4]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#A0A0A0] font-medium">
                Presentation Studio
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              <span className="block text-[#FFF]">Create</span>
              <span className="block">
                <span className="mint-gradient">Stories</span>
              </span>
              <span className="block text-[#707070] italic font-light">
                That Matter
              </span>
            </h1>
            
            <p className="text-lg text-[#A0A0A0] max-w-md leading-relaxed">
              Craft beautiful presentations with markdown-powered slides. 
              <span className="text-[#FFC799]"> Peppermint & orange</span> flavored.
            </p>
          </div>

          <div className="lg:col-span-5 animate-fade-up stagger-2">
            <div className="relative">
              <div className="absolute -inset-4 border border-[#282828] rounded-2xl" />
              <div className="absolute -inset-8 border border-[#282828] rounded-3xl opacity-50" />
              
              <button 
                type="button"
                className="group relative w-full bg-[#1C1C1C] hover:bg-[#232323] border border-[#282828] hover:border-[#FFC799] rounded-xl p-8 transition-all duration-500 card-lift orange-glow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFC799] flex items-center justify-center">
                      <Plus className="w-6 h-6 text-[#000]" />
                    </div>
                    <span className="text-sm font-medium tracking-wide uppercase text-[#A0A0A0]">
                      New Project
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#707070] group-hover:text-[#FFC799] transition-colors" />
                </div>
                <p className="text-2xl font-semibold text-[#FFF]">
                  Start Creating
                </p>
                <p className="text-sm text-[#A0A0A0] mt-2">
                  Begin your next presentation
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
