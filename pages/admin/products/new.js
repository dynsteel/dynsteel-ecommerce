import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  ArrowLeft,
  Save,
  Upload,
  Plus,
  X,
  Package,
  DollarSign,
  Hash,
  FileText,
  Eye
} from 'lucide-react'

export default function NewProduct() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    status: 'active',
    features: [''],
    images: []
  })

  const [previewMode, setPreviewMode] = useState(false)

  const categories = [
    'Ferrari', 'BMW', 'Mercedes', 'Audi', 'Porsche', 
    'Volkswagen', 'Ford', 'Toyota', 'Honda', 'Renault',
    'Peugeot', 'Opel', 'Fiat', 'Seat', 'Skoda', 'Hyundai', 'Kia', 'Nissan'
  ]


  // URL'den kategori parametresini al
  useEffect(() => {
    if (router.query.category) {
      setProduct(prev => ({
        ...prev,
        category: router.query.category,
        brand: router.query.category
      }))
    }
  }, [router.query.category])

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field, index, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setProduct(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setProduct(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // Görsel optimizasyon fonksiyonu
  const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Boyutları optimize et
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = (height * maxWidth) / width
              width = maxWidth
            } else {
              width = (width * maxHeight) / height
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)

          // JPEG formatında sıkıştır
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
          resolve(compressedBase64)
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    
    // Resimleri optimize et ve URL'ye çevir
    for (const file of files) {
      // Dosya boyutu kontrolü (max 5MB - optimize edilecek)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} çok büyük! Maksimum 5MB olmalı. Lütfen görseli küçültün veya URL kullanın.`)
        continue
      }
      
      try {
        // Görseli optimize et
        let compressedBase64 = await compressImage(file, 1200, 1200, 0.85)
        
        // Base64 boyutunu kontrol et (max 1MB base64 = ~750KB dosya)
        let base64Size = (compressedBase64.length * 3) / 4
        if (base64Size > 1000000) { // 1MB'dan büyükse daha fazla sıkıştır
          compressedBase64 = await compressImage(file, 800, 800, 0.7)
          base64Size = (compressedBase64.length * 3) / 4
        }
        
        // ÖNEMLİ: TÜM görselleri (küçük olsa bile) URL'ye çevir - base64 hiç saklama!
        // Bu sayede request body boyutu küçük kalır
        try {
          const uploadResponse = await fetch('/api/admin/upload-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: compressedBase64 }),
          })

          const uploadData = await uploadResponse.json()
          
          if (uploadData.success && uploadData.url && !uploadData.url.startsWith('data:image')) {
            // URL başarıyla alındı - sadece URL'yi sakla
            setProduct(prev => ({
              ...prev,
              images: [...prev.images, uploadData.url]
            }))
          } else {
            // URL alınamadı, emoji kullan (base64 kullanma!)
            console.warn('Görsel URL\'ye çevrilemedi, emoji kullanılıyor')
            setProduct(prev => ({
              ...prev,
              images: [...prev.images, '🚗']
            }))
          }
        } catch (uploadError) {
          console.error('URL dönüştürme hatası:', uploadError)
          // Hata durumunda emoji kullan (base64 kullanma!)
          setProduct(prev => ({
            ...prev,
            images: [...prev.images, '🚗']
          }))
        }
      } catch (error) {
        console.error('Görsel optimizasyon hatası:', error)
        alert(`${file.name} yüklenirken bir hata oluştu. Lütfen tekrar deneyin.`)
      }
    }
  }

  const handleImageUrlAdd = () => {
    const url = prompt('Resim URL\'sini girin:')
    if (url && url.trim()) {
      setProduct(prev => ({
        ...prev,
        images: [...prev.images, url.trim()]
      }))
    }
  }

  const removeImage = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validasyonu
    if (!product.name || !product.name.trim()) {
      alert('Lütfen ürün adını girin!')
      return
    }
    
    if (!product.price || parseFloat(product.price) <= 0) {
      alert('Lütfen geçerli bir fiyat girin!')
      return
    }
    
    if (!product.category) {
      alert('Lütfen bir kategori seçin!')
      return
    }
    
    if (!product.stock || parseInt(product.stock) < 0) {
      alert('Lütfen geçerli bir stok miktarı girin!')
      return
    }
    
    // Save to MongoDB via API
    try {
      setSaving(true)
      
      // Görselleri optimize et - base64 görselleri URL'ye çevir veya emoji'ye çevir
      // ÖNEMLİ: TÜM base64 görselleri URL'ye çevir - hiç base64 gönderme!
      const optimizeImages = async (images) => {
        const optimized = []
        
        for (const img of images || []) {
          // Eğer base64 görsel ise - MUTLAKA URL'ye çevir
          if (img && img.startsWith('data:image')) {
            // Base64 görselin boyutunu kontrol et
            const base64Size = (img.length * 3) / 4
            
            // 500KB'dan büyükse direkt emoji'ye çevir (çok büyük, yükleme başarısız olabilir)
            if (base64Size > 500000) {
              console.warn('Görsel çok büyük, emoji kullanılıyor:', base64Size)
              optimized.push('🚗')
              continue
            }
            
            // TÜM base64 görselleri URL'ye çevirmeyi dene (küçük olsa bile)
            try {
              const uploadResponse = await fetch('/api/admin/upload-image', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: img }),
              })
              
              const uploadData = await uploadResponse.json()
              if (uploadData.success && uploadData.url && !uploadData.url.startsWith('data:image')) {
                optimized.push(uploadData.url)
                continue
              }
            } catch (e) {
              console.error('URL dönüştürme hatası:', e)
            }
            // Başarısız olursa emoji kullan (base64 kullanma!)
            optimized.push('🚗')
            continue
          } else {
            // URL veya emoji ise olduğu gibi gönder
            optimized.push(img)
          }
        }
        
        return optimized
      }
      
      const optimizedImages = await optimizeImages(product.images || [])
      const mainImage = optimizedImages.length > 0 ? optimizedImages[0] : '🚗'
      
      // Request body boyutunu kontrol et
      const requestBody = {
        name: (product.name || '').trim(),
        description: (product.description || '').substring(0, 2000), // Açıklamayı sınırla
        price: parseFloat(product.price) || 0,
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
        category: product.category || product.brand?.toLowerCase() || '',
        brand: product.brand || product.category || '',
        image: mainImage,
        images: optimizedImages,
        stock: parseInt(product.stock) || 0,
        sku: product.sku || '',
        status: product.status || 'active',
        features: product.features.filter(f => f && f.trim() !== '') || []
      }
      
      // Son kontrol - name ve price boş olmamalı
      if (!requestBody.name || requestBody.name.trim() === '') {
        alert('Ürün adı gerekli!')
        setSaving(false)
        return
      }
      
      if (!requestBody.price || requestBody.price <= 0) {
        alert('Geçerli bir fiyat gerekli!')
        setSaving(false)
        return
      }
      
      const requestBodyString = JSON.stringify(requestBody)
      const requestSize = new Blob([requestBodyString]).size
      
      // 3MB'dan büyükse hata ver (güvenli limit)
      if (requestSize > 3 * 1024 * 1024) {
        alert('Ürün verisi çok büyük (' + (requestSize / 1024 / 1024).toFixed(2) + 'MB)! Lütfen görselleri URL olarak ekleyin veya daha küçük görseller kullanın.')
        setSaving(false)
        return
      }
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice || null,
          category: product.category || product.brand?.toLowerCase() || '',
          brand: product.brand || product.category || '',
          image: mainImage,
          images: optimizedImages,
          stock: parseInt(product.stock) || 0,
          sku: product.sku || '',
          status: product.status || 'active',
          features: product.features.filter(f => f.trim() !== '') || []
        })
      })

      // Response'u text olarak al, sonra parse et
      const responseText = await response.text()
      
      if (!response.ok) {
        let errorMessage = 'Ürün eklenemedi'
        
        // Vercel body limit hatası kontrolü
        if (responseText.includes('Body exceeded') || responseText.includes('Body excee') || responseText.includes('413') || responseText.includes('Payload')) {
          errorMessage = 'Ürün verisi çok büyük! Lütfen görselleri URL olarak ekleyin veya daha küçük görseller kullanın. (Maksimum 4MB)'
        } else {
          try {
            const errorData = JSON.parse(responseText)
            // Hata mesajını Türkçe'ye çevir
            if (errorData.error === 'Name and price are required') {
              errorMessage = 'Ürün adı ve fiyat gerekli! Lütfen tüm zorunlu alanları doldurun.'
            } else {
              errorMessage = errorData.error || errorMessage
            }
          } catch (e) {
            // JSON değilse direkt mesajı göster
            if (responseText.length > 0 && responseText.length < 500) {
              errorMessage = responseText
            } else {
              errorMessage = `Sunucu hatası: ${response.status} ${response.statusText}`
            }
          }
        }
        throw new Error(errorMessage)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (e) {
        console.error('JSON parse hatası:', e, 'Response:', responseText.substring(0, 200))
        // Eğer response JSON değilse ama başarılıysa, muhtemelen body limit hatası
        if (responseText.includes('Body exceeded') || responseText.includes('Body excee')) {
          throw new Error('Ürün verisi çok büyük! Lütfen görselleri URL olarak ekleyin veya daha küçük görseller kullanın.')
        }
        throw new Error('Sunucudan geçersiz yanıt alındı')
      }

      alert('Minyatür araba başarıyla eklendi!')
      router.push('/products')
    } catch (error) {
      console.error('Error saving product:', error)
      alert(error.message || 'Ürün eklenirken bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const generateSKU = () => {
    const sku = `${product.brand?.substring(0, 3).toUpperCase() || 'PRD'}-${Date.now().toString().slice(-6)}`
    handleInputChange('sku', sku)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/products">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Minyatür Arabaları Ekle</h1>
              <p className="text-gray-600">Koleksiyonunuza yeni bir minyatür araba ekleyin</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>{previewMode ? 'Düzenleme' : 'Önizleme'}</span>
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Minyatür Arabayı Kaydet</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ana Bilgiler */}
          <div className="lg:col-span-2 space-y-6">
            {/* Temel Bilgiler */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-blue-600" />
                Temel Bilgiler
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Adı *</label>
                  <input
                    type="text"
                    required
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ferrari F40 Minyatür"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                  <select
                    required
                    value={product.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marka</label>
                  <input
                    type="text"
                    value={product.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ferrari"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={product.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="FER-123456"
                    />
                    <button
                      type="button"
                      onClick={generateSKU}
                      className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                    >
                      <Hash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                <textarea
                  value={product.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ürün açıklamasını buraya yazın..."
                />
              </div>
            </div>

            {/* Fiyat ve Stok */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Fiyat ve Stok
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Satış Fiyatı (₺) *</label>
                  <input
                    type="number"
                    required
                    value={product.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="899"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eski Fiyat (₺)</label>
                  <input
                    type="number"
                    value={product.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1299"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stok Adedi *</label>
                  <input
                    type="number"
                    required
                    value={product.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="15"
                  />
                </div>
              </div>
            </div>

            {/* Özellikler */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Ürün Özellikleri
              </h2>
              
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Metal kasa, Açılır kapılar"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mt-2"
              >
                <Plus className="h-4 w-4" />
                <span>Özellik Ekle</span>
              </button>
            </div>

          </div>

          {/* Yan Panel */}
          <div className="space-y-6">
            {/* Durum */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yayın Durumu</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={product.status === 'active'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Aktif</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={product.status === 'draft'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Taslak</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={product.status === 'inactive'}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Pasif</span>
                </label>
              </div>
            </div>

            {/* Görseller */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h3>
              
              <div className="space-y-4">
                {/* Dosya Yükleme */}
                <div>
                  <label className="block w-full">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700 mb-1">Dosya Yükle</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF - Max 5MB (otomatik optimize edilir)</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>

                {/* URL Ekleme Butonu */}
                <button
                  type="button"
                  onClick={handleImageUrlAdd}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span className="font-medium">URL ile Resim Ekle</span>
                </button>

                {/* Emoji Seçici */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Veya Emoji Seç:</p>
                  <div className="flex flex-wrap gap-2">
                    {['🏎️', '🚗', '🚙', '🏁', '🚘', '🚕', '🚓', '🚑', '🚒', '🚐', '🛻', '🚛'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setProduct(prev => ({ ...prev, images: [...prev.images, emoji] }))}
                        className="text-3xl hover:scale-125 transition-transform p-2 hover:bg-gray-100 rounded-lg"
                        title="Emoji ekle"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Yüklenen Görseller */}
                {product.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Yüklenen Görseller ({product.images.length})
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="w-full h-28 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                            {image.length <= 2 ? (
                              // Emoji
                              <div className="w-full h-full flex items-center justify-center text-5xl">
                                {image}
                              </div>
                            ) : (
                              // Resim
                              <img
                                src={image}
                                alt={`Ürün görseli ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EHata%3C/text%3E%3C/svg%3E'
                                }}
                              />
                            )}
                          </div>
                          {index === 0 && (
                            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              Ana
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700"
                            title="Sil"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 İlk görsel ana ürün görseli olarak kullanılacak
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
