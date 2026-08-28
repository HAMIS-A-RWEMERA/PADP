import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Tournament,
  DebateSociety,
  DebateFormat,
  Resource,
  PracticeSession,
  Opportunity,
  CountryHub,
  Course,
  Submission,
  User,
  UserRole,
  AfricanRegion,
  DebateFormatCode,
  DeliveryMode,
  Eligibility,
  TournamentStatus,
  OrgType,
} from '../types';
import {
  SEED_COUNTRIES,
  SEED_FORMATS,
  SEED_SOCIETIES,
  SEED_TOURNAMENTS,
  SEED_RESOURCES,
  SEED_PRACTICE_SESSIONS,
  SEED_OPPORTUNITIES,
  SEED_COURSES,
  INITIAL_SUBMISSIONS,
  DEMO_USERS,
} from '../data/seedData';

export type NavView =
  | 'home'
  | 'competitions'
  | 'societies'
  | 'practice'
  | 'formats'
  | 'resources'
  | 'opportunities'
  | 'countries'
  | 'learn'
  | 'admin'
  | 'profile';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface PlatformContextType {
  // Navigation
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  selectedCountrySlug: string | null;
  setSelectedCountrySlug: (slug: string | null) => void;
  selectedTournamentSlug: string | null;
  setSelectedTournamentSlug: (slug: string | null) => void;
  selectedSocietySlug: string | null;
  setSelectedSocietySlug: (slug: string | null) => void;
  selectedFormatSlug: string | null;
  setSelectedFormatSlug: (slug: string | null) => void;
  selectedResourceSlug: string | null;
  setSelectedResourceSlug: (slug: string | null) => void;
  selectedCourseSlug: string | null;
  setSelectedCourseSlug: (slug: string | null) => void;

  // Data Collections
  tournaments: Tournament[];
  societies: DebateSociety[];
  formats: DebateFormat[];
  resources: Resource[];
  practiceSessions: PracticeSession[];
  opportunities: Opportunity[];
  countries: CountryHub[];
  courses: Course[];
  submissions: Submission[];
  
  // Modals & Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  submitModalType: 'tournament' | 'organization' | 'practice' | 'resource';
  setSubmitModalType: (type: 'tournament' | 'organization' | 'practice' | 'resource') => void;

  // Active User & RBAC
  currentUser: User;
  setUserRole: (role: UserRole) => void;
  switchDemoUser: (email: string) => void;
  toggleBookmarkTournament: (tournamentId: string) => void;
  toggleBookmarkResource: (resourceId: string) => void;
  isTournamentBookmarked: (tournamentId: string) => boolean;
  isResourceBookmarked: (resourceId: string) => boolean;

  // Actions & Mutations
  createSubmission: (
    type: 'tournament' | 'organization' | 'practice' | 'resource' | 'opportunity',
    payload: any,
    submitterName: string,
    submitterEmail: string,
    submitterRole: string
  ) => void;
  approveSubmission: (submissionId: string) => void;
  rejectSubmission: (submissionId: string, notes?: string) => void;
  toggleSocietyVerification: (societyId: string) => void;
  toggleTournamentFeatured: (tournamentId: string) => void;
  rsvpPracticeSession: (sessionId: string) => void;
  cancelRsvpPracticeSession: (sessionId: string) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'padp_platform_';

export const PlatformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation states
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string | null>(null);
  const [selectedTournamentSlug, setSelectedTournamentSlug] = useState<string | null>(null);
  const [selectedSocietySlug, setSelectedSocietySlug] = useState<string | null>(null);
  const [selectedFormatSlug, setSelectedFormatSlug] = useState<string | null>(null);
  const [selectedResourceSlug, setSelectedResourceSlug] = useState<string | null>(null);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitModalType, setSubmitModalType] = useState<'tournament' | 'organization' | 'practice' | 'resource'>('tournament');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persistent / reactive data
  const [tournaments, setTournaments] = useState<Tournament[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}tournaments`);
    if (!saved) return SEED_TOURNAMENTS;
    try {
      const parsed: Tournament[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((t) => t.id));
      const missingSeeds = SEED_TOURNAMENTS.filter((t) => !existingIds.has(t.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_TOURNAMENTS;
    }
  });

  const [societies, setSocieties] = useState<DebateSociety[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}societies`);
    if (!saved) return SEED_SOCIETIES;
    try {
      const parsed: DebateSociety[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((s) => s.id));
      const missingSeeds = SEED_SOCIETIES.filter((s) => !existingIds.has(s.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_SOCIETIES;
    }
  });

  const [formats] = useState<DebateFormat[]>(SEED_FORMATS);
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}resources`);
    if (!saved) return SEED_RESOURCES;
    try {
      const parsed: Resource[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((r) => r.id));
      const missingSeeds = SEED_RESOURCES.filter((r) => !existingIds.has(r.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_RESOURCES;
    }
  });

  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}practice`);
    if (!saved) return SEED_PRACTICE_SESSIONS;
    try {
      const parsed: PracticeSession[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((p) => p.id));
      const missingSeeds = SEED_PRACTICE_SESSIONS.filter((p) => !existingIds.has(p.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_PRACTICE_SESSIONS;
    }
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}opportunities`);
    if (!saved) return SEED_OPPORTUNITIES;
    try {
      const parsed: Opportunity[] = JSON.parse(saved);
      const existingIds = new Set(parsed.map((o) => o.id));
      const missingSeeds = SEED_OPPORTUNITIES.filter((o) => !existingIds.has(o.id));
      return [...missingSeeds, ...parsed];
    } catch {
      return SEED_OPPORTUNITIES;
    }
  });

  const [countries] = useState<CountryHub[]>(SEED_COUNTRIES);
  const [courses] = useState<Course[]>(SEED_COURSES);

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}submissions`);
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentView('home');
        setSelectedTournamentSlug(null);
        setSelectedSocietySlug(null);
        setSelectedResourceSlug(null);
        setSelectedCourseSlug(null);
        setSelectedCountrySlug(null);
        setSelectedFormatSlug(null);
        return;
      }

      const parts = hash.split('/').filter(Boolean);
      const mainRoute = parts[0];
      const subSlug = parts[1] || null;

      switch (mainRoute) {
        case 'competitions':
        case 'tournaments':
          setCurrentView('competitions');
          setSelectedTournamentSlug(subSlug);
          break;
        case 'societies':
          setCurrentView('societies');
          setSelectedSocietySlug(subSlug);
          break;
        case 'resources':
          setCurrentView('resources');
          setSelectedResourceSlug(subSlug);
          break;
        case 'learn':
        case 'courses':
          setCurrentView('learn');
          setSelectedCourseSlug(subSlug);
          break;
        case 'formats':
          setCurrentView('formats');
          setSelectedFormatSlug(subSlug);
          break;
        case 'countries':
          setCurrentView('countries');
          setSelectedCountrySlug(subSlug);
          break;
        case 'practice':
          setCurrentView('practice');
          break;
        case 'opportunities':
          setCurrentView('opportunities');
          break;
        case 'admin':
          setCurrentView('admin');
          break;
        case 'profile':
          setCurrentView('profile');
          break;
        default:
          setCurrentView('home');
          break;
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash and document title on state change
  useEffect(() => {
    let newHash = '';
    let pageTitle = 'Pan-African Debate Platform (PADP)';

    if (selectedTournamentSlug) {
      newHash = `#/tournaments/${selectedTournamentSlug}`;
      const t = tournaments.find((item) => item.slug === selectedTournamentSlug);
      if (t) pageTitle = `${t.title} | PADP Competitions`;
    } else if (selectedSocietySlug) {
      newHash = `#/societies/${selectedSocietySlug}`;
      const s = societies.find((item) => item.slug === selectedSocietySlug);
      if (s) pageTitle = `${s.name} | PADP Society Directory`;
    } else if (selectedResourceSlug) {
      newHash = `#/resources/${selectedResourceSlug}`;
      const r = resources.find((item) => item.slug === selectedResourceSlug);
      if (r) pageTitle = `${r.title} | PADP Knowledge Commons`;
    } else if (selectedCourseSlug) {
      newHash = `#/learn/${selectedCourseSlug}`;
      const c = courses.find((item) => item.slug === selectedCourseSlug);
      if (c) pageTitle = `${c.title} | PADP Masterclass`;
    } else if (selectedCountrySlug) {
      newHash = `#/countries/${selectedCountrySlug}`;
      pageTitle = `${selectedCountrySlug.toUpperCase()} Debate Hub | PADP`;
    } else if (selectedFormatSlug) {
      newHash = `#/formats/${selectedFormatSlug}`;
      pageTitle = `${selectedFormatSlug.toUpperCase()} Rules & Structure | PADP`;
    } else if (currentView === 'home') {
      newHash = '#/';
      pageTitle = 'Pan-African Debate Platform (PADP) | Uniting African Forensics';
    } else {
      newHash = `#/${currentView}`;
      pageTitle = `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} | Pan-African Debate Platform`;
    }

    document.title = pageTitle;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  }, [
    currentView,
    selectedTournamentSlug,
    selectedSocietySlug,
    selectedResourceSlug,
    selectedCourseSlug,
    selectedCountrySlug,
    selectedFormatSlug,
    tournaments,
    societies,
    resources,
    courses,
  ]);

  // Body scroll lock & global escape key handling
  useEffect(() => {
    const isAnyModalOpen =
      Boolean(selectedTournamentSlug) ||
      Boolean(selectedSocietySlug) ||
      Boolean(selectedResourceSlug) ||
      Boolean(selectedCourseSlug) ||
      isSearchOpen ||
      isSubmitModalOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedTournamentSlug) setSelectedTournamentSlug(null);
        else if (selectedSocietySlug) setSelectedSocietySlug(null);
        else if (selectedResourceSlug) setSelectedResourceSlug(null);
        else if (selectedCourseSlug) setSelectedCourseSlug(null);
        else if (isSearchOpen) setIsSearchOpen(false);
        else if (isSubmitModalOpen) setIsSubmitModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    selectedTournamentSlug,
    selectedSocietySlug,
    selectedResourceSlug,
    selectedCourseSlug,
    isSearchOpen,
    isSubmitModalOpen,
  ]);


  // Users & Auth
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}current_user`);
    return saved ? JSON.parse(saved) : DEMO_USERS[1]; // default debater
  });

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}tournaments`, JSON.stringify(tournaments));
  }, [tournaments]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}societies`, JSON.stringify(societies));
  }, [societies]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}submissions`, JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}practice`, JSON.stringify(practiceSessions));
  }, [practiceSessions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}opportunities`, JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_PREFIX}current_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  // Role management
  const setUserRole = (role: UserRole) => {
    setCurrentUser((prev) => ({
      ...prev,
      role,
    }));
    showToast('info', `Switched Role to ${role.toUpperCase()}`, `Now previewing platform with ${role} permissions.`);
  };

  const switchDemoUser = (email: string) => {
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found) {
      setCurrentUser(found);
      showToast('success', `Signed in as ${found.name}`, `Role: ${found.role}`);
    }
  };

  // Bookmarking
  const toggleBookmarkTournament = (tournamentId: string) => {
    setCurrentUser((prev) => {
      const exists = prev.bookmarkedTournaments.includes(tournamentId);
      const updated = exists
        ? prev.bookmarkedTournaments.filter((id) => id !== tournamentId)
        : [...prev.bookmarkedTournaments, tournamentId];
      
      showToast(
        exists ? 'info' : 'success',
        exists ? 'Bookmark Removed' : 'Tournament Bookmarked!',
        exists ? 'Removed from your saved competitions.' : 'Saved to your profile bookmarks.'
      );

      return {
        ...prev,
        bookmarkedTournaments: updated,
      };
    });
  };

  const toggleBookmarkResource = (resourceId: string) => {
    setCurrentUser((prev) => {
      const exists = prev.bookmarkedResources.includes(resourceId);
      const updated = exists
        ? prev.bookmarkedResources.filter((id) => id !== resourceId)
        : [...prev.bookmarkedResources, resourceId];

      showToast(
        exists ? 'info' : 'success',
        exists ? 'Bookmark Removed' : 'Resource Saved!',
        exists ? 'Removed from saved guides.' : 'Saved to your study library.'
      );

      return {
        ...prev,
        bookmarkedResources: updated,
      };
    });
  };

  const isTournamentBookmarked = (tournamentId: string) =>
    currentUser.bookmarkedTournaments.includes(tournamentId);

  const isResourceBookmarked = (resourceId: string) =>
    currentUser.bookmarkedResources.includes(resourceId);

  // Submissions Flow
  const createSubmission = (
    type: 'tournament' | 'organization' | 'practice' | 'resource' | 'opportunity',
    payload: any,
    submitterName: string,
    submitterEmail: string,
    submitterRole: string
  ) => {
    const newSub: Submission = {
      id: `sub-${Date.now().toString(36)}`,
      type,
      submitterName,
      submitterEmail,
      submitterRole,
      payload,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      adminNotes: 'Submitted via community portal. Under review.',
    };

    setSubmissions((prev) => [newSub, ...prev]);
    showToast(
      'success',
      'Submission Received!',
      `Your ${type} has been submitted to the PADP moderation team. You can track status in Admin.`
    );
  };

  // Moderation: Approve
  const approveSubmission = (submissionId: string) => {
    const sub = submissions.find((s) => s.id === submissionId);
    if (!sub) return;

    if (sub.type === 'tournament') {
      const newTournament: Tournament = {
        id: `tourn-${Date.now().toString(36)}`,
        title: sub.payload.title,
        slug: (sub.payload.title || 'tournament')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        organizer: sub.payload.organizer || sub.submitterName,
        country: sub.payload.country || 'Pan-African',
        city: sub.payload.city || 'Online',
        region: (sub.payload.region as AfricanRegion) || 'Pan-African & Global',
        deliveryMode: (sub.payload.deliveryMode as DeliveryMode) || 'In-Person',
        venue: sub.payload.venue,
        startDate: sub.payload.startDate || '2026-11-01',
        endDate: sub.payload.endDate || '2026-11-03',
        registrationDeadline: sub.payload.registrationDeadline || '2026-10-20',
        format: (sub.payload.format as DebateFormatCode) || 'BP',
        formatFullName: sub.payload.format === 'WSDC' ? 'World Schools (WSDC)' : 'British Parliamentary (BP)',
        eligibility: (sub.payload.eligibility as Eligibility) || 'University',
        registrationLink: sub.payload.registrationLink || 'https://padp.africa',
        registrationFee: sub.payload.registrationFee || 'Free',
        teamCap: Number(sub.payload.teamCap) || 40,
        roundsCount: Number(sub.payload.roundsCount) || 5,
        chiefAdjudicators: sub.payload.chiefAdjudicators ? [sub.payload.chiefAdjudicators] : ['Adjudication Core TBA'],
        status: (sub.payload.status as TournamentStatus) || 'Registration Open',
        isFeatured: false,
        verificationStatus: 'verified',
        description: sub.payload.description || 'Community submitted tournament.',
        contactEmail: sub.submitterEmail,
        websiteOrSocial: sub.payload.websiteOrSocial,
        tags: ['Verified', sub.payload.country || 'Pan-African'],
      };

      setTournaments((prev) => [newTournament, ...prev]);
    } else if (sub.type === 'organization') {
      const newSociety: DebateSociety = {
        id: `soc-${Date.now().toString(36)}`,
        name: sub.payload.name,
        slug: (sub.payload.name || 'society')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        orgType: (sub.payload.orgType as OrgType) || 'University Society',
        country: sub.payload.country || 'Pan-African',
        city: sub.payload.city || 'Kigali',
        region: (sub.payload.region as AfricanRegion) || 'East Africa',
        institution: sub.payload.institution,
        logo: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=80',
        description: sub.payload.description || 'African debate society.',
        foundedYear: Number(sub.payload.foundedYear) || 2024,
        formats: sub.payload.formats || ['BP'],
        contactEmail: sub.payload.contactEmail || sub.submitterEmail,
        memberCount: Number(sub.payload.memberCount) || 50,
        verificationStatus: 'verified',
        upcomingActivities: ['Weekly practice rounds', 'Regional open preparation'],
      };

      setSocieties((prev) => [newSociety, ...prev]);
    } else if (sub.type === 'practice') {
      const newPractice: PracticeSession = {
        id: `prac-${Date.now().toString(36)}`,
        title: sub.payload.title,
        slug: (sub.payload.title || 'practice')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        hostOrg: sub.payload.hostOrg || sub.submitterName,
        hostName: sub.submitterName,
        sessionType: sub.payload.sessionType || 'Online Sparring',
        format: sub.payload.format || 'BP',
        sessionDate: sub.payload.sessionDate || '2026-09-15',
        timeUTC: sub.payload.timeUTC || '15:00 UTC',
        durationMins: Number(sub.payload.durationMins) || 90,
        platform: sub.payload.platform || 'Google Meet',
        meetingLink: sub.payload.meetingLink || 'https://meet.google.com',
        slotsAvailable: Number(sub.payload.slotsAvailable) || 8,
        slotsFilled: 1,
        skillLevel: sub.payload.skillLevel || 'All Levels',
        motionPrompt: sub.payload.motionPrompt,
        contactEmail: sub.submitterEmail,
        region: sub.payload.region || 'Pan-African & Global',
        rsvps: [sub.submitterEmail],
      };

      setPracticeSessions((prev) => [newPractice, ...prev]);
    } else if (sub.type === 'opportunity') {
      const newOp: Opportunity = {
        id: `op-${Date.now().toString(36)}`,
        title: sub.payload.title,
        slug: (sub.payload.title || 'opportunity')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
        opportunityType: sub.payload.opportunityType || 'Grant',
        organization: sub.payload.organizationName || sub.payload.organization || sub.submitterName,
        organizationName: sub.payload.organizationName || sub.payload.organization || sub.submitterName,
        country: sub.payload.country || 'Pan-African',
        region: sub.payload.region || 'Pan-African & Global',
        format: sub.payload.format || 'BP',
        deliveryMode: sub.payload.deliveryMode || 'Online',
        countryScope: sub.payload.countryScope || sub.payload.country || 'Pan-African & International',
        description: sub.payload.description || '',
        eligibilityCriteria: sub.payload.eligibilityCriteria || sub.payload.eligibility || 'Open to African debaters',
        eligibility: sub.payload.eligibilityCriteria || sub.payload.eligibility || 'Open to African debaters',
        deadline: sub.payload.deadline || 'Rolling basis',
        applicationLink: sub.payload.applicationLink || 'https://panafricandebate.org',
        isFunded: sub.payload.isFunded ?? true,
        fundingAmount: sub.payload.fundingAmount,
        tags: sub.payload.tags || ['Debate', 'Africa'],
      };

      setOpportunities((prev) => [newOp, ...prev]);
    }

    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'approved' as const, adminNotes: 'Approved by Administrator.' } : s))
    );

    showToast('success', 'Submission Approved & Published!', `The ${sub.type} is now live across the platform.`);
  };

  // Moderation: Reject
  const rejectSubmission = (submissionId: string, notes?: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status: 'rejected' as const, adminNotes: notes || 'Declined per community guidelines.' } : s))
    );
    showToast('warning', 'Submission Rejected', 'The submission status has been updated to rejected.');
  };

  // Admin toggles
  const toggleSocietyVerification = (societyId: string) => {
    setSocieties((prev) =>
      prev.map((s) => {
        if (s.id === societyId) {
          const nextStatus = s.verificationStatus === 'verified' ? 'unverified' : 'verified';
          showToast('info', 'Verification Updated', `${s.name} is now ${nextStatus}.`);
          return { ...s, verificationStatus: nextStatus };
        }
        return s;
      })
    );
  };

  const toggleTournamentFeatured = (tournamentId: string) => {
    setTournaments((prev) =>
      prev.map((t) => {
        if (t.id === tournamentId) {
          const nextFeatured = !t.isFeatured;
          showToast('info', 'Featured Status Updated', `${t.title} ${nextFeatured ? 'is now featured on the homepage' : 'unfeatured'}.`);
          return { ...t, isFeatured: nextFeatured };
        }
        return t;
      })
    );
  };

  // Practice RSVP
  const rsvpPracticeSession = (sessionId: string) => {
    setPracticeSessions((prev) =>
      prev.map((p) => {
        if (p.id === sessionId) {
          const currentRsvps = p.rsvps || [];
          if (currentRsvps.includes(currentUser.email)) {
            return p;
          }
          showToast('success', 'RSVP Confirmed!', `You are registered for "${p.title}". Check your meeting room link.`);
          return {
            ...p,
            slotsFilled: Math.min(p.slotsAvailable, p.slotsFilled + 1),
            rsvps: [...currentRsvps, currentUser.email],
          };
        }
        return p;
      })
    );
  };

  const cancelRsvpPracticeSession = (sessionId: string) => {
    setPracticeSessions((prev) =>
      prev.map((p) => {
        if (p.id === sessionId) {
          const currentRsvps = p.rsvps || [];
          showToast('info', 'RSVP Cancelled', `Your spot in "${p.title}" has been released.`);
          return {
            ...p,
            slotsFilled: Math.max(0, p.slotsFilled - 1),
            rsvps: currentRsvps.filter((e) => e !== currentUser.email),
          };
        }
        return p;
      })
    );
  };

  return (
    <PlatformContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCountrySlug,
        setSelectedCountrySlug,
        selectedTournamentSlug,
        setSelectedTournamentSlug,
        selectedSocietySlug,
        setSelectedSocietySlug,
        selectedFormatSlug,
        setSelectedFormatSlug,
        selectedResourceSlug,
        setSelectedResourceSlug,
        selectedCourseSlug,
        setSelectedCourseSlug,
        tournaments,
        societies,
        formats,
        resources,
        practiceSessions,
        opportunities,
        countries,
        courses,
        submissions,
        isSearchOpen,
        setIsSearchOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        submitModalType,
        setSubmitModalType,
        currentUser,
        setUserRole,
        switchDemoUser,
        toggleBookmarkTournament,
        toggleBookmarkResource,
        isTournamentBookmarked,
        isResourceBookmarked,
        createSubmission,
        approveSubmission,
        rejectSubmission,
        toggleSocietyVerification,
        toggleTournamentFeatured,
        rsvpPracticeSession,
        cancelRsvpPracticeSession,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = (): PlatformContextType => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
