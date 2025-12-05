import Layout from '../components/Layout'
import Link from 'next/link'
import { Truck, Clock, MapPin, Package, CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export default function ShippingInfo() {
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
            <span className="text-white font-medium">Kargo ve Teslimat Bilgileri</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kargo ve Teslimat Bilgileri</h1>
            <p className="text-gray-600 text-lg">
              Hızlı ve güvenli teslimat hizmetimiz hakkında detaylar
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Son güncelleme: 27 Eylül 2025
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg space-y-8">
            {/* Genel Bilgiler */}
            <section>
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Genel Teslimat Bilgileri</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                DynSteel olarak, siparişlerinizin güvenli ve hızlı bir şekilde elinize ulaşması için 
                güvenilir kargo şirketleri ile çalışmaktayız. Tüm ürünlerimiz özel ambalajlarda, 
                hasarsız şekilde gönderilmektedir.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Güvenli Ambalaj</h3>
                  <p className="text-blue-800 text-sm">Özel koruyucu ambalajlar</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-900">Hızlı Teslimat</h3>
                  <p className="text-green-800 text-sm">1-3 iş günü teslimat</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-900">Türkiye Geneli</h3>
                  <p className="text-purple-800 text-sm">81 ile teslimat</p>
                </div>
              </div>
            </section>

            {/* Kargo Ücretleri */}
            <section>
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Kargo Ücretleri</h2>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-900 mb-2">500 TL ve Üzeri Siparişlerde</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">KARGO ÜCRETSİZ! 🎉</p>
                  <p className="text-green-800">Türkiye'nin her yerine ücretsiz kargo fırsatı</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Standart Kargo Ücretleri</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">500 TL altı siparişler:</span>
                      <span className="font-medium text-gray-900">25 TL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">500 TL ve üzeri:</span>
                      <span className="font-medium text-green-600">ÜCRETSİZ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Özel kargo talepleri:</span>
                      <span className="font-medium text-gray-900">Ayrı fiyat</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <h3 className="font-semibold text-yellow-900">Özel Durumlar</h3>
                  </div>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Adalar için ek kargo ücreti: +15 TL</li>
                    <li>• Aynı gün teslimat (İstanbul): +50 TL</li>
                    <li>• Özel ambalaj talebi: +10 TL</li>
                    <li>• Sigortalı kargo: Ürün değerinin %2'si</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Teslimat Süreleri */}
            <section>
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Teslimat Süreleri</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Hazırlama Süreleri</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-green-900 font-medium">Stokta bulunan ürünler</span>
                        <span className="text-green-600 font-bold">Aynı gün</span>
                      </div>
                      <p className="text-green-700 text-xs mt-1">Saat 14:00'a kadar verilen siparişler</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-900 font-medium">Tedarik edilecek ürünler</span>
                        <span className="text-blue-600 font-bold">1-3 iş günü</span>
                      </div>
                      <p className="text-blue-700 text-xs mt-1">Tedarikçiden getirilen ürünler</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-900 font-medium">Özel üretim ürünler</span>
                        <span className="text-purple-600 font-bold">5-10 iş günü</span>
                      </div>
                      <p className="text-purple-700 text-xs mt-1">3D tarama ve özel parça üretimi</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Kargo Teslimat Süreleri</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">İstanbul içi</span>
                        <span className="text-gray-600 font-bold">1 iş günü</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">Büyük şehirler</span>
                        <span className="text-gray-600 font-bold">1-2 iş günü</span>
                      </div>
                      <p className="text-gray-600 text-xs mt-1">Ankara, İzmir, Bursa, Antalya vb.</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">Diğer şehirler</span>
                        <span className="text-gray-600 font-bold">2-3 iş günü</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-900 font-medium">Uzak bölgeler</span>
                        <span className="text-gray-600 font-bold">3-5 iş günü</span>
                      </div>
                      <p className="text-gray-600 text-xs mt-1">Dağlık ve ada bölgeleri</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Kargo Şirketleri */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Çalıştığımız Kargo Şirketleri</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">PTT KARGO</div>
                  <p className="text-red-800 text-sm">Ana kargo partnerimiz</p>
                  <p className="text-red-700 text-xs mt-1">Türkiye geneli güvenilir teslimat</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">YURTIÇI</div>
                  <p className="text-orange-800 text-sm">Hızlı teslimat seçeneği</p>
                  <p className="text-orange-700 text-xs mt-1">Büyük şehirler için</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">ARAS KARGO</div>
                  <p className="text-blue-800 text-sm">Alternatif kargo seçeneği</p>
                  <p className="text-blue-700 text-xs mt-1">Özel durumlar için</p>
                </div>
              </div>
            </section>

            {/* Teslimat Adresi */}
            <section>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Teslimat Adresi Bilgileri</h2>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-4">Adres Yazım Kuralları</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-900 mb-2">✅ Doğru Adres Örneği:</h4>
                    <div className="bg-white p-3 rounded border text-sm">
                      <p><strong>Ahmet YILMAZ</strong></p>
                      <p>Atatürk Mahallesi</p>
                      <p>Cumhuriyet Caddesi No: 123/5</p>
                      <p>Kadıköy / İSTANBUL</p>
                      <p>Telefon: 0532 123 45 67</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900 mb-2">⚠️ Önemli Notlar:</h4>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Tam ad ve soyad yazınız</li>
                      <li>• Mahalle ve cadde bilgisi eksiksiz olmalı</li>
                      <li>• Kapı numarası ve daire no belirtiniz</li>
                      <li>• Güncel telefon numarası veriniz</li>
                      <li>• Tarif yazabilirsiniz (opsiyonel)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Teslimat Sırasında */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Teslimat Sırasında Dikkat Edilecekler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-900">Teslim Alırken</h3>
                  </div>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Kimlik kontrolü yapılabilir</li>
                    <li>• Kolinin dış görünümünü kontrol edin</li>
                    <li>• Hasarlı görünüyorsa tutanak tutun</li>
                    <li>• Kargo personelinin önünde açın</li>
                    <li>• İçerik eksik/hasarlıysa teslim almayın</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-red-900">Teslimat Alınamazsa</h3>
                  </div>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Kargo şubeye gider</li>
                    <li>• SMS ile bilgilendirilirsiniz</li>
                    <li>• 10 gün süre tanınır</li>
                    <li>• Kimlik ile şubeden alabilirsiniz</li>
                    <li>• Süre dolunca iade edilir</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Kargo Takibi */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kargo Takibi</h2>
              
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Takip Yöntemleri</h3>
                    <ul className="text-blue-800 text-sm space-y-2">
                      <li>• <strong>SMS:</strong> Otomatik durumu bildirimleri</li>
                      <li>• <strong>E-posta:</strong> Detaylı takip bilgileri</li>
                      <li>• <strong>Kargo sitesi:</strong> Takip numarası ile</li>
                      <li>• <strong>WhatsApp:</strong> 0545 846 35 23</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3">Takip Durumları</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-blue-800">Hazırlanıyor</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-blue-800">Kargoya verildi</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-blue-800">Transfer merkezinde</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-blue-800">Dağıtıma çıktı</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-blue-800">Teslim edildi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sorunlar ve Çözümler */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sık Karşılaşılan Sorunlar</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">❓ Kargo geç geldi, ne yapmalıyım?</h3>
                  <p className="text-gray-700 text-sm">
                    Önce kargo şirketi ile iletişime geçin. Sorun devam ederse bizimle iletişime geçin, 
                    alternatif çözüm üretelim.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📦 Hasar görmüş koli teslim aldım?</h3>
                  <p className="text-gray-700 text-sm">
                    Hasarlı koliyi kargo personelinin önünde açın. İçerik hasarlıysa tutanak tutturun 
                    ve bizimle iletişime geçin.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🏠 Evde yokken kargo geldi?</h3>
                  <p className="text-gray-700 text-sm">
                    Kargo şubeye gider ve size SMS gönderilir. 10 gün içinde kimlik ile şubeden 
                    alabilirsiniz.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">📍 Yanlış adrese gitti?</h3>
                  <p className="text-gray-700 text-sm">
                    Hemen kargo şirketi ve bizimle iletişime geçin. Adres düzeltme işlemi başlatılır.
                  </p>
                </div>
              </div>
            </section>

            {/* İletişim */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Kargo İle İlgili Destek</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">7/24 Kargo Desteği</h3>
                  <p className="text-gray-700 text-sm">Kargo ile ilgili tüm sorularınız için</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📱</div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-green-600 font-bold">0545 846 35 23</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📧</div>
                    <p className="font-semibold">E-posta</p>
                    <p className="text-blue-600 font-bold">info@dynsteel.com</p>
                  </div>
                </div>
              </div>
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
              <Link href="/return-policy" className="text-blue-600 hover:text-blue-800">
                İade Politikası
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
