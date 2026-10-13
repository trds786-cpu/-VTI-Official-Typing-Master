import React, { useState } from 'react';
import { X, Plus, BookOpen, AlertCircle } from 'lucide-react';
import { Lesson, Language, LessonCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveLesson: (lesson: Lesson) => void;
  existingLesson?: Lesson | null;
}

export const CustomLessonModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSaveLesson,
  existingLesson,
}) => {
  const [title, setTitle] = useState(existingLesson?.title || '');
  const [language, setLanguage] = useState<Language>(existingLesson?.language || 'english');
  const [content, setContent] = useState(existingLesson?.content || '');
  const [description, setDescription] = useState(existingLesson?.description || '');
  const [targetWpm, setTargetWpm] = useState<number>(existingLesson?.targetWpm || 35);
  const [targetAccuracy, setTargetAccuracy] = useState<number>(existingLesson?.targetAccuracy || 95);
  const [category, setCategory] = useState<LessonCategory>(existingLesson?.category || 'custom');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a lesson title.');
      return;
    }
    if (!content.trim() || content.trim().length < 15) {
      setError('Lesson content must be at least 15 characters long.');
      return;
    }

    const newLesson: Lesson = {
      id: existingLesson?.id || `custom-lesson-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || `Custom ${language} typing drill`,
      language,
      category,
      content: content.trim(),
      targetWpm: Number(targetWpm) || 35,
      targetAccuracy: Number(targetAccuracy) || 95,
      isCustom: true,
      createdAt: existingLesson?.createdAt || new Date().toISOString(),
    };

    onSaveLesson(newLesson);
    onClose();
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {existingLesson ? 'Edit Custom Lesson' : 'Create Custom Lesson Plan'}
              </h2>
              <p className="text-xs text-slate-400">
                Add your own English or Urdu typing passages for institutional training
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

        {error && (
          <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lesson Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLanguage('english')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                    language === 'english'
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  English (QWERTY)
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('urdu')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold font-urdu transition ${
                    language === 'urdu'
                      ? 'bg-amber-600 text-white border-amber-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  اردو (Phonetic)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lesson Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as LessonCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="custom">Custom Drill</option>
                <option value="vocational">Vocational / Official</option>
                <option value="exam_passages">Exam Passage</option>
                <option value="vocabulary">Vocabulary & Terms</option>
                <option value="home_row">Home Row Focus</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={language === 'urdu' ? 'مثال: سرکاری مراسلہ اور دفتری خطوط' : 'e.g., Office Administration Document Drill #1'}
              dir={language === 'urdu' ? 'rtl' : 'ltr'}
              className={`w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 ${
                language === 'urdu' ? 'font-urdu' : ''
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Target 40 WPM for junior clerk examination"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Lesson Passage Text
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {charCount} characters • {wordCount} words
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                language === 'urdu' 
                  ? 'یہاں اپنا اردو متن ٹائپ کریں یا پیسٹ کریں...' 
                  : 'Type or paste the English training passage here...'
              }
              rows={6}
              dir={language === 'urdu' ? 'rtl' : 'ltr'}
              className={`w-full bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 ${
                language === 'urdu' ? 'font-urdu leading-loose' : 'font-mono'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Speed (WPM)
              </label>
              <input
                type="number"
                min={10}
                max={140}
                value={targetWpm}
                onChange={(e) => setTargetWpm(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Accuracy (%)
              </label>
              <input
                type="number"
                min={70}
                max={100}
                value={targetAccuracy}
                onChange={(e) => setTargetAccuracy(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4" />
              <span>Save Lesson Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
