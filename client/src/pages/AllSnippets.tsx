import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SnippetList from '../components/SnippetList';
import SnippetFilters from '../components/SnippetFilters';
import { SnippetFilters as SnippetFiltersType, Snippet } from '../types/snippet';
import { getSnippets } from '../api/snippets';
import { languages } from '../utils/languages';
import SnippetModal from '../components/SnippetModal';
import Navbar from '../components/Navbar';

const AllSnippets: React.FC = () => {
  const [filters, setFilters] = useState<SnippetFiltersType>({
    search: '',
    language: 'All',
    tags: [],
    isPublic: undefined
  });
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isSnippetModalOpen, setIsSnippetModalOpen] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await getSnippets();
        setSnippets(response);
      } catch (error) {
        console.error('Error fetching snippets:', error);
      }
    };
    fetchSnippets();
  }, []);

  // Reset filters when clicking "All Snippets"
  const handleAllSnippetsClick = () => {
    // Reset all filters
    setFilters({
      search: '',
      language: 'All',
      tags: [],
      isPublic: undefined
    });
    // Force a re-render to ensure the filters are properly reset
    setFilters(prev => ({
      ...prev,
      language: 'All'
    }));
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setFilters(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };
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
      <Navbar
        toggleSidebar={() => {}}
        isSidebarOpen={false}
        user={{ name: 'User' }}
        onLogout={() => {}}
        onNewSnippet={() => setIsSnippetModalOpen(true)}
      />
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
                onTagSelect={handleTagSelect}
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
              <SnippetList 
                snippets={snippets}
                selectedLanguage={filters.language}
                onLanguageSelect={(language) => setFilters(prev => ({ ...prev, language }))}
                onSnippetSelect={(snippet) => {
                  // Handle snippet selection
                  console.log('Snippet selected:', snippet);
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <SnippetModal
        isOpen={isSnippetModalOpen}
        onClose={() => setIsSnippetModalOpen(false)}
        onSnippetCreated={(newSnippet) => {
          // Add new snippet to the list
          setSnippets(prev => [...prev, newSnippet]);
        }}
      />
    </div>
  );
};

export default AllSnippets;