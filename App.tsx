import React, { useState } from 'react';
import { Tab } from './types';
import { Navigation } from './components/Navigation';
import { Home } from './views/Home';
import { Theory } from './views/Theory';
import { Practical } from './views/Practical';
import { Lab } from './views/Lab';
import { CaseStudies } from './views/CaseStudies';
import { Documentation } from './views/Documentation';

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
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans selection:bg-petro-yellow selection:text-slate-900">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Curso Inspetor de Pintura Industrial N1.
            <br />
            Material educacional baseado nas normas PETROBRAS e ABRACO.
          </p>
          <div className="mt-2 flex justify-center gap-2 text-xs text-slate-600">
             <span>N-13</span>
             <span>•</span>
             <span>N-9</span>
             <span>•</span>
             <span>N-2</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;