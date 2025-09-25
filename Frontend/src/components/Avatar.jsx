import React from "react";

export default function Avatar({
  name,
  size = "md",
  isOnline = false,
  showOnlineIndicator = false,
  className = "",
}) {
  // Get first letter of name
  const firstLetter = name?.charAt(0)?.toUpperCase() || "?";

  // Generate consistent color based on name
  const getAvatarColor = (name) => {
    if (!name) return "from-gray-500 to-gray-600";

    const colors = [
      "from-red-500 to-red-600",
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-yellow-500 to-yellow-600",
      "from-teal-500 to-teal-600",
      "from-orange-500 to-orange-600",
      "from-cyan-500 to-cyan-600",
    ];

    // Use name length and first char code to pick consistent color
    const hash = name.length + name.charCodeAt(0);
    return colors[hash % colors.length];
  };

  // Size classes
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const indicatorSizes = {
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-4 h-4",
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
        ${sizeClasses[size]}
        rounded-full
        bg-gradient-to-br ${getAvatarColor(name)}
        flex items-center justify-center
        text-white font-bold
        shadow-lg
        ring-2 ring-slate-600/50
        transition-all duration-300
        hover:ring-blue-400/50
        hover:shadow-xl
      `}
      >
        {firstLetter}
      </div>

      {showOnlineIndicator && (
        <div
          className={`
          absolute -bottom-0.5 -right-0.5
          ${indicatorSizes[size]}
          rounded-full border-2 border-slate-800
          transition-all duration-300
          ${
            isOnline
              ? "bg-green-500 shadow-lg shadow-green-500/50"
              : "bg-gray-500"
          }
        `}
        >
          {isOnline && (
            <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
      )}
    </div>
  );
}
