export default function LetterboxdThumbnail({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#1a1a1a]${compact ? '' : ' rounded-card'}`}
      style={{ aspectRatio: compact ? '16 / 9' : '1024 / 642' }}
    >
      {/* Overlapping circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex">
          <div className={`rounded-full bg-orange-500 opacity-90${compact ? ' h-14 w-14' : ' h-24 w-24'}`} style={{ marginLeft: 0 }} />
          <div className={`rounded-full bg-green-500 opacity-90 -ml-5${compact ? ' h-14 w-14' : ' h-24 w-24'}`} />
          <div className={`rounded-full bg-sky-400 opacity-90 -ml-5${compact ? ' h-14 w-14' : ' h-24 w-24'}`} />
        </div>
      </div>

      {/* Film strip */}
      <div className={`absolute inset-x-0 bottom-0 flex gap-2 overflow-hidden px-2 pb-2 opacity-20${compact ? ' h-8' : ' h-12'}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-full flex-1 rounded bg-white/30" />
        ))}
      </div>
    </div>
  )
}
