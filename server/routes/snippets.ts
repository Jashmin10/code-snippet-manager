import express from 'express';
import Snippet, { ISnippet } from '../models/Snippet';
import { auth } from '../middleware/auth';

interface AuthRequest extends express.Request {
  user?: any;
}

const router = express.Router();

// Get all snippets (public or user's own)
router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const { language, search, tags, isPublic } = req.query;
    let query: any = {};

    // Show public snippets or user's own snippets
    query.$or = [
      { isPublic: true },
      { user: req.user._id }
    ];

    if (language && language !== 'All') {
      query.language = language;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    if (tags) {
      const tagArray = (tags as string).split(',');
      query.tags = { $all: tagArray };
    }

    if (isPublic !== undefined) {
      query.isPublic = isPublic === 'true';
    }

    const snippets = await Snippet.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('favorites', 'name email');

    res.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({ message: 'Error fetching snippets' });
  }
});

// Get a single snippet
router.get('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
      .populate('user', 'name email')
      .populate('favorites', 'name email');

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user has access to the snippet
    if (!snippet.isPublic && snippet.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    res.status(500).json({ message: 'Error fetching snippet' });
  }
});

// Create a new snippet
router.post('/', auth, async (req: AuthRequest, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;
    const snippet = new Snippet({
      title,
      description,
      code,
      language,
      tags,
      isPublic,
      user: req.user._id,
    });
    const savedSnippet = await snippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(400).json({ message: 'Error creating snippet' });
  }
});

// Update a snippet
router.put('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body;
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, description, code, language, tags, isPublic },
      { new: true }
    ).populate('user', 'name email');

    res.json(updatedSnippet);
  } catch (error) {
    console.error('Error updating snippet:', error);
    res.status(400).json({ message: 'Error updating snippet' });
  }
});

// Delete a snippet
router.delete('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    res.status(500).json({ message: 'Error deleting snippet' });
  }
});

// Toggle favorite
router.post('/:id/favorite', auth, async (req: AuthRequest, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    const userId = req.user._id;
    const isFavorited = snippet.favorites.includes(userId);

    if (isFavorited) {
      // Remove from favorites
      snippet.favorites = snippet.favorites.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Add to favorites
      snippet.favorites.push(userId);
    }

    await snippet.save();
    res.json(snippet);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Error toggling favorite' });
  }
});

export default router; 