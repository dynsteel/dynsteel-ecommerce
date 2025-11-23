# 🚀 DynSteel E-Commerce Deployment Rehberi

Bu rehber, DynSteel e-ticaret projesini çeşitli platformlara deploy etme adımlarını içerir.

---

## 📋 İçindekiler

1. [Hazırlık](#hazırlık)
2. [Vercel Deployment](#vercel-deployment-önerilen)
3. [Netlify Deployment](#netlify-deployment)
4. [DigitalOcean App Platform](#digitalocean-app-platform)
5. [AWS EC2 + PM2](#aws-ec2--pm2)
6. [Environment Variables](#environment-variables)
7. [Post-Deployment](#post-deployment)

---

## Hazırlık

### Gereksinimler

- Node.js 18+ yüklü
- Git yüklü
- GitHub hesabı
- Domain (opsiyonel)

### 1. Projeyi GitHub'a Yükle

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/dynsteel-ecommerce.git
git push -u origin main
```

### 2. Environment Variables Hazırla

`.env.example` dosyasını `.env.production` olarak kopyalayın ve değerleri doldurun:

```bash
cp .env.example .env.production
```

---

## Vercel Deployment (Önerilen)

Vercel, Next.js projeleri için en iyi deployment platformudur.

### Adım 1: Vercel Hesabı Oluştur

1. [vercel.com](https://vercel.com) adresine gidin
2. GitHub hesabınızla giriş yapın

### Adım 2: Proje Import Et

```bash
# Vercel CLI yükle (opsiyonel)
npm i -g vercel

# Deploy
vercel
```

**VEYA** Vercel Dashboard'dan:

1. "New Project" butonuna tıklayın
2. GitHub repository'nizi seçin
3. "Import" butonuna tıklayın

### Adım 3: Environment Variables Ekle

Vercel Dashboard'da:
1. Project Settings → Environment Variables
2. `.env.production` dosyasındaki tüm değişkenleri ekleyin

### Adım 4: Deploy

```bash
vercel --prod
```

✅ **Deployment tamamlandı!** Vercel size bir production URL verecektir.

### Custom Domain Bağlama

1. Vercel Dashboard → Settings → Domains
2. Domain adınızı girin
3. DNS kayıtlarını güncelleyin (Vercel size rehberlik edecektir)

---

## Netlify Deployment

### Adım 1: Netlify Hesabı

1. [netlify.com](https://netlify.com) adresine gidin
2. GitHub ile giriş yapın

### Adım 2: Build Ayarları

**netlify.toml** dosyası oluşturun:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Adım 3: Deploy

```bash
# Netlify CLI yükle
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**VEYA** Netlify Dashboard'dan "Import from Git" seçeneğini kullanın.

---

## DigitalOcean App Platform

### Adım 1: App Platform'da Yeni App

1. [DigitalOcean App Platform](https://cloud.digitalocean.com/apps) → Create App
2. GitHub repository'nizi bağlayın

### Adım 2: Build Ayarları

- **Run Command:** `npm start`
- **Build Command:** `npm run build`
- **HTTP Port:** 3000

### Adım 3: Environment Variables

App Settings → Environment Variables → Add Variable

```
NEXT_PUBLIC_SITE_URL=https://your-app.ondigitalocean.app
NEXT_PUBLIC_WHATSAPP_NUMBER=905458463523
```

### Adım 4: Deploy

"Create Resources" butonuna tıklayın.

**Fiyatlandırma:** $5/ay (Basic plan)

---

## AWS EC2 + PM2

### Adım 1: EC2 Instance Oluştur

1. AWS Console → EC2 → Launch Instance
2. Ubuntu Server 22.04 LTS seçin
3. Instance type: t2.micro (free tier) veya t2.small
4. Security Group: HTTP (80), HTTPS (443), SSH (22) portlarını açın

### Adım 2: SSH ile Bağlan

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Adım 3: Sunucuyu Hazırla

```bash
# Node.js yükle
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 yükle
sudo npm install -g pm2

# Nginx yükle
sudo apt-get install nginx -y

# Git yükle
sudo apt-get install git -y
```

### Adım 4: Projeyi Clone Et

```bash
cd /var/www
sudo git clone https://github.com/your-username/dynsteel-ecommerce.git
cd dynsteel-ecommerce

# Bağımlılıkları yükle
npm install

# Build
npm run build
```

### Adım 5: PM2 ile Başlat

```bash
# PM2 ile başlat
pm2 start npm --name "dynsteel" -- start

# Auto restart
pm2 startup
pm2 save
```

### Adım 6: Nginx Yapılandır

```bash
sudo nano /etc/nginx/sites-available/dynsteel
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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
# Aktif et
sudo ln -s /etc/nginx/sites-available/dynsteel /etc/nginx/sites-enabled/

# Test et
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

### Adım 7: SSL Sertifikası (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Environment Variables

Tüm platformlar için gerekli environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=905458463523
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXX
```

⚠️ **ÖNEMLİ:** Production'da admin şifresini değiştirin!

---

## Post-Deployment

### 1. Domain DNS Ayarları

**A Record:**
```
@ → your-server-ip
www → your-server-ip
```

**CNAME (Vercel/Netlify için):**
```
www → cname.vercel-dns.com
```

### 2. Google Search Console

1. [Google Search Console](https://search.google.com/search-console) → Add Property
2. Domain adınızı ekleyin
3. Sitemap ekleyin: `https://yourdomain.com/sitemap.xml`

### 3. Google Analytics

1. [Google Analytics](https://analytics.google.com) → Create Property
2. Measurement ID'yi `.env.production` dosyasına ekleyin

### 4. Performance Test

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

**Hedef Skorlar:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 5. Monitoring

**Vercel:**
- Built-in analytics
- Deployment logs

**PM2 Monitoring:**
```bash
pm2 monit
pm2 logs dynsteel
```

### 6. Backup

**Otomatik Backup (PM2 + EC2):**

```bash
# Backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/dynsteel_$DATE.tar.gz /var/www/dynsteel-ecommerce

# Crontab ekle (her gün saat 2'de)
0 2 * * * /path/to/backup.sh
```

---

## Güncelleme

### Vercel/Netlify

```bash
git add .
git commit -m "Update"
git push origin main
# Otomatik deploy olacak
```

### EC2 + PM2

```bash
cd /var/www/dynsteel-ecommerce
git pull origin main
npm install
npm run build
pm2 restart dynsteel
```

---

## Troubleshooting

### Build Hatası

```bash
# Cache temizle
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### PM2 Restart

```bash
pm2 restart dynsteel
pm2 logs dynsteel --lines 50
```

### Nginx 502 Error

```bash
# PM2 çalışıyor mu?
pm2 status

# Port dinliyor mu?
netstat -tuln | grep 3000

# Nginx test
sudo nginx -t
sudo systemctl restart nginx
```

---

## Maliyetler

| Platform | Fiyat | Trafik |
|----------|-------|--------|
| Vercel | $0/ay (Hobby) | 100GB/ay |
| Netlify | $0/ay (Starter) | 100GB/ay |
| DigitalOcean | $5/ay | 1TB/ay |
| AWS EC2 | $5-10/ay | Ayrı ücretli |

---

## Destek

Deployment ile ilgili sorunlarınız için:

- 📧 Email: steeldyn@gmail.com
- 💬 WhatsApp: +90 545 846 35 23

---

## 🎉 Tebrikler!

Projeniz başarıyla deploy edildi. Şimdi dünyayla paylaşın! 🚀

