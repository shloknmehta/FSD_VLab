import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Django Web Technologies / Full Stack Development',
  section = 'Experiments',
  experimentTitle,
}) {
  return (
    <div className="w-full bg-white border-b border-slate-100 px-6 sm:px-10 py-4 select-none">
      <nav
        className="flex items-center flex-wrap gap-2 text-base sm:text-[1.35rem] font-bold tracking-tight text-[#337ab7]"
        style={{ fontFamily: "'Raleway', sans-serif" }}
      >
        <span className="hover:underline cursor-pointer transition-colors">
          {department}
        </span>
        <span className="text-[#337ab7] font-semibold px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors">
          {course}
        </span>
        <span className="text-[#337ab7] font-semibold px-1">&gt;</span>
        <span className="hover:underline cursor-pointer transition-colors">
          {section}
        </span>
        {experimentTitle && (
          <>
            <span className="text-[#337ab7] font-semibold px-1">&gt;</span>
            <span className="text-slate-600 font-bold">{experimentTitle}</span>
          </>
        )}
      </nav>
    </div>
  );
}
