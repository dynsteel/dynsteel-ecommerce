import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { 
  User, 
  ShoppingCart, 
  Heart, 
  Settings, 
  MapPin,
  Phone,
  Mail,
  LogOut,
  Edit,
  Package,
  Calendar,
  TrendingUp,
  Trash2
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { tab = 'overview' } = router.query
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const { favorites, removeFromFavorites } = useFavorites()

  useEffect(() => {
    // Kullanıcı giriş kontrolü
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('userLoggedIn')
      const storedUserData = localStorage.getItem('userData')
      
      if (isLoggedIn !== 'true') {
        router.push('/auth/login')
      } else if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
        setIsLoading(false)
      }
    }
  }, [router])

  const handleLogout = () => {
    if (window.confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
      localStorage.removeItem('userLoggedIn')
      localStorage.removeItem('userData')
      router.push('/')
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: <User className="h-5 w-5" /> },
    { id: 'orders', label: 'Siparişlerim', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'favorites', label: 'Favorilerim', icon: <Heart className="h-5 w-5" /> },
    { id: 'settings', label: 'Ayarlar', icon: <Settings className="h-5 w-5" /> }
  ]

  // Gerçek siparişler - MongoDB'den gelecek
  const demoOrders = []

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
            <span className="text-white font-medium">Profilim</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* User Card */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{userData?.name || 'Kullanıcı'}</h3>
                  <p className="text-sm text-gray-600">{userData?.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {tabs.map((tabItem) => (
                  <button
                    key={tabItem.id}
                    onClick={() => router.push(`/profile?tab=${tabItem.id}`)}
                    className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-colors border-b border-gray-100 last:border-0 ${
                      tab === tabItem.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-l-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tabItem.icon}
                    <span className="font-medium">{tabItem.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Genel Bakış</h2>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <Package className="h-8 w-8 text-blue-600" />
                          <span className="text-3xl font-bold text-blue-600">0</span>
                        </div>
                        <p className="text-gray-700 font-medium">Toplam Sipariş</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                        <div className="flex items-center justify-between mb-3">
                          <Heart className="h-8 w-8 text-purple-600" />
                          <span className="text-3xl font-bold text-purple-600">{favorites.length}</span>
                        </div>
                        <p className="text-gray-700 font-medium">Favori Ürün</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <TrendingUp className="h-8 w-8 text-green-600" />
                          <span className="text-3xl font-bold text-green-600">₺0</span>
                        </div>
                        <p className="text-gray-700 font-medium">Toplam Harcama</p>
                      </div>
                    </div>

                    {/* Recent Orders */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Son Siparişler</h3>
                        <button
                          onClick={() => router.push('/profile?tab=orders')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Tümünü Gör
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {demoOrders.slice(0, 2).map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="text-2xl">{order.items[0].image}</span>
                                  <div>
                                    <p className="font-medium text-gray-900">{order.items[0].name}</p>
                                    <p className="text-sm text-gray-600">Sipariş No: {order.id}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4 text-sm">
                                  <span className="text-gray-600">{new Date(order.date).toLocaleDateString('tr-TR')}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'Teslim Edildi' 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">₺{order.total}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {tab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Siparişlerim</h2>
                  
                  {demoOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Henüz siparişiniz bulunmuyor</p>
                      <Link href="/products">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                          Alışverişe Başla
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {demoOrders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">Sipariş No: {order.id}</h3>
                              <p className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString('tr-TR', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Teslim Edildi' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-3">
                                <div className="text-3xl">{item.image}</div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-600">Miktar: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <span className="text-gray-600">Toplam:</span>
                            <span className="text-xl font-bold text-gray-900">₺{order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {tab === 'favorites' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Favori Ürünlerim</h2>
                  
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Henüz favori ürününüz yok</p>
                      <Link href="/products">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                          Ürünleri Keşfet
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favorites.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors">
                          <Link href={`/products/${product.id}`}>
                            <div className="h-40 bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center cursor-pointer hover:from-primary-600 hover:to-primary-700 transition-all">
                              <div className="text-6xl">{product.image}</div>
                            </div>
                          </Link>
                          <div className="p-4">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">{product.name}</h3>
                            </Link>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xl font-bold text-blue-600">₺{product.price}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                              >
                                <ShoppingCart className="h-4 w-4" />
                                <span>Sepete Ekle</span>
                              </button>
                              <button 
                                onClick={() => removeFromFavorites(product.id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                                title="Favorilerden Çıkar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {tab === 'settings' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hesap Ayarları</h2>
                  
                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                          <input
                            type="text"
                            defaultValue={userData?.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                          <input
                            type="email"
                            defaultValue={userData?.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                          <input
                            type="tel"
                            placeholder="0532 123 4567"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password Change */}
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Şifre</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Yeni Şifre (Tekrar)</label>
                          <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                        Değişiklikleri Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
