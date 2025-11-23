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
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Ferrari F40 Minyatür',
      category: 'Ferrari',
      price: 899,
      stock: 15,
      status: 'active',
      image: '🏎️',
      sales: 45,
      createdAt: '2025-01-10'
    },
    {
      id: 2,
      name: 'BMW M3 E30 Minyatür',
      category: 'BMW',
      price: 649,
      stock: 8,
      status: 'active',
      image: '🚗',
      sales: 38,
      createdAt: '2025-01-08'
    },
    {
      id: 3,
      name: 'Mercedes AMG GT Minyatür',
      category: 'Mercedes',
      price: 999,
      stock: 0,
      status: 'out_of_stock',
      image: '🚙',
      sales: 32,
      createdAt: '2025-01-05'
    },
    {
      id: 4,
      name: 'Porsche 911 GT3 RS Minyatür',
      category: 'Porsche',
      price: 1199,
      stock: 12,
      status: 'active',
      image: '🏁',
      sales: 28,
      createdAt: '2025-01-03'
    },
    {
      id: 5,
      name: 'Audi R8 V10 Minyatür',
      category: 'Audi',
      price: 849,
      stock: 3,
      status: 'low_stock',
      image: '🚘',
      sales: 22,
      createdAt: '2025-01-01'
    }
  ])

  const categories = ['all', 'Ferrari', 'BMW', 'Mercedes', 'Porsche', 'Audi', 'Volkswagen', 'Toyota', 'Honda']

  // localStorage'dan ürünleri yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      // Varsayılan ürünler + admin ürünleri
      const defaultProducts = [
        {
          id: 1,
          name: 'Ferrari F40 Minyatür',
          category: 'Ferrari',
          price: 899,
          stock: 15,
          status: 'active',
          image: '🏎️',
          sales: 45,
          createdAt: '2025-01-10'
        },
        {
          id: 2,
          name: 'BMW M3 E30 Minyatür',
          category: 'BMW',
          price: 649,
          stock: 8,
          status: 'active',
          image: '🚗',
          sales: 38,
          createdAt: '2025-01-08'
        },
        {
          id: 3,
          name: 'Mercedes AMG GT Minyatür',
          category: 'Mercedes',
          price: 999,
          stock: 0,
          status: 'out_of_stock',
          image: '🚙',
          sales: 32,
          createdAt: '2025-01-05'
        },
        {
          id: 4,
          name: 'Porsche 911 GT3 RS Minyatür',
          category: 'Porsche',
          price: 1199,
          stock: 12,
          status: 'active',
          image: '🏁',
          sales: 28,
          createdAt: '2025-01-03'
        },
        {
          id: 5,
          name: 'Audi R8 V10 Minyatür',
          category: 'Audi',
          price: 849,
          stock: 3,
          status: 'low_stock',
          image: '🚘',
          sales: 22,
          createdAt: '2025-01-01'
        }
      ]
      
      // Admin ürünlerini formatlayalım
      const formattedAdminProducts = adminProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.brand || product.category,
        price: product.price,
        stock: product.stock || 0,
        status: product.status || (product.stock > 0 ? 'active' : 'out_of_stock'),
        image: product.image || '🚗',
        sales: 0,
        createdAt: new Date(product.id).toISOString().split('T')[0]
      }))
      
      setProducts([...defaultProducts, ...formattedAdminProducts])
    }
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
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      // State'den sil
      const updatedProducts = products.filter(product => product.id !== id)
      setProducts(updatedProducts)
      
      // localStorage'dan da sil (sadece admin ürünleri)
      if (typeof window !== 'undefined') {
        const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
        const updatedAdminProducts = adminProducts.filter(product => product.id !== id)
        localStorage.setItem('adminProducts', JSON.stringify(updatedAdminProducts))
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
          
          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Yeni Ürün Ekle</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                <div className="py-2">
                  <Link href="/admin/products/new">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Admin Panel Ürün Ekleme</div>
                        <div className="text-sm text-gray-500">Detaylı form ile ürün ekle</div>
                      </div>
                    </button>
                  </Link>
                  
                  <Link href="/products?admin=true">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <Globe className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">Web Sitesi Ürünler Sayfası</div>
                        <div className="text-sm text-gray-500">Canlı sayfada hızlı ürün ekle</div>
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
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

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
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
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tüm Kategoriler' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
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
                        <div className="text-2xl mr-3">{product.image}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock} adet
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales} satış
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
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
            <p className="text-gray-600">Arama kriterlerinize uygun ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
