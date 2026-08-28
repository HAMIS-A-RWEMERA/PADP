import React, { useState, useEffect } from 'react';
import {
  Swords,
  Sparkles,
  Calendar,
  Clock,
  Video,
  Users,
  PlusCircle,
  Play,
  RotateCw,
  Timer,
  CheckCircle2,
  ExternalLink,
  Volume2,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

interface GeneratedMotion {
  motion: string;
  category: string;
  format: string;
  infoSlide?: string;
  keyClashPoints: string[];
}

const MOTION_POOL: GeneratedMotion[] = [
  {
    motion: 'This House would establish a single Pan-African central bank with sovereign currency issuance powers over member states.',
    category: 'African Economics & Monetary Policy',
    format: 'BP / AP',
    infoSlide: 'Info Slide: The African Continental Free Trade Area (AfCFTA) has entered operational phases. Proposals have been raised by the African Union regarding monetary unification to reduce reliance on the US Dollar and CFA Franc.',
    keyClashPoints: ['Exchange rate stability vs loss of national fiscal sovereignty', 'Trade friction reduction vs asymmetric macroeconomic shocks across economies'],
  },
  {
    motion: 'This House, as the African Union, would impose strict regional energy sanctions on any member state that signs unilateral bilateral critical mineral export bans with foreign superpowers.',
    category: 'Geopolitics & Resource Sovereignty',
    format: 'BP / WSDC',
    infoSlide: 'Info Slide: Africa holds over 70% of global cobalt and substantial lithium reserves. Multiple states have sought bilateral agreements with China, the EU, and the US.',
    keyClashPoints: ['Collective continental bargaining power vs immediate sovereign developmental revenues', 'Geopolitical independence vs threat of capital flight'],
  },
  {
    motion: 'This House believes that African universities should prioritize localized indigenous knowledge systems and vernacular instruction over Western-accredited STEM curricula.',
    category: 'Education & Cultural Sovereignty',
    format: 'BP / WSDC',
    infoSlide: 'Info Slide: In post-colonial African higher education, English and French remain dominant instructional languages, often alienating non-elite secondary cohorts.',
    keyClashPoints: ['Epistemic decolonization and contextual innovation vs global research mobility and international funding'],
  },
  {
    motion: 'This House would mandate that all African sovereign carbon credit sales be nationalized into a shared continental sovereign wealth fund for climate adaptation.',
    category: 'Climate Justice & African Ecology',
    format: 'BP / PF',
    infoSlide: 'Info Slide: The Congo Basin absorbs more carbon than the Amazon. Private and bilateral carbon offset credits are currently traded with minimal revenue capture by local communities.',
    keyClashPoints: ['Equitable pan-African redistribution vs disincentivizing local community forest stewardship'],
  },
  {
    motion: 'This House would prohibit governments in developing African democracies from adopting AI-driven biometric facial recognition surveillance for civic policing.',
    category: 'Digital Sovereignty & Tech Ethics',
    format: 'BP / WSDC',
    infoSlide: 'Info Slide: Several African metropolitan centers have deployed smart city camera systems supplied by international defense contractors.',
    keyClashPoints: ['Public safety and crime deterrence vs authoritarian surveillance and state suppression of political dissent'],
  },
];

export const PracticeView: React.FC = () => {
  const {
    practiceSessions,
    rsvpPracticeSession,
    cancelRsvpPracticeSession,
    currentUser,
    setIsSubmitModalOpen,
    setSubmitModalType,
  } = usePlatform();

  // Interactive Motion Generator State
  const [currentMotionIndex, setCurrentMotionIndex] = useState(0);
  const [prepSecondsLeft, setPrepSecondsLeft] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const activeMotion = MOTION_POOL[currentMotionIndex];

  const handleNextMotion = () => {
    setCurrentMotionIndex((prev) => (prev + 1) % MOTION_POOL.length);
    setIsTimerRunning(false);
    setPrepSecondsLeft(null);
  };

  const startPrepTimer = (mins: number) => {
    setPrepSecondsLeft(mins * 60);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && prepSecondsLeft !== null && prepSecondsLeft > 0) {
      interval = setInterval(() => {
        setPrepSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (prepSecondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, prepSecondsLeft]);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <Swords className="w-4 h-4" />
            <span>Sparring & Training Grounds</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
            Practice Rounds & Motion Lab
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Participate in online scrimmages with debaters across Africa, or run solo prep with our African Policy Motion Generator.
          </p>
        </div>

        <button
          onClick={() => {
            setSubmitModalType('practice');
            setIsSubmitModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Host a Practice Round</span>
        </button>
      </div>

      {/* Interactive Motion Generator & 15-Min Prep Clock */}
      <section className="rounded-3xl bg-stone-950 text-white p-6 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Motion Generator</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-100">
              African Policy Debate Lab
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Curated motions on African economic integration, climate justice, governance, and institutional reform.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleNextMotion}
              className="px-4 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-2 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Draw Another Motion</span>
            </button>
          </div>
        </div>

        {/* Current Active Motion Display */}
        <div className="py-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {activeMotion.category}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
              Format: {activeMotion.format}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-extrabold font-display text-white leading-snug tracking-tight">
              &ldquo;{activeMotion.motion}&rdquo;
            </h3>

            {activeMotion.infoSlide && (
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 italic leading-relaxed">
                {activeMotion.infoSlide}
              </div>
            )}

            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase font-bold text-stone-400 tracking-wider">
                Key Adjudication Clash Points:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeMotion.keyClashPoints.map((pt, i) => (
                  <div key={i} className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-300">
                    &bull; {pt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timer Control Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs text-stone-400 block">Preparation Clock</span>
              <span className="text-xl font-mono font-bold text-amber-400">
                {prepSecondsLeft !== null ? formatTime(prepSecondsLeft) : '15:00'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startPrepTimer(15)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Start 15-Min BP Prep</span>
            </button>
            <button
              onClick={() => startPrepTimer(30)}
              className="px-3.5 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-700 text-xs font-semibold text-stone-200 transition-all"
            >
              <span>30-Min WSDC Prep</span>
            </button>
            {prepSecondsLeft !== null && (
              <button
                onClick={() => {
                  setIsTimerRunning(!isTimerRunning);
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
              >
                {isTimerRunning ? 'Pause' : 'Resume'}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Live Sparring Rounds & Scrimmages Feed */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-display tracking-tight">
              Upcoming Sparring Rounds & Rooms
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              RSVP to secure a speaker or judge slot. Links are open to verified participants.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {practiceSessions.map((p) => {
            const isUserRsvpd = p.rsvps?.includes(currentUser.email);
            const isFull = p.slotsFilled >= p.slotsAvailable;

            return (
              <div
                key={p.id}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {p.format} &bull; {p.sessionType}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isFull
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {p.slotsFilled}/{p.slotsAvailable} Filled
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display leading-snug">
                    {p.title}
                  </h3>

                  <p className="text-xs text-stone-500 mt-1">
                    Host: <span className="font-semibold text-stone-700 dark:text-stone-300">{p.hostOrg}</span>
                  </p>

                  {p.motionPrompt && (
                    <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 italic mt-3 leading-relaxed">
                      &ldquo;{p.motionPrompt}&rdquo;
                    </div>
                  )}

                  <div className="space-y-1.5 mt-4 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{p.sessionDate} &bull; {p.timeUTC}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-amber-500" />
                      <span>Platform: {p.platform} ({p.durationMins} mins)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                  {isUserRsvpd && p.meetingLink ? (
                    <a
                      href={p.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Join Room Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-stone-400">
                      {isFull ? 'Room Full' : 'Open Registration'}
                    </span>
                  )}

                  <button
                    onClick={() => {
                      if (isUserRsvpd) {
                        cancelRsvpPracticeSession(p.id);
                      } else {
                        rsvpPracticeSession(p.id);
                      }
                    }}
                    disabled={!isUserRsvpd && isFull}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isUserRsvpd
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900'
                        : isFull
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm'
                    }`}
                  >
                    {isUserRsvpd ? 'Cancel RSVP' : isFull ? 'Full' : 'RSVP Speaker Spot'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
