import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://amir:YOUR_PASSWORD@grandpearl.qvl62it.mongodb.net/'
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

export async function getDb() {
  const client = await clientPromise
  return client.db()
}
