import React from 'react';
import { Language } from '../types';
import { KEYBOARD_LAYOUT, FINGER_COLORS, findKeyForChar, KeyLayoutItem } from '../utils/urduKeyboard';

interface Props {
  currentChar: string;
  activeLanguage: Language;
  showFingerGuide: boolean;
  pressedKeyCode?: string | null;
}

export const VirtualKeyboard: React.FC<Props> = ({
  currentChar,
  activeLanguage,
  showFingerGuide,
  pressedKeyCode,
}) => {
  const { key: targetKey, requiresShift } = findKeyForChar(currentChar, activeLanguage);
  const targetFinger = targetKey ? FINGER_COLORS[targetKey.finger] : null;

  // Group keys into rows 0..4
  const rows = [0, 1, 2, 3, 4].map(r => KEYBOARD_LAYOUT.filter(k => k.row === r));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
      {/* Top Helper Bar: Current Target & Finger Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Target Key:</span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg">
            <span className={`text-base font-bold ${activeLanguage === 'urdu' ? 'font-urdu text-amber-400' : 'font-mono text-emerald-400'}`}>
              {currentChar === ' ' ? 'Spacebar (فاصلہ)' : currentChar || 'End'}
            </span>
            {requiresShift && (
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                Shift + Key
              </span>
            )}
          </div>
        </div>

        {showFingerGuide && targetFinger && (
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Use Finger:</span>
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border ${targetFinger.bg} ${targetFinger.border} ${targetFinger.text} font-semibold`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{targetFinger.label}</span>
              <span className="text-[11px] opacity-80 font-urdu">({targetFinger.labelUrdu})</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-[11px]">VTI Certified Urdu Phonetic / QWERTY</span>
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="space-y-1.5 overflow-x-auto pb-1 select-none">
        {rows.map((rowKeys, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center min-w-[680px]">
            {rowKeys.map((item: KeyLayoutItem) => {
              const isTarget = targetKey?.code === item.code;
              const isPressed = pressedKeyCode === item.code;
              const isShiftActive = requiresShift && (item.code === 'ShiftLeft' || item.code === 'ShiftRight');
              const finger = FINGER_COLORS[item.finger];

              let keyStyle = 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:border-slate-600';
              if (isTarget) {
                keyStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400 animate-pulse';
              } else if (isShiftActive) {
                keyStyle = 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/30 ring-2 ring-amber-400 animate-pulse';
              } else if (isPressed) {
                keyStyle = 'bg-sky-500 text-white border-sky-300 scale-95 shadow-md shadow-sky-500/40';
              }

              const width = item.widthClass || 'w-10 sm:w-12';

              return (
                <div
                  key={item.code}
                  className={`relative flex flex-col justify-between items-center h-10 sm:h-12 ${width} p-1 rounded-lg border text-xs transition-all duration-75 ${keyStyle}`}
                  title={`${item.enNormal} / ${item.urNormal} (${finger.label})`}
                >
                  {/* Finger color dot indicator on top edge */}
                  {showFingerGuide && !isTarget && !isShiftActive && (
                    <span className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${finger.text} opacity-60`} />
                  )}

                  {/* Top: English character */}
                  <div className="w-full flex justify-between items-center text-[10px] leading-none opacity-75">
                    <span className="font-mono">{item.enShift !== item.enNormal ? item.enShift : ''}</span>
                    <span className="font-mono font-medium">{item.enNormal}</span>
                  </div>

                  {/* Center / Bottom: Urdu phonetic character */}
                  <div className="w-full flex justify-between items-center leading-none">
                    <span className="text-[10px] font-urdu text-amber-300/80">
                      {item.urShift !== item.urNormal ? item.urShift : ''}
                    </span>
                    <span className={`text-sm sm:text-base font-urdu font-bold ${isTarget ? 'text-slate-950' : 'text-sky-300'}`}>
                      {item.urNormal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger Legend Bar */}
      {showFingerGuide && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
          <span className="text-slate-500 font-semibold">Finger Guide:</span>
          {(['left-pinky', 'left-ring', 'left-middle', 'left-index', 'thumb', 'right-index', 'right-middle', 'right-ring', 'right-pinky'] as const).map(f => (
            <div key={f} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${FINGER_COLORS[f].border} ${FINGER_COLORS[f].bg}`} />
              <span className="text-slate-300">{FINGER_COLORS[f].label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
