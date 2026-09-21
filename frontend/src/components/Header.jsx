import React, { useState } from 'react';
import {
  Menu,
  Star,
  ChevronDown,
  UserCheck,
  ShieldAlert,
  GraduationCap,
  Bug,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';

export default function Header({
  sidebarOpen = true,
  onToggleSidebar,
  onOpenRateModal,
  onOpenBugModal,
  activeRating = 0,
}) {
  const {
    currentUser,
    role,
    isRealAuth,
    openLogin,
    openRegister,
    logout,
    switchDemoRole,
  } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const getRoleBadgeStyle = (r) => {
    switch (r) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'FACULTY':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'STUDENT':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getRoleIcon = (r) => {
    switch (r) {
      case 'ADMIN':
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'FACULTY':
        return <UserCheck className="w-3.5 h-3.5" />;
      case 'STUDENT':
      default:
        return <GraduationCap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header className="bg-white sticky top-0 z-40 border-b-[8px] border-[#ff6600] font-['Raleway',sans-serif] shadow-xs select-none">
      {/* Main Bar */}
      <div className="w-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Hamburger & Virtual Labs Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            title={sidebarOpen ? 'Collapse Navigation Menu' : 'Open Navigation Menu'}
            aria-label="Toggle Navigation Menu"
            aria-expanded={sidebarOpen}
            className={`p-2 -ml-2 rounded-lg transition-colors cursor-pointer ${
              sidebarOpen
                ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                : 'text-[#ff6600] bg-orange-50 hover:bg-orange-100'
            }`}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Official KJSSE Virtual Labs Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            {/* SVG Beaker + Gear Emblem */}
            <svg
              className="w-10 h-10 shrink-0"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Beaker Body (Green) */}
              <path
                d="M40 18H60V32L78 68C81 74 76.5 82 69 82H31C23.5 82 19 74 22 68L40 32V18Z"
                stroke="#689f38"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M36 18H64"
                stroke="#689f38"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Liquid Level */}
              <path
                d="M26 62C34 60 42 66 50 63C58 60 66 65 74 62L76 68C78 72 75 78 70 78H30C25 78 22 72 24 68L26 62Z"
                fill="#81c784"
                fillOpacity="0.4"
              />
              {/* Cyan Cog / Gears in Beaker */}
              <circle cx="48" cy="52" r="11" stroke="#00acc1" strokeWidth="4" />
              <path d="M48 37V41M48 63V67M33 52H37M59 52H63" stroke="#00acc1" strokeWidth="4" strokeLinecap="round" />
              <path d="M37.5 41.5L40.5 44.5M55.5 59.5L58.5 62.5M37.5 62.5L40.5 59.5M55.5 44.5L58.5 41.5" stroke="#00acc1" strokeWidth="3" strokeLinecap="round" />
              <circle cx="63" cy="42" r="6" stroke="#0284c7" strokeWidth="2.5" />
            </svg>

            {/* Typography */}
            <div className="flex flex-col justify-center leading-tight">
              <div className="flex items-baseline font-bold tracking-tight">
                <span className="text-[22px] text-[#0284c7]">Virtual</span>
                <span className="text-[22px] text-[#689f38] ml-1">Labs</span>
              </div>
              <span className="text-[9.5px] font-medium text-slate-500 tracking-wide uppercase">
                An MoE Govt of India Initiative
              </span>
            </div>
          </div>

          {/* Institutional Divider & Official Somaiya Logos (KJSSE & Somaiya Trust) */}
          <div className="hidden sm:block h-8 w-[1px] bg-slate-200" />
          <div className="hidden sm:flex items-center gap-3">
            {/* KJSSE (K. J. Somaiya School of Engineering) Logo */}
            <img
              src="/assets/logos/kjsce-formerly.svg"
              alt="K. J. Somaiya School of Engineering - Somaiya Vidyavihar University"
              className="h-8 md:h-9 w-auto object-contain hover:opacity-95 transition-opacity"
              title="K. J. Somaiya School of Engineering (KJSSE)"
            />

            <div className="hidden md:block h-7 w-[1px] bg-slate-200" />

            {/* Somaiya Trust Logo */}
            <img
              src="/assets/logos/somaiya_trust.png"
              alt="The Somaiya Trust"
              className="hidden md:block h-8 w-auto object-contain rounded-xs hover:opacity-95 transition-opacity"
              title="The Somaiya Trust"
            />
          </div>
        </div>

        {/* Right Side: Ratings, Buttons, Persona Badge */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Interactive Stars */}
          <div className="hidden md:flex items-center gap-1" title="Rate this experiment">
            {[1, 2, 3, 4, 5].map((star) => {
              const isSelected = (hoverRating || activeRating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={onOpenRateModal}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 text-slate-300 hover:text-amber-400 transition-colors focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 transition-transform hover:scale-110 ${
                      isSelected
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-amber-400/60 stroke-[1.75]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Rate Me Button */}
          <button
            onClick={onOpenRateModal}
            title="Rate this experiment"
            className="v-button shadow-xs transition-transform hover:scale-[1.02]"
          >
            <Star className="w-3.5 h-3.5 fill-white/90" />
            <span className="hidden sm:inline">Rate Me</span>
          </button>

          {/* Report a Bug Button */}
          <button
            onClick={onOpenBugModal}
            title="Report a Bug"
            className="v-button shadow-xs transition-transform hover:scale-[1.02]"
          >
            <Bug className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report a Bug</span>
          </button>

          {/* Sign In button for direct access */}
          <button
            onClick={openLogin}
            title="Sign in with your credentials"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-sky-50 text-[#0284c7] hover:bg-sky-100 font-bold text-xs border border-sky-200 transition cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign In</span>
          </button>

          {/* Active User Persona Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 pr-2 sm:pr-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.first_name?.charAt(0) || currentUser?.name?.charAt(0) || currentUser?.username?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight">
                <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                  {currentUser?.name || `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() || currentUser?.username}
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  {role}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getRoleBadgeStyle(
                  role
                )}`}
              >
                {role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </button>

            {/* Dropdown Menu for quick role switching and account management */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                {/* Active User Profile Header */}
                <div className="px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Active User Profile
                    </span>
                    {isRealAuth ? (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Live Token
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        <KeyRound className="w-2.5 h-2.5" /> Demo Session
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-slate-800 text-sm leading-tight">
                    {currentUser?.name || `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() || currentUser?.username}
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5 truncate">
                    {currentUser?.email || `${currentUser?.username}@vlab.edu`}
                  </div>
                  {(currentUser?.roll_or_faculty_id || currentUser?.rollNo) && (
                    <div className="text-[11px] text-slate-600 mt-1 font-medium flex items-center gap-1.5">
                      <span className="text-slate-400">ID / Roll:</span>
                      <span className="font-semibold text-slate-700">
                        {currentUser?.roll_or_faculty_id || currentUser?.rollNo}
                      </span>
                      {currentUser?.batch && (
                        <span className="text-slate-400">({currentUser.batch})</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Account Actions: Sign In, Register, Sign Out */}
                <div className="px-2 py-1.5 border-b border-slate-100 space-y-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openLogin();
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-sky-50 hover:text-[#0284c7] rounded-lg transition flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Sign In to Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openRegister();
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#689f38] rounded-lg transition flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#689f38]" />
                    <span>Create New Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Sign Out / Reset</span>
                  </button>
                </div>

                {/* Quick Persona Switch for testing */}
                <div className="px-3 pt-2 pb-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quick Persona Switch (RBAC Demo)
                  </div>
                </div>

                <div className="py-0.5">
                  {Object.entries(DEMO_USERS).map(([key, user]) => {
                    const isActive = role === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          switchDemoRole(key);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                          isActive ? 'bg-sky-50 font-semibold text-sky-900' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1 rounded-md ${
                              isActive ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {getRoleIcon(key)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800 text-[11.5px]">{user.name}</div>
                            <div className="text-[10px] text-slate-400">
                              {key === 'STUDENT' ? `Roll: ${user.roll_or_faculty_id}` : user.department}
                            </div>
                          </div>
                        </div>
                        <span
                          className={`text-[8.5px] font-bold px-1.5 py-0.5 rounded border uppercase ${getRoleBadgeStyle(
                            key
                          )}`}
                        >
                          {key}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="px-3 pt-2 mt-1 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>KJSSE Lab Standard</span>
                  <span className="font-mono">FSD-VLab</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </header>
  );
}
