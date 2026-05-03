export function SkeletonCard({ className = '' }) {
  return (
    <div className={`skeleton rounded-lg ${className}`} />
  );
}

export function SkeletonGallery({ count = 9 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard
          key={i}
          className="aspect-square"
        />
      ))}
    </div>
  );
}

export function SkeletonVideoCard() {
  return (
    <div className="rounded-xl overflow-hidden glass p-4 space-y-3">
      <SkeletonCard className="aspect-video" />
      <SkeletonCard className="h-4 w-3/4" />
      <SkeletonCard className="h-3 w-1/2" />
    </div>
  );
}
