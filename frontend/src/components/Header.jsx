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
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    <header className="bg-white sticky top-0 z-50 border-b-[8px] border-[#ff6600] font-['Raleway',sans-serif] shadow-xs select-none">
      {/* Main Bar */}
      <div className="w-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Hamburger & Virtual Labs Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            title={sidebarOpen ? 'Collapse Navigation Menu' : 'Open Navigation Menu'}
            aria-label="Toggle Navigation Menu"
            aria-expanded={sidebarOpen}
            className="p-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official Virtual Labs Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
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
              <circle cx="48" cy="52" r="11" stroke="#2c99ce" strokeWidth="4" />
              <path d="M48 37V41M48 63V67M33 52H37M59 52H63" stroke="#2c99ce" strokeWidth="4" strokeLinecap="round" />
              <path d="M37.5 41.5L40.5 44.5M55.5 59.5L58.5 62.5M37.5 62.5L40.5 59.5M55.5 44.5L58.5 41.5" stroke="#2c99ce" strokeWidth="3" strokeLinecap="round" />
              <circle cx="63" cy="42" r="6" stroke="#2c99ce" strokeWidth="2.5" />
            </svg>

            {/* Typography */}
            <div className="flex flex-col justify-center leading-none">
              <div className="flex items-baseline font-bold tracking-tight">
                <span className="text-[25px] text-[#2c99ce] font-['Raleway']">Virtual</span>
                <span className="text-[25px] text-[#689f38] ml-1 font-['Raleway']">Labs</span>
              </div>
              <span className="text-[9.5px] font-medium text-slate-500 tracking-wide">
                An MoE Govt of India Initiative
              </span>
            </div>
          </div>

          {/* Institutional Divider & Official Somaiya Logos */}
          <div className="hidden lg:block h-8 w-[1px] bg-slate-200" />
          <div className="hidden lg:flex items-center gap-3">
            <img
              src="/assets/logos/kjsce-formerly.svg"
              alt="K. J. Somaiya School of Engineering"
              className="h-8 w-auto object-contain opacity-90"
              title="K. J. Somaiya School of Engineering"
            />
          </div>
        </div>

        {/* Right Side: Ratings, Buttons, User Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Interactive Stars - Matches screenshot yellow rating */}
          <div className="flex items-center gap-0.5" title="Rate this experiment">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = (hoverRating || activeRating || 3) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={onOpenRateModal}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-colors focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      isFilled
                        ? 'fill-[#ffc107] text-[#ffc107]'
                        : 'text-[#ffc107] stroke-[1.5]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Rate Me Button - Matches exact v-button style in screenshot */}
          <button
            onClick={onOpenRateModal}
            title="Rate this experiment"
            className="v-button shadow-none text-white text-[1.05rem]"
          >
            Rate Me
          </button>

          {/* Report a Bug Button - Matches exact v-button style in screenshot */}
          <button
            onClick={onOpenBugModal}
            title="Report a Bug"
            className="v-button shadow-none text-white text-[1.05rem]"
          >
            Report a Bug
          </button>

          {/* Unauthenticated: Sign In & Register Buttons */}
          {!currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={openLogin}
                title="Sign in to your account"
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-[#ff6600] hover:bg-[#e65c00] text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                onClick={openRegister}
                title="Create a new student account"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-slate-500" />
                <span>Register</span>
              </button>
            </div>
          ) : (
            /* Authenticated User Menu */
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser?.first_name?.charAt(0) || currentUser?.name?.charAt(0) || currentUser?.username?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {currentUser?.name || `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() || currentUser?.username}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getRoleBadgeStyle(
                    role
                  )}`}
                >
                  {role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95">
                  {/* User Info */}
                  <div className="px-3.5 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser?.name || `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() || currentUser?.username}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {currentUser?.email || `${currentUser?.username}@somaiya.edu`}
                    </p>
                    {(currentUser?.roll_or_faculty_id || currentUser?.rollNo) && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        {role === 'STUDENT' ? 'Roll No: ' : 'ID: '}
                        <span className="font-semibold text-slate-700">
                          {currentUser?.roll_or_faculty_id || currentUser?.rollNo}
                        </span>
                        {currentUser?.batch && (
                          <span className="text-slate-400 ml-1">({currentUser.batch})</span>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer transition"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
