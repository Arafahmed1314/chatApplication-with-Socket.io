import React from "react";

export default function MessageSkeleton() {
  // Create array of skeleton messages with random patterns
  const skeletonMessages = Array(8).fill(0);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-4">
      {skeletonMessages.map((_, index) => (
        <div key={index} className="px-6 py-3 animate-pulse">
          {/* Alternate between sent and received messages */}
          {index % 3 === 0 ? (
            // Received message (left side)
            <div className="chat chat-start">
              <div className="chat-bubble bg-slate-600/30 border-none">
                <div className="h-4 bg-slate-500/50 rounded w-32 md:w-48"></div>
              </div>
            </div>
          ) : index % 3 === 1 ? (
            // Sent message (right side)
            <div className="chat chat-end">
              <div className="chat-bubble bg-slate-600/30 border-none">
                <div className="h-4 bg-slate-500/50 rounded w-24 md:w-36"></div>
              </div>
            </div>
          ) : (
            // Longer received message
            <div className="chat chat-start">
              <div className="chat-bubble bg-slate-600/30 border-none space-y-2">
                <div className="h-4 bg-slate-500/50 rounded w-40 md:w-56"></div>
                <div className="h-4 bg-slate-500/50 rounded w-28 md:w-40"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
