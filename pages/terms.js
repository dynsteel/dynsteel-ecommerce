import Layout from '../components/Layout'
import Link from 'next/link'
import { FileText, Scale, ShoppingCart, Truck, CreditCard, AlertTriangle } from 'lucide-react'

export default function TermsOfService() {
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
            <span className="text-white font-medium">Kullanım Şartları</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kullanım Şartları</h1>
            <p className="text-gray-600 text-lg">
              DynSteel web sitesi kullanım koşulları ve şartları
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
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Giriş ve Kabul</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bu kullanım şartları ("Şartlar"), DynSteel Ticaret Limited Şirketi ("DynSteel", "Biz", "Bizim") 
                tarafından işletilen www.dynsteel.com web sitesinin ("Site") kullanımını düzenler.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sitemizi kullanarak, bu şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. 
                Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
              </p>
            </section>

            {/* Şirket Bilgileri */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Şirket Bilgileri</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">DynSteel Ticaret Limited Şirketi</p>
                <p className="text-gray-700">E-posta: steeldyn@gmail.com</p>
                <p className="text-gray-700">Telefon: 0545 846 35 23</p>
                <p className="text-gray-700">WhatsApp: +90 545 846 35 23</p>
                <p className="text-gray-700">Faaliyet Alanı: Minyatür araba modelleri ve modifiye parça satışı</p>
              </div>
            </section>

            {/* Hizmetler */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Hizmetlerimiz</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Ürün Satışı</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Minyatür araba modelleri</li>
                    <li>• Araba modifiye parçaları</li>
                    <li>• Koleksiyonluk ürünler</li>
                    <li>• Aksesuar ve yedek parçalar</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Özel Hizmetler</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• 3D tarama hizmeti</li>
                    <li>• Özel parça üretimi</li>
                    <li>• Kişiselleştirme hizmetleri</li>
                    <li>• Teknik danışmanlık</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Üyelik ve Hesap */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Üyelik ve Hesap Güvenliği</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hesap Oluşturma</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>18 yaşından büyük olmanız gerekmektedir</li>
                    <li>Doğru ve güncel bilgiler vermeniz zorunludur</li>
                    <li>Hesabınızın güvenliğinden siz sorumlusunuz</li>
                    <li>Şifrenizi kimseyle paylaşmamalısınız</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hesap Kullanımı</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Hesabınızı yalnızca yasal amaçlarla kullanabilirsiniz</li>
                    <li>Birden fazla hesap açamazsınız</li>
                    <li>Hesap bilgilerinizi güncel tutmalısınız</li>
                    <li>Şüpheli aktiviteleri derhal bildirmelisiniz</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sipariş ve Ödeme */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Sipariş ve Ödeme Şartları</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sipariş Süreci</h3>
                  <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                    <li>Ürünleri sepetinize ekleyin</li>
                    <li>Sipariş bilgilerinizi kontrol edin</li>
                    <li>Teslimat adresini belirleyin</li>
                    <li>Ödeme yöntemini seçin</li>
                    <li>Siparişi onaylayın</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ödeme Yöntemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-3 rounded">
                      <h4 className="font-medium text-green-900">Kredi Kartı</h4>
                      <p className="text-green-700 text-sm">Visa, MasterCard, American Express</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <h4 className="font-medium text-blue-900">Banka Havalesi</h4>
                      <p className="text-blue-700 text-sm">Ziraat Bankası, İş Bankası</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiyat ve Stok</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Fiyatlar Türk Lirası cinsindendir ve KDV dahildir</li>
                    <li>Fiyatlar önceden haber verilmeksizin değiştirilebilir</li>
                    <li>Stok durumu anlık olarak güncellenir</li>
                    <li>Stokta olmayan ürünler için alternatif önerilir</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Teslimat */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Teslimat Şartları</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Teslimat Süreleri</h3>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Stokta bulunan ürünler: 1-2 iş günü</li>
                    <li>• Özel üretim ürünler: 5-10 iş günü</li>
                    <li>• 3D tarama hizmeti: 3-7 iş günü</li>
                    <li>• Kargo süresi: 1-3 iş günü (şehir içi/şehir dışı)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Kargo Ücretleri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>500 TL ve üzeri siparişlerde kargo ücretsizdir</li>
                    <li>500 TL altı siparişlerde kargo ücreti 25 TL'dir</li>
                    <li>Özel kargo talepleri için ek ücret alınabilir</li>
                    <li>Hasarlı teslimatlar için kargo şirketi sorumludur</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* İade ve Değişim */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">İade ve Değişim Politikası</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">İade Şartları</h3>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Ürün teslim tarihinden itibaren 14 gün içinde iade edilebilir</li>
                    <li>• Ürün orijinal ambalajında ve hasarsız olmalıdır</li>
                    <li>• Kişiye özel üretilmiş ürünler iade edilemez</li>
                    <li>• İade kargo ücreti müşteriye aittir</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Değişim Şartları</h3>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Aynı kategorideki ürünlerle değişim yapılabilir</li>
                    <li>• Fiyat farkı varsa ek ödeme yapılır</li>
                    <li>• Değişim için ürün hasarsız olmalıdır</li>
                    <li>• Değişim işlemi 3-5 iş günü sürer</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Yasaklı Kullanımlar */}
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Yasaklı Kullanımlar</h2>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-red-800 font-medium mb-3">Aşağıdaki aktiviteler kesinlikle yasaktır:</p>
                <ul className="list-disc list-inside text-red-700 space-y-1 ml-4">
                  <li>Sahte veya yanıltıcı bilgi vermek</li>
                  <li>Başkalarının hesaplarını kullanmak</li>
                  <li>Telif hakkı ihlali yapmak</li>
                  <li>Zararlı yazılım yüklemek</li>
                  <li>Site güvenliğini tehdit etmek</li>
                  <li>Spam veya istenmeyen içerik göndermek</li>
                  <li>Ticari olmayan amaçlarla toplu alım yapmak</li>
                </ul>
              </div>
            </section>

            {/* Sorumluluk Sınırlaması */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sorumluluk Sınırlaması</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  DynSteel, hizmetlerini "olduğu gibi" sunar ve aşağıdaki durumlardan sorumlu değildir:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Üçüncü taraf hizmetlerinden kaynaklanan sorunlar</li>
                  <li>İnternet bağlantısı veya teknik arızalar</li>
                  <li>Kullanıcı hatalarından kaynaklanan kayıplar</li>
                  <li>Mücbir sebep durumları (doğal afet, savaş vb.)</li>
                  <li>Kargo şirketinden kaynaklanan gecikmeler</li>
                </ul>
              </div>
            </section>

            {/* Fikri Mülkiyet */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-700 mb-4">
                Bu sitede yer alan tüm içerik, tasarım, logo, metin, görsel ve yazılımlar 
                DynSteel'in fikri mülkiyetidir ve telif hakkı ile korunmaktadır.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>İçerikleri izinsiz kopyalayamazsınız</li>
                <li>Ticari amaçla kullanımazsınız</li>
                <li>Değiştirip dağıtamazsınız</li>
                <li>Tersine mühendislik yapamazsınız</li>
              </ul>
            </section>

            {/* Değişiklikler */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Şartların Değiştirilmesi</h2>
              <p className="text-gray-700 mb-4">
                DynSteel, bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                Değişiklikler web sitesinde yayınlandığı anda yürürlüğe girer.
              </p>
              <p className="text-gray-700">
                Değişikliklerden sonra siteyi kullanmaya devam etmeniz, yeni şartları kabul ettiğiniz anlamına gelir.
              </p>
            </section>

            {/* Uygulanacak Hukuk */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Uygulanacak Hukuk ve Yetki</h2>
              <p className="text-gray-700 mb-4">
                Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Bu şartlardan doğacak 
                her türlü uyuşmazlık Türkiye mahkemelerinin yetkisindedir.
              </p>
              <p className="text-gray-700">
                Öncelikle dostane çözüm aranacak, gerektiğinde arabuluculuk sürecine başvurulacaktır.
              </p>
            </section>

            {/* İletişim */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
              <p className="text-gray-700 mb-4">
                Bu kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
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
              </div>
            </section>
          </div>

          {/* Alt Linkler */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                Gizlilik Politikası
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
