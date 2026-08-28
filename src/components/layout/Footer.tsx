import React from 'react';
import { Globe2, ShieldCheck, Heart, Sparkles, Send, BookOpen } from 'lucide-react';
import { usePlatform, NavView } from '../../context/PlatformContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCountrySlug } = usePlatform();

  const handleNav = (view: NavView, countrySlug?: string) => {
    if (countrySlug) {
      setSelectedCountrySlug(countrySlug);
      setCurrentView('countries');
    } else {
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800/80">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-display font-black text-xl text-stone-950 shadow-md">
                P
              </div>
              <div>
                <span className="font-display font-extrabold text-xl text-stone-100 tracking-tight">
                  PADP
                </span>
                <p className="text-xs text-amber-400 font-medium">Pan-African Debate Platform</p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed pr-4">
              The digital home and intellectual infrastructure connecting African debaters, university societies, school clubs, adjudicators, and tournament organizers across the continent.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-400 font-medium">
                <Globe2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Pan-African Coverage</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Moderated & Verified</span>
              </div>
            </div>
          </div>

          {/* Quick Discovery */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-100">Discovery</p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => handleNav('competitions')} className="hover:text-amber-400 transition-colors">
                  Upcoming Tournaments
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('societies')} className="hover:text-amber-400 transition-colors">
                  Debate Societies Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('practice')} className="hover:text-amber-400 transition-colors">
                  Practice & Sparring Board
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('opportunities')} className="hover:text-amber-400 transition-colors">
                  Scholarships & Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-amber-400 transition-colors">
                  Free Courses & Training
                </button>
              </li>
            </ul>
          </div>

          {/* Formats & Knowledge */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-100">Debate Knowledge</p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => handleNav('formats')} className="hover:text-amber-400 transition-colors">
                  British Parliamentary (BP)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('formats')} className="hover:text-amber-400 transition-colors">
                  World Schools (WSDC)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('formats')} className="hover:text-amber-400 transition-colors">
                  Asian Parliamentary (AP)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-amber-400 transition-colors">
                  100 African Policy Motions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="hover:text-amber-400 transition-colors">
                  Adjudication Scale Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-100">National Hubs</p>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button onClick={() => handleNav('countries', 'rwanda')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>🇷🇼</span> Rwanda Debate
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('countries', 'kenya')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>🇰🇪</span> Kenya Circuit
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('countries', 'nigeria')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>🇳🇬</span> Nigeria ANUDC
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('countries', 'ghana')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>🇬🇭</span> Ghana Debating
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('countries', 'south-africa')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>🇿🇦</span> South Africa SANUDC
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('countries')} className="text-amber-400 hover:underline font-semibold text-xs pt-1">
                  View all 10+ Country Hubs &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Pan-African Debate Platform (PADP). Built for the African debate community.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-stone-400">
              <span>DISCOVER</span> &bull; <span>CONNECT</span> &bull; <span>PRACTICE</span> &bull; <span>COMPETE</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
