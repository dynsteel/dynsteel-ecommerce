import Layout from '../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Home,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  Mail,
  MessageCircle,
  Wrench
} from 'lucide-react'

export default function Custom500() {
  const [isRetrying, setIsRetrying] = useState(false)
  const [errorId] = useState(() => Math.random().toString(36).substr(2, 9))

  const handleRetry = () => {
    setIsRetrying(true)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleReportError = () => {
    const errorDetails = {
      errorId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }
    
    const subject = encodeURIComponent('DynSteel - 500 Hata Raporu')
    const body = encodeURIComponent(`
Merhaba DynSteel Destek Ekibi,

500 hatası ile karşılaştım. Detaylar:

Hata ID: ${errorId}
URL: ${window.location.href}
Zaman: ${new Date().toLocaleString('tr-TR')}
Tarayıcı: ${navigator.userAgent}

Lütfen bu sorunu çözmenize yardımcı olun.

Teşekkürler.
    `)
    
    window.open(`mailto:support@dynsteel.com?subject=${subject}&body=${body}`)
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Error Icon Animation */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 animate-pulse">
                500
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <AlertTriangle className="h-16 w-16 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sunucu Hatası Oluştu
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Üzgünüz! Sunucumuzda teknik bir sorun yaşanıyor. 
              Teknik ekibimiz sorunu çözmek için çalışıyor.
            </p>
            
            {/* Error ID */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-200 mb-8 max-w-md mx-auto">
              <div className="text-4xl mb-3">⚙️</div>
              <p className="text-gray-700 mb-2">
                Hata Kodu: <span className="font-mono font-semibold text-red-600">{errorId}</span>
              </p>
              <p className="text-sm text-gray-500">
                Bu kodu destek ekibiyle paylaşabilirsiniz
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Ne Yapabilirsiniz?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Retry */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <RefreshCw className={`h-8 w-8 text-blue-600 mx-auto mb-3 ${isRetrying ? 'animate-spin' : ''}`} />
                <h3 className="font-semibold text-gray-900 mb-3">Tekrar Dene</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sayfayı yenileyerek tekrar deneyebilirsiniz
                </p>
                <button
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {isRetrying ? 'Yenileniyor...' : 'Sayfayı Yenile'}
                </button>
              </div>

              {/* Go Home */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Home className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-3">Ana Sayfa</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ana sayfaya dönerek alışverişe devam edin
                </p>
                <Link href="/">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Ana Sayfaya Git
                  </button>
                </Link>
              </div>

              {/* Report Error */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <Mail className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-3">Hata Bildir</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sorunu teknik ekibimize bildirin
                </p>
                <button
                  onClick={handleReportError}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  E-posta Gönder
                </button>
              </div>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Alternatif Seçenekler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/products">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-3xl mb-2">🏎️</div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    Ürünleri Gör
                  </h3>
                </div>
              </Link>

              <Link href="/categories">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-3xl mb-2">🏁</div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    Kategoriler
                  </h3>
                </div>
              </Link>

              <Link href="/blog">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-3xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    Blog
                  </h3>
                </div>
              </Link>

              <Link href="/contact">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
                  <div className="text-3xl mb-2">📞</div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    İletişim
                  </h3>
                </div>
              </Link>
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <Wrench className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Sistem Durumu
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Sunucu bakım altında</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Veritabanı çalışıyor</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-600">Ödeme sistemi aktif</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Geri Dön</span>
            </button>

            <Link href="/">
              <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-8 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Ana Sayfa</span>
              </button>
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Sorun devam ediyorsa bizimle iletişime geçin:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905458463523"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Destek</span>
              </a>
              <a
                href="mailto:support@dynsteel.com"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>E-posta Gönder</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
