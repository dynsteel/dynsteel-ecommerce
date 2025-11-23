// API Route: Create Order
import { getCollection } from '../../../lib/db'
import { getUserFromToken } from '../../../lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { 
      items, 
      customerInfo, 
      billingAddress, 
      shippingAddress,
      paymentMethod,
      notes 
    } = req.body

    // Validation
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Sepet boş olamaz' })
    }

    if (!customerInfo || !billingAddress) {
      return res.status(400).json({ error: 'Müşteri bilgileri eksik' })
    }

    // Get user if logged in
    const user = getUserFromToken(req)

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 500 ? 0 : 50
    const tax = subtotal * 0.20 // KDV %20
    const total = subtotal + shipping + tax

    // Generate order number
    const orderNumber = 'DS' + Date.now().toString().slice(-8)

    // Create order
    const ordersCollection = await getCollection('orders')
    const newOrder = {
      orderNumber,
      userId: user?.id || null,
      status: 'pending',
      paymentStatus: 'pending',
      items,
      customerInfo,
      billingAddress,
      shippingAddress: shippingAddress || billingAddress,
      paymentMethod: paymentMethod || 'bank_transfer',
      notes: notes || '',
      totals: {
        subtotal,
        shipping,
        tax,
        total
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      tracking: {
        ordered: new Date(),
        processed: null,
        shipped: null,
        delivered: null
      }
    }

    const result = await ordersCollection.insertOne(newOrder)

    // Update product stock (if needed)
    const productsCollection = await getCollection('products')
    for (const item of items) {
      await productsCollection.updateOne(
        { _id: item.id },
        { 
          $inc: { 
            stock: -item.quantity,
            sales: item.quantity 
          } 
        }
      )
    }

    // Send order confirmation email (implement later)
    // await sendOrderConfirmationEmail(customerInfo.email, newOrder)

    return res.status(201).json({
      success: true,
      order: {
        id: result.insertedId,
        orderNumber,
        total,
        status: 'pending'
      }
    })

  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ error: 'Sipariş oluşturulurken hata oluştu' })
  }
}

