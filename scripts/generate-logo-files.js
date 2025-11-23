const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

console.log('🎨 DynSteel Logo dosyaları oluşturuluyor...\n');

// public/icons klasörünü oluştur
const publicDir = path.join(process.cwd(), 'public');
const iconsDir = path.join(publicDir, 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
  console.log('✅ public/icons klasörü oluşturuldu');
}

const svgPath = path.join(iconsDir, 'icon.svg');

if (!fs.existsSync(svgPath)) {
  console.error('❌ icon.svg dosyası bulunamadı!');
  process.exit(1);
}

// SVG'yi oku
const svgBuffer = fs.readFileSync(svgPath);

// PNG dosyalarını oluştur
const tasks = [
  { size: 192, output: path.join(iconsDir, 'icon-192.png') },
  { size: 512, output: path.join(iconsDir, 'icon-512.png') },
  { size: 180, output: path.join(publicDir, 'apple-touch-icon.png') },
  { size: 32, output: path.join(publicDir, 'favicon.png') },
];

Promise.all(
  tasks.map(({ size, output }) =>
    sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(output)
      .then(() => console.log(`✅ ${path.basename(output)} oluşturuldu (${size}x${size})`))
      .catch(err => console.error(`❌ ${path.basename(output)} oluşturulamadı:`, err.message))
  )
).then(() => {
  console.log('\n✨ Tüm logo dosyaları başarıyla oluşturuldu!\n');
}).catch(err => {
  console.error('❌ Hata:', err.message);
  process.exit(1);
});

