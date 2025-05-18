import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  user: any;
  onLogout: () => void;
  onNewSnippet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, user, onLogout, isSidebarOpen, onNewSnippet }) => {
  return (
    <nav className="fixed w-full z-50">
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 h-20 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400/50 ${
              isSidebarOpen
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            }`}
          >
            <div className="w-8 h-8 relative">
              <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ${
                  isSidebarOpen ? 'rotate-45' : 'translate-y-0'
                }`} />
                <div className={`w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ${
                  isSidebarOpen ? 'translate-y-3 rotate-45' : 'translate-y-3'
                }`} />
                <div className={`w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ${
                  isSidebarOpen ? '-translate-y-3 -rotate-45' : '-translate-y-3'
                }`} />
              </div>
            </div>
          </button>
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className="text-white text-2xl font-bold tracking-wider"
            >
              <span className="text-purple-400">Code</span>Snippets
            </Link>
            <button
              onClick={onNewSnippet}
              className="px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/50"
            >
              <span className="flex items-center space-x-1">
                <span className="flex items-center space-x-1">
                  <span>New Snippet</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-purple-400 text-sm font-medium flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Welcome, {user?.name || 'Guest'}</span>
          </span>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/50"
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-purple-700" />
    </nav>
  );
};

export default Navbar;