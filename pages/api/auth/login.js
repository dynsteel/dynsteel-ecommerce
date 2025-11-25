import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: 'MongoDB connection not configured' })
    }

    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const client = await clientPromise
    const db = client.db('dynsteel')
    const usersCollection = db.collection('users')

    // Find user by email
    const user = await usersCollection.findOne({ email: email.toLowerCase().trim() })
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Update last login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Return user without password
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      isVerified: user.isVerified,
      registerDate: user.registerDate,
      lastLogin: new Date(),
      totalOrders: user.totalOrders || 0,
      totalSpent: user.totalSpent || 0
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: userData 
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
