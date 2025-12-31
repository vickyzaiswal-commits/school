"use client";
import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Award,
  Users,
  BookOpen,
  Building2,
  Heart,
  Star,
  Trophy,
  GraduationCap,
  Clock,
  MapPin,
  ArrowRight,
  Lightbulb,
  Globe,
  Target,
  Shield,
  Camera,
  FileText,
  User,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Spinner from '@components/Spinner/Spinner';

const OurHistoryPage = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [role, setRole] = useState(null); // Will be derived from stored user

  // Initialize role from stored `ecareUser` (localStorage or sessionStorage)
  useEffect(() => {
    const initRole = async () => {
      try {
        const raw = localStorage.getItem('ecareUser') || sessionStorage.getItem('ecareUser');
        if (!raw) {
          setRole(null);
          return;
        }

        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          // Not JSON — can't parse
          setRole(null);
          return;
        }

        // If it's an encrypted wrapper, attempt to decrypt
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

        // Otherwise parsed is likely the user object or a wrapper with `user`
        const user = parsed.user || parsed;
        setRole(user?.role || null);
      } catch (err) {
        console.warn('Failed to read stored user for role detection', err);
        setRole(null);
      }
    };

    initRole();
  }, []);

  // Default data structure
  const defaultData = {
    hero: {
      title: "Our Rich Heritage",
      subtitle: "Nearly a century of educational excellence, rooted in Edmund Rice values and committed to nurturing generations of compassionate leaders.",
      stats: [
        { value: "97+", label: "Years of Excellence", show: true },
        { value: "10,000+", label: "Alumni Worldwide", show: true },
        { value: "2,000+", label: "Current Students", show: true }
      ],
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true
    },
    edmundRiceValues: {
      title: "Edmund Rice Legacy",
      description: "Our school is built on the educational philosophy of Blessed Edmund Rice, who dedicated his life to providing quality education to young people, especially those from disadvantaged backgrounds.",
      values: [
        {
          icon: "Heart",
          title: "Compassion",
          description: "Teaching students to care for others and show empathy in all relationships",
          show: true
        },
        {
          icon: "Shield",
          title: "Justice",
          description: "Promoting fairness, equality, and standing up for what is right",
          show: true
        },
        {
          icon: "Users",
          title: "Respect",
          description: "Honoring the dignity of every person regardless of background or circumstances",
          show: true
        },
        {
          icon: "BookOpen",
          title: "Liberation",
          description: "Empowering students through education to achieve their full potential",
          show: true
        }
      ]
    },
    timeline: {
      title: "Journey Through Time",
      description: "Explore the key milestones and transformative moments that have shaped our institution into what it is today.",
      events: [
        {
          year: "1927",
          title: "Foundation Years",
          subtitle: "The Beginning of Excellence",
          description: "Our school was established as part of the educational mission to provide quality education grounded in strong values.",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Founded with strong values",
            "First batch of students",
            "Original campus established",
            "Educational philosophy established"
          ],
          show: true
        },
        {
          year: "1930s-1940s",
          title: "Growth & Recognition",
          subtitle: "Building Foundations",
          description: "The school gained recognition for its academic excellence and character formation during challenging times.",
          image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Government recognition received",
            "Expansion of academic programs",
            "First sports achievements",
            "Community service initiatives"
          ],
          show: true
        },
        {
          year: "1950s-1960s",
          title: "Post-Independence Era",
          subtitle: "Serving New India",
          description: "As India gained independence, our school played a crucial role in educating the leaders of tomorrow.",
          image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Adapted to Indian education system",
            "Increased enrollment significantly",
            "New facilities built",
            "Alumni network establishment"
          ],
          show: true
        },
        {
          year: "2010s-Present",
          title: "Contemporary Excellence",
          subtitle: "Leading Educational Innovation",
          description: "Today, our school stands as a beacon of educational excellence, combining traditional values with modern pedagogy.",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Quality certifications",
            "Green school initiatives",
            "Advanced educational programs",
            "Global citizenship focus"
          ],
          show: true
        }
      ]
    },
    milestones: {
      title: "Historic Milestones",
      description: "Key achievements and pivotal moments that define our journey of excellence.",
      items: [
        { year: "1927", event: "School Founded", icon: "Building2", show: true },
        { year: "1935", event: "First Graduation", icon: "GraduationCap", show: true },
        { year: "1947", event: "Post-Independence Growth", icon: "Globe", show: true },
        { year: "1960", event: "500+ Students", icon: "Users", show: true },
        { year: "1975", event: "Modern Facilities", icon: "Lightbulb", show: true },
        { year: "1990", event: "Technology Integration", icon: "Target", show: true },
        { year: "2010", event: "Quality Certification", icon: "Award", show: true },
        { year: "2024", event: "97 Years of Excellence", icon: "Star", show: true }
      ]
    },
    achievements: {
      title: "Our Achievements",
      description: "Recognition and accomplishments that reflect our commitment to excellence across academics, sports, and community service.",
      categories: [
        {
          category: "Academic Excellence",
          items: [
            "100% Board Pass Rate for consecutive years",
            "Top schools in the region",
            "National level competition winners",
            "Inter-school debate champions"
          ],
          show: true
        },
        {
          category: "Sports & Activities",
          items: [
            "Multiple inter-school championships",
            "National level athletes produced",
            "Cultural fest winners",
            "Student conference hosts"
          ],
          show: true
        },
        {
          category: "Infrastructure",
          items: [
            "State-of-the-art laboratories",
            "Extensive library collection",
            "Modern sports facilities",
            "Large capacity auditorium"
          ],
          show: true
        }
      ]
    },
    quote: {
      text: "The mind once enlightened cannot again become dark.",
      author: "Blessed Edmund Rice",
      role: "Founder of Christian Brothers Education"
    },
    callToAction: {
      title: "Continue Our Legacy",
      description: "Join our family and become part of our continuing story of excellence, values, and service to humanity.",
      buttons: [
        { label: "Apply for Admission", icon: "FileText", link: "/admissions", show: true },
        { label: "Take Virtual Tour", icon: "Camera", link: "/virtual-tour", show: true }
      ]
    },
    layout: {
      showHero: true,
      showValues: true,
      showTimeline: true,
      showMilestones: true,
      showAchievements: true,
      showQuote: true,
      showCTA: true
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    Heart,
    Shield,
    Users,
    BookOpen,
    Building2,
    GraduationCap,
    Globe,
    Lightbulb,
    Target,
    Award,
    Star,
    Trophy,
    FileText,
    Camera,
    Clock,
    MapPin,
    ArrowRight
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    edmundRiceValues: 'showValues',
    timeline: 'showTimeline',
    milestones: 'showMilestones',
    achievements: 'showAchievements',
    quote: 'showQuote',
    callToAction: 'showCTA'
  };

  // Initialize data with default
  const [data, setData] = useState(defaultData);

  // Manage Section Visibility modal state
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

  const sectionDisplayNames = {
    hero: 'Hero',
    edmundRiceValues: 'Edmund Rice Values',
    timeline: 'Timeline',
    milestones: 'Milestones',
    achievements: 'Achievements',
    quote: 'Quote',
    callToAction: 'Call To Action'
  };

  // Encryption helpers are moved to `src/utils/encryption.js` and imported above.

  const getDataValue = (key) => {
    const layoutKey = layoutMap[key];
    if (layoutKey && data.layout && typeof data.layout[layoutKey] !== 'undefined') {
      return !!data.layout[layoutKey];
    }

    const section = data[key];
    if (!section) return false;
    if (Array.isArray(section)) return section.some(item => item.show !== false);
    if (typeof section === 'object') return section.show !== false || Object.values(section).some(v => Array.isArray(v) ? v.some(i => i.show !== false) : false);
    return false;
  };

  const toggleSectionVisibility = (key) => {
    const copy = JSON.parse(JSON.stringify(data));
    const layoutKey = layoutMap[key];
    const current = getDataValue(key);
    const newVal = !current;

    if (layoutKey) {
      if (!copy.layout) copy.layout = {};
      copy.layout[layoutKey] = newVal;
    }

    // Update per-item/show flags where applicable
    if (copy[key] && Array.isArray(copy[key].events)) {
      // timeline.events
      copy[key].events = copy[key].events.map(e => ({ ...e, show: newVal }));
    } else if (copy[key] && Array.isArray(copy[key].items)) {
      // milestones.items
      copy[key].items = copy[key].items.map(i => ({ ...i, show: newVal }));
    } else if (copy[key] && Array.isArray(copy[key].categories)) {
      // achievements.categories
      copy[key].categories = copy[key].categories.map(c => ({ ...c, show: newVal }));
    } else if (copy[key] && Array.isArray(copy[key].stats)) {
      // hero.stats
      copy[key].stats = copy[key].stats.map(s => ({ ...s, show: newVal }));
    } else if (copy[key] && Array.isArray(copy[key])) {
      copy[key] = copy[key].map(item => ({ ...item, show: newVal }));
    } else if (copy[key] && typeof copy[key] === 'object') {
      copy[key].show = newVal;
    }

    setData(copy);
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      // Encrypt payload before sending
      const encrypted = await encryptObject(payload);
      const res = await apiRequest('save_data/save_history', { payload: encrypted });
      if (res?.status === 200) {
        setSectionVisibilityModal(false);
      } else {
        console.error('Save failed', res);
      }
    } catch (err) {
      console.error('Save error', err);
    }
  };

  // Keep layout flags in sync with nested items
  useEffect(() => {
    const copy = JSON.parse(JSON.stringify(data));
    let changed = false;

    // timeline
    if (copy.timeline && Array.isArray(copy.timeline.events)) {
      const any = copy.timeline.events.some(e => e.show !== false);
      if (copy.layout && typeof copy.layout.showTimeline !== 'undefined' && copy.layout.showTimeline !== any) {
        copy.layout.showTimeline = any;
        changed = true;
      }
    }

    // milestones
    if (copy.milestones && Array.isArray(copy.milestones.items)) {
      const any = copy.milestones.items.some(i => i.show !== false);
      if (copy.layout && typeof copy.layout.showMilestones !== 'undefined' && copy.layout.showMilestones !== any) {
        copy.layout.showMilestones = any;
        changed = true;
      }
    }

    // achievements
    if (copy.achievements && Array.isArray(copy.achievements.categories)) {
      const any = copy.achievements.categories.some(c => c.show !== false);
      if (copy.layout && typeof copy.layout.showAchievements !== 'undefined' && copy.layout.showAchievements !== any) {
        copy.layout.showAchievements = any;
        changed = true;
      }
    }

    if (changed) setData(copy);
  }, [data.timeline?.events, data.milestones?.items, data.achievements?.categories]);

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
        const res = await apiRequest('save_data/get_all_history_data', {});
       
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const fetchedRaw = res.data[0]?.Data || {};
          

          let fetchedData = fetchedRaw;
          // If server sent encrypted wrapper (object or JSON string), attempt to decrypt
          if (typeof fetchedRaw === 'string' || (fetchedRaw && typeof fetchedRaw === 'object' && fetchedRaw.encrypted)) {
            const decrypted = await decryptObject(fetchedRaw);
            if (decrypted) {
              fetchedData = decrypted;
            } else {
              // If decryption failed but server returned a JSON string, try parsing
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
    const sectionData = { 
      ...data[section], 
      showSection: data.layout[layoutKey] 
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for array items
  const handleArrayChange = (arrayKey, index, field, value) => {
    const updatedArray = [...(editData[arrayKey] || [])];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setEditData(prev => ({ ...prev, [arrayKey]: updatedArray }));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (e.g., hero.stats, timeline.events.highlights)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for nested array of strings (e.g., achievements.categories.items)
  const handleNestedStringArrayChange = (nestedKey, index, itemIndex, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey] || !updated[nestedKey][index] || !updated[nestedKey][index].items) {
      return;
    }
    updated[nestedKey][index].items[itemIndex] = value;
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
      if (layoutKey && 'showSection' in editData) {
        updatedData.layout[layoutKey] = editData.showSection;
      }
      const { showSection, ...sectionUpdates } = editData;
      updatedData[editSection] = { ...data[editSection], ...sectionUpdates };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      

      // Encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_history', { payload: encryptedPayload });
      

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

  // Filter functions - provide defaults if sections missing
  const filteredHeroStats = (data.hero?.stats || []).filter(stat => stat.show !== false);
  const filteredValues = (data.edmundRiceValues?.values || []).filter(value => value.show !== false);
  const filteredTimelineEvents = (data.timeline?.events || []).filter(event => event.show !== false);
  const filteredMilestones = (data.milestones?.items || []).filter(item => item.show !== false);
  const filteredAchievementCategories = (data.achievements?.categories || []).filter(cat => cat.show !== false);
  const filteredCTAButtons = (data.callToAction?.buttons || []).filter(button => button.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Render icon component
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4" /> : <Globe className="h-4 w-4" />;
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
          className="px-3 py-2 text-sm text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center space-x-1"
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
                      <span>Show Hero Section</span>
                    </label>
                  </div>
                  {/* Established year removed */}
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
                  <div>
                    <label className="block text-sm font-medium mb-1">Or Upload Background Image</label>
                    <FileUpload
                      currentUrl={editData.backgroundImage || ''}
                      onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)}
                      label="Hero Background Image"
                    />
                    <div className="mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editData.backgroundImageShow !== false}
                          onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)}
                        />
                        <span>Show Background Image</span>
                      </label>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-4 border p-2 rounded bg-white">
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
                  ))}
                </div>
              )}
              {editSection === 'edmundRiceValues' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Values Section</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Values</h3>
                  {(editData.values || []).map((value, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Value {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={value.icon || ''}
                            onChange={(e) => handleArrayChange('values', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Heart"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={value.title || ''}
                            onChange={(e) => handleArrayChange('values', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={value.description || ''}
                            onChange={(e) => handleArrayChange('values', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={value.show !== false}
                              onChange={(e) => handleArrayChange('values', index, 'show', e.target.checked)}
                            />
                            <span>Show Value</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'timeline' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Timeline Section</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Events</h3>
                  {(editData.events || []).map((event, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Event {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Year</label>
                          <input
                            type="text"
                            value={event.year || ''}
                            onChange={(e) => handleArrayChange('events', index, 'year', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={event.title || ''}
                            onChange={(e) => handleArrayChange('events', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Subtitle</label>
                          <input
                            type="text"
                            value={event.subtitle || ''}
                            onChange={(e) => handleArrayChange('events', index, 'subtitle', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={event.description || ''}
                            onChange={(e) => handleArrayChange('events', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image URL</label>
                          <input
                            type="text"
                            value={event.image || ''}
                            onChange={(e) => handleArrayChange('events', index, 'image', e.target.value)}
                            className="w-full p-2 border rounded mb-2"
                          />
                          <label className="block text-sm font-medium mb-1">Or Upload Image</label>
                          <FileUpload
                            currentUrl={event.image || ''}
                            onUploadSuccess={(url) => handleArrayChange('events', index, 'image', url)}
                            label="Event Image"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={event.show !== false}
                              onChange={(e) => handleArrayChange('events', index, 'show', e.target.checked)}
                            />
                            <span>Show Event</span>
                          </label>
                        </div>
                        <h5 className="text-sm font-semibold mt-4 mb-2">Highlights</h5>
                        {(event.highlights || []).map((highlight, hIndex) => (
                          <div key={hIndex} className="mb-2">
                            <label className="block text-sm font-medium">Highlight {hIndex + 1}</label>
                            <input
                              type="text"
                              value={highlight || ''}
                              onChange={(e) => {
                                const updatedEvents = [...(editData.events || [])];
                                if (!updatedEvents[index].highlights) updatedEvents[index].highlights = [];
                                updatedEvents[index].highlights[hIndex] = e.target.value;
                                setEditData({ ...editData, events: updatedEvents });
                              }}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'milestones' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Milestones Section</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Milestone {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Year</label>
                          <input
                            type="text"
                            value={item.year || ''}
                            onChange={(e) => handleArrayChange('items', index, 'year', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Event</label>
                          <input
                            type="text"
                            value={item.event || ''}
                            onChange={(e) => handleArrayChange('items', index, 'event', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Building2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Milestone</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'achievements' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Achievements Section</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Categories</h3>
                  {(editData.categories || []).map((category, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Category {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Category Name</label>
                          <input
                            type="text"
                            value={category.category || ''}
                            onChange={(e) => handleArrayChange('categories', index, 'category', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={category.show !== false}
                              onChange={(e) => handleArrayChange('categories', index, 'show', e.target.checked)}
                            />
                            <span>Show Category</span>
                          </label>
                        </div>
                        <h5 className="text-sm font-semibold mt-4 mb-2">Items</h5>
                        {(category.items || []).map((item, itemIndex) => (
                          <div key={itemIndex} className="mb-2">
                            <label className="block text-sm font-medium">Item {itemIndex + 1}</label>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => handleNestedStringArrayChange('categories', index, itemIndex, e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'quote' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Quote Section</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <textarea
                      value={editData.text || ''}
                      onChange={(e) => handleObjectChange('text', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Author</label>
                    <input
                      type="text"
                      value={editData.author || ''}
                      onChange={(e) => handleObjectChange('author', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input
                      type="text"
                      value={editData.role || ''}
                      onChange={(e) => handleObjectChange('role', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}
              {editSection === 'callToAction' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show CTA Section</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                  {(editData.buttons || []).map((button, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Button {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={button.label || ''}
                            onChange={(e) => handleArrayChange('buttons', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Link</label>
                          <input
                            type="text"
                            value={button.link || ''}
                            onChange={(e) => handleArrayChange('buttons', index, 'link', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={button.icon || ''}
                            onChange={(e) => handleArrayChange('buttons', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. FileText"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={button.show !== false}
                              onChange={(e) => handleArrayChange('buttons', index, 'show', e.target.checked)}
                            />
                            <span>Show Button</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && filteredHeroStats.length > 0 && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {data.hero?.backgroundImageShow !== false && data.hero?.backgroundImage && (
            <img src={data.hero.backgroundImage} alt="history-hero" className="absolute inset-0 w-full h-full object-cover" />
          )}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              {/* established year removed from hero */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                {safeData('hero').subtitle}
              </p>
              <div className="flex flex-wrap gap-6">
                {filteredHeroStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-sm text-green-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-white/80 text-green-800 p-2 rounded-full hover:bg-white"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Edmund Rice Legacy */}
      {data.layout?.showValues && filteredValues.length > 0 && (
        <section
          id="values"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('edmundRiceValues').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('edmundRiceValues').description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredValues.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {renderIcon(value.icon)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('edmundRiceValues')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {data.layout?.showTimeline && filteredTimelineEvents.length > 0 && (
        <section
          id="timeline"
          className={`py-16 bg-white animate-on-scroll ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('timeline').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('timeline').description}
              </p>
            </div>
            <div className="flex justify-center mb-12 overflow-x-auto">
              <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg">
                {filteredTimelineEvents.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 whitespace-nowrap ${
                      activeTimeline === index
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    {event.year}
                  </button>
                ))}
              </div>
            </div>
            {filteredTimelineEvents.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-green-50 inline-block px-3 py-1 rounded-full mb-4">
                    <span className="text-green-700 font-semibold text-sm">
                      {filteredTimelineEvents[activeTimeline]?.year}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {filteredTimelineEvents[activeTimeline]?.title}
                  </h3>
                  <p className="text-lg text-green-600 mb-4 font-medium">
                    {filteredTimelineEvents[activeTimeline]?.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {filteredTimelineEvents[activeTimeline]?.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Highlights:</h4>
                    {(filteredTimelineEvents[activeTimeline]?.highlights || []).map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-green-600 rounded-full p-1">
                          <ArrowRight className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={filteredTimelineEvents[activeTimeline]?.image || ''}
                      alt={filteredTimelineEvents[activeTimeline]?.title || ''}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('timeline')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Milestones */}
      {data.layout?.showMilestones && filteredMilestones.length > 0 && (
        <section
          id="milestones"
          className={`py-16 bg-gradient-to-br from-green-700 to-green-800 text-white animate-on-scroll ${isVisible.milestones ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{safeData('milestones').title}</h2>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                {safeData('milestones').description}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <div className="bg-yellow-400 rounded-full w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                    {renderIcon(milestone.icon)}
                  </div>
                  <div className="text-xl font-bold text-yellow-400 mb-1">{milestone.year}</div>
                  <div className="text-sm text-white">{milestone.event}</div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('milestones')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.layout?.showAchievements && filteredAchievementCategories.length > 0 && (
        <section
          id="achievements"
          className={`py-16 bg-white animate-on-scroll ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('achievements').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('achievements').description}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredAchievementCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {(category.items || []).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <Trophy className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('achievements')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Legacy Quote */}
      {data.layout?.showQuote && (
        <section
          id="quote"
          className={`py-16 bg-gray-900 text-white animate-on-scroll ${isVisible.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <blockquote className="text-2xl font-light leading-relaxed mb-6 italic">
              "{safeData('quote').text}"
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">{safeData('quote').author}</h4>
                <p className="text-gray-300 text-sm">{safeData('quote').role}</p>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('quote')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      {data.layout?.showCTA && filteredCTAButtons.length > 0 && (
        <section
          id="callToAction"
          className={`py-16 bg-gradient-to-r from-green-600 to-green-700 text-white animate-on-scroll ${isVisible.callToAction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{safeData('callToAction').title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              {safeData('callToAction').description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {filteredCTAButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {renderIcon(button.icon)}
                  <span>{button.label}</span>
                </a>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('callToAction')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}
      {/* Manage Section Visibility Floating Button & Modal */}
      {editMode && (
        <>
          <button
            onClick={() => setSectionVisibilityModal(true)}
            className="fixed right-6 bottom-6 bg-white/90 text-green-700 p-3 rounded-full shadow-lg hover:shadow-2xl flex items-center space-x-2 z-50"
            title="Manage Sections"
          >
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[70vh]">
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Manage Section Visibility</h3>
                  <button onClick={() => setSectionVisibilityModal(false)} className="p-1 text-gray-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto flex-1 max-h-[70vh] space-y-3">
                  {Object.keys(sectionDisplayNames).map((key) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="text-sm text-gray-800">{sectionDisplayNames[key]}</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={getDataValue(key)}
                          onChange={() => toggleSectionVisibility(key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t flex justify-end space-x-2">
                  <button
                    onClick={() => setSectionVisibilityModal(false)}
                    className="px-3 py-2 bg-white border rounded text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSectionVisibility}
                    className="px-3 py-2 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OurHistoryPage;