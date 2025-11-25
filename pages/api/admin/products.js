import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MongoDB connection not configured' })
  }

  try {
    const client = await clientPromise
    const db = client.db('dynsteel')
    const productsCollection = db.collection('products')

    if (req.method === 'GET') {
      const { id } = req.query

      if (id) {
        // Get single product
        const { ObjectId } = require('mongodb')
        const product = await productsCollection.findOne({ _id: new ObjectId(id) })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' })
        }

        const formattedProduct = {
          id: product._id.toString(),
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          category: product.category || '',
          image: product.image || '',
          stock: product.stock || 0,
          status: product.status || 'active',
          createdAt: product.createdAt || new Date(),
          updatedAt: product.updatedAt || new Date()
        }

        return res.status(200).json({ success: true, product: formattedProduct })
      }

      // Get all products
      const products = await productsCollection.find({}).sort({ createdAt: -1 }).toArray()

      const formattedProducts = products.map(product => ({
        id: product._id.toString(),
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        category: product.category || '',
        image: product.image || '',
        stock: product.stock || 0,
        status: product.status || 'active',
        createdAt: product.createdAt || new Date(),
        updatedAt: product.updatedAt || new Date()
      }))

      res.status(200).json({ success: true, products: formattedProducts })
    } else if (req.method === 'POST') {
      // Create new product
      const { name, description, price, category, image, stock } = req.body

      if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' })
      }

      const newProduct = {
        name: name.trim(),
        description: description || '',
        price: parseFloat(price),
        category: category || '',
        image: image || '',
        stock: parseInt(stock) || 0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await productsCollection.insertOne(newProduct)

      res.status(201).json({
        success: true,
        product: {
          id: result.insertedId.toString(),
          ...newProduct
        }
      })
    } else if (req.method === 'PUT') {
      // Update product
      const { id, ...updateData } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' })
      }

      const { ObjectId } = require('mongodb')
      const updateFields = {
        ...updateData,
        updatedAt: new Date()
      }

      // Remove undefined fields
      Object.keys(updateFields).forEach(key => {
        if (updateFields[key] === undefined) {
          delete updateFields[key]
        }
      })

      const result = await productsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Product not found' })
      }

      res.status(200).json({ success: true, message: 'Product updated successfully' })
    } else if (req.method === 'DELETE') {
      // Delete product
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Product ID is required' })
      }

      const { ObjectId } = require('mongodb')
      const result = await productsCollection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Product not found' })
      }

      res.status(200).json({ success: true, message: 'Product deleted successfully' })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Products API error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

