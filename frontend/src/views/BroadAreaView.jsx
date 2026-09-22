import React from 'react';
import {
  Building2,
  Code2,
  Network,
  ArrowRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function BroadAreaView({ onSelectSubject, onStartLab }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 1. Header Banner matching vlab.co.in/broad-area-computer-science-and-engineering */}
      <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                Broad Area
              </span>
              <span className="text-xs text-slate-500 font-medium">
                National Mission on Education through ICT (NMEICT)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Raleway'] tracking-tight">
              Computer Science & Engineering
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Welcome to the Department of Computer Engineering Virtual Laboratories portal. Explore interactive simulation environments, dynamic packet tracers, and automated code assessment workbenches aligned with university curriculum standards.
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center shadow-md shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 2. Official Instructions Box */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 sm:p-5 text-xs text-amber-900 space-y-2">
        <div className="font-bold flex items-center gap-2 text-amber-950 text-sm">
          <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
          <span>General Instructions for Conducting Laboratories:</span>
        </div>
        <ol className="list-decimal list-inside space-y-1.5 pl-1 text-xs text-amber-900/90 leading-relaxed">
          <li>
            In order to derive maximum learning experience, users are advised to first read the instructions and theoretical background before starting simulations.
          </li>
          <li>
            Interactive simulators feature real-time state visualization, automated test evaluation, and instant performance feedback.
          </li>
          <li>
            Select an active laboratory discipline below to launch the syllabus experiments and workbench.
          </li>
        </ol>
      </div>

      {/* 3. Available Laboratories Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-['Raleway']">
            Available Departmental Laboratories
          </h2>
          <span className="text-xs text-slate-400 font-medium">2 Active Disciplines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Lab 1: Full Stack Development */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-sky-400 transition-all shadow-xs hover:shadow-md p-5 sm:p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Active Premier Lab
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition font-['Raleway']">
                  Full Stack Development Lab
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  K. J. Somaiya School of Engineering • Semester V
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive web application engineering laboratory featuring Django custom form lifecycle validation, RESTful API serializers, React component state tracking, and token-based authentication.
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Key Topics:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Django Form Lifecycle', 'clean() Validation', 'React Virtual DOM', 'REST APIs', 'CSRF & Security'].map((t, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Lab Code: SVU-FSD-01</span>
              <button
                type="button"
                onClick={() => {
                  if (onSelectSubject) onSelectSubject('FSD');
                  if (onStartLab) onStartLab('FSD');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
              >
                <span>Enter Laboratory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lab 2: Computer Networks */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-sky-400 transition-all shadow-xs hover:shadow-md p-5 sm:p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-xs">
                  <Network className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
                  Active Premier Lab
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0284c7] transition font-['Raleway']">
                  Computer Networks Lab (New)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Course Code: 216U01L502 / 216U01C502 • Semester V
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Interactive Layer 2 and Layer 3 networking laboratory with live Cisco Catalyst 24-port switch configuration, 802.1Q trunking, broadcast domain isolation, ping packet reachability, and network diagnostics.
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Key Topics:</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Virtual LANs (VLANs)', 'IEEE 802.1Q Trunking', 'Broadcast Isolation', 'CLI Diagnostics', 'Routing Protocols'].map((t, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Credits: 1.0 (Practical)</span>
              <button
                type="button"
                onClick={() => {
                  if (onSelectSubject) onSelectSubject('CN');
                  if (onStartLab) onStartLab('CN');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
              >
                <span>Enter Laboratory</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
