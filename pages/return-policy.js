import Layout from '../components/Layout'
import Link from 'next/link'
import { RotateCcw, Clock, Package, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

export default function ReturnPolicy() {
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
            <span className="text-white font-medium">İade ve Değişim Politikası</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">İade ve Değişim Politikası</h1>
            <p className="text-gray-600 text-lg">
              Müşteri memnuniyeti bizim için önemlidir
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Son güncelleme: 27 Eylül 2025
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            {/* Genel Bilgiler */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Genel Bilgiler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DynSteel olarak müşteri memnuniyetini ön planda tutuyoruz. Satın aldığınız ürünlerden 
                memnun kalmamanız durumunda, belirtilen şartlar dahilinde iade ve değişim hakkınız bulunmaktadır.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  📞 İade ve değişim işlemleri için: <span className="text-blue-600">0545 846 35 23</span>
                </p>
                <p className="text-blue-800 font-medium">
                  📧 E-posta: <span className="text-blue-600">info@dynsteel.com</span>
                </p>
              </div>
            </section>

            {/* İade Şartları */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">İade Şartları</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">✅ İade Edilebilir Ürünler</h3>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Ambalajı açılmamış minyatür arabalar</li>
                    <li>• Hasarsız ve kullanılmamış ürünler</li>
                    <li>• Orijinal kutusunda bulunan ürünler</li>
                    <li>• Teslim tarihinden itibaren 14 gün içinde</li>
                    <li>• Fatura ve garanti belgesi ile birlikte</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">❌ İade Edilemeyen Ürünler</h3>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>• Kişiye özel üretilmiş ürünler</li>
                    <li>• 3D tarama ile özel yapılmış parçalar</li>
                    <li>• Hasarlı veya kullanılmış ürünler</li>
                    <li>• Ambalajı zarar görmüş ürünler</li>
                    <li>• 14 günlük süre geçmiş ürünler</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* İade Süreci */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">İade Süreci</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">İletişime Geçin</h3>
                    <p className="text-gray-700 text-sm">
                      WhatsApp (0545 846 35 23) veya e-posta (info@dynsteel.com) ile iade talebinizi bildirin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">İade Kodunu Alın</h3>
                    <p className="text-gray-700 text-sm">
                      Müşteri hizmetlerimiz size özel bir iade kodu verecektir.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ürünü Paketleyin</h3>
                    <p className="text-gray-700 text-sm">
                      Ürünü orijinal ambalajında, fatura ile birlikte güvenli şekilde paketleyin.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kargoya Verin</h3>
                    <p className="text-gray-700 text-sm">
                      Size verilen adrese kargo ile gönderin. Kargo ücreti tarafımızdan karşılanacaktır.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Para İadesi</h3>
                    <p className="text-gray-700 text-sm">
                      Ürün kontrol edildikten sonra 3-5 iş günü içinde paranız iade edilecektir.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Değişim Politikası */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Değişim Politikası</h2>
              
              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-4">Değişim Şartları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-purple-800 text-sm space-y-2">
                    <li>• Aynı kategorideki ürünlerle değişim</li>
                    <li>• Fiyat farkı varsa ek ödeme</li>
                    <li>• 14 gün içinde talep edilmeli</li>
                    <li>• Ürün hasarsız ve kutusunda olmalı</li>
                  </ul>
                  <ul className="text-purple-800 text-sm space-y-2">
                    <li>• Değişim işlemi 3-5 iş günü</li>
                    <li>• Kargo ücreti karşılıklı</li>
                    <li>• Stok durumuna göre değişim</li>
                    <li>• Özel ürünler değiştirilemez</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Para İadesi */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Para İadesi</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-2">İade Süreleri</h3>
                  <ul className="text-indigo-800 text-sm space-y-1">
                    <li>• Kredi kartı ödemeleri: 2-7 iş günü</li>
                    <li>• Banka havalesi: 1-3 iş günü</li>
                    <li>• Kapıda ödeme: Havale ile 3-5 iş günü</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                    <h3 className="font-semibold text-yellow-900">Önemli Notlar</h3>
                  </div>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• İade edilen ürünler kontrol edilir</li>
                    <li>• Hasarlı ürünlerde iade yapılmaz</li>
                    <li>• Kargo hasarları kargo şirketi sorumluluğundadır</li>
                    <li>• İade süreci başlatıldıktan sonra iptal edilemez</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Garanti Kapsamı */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Garanti Kapsamı</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">Garanti Kapsamında</h3>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Üretim hatası olan ürünler</li>
                    <li>• Malzeme kusurları</li>
                    <li>• Boyama ve kaplama hataları</li>
                    <li>• Eksik parça teslimatları</li>
                    <li>• Kargo sırasında oluşan hasarlar</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">Garanti Kapsamı Dışında</h3>
                  <ul className="text-red-800 text-sm space-y-2">
                    <li>• Kullanıcı hatası ile oluşan hasarlar</li>
                    <li>• Düşürme, çarpma sonucu hasarlar</li>
                    <li>• Yanlış kullanım sonucu bozulmalar</li>
                    <li>• Doğal aşınma ve yıpranmalar</li>
                    <li>• Yetkisiz kişilerce yapılan müdahaleler</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* İletişim Bilgileri */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">İade/Değişim İçin İletişim</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Müşteri Hizmetleri</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700 flex items-center">
                        <span className="text-green-600 mr-2">📱</span>
                        WhatsApp: 0545 846 35 23
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="text-blue-600 mr-2">📧</span>
                        E-posta: info@dynsteel.com
                      </p>
                      <p className="text-gray-700 flex items-center">
                        <span className="text-purple-600 mr-2">🕒</span>
                        Çalışma Saatleri: 09:00 - 18:00 (Hafta içi)
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">İade Adresi</h3>
                    <div className="text-gray-700 text-sm">
                      <p className="font-medium">DynSteel Ticaret Ltd. Şti.</p>
                      <p>İade ve Değişim Departmanı</p>
                      <p className="text-red-600 font-medium mt-2">
                        ⚠️ Adres bilgisi müşteri hizmetlerinden alınmalıdır
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        Her iade için özel kod ve adres verilmektedir
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Yasal Haklar */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Yasal Haklar</h2>
              <p className="text-gray-700 mb-4">
                Bu iade ve değişim politikası, 6502 sayılı Tüketicinin Korunması Hakkında Kanun 
                kapsamındaki haklarınızı kısıtlamaz. Yasal haklarınızı kullanmak için:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Tüketici Hakem Heyetine başvurabilirsiniz</li>
                <li>Tüketici mahkemelerine dava açabilirsiniz</li>
                <li>Tüketici Bilgi Sistemi'ne şikayet edebilirsiniz</li>
              </ul>
            </section>
          </div>

          {/* Alt Linkler */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Kullanım Şartları
              </Link>
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                Gizlilik Politikası
              </Link>
              <Link href="/shipping-info" className="text-blue-600 hover:text-blue-800">
                Kargo Bilgileri
              </Link>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
