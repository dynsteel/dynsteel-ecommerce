import Layout from '../../components/Layout'
import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  Search,
  Calendar,
  User,
  Clock,
  Eye,
  MessageCircle,
  Tag,
  TrendingUp,
  BookOpen,
  Filter,
  ChevronRight
} from 'lucide-react'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Demo blog yazıları
  const blogPosts = [
    {
      id: 1,
      title: 'Minyatür Araba Koleksiyonculuğuna Başlangıç Rehberi',
      slug: 'minyatur-araba-koleksiyonculuguna-baslangic-rehberi',
      excerpt: 'Minyatür araba koleksiyonculuğuna yeni başlayanlar için kapsamlı rehber. Hangi markalardan başlamalı, neye dikkat etmeli?',
      content: 'Blog içeriği burada olacak...',
      author: 'DynSteel Editör',
      publishDate: '2025-01-20',
      readTime: '5 dakika',
      views: 1247,
      comments: 23,
      category: 'Rehber',
      tags: ['Koleksiyonculuk', 'Başlangıç', 'Rehber'],
      image: '🏎️',
      featured: true
    },
    {
      id: 2,
      title: '2025\'in En Popüler Minyatür Araba Modelleri',
      slug: '2025-en-populer-minyatur-araba-modelleri',
      excerpt: 'Bu yıl koleksiyonerlerin en çok tercih ettiği minyatür araba modelleri ve öne çıkan özellikleri.',
      content: 'Blog içeriği burada olacak...',
      author: 'Ahmet Yılmaz',
      publishDate: '2025-01-18',
      readTime: '7 dakika',
      views: 892,
      comments: 15,
      category: 'Ürün İnceleme',
      tags: ['2025', 'Trend', 'Modeller'],
      image: '🚗',
      featured: false
    },
    {
      id: 3,
      title: '3D Tarama Teknolojisi ile Özel Parça Üretimi',
      slug: '3d-tarama-teknolojisi-ozel-parca-uretimi',
      excerpt: '3D tarama teknolojisinin minyatür araba dünyasındaki devrimsel etkisi ve özel parça üretim süreci.',
      content: 'Blog içeriği burada olacak...',
      author: 'Teknoloji Uzmanı',
      publishDate: '2025-01-15',
      readTime: '10 dakika',
      views: 1534,
      comments: 31,
      category: 'Teknoloji',
      tags: ['3D Tarama', 'Teknoloji', 'Üretim'],
      image: '🔬',
      featured: true
    },
    {
      id: 4,
      title: 'Ferrari Minyatürlerinin Tarihçesi ve Değeri',
      slug: 'ferrari-minyaturlerinin-tarihcesi-ve-degeri',
      excerpt: 'Ferrari minyatür modellerinin koleksiyonculuk değeri ve tarihsel önemi hakkında detaylı inceleme.',
      content: 'Blog içeriği burada olacak...',
      author: 'Koleksiyoncu Uzmanı',
      publishDate: '2025-01-12',
      readTime: '8 dakika',
      views: 2156,
      comments: 47,
      category: 'Marka İnceleme',
      tags: ['Ferrari', 'Tarih', 'Değer'],
      image: '🏁',
      featured: false
    },
    {
      id: 5,
      title: 'Minyatür Arabalarınızı Nasıl Korumalısınız?',
      slug: 'minyatur-arabalarinizi-nasil-korumalsiniz',
      excerpt: 'Değerli koleksiyonunuzu uzun yıllar korumanın püf noktaları ve bakım önerileri.',
      content: 'Blog içeriği burada olacak...',
      author: 'Bakım Uzmanı',
      publishDate: '2025-01-10',
      readTime: '6 dakika',
      views: 743,
      comments: 19,
      category: 'Bakım',
      tags: ['Bakım', 'Koruma', 'İpuçları'],
      image: '🛡️',
      featured: false
    },
    {
      id: 6,
      title: 'Ölçek Seçimi: 1:18, 1:24, 1:43 Hangisi Daha İyi?',
      slug: 'olcek-secimi-1-18-1-24-1-43-hangisi-daha-iyi',
      excerpt: 'Minyatür araba ölçeklerinin karşılaştırması ve hangi ölçeği seçmeniz gerektiği hakkında rehber.',
      content: 'Blog içeriği burada olacak...',
      author: 'DynSteel Editör',
      publishDate: '2025-01-08',
      readTime: '4 dakika',
      views: 1089,
      comments: 28,
      category: 'Rehber',
      tags: ['Ölçek', 'Karşılaştırma', 'Seçim'],
      image: '📏',
      featured: false
    }
  ]

  // Kategoriler
  const categories = [
    { key: 'all', name: 'Tümü', count: blogPosts.length },
    { key: 'Rehber', name: 'Rehber', count: blogPosts.filter(p => p.category === 'Rehber').length },
    { key: 'Ürün İnceleme', name: 'Ürün İnceleme', count: blogPosts.filter(p => p.category === 'Ürün İnceleme').length },
    { key: 'Teknoloji', name: 'Teknoloji', count: blogPosts.filter(p => p.category === 'Teknoloji').length },
    { key: 'Marka İnceleme', name: 'Marka İnceleme', count: blogPosts.filter(p => p.category === 'Marka İnceleme').length },
    { key: 'Bakım', name: 'Bakım', count: blogPosts.filter(p => p.category === 'Bakım').length }
  ]

  // Filtreleme
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const popularTags = ['Koleksiyonculuk', 'Ferrari', 'Teknoloji', '3D Tarama', 'Rehber', 'Bakım']

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
            <span className="text-white font-medium">Blog</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">DynSteel Blog</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Minyatür araba dünyasının en güncel haberleri, rehberleri ve uzman görüşleri
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Blog yazılarında ara..."
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Posts */}
              {selectedCategory === 'all' && searchTerm === '' && (
                <div className="mb-12">
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    <h2 className="text-2xl font-bold text-gray-900">Öne Çıkan Yazılar</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                          <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                              <div className="text-6xl">{post.image}</div>
                            </div>
                            <div className="absolute top-4 left-4">
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Öne Çıkan
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center space-x-4 mb-3">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                {post.category}
                              </span>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {post.readTime}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1" />
                                  {post.views.toLocaleString()}
                                </div>
                              </div>
                              
                              <div className="flex items-center text-blue-600 font-medium">
                                <span>Devamını Oku</span>
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'Tüm Yazılar' : selectedCategory}
                  </h2>
                  <span className="text-gray-500">
                    {filteredPosts.length} yazı bulundu
                  </span>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Yazı bulunamadı
                    </h3>
                    <p className="text-gray-600">
                      Arama kriterlerinizi değiştirerek tekrar deneyin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                          <div className="md:flex">
                            <div className="md:w-48 md:flex-shrink-0">
                              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 md:h-full flex items-center justify-center">
                                <div className="text-4xl">{post.image}</div>
                              </div>
                            </div>
                            
                            <div className="p-6 flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                  {post.category}
                                </span>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                                </div>
                                <div className="flex items-center text-gray-500 text-sm">
                                  <User className="h-4 w-4 mr-1" />
                                  {post.author}
                                </div>
                              </div>
                              
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4">
                                {post.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {post.readTime}
                                  </div>
                                  <div className="flex items-center">
                                    <Eye className="h-4 w-4 mr-1" />
                                    {post.views.toLocaleString()}
                                  </div>
                                  <div className="flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    {post.comments}
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Popular Tags */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2 text-blue-600" />
                    Popüler Etiketler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Son Yazılar
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <div className="flex space-x-3 group cursor-pointer">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0">
                            <div className="text-2xl">{post.image}</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Blog Güncellemeleri</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Yeni blog yazılarımızdan haberdar olmak için e-posta listemize katılın.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="E-posta adresiniz"
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                    <button className="w-full bg-white text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-colors">
                      Abone Ol
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
