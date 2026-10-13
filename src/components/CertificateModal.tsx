import React, { useRef } from 'react';
import { X, Printer, Award, CheckCircle, ShieldCheck, Download } from 'lucide-react';
import { SessionResult } from '../types';

interface Props {
  result: SessionResult | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<Props> = ({ result, onClose }) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(result.completedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const certificateNumber = `VTI-CERT-${result.rollNo.replace(/[^A-Za-z0-9]/g, '')}-${result.id.slice(-6).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto no-print">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 my-auto">
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white">VTI Official Certificate of Typing Proficiency</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30 transition hover:scale-[1.02]"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Frame */}
        <div
          ref={certificateRef}
          className="certificate-print-area bg-slate-950 text-slate-100 p-6 sm:p-10 rounded-2xl border-4 border-double border-amber-500/50 shadow-2xl relative overflow-hidden"
          style={{ minHeight: '520px' }}
        >
          {/* Subtle Background Watermark / Seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <div className="text-[120px] font-black text-amber-500 font-serif">VTI</div>
          </div>

          {/* Certificate Inner Border */}
          <div className="border border-amber-500/30 p-6 sm:p-8 rounded-xl h-full flex flex-col justify-between space-y-6 relative z-10">
            {/* Header / Logo */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>GOVERNMENT ACCREDITED VOCATIONAL TRAINING INSTITUTE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-white uppercase font-serif">
                Certificate of Typing Proficiency
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/80 font-urdu tracking-wide">
                شعبہ کمپیوٹر و دفتری امور — پیشہ ورانہ ٹائپنگ اسپیڈ و ایکوریسی سند
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Certificate No: <span className="font-bold text-slate-200">{certificateNumber}</span>
              </div>
            </div>

            {/* Candidate Declaration */}
            <div className="text-center space-y-3 py-2">
              <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider">
                This is to officially certify that
              </p>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 border-b-2 border-dashed border-amber-500/40 inline-block px-8 pb-1 font-serif">
                {result.traineeName}
              </div>
              <p className="text-xs text-slate-400">
                Bearing Roll / Registration Number: <span className="font-bold text-white font-mono">{result.rollNo}</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                has successfully completed the formal speed and precision evaluation in{' '}
                <strong className="text-white uppercase">{result.language === 'urdu' ? 'Urdu Phonetic (قومی فونیک کی بورڈ)' : 'English QWERTY'}</strong> typing at the Vocational Training Institute, fulfilling all requisite institutional benchmarks.
              </p>
            </div>

            {/* Performance Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center py-2">
              <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Net Speed (WPM)</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {result.netWpm}
                </div>
                <div className="text-[10px] text-slate-500">Words Per Minute</div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</div>
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                  {result.accuracy}%
                </div>
                <div className="text-[10px] text-slate-500">Gross: {result.grossWpm} WPM</div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Duration / Keystrokes</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-200 font-mono">
                  {Math.round(result.elapsedSeconds / 60)}m
                </div>
                <div className="text-[10px] text-slate-500">{result.totalKeystrokes} Strokes</div>
              </div>

              <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Proficiency Grade</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                  {result.grade}
                </div>
                <div className="text-[10px] text-slate-500">{result.errorCount} Errors</div>
              </div>
            </div>

            {/* Footer with Signatures and Date */}
            <div className="pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <div className="text-[11px] text-slate-400">Date of Evaluation:</div>
                <div className="text-xs font-bold text-white font-mono">{formattedDate}</div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 justify-center sm:justify-start">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Offline System Seal</span>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="text-center">
                  <div className="w-36 border-b border-slate-600 mb-1 font-serif italic text-xs text-slate-300">
                    Dr. M. Akram
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">
                    Typing Instructor
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-36 border-b border-slate-600 mb-1 font-serif italic text-xs text-amber-300 font-bold">
                    Engr. S. H. Kazmi
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold">
                    VTI Director
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
