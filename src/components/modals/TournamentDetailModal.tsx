import React, { useState } from 'react';
import {
  X,
  Calendar,
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Users,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Share2,
  Trophy,
  CheckCircle,
  FileText,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Twitter,
  AlertCircle,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { FormatBadge, StatusBadge, VerifiedBadge } from '../ui/Badge';
import {
  generateTournamentWhatsAppMessage,
  getDeepLinkUrl,
  shareToWhatsApp,
  shareToTwitter,
  copyToClipboard,
  triggerNativeShare,
} from '../../utils/shareUtils';
import { getDynamicTournamentStatus } from '../../utils/dateUtils';

export const TournamentDetailModal: React.FC = () => {
  const {
    selectedTournamentSlug,
    setSelectedTournamentSlug,
    tournaments,
    isTournamentBookmarked,
    toggleBookmarkTournament,
    showToast,
  } = usePlatform();

  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!selectedTournamentSlug) return null;

  const tournament = tournaments.find((t) => t.slug === selectedTournamentSlug);
  if (!tournament) return null;

  const isSaved = isTournamentBookmarked(tournament.id);
  const deepLink = getDeepLinkUrl(`tournaments/${tournament.slug}`);
  const dynamicStatus = getDynamicTournamentStatus(
    tournament.startDate,
    tournament.endDate,
    tournament.registrationDeadline,
    tournament.status
  );

  const handleCopyLink = async () => {
    const success = await copyToClipboard(deepLink);
    if (success) {
      setCopied(true);
      showToast('success', 'Deep Link Copied!', 'Direct tournament URL copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const message = generateTournamentWhatsAppMessage(tournament, deepLink);
    shareToWhatsApp(message);
    showToast('success', 'Opening WhatsApp', 'Sharing tournament broadcast snippet.');
  };

  const handleTwitterShare = () => {
    const tweetText = `🏆 ${tournament.title} (${tournament.format} • ${tournament.city}, ${tournament.country}) registration is live on the Pan-African Debate Platform!`;
    shareToTwitter(tweetText, deepLink);
  };

  const handleNativeShare = async () => {
    const shared = await triggerNativeShare({
      title: `${tournament.title} | Pan-African Debate Platform`,
      text: `${tournament.title} — ${tournament.startDate} to ${tournament.endDate} in ${tournament.city}, ${tournament.country}.`,
      url: deepLink,
    });
    if (!shared) {
      handleCopyLink();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tournament-modal-title"
      onClick={() => setSelectedTournamentSlug(null)}
    >
      <div
        className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner header */}
        <div className="relative h-48 sm:h-56 bg-stone-950 overflow-hidden">
          {tournament.bannerImage ? (
            <img
              src={tournament.bannerImage}
              alt={tournament.title}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950/50" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Share Trigger Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/80 backdrop-blur-sm transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Share Tournament"
                aria-label="Share Tournament"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Share</span>
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl p-2 z-20 space-y-1 text-xs text-stone-200 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      handleWhatsAppShare();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-emerald-950/60 text-emerald-400 hover:text-emerald-300 flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp Broadcast</span>
                  </button>
                  <button
                    onClick={() => {
                      handleTwitterShare();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-sky-950/60 text-sky-400 hover:text-sky-300 flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    <Twitter className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Share on X (Twitter)</span>
                  </button>
                  <button
                    onClick={() => {
                      handleCopyLink();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 text-stone-400 shrink-0" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Direct Deep Link'}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => toggleBookmarkTournament(tournament.id)}
              className={`p-2 rounded-xl border backdrop-blur-sm transition-all ${
                isSaved
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700/80'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Tournament'}
              aria-label={isSaved ? 'Remove from Saved' : 'Save Tournament'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setSelectedTournamentSlug(null)}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/80 backdrop-blur-sm transition-all"
              aria-label="Close Tournament Details"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Metadata Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <FormatBadge format={tournament.format} />
              <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${dynamicStatus.badgeColorClass}`}>
                {dynamicStatus.computedStatus}
              </span>
              <VerifiedBadge status={tournament.verificationStatus} />
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-stone-800/80 text-stone-300 border border-stone-700">
                {tournament.deliveryMode}
              </span>
            </div>
            <h2
              id="tournament-modal-title"
              className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight leading-tight"
            >
              {tournament.title}
            </h2>
          </div>
        </div>

        {/* Live Deadline / Status Announcement Banner */}
        <div className="bg-stone-100 dark:bg-stone-950 px-6 py-2.5 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold">{dynamicStatus.countdownLabel}</span>
          </div>
          <button
            onClick={handleWhatsAppShare}
            className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Forward to WhatsApp group</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 text-xs">
            <div>
              <span className="text-stone-500 block">Dates</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {tournament.startDate}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Location</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {tournament.city}, {tournament.country}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Reg. Deadline</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {tournament.registrationDeadline}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Registration Fee</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                {tournament.registrationFee}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              Tournament Overview
            </h4>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {tournament.description}
            </p>
          </div>

          {/* Schedule Highlights */}
          {tournament.scheduleHighlights && tournament.scheduleHighlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Schedule & Itinerary
              </h4>
              <div className="space-y-1.5 bg-stone-50 dark:bg-stone-800/30 p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800">
                {tournament.scheduleHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Adjudication Core & Team Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {tournament.chiefAdjudicators && (
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/30 border border-stone-200/80 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Chief Adjudication Core
                </span>
                <ul className="space-y-1 text-stone-600 dark:text-stone-400">
                  {tournament.chiefAdjudicators.map((ca, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{ca}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/30 border border-stone-200/80 dark:border-stone-800 space-y-2">
              <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-500" /> Specifications
              </span>
              <div className="text-stone-600 dark:text-stone-400 space-y-1">
                <p>Organizer: <span className="font-semibold text-stone-900 dark:text-stone-200">{tournament.organizer}</span></p>
                <p>Team Capacity: <span className="font-semibold text-stone-900 dark:text-stone-200">{tournament.teamCap || 'Open'} Teams</span></p>
                <p>Preliminary Rounds: <span className="font-semibold text-stone-900 dark:text-stone-200">{tournament.roundsCount || '5'} Rounds</span></p>
                <p>Tabulation Software: <span className="font-semibold text-stone-900 dark:text-stone-200">{tournament.tabSoftware || 'Tabbycat'}</span></p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex items-center justify-between text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800 pt-3">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>Contact: {tournament.contactEmail}</span>
            </span>
            {tournament.venue && (
              <span className="truncate max-w-[200px] text-right">Venue: {tournament.venue}</span>
            )}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedTournamentSlug(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
            >
              Close
            </button>
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 flex items-center gap-1.5 border border-stone-300 dark:border-stone-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Link'}</span>
            </button>
          </div>

          <a
            href={tournament.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Go to Official Registration Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

