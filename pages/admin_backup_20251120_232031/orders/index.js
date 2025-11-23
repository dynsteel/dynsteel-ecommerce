import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'
import { useState } from 'react'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download
} from 'lucide-react'

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Demo sipariş verileri
  const [orders, setOrders] = useState([
    {
      id: 'DS1703445234',
      customer: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@email.com',
        phone: '0532 123 4567',
        address: 'Atatürk Mah. Cumhuriyet Cad. No:123/5 Kadıköy/İstanbul'
      },
      items: [
        { id: 1, name: 'Ferrari F40 Minyatür', price: 899, quantity: 1, image: '🏎️' },
        { id: 2, name: 'BMW M3 E46 1:18', price: 649, quantity: 1, image: '🚗' }
      ],
      total: 1548,
      shipping: 0,
      status: 'processing',
      paymentMethod: 'credit-card',
      paymentStatus: 'paid',
      orderDate: '2025-01-20T10:30:00',
      shippingDate: null,
      deliveryDate: null,
      trackingNumber: null,
      notes: 'Müşteri hızlı teslimat talep etti'
    },
    {
      id: 'DS1703445123',
      customer: {
        name: 'Ayşe Kaya',
        email: 'ayse@email.com',
        phone: '0533 987 6543',
        address: 'Barbaros Mah. İnönü Cad. No:45/2 Beşiktaş/İstanbul'
      },
      items: [
        { id: 3, name: 'Porsche 911 GT3 RS', price: 1199, quantity: 1, image: '🏁' }
      ],
      total: 1199,
      shipping: 0,
      status: 'shipped',
      paymentMethod: 'bank-transfer',
      paymentStatus: 'paid',
      orderDate: '2025-01-18T14:15:00',
      shippingDate: '2025-01-19T09:00:00',
      deliveryDate: null,
      trackingNumber: 'PTT123456789',
      notes: ''
    },
    {
      id: 'DS1703444999',
      customer: {
        name: 'Mehmet Özkan',
        email: 'mehmet@email.com',
        phone: '0534 555 1234',
        address: 'Çankaya Mah. Atatürk Bulv. No:78/12 Çankaya/Ankara'
      },
      items: [
        { id: 4, name: 'Mercedes AMG GT', price: 999, quantity: 1, image: '🚙' },
        { id: 5, name: 'Audi R8 V10', price: 849, quantity: 1, image: '🚘' }
      ],
      total: 1873,
      shipping: 25,
      status: 'delivered',
      paymentMethod: 'credit-card',
      paymentStatus: 'paid',
      orderDate: '2025-01-15T16:45:00',
      shippingDate: '2025-01-16T11:30:00',
      deliveryDate: '2025-01-18T14:20:00',
      trackingNumber: 'PTT987654321',
      notes: 'Teslim edildi - Müşteri memnun'
    },
    {
      id: 'DS1703444888',
      customer: {
        name: 'Fatma Demir',
        email: 'fatma@email.com',
        phone: '0535 777 8888',
        address: 'Konak Mah. Gazi Cad. No:156/8 Konak/İzmir'
      },
      items: [
        { id: 6, name: 'Lamborghini Huracán', price: 1299, quantity: 1, image: '🟡' }
      ],
      total: 1324,
      shipping: 25,
      status: 'pending',
      paymentMethod: 'bank-transfer',
      paymentStatus: 'waiting',
      orderDate: '2025-01-22T12:00:00',
      shippingDate: null,
      deliveryDate: null,
      trackingNumber: null,
      notes: 'Ödeme bekleniyor'
    }
  ])

  const statusOptions = [
    { value: 'all', label: 'Tüm Siparişler', color: 'gray' },
    { value: 'pending', label: 'Beklemede', color: 'yellow' },
    { value: 'processing', label: 'Hazırlanıyor', color: 'blue' },
    { value: 'shipped', label: 'Kargoda', color: 'purple' },
    { value: 'delivered', label: 'Teslim Edildi', color: 'green' },
    { value: 'cancelled', label: 'İptal Edildi', color: 'red' }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      processing: { label: 'Hazırlanıyor', color: 'bg-blue-100 text-blue-800', icon: Package },
      shipped: { label: 'Kargoda', color: 'bg-purple-100 text-purple-800', icon: Truck },
      delivered: { label: 'Teslim Edildi', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'İptal Edildi', color: 'bg-red-100 text-red-800', icon: XCircle }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const getPaymentStatusBadge = (status) => {
    return status === 'paid' ? (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Ödendi
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
        <Clock className="h-3 w-3 mr-1" />
        Beklemede
      </span>
    )
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, shippingDate: newStatus === 'shipped' ? new Date().toISOString() : order.shippingDate }
        : order
    ))
  }

  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderModal(true)
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const processingOrders = orders.filter(o => o.status === 'processing').length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sipariş Yönetimi</h1>
            <p className="text-gray-600">Tüm siparişleri buradan yönetebilirsiniz</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">₺{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kargoda</p>
                <p className="text-2xl font-bold text-gray-900">{shippedOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Sipariş ara... (No, müşteri adı, email)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Müşteri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürünler
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Toplam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ödeme
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="text-lg border-2 border-white rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center">
                            {item.image}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{order.items.length} ürün</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₺{order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-xs border-0 bg-transparent focus:ring-0 p-0"
                      >
                        {statusOptions.filter(s => s.value !== 'all').map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-1">
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => viewOrderDetails(order)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="Detayları Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" title="Düzenle">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 p-1 rounded transition-colors" title="Fatura İndir">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sipariş bulunamadı</h3>
            <p className="text-gray-600">Arama kriterlerinize uygun sipariş bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Sipariş Detayları - #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Müşteri Bilgileri */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Müşteri Bilgileri
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Ad:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>E-posta:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Telefon:</strong> {selectedOrder.customer.phone}</p>
                  <p><strong>Adres:</strong> {selectedOrder.customer.address}</p>
                </div>
              </div>

              {/* Sipariş Bilgileri */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Sipariş Bilgileri
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Sipariş Tarihi:</strong> {new Date(selectedOrder.orderDate).toLocaleString('tr-TR')}</p>
                  <p><strong>Durum:</strong> {getStatusBadge(selectedOrder.status)}</p>
                  <p><strong>Ödeme:</strong> {getPaymentStatusBadge(selectedOrder.paymentStatus)}</p>
                  <p><strong>Ödeme Yöntemi:</strong> {selectedOrder.paymentMethod === 'credit-card' ? 'Kredi Kartı' : 'Banka Havalesi'}</p>
                  {selectedOrder.trackingNumber && (
                    <p><strong>Takip No:</strong> {selectedOrder.trackingNumber}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Ürünler */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Sipariş Edilen Ürünler</h4>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Adet: {item.quantity} × ₺{item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₺{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Toplam */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Toplam Tutar:</span>
                <span className="text-xl font-bold text-blue-600">₺{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Notlar */}
            {selectedOrder.notes && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Notlar</h4>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">{selectedOrder.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}