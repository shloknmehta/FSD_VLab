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
  Network,
  Cpu,
  Layers,
  Server,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const NAV_ITEMS = [
  { id: 'experiments_list', label: 'List of experiments', icon: FlaskConical },
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

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  completedModules = [],
  currentSubject = 'FSD',
  onSelectSubject,
  cnExperiments = [],
  activeExperimentSlug,
  onSelectExperiment,
}) {
  const { isFaculty, isAdmin } = useAuth();

  if (!isOpen) return null;

  return (
    <aside className="w-full h-full overflow-y-auto py-4 px-3 sm:px-5 select-none flex flex-col justify-between">
      <div className="space-y-3">
        {/* Top Header Bar with Close Button (Visible on mobile & laptops) */}
        {onClose && (
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-200">
            <span className="text-sm font-bold text-[#2c99ce] tracking-tight" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Virtual <span className="text-[#689f38]">Labs</span> Menu
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
              aria-label="Close Navigation"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* If in Computer Networks, render Active Experiment Card */}
        {currentSubject === 'CN' && cnExperiments.length > 0 && (
          <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3 mb-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7] flex items-center gap-1.5" style={{ fontFamily: "'Raleway', sans-serif" }}>
                <Network className="w-3.5 h-3.5" />
                Active Experiment
              </span>
              <span className="text-[10px] text-sky-800 font-mono font-bold bg-sky-100 px-1.5 py-0.5 rounded">
                216U01L502
              </span>
            </div>

            {cnExperiments.length > 1 ? (
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {cnExperiments.map((exp) => {
                  const isSelected = activeExperimentSlug === exp.slug;
                  return (
                    <button
                      key={exp.slug}
                      onClick={() => {
                        if (onSelectExperiment) onSelectExperiment(exp.slug);
                        if (onSelectTab) onSelectTab('aim');
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : 'bg-white hover:bg-sky-100/60 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <div className="truncate">
                        <span className="font-bold mr-1">Exp {exp.number}:</span>
                        <span>{exp.shortTitle || exp.title}</span>
                      </div>
                      {isSelected && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onSelectExperiment) onSelectExperiment(cnExperiments[0].slug);
                  if (onSelectTab) onSelectTab('aim');
                }}
                className="w-full p-2.5 rounded-lg bg-white hover:bg-sky-50 border border-sky-200 text-xs font-bold text-slate-800 flex items-center justify-between shadow-2xs transition cursor-pointer text-left"
                title="Click to view Experiment Aim"
              >
                <div className="truncate">
                  <span className="text-[#0284c7] mr-1">Exp {cnExperiments[0].number}:</span>
                  <span>{cnExperiments[0].shortTitle || cnExperiments[0].title}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
              </button>
            )}
          </div>
        )}

        {/* Core Student Modules matching official Virtual Labs sidebar */}
        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-400 pb-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
          Laboratory Modules
        </div>
        <nav className="nav-menu space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="d-flex nav-menu-body">
                <button
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.1rem] sm:text-[1.15rem] font-bold block ${
                    isActive
                      ? 'text-[#ff6600]'
                      : 'text-[#3e6389] hover:text-[#ff6600]'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Faculty Portal (Visible to Faculty & Admin) */}
        {isFaculty && (
          <div className="pt-3 mt-3 border-t border-[#e8e8e8] space-y-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 pb-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Faculty Zone
            </div>
            {FACULTY_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.1rem] sm:text-[1.15rem] font-bold block ${
                    isActive
                      ? 'text-[#ff6600]'
                      : 'text-[#3e6389] hover:text-[#ff6600]'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Admin Portal (Visible to Admin only) */}
        {isAdmin && (
          <div className="pt-2 mt-2 border-t border-[#e8e8e8] space-y-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-purple-600 pb-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Admin Zone
            </div>
            {ADMIN_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.1rem] sm:text-[1.15rem] font-bold block ${
                    isActive
                      ? 'text-[#ff6600]'
                      : 'text-[#3e6389] hover:text-[#ff6600]'
                  }`}
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
