import AdminLayout from '../../../components/AdminLayout'
import { useState } from 'react'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

export default function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState('30')
  const [reportType, setReportType] = useState('sales')

  // Demo analitik verileri
  const salesData = {
    totalRevenue: 125400,
    totalOrders: 342,
    averageOrderValue: 367,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    conversionRate: 3.2
  }

  const topProducts = [
    { id: 1, name: 'Ferrari F40 Minyatür', sales: 45, revenue: 40455, image: '🏎️' },
    { id: 2, name: 'BMW M3 E46 1:18', sales: 38, revenue: 24662, image: '🚗' },
    { id: 3, name: 'Porsche 911 GT3 RS', sales: 35, revenue: 41965, image: '🏁' },
    { id: 4, name: 'Mercedes AMG GT', sales: 32, revenue: 31968, image: '🚙' },
    { id: 5, name: 'Audi R8 V10', sales: 28, revenue: 23772, image: '🚘' }
  ]

  const topCategories = [
    { name: 'Ferrari', sales: 89, percentage: 26.0, color: 'bg-red-500' },
    { name: 'BMW', sales: 67, percentage: 19.6, color: 'bg-blue-500' },
    { name: 'Porsche', sales: 54, percentage: 15.8, color: 'bg-yellow-500' },
    { name: 'Mercedes', sales: 48, percentage: 14.0, color: 'bg-gray-500' },
    { name: 'Audi', sales: 42, percentage: 12.3, color: 'bg-green-500' },
    { name: 'Diğer', sales: 42, percentage: 12.3, color: 'bg-purple-500' }
  ]

  const monthlyData = [
    { month: 'Ocak', revenue: 45200, orders: 123 },
    { month: 'Şubat', revenue: 52100, orders: 145 },
    { month: 'Mart', revenue: 48900, orders: 134 },
    { month: 'Nisan', revenue: 61200, orders: 167 },
    { month: 'Mayıs', revenue: 58700, orders: 159 },
    { month: 'Haziran', revenue: 67400, orders: 184 }
  ]

  const customerInsights = {
    totalCustomers: 1247,
    newCustomers: 89,
    returningCustomers: 156,
    customerRetention: 67.8,
    averageLifetimeValue: 2340
  }

  const inventoryData = [
    { product: 'Ferrari F40', stock: 15, status: 'good', reorderPoint: 10 },
    { product: 'BMW M3 E30', stock: 8, status: 'low', reorderPoint: 10 },
    { product: 'Mercedes AMG GT', stock: 0, status: 'out', reorderPoint: 10 },
    { product: 'Porsche 911', stock: 12, status: 'good', reorderPoint: 10 },
    { product: 'Audi R8', stock: 3, status: 'critical', reorderPoint: 10 }
  ]

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800'
      case 'low': return 'bg-yellow-100 text-yellow-800'
      case 'critical': return 'bg-orange-100 text-orange-800'
      case 'out': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockStatusText = (status) => {
    switch (status) {
      case 'good': return 'İyi'
      case 'low': return 'Az'
      case 'critical': return 'Kritik'
      case 'out': return 'Tükendi'
      default: return 'Bilinmiyor'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Raporlar ve Analitik</h1>
            <p className="text-gray-600">İş performansınızı analiz edin</p>
          </div>
          
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7">Son 7 Gün</option>
              <option value="30">Son 30 Gün</option>
              <option value="90">Son 3 Ay</option>
              <option value="365">Son 1 Yıl</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Rapor İndir</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">₺{salesData.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 ml-1">+{salesData.revenueGrowth}%</span>
              <span className="text-sm text-gray-500 ml-2">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">{salesData.totalOrders}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 ml-1">+{salesData.ordersGrowth}%</span>
              <span className="text-sm text-gray-500 ml-2">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Sepet</p>
                <p className="text-2xl font-bold text-gray-900">₺{salesData.averageOrderValue}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600 ml-1">+5.2%</span>
              <span className="text-sm text-gray-500 ml-2">önceki döneme göre</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dönüşüm Oranı</p>
                <p className="text-2xl font-bold text-gray-900">%{salesData.conversionRate}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <div className="mt-4 flex items-center">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-600 ml-1">-0.8%</span>
              <span className="text-sm text-gray-500 ml-2">önceki döneme göre</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Gelir Trendi</h3>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 w-16">{data.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[200px]">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(data.revenue / 70000) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">₺{data.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{data.orders} sipariş</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Dağılımı</h3>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{category.sales} satış</div>
                      <div className="text-xs text-gray-500">%{category.percentage}</div>
                    </div>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${category.color}`}
                        style={{width: `${category.percentage * 4}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">En Çok Satan Ürünler</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ürün</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Satış Adedi</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Gelir</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pay</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{product.image}</div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{product.sales}</td>
                    <td className="py-3 px-4 text-gray-900">₺{product.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{width: `${(product.sales / 50) * 100}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{Math.round((product.sales / 180) * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer Insights & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Insights */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Müşteri Analizi</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Toplam Müşteri</span>
                <span className="text-lg font-bold text-gray-900">{customerInsights.totalCustomers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Yeni Müşteri</span>
                <span className="text-lg font-bold text-green-600">{customerInsights.newCustomers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Geri Dönen</span>
                <span className="text-lg font-bold text-blue-600">{customerInsights.returningCustomers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Sadakat Oranı</span>
                <span className="text-lg font-bold text-purple-600">%{customerInsights.customerRetention}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Yaşam Boyu Değer</span>
                <span className="text-lg font-bold text-yellow-600">₺{customerInsights.averageLifetimeValue}</span>
              </div>
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stok Durumu</h3>
            <div className="space-y-3">
              {inventoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{item.product}</span>
                    <div className="text-sm text-gray-500">Min: {item.reorderPoint} adet</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.stock} adet</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStockStatusColor(item.status)}`}>
                      {getStockStatusText(item.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Raporlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Satış Raporu</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">Müşteri Raporu</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">Stok Raporu</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}