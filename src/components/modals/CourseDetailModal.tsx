import React from 'react';
import { X, GraduationCap, Clock, Award, CheckCircle, BookOpen, User, Play, Sparkles } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const CourseDetailModal: React.FC = () => {
  const { selectedCourseSlug, setSelectedCourseSlug, courses, showToast } = usePlatform();

  if (!selectedCourseSlug) return null;

  const course = courses.find((c) => c.slug === selectedCourseSlug);
  if (!course) return null;

  const handleEnroll = () => {
    showToast(
      'success',
      'Enrolled Successfully!',
      `You are enrolled in "${course.title}". Start with Module 1 anytime!`
    );
    setSelectedCourseSlug(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-stone-900 via-stone-850 to-amber-950 text-white relative">
          <button
            onClick={() => setSelectedCourseSlug(null)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
              {course.difficulty || course.level || 'All Levels'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
              {course.durationWeeks} Weeks &bull; {course.status}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight leading-tight">
            {course.title}
          </h2>
          <p className="text-xs text-stone-300 mt-2 leading-relaxed">{course.overview || course.description}</p>
        </div>

        {/* Course Info & Curriculum */}
        <div className="p-6 space-y-6 max-h-[55vh] overflow-y-auto text-xs">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800 text-center">
            <div>
              <span className="text-stone-500 block">Instructor</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 block truncate">
                {course.instructor}
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Duration</span>
              <span className="font-bold text-stone-900 dark:text-stone-100 mt-0.5 block">
                {course.durationWeeks} Weeks
              </span>
            </div>
            <div>
              <span className="text-stone-500 block">Certification</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                Free Certificate
              </span>
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/30 border border-stone-200/80 dark:border-stone-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-stone-900 dark:text-stone-100 block">{course.instructor}</span>
              <p className="text-stone-500">{course.instructorRole} ({course.instructorAffiliation})</p>
            </div>
          </div>

          {/* Curriculum Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Course Syllabus & Modules ({course.modules.length})
            </h4>
            <div className="space-y-3">
              {course.modules.map((mod, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center font-bold text-stone-700 dark:text-stone-300 text-[11px]">
                      {i + 1}
                    </span>
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-xs">{mod.title}</p>
                  </div>
                  <div className="pl-8 space-y-1">
                    {mod.lessons.map((lesson, lIdx) => (
                      <p key={lIdx} className="text-[11px] text-stone-500 flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{lesson}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            100% Free Open Educational Resource
          </span>
          <button
            onClick={handleEnroll}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Enroll Now (Free)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
