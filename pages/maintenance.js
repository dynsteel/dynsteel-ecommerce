import { useState, useEffect } from 'react'
import Head from 'next/head'
import {
  Wrench,
  Clock,
  Mail,
  MessageCircle,
  Twitter,
  Instagram,
  Zap,
  Shield,
  Truck
} from 'lucide-react'

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  })

  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Geri sayım timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleNotifySubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  return (
    <>
      <Head>
        <title>Bakım Modu - DynSteel</title>
        <meta name="description" content="DynSteel geçici olarak bakım modunda. Kısa süre içinde geri döneceğiz." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">DS</span>
              </div>
              <span className="text-4xl font-bold text-white">DynSteel</span>
            </div>
          </div>

          {/* Maintenance Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Wrench className="h-16 w-16 text-white animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                <Zap className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Geçici Bakım Modu
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              DynSteel şu anda daha iyi hizmet verebilmek için güncelleme yapıyor. 
              Kısa süre içinde geliştirilmiş özelliklerle geri döneceğiz!
            </p>
            
            {/* Features Being Updated */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Performans</h3>
                <p className="text-slate-300 text-sm">Daha hızlı yükleme süreleri</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Güvenlik</h3>
                <p className="text-slate-300 text-sm">Gelişmiş güvenlik önlemleri</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Truck className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Özellikler</h3>
                <p className="text-slate-300 text-sm">Yeni ürün kategorileri</p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Clock className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Tahmini Süre</h2>
            </div>
            
            <div className="flex justify-center space-x-4 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-[80px]">
                <div className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-slate-400 text-sm">Saat</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-[80px]">
                <div className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-slate-400 text-sm">Dakika</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-[80px]">
                <div className="text-3xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-slate-400 text-sm">Saniye</div>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm">
              * Bu süre tahminidir ve değişebilir
            </p>
          </div>

          {/* Notification Signup */}
          <div className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">
                Açılış Bildirimi
              </h3>
              <p className="text-slate-300 mb-6 text-sm">
                Site açıldığında ilk siz haberdar olun!
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleNotifySubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="E-posta adresiniz"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105"
                  >
                    Haber Ver
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Kaydedildi!</h4>
                  <p className="text-slate-300 text-sm">
                    Site açıldığında size e-posta göndereceğiz.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="bg-white/10 rounded-full h-3 max-w-md mx-auto overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 animate-pulse"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Güncelleme İlerlemesi: %75</p>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">
              Acil Durumlar İçin
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/905458463523"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
              
              <a
                href="mailto:info@dynsteel.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>E-posta</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <p className="text-slate-400 mb-4">Sosyal medyadan takip edin:</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://instagram.com/dynsteel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/dynsteel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-slate-500 text-sm">
              © 2025 DynSteel. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
