import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { languages } from '../utils/languages';
import { languageIcons } from '../utils/languageIcons';
import { Snippet } from '../types/snippet';

interface SidebarProps {
  isOpen?: boolean;
  snippets?: Snippet[];
  selectedLanguage?: string;
  onLanguageSelect?: (language: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true,
  snippets = [],
  selectedLanguage = 'All',
  onLanguageSelect = () => {}
}) => {
  // Calculate snippet counts per language
  const languageCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    snippets.forEach(snippet => {
      counts[snippet.language] = (counts[snippet.language] || 0) + 1;
    });
    return counts;
  }, [snippets]);

  return (
    <div className={`w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen pt-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">📚</span>
          Languages
        </h2>
        <div className="space-y-2">
          <motion.button
            whileHover={{ x: 4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLanguageSelect('All')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base transition-all ${
              selectedLanguage === 'All'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">🌐</span>
              <span className="font-medium">All Languages</span>
            </div>
            <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2.5 py-1 rounded-full font-medium">
              {snippets.length}
            </span>
          </motion.button>

          {languages.map((language) => (
            <motion.button
              key={language}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLanguageSelect(language)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base transition-all ${
                selectedLanguage === language
                  ? `${languageIcons[language].color} ${languageIcons[language].darkColor} shadow-sm`
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{languageIcons[language].icon}</span>
                <span className="font-medium">{language}</span>
              </div>
              <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2.5 py-1 rounded-full font-medium">
                {languageCounts[language] || 0}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/editor/new"
          className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl transition-all text-base font-medium shadow-sm hover:shadow-md"
        >
          <span className="text-xl">+</span>
          <span>New Snippet</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 