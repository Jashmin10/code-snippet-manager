import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const languages = [
  'All',
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'PHP',
  'Go',
  'Rust',
  'Swift',
];

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <aside className={`fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All Snippets
          </Link>
          <Link
            to="/editor"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Snippet
          </Link>
        </nav>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Languages
          </h3>
          <div className="mt-2 space-y-1">
            {languages.map((language) => (
              <motion.button
                key={language}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedLanguage(language)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedLanguage === language
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {language}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Tags
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Frontend', 'Backend', 'Database', 'API', 'Security'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 