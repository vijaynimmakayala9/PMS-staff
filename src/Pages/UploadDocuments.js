import React, { useState, useRef } from 'react';
import {
  FiUpload,
  FiFile,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiFolder,
  FiImage,
  FiVideo,
  FiMusic,
  FiArchive,
  FiFileText,
  FiCloud,
  FiUser,
  FiSettings
} from 'react-icons/fi';

const UploadDocuments = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fileTypes = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
    document: ['pdf', 'doc', 'docx', 'txt', 'rtf'],
    spreadsheet: ['xls', 'xlsx', 'csv'],
    presentation: ['ppt', 'pptx'],
    video: ['mp4', 'avi', 'mov', 'wmv'],
    audio: ['mp3', 'wav', 'aac', 'flac'],
    archive: ['zip', 'rar', '7z', 'tar']
  };

  const getFileIcon = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (fileTypes.image.includes(extension)) return <FiImage className="text-purple-500" />;
    if (fileTypes.document.includes(extension)) return <FiFileText className="text-blue-500" />;
    if (fileTypes.spreadsheet.includes(extension)) return <FiFileText className="text-green-500" />;
    if (fileTypes.presentation.includes(extension)) return <FiFileText className="text-orange-500" />;
    if (fileTypes.video.includes(extension)) return <FiVideo className="text-indigo-500" />;
    if (fileTypes.audio.includes(extension)) return <FiMusic className="text-pink-500" />;
    if (fileTypes.archive.includes(extension)) return <FiArchive className="text-yellow-500" />;
    
    return <FiFile className="text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const simulateUpload = (fileId) => {
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[fileId] + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
          ));
          return { ...prev, [fileId]: 100 };
        }
        return { ...prev, [fileId]: newProgress };
      });
    }, 200);
  };

  const startUpload = () => {
    setUploading(true);
    uploadedFiles.forEach(file => {
      if (file.status === 'pending') {
        simulateUpload(file.id);
      }
    });
    
    // Simulate completion
    setTimeout(() => {
      setUploading(false);
      alert('All files uploaded successfully!');
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'uploading': return 'text-blue-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FiCheck className="text-green-500" />;
      case 'uploading': return <FiCloud className="text-blue-500" />;
      case 'error': return <FiAlertCircle className="text-red-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FiUpload className="text-blue-600 mr-3" />
            Upload Documents
          </h1>
          <p className="text-gray-600 mt-2">Upload your files to the cloud storage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Drag & Drop Files Here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files from your computer
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Files
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Supports: PDF, DOC, XLS, PPT, JPG, PNG, MP4, ZIP (Max: 100MB per file)
              </p>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Files to Upload ({uploadedFiles.length})
                  </h3>
                  <button
                    onClick={startUpload}
                    disabled={uploading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <FiUpload className="text-lg" />
                    <span>{uploading ? 'Uploading...' : 'Start Upload'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="p-2 bg-white rounded-lg">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 truncate">{file.name}</h4>
                          <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Progress Bar */}
                        <div className="w-24">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.id] || 0}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 text-center mt-1">
                            {Math.round(uploadProgress[file.id] || 0)}%
                          </div>
                        </div>

                        {/* Status Icon */}
                        <div className="w-6">
                          {file.status === 'completed' ? (
                            <FiCheck className="text-green-500 text-lg" />
                          ) : file.status === 'uploading' ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                          ) : (
                            <FiFile className="text-gray-400 text-lg" />
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <FiX className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Files</span>
                  <span className="font-semibold">{uploadedFiles.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Size</span>
                  <span className="font-semibold">
                    {formatFileSize(uploadedFiles.reduce((acc, file) => acc + file.size, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Uploading</span>
                  <span className="font-semibold text-blue-600">
                    {uploadedFiles.filter(f => f.status === 'uploading').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {uploadedFiles.filter(f => f.status === 'completed').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Storage Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Storage Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Available Space</span>
                  <span className="font-semibold">54.8 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Max File Size</span>
                  <span className="font-semibold">100 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Supported Types</span>
                  <span className="font-semibold">All Formats</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                  <FiFolder className="text-lg" />
                  <span>Create New Folder</span>
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                  <FiUser className="text-lg" />
                  <span>Share with Team</span>
                </button>
                <button className="w-full text-left text-blue-600 hover:text-blue-800 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                  <FiSettings className="text-lg" />
                  <span>Upload Settings</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 Upload Tips</h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Use descriptive file names</li>
                <li>• Compress large files before uploading</li>
                <li>• Organize files in folders</li>
                <li>• Check file formats before upload</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;