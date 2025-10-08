"use client";

import React from "react";

export default function EmptyState() {
  return (
    <div className="text-center text-white/60 py-10">
      <div className="mx-auto w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-3">
        <span className="text-xl">+</span>
      </div>
      <p className="mb-1">Drop files to get started</p>
      <p className="text-xs">JPEG/PNG images are recompressed in place. Other types are compressed to .compressed format. Drag & drop files here or use the button</p>
    </div>
  );
}


