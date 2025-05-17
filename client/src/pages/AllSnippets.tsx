import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SnippetList from '../components/SnippetList';
import SnippetFilters from '../components/SnippetFilters';
import { SnippetFilters as SnippetFiltersType, Snippet } from '../types/snippet';
import { languages } from '../utils/languages';

const AllSnippets: React.FC = () => {
  const [filters, setFilters] = useState<SnippetFiltersType>({
    search: '',
    language: 'All',
    tags: [],
    isPublic: undefined
  });
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableTags();
  }, []);

  const fetchAvailableTags = async () => {
    try {
      const response = await fetch('/api/snippets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch snippets');
      const data = await response.json() as Snippet[];
      const tags = Array.from(new Set(data.flatMap(snippet => snippet.tags)));
      setAvailableTags(tags);
    } catch (err) {
      console.error('Error fetching available tags:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Code Snippets
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Browse and manage your code snippets
            </p>
          </div>
          <Link
            to="/snippets/new"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Snippet
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SnippetFilters
                filters={filters}
                onFilterChange={setFilters}
                availableTags={availableTags}
                availableLanguages={languages}
              />
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SnippetList filters={filters} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSnippets; 