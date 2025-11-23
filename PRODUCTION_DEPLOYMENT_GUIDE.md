# 🚀 DynSteel E-Commerce - Production Deployment Rehberi

Bu rehber, DynSteel projenizi production ortamına yüklemek için adım adım talimatları içerir.

---

## 📋 ÖN HAZIRLIK

### ✅ Gereksinimler:
- ✅ Domain adı (örn: dynsteel.com)
- ✅ Hosting / VPS (Vercel, AWS, DigitalOcean, vb.)
- ✅ MongoDB Atlas hesabı (ücretsiz)
- ✅ SSL sertifikası (hosting genelde sağlar)

---

## 🎯 ADIM 1: DATABASE KURULUMU (MongoDB Atlas)

### 1.1. MongoDB Atlas Hesabı Oluşturun
```
1. https://www.mongodb.com/cloud/atlas/register adresine gidin
2. Ücretsiz hesap oluşturun
3. "Create a New Cluster" butonuna tıklayın
4. FREE tier seçin (M0 Sandbox - 512MB)
5. Region: Frankfurt (en yakın)
6. Cluster Name: dynsteel-production
7. "Create Cluster" tıklayın (2-3 dakika sürer)
```

### 1.2. Database User Oluşturun
```
1. Security → Database Access
2. "Add New Database User"
3. Username: dynsteel_admin
4. Password: (güçlü bir şifre oluşturun ve kaydedin!)
5. Database User Privileges: "Read and write to any database"
6. "Add User"
```

### 1.3. Network Access Ayarlayın
```
1. Security → Network Access
2. "Add IP Address"
3. "Allow Access from Anywhere" (0.0.0.0/0) seçin
   (Production'da sadece sunucu IP'sini ekleyin!)
4. "Confirm"
```

### 1.4. Connection String Alın
```
1. Clusters → "Connect"
2. "Connect your application"
3. Driver: Node.js / Version: 4.1 or later
4. Connection string'i kopyalayın:
   mongodb+srv://dynsteel_admin:<password>@cluster.mongodb.net/...
5. <password> yerine şifrenizi yazın
6. /test kısmını /dynsteel olarak değiştirin
```

---

## 🎯 ADIM 2: ENVIRONMENT VARIABLES AYARLAMA

### 2.1. .env.local Dosyası Oluşturun

Proje klasöründe `.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
copy .env.example .env.local
```

### 2.2. Gerekli Değerleri Doldurun

```env
# Site URL (Domain adresiniz)
NEXT_PUBLIC_SITE_URL=https://dynsteel.com
NEXT_PUBLIC_API_URL=https://dynsteel.com/api

# MongoDB (Atlas'tan aldığınız connection string)
MONGODB_URI=mongodb+srv://dynsteel_admin:SIFRENIZ@cluster.mongodb.net/dynsteel?retryWrites=true&w=majority

# JWT Secrets (https://generate-secret.vercel.app/32 den oluşturun)
JWT_SECRET=b8f3e9a7c2d4f6e1a9b7c3d5e2f8a6b4c9d7e3f1a8b6c4d2e9f7a5b3c1d8e6f4
ADMIN_JWT_SECRET=d9e6f2a8b5c3d1e7f4a9b6c8d3e5f1a7b9c6d4e2f8a5b7c9d6e3f1a4b8c5d2e7

# Admin Hesabı
ADMIN_EMAIL=admin@dynsteel.com
ADMIN_USERNAME=dynsteel
ADMIN_PASSWORD=GucluSifre123!

# Email (Gmail kullanıyorsanız)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM=noreply@dynsteel.com

# Environment
NODE_ENV=production
```

### 2.3. Gmail App Password Oluşturma (Email için)

```
1. Google Account → Security
2. "2-Step Verification" aktif edin
3. "App passwords" bölümüne gidin
4. App: Mail, Device: Other (DynSteel)
5. Oluşturulan şifreyi SMTP_PASSWORD'e yazın
```

---

## 🎯 ADIM 3: İLK ADMIN KULLANICIYI OLUŞTURUN

Production'a yüklemeden önce local'de test edin:

```bash
# MongoDB connection string'i .env.local'e ekleyin
# Sonra admin oluşturma scriptini çalıştırın:

node scripts/setup-admin.js
```

