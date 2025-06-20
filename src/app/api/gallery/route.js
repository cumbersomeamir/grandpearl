import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export async function GET() {
  try {
    const db = await getDb()
    const items = await db.collection('gallery').find({}).sort({ createdAt: -1 }).toArray()
    return Response.json(items)
  } catch (err) {
    console.error('GET /api/gallery error', err)
    return new Response('Server error', { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const items = Array.isArray(body.items) ? body.items : []
    const docs = items.map(item => ({
      type: item.type,
      src: item.src,
      title: item.title,
      category: item.category,
      description: item.description,
      createdAt: new Date()
    }))
    const db = await getDb()
    if (docs.length === 0) {
      return Response.json([], { status: 200 })
    }
    const result = await db.collection('gallery').insertMany(docs)
    const inserted = docs.map((doc, idx) => ({ ...doc, _id: result.insertedIds[idx] }))
    return Response.json(inserted, { status: 201 })
  } catch (err) {
    console.error('POST /api/gallery error', err)
    return new Response('Server error', { status: 500 })
  }
}
