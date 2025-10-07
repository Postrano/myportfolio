"use client";

import React from "react";

export default function UploadBar({ busy, onPick, inputId, fileInputRef, onFiles, jpegQuality, setJpegQuality }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4 w-full">
      <label
        htmlFor={inputId}
        className={`w-full md:w-auto text-center md:text-left px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-500 focus:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${busy ? 'opacity-60 pointer-events-none' : 'cursor-pointer'}`}
      >
        Choose files
      </label>
      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept="application/pdf,application/*,image/*,text/*,*/*"
        onChange={onFiles}
      />
      <div className="md:ml-auto flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-white/80 w-full sm:w-auto">
          <label htmlFor="jpegQuality">Image quality</label>
          <input
            id="jpegQuality"
            type="range"
            min="0.3"
            max="0.95"
            step="0.05"
            value={jpegQuality}
            onChange={(e) => setJpegQuality(parseFloat(e.target.value))}
            disabled={busy}
          />
          <span className="text-xs tabular-nums">{Math.round(jpegQuality * 100)}%</span>
        </div>
      </div>
    </div>
  );
}


