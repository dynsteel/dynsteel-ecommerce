// Bildirim sesi çalma fonksiyonu (hem telefon hem bilgisayar için)
export function playNotificationSound() {
  try {
    // Web Audio API ile bildirim sesi oluştur
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Oscillator ile bildirim sesi oluştur (kısa bip sesi)
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Ses ayarları
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Frekans ve süre ayarları (bildirim sesi gibi)
    oscillator.frequency.value = 800 // Hz
    oscillator.type = 'sine'
    
    // Ses seviyesi (volume)
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
    
    // İki kısa bip sesi
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
    
    // İkinci bip için kısa bir gecikme
    setTimeout(() => {
      const oscillator2 = audioContext.createOscillator()
      const gainNode2 = audioContext.createGain()
      
      oscillator2.connect(gainNode2)
      gainNode2.connect(audioContext.destination)
      
      oscillator2.frequency.value = 1000
      oscillator2.type = 'sine'
      
      gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator2.start(audioContext.currentTime)
      oscillator2.stop(audioContext.currentTime + 0.15)
    }, 200)
  } catch (error) {
    console.error('Error playing notification sound:', error)
    // Fallback: HTML5 Audio kullan (eğer ses dosyası varsa)
    try {
      const audio = new Audio('/sounds/notification.mp3')
      audio.volume = 0.5
      audio.play().catch(err => console.error('Audio play failed:', err))
    } catch (audioError) {
      console.error('Fallback audio failed:', audioError)
    }
  }
}

// Service Worker için ses çalma fonksiyonu
export function playNotificationSoundInSW() {
  // Service Worker'da Web Audio API kullanılamaz, bu yüzden
  // client'a mesaj göndererek ses çalmasını sağlayacağız
  return `
    // Service Worker içinde kullanılacak kod
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'PLAY_NOTIFICATION_SOUND'
        })
      })
    })
  `
}

