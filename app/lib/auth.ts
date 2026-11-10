import { betterAuth } from 'better-auth'
import { MongoClient } from 'mongodb'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { jwt } from 'better-auth/plugins'

const mongoUrl = process.env.MONGODB_URL

if (!mongoUrl) {
  throw new Error('MONGODB_URL is missing')
}

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is missing')
}

const client = new MongoClient(mongoUrl)

const db = client.db('Software_Development1')

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [jwt()],
})
