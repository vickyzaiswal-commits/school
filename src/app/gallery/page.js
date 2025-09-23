"use client";
import React, { useState } from 'react';
import { 
  Camera,
  Video,
  Calendar,
  MapPin,
  Users,
  Search,
  Filter,
  Download,
  Share2,
  Heart,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  List,
  ArrowRight
} from 'lucide-react';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryCategories = [
    { id: 'all', name: 'All Media' },
    { id: 'events', name: 'School Events' },
    { id: 'sports', name: 'Sports' },
    { id: 'academic', name: 'Academic' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'campus', name: 'Campus Life' }
  ];

  const galleryMedia = [
    {
      id: 1,
      type: 'image',
      title: 'Annual Day Performance',
      category: 'cultural',
      date: 'Nov 20, 2023',
      description: 'Students performing at the annual cultural festival',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 124,
      views: 568
    },
    {
      id: 2,
      type: 'image',
      title: 'Science Fair Exhibition',
      category: 'academic',
      date: 'Feb 15, 2024',
      description: 'Students showcasing their science projects',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 89,
      views: 432
    },
    {
      id: 3,
      type: 'video',
      title: 'Basketball Championship',
      category: 'sports',
      date: 'Jan 30, 2024',
      description: 'Championship game of the inter-school tournament',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 156,
      views: 723
    },
    {
      id: 4,
      type: 'image',
      title: 'Art Exhibition',
      category: 'cultural',
      date: 'Mar 10, 2024',
      description: 'Annual student art showcase',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 201,
      views: 892
    },
    {
      id: 5,
      type: 'image',
      title: 'Library Reading Session',
      category: 'academic',
      date: 'Apr 5, 2024',
      description: 'Students participating in reading week activities',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 78,
      views: 345
    },
    {
      id: 6,
      type: 'video',
      title: 'Music Concert',
      category: 'cultural',
      date: 'Dec 15, 2023',
      description: 'Winter music festival performances',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 167,
      views: 654
    },
    {
      id: 7,
      type: 'image',
      title: 'Sports Day',
      category: 'sports',
      date: 'Feb 28, 2024',
      description: 'Annual sports day competitions',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 142,
      views: 678
    },
    {
      id: 8,
      type: 'image',
      title: 'Campus Garden',
      category: 'campus',
      date: 'May 12, 2024',
      description: 'Student-maintained campus garden',
      image: 'https://images.unsplash.com/photo-1541979667479-339a9c826894?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 95,
      views: 412
    },
    {
      id: 9,
      type: 'video',
      title: 'Debate Competition',
      category: 'academic',
      date: 'Mar 22, 2024',
      description: 'Inter-school debate championship finals',
      image: 'https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 113,
      views: 523
    },
    {
      id: 10,
      type: 'image',
      title: 'Robotics Workshop',
      category: 'academic',
      date: 'Apr 18, 2024',
      description: 'Students learning robotics programming',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 134,
      views: 589
    },
    {
      id: 11,
      type: 'image',
      title: 'School Festival',
      category: 'events',
      date: 'Nov 5, 2023',
      description: 'Annual school festival celebrations',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 178,
      views: 765
    },
    {
      id: 12,
      type: 'video',
      title: 'Dance Competition',
      category: 'cultural',
      date: 'Jan 18, 2024',
      description: 'Inter-house dance competition finals',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      likes: 192,
      views: 834
    }
  ];

  const featuredAlbums = [
    {
      id: 1,
      title: 'Annual Day 2023',
      cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      count: 145,
      date: 'Nov 20, 2023'
    },
    {
      id: 2,
      title: 'Sports Championship',
      cover: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      count: 89,
      date: 'Feb 28, 2024'
    },
    {
      id: 3,
      title: 'Science Fair 2024',
      cover: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      count: 112,
      date: 'Feb 15, 2024'
    },
    {
      id: 4,
      title: 'Art Exhibition',
      cover: 'https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      count: 76,
      date: 'Mar 10, 2024'
    }
  ];

  const filteredMedia = activeCategory === 'all' 
    ? galleryMedia 
    : galleryMedia.filter(media => media.category === activeCategory);

  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateLightbox = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (lightboxIndex + 1) % filteredMedia.length;
    } else {
      newIndex = (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length;
    }
    setLightboxIndex(newIndex);
    setSelectedMedia(filteredMedia[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Gallery</h1>
            <p className="text-xl mb-6 text-gray-200">
              Capturing memories, achievements, and moments that define our school community
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Camera className="mr-2 h-5 w-5" />
                View Photos
              </button>
              <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Video className="mr-2 h-5 w-5" />
                Watch Videos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {galleryCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div className="flex bg-white rounded-lg p-1 border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Albums</h2>
            <button className="text-green-600 hover:text-green-700 font-medium flex items-center">
              View all albums <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlbums.map(album => (
              <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium">
                      View Album
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">{album.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{album.count} photos</span>
                    <span>{album.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Photos & Videos</h2>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((media, index) => (
                <div 
                  key={media.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openLightbox(media, index)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={media.image}
                      alt={media.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" fill="white" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {media.type === 'video' ? 'Video' : 'Photo'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">{media.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{media.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {media.likes}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {media.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMedia.map((media, index) => (
                <div 
                  key={media.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex"
                  onClick={() => openLightbox(media, index)}
                >
                  <div className="w-1/3 relative">
                    <img
                      src={media.image}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div className="w-2/3 p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{media.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{media.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {media.likes}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {media.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredMedia.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600">No media found</h3>
              <p className="text-gray-500">Try selecting a different category or search term</p>
            </div>
          )}

          {filteredMedia.length > 0 && (
            <div className="flex justify-center mt-12">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>

          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-4xl w-full max-h-full">
            <div className="relative">
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <div className="relative aspect-video bg-black">
                  <img
                    src={selectedMedia.image}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" fill="white" />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-b-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedMedia.title}</h3>
              <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedMedia.date}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    School Campus
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-gray-500 hover:text-green-600">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-green-600">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-green-600">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Gallery by Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                5K+
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Photos</h3>
              <p className="text-gray-600 text-sm">Memories captured</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                250+
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Videos</h3>
              <p className="text-gray-600 text-sm">Moments recorded</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                120+
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Events</h3>
              <p className="text-gray-600 text-sm">Activities documented</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                15K+
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Views</h3>
              <p className="text-gray-600 text-sm">Gallery engagements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your School Memories</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Have photos or videos from school events? Share them with our community!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Submit Photos
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Request Photos
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Eye icon component since it's not in lucide-react
const Eye = ({ className = "h-4 w-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default GalleryPage;