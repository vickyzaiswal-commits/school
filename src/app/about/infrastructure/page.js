"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Wifi,
  Shield,
  TreePine,
  Car,
  Utensils,
  BookOpen,
  Microscope,
  Monitor,
  Palette,
  Music,
  Dumbbell,
  HeartPulse,
  Building,
  Library,
  FlaskRound,
  Computer,
  GraduationCap,
  Users,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

const InfrastructurePage = ({ schoolData = {} }) => {
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
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

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      title: "Campus Infrastructure",
      subtitle: "State-of-the-art facilities designed to inspire learning and growth",
      height: "h-96"
    },
    introduction: {
      show: true,
      title: "World-Class Learning Environment",
      description: "Our school boasts a sprawling campus with modern infrastructure that provides students with an ideal environment for academic excellence and holistic development.",
      stats: [
        { icon: "Building", value: "10-acre", label: "Spacious Campus", description: "Dedicated areas for academics, sports, and arts", show: true },
        { icon: "Users", value: "2,000+", label: "Student Capacity", description: "Optimal teacher-student ratio", show: true },
        { icon: "GraduationCap", value: "60+", label: "Modern Classrooms", description: "Smart classrooms with digital learning tools", show: true }
      ]
    },
    facilityCategories: [
      { id: 'all', name: 'All Facilities', icon: "Building", show: true },
      { id: 'academic', name: 'Academic', icon: "BookOpen", show: true },
      { id: 'science', name: 'Science Labs', icon: "Microscope", show: true },
      { id: 'technology', name: 'Technology', icon: "Computer", show: true },
      { id: 'sports', name: 'Sports', icon: "Dumbbell", show: true },
      { id: 'arts', name: 'Arts & Culture', icon: "Palette", show: true },
    ],
    facilities: [
      {
        id: 1,
        title: "Smart Classrooms",
        description: "Digitally equipped classrooms with interactive whiteboards, projectors, and audio-visual learning aids.",
        image: "https://images.unsplash.com/photo-1588072432836-4b4f2ca5fdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "academic",
        features: ["Interactive Whiteboards", "Digital Projectors", "Audio Systems", "Climate Controlled"],
        show: true
      },
      {
        id: 2,
        title: "Science Laboratories",
        description: "Well-equipped physics, chemistry and biology laboratories for practical experimentation and learning.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "science",
        features: ["Modern Equipment", "Safety Systems", "Demonstration Areas", "Research Resources"],
        show: true
      },
      {
        id: 3,
        title: "Computer Labs",
        description: "State-of-the-art computer laboratories with high-speed internet and latest software resources.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "technology",
        features: ["High-Speed Computers", "Programming Software", "Internet Access", "IT Support"],
        show: true
      },
      {
        id: 4,
        title: "Library & Resource Center",
        description: "Spacious library with vast collection of books, periodicals, and digital learning resources.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
        category: "academic",
        features: ["Extensive Collection", "Reading Areas", "Digital Resources", "Research Assistance"],
        show: true
      },
      {
        id: 5,
        title: "Sports Complex",
        description: "Comprehensive sports facilities including indoor and outdoor arenas for various sports activities.",
        image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "sports",
        features: ["Basketball Court", "Football Field", "Cricket Ground", "Indoor Games"],
        show: true
      },
      {
        id: 6,
        title: "Auditorium",
        description: "Modern auditorium with seating capacity of 500+ for events, performances, and assemblies.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
        category: "arts",
        features: ["Sound System", "Lighting", "Stage", "Green Rooms"],
        show: true
      }
    ],
    campusFeatures: [
      {
        icon: "Shield",
        title: "Security",
        description: "24/7 security with CCTV surveillance, access control, and trained security personnel",
        show: true
      },
      {
        icon: "TreePine",
        title: "Green Campus",
        description: "Eco-friendly campus with lush greenery, rainwater harvesting, and waste management systems",
        show: true
      },
      {
        icon: "Wifi",
        title: "Wi-Fi Enabled",
        description: "Complete campus Wi-Fi coverage with controlled access for educational purposes",
        show: true
      },
      {
        icon: "Car",
        title: "Ample Parking",
        description: "Spacious parking facilities for staff, visitors, and school buses",
        show: true
      },
      {
        icon: "Utensils",
        title: "Cafeteria",
        description: "Hygienic cafeteria serving nutritious meals and snacks for students and staff",
        show: true
      },
      {
        icon: "HeartPulse",
        title: "Health & Safety",
        description: "Regular safety drills, fire safety systems, and comprehensive health policies",
        show: true
      }
    ],
    virtualTour: {
      show: true,
      title: "Experience Our Campus Virtually",
      description: "Can't visit in person? Take our virtual tour to explore our facilities from anywhere in the world.",
      primaryCta: "Start Virtual Tour",
      secondaryCta: "Schedule Campus Visit"
    },
    contactInfo: {
      show: true,
      title: "Plan Your Visit",
      address: "1, Ashok Place, Birgunj - 110001, India",
      hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM\n(Prior appointment recommended)",
      phone: "011 2336 3462\n011 2336 3134",
      email: "infrastructure@stcolumbas.edu.in",
      mapTitle: "Campus Location",
      mapDescription: "Find our campus easily using the interactive map below.",
      googleMapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.774530832456!2d77.20685231508316!3d28.63264498241683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1647851558805!5m2!1sen!2sin",
      mapDownloadLink: "/campus-map.pdf"
    },
    showHero: true,
    showIntroduction: true,
    showFacilities: true,
    showCampusFeatures: true,
    showVirtualTour: true,
    showContact: true
  };

  // Icon mapping for rendering
  const iconMap = {
    MapPin,
    Clock,
    Phone,
    Mail,
    ExternalLink,
    ChevronRight,
    ArrowRight,
    Wifi,
    Shield,
    TreePine,
    Car,
    Utensils,
    BookOpen,
    Microscope,
    Monitor,
    Palette,
    Music,
    Dumbbell,
    HeartPulse,
    Building,
    Library,
    FlaskRound,
    Computer,
    GraduationCap,
    Users
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    introduction: 'showIntroduction',
    facilities: 'showFacilities',
    campusFeatures: 'showCampusFeatures',
    virtualTour: 'showVirtualTour',
    contactInfo: 'showContact'
  };

  // Initialize data with default
  const [data, setData] = useState({ ...defaultData, ...schoolData });

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
      setPreviewMode(false);
    }
  }, [role]);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_infrastructure_data', {});
       
        if (res.status == 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedRaw = res.data[0]?.Data || {};

          let fetchedData = fetchedRaw;
          if (typeof fetchedRaw === 'string' || (fetchedRaw && typeof fetchedRaw === 'object' && fetchedRaw.encrypted)) {
            const decrypted = await decryptObject(fetchedRaw);
            if (decrypted) fetchedData = decrypted;
            else {
              try {
                fetchedData = JSON.parse(fetchedRaw);
              } catch (e) {
                console.warn('Failed to parse fetchedRaw as JSON and decryption failed');
                fetchedData = {};
              }
            }
          }

          setData({ ...defaultData, ...fetchedData });
        } else {
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      }
    };
 
    fetchData();
  }, []);

  // IntersectionObserver for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setPreviewMode(false);
    setEditFormOpen(true);
    const layoutKey = layoutMap[section];
    let sectionData;
    if (Array.isArray(data[section])) {
      sectionData = { 
        showSection: data[layoutKey],
        [section]: JSON.parse(JSON.stringify(data[section]))
      };
    } else {
      sectionData = { 
        showSection: data[layoutKey],
        ...JSON.parse(JSON.stringify(data[section]))
      };
    }
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (object arrays)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    if (Array.isArray(updated[nestedKey])) {
      updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    }
    setEditData(updated);
  };

  // Handle change for string arrays inside nested objects
  const handleStringArrayChange = (arrayKey, index, sIndex, value) => {
    const updated = { ...editData };
    if (!updated[arrayKey]) updated[arrayKey] = [];
    const updatedArray = [...updated[arrayKey][index].features || []];
    updatedArray[sIndex] = value;
    updated[arrayKey][index] = { ...updated[arrayKey][index], features: updatedArray };
    setEditData(updated);
  };

  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const layoutKey = layoutMap[editSection];
      let updatedData = { ...data };
      if ('showSection' in editData) {
        updatedData[layoutKey] = editData.showSection;
      }
      const { showSection, ...sectionUpdates } = editData;
      updatedData[editSection] = sectionUpdates[editSection] || sectionUpdates;

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };


      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_infrastructure', { payload: encryptedPayload });

      if (save_data?.status === 200) {
        setData(updatedData);
      } else {
        console.error('Save failed:', save_data);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Cancel changes
  const cancelChanges = () => {
    if (originalData) {
      setEditData(originalData);
    }
    setEditFormOpen(false);
    setPreviewMode(false);
    setOriginalData(null);
  };

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Filter functions
  const filteredFacilities = (data.facilities || []).filter(facility => facility.show !== false);
  const filteredCampusFeatures = (data.campusFeatures || []).filter(feature => feature.show !== false);
  const filteredIntroductionStats = (data.introduction?.stats || []).filter(stat => stat.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Section visibility helpers
  const sectionDisplayNames = {
    hero: 'Hero',
    introduction: 'Introduction',
    facilities: 'Facilities',
    campusFeatures: 'Campus Features',
    virtualTour: 'Virtual Tour',
    contactInfo: 'Contact Info'
  };

  const getDataValue = (key) => {
    const layoutKey = layoutMap[key];
    if (layoutKey) return data[layoutKey] !== false;
    if (data[key] && typeof data[key] === 'object' && 'show' in data[key]) return data[key].show !== false;
    if (Array.isArray(data[key])) return data[key].some((t) => t && t.show !== false);
    return true;
  };

  const toggleSectionVisibility = (key) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const layoutKey = layoutMap[key];
      const current = layoutKey ? copy[layoutKey] : (Array.isArray(copy[key]) ? copy[key].some(i => i && i.show !== false) : (copy[key]?.show !== false));
      const newVal = !current;
      if (layoutKey) {
        copy[layoutKey] = newVal;
      }

      if (key === 'facilities' && Array.isArray(copy.facilities)) {
        copy.facilities = copy.facilities.map((f) => ({ ...(f || {}), show: newVal }));
      } else if (key === 'campusFeatures' && Array.isArray(copy.campusFeatures)) {
        copy.campusFeatures = copy.campusFeatures.map((f) => ({ ...(f || {}), show: newVal }));
      } else if (Array.isArray(copy[key])) {
        copy[key] = copy[key].map((t) => ({ ...(t || {}), show: newVal }));
      } else if (copy[key] && typeof copy[key] === 'object' && 'show' in copy[key]) {
        copy[key].show = newVal;
      } else {
        copy[key] = { ...(copy[key] || {}), show: newVal };
      }

      return copy;
    });
  };

  // Keep top-level layout flags in sync with individual arrays
  useEffect(() => {
    const anyFacilityShown = Array.isArray(data.facilities) ? data.facilities.some((f) => f && f.show !== false) : false;
    if ((data.showFacilities || false) !== anyFacilityShown) {
      setData((prev) => ({ ...prev, showFacilities: anyFacilityShown }));
    }

    const anyCampusShown = Array.isArray(data.campusFeatures) ? data.campusFeatures.some((f) => f && f.show !== false) : false;
    if ((data.showCampusFeatures || false) !== anyCampusShown) {
      setData((prev) => ({ ...prev, showCampusFeatures: anyCampusShown }));
    }
  }, [data.facilities, data.campusFeatures]);

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      // encrypt payload before sending
      const encrypted = await encryptObject(payload);
      const res = await apiRequest('save_data/save_infrastructure', { payload: encrypted });
      if (res.status === 200) {
        setSectionVisibilityModal(false);
      } else {
        console.error('Save failed', res);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  // Render icon component
  const renderIcon = (iconName, className = "h-6 w-6 text-green-600") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Modal Footer Component
  const ModalFooter = () => (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex space-x-2">
        <button
          onClick={cancelChanges}
          className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1"
        >
          <Ban className="h-4 w-4" />
          <span>Cancel</span>
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={togglePreview}
          className="px-3 py-2 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
        <button
          onClick={saveChanges}
          className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button
                onClick={cancelChanges}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea
                      value={editData.subtitle || ''}
                      onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  
                </div>
              )}
              {editSection === 'introduction' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Introduction</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={stat.icon || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Building"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Value</label>
                          <input
                            type="text"
                            value={stat.value || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'value', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={stat.description || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={stat.show !== false}
                              onChange={(e) => handleNestedArrayChange('stats', index, 'show', e.target.checked)}
                            />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'facilities' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Facilities</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Facilities</h3>
                  {(editData.facilities || []).map((facility, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Facility {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">ID</label>
                          <input
                            type="text"
                            value={facility.id || ''}
                            onChange={(e) => handleNestedArrayChange('facilities', index, 'id', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={facility.title || ''}
                            onChange={(e) => handleNestedArrayChange('facilities', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={facility.description || ''}
                            onChange={(e) => handleNestedArrayChange('facilities', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Upload Facility Image</label>
                          <FileUpload
                            currentUrl={facility.image || ''}
                            onUploadSuccess={(url) => handleNestedArrayChange('facilities', index, 'image', url)}
                            label={`Facility ${index + 1} Image`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Category</label>
                          <input
                            type="text"
                            value={facility.category || ''}
                            onChange={(e) => handleNestedArrayChange('facilities', index, 'category', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={facility.show !== false}
                              onChange={(e) => handleNestedArrayChange('facilities', index, 'show', e.target.checked)}
                            />
                            <span>Show Facility</span>
                          </label>
                        </div>
                        <h5 className="text-md font-semibold mt-4 mb-2">Features</h5>
                        {(facility.features || []).map((feature, fIndex) => (
                          <div key={fIndex} className="mb-2 p-2 border rounded">
                            <input
                              type="text"
                              value={feature || ''}
                              onChange={(e) => handleStringArrayChange('facilities', index, fIndex, e.target.value)}
                              className="w-full p-1 border rounded"
                              placeholder={`Feature ${fIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'campusFeatures' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Campus Features</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Campus Features</h3>
                  {(editData.campusFeatures || []).map((feature, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Feature {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={feature.icon || ''}
                            onChange={(e) => handleNestedArrayChange('campusFeatures', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Shield"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={feature.title || ''}
                            onChange={(e) => handleNestedArrayChange('campusFeatures', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={feature.description || ''}
                            onChange={(e) => handleNestedArrayChange('campusFeatures', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={feature.show !== false}
                              onChange={(e) => handleNestedArrayChange('campusFeatures', index, 'show', e.target.checked)}
                            />
                            <span>Show Feature</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'virtualTour' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Virtual Tour</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Primary CTA</label>
                    <input
                      type="text"
                      value={editData.primaryCta || ''}
                      onChange={(e) => handleObjectChange('primaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Secondary CTA</label>
                    <input
                      type="text"
                      value={editData.secondaryCta || ''}
                      onChange={(e) => handleObjectChange('secondaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}
              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Contact Info</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                      value={editData.address || ''}
                      onChange={(e) => handleObjectChange('address', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Hours</label>
                    <textarea
                      value={editData.hours || ''}
                      onChange={(e) => handleObjectChange('hours', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <textarea
                      value={editData.phone || ''}
                      onChange={(e) => handleObjectChange('phone', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="text"
                      value={editData.email || ''}
                      onChange={(e) => handleObjectChange('email', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Map Title</label>
                    <input
                      type="text"
                      value={editData.mapTitle || ''}
                      onChange={(e) => handleObjectChange('mapTitle', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Map Description</label>
                    <textarea
                      value={editData.mapDescription || ''}
                      onChange={(e) => handleObjectChange('mapDescription', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Google Maps Embed Link</label>
                    <textarea
                      value={editData.googleMapsLink || ''}
                      onChange={(e) => handleObjectChange('googleMapsLink', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                      placeholder="Paste Google Maps embed iframe src URL here"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Map Download Link</label>
                    <input
                      type="text"
                      value={editData.mapDownloadLink || ''}
                      onChange={(e) => handleObjectChange('mapDownloadLink', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="/campus-map.pdf"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}
      {/* Manage Section Visibility Floating Button */}
      {editMode && (
        <>
          <button
            onClick={() => setSectionVisibilityModal(true)}
            title="Manage Section Visibility"
            className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
          >
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-2xl m-4 flex flex-col max-h-[90vh]">
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Manage Section Visibility</h3>
                  <button onClick={() => setSectionVisibilityModal(false)} className="p-2 text-gray-600 hover:text-gray-800">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                  <div className="space-y-3">
                    {Object.entries(sectionDisplayNames).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between border border-gray-100 rounded p-3">
                        <div className="text-sm font-medium text-gray-800">{label}</div>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!getDataValue(key)}
                            onChange={() => toggleSectionVisibility(key)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => setSectionVisibilityModal(false)}
                    className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSectionVisibility}
                    className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hero Section */}
      {data.showHero && safeData('hero').show && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Introduction */}
      {data.showIntroduction && safeData('introduction').show && (
        <section
          id="introduction"
          className={`py-16 bg-white animate-on-scroll ${isVisible.introduction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('introduction').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{safeData('introduction').description}</p>
            </div>

            {filteredIntroductionStats.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredIntroductionStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      {renderIcon(stat.icon, "h-8 w-8 text-green-600")}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.value} {stat.label}</h3>
                    <p className="text-gray-600">{stat.description}</p>
                  </div>
                ))}
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('introduction')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Facilities Gallery */}
      {data.showFacilities && filteredFacilities.length > 0 && (
        <section
          id="facilities"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.facilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
              <p className="text-lg text-gray-600">Explore our comprehensive range of facilities designed to support every aspect of student development</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFacilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden relative">
                        <Image
                          src={facility.image}
                          alt={facility.title || 'Facility Image'}
                          className="object-cover transition-transform hover:scale-105 duration-500"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.title}</h3>
                    <p className="text-gray-600 mb-4">{facility.description}</p>
                    
                    {facility.features && facility.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {facility.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('facilities')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Campus Features */}
      {data.showCampusFeatures && filteredCampusFeatures.length > 0 && (
        <section
          id="campusFeatures"
          className={`py-16 bg-white animate-on-scroll ${isVisible.campusFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Amenities</h2>
              <p className="text-lg text-gray-600">Our campus is designed with student safety, comfort, and learning in mind</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampusFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(feature.icon, "h-6 w-6 text-green-600")}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('campusFeatures')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Virtual Tour */}
      {data.showVirtualTour && safeData('virtualTour').show && (
        <section
          id="virtualTour"
          className={`py-16 bg-gradient-to-r from-green-800 to-green-600 text-white animate-on-scroll ${isVisible.virtualTour ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">{safeData('virtualTour').title}</h2>
              <p className="text-lg text-green-100 mb-8 leading-relaxed">{safeData('virtualTour').description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center justify-center">
                  {safeData('virtualTour').primaryCta}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  {safeData('virtualTour').secondaryCta}
                </button>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('virtualTour')}
                className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded-full hover:bg-green-50"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Contact Information */}
      {data.showContact && safeData('contactInfo').show && (
        <section
          id="contactInfo"
          className={`py-16 bg-white animate-on-scroll ${isVisible.contactInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{safeData('contactInfo').title}</h2>
                
                <div className="space-y-6">
                  <div className="flex">
                    <MapPin className="h-6 w-6 text-green-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').address}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-6 w-6 text-green-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Visiting Hours</h3>
                      <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').hours}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Phone className="h-6 w-6 text-green-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Mail className="h-6 w-6 text-green-600 mt-1 mr-4" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">{safeData('contactInfo').email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{safeData('contactInfo').mapTitle}</h3>
                <p className="text-gray-600 mb-4">{safeData('contactInfo').mapDescription}</p>
                
                {/* Google Maps Iframe */}
                <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                  {safeData('contactInfo').googleMapsLink ? (
                    <iframe
                      src={safeData('contactInfo').googleMapsLink}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Campus Location Map"
                      className="w-full"
                    ></iframe>
                  ) : (
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Map not available</span>
                    </div>
                  )}
                </div>
                
                {/* <a 
                  href={safeData('contactInfo').mapDownloadLink || "#"} 
                  className="text-green-600 hover:text-green-700 font-medium flex items-center"
                >
                  Download Campus Map (PDF)
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a> */}
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('contactInfo')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default InfrastructurePage;