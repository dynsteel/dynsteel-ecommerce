import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'
import { useState } from 'react'
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
  Tag,
  Truck,
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
    scale: '',
    sku: '',
    status: 'active',
    features: [''],
    images: [],
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    seoTitle: '',
    seoDescription: '',
    tags: ['']
  })

  const [previewMode, setPreviewMode] = useState(false)

  const categories = [
    'Ferrari', 'BMW', 'Mercedes', 'Audi', 'Porsche', 
    'Volkswagen', 'Ford', 'Toyota', 'Honda', 'Renault',
    'Peugeot', 'Opel', 'Fiat', 'Seat', 'Skoda', 'Hyundai', 'Kia', 'Nissan'
  ]

  const scales = ['1:12', '1:18', '1:24', '1:32', '1:43', '1:64', '1:87']

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDimensionChange = (dimension, value) => {
    setProduct(prev => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value
      }
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    // Resimleri base64'e çevir
    files.forEach(file => {
      // Dosya boyutu kontrolü (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} çok büyük! Maksimum 2MB olmalı.`)
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setProduct(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }))
      }
      reader.readAsDataURL(file)
    })
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

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Ürün verisini hazırla
    const newProduct = {
      ...product,
      id: Date.now(), // Benzersiz ID
      price: parseFloat(product.price) || 0,
      originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
      stock: parseInt(product.stock) || 0,
      rating: 4.5,
      reviews: 0,
      inStock: parseInt(product.stock) > 0,
      image: product.images && product.images.length > 0 ? product.images[0] : '🚗', // İlk resmi veya varsayılan emoji
      images: product.images || [],
      category: product.brand.toLowerCase() // Brand'i category olarak kullan
    }
    
    // Save to MongoDB via API
    try {
      setSaving(true)
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.brand.toLowerCase(),
          image: product.images && product.images.length > 0 ? product.images[0] : '🚗',
          stock: product.stock
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ürün eklenemedi')
      }

      alert('Ürün başarıyla eklendi!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error saving product:', error)
      alert(error.message || 'Ürün eklenirken bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Remove old handleSave function - replaced above
  const oldHandleSave = () => {
    // Formu temizle
    setProduct({
      name: '',
      description: '',
      category: '',
      brand: '',
      price: '',
      originalPrice: '',
        stock: '',
        scale: '',
        sku: '',
        status: 'active',
        features: [''],
        images: [],
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        seoTitle: '',
        seoDescription: '',
        tags: ['']
      })
      
      // Ürünler sayfasına yönlendir
      window.location.href = '/admin/products'
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
              <h1 className="text-3xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
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
              <span>Ürünü Kaydet</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ölçek</label>
                  <select
                    value={product.scale}
                    onChange={(e) => handleInputChange('scale', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Ölçek Seçin</option>
                    {scales.map(scale => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
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

            {/* SEO */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-orange-600" />
                SEO ve Etiketler
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Başlığı</label>
                  <input
                    type="text"
                    value={product.seoTitle}
                    onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ferrari F40 Minyatür - Detaylı 1:18 Ölçek"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SEO Açıklaması</label>
                  <textarea
                    value={product.seoDescription}
                    onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ferrari F40 minyatür arabası, 1:18 ölçek, detaylı metal kasa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                  {product.tags.map((tag, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange('tags', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ferrari, spor araba, kırmızı"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('tags', index)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags')}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mt-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Etiket Ekle</span>
                  </button>
                </div>
              </div>
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
                      <p className="text-xs text-gray-500">PNG, JPG, GIF - Max 2MB</p>
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

            {/* Boyutlar */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                Kargo Bilgileri
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ağırlık (gr)</label>
                  <input
                    type="number"
                    value={product.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="250"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Boyutlar (cm)</label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      value={product.dimensions.length}
                      onChange={(e) => handleDimensionChange('length', e.target.value)}
                      className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="L"
                    />
                    <input
                      type="number"
                      value={product.dimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                      className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="W"
                    />
                    <input
                      type="number"
                      value={product.dimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                      className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="H"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
