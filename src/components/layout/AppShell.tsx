import { useState, lazy, Suspense } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuth } from '../../hooks/useAuth';
import { ToastStack } from '../ui/Toast';
import { useToastContext } from '../../context/ToastContext';

// Lazy loaded pages
const DashboardPage = lazy(() => import('../dashboard/DashboardPage'));
const StudentsPage = lazy(() => import('../students/StudentsPage'));
const TeachersPage = lazy(() => import('../teachers/TeachersPage'));
const ClassesPage = lazy(() => import('../classes/ClassesPage'));
const CalendarPage = lazy(() => import('../calendar/CalendarPage'));
const BillingPage = lazy(() => import('../billing/BillingPage'));
const SettingsPage = lazy(() => import('../settings/SettingsPage'));

// Lazy imports for auth screens (defined at module level for React.lazy)
const AuthScreen = lazy(() => import('../auth/AuthScreen').then(m => ({ default: m.AuthScreen })));
const ProfilePicker = lazy(() => import('../auth/ProfilePicker').then(m => ({ default: m.ProfilePicker })));
const SuccessScreen = lazy(() => import('../auth/SuccessScreen').then(m => ({ default: m.SuccessScreen })));

function PageLoader() {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 32, height: 32,
        borderRadius: '50%',
        border: '3px solid var(--divider)',
        borderTopColor: 'var(--gold)',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export function AppShell() {
  const { screen } = useAuth();
  const { toasts, removeToast } = useToastContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth screens
  if (screen === 'auth' || screen === 'profiles' || screen === 'success') {
    return (
      <>
        <Suspense fallback={<PageLoader />}>
          {screen === 'auth' && <AuthScreen />}
          {screen === 'profiles' && <ProfilePicker />}
          {screen === 'success' && <SuccessScreen />}
        </Suspense>
        <ToastStack toasts={toasts} onDismiss={removeToast} />
      </>
    );
  }

  const showEntityFilter = ['students', 'teachers', 'classes', 'billing'].includes(activeTab);
  const showStatusFilter = ['students', 'teachers', 'classes'].includes(activeTab);

  return (
    <div className="shell">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="main">
        <Topbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          showEntityFilter={showEntityFilter}
          showStatusFilter={showStatusFilter}
        />
        <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <Suspense fallback={<PageLoader />}>
            {activeTab === 'dashboard' && <DashboardPage />}
            {activeTab === 'students' && <StudentsPage searchQuery={searchQuery} />}
            {activeTab === 'teachers' && <TeachersPage searchQuery={searchQuery} />}
            {activeTab === 'classes' && <ClassesPage searchQuery={searchQuery} />}
            {activeTab === 'calendar' && <CalendarPage />}
            {activeTab === 'billing' && <BillingPage />}
            {activeTab === 'settings' && <SettingsPage />}
          </Suspense>
        </div>
      </div>
      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
