# ⚡ Hızlı Başlangıç - Domain'e Yükleme

5 dakikada projenizi domain'e yükleyin!

## 🎯 Hızlı Yükleme Adımları

### 1. Paketleri Yükle (1 dk)

```bash
npm install
```

### 2. MongoDB Hazırla (2 dk)

**En Kolay Yol: MongoDB Atlas (Ücretsiz)**

1. Git: https://www.mongodb.com/cloud/atlas/register
2. "Create Free Cluster" tıkla
3. Database Access → "Add New User" → kullanıcı adı/şifre oluştur
4. Network Access → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
5. Clusters → "Connect" → "Connect your application" → **Connection string'i kopyala**

Örnek string:
```
mongodb+srv://dynsteel:password123@cluster0.xxxxx.mongodb.net/dynsteel
```

### 3. Environment Variables Ayarla (1 dk)

`.env.local` dosyasını aç ve SADECE şunları değiştir:

```env
# ✅ MongoDB'den kopyaladığın connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dynsteel

# ✅ Domain adresin (şimdilik localhost olabilir)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ✅ Güçlü rastgele şifreler oluştur (minimum 32 karakter)
JWT_SECRET=buraya-cok-guclu-rastgele-bir-sifre-yaz-minimum-32-karakter
ADMIN_JWT_SECRET=buraya-da-farkli-bir-guclu-sifre-yaz-minimum-32

# NODE_ENV=production (Domain'e yüklerken)
NODE_ENV=development
```

**💡 İpucu:** Güçlü şifre oluşturmak için: https://passwordsgenerator.net/

### 4. Admin Kullanıcısı Oluştur (1 dk)

```bash
npm run setup-admin
```

Terminal soracak:
```
MongoDB URI: [Az önce .env.local'e yazdığın]
Admin kullanıcı adı: dynsteel
Admin email: admin@dynsteel.com
Admin adı: DynSteel Admin
Admin şifresi: [Güçlü bir şifre - NOT EDİN!]
```

✅ Başarılı olursa: "Admin kullanıcısı başarıyla oluşturuldu!"

### 5. Test Et (30 sn)

```bash
npm run dev
```

Tarayıcıda aç:
- **Müşteri Sitesi:** http://localhost:3000
- **Admin Paneli:** http://localhost:3000/admin/login

Admin paneline oluşturduğun bilgilerle giriş yap!

---

## 🚀 Domain'e Yükleme

### Seçenek A: Vercel (EN KOLAY - Önerilen)

1. **Vercel Hesabı Oluştur**
   - Git: https://vercel.com/signup
   - GitHub ile giriş yap

2. **Proje Yükle**
   - "Add New" → "Project"
   - GitHub repo'nu seç (veya yükle)
   - "Import"

3. **Environment Variables Ekle**
   - "Environment Variables" bölümüne tıkla
   - `.env.local` dosyasındaki TÜM değişkenleri kopyala-yapıştır:
     ```
     MONGODB_URI=mongodb+srv://...
     NEXT_PUBLIC_API_URL=https://PROJEN-ADI.vercel.app/api
     NEXT_PUBLIC_SITE_URL=https://PROJEN-ADI.vercel.app
     JWT_SECRET=...
     ADMIN_JWT_SECRET=...
     NODE_ENV=production
     ```

4. **Deploy Et**
   - "Deploy" butonuna tıkla
   - 2-3 dakika bekle
   - ✅ Siteniz hazır!

5. **Custom Domain Ekle (Opsiyonel)**
   - Settings → Domains
   - Domain adını ekle (örn: dynsteel.com)
   - DNS ayarlarını yap (Vercel gösterecek)

**Vercel Link:** `https://your-project.vercel.app`

---

### Seçenek B: cPanel/Shared Hosting

1. **Node.js Kurulu mu Kontrol Et**
   - cPanel → "Setup Node.js App"
   - Yoksa hosting desteğinden iste

2. **Dosyaları Yükle**
   - FTP ile tüm dosyaları yükle
   - Veya cPanel → "Git Version Control"

