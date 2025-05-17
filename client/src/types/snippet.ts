export interface Snippet {
  _id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  userId: string;
}

export interface SnippetFormData {
  title: string;
  language: string;
  code: string;
  description: string;
  tags: string[];
  isPublic: boolean;
}

export interface SnippetFilters {
  search: string;
  language: string;
  tags: string[];
  isPublic?: boolean;
} 