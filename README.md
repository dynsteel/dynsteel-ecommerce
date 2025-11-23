# 🚗 DynSteel E-Commerce

> Premium Araba Modifiye Parçaları ve Minyatür Araba Koleksiyonu

Modern, hızlı ve kullanıcı dostu bir e-ticaret platformu. Next.js ile geliştirilmiştir.

---

## ✨ Özellikler

### 🛍️ E-Ticaret
- ✅ Modern ve responsive tasarım
- ✅ Ürün kategorileri ve filtreleme
- ✅ Sepet yönetimi
- ✅ Arama fonksiyonu
- ✅ WhatsApp entegrasyonu

### 📱 PWA Desteği
- ✅ iPad/Tablet uygulaması gibi kullanım
- ✅ Offline destek
- ✅ Ana ekrana ekleme
- ✅ Push notification hazır

### 🎨 Özel Özellikler
- ✅ 3D tarama hizmetleri sayfası
- ✅ Admin paneli (ürün yönetimi)
- ✅ Görsel galeriler
- ✅ Newsletter entegrasyonu
- ✅ Live chat widget

### 🔧 Teknik Özellikler
- ✅ Next.js 14
- ✅ React 18
- ✅ Tailwind CSS
- ✅ Lucide Icons
- ✅ localStorage veri yönetimi
- ✅ SEO optimizasyonu
- ✅ Performance optimizasyonu

---

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/your-username/dynsteel-ecommerce.git

# Proje dizinine gidin
cd dynsteel-ecommerce

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

---

## 📁 Proje Yapısı

```
dynsteel-ecommerce/
├── components/          # React bileşenleri
│   ├── Layout.js       # Ana layout
│   ├── AdminLayout.js  # Admin layout
│   ├── SEO.js          # SEO bileşeni
│   ├── Newsletter.js   # Newsletter
│   └── ...
├── pages/              # Next.js sayfaları
│   ├── index.js        # Ana sayfa
│   ├── products.js     # Ürünler
│   ├── categories/     # Kategori sayfaları
│   ├── admin/          # Admin paneli
│   └── ...
├── context/            # React Context
│   └── CartContext.js  # Sepet yönetimi
├── public/             # Statik dosyalar
│   ├── icons/          # PWA iconları
│   └── ...
├── styles/             # CSS dosyaları
│   └── globals.css     # Global stiller
├── next.config.js      # Next.js yapılandırması
├── tailwind.config.js  # Tailwind yapılandırması
└── vercel.json         # Vercel yapılandırması
```

---

## 🎯 Kullanım

### Development

```bash
# Development server
npm run dev

# Build
npm run build

# Production server
npm run start

# Lint
npm run lint
```

### Admin Paneli

Admin paneline erişim:
- URL: `/admin`
- Kullanıcı: `dynsteel`
- Şifre: `kaan1907`

**Önemli:** Production'da mutlaka şifreyi değiştirin!

---

## 🌐 Deployment

### Vercel (Önerilen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/dynsteel-ecommerce)

```bash
# Vercel CLI ile deploy
npm i -g vercel
vercel
```

### Diğer Platformlar
- **Netlify:** `netlify deploy --prod`
- **DigitalOcean:** App Platform
- **AWS:** EC2 + PM2 + Nginx

Detaylı deployment rehberi için [`DEPLOYMENT_GUIDE.md`](DEPLOYMENT_GUIDE.md) dosyasına bakın.

---

## ⚙️ Environment Variables

`env.example` dosyasını `.env.production` olarak kopyalayın ve değerleri doldurun:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=905458463523
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📊 SEO ve Analytics

### SEO Özellikleri
- ✅ Meta tags optimizasyonu
- ✅ Open Graph ve Twitter Card
- ✅ Sitemap.xml (`/sitemap.xml`)
- ✅ Robots.txt
- ✅ Structured data (Schema.org)
- ✅ Canonical URLs

### Analytics
- Google Analytics entegrasyonu
- Facebook Pixel desteği
- Custom event tracking

---

## 📱 PWA Kurulumu

### iPad/iOS
1. Safari ile siteyi açın
2. Paylaş butonuna basın
3. "Ana Ekrana Ekle" seçin

### Android
1. Chrome ile siteyi açın
2. "Yükle" bildirimine tıklayın
3. Ana ekrana eklenir

Detaylı rehber: [`PWA_INSTALL_GUIDE.md`](PWA_INSTALL_GUIDE.md)

---

## 🛠️ Teknolojiler

### Frontend
- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **State Management:** React Context API

### Backend (Gelecek)
- **Database:** PostgreSQL / MongoDB
- **ORM:** Prisma / Mongoose
- **Authentication:** NextAuth.js
- **API:** Next.js API Routes

### DevOps
- **Hosting:** Vercel / Netlify
- **CDN:** Cloudflare
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry

---

## 🔒 Güvenlik

- HTTPS zorunlu
- XSS koruması
- CSRF koruması
- Security headers
- Rate limiting (planlı)
- Input validation
- SQL injection koruması (gelecek)

---

## 📈 Performance

### Lighthouse Scores (Hedef)
- 🟢 Performance: 90+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 95+
- 🟢 SEO: 100

### Optimizasyonlar
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ CDN kullanımı
- ✅ Compression (gzip/brotli)
- ✅ Caching strategies

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📝 Changelog

### v1.0.0 (2025-01-05)
- ✨ İlk release
- ✨ E-ticaret temel özellikleri
- ✨ Admin paneli
- ✨ PWA desteği
- ✨ SEO optimizasyonları

---

## 📞 İletişim

- **Website:** https://dynsteel.com
- **Email:** info@dynsteel.com
- **WhatsApp:** +90 545 846 35 23
- **GitHub:** [@dynsteel](https://github.com/dynsteel)

---

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

## 🙏 Teşekkürler

- Next.js ekibine
- Tailwind CSS ekibine
- Lucide Icons ekibine
- Tüm open-source katkıcılara

---

<div align="center">

**DynSteel ile yapıldı** ❤️

[Website](https://dynsteel.com) • [Documentation](DEPLOYMENT_GUIDE.md) • [Support](mailto:destek@dynsteel.com)

</div>

