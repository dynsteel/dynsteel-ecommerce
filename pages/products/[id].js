import Layout from '../../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useState, useEffect } from 'react'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react'

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  // Demo ürünler (gerçek uygulamada API'den gelecek)
  const allProducts = [
    {
      id: 1,
      name: 'Ferrari F40 Minyatür',
      price: 899,
      originalPrice: null,
      image: '🏎️',
      rating: 4.9,
      reviews: 124,
      category: 'sports',
      scale: '1:18',
      brand: 'Ferrari',
      inStock: true,
      stock: 15,
      description: 'Detaylı metal kasa, açılır kapılar, premium kalite Ferrari F40 minyatür araç modeli',
      features: ['Metal kasa', 'Açılır kapılar', 'Detaylı iç mekan', 'Gerçekçi lastikler']
    },
    {
      id: 2,
      name: 'BMW M3 E30 Minyatür',
      price: 649,
      originalPrice: null,
      image: '🚗',
      rating: 4.8,
      reviews: 89,
      category: 'classic',
      scale: '1:24',
      brand: 'BMW',
      inStock: true,
      stock: 23,
      description: 'Klasik spor sedan, premium kalite BMW M3 E30 minyatür model',
      features: ['Die-cast metal', 'Gerçekçi detaylar', 'Koleksiyonluk', 'Numara plakalı']
    },
    {
      id: 3,
      name: 'Mercedes AMG GT Minyatür',
      price: 999,
      originalPrice: 1299,
      image: '🚙',
      rating: 4.7,
      reviews: 156,
      category: 'luxury',
      scale: '1:18',
      brand: 'Mercedes',
      inStock: true,
      stock: 8,
      description: 'Özel seri, numaralı sertifika ile gelen Mercedes AMG GT modeli',
      features: ['Sınırlı üretim', 'Numaralı sertifika', 'Premium kutu', 'Özel boya']
    },
    {
      id: 4,
      name: 'Porsche 911 GT3 RS Minyatür',
      price: 1199,
      originalPrice: null,
      image: '🏁',
      rating: 4.9,
      reviews: 203,
      category: 'racing',
      scale: '1:18',
      brand: 'Porsche',
      inStock: true,
      stock: 12,
      description: 'Yarış versiyonu, aerodynamik detaylara sahip Porsche 911 GT3 RS',
      features: ['Yarış detayları', 'Spoiler', 'Racing stripes', 'Performans jantları']
    }
  ]

  useEffect(() => {
    if (id) {
      // Gerçek uygulamada API çağrısı yapılacak
      const foundProduct = allProducts.find(p => p.id === parseInt(id))
      setProduct(foundProduct || null)
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    }
  }

  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id)
      } else {
        addToFavorites(product)
      }
    }
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ürün yükleniyor...</p>
          </div>
        </div>
      </Layout>
    )
  }

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
            <Link href="/products" className="text-primary-400 hover:text-accent-400 transition-colors">
              Ürünler
            </Link>
            <span className="text-primary-600">/</span>
            <span className="text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/products">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Ürünlere Dön</span>
            </button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-4">
                <div className="text-8xl text-center">{product.image}</div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Product Name & Brand */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-900 ml-2">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.reviews} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ₺{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        ₺{product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.inStock ? (
                    <p className="text-green-600 text-sm mt-2">
                      <Check className="h-4 w-4 inline mr-1" />
                      Stokta ({product.stock} adet)
                    </p>
                  ) : (
                    <p className="text-red-600 text-sm mt-2">Stokta yok</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Açıklama</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Özellikler</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Ölçek</p>
                    <p className="font-semibold text-gray-900">{product.scale}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Kategori</p>
                    <p className="font-semibold text-gray-900 capitalize">{product.category}</p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">Adet:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-4 py-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart & Favorite */}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                        product.inStock
                          ? addedToCart
                            ? 'bg-green-600 text-white'
                            : 'bg-accent-500 hover:bg-accent-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Sepete Eklendi!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" />
                          <span>Sepete Ekle</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleFavoriteToggle}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isFavorite(product.id)
                          ? 'bg-red-50 border-red-500 text-red-500'
                          : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        className={`h-6 w-6 ${isFavorite(product.id) ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Ücretsiz Kargo</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Güvenli Ödeme</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Kolay İade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

