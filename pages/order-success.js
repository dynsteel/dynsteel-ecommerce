import Layout from '../components/Layout'
import Link from 'next/link'
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail,
  Phone,
  MessageCircle,
  Home,
  ShoppingBag,
  Calendar,
  MapPin
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function OrderSuccessPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // localStorage'dan son siparişi al
    if (typeof window !== 'undefined') {
      const lastOrder = localStorage.getItem('lastOrder')
      if (lastOrder) {
        setOrderData(JSON.parse(lastOrder))
      } else {
        // Sipariş yoksa anasayfaya yönlendir
        setTimeout(() => {
          router.push('/')
        }, 3000)
      }
    }
  }, [router])

  if (!orderData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Yükleniyor...</p>
          </div>
        </div>
      </Layout>
    )
  }

  const deliverySteps = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Sipariş Alındı',
      description: 'Siparişiniz başarıyla oluşturuldu',
      status: 'completed',
      time: 'Şimdi'
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: 'Hazırlanıyor',
      description: 'Ürünleriniz paketleniyor',
      status: 'current',
      time: '1-2 saat'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Kargoda',
      description: 'PTT kargo ile gönderilecek',
      status: 'upcoming',
      time: '1-3 gün'
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: 'Teslim Edildi',
      description: 'Siparişiniz adresinize teslim edilecek',
      status: 'upcoming',
      time: '2-4 gün'
    }
  ]

  return (
    <Layout>
      {/* Success Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 animate-bounce">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Siparişiniz Alındı!
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu.
          </p>

          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-lg border-2 border-green-500 shadow-lg">
            <span className="text-gray-600">Sipariş No:</span>
            <span className="text-2xl font-bold text-green-600">{orderData.id}</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/905458463523?text=Merhaba, ${orderData.id} numaralı siparişim hakkında bilgi almak istiyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp ile Takip Et</span>
            </a>
            
            <Link href="/products">
              <button className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all space-x-2">
                <ShoppingBag className="h-5 w-5" />
                <span>Alışverişe Devam Et</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sipariş Ürünleri */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Package className="h-6 w-6 mr-2 text-blue-600" />
                  Sipariş Detayları
                </h2>
                
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Miktar: {item.quantity} adet</p>
                        {item.scale && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {item.scale}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          ₺{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          ₺{item.price} x {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toplam */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Ara Toplam</span>
                    <span className="font-medium">₺{orderData.totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Kargo</span>
                    <span className={`font-medium ${orderData.totals.shipping === 0 ? 'text-green-600' : ''}`}>
                      {orderData.totals.shipping === 0 ? 'Ücretsiz' : `₺${orderData.totals.shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Toplam</span>
                    <span className="text-blue-600">₺{orderData.totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Steps */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-blue-600" />
                  Teslimat Süreci
                </h2>

                <div className="relative">
                  {deliverySteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-8 last:pb-0 relative">
                      {/* Connecting Line */}
                      {index < deliverySteps.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* Icon */}
                      <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        step.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : step.status === 'current'
                          ? 'bg-blue-500 text-white animate-pulse'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold ${
                            step.status === 'completed' || step.status === 'current' 
                              ? 'text-gray-900' 
                              : 'text-gray-400'
                          }`}>
                            {step.title}
                          </h3>
                          <span className="text-sm text-gray-500">{step.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Customer Info */}
              <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Müşteri Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">E-posta</p>
                      <p className="font-medium text-gray-900">{orderData.customerInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Telefon</p>
                      <p className="font-medium text-gray-900">{orderData.customerInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Teslimat Adresi</p>
                      <p className="font-medium text-gray-900">
                        {orderData.customerInfo.billingAddress}, {orderData.customerInfo.billingDistrict}, {orderData.customerInfo.billingCity}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600">Sipariş Tarihi</p>
                      <p className="font-medium text-gray-900">
                        {new Date(orderData.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Yardıma mı İhtiyacınız Var?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Siparişiniz hakkında sorularınız için bizimle iletişime geçebilirsiniz.
                </p>
                
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/905458463523?text=Merhaba, ${orderData.id} numaralı siparişim hakkında bilgi almak istiyorum.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                  
                  <a
                    href="tel:+905458463523"
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors space-x-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Ara: 0545 846 3523</span>
                  </a>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">📋 Önemli Bilgiler</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Sipariş onay e-postası gönderilecektir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Kargo takip numarası SMS ile bildirilecek</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Teslimat süresi 1-3 iş günüdür</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Ürünü teslim alırken kontrol ediniz</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Alışverişinizi Değerlendirin
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Deneyiminizi bizimle paylaşın ve özel indirimler kazanın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/905458463523?text=Merhaba, siparişim hakkında geri bildirimde bulunmak istiyorum. Sipariş No: ${orderData.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Geri Bildirim Gönder
            </a>
            <Link href="/">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
                Anasayfaya Dön
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
