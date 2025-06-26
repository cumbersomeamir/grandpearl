'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function UploadModal({ onClose, onUpload }) {
  const modalRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileMetadata, setFileMetadata] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modal entrance animation
      gsap.fromTo('.upload-modal-backdrop', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      })

      gsap.fromTo('.upload-modal-content', {
        scale: 0.8,
        opacity: 0,
        y: 50
      }, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })

    }, modalRef)

    return () => ctx.revert()
  }, [])

  const handleClose = () => {
    // Exit animation
    gsap.to('.upload-modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'back.in(1.7)'
    })
    gsap.to('.upload-modal-backdrop', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: onClose
    })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files])
      
      // Initialize metadata for new files
      const newMetadata = files.map(file => ({
        title: file.name.split('.')[0],
        description: '',
        category: 'uploaded'
      }))
      setFileMetadata(prev => [...prev, ...newMetadata])
      
      // Show drop success animation
      gsap.fromTo('.drop-success', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      
      setTimeout(() => {
        gsap.to('.drop-success', {
          opacity: 0,
          duration: 0.3
        })
      }, 2000)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    )
    
    if (files.length > 0) {
      setSelectedFiles(prev => [...prev, ...files])
      
      // Initialize metadata for new files
      const newMetadata = files.map(file => ({
        title: file.name.split('.')[0],
        description: '',
        category: 'uploaded'
      }))
      setFileMetadata(prev => [...prev, ...newMetadata])
      
      // Show selection animation
      gsap.fromTo('.file-selected-indicator', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    }
  }

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    setFileMetadata(prev => prev.filter((_, i) => i !== index))
  }

  const updateMetadata = (index, field, value) => {
    setFileMetadata(prev => prev.map((meta, i) => 
      i === index ? { ...meta, [field]: value } : meta
    ))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return
    
    // Validate required fields
    const hasEmptyTitles = fileMetadata.some(meta => !meta.title || meta.title.trim() === '')
    if (hasEmptyTitles) {
      // Show validation error
      gsap.fromTo('.validation-error', {
        scale: 0,
        opacity: 0
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      
      setTimeout(() => {
        gsap.to('.validation-error', {
          opacity: 0,
          duration: 0.3
        })
      }, 3000)
      return
    }
    
    setUploading(true)
    
    // Pass files and metadata to parent component
    onUpload(selectedFiles, fileMetadata)
    setUploading(false)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="upload-modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="upload-modal-content relative bg-gradient-to-br from-charcoal to-midnight rounded-3xl border-2 border-gold/30 shadow-2xl shadow-gold/10 p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Loader Overlay */}
        {uploading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-3xl">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-gold text-xl font-bold font-cormorant">Uploading... Please wait</div>
          </div>
        )}
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gold to-antique-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/30">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white font-cormorant mb-2">Upload Media</h2>
          <p className="text-gray-400 font-light">Add images and videos to the gallery</p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-3 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
            dragActive 
              ? 'border-gold bg-gold/10' 
              : 'border-gold/30 hover:border-gold/50 hover:bg-gold/5'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload').click()}
        >
          <div className="space-y-4">
            <div className="text-6xl text-gold/60">📎</div>
            <div>
              <h3 className="text-xl font-bold text-white font-cormorant mb-2">
                Drag & Drop Media Files
              </h3>
              <p className="text-gray-400 mb-4">
                Or click anywhere in this area to browse files
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <div
                className="inline-block px-8 py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-bold rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg shadow-gold/30"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Choose Files from Computer
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, MP4, MOV, WebM • Max 50MB per file
            </p>
          </div>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white font-cormorant mb-4">
              Selected Files ({selectedFiles.length})
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="bg-midnight/50 rounded-xl p-4 border border-gold/20">
                  {/* File Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {file.type.startsWith('video/') ? '🎥' : '📷'}
                      </div>
                      <div>
                        <div className="text-white font-semibold truncate max-w-xs">
                          {file.name}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Metadata Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={fileMetadata[index]?.title || ''}
                        onChange={(e) => updateMetadata(index, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-charcoal border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Enter title..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={fileMetadata[index]?.category || 'uploaded'}
                        onChange={(e) => updateMetadata(index, 'category', e.target.value)}
                        className="w-full px-4 py-2 bg-charcoal border border-gold/30 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
                      >
                        <option value="uploaded">Uploaded</option>
                        <option value="rooms">Rooms</option>
                        <option value="events">Events</option>
                        <option value="dining">Dining</option>
                        <option value="amenities">Amenities</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={fileMetadata[index]?.description || ''}
                      onChange={(e) => updateMetadata(index, 'description', e.target.value)}
                      className="w-full px-4 py-2 bg-charcoal border border-gold/30 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors resize-none"
                      placeholder="Enter description..."
                      rows="2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleClose}
            className="flex-1 py-4 border-2 border-gold/30 text-gray-300 font-semibold rounded-xl hover:border-gold/50 hover:text-gold transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || uploading}
            className="flex-1 py-4 bg-gradient-to-r from-gold to-antique-gold text-black font-bold rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Uploading {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''} to Gallery
              </span>
            )}
          </button>
        </div>

        {/* Success Messages */}
        <div className="file-selected-indicator fixed top-20 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Files selected successfully!
        </div>
        
        <div className="drop-success fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Files dropped successfully!
        </div>

        <div className="validation-error fixed top-20 right-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none z-50">
          Please fill in all required fields (titles)!
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-3xl"></div>
      </div>
    </div>
  )
}