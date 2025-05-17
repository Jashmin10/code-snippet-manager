import mongoose, { Document, Schema } from 'mongoose';

export interface ISnippet extends Document {
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SnippetSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
    ],
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Add text index for search functionality
SnippetSchema.index({ title: 'text', code: 'text', tags: 'text' });

export default mongoose.model<ISnippet>('Snippet', SnippetSchema); 