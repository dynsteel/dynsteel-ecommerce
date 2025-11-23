# 🗄️ Database Schema - DynSteel E-commerce

MongoDB koleksiyonları ve veri yapıları.

## Collections

### 1. `admins` - Admin Kullanıcıları

```javascript
{
  _id: ObjectId,
  username: String, // unique
  email: String, // unique
  password: String, // bcrypt hash
  name: String,
  role: String, // 'admin', 'super-admin'
  status: String, // 'active', 'inactive'
  permissions: Array, // ['all'] veya ['products', 'orders', 'users']
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  lastIp: String
}
```

**Indexes:**
```javascript
db.admins.createIndex({ username: 1 }, { unique: true })
db.admins.createIndex({ email: 1 }, { unique: true })
```

---

### 2. `users` - Müşteriler

```javascript
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  password: String, // bcrypt hash
  phone: String,
  role: String, // 'customer'
  status: String, // 'active', 'inactive', 'banned'
  emailVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date,
  
  // Adresler
  addresses: [
    {
      id: String,
      type: String, // 'billing', 'shipping'
      fullName: String,
      address: String,
      city: String,
      state: String,
      zipCode: String,
      phone: String,
      isDefault: Boolean
    }
  ],
  
  // Favoriler
  favorites: [ObjectId], // Product IDs
  
  // Sipariş geçmişi sayısı
  orderCount: Number,
  totalSpent: Number
}
```

**Indexes:**
```javascript
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 })
db.users.createIndex({ createdAt: -1 })
```

---

### 3. `products` - Ürünler

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String, // URL-friendly, unique
  description: String,
  price: Number,
  comparePrice: Number, // İndirimli fiyat gösterimi için
  cost: Number, // Maliyet (admin için)
  sku: String, // Stock Keeping Unit
  barcode: String,
  
  // Kategori ve Marka
  category: String, // 'klasik', 'spor', 'off-road', vb.
  brand: String, // 'Ferrari', 'Mercedes', vb.
  scale: String, // '1:18', '1:24', '1:43'
  
  // Stok
  stock: Number,
  trackInventory: Boolean,
  lowStockThreshold: Number,
  
  // Görsel
  images: [String], // URL'ler
  thumbnail: String,
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  tags: [String],
  
  // Özellikler
  specifications: {
    material: String,
    weight: String,
    dimensions: String,
    manufacturer: String,
    year: String,
    color: String,
    limitedEdition: Boolean,
    certificateOfAuthenticity: Boolean
  },
  
  // İstatistikler
  status: String, // 'active', 'draft', 'out-of-stock'
  featured: Boolean,
  views: Number,
  sales: Number,
  rating: Number,
  reviewCount: Number,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.products.createIndex({ slug: 1 }, { unique: true })
db.products.createIndex({ category: 1, status: 1 })
db.products.createIndex({ brand: 1 })
db.products.createIndex({ price: 1 })
db.products.createIndex({ createdAt: -1 })
db.products.createIndex({ sales: -1 })
db.products.createIndex({ name: "text", description: "text", brand: "text" })
```

---

### 4. `orders` - Siparişler

```javascript
{
  _id: ObjectId,
  orderNumber: String, // unique, 'DS12345678'
  userId: ObjectId, // null ise misafir sipariş
  
  // Durum
  status: String, // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  paymentStatus: String, // 'pending', 'paid', 'failed', 'refunded'
  
  // Ürünler
  items: [
    {
      productId: ObjectId,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],
  
  // Müşteri Bilgileri
  customerInfo: {
    name: String,
    email: String,
    phone: String
  },
  
  // Adresler
  billingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  
  // Ödeme
  paymentMethod: String, // 'credit_card', 'bank_transfer', 'cash_on_delivery'
  paymentDetails: Object,
  
  // Fiyatlar
  totals: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    discount: Number,
    total: Number
  },
  
  // Notlar
  notes: String,
  adminNotes: String,
  
  // Kargo
  tracking: {
    ordered: Date,
    processed: Date,
    shipped: Date,
    delivered: Date
  },
  trackingNumber: String,
  shippingCarrier: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ paymentStatus: 1 })
db.orders.createIndex({ createdAt: -1 })
db.orders.createIndex({ "customerInfo.email": 1 })
```

---

### 5. `contacts` - İletişim Mesajları

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String, // 'new', 'read', 'replied', 'archived'
  replied: Boolean,
  replyMessage: String,
  replyDate: Date,
  createdAt: Date
}
```

