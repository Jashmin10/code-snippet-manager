import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Toast from './Toast';

interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

interface SnippetListProps {
  snippets: Snippet[];
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onSnippetSelect: (snippet: Snippet) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, selectedLanguage, onLanguageSelect, onSnippetSelect }) => {

  const [toastMessage, setToastMessage] = useState('');

  const hasSnippets = snippets.length > 0;
  
  return (
    <div className="space-y-4">
      {hasSnippets ? (
        snippets.map((snippet: Snippet) => (
          <div
            key={snippet.id}
            className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white/90 hover:text-white transition-colors duration-300">
                  {snippet.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {snippet.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                    {snippet.language}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(snippet.code);
                    setToastMessage('Code copied to clipboard!');
                  }}
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/50"
                  title="Copy code to clipboard"
                >
                  <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
                <button
                  onClick={() => onSnippetSelect(snippet)}
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/50"
                  title="View snippet details"
                >
                  <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/95 to-gray-900/95 border border-gray-800/50">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 p-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(snippet.code);
                      setToastMessage('Code copied to clipboard!');
                    }}
                    className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400/50"
                    title="Copy code to clipboard"
                  >
                    <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  </button>
                </div>
                <pre className="p-6 overflow-x-auto">
                  <code className="text-white/90 text-sm leading-relaxed">
                    {snippet.code}
                  </code>
                </pre>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-700" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-700" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{format(new Date(snippet.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No snippets match your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default SnippetList;