import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { useRouter } from 'next/router'
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  User,
  MapPin,
  Phone,
  Mail,
  Building,
  Shield,
  Check,
  AlertCircle,
  Lock
} from 'lucide-react'
import { useState } from 'react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  
  const shippingCost = totalPrice > 500 ? 0 : 25
  const finalTotal = totalPrice + shippingCost

  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Fatura Adresi
    billingAddress: '',
    billingCity: '',
    billingDistrict: '',
    billingPostalCode: '',
    
    // Teslimat Adresi
    shippingAddress: '',
    shippingCity: '',
    shippingDistrict: '',
    shippingPostalCode: '',
    sameAsbilling: true,
    
    // Ödeme Bilgileri
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    
    // Diğer
    orderNotes: '',
    acceptTerms: false,
    acceptKvkk: false
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Hata temizle
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Kişisel bilgiler
    if (!formData.firstName.trim()) newErrors.firstName = 'Ad gerekli'
    if (!formData.lastName.trim()) newErrors.lastName = 'Soyad gerekli'
    if (!formData.email.trim()) newErrors.email = 'E-posta gerekli'
    if (!formData.phone.trim()) newErrors.phone = 'Telefon gerekli'
    
    // Fatura adresi
    if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Adres gerekli'
    if (!formData.billingCity.trim()) newErrors.billingCity = 'Şehir gerekli'
    if (!formData.billingDistrict.trim()) newErrors.billingDistrict = 'İlçe gerekli'
    
    // Teslimat adresi (eğer farklıysa)
    if (!formData.sameAsBinding) {
      if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Teslimat adresi gerekli'
      if (!formData.shippingCity.trim()) newErrors.shippingCity = 'Teslimat şehri gerekli'
    }
    
    // Ödeme bilgileri
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Kart numarası gerekli'
      if (!formData.cardName.trim()) newErrors.cardName = 'Kart üzerindeki isim gerekli'
      if (!formData.expiryMonth) newErrors.expiryMonth = 'Ay gerekli'
      if (!formData.expiryYear) newErrors.expiryYear = 'Yıl gerekli'
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV gerekli'
    }
    
    // Onaylar
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Kullanım şartlarını kabul etmelisiniz'
    if (!formData.acceptKvkk) newErrors.acceptKvkk = 'KVKK metnini kabul etmelisiniz'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Simüle edilmiş ödeme işlemi
    setTimeout(() => {
      // Sipariş verilerini localStorage'a kaydet (gerçek uygulamada API'ye gönderilir)
      const orderData = {
        id: 'DS' + Date.now(),
        items,
        customerInfo: formData,
        totals: {
          subtotal: totalPrice,
          shipping: shippingCost,
          total: finalTotal
        },
        date: new Date().toISOString(),
        status: 'pending'
      }
      
      localStorage.setItem('lastOrder', JSON.stringify(orderData))
      
      // Sepeti temizle
      clearCart()
      
      // Başarı sayfasına yönlendir
      router.push('/order-success')
    }, 2000)
  }

  // Sepet boşsa yönlendir
  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-6">Ödeme yapabilmek için sepetinizde ürün olması gerekiyor.</p>
            <Link href="/products">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Alışverişe Başla
              </button>
            </Link>
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
            <Link href="/cart" className="text-primary-400 hover:text-accent-400 transition-colors">
              Sepet
            </Link>
            <span className="text-primary-600">/</span>
            <span className="text-white font-medium">Ödeme</span>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ödeme</h1>
                <p className="text-gray-600">Siparişinizi tamamlamak için bilgilerinizi girin</p>
              </div>
            </div>
            
            {/* Güvenlik Badge */}
            <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Güvenli Ödeme</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ana Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Kişisel Bilgiler
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Adınız"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Soyadınız"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0532 123 4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Fatura Adresi */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Fatura Adresi
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres *</label>
                    <textarea
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tam adresinizi yazın"
                    />
                    {errors.billingAddress && <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                      <input
                        type="text"
                        value={formData.billingCity}
                        onChange={(e) => handleInputChange('billingCity', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.billingCity ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="İstanbul"
                      />
                      {errors.billingCity && <p className="text-red-500 text-xs mt-1">{errors.billingCity}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">İlçe *</label>
                      <input
                        type="text"
                        value={formData.billingDistrict}
                        onChange={(e) => handleInputChange('billingDistrict', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.billingDistrict ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Kadıköy"
                      />
                      {errors.billingDistrict && <p className="text-red-500 text-xs mt-1">{errors.billingDistrict}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                      <input
                        type="text"
                        value={formData.billingPostalCode}
                        onChange={(e) => handleInputChange('billingPostalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="34000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Teslimat Adresi */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-purple-600" />
                  Teslimat Adresi
                </h2>
                
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sameAsBinding}
                      onChange={(e) => handleInputChange('sameAsBinding', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Fatura adresi ile aynı</span>
                  </label>
                </div>

                {!formData.sameAsBinding && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teslimat Adresi *</label>
                      <textarea
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.shippingAddress ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Teslimat adresinizi yazın"
                      />
                      {errors.shippingAddress && <p className="text-red-500 text-xs mt-1">{errors.shippingAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Şehir *</label>
                        <input
                          type="text"
                          value={formData.shippingCity}
                          onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.shippingCity ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="İstanbul"
                        />
                        {errors.shippingCity && <p className="text-red-500 text-xs mt-1">{errors.shippingCity}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">İlçe *</label>
                        <input
                          type="text"
                          value={formData.shippingDistrict}
                          onChange={(e) => handleInputChange('shippingDistrict', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Kadıköy"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                        <input
                          type="text"
                          value={formData.shippingPostalCode}
                          onChange={(e) => handleInputChange('shippingPostalCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="34000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ödeme Yöntemi */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-indigo-600" />
                  Ödeme Yöntemi
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Kredi Kartı</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank-transfer"
                        checked={formData.paymentMethod === 'bank-transfer'}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Banka Havalesi</span>
                    </label>
                  </div>

                  {formData.paymentMethod === 'credit-card' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kart Üzerindeki İsim *</label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="AHMET YILMAZ"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ay *</label>
                          <select
                            value={formData.expiryMonth}
                            onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.expiryMonth ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Ay</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                          {errors.expiryMonth && <p className="text-red-500 text-xs mt-1">{errors.expiryMonth}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Yıl *</label>
                          <select
                            value={formData.expiryYear}
                            onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.expiryYear ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Yıl</option>
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={2025 + i} value={2025 + i}>
                                {2025 + i}
                              </option>
                            ))}
                          </select>
                          {errors.expiryYear && <p className="text-red-500 text-xs mt-1">{errors.expiryYear}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'bank-transfer' && (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Banka Bilgileri</h4>
                      <div className="text-sm text-blue-800 space-y-1">
                        <p><strong>Banka:</strong> Ziraat Bankası</p>
                        <p><strong>Hesap Adı:</strong> DynSteel Tic. Ltd. Şti.</p>
                        <p><strong>IBAN:</strong> TR12 0001 0001 2345 6789 1234 56</p>
                        <p className="text-blue-600 mt-2">
                          Havale/EFT yaparken açıklama kısmına sipariş numaranızı yazınız.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sipariş Notları */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Notları</h2>
                <textarea
                  value={formData.orderNotes}
                  onChange={(e) => handleInputChange('orderNotes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Siparişiniz hakkında özel notlarınız varsa buraya yazabilirsiniz..."
                />
              </div>

              {/* Onaylar */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Onaylar</h2>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                        Kullanım Şartları
                      </Link>
                      'nı okudum ve kabul ediyorum *
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms}</p>}

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.acceptKvkk}
                      onChange={(e) => handleInputChange('acceptKvkk', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mt-1"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                        Kişisel Verilerin Korunması
                      </Link>
                      metnini okudum ve kabul ediyorum *
                    </span>
                  </label>
                  {errors.acceptKvkk && <p className="text-red-500 text-xs">{errors.acceptKvkk}</p>}
                </div>
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
                
                {/* Ürünler */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.quantity} adet</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₺{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Toplam Hesaplama */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium">₺{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kargo</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                      {shippingCost === 0 ? 'Ücretsiz' : `₺${shippingCost}`}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      ₺{(500 - totalPrice).toLocaleString()} daha harcayarak ücretsiz kargo!
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                    <span>Toplam</span>
                    <span className="text-blue-600">₺{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Ödeme Butonu */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Siparişi Tamamla</span>
                    </>
                  )}
                </button>

                {/* Güvenlik Bilgisi */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-700">
                      Ödeme bilgileriniz SSL ile korunmaktadır
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}