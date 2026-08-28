import React, { useState } from 'react';
import {
  X,
  MapPin,
  Users,
  Calendar,
  ShieldCheck,
  Mail,
  Globe,
  ExternalLink,
  Sparkles,
  BookOpen,
  CheckCircle,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Twitter,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { FormatBadge, VerifiedBadge } from '../ui/Badge';
import {
  generateSocietyWhatsAppMessage,
  getDeepLinkUrl,
  shareToWhatsApp,
  shareToTwitter,
  copyToClipboard,
} from '../../utils/shareUtils';

export const SocietyDetailModal: React.FC = () => {
  const { selectedSocietySlug, setSelectedSocietySlug, societies, showToast } = usePlatform();
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!selectedSocietySlug) return null;

  const society = societies.find((s) => s.slug === selectedSocietySlug);
  if (!society) return null;

  const deepLink = getDeepLinkUrl(`societies/${society.slug}`);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(deepLink);
    if (success) {
      setCopied(true);
      showToast('success', 'Deep Link Copied!', 'Direct society directory link copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const msg = generateSocietyWhatsAppMessage(society, deepLink);
    shareToWhatsApp(msg);
    showToast('success', 'Opening WhatsApp', 'Sharing society profile snippet.');
  };

  const handleTwitterShare = () => {
    const text = `🏛️ Check out ${society.name} (${society.city}, ${society.country}) on the Pan-African Debate Platform!`;
    shareToTwitter(text, deepLink);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="society-modal-title"
      onClick={() => setSelectedSocietySlug(null)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {/* Share menu */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all flex items-center gap-1 text-xs"
                title="Share Society"
                aria-label="Share Society"
              >
                <Share2 className="w-4 h-4 text-amber-400" />
              </button>

              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-stone-900 border border-stone-700 shadow-2xl p-2 z-20 space-y-1 text-xs text-stone-200 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      handleWhatsAppShare();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-emerald-950/60 text-emerald-400 hover:text-emerald-300 flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      handleTwitterShare();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-sky-950/60 text-sky-400 hover:text-sky-300 flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    <Twitter className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Twitter / X</span>
                  </button>
                  <button
                    onClick={() => {
                      handleCopyLink();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white flex items-center gap-2 font-medium transition-colors text-left"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 text-stone-400 shrink-0" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Direct Link'}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedSocietySlug(null)}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all"
              aria-label="Close Society Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <img
              src={society.logo}
              alt={society.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl shrink-0"
            />
            <div className="min-w-0 pr-16">
              <div className="flex items-center gap-2 mb-1">
                <VerifiedBadge status={society.verificationStatus} />
                <span className="text-xs px-2 py-0.5 rounded bg-stone-800/90 text-stone-300 border border-stone-700">
                  {society.orgType}
                </span>
              </div>
              <h2
                id="society-modal-title"
                className="text-xl font-bold font-display tracking-tight text-white leading-tight"
              >
                {society.name}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {society.city}, {society.country} &bull; Est. {society.foundedYear || 2020}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto text-xs">
          {/* Quick specs */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 text-center">
            <div>
              <span className="text-stone-500 block">Members</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-0.5">
                {society.memberCount || 50}+ Active
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Primary Formats</span>
              <div className="flex items-center justify-center gap-1 mt-1">
                {society.formats.map((f) => (
                  <span key={f} className="font-bold text-amber-600 dark:text-amber-400">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-stone-500 block">Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                {society.verificationStatus === 'verified' ? 'PADP Verified' : 'Community Listed'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
              About the Organization
            </h4>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm">
              {society.description}
            </p>
          </div>

          {/* Upcoming Activities & Training */}
          {society.upcomingActivities && society.upcomingActivities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Regular Activities & Sparring
              </h4>
              <div className="space-y-1.5 bg-stone-50 dark:bg-stone-800/30 p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-800">
                {society.upcomingActivities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Channels & Social Media */}
          {society.socialLinks && Object.values(society.socialLinks).some(Boolean) && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" /> Official Channels & Online Communities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {society.socialLinks.whatsapp && (
                  <a
                    href={society.socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">WhatsApp Group</span>
                  </a>
                )}
                {society.socialLinks.discord && (
                  <a
                    href={society.socialLinks.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                      D
                    </span>
                    <span className="truncate">Discord Server</span>
                  </a>
                )}
                {society.socialLinks.facebook && (
                  <a
                    href={society.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                      f
                    </span>
                    <span className="truncate">Facebook Page</span>
                  </a>
                )}
                {society.socialLinks.twitter && (
                  <a
                    href={society.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-500/30 text-sky-700 dark:text-sky-300 hover:bg-sky-100 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="truncate">Twitter / X</span>
                  </a>
                )}
                {society.socialLinks.instagram && (
                  <a
                    href={society.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-500/30 text-pink-700 dark:text-pink-300 hover:bg-pink-100 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <span className="w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                      ig
                    </span>
                    <span className="truncate">Instagram</span>
                  </a>
                )}
                {society.socialLinks.linkedin && (
                  <a
                    href={society.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 flex items-center gap-2 text-xs font-semibold transition-colors"
                  >
                    <span className="w-4 h-4 rounded bg-stone-700 text-white flex items-center justify-center text-[9px] font-black shrink-0">
                      in
                    </span>
                    <span className="truncate">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-amber-800 dark:text-amber-300 block">
                Connect with {society.name}
              </span>
              <p className="text-stone-600 dark:text-stone-400 mt-0.5 text-xs">
                Email: <span className="font-semibold text-stone-900 dark:text-stone-200">{society.contactEmail}</span>
              </p>
            </div>
            {society.websiteUrl && (
              <a
                href={society.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-800 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-stone-800"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Institution: {society.institution || society.country}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppShare}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Share to WhatsApp</span>
            </button>
            <button
              onClick={() => setSelectedSocietySlug(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
