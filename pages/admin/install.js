import { useState, useEffect } from 'react'
import { Download, Monitor, Chrome, CheckCircle, ArrowRight } from 'lucide-react'
import Head from 'next/head'

export default function AdminInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isChrome, setIsChrome] = useState(false)

  useEffect(() => {
    // Chrome/Edge kontrolü
    const userAgent = navigator.userAgent.toLowerCase()
    setIsChrome(userAgent.includes('chrome') || userAgent.includes('edg'))

    // PWA kurulu mu kontrol et
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // PWA kurulum event'ini yakala
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    
    setDeferredPrompt(null)
  }

  return (
    <>
      <Head>
        <title>Admin Panel Kurulum - DynSteel</title>
        <link rel="manifest" href="/admin-manifest.json" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-2xl mb-6">
              <Monitor className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              DynSteel Admin Panel
            </h1>
            <p className="text-xl text-gray-300">
              Masaüstü Uygulaması Olarak Kur
            </p>
          </div>

          {/* Kurulum Durumu */}
          {isInstalled ? (
            <div className="max-w-2xl mx-auto bg-green-500 rounded-2xl p-8 text-center">
              <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Uygulama Kuruldu! 🎉
              </h2>
              <p className="text-white mb-6">
                Admin panel artık masaüstü uygulamanız olarak kullanıma hazır.
              </p>
              <a
                href="/admin"
                className="inline-flex items-center space-x-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Admin Paneline Git</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hızlı Kurulum (Chrome/Edge) */}
              {isChrome && deferredPrompt && (
                <div className="bg-blue-600 rounded-2xl p-8 text-center">
                  <Chrome className="h-16 w-16 text-white mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Hızlı Kurulum
                  </h2>
                  <p className="text-white mb-6">
                    Tek tıkla admin paneli masaüstü uygulamanız olacak!
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                  >
                    <Download className="h-6 w-6" />
                    <span>Şimdi Kur</span>
                  </button>
                </div>
              )}

              {/* Manuel Kurulum Adımları */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Manuel Kurulum Adımları
                </h2>

                <div className="space-y-6">
                  {/* Chrome/Edge için */}
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <Chrome className="h-6 w-6 mr-2 text-blue-600" />
                      Chrome / Edge İçin
                    </h3>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-bold text-blue-600 mr-2">1.</span>
                        <span>Tarayıcının sağ üst köşesindeki <strong>⋮</strong> (üç nokta) menüsünü açın</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-blue-600 mr-2">2.</span>
                        <span><strong>"Uygulamayı Yükle"</strong> veya <strong>"Install DynSteel Admin Panel"</strong> seçeneğine tıklayın</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-blue-600 mr-2">3.</span>
                        <span>Açılan pencerede <strong>"Yükle"</strong> butonuna tıklayın</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-blue-600 mr-2">4.</span>
                        <span>Uygulama otomatik olarak açılacak ve masaüstünüze kısayol eklenecek</span>
                      </li>
                    </ol>
                  </div>

                  {/* Windows için */}
                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <Monitor className="h-6 w-6 mr-2 text-red-600" />
                      Windows İçin Kısayol
                    </h3>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="font-bold text-red-600 mr-2">1.</span>
                        <span>Masaüstünde boş bir alana sağ tıklayın</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-red-600 mr-2">2.</span>
                        <span><strong>Yeni → Kısayol</strong> seçin</span>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-red-600 mr-2">3.</span>
                        <div>
                          <span>Şu adresi yapıştırın:</span>
                          <div className="mt-2 bg-gray-100 p-3 rounded-lg font-mono text-sm">
                            http://localhost:3000/admin
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="font-bold text-red-600 mr-2">4.</span>
                        <span>Kısayola <strong>"DynSteel Admin"</strong> adını verin</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Özellikler */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">
                  Masaüstü Uygulaması Özellikleri
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Hızlı Erişim</h3>
                      <p className="text-red-100">Masaüstünden tek tıkla açın</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Tam Ekran</h3>
                      <p className="text-red-100">Tarayıcı araç çubukları olmadan</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Offline Destek</h3>
                      <p className="text-red-100">İnternet olmadan da çalışır</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Bildirimler</h3>
                      <p className="text-red-100">Yeni siparişlerden anında haberdar olun</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Destek */}
              <div className="text-center text-gray-400">
                <p>Kurulum sırasında sorun yaşıyorsanız:</p>
                <a
                  href="/admin"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Admin Paneline Tarayıcıdan Giriş Yapın
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

