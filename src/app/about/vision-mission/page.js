"use client";
import React, { useState, useEffect } from 'react';
import { 
  Target,
  Compass,
  Heart,
  BookOpen,
  Users,
  Globe,
  Star,
  Lightbulb,
  Shield,
  Award,
  ArrowRight,
  CheckCircle,
  Eye,
  Mountain,
  User,
  FileText,
  Camera,
  Crown,
  Handshake,
  GraduationCap,
  Phone,
  ExternalLink,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const VisionMissionPage = () => {
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
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Vision & Mission",
      subtitle: "Guided by Edmund Rice values for nearly a century",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true
    },
    vision: {
      show: true,
      title: "Our Vision",
      quote: "To be a beacon of educational excellence, nurturing compassionate leaders who transform communities through knowledge, service, and unwavering commitment to justice.",
      points: [
        {
          icon: "Crown",
          title: "Academic Excellence",
          description: "To be recognized as a premier educational institution setting the highest standards in academic achievement.",
          show: true
        },
        {
          icon: "Heart",
          title: "Character Formation",
          description: "Develop individuals of integrity, compassion, and moral courage who contribute positively to society.",
          show: true
        },
        {
          icon: "Globe",
          title: "Global Citizens",
          description: "Nurture students who think globally, act locally, and embrace diversity in an interconnected world.",
          show: true
        },
        {
          icon: "Lightbulb",
          title: "Innovation & Leadership",
          description: "Foster creative thinking, entrepreneurial spirit, and ethical leadership in all students.",
          show: true
        }
      ]
    },
    mission: {
      show: true,
      title: "Our Mission",
      description: "To provide holistic education rooted in Edmund Rice values, fostering academic excellence, character formation, and global citizenship in a nurturing, inclusive community that empowers students to serve humanity with distinction.",
      pillars: [
        {
          icon: "BookOpen",
          title: "Quality Education",
          description: "Comprehensive, innovative education that challenges students intellectually and prepares them for higher learning.",
          show: true
        },
        {
          icon: "Users",
          title: "Inclusive Community",
          description: "A welcoming, diverse environment where every student feels valued and empowered to reach their potential.",
          show: true
        },
        {
          icon: "Shield",
          title: "Edmund Rice Values",
          description: "Core values of compassion, justice, respect, and liberation through daily practices and education.",
          show: true
        },
        {
          icon: "Star",
          title: "Holistic Development",
          description: "Nurture intellectual, emotional, physical, social, and spiritual growth through comprehensive programs.",
          show: true
        }
      ]
    },
    coreValues: {
      show: true,
      title: "Core Values",
      description: "The foundational principles that guide every aspect of our educational mission.",
      values: [
        {
          icon: "Heart",
          title: "Compassion",
          description: "Teaching empathy, kindness, and care for others in all relationships.",
          show: true
        },
        {
          icon: "Shield",
          title: "Justice",
          description: "Promoting fairness, equality, and courage to stand up for what is right.",
          show: true
        },
        {
          icon: "Users",
          title: "Respect",
          description: "Honoring the dignity of every individual and celebrating diversity.",
          show: true
        },
        {
          icon: "Award",
          title: "Excellence",
          description: "Striving for the highest standards in all endeavors and continuous improvement.",
          show: true
        }
      ]
    },
    callToAction: {
      show: true,
      title: "Join Our Educational Community",
      description: "Experience education that combines academic excellence with strong values and character formation.",
      buttons: [
        { label: "Apply for Admission", icon: "FileText", link: "/admissions", show: true },
        { label: "Take Virtual Tour", icon: "Camera", link: "/virtual-tour", show: true }
      ]
    },
    layout: {
      showHero: true,
      showVision: true,
      showMission: true,
      showCoreValues: true,
      showCTA: true
    },
    titles: {
      vision: {
        title: "Our Vision"
      },
      mission: {
        title: "Our Mission"
      },
      coreValues: {
        title: "Core Values"
      },
      callToAction: {
        title: "Join Our Educational Community"
      }
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    Target,
    Compass,
    Heart,
    BookOpen,
    Users,
    Globe,
    Star,
    Lightbulb,
    Shield,
    Award,
    ArrowRight,
    CheckCircle,
    Eye,
    Mountain,
    User,
    FileText,
    Camera,
    Crown,
    Handshake,
    GraduationCap,
    Phone,
    ExternalLink
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    vision: 'showVision',
    mission: 'showMission',
    coreValues: 'showCoreValues',
    callToAction: 'showCTA'
  };

  // Titles key mapping
  const titlesMap = {
    vision: 'vision',
    mission: 'mission',
    coreValues: 'coreValues',
    callToAction: 'callToAction'
  };

  // Initialize data with default
  const [data, setData] = useState(defaultData);

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
          const res = await apiRequest('save_data/get_all_vision_mission_data', {});
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
    const titlesKey = titlesMap[section];
    const sectionData = { 
      showSection: data.layout[layoutKey],
      ...data[section],
      ...(section === 'callToAction' && { buttons: [...data.callToAction.buttons] }),
      ...(titlesKey && { title: data.titles[titlesKey].title })
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (e.g., vision.points, mission.pillars)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for buttons array
  const handleButtonChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.buttons) updated.buttons = [];
    updated.buttons[index] = { ...updated.buttons[index], [field]: value };
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
      const titlesKey = titlesMap[editSection];
      if (titlesKey && 'title' in editData) {
        updatedData.titles[titlesKey] = {
          ...data.titles[titlesKey],
          title: editData.title
        };
      }
      const { showSection, ...temp } = editData;
      let sectionUpdates = { ...temp };
      if (titlesKey) {
        delete sectionUpdates.title;
      }
      updatedData[editSection] = { ...data[editSection], ...sectionUpdates };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_vision_mission', { payload: encryptedPayload });
      
      if (save_data.status === 200) {
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
  const filteredVisionPoints = (data.vision?.points || []).filter(point => point.show !== false);
  const filteredMissionPillars = (data.mission?.pillars || []).filter(pillar => pillar.show !== false);
  const filteredCoreValues = (data.coreValues?.values || []).filter(value => value.show !== false);
  const filteredCTAButtons = (data.callToAction?.buttons || []).filter(button => button.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Section visibility helpers
  const sectionDisplayNames = {
    hero: 'Hero',
    vision: 'Vision',
    mission: 'Mission',
    coreValues: 'Core Values',
    callToAction: 'Call To Action'
  };

  const getDataValue = (key) => {
    const layoutKey = layoutMap[key];
    if (layoutKey) return data.layout?.[layoutKey] !== false;
    if (data[key] && typeof data[key] === 'object' && 'show' in data[key]) return data[key].show !== false;
    if (Array.isArray(data[key])) return data[key].some((t) => t && t.show !== false);
    return true;
  };

  const toggleSectionVisibility = (key) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const layoutKey = layoutMap[key];
      const current = layoutKey ? (copy.layout?.[layoutKey] !== false) : (Array.isArray(copy[key]) ? copy[key].some(i => i && i.show !== false) : (copy[key]?.show !== false));
      const newVal = !current;
      if (layoutKey) {
        copy.layout = { ...(copy.layout || {}), [layoutKey]: newVal };
      }

      if (Array.isArray(copy[key])) {
        copy[key] = copy[key].map((t) => ({ ...(t || {}), show: newVal }));
      } else if (copy[key] && typeof copy[key] === 'object' && 'show' in copy[key]) {
        copy[key].show = newVal;
      } else {
        copy[key] = { ...(copy[key] || {}), show: newVal };
      }

      return copy;
    });
  };

  // Keep layout flags in sync with arrays/objects
  useEffect(() => {
    const anyVision = Array.isArray(data.vision?.points) ? data.vision.points.some(p => p && p.show !== false) : false;
    if ((data.layout?.showVision || false) !== anyVision) {
      setData((prev) => ({ ...prev, layout: { ...(prev.layout || {}), showVision: anyVision } }));
    }

    const anyMission = Array.isArray(data.mission?.pillars) ? data.mission.pillars.some(p => p && p.show !== false) : false;
    if ((data.layout?.showMission || false) !== anyMission) {
      setData((prev) => ({ ...prev, layout: { ...(prev.layout || {}), showMission: anyMission } }));
    }

    const anyCore = Array.isArray(data.coreValues?.values) ? data.coreValues.values.some(v => v && v.show !== false) : false;
    if ((data.layout?.showCoreValues || false) !== anyCore) {
      setData((prev) => ({ ...prev, layout: { ...(prev.layout || {}), showCoreValues: anyCore } }));
    }

    const anyCTA = Array.isArray(data.callToAction?.buttons) ? data.callToAction.buttons.some(b => b && b.show !== false) : false;
    if ((data.layout?.showCTA || false) !== anyCTA) {
      setData((prev) => ({ ...prev, layout: { ...(prev.layout || {}), showCTA: anyCTA } }));
    }
  }, [data.vision, data.mission, data.coreValues, data.callToAction]);

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
      const res = await apiRequest('save_data/save_vision_mission', { payload: encrypted });
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
                    
                    {editData.backgroundImage && (
                      <div className="mt-2">
                        <img
                          src={editData.backgroundImage}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded border"
                        />
                      </div>
                    )}
                    <label className="block text-sm font-medium mb-1 mt-3">Or Upload Background Image</label>
                    <FileUpload
                      currentUrl={editData.backgroundImage || ''}
                      onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)}
                      label="Hero Background Image"
                    />
                    <div className="mt-3">
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
              {editSection === 'vision' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Vision</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleObjectChange('title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Quote</label>
                    <textarea
                      value={editData.quote || ''}
                      onChange={(e) => handleObjectChange('quote', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Points</h3>
                  {(editData.points || []).map((point, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Point {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={point.icon || ''}
                            onChange={(e) => handleNestedArrayChange('points', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Crown"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={point.title || ''}
                            onChange={(e) => handleNestedArrayChange('points', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={point.description || ''}
                            onChange={(e) => handleNestedArrayChange('points', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={point.show !== false}
                              onChange={(e) => handleNestedArrayChange('points', index, 'show', e.target.checked)}
                            />
                            <span>Show Point</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'mission' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Mission</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleObjectChange('title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Pillars</h3>
                  {(editData.pillars || []).map((pillar, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Pillar {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={pillar.icon || ''}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. BookOpen"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={pillar.title || ''}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={pillar.description || ''}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={pillar.show !== false}
                              onChange={(e) => handleNestedArrayChange('pillars', index, 'show', e.target.checked)}
                            />
                            <span>Show Pillar</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'coreValues' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Core Values</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleObjectChange('title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
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
                      <h4 className="text-md font-semibold mb-2">Value {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={value.icon || ''}
                            onChange={(e) => handleNestedArrayChange('values', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Heart"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={value.title || ''}
                            onChange={(e) => handleNestedArrayChange('values', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={value.description || ''}
                            onChange={(e) => handleNestedArrayChange('values', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={value.show !== false}
                              onChange={(e) => handleNestedArrayChange('values', index, 'show', e.target.checked)}
                            />
                            <span>Show Value</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      <span>Show Call to Action</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleObjectChange('title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
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
                      <h4 className="text-md font-semibold mb-2">Button {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={button.label || ''}
                            onChange={(e) => handleButtonChange(index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Link</label>
                          <input
                            type="text"
                            value={button.link || ''}
                            onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g., /admissions"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={button.icon || ''}
                            onChange={(e) => handleButtonChange(index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. FileText"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={button.show !== false}
                              onChange={(e) => handleButtonChange(index, 'show', e.target.checked)}
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
      {data.layout?.showHero && safeData('hero').show && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {safeData('hero').backgroundImageShow !== false && safeData('hero').backgroundImage && (
            <img src={safeData('hero').backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Our Direction</span>
              </div>
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

      {/* Vision Statement */}
      {data.layout?.showVision && safeData('vision').show && filteredVisionPoints.length > 0 && (
        <section
          id="vision"
          className={`py-16 bg-white animate-on-scroll ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Eye className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">{data.titles?.vision?.title || 'Our Vision'}</h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
                  "{safeData('vision').quote}"
                </blockquote>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVisionPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(point.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{point.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('vision')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Mission Statement */}
      {data.layout?.showMission && safeData('mission').show && filteredMissionPillars.length > 0 && (
        <section
          id="mission"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Compass className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">{data.titles?.mission?.title || 'Our Mission'}</h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {safeData('mission').description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMissionPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(pillar.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{pillar.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('mission')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Core Values */}
      {data.layout?.showCoreValues && safeData('coreValues').show && filteredCoreValues.length > 0 && (
        <section
          id="coreValues"
          className={`py-16 bg-white animate-on-scroll ${isVisible.coreValues ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.titles?.coreValues?.title || 'Core Values'}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('coreValues').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCoreValues.map((value, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center">
                    {renderIcon(value.icon, "h-8 w-8 text-green-600 mx-auto mb-4")}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('coreValues')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      {data.layout?.showCTA && safeData('callToAction').show && filteredCTAButtons.length > 0 && (
        <section
          id="callToAction"
          className={`py-16 bg-gradient-to-r from-green-600 to-green-700 text-white animate-on-scroll ${isVisible.callToAction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{data.titles?.callToAction?.title || 'Join Our Educational Community'}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              {safeData('callToAction').description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {filteredCTAButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.link || "#"}
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  {renderIcon(button.icon, "h-5 w-5")}
                  <span>{button.label}</span>
                </a>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('callToAction')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
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
    </div>
  );
};

export default VisionMissionPage;