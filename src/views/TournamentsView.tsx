import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Globe,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  PlusCircle,
  LayoutGrid,
  List,
  Sparkles,
  Trophy,
  ArrowUpDown,
  X,
  MessageCircle,
  Clock,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { AfricanRegion, DebateFormatCode, DeliveryMode, Eligibility, TournamentStatus } from '../types';
import { FormatBadge, StatusBadge, VerifiedBadge } from '../components/ui/Badge';
import { getDynamicTournamentStatus } from '../utils/dateUtils';
import { generateTournamentWhatsAppMessage, getDeepLinkUrl, shareToWhatsApp } from '../utils/shareUtils';

export const TournamentsView: React.FC = () => {
  const {
    tournaments,
    setSelectedTournamentSlug,
    isTournamentBookmarked,
    toggleBookmarkTournament,
    setIsSubmitModalOpen,
    setSubmitModalType,
    showToast,
  } = usePlatform();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedEligibility, setSelectedEligibility] = useState<string>('All');
  const [viewLayout, setViewLayout] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'teams'>('date');

  const filteredTournaments = useMemo(() => {
    return tournaments
      .filter((t) => {
        const dynamicStatus = getDynamicTournamentStatus(
          t.startDate,
          t.endDate,
          t.registrationDeadline,
          t.status
        );

        // Search
        const q = searchQuery.toLowerCase().trim();
        if (
          q &&
          !t.title.toLowerCase().includes(q) &&
          !t.city.toLowerCase().includes(q) &&
          !t.country.toLowerCase().includes(q) &&
          !t.organizer.toLowerCase().includes(q)
        ) {
          return false;
        }

        // Region
        if (selectedRegion !== 'All' && t.region !== selectedRegion) return false;

        // Format
        if (selectedFormat !== 'All' && t.format !== selectedFormat) return false;

        // Mode
        if (selectedMode !== 'All' && t.deliveryMode !== selectedMode) return false;

        // Status matching against dynamic status or stored status
        if (selectedStatus !== 'All') {
          if (t.status !== selectedStatus && dynamicStatus.computedStatus !== selectedStatus) {
            return false;
          }
        }

        // Eligibility
        if (selectedEligibility !== 'All' && t.eligibility !== selectedEligibility) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'teams') {
          return (b.teamCap || 0) - (a.teamCap || 0);
        }
        return 0;
      });
  }, [
    tournaments,
    searchQuery,
    selectedRegion,
    selectedFormat,
    selectedMode,
    selectedStatus,
    selectedEligibility,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedRegion !== 'All' ||
    selectedFormat !== 'All' ||
    selectedMode !== 'All' ||
    selectedStatus !== 'All' ||
    selectedEligibility !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedFormat('All');
    setSelectedMode('All');
    setSelectedStatus('All');
    setSelectedEligibility('All');
  };

  const handleShareWhatsApp = (e: React.MouseEvent, t: typeof tournaments[0]) => {
    e.stopPropagation();
    const deepLink = getDeepLinkUrl(`tournaments/${t.slug}`);
    const msg = generateTournamentWhatsAppMessage(t, deepLink);
    shareToWhatsApp(msg);
    showToast('success', 'Opening WhatsApp', `Sharing "${t.title}" announcement.`);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span>Pan-African Circuit Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
            African Debate Competitions
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Browse upcoming national opens, continental championships, school tournaments, and online sparring opens.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitModalType('tournament');
            setIsSubmitModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Tournament</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        {/* Search & Top Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tournament name, host university, country (e.g. Kigali, Lagos, BP)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-800 dark:text-stone-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Name</option>
                <option value="teams">Sort by Capacity</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'grid'
                    ? 'bg-white dark:bg-stone-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'table'
                    ? 'bg-white dark:bg-stone-700 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                }`}
                title="List / Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills / Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="All">All Regions</option>
              <option value="East Africa">East Africa</option>
              <option value="West Africa">West Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="North Africa">North Africa</option>
              <option value="Central Africa">Central Africa</option>
              <option value="Pan-African & Global">Pan-African / Global</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="All">All Formats</option>
              <option value="BP">British Parliamentary (BP)</option>
              <option value="WSDC">World Schools (WSDC)</option>
              <option value="AP">Asian Parliamentary (AP)</option>
              <option value="PF">Public Forum (PF)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Delivery Mode</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="All">All Modes</option>
              <option value="In-Person">In-Person</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="All">All Statuses</option>
              <option value="Registration Open">Registration Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Registration Closed">Registration Closed</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Eligibility</label>
            <select
              value={selectedEligibility}
              onChange={(e) => setSelectedEligibility(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200"
            >
              <option value="All">All Eligibility</option>
              <option value="University">University</option>
              <option value="High School">High School</option>
              <option value="Open">Open</option>
              <option value="Novice">Novice</option>
            </select>
          </div>
        </div>

        {/* Active Filters Clear Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-stone-500">
              Showing <strong className="text-stone-900 dark:text-stone-100">{filteredTournaments.length}</strong> of{' '}
              {tournaments.length} tournaments
            </span>
            <button
              onClick={clearFilters}
              className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredTournaments.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Trophy className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">No tournaments match these filters</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your region or format filter, or contribute your own tournament to the community directory.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-semibold"
            >
              Clear Filters
            </button>
            <button
              onClick={() => {
                setSubmitModalType('tournament');
                setIsSubmitModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
            >
              Submit Tournament
            </button>
          </div>
        </div>
      )}

      {/* Grid View Layout */}
      {viewLayout === 'grid' && filteredTournaments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTournaments.map((t) => {
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
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <FormatBadge format={t.format} />
                      <span className={`text-xs px-2 py-0.5 rounded font-semibold border ${dynamicStatus.badgeColorClass}`}>
                        {dynamicStatus.computedStatus}
                      </span>
                      <VerifiedBadge status={t.verificationStatus} />
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleShareWhatsApp(e, t)}
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
                        title={isSaved ? 'Remove Bookmark' : 'Bookmark'}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {t.title}
                  </h3>

                  {/* Deadline countdown indicator */}
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{dynamicStatus.countdownLabel}</span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-2 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2.5 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{t.city}, {t.country}</span>
                    </span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300 shrink-0">
                      {t.deliveryMode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{t.startDate}</span>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.registrationFee}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">Organized by {t.organizer}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
                      View Details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table / List View Layout */}
      {viewLayout === 'table' && filteredTournaments.length > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Tournament</th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Dates</th>
                  <th className="py-3.5 px-4">Location & Mode</th>
                  <th className="py-3.5 px-4">Fee</th>
                  <th className="py-3.5 px-4">Status & Deadline</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                {filteredTournaments.map((t) => {
                  const isSaved = isTournamentBookmarked(t.id);
                  const dynamicStatus = getDynamicTournamentStatus(
                    t.startDate,
                    t.endDate,
                    t.registrationDeadline,
                    t.status
                  );

                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTournamentSlug(t.slug)}
                      className="hover:bg-stone-50 dark:hover:bg-stone-800/40 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">{t.title}</div>
                        <div className="text-stone-400 text-[11px]">{t.organizer}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <FormatBadge format={t.format} />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-stone-800 dark:text-stone-200">{t.startDate}</div>
                        <div className="text-[10px] text-stone-400">to {t.endDate}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{t.city}, {t.country}</div>
                        <div className="text-[10px] text-stone-400">{t.deliveryMode}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                        {t.registrationFee}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[11px] px-2 py-0.5 rounded font-semibold border ${dynamicStatus.badgeColorClass}`}>
                          {dynamicStatus.computedStatus}
                        </span>
                        <div className="text-[10px] text-stone-400 mt-0.5">Deadline: {t.registrationDeadline}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <button
                          onClick={(e) => handleShareWhatsApp(e, t)}
                          className="p-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                          title="Share to WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmarkTournament(t.id);
                          }}
                          className={`p-1.5 rounded-lg border inline-block ${
                            isSaved ? 'bg-amber-500 text-stone-950 border-amber-400' : 'text-stone-400 border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
