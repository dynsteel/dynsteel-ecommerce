# 🤝 Katkıda Bulunma Rehberi

DynSteel projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçindekiler

- [Geliştirme Ortamı Kurulumu](#geliştirme-ortamı-kurulumu)
- [Kod Standartları](#kod-standartları)
- [Commit Mesajları](#commit-mesajları)
- [Pull Request Süreci](#pull-request-süreci)
- [Bug Bildirimi](#bug-bildirimi)
- [Özellik Önerileri](#özellik-önerileri)

---

## Geliştirme Ortamı Kurulumu

### Gereksinimler

- Node.js 18.x veya üzeri
- npm veya yarn
- Git

### Kurulum

```bash
# Repository'yi fork edin ve clone yapın
git clone https://github.com/YOUR_USERNAME/dynsteel-ecommerce.git
cd dynsteel-ecommerce

# Dependencies yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasını düzenle

# Development server başlat
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresini açın.

---

## Kod Standartları

### JavaScript/React

- **ES6+ syntax** kullanın
- **Functional components** ve **hooks** tercih edin
- **PropTypes** veya **TypeScript** ile tip kontrolü yapın
- Kodunuzu **ESLint** ile kontrol edin

```bash
npm run lint
npm run lint:fix
```

### Dosya Yapısı

```
components/
├── Layout.js           # Büyük harfle başlayan bileşenler
├── Newsletter.js
└── ...

pages/
├── index.js           # Küçük harfle route dosyaları
├── products.js
└── ...

utils/                 # Yardımcı fonksiyonlar
hooks/                 # Custom hooks
context/               # React Context
```

### Stil Kılavuzu

- **Tailwind CSS** utility classes kullanın
- Custom CSS gerekiyorsa `globals.css`'e ekleyin
- Class isimlendirme: `kebab-case`
- Component-specific styles için CSS Modules kullanabilirsiniz

### Kodlama Kuralları

```javascript
// ✅ İyi Örnek
const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  
  const handleClick = () => {
    addToCart(product)
  }

  return (
    <div className="rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <button onClick={handleClick} className="btn-primary">
        Sepete Ekle
      </button>
    </div>
  )
}

// ❌ Kötü Örnek
const productcard = (props) => {
  return <div style={{borderRadius: '8px', padding: '16px'}}>
    <h3>{props.product.name}</h3>
    <button onClick={()=>props.addToCart(props.product)}>Sepete Ekle</button>
  </div>
}
```

---

## Commit Mesajları

Semantic commit messages kullanıyoruz:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Yeni özellik
- `fix`: Bug düzeltmesi
- `docs`: Dokümantasyon değişikliği
- `style`: Kod formatı (kod işlevselliği değişmez)
- `refactor`: Kod yeniden yapılandırma
- `perf`: Performans iyileştirmesi
- `test`: Test ekleme/düzeltme
- `chore`: Build process veya auxiliary tool değişiklikleri

### Örnekler

```bash
feat(cart): add remove item functionality
fix(products): resolve image loading issue
docs(readme): update installation instructions
style(header): improve mobile responsiveness
refactor(api): optimize product fetching logic
perf(images): implement lazy loading
test(cart): add unit tests for cart context
chore(deps): update dependencies
```

---

## Pull Request Süreci

### 1. Branch Oluştur

```bash
# Feature branch
git checkout -b feature/amazing-feature

# Bug fix branch
git checkout -b fix/bug-description

# Docs branch
git checkout -b docs/update-readme
```

### 2. Değişikliklerinizi Yapın

- Küçük, odaklanmış değişiklikler yapın
- Her commit tek bir amaca hizmet etmeli
- Test edin ve lint kontrolü yapın

```bash
npm run lint
npm run build
npm run dev # Test edin
```

### 3. Commit ve Push

```bash
git add .
git commit -m "feat(products): add product filtering"
git push origin feature/amazing-feature
```

### 4. Pull Request Açın

1. GitHub'da repository'nize gidin
2. "Pull Request" butonuna tıklayın
3. Değişikliklerinizi açıklayın:

```markdown
## Değişiklikler

- Ürün filtreleme özelliği eklendi
- Fiyat aralığı filtresi eklendi
- Marka filtresi eklendi

## Test Edildi

- [x] Desktop browser
- [x] Mobile browser
- [x] Build başarılı

## Screenshots

![Screenshot](link-to-screenshot)

## İlgili Issues

Closes #123
```

### 5. Code Review

- Maintainer'ların yorumlarına yanıt verin
- Gerekli değişiklikleri yapın
- Push ettiğinizde PR otomatik güncellenir

---

## Bug Bildirimi

Bug bulduğunuzda lütfen [GitHub Issues](https://github.com/username/dynsteel-ecommerce/issues) üzerinden bildirin.

### Bug Report Template

```markdown
## Bug Açıklaması

Kısa ve net bir şekilde bug'ı açıklayın.

## Reproduce Etme Adımları

1. '...' sayfasına git
2. '...' butonuna tıkla
3. Aşağı scroll et
4. Hatayı gör

## Beklenen Davranış

Ne olmasını bekliyordunuz?

## Screenshots

Varsa screenshot ekleyin.

## Ortam

- OS: [Windows 11]
- Browser: [Chrome 120]
- Versiyon: [v1.0.0]

## Ek Bilgi

Varsa ek bilgi ekleyin.
```

---

## Özellik Önerileri

Yeni özellik önerisi için [GitHub Discussions](https://github.com/username/dynsteel-ecommerce/discussions) kullanın.

### Feature Request Template

```markdown
## Özellik Açıklaması

Önermek istediğiniz özelliği açıklayın.

## Motivasyon

Bu özellik neden gerekli? Hangi problemi çözüyor?

## Önerilen Çözüm

Nasıl uygulanmasını öneriyorsunuz?

## Alternatifler

Düşündüğünüz alternatif çözümler?

## Ek Bilgi

Mockup, screenshot, vb.
```

---

## Geliştirme İpuçları

### Hot Reloading

Development modda değişiklikleriniz otomatik olarak yansır:

```bash
npm run dev
```

### Build Testi

Deploy etmeden önce mutlaka build test edin:

```bash
npm run build
npm run start
```

### Performance Profiling

```bash
# Bundle analyzer
npm run analyze
```

### Debugging

```javascript
// Development modda console.log kullanabilirsiniz
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}
```

### Useful Commands

```bash
# Dependency güncellemeleri
npm outdated
npm update

# Cache temizleme
npm run clean

# Type checking
npm run type-check
```

---

## Code Review Checklist

Pull request açmadan önce kontrol edin:

- [ ] Kod eslint kurallarına uygun
- [ ] Tüm testler geçiyor
- [ ] Build başarılı
- [ ] Responsive tasarım kontrol edildi
- [ ] Browser compatibility test edildi
- [ ] Accessibility kontrol edildi
- [ ] Performance etkilenmedi
- [ ] Documentation güncellendi
- [ ] Commit mesajları semantic
- [ ] No console.log/debugger statements

---

## İletişim

Sorularınız için:

- **GitHub Discussions:** Genel tartışmalar
- **GitHub Issues:** Bug ve feature requests
- **Email:** steeldyn@gmail.com
- **WhatsApp:** +90 545 846 35 23

---

## Teşekkür

Katkılarınız için teşekkür ederiz! Her katkı, projeyi daha iyi hale getirir.

---

## Lisans

Bu projeye katkıda bulunarak, katkılarınızın MIT Lisansı altında lisanslanmasını kabul edersiniz.

---

**Son Güncelleme:** 2024-11-19

<div align="center">

**DynSteel ile yapıldı** ❤️

[Website](https://dynsteel.com) • [Documentation](README.md) • [Issues](https://github.com/username/dynsteel-ecommerce/issues)

</div>

