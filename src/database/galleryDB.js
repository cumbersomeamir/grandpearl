// src/database/galleryDB.js
import fs from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'src/database/gallery-data.json')

// Default gallery data structure
const defaultGalleryData = {
  items: [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
      title: 'Luxury Suite Interior',
      category: 'rooms',
      description: 'Opulent bedroom with premium amenities',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'luxury-suite.jpg',
      size: 0,
      isDefault: true
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=center',
      title: 'Grand Banquet Hall',
      category: 'events',
      description: 'Elegant venue for weddings and celebrations',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'banquet-hall.jpg',
      size: 0,
      isDefault: true
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop&crop=center',
      title: 'Premium Restaurant',
      category: 'dining',
      description: 'Fine dining with world-class cuisine',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'restaurant.jpg',
      size: 0,
      isDefault: true
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&crop=center',
      title: 'Luxury Spa',
      category: 'amenities',
      description: 'Rejuvenating wellness treatments',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'spa.jpg',
      size: 0,
      isDefault: true
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop&crop=center',
      title: 'Rooftop Terrace',
      category: 'amenities',
      description: 'Panoramic city views and relaxation',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'terrace.jpg',
      size: 0,
      isDefault: true
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop&crop=center',
      title: 'Corporate Conference',
      category: 'events',
      description: 'Professional meeting facilities',
      uploadedAt: new Date().toISOString(),
      s3Key: null,
      originalName: 'conference.jpg',
      size: 0,
      isDefault: true
    }
  ],
  lastUpdated: new Date().toISOString(),
  totalItems: 6
}

/**
 * Initialize database file if it doesn't exist
 */
export const initializeDatabase = () => {
  try {
    // Create database directory if it doesn't exist
    const dbDir = path.dirname(DB_PATH)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    // Create database file if it doesn't exist
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultGalleryData, null, 2))
      console.log('Gallery database initialized with default data')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

/**
 * Read all gallery items from database
 * @returns {Object} Gallery data
 */
export const getAllGalleryItems = () => {
  try {
    initializeDatabase()
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading gallery database:', error)
    return defaultGalleryData
  }
}

/**
 * Add new gallery item to database
 * @param {Object} item - Gallery item to add
 * @returns {Object} Updated gallery data
 */
export const addGalleryItem = (item) => {
  try {
    const galleryData = getAllGalleryItems()
    
    // Generate new ID
    const newId = Math.max(...galleryData.items.map(i => i.id), 0) + 1
    
    // Create new item
    const newItem = {
      id: newId,
      ...item,
      uploadedAt: new Date().toISOString(),
      isDefault: false
    }
    
    // Add to beginning of array (newest first)
    galleryData.items.unshift(newItem)
    galleryData.totalItems = galleryData.items.length
    galleryData.lastUpdated = new Date().toISOString()
    
    // Save to file
    fs.writeFileSync(DB_PATH, JSON.stringify(galleryData, null, 2))
    
    console.log('Gallery item added:', newItem.title)
    return galleryData
  } catch (error) {
    console.error('Error adding gallery item:', error)
    throw error
  }
}

/**
 * Add multiple gallery items to database
 * @param {Object[]} items - Array of gallery items to add
 * @returns {Object} Updated gallery data
 */
export const addMultipleGalleryItems = (items) => {
  try {
    const galleryData = getAllGalleryItems()
    let currentMaxId = Math.max(...galleryData.items.map(i => i.id), 0)
    
    // Process each item
    const newItems = items.map(item => {
      currentMaxId += 1
      return {
        id: currentMaxId,
        ...item,
        uploadedAt: new Date().toISOString(),
        isDefault: false
      }
    })
    
    // Add all new items to beginning of array
    galleryData.items.unshift(...newItems)
    galleryData.totalItems = galleryData.items.length
    galleryData.lastUpdated = new Date().toISOString()
    
    // Save to file
    fs.writeFileSync(DB_PATH, JSON.stringify(galleryData, null, 2))
    
    console.log(`Added ${newItems.length} gallery items`)
    return galleryData
  } catch (error) {
    console.error('Error adding multiple gallery items:', error)
    throw error
  }
}

/**
 * Delete gallery item from database
 * @param {number} itemId - ID of item to delete
 * @returns {Object} Updated gallery data
 */
export const deleteGalleryItem = (itemId) => {
  try {
    const galleryData = getAllGalleryItems()
    
    // Find item to get S3 key
    const itemToDelete = galleryData.items.find(item => item.id === itemId)
    
    // Remove item from array
    galleryData.items = galleryData.items.filter(item => item.id !== itemId)
    galleryData.totalItems = galleryData.items.length
    galleryData.lastUpdated = new Date().toISOString()
    
    // Save to file
    fs.writeFileSync(DB_PATH, JSON.stringify(galleryData, null, 2))
    
    console.log('Gallery item deleted:', itemId)
    return { galleryData, deletedItem: itemToDelete }
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    throw error
  }
}

/**
 * Get gallery items by category
 * @param {string} category - Category to filter by
 * @returns {Object[]} Filtered gallery items
 */
export const getGalleryItemsByCategory = (category) => {
  try {
    const galleryData = getAllGalleryItems()
    
    if (category === 'all') {
      return galleryData.items
    }
    
    return galleryData.items.filter(item => item.category === category)
  } catch (error) {
    console.error('Error getting gallery items by category:', error)
    return []
  }
}

/**
 * Update gallery item
 * @param {number} itemId - ID of item to update
 * @param {Object} updates - Updates to apply
 * @returns {Object} Updated gallery data
 */
export const updateGalleryItem = (itemId, updates) => {
  try {
    const galleryData = getAllGalleryItems()
    
    // Find and update item
    const itemIndex = galleryData.items.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
      galleryData.items[itemIndex] = {
        ...galleryData.items[itemIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      galleryData.lastUpdated = new Date().toISOString()
      
      // Save to file
      fs.writeFileSync(DB_PATH, JSON.stringify(galleryData, null, 2))
      
      console.log('Gallery item updated:', itemId)
    }
    
    return galleryData
  } catch (error) {
    console.error('Error updating gallery item:', error)
    throw error
  }
}