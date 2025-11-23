// İlk Admin Kullanıcısını Oluşturma Script'i
// Kullanım: node scripts/setup-admin.js

const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function setupAdmin() {
  try {
    console.log('🚀 DynSteel Admin Kurulum\n')

    // Get MongoDB URI
    const mongoUri = await question('MongoDB URI: ')
    
    if (!mongoUri) {
      console.log('❌ MongoDB URI gereklidir!')
      process.exit(1)
    }

    // Connect to MongoDB
    console.log('\n📦 MongoDB\'ye bağlanılıyor...')
    const client = new MongoClient(mongoUri)
    await client.connect()
    const db = client.db('dynsteel')
    
    console.log('✅ Bağlantı başarılı!\n')

    // Get admin details
    const username = await question('Admin kullanıcı adı (varsayılan: admin): ') || 'admin'
    const email = await question('Admin email (varsayılan: admin@dynsteel.com): ') || 'admin@dynsteel.com'
    const name = await question('Admin adı (varsayılan: DynSteel Admin): ') || 'DynSteel Admin'
    const password = await question('Admin şifresi (min 6 karakter): ')

    if (!password || password.length < 6) {
      console.log('❌ Şifre en az 6 karakter olmalıdır!')
      await client.close()
      process.exit(1)
    }

    // Check if admin exists
    const adminsCollection = db.collection('admins')
    const existingAdmin = await adminsCollection.findOne({ 
      $or: [{ username }, { email }] 
    })

    if (existingAdmin) {
      console.log('\n⚠️  Bu kullanıcı adı veya email zaten kullanılıyor!')
      const overwrite = await question('Üzerine yazmak ister misiniz? (e/h): ')
      
      if (overwrite.toLowerCase() !== 'e') {
        console.log('❌ İşlem iptal edildi.')
        await client.close()
        process.exit(0)
      }

      await adminsCollection.deleteOne({ $or: [{ username }, { email }] })
    }

    // Hash password
    console.log('\n🔒 Şifre şifreleniyor...')
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin
    const admin = {
      username,
      email,
      name,
      password: hashedPassword,
      role: 'admin',
      status: 'active',
      permissions: ['all'],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null,
      lastIp: null
    }

    await adminsCollection.insertOne(admin)

    console.log('\n✅ Admin kullanıcısı başarıyla oluşturuldu!')
    console.log('\n📋 Giriş Bilgileri:')
    console.log(`   Kullanıcı Adı: ${username}`)
    console.log(`   Email: ${email}`)
    console.log(`   Şifre: ${password}`)
    console.log('\n⚠️  Bu bilgileri güvenli bir yerde saklayın!')
    console.log('\n🌐 Admin Paneli: https://yourdomain.com/admin/login')

    await client.close()
    rl.close()
    process.exit(0)

  } catch (error) {
    console.error('\n❌ Hata:', error.message)
    rl.close()
    process.exit(1)
  }
}

setupAdmin()

