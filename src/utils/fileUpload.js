// components/FileUpload.jsx
import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, FileText, X } from 'lucide-react';

const FileUpload = ({ 
  onUploadSuccess, 
  currentUrl, 
  accept = "image/*", 
  label = "Upload Image", 
  uploadPreset = "Upload_file", 
  folder = "my_project",
  cloudName = "dciu1vjgj",
  maxSizeMB = 5,
  isDocument = false,
  className = "" 
}) => {
  const [fileInputId] = useState(`file-upload-${Math.random().toString(36).substr(2, 9)}`);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewFileName, setPreviewFileName] = useState('');
  const [previewType, setPreviewType] = useState('none'); // 'none', 'image', 'video', 'document'

  const imageExts = ['jpg', 'jpeg', 'png', 'webp'];
  const videoExts = ['mp4'];
  const docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx'];
  const allFileExts = [...imageExts, ...videoExts, ...docExts];

  const allowedExts = isDocument ? allFileExts : imageExts;

  const getFileNameFromUrl = (url) => {
    if (!url) return '';
    const parts = url.split('/');
    let last = parts[parts.length - 1];
    if (last.includes('?')) last = last.split('?')[0];
    if (last.includes('.')) return last;
    return 'file';
  };

  const getPreviewTypeFromUrl = (url) => {
    if (!url) return 'none';
    const urlExt = url.split('.').pop().toLowerCase().split('?')[0];
    if (imageExts.includes(urlExt)) return 'image';
    if (videoExts.includes(urlExt)) return 'video';
    if (docExts.includes(urlExt)) return 'document';
    // Fallback for URLs without extension (like Unsplash) - assume image for non-document
    if (!isDocument && url.startsWith('http')) {
      return 'image';
    }
    return 'document';
  };

  const documentAccept = 'image/jpeg,image/jpg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/mp4';

  const inputAccept = isDocument ? documentAccept : accept;

  useEffect(() => {
    if (currentUrl) {
      const type = getPreviewTypeFromUrl(currentUrl);
      setPreviewType(type);
      setPreviewUrl(currentUrl);
      setPreviewFileName(type === 'document' ? getFileNameFromUrl(currentUrl) : '');
    } else {
      setPreviewType('none');
      setPreviewUrl(null);
      setPreviewFileName('');
    }
  }, [currentUrl, isDocument]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.toLowerCase().split('.').pop();

    // Validate file type
    if (!allowedExts.includes(ext)) {
      const types = isDocument 
        ? 'JPG, JPEG, PNG, WEBP, PDF, DOC, DOCX, XLS, XLSX, MP4' 
        : 'JPG, JPEG, PNG, WEBP';
      setError(`Please select a valid file type: ${types}.`);
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB.`);
      return;
    }

    const originalPreviewFileName = previewFileName;
    let localPreview = null;

    setError(null);

    if (isDocument) {
      setPreviewType('document');
      setPreviewFileName(file.name);
      setPreviewUrl(file.name);
    } else {
      const isImage = imageExts.includes(ext);
      const isVideo = videoExts.includes(ext);
      if (isImage || isVideo) {
        localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);
        setPreviewType(isImage ? 'image' : 'video');
        setPreviewFileName('');
      }
    }

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);
    formData.append('resource_type', 'auto');

    try {
      setIsUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        const newUrl = data.secure_url;
        if (isDocument) {
          setPreviewType('document');
          setPreviewUrl(newUrl);
          setPreviewFileName(getFileNameFromUrl(newUrl));
        } else {
          const urlExt = newUrl.split('.').pop().toLowerCase().split('?')[0];
          const isImage = imageExts.includes(urlExt);
          const isVideo = videoExts.includes(urlExt);
          if (isImage) {
            setPreviewType('image');
          } else if (isVideo) {
            setPreviewType('video');
          } else {
            setPreviewType('image'); // fallback
          }
          setPreviewUrl(newUrl);
        }
        // Call success callback with the URL
        if (onUploadSuccess) {
          onUploadSuccess(newUrl);
        }
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
      // Revert
      if (isDocument) {
        setPreviewFileName(originalPreviewFileName);
        setPreviewUrl(currentUrl || null);
      } else {
        setPreviewUrl(currentUrl || null);
        const type = getPreviewTypeFromUrl(currentUrl);
        setPreviewType(type);
      }
    } finally {
      setIsUploading(false);
      // Clean up local URL
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    }
  };

  const removeImage = () => {
    setPreviewType('none');
    setPreviewUrl(null);
    setPreviewFileName('');
    if (onUploadSuccess) {
      onUploadSuccess(null);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      {/* Upload Button */}
      <input
        type="file"
        accept={inputAccept}
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
        id={fileInputId}
      />
      <label
        htmlFor={fileInputId}
        className={`flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isUploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
      >
        {isUploading ? (
          <div className="flex items-center space-x-2 text-green-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-500">
            <Upload className="h-5 w-5" />
            <span>Click to upload or drag and drop</span>
          </div>
        )}
      </label>

      {/* Preview */}
      {previewType !== 'none' && previewUrl && (
        <div className="relative">
          {previewType === 'image' && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg border"
              onError={(e) => {
                console.error('Image load error:', e);
                setPreviewType('none');
              }}
            />
          )}
          {previewType === 'video' && (
            <video
              src={previewUrl}
              controls
              className="w-full h-32 object-cover rounded-lg border"
            >
              Your browser does not support the video tag.
            </video>
          )}
          {previewType === 'document' && (
            <div className="w-full h-32 bg-gray-100 rounded-lg border flex flex-col items-center justify-center text-center p-4">
              <FileText className="h-8 w-8 text-gray-400 mb-2" />
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline block truncate max-w-full"
                title={previewUrl}
              >
                {previewFileName || previewUrl}
              </a>
              {previewUrl && (
                <p className="text-xs text-gray-500 mt-1 truncate max-w-full">
                  {previewUrl}
                </p>
              )}
            </div>
          )}
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
            title="Remove file"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Uploading indicator below preview */}
      {previewType !== 'none' && isUploading && (
        <div className="flex items-center space-x-2 text-green-600 text-sm mt-1 pl-1">
          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600"></div>
          <span>Uploading...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;