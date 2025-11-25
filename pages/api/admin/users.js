import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ error: 'MongoDB connection not configured' })
    }

    const client = await clientPromise
    const db = client.db('dynsteel')
    const usersCollection = db.collection('users')

    // Get all users (excluding password)
    const users = await usersCollection.find({}, {
      projection: { password: 0 }
    }).sort({ registerDate: -1 }).toArray()

    // Format users for admin panel
    const formattedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.name || 'İsimsiz Kullanıcı',
      email: user.email || '',
      phone: user.phone || '',
      status: user.status || 'active',
      isVerified: user.isVerified || false,
      registerDate: user.registerDate || user.createdAt || new Date(),
      lastLogin: user.lastLogin || user.registerDate || user.createdAt || new Date(),
      totalOrders: user.totalOrders || 0,
      totalSpent: user.totalSpent || 0,
      address: user.address || '',
      orders: user.orders || [],
      notes: user.notes || ''
    }))

    res.status(200).json({ 
      success: true, 
      users: formattedUsers 
    })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}
