import PresentationCard from './PresentationCard'
import CreateNewCard from './CreateNewCard'

interface Presentation {
  id: number
  title: string
  icon: string | null
  picture: string | null
  createdAt: Date
}

interface PresentationGridProps {
  presentations: Presentation[]
}

export default function PresentationGrid({ presentations }: PresentationGridProps) {
  return (
    <section className="px-8 md:px-16 lg:px-24 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 border-b border-[#282828] pb-6 animate-fade-up stagger-3">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#707070] mb-2 block">
              Your Work
            </span>
            <h2 className="text-3xl font-bold text-[#FFF]">
              Presentations
              <span className="text-[#707070] ml-3 text-lg font-normal">
                ({presentations.length})
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presentations.map((presentation, index) => (
            <PresentationCard 
              key={presentation.id} 
              presentation={presentation} 
              index={index}
            />
          ))}
          <CreateNewCard index={presentations.length} />
        </div>
      </div>
    </section>
  )
}
