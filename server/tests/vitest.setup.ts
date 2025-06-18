import dotenv from 'dotenv'

dotenv.config()
process.env.OPENAI_API_KEY = 'mock-openai-api-key'

console.log('OPENAI_API_KEY', process.env.OPENAI_API_KEY)
