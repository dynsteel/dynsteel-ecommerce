# 🚀 Production Deployment Rehberi

## Domain'e Yükleme Adımları

### 1. 📦 Gerekli Paketleri Yükleyin

```bash
npm install
```

Yeni eklenen paketler:
- `mongodb` - Veritabanı bağlantısı
- `jsonwebtoken` - Güvenli authentication
- `bcryptjs` - Şifre şifreleme

### 2. 🗄️ MongoDB Veritabanı Kurulumu

#### Seçenek A: MongoDB Atlas (Önerilen - Ücretsiz)

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hesabı oluşturun
2. Yeni bir cluster oluşturun (Free tier yeterli)
3. Database Access'ten yeni kullanıcı oluşturun
4. Network Access'ten IP adresi ekleyin (0.0.0.0/0 tüm IP'lere izin verir)
5. "Connect" butonuna tıklayıp connection string'i kopyalayın

Connection string örneği:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dynsteel?retryWrites=true&w=majority
```

#### Seçenek B: Kendi Sunucunuzda MongoDB

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# MongoDB'yi başlat
sudo systemctl start mongodb
```

### 3. ⚙️ Environment Variables (.env.local)

`.env.local` dosyasını düzenleyin:

```env
# MongoDB Connection (ZORUNLU)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dynsteel

# Site URL (ZORUNLU - Domain adresiniz)
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# JWT Secrets (ZORUNLU - Rastgele ve güçlü olmalı)
JWT_SECRET=super-secret-key-minimum-32-characters-long-random-string
ADMIN_JWT_SECRET=admin-secret-key-minimum-32-characters-long-random-string

# Email Configuration (İletişim formu için)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password

# Analytics (Opsiyonel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=xxxxxxxxx

# Production
NODE_ENV=production
```

**Güvenlik Notu:** 
- `.env.local` dosyasını asla Git'e commit ETMEYİN
- JWT secret'ları minimum 32 karakter olmalı
- Production'da güçlü şifreler kullanın

### 4. 👤 İlk Admin Kullanıcısını Oluşturun

```bash
npm run setup-admin
```

Bu script size şunları soracak:
- MongoDB URI
- Admin kullanıcı adı
- Admin email
- Admin adı
- Admin şifresi

**Örnek:**
```
MongoDB URI: mongodb+srv://...
Admin kullanıcı adı: dynsteel
Admin email: admin@yourdomain.com
Admin adı: DynSteel Admin
Admin şifresi: YourSecurePassword123!
```

### 5. 🏗️ Production Build

```bash
# Build oluştur
npm run build

# Production modunda başlat
npm start
```

### 6. 🌐 Hosting Seçenekleri

#### Seçenek A: Vercel (Önerilen - En Kolay)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

**장점:**
- Otomatik SSL sertifikası
- Global CDN
- Otomatik deployment
- Ücretsiz SSL
- 100 GB bandwidth (hobby plan)

#### Seçenek B: cPanel/Shared Hosting

1. Node.js destekleyen hosting gerekli
2. FTP ile dosyaları yükleyin
3. Node.js versiyonunu 18+ yapın
4. `npm install` ve `npm run build` çalıştırın
5. PM2 ile uygulamayı başlatın:

```bash
pm2 start npm --name "dynsteel" -- start
pm2 save
pm2 startup
```

#### Seçenek C: VPS (Ubuntu)

