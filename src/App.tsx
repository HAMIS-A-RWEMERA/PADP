import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/ToastContainer';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { SubmitModal } from './components/modals/SubmitModal';
import { TournamentDetailModal } from './components/modals/TournamentDetailModal';
import { SocietyDetailModal } from './components/modals/SocietyDetailModal';
import { ResourceReaderModal } from './components/modals/ResourceReaderModal';
import { CourseDetailModal } from './components/modals/CourseDetailModal';

// Views
import { HomeView } from './views/HomeView';
import { TournamentsView } from './views/TournamentsView';
import { SocietiesView } from './views/SocietiesView';
import { PracticeView } from './views/PracticeView';
import { FormatsView } from './views/FormatsView';
import { ResourcesView } from './views/ResourcesView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { CountriesView } from './views/CountriesView';
import { LearnView } from './views/LearnView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ProfileView } from './views/ProfileView';

const MainContent: React.FC = () => {
  const { currentView } = usePlatform();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'competitions':
        return <TournamentsView />;
      case 'societies':
        return <SocietiesView />;
      case 'practice':
        return <PracticeView />;
      case 'formats':
        return <FormatsView />;
      case 'resources':
        return <ResourcesView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'countries':
        return <CountriesView />;
      case 'learn':
        return <LearnView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Sticky Global Navbar */}
      <Navbar />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderView()}
      </main>

      {/* Global Continental Footer */}
      <Footer />

      {/* Global Modals & Notifications */}
      <GlobalSearchModal />
      <SubmitModal />
      <TournamentDetailModal />
      <SocietyDetailModal />
      <ResourceReaderModal />
      <CourseDetailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <MainContent />
    </PlatformProvider>
  );
}

