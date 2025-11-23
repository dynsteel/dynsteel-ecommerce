import Layout from '../components/Layout'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Scan, 
  Phone, 
  Mail,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  Camera,
  Settings,
  Package
} from 'lucide-react'

export default function ThreeDScanPage() {
  const scanProcess = [
    {
      step: '1',
      title: 'Parça Fotoğrafı',
      description: 'Hasarlı veya eksik parçanızın fotoğrafını çekin',
      icon: <Camera className="h-8 w-8" />
    },
    {
      step: '2',
      title: '3D Tarama',
      description: 'Parçanızı 3D tarayıcımızla hassas şekilde taratıyoruz',
      icon: <Scan className="h-8 w-8" />
    },
    {
      step: '3',
      title: 'Tasarım & Modelleme',
      description: 'Orijinal parçaya uygun 3D model oluşturuyoruz',
      icon: <Settings className="h-8 w-8" />
    },
    {
      step: '4',
      title: '3D Yazdırma',
      description: 'Yüksek kaliteli malzemelerle parçanızı üretiyoruz',
      icon: <Package className="h-8 w-8" />
    }
  ]

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: '1 Saat İçinde Teklif',
      description: 'Hızlı değerlendirme ve fiyat teklifi'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: '%99 Başarı Oranı',
      description: 'Yüksek hassasiyet ve kalite garantisi'
    }
  ]

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
            <span className="text-white font-medium">3D Tarama</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Video */}
            <div className="text-center lg:text-left">
              <div className="relative">
                {/* Video Container */}
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                  <div className="aspect-video rounded-xl overflow-hidden bg-primary-700/50 relative">
                    {/* Video Player - Buraya video src'nizi ekleyebilirsiniz */}
                    <video 
                      className="w-full h-full object-cover rounded-xl"
                      controls
                      poster="/api/placeholder/640/360" // Video poster image
                    >
                      <source src="/videos/3d-scanning-process.mp4" type="video/mp4" />
                      <source src="/videos/3d-scanning-process.webm" type="video/webm" />
                      {/* Fallback content */}
                      <div className="absolute inset-0 flex items-center justify-center text-white">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎥</div>
                          <p className="text-lg">3D Tarama Süreci Videosu</p>
                          <p className="text-sm text-primary-300 mt-2">Video yüklenemedi</p>
                        </div>
                      </div>
                    </video>
                    
                    {/* Play Button Overlay (opsiyonel) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-accent-600/80 rounded-full p-4 backdrop-blur-sm">
                        <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Açıklaması */}
                  <div className="mt-4 text-center">
                    <h3 className="text-white font-semibold mb-2">3D Tarama ve Üretim Süreci</h3>
                    <p className="text-white/80 text-sm">
                      Parçanızın nasıl tarandığını ve üretildiğini izleyin
                    </p>
                  </div>
                </div>
                
                {/* Alt kısımda küçük süreç gösterimi */}
                <div className="mt-6">
                  <div className="flex justify-center items-center space-x-4 text-white/60">
                    <div className="text-2xl">📐</div>
                    <div className="text-lg">→</div>
                    <div className="text-2xl">🖨️</div>
                    <div className="text-lg">→</div>
                    <div className="text-2xl">🔧</div>
                  </div>
                  <p className="text-center text-white/60 text-sm mt-2">Tarama → Yazdırma → Montaj</p>
                </div>
              </div>
            </div>

            {/* Sağ taraf - İçerik */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Scan className="h-16 w-16 text-accent-400 animate-pulse mr-4" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                  3D Tarayıcı ile<br />Özel Üretim
                </h1>
              </div>
              
              <div className="text-left space-y-4 text-primary-200 mb-8">
                <p className="text-xl">
                  Aracınızın plastik parçaları mı eksik veya hasar gördü? Biz, <strong className="text-white">3D yazıcı teknolojisi</strong> ve <strong className="text-white">3D tarayıcı sistemi</strong> ile ihtiyaç duyduğunuz parçaları hızlı ve güvenli bir şekilde üretiyoruz.
                </p>
                
                <p className="text-lg">
                  Web sitemizde henüz listelenmeyen veya bulunmayan parçalar için 3D tarayıcı bölümümüzden parçanızı taratabilir, ardından size özel üretim sürecimizi başlatabilirsiniz. Böylece aracınızın eksik parçaları, <strong className="text-white">orijinaline uygun kalite ve hassasiyetle</strong> tekrar elde edilir.
                </p>
                
                <p className="text-lg">
                  Ürünlerinizi ürettirmek veya detaylı bilgi almak için WhatsApp veya e-posta üzerinden bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              {/* İstatistikler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-lg mx-auto lg:mx-0">
                {features.map((feature, index) => (
                  <div key={index} className="text-center bg-white/10 rounded-lg p-6">
                    <div className="flex justify-center text-accent-400 mb-3">
                      {feature.icon}
                    </div>
                    <div className="text-xl font-bold text-white mb-2">{feature.title}</div>
                    <div className="text-primary-300 text-sm">{feature.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Süreç Adımları */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              3D Tarama ve Üretim Süreci
            </h2>
            <p className="text-xl text-primary-300 max-w-3xl mx-auto">
              Parçanızdan yeni parçaya kadar olan süreç 4 basit adımda tamamlanır
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scanProcess.map((process, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-600 rounded-full text-white mb-4 group-hover:bg-accent-500 transition-colors hover-glow">
                    {process.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-700 text-accent-400 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-accent-400">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">
                  {process.title}
                </h3>
                <p className="text-primary-400">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Önemli Not */}
      <section className="py-16 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent-600/10 border border-accent-500/30 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Önemli Bilgiler</h3>
                <p className="text-primary-200 leading-relaxed">
                  <strong>Not:</strong> 3D tarama sonrası üretim süresi ve fiyatlandırma, parçanın türüne ve boyutuna göre değişiklik gösterebilir. Bizimle iletişime geçerek hemen detayları öğrenebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İletişim CTA */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Hemen İletişime Geçin
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            3D tarama ve özel parça üretimi için bizimle iletişime geçin. 
            Uzman ekibimiz size en iyi çözümü sunar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/905458463523?text=Merhaba, 3D tarayıcı ile özel parça üretimi hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Phone className="h-5 w-5" />
              <span>WhatsApp İletişim</span>
            </a>
            
            <a 
              href="mailto:steeldyn@gmail.com?subject=3D Tarama ve Özel Parça Üretimi&body=Merhaba, 3D tarayıcı ile özel parça üretimi hakkında bilgi almak istiyorum."
              className="bg-white text-accent-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Mail className="h-5 w-5" />
              <span>E-posta Gönder</span>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1 Saat</div>
              <div className="text-blue-200">Hızlı Teklif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">%99</div>
              <div className="text-blue-200">Başarı Oranı</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