```bash
# Node.js kurulumu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 kurulumu
sudo npm install -g pm2

# Projeyi klonla
git clone your-repo-url
cd dynsteel-ecommerce

# Bağımlılıkları yükle
npm install

# Build
npm run build

# PM2 ile başlat
pm2 start npm --name "dynsteel" -- start
pm2 save
pm2 startup

# Nginx reverse proxy
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/dynsteel
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dynsteel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL Sertifikası (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 7. 📱 PWA Manifest URL'lerini Güncelleyin

`public/manifest.json`:
```json
{
  "start_url": "https://yourdomain.com/",
  "scope": "https://yourdomain.com/"
}
```

`public/admin-manifest.json`:
```json
{
  "start_url": "https://yourdomain.com/admin",
  "scope": "https://yourdomain.com/admin/"
}
```

### 8. 🔍 SEO Ayarları

`public/robots.txt` - Domain adresini güncelleyin:
```
Sitemap: https://yourdomain.com/sitemap.xml
```

### 9. ✅ Production Kontrol Listesi

- [ ] MongoDB bağlantısı çalışıyor mu?
- [ ] Environment variables ayarlandı mı?
- [ ] İlk admin kullanıcısı oluşturuldu mu?
- [ ] SSL sertifikası kuruldu mu?
- [ ] Domain DNS ayarları yapıldı mı?
- [ ] Analytics kodları eklendi mi?
- [ ] SMTP email ayarları yapıldı mı?
- [ ] PWA manifest URL'leri güncellendi mi?
- [ ] robots.txt domain'e göre düzenlendi mi?
- [ ] Ödeme entegrasyonu test edildi mi?

### 10. 🔒 Güvenlik Önerileri

1. **Güçlü Şifreler**
   - Admin şifreleri en az 12 karakter
   - Özel karakterler, rakamlar, büyük/küçük harfler

2. **JWT Secrets**
   - Minimum 32 karakter
   - Rastgele ve tahmin edilemez

3. **MongoDB**
   - IP whitelist kullanın
   - Güçlü database şifresi
   - Düzenli backup alın

4. **Rate Limiting**
   - API isteklerini sınırlayın
   - Brute force saldırılarına karşı korunun

5. **HTTPS**
   - Mutlaka SSL sertifikası kullanın
   - HTTP'den HTTPS'e yönlendirin

### 11. 📊 İlk Ürün Ekleme

Admin paneline giriş yapın:
```
https://yourdomain.com/admin/login
```

1. Oluşturduğunuz admin bilgileriyle giriş yapın
2. "Ürünler" sayfasına gidin
3. "Yeni Ürün Ekle" butonuna tıklayın
4. Ürün bilgilerini doldurun

### 12. 🎯 Test Senaryoları

1. **Müşteri Tarafı**
   - [ ] Ana sayfa açılıyor mu?
   - [ ] Ürünler listeleniyor mu?
   - [ ] Sepete ekleme çalışıyor mu?
   - [ ] Kayıt olma çalışıyor mu?
   - [ ] Giriş yapma çalışıyor mu?
   - [ ] Sipariş verme çalışıyor mu?
   - [ ] PWA kurulabiliyor mu?

2. **Admin Paneli**
   - [ ] Admin girişi çalışıyor mu?
   - [ ] Dashboard açılıyor mu?
   - [ ] Ürün ekleme çalışıyor mu?
   - [ ] Sipariş listesi görünüyor mu?
   - [ ] Admin PWA kurulabiliyor mu?

### 13. 📞 Destek

Sorun yaşarsanız:
1. Server loglarını kontrol edin: `pm2 logs dynsteel`
2. MongoDB connection'ı test edin
3. Environment variables'ları kontrol edin
4. Browser console'da hata var mı bakın

### 14. 🔄 Güncelleme Yaparken

```bash
# Kodu çek
git pull

# Bağımlılıkları güncelle
npm install

# Yeniden build
npm run build

# Uygulamayı restart et
pm2 restart dynsteel
```

### 15. 💾 Backup Stratejisi

1. **Veritabanı Backup (Günlük)**
```bash
# MongoDB Atlas otomatik backup yapar
# Manuel backup için:
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)
```

2. **Kod Backup**
   - Git repository kullanın
   - Her önemli değişikliği commit edin

3. **Dosya Backup**
   - Ürün resimleri
   - User uploads
   - Logs

---

## 🎉 Tebrikler!

Siteniz artık production'da! 

**Admin Paneli:** `https://yourdomain.com/admin/login`
**Müşteri Sitesi:** `https://yourdomain.com`

İyi satışlar! 🚀

