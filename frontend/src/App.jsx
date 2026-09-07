import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import AimSection from './components/AimSection';
import RateMeModal from './components/RateMeModal';
import ReportBugModal from './components/ReportBugModal';
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('aim');
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(5);

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'aim':
        return <AimSection onNavigateNext={() => setActiveTab('overview')} />;
      case 'overview':
        return <OverviewView onNext={() => setActiveTab('pretest')} />;
      case 'recap':
        return <RecapView />;
      case 'pretest':
        return <PretestView onNext={() => setActiveTab('visualizer')} />;
      case 'visualizer':
        return <VisualizerView />;
      case 'simulation':
        return <SimulationView />;
      case 'code_assessment':
        return <CodeAssessmentView />;
      case 'analysis':
        return <AnalysisView />;
      case 'posttest':
        return <PosttestView />;
      case 'references':
        return <ReferencesView />;
      case 'feedback':
        return <FeedbackView onOpenRateModal={() => setRateModalOpen(true)} />;
      case 'faculty_portal':
        return <FacultyPortalView />;
      case 'admin_portal':
        return <AdminPortalView />;
      default:
        return <AimSection onNavigateNext={() => setActiveTab('overview')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800">
      {/* 1. Header with KJSSE Virtual Labs branding, Stars, Rate Me, Report a Bug & Demo Switcher */}
      <Header
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
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
        />

        <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-8">
          {renderActiveTabContent()}
        </main>
      </div>

      {/* 4. Interactive Modals */}
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
