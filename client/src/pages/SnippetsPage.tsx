import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SnippetList from '../components/SnippetList';
import SnippetFilters from '../components/SnippetFilters';
// import Sidebar from '../components/Sidebar';
import { Snippet, SnippetFilters as SnippetFiltersType } from '../types/snippet';
import { mockSnippets } from '../data/mockSnippets';

const SnippetsPage: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SnippetFiltersType>({
    search: '',
    language: 'All',
    tags: [],
    isPublic: undefined
  });

  useEffect(() => {
    // Simulate API call with mock data
    setLoading(true);
    setTimeout(() => {
      setSnippets(mockSnippets);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLanguageSelect = (language: string) => {
    setFilters(prev => ({
      ...prev,
      language
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar removed from here */}
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1600px] mx-auto px-6 py-6"
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Code Snippets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and manage your code snippets
            </p>
          </div>

          <SnippetFilters
            filters={filters}
            onFilterChange={setFilters}
            availableTags={Array.from(new Set(snippets.flatMap(s => s.tags)))}
            availableLanguages={Array.from(new Set(snippets.map(s => s.language)))}
          />

          <div className="mt-6">
            <SnippetList filters={filters} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SnippetsPage; 