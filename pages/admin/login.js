import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Shield,
  AlertCircle
} from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showLocalAdminSetup, setShowLocalAdminSetup] = useState(false)

  // Yerel admin oluştur (MongoDB olmadan test için)
  const createLocalAdmin = () => {
    const localAdmin = {
      username: 'dynsteel',
      password: '1907',
      email: 'admin@dynsteel.com',
      name: 'DynSteel Admin',
      createdAt: new Date().toISOString()
    }
    
    localStorage.setItem('localAdmins', JSON.stringify([localAdmin]))
    alert('✅ Yerel admin oluşturuldu!\n\nKullanıcı: dynsteel\nŞifre: 1907\n\nŞimdi giriş yapabilirsiniz.')
    setShowLocalAdminSetup(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Önce yerel/geçici admin kontrolü (MongoDB olmadan çalışması için)
    const TEMP_ADMIN_USERNAME = 'dynsteel'
    const TEMP_ADMIN_PASSWORD = '1907'

    if (credentials.username === TEMP_ADMIN_USERNAME && credentials.password === TEMP_ADMIN_PASSWORD) {
      // Geçici admin girişi başarılı
      console.log('✅ Geçici admin girişi başarılı!')
      localStorage.setItem('adminLoggedIn', 'true')
      localStorage.setItem('adminUser', JSON.stringify({
        username: TEMP_ADMIN_USERNAME,
        email: 'admin@dynsteel.com',
        role: 'admin',
        mode: 'temporary'
      }))
      
      // Direkt yönlendir
      router.push('/admin')
      return
    }

    // Yerel localStorage adminleri kontrol et
    try {
      const storedAdmins = localStorage.getItem('localAdmins')
      if (storedAdmins) {
        const admins = JSON.parse(storedAdmins)
        const admin = admins.find(a => 
          a.username === credentials.username && 
          a.password === credentials.password
        )
        
        if (admin) {
          console.log('✅ Yerel admin girişi başarılı!')
          localStorage.setItem('adminLoggedIn', 'true')
          localStorage.setItem('adminUser', JSON.stringify({
            username: admin.username,
            email: admin.email,
            role: 'admin',
            mode: 'local'
          }))
          router.push('/admin')
          return
        }
      }
    } catch (localError) {
      console.log('Local admin check failed:', localError)
    }

    // MongoDB API'yi dene
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // API ile giriş başarılı
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminLoggedIn', 'true')
        localStorage.setItem('adminUser', JSON.stringify(data.admin))
        router.push('/admin')
      } else {
        setError(data.error || 'Kullanıcı adı veya şifre hatalı!')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('API Login error:', error)
      setError('Bağlantı hatası. Lütfen daha sonra tekrar deneyin.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Girişi - DynSteel</title>
        <meta name="application-name" content="DynSteel Admin" />
        <meta name="apple-mobile-web-app-title" content="DynSteel Admin" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="manifest" href="/admin-manifest.json" />
        <link rel="apple-touch-icon" href="/icons/admin-icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/admin-icon.svg" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-2xl shadow-2xl mb-6">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            DynSteel Admin Panel
          </h1>
          <p className="text-slate-400">
            Yönetim paneline giriş yapın
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Kullanıcı adınız"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Admin Girişi</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <Link href="/">
            <span className="text-slate-400 hover:text-white text-sm transition-colors">
              ← Ana Siteye Dön
            </span>
          </Link>
        </div>


        {/* Security Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Bu panel sadece yetkili personel içindir.</p>
          <p>Tüm aktiviteler kayıt altına alınmaktadır.</p>
        </div>
      </div>
      </div>
    </>
  )
}
