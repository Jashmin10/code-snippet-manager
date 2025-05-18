import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Snippet } from '../types/snippet';
import { mockSnippets } from '../data/mockSnippets';

interface SnippetCardsProps {
  selectedLanguage: string;
  selectedTags: string[];
}

const SnippetCards: React.FC<SnippetCardsProps> = ({ selectedLanguage, selectedTags }) => {
  const filteredSnippets = mockSnippets.filter((snippet: Snippet) => {
    const matchesLanguage = selectedLanguage === 'All' || snippet.language === selectedLanguage;
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag: string) => snippet.tags.includes(tag));
    return matchesLanguage && matchesTags;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredSnippets.map((snippet: Snippet) => (
        <motion.div
          key={snippet.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform overflow-hidden"
        >
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-200">{snippet.title}</h2>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-purple-900 group-hover:text-purple-800 dark:group-hover:text-purple-200 transition-all duration-200">
                {snippet.language}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-800 dark:hover:text-purple-200 transition-all duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200">{snippet.description}</p>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">{snippet.favorites.length} Favorites</span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to={`/snippets/${snippet.id}`}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 w-full justify-center transform hover:translate-y-[-1px] active:translate-y-0"
              >
                View Snippet
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SnippetCards;
