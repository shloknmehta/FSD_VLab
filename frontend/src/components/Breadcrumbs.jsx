import React from 'react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Django Web Technologies / Full Stack Development',
  section = 'Experiments',
  experimentTitle,
}) {
  return (
    <div className="w-full bg-white border-b border-slate-100 px-6 sm:px-10 py-3.5 select-none">
      <nav className="flex items-center flex-wrap gap-2 text-base sm:text-lg text-[#0284c7] font-medium tracking-tight">
        <span className="hover:underline cursor-pointer hover:text-[#0369a1] transition-colors">
          {department}
        </span>
        <span className="text-[#0284c7] font-normal px-0.5">&gt;</span>
        <span className="hover:underline cursor-pointer hover:text-[#0369a1] transition-colors">
          {course}
        </span>
        <span className="text-[#0284c7] font-normal px-0.5">&gt;</span>
        <span className="hover:underline cursor-pointer hover:text-[#0369a1] transition-colors">
          {section}
        </span>
        {experimentTitle && (
          <>
            <span className="text-[#0284c7] font-normal px-0.5">&gt;</span>
            <span className="text-slate-600 font-semibold">{experimentTitle}</span>
          </>
        )}
      </nav>
    </div>
  );
}
