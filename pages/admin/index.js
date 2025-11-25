import AdminLayout from '../../components/AdminLayout'
import { 
  TrendingUp, 
  TrendingDown,
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Calendar
} from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
    productsChange: 0,
    customersChange: 0
  })

  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/dashboard')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Dashboard verileri yüklenemedi')
        }

        setStats(data.stats || stats)
        setRecentOrders(data.recentOrders || [])
        setTopProducts(data.topProducts || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${
          trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-blue-100'
        }`}>
          <Icon className={`h-6 w-6 ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'
          }`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )

  const getStatusBadge = (status, color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      red: 'bg-red-100 text-red-700 border-red-200'
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${colors[color]}`}>
        {status}
      </span>
    )
  }

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">DynSteel E-Commerce genel bakış ve istatistikler</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          title="Toplam Gelir"
          value={`₺${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Toplam Sipariş"
          value={stats.totalOrders}
          change={stats.ordersChange}
          icon={ShoppingCart}
          trend="up"
        />
        <StatCard
          title="Toplam Ürün"
          value={stats.totalProducts}
          change={stats.productsChange}
          icon={Package}
          trend="down"
        />
        <StatCard
          title="Müşteriler"
          value={stats.totalCustomers}
          change={stats.customersChange}
          icon={Users}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Son Siparişler</h2>
              <a href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör →
              </a>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sipariş No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Müşteri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tutar</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">Henüz sipariş bulunmuyor</p>
                        <p className="text-xs mt-1">İlk sipariş geldiğinde burada görünecek</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">₺{order.total}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status, order.statusColor)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => window.location.href = `/admin/orders?id=${order.id}`}
                          className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Sipariş detaylarını görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">En Çok Satan Ürünler</h2>
          </div>
          <div className="p-6">
            {topProducts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">Henüz ürün satışı yok</p>
                  <p className="text-xs mt-1">İlk satış yapıldığında burada görünecek</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{product.sales} satış</span>
                        <span className="text-xs font-semibold text-gray-900">₺{product.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {product.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 md:p-8 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/products"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105 text-center"
          >
            <Package className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Yeni Ürün</span>
          </a>
          <a
            href="/admin/orders"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105 text-center"
          >
            <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Siparişler</span>
          </a>
          <a
            href="/admin/users"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105 text-center"
          >
            <Users className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Müşteriler</span>
          </a>
          <a
            href="/admin/reports"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105 text-center"
          >
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <span className="text-sm font-medium">Raporlar</span>
          </a>
        </div>
      </div>
        </>
      )}
    </AdminLayout>
  )
}
