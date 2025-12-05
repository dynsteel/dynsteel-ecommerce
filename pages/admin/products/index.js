import AdminLayout from '../../../components/AdminLayout'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  FileText,
  Globe
} from 'lucide-react'

export default function ProductsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Ferrari', label: 'Ferrari' },
    { value: 'BMW', label: 'BMW' },
    { value: 'Mercedes', label: 'Mercedes' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Porsche', label: 'Porsche' },
    { value: 'Volkswagen', label: 'Volkswagen' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Toyota', label: 'Toyota' },
    { value: 'Honda', label: 'Honda' },
    { value: 'Renault', label: 'Renault' },
    { value: 'Peugeot', label: 'Peugeot' },
    { value: 'Opel', label: 'Opel' },
    { value: 'Fiat', label: 'Fiat' },
    { value: 'Seat', label: 'Seat' },
    { value: 'Skoda', label: 'Skoda' },
    { value: 'Hyundai', label: 'Hyundai' },
    { value: 'Kia', label: 'Kia' },
    { value: 'Nissan', label: 'Nissan' }
  ]

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/products')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Ürünler yüklenemedi')
        }

        setProducts(data.products || [])
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category?.toLowerCase() === selectedCategory.toLowerCase() || product.brand?.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/products?id=${id}`, {
          method: 'DELETE'
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Ürün silinemedi')
        }

        // Update local state
        setProducts(products.filter(product => product.id !== id))
      } catch (err) {
        console.error('Error deleting product:', err)
        alert(err.message || 'Ürün silinirken bir hata oluştu')
      }
    }
  }

  const getStatusBadge = (status, stock) => {
    if (status === 'out_of_stock' || stock === 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Tükendi</span>
    } else if (status === 'low_stock' || stock <= 5) {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Az Stok</span>
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Stokta</span>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
            <p className="text-gray-600">Tüm ürünlerinizi buradan yönetebilirsiniz</p>
          </div>
          
          {/* Minyatür Arabaları Ekle Butonu - Kategoriye göre yönlendirme */}
          <Link href={selectedCategory !== 'all' ? `/admin/products/new?category=${selectedCategory}` : '/admin/products/new'}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="h-4 w-4" />
              <span>
                {selectedCategory !== 'all' 
                  ? `${categories.find(c => c.value === selectedCategory)?.label} Kategorisine Minyatür Araba Ekle`
                  : 'Minyatür Arabaları Ekle'}
              </span>
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Az Stok</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock <= 5 && p.stock > 0).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <Trash2 className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tükenen</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock === 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kategori Filtreleri ve Arama */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          {/* Kategori Butonları */}
          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Arama */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Ürünler yükleniyor...</p>
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

        {/* Products Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ürün
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satış
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-3 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          {product.image && (product.image.startsWith('data:image') || product.image.startsWith('http')) ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.style.display = 'none'
                                e.target.parentElement.innerHTML = '<div class="text-xl w-full h-full flex items-center justify-center">🚗</div>'
                              }}
                            />
                          ) : (
                            <div className="text-xl w-full h-full flex items-center justify-center">
                              {product.image || '🚗'}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 font-mono">{product.productCode || 'DS-0000'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺{typeof product.price === 'number' ? product.price.toLocaleString() : product.price || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock} adet
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales || 0} satış
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
                <p className="text-gray-600">Arama kriterlerinize uygun ürün bulunamadı.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
