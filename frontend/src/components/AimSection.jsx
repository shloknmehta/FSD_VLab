import React from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AimSection({ onNavigateNext, experiment }) {
  // If experiment data is provided dynamically, use it; otherwise fallback to Django experiment
  const title = experiment ? experiment.title : 'Django Custom Form Validation using clean() & clean_<field>()';
  const estimatedTime = experiment ? (experiment.estimatedTime || '45 Minutes') : '1 hour';
  const aimText = experiment ? experiment.aim : null;
  const outcomes = experiment && experiment.expectedOutcomes ? experiment.expectedOutcomes : [
    'Identify the roles of single-field validation (clean_<fieldname>()) and multi-field validation (clean()) in Django forms.',
    'Trace the execution order of form.is_valid(), from type casting in _clean_fields() to the form-level cleaning stage.',
    'Write custom validation logic for applicant age checks (>= 18) and cross-field password verification.',
    'Inspect how valid data is populated into self.cleaned_data and how raising forms.ValidationError populates form.errors.',
    "Differentiate between field-level error messages and non-field errors under the '__all__' key.",
  ];
  const prerequisites = experiment && experiment.prerequisites ? experiment.prerequisites : [
    'Python syntax, class inheritance, and exception handling (raise).',
    'Basic structure of a Django application (forms.py, views.py).',
    'HTTP POST data handling in web requests.',
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6 text-slate-800 animate-in fade-in duration-200">
      {/* Centered Main Title matching official Virtual Labs */}
      <div className="text-center mb-3">
        <h1
          className="text-lg sm:text-2xl md:text-[1.7rem] font-medium text-[#2c99ce] tracking-normal break-words"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {title}
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
          <p className="text-base text-[#333333]">{estimatedTime}</p>
        </section>

        {/* Learning Objectives / Aim */}
        <section>
          <h3
            className="text-[1.1rem] font-bold text-[#333333] underline mb-2"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Aim & Learning Objectives of the Experiment
          </h3>
          {aimText && (
            <p className="text-[#333333] mb-3 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {aimText}
            </p>
          )}
          <p className="text-[#333333] mb-2 font-semibold">
            Target Competencies & Learning Outcomes:
          </p>
          <ul className="space-y-2 pl-6 list-disc text-[#333333]">
            {outcomes.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Prerequisites & Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
              Course Prerequisites
            </h3>
            <ul className="text-xs sm:text-sm text-sky-800 space-y-1.5 list-disc pl-4">
              {prerequisites.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Evaluation Standard
            </h3>
            <ul className="text-xs sm:text-sm text-amber-800 space-y-1.5 list-disc pl-4">
              <li>Complete diagnostic Pretest assessment before simulation.</li>
              <li>Perform interactive hands-on experiment in the Workbench.</li>
              <li>Pass the Posttest certification exam (&ge; 60%) to earn course certificate.</li>
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
