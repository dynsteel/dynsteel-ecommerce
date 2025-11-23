import { useState } from 'react'
import { Mail, CheckCircle, X, Gift, Zap, Bell, Star } from 'lucide-react'

export default function Newsletter({ variant = 'footer' }) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // E-posta validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin.')
      setIsLoading(false)
      return
    }

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      console.log('Newsletter subscription:', email)
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
      
      // 5 saniye sonra başarı mesajını gizle
      setTimeout(() => {
        setIsSubscribed(false)
      }, 5000)
    }, 1000)
  }

  if (variant === 'popup') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Özel Fırsatları Kaçırma!
            </h3>
            <p className="text-gray-600">
              E-posta listemize katıl, yeni ürünler ve özel indirimlerden ilk sen haberdar ol.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <Gift className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">%20 İndirim</p>
              <p className="text-xs text-gray-500">İlk siparişe özel</p>
            </div>
            <div className="text-center">
              <Bell className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Erken Erişim</p>
              <p className="text-xs text-gray-500">Yeni ürünlere öncelik</p>
            </div>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E-posta adresiniz"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Mail className="h-5 w-5" />
                    <span>Ücretsiz Katıl</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Başarıyla Kaydoldun!</h4>
              <p className="text-gray-600 mb-4">
                E-posta adresinizi doğrulamak için gelen kutunuzu kontrol edin.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  🎉 İlk siparişinizde kullanabileceğiniz %20 indirim kodu: <strong>WELCOME20</strong>
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            İstediğiniz zaman abonelikten çıkabilirsiniz. Gizlilik politikamızı okuyun.
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">E-Bülten Aboneliği</h3>
                  <p className="text-blue-100">Özel fırsatları kaçırma!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Gift className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-sm font-medium">Özel İndirimler</p>
                </div>
                <div className="text-center">
                  <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-sm font-medium">İlk Haberler</p>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-sm font-medium">VIP Erişim</p>
                </div>
              </div>
            </div>

            <div>
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex space-x-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="E-posta adresiniz"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Mail className="h-5 w-5" />
                          <span>Abone Ol</span>
                        </>
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-200 text-sm">{error}</p>
                  )}
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Teşekkürler!</h4>
                  <p className="text-blue-100">
                    E-posta listemize başarıyla katıldınız. İlk özel teklifimizi bekleyin!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Footer variant (default)
  return (
    <div className="bg-primary-700 border border-primary-600 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Mail className="h-6 w-6 text-accent-400" />
        <h3 className="text-lg font-semibold text-white">E-Bülten</h3>
      </div>
      
      <p className="text-primary-300 mb-4 text-sm">
        Yeni ürünler, özel indirimler ve kampanyalardan haberdar olmak için e-posta listemize katılın.
      </p>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-primary-600 border border-primary-500 rounded text-white placeholder-primary-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent text-sm"
            placeholder="E-posta adresiniz"
            required
          />
          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded font-medium transition-colors text-sm flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>Abone Ol</span>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 text-sm font-medium">
            Başarıyla abone oldunuz!
          </p>
        </div>
      )}
    </div>
  )
}
