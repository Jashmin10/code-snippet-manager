import express from 'express';
import Snippet, { ISnippet } from '../models/Snippet';

const router = express.Router();

// Get all snippets
router.get('/', async (req, res) => {
  try {
    const { language, search } = req.query;
    let query: any = {};

    if (language && language !== 'All') {
      query.language = language;
    }

    if (search) {
      query.$text = { $search: search as string };
    }

    const snippets = await Snippet.find(query).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippets' });
  }
});

// Get a single snippet
router.get('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(snippet);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippet' });
  }
});

// Create a new snippet
router.post('/', async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;
    const snippet = new Snippet({
      title,
      code,
      language,
      tags,
    });
    const savedSnippet = await snippet.save();
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(400).json({ message: 'Error creating snippet' });
  }
});

// Update a snippet
router.put('/:id', async (req, res) => {
  try {
    const { title, code, language, tags } = req.body;
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { title, code, language, tags },
      { new: true }
    );
    if (!updatedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json(updatedSnippet);
  } catch (error) {
    res.status(400).json({ message: 'Error updating snippet' });
  }
});

// Delete a snippet
router.delete('/:id', async (req, res) => {
  try {
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.id);
    if (!deletedSnippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet' });
  }
});

export default router; 