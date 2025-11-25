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
    
    // Get collections
    const usersCollection = db.collection('users')
    const productsCollection = db.collection('products')
    const ordersCollection = db.collection('orders')

    // Get statistics
    const [totalUsers, totalProducts, totalOrders, orders] = await Promise.all([
      usersCollection.countDocuments(),
      productsCollection.countDocuments(),
      ordersCollection.countDocuments(),
      ordersCollection.find({}).sort({ createdAt: -1 }).limit(5).toArray()
    ])

    // Calculate total revenue
    const revenueResult = await ordersCollection.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' }
        }
      }
    ]).toArray()

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0

    // Get top products
    const topProductsResult = await ordersCollection.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]).toArray()

    // Get product details for top products
    const topProducts = await Promise.all(
      topProductsResult.map(async (item) => {
        const product = await productsCollection.findOne({ _id: item._id })
        return {
          id: item._id.toString(),
          name: product?.name || 'Bilinmeyen Ürün',
          totalSold: item.totalSold,
          revenue: item.revenue
        }
      })
    )

    // Format recent orders
    const recentOrders = orders.map(order => ({
      id: order._id.toString(),
      orderNumber: order.orderNumber || order._id.toString(),
      customerName: order.customerName || 'Bilinmeyen Müşteri',
      total: order.total || 0,
      status: order.status || 'pending',
      createdAt: order.createdAt || new Date()
    }))

    res.status(200).json({
      success: true,
      stats: {
        totalRevenue: totalRevenue || 0,
        totalOrders: totalOrders || 0,
        totalProducts: totalProducts || 0,
        totalCustomers: totalUsers || 0,
        revenueChange: 0, // Can be calculated based on previous period
        ordersChange: 0,
        productsChange: 0,
        customersChange: 0
      },
      recentOrders: recentOrders || [],
      topProducts: topProducts || []
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

