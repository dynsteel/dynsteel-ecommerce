// API Route: Admin Login
import { getCollection } from '../../../lib/db'
import { generateToken, comparePassword } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { username, password } = req.body

    // Input validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Kullanıcı adı ve şifre gereklidir' })
    }

    // Get admin from database
    const adminsCollection = await getCollection('admins')
    const admin = await adminsCollection.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ]
    })

    if (!admin) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, admin.password)
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı' })
    }

    // Check if admin is active
    if (admin.status !== 'active') {
      return res.status(403).json({ error: 'Hesabınız aktif değil' })
    }

    // Generate token
    const token = generateToken(
      {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: 'admin'
      },
      true // isAdmin
    )

    // Update last login
    await adminsCollection.updateOne(
      { _id: admin._id },
      { 
        $set: { 
          lastLogin: new Date(),
          lastIp: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        } 
      }
    )

    // Return success
    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        name: admin.name
      }
    })

  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
}

