import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Full Stack Development',
  section = 'Experiments',
  experimentTitle,
  onSelectSubject,
  onSelectTab,
}) {
  const isCN = course.toLowerCase().includes('network');

  return (
    <div className="w-full max-w-full bg-white px-2.5 sm:px-6 md:px-8 py-2 sm:py-3.5 select-none overflow-hidden border-b border-slate-100">
      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs flex items-center flex-wrap gap-x-1 sm:gap-x-2 gap-y-0.5 leading-snug text-xs sm:text-sm font-['Open_Sans'] text-slate-500"
      >
        <span className="text-slate-600 hover:text-[#0284c7] transition-colors">
          {department}
        </span>
        <span className="px-0.5 sm:px-1 text-slate-400">&gt;</span>
        <button
          type="button"
          onClick={() => onSelectSubject && onSelectSubject(isCN ? 'CN' : 'FSD')}
          className="hover:underline hover:text-[#0284c7] font-semibold text-slate-800 transition-colors cursor-pointer"
          title={`Switch or navigate to ${course}`}
        >
          {course}
        </button>
        <span className="px-0.5 sm:px-1 text-slate-400">&gt;</span>
        <button
          type="button"
          onClick={() => onSelectTab && onSelectTab('aim')}
          className="hover:underline hover:text-[#0284c7] text-slate-600 transition-colors cursor-pointer"
          title="Go to Experiments Aim"
        >
          {section}
        </button>
        {experimentTitle && (
          <>
            <span className="px-0.5 sm:px-1 text-slate-400">&gt;</span>
            <button
              type="button"
              onClick={() => onSelectTab && onSelectTab('aim')}
              className="hover:underline hover:text-[#0284c7] text-slate-900 font-medium transition-colors cursor-pointer text-left truncate max-w-[200px] sm:max-w-md"
              title={experimentTitle}
            >
              {experimentTitle}
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
