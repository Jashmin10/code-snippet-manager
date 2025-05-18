import { Snippet } from '../types/snippet';

export const getSnippets = async (): Promise<Snippet[]> => {
  // Dummy data for testing
  return [
    {
      id: '1',
      title: 'Hello World',
      description: 'Simple console.log example',
      code: 'console.log("Hello World")',
      language: 'javascript',
      tags: ['example'],
      isPublic: true,
      favorites: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    // Add more snippets as needed
  ];
};