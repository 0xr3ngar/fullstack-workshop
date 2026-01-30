import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'

interface Presentation {
  id: number
  title: string
  icon: string | null
  picture: string | null
  createdAt: Date
}

interface PresentationCardProps {
  presentation: Presentation
  index: number
}

export default function PresentationCard({ presentation, index }: PresentationCardProps) {
  const staggerClass = index < 5 ? `stagger-${index + 1}` : 'stagger-5'
  
  return (
    <Link
      href={`/presentation/${presentation.id}`}
      className={`group relative animate-fade-up ${staggerClass}`}
    >
      <div className="relative bg-[#1C1C1C] border border-[#282828] rounded-2xl overflow-hidden card-lift glow-border">
        <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-[#161616] to-[#101010]">
          {presentation.picture ? (
            <img 
              src={presentation.picture} 
              alt={presentation.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                {presentation.icon || '📊'}
              </span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-[#FFF] group-hover:text-[#FFC799] transition-colors duration-300 line-clamp-1">
              {presentation.title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-[#707070] group-hover:text-[#FFC799] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#707070]">
            <Clock className="w-3 h-3" />
            <span>
              {new Date(presentation.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#99FFE4] to-[#FFC799] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  )
}
