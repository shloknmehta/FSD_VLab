import React, { useState } from 'react';
import { Star, X, CheckCircle2 } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function RateMeModal({ isOpen, onClose, currentRating = 0, onRatingUpdated }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(currentRating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('General');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const payload = {
      userId: currentUser?.id,
      userName: currentUser?.name,
      rating,
      category,
      comments: feedback,
      submittedAt: new Date().toISOString(),
    };

    try {
      await api.post('/portal/feedback/', payload);
    } catch (err) {
      console.warn('Feedback API call failed (offline/demo mode). Storing locally:', err.message);
      // Fallback: save to local storage for demo
      const existing = JSON.parse(localStorage.getItem('vlab_ratings_queue') || '[]');
      existing.push(payload);
      localStorage.setItem('vlab_ratings_queue', JSON.stringify(existing));
    } finally {
      setSubmitting(false);
      setSuccess(true);
      if (onRatingUpdated) onRatingUpdated(rating);
      setTimeout(() => {
        setSuccess(false);
        setFeedback('');
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-4 transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-500">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <h3
              className="text-lg font-extrabold text-[#2c99ce]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Rate this Experiment
            </h3>
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
            <h4 className="text-xl font-bold text-slate-800">Thank You!</h4>
            <p className="text-sm text-slate-600">Your feedback helps improve KJSSE Virtual Labs.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Star selector */}
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                How would you rate this experiment?
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                            : 'text-slate-300 hover:text-amber-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-xs text-slate-600 font-medium">
                {rating === 5 && '⭐️ Excellent Experience'}
                {rating === 4 && '👍 Very Good'}
                {rating === 3 && '👌 Good / Average'}
                {rating === 2 && '👎 Needs Improvement'}
                {rating === 1 && '⚠️ Poor / Found Issues'}
              </span>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Area of Feedback
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition"
              >
                <option value="General">General Platform Usability</option>
                <option value="Aim & Theory">Aim, Theory & Learning Materials</option>
                <option value="Simulation">Interactive Simulation & Playground</option>
                <option value="Assessment">Pretest / Posttest / Code Assessment</option>
                <option value="Visualizer">Step-by-Step Visualizer</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Detailed Comments (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or what you liked most..."
                rows={3}
                className="w-full text-sm border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="v-button shadow-xs transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Rating'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
