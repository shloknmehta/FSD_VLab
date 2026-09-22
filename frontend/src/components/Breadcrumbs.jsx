import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Check,
  Building2,
  GraduationCap,
  FlaskConical,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Network,
  Code2,
  Sparkles,
} from 'lucide-react';

export default function Breadcrumbs({
  department = 'Computer Science and Engineering',
  course = 'Full Stack Development',
  section = 'Experiments',
  experimentTitle,
  currentSubject = 'FSD',
  onSelectSubject,
  onSelectTab,
  onSelectExperiment,
  cnExperiments = [],
}) {
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [experimentsModalOpen, setExperimentsModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCourseDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCN = currentSubject === 'CN' || course.toLowerCase().includes('network');

  const handleSwitchSubject = (newSubject) => {
    if (onSelectSubject) onSelectSubject(newSubject);
    if (onSelectTab) onSelectTab('aim');
    setCourseDropdownOpen(false);
    setDeptModalOpen(false);
    setExperimentsModalOpen(false);
  };

  const handleExperimentClick = () => {
    if (onSelectTab) onSelectTab('aim');
  };

  // Computer Networks Syllabus Experiments
  const cnSyllabus = [
    {
      num: 1,
      slug: 'cn-vlan-switching',
      title: 'Virtual LANs (VLANs) & IEEE 802.1Q Trunking on Switches',
      category: 'Switching & IEEE 802.1Q',
      status: 'Active Premier Lab',
      active: true,
      time: '45 Mins',
    },
    {
      num: 2,
      slug: 'cn-network-diagnostics',
      title: 'Network Diagnostics CLI Tools (ping, traceroute, netstat, arp, nslookup)',
      category: 'Network Diagnostics & CLI',
      status: 'Upcoming Lab',
      active: false,
      time: '30 Mins',
    },
    {
      num: 3,
      slug: 'cn-hamming-code',
      title: 'Error Detection & Correction using Hamming Code (7,4)',
      category: 'Data Link Layer & Error Control',
      status: 'Upcoming Lab',
      active: false,
      time: '45 Mins',
    },
    {
      num: 4,
      slug: 'cn-ip-subnetting',
      title: 'IPv4 Subnetting, Variable Length Subnet Masking (VLSM) & CIDR',
      category: 'Network Layer & Addressing',
      status: 'Upcoming Lab',
      active: false,
      time: '45 Mins',
    },
    {
      num: 5,
      slug: 'cn-stop-wait-arq',
      title: 'Stop-and-Wait ARQ Flow Control & Channel Timeout Simulation',
      category: 'Transport & Flow Control',
      status: 'Upcoming Lab',
      active: false,
      time: '40 Mins',
    },
    {
      num: 6,
      slug: 'cn-static-routing',
      title: 'Cisco IOS Static Routing & Next-Hop Packet Forwarding',
      category: 'Routing Protocols',
      status: 'Upcoming Lab',
      active: false,
      time: '50 Mins',
    },
  ];

  // Full Stack Development Syllabus Experiments
  const fsdSyllabus = [
    {
      num: 6,
      slug: 'django-form-validation',
      title: 'Django Custom Form Validation using clean() & clean_<field>()',
      category: 'Backend Architecture & Forms',
      status: 'Active Premier Lab',
      active: true,
      time: '45 Mins',
    },
    {
      num: 1,
      slug: 'fsd-react-components',
      title: 'Frontend Component State & Virtual DOM Lifecycle in React',
      category: 'Frontend Engineering',
      status: 'Lab 1 Reference',
      active: false,
      time: '45 Mins',
    },
    {
      num: 2,
      slug: 'fsd-rest-drf',
      title: 'RESTful API Engineering & Serializers with Django REST Framework',
      category: 'Web Services & APIs',
      status: 'Lab 2 Reference',
      active: false,
      time: '50 Mins',
    },
    {
      num: 3,
      slug: 'fsd-jwt-auth',
      title: 'Token Authentication, RBAC Permissions & Security Headers',
      category: 'Security & Access Control',
      status: 'Lab 3 Reference',
      active: false,
      time: '40 Mins',
    },
  ];

  return (
    <>
      <div className="w-full max-w-full bg-white px-2.5 sm:px-6 md:px-8 py-2 sm:py-3.5 select-none border-b border-slate-100">
        <nav
          aria-label="Breadcrumb Navigation"
          className="breadcrumbs flex items-center flex-wrap gap-x-1 sm:gap-x-1.5 gap-y-1 leading-snug"
        >
          {/* 1. Department Breadcrumb (Clickable -> Opens Department Modal) */}
          <button
            type="button"
            onClick={() => setDeptModalOpen(true)}
            className="hover:underline hover:text-[#0284c7] cursor-pointer transition-colors flex items-center gap-1 font-['Raleway']"
            title="Click to view Department of Computer Engineering Laboratories"
          >
            <span>{department}</span>
          </button>

          <span className="px-0.5 sm:px-1 text-slate-400 font-sans select-none">&gt;</span>

          {/* 2. Course / Subject Breadcrumb (Clickable -> Opens Course Switcher Dropdown) */}
          <div className="relative inline-flex items-center" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCourseDropdownOpen((prev) => !prev)}
              className="hover:underline hover:text-[#0284c7] font-semibold cursor-pointer transition-colors flex items-center gap-1 font-['Raleway']"
              title="Click to switch course or view subject details"
              aria-expanded={courseDropdownOpen}
            >
              <span>{course}</span>
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#337ab7] transition-transform duration-150" />
            </button>

            {/* Course Switcher Dropdown */}
            {courseDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Laboratory Subject
                </div>

                {/* Option 1: Full Stack Development */}
                <button
                  type="button"
                  onClick={() => handleSwitchSubject('FSD')}
                  className={`w-full text-left px-3.5 py-2.5 transition flex items-center justify-between cursor-pointer ${
                    !isCN ? 'bg-sky-50/80 text-[#0284c7]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg ${!isCN ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold truncate">Full Stack Development</div>
                      <div className="text-[10px] text-slate-500">Django, React, REST, Form Validation</div>
                    </div>
                  </div>
                  {!isCN && <Check className="w-4 h-4 text-[#0284c7] shrink-0" />}
                </button>

                {/* Option 2: Computer Networks */}
                <button
                  type="button"
                  onClick={() => handleSwitchSubject('CN')}
                  className={`w-full text-left px-3.5 py-2.5 transition flex items-center justify-between cursor-pointer ${
                    isCN ? 'bg-sky-50/80 text-[#0284c7]' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg ${isCN ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Network className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold truncate">Computer Networks</div>
                      <div className="text-[10px] text-slate-500">216U01L502 • VLANs, Switching, Protocols</div>
                    </div>
                  </div>
                  {isCN && <Check className="w-4 h-4 text-[#0284c7] shrink-0" />}
                </button>
              </div>
            )}
          </div>

          <span className="px-0.5 sm:px-1 text-slate-400 font-sans select-none">&gt;</span>

          {/* 3. Section: "Experiments" (Clickable -> Opens All Experiments Modal) */}
          <button
            type="button"
            onClick={() => setExperimentsModalOpen(true)}
            className="hover:underline hover:text-[#0284c7] cursor-pointer transition-colors font-['Raleway']"
            title="Click to view all experiments in this laboratory"
          >
            <span>{section}</span>
          </button>

          {/* 4. Active Experiment Title (Clickable -> Resets to Aim) */}
          {experimentTitle && (
            <>
              <span className="px-0.5 sm:px-1 text-slate-400 font-sans select-none">&gt;</span>
              <button
                type="button"
                onClick={handleExperimentClick}
                className="hover:underline hover:text-[#0284c7] cursor-pointer transition-colors text-left font-['Raleway'] truncate max-w-[220px] sm:max-w-md lg:max-w-xl"
                title={`Click to view Aim of ${experimentTitle}`}
              >
                <span>{experimentTitle}</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* MODAL 1: Department Overview Modal */}
      {deptModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Raleway']">
                    Department of Computer Engineering
                  </h2>
                  <p className="text-xs text-slate-500">
                    K. J. Somaiya School of Engineering — Somaiya Vidyavihar University
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDeptModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Welcome to the Virtual Laboratories portal for the Department of Computer Engineering. Our interactive simulation environments empower students to execute curriculum experiments in real time with automated code assessment, packet analyzers, and instant certification.
              </p>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-2">
                Available Departmental Laboratories
              </div>

              <div className="space-y-3">
                {/* Subject 1 Card */}
                <div
                  onClick={() => handleSwitchSubject('FSD')}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between group ${
                    !isCN ? 'border-sky-500 bg-sky-50/50 shadow-xs' : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition">
                        Full Stack Development (FSD)
                      </div>
                      <div className="text-xs text-slate-500">
                        Django Form Lifecycle, Validation Tracing, React & RESTful APIs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
                    <span>{!isCN ? 'Current Lab' : 'Launch Lab'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Subject 2 Card */}
                <div
                  onClick={() => handleSwitchSubject('CN')}
                  className={`p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between group ${
                    isCN ? 'border-sky-500 bg-sky-50/50 shadow-xs' : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                      <Network className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition">
                        Computer Networks (CN)
                      </div>
                      <div className="text-xs text-slate-500">
                        Course Code: 216U01L502 • VLANs, 802.1Q Trunking, Protocols
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7]">
                    <span>{isCN ? 'Current Lab' : 'Launch Lab'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setDeptModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Laboratory Experiments Directory Modal */}
      {experimentsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Raleway']">
                    {isCN ? 'Computer Networks Experiments' : 'Full Stack Development Experiments'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isCN ? 'SVU 2023 Detailed Syllabus (Course Code: 216U01L502)' : 'Somaiya Vidyavihar University Curriculum'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExperimentsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Experiments List */}
            <div className="p-5 space-y-3 overflow-y-auto">
              <div className="text-xs text-slate-500 font-medium pb-1">
                Select an experiment to start or jump directly into its laboratory workbench:
              </div>

              {(isCN ? cnSyllabus : fsdSyllabus).map((exp) => (
                <div
                  key={exp.num}
                  onClick={() => {
                    if (isCN) {
                      if (onSelectExperiment) onSelectExperiment(exp.slug);
                    }
                    if (onSelectTab) onSelectTab('aim');
                    setExperimentsModalOpen(false);
                  }}
                  className={`p-3.5 rounded-xl border-2 transition flex items-center justify-between cursor-pointer group ${
                    exp.active
                      ? 'border-sky-400 bg-sky-50/50 hover:bg-sky-50 shadow-2xs'
                      : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50 opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        exp.active ? 'bg-[#0284c7] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {exp.num}
                    </div>
                    <div className="truncate">
                      <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition truncate">
                        {exp.title}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-sky-800">{exp.category}</span>
                        <span>•</span>
                        <span>{exp.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        exp.active
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {exp.status}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] transition" />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-['Open_Sans']">
                {isCN ? 'Semester V • Practical Examination standard' : 'Semester V • Full Stack Practical standard'}
              </span>
              <button
                onClick={() => setExperimentsModalOpen(false)}
                className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-lg transition cursor-pointer"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
