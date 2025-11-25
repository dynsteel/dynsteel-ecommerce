import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  UserCheck,
  Users,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
  MapPin,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function UsersManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)

  // Kullanıcı verileri
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/users')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Kullanıcılar yüklenemedi')
        }

        setUsers(data.users || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching users:', err)
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const statusOptions = [
    { value: 'all', label: 'Tüm Kullanıcılar' },
    { value: 'active', label: 'Aktif' },
    { value: 'inactive', label: 'Pasif' },
    { value: 'banned', label: 'Yasaklı' }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Aktif', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      inactive: { label: 'Pasif', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      banned: { label: 'Yasaklı', color: 'bg-red-100 text-red-800', icon: Ban }
    }
    
    const config = statusConfig[status] || statusConfig.active
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ))
  }

  const viewUserDetails = (user) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const newUsersThisMonth = users.filter(u => {
    const registerDate = new Date(u.registerDate)
    const now = new Date()
    return registerDate.getMonth() === now.getMonth() && registerDate.getFullYear() === now.getFullYear()
  }).length
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
            <p className="text-gray-600">Tüm kullanıcıları buradan yönetebilirsiniz</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bu Ay Yeni</p>
                <p className="text-2xl font-bold text-gray-900">{newUsersThisMonth}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                <p className="text-2xl font-bold text-gray-900">₺{totalRevenue.toLocaleString()}</p>
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
                  placeholder="Kullanıcı ara... (Ad, email, telefon)"
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

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Kullanıcılar yükleniyor...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İletişim
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kayıt/Son Giriş
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Siparişler
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harcama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.isVerified && (
                              <Shield className="h-4 w-4 text-green-500 ml-2" title="Doğrulanmış" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>Kayıt: {new Date(user.registerDate).toLocaleDateString('tr-TR')}</div>
                      <div>Son: {new Date(user.lastLogin).toLocaleDateString('tr-TR')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 text-gray-400 mr-1" />
                        {user.totalOrders} sipariş
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₺{user.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.status}
                        onChange={(e) => updateUserStatus(user.id, e.target.value)}
                        className="text-xs border-0 bg-transparent focus:ring-0 p-0"
                      >
                        {statusOptions.filter(s => s.value !== 'all').map(status => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                      <div className="mt-1">
                        {getStatusBadge(user.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => viewUserDetails(user)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="Detayları Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors" title="Düzenle">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => updateUserStatus(user.id, user.status === 'banned' ? 'active' : 'banned')}
                          className={`p-1 rounded transition-colors ${
                            user.status === 'banned' 
                              ? 'text-green-600 hover:text-green-900' 
                              : 'text-red-600 hover:text-red-900'
                          }`}
                          title={user.status === 'banned' ? 'Yasağı Kaldır' : 'Yasakla'}
                        >
                          {user.status === 'banned' ? <CheckCircle className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Kullanıcı bulunamadı</h3>
            <p className="text-gray-600">Arama kriterlerinize uygun kullanıcı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                Kullanıcı Detayları - {selectedUser.name}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <AlertCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kişisel Bilgiler */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Kişisel Bilgiler
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Ad:</strong> {selectedUser.name}</p>
                  <p><strong>E-posta:</strong> {selectedUser.email}</p>
                  <p><strong>Telefon:</strong> {selectedUser.phone}</p>
                  <p><strong>Durum:</strong> {getStatusBadge(selectedUser.status)}</p>
                  <p><strong>Doğrulanmış:</strong> {selectedUser.isVerified ? '✅ Evet' : '❌ Hayır'}</p>
                  <p><strong>Adres:</strong> {selectedUser.address}</p>
                </div>
              </div>

              {/* İstatistikler */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Alışveriş İstatistikleri
                </h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Kayıt Tarihi:</strong> {new Date(selectedUser.registerDate).toLocaleDateString('tr-TR')}</p>
                  <p><strong>Son Giriş:</strong> {new Date(selectedUser.lastLogin).toLocaleDateString('tr-TR')}</p>
                  <p><strong>Toplam Sipariş:</strong> {selectedUser.totalOrders}</p>
                  <p><strong>Toplam Harcama:</strong> ₺{selectedUser.totalSpent.toLocaleString()}</p>
                  <p><strong>Ortalama Sipariş:</strong> ₺{Math.round(selectedUser.totalSpent / selectedUser.totalOrders).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Son Siparişler */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Son Siparişler</h4>
              <div className="space-y-3">
                {selectedUser.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">#{order.id}</p>
                      <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₺{order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'delivered' ? 'Teslim Edildi' :
                         order.status === 'shipped' ? 'Kargoda' :
                         order.status === 'processing' ? 'Hazırlanıyor' : 'Beklemede'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notlar */}
            {selectedUser.notes && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Notlar</h4>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">{selectedUser.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}