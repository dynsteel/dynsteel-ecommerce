# ✅ Production Deployment Checklist

Son kontrol listesi - Deployment öncesi tüm maddeleri kontrol edin!

## 📋 Ön Hazırlık

### Kod Kalitesi
- [ ] `npm run build` başarıyla çalışıyor
- [ ] `npm run start` ile test edildi
- [ ] Tüm console.log'lar temizlendi (production'da otomatik kaldırılıyor)
- [ ] Linter hataları yok (`npm run lint`)
- [ ] Kullanılmayan importlar temizlendi

### Environment Variables
- [ ] `.env.production` dosyası oluşturuldu
- [ ] `NEXT_PUBLIC_SITE_URL` production domain olarak ayarlandı
- [ ] WhatsApp numarası doğru
- [ ] Email adresleri doğru
- [ ] Analytics ID'leri eklendi (varsa)
- [ ] Admin şifresi GÜVENLİ bir şifreyle değiştirildi ⚠️

### Güvenlik
- [ ] Admin paneli şifresi değiştirildi
- [ ] Environment variables gizli tutuluyor
- [ ] `.gitignore` dosyası güncel
- [ ] `.env` dosyaları Git'e commit edilmedi
- [ ] HTTPS aktif olacak
- [ ] Security headers ayarlandı

---

## 🌐 Domain ve Hosting

### Domain
- [ ] Domain satın alındı
- [ ] DNS yönetim paneline erişim var
- [ ] Nameserver'lar ayarlandı (Vercel/Netlify için)
- [ ] A records eklendi
- [ ] CNAME records eklendi
- [ ] DNS propagation tamamlandı (24-48 saat)

