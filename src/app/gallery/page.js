"use client";
import React, { useState, useEffect } from 'react';
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
  Play,
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  List,
  ArrowRight,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

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
  TrendingUp,
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
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff
};

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState('albums');
  const [activeCategory, setActiveCategory] = useState('events');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [role, setRole] = useState(null); // Will be derived from stored user

  useEffect(() => {
    const initRole = async () => {
      try {
        const raw = localStorage.getItem('ecareUser') || sessionStorage.getItem('ecareUser');
        if (!raw) { setRole(null); return; }
        let parsed;
        try { parsed = JSON.parse(raw); } catch (e) { setRole(null); return; }
        if (parsed && parsed.encrypted) {
          try {
            const decrypted = await decryptObject(parsed);
            const user = decrypted?.user || decrypted;
            setRole(user?.role || null);
            return;
          } catch (e) {
            console.warn('Failed to decrypt stored ecareUser', e);
            setRole(null);
            return;
          }
        }
        const user = parsed.user || parsed;
        setRole(user?.role || null);
      } catch (err) {
        console.warn('Failed to read stored user for role detection', err);
        setRole(null);
      }
    };
    initRole();
  }, []);

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    tabs: 'showTabs',
    albums: 'showAlbums',
    gallery: 'showGallery',
    statistics: 'showStatistics',
    cta: 'showCta',
    labels: 'showLabels'
  };

  // Section display names for the visibility modal
  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showBenefits: 'Benefits Section', 
    showTabs: 'Tabs Navigation',
    showAlbums: 'Albums Tab',
    showGallery: 'Gallery Tab',
    showStatistics: 'Statistics Tab',
    showCta: 'CTA Section',
    showLabels: 'Labels'
  };

  // Default data structure - Updated hero to match council page
  const defaultData = {
    showHero: true,
    showBenefits: true,
    showTabs: true,
    showAlbums: true,
    showGallery: true,
    showStatistics: true,
    showCta: true,
    showLabels: true,
    hero: {
      show: true,
      title: "School Gallery 2024-2025",
      subtitle: "Capturing Memories, Celebrating Moments, Building Legacy",
      height: "h-96",
      showImage: true,
      backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { value: "5K+", label: "Photos", show: true },
        { value: "250+", label: "Videos", show: true },
        { value: "120+", label: "Events", show: true }
      ],
      ctaButton: {
        label: "Explore Gallery",
        link: "#",
        show: true
      }
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
        { id: "gallery", name: "Recent Media", icon: "Camera", show: true },
        { id: "statistics", name: "Statistics", icon: "TrendingUp", show: true },
        { id: "cta", name: "Get Involved", icon: "Heart", show: true }
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
          category: 'events',
          date: 'Nov 20, 2023',
          description: 'Students performing at the annual cultural festival',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 124,
          views: 568,
          show: true
        },
        {
          type: 'image',
          title: 'Basketball Championship Finals',
          category: 'sports',
          date: 'Feb 28, 2024',
          description: 'Intense moments from the school basketball championship finals',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 89,
          views: 342,
          show: true
        },
        {
          type: 'image',
          title: 'Athletics Meet 2024',
          category: 'sports',
          date: 'Mar 15, 2024',
          description: 'Students competing in various track and field events',
          image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 67,
          views: 289,
          show: true
        },
        {
          type: 'image',
          title: 'Science Laboratory Research',
          category: 'academic',
          date: 'Jan 25, 2024',
          description: 'Students conducting experiments in the science laboratory',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 92,
          views: 415,
          show: true
        },
        {
          type: 'image',
          title: 'Mathematics Olympiad Winners',
          category: 'academic',
          date: 'Feb 10, 2024',
          description: 'Celebrating our mathematics olympiad champions',
          image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 78,
          views: 321,
          show: true
        },
        {
          type: 'image',
          title: 'Library Reading Session',
          category: 'academic',
          date: 'Mar 5, 2024',
          description: 'Students engaged in focused reading sessions at the school library',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 56,
          views: 234,
          show: true
        },
        {
          type: 'video',
          title: 'Cultural Dance Performance',
          category: 'cultural',
          date: 'Nov 20, 2023',
          description: 'Traditional dance performance during annual day celebrations',
          image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 145,
          views: 623,
          show: true
        },
        {
          type: 'image',
          title: 'Campus Garden Project',
          category: 'campus',
          date: 'Mar 20, 2024',
          description: 'Students working on the campus garden beautification project',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
          likes: 43,
          views: 187,
          show: true
        }
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
        { text: "Submit Photos", show: true },
        { text: "Request Access", show: true }
      ]
    },
    labels: {
      show: true,
      bio: "Bio",
      responsibilities: "Responsibilities",
      achievements: "Achievements"
    }
  };

  // Check role
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_gallery_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data (raw):', fetchedData);
          try {
            if (fetchedData && fetchedData.encrypted) {
              fetchedData = await decryptObject(fetchedData);
            } else if (typeof fetchedData === 'string') {
              fetchedData = JSON.parse(fetchedData);
            }
          } catch (err) {
            console.warn('Failed to decrypt/parse fetched gallery data, using raw:', err);
            try {
              fetchedData = JSON.parse(fetchedData);
            } catch (e) {
              // leave fetchedData as-is
            }
          }
          setData({ ...defaultData, ...fetchedData });
        } else {
          console.log('No data or invalid response, using default');
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(item => item.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredAlbums = data.albums?.items?.filter(album => album.show !== false) || [];
  const filteredCategories = data.gallery?.categories?.filter(cat => cat.show !== false) || [];
  const filteredMedia = data.gallery?.items?.filter(media => media.show !== false) || [];
  const filteredStatistics = data.statistics?.items?.filter(item => item.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredHeroStats = data.hero?.stats?.filter(stat => stat.show !== false) || [];

  const filteredGalleryMedia = filteredMedia.filter(media => media.category === activeCategory);

  // Generic handlers
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const parts = arrayKey.split('.');
      let current = updated;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      
      const arr = current[parts[parts.length - 1]] || [];
      const newArray = [...arr];
      
      if (field === arrayKey && typeof value === 'string') {
        newArray[index] = value.includes('\n') ? value.split('\n').map(s => s.trim()).filter(Boolean) : value;
      } else {
        const currentItem = newArray[index] || {};
        if (field === 'responsibilities' || field === 'achievements' || field === 'ways' || field === 'content') {
          currentItem[field] = value.split(',').map(i => i.trim()).filter(i => i);
        } else {
          currentItem[field] = value;
        }
        newArray[index] = currentItem;
      }
      
      current[parts[parts.length - 1]] = newArray;
      return updated;
    });
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setEditData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  // Toggle section visibility
  const toggleSectionVisibility = (sectionKey) => {
    setData(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Save all section visibility
  const saveSectionVisibility = async () => {
    try {
      const payload = await encryptObject(data);
      await apiRequest('save_data/save_gallery_data', { payload });
      console.log('Section visibility saved successfully (encrypted payload sent)');
    } catch (error) {
      console.error('Save failed', error);
    }
    setSectionVisibilityModal(false);
  };

  // Item Editor Component
  const ItemEditor = (arrayKey, fields = [], isStringArray = false, options = {}) => {
    const getNested = (obj, path) => {
      const parts = path.split('.');
      let cur = obj;
      for (let p of parts) {
        if (cur == null) return undefined;
        cur = cur[p];
      }
      return cur;
    };

    const allowFileUpload = options.allowFileUpload !== false;

    const items = getNested(editData, arrayKey) || [];
    
    const removeItem = (index) => {
      const newItems = items.filter((_, i) => i !== index);
      setEditData(prev => {
        const updated = { ...prev };
        const parts = arrayKey.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = newItems;
        return updated;
      });
    };

    const addItem = () => {
      const newItem = isStringArray ? '' : (options.defaultItem || { show: true });
      setEditData(prev => {
        const updated = { ...prev };
        const parts = arrayKey.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const arr = cur[parts[parts.length - 1]] || [];
        cur[parts[parts.length - 1]] = [...arr, newItem];
        return updated;
      });
    };

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Item {index + 1}</h4>
              <button onClick={() => removeItem(index)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {isStringArray ? (
              <textarea 
                value={item || ''} 
                onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} 
                placeholder="Enter items, one per line or comma separated" 
                className="w-full p-2 border rounded mb-2" 
                rows="4" 
              />
            ) : (
              fields.filter(field => field !== 'id').map(field => (
                field === 'icon' ? (
                  <select 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select Icon</option>
                    {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                  </select>
                ) : field === 'image' || field === 'cover' || field === 'backgroundImage' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium">Image URL</label>
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} className="w-full" />
                  </div>
                ) : (
                  <input 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    placeholder={field} 
                    className="w-full p-2 border rounded mb-2" 
                  />
                )
              ))
            )}
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={item.show !== false} 
                onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} 
              />
              <span>Show Item</span>
            </label>
          </div>
        ))}
        {options.allowAdd !== false && (
          <button onClick={addItem} className="flex items-center text-green-600">
            <Plus className="h-4 w-4 mr-2" /> Add New Item
          </button>
        )}
      </div>
    );
  };

  // Modal Header Component
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    
    const layoutKey = layoutMap[section];
    let sectionData = { 
      showSection: data[layoutKey],
      ...data[section]
    };
    console.log(`Opening ${section} modal with data:`, sectionData);
    setEditData(JSON.parse(JSON.stringify(sectionData)));
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Save section
  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
    
    console.log('Saving section:', editSection, 'with data:', updatedData);
    
    const layoutKey = layoutMap[editSection];
    newData[layoutKey] = updatedData.showSection;
    const sectionContent = { ...updatedData };
    delete sectionContent.showSection;
    newData[editSection] = { ...newData[editSection], ...sectionContent };
    
    setData(newData);
    try {
        const payload = await encryptObject(newData);
        await apiRequest('save_data/save_gallery_data', { payload });
        console.log('Data saved successfully (encrypted payload sent)');
    } catch (error) {
      console.error('Save failed', error);
    }
    setEditFormOpen(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditData(originalData);
    setEditFormOpen(false);
  };

  // Lightbox functions
  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const navigateLightbox = (direction) => {
    let newIndex = direction === 'next' 
      ? (lightboxIndex + 1) % filteredGalleryMedia.length 
      : (lightboxIndex - 1 + filteredGalleryMedia.length) % filteredGalleryMedia.length;
    setLightboxIndex(newIndex);
    setSelectedMedia(filteredGalleryMedia[newIndex]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <p className="text-gray-600 mb-6">
                  Toggle sections on or off to control what visitors see on the gallery page.
                </p>
                
                {Object.keys(sectionDisplayNames).map(sectionKey => (
                  <div key={sectionKey} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {data[sectionKey] ? (
                        <Eye className="h-5 w-5 text-green-600" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{sectionDisplayNames[sectionKey]}</h3>
                        <p className="text-sm text-gray-500">
                          {data[sectionKey] ? 'Visible to visitors' : 'Hidden from visitors'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(sectionKey)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        data[sectionKey] ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          data[sectionKey] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <ModalFooter 
              onCancel={() => setSectionVisibilityModal(false)} 
              onSave={saveSectionVisibility} 
            />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={`Edit ${editSection}`} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={editData.showSection || false} 
                    onChange={(e) => handleObjectChange('showSection', e.target.checked)} 
                  />
                  <span>Show Section</span>
                </label>
              </div>
              
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <label className="block text-sm font-medium">Background Image</label>
                    <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full mb-2" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                      <span>Show Background Image</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">CTA Button</label>
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                  </div>

                  {ItemEditor('stats', ['value', 'label'])}
                </div>
              )}
              
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}
              
              {/* Tabs section - allow name and icon editing but not adding/removing tabs and hide ID field */}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 mb-4">
                    Note: You can edit tab names and icons, but cannot add or remove tabs. Tab IDs are fixed to ensure functionality.
                  </div>
                  {editData.items?.map((tab, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">Tab {index + 1}</h4>
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tab ID (Fixed)</label>
                        <input 
                          value={tab.id || ''} 
                          disabled
                          className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Tab ID cannot be changed to maintain functionality</p>
                      </div>
                      <input 
                        value={tab.name || ''} 
                        onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} 
                        placeholder="Tab Name" 
                        className="w-full p-2 border rounded mb-2" 
                      />
                      <select 
                        value={tab.icon || ''} 
                        onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} 
                        className="w-full p-2 border rounded mb-2"
                      >
                        <option value="">Select Icon</option>
                        {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                      </select>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={tab.show !== false} 
                          onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} 
                        />
                        <span>Show {tab.name} Tab</span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              
              {editSection === 'albums' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['title', 'cover', 'count', 'date'])}
                </div>
              )}
              
              {editSection === 'gallery' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <label className="block text-sm font-medium">Categories</label>
                    {ItemEditor('categories', ['id', 'name'])}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium">Media Items</label>
                    {ItemEditor('items', ['type', 'title', 'category', 'date', 'description', 'image', 'likes', 'views'])}
                  </div>
                </div>
              )}
              
              {editSection === 'statistics' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['value', 'label', 'description'])}
                </div>
              )}
              
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text'], false, { allowFileUpload: false })}
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section - Updated to match council page */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden ${editMode ? 'pr-12' : ''}`}>
          {/* Background image placed first so overlay sits above it */}
          {data.hero.showImage && data.hero.backgroundImage && (
            <img
              src={data.hero.backgroundImage}
              alt="Gallery Background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          {/* Dark overlay on top of image to control opacity and improve text contrast (match other pages) */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center z-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl mb-8 leading-relaxed">{data.hero.subtitle}</p>
              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-6 mb-8">
                  {filteredHeroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.hero.ctaButton?.show !== false && (
                <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  {data.hero.ctaButton.label}
                  <Users className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow z-30"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Benefits Section */}
      {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
        <section className={`py-16 bg-gray-50 relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
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
          {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Navigation - Updated to match council page style */}
      {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
        <section className={`relative py-4 bg-white z-10 shadow-sm border-b border-gray-200 ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="overflow-x-auto">
              <div className="flex">
                {filteredTabs.map((tab) => {
                  const IconComponent = iconMap[tab.icon];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex items-center px-4 py-4 border-b-2 font-medium transition-all duration-200 ease-in-out whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className={`h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Content */}
      {data.showTabs && (
        <section className={`py-16 bg-white relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            {/* Albums Tab */}
            {activeTab === 'albums' && data.showAlbums && data.albums?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.albums.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.albums.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredAlbums.map((album, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img src={album.cover} alt={album.title} className="w-full h-48 object-cover rounded-md mb-4" />
                      <h4 className="font-semibold text-gray-800 mb-2">{album.title}</h4>
                      <p className="text-sm text-gray-600">{album.count} items • {album.date}</p>
                    </div>
                  ))}
                </div>
                {editMode && <button onClick={() => openEditModal('albums')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && data.showGallery && data.gallery?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.gallery.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.gallery.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {filteredCategories.map(category => (
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
                    {filteredGalleryMedia.map((media, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-300" onClick={() => openLightbox(media, index)}>
                        <img src={media.image} alt={media.title} className="w-full h-48 object-cover rounded-md mb-2" />
                        <h5 className="font-semibold text-gray-800">{media.title}</h5>
                        <p className="text-sm text-gray-600">{media.description}</p>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>{media.likes} likes</span>
                          <span>{media.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredGalleryMedia.map((media, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow duration-300" onClick={() => openLightbox(media, index)}>
                        <img src={media.image} alt={media.title} className="w-32 h-32 object-cover rounded-md mr-4" />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800">{media.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">{media.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{media.date}</span>
                            <span>{media.likes} likes • {media.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {editMode && <button onClick={() => openEditModal('gallery')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && data.showStatistics && data.statistics?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.statistics.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.statistics.subtitle}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredStatistics.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-4xl font-bold text-green-600 mb-2">{stat.value}</h4>
                      <p className="font-semibold text-gray-800 mb-1">{stat.label}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                  ))}
                </div>
                {editMode && <button onClick={() => openEditModal('statistics')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
              </div>
            )}

            {/* CTA Tab */}
            {activeTab === 'cta' && data.showCta && data.cta?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.cta.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.cta.subtitle}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {filteredCtaButtons.map((button, index) => (
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
                {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
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
            <p className="text-white/80 mt-2">{selectedMedia.description}</p>
          </div>
        </div>
      )}

      {/* Global Edit Button - Now opens Section Visibility Modal */}
      {editMode && (
        <button 
          onClick={() => setSectionVisibilityModal(true)} 
          className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          <Edit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default GalleryPage;