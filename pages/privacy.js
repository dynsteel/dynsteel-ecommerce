import Layout from '../components/Layout'
import Link from 'next/link'
import { Shield, Eye, Lock, Users, Database, FileText } from 'lucide-react'

export default function PrivacyPolicy() {
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
            <span className="text-white font-medium">Gizlilik Politikası</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gizlilik Politikası</h1>
            <p className="text-gray-600 text-lg">
              Kişisel verilerinizin korunması bizim için önemlidir
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Son güncelleme: 27 Eylül 2025
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            {/* Giriş */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Giriş</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                DynSteel olarak, kişisel verilerinizin güvenliği ve gizliliği konusunda hassasiyet göstermekteyiz. 
                Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
                kişisel verilerinizin nasıl toplandığı, işlendiği, korunduğu ve paylaşıldığı hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
              </p>
            </section>

            {/* Veri Sorumlusu */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Veri Sorumlusu</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">DynSteel Ticaret Limited Şirketi</p>
                <p className="text-gray-700">E-posta: steeldyn@gmail.com</p>
                <p className="text-gray-700">Telefon: 0545 846 35 23</p>
                <p className="text-gray-700">WhatsApp: +90 545 846 35 23</p>
              </div>
            </section>

            {/* Toplanan Veriler */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Toplanan Kişisel Veriler</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kimlik Verileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ad, soyad</li>
                    <li>E-posta adresi</li>
                    <li>Telefon numarası</li>
                    <li>Doğum tarihi (isteğe bağlı)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">İletişim Verileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Adres bilgileri</li>
                    <li>Fatura adresi</li>
                    <li>Teslimat adresi</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">İşlem Verileri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Sipariş bilgileri</li>
                    <li>Ödeme bilgileri (kart bilgileri güvenli ödeme sağlayıcısında saklanır)</li>
                    <li>Alışveriş geçmişi</li>
                    <li>İade/değişim talepleri</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Teknik Veriler</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>IP adresi</li>
                    <li>Tarayıcı bilgileri</li>
                    <li>İşletim sistemi</li>
                    <li>Site kullanım verileri (çerezler aracılığıyla)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* İşleme Amaçları */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Kişisel Verilerin İşlenme Amaçları</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Temel Hizmetler</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Üyelik hesabı oluşturma</li>
                    <li>• Sipariş alma ve işleme</li>
                    <li>• Ödeme işlemleri</li>
                    <li>• Teslimat organizasyonu</li>
                    <li>• Müşteri hizmetleri</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">İletişim</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Sipariş durumu bildirimi</li>
                    <li>• Kargo takip bilgileri</li>
                    <li>• Önemli hesap bildirimleri</li>
                    <li>• Müşteri destek hizmetleri</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Pazarlama (İzin ile)</h3>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Kampanya bildirimleri</li>
                    <li>• Yeni ürün duyuruları</li>
                    <li>• Özel teklifler</li>
                    <li>• Haber bülteni</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">Analiz ve Geliştirme</h3>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Site performansı analizi</li>
                    <li>• Kullanıcı deneyimi iyileştirme</li>
                    <li>• Güvenlik analizi</li>
                    <li>• İstatistiksel raporlama</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Veri Güvenliği */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Veri Güvenliği</h2>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-red-800 leading-relaxed">
                  Kişisel verileriniz, endüstri standardı güvenlik önlemleriyle korunmaktadır:
                </p>
                <ul className="list-disc list-inside text-red-700 mt-3 space-y-1 ml-4">
                  <li>SSL sertifikası ile şifrelenmiş veri iletimi</li>
                  <li>Güvenli sunucu altyapısı</li>
                  <li>Düzenli güvenlik güncellemeleri</li>
                  <li>Sınırlı erişim kontrolü</li>
                  <li>Veri yedekleme sistemleri</li>
                </ul>
              </div>
            </section>

            {/* Haklarınız */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">KVKK Kapsamındaki Haklarınız</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Bilgi Alma Hakkı</h3>
                    <p className="text-gray-700 text-sm">Kişisel verilerinizin işlenip işlenmediğini öğrenme hakkınız vardır.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Erişim Hakkı</h3>
                    <p className="text-gray-700 text-sm">İşlenen kişisel verileriniz hakkında bilgi talep etme hakkınız vardır.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Düzeltme Hakkı</h3>
                    <p className="text-gray-700 text-sm">Yanlış veya eksik kişisel verilerinizin düzeltilmesini talep edebilirsiniz.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Silme Hakkı</h3>
                    <p className="text-gray-700 text-sm">Belirli şartlar altında kişisel verilerinizin silinmesini talep edebilirsiniz.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">İtiraz Hakkı</h3>
                    <p className="text-gray-700 text-sm">Kişisel verilerinizin işlenmesine itiraz etme hakkınız vardır.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* İletişim */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Haklarınızı Kullanma</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">E-posta:</p>
                    <p className="text-blue-600">steeldyn@gmail.com</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp:</p>
                    <p className="text-green-600">+90 545 846 35 23</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Talebiniz en geç 30 gün içinde değerlendirilecek ve size bilgi verilecektir.
                </p>
              </div>
            </section>

            {/* Çerezler */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Çerez Politikası</h2>
              <p className="text-gray-700 mb-4">
                Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Zorunlu Çerezler</h3>
                  <p className="text-gray-700 text-sm">Site işlevselliği için gerekli çerezlerdir.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analitik Çerezler</h3>
                  <p className="text-gray-700 text-sm">Site kullanımını analiz etmek için kullanılır (isteğe bağlı).</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pazarlama Çerezleri</h3>
                  <p className="text-gray-700 text-sm">Kişiselleştirilmiş reklamlar için kullanılır (izin ile).</p>
                </div>
              </div>
            </section>

            {/* Değişiklikler */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Politika Güncellemeleri</h2>
              <p className="text-gray-700">
                Bu Gizlilik Politikası gerektiğinde güncellenebilir. Önemli değişiklikler 
                e-posta yoluyla bildirilecek ve web sitemizde duyurulacaktır.
              </p>
            </section>
          </div>

          {/* Alt Linkler */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Kullanım Şartları
              </Link>
              <Link href="/return-policy" className="text-blue-600 hover:text-blue-800">
                İade Politikası
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
