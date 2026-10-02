import React from 'react';
import {
  Home, Settings, Brain, BookOpen, Code, MessageSquare,
  TrendingUp, FileText, Menu, X, LogOut
} from 'lucide-react';
import clsx from 'clsx';
import { AppState } from '../types';

interface NavigationProps {
  currentPage: AppState['currentPage'];
  onPageChange: (page: AppState['currentPage']) => void;
  onLogout: () => void;
  profileName?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  onLogout,
  profileName
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'skills', label: 'Skills', icon: Brain },
    { id: 'roadmap', label: 'Roadmap', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'interview', label: 'Interview', icon: MessageSquare },
    { id: 'advisor', label: 'AI Advisor', icon: Brain },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'resume', label: 'Resume', icon: FileText },
  ] as const;

  const handleNavClick = (page: AppState['currentPage']) => {
    onPageChange(page);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-700/50 flex-col p-4 z-40">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            PathWise AI
          </h1>
          <p className="text-xs text-gray-500 mt-1">Career Navigator</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id as AppState['currentPage'])}
              className={clsx(
                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all',
                currentPage === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {profileName && (
          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400 mb-4">Welcome, {profileName}!</p>
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-900/20 hover:text-red-400 transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-950 border-t border-gray-700/50 p-2 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="absolute bottom-20 right-4 p-2 bg-blue-600 rounded-full"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMobileOpen && (
          <div className="grid grid-cols-3 gap-2 mb-16">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id as AppState['currentPage'])}
                className={clsx(
                  'flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all',
                  currentPage === id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                )}
              >
                <Icon size={18} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex flex-col items-center space-y-1 px-2 py-2 rounded-lg text-gray-300 hover:bg-red-900/20 hover:text-red-400 col-span-3"
            >
              <LogOut size={18} />
              <span className="text-xs">Logout</span>
            </button>
          </div>
        )}

        <div className="flex justify-around">
          {navItems.slice(0, 5).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id as AppState['currentPage'])}
              className={clsx(
                'flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all',
                currentPage === id
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              )}
            >
              <Icon size={20} />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content offset */}
      <div className="lg:ml-64 pb-24 lg:pb-0" />
    </>
  );
};
