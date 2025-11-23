import { useState, useRef, useEffect, memo, useCallback } from 'react'
import { useCart } from '../context/CartContext'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Lazy load LiveChat to improve initial page load
const LiveChat = dynamic(() => import('./LiveChat'), {
  ssr: false,
  loading: () => null
})
import { 
  Menu, 
  X, 
  Search, 
  ShoppingCart, 
  User, 
  Settings,
  Scan,
  Car,
  Phone,
  Mail,
  Truck,
  Instagram,
  Trash2,
  Eye,
  ChevronDown,
  LogOut,
  UserPlus
} from 'lucide-react'

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const { totalItems, clearCart, items, removeFromCart } = useCart()
  const cartDropdownRef = useRef(null)
  const userDropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Kullanıcı durumu kontrolü
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkUserStatus = () => {
      const userLoggedIn = localStorage.getItem('userLoggedIn')
      const storedUserData = localStorage.getItem('userData')
      
      setIsUserLoggedIn(userLoggedIn === 'true')
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      }
    }
    
    checkUserStatus()
    
    // Storage değişikliklerini dinle
    window.addEventListener('storage', checkUserStatus)
    return () => window.removeEventListener('storage', checkUserStatus)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Search modal controls
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleKeyDown = (e) => {
      // ESC tuşu ile arama modal'ını kapat
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
      // Ctrl/Cmd + K ile arama modal'ını aç
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleClearCart = () => {
    if (window.confirm('Sepeti boşaltmak istediğinizden emin misiniz?')) {
      clearCart()
      setIsCartDropdownOpen(false)
    }
  }

  const handleRemoveItem = (item) => {
    if (window.confirm(`"${item.name}" ürününü sepetten çıkarmak istediğinizden emin misiniz?`)) {
      removeFromCart(item.id)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      localStorage.removeItem('userLoggedIn')
      localStorage.removeItem('userData')
      setIsUserLoggedIn(false)
      setUserData(null)
      setIsUserDropdownOpen(false)
      // Sayfayı yenile
      window.location.reload()
    }
  }

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Ürünler', href: '/products' },
    { name: '3D Tarama', href: '/3d-scan' },
    { name: 'Kategoriler', href: '/categories' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <Car className="h-8 w-8 text-accent-500" />
                  <span className="text-2xl font-bold gradient-text">DynSteel</span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black hover:text-accent-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-primary-300 hover:text-accent-400 transition-colors"
                title="Ara (Ctrl+K)"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* WhatsApp Contact */}
              <a 
                href="https://wa.me/905458463523" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover-glow"
              >
                <Phone className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>

              {/* 3D Scan Feature */}
              <button className="flex items-center space-x-1 bg-accent-600 hover:bg-accent-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all hover-glow">
                <Scan className="h-4 w-4" />
                <span className="hidden sm:inline">3D Tara</span>
              </button>

              {/* Cart Dropdown */}
              <div className="relative" ref={cartDropdownRef}>
                <button 
                  onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
                  className="relative text-primary-300 hover:text-accent-400 transition-colors flex items-center space-x-1"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <ChevronDown className="h-3 w-3" />
                </button>

                {/* Cart Dropdown Menu */}
                {isCartDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-primary-800 border border-primary-600 rounded-lg shadow-xl z-50">
                    {items.length === 0 ? (
                      <div className="p-6 text-center">
                        <ShoppingCart className="h-12 w-12 text-primary-500 mx-auto mb-3" />
                        <p className="text-primary-400 mb-4">Sepetiniz boş</p>
                        <Link href="/products">
                          <button 
                            onClick={() => setIsCartDropdownOpen(false)}
                            className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Alışverişe Başla
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Cart Items Preview */}
                        <div className="p-4 border-b border-primary-600">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">Sepetim ({totalItems} ürün)</span>
                          </div>
                          
                          {/* Show first 3 items */}
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {items.slice(0, 3).map((item) => (
                              <div key={item.id} className="flex items-center space-x-3 p-2 bg-primary-700 rounded-lg group">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center text-lg">
                                  {item.image}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                                  <p className="text-primary-300 text-xs">
                                    {item.quantity} adet × ₺{item.price}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="text-accent-400 text-sm font-medium">
                                    ₺{(item.price * item.quantity).toLocaleString()}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveItem(item)
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 transition-all hover:bg-red-500/10 rounded"
                                    title="Sepetten Çıkar"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {items.length > 3 && (
                              <p className="text-primary-400 text-xs text-center py-2">
                                +{items.length - 3} ürün daha...
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Cart Actions */}
                        <div className="p-4 space-y-2">
                          <Link href="/cart">
                            <button 
                              onClick={() => setIsCartDropdownOpen(false)}
                              className="w-full bg-accent-600 hover:bg-accent-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span>Sepete Git</span>
                            </button>
                          </Link>
                          
                          <button 
                            onClick={handleClearCart}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Sepeti Boşalt</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative" ref={userDropdownRef}>
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="text-primary-300 hover:text-accent-400 transition-colors flex items-center space-x-1"
                >
                  <User className="h-5 w-5" />
                  {isUserLoggedIn && <ChevronDown className="h-3 w-3" />}
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-primary-800 border border-primary-600 rounded-lg shadow-xl z-50">
                    {isUserLoggedIn ? (
                      <>
                        {/* Logged In User */}
                        <div className="p-4 border-b border-primary-600">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">{userData?.name || 'Kullanıcı'}</p>
                              <p className="text-primary-300 text-xs">{userData?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* User Menu Items */}
                        <div className="p-2">
                          <Link href="/profile">
                            <button 
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="w-full text-left px-3 py-2 text-primary-300 hover:text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              <span>Profilim</span>
                            </button>
                          </Link>
                          
                          <Link href="/profile?tab=orders">
                            <button 
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="w-full text-left px-3 py-2 text-primary-300 hover:text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
                            >
                              <ShoppingCart className="h-4 w-4" />
                              <span>Siparişlerim</span>
                            </button>
                          </Link>

                          <Link href="/profile?tab=favorites">
                            <button 
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="w-full text-left px-3 py-2 text-primary-300 hover:text-white hover:bg-primary-700 rounded-lg transition-colors flex items-center space-x-2"
                            >
                              <Settings className="h-4 w-4" />
                              <span>Favorilerim</span>
                            </button>
                          </Link>

                          <hr className="border-primary-600 my-2" />
                          
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center space-x-2"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Çıkış Yap</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Not Logged In */
                      <div className="p-4">
                        <div className="text-center mb-4">
                          <User className="h-12 w-12 text-primary-500 mx-auto mb-2" />
                          <p className="text-primary-300 text-sm mb-4">Hesabınıza giriş yapın</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Link href="/auth/login">
                            <button 
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <User className="h-4 w-4" />
                              <span>Giriş Yap</span>
                            </button>
                          </Link>
                          
                          <Link href="/auth/register">
                            <button 
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <UserPlus className="h-4 w-4" />
                              <span>Kayıt Ol</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-primary-300 hover:text-accent-400 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-primary-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-black hover:text-accent-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={() => {
              setIsSearchOpen(false)
              setSearchQuery('')
            }}
          ></div>
          
          {/* Modal */}
          <div className="flex min-h-full items-start justify-center p-4 pt-20">
            <div className="relative bg-primary-800 rounded-xl shadow-2xl w-full max-w-2xl border border-primary-600">
              {/* Search Input */}
              <form onSubmit={handleSearch} className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün, marka veya kategori ara..."
                    className="w-full pl-12 pr-4 py-4 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-primary-400 hover:text-white transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                    <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-primary-400 bg-primary-900 rounded border border-primary-600">
                      ESC
                    </kbd>
                  </div>
                </div>
              </form>

              {/* Quick Links */}
              <div className="border-t border-primary-600 p-4">
                <p className="text-primary-400 text-sm mb-3">Popüler Aramalar:</p>
                <div className="flex flex-wrap gap-2">
                  {['BMW', 'Mercedes', 'Audi', 'Spor Egzoz', 'LED Far', 'Hava Filtresi'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term)
                        searchInputRef.current?.focus()
                      }}
                      className="px-3 py-1 bg-primary-700 hover:bg-primary-600 text-primary-300 hover:text-white rounded-full text-sm transition-colors border border-primary-600"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="border-t border-primary-600 px-6 py-4 bg-primary-900 rounded-b-xl">
                <div className="flex items-center justify-between text-xs text-primary-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-primary-800 rounded border border-primary-600">↵</kbd>
                      <span>Ara</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-2 py-1 bg-primary-800 rounded border border-primary-600">ESC</kbd>
                      <span>Kapat</span>
                    </span>
                  </div>
                  <span className="hidden sm:inline">
                    <kbd className="px-2 py-1 bg-primary-800 rounded border border-primary-600">Ctrl</kbd>
                    <span className="mx-1">+</span>
                    <kbd className="px-2 py-1 bg-primary-800 rounded border border-primary-600">K</kbd>
                    <span className="ml-1">ile hızlı ara</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Live Chat Widget */}
      <LiveChat />

      {/* Footer */}
      <footer className="bg-primary-800 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-accent-500" />
                <span className="text-2xl font-bold gradient-text">DynSteel</span>
              </div>
              <p className="text-primary-400 mb-4 max-w-md">
                Araba modifiye parçalarında uzman. Bulamadığınız parçaları 3D tarama teknolojisi ile özel olarak üretiyoruz.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-accent-400" />
                  <span className="text-primary-300">WhatsApp: 0545 846 3523</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-accent-400" />
                  <span className="text-primary-300">info@dynsteel.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-accent-400" />
                  <span className="text-primary-300">Kargo: PTT</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="h-5 w-5 text-accent-400" />
                  <a 
                    href="https://instagram.com/dynsteelauto" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-300 hover:text-accent-400 transition-colors"
                  >
                    @dynsteelauto
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li><a href="/products" className="text-primary-400 hover:text-accent-400 transition-colors">Ürünler</a></li>
                <li><a href="/3d-scan" className="text-primary-400 hover:text-accent-400 transition-colors">3D Tarama</a></li>
                <li><a href="/categories" className="text-primary-400 hover:text-accent-400 transition-colors">Kategoriler</a></li>
                <li><a href="/about" className="text-primary-400 hover:text-accent-400 transition-colors">Hakkımızda</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-4">Destek & İletişim</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://wa.me/905458463523" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent-400 transition-colors flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>WhatsApp: 0545 846 3523</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@dynsteel.com" className="text-primary-400 hover:text-accent-400 transition-colors flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>info@dynsteel.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/dynsteelauto" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent-400 transition-colors flex items-center space-x-2">
                    <Instagram className="h-4 w-4" />
                    <span>@dynsteelauto</span>
                  </a>
                </li>
                <li className="text-primary-400 flex items-center space-x-2">
                  <Truck className="h-4 w-4" />
                  <span>Kargo: PTT</span>
                </li>
                <li><a href="/faq" className="text-primary-400 hover:text-accent-400 transition-colors">Sık Sorulan Sorular</a></li>
                <li><a href="/returns" className="text-primary-400 hover:text-accent-400 transition-colors">İade & Değişim</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-700 mt-8 pt-8">
            <p className="text-center text-primary-400">
              © 2024 DynSteel. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default memo(Layout)
