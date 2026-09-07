import React from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AimSection({ onNavigateNext }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 sm:px-10 text-slate-800 animate-in fade-in duration-200">
      {/* Centered Main Title (matching IIT Guwahati reference screenshot) */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0284c7] tracking-tight">
          Django Custom Form Validation using clean() & clean_&lt;field&gt;()
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">
          Experiment 06: Field-Level and Multi-Field Custom Validation in Django Forms
        </p>
      </div>

      <div className="space-y-8">
        {/* Estimated Time */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 underline decoration-slate-400 decoration-1 underline-offset-4 mb-2 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#0284c7]" />
            Estimated Time
          </h2>
          <p className="text-base text-slate-700 font-medium pl-1">1 hour</p>
        </section>

        {/* Learning Objectives */}
        <section>
          <h2 className="text-xl font-bold text-slate-800 underline decoration-slate-400 decoration-1 underline-offset-4 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0284c7]" />
            Learning Objectives
          </h2>
          <p className="text-slate-700 mb-3 font-normal">
            After completing this experiment, students will be able to:
          </p>
          <ul className="space-y-2.5 pl-5 text-slate-700 list-disc marker:text-slate-600">
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
        <div className="pt-6 flex justify-end">
          <button
            onClick={onNavigateNext}
            className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-lg shadow-sm flex items-center gap-2 transition cursor-pointer"
          >
            <span>Proceed to Overview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
