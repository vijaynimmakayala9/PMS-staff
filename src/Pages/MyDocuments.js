import React, { useState } from 'react';
import {
  FiFile,
  FiFolder,
  FiDownload,
  FiTrash2,
  FiShare2,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiCalendar,
  FiUser,
  FiStar,
  FiImage,
  FiFileText,
  FiVideo,
  FiMusic,
  FiArchive
} from 'react-icons/fi';

const MyDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const documents = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'work',
      uploadDate: '2024-06-15',
      modifiedDate: '2024-06-18',
      sharedWith: 3,
      starred: true,
      tags: ['proposal', 'client', 'q2'],
      thumbnail: '📄'
    },
    {
      id: 2,
      name: 'Quarterly Report.docx',
      type: 'doc',
      size: '1.8 MB',
      category: 'work',
      uploadDate: '2024-06-10',
      modifiedDate: '2024-06-12',
      sharedWith: 5,
      starred: true,
      tags: ['report', 'quarterly', 'financial'],
      thumbnail: '📝'
    },
    {
      id: 3,
      name: 'Team Photo.jpg',
      type: 'image',
      size: '4.2 MB',
      category: 'personal',
      uploadDate: '2024-06-08',
      modifiedDate: '2024-06-08',
      sharedWith: 8,
      starred: false,
      tags: ['team', 'photo', 'event'],
      thumbnail: '🖼️'
    },
    {
      id: 4,
      name: 'Budget Spreadsheet.xlsx',
      type: 'sheet',
      size: '3.1 MB',
      category: 'work',
      uploadDate: '2024-06-05',
      modifiedDate: '2024-06-20',
      sharedWith: 2,
      starred: true,
      tags: ['budget', 'finance', '2024'],
      thumbnail: '📊'
    },
    {
      id: 5,
      name: 'Presentation Deck.pptx',
      type: 'ppt',
      size: '5.7 MB',
      category: 'work',
      uploadDate: '2024-06-03',
      modifiedDate: '2024-06-17',
      sharedWith: 12,
      starred: false,
      tags: ['presentation', 'client', 'deck'],
      thumbnail: '📑'
    },
    {
      id: 6,
      name: 'Vacation Photos.zip',
      type: 'archive',
      size: '45.2 MB',
      category: 'personal',
      uploadDate: '2024-05-28',
      modifiedDate: '2024-05-28',
      sharedWith: 0,
      starred: false,
      tags: ['vacation', 'photos', 'family'],
      thumbnail: '📦'
    },
    {
      id: 7,
      name: 'Meeting Recording.mp4',
      type: 'video',
      size: '125.8 MB',
      category: 'work',
      uploadDate: '2024-05-25',
      modifiedDate: '2024-05-25',
      sharedWith: 4,
      starred: false,
      tags: ['meeting', 'recording', 'team'],
      thumbnail: '🎥'
    },
    {
      id: 8,
      name: 'Resume.pdf',
      type: 'pdf',
      size: '1.2 MB',
      category: 'personal',
      uploadDate: '2024-05-20',
      modifiedDate: '2024-06-10',
      sharedWith: 0,
      starred: true,
      tags: ['resume', 'career', 'professional'],
      thumbnail: '📄'
    }
  ];

  const categories = ['all', 'work', 'personal', 'shared', 'starred'];
  const fileTypes = ['all', 'pdf', 'doc', 'sheet', 'image', 'video', 'archive'];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FiFileText className="text-red-500" />;
      case 'doc': return <FiFileText className="text-blue-500" />;
      case 'sheet': return <FiFileText className="text-green-500" />;
      case 'ppt': return <FiFileText className="text-orange-500" />;
      case 'image': return <FiImage className="text-purple-500" />;
      case 'video': return <FiVideo className="text-indigo-500" />;
      case 'archive': return <FiArchive className="text-yellow-500" />;
      default: return <FiFile className="text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || 
                           (categoryFilter === 'starred' ? doc.starred : doc.category === categoryFilter);
    
    return matchesSearch && matchesCategory;
  });

  const storageStats = {
    used: 45.2,
    total: 100,
    documents: documents.length,
    images: documents.filter(d => d.type === 'image').length,
    pdfs: documents.filter(d => d.type === 'pdf').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FiFolder className="text-blue-600 mr-3" />
              My Documents
            </h1>
            <p className="text-gray-600 mt-2">Manage and organize your documents and files</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            <div className="flex bg-white rounded-lg border border-gray-300">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{storageStats.used} GB</p>
                <p className="text-xs text-gray-500">of {storageStats.total} GB</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500 bg-opacity-10">
                <FiFolder className="text-2xl text-blue-500" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(storageStats.used / storageStats.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-800">{storageStats.documents}</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{storageStats.images}</div>
            <div className="text-sm text-gray-600">Images</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-600">{storageStats.pdfs}</div>
            <div className="text-sm text-gray-600">PDF Files</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents by name or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="starred">Starred</option>
                <option value="shared">Shared</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{doc.thumbnail}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm truncate max-w-[120px]">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-gray-500">{doc.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {doc.starred && <FiStar className="text-yellow-500" />}
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Size</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Modified</span>
                    <span>{new Date(doc.modifiedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Category and Tags */}
                <div className="mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{doc.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                    <FiDownload className="text-sm" />
                    <span>Download</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <FiShare2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Document</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Size</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Modified</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Shared</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{doc.thumbnail}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                              {doc.starred && <FiStar className="text-yellow-500" />}
                            </div>
                            <p className="text-sm text-gray-500">{doc.type.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(doc.modifiedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <FiUser className="text-gray-400" />
                          <span className="text-sm text-gray-600">{doc.sharedWith}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                            <FiDownload className="text-lg" />
                          </button>
                          <button className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors">
                            <FiShare2 className="text-lg" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FiFolder className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
              <FiFile className="text-lg" />
              <span>Upload Your First Document</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocuments;