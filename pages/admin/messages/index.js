import AdminLayout from '../../../components/AdminLayout'
import { useState, useEffect } from 'react'
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  User,
  Calendar,
  MessageCircle,
  CheckCircle,
  XCircle,
  Trash2,
  Clock,
  X
} from 'lucide-react'

export default function MessagesManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false)

  // Message data
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/admin/messages?status=${statusFilter}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Mesajlar yüklenemedi')
        }

        setMessages(data.messages || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching messages:', err)
        setError(err.message)
        setMessages([])
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [statusFilter])

  const statusOptions = [
    { value: 'all', label: 'Tüm Mesajlar', color: 'gray' },
    { value: 'new', label: 'Yeni', color: 'blue' },
    { value: 'read', label: 'Okundu', color: 'green' },
    { value: 'replied', label: 'Yanıtlandı', color: 'purple' },
    { value: 'archived', label: 'Arşivlendi', color: 'gray' }
  ]

  const getStatusBadge = (status, replied) => {
    if (replied) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Yanıtlandı
        </span>
      )
    }

    const statusConfig = {
      new: { label: 'Yeni', color: 'bg-blue-100 text-blue-800', icon: Clock },
      read: { label: 'Okundu', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      replied: { label: 'Yanıtlandı', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
      archived: { label: 'Arşivlendi', color: 'bg-gray-100 text-gray-800', icon: XCircle }
    }
    
    const config = statusConfig[status] || statusConfig.new
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (message.subject && message.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch
  })

  const handleViewMessage = async (message) => {
    setSelectedMessage(message)
    setShowMessageModal(true)

    // Mark as read if status is 'new'
    if (message.status === 'new') {
      try {
        await fetch('/api/admin/messages', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: message.id,
            status: 'read'
          })
        })
        
        // Update local state
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === message.id ? { ...msg, status: 'read' } : msg
          )
        )
      } catch (error) {
        console.error('Error updating message status:', error)
      }
    }
  }

  const handleMarkAsReplied = async (messageId) => {
    try {
      await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: messageId,
          replied: true,
          status: 'replied'
        })
      })
      
      // Update local state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, replied: true, status: 'replied' } : msg
        )
      )
      
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(prev => ({ ...prev, replied: true, status: 'replied' }))
      }
    } catch (error) {
      console.error('Error marking as replied:', error)
      alert('Mesaj durumu güncellenirken bir hata oluştu')
    }
  }

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/messages?id=${messageId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Mesaj silinemedi')
      }

      // Remove from local state
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId))
      
      if (selectedMessage && selectedMessage.id === messageId) {
        setShowMessageModal(false)
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Mesaj silinirken bir hata oluştu')
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Bilinmiyor'
    const d = new Date(date)
    return d.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const newMessagesCount = messages.filter(msg => msg.status === 'new').length

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
            <p className="text-gray-600">İletişim formundan gelen mesajları yönetin</p>
          </div>
          {newMessagesCount > 0 && (
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">{newMessagesCount} Yeni Mesaj</span>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="İsim, e-posta veya mesaj ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
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

        {/* Messages Table */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Mesajlar yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gönderen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Konu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mesaj Önizleme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
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
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className={`hover:bg-gray-50 ${message.status === 'new' ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{message.name}</div>
                            <div className="text-sm text-gray-500">{message.email}</div>
                            {message.phone && (
                              <div className="text-xs text-gray-400">{message.phone}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{message.subject}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-md truncate">
                          {message.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(message.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(message.status, message.replied)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewMessage(message)}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Mesajı Görüntüle"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {!message.replied && (
                            <button
                              onClick={() => handleMarkAsReplied(message.id)}
                              className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                              title="Yanıtlandı Olarak İşaretle"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Mesaj bulunamadı</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Arama kriterlerinize uygun mesaj bulunamadı.' : 'Henüz mesaj bulunmuyor.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {showMessageModal && selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowMessageModal(false)}></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Mesaj Detayı</h2>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gönderen</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{selectedMessage.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">E-posta</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:text-blue-800">
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Telefon</label>
                      <div className="mt-1 flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:text-blue-800">
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tarih</label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Konu</label>
                  <div className="mt-1 text-gray-900">{selectedMessage.subject}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Mesaj</label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    {getStatusBadge(selectedMessage.status, selectedMessage.replied)}
                  </div>
                  <div className="flex space-x-2">
                    {!selectedMessage.replied && (
                      <button
                        onClick={() => {
                          handleMarkAsReplied(selectedMessage.id)
                        }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Yanıtlandı Olarak İşaretle</span>
                      </button>
                    )}
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>E-posta ile Yanıtla</span>
                    </a>
                    <button
                      onClick={() => {
                        if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
                          handleDeleteMessage(selectedMessage.id)
                        }
                      }}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Sil</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