Script size sorular soracak:
- Admin kullanıcı adı: `dynsteel`
- Email: `admin@dynsteel.com`
- Şifre: (Güçlü bir şifre girin)

---

## 🎯 ADIM 4: PRODUCTION BUILD TEST EDİN

Local'de production build'i test edin:

```bash
# Dependencies yükleyin
npm install

# Production build oluşturun
npm run build

# Production modda başlatın
npm start
```

Tarayıcıda açın: `http://localhost:3000`

**Test Checklist:**
- [ ] Ana sayfa açılıyor mu?
- [ ] Ürünler sayfası çalışıyor mu?
- [ ] Admin panel giriş yapılabiliyor mu? (http://localhost:3000/admin)
- [ ] Admin panelde ürün ekleme/düzenleme çalışıyor mu?
- [ ] Logolar doğru görünüyor mu?

---

## 🎯 ADIM 5: VERCEL'E DEPLOYMENT

### 5.1. Vercel Hesabı Oluşturun
```
1. https://vercel.com/signup adresine gidin
2. GitHub ile giriş yapın
```

### 5.2. GitHub'a Yükleyin

```bash
# GitHub repository oluşturun
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/dynsteel-ecommerce.git
git push -u origin main
```

### 5.3. Vercel'e Deploy Edin

```
1. Vercel Dashboard → "Add New Project"
2. GitHub reponuzu seçin
3. Project Settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
4. Environment Variables ekleyin:
   - .env.local içindeki TÜM değerleri buraya ekleyin
   - NEXT_PUBLIC_ ile başlayanlar dahil!
5. "Deploy" butonuna tıklayın
```

### 5.4. Domain Bağlayın

```
1. Project Settings → Domains
2. "Add Domain" butonuna tıklayın
3. dynsteel.com yazın
4. Vercel size DNS kayıtlarını gösterecek
5. Domain sağlayıcınızda (GoDaddy, Namecheap, vb) bu kayıtları ekleyin:
   
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
6. DNS yayılması 5-10 dakika sürebilir
```

---

## 🎯 ADIM 6: PRODUCTION KONTROLÜ

### 6.1. Site Kontrolü

Tarayıcıda açın: `https://dynsteel.com`

**Kontrol Listesi:**
- [ ] HTTPS çalışıyor mu? (Yeşil kilit)
- [ ] Ana sayfa hızlı yükleniyor mu?
- [ ] Ürünler görünüyor mu?
- [ ] Sepete ekleme çalışıyor mu?
- [ ] İletişim formu çalışıyor mu?
- [ ] Mobile görünüm düzgün mü?

### 6.2. Admin Panel Kontrolü

Tarayıcıda açın: `https://dynsteel.com/admin`

**Kontrol Listesi:**
- [ ] Login sayfası açılıyor mu?
- [ ] Giriş yapabildiniz mi?
- [ ] Dashboard istatistikler görünüyor mu?
- [ ] Ürün ekleme/düzenleme çalışıyor mu?
- [ ] Sipariş listesi görünüyor mu?
- [ ] Raporları indirebiliyor musunuz?

### 6.3. PWA Kontrolü

**Desktop (Chrome):**
- [ ] Adres çubuğunda "Yükle" ikonu var mı?
- [ ] PWA yüklenebiliyor mu?
- [ ] Offline çalışıyor mu? (Network'ü kapatıp test edin)

**Mobile:**
- [ ] "Ana ekrana ekle" seçeneği görünüyor mu?
- [ ] Logo doğru görünüyor mu?

---

## 🎯 ADIM 7: GÜVENLİK AYARLARI

### 7.1. MongoDB IP Whitelist

```
1. MongoDB Atlas → Network Access
2. "0.0.0.0/0" kaydını silin
3. Vercel sunucu IP'lerini ekleyin:
   - Vercel Dashboard → Project → Settings → Domains
   - IP adreslerini alıp MongoDB'ye ekleyin
```

### 7.2. Environment Variables Güvenliği

```
- .env.local dosyasını GitHub'a ASLA YÜKLEMEYIN!
- .gitignore'da olduğundan emin olun
- Tüm secret key'leri düzenli değiştirin
```

### 7.3. Rate Limiting

API route'larına rate limiting ekleyin (opsiyonel):

```javascript
// middleware/rateLimit.js
import { RateLimiter } from 'limiter'

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute'
})

export default async function rateLimit(req, res, next) {
  const remainingRequests = await limiter.removeTokens(1)
  if (remainingRequests < 0) {
    return res.status(429).json({ error: 'Çok fazla istek!' })
  }
  next()
}
```

---

## 🎯 ADIM 8: SEO AYARLARI

### 8.1. Google Search Console

```
1. https://search.google.com/search-console/ adresine gidin
2. "Add Property" → Domain
3. dynsteel.com yazın
4. DNS verification (TXT kaydı) yapın
5. Sitemap gönderin: https://dynsteel.com/sitemap.xml
```

### 8.2. Google Analytics

```
1. https://analytics.google.com/ adresine gidin
2. Yeni property oluşturun
3. Tracking ID'yi alın (G-XXXXXXXXXX)
4. Vercel Environment Variables'a ekleyin:
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
5. Redeploy edin
```

---

## 🎯 ADIM 9: YEDEKLEME AYARLARI

### 9.1. MongoDB Otomatik Yedekleme

```
1. MongoDB Atlas → Backup (Cloud Backup)
2. "Enable Cloud Provider Snapshots"
3. Snapshot Schedule: Daily
4. Retention: 7 days (ücretsiz planlarda)
```

### 9.2. Kod Yedekleme

```bash
# GitHub'a düzenli commit atın
git add .
git commit -m "Update: açıklama"
git push origin main
```

---

## 🎯 ADIM 10: PERFORMANS OPTİMİZASYONU

### 10.1. Lighthouse Testi

```
1. Chrome DevTools → Lighthouse
2. "Generate report"
3. Performance, SEO, Accessibility skorlarını kontrol edin
4. 90+ hedefleyin
```

### 10.2. CDN ve Caching

Vercel otomatik olarak CDN kullanır, ek ayar gerekmez!

### 10.3. Resim Optimizasyonu

```bash
# Tüm resimleri sıkıştırın
npm install -g sharp-cli
find public/images -name '*.jpg' -exec sharp -i {} -o {}.optimized.jpg \;
```

---

## 🛠️ SORUN GİDERME

### Problem: "Internal Server Error 500"
**Çözüm:** 
- Vercel logs kontrol edin
- Environment variables doğru mu?
- MongoDB connection string doğru mu?

### Problem: "MongoDB connection timeout"
**Çözüm:**
- Network Access IP'leri kontrol edin
- MONGODB_URI doğru mu?
- Şifrede özel karakter varsa URL encode edin

### Problem: Admin panele giriş yapamıyorum
**Çözüm:**
- `scripts/setup-admin.js` çalıştırdınız mı?
- Şifre doğru mu?
- Browser console'da hata var mı?

### Problem: PWA yüklenmiyor
**Çözüm:**
- HTTPS zorunlu (HTTP'de çalışmaz)
- manifest.json dosyası erişilebilir mi?
- Service worker kayıtlı mı?

---

## ✅ PRODUCTION CHECKLIST

Son kontrol listesi:

- [ ] MongoDB Atlas kurulumu tamamlandı
- [ ] Environment variables ayarlandı
- [ ] Admin kullanıcı oluşturuldu
- [ ] Production build test edildi
- [ ] Vercel'e deploy edildi
- [ ] Domain bağlandı
- [ ] SSL aktif (HTTPS)
- [ ] Admin panel çalışıyor
- [ ] Email gönderimi çalışıyor
- [ ] PWA yüklenebiliyor
- [ ] Google Search Console eklendi
- [ ] Google Analytics aktif
- [ ] Yedekleme ayarlandı
- [ ] Güvenlik ayarları yapıldı
- [ ] Performans optimize edildi

---

## 📞 DESTEK

Sorun mu yaşıyorsunuz?

- 📧 Email: support@dynsteel.com
- 📱 WhatsApp: 0545 846 3523
- 🌐 Website: www.dynsteel.com

---

## 🎉 TEBRİKLER!

DynSteel E-Commerce siteniz artık CANLI! 🚀

**Sonraki Adımlar:**
1. Ürünleri ekleyin
2. Sosyal medya hesaplarını bağlayın
3. Ödeme entegrasyonunu tamamlayın (İyzico/PayTR)
4. WhatsApp Business API bağlayın
5. Pazarlama kampanyalarını başlatın

---

**🔥 İyi Satışlar! 🔥**

