// Database Connection (MongoDB)
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI tanımlanmamış. Lütfen .env.local dosyasını kontrol edin.')
}

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // Development modunda global variable kullan (hot reload için)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // Production modunda normal bağlantı
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Database helper fonksiyonları
export async function getDb() {
  const client = await clientPromise
  return client.db('dynsteel')
}

export async function getCollection(collectionName) {
  const db = await getDb()
  return db.collection(collectionName)
}

