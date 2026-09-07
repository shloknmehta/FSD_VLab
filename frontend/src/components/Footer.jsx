import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] text-white font-['Raleway',sans-serif] border-t-4 border-[#ff6600] mt-auto select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Institutional Logos (KJSSE, Somaiya Trust, Somaiya Vidyavihar) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <div className="bg-white px-3 py-1.5 rounded-md shadow-xs flex items-center">
              <img
                src="/assets/logos/kjsce-formerly.svg"
                alt="K. J. Somaiya School of Engineering"
                className="h-7 sm:h-8 w-auto object-contain"
                title="K. J. Somaiya School of Engineering (KJSSE)"
              />
            </div>

            <div className="h-6 w-[1px] bg-slate-700 hidden sm:block" />

            <div className="bg-white px-2 py-1 rounded-md shadow-xs flex items-center">
              <img
                src="/assets/logos/somaiya_trust.png"
                alt="The Somaiya Trust"
                className="h-6 sm:h-7 w-auto object-contain"
                title="The Somaiya Trust"
              />
            </div>

            <div className="h-6 w-[1px] bg-slate-700 hidden sm:block" />

            <div className="bg-white px-2.5 py-1 rounded-md shadow-xs flex items-center">
              <img
                src="/assets/logos/svu.png"
                alt="Somaiya Vidyavihar University"
                className="h-6 sm:h-7 w-auto object-contain"
                title="Somaiya Vidyavihar University"
              />
            </div>
          </div>

          {/* Institutional Copy */}
          <div className="text-center md:text-right text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200 text-[13px]">
              K. J. Somaiya School of Engineering (KJSSE)
            </p>
            <p className="text-[11px] text-slate-400">
              Department of Computer Engineering &bull; Somaiya Vidyavihar University &bull; The Somaiya Trust
            </p>
            <p className="text-[10.5px] text-slate-500">
              Virtual Labs &bull; An MoE Govt of India Initiative &bull; All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
