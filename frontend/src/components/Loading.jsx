function Loading({ message = "Loading..." }) {
  return (
    <div className="flex w-full flex-col items-center justify-center py-24 gap-4">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-2 border-t-indigo-600 animate-spin" />
      </div>
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="h-5 bg-slate-200 rounded-lg w-1/3" />
          <div className="h-3.5 bg-slate-100 rounded w-2/3" />
          <div className="h-3.5 bg-slate-100 rounded w-1/4" />
        </div>
        <div className="h-9 w-24 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}

export default Loading;