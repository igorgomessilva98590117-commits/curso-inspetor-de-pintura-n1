import React, { useState } from 'react';
import { Tab } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LandingPage } from './views/LandingPage';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Home } from './views/Home';
import { Theory } from './views/Theory';
import { Practical } from './views/Practical';
import { Lab } from './views/Lab';
import { CaseStudies } from './views/CaseStudies';
import { Documentation } from './views/Documentation';
import { Mentor } from './views/Mentor';
import { Users, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [showLogin, setShowLogin] = useState(false);

  // Loading enquanto verifica sessão
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado
  if (!isAuthenticated) {
    if (showLogin) {
      return <Login />;
    }
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home onChangeTab={setActiveTab} />;
      case Tab.THEORY:
        return <Theory onChangeTab={setActiveTab} />;
      case Tab.PRACTICAL:
        return <Practical />;
      case Tab.LAB:
        return <Lab />;
      case Tab.CASES:
        return <CaseStudies />;
      case Tab.DOCS:
        return <Documentation />;
      case Tab.MENTOR:
        return <Mentor />;
      default:
        return <Home onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-white flex font-sans selection:bg-amber-500 selection:text-black transition-colors duration-300 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto transition-all duration-300">
        <main className="container mx-auto px-4 lg:px-8 py-8 flex-1">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] dark:bg-slate-50 border-t border-[#1a1a1a] dark:border-slate-200 mt-16 transition-colors duration-300">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            {/* Comunidade Master Section */}
            <div className="mb-8 pb-8 border-b border-[#1a1a1a] dark:border-slate-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white dark:text-slate-900 transition-colors">Comunidade Master</h3>
              </div>
              <p className="text-slate-400 dark:text-slate-600 mb-4 max-w-2xl transition-colors">
                Junte-se à nossa comunidade exclusiva de inspetores. Compartilhe experiências, 
                tire dúvidas e conecte-se com profissionais da área.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  Grupo VIP
                </a>
                <div className="flex gap-3">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1a1a1a] dark:bg-slate-200 hover:bg-[#2a2a2a] dark:hover:bg-slate-300 border border-[#1a1a1a] dark:border-slate-300 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-all duration-300"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1a1a1a] dark:bg-slate-200 hover:bg-[#2a2a2a] dark:hover:bg-slate-300 border border-[#1a1a1a] dark:border-slate-300 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-all duration-300"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1a1a1a] dark:bg-slate-200 hover:bg-[#2a2a2a] dark:hover:bg-slate-300 border border-[#1a1a1a] dark:border-slate-300 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-all duration-300"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright e Normas */}
            <div className="text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors">
                © {new Date().getFullYear()} Inspetor Master - Curso Inspetor de Pintura Industrial N1.
              </p>
              <p className="text-slate-600 dark:text-slate-500 text-xs mb-4 transition-colors">
                Material educacional baseado nas normas PETROBRAS e ABRACO.
              </p>
              <div className="flex justify-center gap-2 text-xs text-slate-600 dark:text-slate-500 transition-colors">
                <span>N-13</span>
                <span>•</span>
                <span>N-9</span>
                <span>•</span>
                <span>N-2</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
