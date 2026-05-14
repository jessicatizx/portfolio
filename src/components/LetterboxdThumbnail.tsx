export default function LetterboxdThumbnail() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-card bg-[#1a1a1a]"
      style={{ aspectRatio: '1024 / 642' }}
    >
      {/* Overlapping circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex">
          <div className="h-24 w-24 rounded-full bg-orange-500 opacity-90" style={{ marginLeft: 0 }} />
          <div className="h-24 w-24 rounded-full bg-green-500 opacity-90 -ml-5" />
          <div className="h-24 w-24 rounded-full bg-sky-400 opacity-90 -ml-5" />
        </div>
      </div>

      {/* Film strip */}
      <div className="absolute inset-x-0 bottom-0 flex h-12 gap-2 overflow-hidden px-2 pb-2 opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-full flex-1 rounded bg-white/30" />
        ))}
      </div>
    </div>
  )
}
