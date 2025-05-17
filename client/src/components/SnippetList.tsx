import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAuth } from '../context/AuthContext';
import { Snippet, SnippetFilters as SnippetFiltersType } from '../types/snippet';
import { mockSnippets } from '../data/mockSnippets';
import { languageIcons } from '../utils/languageIcons';

interface SnippetListProps {
  filters: SnippetFiltersType;
}

const SnippetList: React.FC<SnippetListProps> = ({ filters }) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Calculate snippet counts per language
  const languageCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    snippets.forEach(snippet => {
      counts[snippet.language] = (counts[snippet.language] || 0) + 1;
    });
    return counts;
  }, [snippets]);

  useEffect(() => {
    // Simulate API call with mock data
    setLoading(true);
    setTimeout(() => {
      setSnippets(mockSnippets);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [snippets, filters]);

  const filterSnippets = () => {
    let filtered = [...snippets];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchLower) ||
        snippet.description.toLowerCase().includes(searchLower) ||
        snippet.code.toLowerCase().includes(searchLower) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply language filter
    if (filters.language && filters.language !== 'All') {
      filtered = filtered.filter(snippet => 
        snippet.language.toLowerCase() === filters.language.toLowerCase()
      );
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(snippet =>
        filters.tags.every(tag => snippet.tags.includes(tag))
      );
    }

    // Apply public/private filter
    if (filters.isPublic !== undefined) {
      filtered = filtered.filter(snippet => snippet.isPublic === filters.isPublic);
    }

    setFilteredSnippets(filtered);
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleFavorite = async (snippetId: string) => {
    try {
      // Simulate API call
      const updatedSnippets = snippets.map(snippet => {
        if (snippet._id === snippetId) {
          const isFavorited = snippet.favorites.includes(user?._id || '');
          return {
            ...snippet,
            favorites: isFavorited
              ? snippet.favorites.filter(id => id !== user?._id)
              : [...snippet.favorites, user?._id || '']
          };
        }
        return snippet;
      });
      setSnippets(updatedSnippets);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Filter Info */}
      {filters.language && filters.language !== 'All' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{languageIcons[filters.language as keyof typeof languageIcons]?.icon}</span>
            <div>
              <p className="text-purple-700 dark:text-purple-300">
                Showing snippets in <span className="font-semibold">{filters.language}</span>
                <span className="ml-2 text-sm text-purple-600 dark:text-purple-400">
                  ({languageCounts[filters.language] || 0} snippets)
                </span>
              </p>
              {filteredSnippets.length === 0 && (
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  No snippets found. Try adjusting your filters or create a new snippet.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredSnippets.map((snippet) => (
            <motion.div
              key={snippet._id}
              variants={itemVariants}
              layout
              className="bg-white dark:bg-gray-800/50 backdrop-blur-lg rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {snippet.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {snippet.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleFavorite(snippet._id)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {snippet.favorites.includes(user?._id || '') ? '★' : '☆'}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative group">
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    className="rounded-lg !bg-gray-100 dark:!bg-gray-900/50 !m-0"
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      background: 'rgba(243, 244, 246, 0.5)',
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => handleCopyCode(snippet.code)}
                    className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    📋
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded flex items-center space-x-1 ${
                      languageIcons[snippet.language as keyof typeof languageIcons]?.color
                    } ${languageIcons[snippet.language as keyof typeof languageIcons]?.darkColor}`}>
                      <span>{languageIcons[snippet.language as keyof typeof languageIcons]?.icon}</span>
                      <span>{snippet.language}</span>
                    </span>
                    {!snippet.isPublic && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                        Private
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/editor/${snippet._id}`}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSnippets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 dark:text-gray-400 py-8"
        >
          {filters.language && filters.language !== 'All' ? (
            <div>
              <p className="mb-2">No snippets found in {filters.language}.</p>
              <p className="text-sm">Try selecting a different language or create a new snippet.</p>
            </div>
          ) : (
            <p>No snippets found. Try adjusting your filters or create a new snippet.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SnippetList; 