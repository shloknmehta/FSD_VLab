import React, { useState, useEffect } from 'react';
import { Bug } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import AimSection from './components/AimSection';
import Footer from './components/Footer';
import RateMeModal from './components/RateMeModal';
import ReportBugModal from './components/ReportBugModal';
import AuthModal from './components/AuthModal';
import { CN_EXPERIMENTS } from './data/cnExperimentsData';
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
import {
  CNOverviewView,
  CNRecapView,
  CNPretestView,
  CNVisualizerView,
  CNSimulationView,
  CNCodeAssessmentView,
  CNAnalysisView,
  CNPosttestView,
  CNReferencesView,
} from './components/cn/CNModuleViews';
import BroadAreaView from './views/BroadAreaView';
import ExperimentsListView from './views/ExperimentsListView';

function LabPlatform() {
  const { authModalOpen, closeAuthModal, authModalMode } = useAuth();
  // Default to Broad Area Home Page with full-width layout (sidebar collapsed)
  const [activeTab, setActiveTab] = useState('broad_area');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);

  // Multi-Subject State: 'FSD' or 'CN'
  const [currentSubject, setCurrentSubject] = useState(() => {
    try {
      return localStorage.getItem('vlab_current_subject') || 'FSD';
    } catch {
      return 'FSD';
    }
  });

  // Active Computer Networks Experiment Slug
  const [activeCnSlug, setActiveCnSlug] = useState('cn-vlan-switching');

  const currentCnExp = CN_EXPERIMENTS.find((e) => e.slug === activeCnSlug) || CN_EXPERIMENTS[0];

  // Close slide-over menu drawer on Escape key (convenient on laptops and desktops)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleSubjectChange = (subject) => {
    setCurrentSubject(subject);
    setActiveTab('aim');
    setSidebarOpen(false);
    try {
      localStorage.setItem('vlab_current_subject', subject);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartLab = (subject) => {
    handleSubjectChange(subject);
  };

  const handleNavigateToBroadArea = () => {
    setActiveTab('broad_area');
    setSidebarOpen(false);
  };

  const handleSelectCnExperiment = (slug) => {
    setActiveCnSlug(slug);
    setActiveTab('aim');
    setSidebarOpen(false);
  };

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
    // 0. Global Broad Area & Experiments List Views
    if (activeTab === 'broad_area') {
      return (
        <BroadAreaView
          onSelectSubject={(subj) => {
            handleSubjectChange(subj);
            setActiveTab('aim');
          }}
          onStartLab={(subj) => {
            handleSubjectChange(subj);
            setActiveTab('aim');
          }}
        />
      );
    }

    if (activeTab === 'experiments_list') {
      return (
        <ExperimentsListView
          currentSubject={currentSubject}
          onSelectExperiment={(slug) => {
            if (currentSubject === 'CN') {
              handleSelectCnExperiment(slug);
            }
            setActiveTab('aim');
          }}
          cnExperiments={CN_EXPERIMENTS}
        />
      );
    }

    // 1. If in Computer Networks (CN) Subject
    if (currentSubject === 'CN') {
      switch (activeTab) {
        case 'aim':
          return (
            <AimSection
              experiment={currentCnExp}
              onNavigateNext={() => handleSelectTab('overview')}
            />
          );
        case 'overview':
          return (
            <CNOverviewView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('recap')}
            />
          );
        case 'recap':
          return (
            <CNRecapView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('pretest')}
            />
          );
        case 'pretest':
          return (
            <CNPretestView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('visualizer')}
              onQuizPassed={() => markModuleCompleted('pretest')}
            />
          );
        case 'visualizer':
          return (
            <CNVisualizerView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('simulation')}
            />
          );
        case 'simulation':
          return (
            <CNSimulationView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('code_assessment')}
            />
          );
        case 'code_assessment':
          return (
            <CNCodeAssessmentView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('analysis')}
              onChallengeSolved={() => markModuleCompleted('code_assessment')}
            />
          );
        case 'analysis':
          return (
            <CNAnalysisView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('posttest')}
            />
          );
        case 'posttest':
          return (
            <CNPosttestView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('references')}
              onQuizPassed={() => markModuleCompleted('posttest')}
            />
          );
        case 'references':
          return (
            <CNReferencesView
              experiment={currentCnExp}
              onNext={() => handleSelectTab('feedback')}
            />
          );
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
          return (
            <AimSection
              experiment={currentCnExp}
              onNavigateNext={() => handleSelectTab('overview')}
            />
          );
      }
    }

    // 2. Default: Full Stack Development (FSD) Subject
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

  const courseTitle = currentSubject === 'CN' ? 'Computer Networks (216U01L502)' : 'Full Stack Development';
  const currentExpTitle = currentSubject === 'CN' ? currentCnExp.title : 'Experiment 6: Custom Form Validation';

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      {/* 1. Header with KJSSE Virtual Labs branding, Stars, Rate Me, Report a Bug & Subject Switcher */}
      {/* 1. Header with KJSSE Virtual Labs branding, Stars, Rate Me, Report a Bug */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        onOpenRateModal={() => setRateModalOpen(true)}
        onOpenBugModal={() => setBugModalOpen(true)}
        activeRating={userRating}
        currentSubject={currentSubject}
        onSelectSubject={handleSubjectChange}
        onNavigateHome={handleNavigateToBroadArea}
      />

      {/* 2. Breadcrumbs matching KJSSE / VLab styling */}
      <Breadcrumbs
        department="Computer Science and Engineering"
        course={courseTitle}
        section="Experiments"
        experimentTitle={currentExpTitle}
        activeTab={activeTab}
        onNavigateToBroadArea={handleNavigateToBroadArea}
        onNavigateToCourseHome={() => {
          setActiveTab('aim');
          setSidebarOpen(false);
        }}
        onNavigateToExperimentsList={() => {
          setActiveTab('experiments_list');
          setSidebarOpen(false);
        }}
        onNavigateToExperimentAim={() => {
          setActiveTab('aim');
          setSidebarOpen(false);
        }}
      />

      {/* 3. Main Workspace Area: Left Sidebar Drawer + Content */}
      <div className="flex-1 flex flex-col w-full bg-white relative">
        {/* Backdrop for Slide-over Drawer (Visible on all devices: laptops, desktops, tablets, mobile) */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-50 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-hidden="true"
          />
        )}

        {/* Universal Slide-over Drawer (Laptops + Desktops + Tablets + Mobile) */}
        {sidebarOpen && (
          <div className="fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
              activeTab={activeTab}
              onSelectTab={(tabId) => {
                handleSelectTab(tabId);
                setSidebarOpen(false);
              }}
              completedModules={completedModules}
              currentSubject={currentSubject}
              onSelectSubject={handleSubjectChange}
              cnExperiments={CN_EXPERIMENTS}
              activeExperimentSlug={activeCnSlug}
              onSelectExperiment={handleSelectCnExperiment}
            />
          </div>
        )}

        <main className="flex-1 min-w-0 bg-white p-3 sm:p-6 md:p-8 overflow-x-hidden">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* Mobile Floating Bug Report Button (Virtual Labs standard) */}
      <button
        onClick={() => setBugModalOpen(true)}
        className="sm:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-[#0fc0ff] hover:bg-[#0284c7] text-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        title="Report a Bug"
        aria-label="Report a Bug"
      >
        <Bug className="w-5 h-5 text-white" />
      </button>

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
