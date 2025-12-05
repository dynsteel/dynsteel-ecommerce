// API Route: Admin Messages
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI) {
    return res.status(500).json({ error: 'MongoDB connection not configured' })
  }

  try {
    const client = await clientPromise
    const db = client.db('dynsteel')
    const contactsCollection = db.collection('contacts')

    if (req.method === 'GET') {
      const { id, status } = req.query

      if (id) {
        // Get single message
        const message = await contactsCollection.findOne({ _id: new ObjectId(id) })

        if (!message) {
          return res.status(404).json({ error: 'Message not found' })
        }

        const formattedMessage = {
          id: message._id.toString(),
          name: message.name || '',
          email: message.email || '',
          phone: message.phone || '',
          subject: message.subject || 'Genel',
          message: message.message || '',
          status: message.status || 'new',
          replied: message.replied || false,
          createdAt: message.createdAt || new Date(),
          updatedAt: message.updatedAt || new Date()
        }

        return res.status(200).json({ success: true, message: formattedMessage })
      }

      // Get all messages
      let query = {}
      if (status && status !== 'all') {
        query.status = status
      }

      const messages = await contactsCollection.find(query).sort({ createdAt: -1 }).limit(1000).toArray()

      const formattedMessages = messages.map(message => ({
        id: message._id.toString(),
        name: message.name || '',
        email: message.email || '',
        phone: message.phone || '',
        subject: message.subject || 'Genel',
        message: message.message || '',
        status: message.status || 'new',
        replied: message.replied || false,
        createdAt: message.createdAt || new Date(),
        updatedAt: message.updatedAt || new Date()
      }))

      res.status(200).json({ success: true, messages: formattedMessages })
    } else if (req.method === 'PUT') {
      // Update message status
      const { id, status, replied } = req.body

      if (!id) {
        return res.status(400).json({ error: 'Message ID is required' })
      }

      const updateFields = {
        updatedAt: new Date()
      }

      if (status) {
        updateFields.status = status
      }

      if (replied !== undefined) {
        updateFields.replied = replied
      }

      const result = await contactsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Message not found' })
      }

      res.status(200).json({ success: true, message: 'Message updated successfully' })
    } else if (req.method === 'DELETE') {
      // Delete message
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'Message ID is required' })
      }

      const result = await contactsCollection.deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Message not found' })
      }

      res.status(200).json({ success: true, message: 'Message deleted successfully' })
    } else {
      res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) {
    console.error('Messages API error:', error)
    res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

