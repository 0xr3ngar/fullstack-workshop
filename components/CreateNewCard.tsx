import { Plus } from 'lucide-react'

interface CreateNewCardProps {
  index: number
}

export default function CreateNewCard({ index }: CreateNewCardProps) {
  const staggerClass = index < 5 ? `stagger-${index + 1}` : 'stagger-5'
  
  return (
    <button 
      type="button"
      className={`group relative animate-fade-up ${staggerClass} h-full min-h-[280px]`}
    >
      <div className="h-full border-2 border-dashed border-[#282828] rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-[#FFC799] hover:bg-[#1C1C1C]/50">
        <div className="w-16 h-16 rounded-full border border-[#282828] flex items-center justify-center transition-all duration-500 group-hover:border-[#FFC799] group-hover:bg-[rgba(255,199,153,0.15)]">
          <Plus className="w-8 h-8 text-[#707070] group-hover:text-[#FFC799] transition-colors" />
        </div>
        <span className="text-sm font-medium text-[#707070] group-hover:text-[#FFF] transition-colors">
          Create New
        </span>
      </div>
    </button>
  )
}
