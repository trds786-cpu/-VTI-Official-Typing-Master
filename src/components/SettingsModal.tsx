import React from 'react';
import { X, Settings, Volume2, Type, Keyboard, RotateCcw } from 'lucide-react';
import { AppSettings, SoundEffectType } from '../types';
import { soundManager } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetFactoryData: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetFactoryData,
}) => {
  if (!isOpen) return null;

  const handleSoundChange = (type: SoundEffectType) => {
    const updated = { ...settings, soundType: type };
    onUpdateSettings(updated);
    if (type !== 'mute') {
      soundManager.playKeySound(type, settings.volume);
    }
  };

  const handleVolumeChange = (vol: number) => {
    const updated = { ...settings, volume: vol };
    onUpdateSettings(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-slate-300 rounded-xl">
              <Settings className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Application Settings</h2>
              <p className="text-xs text-slate-400">Audio feedback, keyboard guides, and typing ergonomics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs text-slate-300">
          {/* Sound Type Selection */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-200 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Offline Keystroke Audio Synthesis</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['mechanical', 'typewriter', 'soft', 'mute'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSoundChange(type)}
                  className={`py-2 px-2.5 rounded-xl border capitalize font-semibold transition ${
                    settings.soundType === type
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {type === 'mechanical' ? 'Mechanical' : type === 'typewriter' ? 'Typewriter' : type === 'soft' ? 'Laptop' : 'Mute'}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Slider */}
          {settings.soundType !== 'mute' && (
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Audio Volume:</span>
                <span className="font-mono text-emerald-400 font-bold">{Math.round(settings.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={1.0}
                step={0.05}
                value={settings.volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          )}

          {/* Virtual Keyboard & Finger Guide Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <label className="block font-semibold text-slate-200 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-sky-400" />
              <span>Visual Aids & Keyboard Display</span>
            </label>

            <div className="flex items-center justify-between p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div>
                <div className="font-semibold text-white">Show Virtual Keyboard</div>
                <div className="text-[11px] text-slate-400">Displays on-screen QWERTY & Urdu Phonetic keycaps</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showKeyboard}
                onChange={(e) => onUpdateSettings({ ...settings, showKeyboard: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div>
                <div className="font-semibold text-white">Color-Coded Finger Guide</div>
                <div className="text-[11px] text-slate-400">Shows colored indicator for pinky, ring, middle, index fingers</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showFingerGuide}
                onChange={(e) => onUpdateSettings({ ...settings, showFingerGuide: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <div>
                <div className="font-semibold text-white">Allow Backspace Key</div>
                <div className="text-[11px] text-slate-400">Permit correcting errors (disable for strict official exam mode)</div>
              </div>
              <input
                type="checkbox"
                checked={settings.enableBackspace}
                onChange={(e) => onUpdateSettings({ ...settings, enableBackspace: e.target.checked })}
                className="w-4 h-4 accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Reset Factory Data */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset application to default vocational curriculum and initial state?')) {
                  onResetFactoryData();
                  onClose();
                }
              }}
              className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Initial Curriculum Defaults</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
