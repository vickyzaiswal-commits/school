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
  Award,
  Vote,
  Megaphone,
  Lightbulb,
  BookOpen,
  Clock,
  Mail,
  FileText,
  Shield,
  Star,
  Trophy,
  TrendingUp,
  Activity,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  List,
  ArrowRight
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const galleryData = {
  hero: {
    show: true,
    title: "School Gallery",
    subtitle: "Leadership, Service, and Representation for the Student Body",
    buttonText: "Meet Your Representatives",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Student Council"
  },
  benefits: {
    show: true,
    title: "Role of the Gallery",
    subtitle: "The gallery serves as the visual memory of the school and plays a vital role in preserving moments",
    items: [
      {
        icon: "Users",
        title: "Memory Preservation",
        description: "Capturing important school events and activities",
        show: true
      },
      {
        icon: "Megaphone",
        title: "Community Engagement",
        description: "Sharing school life with parents and alumni",
        show: true
      },
      {
        icon: "Heart",
        title: "Student Showcase",
        description: "Highlighting student achievements and talents",
        show: true
      },
      {
        icon: "Lightbulb",
        title: "Inspiration Hub",
        description: "Motivating current and future students",
        show: true
      }
    ]
  },
  tabs: {
    show: true,
    items: [
      { id: "albums", name: "Featured Albums", icon: "Users", show: true },
      { id: "gallery", name: "Recent Media", icon: "Vote", show: true },
      { id: "statistics", name: "Statistics", icon: "Lightbulb", show: true },
      { id: "cta", name: "Get Involved", icon: "Trophy", show: true }
    ]
  },
  albums: {
    show: true,
    title: "Featured Albums",
    subtitle: "Explore our highlighted collections of school moments",
    items: [
      {
        title: "Annual Day 2023",
        cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        count: 145,
        date: "Nov 20, 2023",
        show: true
      },
      {
        title: "Sports Championship",
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        count: 89,
        date: "Feb 28, 2024",
        show: true
      },
      {
        title: "Science Fair 2024",
        cover: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        count: 112,
        date: "Feb 15, 2024",
        show: true
      },
      {
        title: "Art Exhibition",
        cover: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        count: 76,
        date: "Mar 10, 2024",
        show: true
      }
    ]
  },
  gallery: {
    show: true,
    title: "Recent Photos & Videos",
    subtitle: "Latest captures from school events and activities",
    categories: [
      { id: 'all', name: 'All Media', show: true },
      { id: 'events', name: 'School Events', show: true },
      { id: 'sports', name: 'Sports', show: true },
      { id: 'academic', name: 'Academic', show: true },
      { id: 'cultural', name: 'Cultural', show: true },
      { id: 'campus', name: 'Campus Life', show: true }
    ],
    items: [
      {
        type: 'image',
        title: 'Annual Day Performance',
        category: 'cultural',
        date: 'Nov 20, 2023',
        description: 'Students performing at the annual cultural festival',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        likes: 124,
        views: 568,
        show: true
      },
      // ... (add other items similarly)
    ]
  },
  statistics: {
    show: true,
    title: "Gallery Statistics",
    subtitle: "Our visual journey in numbers",
    items: [
      { value: "5K+", label: "Photos", description: "Captured moments", show: true },
      { value: "250+", label: "Videos", description: "Recorded events", show: true },
      { value: "120+", label: "Events", description: "Documented activities", show: true },
      { value: "15K+", label: "Views", description: "Community engagements", show: true }
    ]
  },
  cta: {
    show: true,
    title: "Share Your Moments",
    subtitle: "Contribute to our school gallery",
    buttons: [
      { text: "Submit Photos", style: "primary", show: true },
      { text: "Request Access", style: "secondary", show: true }
    ]
  },
  labels: {
    show: true,
    bio: "Bio",
    responsibilities: "Responsibilities",
    achievements: "Achievements"
  }
};

