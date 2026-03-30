import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'sonner';
import { MessageCircle } from 'lucide-react';
import { APP_NAME } from './lib/constants';
import './globals.css';

// Hooks & Providers
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

// Import pages directly
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { CarDetails } from './pages/CarDetails';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const WhatsAppFloatingButton = () => {
  const { whatsappNumber } = useSettings();
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
      title="Contact Support"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background border-2 border-white">
        !
      </span>
      <div className="absolute right-20 bg-background text-primary px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity border border-primary/20 shadow-xl whitespace-nowrap">
        Contact {APP_NAME} Admin
      </div>
    </a>
  );
};

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      {!isDashboard && !isAuthPage && <Navbar />}
      <main className="relative">
        <Suspense fallback={
          <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
               <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-2xl shadow-primary/20" />
               <p className="text-primary font-serif uppercase tracking-[0.3em] animate-pulse">Loading Hub...</p>
            </div>
          </div>
        }>
          {children}
        </Suspense>
      </main>
      {!isDashboard && !isAuthPage && <Footer />}
      {!isDashboard && <WhatsAppFloatingButton />}
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <LayoutWrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </LayoutWrapper>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}