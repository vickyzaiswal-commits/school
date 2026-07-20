"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Heart, 
  Palette,
  Music,
  Calculator,
  Globe,
  Languages,
  Code,
  Shield,
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Star,
  Award,
  GraduationCap,
  Lightbulb,
  Brain,
  TreePine,
  Book,
  Microscope,
  MapPin,
  Phone,
  Mail,
  Settings,
  X,
  Edit,
  Ban,
  Send,
  Baby,
  Blocks,
  Gamepad2,
  Sparkles,
  Flower2,
  Home,
  Utensils,
  Shirt,
  Bed
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

import defaultData from '@/data/pre-primary.json';

const PrePrimarySchoolPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [role, setRole] = useState(null);

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

  // Icon mapping for rendering (including new icons)
  const iconMap = {
    BookOpen,
    Users,
    Heart,
    Palette,
    Music,
    Calculator,
    Globe,
    Languages,
    Code,
    Shield,
    Target,
    Clock,
    Calendar,
    ChevronRight,
    Download,
    ExternalLink,
    ArrowRight,
    Star,
    Award,
    GraduationCap,
    Lightbulb,
    Brain,
    TreePine,
    Book,
    Microscope,
    MapPin,
    Phone,
    Mail,
    Settings,
    Baby,
    Blocks,
    Gamepad2,
    Sparkles,
    Flower2,
    Home,
    Utensils,
    Shirt,
    Bed
  };

  // Layout key mapping
  const layoutMap = {
    tabs: 'showTabs',
    hero: 'showHero',
    overview: 'showOverview',
    ageGroups: 'showAgeGroups',
    curriculum: 'showCurriculum',
    activities: 'showActivities',
    facilities: 'showFacilities',
    admissionsCta: 'showAdmissionsCta',
    contactInfo: 'showContactInfo'
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
        const res = await apiRequest('save_data/get_all_pre_primary_school', {});
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedRaw = res.data[0]?.data || {};

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
    let sectionData = { 
      showSection: data.layout[layoutKey],
      ...data[section]
    };
    if (section === 'tabs') {
      sectionData = Array.isArray(data.tabs) ? [...data.tabs] : [];
    }
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Handle change for CTA fields
  const handleCtaChange = (ctaField, field, value) => {
    setEditData(prev => ({
      ...prev,
      [ctaField]: { ...prev[ctaField], [field]: value }
    }));
  };

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string arrays (e.g., activities in age groups)
  const handleStringArrayChange = (nestedKey, levelIndex, activityIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      const activities = [...updated[nestedKey][levelIndex].activities];
      activities[activityIndex] = value;
      updated[nestedKey][levelIndex].activities = activities;
      return updated;
    });
  };

  // Handle change for simple object arrays (e.g., highlights)
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string lists (e.g., classroomFeatures)
  const handleStringListChange = (arrayKey, index, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const list = [...updated[arrayKey]];
      list[index] = value;
      updated[arrayKey] = list;
      return updated;
    });
  };

  // Handle change for tabs array
  const handleTabsChange = (index, field, value) => {
    setEditData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
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
      if (editSection === 'tabs') {
        updatedData[editSection] = Array.isArray(editData) ? editData : [];
      } else {
        const { showSection, ...sectionUpdates } = editData;
        updatedData[editSection] = { ...data[editSection], ...sectionUpdates };
      }

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_pre_primary_school', { payload: encryptedPayload });

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
  const asArray = (v) => (Array.isArray(v) ? v : []);
  const filteredTabs = asArray(data.tabs).filter(tab => tab.show !== false);
  const filteredOverviewHighlights = (data.overview?.highlights || []).filter(highlight => highlight.show !== false);
  const filteredTeachingApproach = (data.overview?.teachingApproach || []).filter(approach => approach.show !== false);
  const filteredAgeGroups = (data.ageGroups?.groups || []).filter(group => group.show !== false);
  const filteredLearningAreas = (data.curriculum?.learningAreas || []).filter(area => area.show !== false);
  const filteredSpecialPrograms = (data.curriculum?.specialPrograms || []).filter(program => program.show !== false);
  const filteredAssessmentMethods = (data.curriculum?.assessmentMethods || []).filter(method => method.show !== false);
  const filteredSchedule = (data.curriculum?.dailySchedule?.schedule || []).filter(item => item.show !== false);
  const filteredLearningCenters = (data.activities?.learningCenters || []).filter(center => center.show !== false);
  const filteredSpecialEvents = (data.activities?.specialEvents || []).filter(event => event.show !== false);
  const filteredParentPartnership = (data.activities?.parentPartnership || []).filter(item => item.show !== false);
  const filteredSafetyMeasures = (data.facilities?.safetyMeasures || []).filter(measure => measure.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Section visibility helpers
  const sectionDisplayNames = {
    hero: 'Hero',
    tabs: 'Tabs',
    overview: 'Overview',
    ageGroups: 'Age Groups',
    curriculum: 'Curriculum',
    activities: 'Activities',
    facilities: 'Facilities',
    admissionsCta: 'Admissions CTA',
    contactInfo: 'Contact Info'
  };

  const getDataValue = (key) => {
    const layoutKey = layoutMap[key];
    if (layoutKey) return data.layout?.[layoutKey] !== false;
    if (data[key] && typeof data[key] === 'object' && 'show' in data[key]) return data[key].show !== false;
    return true;
  };

  const toggleSectionVisibility = (key) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const layoutKey = layoutMap[key];
      const newVal = !(layoutKey ? copy.layout?.[layoutKey] : (copy[key]?.show !== false));
      if (layoutKey) {
        copy.layout = { ...(copy.layout || {}), [layoutKey]: newVal };
      }

      if (key === 'tabs') {
        // when toggling the whole Tabs section, also set each tab's show flag
        if (Array.isArray(copy.tabs)) {
          copy.tabs = copy.tabs.map((t) => ({ ...(t || {}), show: newVal }));
        }
      } else if (copy[key] && typeof copy[key] === 'object' && 'show' in copy[key]) {
        copy[key].show = newVal;
      } else {
        copy[key] = { ...(copy[key] || {}), show: newVal };
      }
      return copy;
    });
  };

  // Keep layout.showTabs in sync with individual tab visibility
  useEffect(() => {
    const tabsArr = Array.isArray(data.tabs) ? data.tabs : [];
    const anyShown = tabsArr.some((t) => t && t.show !== false);
    if ((data.layout?.showTabs || false) !== anyShown) {
      setData((prev) => ({ ...prev, layout: { ...(prev.layout || {}), showTabs: anyShown } }));
    }
  }, [data.tabs]);

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
      const res = await apiRequest('save_data/save_pre_primary_school', { payload: encrypted });
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
                  <div>
                    <label className="block text-sm font-medium">CTA Text</label>
                    <input
                      type="text"
                      value={editData.cta?.text || ''}
                      onChange={(e) => handleCtaChange('cta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA File</label>
                    <FileUpload
                      currentUrl={editData.cta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('cta', 'href', url)}
                      label="Upload CTA File"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="block text-sm font-medium mb-1">Hero Background</label>
                    <FileUpload
                      currentUrl={editData.backgroundImage || editData.image || ''}
                      onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)}
                      label="Upload Hero Background"
                    />
                  </div>
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
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.cta?.show !== false}
                        onChange={(e) => handleCtaChange('cta', 'show', e.target.checked)}
                      />
                      <span>Show CTA</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Tabs</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tabs</h3>
                  {(editData || []).map((tab, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Tab {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={tab.name || ''}
                            onChange={(e) => handleTabsChange(index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={tab.icon || ''}
                            onChange={(e) => handleTabsChange(index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select icon</option>
                            {Object.keys(iconMap).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={tab.show !== false}
                              onChange={(e) => handleTabsChange(index, 'show', e.target.checked)}
                            />
                            <span>Show Tab</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'overview' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Overview</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Highlights</h3>
                  {(editData.highlights || []).map((highlight, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Highlight {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={highlight.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('highlights', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select icon</option>
                            {Object.keys(iconMap).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Text</label>
                          <input
                            type="text"
                            value={highlight.text || ''}
                            onChange={(e) => handleSimpleArrayChange('highlights', index, 'text', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={highlight.show !== false}
                              onChange={(e) => handleSimpleArrayChange('highlights', index, 'show', e.target.checked)}
                            />
                            <span>Show Highlight</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Teaching Approach</h3>
                  {(editData.teachingApproach || []).map((approach, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Approach {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={approach.icon || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select icon</option>
                            {Object.keys(iconMap).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={approach.title || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={approach.description || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={approach.show !== false}
                              onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'show', e.target.checked)}
                            />
                            <span>Show Approach</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'ageGroups' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Age Groups</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Age Groups</h3>
                  {(editData.groups || []).map((group, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Group {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Age Group</label>
                          <input
                            type="text"
                            value={group.age || ''}
                            onChange={(e) => handleNestedArrayChange('groups', index, 'age', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Focus</label>
                          <input
                            type="text"
                            value={group.focus || ''}
                            onChange={(e) => handleNestedArrayChange('groups', index, 'focus', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={group.description || ''}
                            onChange={(e) => handleNestedArrayChange('groups', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Activities</label>
                          {(group.activities || []).map((activity, aIndex) => (
                            <input
                              key={aIndex}
                              type="text"
                              value={activity || ''}
                              onChange={(e) => handleStringArrayChange('groups', index, aIndex, e.target.value)}
                              className="w-full p-2 border rounded mb-1"
                            />
                          ))}
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={group.show !== false}
                              onChange={(e) => handleNestedArrayChange('groups', index, 'show', e.target.checked)}
                            />
                            <span>Show Group</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'curriculum' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Curriculum</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Learning Areas</h3>
                  {(editData.learningAreas || []).map((area, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Learning Area {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={area.icon || ''}
                            onChange={(e) => handleNestedArrayChange('learningAreas', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={area.name || ''}
                            onChange={(e) => handleNestedArrayChange('learningAreas', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={area.description || ''}
                            onChange={(e) => handleNestedArrayChange('learningAreas', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={area.show !== false}
                              onChange={(e) => handleNestedArrayChange('learningAreas', index, 'show', e.target.checked)}
                            />
                            <span>Show Area</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Programs</h3>
                  {(editData.specialPrograms || []).map((program, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={program.icon || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={program.name || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={program.description || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={program.show !== false}
                              onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'show', e.target.checked)}
                            />
                            <span>Show Program</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Assessment Methods</h3>
                  {(editData.assessmentMethods || []).map((method, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Method {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Term</label>
                          <input
                            type="text"
                            value={method.term || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'term', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={method.description || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Frequency</label>
                          <input
                            type="text"
                            value={method.frequency || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'frequency', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={method.show !== false}
                              onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'show', e.target.checked)}
                            />
                            <span>Show Method</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Daily Schedule</h3>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.dailySchedule?.title || ''}
                      onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, title: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.dailySchedule?.show !== false}
                        onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, show: e.target.checked })}
                      />
                      <span>Show Daily Schedule</span>
                    </label>
                  </div>
                  {(editData.dailySchedule?.schedule || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Schedule Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Time</label>
                          <input
                            type="text"
                            value={item.time || ''}
                            onChange={(e) => {
                              const updatedSchedule = { ...editData.dailySchedule };
                              updatedSchedule.schedule[index].time = e.target.value;
                              handleObjectChange('dailySchedule', updatedSchedule);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Activity</label>
                          <input
                            type="text"
                            value={item.activity || ''}
                            onChange={(e) => {
                              const updatedSchedule = { ...editData.dailySchedule };
                              updatedSchedule.schedule[index].activity = e.target.value;
                              handleObjectChange('dailySchedule', updatedSchedule);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => {
                                const updatedSchedule = { ...editData.dailySchedule };
                                updatedSchedule.schedule[index].show = e.target.checked;
                                handleObjectChange('dailySchedule', updatedSchedule);
                              }}
                            />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'activities' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Activities</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Learning Centers</h3>
                  {(editData.learningCenters || []).map((center, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Center {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={center.icon || ''}
                            onChange={(e) => handleNestedArrayChange('learningCenters', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={center.title || ''}
                            onChange={(e) => handleNestedArrayChange('learningCenters', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={center.description || ''}
                            onChange={(e) => handleNestedArrayChange('learningCenters', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={center.show !== false}
                              onChange={(e) => handleNestedArrayChange('learningCenters', index, 'show', e.target.checked)}
                            />
                            <span>Show Center</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Events</h3>
                  {(editData.specialEvents || []).map((event, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={event.name || ''}
                            onChange={(e) => handleNestedArrayChange('specialEvents', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={event.description || ''}
                            onChange={(e) => handleNestedArrayChange('specialEvents', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={event.show !== false}
                              onChange={(e) => handleNestedArrayChange('specialEvents', index, 'show', e.target.checked)}
                            />
                            <span>Show Event</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Parent Partnership</h3>
                  {(editData.parentPartnership || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleNestedArrayChange('parentPartnership', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleNestedArrayChange('parentPartnership', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={item.description || ''}
                            onChange={(e) => handleNestedArrayChange('parentPartnership', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => handleNestedArrayChange('parentPartnership', index, 'show', e.target.checked)}
                            />
                            <span>Show Item</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Classroom Features</h3>
                  {(editData.classroomFeatures || []).map((feature, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={feature || ''}
                        onChange={(e) => handleStringListChange('classroomFeatures', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Specialized Areas</h3>
                  {(editData.specializedAreas || []).map((area, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={area || ''}
                        onChange={(e) => handleStringListChange('specializedAreas', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Safety Measures</h3>
                  {(editData.safetyMeasures || []).map((measure, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Measure {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={measure.title || ''}
                            onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={measure.description || ''}
                            onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={measure.show !== false}
                              onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'show', e.target.checked)}
                            />
                            <span>Show Measure</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tour CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.tourCta?.title || ''}
                      onChange={(e) => handleCtaChange('tourCta', 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.tourCta?.description || ''}
                      onChange={(e) => handleCtaChange('tourCta', 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">CTA Text</label>
                    <input
                      type="text"
                      value={editData.tourCta?.cta?.text || ''}
                      onChange={(e) => {
                        const updated = { ...editData.tourCta };
                        updated.cta = { ...updated.cta, text: e.target.value };
                        handleObjectChange('tourCta', updated);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA Link</label>
                    <input
                      type="text"
                      value={editData.tourCta?.cta?.href || ''}
                      onChange={(e) => {
                        const updated = { ...editData.tourCta };
                        updated.cta = { ...updated.cta, href: e.target.value };
                        handleObjectChange('tourCta', updated);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.tourCta?.cta?.show !== false}
                        onChange={(e) => {
                          const updated = { ...editData.tourCta };
                          updated.cta = { ...updated.cta, show: e.target.checked };
                          handleObjectChange('tourCta', updated);
                        }}
                      />
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.tourCta?.show !== false}
                        onChange={(e) => handleCtaChange('tourCta', 'show', e.target.checked)}
                      />
                      <span>Show Tour CTA</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'admissionsCta' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Admissions CTA</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Primary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input
                      type="text"
                      value={editData.primaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('primaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Link</label>
                    <input
                      type="text"
                      value={editData.primaryCta?.href || ''}
                      onChange={(e) => handleCtaChange('primaryCta', 'href', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="/apply-admission"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.primaryCta?.show !== false}
                        onChange={(e) => handleCtaChange('primaryCta', 'show', e.target.checked)}
                      />
                      <span>Show Primary CTA</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Secondary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input
                      type="text"
                      value={editData.secondaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('secondaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">File</label>
                    <FileUpload
                      currentUrl={editData.secondaryCta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('secondaryCta', 'href', url)}
                      label="Upload Secondary CTA File"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.secondaryCta?.show !== false}
                        onChange={(e) => handleCtaChange('secondaryCta', 'show', e.target.checked)}
                      />
                      <span>Show Secondary CTA</span>
                    </label>
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
                    <label className="block text-sm font-medium">Hours</label>
                    <textarea
                      value={editData.hours || ''}
                      onChange={(e) => handleObjectChange('hours', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
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

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {(safeData('hero').backgroundImageShow !== false && (safeData('hero').backgroundImage || safeData('hero').image)) && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${safeData('hero').backgroundImage || safeData('hero').image})` }}
            ></div>
          )}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
              {safeData('hero').cta?.show && (
                <a
                  href={safeData('hero').cta.href}
                  className="mt-8 inline-flex items-center bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {safeData('hero').cta.text}
                  <Download className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Tab Navigation */}
      {data.layout?.showTabs && filteredTabs.length > 0 && (
        <section
          id="tabs"
          className="py-8 bg-white border-b border-gray-200 relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {filteredTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  {renderIcon(tab.icon, "w-4 h-4 mr-2")}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('tabs')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Overview Content */}
      {activeTab === 'overview' && data.layout?.showOverview && safeData('overview').show && (
        <div>
          {/* Introduction */}
          <section
            id="overview-intro"
            className="py-16 bg-white relative animate-on-scroll"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{safeData('overview').title}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {safeData('overview').description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredOverviewHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        {renderIcon(highlight.icon, "h-5 w-5 text-green-600 mr-2")}
                        <span className="text-sm">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Approach</h3>
                  <div className="space-y-4">
                    {filteredTeachingApproach.map((approach, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          {renderIcon(approach.icon, "h-4 w-4 text-green-600")}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{approach.title}</h4>
                          <p className="text-gray-600 text-sm">{approach.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('overview')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </section>

          {/* Age Groups */}
          {data.layout?.showAgeGroups && safeData('ageGroups').show && filteredAgeGroups.length > 0 && (
            <section
              id="ageGroups"
              className="py-16 bg-gray-50 relative animate-on-scroll"
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('ageGroups').title}</h2>
                  <p className="text-lg text-gray-600">
                    {safeData('ageGroups').description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredAgeGroups.map((group, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                      <div className="bg-green-100 text-green-800 font-semibold text-sm px-3 py-1 rounded-full inline-block mb-4">
                        {group.age}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{group.focus}</h3>
                      <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-green-800 mb-2">ACTIVITIES</h4>
                        <div className="flex flex-wrap justify-center gap-1">
                          {group.activities.map((activity, aIndex) => (
                            <span key={aIndex} className="bg-white text-green-700 text-xs px-2 py-1 rounded">
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {editMode && (
                <button
                  onClick={() => openEditModal('ageGroups')}
                  className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* Curriculum Content */}
      {activeTab === 'curriculum' && data.layout?.showCurriculum && safeData('curriculum').show && (
        <section
          id="curriculum"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('curriculum').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('curriculum').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Areas</h3>
                <div className="space-y-4">
                  {filteredLearningAreas.map((area, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {renderIcon(area.icon, "h-5 w-5 text-green-600 mr-3 mt-1")}
                      <div>
                        <h4 className="font-medium text-gray-800">{area.name}</h4>
                        <p className="text-gray-600 text-sm">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Programs</h3>
                <div className="space-y-4">
                  {filteredSpecialPrograms.map((program, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {renderIcon(program.icon, "h-5 w-5 text-green-600 mr-3 mt-1")}
                      <div>
                        <h4 className="font-medium text-gray-800">{program.name}</h4>
                        <p className="text-gray-600 text-sm">{program.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assessment */}
            {filteredAssessmentMethods.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Assessment Approach</h3>
                <p className="text-gray-600 mb-6">
                  We use developmentally appropriate assessment methods that focus on holistic growth and individual progress.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredAssessmentMethods.map((method, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{method.term}</h4>
                      <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full inline-block">
                        {method.frequency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Schedule */}
            {safeData('curriculum').dailySchedule?.show && filteredSchedule.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{safeData('curriculum').dailySchedule.title}</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {filteredSchedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium text-gray-800">{item.time}</span>
                        <span className="text-gray-600">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('curriculum')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Activities Content */}
      {activeTab === 'activities' && data.layout?.showActivities && safeData('activities').show && (
        <section
          id="activities"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('activities').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('activities').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Learning Centers</h3>
                <div className="space-y-4">
                  {filteredLearningCenters.map((center, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        {renderIcon(center.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{center.title}</h4>
                        <p className="text-gray-600 text-sm">{center.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Events</h3>
                <div className="space-y-4">
                  {filteredSpecialEvents.map((event, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800">{event.name}</h4>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent Partnership */}
            {filteredParentPartnership.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Parent Partnership</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredParentPartnership.map((item, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-5 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        {renderIcon(item.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('activities')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Facilities Content */}
      {activeTab === 'facilities' && data.layout?.showFacilities && safeData('facilities').show && (
        <section
          id="facilities"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('facilities').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('facilities').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Classroom Features</h3>
                <ul className="space-y-3">
                  {(safeData('facilities').classroomFeatures || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specialized Areas</h3>
                <ul className="space-y-3">
                  {(safeData('facilities').specializedAreas || []).map((area, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety Measures */}
            {filteredSafetyMeasures.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Safety & Wellness</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSafetyMeasures.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {safeData('facilities').tourCta?.show && safeData('facilities').tourCta?.cta?.show && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{safeData('facilities').tourCta.title}</h3>
                <p className="text-gray-600 mb-6">{safeData('facilities').tourCta.description}</p>
                <a
                  href={safeData('facilities').tourCta.cta.href}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {safeData('facilities').tourCta.cta.text}
                  <Calendar className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('facilities')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Admissions CTA */}
      {data.layout?.showAdmissionsCta && safeData('admissionsCta').show && (
        <section
          id="admissionsCta"
          className="py-16 bg-green-800 text-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{safeData('admissionsCta').title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              {safeData('admissionsCta').description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              {safeData('admissionsCta').primaryCta?.show && (
                <a
                  href={safeData('admissionsCta').primaryCta.href}
                  className="w-full sm:w-auto min-w-[180px] text-center bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden"
                  style={{
                    textOverflow: 'ellipsis'
                  }}
                >
                  <span className="truncate block">{safeData('admissionsCta').primaryCta.text}</span>
                </a>
              )}

              {safeData('admissionsCta').secondaryCta?.show && (
                <a
                  href={safeData('admissionsCta').secondaryCta.href}
                  className="w-full sm:w-auto min-w-[180px] text-center bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden inline-flex items-center justify-center"
                >
                  <span className="truncate">{safeData('admissionsCta').secondaryCta.text}</span>
                  <Download className="ml-2 h-4 w-4 flex-shrink-0" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('admissionsCta')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Information */}
      {data.layout?.showContactInfo && safeData('contactInfo').show && (
        <section
          id="contactInfo"
          className="py-16 bg-gray-50 relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('contactInfo').title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').address}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').phone}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email & Hours</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').email}</p>
                <p className="text-gray-600 whitespace-pre-line mt-2">{safeData('contactInfo').hours}</p>
              </div>
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

export default PrePrimarySchoolPage;