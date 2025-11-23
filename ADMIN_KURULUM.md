# 🖥️ DynSteel Admin Panel - Masaüstü Uygulaması Kurulum Rehberi

Admin paneli artık tam bir masaüstü uygulaması gibi kullanabilirsiniz!

---

## 🚀 Hızlı Başlangıç (En Kolay Yol)

### Yöntem 1: Windows Kısayol Dosyası

1. **`DynSteel-Admin.bat`** dosyasına çift tıklayın
2. Admin panel otomatik olarak uygulama modunda açılacak
3. Masaüstünüze kısayol oluşturmak için:
   - `DynSteel-Admin.bat` dosyasına sağ tıklayın
   - **"Kısayol oluştur"** seçin
   - Kısayolu masaüstüne taşıyın

✅ **Artık her seferinde masaüstündeki kısayola tıklayarak admin paneline girebilirsiniz!**

---

## 📱 Yöntem 2: PWA Kurulumu (Tam Uygulama)

### Chrome / Edge İçin:

1. Tarayıcıda şu adresi açın: `http://localhost:3000/admin/install`
2. **"Şimdi Kur"** butonuna tıklayın
3. Açılan pencerede **"Yükle"** butonuna basın
4. Uygulama otomatik olarak:
   - Masaüstüne kısayol ekler
   - Başlat menüsüne ekler
   - Görev çubuğuna sabitlenebilir

### Manuel PWA Kurulumu:

1. Admin paneline gidin: `http://localhost:3000/admin`
2. Chrome/Edge'de sağ üstteki **⋮** (üç nokta) menüsünü açın
3. **"Uygulamayı Yükle"** veya **"Install DynSteel Admin Panel"** seçin
4. **"Yükle"** butonuna tıklayın

---

## 🎯 Masaüstü Uygulaması Özellikleri

### ✅ Ne Yapabilirsiniz?

- **🖱️ Tek Tıkla Açma:** Masaüstü kısayolundan direkt başlatma
- **📱 Tam Ekran:** Tarayıcı araç çubukları olmadan temiz arayüz
- **🔔 Bildirimler:** Yeni siparişlerden anında haberdar olun
- **💾 Offline Çalışma:** İnternet kesilse bile temel özellikler çalışır
- **🚀 Hızlı Başlatma:** Normal web sitesinden daha hızlı yüklenir
- **🔒 Güvenli:** Tarayıcı güvenliği ile korunmuş
- **📊 Görev Çubuğunda:** Windows görev çubuğuna sabitleyebilirsiniz

---

## 📝 Kullanım Notları

### Sunucu Başlatma

Admin paneli uygulamasını kullanmadan önce sunucunun çalışıyor olması gerekir:

```bash
npm run dev
```

Sunucu açıksa admin panel uygulaması çalışır.

### Giriş Bilgileri

- **Kullanıcı Adı:** `dynsteel`
- **Şifre:** `1907`

---

## 🛠️ Sorun Giderme

### Uygulama Açılmıyor?

1. Sunucunun çalıştığından emin olun (`npm run dev`)
2. Tarayıcınızı yeniden başlatın
3. Uygulamayı kaldırıp tekrar kurun

### Kurulum Butonu Görünmüyor?

1. Chrome veya Edge kullandığınızdan emin olun
2. HTTPS veya localhost'ta olduğunuzdan emin olun
3. Manuel kurulum adımlarını deneyin

### Bildirimler Çalışmıyor?

1. Windows Ayarları → Bildirimler'den izin verin
2. Tarayıcı ayarlarından bildirim izinlerini kontrol edin

---

## 🎨 Görsel Kılavuz

### Masaüstü Görünümü:

```
┌──────────────────────────────────────┐
│  [📊 DynSteel Admin Panel]      [×]  │
├──────────────────────────────────────┤
│                                      │
│    🏠 Dashboard                      │
│    📦 Ürünler                        │
│    🛒 Siparişler                     │
│    👥 Kullanıcılar                   │
│    📊 Raporlar                       │
│    ⚙️  Ayarlar                       │
│                                      │
└──────────────────────────────────────┘
```

---

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:

1. **Kurulum Sayfası:** `http://localhost:3000/admin/install`
2. **Tarayıcıdan Giriş:** `http://localhost:3000/admin`
3. **Dokümanlar:** Bu dosya (ADMIN_KURULUM.md)

---

## 🎉 Başarıyla Kuruldu!

Artık DynSteel Admin Panel masaüstü uygulamanız hazır!

**Keyifli kullanımlar!** 🚀

