import React, { useState } from 'react';
import { Bug, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ReportBugModal({ isOpen, onClose, activeTab = 'Aim' }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    const payload = {
      title,
      severity,
      section: activeTab,
      description,
      stepsToReproduce,
      reporterId: currentUser?.id,
      reporterName: currentUser?.name,
      reporterRole: currentUser?.role,
      submittedAt: new Date().toISOString(),
    };

    try {
      await api.post('/portal/bug-report/', payload);
    } catch (err) {
      console.warn('Bug report API offline. Saving to demo localStorage:', err.message);
      const bugs = JSON.parse(localStorage.getItem('vlab_bug_reports') || '[]');
      bugs.push({ ...payload, id: `BUG-${Date.now()}` });
      localStorage.setItem('vlab_bug_reports', JSON.stringify(bugs));
    } finally {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTitle('');
        setDescription('');
        setStepsToReproduce('');
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-50 text-red-500">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Report a Bug / Issue</h3>
              <p className="text-xs text-slate-500">Help the lab administrators fix glitches and errors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-800">Bug Report Logged!</h4>
            <p className="text-sm text-slate-600">
              Thank you, {currentUser?.name}. Our technical team will review and resolve this issue promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Bug Summary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Code editor resets when switching steps"
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Severity & Module */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Severity Level
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition"
                >
                  <option value="LOW">Low (Cosmetic/Typo)</option>
                  <option value="MEDIUM">Medium (Minor Glitch)</option>
                  <option value="HIGH">High (Feature Not Working)</option>
                  <option value="CRITICAL">Critical (System Crash/Blocker)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Active Section
                </label>
                <div className="text-sm border border-slate-200 bg-slate-50 text-slate-700 rounded-lg px-3 py-2 font-medium">
                  {activeTab}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened and what you expected instead..."
                rows={3}
                className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Steps to Reproduce */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Steps to Reproduce
              </label>
              <textarea
                value={stepsToReproduce}
                onChange={(e) => setStepsToReproduce(e.target.value)}
                placeholder="1. Click on Simulation&#10;2. Press Run without inputs&#10;3. Observe unexpected error"
                rows={2}
                className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Reporter Info pill */}
            <div className="text-xs bg-slate-50 border border-slate-200 rounded-md p-2 text-slate-600 flex items-center justify-between">
              <span>
                Reporting as: <strong>{currentUser?.name}</strong> ({currentUser?.role})
              </span>
              <span className="text-slate-400">ID: {currentUser?.id}</span>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-lg shadow-sm transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Bug Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
