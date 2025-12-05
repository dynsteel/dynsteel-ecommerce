import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  User, 
  Bot,
  Phone,
  Mail,
  Clock,
  CheckCircle2
} from 'lucide-react'

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [chatStarted, setChatStarted] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Otomatik karşılama mesajları
  const welcomeMessages = [
    {
      id: 1,
      text: "Merhaba! DynSteel'e hoş geldiniz! 👋",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "Size nasıl yardımcı olabilirim? Minyatür araba modelleri, 3D tarama hizmetleri veya siparişleriniz hakkında sorularınızı yanıtlayabilirim.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]

  // Gelişmiş AI Yanıt Sistemi
  const getAIResponse = (message) => {
    const lowerMessage = message.toLowerCase().trim()
    
    // Karşılama
    if (lowerMessage.match(/^(merhaba|selam|iyi günler|günaydın|iyi akşamlar|hey|hi|hello)/)) {
      return "Merhaba! 👋 DynSteel'e hoş geldiniz! Size nasıl yardımcı olabilirim? Minyatür araba modelleri, 3D tarama hizmetleri, sipariş durumu veya diğer sorularınız için buradayım."
    }
    
    // Ürün soruları
    if (lowerMessage.match(/(ürün|model|araba|ferrari|bmw|mercedes|porsche|audi|lamborghini|koleksiyon|minyatür)/)) {
      return "Ürünlerimiz hakkında bilgi almak için ürünler sayfamızı ziyaret edebilirsiniz. Ferrari, BMW, Mercedes, Porsche ve daha birçok markanın detaylı minyatür modellerini bulabilirsiniz. Hangi modeli aradığınızı söylerseniz size daha detaylı bilgi verebilirim."
    }
    
    // 3D Tarama
    if (lowerMessage.match(/(3d|tarama|özel|parça|bulamadım|bulamıyorum|yok|üret|üretim)/)) {
      return "3D tarama hizmetimiz ile bulamadığınız parçaları özel olarak üretiyoruz! 🎨 Eksik parçalarınızı bize gönderebilir, size özel üretim yapabiliriz. Detaylı bilgi ve fiyat teklifi için WhatsApp üzerinden (+90 545 846 35 23) veya e-posta (info@dynsteel.com) ile iletişime geçebilirsiniz."
    }
    
    // Fiyat soruları
    if (lowerMessage.match(/(fiyat|ücret|ne kadar|kaç para|tutar|maliyet|bedel)/)) {
      return "Ürün fiyatlarımız kalite, detay seviyesi ve ölçeğe göre değişmektedir. 💰 Genel olarak 100₺ ile 2000₺ arasında değişen fiyatlarımız var. Belirli bir ürün hakkında fiyat bilgisi almak isterseniz, ürünler sayfasından ilgili ürüne tıklayarak detaylı bilgiye ulaşabilirsiniz."
    }
    
    // Kargo soruları
    if (lowerMessage.match(/(kargo|gönderi|teslimat|ne zaman|süre|ulaşır|gelir|gönder|sevkiyat)/)) {
      return "Kargo bilgileri: 📦\n• Kargo süremiz: 1-3 iş günü\n• Ücretsiz kargo: 500₺ ve üzeri siparişlerde\n• Kargo ücreti: 25₺ (500₺ altı siparişlerde)\n• Kargo firmaları: PTT, Yurtiçi Kargo\nSiparişiniz hazırlandıktan sonra kargo takip numaranızı e-posta ile gönderiyoruz."
    }
    
    
    // İletişim
    if (lowerMessage.match(/(iletişim|ulaş|telefon|numara|adres|email|e-posta|whatsapp|konuş|görüş)/)) {
      return "İletişim Bilgilerimiz: 📞\n• WhatsApp: +90 545 846 35 23 (7/24)\n• E-posta: info@dynsteel.com\n• Adres: İstanbul, Türkiye\n• Çalışma Saatleri: Pazartesi-Cumartesi 09:00-18:00\nEn hızlı yanıt için WhatsApp üzerinden yazabilirsiniz!"
    }
    
    // Sipariş durumu
    if (lowerMessage.match(/(sipariş|siparişim|durum|nerede|takip|numara|kargo durumu)/)) {
      return "Sipariş durumunuzu öğrenmek için sipariş numaranızı paylaşabilir misiniz? 📋 Sipariş numaranızı bilmiyorsanız, kayıtlı e-posta adresinizle giriş yaparak profil sayfanızdan tüm siparişlerinizi görebilirsiniz."
    }
    
    // Ödeme
    if (lowerMessage.match(/(ödeme|para|kredi kartı|banka|havale|eft|taksit)/)) {
      return "Ödeme Seçeneklerimiz: 💳\n• Kredi Kartı (Tüm kartlar)\n• Banka Havalesi/EFT\n• Kapıda Ödeme (Kargo ile)\n• Taksit seçenekleri kredi kartı ile mevcuttur\nGüvenli ödeme altyapımız sayesinde tüm işlemleriniz korunmaktadır."
    }
    
    // Stok
    if (lowerMessage.match(/(stok|var mı|mevcut|bulunuyor|satışta)/)) {
      return "Stok durumunu öğrenmek için hangi ürünü sorduğunuzu belirtir misiniz? 📦 Ürünler sayfasında stok durumu gösterilmektedir. Stokta olmayan ürünler için özel üretim yapabiliriz, bu durumda 3D tarama hizmetimizden yararlanabilirsiniz."
    }
    
    // Genel yardım
    if (lowerMessage.match(/(yardım|bilgi|nasıl|ne|hakkında|detay|açıkla|anlamadım)/)) {
      return "Size nasıl yardımcı olabilirim? 🤔\n• Ürün bilgileri\n• 3D tarama hizmetleri\n• Sipariş durumu\n• Kargo bilgileri\n• İletişim bilgileri\n\nHangi konuda bilgi almak istiyorsunuz?"
    }
    
    // Teşekkür
    if (lowerMessage.match(/(teşekkür|sağol|sağ ol|eyvallah|çok teşekkür|thanks|thank you)/)) {
      return "Rica ederim! 😊 Başka bir konuda yardımcı olabileceğim bir şey var mı? Her zaman buradayım!"
    }
    
    // Veda
    if (lowerMessage.match(/(görüşürüz|hoşça kal|bye|güle güle|bay bay|bye bye)/)) {
      return "Görüşmek üzere! 👋 Başka sorularınız olursa her zaman buradayım. İyi günler!"
    }
    
    // Varsayılan yanıt - daha akıllı
    return "Anladım! Bu konuda size yardımcı olmak için birkaç seçenek var:\n\n1️⃣ Ürünler hakkında bilgi almak için 'Ürün bilgisi' butonuna tıklayın\n2️⃣ 3D tarama hizmeti için '3D Tarama' butonuna tıklayın\n3️⃣ Sipariş durumu için sipariş numaranızı paylaşın\n4️⃣ Daha detaylı yardım için WhatsApp: +90 545 846 35 23\n\nBaşka bir sorunuz var mı?"
  }

  useEffect(() => {
    if (isOpen && !chatStarted) {
      // İlk açılışta hoş geldin mesajlarını göster ve chat'i başlat
      setTimeout(() => {
        setMessages(welcomeMessages)
        setChatStarted(true)
      }, 300)
    }
  }, [isOpen, chatStarted])

  useEffect(() => {
    // Mesajları scroll et
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Unread count güncelle
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const messageText = inputMessage.trim()
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // AI yanıt sistemi
    setTimeout(() => {
      const botResponse = getAIResponse(messageText)

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 1200) // 0.8-2 saniye arası gecikme (daha hızlı)
  }

  const handleStartChat = (e) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.email) {
      alert('Lütfen ad ve e-posta bilgilerinizi doldurun.')
      return
    }

    const welcomeMessage = {
      id: Date.now(),
      text: `Merhaba ${customerInfo.name}! Bilgilerinizi aldık. Size nasıl yardımcı olabiliriz?`,
      sender: 'bot',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, welcomeMessage])
    setChatStarted(true)
  }

  const handleQuickAction = (messageText) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // AI yanıt sistemi
    setTimeout(() => {
      const botResponse = getAIResponse(messageText)

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 1200) // 0.8-2 saniye arası gecikme
  }

  const quickActions = [
    { text: 'Ürün bilgisi', action: () => handleQuickAction('Ürünler hakkında bilgi almak istiyorum') },
    { text: '3D Tarama', action: () => handleQuickAction('3D tarama hizmetiniz hakkında bilgi alabilir miyim?') },
    { text: 'Kargo durumu', action: () => handleQuickAction('Siparişimin kargo durumunu öğrenebilir miyim?') },
    { text: 'İletişim', action: () => handleQuickAction('Sizinle nasıl iletişime geçebilirim?') }
  ]

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all ${
          isMinimized ? 'h-14' : 'h-96'
        }`}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">DynSteel Destek</h3>
                <p className="text-xs text-blue-100">Genellikle hemen yanıtlar</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {!chatStarted ? (
                /* Loading state - will auto-start */
                <div className="p-4 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Yapay zeka destek sistemine bağlanılıyor...</p>
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <>
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString('tr-TR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 px-3 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-2">
                      <div className="flex flex-wrap gap-1">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={action.action}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
                          >
                            {action.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Mesajınızı yazın..."
                      />
                      <button
                        type="submit"
                        disabled={!inputMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}
