import { AppSettings, Lesson, SessionResult, TraineeProfile } from '../types';
import { DEFAULT_LESSONS } from '../data/lessons';

const STORAGE_KEYS = {
  TRAINEES: 'vti_trainees_v1',
  ACTIVE_TRAINEE_ID: 'vti_active_trainee_id_v1',
  CUSTOM_LESSONS: 'vti_custom_lessons_v1',
  SESSION_RESULTS: 'vti_session_results_v1',
  SETTINGS: 'vti_settings_v1',
};

export const DEFAULT_SETTINGS: AppSettings = {
  soundType: 'mechanical',
  volume: 0.6,
  showKeyboard: true,
  showFingerGuide: true,
  fontSize: 'large',
  highContrast: false,
  enableBackspace: true,
  autoScroll: true,
};

export const INITIAL_TRAINEES: TraineeProfile[] = [
  {
    id: 'trainee-001',
    name: 'Muhammad Usman',
    rollNo: 'VTI-2026-IT-101',
    institute: 'Vocational Training Institute (VTI)',
    batch: 'Batch 2026 - Morning',
    avatar: '👨‍🎓',
    bestEnglishWpm: 58,
    bestUrduWpm: 46,
    totalTests: 18,
    totalPracticeMinutes: 145,
    averageAccuracy: 97.4,
    joinedAt: '2026-09-01',
  },
  {
    id: 'trainee-002',
    name: 'Ayesha Siddiqua',
    rollNo: 'VTI-2026-IT-102',
    institute: 'Vocational Training Institute (VTI)',
    batch: 'Batch 2026 - Morning',
    avatar: '👩‍🎓',
    bestEnglishWpm: 64,
    bestUrduWpm: 51,
    totalTests: 24,
    totalPracticeMinutes: 210,
    averageAccuracy: 98.6,
    joinedAt: '2026-09-02',
  },
  {
    id: 'trainee-003',
    name: 'Bilal Ahmed Raza',
    rollNo: 'VTI-2026-IT-103',
    institute: 'Vocational Training Institute (VTI)',
    batch: 'Batch 2026 - Evening',
    avatar: '👨‍💻',
    bestEnglishWpm: 52,
    bestUrduWpm: 42,
    totalTests: 14,
    totalPracticeMinutes: 98,
    averageAccuracy: 96.2,
    joinedAt: '2026-09-05',
  },
  {
    id: 'trainee-guest',
    name: 'Trainee Guest User',
    rollNo: 'VTI-DEMO-000',
    institute: 'Vocational Training Institute (VTI)',
    batch: 'Practice Station 01',
    avatar: '⚡',
    bestEnglishWpm: 0,
    bestUrduWpm: 0,
    totalTests: 0,
    totalPracticeMinutes: 0,
    averageAccuracy: 0,
    joinedAt: '2026-10-13',
  }
];

