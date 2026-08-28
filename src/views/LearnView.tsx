import React from 'react';
import { GraduationCap, BookOpen, Clock, Award, CheckCircle, Play, Sparkles } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export const LearnView: React.FC = () => {
  const { courses, setSelectedCourseSlug } = usePlatform();

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Pan-African Training Academy</span>
        </div>
        <h1 className="text-3xl font-extrabold font-display text-stone-900 dark:text-stone-100 tracking-tight">
          Debate Academy & Online Masterclasses
        </h1>
        <p className="text-sm text-stone-500 mt-1 max-w-3xl">
          Structured asynchronous courses designed by African debate champions and chief adjudicators. Free and open to all African students.
        </p>
      </div>

      {/* Course Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setSelectedCourseSlug(course.slug)}
            className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 p-6 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {course.difficulty || 'All Levels'}
                </span>
                <span className="text-xs text-stone-400">{course.durationWeeks} Weeks</span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-display group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                {course.title}
              </h3>

              <p className="text-xs text-stone-500 mt-2 line-clamp-3 leading-relaxed">
                {course.overview}
              </p>

              {/* Modules Preview */}
              <div className="space-y-1.5 mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Syllabus Highlights ({course.modules.length} Modules):
                </span>
                {course.modules.slice(0, 3).map((mod, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 truncate">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{mod.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <div>
                <p className="font-semibold text-stone-700 dark:text-stone-300">{course.instructor}</p>
                <p className="text-[10px] text-stone-400">{course.instructorAffiliation}</p>
              </div>
              <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:underline flex items-center gap-1">
                <Play className="w-3.5 h-3.5" />
                <span>Start Course &rarr;</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
