import React, { useRef, useState } from 'react';
import { 
  X, Monitor, Download, Upload, ShieldCheck, HardDrive, 
  CheckCircle, FileJson, AlertCircle, Laptop 
} from 'lucide-react';
import { storage } from '../utils/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDataRestored: () => void;
}

export const OfflineGuideModal: React.FC<Props> = ({ isOpen, onClose, onDataRestored }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!isOpen) return null;

  const handleExportBackup = () => {
    try {
      const dataStr = storage.exportAllData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VTI_Typing_Master_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMessage({ text: 'Backup downloaded successfully! Safe to transfer via USB thumb drive.' });
    } catch {
      setStatusMessage({ text: 'Failed to create backup file.', isError: true });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storage.importAllData(content);
      if (success) {
        setStatusMessage({ text: 'Institute database restored successfully!' });
        onDataRestored();
      } else {
        setStatusMessage({ text: 'Invalid backup file format.', isError: true });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Windows 7 & 10 Offline Deployment Guide
              </h2>
              <p className="text-xs text-slate-400">
                100% Offline Standalone Operation for Vocational Computer Labs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMessage && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.isError 
              ? 'bg-rose-950/60 border border-rose-500/40 text-rose-300' 
              : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
          }`}>
            {statusMessage.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Windows 7 & 10 Specific Instructions */}
        <div className="space-y-4 text-xs text-slate-300">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>How to Run Completely Offline on Windows 7 & 10</span>
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-400 leading-relaxed pl-1">
              <li>
                <strong className="text-slate-200">Pre-cached Service Worker:</strong> All assets, scripts, audio synthesizers, and font fallbacks are automatically cached in the browser's storage upon first launch.
              </li>
              <li>
                <strong className="text-slate-200">Install as Desktop App:</strong> In Google Chrome or Microsoft Edge, click the <em>"Install Desktop App"</em> button on the top right, or click the browser menu (three dots) → <em>Save and Share / Apps → Install VTI Official Typing Master</em>.
              </li>
              <li>
                <strong className="text-slate-200">Desktop Shortcut:</strong> Once installed, an icon named <em>"VTI Typing"</em> is created on your Windows Desktop and Start Menu. You can disconnect from the internet and launch it at any time.
              </li>
              <li>
                <strong className="text-slate-200">Zero Internet Required:</strong> Student profiles, speed scores, custom lessons, and certificates are saved 100% locally on your computer's hard drive.
              </li>
            </ol>
          </div>

          {/* USB Thumb Drive Lab Migration & Backup */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="font-bold text-white flex items-center gap-2 text-sm">
              <FileJson className="w-4 h-4 text-sky-400" />
              <span>Offline Lab Sync & USB Backup</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              For vocational training labs with multiple offline computers, instructors can export trainee databases and custom lessons to a single JSON backup file and import them across all classroom PCs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleExportBackup}
                className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition shadow-md shadow-sky-900/30"
              >
                <Download className="w-4 h-4" />
                <span>Export Offline Database (.JSON)</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl font-bold transition"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Restore Database From File</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Urdu Nastaleeq Fonts on Windows 7 & 10 */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1.5">
            <h4 className="font-bold text-white text-xs font-urdu flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>اردو فونٹس برائے ونڈوز ۷ اور ۱۰</span>
            </h4>
            <p className="text-slate-400 leading-relaxed font-urdu">
              یہ ایپلیکیشن ونڈوز کے ڈیفالٹ اردو فونٹس (Urdu Typesetting, Segoe UI, Tahoma) کے ساتھ خود بخود خوبصورت نستعلیق انداز میں کام کرتی ہے۔ اگر آپ کے پاس جمیل نوری نستعلیق (Jameel Noori Nastaleeq) انسٹال ہو تو یہ خود بخود اس کا استعمال کرتی ہے۔
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
