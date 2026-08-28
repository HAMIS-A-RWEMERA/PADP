import React from 'react';
import {
  Trophy,
  Users,
  Swords,
  BookOpen,
  Compass,
  Sparkles,
  ArrowRight,
  Globe2,
  Calendar,
  MapPin,
  ShieldCheck,
  Flame,
  CheckCircle2,
  PlusCircle,
  Clock,
  GraduationCap,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
} from 'lucide-react';
import { usePlatform, NavView } from '../context/PlatformContext';
import { FormatBadge, StatusBadge, VerifiedBadge } from '../components/ui/Badge';
import { getDynamicTournamentStatus } from '../utils/dateUtils';
import { generateTournamentWhatsAppMessage, getDeepLinkUrl, shareToWhatsApp } from '../utils/shareUtils';

export const HomeView: React.FC = () => {
  const {
    setCurrentView,
    tournaments,
    societies,
    practiceSessions,
    resources,
    countries,
    setSelectedTournamentSlug,
    setSelectedSocietySlug,
    setSelectedFormatSlug,
    setSelectedResourceSlug,
    setSelectedCountrySlug,
    setIsSubmitModalOpen,
    setSubmitModalType,
    isTournamentBookmarked,
    toggleBookmarkTournament,
    rsvpPracticeSession,
    currentUser,
    showToast,
  } = usePlatform();

  const handleNav = (view: NavView, param?: string) => {
    if (view === 'countries' && param) {
      setSelectedCountrySlug(param);
    } else if (view === 'formats' && param) {
      setSelectedFormatSlug(param);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const upcomingTournaments = tournaments.slice(0, 4);
  const featuredSocieties = societies.slice(0, 4);
  const upcomingPractice = practiceSessions.slice(0, 3);
  const curatedResources = resources.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-stone-950 text-white border border-stone-800 shadow-2xl p-8 sm:p-12 lg:p-16">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pan-African Debate Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-stone-100 leading-tight">
            The Digital Ecosystem for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400">
              African Debaters
            </span>
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Discover upcoming championships across the continent, connect with university societies and school clubs, join online sparring rounds, and master international debate formats.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => handleNav('competitions')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Trophy className="w-4 h-4" />
              <span>Explore Competitions</span>
            </button>

            <button
              onClick={() => handleNav('practice')}
              className="px-6 py-3 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Join Sparring Rounds</span>
            </button>

            <button
              onClick={() => {
                setSubmitModalType('tournament');
                setIsSubmitModalOpen(true);
              }}
              className="px-5 py-3 rounded-xl bg-transparent hover:bg-stone-900 text-stone-400 hover:text-stone-200 border border-dashed border-stone-700 text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Event / Society</span>
            </button>
          </div>
        </div>

        {/* Live Ecosystem Stats Ticker */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-stone-800/80">
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800/60">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-amber-400">
              {tournaments.length}+
            </span>
            <p className="text-xs text-stone-400 mt-1 font-medium">Active African Tournaments</p>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800/60">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">
              {societies.length}+
            </span>
            <p className="text-xs text-stone-400 mt-1 font-medium">Societies & Leagues</p>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800/60">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-blue-400">
              {countries.length}
            </span>
            <p className="text-xs text-stone-400 mt-1 font-medium">National Hubs Covered</p>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800/60">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-purple-400">
              100+
            </span>
            <p className="text-xs text-stone-400 mt-1 font-medium">African Policy Motions</p>
          </div>
        </div>
      </section>

      {/* Featured & Upcoming Competitions Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4" />
              <span>Pan-African Circuit Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">
              Featured & Upcoming Tournaments
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Verified university opens, high school championships, and major continentals.
            </p>
          </div>

          <button
            onClick={() => handleNav('competitions')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group"
          >
            <span>View All {tournaments.length} Competitions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcomingTournaments.map((t) => {
            const isSaved = isTournamentBookmarked(t.id);
            const dynamicStatus = getDynamicTournamentStatus(
              t.startDate,
              t.endDate,
              t.registrationDeadline,
              t.status
            );

            return (
              <div
                key={t.id}
                onClick={() => setSelectedTournamentSlug(t.slug)}
                className="group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800/80 hover:border-amber-500/50 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <FormatBadge format={t.format} />
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold border ${dynamicStatus.badgeColorClass}`}>
                        {dynamicStatus.computedStatus}
                      </span>
                      <VerifiedBadge status={t.verificationStatus} />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const deepLink = getDeepLinkUrl(`tournaments/${t.slug}`);
                          const msg = generateTournamentWhatsAppMessage(t, deepLink);
                          shareToWhatsApp(msg);
                          showToast('success', 'Opening WhatsApp', `Sharing "${t.title}" announcement.`);
                        }}
                        className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmarkTournament(t.id);
                        }}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSaved
                            ? 'bg-amber-500 text-stone-950 border-amber-400'
                            : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 border-stone-200 dark:border-stone-700'
                        }`}
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark Tournament'}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {t.title}
                  </h3>

                  {/* Dynamic countdown */}
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{dynamicStatus.countdownLabel}</span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{t.city}, {t.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{t.startDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      Fee: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.registrationFee}</span>
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline flex items-center gap-1">
                      Details & Reg &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Sparring & Practice Live Feed */}
      <section className="bg-stone-900 rounded-3xl p-8 sm:p-10 border border-stone-800 text-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Swords className="w-4 h-4" />
              <span>Continental Sparring Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-100">
              Live Practice & Scrimmage Board
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Join online practice rounds hosted by African university debate societies and senior coaches.
            </p>
          </div>

          <button
            onClick={() => handleNav('practice')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            Open Sparring Hub &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingPractice.map((p) => {
            const isUserRsvpd = p.rsvps?.includes(currentUser.email);
            return (
              <div
                key={p.id}
                className="bg-stone-950/80 rounded-2xl p-5 border border-stone-800 flex flex-col justify-between hover:border-stone-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {p.format}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {p.slotsFilled}/{p.slotsAvailable} Spots
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-100 leading-snug line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Host: <span className="text-stone-300 font-medium">{p.hostOrg}</span>
                  </p>

                  {p.motionPrompt && (
                    <p className="text-xs text-amber-200/80 italic mt-3 bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                      &ldquo;{p.motionPrompt}&rdquo;
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">{p.sessionDate} &bull; {p.timeUTC}</span>
                  <button
                    onClick={() => rsvpPracticeSession(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isUserRsvpd
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {isUserRsvpd ? 'RSVP Confirmed' : 'RSVP Spot'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pan-African Formats Quick Visualizer */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>International & Regional Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">
              Master the Debate Formats
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Structured rules, speaker timelines, and scoring rubrics used in African competitions.
            </p>
          </div>

          <button
            onClick={() => handleNav('formats')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Explore Format Visualizers &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              code: 'BP',
              name: 'British Parliamentary',
              tagline: 'Standard university format across PAUDC and World Championships',
              speakers: '4 Teams, 8 Speakers (7 min)',
              badge: 'Most Popular',
            },
            {
              code: 'WSDC',
              name: 'World Schools',
              tagline: 'Premier high school debate standard across PAWSDC and national opens',
              speakers: '2 Teams, 6 Speakers (8 min)',
              badge: 'Schools Premier',
            },
            {
              code: 'AP',
              name: 'Asian Parliamentary',
              tagline: '3-on-3 structured parliamentary debate widely used in East & West Africa',
              speakers: '2 Teams, 6 Speakers (7 min)',
              badge: '3 vs 3 Format',
            },
            {
              code: 'PF',
              name: 'Public Forum',
              tagline: 'Fast-paced evidence-driven clash on current African economic affairs',
              speakers: '2 Teams, 4 Speakers (4 min)',
              badge: 'Policy Clashes',
            },
          ].map((fmt) => (
            <div
              key={fmt.code}
              onClick={() => handleNav('formats', fmt.code)}
              className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-display font-black text-base flex items-center justify-center border border-amber-500/20">
                    {fmt.code}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-stone-500 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                    {fmt.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {fmt.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">{fmt.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400 flex items-center justify-between">
                <span>{fmt.speakers}</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Debate Societies Directory Spotlight */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" />
              <span>Continental Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">
              Leading African Debate Societies
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Connect with active unions in Kigali, Nairobi, Accra, Lagos, Cape Town, and Cairo.
            </p>
          </div>

          <button
            onClick={() => handleNav('societies')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Browse All {societies.length} Societies &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredSocieties.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSocietySlug(s.slug)}
              className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-10 h-10 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                  />
                  <VerifiedBadge status={s.verificationStatus} />
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {s.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {s.city}, {s.country} &bull; {s.orgType}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
                <span>{s.memberCount}+ Members</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:underline">
                  Profile &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* African Regional & National Hubs Explorer */}
      <section className="bg-stone-50 dark:bg-stone-900/60 rounded-3xl p-8 sm:p-10 border border-stone-200 dark:border-stone-800">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe2 className="w-4 h-4" />
            <span>National Ecosystems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-stone-900 dark:text-stone-100">
            Explore African Debate by Country
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Access localized tournament calendars, institutional contacts, and national championship details.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => handleNav('countries', c.slug)}
              className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 hover:shadow-md transition-all text-left group"
            >
              <span className="text-3xl block mb-2">{c.flagEmoji}</span>
              <p className="font-bold text-xs text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {c.name}
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5">{c.activeSocietiesCount} Societies</p>
            </button>
          ))}
        </div>
      </section>

      {/* Curated Resources & Knowledge Base Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Knowledge Commons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">
              African Debate Guides & Motion Bank
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Strategy papers, adjudicator scales, and policy motions curated by continental champions.
            </p>
          </div>

          <button
            onClick={() => handleNav('resources')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            View Knowledge Commons &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {curatedResources.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedResourceSlug(r.slug)}
              className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {r.category}
                  </span>
                  <span className="text-[11px] text-stone-400">{r.readTimeMins} min read</span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                  {r.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                <span>By {r.authorName}</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
                  Read Guide &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Call to Action */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-stone-950 p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Are you organizing an African tournament or leading a debate society?
          </h3>
          <p className="text-stone-900/90 text-sm font-medium">
            List your tournament dates, publish spar calls, and recruit teams across Africa through the open PADP portal.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitModalType('tournament');
            setIsSubmitModalOpen(true);
          }}
          className="px-7 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-xl transition-all whitespace-nowrap hover:scale-105"
        >
          Submit to PADP Portal
        </button>
      </section>
    </div>
  );
};
