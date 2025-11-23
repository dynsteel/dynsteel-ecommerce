// API Route: Products List
import { getCollection } from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req, res) {
  try {
    const productsCollection = await getCollection('products')

    // GET - Ürünleri listele
    if (req.method === 'GET') {
      const { 
        category, 
        search, 
        sort = 'newest',
        page = 1,
        limit = 12,
        minPrice,
        maxPrice
      } = req.query

      // Build filter
      let filter = { status: 'active' }
      
      if (category && category !== 'all') {
        filter.category = category
      }
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } }
        ]
      }

      if (minPrice || maxPrice) {
        filter.price = {}
        if (minPrice) filter.price.$gte = parseFloat(minPrice)
        if (maxPrice) filter.price.$lte = parseFloat(maxPrice)
      }

      // Build sort
      let sortOption = {}
      switch(sort) {
        case 'price-asc':
          sortOption = { price: 1 }
          break
        case 'price-desc':
          sortOption = { price: -1 }
          break
        case 'name':
          sortOption = { name: 1 }
          break
        case 'newest':
        default:
          sortOption = { createdAt: -1 }
      }

      // Pagination
      const skip = (parseInt(page) - 1) * parseInt(limit)
      
      const products = await productsCollection
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray()

      const total = await productsCollection.countDocuments(filter)

      return res.status(200).json({
        success: true,
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        }
      })
    }

    // POST - Yeni ürün ekle (Admin only)
    if (req.method === 'POST') {
      return requireAdmin(async (req, res) => {
        const productData = req.body

        // Validation
        if (!productData.name || !productData.price) {
          return res.status(400).json({ error: 'Ürün adı ve fiyat gereklidir' })
        }

        const newProduct = {
          ...productData,
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          views: 0,
          sales: 0
        }

        const result = await productsCollection.insertOne(newProduct)

        return res.status(201).json({
          success: true,
          product: { ...newProduct, _id: result.insertedId }
        })
      })(req, res)
    }

    return res.status(405).json({ error: 'Method not allowed' })

  } catch (error) {
    console.error('Products API error:', error)
    res.status(500).json({ error: 'Sunucu hatası' })
  }
}

