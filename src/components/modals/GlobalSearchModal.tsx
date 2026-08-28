import React, { useState, useEffect, useRef } from 'react';
import { Search, Trophy, Users, BookOpen, Compass, Sparkles, Globe2, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { FormatBadge, StatusBadge, VerifiedBadge } from '../ui/Badge';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    tournaments,
    societies,
    formats,
    resources,
    opportunities,
    countries,
    setCurrentView,
    setSelectedTournamentSlug,
    setSelectedSocietySlug,
    setSelectedFormatSlug,
    setSelectedResourceSlug,
    setSelectedCountrySlug,
  } = usePlatform();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedTournaments = cleanQuery
    ? tournaments.filter(
        (t) =>
          t.title.toLowerCase().includes(cleanQuery) ||
          t.city.toLowerCase().includes(cleanQuery) ||
          t.country.toLowerCase().includes(cleanQuery) ||
          t.format.toLowerCase().includes(cleanQuery) ||
          t.organizer.toLowerCase().includes(cleanQuery)
      )
    : tournaments.slice(0, 3);

  const matchedSocieties = cleanQuery
    ? societies.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQuery) ||
          s.country.toLowerCase().includes(cleanQuery) ||
          s.city.toLowerCase().includes(cleanQuery) ||
          (s.institution && s.institution.toLowerCase().includes(cleanQuery))
      )
    : societies.slice(0, 3);

  const matchedFormats = cleanQuery
    ? formats.filter(
        (f) =>
          f.name.toLowerCase().includes(cleanQuery) ||
          f.shortCode.toLowerCase().includes(cleanQuery) ||
          f.summary.toLowerCase().includes(cleanQuery)
      )
    : formats.slice(0, 2);

  const matchedResources = cleanQuery
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.category.toLowerCase().includes(cleanQuery) ||
          r.authorName.toLowerCase().includes(cleanQuery)
      )
    : resources.slice(0, 3);

  const matchedCountries = cleanQuery
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.region.toLowerCase().includes(cleanQuery) ||
          c.capitalCity.toLowerCase().includes(cleanQuery)
      )
    : [];

  const handleSelectTournament = (slug: string) => {
    setSelectedTournamentSlug(slug);
    setCurrentView('competitions');
    setIsSearchOpen(false);
  };

  const handleSelectSociety = (slug: string) => {
    setSelectedSocietySlug(slug);
    setCurrentView('societies');
    setIsSearchOpen(false);
  };

  const handleSelectFormat = (slug: string) => {
    setSelectedFormatSlug(slug);
    setCurrentView('formats');
    setIsSearchOpen(false);
  };

  const handleSelectResource = (slug: string) => {
    setSelectedResourceSlug(slug);
    setCurrentView('resources');
    setIsSearchOpen(false);
  };

  const handleSelectCountry = (slug: string) => {
    setSelectedCountrySlug(slug);
    setCurrentView('countries');
    setIsSearchOpen(false);
  };

  const totalResults =
    matchedTournaments.length +
    matchedSocieties.length +
    matchedFormats.length +
    matchedResources.length +
    matchedCountries.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tournaments, societies, formats, motions, guides across Africa..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-5 divide-y divide-stone-100 dark:divide-stone-800/80">
          {cleanQuery && totalResults === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-stone-500 mt-1">Try searching by country name (Rwanda, Kenya), format (BP, WSDC), or topic.</p>
            </div>
          )}

          {/* Tournaments */}
          {matchedTournaments.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Competitions ({matchedTournaments.length})
                </span>
                <button
                  onClick={() => {
                    setCurrentView('competitions');
                    setIsSearchOpen(false);
                  }}
                  className="text-xs text-stone-500 hover:text-amber-500 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1.5">
                {matchedTournaments.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTournament(t.slug)}
                    className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 border border-transparent hover:border-stone-200 dark:hover:border-stone-700/80 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {t.title}
                        </p>
                        <FormatBadge format={t.format} />
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {t.city}, {t.country} &bull; {t.startDate} &bull; <span className="font-medium text-stone-700 dark:text-stone-300">{t.deliveryMode}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={t.status} />
                      <CornerDownLeft className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Societies */}
          {matchedSocieties.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Debate Societies ({matchedSocieties.length})
                </span>
                <button
                  onClick={() => {
                    setCurrentView('societies');
                    setIsSearchOpen(false);
                  }}
                  className="text-xs text-stone-500 hover:text-amber-500 flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-1.5">
                {matchedSocieties.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSociety(s.slug)}
                    className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 border border-transparent hover:border-stone-200 dark:hover:border-stone-700/80 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={s.logo} alt={s.name} className="w-7 h-7 rounded-lg object-cover border" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {s.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {s.orgType} &bull; {s.city}, {s.country}
                        </p>
                      </div>
                    </div>
                    <VerifiedBadge status={s.verificationStatus} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {matchedResources.length > 0 && (
            <div className="pt-4">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Resources & Motions ({matchedResources.length})
                </span>
              </div>
              <div className="space-y-1.5">
                {matchedResources.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelectResource(r.slug)}
                    className="p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800/60 border border-transparent hover:border-stone-200 dark:hover:border-stone-700/80 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {r.title}
                      </p>
                      <p className="text-xs text-stone-500">
                        {r.category} &bull; {r.contentType} &bull; By {r.authorName}
                      </p>
                    </div>
                    <span className="text-xs text-stone-400 font-medium px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                      {r.readTimeMins} min
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries */}
          {matchedCountries.length > 0 && (
            <div className="pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 pb-2">
                <Globe2 className="w-3.5 h-3.5" /> African Country Hubs
              </span>
              <div className="grid grid-cols-2 gap-2">
                {matchedCountries.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleSelectCountry(c.slug)}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 hover:bg-amber-50 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 cursor-pointer transition-all flex items-center gap-2.5"
                  >
                    <span className="text-xl">{c.flagEmoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{c.name}</p>
                      <p className="text-[10px] text-stone-500">{c.region}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Search across 50+ African debate tournaments, societies & resources</span>
          <div className="flex items-center gap-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-stone-800 border rounded text-[10px] font-mono">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
