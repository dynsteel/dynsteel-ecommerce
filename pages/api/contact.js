// API Route: Contact Form
import { getCollection } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, subject, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Ad, email ve mesaj gereklidir' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Geçerli bir email adresi giriniz' })
    }

    // Save to database
    const contactsCollection = await getCollection('contacts')
    const newContact = {
      name,
      email,
      phone: phone || null,
      subject: subject || 'Genel',
      message,
      status: 'new',
      createdAt: new Date(),
      replied: false
    }

    await contactsCollection.insertOne(newContact)

    // Send email notification (implement later)
    // await sendContactNotificationEmail(newContact)

    return res.status(200).json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ error: 'Mesaj gönderilirken hata oluştu' })
  }
}