export const INITIAL_SEED_RESULTS: SessionResult[] = [
  {
    id: 'seed-res-1',
    traineeId: 'trainee-002',
    traineeName: 'Ayesha Siddiqua',
    rollNo: 'VTI-2026-IT-102',
    lessonId: 'en-exam-01',
    lessonTitle: 'Lesson 7: State Civil Service Exam',
    language: 'english',
    durationSeconds: 300,
    elapsedSeconds: 300,
    grossWpm: 65,
    netWpm: 64,
    cpm: 320,
    accuracy: 98.8,
    errorCount: 3,
    backspaceCount: 5,
    totalKeystrokes: 1600,
    completedAt: '2026-10-11T10:30:00Z',
    wpmTimeline: [
      { timestamp: 60, wpm: 62, cpm: 310, accuracy: 99 },
      { timestamp: 120, wpm: 64, cpm: 320, accuracy: 98.7 },
      { timestamp: 180, wpm: 65, cpm: 325, accuracy: 98.8 },
      { timestamp: 240, wpm: 64, cpm: 320, accuracy: 98.9 },
      { timestamp: 300, wpm: 64, cpm: 320, accuracy: 98.8 },
    ],
    weakKeys: [{ key: 'q', count: 1 }, { key: 'p', count: 2 }],
    grade: 'A+',
  },
  {
    id: 'seed-res-2',
    traineeId: 'trainee-001',
    traineeName: 'Muhammad Usman',
    rollNo: 'VTI-2026-IT-101',
    lessonId: 'ur-exam-01',
    lessonTitle: 'سبق ۵: بانی پاکستان قائد اعظم کا پیغام',
    language: 'urdu',
    durationSeconds: 300,
    elapsedSeconds: 300,
    grossWpm: 48,
    netWpm: 46,
    cpm: 230,
    accuracy: 97.2,
    errorCount: 4,
    backspaceCount: 7,
    totalKeystrokes: 1150,
    completedAt: '2026-10-12T11:15:00Z',
    wpmTimeline: [
      { timestamp: 60, wpm: 44, cpm: 220, accuracy: 97 },
      { timestamp: 120, wpm: 46, cpm: 230, accuracy: 97.2 },
      { timestamp: 180, wpm: 47, cpm: 235, accuracy: 97.5 },
      { timestamp: 240, wpm: 46, cpm: 230, accuracy: 97.1 },
      { timestamp: 300, wpm: 46, cpm: 230, accuracy: 97.2 },
    ],
    weakKeys: [{ key: 'ص', count: 2 }, { key: 'ض', count: 2 }],
    grade: 'A+',
  },
  {
    id: 'seed-res-3',
    traineeId: 'trainee-002',
    traineeName: 'Ayesha Siddiqua',
    rollNo: 'VTI-2026-IT-102',
    lessonId: 'ur-vti-01',
    lessonTitle: 'سبق ۴: وی ٹی آئی پیشہ ورانہ خط و کتابت',
    language: 'urdu',
    durationSeconds: 600,
    elapsedSeconds: 600,
    grossWpm: 52,
    netWpm: 51,
    cpm: 255,
    accuracy: 98.2,
    errorCount: 6,
    backspaceCount: 12,
    totalKeystrokes: 2550,
    completedAt: '2026-10-12T14:20:00Z',
    wpmTimeline: [
      { timestamp: 120, wpm: 50, cpm: 250, accuracy: 98 },
      { timestamp: 240, wpm: 51, cpm: 255, accuracy: 98.4 },
      { timestamp: 360, wpm: 52, cpm: 260, accuracy: 98.1 },
      { timestamp: 480, wpm: 51, cpm: 255, accuracy: 98.3 },
      { timestamp: 600, wpm: 51, cpm: 255, accuracy: 98.2 },
    ],
    weakKeys: [{ key: 'ٹ', count: 3 }, { key: 'ڈ', count: 3 }],
    grade: 'A+',
  },
  {
    id: 'seed-res-4',
    traineeId: 'trainee-003',
    traineeName: 'Bilal Ahmed Raza',
    rollNo: 'VTI-2026-IT-103',
    lessonId: 'en-vti-01',
    lessonTitle: 'Lesson 6: VTI Official Administrative Test',
    language: 'english',
    durationSeconds: 300,
    elapsedSeconds: 300,
    grossWpm: 54,
    netWpm: 52,
    cpm: 260,
    accuracy: 96.5,
    errorCount: 7,
    backspaceCount: 10,
    totalKeystrokes: 1300,
    completedAt: '2026-10-12T16:00:00Z',
    wpmTimeline: [
      { timestamp: 60, wpm: 50, cpm: 250, accuracy: 96 },
      { timestamp: 120, wpm: 52, cpm: 260, accuracy: 96.8 },
      { timestamp: 180, wpm: 53, cpm: 265, accuracy: 96.4 },
      { timestamp: 240, wpm: 52, cpm: 260, accuracy: 96.6 },
      { timestamp: 300, wpm: 52, cpm: 260, accuracy: 96.5 },
    ],
    weakKeys: [{ key: 'b', count: 4 }, { key: 'v', count: 3 }],
    grade: 'A',
  }
];

