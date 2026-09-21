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
  CheckCircle2,
  X,
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

export default function Sidebar({ isOpen, onClose, activeTab, onSelectTab, completedModules = [] }) {
  const { isFaculty, isAdmin } = useAuth();

  if (!isOpen) return null;

  const completedCount = NAV_ITEMS.filter((item) => completedModules.includes(item.id)).length;
  const progressPercent = Math.round((completedCount / NAV_ITEMS.length) * 100);

  return (
    <aside className="w-64 sm:w-72 shrink-0 bg-white border-r border-[#e8e8e8] min-h-[calc(100vh-80px)] p-4 select-none flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header & Lab Completion Progress */}
        <div className="px-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-slate-400" style={{ fontFamily: "'Raleway', sans-serif" }}>
            <span>Experiment Modules</span>
            <div className="flex items-center gap-2">
              <span className="text-[#2c99ce] font-mono">{completedCount}/{NAV_ITEMS.length}</span>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1 rounded transition-colors cursor-pointer"
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Core Student Modules */}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            const isCompleted = completedModules.includes(item.id);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[14.5px] transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'font-bold text-[#ff6600] bg-orange-50/70 border-l-[3px] border-[#ff6600] shadow-xs'
                    : 'font-bold text-[#3e6389] hover:text-[#ff6600] hover:bg-slate-50'
                }`}
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-[#ff6600]'
                        : 'text-[#3e6389]/70 group-hover:text-[#ff6600]'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {isCompleted && (
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-emerald-500"
                      title="Module completed"
                    />
                  )}
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </div>
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

    </aside>
  );
}
