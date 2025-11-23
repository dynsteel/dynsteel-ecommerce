import Layout from '../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Home,
  ArrowLeft,
  Search,
  ShoppingCart,
  Eye,
  Zap,
  Car
} from 'lucide-react'

export default function Custom404() {
  const [searchTerm, setSearchTerm] = useState('')
  const [popularProducts] = useState([
    { id: 1, name: 'Ferrari F40 Minyatür', price: 899, image: '🏎️', href: '/product/1' },
    { id: 2, name: 'Porsche 911 GT3 RS', price: 1199, image: '🏁', href: '/product/2' },
    { id: 3, name: 'BMW M3 E30', price: 649, image: '🚗', href: '/product/3' }
  ])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
                404
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Car className="h-16 w-16 text-blue-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Sayfa Bulunamadı
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Endişelenmeyin, size yardımcı olabiliriz!
            </p>
            
            {/* Fun Message */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-700">
                Bu sayfa bir minyatür araba kadar küçük olmalı ki bulamıyoruz! 
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Aradığınızı buradan bulabilirsiniz:
            </h2>
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Ürün ara..."
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl text-lg font-semibold transition-all hover:scale-105 shadow-lg"
              >
                <Search className="h-5 w-5 inline mr-2" />
                Ara
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Hızlı Erişim
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <Home className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-1">Ana Sayfa</h3>
                  <p className="text-sm text-gray-600">DynSteel'e dön</p>
                </div>
              </Link>

              <Link href="/products">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <ShoppingCart className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-1">Ürünler</h3>
                  <p className="text-sm text-gray-600">Tüm modelleri gör</p>
                </div>
              </Link>

              <Link href="/categories">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-1">Kategoriler</h3>
                  <p className="text-sm text-gray-600">Markalara göz at</p>
                </div>
              </Link>

              <Link href="/3d-scan">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <Zap className="h-8 w-8 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-1">3D Tarama</h3>
                  <p className="text-sm text-gray-600">Özel üretim</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Popular Products */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Popüler Ürünler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {popularProducts.map((product) => (
                <Link key={product.id} href={product.href}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                    <div className="text-4xl mb-3">{product.image}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">₺{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Geri Dön</span>
            </button>

            <Link href="/">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Ana Sayfa</span>
              </button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-2">
              Hala yardıma mı ihtiyacınız var?
            </p>
            <Link href="/contact">
              <span className="text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer">
                Bizimle iletişime geçin →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
