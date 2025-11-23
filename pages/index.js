import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import dynamic from 'next/dynamic'

// Lazy load heavy components
const Newsletter = dynamic(() => import('../components/Newsletter'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
})
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Scan, 
  Wrench, 
  Truck, 
  Star,
  Play,
  ChevronRight,
  ShoppingCart,
  Check,
  MessageCircle
} from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [addedItems, setAddedItems] = useState(new Set())
  const { addToCart } = useCart()

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

  // Anasayfa için minyatür araba ürünleri
  const featuredProducts = [
    {
      id: 101,
      name: 'Ferrari F40 Minyatür',
      price: 899,
      image: '🏎️',
      scale: '1:18',
      brand: 'Ferrari',
      inStock: true,
      description: 'Detaylı metal kasa, açılır kapılar'
    },
    {
      id: 102,
      name: 'BMW M3 E30 Minyatür',
      price: 649,
      image: '🚗',
      scale: '1:24',
      brand: 'BMW',
      inStock: true,
      description: 'Klasik spor sedan, premium kalite'
    },
    {
      id: 103,
      name: 'Mercedes AMG GT Minyatür',
      price: 999,
      originalPrice: 1299,
      image: '🚙',
      scale: '1:18',
      brand: 'Mercedes',
      inStock: true,
      description: 'Özel seri, numaralı sertifika'
    }
  ]
  const categories = [
    { name: 'Mercedes', icon: '🚙', count: '180+ ürün', description: 'C, E, S Class için', slug: 'mercedes' },
    { name: 'BMW', icon: '🏎️', count: '300+ ürün', description: '3, 5, X serisi için', slug: 'bmw' },
    { name: 'Audi', icon: '🚗', count: '220+ ürün', description: 'A3, A4, Q5 için', slug: 'audi' },
    { name: 'Volkswagen', icon: '🚗', count: '250+ ürün', description: 'Golf, Passat, Polo için', slug: 'volkswagen' },
    { name: 'Ford', icon: '🚐', count: '190+ ürün', description: 'Focus, Fiesta için', slug: 'ford' },
    { name: 'Toyota', icon: '🚗', count: '200+ ürün', description: 'Corolla, Camry için', slug: 'toyota' },
    { name: 'Honda', icon: '🏁', count: '160+ ürün', description: 'Civic, Accord için', slug: 'honda' },
    { name: 'Renault', icon: '🚙', count: '140+ ürün', description: 'Megane, Clio için', slug: 'renault' },
    { name: 'Peugeot', icon: '🦁', count: '120+ ürün', description: '206, 307, 508 için', slug: 'peugeot' },
    { name: 'Opel', icon: '⚡', count: '110+ ürün', description: 'Astra, Corsa için', slug: 'opel' },
    { name: 'Fiat', icon: '🇮🇹', count: '95+ ürün', description: 'Punto, Bravo için', slug: 'fiat' },
    { name: 'Seat', icon: '🔥', count: '85+ ürün', description: 'Leon, Ibiza için', slug: 'seat' },
    { name: 'Skoda', icon: '💎', count: '90+ ürün', description: 'Octavia, Fabia için', slug: 'skoda' },
    { name: 'Hyundai', icon: '🌟', count: '130+ ürün', description: 'i20, i30, Tucson için', slug: 'hyundai' },
    { name: 'Kia', icon: '🚀', count: '115+ ürün', description: 'Ceed, Sportage için', slug: 'kia' },
    { name: 'Nissan', icon: '🌊', count: '125+ ürün', description: 'Micra, Qashqai için', slug: 'nissan' }
  ]

  const features = [
    {
      icon: <Scan className="h-8 w-8" />,
      title: '3D Tarama Teknolojisi',
      description: 'Bulamadığınız parçaları 3D tarama ile özel üretiyoruz'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Kalite Garantisi',
      description: 'Tüm ürünlerimizde 2 yıl garanti'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Hızlı Kargo',
      description: '24 saat içinde kargo, ücretsiz teslimat'
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Montaj Desteği',
      description: 'Uzman ekibimizden ücretsiz montaj danışmanlığı'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">DynSteel</span>
              <br />
              <span className="text-white">Modifiye Dünyası</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto animate-slide-up">
              Araba modifiye parçalarında uzman. Bulamadığınız parçaları 
              <span className="text-accent-400 font-semibold"> 3D tarama teknolojisi</span> ile özel üretiyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up">
              <Link href="/categories">
                <button className="bg-accent-600 hover:bg-accent-700 text-white px-10 py-4 rounded-xl text-lg font-semibold flex items-center space-x-2 transition-all hover-glow">
                  <span>Alışverişe Başla</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              
              <Link href="/3d-scan">
                <button className="border border-primary-600 hover:border-accent-500 text-white px-10 py-4 rounded-xl text-lg font-semibold flex items-center space-x-2 transition-all hover:bg-primary-800">
                  <Scan className="h-5 w-5" />
                  <span>Özel Parça Talebi</span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-4xl mx-auto animate-slide-up">
              <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
                <div className="text-3xl font-bold text-accent-400">2500+</div>
                <div className="text-primary-400 text-sm">Ürün Çeşidi</div>
              </div>
              <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
                <div className="text-3xl font-bold text-accent-400">15K+</div>
                <div className="text-primary-400 text-sm">Mutlu Müşteri</div>
              </div>
              <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
                <div className="text-3xl font-bold text-accent-400">50+</div>
                <div className="text-primary-400 text-sm">Araba Markası</div>
              </div>
              <div className="text-center glass-effect p-4 rounded-lg border border-primary-700">
                <div className="text-3xl font-bold text-accent-400">24/7</div>
                <div className="text-primary-400 text-sm">Destek</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="h-6 w-6 text-primary-400 transform rotate-90" />
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Minyatür Arabalar
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Koleksiyonunuza değer katacak özel minyatür araba modelleri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="glass-effect rounded-xl overflow-hidden group hover-glow transition-all duration-300 border border-gray-200 hover:border-accent-500">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-6xl">{product.image}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      index === 2 ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                      {index === 2 ? 'Sınırlı Üretim' : 'Stokta'}
                    </span>
                    <span className="text-xs text-gray-500">{product.scale}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₺{product.originalPrice}</span>
                      )}
                      <div className="text-2xl font-bold text-accent-600">₺{product.price}</div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        addedItems.has(product.id)
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
                          <span>Sepete Ekle</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <button className="border border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                Tüm Minyatür Arabaları Görüntüle
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Görsel */}
            <div className="text-center lg:text-left">
              <div className="relative">
                <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-primary-700">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">🏭</div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🎯</div>
                        <p className="text-white text-sm font-medium">Kalite</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <p className="text-white text-sm font-medium">Hız</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🔧</div>
                        <p className="text-white text-sm font-medium">Uzmanlık</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🤝</div>
                        <p className="text-white text-sm font-medium">Güven</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ taraf - İçerik */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                DynSteel Hakkında
              </h2>
              
              <div className="space-y-4 text-white mb-8">
                <p className="text-lg">
                  <strong className="text-white">DynSteel</strong>, araba modifiye parçaları ve minyatür araba koleksiyonu konusunda uzman bir firmadır. Modern teknoloji ve kaliteli hizmet anlayışımız ile müşterilerimize en iyi hizmeti sunuyoruz.
                </p>
                
                <p>
                  <strong className="text-white">3D tarama ve yazdırma teknolojisi</strong> ile bulamadığınız parçaları özel olarak üretiyoruz. Premium kalitede minyatür araba modelleri ile koleksiyonunuzu genişletmenize yardımcı oluyoruz.
                </p>
                
                <p>
                  Müşteri memnuniyeti bizim için en önemli önceliktir. Hızlı teslimat, kaliteli ürünler ve profesyonel destek ile sektörde fark yaratıyoruz.
                </p>
              </div>

              {/* Özellikler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">Premium Kalite</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">15K+ Mutlu Müşteri</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">3D Tarama Teknolojisi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">24/7 Müşteri Desteği</span>
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about">
                  <button className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all hover:scale-105 w-full">
                    Daha Fazla Bilgi
                  </button>
                </Link>
                <a 
                  href="https://wa.me/905458463523?text=Merhaba, DynSteel hizmetleri hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all text-center"
                >
                  İletişime Geç
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Contact Banner */}
      <section className="py-12 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Sol Taraf - İçerik */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit">
                  <MessageCircle className="h-4 w-4" />
                  <span>7/24 Destek</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Aradığınız Ürünü<br />
                  <span className="text-green-600">Bulamadınız mı?</span>
                </h2>
                
                <p className="text-gray-600 text-lg mb-6">
                  Sitemizde bulamadığınız ürünler için WhatsApp üzerinden bizimle iletişime geçin. 
                  Uzman ekibimiz size yardımcı olmaktan mutluluk duyar!
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Hızlı yanıt garantisi</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Özel ürün talepleriniz</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">3D tarama ve üretim</span>
                  </div>
                </div>

                <a 
                  href="https://wa.me/905458463523?text=Merhaba, sitenizde bulamadığım bir ürün hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl group"
                >
                  <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
                  <span>WhatsApp ile İletişime Geç</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Sağ Taraf - Görsel/İkon */}
              <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                {/* Dekoratif Arka Plan */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full"></div>
                </div>

                {/* WhatsApp Icon */}
                <div className="relative z-10 text-center">
                  <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse">
                    <MessageCircle className="h-24 w-24 text-green-500" strokeWidth={1.5} />
                  </div>
                  <div className="text-white">
                    <p className="text-2xl font-bold mb-2">+90 545 846 35 23</p>
                    <p className="text-green-100 text-lg">Her zaman ulaşabilirsiniz</p>
                  </div>
                </div>

                {/* Dekoratif Noktalar */}
                <div className="absolute top-4 right-4 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter variant="inline" />
        </div>
      </section>
    </Layout>
  )
}
