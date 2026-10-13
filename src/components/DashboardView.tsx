import React, { useState } from 'react';
import { 
  User, Award, TrendingUp, Clock, CheckCircle2, 
  Download, FileSpreadsheet, Plus, RefreshCw, BarChart3, ChevronRight 
} from 'lucide-react';
import { SessionResult, TraineeProfile } from '../types';

interface Props {
  activeTrainee: TraineeProfile;
  trainees: TraineeProfile[];
  results: SessionResult[];
  onSelectTrainee: (id: string) => void;
  onCreateTrainee: (newTrainee: Partial<TraineeProfile>) => void;
  onOpenCertificate: (result: SessionResult) => void;
  onExportCSV: () => void;
}

export const DashboardView: React.FC<Props> = ({
  activeTrainee,
  trainees,
  results,
  onSelectTrainee,
  onCreateTrainee,
  onOpenCertificate,
  onExportCSV,
}) => {
  const [showNewTraineeModal, setShowNewTraineeModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRollNo, setNewRollNo] = useState('');
  const [newBatch, setNewBatch] = useState('Morning');
  const [newAvatar, setNewAvatar] = useState('👨‍🎓');

  const [historyFilter, setHistoryFilter] = useState<'all' | 'english' | 'urdu'>('all');

  const traineeResults = results.filter(r => r.traineeId === activeTrainee.id);
  const filteredResults = traineeResults.filter(r => {
    if (historyFilter === 'all') return true;
    return r.language === historyFilter;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onCreateTrainee({
      name: newName.trim(),
      rollNo: newRollNo.trim() || `VTI-2026-${Math.floor(100 + Math.random() * 900)}`,
      institute: 'Vocational Training Institute (VTI)',
      batch: `Batch 2026 - ${newBatch}`,
      avatar: newAvatar,
    });

    setNewName('');
    setNewRollNo('');
    setShowNewTraineeModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Trainee Profile Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500/20 to-sky-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-3xl shadow-inner">
            {activeTrainee.avatar || '👨‍🎓'}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official Trainee
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Roll #: {activeTrainee.rollNo}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">
              {activeTrainee.name}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeTrainee.institute} • {activeTrainee.batch}
            </p>
          </div>
        </div>

        {/* Switch Trainee or Add New */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative">
            <select
              value={activeTrainee.id}
              onChange={(e) => onSelectTrainee(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-200 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
            >
              {trainees.map(t => (
                <option key={t.id} value={t.id}>
                  {t.avatar} {t.name} ({t.rollNo})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowNewTraineeModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* Trainee Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Best English WPM</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {activeTrainee.bestEnglishWpm}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">High Speed Record</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Best Urdu WPM</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {activeTrainee.bestUrduWpm}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-urdu">بہترین اردو رفتار</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Average Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-sky-400 font-mono">
            {activeTrainee.averageAccuracy || 0}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Quality Metric</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Tests Completed</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {activeTrainee.totalTests}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Total Exam Attempts</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Practice Time</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-orange-400 font-mono">
            {activeTrainee.totalPracticeMinutes}m
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {Math.floor(activeTrainee.totalPracticeMinutes / 60)}h {activeTrainee.totalPracticeMinutes % 60}m logged
          </div>
        </div>
      </div>

      {/* Speed Progression Trend Chart (CSS / SVG Canvas) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Speed Progression & Accuracy Trends</span>
            </h3>
            <p className="text-xs text-slate-400">
              Trajectory of recent typing tests for {activeTrainee.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Net Speed (WPM)
            </span>
            <span className="flex items-center gap-1.5 text-xs text-sky-400 font-medium">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              Accuracy %
            </span>
          </div>
        </div>

        {traineeResults.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs space-y-2">
            <Clock className="w-8 h-8 opacity-40" />
            <p>No tests logged yet for this trainee. Complete a practice drill to see speed curves.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-48 flex items-end gap-2 pt-6 pb-2 border-b border-slate-800 overflow-x-auto">
              {traineeResults.slice(0, 15).reverse().map((r, i) => {
                const maxWpm = 80;
                const heightPercent = Math.min(100, Math.max(10, (r.netWpm / maxWpm) * 100));

                return (
                  <div key={r.id} className="flex-1 min-w-[36px] flex flex-col items-center gap-1.5 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 bg-slate-950 border border-slate-700 text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20 shadow-xl">
                      <div className="font-bold">{r.netWpm} WPM • {r.accuracy}% Acc</div>
                      <div className="text-slate-400">{r.language === 'urdu' ? 'Urdu' : 'English'} • {r.lessonTitle.slice(0, 20)}...</div>
                    </div>

                    <div className="text-[10px] font-mono font-bold text-slate-300">
                      {r.netWpm}
                    </div>

                    <div className="w-full bg-slate-800/80 rounded-t-lg overflow-hidden flex flex-col justify-end h-32">
                      <div
                        className={`w-full transition-all duration-300 rounded-t-lg ${
                          r.language === 'urdu'
                            ? 'bg-linear-to-t from-amber-600 to-amber-400'
                            : 'bg-linear-to-t from-emerald-600 to-emerald-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <div className="text-[9px] text-slate-500 truncate w-full text-center">
                      #{i + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* History Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-sky-400" />
              <span>Session History Log</span>
            </h3>
            <p className="text-xs text-slate-400">
              Detailed records of all practice and exam sessions
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  historyFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setHistoryFilter('english')}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  historyFilter === 'english' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setHistoryFilter('urdu')}
                className={`px-3 py-1 rounded-lg font-medium font-urdu transition ${
                  historyFilter === 'urdu' ? 'bg-amber-600 text-white' : 'text-slate-400'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={onExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              title="Export complete session logs to CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            No session records matching the selected filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 bg-slate-950/70 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Lesson</th>
                  <th className="py-3 px-3">Language</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3">Net WPM</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-3">Errors</th>
                  <th className="py-3 px-3">Grade</th>
                  <th className="py-3 px-3 text-right">Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredResults.map(r => {
                  const dateStr = new Date(r.completedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr key={r.id} className="hover:bg-slate-850/60 transition">
                      <td className="py-3 px-3 text-slate-400">{dateStr}</td>
                      <td className="py-3 px-3 font-sans font-medium text-white max-w-[200px] truncate">
                        {r.lessonTitle}
                      </td>
                      <td className="py-3 px-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          r.language === 'urdu' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {r.language}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        {Math.round(r.elapsedSeconds / 60)} min
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-400 text-sm">
                        {r.netWpm}
                      </td>
                      <td className="py-3 px-3 text-sky-300">
                        {r.accuracy}%
                      </td>
                      <td className="py-3 px-3 text-rose-400">
                        {r.errorCount}
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
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg text-[11px] font-bold transition inline-flex items-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>View Cert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* New Trainee Profile Modal */}
      {showNewTraineeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                <span>Add New Trainee Profile</span>
              </h3>
              <button
                onClick={() => setShowNewTraineeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name / طالب علم کا نام
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Farhan Ali"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Roll Number / رجسٹریشن نمبر
                </label>
                <input
                  type="text"
                  value={newRollNo}
                  onChange={(e) => setNewRollNo(e.target.value)}
                  placeholder="e.g. VTI-2026-IT-105"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Shift / Batch
                  </label>
                  <select
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="Morning">Morning Shift</option>
                    <option value="Evening">Evening Shift</option>
                    <option value="Weekend">Weekend Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Avatar
                  </label>
                  <select
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  >
                    <option value="👨‍🎓">👨‍🎓 Male Student</option>
                    <option value="👩‍🎓">👩‍🎓 Female Student</option>
                    <option value="👨‍💻">👨‍💻 IT Trainee</option>
                    <option value="👩‍💻">👩‍💻 IT Trainee</option>
                    <option value="⭐">⭐ Star</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewTraineeModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
