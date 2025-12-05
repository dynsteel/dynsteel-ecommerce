// API Route: Admin Notifications
import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MongoDB connection not configured' })
  }

  try {
    const client = await clientPromise
    const db = client.db('dynsteel')
    
    const contactsCollection = db.collection('contacts')
    const ordersCollection = db.collection('orders')
    const usersCollection = db.collection('users')

    if (req.method === 'GET') {
      const { lastCheck } = req.query
      const lastCheckDate = lastCheck ? new Date(lastCheck) : new Date(Date.now() - 24 * 60 * 60 * 1000) // Son 24 saat

      // Yeni mesajlar
      const newMessages = await contactsCollection.countDocuments({
        status: 'new',
        createdAt: { $gte: lastCheckDate }
      })

      // Son mesajlar (son 10)
      const recentMessages = await contactsCollection.find({
        status: 'new'
      }).sort({ createdAt: -1 }).limit(10).toArray()

      // Yeni siparişler
      const newOrders = await ordersCollection.countDocuments({
        status: 'pending',
        createdAt: { $gte: lastCheckDate }
      })

      // Son siparişler (son 10)
      const recentOrders = await ordersCollection.find({
        status: 'pending'
      }).sort({ createdAt: -1 }).limit(10).toArray()

      // Yeni kullanıcılar
      const newUsers = await usersCollection.countDocuments({
        createdAt: { $gte: lastCheckDate }
      })

      // Son kullanıcılar (son 10)
      const recentUsers = await usersCollection.find({
        createdAt: { $gte: lastCheckDate }
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray()

      // Toplam yeni bildirim sayısı
      const totalNotifications = newMessages + newOrders + newUsers

      // Bildirim listesi
      const notifications = []

      // Mesaj bildirimleri
      recentMessages.forEach(msg => {
        notifications.push({
          id: msg._id.toString(),
          type: 'message',
          title: 'Yeni Mesaj',
          message: `${msg.name} size mesaj gönderdi`,
          data: {
            name: msg.name,
            email: msg.email,
            subject: msg.subject
          },
          createdAt: msg.createdAt,
          link: `/admin/messages`
        })
      })

      // Sipariş bildirimleri
      recentOrders.forEach(order => {
        notifications.push({
          id: order._id.toString(),
          type: 'order',
          title: 'Yeni Sipariş',
          message: `${order.customerName || 'Müşteri'} yeni bir sipariş verdi (₺${(order.total || 0).toLocaleString('tr-TR')})`,
          data: {
            orderNumber: order.orderNumber || order._id.toString(),
            total: order.total || 0
          },
          createdAt: order.createdAt,
          link: `/admin/orders`
        })
      })

      // Kullanıcı bildirimleri
      recentUsers.forEach(user => {
        notifications.push({
          id: user._id.toString(),
          type: 'user',
          title: 'Yeni Kullanıcı',
          message: `${user.name || user.email} hesap oluşturdu`,
          data: {
            name: user.name,
            email: user.email
          },
          createdAt: user.createdAt,
          link: `/admin/users`
        })
      })

      // Tarihe göre sırala (en yeni önce)
      notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      res.status(200).json({
        success: true,
        counts: {
          messages: newMessages,
          orders: newOrders,
          users: newUsers,
          total: totalNotifications
        },
        notifications: notifications.slice(0, 20) // Son 20 bildirim
      })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Notifications API error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

