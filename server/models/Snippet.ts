import mongoose, { Document, Model, Schema, model, Types } from 'mongoose';
import { IUser } from './User';

// Define the interface
export interface ISnippet extends Document {
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  isPublic: boolean;
  userId: Types.ObjectId;
  favorites: Types.ObjectId[];
  user?: IUser & { _id: Types.ObjectId };
  favoritesUsers?: (IUser & { _id: Types.ObjectId })[];
}

// Define the schema
const snippetSchema = new Schema<ISnippet>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true,
    enum: ['javascript', 'typescript', 'python', 'java', 'csharp', 'go', 'ruby', 'php', 'swift', 'kotlin', 'rust', 'sql', 'html', 'css', 'bash', 'powershell', 'other']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 50
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Create and export the model
export const Snippet = model<ISnippet>('Snippet', snippetSchema) as Model<ISnippet>;

// Export the interface
export type SnippetModel = Model<ISnippet>; 