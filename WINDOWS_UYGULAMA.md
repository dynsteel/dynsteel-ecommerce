# 🖥️ DynSteel Windows Uygulaması

DynSteel'i masaüstü uygulaması gibi kullanmak için 2 farklı yöntem var!

---

## 📦 YÖNTEM 1: BAT Dosyası (Hızlı Başlatma)

### ✅ Hazır Dosyalar:
- **DynSteel-Admin.bat** → Admin Paneli Uygulaması
- **DynSteel-Musteri.bat** → Müşteri Sitesi Uygulaması

### 🚀 Nasıl Kullanılır:

#### 1. Sunucuyu Başlatın
```bash
npm run dev
```
**ÖNEMLI:** Sunucu her zaman çalışıyor olmalı!

#### 2. Uygulamayı Çalıştırın
- **Admin Paneli için:** `DynSteel-Admin.bat` dosyasına çift tıklayın
- **Müşteri Sitesi için:** `DynSteel-Musteri.bat` dosyasına çift tıklayın

#### 3. Masaüstüne Kısayol Oluşturun (İsteğe Bağlı)

**Admin Paneli için:**
1. `DynSteel-Admin.bat` dosyasına sağ tıklayın
2. **"Gönder" → "Masaüstü (kısayol oluştur)"** seçin
3. Kısayola sağ tıklayın → **"Özellikler"**
4. **"Simge değiştir"** butonuna tıklayın
5. **"Gözat"** ile `public/icons/icon-192.png` seçin
6. **"Tamam"** ve **"Uygula"** tıklayın

**Müşteri Sitesi için:**
1. `DynSteel-Musteri.bat` dosyasına sağ tıklayın
2. Aynı adımları tekrarlayın

---

## 🌐 YÖNTEM 2: PWA (Progressive Web App)

### Tarayıcıdan Yükleme:

#### Chrome / Edge:

##### Admin Paneli:
1. Tarayıcıda açın: `http://localhost:3000/admin`
2. Adres çubuğunun sağındaki **📥 İndir** ikonuna tıklayın
3. **"Yükle"** butonuna tıklayın
4. Uygulama masaüstüne ve başlat menüsüne eklenecek!

##### Müşteri Sitesi:
1. Tarayıcıda açın: `http://localhost:3000`
2. Adres çubuğunun sağındaki **📥 İndir** ikonuna tıklayın
3. **"Yükle"** butonuna tıklayın
4. Uygulama masaüstüne ve başlat menüsüne eklenecek!

### PWA Avantajları:
- ✅ Tarayıcı menüsü yok (tam ekran uygulama)
- ✅ Başlat menüsünde görünür
- ✅ Masaüstü simgesi
- ✅ Bildirim desteği
- ✅ Offline çalışma (cache)

---

## 📂 Dosya Yapısı:

```
dynsteel-ecommerce/
├── DynSteel-Admin.bat       ✅ Admin Panel launcher
├── DynSteel-Musteri.bat     ✅ Müşteri Sitesi launcher
└── public/
    └── icons/
        ├── icon-192.png     ← Müşteri sitesi ikonu
        └── icon-512.png     ← Yüksek çözünürlük
```

---

## 🎯 Hangi Yöntemi Seçmeliyim?

| Özellik | BAT Dosyası | PWA |
|---------|-------------|-----|
| Hız | ⚡ Anında açılır | 🚀 İlk kurulumdan sonra hızlı |
| Kurulum | 📦 Hazır | 🌐 Tarayıcıdan yükle |
| Logo | 🎨 Manuel eklenebilir | ✅ Otomatik |
| Offline | ❌ Hayır | ✅ Evet (cache ile) |
| Güncelleme | ❌ Manuel | ✅ Otomatik |

**Öneri:** PWA daha profesyonel ve kullanışlı! 🌟

---

## 🔧 Sorun Giderme:

### BAT dosyası çalışmıyor?
- Sunucunun çalıştığından emin olun: `npm run dev`
- Chrome veya Edge yüklü değilse, .bat dosyasını düzenleyip Firefox ekleyin

### PWA yüklenmiyor?
- HTTPS veya localhost gerekir ✅ (localhost zaten var)
- `manifest.json` dosyası doğru mu? ✅ (hazır)
- Cache'i temizleyin: `Ctrl+Shift+Delete`

### Logo görünmüyor?
- PNG dosyaları oluşturuldu mu? ✅ (oluşturuldu)
- Tarayıcıyı yenileyin: `Ctrl+Shift+R`

---

## ✨ Özet:

1. **Hızlı Test:** `DynSteel-Admin.bat` veya `DynSteel-Musteri.bat` çift tıkla
2. **Profesyonel:** Tarayıcıdan PWA olarak yükle
3. **Masaüstü Kısayol:** BAT dosyasından kısayol oluştur + ikon ekle

**HEPSİ HAZIR!** 🎉