3. **Node.js Uygulaması Oluştur**
   - "Setup Node.js App"
   - Node.js Version: 18.x
   - Application Mode: Production
   - Application Root: `/home/username/dynsteel-ecommerce`
   - Application URL: `yourdomain.com`
   - "Create"

4. **Environment Variables Ekle**
   - "Edit" → "Environment Variables"
   - `.env.local` dosyasındakileris ekle

5. **Kurulum**
   - Terminal'i aç (cPanel → Terminal)
   ```bash
   cd dynsteel-ecommerce
   npm install
   npm run build
   npm run setup-admin
   ```

6. **Başlat**
   - "Restart" butonuna tıkla
   - ✅ Siteniz hazır!

---

### Seçenek C: VPS (Ubuntu)

```bash
# 1. Sunucuya bağlan
ssh root@your-server-ip

# 2. Node.js kur
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. PM2 kur
sudo npm install -g pm2

# 4. Proje klasörü oluştur
cd /var/www
git clone your-repo-url dynsteel
cd dynsteel

# 5. Environment variables
nano .env.local
# (Yukarıdaki değişkenleri yapıştır, Ctrl+X, Y, Enter)

# 6. Kurulum
npm install
npm run build
npm run setup-admin

# 7. PM2 ile başlat
pm2 start npm --name "dynsteel" -- start
pm2 save
pm2 startup

# 8. Nginx kur ve ayarla
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
# Aktifleştir
sudo ln -s /etc/nginx/sites-available/dynsteel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL (Let's Encrypt)
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# ✅ Tamam!
```

---

## ✅ Deployment Sonrası Kontrol

1. **Müşteri Sitesi Test**
   - [ ] Ana sayfa açılıyor mu? → `https://yourdomain.com`
   - [ ] Ürünler sayfası çalışıyor mu? → `/products`
   - [ ] PWA kurulabiliyor mu? (Telefonda "Ana ekrana ekle")

2. **Admin Paneli Test**
   - [ ] Giriş yapabiliyor musun? → `https://yourdomain.com/admin/login`
   - [ ] Dashboard açılıyor mu?
   - [ ] Admin PWA kurulabiliyor mu?

3. **URL'leri Güncelle**
   - `manifest.json` → Domain URL'si
   - `admin-manifest.json` → Domain URL'si
   - `robots.txt` → Sitemap URL'si

4. **İlk Ürünü Ekle**
   - Admin paneline gir
   - "Ürünler" → "Yeni Ürün Ekle"
   - Test ürünü oluştur

---

## 🔧 Sorun Giderme

### "Cannot connect to MongoDB"
- `.env.local` dosyasında `MONGODB_URI` doğru mu?
- MongoDB Atlas'ta IP adresi 0.0.0.0/0 olarak eklenmiş mi?
- Database kullanıcısı oluşturulmuş mu?

### "Admin login failed"
- `npm run setup-admin` çalıştırdın mı?
- MongoDB bağlantısı çalışıyor mu?
- Doğru kullanıcı adı/şifre girdiğinden emin misin?

### "Page not loading"
- `npm run build` çalıştırdın mı?
- Port 3000 açık mı? `netstat -ano | findstr :3000`
- Environment variables production'da set edilmiş mi?

### Logları Kontrol Et
```bash
# Vercel
Vercel Dashboard → Project → Deployments → View Logs

# PM2
pm2 logs dynsteel

# Next.js
npm run dev (development modunda hataları gösterir)
```

---

## 📞 Yardım

Takıldığın yer olursa:

1. **Hata mesajını oku** - Genelde çözümü içinde yazar
2. **Environment variables'ları kontrol et** - En sık hata buradadır
3. **MongoDB bağlantısını test et** - Connection string doğru mu?
4. **Logları incele** - Gerçek hatayı gösterir

---

## 🎉 Tebrikler!

Siteniz artık canlıda! İyi satışlar! 🚀

**Sonraki Adımlar:**
- İlk ürünleri ekle (Admin → Ürünler)
- Ödeme entegrasyonu yap (İyzico)
- Email ayarlarını yap (SMTP)
- Google Analytics ekle
- SEO optimizasyonu yap

