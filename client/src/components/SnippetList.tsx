import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Snippet, SnippetFilters as SnippetFiltersType } from '../types/snippet';
import SnippetFilters from './SnippetFilters';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { API_URL } from '../api/config';

const languages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'swift',
  'go',
  'rust',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'yaml',
  'markdown',
];

const commonTags = [
  'Frontend',
  'Backend',
  'Database',
  'API',
  'Security',
  'React',
  'Node.js',
  'Python',
  'TypeScript',
  'JavaScript',
];

const SnippetList: React.FC = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const [filters, setFilters] = useState<SnippetFiltersType>({
    search: '',
    language: '',
    tags: [],
    isPublic: false,
  });

  useEffect(() => {
    fetchSnippets();
  }, [token]);

  useEffect(() => {
    filterSnippets();
  }, [snippets, filters]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/snippets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch snippets');
      }

      const data = await response.json();
      setSnippets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filterSnippets = () => {
    let filtered = [...snippets];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        snippet =>
          snippet.title.toLowerCase().includes(searchLower) ||
          snippet.description.toLowerCase().includes(searchLower) ||
          snippet.code.toLowerCase().includes(searchLower)
      );
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter(snippet => snippet.language === filters.language);
    }

    // Apply tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(snippet =>
        filters.tags.every(tag => snippet.tags.includes(tag))
      );
    }

    // Apply public filter
    if (filters.isPublic) {
      filtered = filtered.filter(snippet => snippet.isPublic);
    }

    setFilteredSnippets(filtered);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Code Snippets</h2>
        <Link
          to="/editor"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          New Snippet
        </Link>
      </div>

      <SnippetFilters
        filters={filters}
        onFilterChange={setFilters}
        availableTags={commonTags}
        availableLanguages={languages}
      />

      {filteredSnippets.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No snippets found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {snippets.length === 0
              ? 'Get started by creating a new code snippet.'
              : 'Try adjusting your filters to find what you\'re looking for.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <div
              key={snippet._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                    {snippet.title}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
                    {snippet.language}
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                  {snippet.description}
                </p>

                <div className="relative rounded-lg overflow-hidden mb-4">
                  <SyntaxHighlighter
                    language={snippet.language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.5rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                  <button
                    onClick={() => handleCopyCode(snippet.code)}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {snippet.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(snippet.createdAt).toLocaleDateString()}
                  </div>
                  <Link
                    to={`/editor/${snippet._id}`}
                    className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetList; 