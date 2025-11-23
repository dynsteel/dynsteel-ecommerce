import Layout from '../../components/Layout'
import Newsletter from '../../components/Newsletter'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  MessageCircle,
  Tag,
  Share2,
  Heart,
  BookOpen,
  ThumbsUp,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react'

export default function BlogPostPage() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ name: '', email: '', message: '' })
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  // Demo blog yazısı
  useEffect(() => {
    if (slug) {
      // Gerçek uygulamada API'den gelir
      const demoPost = {
        id: 1,
        title: 'Minyatür Araba Koleksiyonculuğuna Başlangıç Rehberi',
        slug: 'minyatur-araba-koleksiyonculuguna-baslangic-rehberi',
        content: `
          <h2>Koleksiyonculuğa Nasıl Başlanır?</h2>
          <p>Minyatür araba koleksiyonculuğu, hem hobisi hem de yatırımı olan harika bir alan. Bu rehberde size koleksiyonculuğa nasıl başlayacağınızı, neye dikkat etmeniz gerektiğini ve en iyi stratejileri anlatacağız.</p>
          
          <h3>1. Bütçenizi Belirleyin</h3>
          <p>Koleksiyonculuğa başlamadan önce ayıracağınız bütçeyi belirlemek çok önemli. Minyatür arabalar 50₺'den 5000₺'ye kadar değişen fiyatlarda olabilir.</p>
          
          <h3>2. Odaklanacağınız Alanı Seçin</h3>
          <p>Tüm markaları toplamaya çalışmak yerine, belirli bir marka, dönem veya ölçekte uzmanlaşmak daha mantıklı olacaktır.</p>
          
          <h3>3. Kaliteye Odaklanın</h3>
          <p>Az ama kaliteli parçalar toplamak, çok sayıda düşük kaliteli parça toplamaktan daha değerlidir.</p>
          
          <h3>4. Araştırma Yapın</h3>
          <p>Satın almadan önce mutlaka araştırma yapın. Fiyat karşılaştırması yapmayı unutmayın.</p>
          
          <h3>5. Saklama Koşullarına Dikkat Edin</h3>
          <p>Koleksiyonunuzu güneş ışığından, nemden ve tozdan koruyun. Uygun vitrinler kullanın.</p>
        `,
        author: 'DynSteel Editör',
        publishDate: '2025-01-20',
        readTime: '5 dakika',
        views: 1247,
        comments: 23,
        category: 'Rehber',
        tags: ['Koleksiyonculuk', 'Başlangıç', 'Rehber'],
        image: '🏎️',
        featured: true
      }
      
      setPost(demoPost)
      setLikes(Math.floor(Math.random() * 100) + 50)
      
      // Demo ilgili yazılar
      setRelatedPosts([
        {
          id: 2,
          title: '2025\'in En Popüler Minyatür Araba Modelleri',
          slug: '2025-en-populer-minyatur-araba-modelleri',
          image: '🚗',
          category: 'Ürün İnceleme',
          publishDate: '2025-01-18'
        },
        {
          id: 3,
          title: 'Ölçek Seçimi: 1:18, 1:24, 1:43 Hangisi Daha İyi?',
          slug: 'olcek-secimi-1-18-1-24-1-43-hangisi-daha-iyi',
          image: '📏',
          category: 'Rehber',
          publishDate: '2025-01-08'
        }
      ])

      // Demo yorumlar
      setComments([
        {
          id: 1,
          name: 'Ahmet Yılmaz',
          date: '2025-01-21',
          message: 'Çok faydalı bir yazı olmuş. Ben de yeni başladım koleksiyonculuğa, bu ipuçları çok işime yarayacak.',
          likes: 5
        },
        {
          id: 2,
          name: 'Ayşe Demir',
          date: '2025-01-20',
          message: 'Ferrari modelleriyle başlamayı düşünüyorum. Hangi ölçeği önerirsiniz?',
          likes: 2
        }
      ])
    }
  }, [slug])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.name || !newComment.message) {
      alert('Lütfen ad ve mesaj alanlarını doldurun.')
      return
    }

    const comment = {
      id: comments.length + 1,
      name: newComment.name,
      date: new Date().toISOString().split('T')[0],
      message: newComment.message,
      likes: 0
    }

    setComments([comment, ...comments])
    setNewComment({ name: '', email: '', message: '' })
    alert('Yorumunuz başarıyla eklendi!')
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = post?.title || ''
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        if (navigator.share) {
          navigator.share({ title, url })
          return
        } else {
          navigator.clipboard.writeText(url)
          alert('Link kopyalandı!')
          return
        }
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Yazı yükleniyor...</p>
          </div>
        </div>
      </Layout>
    )
  }

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
            <Link href="/blog" className="text-primary-400 hover:text-accent-400 transition-colors">
              Blog
            </Link>
            <span className="text-primary-600">/</span>
            <span className="text-white font-medium truncate">{post.title}</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/blog">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Blog'a Dön</span>
            </button>
          </Link>

          {/* Article */}
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-64 flex items-center justify-center relative">
              <div className="text-8xl">{post.image}</div>
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(post.publishDate).toLocaleDateString('tr-TR')}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {post.views.toLocaleString()} görüntüleme
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {comments.length} yorum
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Actions */}
              <div className="flex items-center justify-between py-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{likes}</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">Paylaş:</span>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Facebook'ta Paylaş"
                    >
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                      title="Twitter'da Paylaş"
                    >
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="LinkedIn'de Paylaş"
                    >
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Linki Kopyala"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
              Yorumlar ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Yorum Yap</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={newComment.name}
                  onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınız *"
                  required
                />
                <input
                  type="email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="E-posta adresiniz"
                />
              </div>
              <textarea
                value={newComment.message}
                onChange={(e) => setNewComment({...newComment, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Yorumunuz *"
                required
              />
              <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Yorum Gönder
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{comment.name}</h5>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.date).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                  <p className="text-gray-700 ml-13">{comment.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
                İlgili Yazılar
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all group">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                        <div className="text-3xl">{relatedPost.image}</div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {relatedPost.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(relatedPost.publishDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center text-blue-600 mt-2 text-sm">
                          <span>Devamını Oku</span>
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div className="mt-8">
            <Newsletter variant="inline" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
