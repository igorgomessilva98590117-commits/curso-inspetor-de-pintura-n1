import React, { useState } from 'react';
import { Tab } from '../types';
import { Home, BookOpen, Hammer, Microscope, FileText, ClipboardList, Menu, X, Award, Users, HelpCircle, Sun, Moon, MessageSquare, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const navItems = [
    { id: Tab.HOME, label: 'Home', icon: Home },
    { id: Tab.THEORY, label: 'Meus Cursos', icon: BookOpen },
    { id: Tab.PRACTICAL, label: 'Prática', icon: Hammer },
    { id: Tab.LAB, label: 'Laboratório', icon: Microscope },
    { id: Tab.CASES, label: 'Estudo de Casos', icon: ClipboardList },
    { id: Tab.DOCS, label: 'Relatórios', icon: FileText },
    { id: Tab.MENTOR, label: 'Mentor IA', icon: MessageSquare },
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
          fixed lg:relative left-0 top-0 h-full lg:h-screen bg-[#0a0a0a] dark:bg-white border-r border-[#1a1a1a] dark:border-slate-200 z-50
          transition-all duration-300 ease-in-out flex-shrink-0
          ${isCollapsed ? '-translate-x-full lg:translate-x-0 w-64 lg:w-20' : 'translate-x-0 w-64'}
        `}
      >
        {/* Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1a1a1a] dark:border-slate-200 transition-colors">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IM</span>
              </div>
              <span className="font-bold text-white dark:text-slate-900 text-lg tracking-tight transition-colors">
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
            className="lg:hidden text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-colors"
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
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 dark:from-amber-500/30 dark:to-orange-600/30 text-amber-400 dark:text-white border-l-2 border-amber-500 dark:border-[#FF6700]' 
                      : 'text-slate-400 dark:text-[#666666] hover:text-white dark:hover:text-[#333333] hover:bg-[#1a1a1a] dark:hover:bg-slate-100'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-amber-500 dark:text-white' : 'dark:text-[#666666]'}`} />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Items */}
          <div className="border-t border-[#1a1a1a] dark:border-slate-200 pt-4 space-y-1 px-2 transition-colors">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 dark:text-[#666666] hover:text-white dark:hover:text-[#333333] hover:bg-[#1a1a1a] dark:hover:bg-slate-100 transition-all duration-200 group"
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            ))}
            
            {/* Toggle Theme */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a1a] dark:hover:bg-slate-700 transition-all duration-200 group"
              title={isCollapsed ? (theme === 'dark' ? 'Modo Claro' : 'Modo Escuro') : undefined}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Moon className="w-5 h-5 flex-shrink-0" />
              )}
              {!isCollapsed && (
                <span className="font-medium text-sm">
                  {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:text-white hover:bg-red-500/10 dark:hover:bg-red-500/10 transition-all duration-200 group"
              title={isCollapsed ? 'Sair' : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">Sair</span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Toggle Button (Desktop) */}
        <div className="hidden lg:block h-16 border-t border-[#1a1a1a] dark:border-slate-200 px-4 transition-colors">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center py-3 text-slate-400 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 transition-colors"
            title={isCollapsed ? 'Expandir' : 'Recolher'}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsCollapsed(false)}
        className="lg:hidden fixed top-4 left-4 z-30 bg-[#0a0a0a] dark:bg-white border border-[#1a1a1a] dark:border-slate-200 text-white dark:text-slate-900 p-2 rounded-lg shadow-lg transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
};

