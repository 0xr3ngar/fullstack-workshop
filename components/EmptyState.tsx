export default function EmptyState() {
  return (
    <div className="animate-fade-up stagger-4 py-32 text-center">
      <div className="inline-block mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#282828] flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-[#FFF] mb-3">
        No presentations yet
      </h3>
      <p className="text-[#A0A0A0] max-w-sm mx-auto">
        Your canvas awaits. Create your first presentation and start telling your story.
      </p>
    </div>
  )
}
