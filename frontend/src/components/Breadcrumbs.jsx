import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Full Stack Development',
  section = 'Experiments',
  experimentTitle,
  activeTab = 'aim',
  onNavigateToBroadArea,
  onNavigateToCourseHome,
  onNavigateToExperimentsList,
  onNavigateToExperimentAim,
}) {
  const isBroadArea = activeTab === 'broad_area';
  const isExperimentsList = activeTab === 'experiments_list';

  return (
    <div className="w-full max-w-full bg-white px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 select-none border-b border-slate-100">
      <nav
        aria-label="Breadcrumb Navigation"
        className="breadcrumbs flex items-center flex-wrap gap-y-1 text-sm sm:text-base leading-snug font-['Raleway']"
      >
        {/* 1. Department Breadcrumb (In-App: Navigates to Broad Area / Department Home) */}
        <button
          type="button"
          onClick={onNavigateToBroadArea}
          className={`hover:underline cursor-pointer transition-colors text-[#337ab7] hover:text-[#23527c] font-['Raleway'] bg-transparent border-0 p-0 ${
            isBroadArea ? 'font-bold text-[#23527c]' : ''
          }`}
          title="Click to view Broad Area: Computer Science and Engineering"
        >
          {department}
        </button>

        {/* 2. Course / Subject Breadcrumb (In-App: Navigates to Course Home / Introduction) */}
        {!isBroadArea && (
          <>
            <span className="crumb-sep px-1.5 sm:px-2 text-slate-400 select-none font-sans font-normal">&gt;</span>
            <button
              type="button"
              onClick={onNavigateToCourseHome}
              className="hover:underline cursor-pointer transition-colors text-[#337ab7] hover:text-[#23527c] font-['Raleway'] bg-transparent border-0 p-0"
              title={`Click to view ${course} home`}
            >
              {course}
            </button>
          </>
        )}

        {/* 3. Section: Experiments (In-App: Navigates to List of Experiments catalog) */}
        {!isBroadArea && (
          <>
            <span className="crumb-sep px-1.5 sm:px-2 text-slate-400 select-none font-sans font-normal">&gt;</span>
            <button
              type="button"
              onClick={onNavigateToExperimentsList}
              className={`hover:underline cursor-pointer transition-colors text-[#337ab7] hover:text-[#23527c] font-['Raleway'] bg-transparent border-0 p-0 ${
                isExperimentsList ? 'font-bold text-[#23527c]' : ''
              }`}
              title="Click to view List of Experiments"
            >
              {section}
            </button>
          </>
        )}

        {/* 4. Active Experiment Title (In-App: Navigates to Experiment Aim) */}
        {!isBroadArea && !isExperimentsList && experimentTitle && (
          <>
            <span className="crumb-sep px-1.5 sm:px-2 text-slate-400 select-none font-sans font-normal">&gt;</span>
            <button
              type="button"
              onClick={onNavigateToExperimentAim}
              className="hover:underline cursor-pointer transition-colors text-left text-[#337ab7] hover:text-[#23527c] font-['Raleway'] truncate max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-xl bg-transparent border-0 p-0"
              title={`Click to view Aim of ${experimentTitle}`}
            >
              {experimentTitle}
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
