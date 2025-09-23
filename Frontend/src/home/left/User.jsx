import React from "react";

export default function User() {
  return (
    <div>
      <div className="px-6 space-x-4 hover:bg-slate-600 duration-500   flex py-3">
        <div className="avatar avatar-online">
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div>
          {" "}
          <h1 className="font-bold">araf ahmed</h1>
          <span>araf@gmail.com</span>
        </div>
      </div>
    </div>
  );
}
