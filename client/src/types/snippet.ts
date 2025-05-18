import { Language } from '../utils/languages';

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  favorites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SnippetFormData {
  title: string;
  description: string;
  code: string;
  language: Language;
  tags: string[];
  isPublic: boolean;
}

export interface SnippetFilters {
  search: string;
  language: string;
  tags: string[];
  isPublic?: boolean;
}