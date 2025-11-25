import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MongoDB connection not configured' })
  }

  try {
    const client = await clientPromise
    const db = client.db('dynsteel')
    const ordersCollection = db.collection('orders')

    if (req.method === 'GET') {
      // Get all orders
      const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray()

      const formattedOrders = orders.map(order => ({
        id: order._id.toString(),
        orderNumber: order.orderNumber || order._id.toString(),
        customerName: order.customerName || '',
        customerEmail: order.customerEmail || '',
        customerPhone: order.customerPhone || '',
        items: order.items || [],
        total: order.total || 0,
        status: order.status || 'pending',
        shippingAddress: order.shippingAddress || {},
        paymentMethod: order.paymentMethod || '',
        createdAt: order.createdAt || new Date(),
        updatedAt: order.updatedAt || new Date()
      }))

      res.status(200).json({ success: true, orders: formattedOrders })
    } else if (req.method === 'POST') {
      // Create new order
      const { customerName, customerEmail, customerPhone, items, total, shippingAddress, paymentMethod } = req.body

      if (!customerName || !customerEmail || !items || items.length === 0 || !total) {
        return res.status(400).json({ error: 'Required fields are missing' })
      }

      const newOrder = {
        orderNumber: `ORD-${Date.now()}`,
        customerName: customerName.trim(),
        customerEmail: customerEmail.toLowerCase().trim(),
        customerPhone: customerPhone || '',
        items: items,
        total: parseFloat(total),
        status: 'pending',
        shippingAddress: shippingAddress || {},
        paymentMethod: paymentMethod || '',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await ordersCollection.insertOne(newOrder)

      res.status(201).json({
        success: true,
        order: {
          id: result.insertedId.toString(),
          ...newOrder
        }
      })
    } else if (req.method === 'PUT') {
      // Update order status
      const { id, status } = req.body

      if (!id || !status) {
        return res.status(400).json({ error: 'Order ID and status are required' })
      }

      const { ObjectId } = require('mongodb')
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Order not found' })
      }

      res.status(200).json({ success: true, message: 'Order updated successfully' })
    } else if (req.method === 'DELETE') {
      // Delete order
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Order ID is required' })
      }

      const { ObjectId } = require('mongodb')
      const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Order not found' })
      }

      res.status(200).json({ success: true, message: 'Order deleted successfully' })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Orders API error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

