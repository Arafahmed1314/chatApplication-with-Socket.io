import React from "react";

export default function Loading() {
  // Create array of skeleton items
  const skeletonItems = Array(6).fill(0);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      {skeletonItems.map((_, index) => (
        <div key={index} className="px-6 space-x-4 flex py-3 animate-pulse">
          {/* Avatar Skeleton */}
          <div className="w-16 h-16 bg-slate-600/50 rounded-full flex-shrink-0"></div>

          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            {/* Name Skeleton */}
            <div className="h-5 bg-slate-600/50 rounded-md w-3/4"></div>
            {/* Email Skeleton */}
            <div className="h-4 bg-slate-600/30 rounded-md w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
