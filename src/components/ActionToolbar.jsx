import React from 'react';
import { Download, Printer, RotateCw, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

export default function ActionToolbar({
  onGenerate,
  onDownload,
  onPrint,
  onFlip,
  isFlipped,
  isGenerated,
  isDownloading,
  hasValidationErrors
}) {
  return (
    <div className="action-toolbar-card">
      <div className="toolbar-status">
        {isGenerated ? (
          <div className="status-badge status-success">
            <CheckCircle size={15} />
            <span>ID Card Verified & Ready to Export</span>
          </div>
        ) : (
          <div className="status-badge status-draft">
            <Sparkles size={15} />
            <span>Interactive Live Mode • Realtime Sync</span>
          </div>
        )}
      </div>

      <div className="toolbar-buttons-grid">
        {/* Generate / Finalize button */}
        <button
          type="button"
          className={`btn ${isGenerated ? 'btn-success' : 'btn-primary'} btn-block`}
          onClick={onGenerate}
        >
          <CheckCircle size={18} />
          <span>{isGenerated ? 'Re-generate Card' : 'Generate ID Card'}</span>
        </button>

        {/* Download PNG buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-secondary flex-1 download-btn text-xs font-bold"
            onClick={() => onDownload && onDownload('auto')}
            disabled={isDownloading}
            title={isFlipped ? "Download Back face PNG" : "Download Front face PNG"}
          >
            <Download size={16} />
            <span>{isDownloading ? 'Generating...' : (isFlipped ? 'Download Back (PNG)' : 'Download Front (PNG)')}</span>
          </button>

          <button
            type="button"
            className="btn btn-outline px-3 text-xs font-bold text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 shrink-0"
            onClick={() => onDownload && onDownload('both')}
            disabled={isDownloading}
            title="Download both Front and Back faces as PNG images"
          >
            <span>Both Sides</span>
          </button>
        </div>

        {/* Action Row: Print & Flip */}
        <div className="toolbar-action-subrow">
          <button
            type="button"
            className="btn btn-outline btn-sm flex-1 font-semibold"
            onClick={onPrint}
            title="Print both front and back sides or save as PDF"
          >
            <Printer size={16} />
            <span>Print ID (2 Pages)</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-sm flex-1 font-semibold"
            onClick={onFlip}
            title="Flip to view front or back side"
          >
            <RotateCw size={16} />
            <span>{isFlipped ? 'Show Front' : 'Show Back'}</span>
          </button>
        </div>
      </div>

      {hasValidationErrors && (
        <div className="toolbar-hint-alert">
          <AlertCircle size={14} />
          <span>Note: Please fill all required fields before finalizing download.</span>
        </div>
      )}
    </div>
  );
}
