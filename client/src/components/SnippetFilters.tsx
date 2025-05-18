import React from 'react';
import { motion } from 'framer-motion';
import { SnippetFilters as SnippetFiltersType } from '../types/snippet';
import { languages } from '../utils/languages';

interface SnippetFiltersProps {
  filters: SnippetFiltersType;
  onFilterChange: (filters: SnippetFiltersType) => void;
  onTagSelect: (tag: string) => void;
  availableTags: string[];
  availableLanguages: readonly string[];
}

const SnippetFilters: React.FC<SnippetFiltersProps> = ({
  filters,
  onFilterChange,
  onTagSelect,
  availableTags,
  availableLanguages
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    // If the selected value matches the current value, reset to 'All'
    if (selectedValue === filters.language) {
      onFilterChange({ ...filters, language: 'All' });
    } else {
      onFilterChange({ ...filters, language: selectedValue });
    }
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handleVisibilityChange = (isPublic: boolean | undefined) => {
    onFilterChange({ ...filters, isPublic });
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 shadow-lg border border-gray-200 dark:border-white/10">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Filters
      </h2>

      {/* Search Input */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search snippets..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Language Filter */}
      <div className="mb-6">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Language
        </label>
        <select
          id="language"
          value={filters.language}
          onChange={handleLanguageChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        >
          <option value="All">All Languages</option>
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <span
              key={tag}
              className={`px-3 py-1 text-sm font-medium rounded-full cursor-pointer transition-all duration-200 ${
                filters.tags.includes(tag)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900'
              }`}
              onClick={() => onTagSelect(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visibility Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Visibility
        </label>
        <div className="flex gap-2">
          <motion.button
            onClick={() => handleVisibilityChange(undefined)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.isPublic === undefined
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          <motion.button
            onClick={() => handleVisibilityChange(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.isPublic === true
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Public
          </motion.button>
          <motion.button
            onClick={() => handleVisibilityChange(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filters.isPublic === false
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Private
          </motion.button>
        </div>
      </div>

      {/* Clear Filters Button */}
      {(filters.search || filters.language !== 'All' || filters.tags.length > 0 || filters.isPublic !== undefined) && (
        <motion.button
          onClick={() => onFilterChange({
            search: '',
            language: 'All',
            tags: [],
            isPublic: undefined
          })}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Clear Filters
        </motion.button>
      )}
    </div>
  );
};

export default SnippetFilters; 