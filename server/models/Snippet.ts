import mongoose, { Document, Schema } from 'mongoose';

export interface ISnippet extends Document {
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  user: mongoose.Types.ObjectId;
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
    enum: [
      'javascript',
      'typescript',
      'python',
      'java',
      'cpp',
      'csharp',
      'ruby',
      'php',
      'go',
      'rust',
      'swift',
      'html',
      'css',
      'sql',
      'markdown',
      'json',
      'yaml',
      'xml',
      'shell',
      'plaintext'
    ],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isPublic: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

// Add text index for search functionality
SnippetSchema.index({ 
  title: 'text', 
  description: 'text', 
  code: 'text', 
  tags: 'text' 
});

export default mongoose.model<ISnippet>('Snippet', SnippetSchema); 