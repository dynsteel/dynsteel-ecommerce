import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronDown
} from 'lucide-react'

const PWAInstallPrompt = dynamic(() => import('./PWAInstallPrompt'), { ssr: false })

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Ürünler', href: '/admin/products', icon: Package },
  { name: 'Siparişler', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Kullanıcılar', href: '/admin/users', icon: Users },
  { name: 'Raporlar', href: '/admin/reports', icon: BarChart3 },
  { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const userMenuRef = useRef(null)
  const notificationsRef = useRef(null)

  // Kullanıcı menüsünü ve bildirimleri dışarı tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Giriş kontrolü
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === 'undefined') return
      
      const adminLoggedIn = localStorage.getItem('adminLoggedIn')
      
      // Giriş durumu kontrolü (Token opsiyonel - geçici admin için)
      if (adminLoggedIn === 'true') {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  // Tarayıcı/sekme kapanınca otomatik çıkış (Opsiyonel - Daha yüksek güvenlik için)
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Eğer "Beni Hatırla" özelliği yoksa, sayfadan çıkınca oturumu temizle
      // Bu özelliği istemiyorsanız bu effect'i kaldırabilirsiniz
      
      // NOT: Şu an bu sadece yorum satırı, aktif değil
      // Aktif etmek isterseniz aşağıdaki satırların yorumunu kaldırın:
      // localStorage.removeItem('adminLoggedIn')
      // localStorage.removeItem('adminUser')
      // localStorage.removeItem('adminToken')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // Çıkış yapma fonksiyonu
  const handleLogout = () => {
    if (typeof window === 'undefined') return
    
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      // Tüm admin verilerini temizle
      localStorage.removeItem('adminLoggedIn')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    }
  }

  // Yükleniyor ekranı
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Giriş yapılmamışsa hiçbir şey render etme
  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Head>
        {/* Admin Panel için özel PWA ayarları */}
        <meta name="application-name" content="DynSteel Admin" />
        <meta name="apple-mobile-web-app-title" content="DynSteel Admin" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="manifest" href="/admin-manifest.json" />
        <link rel="apple-touch-icon" href="/icons/admin-icon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/admin-icon.svg" />
      </Head>
      
      <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 md:w-72 lg:w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-slate-700/50 flex-shrink-0">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base">DS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">DynSteel</span>
              <span className="text-xs text-slate-400">Admin</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-full overflow-hidden">
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 touch-manipulation ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50 active:bg-slate-700'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User section - Fixed at bottom */}
          <div className="p-3 border-t border-slate-700/50 mt-auto flex-shrink-0 bg-slate-900/50">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@dynsteel.com</p>
              </div>
            </div>
            
            {/* Çıkış Butonu */}
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 active:bg-red-600/40 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group touch-manipulation"
            >
              <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-14 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ara..."
                    className="block w-64 pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[8px]">
                    3
                  </span>
                </button>

                {/* Notifications Panel */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">Bildirimler</h3>
                        <span className="text-xs text-gray-500">3 yeni</span>
                      </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {/* Bildirim 1 */}
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <ShoppingCart className="h-4 w-4 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">Yeni sipariş</p>
                            <p className="text-xs text-gray-500 mt-1">Ömer Katırcı yeni bir sipariş verdi (₺6,380)</p>
                            <p className="text-xs text-gray-400 mt-1">2 dakika önce</p>
                          </div>
                          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                        </div>
                      </div>

                      {/* Bildirim 2 */}
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Package className="h-4 w-4 text-yellow-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">Stok uyarısı</p>
                            <p className="text-xs text-gray-500 mt-1">Golf 6 Spoiler stokta azaldı (3 adet kaldı)</p>
                            <p className="text-xs text-gray-400 mt-1">15 dakika önce</p>
                          </div>
                          <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
                        </div>
                      </div>

                      {/* Bildirim 3 */}
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">Yeni kullanıcı</p>
                            <p className="text-xs text-gray-500 mt-1">Ahmet Yılmaz hesap oluşturdu</p>
                            <p className="text-xs text-gray-400 mt-1">1 saat önce</p>
                          </div>
                          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Tümünü Gör
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Site link */}
              <Link 
                href="/"
                className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Siteyi Görüntüle
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-600 hidden sm:block transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@dynsteel.com</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/admin/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Ayarlar</span>
                      </Link>
                      
                      <Link
                        href="/"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span>Ana Sayfa</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          handleLogout()
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      </div>
    </>
  )
}
