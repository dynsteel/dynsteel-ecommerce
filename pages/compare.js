import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  X,
  Check,
  Plus,
  Scale,
  Package,
  Tag,
  Heart,
  Share2,
  Eye
} from 'lucide-react'

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState([])
  const [addedItems, setAddedItems] = useState(new Set())
  const { addToCart } = useCart()

  useEffect(() => {
    // Demo karşılaştırma ürünleri (gerçek uygulamada localStorage veya context'ten gelir)
    const demoCompareItems = [
      {
        id: 1,
        name: 'Ferrari F40 Minyatür Araba',
        price: 899,
        originalPrice: 1199,
        image: '🏎️',
        rating: 4.9,
        reviews: 124,
        inStock: true,
        brand: 'Ferrari',
        scale: '1:18',
        material: 'Die-cast Metal',
        color: 'Kırmızı',
        weight: '850g',
        dimensions: '24 x 11 x 6 cm',
        features: [
          'Açılabilir kapılar',
          'Detaylı iç mekan',
          'Gerçek lastikler',
          'Sertifikalı koleksiyonluk',
          'Özel ambalaj'
        ],
        year: '1987',
        engine: 'V8 Twin Turbo',
        maxSpeed: '324 km/h',
        acceleration: '3.8 saniye'
      },
      {
        id: 2,
        name: 'Porsche 911 GT3 RS 1:18',
        price: 1199,
        originalPrice: null,
        image: '🏁',
        rating: 4.8,
        reviews: 89,
        inStock: true,
        brand: 'Porsche',
        scale: '1:18',
        material: 'Die-cast Metal',
        color: 'Turuncu',
        weight: '920g',
        dimensions: '25 x 12 x 7 cm',
        features: [
          'Açılabilir kapılar ve kaput',
          'Yarış direksiyonu',
          'Spoiler detayı',
          'Limited Edition',
          'Numara plakası'
        ],
        year: '2022',
        engine: 'Flat-6 Naturally Aspirated',
        maxSpeed: '312 km/h',
        acceleration: '3.2 saniye'
      },
      {
        id: 3,
        name: 'McLaren 720S Minyatür',
        price: 1299,
        originalPrice: 1499,
        image: '🚗',
        rating: 4.7,
        reviews: 67,
        inStock: false,
        brand: 'McLaren',
        scale: '1:18',
        material: 'Die-cast Metal + Plastic',
        color: 'Mavi',
        weight: '780g',
        dimensions: '23 x 10 x 6 cm',
        features: [
          'Butterfly kapılar',
          'Carbon fiber detaylar',
          'LED ışık sistemi',
          'Collector\'s Edition',
          'Seri numarası'
        ],
        year: '2020',
        engine: 'V8 Twin Turbo',
        maxSpeed: '341 km/h',
        acceleration: '2.9 saniye'
      }
    ]
    setCompareItems(demoCompareItems)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedItems(prev => new Set([...prev, product.id]))
    
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const handleRemoveFromCompare = (productId) => {
    if (window.confirm('Bu ürünü karşılaştırmadan çıkarmak istediğinizden emin misiniz?')) {
      setCompareItems(compareItems.filter(item => item.id !== productId))
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DynSteel Ürün Karşılaştırması',
        text: 'Bu harika minyatür araba modellerini karşılaştırın!',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link kopyalandı!')
    }
  }

  const comparisonRows = [
    { key: 'price', label: 'Fiyat', type: 'price' },
    { key: 'rating', label: 'Değerlendirme', type: 'rating' },
    { key: 'brand', label: 'Marka', type: 'text' },
    { key: 'scale', label: 'Ölçek', type: 'text' },
    { key: 'material', label: 'Malzeme', type: 'text' },
    { key: 'color', label: 'Renk', type: 'text' },
    { key: 'weight', label: 'Ağırlık', type: 'text' },
    { key: 'dimensions', label: 'Boyutlar', type: 'text' },
    { key: 'year', label: 'Model Yılı', type: 'text' },
    { key: 'engine', label: 'Motor', type: 'text' },
    { key: 'maxSpeed', label: 'Maksimum Hız', type: 'text' },
    { key: 'acceleration', label: '0-100 km/h', type: 'text' },
    { key: 'inStock', label: 'Stok Durumu', type: 'stock' }
  ]

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-primary-800 border-b border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-primary-400 hover:text-accent-400 transition-colors">
              Anasayfa
            </Link>
            <span className="text-primary-600">/</span>
            <span className="text-white font-medium">Ürün Karşılaştırması</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/products">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ürün Karşılaştırması</h1>
                <p className="text-gray-600">Ürünleri yan yana karşılaştırın</p>
              </div>
            </div>
            
            {compareItems.length > 0 && (
              <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Paylaş</span>
                </button>
                
                <Link href="/products">
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Ürün Ekle</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {compareItems.length === 0 ? (
            /* Empty Compare */
            <div className="text-center py-20">
              <div className="text-8xl mb-6">⚖️</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Karşılaştırılacak ürün yok
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Ürünleri karşılaştırmak için önce ürün sayfasından karşılaştır butonuna tıklayın.
              </p>
              <Link href="/products">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center space-x-2 mx-auto">
                  <Eye className="h-5 w-5" />
                  <span>Ürünleri İncele</span>
                </button>
              </Link>
            </div>
          ) : compareItems.length === 1 ? (
            /* Single Product */
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Karşılaştırma için en az 2 ürün gerekli
              </h2>
              <p className="text-gray-600 mb-6">
                Daha fazla ürün ekleyerek detaylı karşılaştırma yapabilirsiniz.
              </p>
              <Link href="/products">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Daha Fazla Ürün Ekle
                </button>
              </Link>
            </div>
          ) : (
            /* Comparison Table */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  {/* Product Headers */}
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-48">
                        Özellikler
                      </th>
                      {compareItems.map((product) => (
                        <th key={product.id} className="px-6 py-4 text-center min-w-80">
                          <div className="relative">
                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemoveFromCompare(product.id)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md z-10"
                              title="Karşılaştırmadan Çıkar"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            
                            {/* Product Image */}
                            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-4">
                              <div className="text-4xl">{product.image}</div>
                            </div>
                            
                            {/* Product Name */}
                            <Link href={`/product/${product.id}`}>
                              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer mb-2">
                                {product.name}
                              </h3>
                            </Link>
                            
                            {/* Price */}
                            <div className="mb-4">
                              {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through block">
                                  ₺{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <div className="text-xl font-bold text-blue-600">
                                ₺{product.price.toLocaleString()}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="space-y-2">
                              <button
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.inStock}
                                className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                                  !product.inStock
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : addedItems.has(product.id)
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                              >
                                {addedItems.has(product.id) ? (
                                  <>
                                    <Check className="h-4 w-4" />
                                    <span>Eklendi!</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="h-4 w-4" />
                                    <span>{product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}</span>
                                  </>
                                )}
                              </button>
                              
                              <Link href={`/product/${product.id}`}>
                                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                                  <Eye className="h-4 w-4" />
                                  <span>Detay</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  {/* Comparison Rows */}
                  <tbody className="divide-y divide-gray-200">
                    {comparisonRows.map((row, index) => (
                      <tr key={row.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {row.label}
                        </td>
                        {compareItems.map((product) => (
                          <td key={`${product.id}-${row.key}`} className="px-6 py-4 text-center">
                            {row.type === 'price' && (
                              <div>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through block">
                                    ₺{product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                                <div className="text-lg font-bold text-blue-600">
                                  ₺{product.price.toLocaleString()}
                                </div>
                                {product.originalPrice && (
                                  <span className="text-xs text-green-600 font-medium">
                                    %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {row.type === 'rating' && (
                              <div className="flex items-center justify-center">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(product.rating)
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 ml-2">
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                            )}
                            
                            {row.type === 'stock' && (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                product.inStock 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? (
                                  <>
                                    <Check className="h-3 w-3 mr-1" />
                                    Stokta
                                  </>
                                ) : (
                                  <>
                                    <X className="h-3 w-3 mr-1" />
                                    Tükendi
                                  </>
                                )}
                              </span>
                            )}
                            
                            {row.type === 'text' && (
                              <span className="text-sm text-gray-900">
                                {product[row.key] || '-'}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    
                    {/* Features Row */}
                    <tr className="bg-white">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        Özellikler
                      </td>
                      {compareItems.map((product) => (
                        <td key={`${product.id}-features`} className="px-6 py-4">
                          <ul className="text-sm text-gray-600 space-y-1">
                            {product.features?.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Add More Products */}
          {compareItems.length > 0 && compareItems.length < 4 && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Daha fazla ürün ekleyerek karşılaştırmanızı genişletebilirsiniz (maksimum 4 ürün)
              </p>
              <Link href="/products">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto">
                  <Plus className="h-5 w-5" />
                  <span>Daha Fazla Ürün Ekle</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
