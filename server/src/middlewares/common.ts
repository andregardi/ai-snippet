import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { Express } from 'express'

// CORS Configuration
export const corsOptions = {
  origin: 'http://localhost:3000' // Our webclient
}

// Middleware export function
export const applyMiddlewares = (app: Express) => {
  app.use(cors(corsOptions))
  app.use(helmet())

  // Body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
