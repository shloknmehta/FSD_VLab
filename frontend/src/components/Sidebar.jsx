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

  return (
    <aside className="w-56 sm:w-64 shrink-0 bg-white border-r border-[#e8e8e8] min-h-[calc(100vh-140px)] py-4 px-4 sm:px-6 select-none flex flex-col justify-between">
      <div className="space-y-1">
        {/* Core Student Modules matching official Virtual Labs sidebar */}
        <nav className="nav-menu space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="d-flex nav-menu-body">
                <button
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.15rem] sm:text-[1.2rem] font-bold block ${
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
          <div className="pt-4 mt-3 border-t border-[#e8e8e8] space-y-1">
            <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 pb-1" style={{ fontFamily: "'Raleway', sans-serif" }}>
              Faculty Zone
            </div>
            {FACULTY_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.15rem] sm:text-[1.2rem] font-bold block ${
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
                  className={`w-full text-left py-1.5 transition-colors cursor-pointer text-[1.15rem] sm:text-[1.2rem] font-bold block ${
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
