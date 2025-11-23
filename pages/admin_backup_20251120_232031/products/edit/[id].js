import AdminLayout from '../../../../components/AdminLayout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Save,
  X,
  Upload,
  AlertCircle,
  CheckCircle,
  Package,
  DollarSign,
  Tag,
  FileText,
  Plus,
  Trash2,
  Eye,
  Hash,
  Truck
} from 'lucide-react'

export default function EditProduct() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    originalPrice: '',
    stock: '',
    scale: '',
    description: '',
    features: [''],
    status: 'active',
    image: '',
    images: []
  })

  const categories = [
    'Ferrari', 'BMW', 'Mercedes', 'Porsche', 'Audi', 'Volkswagen',
    'Toyota', 'Honda', 'Ford', 'Renault', 'Peugeot', 'Opel',
    'Lamborghini', 'McLaren', 'Bugatti', 'Koenigsegg', 'Pagani'
  ]

  const scales = ['1:18', '1:24', '1:32', '1:43', '1:64']
  const statuses = [
    { value: 'active', label: 'Aktif', color: 'green' },
    { value: 'inactive', label: 'Pasif', color: 'gray' },
    { value: 'out_of_stock', label: 'Stokta Yok', color: 'red' },
    { value: 'low_stock', label: 'Az Stok', color: 'yellow' }
  ]

  useEffect(() => {
    if (id && typeof window !== 'undefined') {
      // localStorage'dan ürünü yükle
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      const foundProduct = adminProducts.find(p => p.id === parseInt(id))
      
      if (foundProduct) {
        setProduct({
          id: foundProduct.id,
          name: foundProduct.name || '',
          category: foundProduct.category || foundProduct.brand || '',
          brand: foundProduct.brand || '',
          price: foundProduct.price?.toString() || '',
          originalPrice: foundProduct.originalPrice?.toString() || '',
          stock: foundProduct.stock?.toString() || '0',
          scale: foundProduct.scale || '',
          description: foundProduct.description || '',
          features: foundProduct.features || [],
          status: foundProduct.status || 'active',
          image: foundProduct.image || '🚗',
          images: foundProduct.images || (foundProduct.image ? [foundProduct.image] : [])
        })
      } else {
        // Demo ürün verisi
        const demoProduct = {
          id: parseInt(id),
          name: 'Ferrari F40 Minyatür Araba',
          category: 'Ferrari',
          brand: 'Ferrari',
          price: '899',
          originalPrice: '1199',
          stock: '15',
          scale: '1:18',
          description: 'Ferrari F40, 1987-1992 yılları arasında üretilen efsanevi süper spor arabadır. Bu minyatür model, orijinal F40\'ın her detayını kusursuz şekilde yansıtmaktadır.',
          features: [
            'Die-cast metal gövde',
            'Açılabilen kapılar',
            'Detaylı iç mekan',
            'Gerçek kauçuk lastikler'
          ],
          status: 'active',
          image: '🏎️'
        }
        setProduct(demoProduct)
      }
      setLoading(false)
    }
  }, [id])

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Hata temizle
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...product.features]
    newFeatures[index] = value
    setProduct(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setProduct(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setProduct(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
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
          images: Array.isArray(prev.images) ? [...prev.images, reader.result] : [reader.result]
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
        images: Array.isArray(prev.images) ? [...prev.images, url.trim()] : [url.trim()]
      }))
    }
  }

  const removeImage = (index) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addEmoji = (emoji) => {
    setProduct(prev => ({
      ...prev,
      images: Array.isArray(prev.images) ? [...prev.images, emoji] : [emoji]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!product.name.trim()) newErrors.name = 'Ürün adı gerekli'
    if (!product.category) newErrors.category = 'Kategori seçimi gerekli'
    if (!product.brand.trim()) newErrors.brand = 'Marka gerekli'
    if (!product.price || parseFloat(product.price) <= 0) newErrors.price = 'Geçerli bir fiyat girin'
    if (!product.stock || parseInt(product.stock) < 0) newErrors.stock = 'Geçerli bir stok miktarı girin'
    if (!product.scale) newErrors.scale = 'Ölçek seçimi gerekli'
    if (!product.description.trim()) newErrors.description = 'Açıklama gerekli'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSaving(true)
    
    // localStorage'a kaydet
    if (typeof window !== 'undefined') {
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      const productIndex = adminProducts.findIndex(p => p.id === product.id)
      
      const updatedProduct = {
        ...product,
        price: parseFloat(product.price),
        originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : null,
        stock: parseInt(product.stock),
        rating: product.rating || 4.5,
        reviews: product.reviews || 0,
        inStock: parseInt(product.stock) > 0,
        image: product.images && product.images.length > 0 ? product.images[0] : product.image,
        images: product.images || []
      }
      
      if (productIndex !== -1) {
        // Mevcut ürünü güncelle
        adminProducts[productIndex] = updatedProduct
      } else {
        // Yeni ürün ekle (bulunamazsa)
        adminProducts.push(updatedProduct)
      }
      
      localStorage.setItem('adminProducts', JSON.stringify(adminProducts))
      
      setTimeout(() => {
        setSaving(false)
        alert('Ürün başarıyla güncellendi!')
        router.push('/admin/products')
      }, 500)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ürün yükleniyor...</p>
          </div>
        </div>
      </AdminLayout>
    )
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
              <h1 className="text-3xl font-bold text-gray-900">Ürün Düzenle</h1>
              <p className="text-gray-600">Ürün bilgilerini güncelleyin</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link href="/admin/products">
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <X className="h-4 w-4" />
                <span>İptal</span>
              </button>
            </Link>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
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
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ürün Adı *
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ürün adını girin"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori *
                    </label>
                    <select
                      value={product.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Kategori seçin</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marka *
                    </label>
                    <input
                      type="text"
                      value={product.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.brand ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Marka adını girin"
                    />
                    {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama *
                  </label>
                  <textarea
                    value={product.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ürün açıklamasını girin"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Satış Fiyatı (₺) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eski Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={product.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-500 mt-1">İndirim göstermek için</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stok Miktarı *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                </div>
              </div>
            </div>

            {/* Özellikler */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Ürün Özellikleri
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ölçek *
                  </label>
                  <select
                    value={product.scale}
                    onChange={(e) => handleInputChange('scale', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.scale ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Ölçek seçin</option>
                    {scales.map(scale => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
                  {errors.scale && <p className="text-red-500 text-xs mt-1">{errors.scale}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Öne Çıkan Özellikler
                  </label>
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Özellik girin"
                        />
                        {product.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Özellik Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yan Panel */}
          <div className="space-y-6">
            {/* Ürün Görselleri */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h3>
              
              <div className="space-y-4">
                {/* Dosya Yükleme */}
                <div>
                  <label className="block w-full">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700 mb-1">Dosya Yükle</p>
                      <p className="text-xs text-gray-500">Max 2MB</p>
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
                  className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>URL Ekle</span>
                </button>

                {/* Emoji Seçici */}
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Emoji:</p>
                  <div className="grid grid-cols-4 gap-1">
                    {['🏎️', '🚗', '🚙', '🏁', '🚘', '🚕', '🚓', '🚐'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => addEmoji(emoji)}
                        className="text-2xl hover:scale-110 transition-transform p-1 hover:bg-gray-100 rounded"
                        title="Emoji ekle"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Yüklenen Görseller */}
                {product.images && product.images.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Görseller ({product.images.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="w-full h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            {image.length <= 2 ? (
                              <div className="w-full h-full flex items-center justify-center text-3xl">
                                {image}
                              </div>
                            ) : (
                              <img
                                src={image}
                                alt={`Görsel ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EX%3C/text%3E%3C/svg%3E'
                                }}
                              />
                            )}
                          </div>
                          {index === 0 && (
                            <div className="absolute top-0.5 left-0.5 bg-blue-600 text-white text-xs px-1 rounded">
                              Ana
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Sil"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Durum */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ürün Durumu</h3>
              
              <div className="space-y-3">
                {statuses.map(status => (
                  <label key={status.value} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={product.status === status.value}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 bg-${status.color}-500`}></span>
                      {status.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Kaydet/İptal */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  <span>{saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}</span>
                </button>
                
                <Link href="/admin/products">
                  <button
                    type="button"
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="h-5 w-5" />
                    <span>İptal</span>
                  </button>
                </Link>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    Değişiklikler kaydedildikten sonra hemen yayına alınacaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
