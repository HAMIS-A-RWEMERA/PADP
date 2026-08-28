export type DeliveryMode = 'In-Person' | 'Online' | 'Hybrid';
export type TournamentStatus = 'Upcoming' | 'Registration Open' | 'Registration Closed' | 'Ongoing' | 'Completed';
export type Eligibility = 'Open' | 'University' | 'High School' | 'Novice' | 'Masters';
export type DebateFormatCode = 'BP' | 'WSDC' | 'AP' | 'PF' | 'Other';
export type OrgType = 'University Society' | 'School Club' | 'National Association' | 'Community Org' | 'Debate Academy';
export type VerificationStatus = 'verified' | 'pending' | 'unverified';
export type UserRole = 'debater' | 'society_lead' | 'coach' | 'judge' | 'organizer' | 'admin';
export type AfricanRegion = 'East Africa' | 'West Africa' | 'Southern Africa' | 'Central Africa' | 'North Africa' | 'Pan-African & Global';

export interface Tournament {
  id: string;
  title: string;
  slug: string;
  organizer: string;
  organizerId?: string;
  country: string;
  city: string;
  region: AfricanRegion;
  deliveryMode: DeliveryMode;
  venue?: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  format: DebateFormatCode;
  formatFullName: string;
  eligibility: Eligibility;
  registrationLink: string;
  registrationFee: string;
  teamCap?: number;
  roundsCount?: number;
  chiefAdjudicators?: string[];
  tabSoftware?: string;
  status: TournamentStatus;
  isFeatured?: boolean;
  verificationStatus: VerificationStatus;
  description: string;
  scheduleHighlights?: string[];
  contactEmail: string;
  websiteOrSocial?: string;
  bannerImage?: string;
  tags?: string[];
}

export interface DebateSociety {
  id: string;
  name: string;
  slug: string;
  orgType: OrgType;
  country: string;
  city: string;
  region: AfricanRegion;
  institution?: string;
  logo: string;
  coverImage?: string;
  description: string;
  foundedYear?: number;
  formats: DebateFormatCode[];
  websiteUrl?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    discord?: string;
    whatsapp?: string;
    youtube?: string;
    tiktok?: string;
  };
  contactEmail: string;
  memberCount?: number;
  verificationStatus: VerificationStatus;
  upcomingActivities?: string[];
  achievements?: string[];
}

export interface SpeakerRole {
  role: string;
  side: 'Gov / Prop' | 'Opp';
  durationMins: number;
  description: string;
  keyResponsibilities: string[];
}

export interface SpeechOrderItem {
  title: string;
  side: string;
  duration: string;
  role: string;
}

export interface DebateFormat {
  id: string;
  name: string;
  shortCode: DebateFormatCode;
  slug: string;
  summary: string;
  speakerCount: number;
  speechDurationMins: number;
  poiAllowed: boolean;
  teamStructure: string;
  preparationTimeMins: number;
  scoringScale: string;
  adjudicationRules: string[];
  speakers: SpeakerRole[];
  commonTerms: { term: string; definition: string }[];
  guideMarkdown: string;
  // Extended fields for interactive guides
  teamsCount?: string;
  speakersCount?: string;
  prepTimeMins?: number;
  poiRules?: string;
  adjudicationStyle?: string;
  speechOrder?: SpeechOrderItem[];
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  category: 'Argumentation' | 'Rebuttal' | 'Adjudication' | 'Motion Analysis' | 'Case Construction' | 'WSDC Strategy' | 'BP Masterclass' | 'Motion Bank' | 'Format Guide' | 'Strategy' | 'Curriculum';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Open';
  format?: DebateFormatCode | 'Universal';
  authorName: string;
  authorAffiliation: string;
  authorTitle?: string;
  contentType: 'Guide' | 'Cheatsheet' | 'Motion Bank' | 'Video Breakdown' | 'Template';
  readTimeMins: number;
  summary: string;
  contentBody: string;
  keyTakeaways?: string[];
  externalUrl?: string;
  formatCode?: string;
  downloadUrl?: string;
  tags: string[];
  publishedDate: string;
  featured?: boolean;
}

export interface PracticeSession {
  id: string;
  title: string;
  slug: string;
  hostOrg: string;
  hostName: string;
  sessionType: 'Online Sparring' | 'In-Person Sparring' | 'Adjudication Workshop' | 'Novice Training';
  format: DebateFormatCode;
  sessionDate: string;
  timeUTC: string;
  durationMins: number;
  platform: 'Google Meet' | 'Discord' | 'Zoom' | 'In-Person';
  meetingLink?: string;
  slotsAvailable: number;
  slotsFilled: number;
  skillLevel: 'All Levels' | 'Novice' | 'Intermediate' | 'Advanced';
  motionPrompt?: string;
  contactEmail: string;
  notes?: string;
  region: AfricanRegion;
  rsvps?: string[]; // user emails
}

export interface Opportunity {
  id: string;
  title: string;
  slug: string;
  organizationName: string;
  organization?: string;
  opportunityType: 'Scholarship' | 'Fellowship' | 'Debate Camp' | 'Adjudicator Subsidy' | 'Grant' | 'Volunteer' | 'Coaching Call' | 'Internship';
  countryScope: string;
  country?: string;
  region?: AfricanRegion;
  deliveryMode?: DeliveryMode;
  format?: DebateFormatCode | 'All Formats';
  deadline: string;
  eligibilityCriteria: string;
  eligibility?: string;
  fundingAmount?: string;
  description: string;
  applicationLink: string;
  isFunded: boolean;
  tags: string[];
}

export interface CountryHub {
  id: string;
  name: string;
  isoCode: string;
  region: AfricanRegion;
  flagEmoji: string;
  slug: string;
  description: string;
  activeSocietiesCount: number;
  societiesCount?: number;
  upcomingTournamentsCount: number;
  popularFormats: DebateFormatCode[];
  nationalBodies: string[];
  nationalChampionship?: string;
  capitalCity: string;
  highlightedDebateEvents: string[];
}

export interface CourseModule {
  title: string;
  lessons: string[];
  durationMins?: number;
  type?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  instructor: string;
  instructorRole: string;
  instructorTitle?: string;
  instructorAffiliation: string;
  thumbnail: string;
  price: number;
  currency: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  level?: string;
  formatFocus?: string;
  durationWeeks: number;
  estimatedHours?: number;
  certificateIncluded?: boolean;
  rating: number;
  enrollmentCount: number;
  isFree: boolean;
  status: 'Open for Enrollment' | 'Upcoming' | 'Self-Paced';
  overview: string;
  description?: string;
  modulesCount?: number;
  modules: CourseModule[];
}

export interface Submission {
  id: string;
  type: 'tournament' | 'organization' | 'resource' | 'opportunity' | 'practice';
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  payload: any;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  adminNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  country: string;
  city: string;
  institution?: string;
  bio: string;
  primaryFormat: DebateFormatCode;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Veteran';
  bookmarkedTournaments: string[];
  bookmarkedResources: string[];
  createdSubmissions: string[];
}
