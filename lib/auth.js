// Authentication Utilities
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin-fallback-secret-key-change-in-production'

// Token oluşturma
export function generateToken(payload, isAdmin = false) {
  const secret = isAdmin ? ADMIN_JWT_SECRET : JWT_SECRET
  return jwt.sign(payload, secret, { expiresIn: isAdmin ? '7d' : '30d' })
}

// Token doğrulama
export function verifyToken(token, isAdmin = false) {
  try {
    const secret = isAdmin ? ADMIN_JWT_SECRET : JWT_SECRET
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

// Şifre hash'leme
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Şifre karşılaştırma
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

// Token'dan kullanıcı bilgisi alma
export function getUserFromToken(req) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return null
    
    return verifyToken(token)
  } catch (error) {
    return null
  }
}

// Admin kontrolü
export function isAdmin(req) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return false
    
    const decoded = verifyToken(token, true)
    return decoded && decoded.role === 'admin'
  } catch (error) {
    return false
  }
}

// Middleware: Giriş gerekli
export function requireAuth(handler) {
  return async (req, res) => {
    const user = getUserFromToken(req)
    
    if (!user) {
      return res.status(401).json({ error: 'Giriş yapmanız gerekiyor' })
    }
    
    req.user = user
    return handler(req, res)
  }
}

// Middleware: Admin yetkisi gerekli
export function requireAdmin(handler) {
  return async (req, res) => {
    if (!isAdmin(req)) {
      return res.status(403).json({ error: 'Bu işlem için admin yetkisi gerekiyor' })
    }
    
    const user = getUserFromToken(req)
    req.user = user
    return handler(req, res)
  }
}

