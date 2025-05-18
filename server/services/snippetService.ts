import { Snippet } from '../models/Snippet';

export class SnippetService {
  // Create new snippet
  static async createSnippet(data: any) {
    try {
      const snippet = new Snippet(data);
      return await snippet.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all snippets for a user
  static async getUserSnippets(userId: string, filters: any = {}) {
    try {
      const query = {
        userId,
        ...filters
      };
      return await Snippet.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  // Get public snippets
  static async getPublicSnippets(filters: any = {}) {
    try {
      const query = {
        isPublic: true,
        ...filters
      };
      return await Snippet.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  // Get single snippet by ID
  static async getSnippet(id: string) {
    try {
      return await Snippet.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // Update snippet
  static async updateSnippet(id: string, updates: any) {
    try {
      return await Snippet.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // Delete snippet
  static async deleteSnippet(id: string) {
    try {
      return await Snippet.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  // Add to favorites
  static async addToFavorites(userId: string, snippetId: string) {
    try {
      const snippet = await Snippet.findById(snippetId);
      if (!snippet) throw new Error('Snippet not found');

      if (!snippet.favorites.includes(userId)) {
        snippet.favorites.push(userId);
        await snippet.save();
      }

      return snippet;
    } catch (error) {
      throw error;
    }
  }

  // Remove from favorites
  static async removeFromFavorites(userId: string, snippetId: string) {
    try {
      const snippet = await Snippet.findById(snippetId);
      if (!snippet) throw new Error('Snippet not found');

      snippet.favorites = snippet.favorites.filter(id => id.toString() !== userId);
      await snippet.save();

      return snippet;
    } catch (error) {
      throw error;
    }
  }
}
