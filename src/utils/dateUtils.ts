import { TournamentStatus } from '../types';

export interface DynamicStatusResult {
  computedStatus: TournamentStatus;
  daysUntilDeadline: number;
  isDeadlinePassed: boolean;
  isOngoing: boolean;
  isCompleted: boolean;
  countdownLabel: string;
  badgeColorClass: string;
}

/**
 * Computes dynamic tournament status and human-readable countdowns
 * based on the tournament's dates compared to today.
 */
export function getDynamicTournamentStatus(
  startDateStr: string,
  endDateStr: string,
  registrationDeadlineStr: string,
  explicitStatus?: TournamentStatus
): DynamicStatusResult {
  const now = new Date();
  
  // Safe date parsing
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const deadlineDate = new Date(registrationDeadlineStr);

  // Set time to end of day for deadline (23:59:59)
  deadlineDate.setHours(23, 59, 59, 999);
  // Set end of day for end date
  endDate.setHours(23, 59, 59, 999);
  // Set start of day for start date
  startDate.setHours(0, 0, 0, 0);

  const diffToDeadlineMs = deadlineDate.getTime() - now.getTime();
  const daysUntilDeadline = Math.ceil(diffToDeadlineMs / (1000 * 60 * 60 * 24));

  const isCompleted = now.getTime() > endDate.getTime();
  const isOngoing = now.getTime() >= startDate.getTime() && now.getTime() <= endDate.getTime();
  const isDeadlinePassed = now.getTime() > deadlineDate.getTime();

  let computedStatus: TournamentStatus = explicitStatus || 'Upcoming';
  let countdownLabel = '';
  let badgeColorClass = 'bg-stone-500/10 text-stone-700 dark:text-stone-300 border-stone-500/30';

  if (isCompleted) {
    computedStatus = 'Completed';
    countdownLabel = 'Tournament Concluded';
    badgeColorClass = 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/20';
  } else if (isOngoing) {
    computedStatus = 'Ongoing';
    countdownLabel = '🔴 Live & In Progress';
    badgeColorClass = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 font-bold animate-pulse';
  } else if (isDeadlinePassed) {
    computedStatus = 'Registration Closed';
    countdownLabel = `Registration Closed on ${registrationDeadlineStr}`;
    badgeColorClass = 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30';
  } else {
    // Deadline in future
    computedStatus = 'Registration Open';
    if (daysUntilDeadline <= 7) {
      countdownLabel = `⏳ ${daysUntilDeadline} ${daysUntilDeadline === 1 ? 'day' : 'days'} left to register!`;
      badgeColorClass = 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40 font-semibold';
    } else {
      countdownLabel = `Registration closes in ${daysUntilDeadline} days`;
      badgeColorClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    }
  }

  return {
    computedStatus,
    daysUntilDeadline,
    isDeadlinePassed,
    isOngoing,
    isCompleted,
    countdownLabel,
    badgeColorClass,
  };
}

/**
 * Human-friendly date formatting
 */
export function formatReadableDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}