**Indexes:**
```javascript
db.contacts.createIndex({ email: 1 })
db.contacts.createIndex({ status: 1 })
db.contacts.createIndex({ createdAt: -1 })
```

---

### 6. `categories` - Kategoriler (Opsiyonel)

```javascript
{
  _id: ObjectId,
  name: String,
  slug: String, // unique
  description: String,
  image: String,
  parent: ObjectId, // Alt kategori ise
  order: Number,
  status: String, // 'active', 'inactive'
  productCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.categories.createIndex({ slug: 1 }, { unique: true })
db.categories.createIndex({ parent: 1 })
```

---

### 7. `reviews` - Ürün Yorumları (Opsiyonel)

```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  userId: ObjectId,
  orderId: ObjectId, // Doğrulanmış alıcı
  rating: Number, // 1-5
  title: String,
  comment: String,
  images: [String],
  status: String, // 'pending', 'approved', 'rejected'
  helpful: Number, // Kaç kişi faydalı buldu
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
```javascript
db.reviews.createIndex({ productId: 1, status: 1 })
db.reviews.createIndex({ userId: 1 })
db.reviews.createIndex({ createdAt: -1 })
```

---

### 8. `newsletters` - Newsletter Aboneleri (Opsiyonel)

```javascript
{
  _id: ObjectId,
  email: String, // unique
  name: String,
  status: String, // 'subscribed', 'unsubscribed'
  source: String, // 'website', 'checkout', 'popup'
  subscribedAt: Date,
  unsubscribedAt: Date
}
```

**Indexes:**
```javascript
db.newsletters.createIndex({ email: 1 }, { unique: true })
db.newsletters.createIndex({ status: 1 })
```

---

### 9. `coupons` - İndirim Kuponları (Opsiyonel)

```javascript
{
  _id: ObjectId,
  code: String, // unique, 'WELCOME10'
  type: String, // 'percentage', 'fixed'
  value: Number,
  minPurchase: Number,
  maxDiscount: Number,
  usageLimit: Number,
  usageCount: Number,
  validFrom: Date,
  validUntil: Date,
  status: String, // 'active', 'inactive', 'expired'
  createdAt: Date
}
```

**Indexes:**
```javascript
db.coupons.createIndex({ code: 1 }, { unique: true })
db.coupons.createIndex({ status: 1, validFrom: 1, validUntil: 1 })
```

---

## Kurulum Script'i

MongoDB'ye bağlandıktan sonra bu komutları çalıştırın:

```javascript
// Database seç
use dynsteel

// Indexes oluştur
db.admins.createIndex({ username: 1 }, { unique: true })
db.admins.createIndex({ email: 1 }, { unique: true })

db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

db.products.createIndex({ slug: 1 }, { unique: true })
db.products.createIndex({ category: 1, status: 1 })
db.products.createIndex({ name: "text", description: "text", brand: "text" })

db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ createdAt: -1 })

db.contacts.createIndex({ createdAt: -1 })

// İlk admin kullanıcısını oluştur (npm run setup-admin ile)
```

---

## Demo Data Ekleme (Test için)

```javascript
// Demo kategori
db.categories.insertMany([
  { name: 'Klasik Arabalar', slug: 'klasik', order: 1, status: 'active', productCount: 0 },
  { name: 'Spor Arabalar', slug: 'spor', order: 2, status: 'active', productCount: 0 },
  { name: 'Off-Road', slug: 'off-road', order: 3, status: 'active', productCount: 0 },
])

// Demo ürün (Admin panelden de eklenebilir)
db.products.insertOne({
  name: 'Ferrari F40 1:18',
  slug: 'ferrari-f40-1-18',
  description: 'İkonik Ferrari F40 modeli, 1:18 ölçek',
  price: 1299,
  category: 'spor',
  brand: 'Ferrari',
  scale: '1:18',
  stock: 10,
  status: 'active',
  featured: true,
  images: ['https://via.placeholder.com/800x600'],
  thumbnail: 'https://via.placeholder.com/400x300',
  views: 0,
  sales: 0,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## Backup Komutu

```bash
# Tüm database'i backup al
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)

# Belirli koleksiyonu backup al
mongodump --uri="mongodb+srv://..." --collection=products --out=/backup/products

# Restore
mongorestore --uri="mongodb+srv://..." /backup/20240101
```

