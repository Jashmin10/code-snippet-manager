import React from 'react';
import { motion } from 'framer-motion';
import { SnippetFilters as SnippetFiltersType } from '../types/snippet';

interface SnippetFiltersProps {
  filters: SnippetFiltersType;
  onFilterChange: (filters: SnippetFiltersType) => void;
  availableTags: string[];
  availableLanguages: string[];
}

const SnippetFilters: React.FC<SnippetFiltersProps> = ({
  filters,
  onFilterChange,
  availableTags,
  availableLanguages,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, language: e.target.value });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ ...filters, tags: newTags });
  };

  const handlePublicToggle = () => {
    onFilterChange({ ...filters, isPublic: !filters.isPublic });
  };

  return (
    <div className="space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="relative">
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search snippets..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <select
            value={filters.language}
            onChange={handleLanguageChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Languages</option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.isPublic}
              onChange={handlePublicToggle}
              className="form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-purple-500"
            />
            <span className="text-gray-700 dark:text-gray-300">Public Only</span>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTagToggle(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filters.tags.includes(tag)
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SnippetFilters; 