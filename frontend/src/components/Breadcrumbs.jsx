import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Full Stack Development',
  section = 'Experiments',
  experimentTitle,
}) {
  return (
    <div className="w-full max-w-full bg-white px-2.5 sm:px-6 md:px-8 py-2 sm:py-3.5 select-none overflow-hidden">
      <nav
        className="breadcrumbs flex items-center flex-wrap gap-x-1 sm:gap-x-2 gap-y-0.5 leading-snug"
      >
        <span className="hover:underline cursor-pointer transition-colors">
          {department}
        </span>
        <span className="px-0.5 sm:px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors">
          {course}
        </span>
        <span className="px-0.5 sm:px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors">
          {section}
        </span>
        {experimentTitle && (
          <>
            <span className="px-0.5 sm:px-1">&gt;</span>
            <span className="hover:underline cursor-pointer transition-colors">
              {experimentTitle}
            </span>
          </>
        )}
      </nav>
    </div>
  );
}
