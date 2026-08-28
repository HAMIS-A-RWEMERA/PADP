import React, { useState } from 'react';
import {
  Search,
  PlusCircle,
  Menu,
  X,
  Compass,
  Trophy,
  Users,
  Swords,
  BookOpen,
  GraduationCap,
  Sparkles,
  Globe2,
  ShieldAlert,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { usePlatform, NavView } from '../../context/PlatformContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsSearchOpen,
    setIsSubmitModalOpen,
    setSubmitModalType,
    submissions,
    currentUser,
    setUserRole,
  } = usePlatform();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'pending').length;

  const navItems: { id: NavView; label: string; icon: React.ReactNode }[] = [
    { id: 'competitions', label: 'Competitions', icon: <Trophy className="w-4 h-4" /> },
    { id: 'societies', label: 'Societies', icon: <Users className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Swords className="w-4 h-4" /> },
    { id: 'formats', label: 'Formats', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <Compass className="w-4 h-4" /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'countries', label: 'Countries', icon: <Globe2 className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: NavView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubmit = (type: 'tournament' | 'organization' | 'practice' | 'resource') => {
    setSubmitModalType(type);
    setIsSubmitModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const roleOptions: { role: UserRole; label: string; desc: string }[] = [
    { role: 'debater', label: 'Debater', desc: 'Browse, bookmark & join practice' },
    { role: 'society_lead', label: 'Society Leader', desc: 'Publish activities & events' },
    { role: 'organizer', label: 'Tournament Organizer', desc: 'Convenor & host tournaments' },
    { role: 'coach', label: 'Coach / Adjudicator', desc: 'Post training & workshops' },
    { role: 'admin', label: 'Platform Admin', desc: 'Review & approve submissions' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-stone-950 text-xs font-semibold py-1.5 px-4 text-center tracking-tight flex items-center justify-center gap-2">
        <span className="bg-stone-950/20 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
          Pan-African Circuit
        </span>
        <span>
          PAUDC 2026 Nairobi & PAWSDC Kigali Registration is officially open across Africa!
        </span>
        <button
          onClick={() => handleNavClick('competitions')}
          className="underline hover:text-white transition-colors font-bold ml-1"
        >
          View Tournaments &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-900/20 group-hover:scale-105 transition-transform text-stone-950 font-black text-xl font-display">
                P
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-lg text-stone-100 tracking-tight leading-none group-hover:text-amber-400 transition-colors">
                    PADP
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded leading-none">
                    Africa
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-sans tracking-tight">The Home of African Debate</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-stone-800 text-amber-400 border border-stone-700 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-stone-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 text-stone-300 hover:text-white text-xs font-medium transition-all group shadow-inner"
              title="Search Pan-African Debate Platform (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block bg-stone-900 border border-stone-700 text-[10px] font-mono text-stone-400 px-1.5 py-0.5 rounded leading-none">
                ⌘K
              </kbd>
            </button>

            {/* Quick Submit CTA */}
            <button
              onClick={() => handleOpenSubmit('tournament')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-stone-950" />
              <span>Submit Event</span>
            </button>

            {/* Admin Dashboard shortcut if admin or showing count */}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'bg-amber-500 text-stone-950 border-amber-400'
                    : 'bg-stone-800 text-amber-300 border-amber-500/40 hover:bg-stone-750'
                }`}
                title="Admin Moderation Dashboard"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin</span>
                {pendingSubmissionsCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {pendingSubmissionsCount}
                  </span>
                )}
              </button>
            )}

            {/* Role Switcher Menu */}
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 border border-stone-700 text-stone-200 text-xs font-medium transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-amber-500/50"
                />
                <div className="hidden md:flex flex-col text-left leading-tight">
                  <span className="font-semibold text-stone-200 truncate max-w-[90px]">{currentUser.name}</span>
                  <span className="text-[10px] text-amber-400 capitalize">{currentUser.role.replace('_', ' ')}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {/* Role Switcher Dropdown */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-stone-800 mb-1">
                    <p className="text-xs font-bold text-stone-200">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-400">{currentUser.email}</p>
                    <p className="text-[10px] text-amber-400 mt-0.5">{currentUser.institution || currentUser.country}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setIsRoleMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-white hover:bg-stone-800 transition-colors flex items-center justify-between"
                    >
                      <span>My Profile & Bookmarks</span>
                      <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setIsRoleMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:bg-stone-800 transition-colors flex items-center justify-between"
                      >
                        <span>Admin Moderation</span>
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    )}
                  </div>

                  <div className="border-t border-stone-800 pt-2 mt-1">
                    <p className="text-[10px] uppercase font-bold text-stone-500 px-3 pb-1 tracking-wider">
                      Switch Role (Demo Persona)
                    </p>
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.role}
                        onClick={() => {
                          setUserRole(opt.role);
                          setIsRoleMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex flex-col ${
                          currentUser.role === opt.role
                            ? 'bg-amber-500/10 text-amber-400 font-semibold'
                            : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                        }`}
                      >
                        <span className="flex items-center justify-between">
                          <span>{opt.label}</span>
                          {currentUser.role === opt.role && <span className="text-[10px] text-amber-400 font-bold">Active</span>}
                        </span>
                        <span className="text-[10px] text-stone-500 font-normal">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-stone-900/98 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-stone-800 text-amber-400 border border-stone-700'
                      : 'text-stone-300 bg-stone-850/50 hover:bg-stone-800'
                  }`}
                >
                  <span className={isActive ? 'text-amber-400' : 'text-stone-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => handleOpenSubmit('tournament')}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-stone-950" />
              <span>Submit Tournament / Open</span>
            </button>

            <button
              onClick={() => handleOpenSubmit('organization')}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold text-xs text-center flex items-center justify-center gap-2 border border-stone-700"
            >
              <Users className="w-4 h-4 text-stone-400" />
              <span>Register Debate Society</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
