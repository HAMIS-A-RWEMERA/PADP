import React from 'react';
import { X, BookOpen, Clock, User, Bookmark, BookmarkCheck, Share2, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const ResourceReaderModal: React.FC = () => {
  const {
    selectedResourceSlug,
    setSelectedResourceSlug,
    resources,
    isResourceBookmarked,
    toggleBookmarkResource,
    showToast,
  } = usePlatform();

  const [copied, setCopied] = React.useState(false);

  if (!selectedResourceSlug) return null;

  const resource = resources.find((r) => r.slug === selectedResourceSlug);
  if (!resource) return null;

  const isSaved = isResourceBookmarked(resource.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${resource.title}\n\n${resource.summary}\n\n${resource.contentBody}`);
    setCopied(true);
    showToast('success', 'Content Copied!', 'Article text copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
              {resource.category}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
              {resource.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Copy text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => toggleBookmarkResource(resource.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-amber-500 text-stone-950 border-amber-400'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white border-stone-200 dark:border-stone-700'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save for offline'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSelectedResourceSlug(null)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-display tracking-tight leading-snug">
              {resource.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-xs text-stone-500 pb-4 border-b border-stone-200 dark:border-stone-800">
              <span className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
                <User className="w-3.5 h-3.5 text-amber-500" />
                {resource.authorName} ({resource.authorAffiliation})
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {resource.readTimeMins} min read
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 border-l-4 border-amber-500 text-sm text-stone-800 dark:text-stone-200 italic leading-relaxed">
            {resource.summary}
          </div>

          {/* Key Takeaways */}
          {resource.keyTakeaways && resource.keyTakeaways.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Key Strategic Takeaways
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resource.keyTakeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300"
                  >
                    &bull; {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Markdown-styled Content Body */}
          <div className="prose dark:prose-invert max-w-none text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
            {resource.contentBody}
          </div>

          {/* External Link if any */}
          {resource.downloadUrl && resource.downloadUrl !== '#' && (
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <a
                href={resource.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Access Original PDF / Document Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Format: {resource.format || 'Universal'} &bull; PADP Knowledge Commons</span>
          <button
            onClick={() => setSelectedResourceSlug(null)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-800 text-white hover:bg-stone-800"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
