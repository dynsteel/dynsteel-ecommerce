// API Route: User Registration
import { getCollection } from '../../../lib/db'
import { generateToken, hashPassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, password, phone } = req.body

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Ad, email ve şifre gereklidir' })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Geçerli bir email adresi giriniz' })
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' })
    }

    // Check if user already exists
    const usersCollection = await getCollection('users')
    const existingUser = await usersCollection.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ error: 'Bu email adresi zaten kullanılıyor' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: 'customer',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false,
      addresses: [],
      favorites: [],
      orders: []
    }

    const result = await usersCollection.insertOne(newUser)

    // Generate token
    const token = generateToken({
      id: result.insertedId,
      email: newUser.email,
      role: 'customer'
    })

    // Return success
    res.status(201).json({
      success: true,
      token,
      user: {
        id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
}

