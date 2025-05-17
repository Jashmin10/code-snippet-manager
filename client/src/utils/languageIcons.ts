import { Language } from './languages';

interface LanguageInfo {
  icon: string;
  color: string;
  darkColor: string;
}

export const languageIcons: Record<Language, LanguageInfo> = {
  javascript: {
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-800',
    darkColor: 'dark:bg-yellow-900/30 dark:text-yellow-300'
  },
  typescript: {
    icon: '📘',
    color: 'bg-blue-100 text-blue-800',
    darkColor: 'dark:bg-blue-900/30 dark:text-blue-300'
  },
  python: {
    icon: '🐍',
    color: 'bg-green-100 text-green-800',
    darkColor: 'dark:bg-green-900/30 dark:text-green-300'
  },
  java: {
    icon: '☕',
    color: 'bg-red-100 text-red-800',
    darkColor: 'dark:bg-red-900/30 dark:text-red-300'
  },
  cpp: {
    icon: '⚙️',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  csharp: {
    icon: '🎯',
    color: 'bg-purple-100 text-purple-800',
    darkColor: 'dark:bg-purple-900/30 dark:text-purple-300'
  },
  ruby: {
    icon: '💎',
    color: 'bg-red-100 text-red-800',
    darkColor: 'dark:bg-red-900/30 dark:text-red-300'
  },
  php: {
    icon: '🐘',
    color: 'bg-indigo-100 text-indigo-800',
    darkColor: 'dark:bg-indigo-900/30 dark:text-indigo-300'
  },
  go: {
    icon: '🚀',
    color: 'bg-cyan-100 text-cyan-800',
    darkColor: 'dark:bg-cyan-900/30 dark:text-cyan-300'
  },
  rust: {
    icon: '🦀',
    color: 'bg-orange-100 text-orange-800',
    darkColor: 'dark:bg-orange-900/30 dark:text-orange-300'
  },
  swift: {
    icon: '🍎',
    color: 'bg-pink-100 text-pink-800',
    darkColor: 'dark:bg-pink-900/30 dark:text-pink-300'
  },
  html: {
    icon: '🌐',
    color: 'bg-orange-100 text-orange-800',
    darkColor: 'dark:bg-orange-900/30 dark:text-orange-300'
  },
  css: {
    icon: '🎨',
    color: 'bg-blue-100 text-blue-800',
    darkColor: 'dark:bg-blue-900/30 dark:text-blue-300'
  },
  sql: {
    icon: '🗄️',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  markdown: {
    icon: '📝',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  json: {
    icon: '📋',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  yaml: {
    icon: '⚡',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  xml: {
    icon: '📄',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  shell: {
    icon: '💻',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  },
  plaintext: {
    icon: '📄',
    color: 'bg-gray-100 text-gray-800',
    darkColor: 'dark:bg-gray-900/30 dark:text-gray-300'
  }
}; 