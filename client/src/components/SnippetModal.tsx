import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SnippetForm from './SnippetForm';
import { Snippet } from '../types/snippet';

interface SnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSnippetCreated?: (snippet: Snippet) => void;
}

const SnippetModal: React.FC<SnippetModalProps> = ({ isOpen, onClose, onSnippetCreated }) => {
  const [isFormOpen, setIsFormOpen] = useState(isOpen);

  const handleSnippetCreated = (snippet: Snippet) => {
    if (onSnippetCreated) {
      onSnippetCreated(snippet);
    }
    setIsFormOpen(false);
  };

  return (
    <>
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFormOpen(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full"
          >
            <SnippetForm
              onClose={() => setIsFormOpen(false)}
              onSnippetCreated={handleSnippetCreated}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default SnippetModal;
