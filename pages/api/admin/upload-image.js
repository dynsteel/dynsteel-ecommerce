// ImgBB Image Upload API
// Ücretsiz API key için: https://api.imgbb.com/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { image } = req.body

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' })
    }

    // ImgBB API Key - .env.local dosyasına ekleyin: IMGBB_API_KEY=your_key_here
    const IMGBB_API_KEY = process.env.IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY'

    if (IMGBB_API_KEY === 'YOUR_IMGBB_API_KEY') {
      // Eğer API key yoksa, base64'i direkt döndür (fallback)
      return res.status(200).json({ 
        success: true, 
        url: image,
        message: 'IMGBB_API_KEY not configured. Using base64 fallback.'
      })
    }

    // Base64 görseli FormData formatına çevir
    let imageData = image
    
    // Eğer data:image prefix'i varsa, sadece base64 kısmını al
    if (image.startsWith('data:image')) {
      imageData = image.split(',')[1]
    }

    // ImgBB API'ye yükle
    const formData = new URLSearchParams()
    formData.append('key', IMGBB_API_KEY)
    formData.append('image', imageData)

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const data = await response.json()

    if (!response.ok || !data.success) {
      console.error('ImgBB upload error:', data)
      // Hata durumunda base64'i döndür
      return res.status(200).json({ 
        success: true, 
        url: image,
        message: 'ImgBB upload failed. Using base64 fallback.'
      })
    }

    // Başarılı yükleme - URL'yi döndür
    return res.status(200).json({
      success: true,
      url: data.data.url,
      deleteUrl: data.data.delete_url,
      thumbUrl: data.data.thumb?.url || data.data.url
    })
  } catch (error) {
    console.error('Image upload error:', error)
    // Hata durumunda base64'i döndür
    return res.status(200).json({ 
      success: true, 
      url: req.body.image,
      message: 'Upload error. Using base64 fallback.',
      error: error.message
    })
  }
}

