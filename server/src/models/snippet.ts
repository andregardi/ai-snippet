import mongoose, { Schema, Document } from 'mongoose'

export interface SnippetDocument extends Document {
  text: string
  summary: string
  createdAt: Date
  updatedAt: Date
}

const SnippetSchema = new Schema<SnippetDocument>(
  {
    text: { type: String, required: true },
    summary: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export const Snippet = mongoose.model<SnippetDocument>('Snippet', SnippetSchema)
