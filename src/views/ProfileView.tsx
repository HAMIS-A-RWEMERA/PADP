import React from 'react';
import {
  User as UserIcon,
  Bookmark,
  BookOpen,
  Trophy,
  ShieldCheck,
  Building,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { DEMO_USERS } from '../data/seedData';
import { FormatBadge, StatusBadge } from '../components/ui/Badge';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    switchDemoUser,
    tournaments,
    resources,
    submissions,
    setSelectedTournamentSlug,
    setSelectedResourceSlug,
    toggleBookmarkTournament,
    toggleBookmarkResource,
    setCurrentView,
  } = usePlatform();

  const savedTournaments = tournaments.filter((t) =>
    currentUser.bookmarkedTournaments.includes(t.id)
  );

  const savedResources = resources.filter((r) =>
    currentUser.bookmarkedResources.includes(r.id)
  );

  const userSubmissions = submissions.filter(
    (s) => s.submitterEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Profile Header */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-display text-stone-900 dark:text-stone-100">
                  {currentUser.name}
                </h1>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {currentUser.role.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-stone-500">{currentUser.email}</p>
              <div className="flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-amber-500" />
                  {currentUser.institution || 'Pan-African Circuit'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  {currentUser.country}
                </span>
              </div>
            </div>
          </div>

          {/* Persona Switcher Quick Panel */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2 self-stretch sm:self-auto min-w-[220px]">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Switch Demo Persona:</span>
            <div className="space-y-1">
              {DEMO_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => switchDemoUser(u.email)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    currentUser.email === u.email
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span className="truncate">{u.name}</span>
                  <span className="text-[10px] opacity-80 capitalize">{u.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bookmarked Tournaments */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500" />
            <span>Saved Competitions ({savedTournaments.length})</span>
          </h2>
          <button
            onClick={() => setCurrentView('competitions')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Explore More &rarr;
          </button>
        </div>

        {savedTournaments.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
            You have not bookmarked any tournaments yet. Click the bookmark icon on any competition to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTournaments.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTournamentSlug(t.slug)}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FormatBadge format={t.format} />
                      <StatusBadge status={t.status} />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkTournament(t.id);
                      }}
                      className="text-stone-400 hover:text-rose-500 p-1"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">{t.city}, {t.country} &bull; {t.startDate}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.registrationFee}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">View Details &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bookmarked Guides & Resources */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Saved Study Guides ({savedResources.length})</span>
          </h2>
          <button
            onClick={() => setCurrentView('resources')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Explore Knowledge Commons &rarr;
          </button>
        </div>

        {savedResources.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
            No study guides bookmarked yet. Save guides for quick access during prep sessions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedResources.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedResourceSlug(r.slug)}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {r.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmarkResource(r.id);
                      }}
                      className="text-stone-400 hover:text-rose-500 p-1"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{r.title}</h3>
                  <p className="text-xs text-stone-500 mt-1">By {r.authorName} &bull; {r.readTimeMins} min read</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-end text-xs">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Open Reader &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* User's Submitted Activities Tracking */}
      {userSubmissions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100">
            My Submissions & Status ({userSubmissions.length})
          </h2>
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
              {userSubmissions.map((sub) => (
                <div key={sub.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400 mr-2">
                      {sub.type}
                    </span>
                    <strong className="text-stone-900 dark:text-stone-100 text-sm">
                      {sub.payload.title || sub.payload.name}
                    </strong>
                    <p className="text-stone-500 text-[11px] mt-0.5">Submitted on {new Date(sub.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                      sub.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : sub.status === 'rejected'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
