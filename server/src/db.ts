import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  if (process.env.TEST) return // Skip connection in test mode

  if (!MONGO_URI) {
    throw new Error('Please provide MONGO_URI in the environment variables')
  }

  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

export const connection = connectDB()
