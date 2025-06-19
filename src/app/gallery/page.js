'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch('/api/images')
        if (res.ok) {
          const data = await res.json()
          setImages(Array.isArray(data.images) ? data.images : [])
        }
      } catch (err) {
        console.error(err)
      }
    }
    loadImages()
  }, [])

  return (
    <>
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={`/uploads/${selected}`}
            alt=""
            className="max-w-full max-h-full rounded shadow-lg"
          />
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gallery</h1>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Admin
          </Link>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setSelected(img)}
                className="block focus:outline-none"
              >
                <img
                  src={`/uploads/${img}`}
                  alt=""
                  className="w-full h-auto rounded shadow"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
