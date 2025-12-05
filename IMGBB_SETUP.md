# ImgBB API Kurulum Rehberi

## Resimleri Otomatik URL'ye Çevirme

Bu sistem, yüklediğiniz görselleri otomatik olarak ImgBB'ye yükleyip URL'ye çevirir. Bu sayede:
- ✅ Görseller daha hızlı yüklenir
- ✅ Veritabanı boyutu küçülür
- ✅ Sayfa performansı artar

## Kurulum Adımları

### 1. ImgBB API Key Alma

1. **https://api.imgbb.com/** adresine gidin
2. Ücretsiz kayıt olun veya giriş yapın
3. "API" bölümünden API key'inizi kopyalayın

### 2. API Key'i Ekleme

`.env.local` dosyasını açın ve şu satırı bulun:
```
IMGBB_API_KEY=your_imgbb_api_key_here
```

API key'inizi buraya yapıştırın:
```
IMGBB_API_KEY=abc123def456ghi789...
```

### 3. Vercel'e Environment Variable Ekleme

1. Vercel dashboard'a gidin: https://vercel.com
2. Projenizi seçin
3. Settings > Environment Variables bölümüne gidin
4. Yeni variable ekleyin:
   - **Name:** `IMGBB_API_KEY`
   - **Value:** API key'iniz
   - **Environment:** Production, Preview, Development (hepsini seçin)

### 4. Deploy Etme

API key'i ekledikten sonra projeyi yeniden deploy edin:
```bash
npx vercel --prod
```

## Nasıl Çalışır?

1. Admin panelinden ürün eklerken görsel yüklediğinizde:
   - Görsel otomatik olarak optimize edilir
   - ImgBB'ye yüklenir
   - URL alınır ve veritabanına kaydedilir

2. Eğer ImgBB API key yoksa:
   - Sistem otomatik olarak base64 kullanır (fallback)
   - Herhangi bir hata oluşmaz

## Alternatif Çözümler

### Cloudinary (Daha Profesyonel)
- Ücretsiz plan: 25GB depolama
- Otomatik optimizasyon
- CDN desteği
- Kurulum: `.env.local` dosyasına Cloudinary bilgilerini ekleyin

### AWS S3 (Kurumsal)
- Ölçeklenebilir
- Güvenli
- Ücretli (kullanım bazlı)
- Kurulum: `.env.local` dosyasına AWS bilgilerini ekleyin

## Sorun Giderme

**Görseller URL'ye çevrilmiyor:**
- API key'in doğru olduğundan emin olun
- Vercel environment variables'ı kontrol edin
- Browser console'da hata var mı kontrol edin

**API key hatası:**
- ImgBB hesabınızın aktif olduğundan emin olun
- API key'in süresi dolmamış olmalı
- Rate limit aşılmamış olmalı (ücretsiz plan: 1000 istek/gün)

