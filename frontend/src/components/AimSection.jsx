import React from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AimSection({ onNavigateNext }) {
  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6 text-slate-800 animate-in fade-in duration-200">
      {/* Centered Main Title matching official Virtual Labs */}
      <div className="text-center mb-3">
        <h1
          className="text-lg sm:text-2xl md:text-[1.7rem] font-medium text-[#2c99ce] tracking-normal break-words"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Django Custom Form Validation using clean() & clean_&lt;field&gt;()
        </h1>
      </div>

      {/* Sub-divider */}
      <div className="border-b border-[#e8e8e8] mb-6"></div>

      <div className="space-y-6 text-[#000000] font-['Open_Sans'] text-base">
        {/* Estimated Time */}
        <section>
          <h3
            className="text-[1.1rem] font-bold text-[#333333] underline mb-1"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Estimated Time
          </h3>
          <p className="text-base text-[#333333]">1 hour</p>
        </section>

        {/* Learning Objectives */}
        <section>
          <h3
            className="text-[1.1rem] font-bold text-[#333333] underline mb-2"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Learning Objectives of the Experiment
          </h3>
          <p className="text-[#333333] mb-3">
            In this experiment, we will be able to do the following:
          </p>
          <ul className="space-y-2 pl-6 list-disc text-[#333333]">
            <li className="leading-relaxed">
              Identify the roles of single-field validation (<code className="text-xs bg-slate-100 text-[#0284c7] px-1.5 py-0.5 rounded border border-slate-200 font-mono font-bold">clean_&lt;fieldname&gt;()</code>) and multi-field validation (<code className="text-xs bg-slate-100 text-[#0284c7] px-1.5 py-0.5 rounded border border-slate-200 font-mono font-bold">clean()</code>) in Django forms.
            </li>
            <li className="leading-relaxed">
              Trace the execution order of <code className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-mono">form.is_valid()</code>, from type casting in <code className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-mono">_clean_fields()</code> to the form-level cleaning stage.
            </li>
            <li className="leading-relaxed">
              Write custom validation logic for applicant age checks (&ge; 18) and cross-field password verification.
            </li>
            <li className="leading-relaxed">
              Inspect how valid data is populated into <code className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-mono font-semibold">self.cleaned_data</code> and how raising <code className="text-xs bg-slate-100 text-red-600 px-1.5 py-0.5 rounded border border-slate-200 font-mono">forms.ValidationError</code> populates <code className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-mono">form.errors</code>.
            </li>
            <li className="leading-relaxed">
              Differentiate between field-level error messages and non-field errors under the <code className="text-xs bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded border border-slate-200 font-mono">'__all__'</code> key.
            </li>
          </ul>
        </section>

        {/* Prerequisites & Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
              Prerequisites
            </h3>
            <ul className="text-xs sm:text-sm text-sky-800 space-y-1.5 list-disc pl-4">
              <li>Python syntax, class inheritance, and exception handling (<code className="font-mono">raise</code>).</li>
              <li>Basic structure of a Django application (<code className="font-mono">forms.py</code>, <code className="font-mono">views.py</code>).</li>
              <li>HTTP POST data handling in web requests.</li>
            </ul>
          </div>

          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Expected Outcomes
            </h3>
            <ul className="text-xs sm:text-sm text-amber-800 space-y-1.5 list-disc pl-4">
              <li>Construct working <code className="font-mono">clean_&lt;fieldname&gt;()</code> and <code className="font-mono">clean()</code> methods.</li>
              <li>Diagnose validation exceptions using the step-by-step trace visualizer.</li>
              <li>Complete the pre-lab and post-lab evaluations.</li>
            </ul>
          </div>
        </div>

        {/* Action Button to Proceed */}
        <div className="pt-6 flex justify-stretch sm:justify-end">
          <button
            onClick={onNavigateNext}
            className="w-full sm:w-auto justify-center px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <span>Proceed to Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
