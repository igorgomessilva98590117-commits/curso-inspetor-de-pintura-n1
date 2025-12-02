import React from 'react';
import { Tab } from '../types';
import { Home, BookOpen, Hammer, Microscope, FileText, ClipboardList } from 'lucide-react';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, label: 'Central', icon: Home },
    { id: Tab.THEORY, label: 'Teoria', icon: BookOpen },
    { id: Tab.PRACTICAL, label: 'Prática', icon: Hammer },
    { id: Tab.LAB, label: 'Laboratório', icon: Microscope },
    { id: Tab.CASES, label: 'Estudo de Casos', icon: ClipboardList },
    { id: Tab.DOCS, label: 'Relatórios', icon: FileText },
  ];

  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-petro-yellow text-xl tracking-tighter">INSPETOR<span className="text-white">MASTER</span></span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-petro-green text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </div>
      {/* Mobile Menu (Simplified for this demo) */}
      <div className="md:hidden flex overflow-x-auto pb-2 px-2 gap-2 hide-scrollbar">
         {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-md text-xs font-medium ${
                  isActive
                    ? 'bg-petro-green text-white'
                    : 'text-slate-300 bg-slate-800 border border-slate-700'
                }`}
              >
                <item.icon className="w-3 h-3 mr-1" />
                {item.label}
              </button>
            );
          })}
      </div>
    </nav>
  );
};