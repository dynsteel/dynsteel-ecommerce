// API Route: User Login
import { getCollection } from '../../../lib/db'
import { generateToken, comparePassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, password } = req.body

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email ve şifre gereklidir' })
    }

    // Get user from database
    const usersCollection = await getCollection('users')
    const user = await usersCollection.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Email veya şifre hatalı' })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email veya şifre hatalı' })
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Hesabınız aktif değil' })
    }

    // Generate token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    })

    // Update last login
    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Return success
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
}

