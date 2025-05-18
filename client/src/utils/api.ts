import { Snippet } from '../types/snippet';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getSnippets = async (): Promise<Snippet[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/snippets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching snippets:', error);
    throw error;
  }
};
