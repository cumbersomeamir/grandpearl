// src/lib/aws-s3.js
import AWS from 'aws-sdk'

// Configure AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
})

const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME

/**
 * Upload file to S3 and return the public URL
 * @param {File} file - The file object to upload
 * @param {string} category - Category for organizing files
 * @returns {Promise<string>} - The S3 URL of the uploaded file
 */
export const uploadFileToS3 = async (file, category = 'general') => {
  try {
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${category}/${timestamp}-${randomString}.${fileExtension}`

    // Upload parameters
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', // Make file publicly accessible
    }

    // Upload to S3
    const result = await s3.upload(uploadParams).promise()
    
    // Return the public URL
    const s3Url = `https://${BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`
    
    return {
      success: true,
      url: s3Url,
      key: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type
    }
  } catch (error) {
    console.error('Error uploading to S3:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Upload multiple files to S3
 * @param {File[]} files - Array of file objects
 * @param {string} category - Category for organizing files
 * @returns {Promise<Object[]>} - Array of upload results
 */
export const uploadMultipleFilesToS3 = async (files, category = 'gallery') => {
  const uploadPromises = files.map(file => uploadFileToS3(file, category))
  
  try {
    const results = await Promise.all(uploadPromises)
    return results
  } catch (error) {
    console.error('Error uploading multiple files:', error)
    throw error
  }
}

/**
 * Delete file from S3
 * @param {string} fileKey - The S3 key of the file to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFileFromS3 = async (fileKey) => {
  try {
    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: fileKey
    }

    await s3.deleteObject(deleteParams).promise()
    return { success: true }
  } catch (error) {
    console.error('Error deleting from S3:', error)
    return { success: false, error: error.message }
  }
}