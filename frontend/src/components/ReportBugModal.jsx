import React, { useState } from 'react';
import { Bug, X, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function ReportBugModal({ isOpen, onClose, activeTab = 'Aim' }) {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState('MEDIUM');
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleIssue = (issue) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    const payload = {
      title,
      severity,
      section: activeTab,
      issues: selectedIssues,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-3 sm:p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-50 text-red-500">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="text-lg font-extrabold text-[#2c99ce]"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Bug Report
              </h3>
              <p className="text-xs text-slate-500">KJSSE Virtual Labs Feedback & Issue Dispatcher</p>
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
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-[#2c99ce] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Virtual Labs Issue Categories */}
            <div>
              <label
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Please select the Issues
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Insufficient Content',
                  'Page Not Loading',
                  'Content Not Visible',
                  'Incorrect Content',
                ].map((issue) => {
                  const isChecked = selectedIssues.includes(issue);
                  return (
                    <button
                      key={issue}
                      type="button"
                      onClick={() => toggleIssue(issue)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left font-medium transition cursor-pointer ${
                        isChecked
                          ? 'border-[#2c99ce] bg-sky-50/80 text-[#2c99ce] font-semibold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded text-[#2c99ce] focus:ring-[#2c99ce] pointer-events-none"
                      />
                      <span>{issue}</span>
                    </button>
                  );
                })}
              </div>
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
                className="v-button shadow-xs transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
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
