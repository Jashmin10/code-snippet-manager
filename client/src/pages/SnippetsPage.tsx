import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SnippetFilters from '../components/SnippetFilters';
import SnippetList from '../components/SnippetList';
import SnippetModal from '../components/SnippetModal';
import { Snippet, SnippetFilters as SnippetFiltersType } from '../types/snippet';
import { mockSnippets } from '../data/mockSnippets';

interface SnippetsPageProps {
  selectedLanguage: string;
}

const SnippetsPage: React.FC<SnippetsPageProps> = ({ selectedLanguage }) => {
  const [filters, setFilters] = useState<SnippetFiltersType>({
    search: '',
    language: 'All',
    tags: [],
    isPublic: undefined
  });
  const [snippets, setSnippets] = useState<Snippet[]>(mockSnippets);
  const [isSnippetModalOpen, setIsSnippetModalOpen] = useState(false);

  useEffect(() => {
    // Initialize with mock data and sync language
    setSnippets(mockSnippets);
    setFilters({
      search: '',
      language: selectedLanguage,
      tags: [],
      isPublic: undefined
    });
  }, [selectedLanguage]);

  const handleFilterChange = (newFilters: SnippetFiltersType) => {
    setFilters(newFilters);
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

  // Get unique tags and languages from snippets
  const availableTags = Array.from(new Set(snippets.flatMap(s => s.tags)));
  const availableLanguages = Array.from(new Set(snippets.map(s => s.language)));

  // Filter snippets based on current filters
  // Count total snippets and filtered snippets
  const totalSnippets = snippets.length;
  const filteredSnippets = snippets.filter((snippet) => {
    // Filter by language first
    if (filters.language !== 'All' && snippet.language !== filters.language) {
      return false;
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!snippet.title.toLowerCase().includes(searchTerm) &&
          !snippet.description.toLowerCase().includes(searchTerm) &&
          !snippet.code.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      if (!filters.tags.every(tag => snippet.tags.includes(tag))) {
        return false;
      }
    }

    // Filter by public/private
    if (filters.isPublic !== undefined && snippet.isPublic !== filters.isPublic) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto px-6 py-6"
      >
        <div className="mb-6">

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">
                Code Snippets
              </h1>
              <p className="text-lg text-gray-400 font-medium tracking-wider">
                Browse and manage your code snippets
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Total:</span>
                <span className="font-medium text-purple-500">{totalSnippets}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Showing:</span>
                <span className="font-medium text-purple-500">{filteredSnippets.length}</span>
              </div>
            </div>
          </div>
        </div>

        <SnippetFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onTagSelect={handleTagSelect}
          availableTags={availableTags}
          availableLanguages={availableLanguages}
        />

        <div className="mt-6">
          <SnippetList 
            snippets={filteredSnippets}
            selectedLanguage={selectedLanguage}
            onLanguageSelect={() => {}}
            onSnippetSelect={() => {}}
          />
        </div>
      </motion.div>
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

export default SnippetsPage;