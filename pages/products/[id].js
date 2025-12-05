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

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/admin/products?id=${id}`)
          const data = await response.json()
          
          if (response.ok && data.success && data.product) {
            // Görseli belirle
            let mainImage = data.product.image
            if (!mainImage && data.product.images && data.product.images.length > 0) {
              mainImage = data.product.images[0]
            }
            if (!mainImage) {
              mainImage = '🚗'
            }
            
            const formattedProduct = {
              id: data.product.id,
              name: data.product.name || '',
              price: data.product.price || 0,
              originalPrice: data.product.originalPrice || null,
              image: mainImage,
              images: data.product.images || (data.product.image ? [data.product.image] : []),
              rating: 4.5,
              reviews: 0,
              category: data.product.category || '',
              scale: data.product.scale || '1:18',
              brand: data.product.brand || data.product.category || '',
              inStock: (data.product.stock || 0) > 0,
              stock: data.product.stock || 0,
              description: data.product.description || '',
              features: data.product.features || []
            }
            
            setProduct(formattedProduct)
          } else {
            console.error('Ürün bulunamadı:', data.error)
            setProduct(null)
          }
        } catch (error) {
          console.error('Ürün yükleme hatası:', error)
          setProduct(null)
        }
      }
      
      fetchProduct()
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
                {(() => {
                  // Görseli belirle
                  let displayImage = product.image
                  
                  // Eğer images array'i varsa ve seçili index geçerliyse onu kullan
                  if (product.images && product.images.length > 0 && selectedImage < product.images.length) {
                    const selectedImg = product.images[selectedImage]
                    if (selectedImg && selectedImg.length > 2 && (selectedImg.startsWith('data:image') || selectedImg.startsWith('http://') || selectedImg.startsWith('https://'))) {
                      displayImage = selectedImg
                    }
                  }
                  
                  // Eğer image yoksa veya emoji ise, images array'ini kontrol et
                  if (!displayImage || displayImage.length <= 2 || (!displayImage.startsWith('data:image') && !displayImage.startsWith('http://') && !displayImage.startsWith('https://'))) {
                    if (product.images && product.images.length > 0) {
                      const validImage = product.images.find(img => 
                        img && 
                        img.length > 2 && 
                        (img.startsWith('data:image') || img.startsWith('http://') || img.startsWith('https://'))
                      )
                      if (validImage) {
                        displayImage = validImage
                      }
                    }
                  }
                  
                  // Eğer hala geçerli bir görsel yoksa emoji kullan
                  if (!displayImage || displayImage.length <= 2 || (!displayImage.startsWith('data:image') && !displayImage.startsWith('http://') && !displayImage.startsWith('https://'))) {
                    displayImage = displayImage || '🚗'
                    return <div className="text-8xl text-center">{displayImage}</div>
                  }
                  
                  // Geçerli görsel varsa göster
                  return (
                    <img 
                      src={displayImage} 
                      alt={product.name}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.style.display = 'none'
                        const fallback = document.createElement('div')
                        fallback.className = 'text-8xl text-center'
                        fallback.textContent = '🚗'
                        e.target.parentElement.appendChild(fallback)
                      }}
                    />
                  )
                })()}
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`bg-white rounded-lg border-2 p-2 ${
                        selectedImage === index ? 'border-accent-500' : 'border-gray-200'
                      }`}
                    >
                      {img && (img.startsWith('data:image') || img.startsWith('http')) ? (
                        <img 
                          src={img} 
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ) : (
                        <div className="text-2xl text-center">{img || '🚗'}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Product Name */}
                <div className="mb-4">
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
                      Stokta
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
                <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Ücretsiz Kargo</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-accent-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Güvenli Ödeme</p>
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

