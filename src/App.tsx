import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toaster } from 'sonner';
import './globals.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Marketplace = lazy(() => import('./pages/Marketplace').then(module => ({ default: module.Marketplace })));
const CarDetails = lazy(() => import('./pages/CarDetails').then(module => ({ default: module.CarDetails })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const SignUp = lazy(() => import('./pages/SignUp').then(module => ({ default: module.SignUp })));

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans">
      {!isDashboard && !isAuthPage && <Navbar isLoggedIn={false} />}
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
      <Toaster position="top-right" theme="dark" richColors closeButton />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}