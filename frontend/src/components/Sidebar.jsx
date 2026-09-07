import React from 'react';
import {
  Target,
  BookOpen,
  RotateCcw,
  HelpCircle,
  PlaySquare,
  FlaskConical,
  Code2,
  BarChart2,
  Award,
  BookMarked,
  MessageSquareHeart,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NAV_ITEMS = [
  { id: 'aim', label: 'Aim', icon: Target },
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'recap', label: 'Recap', icon: RotateCcw },
  { id: 'pretest', label: 'Pretest', icon: HelpCircle },
  { id: 'visualizer', label: 'Step-by-Step Visualizer', icon: PlaySquare },
  { id: 'simulation', label: 'Simulation / Lab Playground', icon: FlaskConical },
  { id: 'code_assessment', label: 'Code Assessment', icon: Code2 },
  { id: 'analysis', label: 'Analysis', icon: BarChart2 },
  { id: 'posttest', label: 'Posttest', icon: Award },
  { id: 'references', label: 'Further Readings/References', icon: BookMarked },
  { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart },
];

export const FACULTY_ITEMS = [
  { id: 'faculty_portal', label: 'Faculty Portal', icon: GraduationCap, requires: 'FACULTY' },
];

export const ADMIN_ITEMS = [
  { id: 'admin_portal', label: 'Admin Portal', icon: ShieldCheck, requires: 'ADMIN' },
];

export default function Sidebar({ isOpen, activeTab, onSelectTab }) {
  const { isFaculty, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
    <aside className="w-64 sm:w-72 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-80px)] p-4 select-none flex flex-col justify-between">
      <div className="space-y-1">
        <div className="px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-slate-400">
          Experiment Modules
        </div>

        {/* Core Student Modules */}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[14.5px] transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'font-bold text-[#e65100] bg-orange-50/70 shadow-xs'
                    : 'font-semibold text-[#2c5282] hover:text-[#e65100] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-[#e65100]'
                        : 'text-[#2c5282]/70 group-hover:text-[#e65100]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 tracking-wide">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Faculty Portal (Visible to Faculty & Admin) */}
        {isFaculty && (
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
            <div className="px-3 pb-1 text-[11px] font-bold tracking-wider uppercase text-emerald-600 flex items-center justify-between">
              <span>Faculty Zone</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded">RBAC</span>
            </div>
            {FACULTY_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[14.5px] transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'font-bold text-[#e65100] bg-orange-50/70'
                      : 'font-semibold text-emerald-800 hover:text-[#e65100] hover:bg-emerald-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-600" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>
        )}

        {/* Admin Portal (Visible to Admin only) */}
        {isAdmin && (
          <div className="pt-2 mt-2 space-y-1">
            <div className="px-3 pb-1 text-[11px] font-bold tracking-wider uppercase text-purple-600 flex items-center justify-between">
              <span>Admin Zone</span>
              <span className="text-[9px] bg-purple-100 text-purple-800 px-1 rounded">ROOT</span>
            </div>
            {ADMIN_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[14.5px] transition-all flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'font-bold text-[#e65100] bg-orange-50/70'
                      : 'font-semibold text-purple-800 hover:text-[#e65100] hover:bg-purple-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-purple-600" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info in Sidebar */}
      <div className="pt-6 border-t border-slate-100 px-3 text-xs text-slate-400">
        <p className="font-semibold text-slate-600">FSD Virtual Lab v1.0</p>
        <p className="text-[11px] mt-0.5 text-slate-500">
          KJSSE &bull; KJ Somaiya School of Engineering
        </p>
      </div>
    </aside>
  );
}
