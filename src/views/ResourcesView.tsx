import React, { useState, useMemo } from 'react';
import {
  Compass,
  Search,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Download,
  Filter,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { MOTIONS } from '../data/motions';

export const ResourcesView: React.FC = () => {
  const {
    resources,
    setSelectedResourceSlug,
    isResourceBookmarked,
    toggleBookmarkResource,
    showToast,
  } = usePlatform();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'guides' | 'motions'>('guides');
  const [copiedMotionIndex, setCopiedMotionIndex] = useState<string | null>(null);
  const [motionStatus, setMotionStatus] = useState<'active' | 'reserve'>('active');

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      if (q && !r.title.toLowerCase().includes(q) && !r.summary.toLowerCase().includes(q) && !r.authorName.toLowerCase().includes(q)) {
        return false;
      }
      if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
      return true;
    });
  }, [resources, searchQuery, selectedCategory]);

  const filteredMotions = useMemo(() => {
    return MOTIONS.filter(m => m.status === motionStatus);
  }, [motionStatus]);

  const handleCopyMotion = (motionText: string, id: string) => {
    navigator.clipboard.writeText(motionText);
    setCopiedMotionIndex(id);
    showToast('success', 'Motion Copied!', 'Debate motion copied to clipboard.');
    setTimeout(() => setCopiedMotionIndex(null), 2500);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <Compass className="w-4 h-4" />
          <span>Pan-African Knowledge Commons</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
          Debate Guides & African Motion Bank
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Open-access training handbooks, adjudicator training scales, and curated African policy motions.
        </p>
      </div>

      {/* Main Tab Switcher: Guides vs Motion Bank */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 max-w-md">
        <button
          onClick={() => setActiveTab('guides')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'guides'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Curated Guides ({resources.length})
        </button>
        <button
          onClick={() => setActiveTab('motions')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'motions'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
              : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          Pan-African Motion Bank
        </button>
      </div>

      {activeTab === 'guides' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides by title, strategy topic, or author..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-800 dark:text-stone-200"
              >
                <option value="All">All Categories</option>
                <option value="Format Guide">Format Guides</option>
                <option value="Strategy">Strategy & Argumentation</option>
                <option value="Adjudication">Adjudication & Scoring</option>
                <option value="Curriculum">Curricula & Syllabus</option>
                <option value="Motion Bank">Motion Banks</option>
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((r) => {
              const isSaved = isResourceBookmarked(r.id);
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedResourceSlug(r.slug)}
                  className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                        {r.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmarkResource(r.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-amber-500 text-stone-950 border-amber-400'
                              : 'text-stone-400 border-stone-200 dark:border-stone-700'
                          }`}
                          title={isSaved ? 'Remove Bookmark' : 'Save Guide'}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {r.title}
                    </h3>

                    <p className="text-xs text-stone-500 line-clamp-3 mt-2 leading-relaxed">
                      {r.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                    <div>
                      <p className="font-semibold text-stone-700 dark:text-stone-300">{r.authorName}</p>
                      <p className="text-[10px] text-stone-400">{r.readTimeMins} min read</p>
                    </div>
                    <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline">
                      Read Full &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'motions' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-300">
            <strong>African Policy Motion Bank:</strong> Calibrated motions for BP, WSDC, and AP. 
            <div className='flex gap-2 mt-2'>
              <button onClick={() => setMotionStatus('active')} className={`px-3 py-1 rounded-full ${motionStatus === 'active' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Active (50)</button>
              <button onClick={() => setMotionStatus('reserve')} className={`px-3 py-1 rounded-full ${motionStatus === 'reserve' ? 'bg-amber-500 text-white' : 'bg-white'}`}>Reserve</button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredMotions.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    {item.isAfricanContext && <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">African Context</span>}
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-display leading-snug">
                    &ldquo;{item.text}&rdquo;
                  </h4>
                </div>

                <button
                  onClick={() => handleCopyMotion(item.text, item.id)}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-700 dark:text-stone-300 font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  {copiedMotionIndex === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMotionIndex === item.id ? 'Copied' : 'Copy Motion'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
