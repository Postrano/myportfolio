"use client";

import React from "react";

export default function FileTable({ items, onDownload, onDecompress }) {
  return (
    <div className="mb-4 overflow-x-auto rounded border border-white/10">
      <div className="min-w-[560px] grid grid-cols-12 gap-2 px-3 py-2 text-xs bg-white/5 text-white/70">
        <div className="col-span-5">File</div>
        <div className="col-span-2 text-right">Before</div>
        <div className="col-span-2 text-right">After</div>
        <div className="col-span-3 text-right">Action</div>
      </div>
      {items.map((entry) => (
        <div key={entry.file.name} className="min-w-[560px] grid grid-cols-12 gap-2 px-3 py-2 text-sm items-center border-t border-white/5">
          <div className="col-span-5 truncate" title={entry.file.name}>{entry.file.name}</div>
          <div className="col-span-2 text-right">{(entry.beforeSize / 1024).toFixed(1)} KB</div>
          <div className="col-span-2 text-right">
            {entry.afterSize != null ? (
              <span>{(entry.afterSize / 1024).toFixed(1)} KB</span>
            ) : (
              <span className="opacity-60">—</span>
            )}
          </div>
          <div className="col-span-3 text-right">
            {entry.status === "ready" && (
              <span className="text-white/60">Ready</span>
            )}
            {entry.status === "compressing" && (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span className="text-white/80">Compressing</span>
              </span>
            )}
            {entry.status === "done" && (
              <div className="flex gap-1 justify-end">
                {!entry.isImage && entry.outputName?.endsWith('.compressed') && (
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs"
                    onClick={() => onDecompress(entry)}
                  >
                    Download
                  </button>
                )}
                {/*
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-500 focus:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs"
                  onClick={() => onDownload(entry)}
                >
                  Download
                </button>
                */}
              </div>
            )}
            {entry.status === "error" && (
              <span className="text-red-400" title={entry.error}>Failed</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