export const storage = {
  getTrainees(): TraineeProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRAINEES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(INITIAL_TRAINEES));
        return INITIAL_TRAINEES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TRAINEES;
    }
  },

  saveTrainees(trainees: TraineeProfile[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(trainees));
    } catch (e) {
      console.error('Failed to save trainees', e);
    }
  },

  getActiveTraineeId(): string {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_TRAINEE_ID) || 'trainee-001';
    } catch {
      return 'trainee-001';
    }
  },

  setActiveTraineeId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TRAINEE_ID, id);
    } catch (e) {
      console.error('Failed to set active trainee ID', e);
    }
  },

  getCustomLessons(): Lesson[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_LESSONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveCustomLessons(lessons: Lesson[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LESSONS, JSON.stringify(lessons));
    } catch (e) {
      console.error('Failed to save custom lessons', e);
    }
  },

  getAllLessons(): Lesson[] {
    const custom = this.getCustomLessons();
    return [...DEFAULT_LESSONS, ...custom];
  },

  getSessionResults(): SessionResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION_RESULTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SESSION_RESULTS, JSON.stringify(INITIAL_SEED_RESULTS));
        return INITIAL_SEED_RESULTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_SEED_RESULTS;
    }
  },

  saveSessionResult(result: SessionResult): void {
    try {
      const allResults = this.getSessionResults();
      const updatedResults = [result, ...allResults];
      localStorage.setItem(STORAGE_KEYS.SESSION_RESULTS, JSON.stringify(updatedResults));

      // Update trainee cumulative metrics
      const trainees = this.getTrainees();
      const traineeIndex = trainees.findIndex(t => t.id === result.traineeId);
      if (traineeIndex !== -1) {
        const trainee = trainees[traineeIndex];
        const studentResults = updatedResults.filter(r => r.traineeId === result.traineeId);
        
        let bestEn = trainee.bestEnglishWpm;
        let bestUr = trainee.bestUrduWpm;

        if (result.language === 'english' && result.netWpm > bestEn) {
          bestEn = result.netWpm;
        }
        if (result.language === 'urdu' && result.netWpm > bestUr) {
          bestUr = result.netWpm;
        }

        const totalMinutes = Math.round(studentResults.reduce((acc, r) => acc + (r.elapsedSeconds / 60), 0));
        const avgAcc = Number((studentResults.reduce((acc, r) => acc + r.accuracy, 0) / studentResults.length).toFixed(1));

        trainees[traineeIndex] = {
          ...trainee,
          bestEnglishWpm: bestEn,
          bestUrduWpm: bestUr,
          totalTests: studentResults.length,
          totalPracticeMinutes: totalMinutes,
          averageAccuracy: avgAcc,
        };
        this.saveTrainees(trainees);
      }
    } catch (e) {
      console.error('Failed to save session result', e);
    }
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  exportAllData(): string {
    const backup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      trainees: this.getTrainees(),
      activeTraineeId: this.getActiveTraineeId(),
      customLessons: this.getCustomLessons(),
      sessionResults: this.getSessionResults(),
      settings: this.getSettings(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const backup = JSON.parse(jsonString);
      if (backup.trainees && Array.isArray(backup.trainees)) {
        localStorage.setItem(STORAGE_KEYS.TRAINEES, JSON.stringify(backup.trainees));
      }
      if (backup.customLessons && Array.isArray(backup.customLessons)) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_LESSONS, JSON.stringify(backup.customLessons));
      }
      if (backup.sessionResults && Array.isArray(backup.sessionResults)) {
        localStorage.setItem(STORAGE_KEYS.SESSION_RESULTS, JSON.stringify(backup.sessionResults));
      }
      if (backup.settings) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(backup.settings));
      }
      if (backup.activeTraineeId) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_TRAINEE_ID, backup.activeTraineeId);
      }
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  },

  exportResultsToCSV(): string {
    const results = this.getSessionResults();
    const headers = ['ID', 'Date', 'Trainee', 'Roll No', 'Lesson', 'Language', 'Duration (Sec)', 'Net WPM', 'Gross WPM', 'CPM', 'Accuracy %', 'Errors', 'Grade'];
    const rows = results.map(r => [
      r.id,
      r.completedAt,
      `"${r.traineeName}"`,
      `"${r.rollNo}"`,
      `"${r.lessonTitle}"`,
      r.language,
      r.elapsedSeconds,
      r.netWpm,
      r.grossWpm,
      r.cpm,
      r.accuracy,
      r.errorCount,
      r.grade
    ]);
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }
};
