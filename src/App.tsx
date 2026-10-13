/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Keyboard, BookOpen, BarChart3, Trophy, Settings as SettingsIcon, 
  User, ShieldCheck, WifiOff, Monitor, Sparkles, CheckCircle2 
} from 'lucide-react';

import { AppSettings, Lesson, SessionResult, TraineeProfile } from './types';
import { storage } from './utils/storage';
import { TypingPractice } from './components/TypingPractice';
import { LessonSelector } from './components/LessonSelector';
import { DashboardView } from './components/DashboardView';
import { LeaderboardView } from './components/LeaderboardView';
import { CustomLessonModal } from './components/CustomLessonModal';
import { CertificateModal } from './components/CertificateModal';
import { OfflineGuideModal } from './components/OfflineGuideModal';
import { SettingsModal } from './components/SettingsModal';
import { PWAInstallButton } from './components/PWAInstallButton';

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'practice' | 'lessons' | 'dashboard' | 'leaderboard'>('practice');

  // Application state
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [trainees, setTrainees] = useState<TraineeProfile[]>([]);
  const [activeTrainee, setActiveTrainee] = useState<TraineeProfile | null>(null);
  const [sessionResults, setSessionResults] = useState<SessionResult[]>([]);
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());

  // Modals state
  const [showCustomLessonModal, setShowCustomLessonModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [activeCertificateResult, setActiveCertificateResult] = useState<SessionResult | null>(null);
  const [showOfflineGuideModal, setShowOfflineGuideModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Initialize data from local storage
  const loadData = () => {
    const loadedLessons = storage.getAllLessons();
    setLessons(loadedLessons);

    const loadedTrainees = storage.getTrainees();
    setTrainees(loadedTrainees);

    const activeId = storage.getActiveTraineeId();
    const active = loadedTrainees.find(t => t.id === activeId) || loadedTrainees[0];
    setActiveTrainee(active);

    const loadedResults = storage.getSessionResults();
    setSessionResults(loadedResults);

    // Default current lesson to first lesson if not set
    if (!currentLesson && loadedLessons.length > 0) {
      setCurrentLesson(loadedLessons[0]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Trainee selection
  const handleSelectTrainee = (id: string) => {
    storage.setActiveTraineeId(id);
    const found = trainees.find(t => t.id === id);
    if (found) {
      setActiveTrainee(found);
    }
  };

  // Trainee creation
  const handleCreateTrainee = (newTraineeData: Partial<TraineeProfile>) => {
    const newProfile: TraineeProfile = {
      id: `trainee-${Date.now()}`,
      name: newTraineeData.name || 'New Trainee',
      rollNo: newTraineeData.rollNo || `VTI-2026-${Math.floor(100 + Math.random() * 900)}`,
      institute: newTraineeData.institute || 'Vocational Training Institute (VTI)',
      batch: newTraineeData.batch || 'Batch 2026',
      avatar: newTraineeData.avatar || '👨‍🎓',
      bestEnglishWpm: 0,
      bestUrduWpm: 0,
      totalTests: 0,
      totalPracticeMinutes: 0,
      averageAccuracy: 0,
      joinedAt: new Date().toISOString(),
    };

    const updated = [newProfile, ...trainees];
    storage.saveTrainees(updated);
    setTrainees(updated);
    storage.setActiveTraineeId(newProfile.id);
    setActiveTrainee(newProfile);
  };

  // Save session result
  const handleSaveResult = (result: SessionResult) => {
    storage.saveSessionResult(result);
    // Reload state so dashboard and leaderboards reflect immediate changes
    loadData();
  };

  // Lesson actions
  const handleSaveCustomLesson = (newLesson: Lesson) => {
    const custom = storage.getCustomLessons();
    const existingIndex = custom.findIndex(l => l.id === newLesson.id);
    let updated: Lesson[];
    if (existingIndex !== -1) {
      updated = [...custom];
      updated[existingIndex] = newLesson;
    } else {
      updated = [newLesson, ...custom];
    }
    storage.saveCustomLessons(updated);
    loadData();
    setCurrentLesson(newLesson);
    setActiveTab('practice');
  };

  const handleDeleteCustomLesson = (lessonId: string) => {
    const custom = storage.getCustomLessons();
    const filtered = custom.filter(l => l.id !== lessonId);
    storage.saveCustomLessons(filtered);
    loadData();
    if (currentLesson?.id === lessonId) {
      const all = storage.getAllLessons();
      setCurrentLesson(all[0]);
    }
  };

  // Certificate Modal Action
  const handleOpenCertificate = (result: SessionResult) => {
    setActiveCertificateResult(result);
    setShowCertificateModal(true);
  };

  // Settings update
  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    storage.saveSettings(newSettings);
  };

  // CSV export
  const handleExportCSV = () => {
    try {
      const csvContent = storage.exportResultsToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VTI_Typing_Results_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export CSV', e);
    }
  };

  // Factory reset
  const handleResetFactoryData = () => {
    localStorage.clear();
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md shadow-lg no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Institute Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-950 border border-emerald-400/30">
                <Keyboard className="w-5 h-5 text-slate-950 font-bold" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
                    VTI Official Typing Master
                  </span>
                  <span className="hidden lg:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Offline Edition
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-urdu leading-tight">
                  پیشہ ورانہ انگلش و اردو ٹائپنگ ماسٹر — برائے ونڈوز ۷ اور ۱۰
                </div>
              </div>
            </div>

            {/* Active Trainee Selector & Quick Switch */}
            {activeTrainee && (
              <div className="hidden md:flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span>{activeTrainee.avatar}</span>
                  <span>{activeTrainee.name}</span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  ({activeTrainee.rollNo})
                </span>
              </div>
            )}

            {/* Desktop Install & Utilities */}
            <div className="flex items-center gap-2">
              {/* PWA Install Button & Windows Guide */}
              <PWAInstallButton onOpenOfflineGuide={() => setShowOfflineGuideModal(true)} />

              {/* Settings Gear */}
              <button
                onClick={() => setShowSettingsModal(true)}
                className="p-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white transition"
                title="Settings & Audio synthesis"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Bar Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 mt-3 pt-2.5 border-t border-slate-800/80 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'practice'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span>Typing Practice</span>
            </button>

            <button
              onClick={() => setActiveTab('lessons')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'lessons'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Lesson Plans & Passages</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-900 text-slate-300">
                {lessons.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Trainee Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition shrink-0 ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Competitive Leaderboard</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'practice' && currentLesson && activeTrainee && (
          <TypingPractice
            lesson={currentLesson}
            trainee={activeTrainee}
            settings={settings}
            onSaveResult={handleSaveResult}
            onOpenCertificate={handleOpenCertificate}
            onSelectAnotherLesson={() => setActiveTab('lessons')}
          />
        )}

        {activeTab === 'lessons' && currentLesson && (
          <LessonSelector
            lessons={lessons}
            selectedLesson={currentLesson}
            onSelectLesson={(lesson) => {
              setCurrentLesson(lesson);
              setActiveTab('practice');
            }}
            onOpenCreateLesson={() => setShowCustomLessonModal(true)}
            onDeleteCustomLesson={handleDeleteCustomLesson}
          />
        )}

        {activeTab === 'dashboard' && activeTrainee && (
          <DashboardView
            activeTrainee={activeTrainee}
            trainees={trainees}
            results={sessionResults}
            onSelectTrainee={handleSelectTrainee}
            onCreateTrainee={handleCreateTrainee}
            onOpenCertificate={handleOpenCertificate}
            onExportCSV={handleExportCSV}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            results={sessionResults}
            trainees={trainees}
            onOpenCertificate={handleOpenCertificate}
          />
        )}
      </main>

      {/* Footer / Offline Status Bar */}
      <footer className="bg-slate-900/90 border-t border-slate-800 py-3 px-4 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400 font-medium">100% Offline Standalone Mode</span>
            <span>• Compatible with Windows 7, Windows 10 & 11</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Vocational Training Institute (VTI)</span>
            <span>•</span>
            <span className="font-urdu text-[11px] text-amber-400/90">محنت، دیانت اور مسلسل مشق</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomLessonModal
        isOpen={showCustomLessonModal}
        onClose={() => setShowCustomLessonModal(false)}
        onSaveLesson={handleSaveCustomLesson}
      />

      <CertificateModal
        result={activeCertificateResult}
        onClose={() => setShowCertificateModal(false)}
      />

      <OfflineGuideModal
        isOpen={showOfflineGuideModal}
        onClose={() => setShowOfflineGuideModal(false)}
        onDataRestored={loadData}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetFactoryData={handleResetFactoryData}
      />
    </div>
  );
}
