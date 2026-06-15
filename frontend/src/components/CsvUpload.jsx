import { useRef, useState } from "react";

function CsvUpload({ onUpload, isUploading = false }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = e.dataTransfer?.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    const isCsv =
      file.type === "text/csv" ||
      file.name.toLowerCase().endsWith(".csv");

    if (isCsv) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !onUpload) return;
    await onUpload(selectedFile);
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Import from CSV</h3>
          <p className="text-xs text-slate-500 mt-0.5">Bulk-import supplier quotes with a CSV file</p>
        </div>
      </div>

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "copy";
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
        }}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed px-5 py-6 text-center transition ${
          dragging
            ? "border-indigo-400 bg-indigo-50"
            : selectedFile
            ? "border-emerald-300 bg-emerald-50/50"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />

        {selectedFile ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-700">{selectedFile.name}</span>
            <span className="text-xs text-slate-400">
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        ) : (
          <div>
            <svg className="w-6 h-6 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <p className="text-sm text-slate-500">
              <span className="font-medium text-indigo-600">Click to browse</span> or drag & drop
            </p>
            <p className="text-xs text-slate-400 mt-1">CSV files only</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setSelectedFile(null); if (inputRef.current) inputRef.current.value = ""; }}
            className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 transition"
          >
            Clear
          </button>
          <button
            type="button"
            disabled={isUploading}
            onClick={handleUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Importing…
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import Quotes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CsvUpload;