export type Language = 'english' | 'urdu';

export type LessonCategory = 
  | 'home_row' 
  | 'top_row' 
  | 'bottom_row' 
  | 'numbers_symbols' 
  | 'vocabulary' 
  | 'vocational' 
  | 'exam_passages' 
  | 'custom';

export interface Lesson {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  language: Language;
  category: LessonCategory;
  content: string;
  targetWpm: number;
  targetAccuracy: number;
  isCustom?: boolean;
  createdAt?: string;
}

export interface WpmPoint {
  timestamp: number;
  wpm: number;
  cpm: number;
  accuracy: number;
}

export interface WeakKeyInfo {
  key: string;
  count: number;
}

export interface SessionResult {
  id: string;
  traineeId: string;
  traineeName: string;
  rollNo: string;
  lessonId: string;
  lessonTitle: string;
  language: Language;
  durationSeconds: number;
  elapsedSeconds: number;
  grossWpm: number;
  netWpm: number;
  cpm: number;
  accuracy: number;
  errorCount: number;
  backspaceCount: number;
  totalKeystrokes: number;
  completedAt: string;
  wpmTimeline: WpmPoint[];
  weakKeys: WeakKeyInfo[];
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Practice';
}

export interface TraineeProfile {
  id: string;
  name: string;
  rollNo: string;
  institute: string;
  batch: string;
  avatar: string;
  bestEnglishWpm: number;
  bestUrduWpm: number;
  totalTests: number;
  totalPracticeMinutes: number;
  averageAccuracy: number;
  joinedAt: string;
}

export type SoundEffectType = 'mechanical' | 'typewriter' | 'soft' | 'mute';

export interface AppSettings {
  soundType: SoundEffectType;
  volume: number;
  showKeyboard: boolean;
  showFingerGuide: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  enableBackspace: boolean;
  autoScroll: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  titleUrdu: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
