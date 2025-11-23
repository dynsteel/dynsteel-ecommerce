import Layout from '../components/Layout'
import Link from 'next/link'
import { 
  Phone, 
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  User,
  FileText,
  CheckCircle,
  Instagram
} from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Telefon',
      info: '0545 846 3523',
      description: 'WhatsApp üzerinden 7/24 ulaşabilirsiniz',
      action: 'https://wa.me/905458463523'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'E-posta',
      info: 'info@dynsteel.com',
      description: 'Sorularınız için e-posta gönderebilirsiniz',
      action: 'mailto:steeldyn@gmail.com'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Çalışma Saatleri',
      info: '7/24 Destek',
      description: 'Her zaman size yardımcı olmaya hazırız',
      action: null
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'Canlı Destek',
      info: 'WhatsApp Chat',
      description: 'Anında yanıt için WhatsApp kullanın',
      action: 'https://wa.me/905458463523?text=Merhaba, canlı destek almak istiyorum.'
    },
    {
      icon: <Instagram className="h-8 w-8" />,
      title: 'Instagram',
      info: '@dynsteelauto',
      description: 'Güncel içerikler ve ürün tanıtımları',
      action: 'https://instagram.com/dynsteelauto'
    }
  ]

  const faqItems = [
    {
      question: '3D tarama hizmeti nasıl çalışır?',
      answer: 'Parçanızın fotoğrafını gönderirsiniz, biz 3D tarama ile modelini oluştururuz ve 1 saat içinde size fiyat teklifi sunarız.'
    },
    {
      question: 'Minyatür arabalar hangi ölçeklerde mevcut?',
      answer: '1:18, 1:24 ve 1:43 ölçeklerinde çeşitli minyatür araba modellerimiz bulunmaktadır.'
    },
    {
      question: 'Kargo süresi ne kadar?',
      answer: 'PTT kargo ile 1-3 iş günü içinde ürününüz elinizde olur. Ücretsiz kargo seçeneğimiz mevcuttur.'
    },
    {
      question: 'Ürünlerde garanti var mı?',
      answer: 'Tüm ürünlerimizde kalite garantisi bulunmaktadır. Sorunlu ürünler için değişim yapılır.'
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
            <span className="text-white font-medium">İletişim</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-xl text-primary-300 max-w-3xl mx-auto mb-8">
            Sorularınız, önerileriniz veya özel talepleriniz için bizimle iletişime geçebilirsiniz. 
            Uzman ekibimiz size yardımcı olmak için hazır.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl border border-primary-700 hover:border-accent-500 transition-all duration-300 group text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-600 rounded-xl text-white mb-4 group-hover:bg-accent-500 transition-colors hover-glow">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-accent-400 font-medium mb-2">{item.info}</p>
                <p className="text-primary-400 text-sm mb-4">{item.description}</p>
                {item.action && (
                  <a
                    href={item.action}
                    target={item.action.includes('wa.me') ? '_blank' : '_self'}
                    rel={item.action.includes('wa.me') ? 'noopener noreferrer' : ''}
                    className="inline-flex items-center text-accent-400 hover:text-accent-300 text-sm font-medium transition-colors"
                  >
                    İletişime Geç
                    <Send className="h-4 w-4 ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Actions */}
      <section className="py-20 bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Mesaj Gönderin
              </h2>
              <p className="text-primary-300 mb-8">
                Aşağıdaki formu doldurarak bizimle iletişime geçebilirsiniz. 
                En kısa sürede size geri dönüş yapacağız.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors"
                        placeholder="Adınızı yazın"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors"
                        placeholder="Telefon numaranız"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    E-posta *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors"
                      placeholder="E-posta adresiniz"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Konu
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-primary-700 border border-primary-600 rounded-lg text-white focus:outline-none focus:border-accent-500 transition-colors"
                  >
                    <option value="">Konu seçin</option>
                    <option value="3d-tarama">3D Tarama Hizmeti</option>
                    <option value="minyatur">Minyatür Arabalar</option>
                    <option value="siparis">Sipariş Takibi</option>
                    <option value="teknik">Teknik Destek</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Mesaj *
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-primary-400" />
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-primary-700 border border-primary-600 rounded-lg text-white placeholder-primary-400 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                      placeholder="Mesajınızı yazın..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Mesaj Gönder</span>
                </button>
              </form>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Hızlı İletişim
              </h2>
              <p className="text-primary-300 mb-8">
                Acil durumlar için doğrudan iletişim kanallarımızı kullanabilirsiniz.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="https://wa.me/905458463523?text=Merhaba, DynSteel hizmetleri hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center space-x-3"
                >
                  <MessageCircle className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">WhatsApp Chat</div>
                    <div className="text-sm opacity-90">Anında yanıt alın</div>
                  </div>
                </a>

                <a
                  href="tel:+905458463523"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center space-x-3"
                >
                  <Phone className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Telefon Arayın</div>
                    <div className="text-sm opacity-90">0545 846 3523</div>
                  </div>
                </a>

                <a
                  href="mailto:steeldyn@gmail.com?subject=DynSteel İletişim&body=Merhaba, size ulaşmak istiyorum."
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center space-x-3"
                >
                  <Mail className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">E-posta Gönderin</div>
                    <div className="text-sm opacity-90">steeldyn@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/dynsteelauto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg font-semibold transition-all hover:scale-105 flex items-center space-x-3"
                >
                  <Instagram className="h-6 w-6" />
                  <div>
                    <div className="font-semibold">Instagram Takip Et</div>
                    <div className="text-sm opacity-90">@dynsteelauto</div>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="glass-effect p-6 rounded-xl border border-primary-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-accent-400" />
                  Çalışma Saatleri
                </h3>
                <div className="space-y-2 text-primary-300">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi</span>
                    <span>09:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar</span>
                    <span>Kapalı</span>
                  </div>
                  <div className="border-t border-primary-600 pt-2 mt-3">
                    <div className="flex justify-between font-medium text-accent-400">
                      <span>WhatsApp Destek</span>
                      <span>7/24 Aktif</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-primary-300">
              En çok merak edilen konular hakkında hızlı yanıtlar
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="glass-effect border border-primary-700 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent-400 mr-2 mt-0.5 flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-primary-300 ml-7">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-primary-400 mb-4">
              Sorunuzun yanıtını bulamadınız mı?
            </p>
            <a
              href="https://wa.me/905458463523?text=Merhaba, sorum var."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Bize Sorun
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
