import React, { useState } from 'react';
import { 
  Trophy, Medal, Flame, Zap, Award, Crown, 
  Sparkles, Star, Target, ShieldCheck, ChevronUp
} from 'lucide-react';
import { SessionResult, TraineeProfile } from '../types';

interface Props {
  results: SessionResult[];
  trainees: TraineeProfile[];
  onOpenCertificate: (result: SessionResult) => void;
}

export const LeaderboardView: React.FC<Props> = ({
  results,
  trainees,
  onOpenCertificate,
}) => {
  const [langFilter, setLangFilter] = useState<'all' | 'english' | 'urdu'>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week'>('all');

  // Filter results
  const filtered = results.filter(r => {
    if (langFilter !== 'all' && r.language !== langFilter) return false;
    
    if (timeFilter !== 'all') {
      const now = new Date().getTime();
      const itemTime = new Date(r.completedAt).getTime();
      const diffHours = (now - itemTime) / (1000 * 60 * 60);
      if (timeFilter === 'today' && diffHours > 24) return false;
      if (timeFilter === 'week' && diffHours > 24 * 7) return false;
    }

    return true;
  });

  // Sort by highest Net WPM, then by Accuracy
  const sorted = [...filtered].sort((a, b) => {
    if (b.netWpm !== a.netWpm) return b.netWpm - a.netWpm;
    return b.accuracy - a.accuracy;
  });

  // Gamification Badges
  const badges = [
    {
      id: 'b1',
      title: 'VTI Speed Master',
      titleUrdu: 'ماسٹر ٹائپسٹ',
      desc: 'Achieve 60+ Net WPM in English exam',
      icon: '⚡',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300',
    },
    {
      id: 'b2',
      title: 'Urdu Katib Gold',
      titleUrdu: 'ماہر اردو کاتب',
      desc: 'Achieve 45+ Net WPM in Urdu Phonetic exam',
      icon: '✒️',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'b3',
      title: 'Flawless Accuracy',
      titleUrdu: 'بے عیب درستگی',
      desc: 'Complete an official test with 99%+ Accuracy',
      icon: '🎯',
      color: 'from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-300',
    },
    {
      id: 'b4',
      title: 'Endurance Marathoner',
      titleUrdu: 'طویل امتحانی نشست',
      desc: 'Complete a 30 to 60 minute typing session',
      icon: '⏱️',
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300',
    },
    {
      id: 'b5',
      title: 'VTI Certified Typist',
      titleUrdu: 'سرکاری سند یافتہ',
      desc: 'Pass official VTI vocational test with Grade A or A+',
      icon: '📜',
      color: 'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Vocational Institute Leaderboard</span>
            </span>
            <span className="text-xs text-slate-400">
              Live Trainee Rankings
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Competitive Leaderboard & Honors Hall
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-urdu">
            تمام زیرِ تربیت طلبہ و طالبات کے درمیان رفتار اور درستگی کا صحت مند مقابلہ
          </p>
        </div>

        {/* Podium Quick Stat */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl">
          <div className="p-2.5 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-400">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Institute Record</div>
            <div className="text-lg font-black text-amber-400 font-mono">
              {sorted[0]?.netWpm || 64} Net WPM
            </div>
            <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
              {sorted[0]?.traineeName || 'Ayesha Siddiqua'}
            </div>
          </div>
        </div>
      </div>

      {/* Gamification Badges Shelf */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Institute Badges & Gamification Milestones</span>
          </h3>
          <span className="text-xs text-slate-500 font-urdu">اعزازی تمغے</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-3 rounded-2xl bg-linear-to-b ${b.color} border flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-2xl">{b.icon}</span>
                <ShieldCheck className="w-4 h-4 opacity-75" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white leading-tight">{b.title}</h4>
                <div className="text-[11px] font-urdu opacity-85 mt-0.5">{b.titleUrdu}</div>
                <p className="text-[10px] text-slate-300/80 mt-1 line-clamp-2 leading-tight">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Table & Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-400" />
              <span>Top Speed Records</span>
            </h3>
            <p className="text-xs text-slate-400">
              Ranked by verified Net Words Per Minute and error penalties
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Language filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setLangFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  langFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLangFilter('english')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  langFilter === 'english' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLangFilter('urdu')}
                className={`px-3 py-1 rounded-lg font-medium font-urdu transition ${
                  langFilter === 'urdu' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                اردو
              </button>
            </div>

            {/* Time filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  timeFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All-Time
              </button>
              <button
                onClick={() => setTimeFilter('today')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  timeFilter === 'today' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeFilter('week')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  timeFilter === 'week' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                This Week
              </button>
            </div>
          </div>
        </div>

        {/* Top 3 Podium Highlights if available */}
        {sorted.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 pb-4">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 bg-slate-950/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
              <div className="w-10 h-10 rounded-full bg-slate-700/80 border-2 border-slate-400 text-slate-200 flex items-center justify-center font-bold text-sm mb-2 shadow-md">
                2
              </div>
              <div className="text-sm font-bold text-white">{sorted[1].traineeName}</div>
              <div className="text-[11px] text-slate-400 font-mono">{sorted[1].rollNo}</div>
              <div className="my-2">
                <div className="text-2xl font-black text-slate-200 font-mono">{sorted[1].netWpm} WPM</div>
                <div className="text-[10px] text-slate-400">{sorted[1].accuracy}% Accuracy</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                sorted[1].language === 'urdu' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {sorted[1].language}
              </span>
            </div>

            {/* 1st Place (Gold Champion) */}
            <div className="order-1 md:order-2 bg-linear-to-b from-amber-950/60 to-slate-950 border-2 border-amber-500/60 rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow-xl shadow-amber-500/10">
              <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg mb-2 shadow-lg shadow-amber-500/40">
                👑 1
              </div>
              <div className="text-base font-extrabold text-white">{sorted[0].traineeName}</div>
              <div className="text-xs text-amber-300 font-mono">{sorted[0].rollNo}</div>
              <div className="my-2">
                <div className="text-3xl font-black text-amber-400 font-mono">{sorted[0].netWpm} WPM</div>
                <div className="text-xs text-slate-300">{sorted[0].accuracy}% Accuracy • Grade {sorted[0].grade}</div>
              </div>
              <button
                onClick={() => onOpenCertificate(sorted[0])}
                className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3 bg-slate-950/80 border border-amber-900/40 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
              <div className="w-10 h-10 rounded-full bg-amber-900/60 border-2 border-amber-700 text-amber-300 flex items-center justify-center font-bold text-sm mb-2 shadow-md">
                3
              </div>
              <div className="text-sm font-bold text-white">{sorted[2].traineeName}</div>
              <div className="text-[11px] text-slate-400 font-mono">{sorted[2].rollNo}</div>
              <div className="my-2">
                <div className="text-2xl font-black text-amber-400/90 font-mono">{sorted[2].netWpm} WPM</div>
                <div className="text-[10px] text-slate-400">{sorted[2].accuracy}% Accuracy</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                sorted[2].language === 'urdu' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {sorted[2].language}
              </span>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/70 border-b border-slate-800">
              <tr>
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Trainee</th>
                <th className="py-3 px-3">Roll No</th>
                <th className="py-3 px-3">Language</th>
                <th className="py-3 px-3">Lesson Passage</th>
                <th className="py-3 px-3">Net WPM</th>
                <th className="py-3 px-3">Accuracy</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {sorted.map((r, index) => {
                const rank = index + 1;
                return (
                  <tr key={r.id} className="hover:bg-slate-850/60 transition">
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                        rank === 1 
                          ? 'bg-amber-400 text-slate-950' 
                          : rank === 2 
                          ? 'bg-slate-400 text-slate-950' 
                          : rank === 3 
                          ? 'bg-amber-700 text-amber-100' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans font-bold text-white">
                      {r.traineeName}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      {r.rollNo}
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        r.language === 'urdu' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {r.language}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-300 max-w-[180px] truncate">
                      {r.lessonTitle}
                    </td>
                    <td className="py-3 px-3 font-black text-emerald-400 text-sm">
                      {r.netWpm}
                    </td>
                    <td className="py-3 px-3 text-sky-300">
                      {r.accuracy}%
                    </td>
                    <td className="py-3 px-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        r.grade === 'A+' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {r.grade}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-sans">
                      <button
                        onClick={() => onOpenCertificate(r)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-semibold transition"
                      >
                        Certificate
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
