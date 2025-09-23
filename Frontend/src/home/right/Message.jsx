import React from "react";

export default function Message() {
  return (
    <div className="px-6 py-3">
      <div className="chat chat-start">
        <div className="chat-bubble chat-bubble-primary text-sm md:text-base">
          What kind of nonsense is this
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble chat-bubble-accent text-sm md:text-base">
          That's never been done in the history of the Jedi.
        </div>
      </div>
    </div>
  );
}
