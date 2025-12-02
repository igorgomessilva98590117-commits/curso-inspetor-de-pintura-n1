import React, { useState } from 'react';
import { Tab } from '../types';
import { Home, BookOpen, Hammer, Microscope, FileText, ClipboardList, Menu, X, Award, Users, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: Tab.HOME, label: 'Home', icon: Home },
    { id: Tab.THEORY, label: 'Meus Cursos', icon: BookOpen },
    { id: Tab.PRACTICAL, label: 'Prática', icon: Hammer },
    { id: Tab.LAB, label: 'Laboratório', icon: Microscope },
    { id: Tab.CASES, label: 'Estudo de Casos', icon: ClipboardList },
    { id: Tab.DOCS, label: 'Relatórios', icon: FileText },
  ];

  const bottomItems = [
    { id: 'certificates', label: 'Certificados', icon: Award },
    { id: 'community', label: 'Comunidade', icon: Users },
    { id: 'support', label: 'Suporte', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 h-full bg-[#0a0a0a] border-r border-[#1a1a1a] z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20' : 'translate-x-0 w-64'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1a1a1a]">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IM</span>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                INSPETOR<span className="text-amber-500">MASTER</span>
              </span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">IM</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col h-[calc(100vh-8rem)] py-4 overflow-y-auto">
          <div className="flex-1 space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (window.innerWidth < 1024) setIsCollapsed(true);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-lg
                    transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-amber-400 border-l-2 border-amber-500' 
                      : 'text-slate-400 hover:text-white hover:bg-[#1a1a1a]'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-amber-500' : ''}`} />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Items */}
          <div className="border-t border-[#1a1a1a] pt-4 space-y-1 px-2">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a1a] transition-all duration-200 group"
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Toggle Button (Desktop) */}
        <div className="hidden lg:block h-16 border-t border-[#1a1a1a] px-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center py-3 text-slate-400 hover:text-white transition-colors"
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-[#0a0a0a] border border-[#1a1a1a] text-white p-2 rounded-lg shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

