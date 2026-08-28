import React from 'react';
import {
  Globe2,
  MapPin,
  Trophy,
  Users,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { FormatBadge, StatusBadge, VerifiedBadge } from '../components/ui/Badge';

export const CountriesView: React.FC = () => {
  const {
    countries,
    selectedCountrySlug,
    setSelectedCountrySlug,
    tournaments,
    societies,
    setSelectedTournamentSlug,
    setSelectedSocietySlug,
    setCurrentView,
  } = usePlatform();

  const activeCountry = selectedCountrySlug
    ? countries.find((c) => c.slug === selectedCountrySlug)
    : null;

  // Filter country specific data
  const countryTournaments = activeCountry
    ? tournaments.filter((t) => t.country.toLowerCase() === activeCountry.name.toLowerCase())
    : [];

  const countrySocieties = activeCountry
    ? societies.filter((s) => s.country.toLowerCase() === activeCountry.name.toLowerCase())
    : [];

  return (
    <div className="space-y-8 pb-20">
      {/* If Country Hub is Selected */}
      {activeCountry ? (
        <div className="space-y-8 animate-in fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedCountrySlug(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pan-African Country Hubs</span>
          </button>

          {/* Country Hub Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{activeCountry.flagEmoji}</span>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {activeCountry.region} Regional Hub
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                  {activeCountry.name} Debate Circuit
                </h1>
              </div>
            </div>

            <p className="text-sm text-stone-300 max-w-3xl leading-relaxed">
              {activeCountry.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-stone-800/80 text-xs">
              <div>
                <span className="text-stone-400 block">Capital / Main Hub</span>
                <span className="font-bold text-stone-100 text-sm mt-0.5">{activeCountry.capitalCity}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Main Circuit Event</span>
                <span className="font-bold text-amber-400 text-sm mt-0.5">{activeCountry.highlightedDebateEvents[0] || 'National Open'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Active Societies</span>
                <span className="font-bold text-stone-100 text-sm mt-0.5">{activeCountry.activeSocietiesCount} Listed</span>
              </div>
              <div>
                <span className="text-stone-400 block">Dominant Formats</span>
                <span className="font-bold text-stone-100 text-sm mt-0.5">{activeCountry.popularFormats.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Tournaments in this Country */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Tournaments in {activeCountry.name} ({countryTournaments.length})</span>
              </h2>
            </div>

            {countryTournaments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
                No active tournaments currently scheduled in {activeCountry.name}. Check back or submit a regional open.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countryTournaments.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedTournamentSlug(t.slug);
                      setCurrentView('competitions');
                    }}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FormatBadge format={t.format} />
                        <StatusBadge status={t.status} />
                      </div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">{t.title}</h3>
                      <p className="text-xs text-stone-500 mt-1">{t.city} &bull; {t.startDate}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.registrationFee}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">Details &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Societies in this Country */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold font-display text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-500" />
              <span>Debate Societies & Unions in {activeCountry.name} ({countrySocieties.length})</span>
            </h2>

            {countrySocieties.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
                No societies listed under {activeCountry.name} yet. Register your union now!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {countrySocieties.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedSocietySlug(s.slug);
                      setCurrentView('societies');
                    }}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <img src={s.logo} alt={s.name} className="w-10 h-10 rounded-xl object-cover border shrink-0" />
                    <div className="min-w-0">
                      <VerifiedBadge status={s.verificationStatus} />
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-1 truncate">{s.name}</h4>
                      <p className="text-xs text-stone-500">{s.city} &bull; {s.memberCount}+ Members</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        /* All Countries Grid */
        <div className="space-y-8">
          <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <Globe2 className="w-4 h-4" />
              <span>Continental Ecosystems</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
              African National Debate Hubs
            </h1>
            <p className="text-sm text-stone-500 mt-1 max-w-3xl">
              Explore national championship systems, regional opens, and university debate federations across East, West, Southern, North, and Central Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCountrySlug(c.slug)}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{c.flagEmoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {c.region}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {c.name}
                  </h3>

                  <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Capital</span>
                    <span className="font-semibold text-stone-800 dark:text-stone-200">{c.capitalCity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Main Event</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 truncate max-w-[170px]">
                      {c.highlightedDebateEvents[0] || 'National Open'}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-amber-600 dark:text-amber-400 font-bold">
                    <span>Explore National Hub</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
