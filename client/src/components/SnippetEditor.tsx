import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Snippet, SnippetFormData } from '../types/snippet';
import { languages } from '../utils/languages';

const SnippetEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [snippet, setSnippet] = useState<SnippetFormData>({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    tags: [],
    isPublic: false,
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (id) {
      fetchSnippet();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchSnippet = async () => {
    try {
      const response = await fetch(`/api/snippets/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch snippet');
      const data = await response.json();
      setSnippet({
        title: data.title,
        description: data.description,
        code: data.code,
        language: data.language,
        tags: data.tags,
        isPublic: data.isPublic,
      });
    } catch (err) {
      setError('Failed to load snippet');
      console.error('Error fetching snippet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = id ? `/api/snippets/${id}` : '/api/snippets';
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(snippet),
      });

      if (!response.ok) throw new Error('Failed to save snippet');
      
      const data = await response.json();
      navigate(`/snippets/${data._id}`);
    } catch (err) {
      setError('Failed to save snippet');
      console.error('Error saving snippet:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !snippet.tags.includes(newTag.trim())) {
      setSnippet({
        ...snippet,
        tags: [...snippet.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSnippet({
      ...snippet,
      tags: snippet.tags.filter(tag => tag !== tagToRemove),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={snippet.title}
            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter snippet title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={snippet.description}
            onChange={(e) => setSnippet({ ...snippet, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter snippet description"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300">
            Language
          </label>
          <select
            id="language"
            value={snippet.language}
            onChange={(e) => setSnippet({ ...snippet, language: e.target.value as any })}
            className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-300">
            Code
          </label>
          <div className="mt-1 relative">
            <textarea
              id="code"
              value={snippet.code}
              onChange={(e) => setSnippet({ ...snippet, code: e.target.value })}
              required
              rows={15}
              className="block w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your code here"
            />
            <div className="absolute top-2 right-2">
              <SyntaxHighlighter
                language={snippet.language}
                style={vscDarkPlus}
                className="rounded-lg !bg-transparent !m-0 pointer-events-none"
                customStyle={{
                  margin: 0,
                  background: 'transparent',
                }}
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-purple-300 hover:text-purple-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddTag} className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Add a tag"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={snippet.isPublic}
            onChange={(e) => setSnippet({ ...snippet, isPublic: e.target.checked })}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-300">
            Make this snippet public
          </label>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </div>
            ) : (
              'Save Snippet'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SnippetEditor; 