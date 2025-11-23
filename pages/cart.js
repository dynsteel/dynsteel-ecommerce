import Layout from '../components/Layout'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  ArrowRight
} from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart()

  const shippingCost = totalPrice > 500 ? 0 : 25
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0) {
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
              <span className="text-white font-medium">Sepet</span>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <section className="py-20 bg-primary-900 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Sepetiniz Boş
            </h1>
            <p className="text-primary-300 mb-8">
              Henüz sepetinizde ürün bulunmuyor. Minyatür araba koleksiyonumuzu keşfetmeye başlayın!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <button className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Alışverişe Başla</span>
                </button>
              </Link>
              <Link href="/">
                <button className="border border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
                  Anasayfaya Dön
                </button>
              </Link>
            </div>
          </div>
        </section>
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
            <span className="text-white font-medium">Sepet</span>
          </div>
        </div>
      </div>

      {/* Cart Page */}
      <section className="py-8 bg-primary-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <ShoppingCart className="h-8 w-8 mr-3" />
              Sepetim ({totalItems} ürün)
            </h1>
            <button
              onClick={() => {
                if (window.confirm('Sepetteki tüm ürünleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
                  clearCart()
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 hover:scale-105"
            >
              <Trash2 className="h-4 w-4" />
              <span>Sepeti Temizle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="glass-effect p-6 rounded-xl border border-primary-700 hover:border-accent-500 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-800 rounded-lg flex items-center justify-center text-3xl">
                        {item.image}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-primary-400 text-sm mb-2">
                          {item.description}
                        </p>
                        {item.scale && (
                          <span className="text-xs bg-primary-700 text-primary-200 px-2 py-1 rounded">
                            {item.scale}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-primary-700 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-accent-600 hover:bg-accent-700 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-accent-400">
                          ₺{(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-primary-400">
                          ₺{item.price} x {item.quantity}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          if (window.confirm(`"${item.name}" ürününü sepetten çıkarmak istediğinizden emin misiniz?`)) {
                            removeFromCart(item.id)
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-2 transition-colors hover:bg-red-500/10 rounded-lg"
                        title="Sepetten Çıkar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link href="/products">
                  <button className="flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Alışverişe Devam Et
                  </button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-effect p-6 rounded-xl border border-primary-700 sticky top-8">
                <h2 className="text-xl font-bold text-white mb-6">
                  Sipariş Özeti
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-primary-300">
                    <span>Ara Toplam ({totalItems} ürün)</span>
                    <span>₺{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-primary-300">
                    <span>Kargo</span>
                    <span className={shippingCost === 0 ? 'text-green-400' : ''}>
                      {shippingCost === 0 ? 'Ücretsiz' : `₺${shippingCost}`}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <div className="text-sm text-primary-400 bg-primary-800 p-3 rounded-lg">
                      ₺{(500 - totalPrice).toLocaleString()} daha harcayarak ücretsiz kargo kazanın!
                    </div>
                  )}

                  <hr className="border-primary-600" />

                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Toplam</span>
                    <span className="text-accent-400">₺{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2 mb-4">
                    <CreditCard className="h-5 w-5" />
                    <span>Ödemeye Geç</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>

                {/* Features */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-primary-300">
                    <Truck className="h-4 w-4 mr-2 text-accent-400" />
                    <span>Hızlı ve güvenli kargo</span>
                  </div>
                  <div className="flex items-center text-primary-300">
                    <Shield className="h-4 w-4 mr-2 text-accent-400" />
                    <span>Güvenli ödeme sistemi</span>
                  </div>
                  <div className="flex items-center text-primary-300">
                    <CreditCard className="h-4 w-4 mr-2 text-accent-400" />
                    <span>Tüm kredi kartları kabul edilir</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