### SSL/HTTPS
- [ ] SSL sertifikası otomatik (Vercel/Netlify) veya manuel (Certbot) kuruldu
- [ ] HTTPS zorunlu redirect aktif
- [ ] SSL Labs testi A+ sonuç (https://www.ssllabs.com/ssltest/)

---

## 📱 PWA ve Mobile

### PWA Ayarları
- [ ] `manifest.json` dosyası mevcut
- [ ] PWA iconları (`/icons/`) mevcut
- [ ] Service Worker ayarları doğru
- [ ] "Add to Home Screen" çalışıyor
- [ ] iOS Safari'de test edildi
- [ ] Android Chrome'da test edildi

### Mobile Responsive
- [ ] iPhone SE (375px) test edildi
- [ ] iPhone 12 (390px) test edildi
- [ ] iPad (768px) test edildi
- [ ] iPad Pro (1024px) test edildi
- [ ] Yatay (landscape) mod test edildi

---

## 🔍 SEO Optimizasyonu

### Meta Tags
- [ ] Tüm sayfalarda title tags var
- [ ] Meta descriptions 150-160 karakter
- [ ] Open Graph tags mevcut
- [ ] Twitter Card tags mevcut
- [ ] Canonical URLs ayarlandı

### Sitemap ve Robots
- [ ] `/sitemap.xml` çalışıyor
- [ ] `/robots.txt` çalışıyor
- [ ] Google Search Console'a sitemap gönderildi
- [ ] Bing Webmaster Tools'a sitemap gönderildi

### Structured Data
- [ ] Organization schema eklendi
- [ ] WebSite schema eklendi
- [ ] Product schema eklendi (ürün sayfalarında)
- [ ] BreadcrumbList schema eklendi
- [ ] Google Rich Results Test geçti

---

## 📊 Analytics ve Monitoring

### Analytics
- [ ] Google Analytics kuruldu
- [ ] Google Analytics çalışıyor (test edildi)
- [ ] Facebook Pixel kuruldu (opsiyonel)
- [ ] Event tracking test edildi
- [ ] Conversion tracking ayarlandı

### Monitoring
- [ ] Uptime monitoring kuruldu (UptimeRobot vb.)
- [ ] Error monitoring kuruldu (Sentry vb.)
- [ ] Performance monitoring aktif
- [ ] Alert sistemleri ayarlandı

---

## ⚡ Performance

### Lighthouse Scores
- [ ] Performance: 90+ ✅
- [ ] Accessibility: 95+ ✅
- [ ] Best Practices: 95+ ✅
- [ ] SEO: 100 ✅

### Optimizasyonlar
- [ ] Image optimization aktif
- [ ] Lazy loading çalışıyor
- [ ] Code splitting doğru
- [ ] Compression (gzip/brotli) aktif
- [ ] CDN kullanımı (Vercel/Cloudflare)
- [ ] Cache headers doğru ayarlandı

### Page Speed
- [ ] Google PageSpeed Insights: 90+ (Mobile)
- [ ] Google PageSpeed Insights: 95+ (Desktop)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s

---

## 🧪 Fonksiyonel Testler

### Ana Sayfa
- [ ] Ana sayfa açılıyor
- [ ] Hero section görünüyor
- [ ] Ürünler listeleniyor
- [ ] Kategoriler görünüyor
- [ ] WhatsApp butonu çalışıyor
- [ ] Newsletter form çalışıyor

### Ürün Sayfaları
- [ ] Ürün listeleme çalışıyor
- [ ] Ürün detay sayfaları açılıyor
- [ ] Sepete ekleme çalışıyor
- [ ] Filtreleme çalışıyor
- [ ] Sıralama çalışıyor
- [ ] Arama fonksiyonu çalışıyor

### Sepet
- [ ] Sepete ürün ekleniyor
- [ ] Sepetten ürün çıkarılıyor
- [ ] Miktar artırma/azaltma çalışıyor
- [ ] Toplam fiyat doğru hesaplanıyor
- [ ] Sepet localStorage'a kaydediliyor

### Admin Paneli
- [ ] Login sayfası çalışıyor
- [ ] Login işlemi başarılı
- [ ] Dashboard açılıyor
- [ ] Ürün ekleme çalışıyor
- [ ] Ürün düzenleme çalışıyor
- [ ] Ürün silme çalışıyor
- [ ] Logout çalışıyor
- [ ] Fotoğraf yükleme çalışıyor

### Diğer Sayfalar
- [ ] 3D Tarama sayfası açılıyor
- [ ] Hakkımızda sayfası açılıyor
- [ ] İletişim sayfası açılıyor
- [ ] 404 sayfası çalışıyor
- [ ] Error sayfası çalışıyor

---

## 🔐 Güvenlik Testleri

### Security Headers
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy ayarlandı
- [ ] Content-Security-Policy ayarlandı (opsiyonel)

### SSL/TLS
- [ ] HTTPS zorunlu
- [ ] TLS 1.2+ kullanılıyor
- [ ] Mixed content uyarısı yok
- [ ] HSTS header aktif

### Diğer
- [ ] SQL injection koruması (gelecek)
- [ ] XSS koruması aktif
- [ ] CSRF koruması aktif
- [ ] Rate limiting (gelecek)

---

## 📧 Email ve İletişim

### Email Ayarları
- [ ] info@dynsteel.com aktif
- [ ] destek@dynsteel.com aktif
- [ ] Email forwarding ayarlandı
- [ ] Auto-reply mesajları ayarlandı (opsiyonel)

### İletişim Kanalları
- [ ] WhatsApp numarası aktif
- [ ] WhatsApp Business hesabı (opsiyonel)
- [ ] Sosyal medya linkleri doğru
- [ ] Live chat widget çalışıyor

---

## 🌍 Çoklu Dil ve Yerelleştirme

### Türkçe İçerik
- [ ] Tüm metinler Türkçe
- [ ] Tarih formatları Türkçe
- [ ] Para birimi TL (₺)
- [ ] Telefon formatı +90

### Yerel SEO
- [ ] Google My Business kaydı (opsiyonel)
- [ ] Yerel anahtar kelimeler
- [ ] Türkiye odaklı içerik

---

## 💾 Yedekleme ve Kurtarma

### Yedekleme
- [ ] Database backup planı (gelecek)
- [ ] Code repository yedeklendi (Git)
- [ ] Environment variables yedeklendi
- [ ] Media files yedeklendi

### Kurtarma Planı
- [ ] Disaster recovery planı hazır
- [ ] Backup restore test edildi
- [ ] Alternatif domain hazır (opsiyonel)

---

## 📱 Sosyal Medya

### Profiller
- [ ] Facebook sayfası oluşturuldu
- [ ] Instagram hesabı oluşturuldu
- [ ] Twitter hesabı oluşturuldu
- [ ] LinkedIn sayfası oluşturuldu (opsiyonel)

### Entegrasyonlar
- [ ] Facebook Pixel kuruldu
- [ ] Instagram feed entegrasyonu (opsiyonel)
- [ ] Social sharing butonları çalışıyor

---

## 🚀 Launch Hazırlığı

### Son Kontroller
- [ ] Tüm linkler çalışıyor
- [ ] Tüm görseller yükleniyor
- [ ] Console'da hata yok
- [ ] Network tab'da 404 yok
- [ ] Memory leak yok

### Ekip Bilgilendirme
- [ ] Ekip deployment'dan haberdar
- [ ] Dokümantasyon paylaşıldı
- [ ] Acil durum planı hazır
- [ ] Support ekibi hazır

### Marketing
- [ ] Launch duyurusu hazır
- [ ] Email listesi hazır
- [ ] Sosyal medya paylaşımları hazır
- [ ] Google Ads kampanyası hazır (opsiyonel)

---

## 🎯 Post-Launch

### İlk 24 Saat
- [ ] Site sürekli monitoring
- [ ] Error logları kontrol
- [ ] Analytics kontrol
- [ ] User feedback toplama
- [ ] Performance monitoring

### İlk Hafta
- [ ] Google Search Console kontrol
- [ ] Analytics raporları inceleme
- [ ] User behavior analizi
- [ ] Bug fixes
- [ ] A/B test başlatma (opsiyonel)

---

## 📞 Acil Durum

### İletişim Listesi
- [ ] Hosting support numarası kaydedildi
- [ ] Domain support numarası kaydedildi
- [ ] Developer iletişim bilgileri
- [ ] Emergency contact list hazır

### Acil Durum Prosedürü
- [ ] Rollback planı hazır
- [ ] Backup restore süreci biliniyor
- [ ] Downtime communication planı
- [ ] Status page hazır (opsiyonel)

---

## ✅ Final Check

### Deployment Anı
- [ ] Tüm testler geçti
- [ ] Team üyeleri hazır
- [ ] Backup alındı
- [ ] Rollback planı hazır
- [ ] Monitoring aktif

### Deployment Sonrası (5 dakika)
- [ ] Site açılıyor
- [ ] Ana sayfa yükleniyor
- [ ] Login çalışıyor
- [ ] Sepet çalışıyor
- [ ] No critical errors

### 1 Saat Sonra
- [ ] Analytics data geliyor
- [ ] No server errors
- [ ] Performance normal
- [ ] User reports normal

---

## 🎉 Launch!

**Tebrikler!** Projeniz live! 🚀

### Sonraki Adımlar
1. İlk 24 saat yakından takip edin
2. User feedback toplayın
3. Performance optimize edin
4. Bug fixes yapın
5. Yeni features ekleyin

---

**Not:** Bu checklist'i yazdırın ve deployment sırasında yanınızda bulundurun!

**Son güncelleme:** {{ tarih }}

