import { Tournament, DebateSociety, Opportunity, Resource } from '../types';

/**
 * Builds the canonical deep link URL for any entity
 */
export function getDeepLinkUrl(path: string): string {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const cleanPath = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
  return `${origin}${pathname}${cleanPath}`;
}

/**
 * Formats a clean, high-conversion WhatsApp broadcast message for a tournament
 */
export function generateTournamentWhatsAppMessage(tournament: Tournament, deepLinkUrl: string): string {
  return `📢 *PAN-AFRICAN DEBATE ANNOUNCEMENT* 🌍
🏆 *${tournament.title}*

📍 *Location:* ${tournament.city}, ${tournament.country} (${tournament.deliveryMode})
🗓️ *Dates:* ${tournament.startDate} – ${tournament.endDate}
⚖️ *Format:* ${tournament.format} (${tournament.formatFullName})
👥 *Eligibility:* ${tournament.eligibility}
💰 *Registration Fee:* ${tournament.registrationFee}
⏰ *Registration Deadline:* ${tournament.registrationDeadline}

${tournament.chiefAdjudicators && tournament.chiefAdjudicators.length > 0 ? `🛡️ *Chief Adjudicators:* ${tournament.chiefAdjudicators.join(', ')}\n` : ''}
🔗 *Full Tournament Info & Direct Registration:*
${deepLinkUrl}

_Shared via Pan-African Debate Platform (PADP) — Uniting African Forensics._`;
}

/**
 * Formats a WhatsApp broadcast message for a society
 */
export function generateSocietyWhatsAppMessage(society: DebateSociety, deepLinkUrl: string): string {
  return `🏛️ *AFRICAN DEBATE SOCIETY PROFILE*
✨ *${society.name}*

📍 *Location:* ${society.city}, ${society.country}
🏢 *Institution / Category:* ${society.institution || society.orgType}
⚖️ *Active Formats:* ${society.formats.join(', ')}
👥 *Members:* ${society.memberCount || '50'}+ Debaters
${society.upcomingActivities ? `🎯 *Regular Activities:* ${society.upcomingActivities.join(' • ')}\n` : ''}
🔗 *View Society Directory & Connect:*
${deepLinkUrl}

_Discover African Debate Unions on PADP._`;
}

/**
 * Formats a WhatsApp broadcast message for an opportunity / grant
 */
export function generateOpportunityWhatsAppMessage(opportunity: Opportunity, deepLinkUrl: string): string {
  return `💼 *AFRICAN DEBATE OPPORTUNITY & GRANT* 🚀
🌟 *${opportunity.title}*

🏢 *Offered by:* ${opportunity.organizationName} (${opportunity.countryScope})
🏷️ *Type:* ${opportunity.opportunityType}
💰 *Funding:* ${opportunity.isFunded ? 'Fully / Partially Funded' : 'Volunteer / Unfunded'}
⏰ *Application Deadline:* ${opportunity.deadline}
📋 *Eligibility:* ${opportunity.eligibilityCriteria}

🔗 *Full Details & Application Link:*
${deepLinkUrl}

_Shared via Pan-African Debate Platform._`;
}

/**
 * Formats a WhatsApp broadcast message for a resource / guide
 */
export function generateResourceWhatsAppMessage(resource: Resource, deepLinkUrl: string): string {
  return `📚 *PADP DEBATE KNOWLEDGE COMMONS*
📖 *${resource.title}*

✍️ *Author:* ${resource.authorName} (${resource.authorAffiliation})
🏷️ *Category:* ${resource.category} • ${resource.difficulty} Level
⏱️ *Read Time:* ~${resource.readTimeMins} mins

${resource.summary}

🔗 *Read the full masterclass on PADP:*
${deepLinkUrl}`;
}

/**
 * Opens WhatsApp with pre-filled message (works on mobile app and web.whatsapp.com)
 */
export function shareToWhatsApp(text: string) {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Opens Twitter/X intent
 */
export function shareToTwitter(text: string, url: string) {
  const tweetText = text.length > 200 ? `${text.slice(0, 190)}...` : text;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}&hashtags=AfricanDebate,PAUDC,Forensics`;
  window.open(twitterUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Triggers native Web Share API if available, otherwise falls back to clipboard
 */
export async function triggerNativeShare(data: {
  title: string;
  text: string;
  url: string;
}): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Native share failed, falling back to clipboard', err);
      }
    }
  }
  return false;
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    return false;
  }
}
