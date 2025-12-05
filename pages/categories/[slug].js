import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Star, 
  ShoppingCart,
  Grid,
  List,
  SlidersHorizontal
} from 'lucide-react'

export default function CategoryPage() {
  const router = useRouter()
  const { slug } = router.query
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  // Araba markası bilgileri
  const brandInfo = {
    mercedes: {
      name: 'Mercedes-Benz',
      description: 'Mercedes-Benz için premium kalitede modifiye parçaları ve yedek parçalar',
      models: ['C-Class', 'E-Class', 'S-Class', 'A-Class', 'CLA', 'GLA', 'GLC', 'GLE'],
      icon: '🚙'
    },
    bmw: {
      name: 'BMW',
      description: 'BMW için yüksek performanslı modifiye parçaları ve yedek parçalar',
      models: ['3 Serisi', '5 Serisi', 'X1', 'X3', 'X5', '1 Serisi', '7 Serisi'],
      icon: '🏎️'
    },
    audi: {
      name: 'Audi',
      description: 'Audi için teknoloji odaklı modifiye parçaları ve yedek parçalar',
      models: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'TT'],
      icon: '🚗'
    },
    volkswagen: {
      name: 'Volkswagen',
      description: 'Volkswagen için güvenilir modifiye parçaları ve yedek parçalar',
      models: ['Golf', 'Passat', 'Polo', 'Jetta', 'Tiguan', 'Touran'],
      icon: '🚗'
    },
    ford: {
      name: 'Ford',
      description: 'Ford için dayanıklı modifiye parçaları ve yedek parçalar',
      models: ['Focus', 'Fiesta', 'Mondeo', 'Kuga', 'EcoSport'],
      icon: '🚐'
    },
    toyota: {
      name: 'Toyota',
      description: 'Toyota için kaliteli modifiye parçaları ve yedek parçalar',
      models: ['Corolla', 'Camry', 'RAV4', 'Yaris', 'Prius', 'Hilux'],
      icon: '🚗'
    },
    honda: {
      name: 'Honda',
      description: 'Honda için güvenilir modifiye parçaları ve yedek parçalar',
      models: ['Civic', 'Accord', 'CR-V', 'Jazz', 'HR-V'],
      icon: '🏁'
    },
    renault: {
      name: 'Renault',
      description: 'Renault için uygun fiyatlı modifiye parçaları ve yedek parçalar',
      models: ['Megane', 'Clio', 'Captur', 'Kadjar', 'Talisman'],
      icon: '🚙'
    },
    peugeot: {
      name: 'Peugeot',
      description: 'Peugeot için şık modifiye parçaları ve yedek parçalar',
      models: ['206', '207', '308', '508', '2008', '3008'],
      icon: '🦁'
    },
    opel: {
      name: 'Opel',
      description: 'Opel için pratik modifiye parçaları ve yedek parçalar',
      models: ['Astra', 'Corsa', 'Insignia', 'Mokka', 'Zafira'],
      icon: '⚡'
    },
    fiat: {
      name: 'Fiat',
      description: 'Fiat için kompakt modifiye parçaları ve yedek parçalar',
      models: ['Punto', 'Bravo', '500', 'Panda', 'Tipo'],
      icon: '🇮🇹'
    },
    seat: {
      name: 'Seat',
      description: 'Seat için sportif modifiye parçaları ve yedek parçalar',
      models: ['Leon', 'Ibiza', 'Ateca', 'Arona', 'Tarraco'],
      icon: '🔥'
    },
    skoda: {
      name: 'Škoda',
      description: 'Škoda için akıllı modifiye parçaları ve yedek parçalar',
      models: ['Octavia', 'Fabia', 'Superb', 'Kodiaq', 'Kamiq'],
      icon: '💎'
    },
    hyundai: {
      name: 'Hyundai',
      description: 'Hyundai için modern modifiye parçaları ve yedek parçalar',
      models: ['i20', 'i30', 'Tucson', 'Santa Fe', 'Kona'],
      icon: '🌟'
    },
    kia: {
      name: 'Kia',
      description: 'Kia için yenilikçi modifiye parçaları ve yedek parçalar',
      models: ['Ceed', 'Sportage', 'Sorento', 'Picanto', 'Stonic'],
      icon: '🚀'
    },
    nissan: {
      name: 'Nissan',
      description: 'Nissan için teknolojik modifiye parçaları ve yedek parçalar',
      models: ['Micra', 'Qashqai', 'X-Trail', 'Juke', 'Note'],
      icon: '🌊'
    }
  }

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // MongoDB'den ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/products')
        const data = await response.json()
        
        if (response.ok && data.success && data.products) {
          // Sadece bu markaya ait ürünleri filtrele
          const brandProducts = data.products.filter(product => 
            product.category?.toLowerCase() === slug?.toLowerCase()
          )
          
          // MongoDB ürünlerini formatla
          const formattedProducts = brandProducts.map(product => ({
            id: product.id,
            name: product.name || '',
            price: product.price || 0,
            originalPrice: null,
            image: product.image || '🚗',
            rating: 4.5,
            reviews: 0,
            category: product.category || '',
            inStock: (product.stock || 0) > 0,
            description: product.description || '',
            stock: product.stock || 0
          }))
          
          setProducts(formattedProducts)
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Ürün yükleme hatası:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchProducts()
    }
  }, [slug])

  const currentBrand = brandInfo[slug] || {
    name: 'Marka',
    description: 'Bu marka için modifiye parçaları',
    models: [],
    icon: '🚗'
  }

  if (!slug) {
    return <Layout><div className="min-h-screen flex items-center justify-center"><div className="text-white">Yükleniyor...</div></div></Layout>
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
            <Link href="/categories" className="text-primary-400 hover:text-accent-400 transition-colors">
              Kategoriler
            </Link>
            <span className="text-primary-600">/</span>
            <span className="text-white font-medium">{currentBrand.name}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4 p-2 rounded-lg border border-primary-600 hover:border-accent-500 text-primary-300 hover:text-accent-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="text-5xl mr-4">{currentBrand.icon}</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {currentBrand.name} Parçaları
              </h1>
              <p className="text-xl text-primary-300 mb-4">
                {currentBrand.description}
              </p>
            </div>
          </div>

          {/* Models */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentBrand.models.map((model, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-700 text-primary-200 rounded-full text-sm border border-primary-600"
              >
                {model}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
              <div className="text-2xl font-bold text-accent-400">{products.length}</div>
              <div className="text-primary-400 text-sm">Ürün</div>
            </div>
            <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
              <div className="text-2xl font-bold text-accent-400">{currentBrand.models.length}</div>
              <div className="text-primary-400 text-sm">Model</div>
            </div>
            <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
              <div className="text-2xl font-bold text-accent-400">4.7</div>
              <div className="text-primary-400 text-sm">Ortalama Puan</div>
            </div>
            <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
              <div className="text-2xl font-bold text-accent-400">24/7</div>
              <div className="text-primary-400 text-sm">Destek</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-8 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 space-y-4 lg:space-y-0">
            <form onSubmit={handleSearch} className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ürün ara..."
                  className="pl-10 pr-4 py-2 bg-primary-800 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors"
                />
              </div>
              <button type="submit" className="flex items-center space-x-2 px-4 py-2 bg-accent-600 hover:bg-accent-700 border border-accent-500 rounded-lg text-white transition-colors">
                <Search className="h-4 w-4" />
                <span>Ara</span>
              </button>
            </form>

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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
              <p className="mt-4 text-primary-400">Ürünler yükleniyor...</p>
            </div>
          )}

          {/* Products Grid/List */}
          {!loading && (
            <div className={`${
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }`}>
              {products.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-primary-400 text-lg">Bu kategoride henüz ürün bulunmuyor.</p>
                </div>
              ) : (
                products.map((product) => (
              <div
                key={product.id}
                className={`glass-effect rounded-xl overflow-hidden group hover-glow transition-all duration-300 border border-primary-700 hover:border-accent-500 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center ${
                  viewMode === 'list' ? 'w-48 h-32' : 'h-48'
                }`}>
                  <div className="text-6xl">{product.image}</div>
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
                    <span className="text-xs text-primary-400">{product.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-accent-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-primary-400 text-sm mb-3">{product.description}</p>
                  
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
                    <span className="ml-2 text-sm text-primary-400">
                      {product.rating} ({product.reviews} değerlendirme)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-primary-500 line-through">
                          ₺{product.originalPrice}
                        </span>
                      )}
                      <div className="text-2xl font-bold text-accent-400">
                        ₺{product.price}
                      </div>
                    </div>
                    <button 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? 'bg-accent-600 hover:bg-accent-700 text-white'
                          : 'bg-primary-700 text-primary-400 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>{product.inStock ? 'Sepete Ekle' : 'Tükendi'}</span>
                    </button>
                  </div>
                </div>
              </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
