import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  Trophy,
  Users,
  Swords,
  Sparkles,
  ShieldCheck,
  Star,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { Submission } from '../types';

export const AdminDashboardView: React.FC = () => {
  const {
    submissions,
    approveSubmission,
    rejectSubmission,
    tournaments,
    societies,
    toggleTournamentFeatured,
    toggleSocietyVerification,
    currentUser,
    setUserRole,
  } = usePlatform();

  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');
  const [selectedSubForInspect, setSelectedSubForInspect] = useState<Submission | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter === 'all') return true;
    return s.status === statusFilter;
  });

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>PADP Moderation Control Plane</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
            Ecosystem Admin & Moderation
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Review community submissions, verify authentic debate societies, and curate featured tournaments.
          </p>
        </div>

        {currentUser.role !== 'admin' && (
          <button
            onClick={() => setUserRole('admin')}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-md"
          >
            Switch to Admin Role
          </button>
        )}
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Pending Submissions</span>
          <p className="text-3xl font-extrabold font-display text-amber-500 mt-1">{pendingCount}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">Awaiting review</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Live Tournaments</span>
          <p className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 mt-1">{tournaments.length}</p>
          <span className="text-[11px] text-emerald-500 mt-1 block">Published on calendar</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Debate Societies</span>
          <p className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 mt-1">{societies.length}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {societies.filter((s) => s.verificationStatus === 'verified').length} Verified
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Total Actions</span>
          <p className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 mt-1">{submissions.length}</p>
          <span className="text-[11px] text-stone-500 mt-1 block">All-time submissions</span>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100">
              Community Moderation Queue
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Approve verified African debate events, new society registrations, and sparring calls.
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs font-semibold">
            {(['pending', 'approved', 'rejected', 'all'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {st} {st === 'pending' && pendingCount > 0 && `(${pendingCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List Table */}
        <div className="overflow-x-auto">
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No submissions found under status &ldquo;{statusFilter}&rdquo;.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Entity & Type</th>
                  <th className="py-3.5 px-4">Submitter</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                {filteredSubmissions.map((sub) => {
                  const title = sub.payload.title || sub.payload.name || 'Untitled Event';
                  return (
                    <tr key={sub.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {sub.type}
                          </span>
                          <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{title}</span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1 truncate max-w-sm">
                          {sub.payload.country || 'Pan-African'} &bull; {sub.payload.format || 'BP'} &bull; {sub.payload.description}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-semibold text-stone-800 dark:text-stone-200">{sub.submitterName}</p>
                        <p className="text-[11px] text-stone-500">{sub.submitterEmail}</p>
                        <span className="text-[10px] text-stone-400">{sub.submitterRole}</span>
                      </td>
                      <td className="py-4 px-4 text-stone-500 whitespace-nowrap">
                        {new Date(sub.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            sub.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : sub.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {sub.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                        {sub.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => approveSubmission(sub.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => rejectSubmission(sub.id)}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-rose-100 hover:text-rose-700 text-stone-700 dark:text-stone-300 font-semibold text-xs transition-all inline-flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic">Action Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Society Verification & Tournament Feature Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Debate Societies Verification */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Society Verification Status</span>
            </h3>
            <span className="text-xs text-stone-500">{societies.length} Listed</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {societies.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{s.name}</p>
                  <p className="text-[11px] text-stone-500">{s.city}, {s.country}</p>
                </div>
                <button
                  onClick={() => toggleSocietyVerification(s.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors shrink-0 ${
                    s.verificationStatus === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {s.verificationStatus === 'verified' ? '✓ Verified' : 'Mark Verified'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Tournaments Toggle */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Featured Tournaments (Homepage)</span>
            </h3>
            <span className="text-xs text-stone-500">{tournaments.length} Tournaments</span>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-stone-900 dark:text-stone-100 truncate">{t.title}</p>
                  <p className="text-[11px] text-stone-500">{t.city}, {t.country} &bull; {t.startDate}</p>
                </div>
                <button
                  onClick={() => toggleTournamentFeatured(t.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors shrink-0 ${
                    t.isFeatured
                      ? 'bg-amber-500 text-stone-950 shadow-sm'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {t.isFeatured ? '★ Featured' : 'Feature'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
