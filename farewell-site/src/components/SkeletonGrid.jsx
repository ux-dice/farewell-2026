export default function SkeletonGrid({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton rounded-sm overflow-hidden"
          style={{
            paddingBottom: i % 3 === 1 ? '75%' : '66%',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}
