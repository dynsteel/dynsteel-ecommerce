import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ArrowLeft,
  Share2,
  Eye
} from 'lucide-react'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [addedItems, setAddedItems] = useState(new Set())
  const { addToCart } = useCart()

  useEffect(() => {
    // Demo favori ürünler (gerçek uygulamada localStorage veya API'den gelir)
    const demoWishlist = [
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
        addedDate: '2025-01-20'
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
        addedDate: '2025-01-18'
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
        addedDate: '2025-01-15'
      },
      {
        id: 4,
        name: 'Lamborghini Huracán 1:24',
        price: 649,
        originalPrice: null,
        image: '🟡',
        rating: 4.6,
        reviews: 143,
        inStock: true,
        brand: 'Lamborghini',
        scale: '1:24',
        addedDate: '2025-01-12'
      }
    ]
    setWishlist(demoWishlist)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedItems(prev => new Set([...prev, product.id]))
    
    // Remove the "added" state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(product.id)
        return newSet
      })
    }, 2000)
  }

  const handleRemoveFromWishlist = (productId) => {
    if (window.confirm('Bu ürünü favorilerden çıkarmak istediğinizden emin misiniz?')) {
      setWishlist(wishlist.filter(item => item.id !== productId))
    }
  }

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'DynSteel Favorilerim',
        text: 'DynSteel\'deki favori minyatür araba koleksiyonuma göz atın!',
        url: window.location.href
      })
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link kopyalandı!')
    }
  }

  const totalValue = wishlist.reduce((sum, item) => sum + item.price, 0)
  const inStockItems = wishlist.filter(item => item.inStock).length

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
            <span className="text-white font-medium">Favorilerim</span>
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
                <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
                <p className="text-gray-600">Beğendiğiniz ürünleri saklayın</p>
              </div>
            </div>
            
            {wishlist.length > 0 && (
              <button
                onClick={handleShareWishlist}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Paylaş</span>
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            /* Empty Wishlist */
            <div className="text-center py-20">
              <div className="text-8xl mb-6">❤️</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Favori listeniz boş
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Ürünleri İncele</span>
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Kategorilere Gözat</span>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Wishlist Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                      <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center">
                    <ShoppingCart className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Stokta Olan</p>
                      <p className="text-2xl font-bold text-gray-900">{inStockItems}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center">
                    <div className="text-2xl">💰</div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Toplam Değer</p>
                      <p className="text-2xl font-bold text-gray-900">₺{totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wishlist Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                      <div className="text-6xl">{product.image}</div>
                      
                      {/* Stock Status */}
                      <div className="absolute top-3 left-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          product.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.inStock ? 'Stokta' : 'Tükendi'}
                        </span>
                      </div>

                      {/* Remove from Wishlist */}
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
                        title="Favorilerden Çıkar"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            %{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)} İndirim
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{product.scale}</span>
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      </div>
                      
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-3">
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
                        <span className="text-sm text-gray-500 ml-2">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₺{product.originalPrice.toLocaleString()}</span>
                          )}
                          <div className="text-xl font-bold text-blue-600">₺{product.price.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                            !product.inStock
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : addedItems.has(product.id)
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
                          }`}
                        >
                          {addedItems.has(product.id) ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                            <span>Detayları Gör</span>
                          </button>
                        </Link>
                      </div>

                      {/* Added Date */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          Eklenme: {new Date(product.addedDate).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk Actions */}
              {inStockItems > 0 && (
                <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Toplu İşlemler</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        wishlist.filter(item => item.inStock).forEach(product => {
                          handleAddToCart(product)
                        })
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Stokta Olanları Sepete Ekle ({inStockItems})</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        if (window.confirm('Tüm favorileri temizlemek istediğinizden emin misiniz?')) {
                          setWishlist([])
                        }
                      }}
                      className="border border-red-300 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Tüm Favorileri Temizle</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}
