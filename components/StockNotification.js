import { useState } from 'react'
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react'

export default function StockNotification({ productId, productName }) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      // Gerçek uygulamada burada API'ye istek gönderilir
      console.log('Stock notification request:', { productId, email })
      setIsSubmitted(true)
      setIsLoading(false)
      
      // 3 saniye sonra modalı kapat
      setTimeout(() => {
        setIsOpen(false)
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
      >
        <Bell className="h-5 w-5" />
        <span>Stokta Olunca Haber Ver</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Stok Bildirimi</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="text-gray-600 mb-3">
                <strong>{productName}</strong> stokta olduğunda size e-posta ile haber verelim.
              </p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresiniz
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Bildirim Hizmetimiz</p>
                  <p>Ürün stokta olur olmaz size e-posta göndereceğiz. E-posta adresinizi başka amaçlarla kullanmayacağız.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <Bell className="h-4 w-4" />
                )}
                <span>{isLoading ? 'Kaydediliyor...' : 'Haber Ver'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Kaydedildi!</h4>
            <p className="text-gray-600 mb-4">
              <strong>{productName}</strong> stokta olduğunda <strong>{email}</strong> adresine bildirim göndereceğiz.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Bu pencere otomatik olarak kapanacaktır...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
