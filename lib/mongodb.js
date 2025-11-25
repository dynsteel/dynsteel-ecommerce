import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI

// Ensure TLS is enabled in connection string for MongoDB Atlas
if (uri && uri.startsWith('mongodb+srv://')) {
  // MongoDB Atlas requires TLS, add it if not present
  if (!uri.includes('tls=') && !uri.includes('ssl=')) {
    const separator = uri.includes('?') ? '&' : '?'
    uri = `${uri}${separator}tls=true`
  }
}

// MongoDB Atlas uses TLS by default with mongodb+srv://
// Connection options for better reliability
const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

let client
let clientPromise

if (!uri) {
  // Don't throw during build - only check at runtime
  if (typeof window === 'undefined') {
    console.warn('MONGODB_URI is not set. MongoDB features will not work.')
  }
}

if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} else {
  // Return a rejected promise if URI is not set
  clientPromise = Promise.reject(new Error('MONGODB_URI is not set'))
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

