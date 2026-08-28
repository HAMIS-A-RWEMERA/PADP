import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Calendar,
  DollarSign,
  ExternalLink,
  Globe,
  Award,
  Clock,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Search,
  MapPin,
  Laptop,
  RotateCcw,
  Tag,
  X,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import {
  generateOpportunityWhatsAppMessage,
  getDeepLinkUrl,
  shareToWhatsApp,
  copyToClipboard,
} from '../utils/shareUtils';
import { DebateFormatCode, DeliveryMode, AfricanRegion } from '../types';

export const OpportunitiesView: React.FC = () => {
  const { opportunities, showToast } = usePlatform();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Multi-Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedFunding, setSelectedFunding] = useState<string>('All');

  // Extract unique countries dynamically
  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    opportunities.forEach((op) => {
      if (op.country) set.add(op.country);
      if (op.countryScope && !op.countryScope.includes('(')) set.add(op.countryScope);
    });
    return Array.from(set).sort();
  }, [opportunities]);

  // Filter Logic
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((op) => {
      const q = searchQuery.toLowerCase().trim();
      if (
        q &&
        !op.title.toLowerCase().includes(q) &&
        !(op.organizationName && op.organizationName.toLowerCase().includes(q)) &&
        !op.description.toLowerCase().includes(q) &&
        !op.eligibilityCriteria.toLowerCase().includes(q) &&
        !op.countryScope.toLowerCase().includes(q) &&
        !(op.tags && op.tags.some((t) => t.toLowerCase().includes(q)))
      ) {
        return false;
      }

      // Country
      if (selectedCountry !== 'All') {
        const matchesCountry =
          op.country === selectedCountry ||
          op.countryScope.toLowerCase().includes(selectedCountry.toLowerCase());
        if (!matchesCountry) return false;
      }

      // Region
      if (selectedRegion !== 'All' && op.region && op.region !== selectedRegion) {
        if (!op.countryScope.toLowerCase().includes(selectedRegion.toLowerCase())) {
          return false;
        }
      }

      // Format
      if (selectedFormat !== 'All') {
        if (op.format && op.format !== 'All Formats' && op.format !== selectedFormat) {
          return false;
        }
      }

      // Delivery Mode
      if (selectedMode !== 'All' && op.deliveryMode && op.deliveryMode !== selectedMode) {
        return false;
      }

      // Opportunity Type
      if (selectedType !== 'All' && op.opportunityType !== selectedType) {
        return false;
      }

      // Funding
      if (selectedFunding === 'funded' && !op.isFunded) return false;
      if (selectedFunding === 'unfunded' && op.isFunded) return false;

      return true;
    });
  }, [
    opportunities,
    searchQuery,
    selectedCountry,
    selectedRegion,
    selectedFormat,
    selectedMode,
    selectedType,
    selectedFunding,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCountry !== 'All' ||
    selectedRegion !== 'All' ||
    selectedFormat !== 'All' ||
    selectedMode !== 'All' ||
    selectedType !== 'All' ||
    selectedFunding !== 'All';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All');
    setSelectedRegion('All');
    setSelectedFormat('All');
    setSelectedMode('All');
    setSelectedType('All');
    setSelectedFunding('All');
  };

  const handleShareWhatsApp = (op: typeof opportunities[0]) => {
    const deepLink = getDeepLinkUrl('opportunities');
    const msg = generateOpportunityWhatsAppMessage(op, deepLink);
    shareToWhatsApp(msg);
    showToast('success', 'Opening WhatsApp', 'Sharing opportunity details with your community.');
  };

  const handleCopyLink = async (op: typeof opportunities[0]) => {
    const deepLink = getDeepLinkUrl('opportunities');
    const success = await copyToClipboard(deepLink);
    if (success) {
      setCopiedId(op.id);
      showToast('success', 'Link Copied!', `Link for "${op.title}" copied to clipboard.`);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Ecosystem Growth & Grants</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
          Debate Fellowships, Grants & Subsidies
        </h1>
        <p className="text-sm text-stone-500 mt-1 max-w-3xl">
          Curated financial grants, international travel sponsorships, training academies, and adjudication subsidies for African debaters, adjudicators, and coaches.
        </p>
      </div>

      {/* Multi-Filter Toolbar */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        {/* Search Bar + Funding Quick Toggle */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by opportunity title, organization, grant type, eligibility criteria..."
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
            onClick={() => setSelectedFunding(selectedFunding === 'funded' ? 'All' : 'funded')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all shrink-0 ${
              selectedFunding === 'funded'
                ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Funded Only</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
          {/* Country */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Countries</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
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
              <option value="Pan-African & Global">Pan-African & Global</option>
            </select>
          </div>

          {/* Delivery Mode */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Mode (Online / In-Person)</label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Modes</option>
              <option value="Online">Online / Virtual</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Format */}
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

          {/* Opportunity Type */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Types</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Fellowship">Fellowship</option>
              <option value="Grant">Grant</option>
              <option value="Adjudicator Subsidy">Adjudicator Subsidy</option>
              <option value="Debate Camp">Debate Camp</option>
              <option value="Coaching Call">Coaching Call</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          {/* Funding Status */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">Funding</label>
            <select
              value={selectedFunding}
              onChange={(e) => setSelectedFunding(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="All">All Funding</option>
              <option value="funded">Fully / Partially Funded</option>
              <option value="unfunded">Volunteer / Unfunded</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="flex items-center justify-between pt-2 text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
          <div>
            Showing <strong className="text-stone-900 dark:text-stone-100">{filteredOpportunities.length}</strong> of{' '}
            {opportunities.length} opportunities
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

      {/* Opportunities List Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display">
            No opportunities match your filter criteria
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try adjusting your region, country, or format filter. You can also view all continental opportunities.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-800 text-white text-xs font-semibold mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.map((op) => (
            <div
              key={op.id}
              className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-amber-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {op.opportunityType}
                    </span>
                    {op.deliveryMode && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 flex items-center gap-1">
                        <Laptop className="w-3 h-3 text-amber-500" />
                        <span>{op.deliveryMode}</span>
                      </span>
                    )}
                    {op.format && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {op.format}
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      op.isFunded ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    {op.isFunded ? 'Fully / Partially Funded' : 'Volunteer / Unfunded'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-display leading-snug">
                  {op.title}
                </h3>

                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>
                    Offered by {op.organizationName || op.organization} &bull; {op.countryScope}
                  </span>
                </p>

                <p className="text-xs text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                  {op.description}
                </p>

                {op.fundingAmount && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{op.fundingAmount}</span>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 mt-4 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <p>
                    <strong className="text-stone-800 dark:text-stone-200">Eligibility:</strong>{' '}
                    {op.eligibilityCriteria || op.eligibility}
                  </p>
                  <p className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Application Deadline: {op.deadline}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleShareWhatsApp(op)}
                    className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                  <button
                    onClick={() => handleCopyLink(op)}
                    className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors"
                    title="Copy Link"
                  >
                    {copiedId === op.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href={op.applicationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
