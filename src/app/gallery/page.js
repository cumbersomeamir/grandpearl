'use client'
import { useEffect, useState } from 'react'

export default function GalleryPage() {
  const [images, setImages] = useState([])

  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch(() => {})
  }, [])

  return (
    <div className="p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img) => (
        <img key={img} src={`/uploads/${img}`} alt="" className="w-full h-auto rounded" />
      ))}
    </div>
  )
}
