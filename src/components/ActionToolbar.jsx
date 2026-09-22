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

        {/* Download PNG button */}
        <button
          type="button"
          className="btn btn-secondary btn-block download-btn"
          onClick={onDownload}
          disabled={isDownloading}
        >
          <Download size={18} />
          <span>{isDownloading ? 'Generating Image...' : 'Download Card (PNG)'}</span>
        </button>

        {/* Action Row: Print & Flip */}
        <div className="toolbar-action-subrow">
          <button
            type="button"
            className="btn btn-outline btn-sm flex-1"
            onClick={onPrint}
            title="Print or save as PDF"
          >
            <Printer size={16} />
            <span>Print ID</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-sm flex-1"
            onClick={onFlip}
            title="Flip to see front/back"
          >
            <RotateCw size={16} />
            <span>Flip Card</span>
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
