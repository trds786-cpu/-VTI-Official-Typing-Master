import React, { useState } from 'react';
import { 
  Search, Plus, BookOpen, Clock, Target, Trash2, 
  Sparkles, Globe, FileText, CheckCircle
} from 'lucide-react';
import { Lesson, Language, LessonCategory } from '../types';

interface Props {
  lessons: Lesson[];
  selectedLesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenCreateLesson: () => void;
  onDeleteCustomLesson: (lessonId: string) => void;
}

export const LessonSelector: React.FC<Props> = ({
  lessons,
  selectedLesson,
  onSelectLesson,
  onOpenCreateLesson,
  onDeleteCustomLesson,
}) => {
  const [languageFilter, setLanguageFilter] = useState<'all' | Language>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLessons = lessons.filter(l => {
    if (languageFilter !== 'all' && l.language !== languageFilter) return false;
    if (categoryFilter !== 'all' && l.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = l.title.toLowerCase().includes(q);
      const matchDesc = l.description.toLowerCase().includes(q);
      const matchContent = l.content.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchContent) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Curriculum</span>
            </span>
            <span className="text-xs text-slate-400">
              VTI Pakistan Accredited Syllabus
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Customizable Lesson Plans & Certification Drills
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu">
            انگریزی اور اردو فونیک ٹائپنگ کے لیے باقاعدہ اسباق، دفتری خطوط اور امتحانی پیراگراف
          </p>
        </div>

        <button
          onClick={onOpenCreateLesson}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/30 transition hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Lesson</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Language Pill Filters */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setLanguageFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              languageFilter === 'all'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All ({lessons.length})</span>
          </button>
          <button
            onClick={() => setLanguageFilter('english')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              languageFilter === 'english'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>English ({lessons.filter(l => l.language === 'english').length})</span>
          </button>
          <button
            onClick={() => setLanguageFilter('urdu')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-urdu transition flex items-center gap-1.5 ${
              languageFilter === 'urdu'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>اردو فونیک ({lessons.filter(l => l.language === 'urdu').length})</span>
          </button>
        </div>

        {/* Category selector & Search input */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-hidden focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="home_row">Home Row</option>
            <option value="top_row">Top Row</option>
            <option value="bottom_row">Bottom Row</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="vocational">Vocational / Official</option>
            <option value="exam_passages">Exam Passages</option>
            <option value="custom">Custom Lessons</option>
          </select>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons / سبق تلاش کریں..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((l) => {
          const isSelected = selectedLesson.id === l.id;
          const wordCount = l.content.trim().split(/\s+/).filter(Boolean).length;

          return (
            <div
              key={l.id}
              onClick={() => onSelectLesson(l)}
              className={`relative bg-slate-900 border rounded-2xl p-5 shadow-lg transition-all duration-150 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-slate-850 scale-[1.01]'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-850/80'
              }`}
            >
              <div>
                {/* Badges Bar */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      l.language === 'urdu'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-urdu'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {l.language === 'urdu' ? 'اردو' : 'English'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {l.isCustom && (
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-[10px] font-bold">
                        Custom Plan
                      </span>
                    )}

                    {l.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete custom lesson "${l.title}"?`)) {
                            onDeleteCustomLesson(l.id);
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded transition"
                        title="Delete custom lesson"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Lesson Title */}
                <h3
                  className={`text-base font-bold text-white group-hover:text-emerald-300 transition ${
                    l.language === 'urdu' ? 'font-urdu leading-relaxed' : ''
                  }`}
                >
                  {l.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {l.description}
                </p>

                {/* Content Preview */}
                <div
                  dir={l.language === 'urdu' ? 'rtl' : 'ltr'}
                  className={`mt-3 p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-400 line-clamp-2 select-none ${
                    l.language === 'urdu' ? 'font-urdu' : 'font-mono'
                  }`}
                >
                  {l.content}
                </div>
              </div>

              {/* Footer Meta & Action */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1 font-mono">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    {l.targetWpm} WPM
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    {wordCount} w
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  {isSelected ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="opacity-0 group-hover:opacity-100 transition text-xs">
                      Select Drill →
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No lessons matched your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or create a custom lesson using the button above.
          </p>
        </div>
      )}
    </div>
  );
};
