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

        // Eski ürünler için productCode yoksa, en yüksek kodu bul ve bir sonraki numarayı ver
        let productCode = product.productCode
        if (!productCode) {
          // En yüksek productCode'u bul
          const allProducts = await productsCollection.find({}).toArray()
          const codesWithNumbers = allProducts
            .map(p => p.productCode)
            .filter(code => code && code.startsWith('DS-'))
            .map(code => {
              const num = parseInt(code.replace('DS-', ''))
              return isNaN(num) ? 0 : num
            })
          const maxNumber = codesWithNumbers.length > 0 ? Math.max(...codesWithNumbers) : 0
          const nextNumber = maxNumber + 1
          productCode = `DS-${nextNumber.toString().padStart(4, '0')}`
          
          // Eski ürünü güncelle
          await productsCollection.updateOne(
            { _id: product._id },
            { $set: { productCode: productCode } }
          )
        }
        
        const formattedProduct = {
          id: product._id.toString(),
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          originalPrice: product.originalPrice || null,
          category: product.category || '',
          brand: product.brand || product.category || '',
          image: product.image || '',
          images: product.images || [],
          stock: product.stock || 0,
          scale: product.scale || '',
          sku: product.sku || '',
          productCode: productCode,
          status: product.status || 'active',
          features: product.features || [],
          weight: product.weight || null,
          dimensions: product.dimensions || { length: null, width: null, height: null },
          seoTitle: product.seoTitle || '',
          seoDescription: product.seoDescription || '',
          tags: product.tags || [],
          createdAt: product.createdAt || new Date(),
          updatedAt: product.updatedAt || new Date()
        }

        return res.status(200).json({ success: true, product: formattedProduct })
      }

      // Get all products - sadece aktif olanları getir
      const products = await productsCollection.find({ status: 'active' }).sort({ createdAt: -1 }).limit(1000).toArray()

      // Eski ürünler için productCode yoksa, en yüksek kodu bul
      const allProductsForCode = await productsCollection.find({}).toArray()
      const codesWithNumbers = allProductsForCode
        .map(p => p.productCode)
        .filter(code => code && code.startsWith('DS-'))
        .map(code => {
          const num = parseInt(code.replace('DS-', ''))
          return isNaN(num) ? 0 : num
        })
      const maxNumber = codesWithNumbers.length > 0 ? Math.max(...codesWithNumbers) : 0
      let currentCodeNumber = maxNumber
      
      const formattedProducts = products.map((product) => {
        // Eski ürünler için productCode yoksa, sıralı numara ver
        let productCode = product.productCode
        if (!productCode) {
          currentCodeNumber++
          productCode = `DS-${currentCodeNumber.toString().padStart(4, '0')}`
          
          // Eski ürünü güncelle (async ama await etmeden)
          productsCollection.updateOne(
            { _id: product._id },
            { $set: { productCode: productCode } }
          ).catch(err => console.error('ProductCode update error:', err))
        }
        
        return {
          id: product._id.toString(),
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0,
          originalPrice: product.originalPrice || null,
          category: product.category || '',
          brand: product.brand || product.category || '',
          image: product.image || '',
          images: product.images || [],
          stock: product.stock || 0,
          scale: product.scale || '',
          sku: product.sku || '',
          productCode: productCode,
          status: product.status || 'active',
          features: product.features || [],
          weight: product.weight || null,
          dimensions: product.dimensions || { length: null, width: null, height: null },
          seoTitle: product.seoTitle || '',
          seoDescription: product.seoDescription || '',
          tags: product.tags || [],
          createdAt: product.createdAt || new Date(),
          updatedAt: product.updatedAt || new Date()
        }
      })

      res.status(200).json({ success: true, products: formattedProducts })
    } else if (req.method === 'POST') {
      // Create new product
      const { 
        name, 
        description, 
        price, 
        originalPrice,
        category, 
        brand,
        image, 
        images,
        stock,
        scale,
        sku,
        status,
        features,
        weight,
        dimensions,
        seoTitle,
        seoDescription,
        tags
      } = req.body

      if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' })
      }

      // Görselleri optimize et - sadece çok büyük base64 görselleri sınırla
      const optimizeImage = (img) => {
        if (!img) return '🚗'
        // Eğer base64 görsel ise
        if (img.startsWith('data:image')) {
          // Base64 görselin boyutunu kontrol et
          const base64Size = (img.length * 3) / 4
          // 2MB'dan büyükse sadece emoji kullan (Vercel limiti için)
          if (base64Size > 2000000) {
            console.warn('Görsel çok büyük, emoji kullanılıyor:', base64Size)
            return '🚗'
          }
          // Base64 görseli olduğu gibi döndür
          return img
        }
        // URL veya emoji ise olduğu gibi döndür
        return img
      }
      
      const optimizedImage = optimizeImage(image || '🚗')
      // Emoji'leri de dahil et, sadece boş olanları filtrele
      const optimizedImages = (images || []).map(optimizeImage).filter(img => img)
      
      // DS- ile başlayan benzersiz ürün kodu oluştur
      // Toplam ürün sayısını al ve bir sonraki numarayı oluştur
      const totalProducts = await productsCollection.countDocuments({})
      const productNumber = (totalProducts + 1).toString().padStart(4, '0')
      const productCode = `DS-${productNumber}`
      
      const newProduct = {
        name: name.trim(),
        description: (description || '').substring(0, 2000), // Limit description size
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        category: category || brand?.toLowerCase() || '',
        brand: brand || category || '',
        image: optimizedImage,
        images: optimizedImages,
        stock: parseInt(stock) || 0,
        scale: scale || '',
        sku: sku || '',
        productCode: productCode, // DS- ile başlayan kod
        status: status || 'active',
        features: (features || []).filter(f => f && f.trim() !== ''),
        weight: weight ? parseFloat(weight) : null,
        dimensions: dimensions || { length: null, width: null, height: null },
        seoTitle: (seoTitle || '').substring(0, 200),
        seoDescription: (seoDescription || '').substring(0, 500),
        tags: (tags || []).filter(t => t && t.trim() !== ''),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await productsCollection.insertOne(newProduct)

      // Response - görselleri olduğu gibi gönder
      const responseProduct = {
        id: result.insertedId.toString(),
        name: newProduct.name,
        description: newProduct.description || '',
        price: newProduct.price,
        originalPrice: newProduct.originalPrice,
        category: newProduct.category,
        brand: newProduct.brand,
        image: newProduct.image || '',
        images: newProduct.images || [],
        stock: newProduct.stock,
        scale: newProduct.scale,
        sku: newProduct.sku,
        productCode: newProduct.productCode, // DS- ile başlayan kod
        status: newProduct.status,
        features: newProduct.features || [],
        weight: newProduct.weight,
        dimensions: newProduct.dimensions,
        seoTitle: newProduct.seoTitle,
        seoDescription: newProduct.seoDescription,
        tags: newProduct.tags || []
      }

      res.status(201).json({
        success: true,
        product: responseProduct
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

