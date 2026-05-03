import React from 'react'

function Loading() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Header section skeleton */}
      <div className="space-y-3">
        <div className="h-10 bg-slate-200 rounded-xl w-64"></div>
        <div className="h-5 bg-slate-100 rounded-lg w-96"></div>
      </div>

      {/* Grid section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
            <div className="h-6 bg-slate-200 rounded-lg w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Large content area skeleton */}
      <div className="h-64 bg-slate-50 border border-slate-200 rounded-2xl w-full"></div>
    </div>
  )
}

export default Loading