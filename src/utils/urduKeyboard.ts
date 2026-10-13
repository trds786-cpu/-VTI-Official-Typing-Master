// Standard National Urdu Phonetic Keyboard Layout (VTI & NLA Certified)

export interface KeyLayoutItem {
  code: string;
  enNormal: string;
  enShift: string;
  urNormal: string;
  urShift: string;
  finger: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
  row: number; // 0 to 4
  widthClass?: string;
}

export const KEYBOARD_LAYOUT: KeyLayoutItem[] = [
  // Row 0: Number row
  { code: 'Backquote', enNormal: '`', enShift: '~', urNormal: 'ء', urShift: 'ّ', finger: 'left-pinky', row: 0 },
  { code: 'Digit1', enNormal: '1', enShift: '!', urNormal: '۱', urShift: '!', finger: 'left-pinky', row: 0 },
  { code: 'Digit2', enNormal: '2', enShift: '@', urNormal: '۲', urShift: '@', finger: 'left-ring', row: 0 },
  { code: 'Digit3', enNormal: '3', enShift: '#', urNormal: '۳', urShift: '#', finger: 'left-middle', row: 0 },
  { code: 'Digit4', enNormal: '4', enShift: '$', urNormal: '۴', urShift: '؀', finger: 'left-index', row: 0 },
  { code: 'Digit5', enNormal: '5', enShift: '%', urNormal: '۵', urShift: '٪', finger: 'left-index', row: 0 },
  { code: 'Digit6', enNormal: '6', enShift: '^', urNormal: '۶', urShift: '،', finger: 'right-index', row: 0 },
  { code: 'Digit7', enNormal: '7', enShift: '&', urNormal: '۷', urShift: '؛', finger: 'right-index', row: 0 },
  { code: 'Digit8', enNormal: '8', enShift: '*', urNormal: '۸', urShift: '٭', finger: 'right-middle', row: 0 },
  { code: 'Digit9', enNormal: '9', enShift: '(', urNormal: '۹', urShift: ')', finger: 'right-ring', row: 0 },
  { code: 'Digit0', enNormal: '0', enShift: ')', urNormal: '۰', urShift: '(', finger: 'right-pinky', row: 0 },
  { code: 'Minus', enNormal: '-', enShift: '_', urNormal: '-', urShift: '_', finger: 'right-pinky', row: 0 },
  { code: 'Equal', enNormal: '=', enShift: '+', urNormal: '=', urShift: '+', finger: 'right-pinky', row: 0 },
  { code: 'Backspace', enNormal: 'Backspace', enShift: 'Backspace', urNormal: 'واپس', urShift: 'واپس', finger: 'right-pinky', row: 0, widthClass: 'w-24 flex-grow' },

  // Row 1: Top row (QWERTY)
  { code: 'Tab', enNormal: 'Tab', enShift: 'Tab', urNormal: 'ٹیب', urShift: 'ٹیب', finger: 'left-pinky', row: 1, widthClass: 'w-16' },
  { code: 'KeyQ', enNormal: 'q', enShift: 'Q', urNormal: 'ق', urShift: 'ْ', finger: 'left-pinky', row: 1 },
  { code: 'KeyW', enNormal: 'w', enShift: 'W', urNormal: 'و', urShift: 'ؤ', finger: 'left-ring', row: 1 },
  { code: 'KeyE', enNormal: 'e', enShift: 'E', urNormal: 'ع', urShift: 'ؑ', finger: 'left-middle', row: 1 },
  { code: 'KeyR', enNormal: 'r', enShift: 'R', urNormal: 'ر', urShift: 'ڑ', finger: 'left-index', row: 1 },
  { code: 'KeyT', enNormal: 't', enShift: 'T', urNormal: 'ت', urShift: 'ٹ', finger: 'left-index', row: 1 },
  { code: 'KeyY', enNormal: 'y', enShift: 'Y', urNormal: 'ے', urShift: 'َ', finger: 'right-index', row: 1 },
  { code: 'KeyU', enNormal: 'u', enShift: 'U', urNormal: 'ء', urShift: 'ئ', finger: 'right-index', row: 1 },
  { code: 'KeyI', enNormal: 'i', enShift: 'I', urNormal: 'ی', urShift: 'ٰ', finger: 'right-middle', row: 1 },
  { code: 'KeyO', enNormal: 'o', enShift: 'O', urNormal: 'ہ', urShift: 'ۃ', finger: 'right-ring', row: 1 },
  { code: 'KeyP', enNormal: 'p', enShift: 'P', urNormal: 'پ', urShift: 'ُ', finger: 'right-pinky', row: 1 },
  { code: 'BracketLeft', enNormal: '[', enShift: '{', urNormal: ']', urShift: '}', finger: 'right-pinky', row: 1 },
  { code: 'BracketRight', enNormal: ']', enShift: '}', urNormal: '[', urShift: '{', finger: 'right-pinky', row: 1 },
  { code: 'Backslash', enNormal: '\\', enShift: '|', urNormal: '\\', urShift: '|', finger: 'right-pinky', row: 1 },

  // Row 2: Home row (ASDF)
  { code: 'CapsLock', enNormal: 'Caps', enShift: 'Caps', urNormal: 'کیپس', urShift: 'کیپس', finger: 'left-pinky', row: 2, widthClass: 'w-20' },
  { code: 'KeyA', enNormal: 'a', enShift: 'A', urNormal: 'ا', urShift: 'آ', finger: 'left-pinky', row: 2 },
  { code: 'KeyS', enNormal: 's', enShift: 'S', urNormal: 'س', urShift: 'ص', finger: 'left-ring', row: 2 },
  { code: 'KeyD', enNormal: 'd', enShift: 'D', urNormal: 'د', urShift: 'ڈ', finger: 'left-middle', row: 2 },
  { code: 'KeyF', enNormal: 'f', enShift: 'F', urNormal: 'ف', urShift: 'ؐ', finger: 'left-index', row: 2 },
  { code: 'KeyG', enNormal: 'g', enShift: 'G', urNormal: 'گ', urShift: 'غ', finger: 'left-index', row: 2 },
  { code: 'KeyH', enNormal: 'h', enShift: 'H', urNormal: 'ح', urShift: 'ھ', finger: 'right-index', row: 2 },
  { code: 'KeyJ', enNormal: 'j', enShift: 'J', urNormal: 'ج', urShift: 'ض', finger: 'right-index', row: 2 },
  { code: 'KeyK', enNormal: 'k', enShift: 'K', urNormal: 'ک', urShift: 'خ', finger: 'right-middle', row: 2 },
  { code: 'KeyL', enNormal: 'l', enShift: 'L', urNormal: 'ل', urShift: ' رحمتہ', finger: 'right-ring', row: 2 },
  { code: 'Semicolon', enNormal: ';', enShift: ':', urNormal: '؛', urShift: ':', finger: 'right-pinky', row: 2 },
  { code: 'Quote', enNormal: "'", enShift: '"', urNormal: "'", urShift: '"', finger: 'right-pinky', row: 2 },
  { code: 'Enter', enNormal: 'Enter', enShift: 'Enter', urNormal: 'داخل', urShift: 'داخل', finger: 'right-pinky', row: 2, widthClass: 'w-24 flex-grow' },

  // Row 3: Bottom row (ZXCVBNM)
  { code: 'ShiftLeft', enNormal: 'Shift', enShift: 'Shift', urNormal: 'شفٹ', urShift: 'شفٹ', finger: 'left-pinky', row: 3, widthClass: 'w-24' },
  { code: 'KeyZ', enNormal: 'z', enShift: 'Z', urNormal: 'ز', urShift: 'ذ', finger: 'left-pinky', row: 3 },
  { code: 'KeyX', enNormal: 'x', enShift: 'X', urNormal: 'ش', urShift: 'ژ', finger: 'left-ring', row: 3 },
  { code: 'KeyC', enNormal: 'c', enShift: 'C', urNormal: 'چ', urShift: 'ث', finger: 'left-middle', row: 3 },
  { code: 'KeyV', enNormal: 'v', enShift: 'V', urNormal: 'ط', urShift: 'ظ', finger: 'left-index', row: 3 },
  { code: 'KeyB', enNormal: 'b', enShift: 'B', urNormal: 'ب', urShift: '﷽', finger: 'left-index', row: 3 },
  { code: 'KeyN', enNormal: 'n', enShift: 'N', urNormal: 'ن', urShift: 'ں', finger: 'right-index', row: 3 },
  { code: 'KeyM', enNormal: 'm', enShift: 'M', urNormal: 'م', urShift: 'ً', finger: 'right-index', row: 3 },
  { code: 'Comma', enNormal: ',', enShift: '<', urNormal: '،', urShift: 'ِ', finger: 'right-middle', row: 3 },
  { code: 'Period', enNormal: '.', enShift: '>', urNormal: '۔', urShift: '!', finger: 'right-ring', row: 3 },
  { code: 'Slash', enNormal: '/', enShift: '?', urNormal: '/', urShift: '؟', finger: 'right-pinky', row: 3 },
  { code: 'ShiftRight', enNormal: 'Shift', enShift: 'Shift', urNormal: 'شفٹ', urShift: 'شفٹ', finger: 'right-pinky', row: 3, widthClass: 'w-28 flex-grow' },

  // Row 4: Spacebar
  { code: 'Space', enNormal: 'Space', enShift: 'Space', urNormal: 'فاصلہ', urShift: 'فاصلہ', finger: 'thumb', row: 4, widthClass: 'w-80 flex-grow max-w-xl' },
];

