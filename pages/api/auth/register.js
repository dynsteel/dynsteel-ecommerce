import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, password } = req.body

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    const client = await clientPromise
    const db = client.db('dynsteel')
    const usersCollection = db.collection('users')

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || '',
      password: hashedPassword,
      status: 'active',
      isVerified: false,
      registerDate: new Date(),
      lastLogin: new Date(),
      totalOrders: 0,
      totalSpent: 0,
      address: '',
      orders: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await usersCollection.insertOne(newUser)

    // Return user without password
    const user = {
      id: result.insertedId.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      status: newUser.status,
      isVerified: newUser.isVerified,
      registerDate: newUser.registerDate,
      lastLogin: newUser.lastLogin,
      totalOrders: newUser.totalOrders,
      totalSpent: newUser.totalSpent
    }

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      user 
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
