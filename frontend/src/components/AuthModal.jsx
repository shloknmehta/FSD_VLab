import React, { useState, useEffect } from 'react';
import {
  X,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }) {
  const { login, register, authModalMode, setAuthModalMode } = useAuth();
  const [mode, setMode] = useState(defaultMode || authModalMode || 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRollOrId, setRegRollOrId] = useState('');
  const [regBatch, setRegBatch] = useState('D3');
  const [regDepartment, setRegDepartment] = useState('Computer Engineering');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Sync mode with context if changed
  useEffect(() => {
    if (authModalMode) setMode(authModalMode);
  }, [authModalMode]);

  // Reset notifications on tab change
  const handleSwitchTab = (newMode) => {
    setMode(newMode);
    if (setAuthModalMode) setAuthModalMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginUsername.trim() || !loginPassword) {
      setErrorMessage('Please enter both your username/email and password.');
      return;
    }

    setLoading(true);
    const res = await login({
      username: loginUsername.trim(),
      password: loginPassword,
    });
    setLoading(false);

    if (res.success) {
      setSuccessMessage(`Welcome, ${res.user.first_name || res.user.username}`);
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMessage(res.error || 'Invalid username or password.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regUsername.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await register({
      username: regUsername.trim(),
      email: regEmail.trim(),
      password: regPassword,
      confirm_password: regConfirmPassword,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      role: 'STUDENT',
      roll_or_faculty_id: regRollOrId.trim(),
      batch: regBatch.trim(),
      department: regDepartment.trim(),
    });
    setLoading(false);

    if (res.success) {
      setSuccessMessage('Registration complete. Redirecting...');
      setTimeout(() => {
        onClose();
      }, 700);
    } else {
      setErrorMessage(res.error || 'Registration failed. Please check your details.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative w-full max-w-[420px] bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden font-['Raleway',sans-serif] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Institutional Top Orange Accent */}
        <div className="h-1.5 bg-[#ff6600] w-full" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0">
              {/* Clean Minimal Beaker Emblem */}
              <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
                <path
                  d="M40 18H60V32L78 68C81 74 76.5 82 69 82H31C23.5 82 19 74 22 68L40 32V18Z"
                  stroke="#ff6600"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path d="M34 18H66" stroke="#ff6600" strokeWidth="7" strokeLinecap="round" />
                <path
                  d="M26 62C34 60 42 66 50 63C58 60 66 65 74 62L76 68C78 72 75 78 70 78H30C25 78 22 72 24 68L26 62Z"
                  fill="#ff6600"
                  fillOpacity="0.25"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                KJSSE Virtual Labs &bull; Somaiya Vidyavihar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-6 pt-3 pb-1">
          <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              className={`flex-1 py-1.5 rounded-md transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('register')}
              className={`flex-1 py-1.5 rounded-md transition cursor-pointer ${
                mode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-4 overflow-y-auto space-y-4">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <div>{successMessage}</div>
            </div>
          )}

          {/* ===================== LOGIN FORM ===================== */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Username or Institutional Email
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. student or student@vlab.edu"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-3 pr-9 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#ff6600] hover:bg-[#e65c00] text-white font-semibold text-sm rounded-lg shadow-xs transition cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            /* ===================== REGISTER FORM ===================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Names */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>

              {/* Username & Email */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@somaiya.edu"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>

              {/* Roll Number & Batch */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Roll Number / Student ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regRollOrId}
                    onChange={(e) => setRegRollOrId(e.target.value)}
                    placeholder="e.g. 16010124169"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    value={regBatch}
                    onChange={(e) => setRegBatch(e.target.value)}
                    placeholder="e.g. D3"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#ff6600] hover:bg-[#e65c00] text-white font-semibold text-sm rounded-lg shadow-xs transition cursor-pointer disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <span>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchTab('register')}
                className="text-[#ff6600] font-semibold hover:underline cursor-pointer"
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleSwitchTab('login')}
                className="text-[#ff6600] font-semibold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
