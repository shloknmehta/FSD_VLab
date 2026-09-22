import React from 'react';
import {
  FlaskConical,
  ArrowRight,
  Sparkles,
  BookOpen,
  Network,
  Code2,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function ExperimentsListView({
  currentSubject = 'FSD',
  onSelectExperiment,
  cnExperiments = [],
}) {
  const isCN = currentSubject === 'CN';

  // Computer Networks Syllabus Experiments (SVU 2023 Detailed Syllabus)
  const cnExperimentsList = [
    {
      num: 1,
      slug: 'cn-vlan-switching',
      title: 'Virtual LANs (VLANs) & IEEE 802.1Q Trunking on Switches',
      category: 'Switching & IEEE 802.1Q',
      status: 'Active Premier Lab',
      active: true,
      duration: '45 Mins',
      desc: 'Configure Cisco Catalyst 24-port switch access ports into VLANs, set up 802.1Q inter-switch trunk links, test broadcast domain isolation, and analyze cross-VLAN ping behaviors.',
    },
    {
      num: 2,
      slug: 'cn-network-diagnostics',
      title: 'Network Diagnostics CLI Tools (ping, traceroute, netstat, arp, nslookup)',
      category: 'Network Diagnostics & CLI',
      status: 'Upcoming Lab',
      active: false,
      duration: '30 Mins',
      desc: 'Troubleshoot network connectivity, inspect DNS resolution, trace IP route hops, view active TCP/UDP sockets, and inspect local ARP tables using native command-line utilities.',
    },
    {
      num: 3,
      slug: 'cn-hamming-code',
      title: 'Error Detection & Correction using Hamming Code (7,4)',
      category: 'Data Link Layer & Error Control',
      status: 'Upcoming Lab',
      active: false,
      duration: '45 Mins',
      desc: 'Simulate bit-level error detection and 1-bit auto-correction by generating parity bits for a 4-bit dataword and evaluating syndrome positions.',
    },
    {
      num: 4,
      slug: 'cn-ip-subnetting',
      title: 'IPv4 Subnetting, Variable Length Subnet Masking (VLSM) & CIDR',
      category: 'Network Layer & Addressing',
      status: 'Upcoming Lab',
      active: false,
      duration: '45 Mins',
      desc: 'Calculate usable host ranges, network addresses, and broadcast addresses across variable-sized department subnets using CIDR prefixes.',
    },
    {
      num: 5,
      slug: 'cn-stop-wait-arq',
      title: 'Stop-and-Wait ARQ Flow Control & Channel Timeout Simulation',
      category: 'Transport & Flow Control',
      status: 'Upcoming Lab',
      active: false,
      duration: '40 Mins',
      desc: 'Observe positive acknowledgment, sequence numbers, timer timeouts, and frame retransmissions across noisy transmission channels.',
    },
    {
      num: 6,
      slug: 'cn-static-routing',
      title: 'Cisco IOS Static Routing & Next-Hop Packet Forwarding',
      category: 'Routing Protocols',
      status: 'Upcoming Lab',
      active: false,
      duration: '50 Mins',
      desc: 'Configure static route entries (`ip route`) on Cisco routers to enable multi-hop IP packet traversal between disconnected subnets.',
    },
  ];

  // Full Stack Development Syllabus Experiments
  const fsdExperimentsList = [
    {
      num: 1,
      slug: 'fsd-react-components',
      title: 'Frontend Component State & Virtual DOM Lifecycle in React',
      category: 'Frontend Engineering',
      status: 'Lab 1 Reference',
      active: false,
      duration: '45 Mins',
      desc: 'Implement interactive React components, managing state hooks (`useState`, `useEffect`), and inspecting Virtual DOM rendering performance.',
    },
    {
      num: 2,
      slug: 'fsd-rest-drf',
      title: 'RESTful API Engineering & Serializers with Django REST Framework',
      category: 'Web Services & APIs',
      status: 'Lab 2 Reference',
      active: false,
      duration: '50 Mins',
      desc: 'Build JSON API endpoints using DRF `ModelSerializer`, implementing CRUD operations, viewsets, and HTTP status codes.',
    },
    {
      num: 3,
      slug: 'fsd-jwt-auth',
      title: 'Token Authentication, RBAC Permissions & Security Headers',
      category: 'Security & Access Control',
      status: 'Lab 3 Reference',
      active: false,
      duration: '40 Mins',
      desc: 'Implement JWT (JSON Web Token) authentication flows with access/refresh tokens and role-based permissions in Django.',
    },
    {
      num: 4,
      slug: 'fsd-mvt-architecture',
      title: 'Django Model-View-Template (MVT) Architecture & Routing',
      category: 'Backend Architecture',
      status: 'Lab 4 Reference',
      active: false,
      duration: '40 Mins',
      desc: 'Structure robust full-stack Django projects using the MVT pattern, URL dispatching, and dynamic context templates.',
    },
    {
      num: 5,
      slug: 'fsd-orm-migrations',
      title: 'Relational Database Schema Modeling, ORM & Migrations',
      category: 'Database Systems',
      status: 'Lab 5 Reference',
      active: false,
      duration: '45 Mins',
      desc: 'Define Django database models with foreign keys, execute schema migrations, and query data using Django ORM QuerySets.',
    },
    {
      num: 6,
      slug: 'django-form-validation',
      title: 'Django Custom Form Validation using clean() & clean_<field>()',
      category: 'Backend Architecture & Forms',
      status: 'Active Premier Lab',
      active: true,
      duration: '45 Mins',
      desc: 'Deep-dive into Django Form submission lifecycle, field cleaning, multi-field cross-validation in clean(), ValidationError raising, and CSRF token defense.',
    },
  ];

  const experiments = isCN ? cnExperimentsList : fsdExperimentsList;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-emerald-50 p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                {isCN ? 'Course Code: 216U01L502' : 'Course Code: SVU-FSD-01'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Semester V • Practical Examination Curriculum
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Raleway'] tracking-tight">
              List of Experiments
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {isCN
                ? 'Computer Networks Laboratory • Department of Computer Engineering'
                : 'Full Stack Development Laboratory • Department of Computer Engineering'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-sm shrink-0">
            <FlaskConical className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2. Experiments Table / Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          <span>Curriculum Experiments ({experiments.length})</span>
          <span>Click any experiment to open</span>
        </div>

        <div className="space-y-3">
          {experiments.map((exp) => (
            <div
              key={exp.num}
              onClick={() => {
                if (onSelectExperiment) onSelectExperiment(exp.slug);
              }}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group ${
                exp.active
                  ? 'border-sky-400 bg-sky-50/40 hover:bg-sky-50 shadow-xs'
                  : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${
                    exp.active
                      ? 'bg-[#0284c7] text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {exp.num}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0284c7] transition font-['Raleway']">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">
                    {exp.desc}
                  </p>
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-medium pt-0.5">
                    <span className="font-semibold text-sky-800">{exp.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {exp.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    exp.active
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {exp.status}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#0284c7]">
                  <span>{exp.active ? 'Start Experiment' : 'View Syllabus'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

