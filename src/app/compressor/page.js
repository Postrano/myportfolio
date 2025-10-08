"use client";

import React, { useMemo, useRef, useState } from "react";
import Sidenav from "../components/sidenav";
import UploadBar from "./UploadBar";
import EmptyState from "./EmptyState";
import FileTable from "./FileTable";

export default function CompressorPage() {
  const [items, setItems] = useState([]); // [{ file, status, beforeSize, afterSize, outputBlob, outputName, error }]
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [jpegQuality, setJpegQuality] = useState(0.75);

  React.useEffect(() => {
    setMounted(true);
  }, []);


  const handlePick = () => fileInputRef.current?.click();

  const handleFiles = (event) => {
    const picked = Array.from(event.target.files || []);
    const mapped = picked.map((f) => ({
      file: f,
      status: "ready",
      beforeSize: f.size,
      afterSize: null,
      outputBlob: null,
      outputName: null,
      error: null,
      isImage: /^image\//i.test(f.type) || /\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name),
    }));
    setItems(mapped);
    // reset input value so selecting the same file again fires onChange
    if (event.target) {
      event.target.value = "";
    }
  };

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const loadBitmap = async (file) => {
    try {
      if (typeof createImageBitmap === "function") {
        return await createImageBitmap(file);
      }
      throw new Error("createImageBitmap not available");
    } catch (_) {
      const dataUrl = await new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => reject(new Error("Failed reading file"));
        fr.readAsDataURL(file);
      });
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("Image decode failed"));
        image.src = dataUrl;
      });
      return img;
    }
  };

  const recompressImageKeepingType = async (file) => {
    const isJpeg = /jpe?g$/i.test(file.name) || file.type === "image/jpeg";
    const isPng = /png$/i.test(file.name) || file.type === "image/png";
    if (!isJpeg && !isPng) {
      throw new Error("Only JPEG and PNG are supported for in-place recompressing");
    }
    const bitmap = await loadBitmap(file);
    const width = bitmap.width || bitmap.naturalWidth;
    const height = bitmap.height || bitmap.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(bitmap, 0, 0, width, height);
    const mime = isJpeg ? "image/jpeg" : "image/png";
    const quality = isJpeg ? jpegQuality : undefined; // only JPEG uses quality
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, mime, quality));
    return blob || file;
  };

  // Compress non-image files using gzip and create a custom compressed format
  const compressNonImageFile = async (file) => {
    if (typeof CompressionStream === "undefined") {
      // Fallback: return original file if compression not supported
      return file;
    }
    
    try {
      // Compress the file using gzip
      const compressedStream = file.stream().pipeThrough(new CompressionStream("gzip"));
      const compressedBlob = await new Response(compressedStream).blob();
      
      // Create a custom format that includes metadata and compressed data
      const metadata = {
        originalName: file.name,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        timestamp: Date.now(),
        format: 'compressed'
      };
      
      // Convert metadata to JSON and create a data URL format
      const metadataJson = JSON.stringify(metadata);
      const metadataBlob = new Blob([metadataJson], { type: 'application/json' });
      
      // Create a combined blob with metadata and compressed data
      const combinedBlob = new Blob([
        new Uint8Array([0x43, 0x4F, 0x4D, 0x50]), // "COMP" magic bytes
        new Uint8Array([metadataJson.length]), // metadata length
        await metadataBlob.arrayBuffer(), // metadata
        await compressedBlob.arrayBuffer() // compressed data
      ], { type: 'application/octet-stream' });
      
      return combinedBlob;
    } catch (error) {
      console.error('Compression failed:', error);
      return file; // Return original file if compression fails
    }
  };

  // Decompress custom compressed files
  const decompressFile = async (compressedBlob) => {
    try {
      const arrayBuffer = await compressedBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Check magic bytes
      if (uint8Array[0] !== 0x43 || uint8Array[1] !== 0x4F || uint8Array[2] !== 0x4D || uint8Array[3] !== 0x50) {
        throw new Error('Invalid compressed file format');
      }
      
      // Read metadata length
      const metadataLength = uint8Array[4];
      const metadataBytes = uint8Array.slice(5, 5 + metadataLength);
      const metadataJson = new TextDecoder().decode(metadataBytes);
      const metadata = JSON.parse(metadataJson);
      
      // Extract compressed data
      const compressedData = uint8Array.slice(5 + metadataLength);
      
      // Decompress using DecompressionStream
      if (typeof DecompressionStream === "undefined") {
        throw new Error('Decompression not supported by this browser');
      }
      
      const decompressedStream = new Response(compressedData).body
        .pipeThrough(new DecompressionStream("gzip"));
      const decompressedBlob = await new Response(decompressedStream).blob();
      
      return {
        blob: decompressedBlob,
        originalName: metadata.originalName,
        originalSize: metadata.originalSize
      };
    } catch (error) {
      console.error('Decompression failed:', error);
      throw error;
    }
  };

  // Drag and drop support
  const handleDrop = (event) => {
    event.preventDefault();
    const dropped = Array.from(event.dataTransfer?.files || []);
    if (!dropped.length) return;
    const mapped = dropped.map((f) => ({
      file: f,
      status: "ready",
      beforeSize: f.size,
      afterSize: null,
      outputBlob: null,
      outputName: null,
      error: null,
      isImage: /^image\//i.test(f.type) || /\.(png|jpe?g|webp|gif|bmp)$/i.test(f.name),
    }));
    setItems(mapped);
  };
  const preventDefault = (e) => e.preventDefault();

  const onCompress = async () => {
    if (!items.length) return;
    setBusy(true);
    try {
      const next = [...items];
      for (let i = 0; i < next.length; i++) {
        const entry = next[i];
        entry.status = "compressing";
        setItems([...next]);
        try {
          if (entry.isImage) {
            const out = await recompressImageKeepingType(entry.file);
            entry.outputBlob = out;
            entry.outputName = entry.file.name; // keep original extension
            entry.afterSize = out.size;
            entry.status = "done";
          } else {
            // compress non-image files
            const compressed = await compressNonImageFile(entry.file);
            entry.outputBlob = compressed;
            entry.outputName = entry.file.name + ".compressed"; // add extension to indicate it's compressed
            entry.afterSize = compressed.size;
            entry.status = "done";
          }
        } catch (e) {
          entry.status = "error";
          entry.error = e.message || "Compression failed";
        }
        setItems([...next]);
      }
    } finally {
      setBusy(false);
    }
  };

  const downloadOne = (entry) => {
    if (!entry?.outputBlob || !entry?.outputName) return;
    downloadBlob(entry.outputBlob, entry.outputName);
  };

  const decompressOne = async (entry) => {
    if (!entry?.outputBlob) return;
    try {
      const result = await decompressFile(entry.outputBlob);
      downloadBlob(result.blob, result.originalName);
    } catch (error) {
      console.error('Decompression failed:', error);
      alert('Failed to decompress file: ' + error.message);
    }
  };

  const allDone = items.length > 0 && items.every((e) => e.status === "done");

  const resetForRecompress = () => {
    setItems([]);
  };

  return (
    <div className="min-h-screen relative bg-gray-900 text-white" suppressHydrationWarning>
      <Sidenav />
      <main className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">File Compressor</h1>
        <p className="text-white/80 mb-6">Images (JPEG/PNG) are recompressed in place. Other files are compressed with a custom format (.compressed).</p>

        <div className="mb-6 text-white/80 text-sm">
          <p className="mb-2">Supported types:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="text-white">Images</span>: JPEG/PNG recompressed (original format kept)</li>
            <li><span className="text-white">Documents</span>: PDF, DOC, DOCX, TXT, etc. compressed to .compressed format</li>
            <li><span className="text-white">Others</span>: All file types compressed to .compressed format</li>
          </ul>
        </div>

        <div
          className="bg-white/5 rounded-lg border border-white/10 p-5"
          onDrop={handleDrop}
          onDragOver={preventDefault}
          onDragEnter={preventDefault}
          onDragLeave={preventDefault}
        >
          <UploadBar
            busy={busy}
            onPick={() => {}}
            inputId="filePicker"
            fileInputRef={fileInputRef}
            onFiles={handleFiles}
            jpegQuality={jpegQuality}
            setJpegQuality={setJpegQuality}
          />

          {items.length === 0 && <EmptyState />}

          {items.length > 0 && (
            <FileTable items={items} onDownload={downloadOne} onDecompress={decompressOne} />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCompress}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500 active:bg-green-500 focus:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
              disabled={!items.length || busy}
            >
              {busy ? "Compressing..." : "Compress"}
            </button>
            <button
              type="button"
              onClick={resetForRecompress}
              className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 active:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
              disabled={!items.length || busy}
            >
              Compress again
            </button>
            {allDone && (
              <button
                type="button"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => items.forEach(downloadOne)}
              >
                Download all
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-white/60 mt-4">
          Note: JPEG/PNG are recompressed in-browser. Other files are compressed using gzip and saved as .compressed files. Use the "Extract" button to restore original files.
        </p>
      </main>
    </div>
  );
}


