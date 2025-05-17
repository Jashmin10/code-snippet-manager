import { Snippet } from '../types/snippet';

export const mockSnippets: Snippet[] = [
  {
    _id: '1',
    title: 'React Custom Hook for Dark Mode',
    description: 'A reusable hook to manage dark mode state with local storage persistence',
    code: `import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;`,
    language: 'typescript',
    tags: ['react', 'hooks', 'dark-mode', 'typescript'],
    isPublic: true,
    user: {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    favorites: ['user2', 'user3'],
    createdAt: new Date('2024-03-15').toISOString(),
    updatedAt: new Date('2024-03-15').toISOString()
  },
  {
    _id: '2',
    title: 'Express Error Handler Middleware',
    description: 'A centralized error handling middleware for Express applications',
    code: `const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;`,
    language: 'javascript',
    tags: ['express', 'middleware', 'error-handling', 'nodejs'],
    isPublic: true,
    user: {
      _id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    favorites: ['user1'],
    createdAt: new Date('2024-03-14').toISOString(),
    updatedAt: new Date('2024-03-14').toISOString()
  },
  {
    _id: '3',
    title: 'Python Data Class Example',
    description: 'Example of using Python dataclasses for clean data structures',
    code: `from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class User:
    id: int
    name: str
    email: str
    created_at: datetime
    tags: List[str]
    is_active: bool = True
    last_login: Optional[datetime] = None

# Example usage
user = User(
    id=1,
    name="Alice",
    email="alice@example.com",
    created_at=datetime.now(),
    tags=["admin", "developer"]
)`,
    language: 'python',
    tags: ['python', 'dataclasses', 'type-hints'],
    isPublic: false,
    user: {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    favorites: [],
    createdAt: new Date('2024-03-13').toISOString(),
    updatedAt: new Date('2024-03-13').toISOString()
  },
  {
    _id: '4',
    title: 'Tailwind CSS Card Component',
    description: 'A reusable card component using Tailwind CSS with hover effects',
    code: `<div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Card Title
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      Card description goes here. This is a sample card component.
    </p>
  </div>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
</div>`,
    language: 'html',
    tags: ['tailwind', 'css', 'components', 'ui'],
    isPublic: true,
    user: {
      _id: 'user3',
      name: 'Mike Johnson',
      email: 'mike@example.com'
    },
    favorites: ['user1', 'user2'],
    createdAt: new Date('2024-03-12').toISOString(),
    updatedAt: new Date('2024-03-12').toISOString()
  },
  {
    _id: '5',
    title: 'TypeScript API Response Type',
    description: 'Type definitions for API responses with error handling',
    code: `interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Example usage
const response: ApiResponse<User> = {
  data: {
    id: 1,
    name: 'John',
    email: 'john@example.com'
  },
  status: 'success',
  timestamp: new Date().toISOString()
};`,
    language: 'typescript',
    tags: ['typescript', 'api', 'types', 'interfaces'],
    isPublic: true,
    user: {
      _id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    favorites: ['user3'],
    createdAt: new Date('2024-03-11').toISOString(),
    updatedAt: new Date('2024-03-11').toISOString()
  }
]; 