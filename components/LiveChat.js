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

  // Otomatik yanıtlar
  const autoResponses = {
    'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim?',
    'ürün': 'Ürünlerimiz hakkında bilgi almak için ürünler sayfasını ziyaret edebilir veya bana hangi modeli aradığınızı söyleyebilirsiniz.',
    '3d tarama': '3D tarama hizmetimiz ile bulamadığınız parçaları özel olarak üretiyoruz. Detaylı bilgi için 3D Tarama sayfamızı ziyaret edebilirsiniz.',
    'fiyat': 'Ürün fiyatlarımız kalite ve detay seviyesine göre değişmektedir. Hangi ürün hakkında bilgi almak istiyorsunuz?',
    'kargo': 'Kargo süremiz 1-3 iş günüdür. Ücretsiz kargo 500₺ ve üzeri siparişlerde geçerlidir.',
    'iade': 'İade politikamız gereği 14 gün içinde ürünleri iade edebilirsiniz. Detaylar için İade & Değişim sayfasını inceleyebilirsiniz.',
    'iletişim': 'Bize 7/24 WhatsApp üzerinden ulaşabilirsiniz: +90 545 846 35 23'
  }

  useEffect(() => {
    if (isOpen && !chatStarted) {
      // İlk açılışta hoş geldin mesajlarını göster
      setTimeout(() => {
        setMessages(welcomeMessages)
        setChatStarted(true)
      }, 500)
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

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Otomatik yanıt simülasyonu
    setTimeout(() => {
      const messageText = inputMessage.toLowerCase()
      let botResponse = "Anladım. Bu konuda size yardımcı olmak için müşteri temsilcimizi yönlendiriyorum. Kısa süre içinde size dönüş yapacağız."

      // Otomatik yanıt kontrolü
      for (const [keyword, response] of Object.entries(autoResponses)) {
        if (messageText.includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // 1-3 saniye arası gecikme
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

    // Otomatik yanıt simülasyonu
    setTimeout(() => {
      const messageTextLower = messageText.toLowerCase()
      let botResponse = "Anladım. Bu konuda size yardımcı olmak için müşteri temsilcimizi yönlendiriyorum. Kısa süre içinde size dönüş yapacağız."

      // Otomatik yanıt kontrolü
      for (const [keyword, response] of Object.entries(autoResponses)) {
        if (messageTextLower.includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // 1-3 saniye arası gecikme
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
                /* Customer Info Form */
                <div className="p-4 h-80 overflow-y-auto">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Canlı Destek</h4>
                    <p className="text-sm text-gray-600">
                      Size daha iyi yardımcı olabilmek için kısa bilgilerinizi alabilir miyiz?
                    </p>
                  </div>

                  <form onSubmit={handleStartChat} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adınız *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Adınızı girin"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="0500 000 00 00"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Sohbeti Başlat
                    </button>
                  </form>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center mb-2">Alternatif iletişim:</p>
                    <div className="flex justify-center space-x-4">
                      <a
                        href="https://wa.me/905458463523"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-xs"
                      >
                        <Phone className="h-3 w-3" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href="mailto:info@dynsteel.com"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs"
                      >
                        <Mail className="h-3 w-3" />
                        <span>E-posta</span>
                      </a>
                    </div>
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
