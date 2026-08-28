import React, { useState, useMemo } from 'react';
import {
  Search,
  Users,
  MapPin,
  ShieldCheck,
  Globe,
  PlusCircle,
  Sparkles,
  Building,
  GraduationCap,
  ExternalLink,
  X,
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  RotateCcw,
  Share2,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { VerifiedBadge } from '../components/ui/Badge';
import { DebateFormatCode, OrgType } from '../types';

export const SocietiesView: React.FC = () => {
  const {
    societies,
    setSelectedSocietySlug,
    setIsSubmitModalOpen,
    setSubmitModalType,
  } = usePlatform();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedOrgType, setSelectedOrgType] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);

  // Extract unique countries dynamically
  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    societies.forEach((s) => {
      if (s.country) set.add(s.country);
    });
    return Array.from(set).sort();
  }, [societies]);

  const filteredSocieties = useMemo(() => {
    return societies.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.city.toLowerCase().includes(q) &&
        !s.country.toLowerCase().includes(q) &&
        !(s.institution && s.institution.toLowerCase().includes(q)) &&
        !s.description.toLowerCase().includes(q)
      ) {
        return false;
      }

      if (selectedCountry !== 'All' && s.country !== selectedCountry) return false;
      if (selectedRegion !== 'All' && s.region !== selectedRegion) return false;
      if (selectedOrgType !== 'All' && s.orgType !== selectedOrgType) return false;
      if (selectedFormat !== 'All' && !s.formats.includes(selectedFormat as DebateFormatCode)) return false;
      if (onlyVerified && s.verificationStatus !== 'verified') return false;

      // Platform / Social Media Filter
      if (selectedPlatform !== 'All') {
        const links = s.socialLinks || {};
        if (selectedPlatform === 'whatsapp' && !links.whatsapp) return false;
        if (selectedPlatform === 'discord' && !links.discord) return false;
        if (selectedPlatform === 'facebook' && !links.facebook) return false;
        if (selectedPlatform === 'twitter' && !links.twitter) return false;
        if (selectedPlatform === 'instagram' && !links.instagram) return false;
        if (selectedPlatform === 'linkedin' && !links.linkedin) return false;
        if (selectedPlatform === 'website' && !s.websiteUrl) return false;
      }

      return true;
    });
  }, [
    societies,
    searchQuery,
    selectedCountry,
    selectedRegion,
    selectedOrgType,
    selectedFormat,
    selectedPlatform,
    onlyVerified,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCountry !== 'All' ||
    selectedRegion !== 'All' ||
    selectedOrgType !== 'All' ||
    selectedFormat !== 'All' ||
    selectedPlatform !== 'All' ||
    onlyVerified;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All');
    setSelectedRegion('All');
    setSelectedOrgType('All');
    setSelectedFormat('All');
    setSelectedPlatform('All');
    setOnlyVerified(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Users className="w-4 h-4" />
            <span>Continental Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
            African Debate Societies & Clubs
          </h1>
          <p className="text-sm text-stone-500 mt-1 max-w-3xl">
            Find active debate societies across Africa. Filter by country, parliamentary format, university type, or community platform (WhatsApp, Discord, Facebook, X).
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitModalType('organization');
            setIsSubmitModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register Debate Society</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        {/* Search Bar + Verified Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by society name, university (e.g. Makerere, Cape Town, Legon, Cairo)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setOnlyVerified(!onlyVerified)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all shrink-0 ${
              onlyVerified
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Only</span>
          </button>
        </div>

        {/* Multi-Filter Select Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
          {/* Country Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Regions</option>
              <option value="East Africa">East Africa</option>
              <option value="West Africa">West Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="North Africa">North Africa</option>
              <option value="Central Africa">Central Africa</option>
            </select>
          </div>

          {/* Format Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Debate Format</label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Formats</option>
              <option value="BP">British Parliamentary (BP)</option>
              <option value="WSDC">World Schools (WSDC)</option>
              <option value="AP">Asian Parliamentary (AP)</option>
              <option value="PF">Public Forum (PF)</option>
            </select>
          </div>

          {/* Platform / Social Media Filter */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Platform / Socials</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Platforms</option>
              <option value="whatsapp">WhatsApp Community / Group</option>
              <option value="discord">Discord Server</option>
              <option value="facebook">Facebook Group / Page</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter / X</option>
              <option value="website">Official Website</option>
            </select>
          </div>

          {/* Organization Type */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Org Type</label>
            <select
              value={selectedOrgType}
              onChange={(e) => setSelectedOrgType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Types</option>
              <option value="University Society">University Society</option>
              <option value="School Club">School Club</option>
              <option value="National Association">National Association</option>
              <option value="Community Org">Community Org</option>
              <option value="Debate Academy">Debate Academy</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex items-center justify-between pt-2 text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
          <div>
            Showing <strong className="text-stone-900 dark:text-stone-100">{filteredSocieties.length}</strong> of{' '}
            {societies.length} societies
            {selectedPlatform !== 'All' && (
              <span className="ml-1 text-amber-600 dark:text-amber-400 font-semibold">
                &bull; Filtered by {selectedPlatform.toUpperCase()}
              </span>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Societies Grid */}
      {filteredSocieties.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
            No debate societies found
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try loosening your filters or search terms. You can also register a new society if it is not yet listed.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-800 text-white text-xs font-semibold mt-2"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSocieties.map((s) => {
            const links = s.socialLinks || {};
            return (
              <div
                key={s.id}
                onClick={() => setSelectedSocietySlug(s.slug)}
                className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-stone-200 dark:border-stone-700 shrink-0 shadow-sm"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <VerifiedBadge status={s.verificationStatus} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          {s.orgType}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {s.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed mb-3">
                    {s.description}
                  </p>

                  {/* Formats Tags & Platform Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {s.formats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/50 dark:border-stone-700/50"
                      >
                        {fmt}
                      </span>
                    ))}

                    <span className="text-[10px] text-stone-400 font-medium px-1.5 py-0.5 rounded bg-stone-50 dark:bg-stone-800/40">
                      {s.region}
                    </span>
                  </div>

                  {/* Available Social Platforms Bar */}
                  <div
                    className="flex items-center gap-1.5 py-2 border-t border-stone-100 dark:border-stone-800/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-[10px] text-stone-400 font-semibold mr-1">Platforms:</span>
                    {links.whatsapp && (
                      <a
                        href={links.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 hover:bg-emerald-100 transition-colors"
                        title="WhatsApp Community"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {links.discord && (
                      <a
                        href={links.discord}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 hover:bg-indigo-100 transition-colors text-[10px] font-bold px-2"
                        title="Discord Server"
                      >
                        Discord
                      </a>
                    )}
                    {links.facebook && (
                      <a
                        href={links.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Facebook Page"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {links.twitter && (
                      <a
                        href={links.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-500 hover:bg-sky-100 transition-colors"
                        title="Twitter / X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {links.instagram && (
                      <a
                        href={links.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 hover:bg-pink-100 transition-colors"
                        title="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {s.websiteUrl && (
                      <a
                        href={s.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                        title="Official Website"
                      >
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        {s.city}, {s.country}
                      </span>
                    </span>
                    <span className="font-semibold text-stone-700 dark:text-stone-300">
                      {s.memberCount}+ Members
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-stone-400">Est. {s.foundedYear || 2020}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
                      View Society Profile &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
