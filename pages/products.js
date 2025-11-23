import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useRouter } from 'next/router'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  ShoppingCart,
  Grid,
  List,
  Heart,
  Eye,
  Check,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export default function ProductsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [addedItems, setAddedItems] = useState(new Set())
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedScale, setSelectedScale] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  // Debounced search for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()

  // Admin modu kontrolü
  useEffect(() => {
    setIsAdminMode(router.query.admin === 'true')
  }, [router.query.admin])

  // URL'den arama parametresini al
  useEffect(() => {
    if (router.query.search) {
      setSearchTerm(router.query.search)
    }
  }, [router.query.search])

  // Ürünleri yükle
  useEffect(() => {
    // localStorage'dan admin tarafından eklenen ürünleri al
    let adminProducts = []
    if (typeof window !== 'undefined') {
      adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    }

    const initialProducts = [
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
        description: 'Detaylı metal kasa, açılır kapılar, premium kalite',
        features: ['Metal kasa', 'Açılır kapılar', 'Detaylı iç mekan']
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
        description: 'Klasik spor sedan, premium kalite',
        features: ['Die-cast metal', 'Gerçekçi detaylar', 'Koleksiyonluk']
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
        description: 'Özel seri, numaralı sertifika',
        features: ['Sınırlı üretim', 'Numaralı sertifika', 'Premium kutu']
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
        description: 'Yarış versiyonu, aerodynamik detaylar',
        features: ['Yarış detayları', 'Spoiler', 'Racing stripes']
      },
      {
        id: 5,
        name: 'Lamborghini Aventador Minyatür',
        price: 1399,
        originalPrice: null,
        image: '⚡',
        rating: 4.8,
        reviews: 178,
        category: 'sports',
        scale: '1:18',
        brand: 'Lamborghini',
        inStock: false,
        description: 'Süper spor araba, açılır kapılar',
        features: ['Scissor doors', 'LED ışıklar', 'V12 motor detayı']
      },
      {
        id: 6,
        name: 'Audi R8 V10 Minyatür',
        price: 849,
        originalPrice: 1049,
        image: '🔥',
        rating: 4.6,
        reviews: 134,
        category: 'sports',
        scale: '1:24',
        brand: 'Audi',
        inStock: true,
        description: 'Mid-engine spor araba, detaylı motor bölümü',
        features: ['V10 motor', 'Karbon fiber detaylar', 'LED farlar']
      }
    ]
    
    // Admin tarafından eklenen ürünleri ve varsayılan ürünleri birleştir
    const allProducts = [...initialProducts, ...adminProducts]
    setProducts(allProducts)
  }, [])

  const handleAddToCart = useCallback((product) => {
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
  }, [addToCart])

  // Admin fonksiyonları
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setProducts(products.filter(product => product.id !== productId))
      alert('Ürün başarıyla silindi!')
    }
  }

  const handleAddNewProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: 'Yeni Ürün',
      price: 0,
      originalPrice: null,
      image: '🚗',
      rating: 4.5,
      reviews: 0,
      category: 'sports',
      scale: '1:18',
      brand: 'Yeni Marka',
      inStock: true,
      description: 'Yeni ürün açıklaması',
      features: ['Özellik 1', 'Özellik 2']
    }
    setProducts([...products, newProduct])
    alert('Yeni ürün eklendi! Düzenlemek için edit butonuna tıklayın.')
  }

  // Minyatür araba kategorileri
  const categories = [
    { id: 'all', name: 'Tüm Kategoriler' },
    { id: 'sports', name: 'Spor Arabalar' },
    { id: 'classic', name: 'Klasik Arabalar' },
    { id: 'luxury', name: 'Lüks Arabalar' },
    { id: 'racing', name: 'Yarış Arabaları' },
    { id: 'vintage', name: 'Vintage Koleksiyonu' }
  ]

  // Memoized filtreleme fonksiyonu - performans için
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Kategori filtresi
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
      
      // Arama filtresi (debounced)
      if (debouncedSearchTerm && !product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) && 
          !product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) return false
      
      // Fiyat filtresi
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      
      // Marka filtresi
      if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false
      
      // Ölçek filtresi
      if (selectedScale !== 'all' && product.scale !== selectedScale) return false
      
      return true
    })
  }, [products, selectedCategory, debouncedSearchTerm, priceRange, selectedBrand, selectedScale])

  // Memoized sıralama fonksiyonu - performans için
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id - a.id
        case 'popular':
        default:
          return b.reviews - a.reviews
      }
    })
  }, [filteredProducts, sortBy])

  // Marka listesi
  const brands = [...new Set(products.map(p => p.brand))].sort()
  
  // Ölçek listesi  
  const scales = [...new Set(products.map(p => p.scale))].sort()

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
            <span className="text-white font-medium">Minyatür Arabalar</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Minyatür Araba Koleksiyonu
              </h1>
              <p className="text-xl text-primary-300 max-w-3xl mx-auto">
                Premium kalitede minyatür araba modelleri. Koleksiyonunuzu genişletin, 
                hayalinizdeki arabaları evinize getirin.
              </p>
            </div>
            
            {/* Admin Butonları */}
            {isAdminMode && (
              <div className="ml-8">
                <button
                  onClick={handleAddNewProduct}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Yeni Ürün Ekle</span>
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Minyatür araba ara... (isim, marka)"
              className="w-full pl-12 pr-20 py-4 bg-primary-700 border border-primary-600 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors text-lg"
            />
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtre</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ana Filtre Satırı */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-accent-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-primary-800 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-accent-500 transition-colors"
              >
                <option value="popular">En Popüler</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="newest">En Yeni</option>
                <option value="rating">En Yüksek Puan</option>
              </select>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'grid'
                      ? 'border-accent-500 text-accent-400 bg-accent-500/10'
                      : 'border-primary-600 text-primary-300 hover:border-accent-500'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg border transition-colors ${
                    viewMode === 'list'
                      ? 'border-accent-500 text-accent-400 bg-accent-500/10'
                      : 'border-primary-600 text-primary-300 hover:border-accent-500'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Gelişmiş Filtre Paneli */}
          {isFilterOpen && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Fiyat Aralığı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Fiyat Aralığı
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₺{priceRange[0]}</span>
                      <span>₺{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Marka Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Marka
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Markalar</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Ölçek Filtresi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Ölçek
                  </label>
                  <select
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Ölçekler</option>
                    {scales.map(scale => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
                </div>

                {/* Filtre Temizleme */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setPriceRange([0, 2000])
                      setSelectedBrand('all')
                      setSelectedScale('all')
                      setSelectedCategory('all')
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              </div>

              {/* Sonuç Sayısı */}
              <div className="border-t pt-4">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredProducts.length}</span> ürün bulundu
                  {searchTerm && <span> "{searchTerm}" için</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }`}>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`glass-effect rounded-xl overflow-hidden group hover-glow transition-all duration-300 border border-primary-700 hover:border-accent-500 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center relative ${
                  viewMode === 'list' ? 'w-48 h-32' : 'h-48'
                }`}>
                  <div className="text-6xl">{product.image}</div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <Link href={`/products/${product.id}`}>
                      <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors" title="Detayları Gör">
                        <Eye className="h-4 w-4 text-white" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => {
                        if (isFavorite(product.id)) {
                          removeFromFavorites(product.id)
                        } else {
                          addToFavorites(product)
                        }
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(product.id)
                          ? 'bg-red-500/80 hover:bg-red-600/80'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                      title={isFavorite(product.id) ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                    >
                      <Heart className={`h-4 w-4 text-white ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    {/* Admin Butonları */}
                    {isAdminMode && (
                      <>
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <button className="p-2 bg-blue-500/80 rounded-full hover:bg-blue-600/80 transition-colors" title="Düzenle">
                            <Edit className="h-4 w-4 text-white" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-500/80 rounded-full hover:bg-red-600/80 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.inStock
                        ? 'bg-green-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}>
                      {product.inStock ? 'Stokta' : 'Tükendi'}
                    </span>
                    <span className="text-xs text-primary-400">{product.scale}</span>
                  </div>
                  
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-accent-400 transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-primary-400 text-sm mb-3">{product.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-primary-700 text-primary-200 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-primary-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-primary-400 ml-2">
                      {product.rating} ({product.reviews} değerlendirme)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₺{product.originalPrice}</span>
                      )}
                      <div className="text-2xl font-bold text-accent-600">₺{product.price}</div>
                    </div>
                    
                    {!isAdminMode && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          !product.inStock
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : addedItems.has(product.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-accent-600 hover:bg-accent-700 text-white hover:scale-105'
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
                            <span>{product.inStock ? 'Sepete Ekle' : 'Tükendi'}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Özel Koleksiyon Ürünleri
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sınırlı üretim ve özel seri minyatür arabalar için bizi takip edin.
            Yeni çıkan modelleri kaçırmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/905458463523?text=Merhaba, özel koleksiyon minyatür arabalar hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-accent-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all hover:scale-105"
            >
              WhatsApp ile İletişim
            </a>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-accent-600 transition-all">
              E-posta Listesi
            </button>
          </div>
        </div>
      </section>
    </Layout>
  )
}