import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { languages } from '../utils/languages';
import { Snippet } from '../types/snippet';
import SnippetForm from './SnippetForm';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onSnippetCreated?: (snippet: Snippet) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  toggleSidebar,
  selectedLanguage,
  onLanguageSelect,
  onSnippetCreated
}) => {
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSnippetCreated = (snippet: Snippet) => {
    if (onSnippetCreated) {
      onSnippetCreated(snippet);
    }
    setIsFormOpen(false);
  };

  return (
    <div className={`fixed left-0 top-16 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
      <div className="p-4" />

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-white text-xl font-bold mb-4">Languages</h2>
              <div className="space-y-2">
                <button
                  onClick={() => onLanguageSelect('All')}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedLanguage === 'All' ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'hover:bg-purple-600/20 text-gray-300'}`}
                >
                  All Languages
                </button>
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => onLanguageSelect(language)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${selectedLanguage === language ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' : 'hover:bg-purple-600/20 text-gray-300'}`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h2 className="text-white text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>New Snippet</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-lg">
              <SnippetForm onClose={() => setIsFormOpen(false)} onSnippetCreated={handleSnippetCreated} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;