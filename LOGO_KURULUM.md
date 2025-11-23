# 🎨 DynSteel Logo Kurulum Talimatları

## Adım 1: Logo Dosyasını Kaydedin

Gönderdiğiniz logo görselini aşağıdaki konumlara kaydedin:

### 1. Ana Logo (SVG veya PNG)
```
public/icons/icon.svg       (müşteri sitesi için)
public/icons/admin-icon.svg (admin paneli için)
```

### 2. Favicon için
```
public/favicon.ico
```

### 3. Apple Touch Icon için
```
public/apple-touch-icon.png (180x180px)
```

---

## Adım 2: Logo Boyutları

Aşağıdaki boyutlarda logo oluşturun:

- **192x192 px** - PWA ikon (küçük)
- **512x512 px** - PWA ikon (büyük)
- **180x180 px** - Apple Touch Icon
- **32x32 px** - Favicon
- **16x16 px** - Favicon (küçük)

---

## Adım 3: Dosyaları Yerleştirin

```
dynsteel-ecommerce/
└── public/
    ├── favicon.ico                  ← Bu dosyayı ekleyin
    ├── apple-touch-icon.png         ← Bu dosyayı ekleyin
    └── icons/
        ├── icon.svg                 ← Mevcut (Müşteri sitesi)
        ├── admin-icon.svg           ← Mevcut (Admin paneli)
        ├── icon-192.png            ← Bu dosyayı ekleyin
        └── icon-512.png            ← Bu dosyayı ekleyin
```

---

## Online Araçlar (Logo Dönüştürme)

### PNG'yi Farklı Boyutlara Dönüştürmek için:
- https://www.iloveimg.com/resize-image
- https://www.online-image-editor.com/

### PNG'yi ICO'ya Dönüştürmek için:
- https://www.icoconverter.com/
- https://convertio.co/png-ico/

---

## Hızlı Kurulum (Manuel)

1. Logo dosyanızı (görseli) indirin
2. Online araçlarla şu boyutları oluşturun:
   - 192x192 → `icon-192.png`
   - 512x512 → `icon-512.png`
   - 180x180 → `apple-touch-icon.png`
   - 32x32 → `favicon.ico`
3. Dosyaları yukarıdaki konumlara kopyalayın
4. Sunucuyu yeniden başlatın: `npm run dev`

---

✅ Logo kurulumu tamamlandıktan sonra tüm uygulamalarda yeni logonuz görünecek!

