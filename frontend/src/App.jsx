import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import AimSection from './components/AimSection';
import Footer from './components/Footer';
import RateMeModal from './components/RateMeModal';
import ReportBugModal from './components/ReportBugModal';
import AuthModal from './components/AuthModal';
import {
  OverviewView,
  RecapView,
  PretestView,
  VisualizerView,
  SimulationView,
  CodeAssessmentView,
  AnalysisView,
  PosttestView,
  ReferencesView,
  FeedbackView,
  FacultyPortalView,
  AdminPortalView,
} from './components/ModuleViews';

function LabPlatform() {
  const { authModalOpen, closeAuthModal, authModalMode } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [activeTab, setActiveTab] = useState('aim');
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [completedModules, setCompletedModules] = useState(() => {
    try {
      const saved = localStorage.getItem('fsd_vlab_completed_modules');
      return saved ? JSON.parse(saved) : ['aim'];
    } catch {
      return ['aim'];
    }
  });

  const markModuleCompleted = (modId) => {
    setCompletedModules((prev) => {
      if (prev.includes(modId)) return prev;
      const updated = [...prev, modId];
      try {
        localStorage.setItem('fsd_vlab_completed_modules', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    markModuleCompleted(tabId);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'aim':
        return <AimSection onNavigateNext={() => handleSelectTab('overview')} />;
      case 'overview':
        return <OverviewView onNext={() => handleSelectTab('pretest')} />;
      case 'recap':
        return <RecapView onNext={() => handleSelectTab('pretest')} />;
      case 'pretest':
        return (
          <PretestView
            onNext={() => handleSelectTab('visualizer')}
            onQuizPassed={() => markModuleCompleted('pretest')}
          />
        );
      case 'visualizer':
        return <VisualizerView onNext={() => handleSelectTab('simulation')} />;
      case 'simulation':
        return <SimulationView onNext={() => handleSelectTab('code_assessment')} />;
      case 'code_assessment':
        return (
          <CodeAssessmentView
            onNext={() => handleSelectTab('analysis')}
            onChallengeSolved={() => markModuleCompleted('code_assessment')}
          />
        );
      case 'analysis':
        return <AnalysisView onNext={() => handleSelectTab('posttest')} />;
      case 'posttest':
        return (
          <PosttestView
            onNext={() => handleSelectTab('references')}
            onQuizPassed={() => markModuleCompleted('posttest')}
          />
        );
      case 'references':
        return <ReferencesView onNext={() => handleSelectTab('feedback')} />;
      case 'feedback':
        return (
          <FeedbackView
            onOpenRateModal={() => setRateModalOpen(true)}
            onFeedbackSubmitted={() => markModuleCompleted('feedback')}
          />
        );
      case 'faculty_portal':
        return <FacultyPortalView />;
      case 'admin_portal':
        return <AdminPortalView />;
      default:
        return <AimSection onNavigateNext={() => handleSelectTab('overview')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      {/* 1. Header with KJSSE Virtual Labs branding, Stars, Rate Me, Report a Bug & Demo Switcher */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenRateModal={() => setRateModalOpen(true)}
        onOpenBugModal={() => setBugModalOpen(true)}
        activeRating={userRating}
      />

      {/* 2. Breadcrumbs matching KJSSE / VLab styling */}
      <Breadcrumbs
        department="Computer Science and Engineering"
        course="Django Web Technologies / Full Stack Development"
        section="Experiments"
      />

      {/* 3. Main Workspace Area: Left Sidebar + Right Content */}
      <div className="flex-1 flex flex-col md:flex-row w-full bg-white relative">
        {/* Mobile Backdrop - anchored below header */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 top-[68px] bg-slate-900/40 z-30 transition-opacity"
          />
        )}

        {/* Sidebar: Normal document flow on desktop, slide drawer below header on mobile */}
        {sidebarOpen && (
          <div className="fixed md:static top-[68px] bottom-0 left-0 z-40 bg-white shadow-2xl md:shadow-none shrink-0 overflow-y-auto max-h-[calc(100vh-68px)] md:max-h-none">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              activeTab={activeTab}
              onSelectTab={(tabId) => {
                handleSelectTab(tabId);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
              completedModules={completedModules}
            />
          </div>
        )}

        <main className="flex-1 min-w-0 bg-white p-3 sm:p-6 md:p-8">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* 4. Institutional Footer */}
      <Footer />

      {/* 5. Interactive Modals */}
      <RateMeModal
        isOpen={rateModalOpen}
        onClose={() => setRateModalOpen(false)}
        currentRating={userRating}
        onRatingUpdated={(r) => setUserRating(r)}
      />

      <ReportBugModal
        isOpen={bugModalOpen}
        onClose={() => setBugModalOpen(false)}
        activeTab={activeTab}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        defaultMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LabPlatform />
    </AuthProvider>
  );
}
