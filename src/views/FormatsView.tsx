import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Shield,
  Award,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  BarChart3,
  Layers,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { DebateFormatCode } from '../types';

export const FormatsView: React.FC = () => {
  const { formats, selectedFormatSlug, setSelectedFormatSlug } = usePlatform();

  const [activeFormatCode, setActiveFormatCode] = useState<DebateFormatCode>(
    (selectedFormatSlug as DebateFormatCode) || 'BP'
  );

  const activeFormat = formats.find((f) => f.shortCode === activeFormatCode) || formats[0];

  const scoringScale = [
    { range: '81 - 85', tier: 'Exceptional / Circuit Benchmark', desc: 'Flawless argumentation, highly structured weighing, decisive extensions, masterful POIs with devastating impact on round.' },
    { range: '76 - 80', tier: 'Strong / Clear Win Material', desc: 'Sophisticated analysis, clear impacts, responsive refutation, proactive POIs that control the central clashes.' },
    { range: '71 - 75', tier: 'Average / Competent Round', desc: 'Logically sound arguments, understandable structure, moderate refutation, but occasional vulnerability in comparative weighing.' },
    { range: '66 - 70', tier: 'Developing / Novice Standard', desc: 'Identifiable claims, but assertions often lack mechanized warrants or comparative link chains.' },
    { range: '60 - 65', tier: 'Minimal Argumentation', desc: 'Struggles with time limits, lacks engagement with the central burden of proof.' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Rules & Guidelines</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
          Pan-African Debate Formats & Rules
        </h1>
        <p className="text-sm text-stone-500 mt-1 max-w-3xl">
          Visual guides, speaking timelines, speaker roles, Points of Information (POIs), and official adjudication rubrics.
        </p>
      </div>

      {/* Format Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {formats.map((fmt) => {
          const isSelected = activeFormatCode === fmt.shortCode;
          return (
            <button
              key={fmt.shortCode}
              onClick={() => setActiveFormatCode(fmt.shortCode)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black font-display">{fmt.shortCode}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                    isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}
                >
                  {fmt.shortCode === 'BP' ? 'PAUDC / WUDC' : fmt.shortCode === 'WSDC' ? 'PAWSDC / WSDC' : 'Circuit'}
                </span>
              </div>
              <p className={`text-xs ${isSelected ? 'text-stone-950' : 'text-stone-500'}`}>{fmt.name}</p>
            </button>
          );
        })}
      </div>

      {/* Main Selected Format Breakdown */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-8">
        {/* Format Overview Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                {activeFormat.shortCode} Standard
              </span>
              <span className="text-xs text-stone-500">
                {activeFormat.speakerCount} Speakers &bull; {activeFormat.teamStructure}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100">
              {activeFormat.name}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
              {activeFormat.summary}
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs shrink-0">
            <div>
              <span className="text-stone-500 block">Prep Time</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{activeFormat.preparationTimeMins} Minutes</span>
            </div>
            <div>
              <span className="text-stone-500 block">Speech Length</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{activeFormat.speechDurationMins} Minutes / Speaker</span>
            </div>
          </div>
        </div>

        {/* Speech Timeline & Order of Speeches */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Speech Sequence & Speaker Roles
            </h3>
            <span className="text-xs text-stone-500">POI Protected Time: 1st & Last Minute</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeFormat.speakers.map((spk, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 flex items-start gap-3"
              >
                <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  #{idx + 1}
                </span>
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{spk.role}</span>
                    <span className="text-stone-500 font-mono">{spk.durationMins} mins</span>
                  </div>
                  <p className="text-amber-600 dark:text-amber-400 font-medium mt-0.5">{spk.side}</p>
                  <p className="text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">{spk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POI Rules & Adjudication Standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 text-sm flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Points of Information (POIs)
            </h4>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
              {activeFormat.poiAllowed
                ? 'Allowed between minute 1:00 and minute 6:00 (1:00-7:00 in WSDC). Direct, concise questions up to 15 seconds. Protected time during 1st and final minute.'
                : 'No POIs during substantive speeches. Format relies on dedicated Crossfire periods.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Adjudication Standard
            </h4>
            <div className="text-stone-700 dark:text-stone-300 leading-relaxed space-y-1">
              {activeFormat.adjudicationRules.map((rule, rIdx) => (
                <p key={rIdx}>&bull; {rule}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Speaker Scoring Scale Section */}
      <section className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Adjudicator Standard</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-stone-900 dark:text-stone-100">
            Standard African & International Speaker Scale (60 - 85)
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Used across PAUDC, PAWSDC, and regional circuit opens to calibrate speaker point allocations.
          </p>
        </div>

        <div className="space-y-2.5">
          {scoringScale.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-20 font-mono font-black text-sm text-amber-600 dark:text-amber-400 bg-white dark:bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-700 text-center">
                  {item.range}
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                  {item.tier}
                </span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
