import Layout from '../components/Layout'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Phone, 
  Mail,
  MapPin,
  Clock,
  Shield,
  Zap,
  Target,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Kalite Odaklı',
      description: 'Her üründe premium kalite standardını koruyoruz'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Hızlı Hizmet',
      description: 'Müşteri memnuniyeti için hızlı teslimat garantisi'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Güvenilir',
      description: 'Güvenilir alışveriş ve müşteri desteği'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Müşteri Odaklı',
      description: 'Müşteri memnuniyeti bizim önceliğimiz'
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
            <span className="text-white font-medium">Hakkımızda</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            DynSteel Hakkında
          </h1>
          <p className="text-xl text-primary-300 max-w-3xl mx-auto mb-8">
            Modern teknoloji ve kaliteli hizmet anlayışımızla araba modifiye parçaları ve 
            minyatür araba koleksiyonu alanında hizmet veriyoruz.
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Sol taraf - Görsel */}
            <div className="text-center lg:text-left">
              <div className="relative">
                <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-primary-700">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4">🏭</div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🎯</div>
                        <p className="text-white text-sm font-medium">Kalite</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">⚡</div>
                        <p className="text-white text-sm font-medium">Hız</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🔧</div>
                        <p className="text-white text-sm font-medium">Uzmanlık</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="text-3xl mb-2">🤝</div>
                        <p className="text-white text-sm font-medium">Güven</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ taraf - İçerik */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Misyonumuz
              </h2>
              
              <div className="space-y-4 text-primary-200 mb-8">
                <p className="text-lg">
                  <strong className="text-white">DynSteel</strong>, araba modifiye parçaları ve minyatür araba koleksiyonu konusunda uzman bir firmadır. Modern teknoloji ve kaliteli hizmet anlayışımız ile müşterilerimize en iyi deneyimi sunuyoruz.
                </p>
                
                <p>
                  <strong className="text-white">3D tarama ve yazdırma teknolojisi</strong> ile bulamadığınız parçaları özel olarak üretiyoruz. Aynı zamanda premium kalitede minyatür araba modelleri ile koleksiyonerlerin ihtiyaçlarını karşılıyoruz.
                </p>
                
                <p>
                  Müşteri memnuniyeti bizim için en önemli önceliktir. Hızlı teslimat, kaliteli ürünler ve profesyonel destek ile sektörde fark yaratmaya devam ediyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Değerlerimiz
            </h2>
            <p className="text-xl text-primary-300 max-w-2xl mx-auto">
              DynSteel olarak bizi özel kılan değerler ve yaklaşımlarımız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group glass-effect p-6 rounded-xl border border-primary-700 hover:border-accent-500 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-600 rounded-xl text-white mb-6 group-hover:bg-accent-500 transition-colors hover-glow">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-xl text-primary-300 max-w-2xl mx-auto">
              Size sunduğumuz özel hizmetler ve çözümler
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 3D Tarama Hizmeti */}
            <div className="glass-effect p-8 rounded-xl border border-primary-700 hover:border-accent-500 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4 group-hover:bg-accent-500 transition-colors">
                  📱
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
                  3D Tarama ve Üretim
                </h3>
              </div>
              <p className="text-gray-700 mb-6">
                Bulamadığınız araba parçalarını 3D tarama teknolojisi ile özel olarak üretiyoruz. 
                1 saat içinde teklif, orijinal kalitede üretim garantisi.
              </p>
              <Link href="/3d-scan">
                <button className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Detayları İncele
                </button>
              </Link>
            </div>

            {/* Minyatür Araba Koleksiyonu */}
            <div className="glass-effect p-8 rounded-xl border border-primary-700 hover:border-accent-500 transition-all duration-300 group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center text-white text-2xl mr-4 group-hover:bg-accent-500 transition-colors">
                  🏎️
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
                  Minyatür Araba Koleksiyonu
                </h3>
              </div>
              <p className="text-gray-700 mb-6">
                Premium kalitede minyatür araba modelleri. Ferrari, BMW, Mercedes ve daha fazlası. 
                Koleksiyonunuzu genişletmek için geniş ürün yelpazesi.
              </p>
              <Link href="/products">
                <button className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Koleksiyonu Görüntüle
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sorularınız, önerileriniz veya özel talepleriniz için bizimle iletişime geçebilirsiniz. 
            Uzman ekibimiz size yardımcı olmak için hazır.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Phone className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">Telefon</div>
              <div className="text-blue-200">0545 846 3523</div>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">E-posta</div>
              <div className="text-blue-200">info@dynsteel.com</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-white mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">Çalışma Saatleri</div>
              <div className="text-blue-200">24/7 Destek</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/905458463523?text=Merhaba, DynSteel hizmetleri hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Phone className="h-5 w-5" />
              <span>WhatsApp İletişim</span>
            </a>
            
            <a 
              href="mailto:info@dynsteel.com?subject=DynSteel Hakkında Bilgi&body=Merhaba, DynSteel hizmetleri hakkında bilgi almak istiyorum."
              className="bg-white text-accent-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Mail className="h-5 w-5" />
              <span>E-posta Gönder</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
