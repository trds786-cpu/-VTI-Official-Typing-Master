import React, { useState } from 'react';
import { Download, Monitor, CheckCircle, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  onOpenOfflineGuide?: () => void;
}

export const PWAInstallButton: React.FC<Props> = ({ onOpenOfflineGuide }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, show a subtle active badge
  if (isInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-lg">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
        <span>Installed App</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isInstallable && (
        <button
          onClick={install}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold shadow-md shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          title="Install VTI Typing Master as standalone desktop app for Windows 7 & 10"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install Desktop App</span>
        </button>
      )}

      {isIOS && (
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 text-xs font-medium transition"
        >
          <Smartphone className="w-3.5 h-3.5 text-sky-400" />
          <span>Install iOS</span>
        </button>
      )}

      {onOpenOfflineGuide && (
        <button
          onClick={onOpenOfflineGuide}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 text-xs font-medium transition"
          title="Windows 7 / 10 Offline Setup Guide"
        >
          <Monitor className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Win 7/10 Offline Guide</span>
          <span className="sm:hidden">Offline</span>
        </button>
      )}

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-700 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Install on iPhone / iPad</h3>
            <p className="mt-3 text-sm text-slate-300 space-y-1">
              1. Tap the <strong>Share</strong> button in Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
              3. The app works 100% offline without internet.
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 text-sm font-semibold text-white transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
