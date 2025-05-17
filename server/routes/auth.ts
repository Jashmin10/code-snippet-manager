import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { auth } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Please provide all required fields',
        details: { email: !email, password: !password, name: !name }
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const user = new User({ 
      email: email.toLowerCase().trim(),
      password,
      name: name.trim()
    });

    // Save user
    await user.save();
    console.log('User registered successfully:', user.email);

    // Generate token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send response without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name
    };

    res.status(201).json({ user: userResponse, token });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      message: 'Registration failed',
      error: error.message 
    });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide both email and password',
        details: { email: !email, password: !password }
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('User logged in successfully:', user.email);

    // Generate token
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Send response without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name
    };

    res.json({ user: userResponse, token });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(400).json({ 
      message: 'Login failed',
      error: error.message 
    });
  }
});

// Get current user
router.get('/me', auth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const userResponse = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name
    };

    res.json(userResponse);
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      message: 'Error fetching user data',
      error: error.message 
    });
  }
});

export default router; 