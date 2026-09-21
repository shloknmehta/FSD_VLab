import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Full Stack Development',
  section = 'Experiments',
  experimentTitle,
}) {
  return (
    <div className="w-full bg-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 select-none">
      <nav
        className="flex items-center flex-wrap gap-x-2 text-[1.15rem] sm:text-[1.4rem] md:text-[1.6rem] font-normal tracking-normal text-[#337ab7]"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        <span className="hover:underline cursor-pointer transition-colors text-[#337ab7]">
          {department}
        </span>
        <span className="text-[#337ab7] px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors text-[#337ab7]">
          {course}
        </span>
        <span className="text-[#337ab7] px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors text-[#337ab7]">
          {section}
        </span>
        {experimentTitle && (
          <>
            <span className="text-[#337ab7] px-1">&gt;</span>
            <span className="hover:underline cursor-pointer transition-colors text-[#337ab7]">
              {experimentTitle}
            </span>
          </>
        )}
      </nav>
    </div>
  );
}