// Map string icon names to Lucide React components
const iconMap = {
  Users,
  Award,
  Calendar,
  Vote,
  Megaphone,
  Lightbulb,
  BookOpen,
  Heart,
  Clock,
  Mail,
  Download,
  ChevronRight,
  FileText,
  MapPin,
  Shield,
  Star,
  Trophy,
  Activity,
  Camera,
  Video,
  Search,
  Filter,
  Share2,
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  List,
  ArrowRight,
  TrendingUp
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState(galleryData.tabs.items[0].id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredMedia = activeCategory === 'all' 
    ? galleryData.gallery.items.filter(media => media.show !== false)
    : galleryData.gallery.items.filter(media => media.show !== false && media.category === activeCategory);

  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateLightbox = (direction) => {
    let newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredMedia.length 
      : (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setLightboxIndex(newIndex);
    setSelectedMedia(filteredMedia[newIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {galleryData.hero.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* <img
            src={galleryData.hero.image}
            alt={galleryData.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          /> */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{galleryData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{galleryData.hero.subtitle}</p>
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{galleryData.hero.buttonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {galleryData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{galleryData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{galleryData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryData.benefits.items.filter(item => item.show !== false).map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tab Navigation */}
      {galleryData.tabs.show && (
        <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {galleryData.tabs.items.filter(tab => tab.show !== false).map((tab) => {
                const IconComponent = iconMap[tab.icon];
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tab Content */}
      {galleryData.tabs.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Albums Tab */}
            {activeTab === 'albums' && galleryData.albums.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{galleryData.albums.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{galleryData.albums.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {galleryData.albums.items.filter(album => album.show !== false).map((album, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md">
                      <img src={album.cover} alt={album.title} className="w-full h-48 object-cover rounded-md mb-4" />
                      <h4 className="font-semibold text-gray-800 mb-2">{album.title}</h4>
                      <p className="text-sm text-gray-600">{album.count} items • {album.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && galleryData.gallery.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{galleryData.gallery.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{galleryData.gallery.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {galleryData.gallery.categories.filter(cat => cat.show !== false).map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeCategory === category.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white text-green-600' : 'text-gray-600'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white text-green-600' : 'text-gray-600'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedia.map((media, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4" onClick={() => openLightbox(media, index)}>
                        <img src={media.image} alt={media.title} className="w-full h-48 object-cover rounded-md mb-2" />
                        <h5 className="font-semibold text-gray-800">{media.title}</h5>
                        <p className="text-sm text-gray-600">{media.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMedia.map((media, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center" onClick={() => openLightbox(media, index)}>
                        <img src={media.image} alt={media.title} className="w-32 h-32 object-cover rounded-md mr-4" />
                        <div>
                          <h5 className="font-semibold text-gray-800">{media.title}</h5>
                          <p className="text-sm text-gray-600">{media.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && galleryData.statistics.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{galleryData.statistics.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{galleryData.statistics.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {galleryData.statistics.items.filter(item => item.show !== false).map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                      <h4 className="text-4xl font-bold text-green-600 mb-2">{stat.value}</h4>
                      <p className="font-semibold text-gray-800 mb-1">{stat.label}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Tab */}
            {activeTab === 'cta' && galleryData.cta.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{galleryData.cta.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{galleryData.cta.subtitle}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {galleryData.cta.buttons.filter(button => button.show !== false).map((button, index) => (
                    <button
                      key={index}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                        button.style === 'primary' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white text-green-700 border border-green-600 hover:bg-green-50'
                      }`}
                    >
                      {button.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white">
            <X className="h-8 w-8" />
          </button>
          <button onClick={() => navigateLightbox('prev')} className="absolute left-4 text-white">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button onClick={() => navigateLightbox('next')} className="absolute right-4 text-white">
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="max-w-4xl w-full p-4">
            <img src={selectedMedia.image} alt={selectedMedia.title} className="w-full rounded-lg" />
            <h3 className="text-white text-xl mt-4">{selectedMedia.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;