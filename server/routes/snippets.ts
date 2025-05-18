import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Snippet, ISnippet } from '../models/Snippet';
import { auth } from '../middleware/auth';

// Type for authenticated request with user
interface AuthRequest extends Request {
  user: { _id: string };
}

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string };
    }
  }
}

// Type for route parameters
interface SnippetParams {
  id: string;
}

// Type for authenticated route handlers
interface AuthenticatedRequestHandler {
  (req: AuthRequest & { params: SnippetParams }, res: Response, next: NextFunction): void;
}

const router = express.Router();

// Get all snippets (public or user's own)
router.get('/', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: any = {};

    // Show public snippets or user's own snippets
    query.$or = [
      { isPublic: true },
      { userId: new mongoose.Types.ObjectId((req as AuthRequest).user._id) }
    ];

    if (req.query.language && req.query.language !== 'All') {
      query.language = req.query.language;
    }

    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    if (req.query.tags) {
      const tagArray = (req.query.tags as string).split(',');
      query.tags = { $all: tagArray };
    }

    if (req.query.isPublic !== undefined) {
      query.isPublic = req.query.isPublic === 'true';
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
router.get('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snippet = await Snippet.findById(req.params.id)
      .populate('user', 'name email')
      .populate('favorites', 'name email');

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user has access to the snippet
    if (!snippet.isPublic && snippet.userId.toString() !== (req as AuthRequest).user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    res.status(500).json({ message: 'Error fetching snippet' });
  }
});

// Create a new snippet
router.post('/', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body as { [key: string]: string | boolean };
    const snippet = new Snippet({
      title,
      description,
      code,
      language,
      tags,
      isPublic,
      userId: new mongoose.Types.ObjectId((req as AuthRequest).user._id),
    });
    const savedSnippet = await snippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(400).json({ message: 'Error creating snippet' });
  }
});

// Update a snippet
router.put('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, code, language, tags, isPublic } = req.body as { [key: string]: string | boolean };
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.userId.toString() !== (req as AuthRequest).user._id.toString()) {
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
router.delete('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    // Check if user owns the snippet
    if (snippet.userId.toString() !== (req as AuthRequest).user._id.toString()) {
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
router.post('/:id/favorite', auth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    const userId = new mongoose.Types.ObjectId((req as AuthRequest).user._id);
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