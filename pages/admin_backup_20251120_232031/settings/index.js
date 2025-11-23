import AdminLayout from '../../../components/AdminLayout'
import { useState } from 'react'
import {
  Settings,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Database,
  Palette,
  Users,
  Package,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react'

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const [settings, setSettings] = useState({
    // Genel Ayarlar
    siteName: 'DynSteel E-ticaret',
    siteDescription: 'Premium minyatür araba modelleri ve koleksiyonluk ürünler',
    siteUrl: 'https://dynsteel.com',
    adminEmail: 'admin@dynsteel.com',
    supportEmail: 'destek@dynsteel.com',
    phone: '0545 846 35 23',
    address: 'İstanbul, Türkiye',
    
    // Ödeme Ayarları
    currency: 'TRY',
    taxRate: 18,
    freeShippingThreshold: 500,
    shippingCost: 25,
    paymentMethods: {
      creditCard: true,
      bankTransfer: true,
      paypal: false,
      crypto: false
    },
    
    // Kargo Ayarları
    shippingCompanies: {
      ptt: true,
      yurtici: true,
      aras: false,
      ups: false
    },
    processingTime: '1-2 iş günü',
    shippingTime: '2-3 iş günü',
    
    // Bildirim Ayarları
    notifications: {
      newOrder: true,
      lowStock: true,
      newUser: true,
      newReview: false,
      systemUpdates: true
    },
    
    // Güvenlik Ayarları
    twoFactorAuth: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    
    // SEO Ayarları
    metaTitle: 'DynSteel - Premium Minyatür Araba Modelleri',
    metaDescription: 'Türkiye\'nin en kaliteli minyatür araba koleksiyonu. Ferrari, BMW, Mercedes ve daha fazlası.',
    metaKeywords: 'minyatür araba, model araba, koleksiyonluk, ferrari, bmw, mercedes',
    googleAnalytics: 'GA-XXXXXXXXX',
    
    // API Ayarları
    apiKey: 'ds_live_xxxxxxxxxxxxxxxxxxxx',
    webhookUrl: 'https://dynsteel.com/webhook',
    rateLimit: 1000
  })

  const handleInputChange = (category, field, value) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    
    // Simüle edilmiş kaydetme işlemi
    setTimeout(() => {
      setSaving(false)
      alert('Ayarlar başarıyla kaydedildi!')
    }, 1500)
  }

  const tabs = [
    { id: 'general', name: 'Genel', icon: Settings },
    { id: 'payment', name: 'Ödeme', icon: CreditCard },
    { id: 'shipping', name: 'Kargo', icon: Truck },
    { id: 'notifications', name: 'Bildirimler', icon: Bell },
    { id: 'security', name: 'Güvenlik', icon: Shield },
    { id: 'seo', name: 'SEO', icon: Globe },
    { id: 'api', name: 'API', icon: Database }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
            <p className="text-gray-600">Sistem ayarlarını buradan yönetebilirsiniz</p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 h-fit">
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 bg-white rounded-lg p-6 border border-gray-200">
            {/* Genel Ayarlar */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Genel Ayarlar</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Adı</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleInputChange(null, 'siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                    <input
                      type="url"
                      value={settings.siteUrl}
                      onChange={(e) => handleInputChange(null, 'siteUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange(null, 'siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin E-posta</label>
                    <input
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => handleInputChange(null, 'adminEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Destek E-posta</label>
                    <input
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange(null, 'supportEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleInputChange(null, 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => handleInputChange(null, 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Ödeme Ayarları */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Ödeme Ayarları</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Para Birimi</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleInputChange(null, 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="TRY">Türk Lirası (₺)</option>
                      <option value="USD">Dolar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">KDV Oranı (%)</label>
                    <input
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => handleInputChange(null, 'taxRate', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ücretsiz Kargo Limiti (₺)</label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => handleInputChange(null, 'freeShippingThreshold', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Ödeme Yöntemleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.paymentMethods).map(([method, enabled]) => (
                      <label key={method} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => handleInputChange('paymentMethods', method, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {method === 'creditCard' ? 'Kredi Kartı' :
                           method === 'bankTransfer' ? 'Banka Havalesi' :
                           method === 'paypal' ? 'PayPal' : 'Kripto Para'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Kargo Ayarları */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Kargo Ayarları</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standart Kargo Ücreti (₺)</label>
                    <input
                      type="number"
                      value={settings.shippingCost}
                      onChange={(e) => handleInputChange(null, 'shippingCost', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hazırlanma Süresi</label>
                    <input
                      type="text"
                      value={settings.processingTime}
                      onChange={(e) => handleInputChange(null, 'processingTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Kargo Şirketleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(settings.shippingCompanies).map(([company, enabled]) => (
                      <label key={company} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => handleInputChange('shippingCompanies', company, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {company === 'ptt' ? 'PTT Kargo' :
                           company === 'yurtici' ? 'Yurtiçi Kargo' :
                           company === 'aras' ? 'Aras Kargo' : 'UPS'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Bildirim Ayarları */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Bildirim Ayarları</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([type, enabled]) => (
                    <div key={type} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {type === 'newOrder' ? 'Yeni Sipariş' :
                           type === 'lowStock' ? 'Düşük Stok' :
                           type === 'newUser' ? 'Yeni Kullanıcı' :
                           type === 'newReview' ? 'Yeni Yorum' : 'Sistem Güncellemeleri'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {type === 'newOrder' ? 'Yeni sipariş geldiğinde bildirim al' :
                           type === 'lowStock' ? 'Stok azaldığında bildirim al' :
                           type === 'newUser' ? 'Yeni kullanıcı kaydolduğunda bildirim al' :
                           type === 'newReview' ? 'Yeni yorum yazıldığında bildirim al' : 'Sistem güncellemeleri hakkında bildirim al'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => handleInputChange('notifications', type, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Güvenlik Ayarları */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Güvenlik Ayarları</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Oturum Zaman Aşımı (dakika)</label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleInputChange(null, 'sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Giriş Denemesi</label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleInputChange(null, 'maxLoginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">İki Faktörlü Kimlik Doğrulama</h3>
                    <p className="text-sm text-gray-600">Ekstra güvenlik için 2FA'yı etkinleştirin</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleInputChange(null, 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* SEO Ayarları */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">SEO Ayarları</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Başlık</label>
                  <input
                    type="text"
                    value={settings.metaTitle}
                    onChange={(e) => handleInputChange(null, 'metaTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    maxLength="60"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.metaTitle.length}/60 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Açıklama</label>
                  <textarea
                    value={settings.metaDescription}
                    onChange={(e) => handleInputChange(null, 'metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    maxLength="160"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.metaDescription.length}/160 karakter</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
                  <input
                    type="text"
                    value={settings.metaKeywords}
                    onChange={(e) => handleInputChange(null, 'metaKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="virgül ile ayırın"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.googleAnalytics}
                    onChange={(e) => handleInputChange(null, 'googleAnalytics', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="GA-XXXXXXXXX"
                  />
                </div>
              </div>
            )}

            {/* API Ayarları */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">API Ayarları</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Anahtarı</label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.apiKey}
                      onChange={(e) => handleInputChange(null, 'apiKey', e.target.value)}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={settings.webhookUrl}
                    onChange={(e) => handleInputChange(null, 'webhookUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (istek/saat)</label>
                  <input
                    type="number"
                    value={settings.rateLimit}
                    onChange={(e) => handleInputChange(null, 'rateLimit', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Güvenlik Uyarısı</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        API anahtarınızı güvenli tutun ve yetkisiz kişilerle paylaşmayın.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}