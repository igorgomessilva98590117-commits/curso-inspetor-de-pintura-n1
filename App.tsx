import React, { useState } from 'react';
import { Tab } from './types';
import { Sidebar } from './components/Sidebar';
import { Home } from './views/Home';
import { Theory } from './views/Theory';
import { Practical } from './views/Practical';
import { Lab } from './views/Lab';
import { CaseStudies } from './views/CaseStudies';
import { Documentation } from './views/Documentation';
import { Users, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home onChangeTab={setActiveTab} />;
      case Tab.THEORY:
        return <Theory />;
      case Tab.PRACTICAL:
        return <Practical />;
      case Tab.LAB:
        return <Lab />;
      case Tab.CASES:
        return <CaseStudies />;
      case Tab.DOCS:
        return <Documentation />;
      default:
        return <Home onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex font-sans selection:bg-amber-500 selection:text-black">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-20">
        <main className="container mx-auto px-4 lg:px-8 py-8">
          {renderContent()}
        </main>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-16">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            {/* Comunidade Master Section */}
            <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Comunidade Master</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-2xl">
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
                    className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#1a1a1a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#1a1a1a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#1a1a1a] rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright e Normas */}
            <div className="text-center">
              <p className="text-slate-500 text-sm mb-2">
                © {new Date().getFullYear()} Inspetor Master - Curso Inspetor de Pintura Industrial N1.
              </p>
              <p className="text-slate-600 text-xs mb-4">
                Material educacional baseado nas normas PETROBRAS e ABRACO.
              </p>
              <div className="flex justify-center gap-2 text-xs text-slate-600">
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

export default App;