export const FINGER_COLORS: Record<KeyLayoutItem['finger'], { bg: string; border: string; text: string; label: string; labelUrdu: string }> = {
  'left-pinky': { bg: 'bg-rose-950/40', border: 'border-rose-500/50', text: 'text-rose-400', label: 'L Pinky', labelUrdu: 'بائیں چھوٹی انگلی' },
  'left-ring': { bg: 'bg-amber-950/40', border: 'border-amber-500/50', text: 'text-amber-400', label: 'L Ring', labelUrdu: 'بائیں تیسری انگلی' },
  'left-middle': { bg: 'bg-emerald-950/40', border: 'border-emerald-500/50', text: 'text-emerald-400', label: 'L Middle', labelUrdu: 'بائیں درمیانی انگلی' },
  'left-index': { bg: 'bg-sky-950/40', border: 'border-sky-500/50', text: 'text-sky-400', label: 'L Index', labelUrdu: 'بائیں شہادت کی انگلی' },
  'thumb': { bg: 'bg-violet-950/40', border: 'border-violet-500/50', text: 'text-violet-400', label: 'Thumbs', labelUrdu: 'دونوں انگوٹھے' },
  'right-index': { bg: 'bg-blue-950/40', border: 'border-blue-500/50', text: 'text-blue-400', label: 'R Index', labelUrdu: 'دائیں شہادت کی انگلی' },
  'right-middle': { bg: 'bg-teal-950/40', border: 'border-teal-500/50', text: 'text-teal-400', label: 'R Middle', labelUrdu: 'دائیں درمیانی انگلی' },
  'right-ring': { bg: 'bg-orange-950/40', border: 'border-orange-500/50', text: 'text-orange-400', label: 'R Ring', labelUrdu: 'دائیں تیسری انگلی' },
  'right-pinky': { bg: 'bg-fuchsia-950/40', border: 'border-fuchsia-500/50', text: 'text-fuchsia-400', label: 'R Pinky', labelUrdu: 'دائیں چھوٹی انگلی' },
};

// Map character to Key code and Shift requirement
export function findKeyForChar(char: string, language: 'english' | 'urdu'): { key: KeyLayoutItem | null; requiresShift: boolean } {
  if (char === ' ') {
    const spaceKey = KEYBOARD_LAYOUT.find(k => k.code === 'Space') || null;
    return { key: spaceKey, requiresShift: false };
  }

  for (const item of KEYBOARD_LAYOUT) {
    if (language === 'english') {
      if (item.enNormal === char) return { key: item, requiresShift: false };
      if (item.enShift === char) return { key: item, requiresShift: true };
    } else {
      if (item.urNormal === char) return { key: item, requiresShift: false };
      if (item.urShift === char) return { key: item, requiresShift: true };
    }
  }

  // Fallback for case insensitivity in English
  if (language === 'english') {
    const lower = char.toLowerCase();
    for (const item of KEYBOARD_LAYOUT) {
      if (item.enNormal === lower) {
        return { key: item, requiresShift: char !== lower };
      }
    }
  }

  return { key: null, requiresShift: false };
}
