import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Keyboard, Clock, 
  Award, Eye, Flag, CheckCircle2, AlertCircle, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppSettings, Lesson, SessionResult, TraineeProfile, WeakKeyInfo, WpmPoint } from '../types';
import { soundManager } from '../utils/sound';
import { VirtualKeyboard } from './VirtualKeyboard';
import { DURATION_OPTIONS } from '../data/lessons';

interface Props {
  lesson: Lesson;
  trainee: TraineeProfile;
  settings: AppSettings;
  onSaveResult: (result: SessionResult) => void;
  onOpenCertificate: (result: SessionResult) => void;
  onSelectAnotherLesson: () => void;
}

export const TypingPractice: React.FC<Props> = ({
  lesson,
  trainee,
  settings,
  onSaveResult,
  onOpenCertificate,
  onSelectAnotherLesson,
}) => {
  // Session duration (in seconds) - 2 min up to 60 min
  const [selectedDuration, setSelectedDuration] = useState<number>(300); // 5 min default
  const [customMinutesInput, setCustomMinutesInput] = useState<number>(5);
  const [showDurationPicker, setShowDurationPicker] = useState<boolean>(false);

  // Practice state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Text progress state
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [backspaceCount, setBackspaceCount] = useState<number>(0);
  const [weakKeysMap, setWeakKeysMap] = useState<Record<string, number>>({});
  const [pressedKeyCode, setPressedKeyCode] = useState<string | null>(null);

  // Time & Analytics
  const [timeRemaining, setTimeRemaining] = useState<number>(selectedDuration);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [timeline, setTimeline] = useState<WpmPoint[]>([]);
  
  // Real-time metrics
  const [currentNetWpm, setCurrentNetWpm] = useState<number>(0);
  const [currentGrossWpm, setCurrentGrossWpm] = useState<number>(0);
  const [currentCpm, setCurrentCpm] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(100);

  // Result state
  const [finalResult, setFinalResult] = useState<SessionResult | null>(null);

  // Audio & UI toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(settings.soundType !== 'mute');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState<boolean>(settings.showKeyboard);

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Expand lesson content dynamically for long 2-60 minute sessions if needed
  const [fullLessonText, setFullLessonText] = useState<string>(lesson.content);

  useEffect(() => {
    // If duration is long (e.g. 10m+), repeat lesson content with a separator to give abundant typing text
    const repeats = Math.max(1, Math.ceil((selectedDuration / 60) * 1.5));
    if (repeats > 1) {
      setFullLessonText(Array(repeats).fill(lesson.content).join('  '));
    } else {
      setFullLessonText(lesson.content);
    }
    resetPractice(selectedDuration);
  }, [lesson, selectedDuration]);

  // Keep focus on input area
  const focusInput = () => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  };

  // Reset practice
  const resetPractice = (duration: number = selectedDuration) => {
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setTypedChars([]);
    setErrorCount(0);
    setBackspaceCount(0);
    setWeakKeysMap({});
    setTimeRemaining(duration);
    setElapsedSeconds(0);
    setTimeline([]);
    setCurrentNetWpm(0);
    setCurrentGrossWpm(0);
    setCurrentCpm(0);
    setCurrentAccuracy(100);
    setFinalResult(null);
    setTimeout(focusInput, 50);
  };

  // Duration change handler
  const handleDurationSelect = (seconds: number) => {
    setSelectedDuration(seconds);
    setCustomMinutesInput(Math.round(seconds / 60));
    setShowDurationPicker(false);
    resetPractice(seconds);
  };

  const handleCustomMinuteChange = (minutes: number) => {
    const validMinutes = Math.min(60, Math.max(2, minutes));
    setCustomMinutesInput(validMinutes);
    const secs = validMinutes * 60;
    setSelectedDuration(secs);
    resetPractice(secs);
  };

  // Calculate metrics
  const calculateMetrics = useCallback((typedLength: number, errors: number, seconds: number) => {
    if (seconds <= 0) return { grossWpm: 0, netWpm: 0, cpm: 0, accuracy: 100 };
    const minutes = seconds / 60;
    const grossWords = (typedLength / 5);
    const grossWpm = Math.round(grossWords / minutes);
    const netWords = Math.max(0, grossWords - errors);
    const netWpm = Math.round(netWords / minutes);
    const cpm = Math.round(typedLength / minutes);
    const accuracy = typedLength === 0 ? 100 : Math.max(0, Math.min(100, Number((((typedLength - errors) / typedLength) * 100).toFixed(1))));

    return { grossWpm, netWpm, cpm, accuracy };
  }, []);

  // Timer Tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && !isPaused && !isFinished) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleCompleteSession();
            return 0;
          }
          return prev - 1;
        });

        setElapsedSeconds(prev => {
          const nextElapsed = prev + 1;
          const { grossWpm, netWpm, cpm, accuracy } = calculateMetrics(typedChars.length, errorCount, nextElapsed);
          setCurrentGrossWpm(grossWpm);
          setCurrentNetWpm(netWpm);
          setCurrentCpm(cpm);
          setCurrentAccuracy(accuracy);

          // Record timeline sample every 2 seconds
          if (nextElapsed % 2 === 0 || nextElapsed === 1) {
            setTimeline(t => [...t, { timestamp: nextElapsed, wpm: netWpm, cpm, accuracy }]);
          }

          return nextElapsed;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, isFinished, typedChars.length, errorCount, calculateMetrics]);

  // Handle Session Completion
  const handleCompleteSession = useCallback(() => {
    setIsRunning(false);
    setIsFinished(true);

    const effectiveTime = Math.max(1, elapsedSeconds);
    const { grossWpm, netWpm, cpm, accuracy } = calculateMetrics(typedChars.length, errorCount, effectiveTime);

    // Calculate Grade
    let grade: SessionResult['grade'] = 'Needs Practice';
    if (accuracy >= 95 && netWpm >= (lesson.language === 'urdu' ? 40 : 50)) {
      grade = 'A+';
    } else if (accuracy >= 92 && netWpm >= (lesson.language === 'urdu' ? 30 : 40)) {
      grade = 'A';
    } else if (accuracy >= 85 && netWpm >= (lesson.language === 'urdu' ? 20 : 25)) {
      grade = 'B';
    } else if (accuracy >= 75) {
      grade = 'C';
    }

    const weakKeysList: WeakKeyInfo[] = Object.entries(weakKeysMap)
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const result: SessionResult = {
      id: `result-${Date.now()}`,
      traineeId: trainee.id,
      traineeName: trainee.name,
      rollNo: trainee.rollNo,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      language: lesson.language,
      durationSeconds: selectedDuration,
      elapsedSeconds: effectiveTime,
      grossWpm,
      netWpm,
      cpm,
      accuracy,
      errorCount,
      backspaceCount,
      totalKeystrokes: typedChars.length + backspaceCount,
      completedAt: new Date().toISOString(),
      wpmTimeline: timeline.length > 0 ? timeline : [{ timestamp: effectiveTime, wpm: netWpm, cpm, accuracy }],
      weakKeys: weakKeysList,
      grade,
    };

    setFinalResult(result);
    onSaveResult(result);

    // Sound chime & celebratory confetti
    soundManager.playFinishChime(settings.volume);
    if (grade === 'A+' || grade === 'A') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // no-op
      }
    }
  }, [
    elapsedSeconds, 
    typedChars.length, 
    errorCount, 
    calculateMetrics, 
    lesson, 
    weakKeysMap, 
    trainee, 
    selectedDuration, 
    backspaceCount, 
    timeline, 
    onSaveResult, 
    settings.volume
  ]);

  // Check if text is completely finished before timer expires
  useEffect(() => {
    if (isRunning && typedChars.length >= fullLessonText.length && fullLessonText.length > 0) {
      handleCompleteSession();
    }
  }, [typedChars.length, fullLessonText.length, isRunning, handleCompleteSession]);

  // Auto-scroll to active character
  useEffect(() => {
    if (settings.autoScroll && activeCharRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const target = activeCharRef.current;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const targetOffset = target.offsetTop - container.offsetTop;

      if (targetOffset < containerTop + 20 || targetOffset > containerTop + containerHeight - 60) {
        container.scrollTo({
          top: Math.max(0, targetOffset - 60),
          behavior: 'smooth'
        });
      }
    }
  }, [typedChars.length, settings.autoScroll]);

  // Handle Keystrokes
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;

    setPressedKeyCode(e.code);
    setTimeout(() => setPressedKeyCode(null), 120);

    // Ignore Meta, Alt, Ctrl navigation
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    // Start practice automatically on first typing stroke if not yet running
    if (!isRunning && !isPaused) {
      setIsRunning(true);
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (!settings.enableBackspace) return;
      if (typedChars.length > 0) {
        setBackspaceCount(b => b + 1);
        setTypedChars(prev => prev.slice(0, prev.length - 1));
        if (soundEnabled) {
          soundManager.playKeySound(settings.soundType, settings.volume * 0.7, false);
        }
      }
      return;
    }

    // Ignore Tab or other non-character navigation keys
    if (e.key === 'Tab' || e.key === 'Escape' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      return;
    }

    // Handle normal input
    if (e.key.length === 1 || e.key === 'Enter') {
      e.preventDefault();
      const inputChar = e.key === 'Enter' ? '\n' : e.key;
      const currentIndex = typedChars.length;
      const expectedChar = fullLessonText[currentIndex];

      if (!expectedChar) return;

      const isCorrect = inputChar === expectedChar;

      if (isCorrect) {
        if (soundEnabled) {
          soundManager.playKeySound(settings.soundType, settings.volume, inputChar === ' ');
        }
      } else {
        setErrorCount(err => err + 1);
        setWeakKeysMap(prev => ({
          ...prev,
          [expectedChar]: (prev[expectedChar] || 0) + 1
        }));
        soundManager.playErrorSound(settings.volume);
      }

      setTypedChars(prev => [...prev, inputChar]);
    }
  };

  const currentIndex = typedChars.length;
  const currentChar = fullLessonText[currentIndex] || '';
  const progressPercent = Math.min(100, Math.round((typedChars.length / fullLessonText.length) * 100));

  // Time remaining formatted MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                lesson.language === 'urdu' 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-urdu' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {lesson.language === 'urdu' ? 'اردو فونیک ٹائپنگ' : 'English QWERTY'}
              </span>
              <span className="text-xs text-slate-400">
                Target: {lesson.targetWpm} WPM • {lesson.targetAccuracy}% Acc
              </span>
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold text-white ${lesson.language === 'urdu' ? 'font-urdu' : ''}`}>
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl">
              {lesson.description}
            </p>
          </div>

          {/* Session Duration Selector & Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Duration Dropdown / Pill */}
            <div className="relative">
              <button
                onClick={() => setShowDurationPicker(!showDurationPicker)}
                disabled={isRunning}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                  isRunning 
                    ? 'bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed' 
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500/60 hover:text-white'
                }`}
                title="Select typing duration between 2 to 60 minutes"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Duration: {Math.round(selectedDuration / 60)} min</span>
              </button>

              {showDurationPicker && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-2xl z-40 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-200">Session Duration (2 - 60 Min)</span>
                    <span className="text-[11px] text-amber-400 font-urdu">وقت منتخب کریں</span>
                  </div>

                  {/* Preset duration buttons */}
                  <div className="grid grid-cols-3 gap-1.5 mb-4">
                    {DURATION_OPTIONS.map(opt => (
                      <button
                        key={opt.seconds}
                        onClick={() => handleDurationSelect(opt.seconds)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition ${
                          selectedDuration === opt.seconds
                            ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {opt.minutes}m
                      </button>
                    ))}
                  </div>

                  {/* Custom Minutes Slider (2 to 60 min) */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Custom Range:</span>
                      <span className="font-bold text-emerald-400">{customMinutesInput} Minutes</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={60}
                      step={1}
                      value={customMinutesInput}
                      onChange={(e) => handleCustomMinuteChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>2 min</span>
                      <span>15m</span>
                      <span>30m</span>
                      <span>45m</span>
                      <span>60 min</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) soundManager.playKeySound(settings.soundType, settings.volume);
              }}
              className={`p-2 rounded-xl border text-xs transition ${
                soundEnabled 
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={soundEnabled ? 'Mute Mechanical Keystroke Sound' : 'Enable Mechanical Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Virtual Keyboard Toggle */}
            <button
              onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
              className={`p-2 rounded-xl border text-xs transition ${
                showVirtualKeyboard 
                  ? 'bg-sky-950/50 border-sky-500/40 text-sky-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title="Toggle On-Screen Virtual Keyboard Guide"
            >
              <Keyboard className="w-4 h-4" />
            </button>

            {/* Change Lesson Button */}
            <button
              onClick={onSelectAnotherLesson}
              className="px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition"
            >
              Change Lesson
            </button>
          </div>
        </div>

        {/* Live Analytics Dashboard HUD */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-4 pt-4 border-t border-slate-800">
          {/* Time Remaining */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5 text-amber-400" /> Time</span>
              <span className="text-[10px] text-amber-400/80 font-urdu">وقت</span>
            </div>
            <div className={`text-2xl font-black font-mono tracking-wider ${
              timeRemaining < 30 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
            }`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${Math.max(0, (timeRemaining / selectedDuration) * 100)}%` }}
              />
            </div>
          </div>

          {/* Net WPM (Official Exam Standard) */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="flex items-center gap-1 font-medium"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Net WPM</span>
              <span className="text-[10px] text-emerald-400/80 font-urdu">خالص رفتار</span>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {currentNetWpm}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Target: {lesson.targetWpm} WPM
            </div>
          </div>

          {/* Gross WPM */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-medium">Gross WPM</span>
              <span className="text-[10px] text-slate-500 font-urdu">کل الفاظ</span>
            </div>
            <div className="text-2xl font-black text-slate-200 font-mono">
              {currentGrossWpm}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              CPM: {currentCpm}
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-medium">Accuracy</span>
              <span className="text-[10px] text-sky-400/80 font-urdu">درستگی</span>
            </div>
            <div className={`text-2xl font-black font-mono ${
              currentAccuracy >= 95 ? 'text-emerald-400' : currentAccuracy >= 85 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {currentAccuracy}%
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  currentAccuracy >= 95 ? 'bg-emerald-400' : currentAccuracy >= 85 ? 'bg-amber-400' : 'bg-rose-400'
                }`}
                style={{ width: `${currentAccuracy}%` }}
              />
            </div>
          </div>

          {/* Errors & Backspaces */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-medium">Errors</span>
              <span className="text-[10px] text-rose-400/80 font-urdu">غلطیاں</span>
            </div>
            <div className="text-2xl font-black text-rose-400 font-mono">
              {errorCount}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Backspaces: {backspaceCount}
            </div>
          </div>

          {/* Progress % */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-medium">Progress</span>
              <span className="text-[10px] text-purple-400/80 font-urdu">پیش رفت</span>
            </div>
            <div className="text-2xl font-black text-purple-400 font-mono">
              {progressPercent}%
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-purple-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Typing Canvas Area */}
      <div 
        onClick={focusInput}
        className="relative bg-slate-900 border-2 border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl transition cursor-text group"
      >
        {/* Hidden textarea to capture user keystrokes cleanly on all devices */}
        <textarea
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 w-0 h-0 pointer-events-none"
          autoFocus
          readOnly={isFinished}
        />

        {/* Start / Pause overlay banner if not yet typing */}
        {!isRunning && !isFinished && (
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Click & Start Typing Anytime</span>
          </div>
        )}

        {/* Text Presentation Box */}
        <div 
          ref={textContainerRef}
          dir={lesson.language === 'urdu' ? 'rtl' : 'ltr'}
          className={`max-h-[220px] overflow-y-auto pr-2 select-none leading-relaxed transition-all ${
            lesson.language === 'urdu' ? 'font-urdu text-2xl sm:text-3xl' : 'font-mono-typing text-xl sm:text-2xl'
          }`}
          style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
        >
          {fullLessonText.split('').map((char, index) => {
            const isTyped = index < typedChars.length;
            const typedChar = typedChars[index];
            const isCurrent = index === currentIndex;
            const isCorrect = isTyped && typedChar === char;

            let charClass = 'text-slate-500'; // Upcoming character

            if (isTyped) {
              if (isCorrect) {
                charClass = 'text-emerald-400 font-medium';
              } else {
                charClass = 'text-rose-400 bg-rose-950/60 rounded underline decoration-rose-500 font-bold';
              }
            }

            return (
              <span
                key={index}
                ref={isCurrent ? activeCharRef : null}
                className={`relative inline-block transition-colors duration-75 ${charClass} ${
                  isCurrent 
                    ? 'bg-amber-400/20 text-white rounded ring-2 ring-amber-400 font-bold' 
                    : ''
                }`}
              >
                {/* Flashing Caret on Active Character */}
                {isCurrent && (
                  <span className="absolute -top-1 bottom-0 left-0 w-0.5 bg-amber-400 animate-pulse pointer-events-none" />
                )}
                {char === ' ' ? ' ' : char}
              </span>
            );
          })}
        </div>

        {/* Session Bottom Bar Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-300">Trainee:</span>
            <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-slate-200 font-semibold">
              {trainee.avatar} {trainee.name} ({trainee.rollNo})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isRunning && !isPaused && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            )}

            {isPaused && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(false);
                  setTimeout(focusInput, 50);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-bold"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                resetPractice();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition"
              title="Restart Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>

            {isRunning && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteSession();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 rounded-lg transition"
                title="Finish test early and evaluate results"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Finish Test</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Virtual Keyboard (Interactive live guide) */}
      {showVirtualKeyboard && (
        <VirtualKeyboard
          currentChar={currentChar}
          activeLanguage={lesson.language}
          showFingerGuide={settings.showFingerGuide}
          pressedKeyCode={pressedKeyCode}
        />
      )}

      {/* Completion Modal / Analytical Report */}
      {isFinished && finalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
                <Award className="w-4 h-4 text-amber-400" />
                <span>VTI Official Test Completed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Typing Evaluation & Speed Report
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-urdu">
                پیشہ ورانہ ٹائپنگ ٹیسٹ کی تفصیلی رپورٹ اور اسپیڈ تجزیہ
              </p>
            </div>

            {/* Big Grade Badge & Key Score Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs text-slate-400 mb-1">Net Speed</div>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  {finalResult.netWpm}
                </div>
                <div className="text-[11px] text-slate-500">Words / Min</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs text-slate-400 mb-1">Accuracy</div>
                <div className={`text-3xl font-black font-mono ${
                  finalResult.accuracy >= 95 ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {finalResult.accuracy}%
                </div>
                <div className="text-[11px] text-slate-500">Gross: {finalResult.grossWpm} WPM</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs text-slate-400 mb-1">Total CPM</div>
                <div className="text-3xl font-black text-sky-400 font-mono">
                  {finalResult.cpm}
                </div>
                <div className="text-[11px] text-slate-500">Chars / Min</div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs text-slate-400 mb-1">Official Grade</div>
                <div className={`text-3xl font-black ${
                  finalResult.grade === 'A+' ? 'text-amber-400' : finalResult.grade === 'A' ? 'text-emerald-400' : 'text-sky-400'
                }`}>
                  {finalResult.grade}
                </div>
                <div className="text-[11px] text-slate-500">{finalResult.errorCount} Errors</div>
              </div>
            </div>

            {/* Test Details & Trainee Info */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Trainee Name:</span>
                <span className="font-bold text-white">{finalResult.traineeName} ({finalResult.rollNo})</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Lesson / Passage:</span>
                <span className="font-bold text-slate-200">{finalResult.lessonTitle}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Time Elapsed:</span>
                <span className="font-bold text-slate-200 font-mono">
                  {Math.floor(finalResult.elapsedSeconds / 60)}m {finalResult.elapsedSeconds % 60}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Keystrokes & Backspaces:</span>
                <span className="font-bold text-slate-200 font-mono">
                  {finalResult.totalKeystrokes} strokes • {finalResult.backspaceCount} backspaces
                </span>
              </div>
            </div>

            {/* Weak Keys & Feedback Section */}
            {finalResult.weakKeys.length > 0 && (
              <div className="bg-rose-950/30 border border-rose-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>Problem Keys Requiring Finger Drills:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {finalResult.weakKeys.map(wk => (
                    <span 
                      key={wk.key}
                      className="px-2.5 py-1 bg-rose-900/60 border border-rose-500/30 rounded-lg text-xs font-bold text-rose-200"
                    >
                      '{wk.key === ' ' ? 'Space' : wk.key}' ({wk.count} missed)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => resetPractice()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-slate-200 transition"
              >
                Try Again / Retake
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onOpenCertificate(finalResult)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold shadow-lg shadow-amber-900/30 transition hover:scale-[1.02]"
                >
                  <Award className="w-4 h-4" />
                  <span>VTI Official Certificate</span>
                </button>

                <button
                  onClick={() => {
                    setIsFinished(false);
                    onSelectAnotherLesson();
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
