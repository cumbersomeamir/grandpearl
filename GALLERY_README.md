# Grand Pearl Gallery - Database Integration

## Overview
The gallery page now has full database integration with MongoDB, allowing users to upload, store, and retrieve media files with metadata.

## Features

### 🔐 Admin Authentication
- **Login Credentials**: 
  - Username: `admin`
  - Password: `grandpearl2024`
- Session persistence using localStorage
- Admin-only upload functionality

### 📤 Upload Functionality
- **Supported Formats**: Images (JPG, PNG, GIF) and Videos (MP4, MOV, WebM)
- **File Size Limit**: 50MB per file
- **Metadata Fields**:
  - Title (required)
  - Description (optional)
  - Category (rooms, events, dining, amenities, uploaded)
- **Drag & Drop**: Support for drag and drop file uploads
- **Multiple Files**: Upload multiple files simultaneously

### 🗄️ Database Storage
- **MongoDB Integration**: Files are stored as base64 data URLs in MongoDB
- **Schema**: Includes title, description, type, src, category, fileName, fileSize, mimeType, and timestamps
- **Categories**: Organized filtering by room types, events, dining, and amenities

### 📱 Gallery Display
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Filtering**: Filter by category (All, Rooms, Events, Dining, Amenities, Uploaded)
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error messages and retry functionality

### 🗑️ Management Features
- **Delete Items**: Admin can delete uploaded items
- **Seed Database**: Populate with default gallery items for testing

## API Endpoints

### GET `/api/gallery`
- Fetches all gallery items
- Optional query parameter: `?category=<category>` for filtering

### POST `/api/gallery/upload`
- Uploads new media files with metadata
- Accepts FormData with files, titles, descriptions, and categories

### DELETE `/api/gallery/[id]`
- Deletes a specific gallery item by ID

### POST `/api/gallery/seed`
- Populates database with default gallery items
- Only works if database is empty

## Database Schema

```javascript
{
  title: String (required),
  description: String,
  type: String (enum: 'image', 'video'),
  src: String (base64 data URL),
  category: String (enum: 'rooms', 'events', 'dining', 'amenities', 'uploaded'),
  fileName: String,
  fileSize: Number,
  mimeType: String,
  uploadedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

1. **Environment Variables**: Ensure `.env.local` contains:
   ```
   MONGODB_URI="mongodb+srv://amir:jjxeuJJnaClM3nOT@grandpearl.qvl62it.mongodb.net/?retryWrites=true&w=majority"
   ```

2. **Install Dependencies**: 
   ```bash
   npm install mongodb mongoose multer
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Seed Database** (Optional):
   - Login as admin
   - Click "🌱 Seed Database" button to populate with default items

## Usage

1. **Access Gallery**: Navigate to `/gallery`
2. **Admin Login**: Click "🔑 Admin Login to Upload Media"
3. **Upload Files**: 
   - Click "📸 Upload Photos & Videos"
   - Drag & drop files or click to browse
   - Fill in metadata (title is required)
   - Click "Upload to Gallery"
4. **Manage Content**: Use category filters and delete unwanted items

## Technical Notes

- **File Storage**: Files are converted to base64 and stored directly in MongoDB
- **Performance**: For production, consider using cloud storage (AWS S3, Cloudinary) for large files
- **Security**: Implement proper authentication and file validation for production use
- **Caching**: Consider implementing Redis for better performance with large galleries

## Troubleshooting

- **Connection Issues**: Check MongoDB connection string in `.env.local`
- **Upload Failures**: Verify file size and format restrictions
- **Empty Gallery**: Use the seed function to populate with default items
- **Admin Access**: Clear localStorage if login issues persist 