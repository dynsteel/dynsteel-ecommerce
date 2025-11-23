import Layout from '../../components/Layout'
import Link from 'next/link'
import { ArrowRight, Search, Filter } from 'lucide-react'
import { useState } from 'react'

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`
    }
  }

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
            <span className="text-white font-medium">Kategoriler</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Araba Markaları
          </h1>
          <p className="text-xl text-primary-300 max-w-3xl mx-auto mb-8">
            Markanızı seçin ve size özel modifiye parçaları ile yedek parçaları keşfedin. 
            Premium kalitede ürünler ve hızlı teslimat garantisi.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Marka veya ürün ara..."
              className="w-full pl-12 pr-4 py-4 bg-primary-700 border border-primary-600 rounded-xl text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors text-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-600 hover:bg-accent-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ara
            </button>
          </form>
        </div>
      </section>

      {/* All Brands */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Araba Markaları
            </h2>
            <p className="text-primary-300">
              Markanızı seçin ve size özel ürünleri keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.slug}`}>
                <div className="glass-effect p-6 rounded-xl hover-glow cursor-pointer group transition-all duration-300 border border-primary-700 hover:border-accent-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="text-xs bg-accent-600 text-white px-2 py-1 rounded-full">
                      {category.count}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-accent-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-primary-400 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent-400 text-sm font-medium">Ürünleri Gör</span>
                    <ArrowRight className="h-4 w-4 text-accent-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Aradığınız Parçayı Bulamadınız mı?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            3D tarayıcı teknolojimiz ile özel parça üretimi yapıyoruz. 
            Sadece parçanızı taratın, 48 saat içinde fiyat teklifi alın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/905458463523?text=Merhaba, 3D tarayıcı ile özel parça üretimi hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-accent-600 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>📱</span>
              <span>Özel Parça Talebi</span>
            </a>
            <a 
              href="https://wa.me/905458463523?text=Merhaba, DynSteel hizmetleri hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-white hover:text-accent-600 transition-all flex items-center justify-center space-x-2"
            >
              <span>💬</span>
              <span>WhatsApp Destek</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
