"use client";
import defaultData from '@/data/higher-education.json';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Target,
  Calculator,
  Microscope,
  Globe,
  Code,
  BarChart3,
  Book,
  Heart,
  Shield,
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
  Clock,
  FileText,
  Briefcase,
  FlaskRound,
  Atom,
  Landmark,
  Scale,
  Eye,
  Settings,
  X,
  Edit,
  Ban,
  Send,
  Search,
  Globe2,
  Building,
  Layers,
  TrendingUp,
  Bookmark,
  CheckCircle,
  Users2,
  Zap,
  Coffee,
  Network,
  PenTool
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import Image from 'next/image';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const HigherEducationPage = ({ schoolData = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeDegree, setActiveDegree] = useState('bachelors');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [role, setRole] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

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

  // Default data structure
  

  // Icon mapping
  const iconMap = {
    BookOpen, Users, Target, Calculator, Microscope, Globe, Code, BarChart3,
    Book, Heart, Shield, Calendar, ChevronRight, Download, ExternalLink, ArrowRight,
    Star, Award, GraduationCap, Lightbulb, Brain, Clock, FileText, Briefcase,
    FlaskRound, Atom, Landmark, Scale, Eye, Settings, X, Edit, Ban, Send,
    Search, Globe2, Building, Layers, TrendingUp, Bookmark, CheckCircle,
    Users2, Zap, Coffee, Network, PenTool
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    tabs: 'showTabs',
    introduction: 'showIntroduction',
    academicPrograms: 'showAcademicPrograms',
    researchInnovation: 'showResearchInnovation',
    internationalPrograms: 'showInternationalPrograms',
    careerSupport: 'showCareerSupport',
    admissions: 'showAdmissions',
    cta: 'showCta'
  };

  const sectionDisplay = [
    { key: 'tabs', label: 'Tabs' },
    { key: 'hero', label: 'Hero' },
    { key: 'introduction', label: 'Introduction' },
    { key: 'academicPrograms', label: 'Academic Programs' },
    { key: 'researchInnovation', label: 'Research & Innovation' },
    { key: 'internationalPrograms', label: 'International Programs' },
    { key: 'careerSupport', label: 'Career Support' },
    { key: 'admissions', label: 'Admissions' },
    { key: 'cta', label: 'Call To Action' }
  ];

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

  // Toggle section visibility
  const toggleSectionVisibility = (key) => {
    setData(prev => {
      const layoutKey = layoutMap[key];
      const updated = { ...prev };
      updated.layout = { ...(prev.layout || {}) };
      if (layoutKey) {
        updated.layout[layoutKey] = !Boolean(prev.layout?.[layoutKey]);
      }
      if (prev[key] && typeof prev[key] === 'object' && !Array.isArray(prev[key])) {
        updated[key] = { ...prev[key], show: !Boolean(prev[key]?.show) };
      }
      return updated;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      try {
        const encrypted = await encryptObject(payload);
        await apiRequest('save_data/save_higher_education', { payload: encrypted });
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    setSectionVisibilityModal(false);
  };

  // Handle opening edit modal
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
      sectionData = [...(data.tabs || [])];
    }
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change functions
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCtaChange = (ctaField, field, value) => {
    setEditData(prev => ({
      ...prev,
      [ctaField]: { ...prev[ctaField], [field]: value }
    }));
  };

  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  const handleStringListChange = (arrayKey, index, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const list = [...updated[arrayKey]];
      list[index] = value;
      updated[arrayKey] = list;
      return updated;
    });
  };

  const handleTabsChange = (index, field, value) => {
    setEditData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleDegreeChange = (degreeIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.degrees) updated.degrees = [];
      updated.degrees[degreeIndex] = { ...updated.degrees[degreeIndex], [field]: value };
      return updated;
    });
  };

  const handleSpecializationChange = (degreeIndex, specIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.degrees) updated.degrees = [];
      if (!updated.degrees[degreeIndex].specializations) updated.degrees[degreeIndex].specializations = [];
      updated.degrees[degreeIndex].specializations[specIndex] = { 
        ...updated.degrees[degreeIndex].specializations[specIndex], 
        [field]: value 
      };
      return updated;
    });
  };

  const handleSubjectsChange = (degreeIndex, specIndex, subjectIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const subjects = [...updated.degrees[degreeIndex].specializations[specIndex].subjects];
      subjects[subjectIndex] = value;
      updated.degrees[degreeIndex].specializations[specIndex].subjects = subjects;
      return updated;
    });
  };

  const handleRequirementChange = (degreeIndex, reqIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const requirements = [...updated.degrees[degreeIndex].admissionRequirements];
      requirements[reqIndex] = value;
      updated.degrees[degreeIndex].admissionRequirements = requirements;
      return updated;
    });
  };

  const handleCareerOpportunityChange = (degreeIndex, oppIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const opportunities = [...updated.degrees[degreeIndex].careerOpportunities];
      opportunities[oppIndex] = value;
      updated.degrees[degreeIndex].careerOpportunities = opportunities;
      return updated;
    });
  };

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

      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_higher_education', { payload: encrypted });
        if (save_data.status === 200) {
          setData(updatedData);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
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
  const filteredTabs = (data.tabs || []).filter(tab => tab.show !== false);
  const filteredStats = (data.introduction?.stats || []).filter(stat => stat.show !== false);
  const filteredKeyFeatures = (data.introduction?.keyFeatures || []).filter(feature => feature.show !== false);
  const filteredDegrees = (data.academicPrograms?.degrees || []).filter(degree => degree.show !== false);
  const filteredProgramHighlights = (data.academicPrograms?.programHighlights || []).filter(highlight => highlight.show !== false);
  const filteredResearchAreas = (data.researchInnovation?.researchAreas || []).filter(area => area.show !== false);
  const filteredFacilities = (data.researchInnovation?.facilities || []).filter(facility => facility.show !== false);
  const filteredAchievements = (data.researchInnovation?.achievements || []).filter(achievement => achievement.show !== false);
  const filteredPartnerships = (data.internationalPrograms?.partnerships || []).filter(partner => partner.show !== false);
  const filteredExchangePrograms = (data.internationalPrograms?.exchangePrograms || []).filter(program => program.show !== false);
  const filteredCareerServices = (data.careerSupport?.services || []).filter(service => service.show !== false);
  const filteredPlacementStats = (data.careerSupport?.placementStats || []).filter(stat => stat.show !== false);
  const filteredAdmissionSteps = (data.admissions?.steps || []).filter(step => step.show !== false);
  const filteredImportantDates = (data.admissions?.importantDates || []).filter(date => date.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

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
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button onClick={cancelChanges} className="p-2 text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {/* Hero Section Edit Form */}
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
                    <label className="block text-sm font-medium mb-1">CTA File (upload prospectus)</label>
                    <FileUpload
                      currentUrl={editData.cta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('cta', 'href', url)}
                      label="Upload Prospectus PDF"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Hero Background Image</label>
                    <FileUpload
                      currentUrl={editData.backgroundImage || ''}
                      onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)}
                      label="Upload Background Image"
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
                      <span>Show CTA Button</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Tabs Section Edit Form */}
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
                        {/* ID is intentionally hidden from editors to prevent accidental changes to routing keys */}
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

              {/* Introduction Section Edit Form */}
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
                          <select
                            value={stat.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select icon</option>
                            {Object.keys(iconMap).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Value</label>
                          <input
                            type="text"
                            value={stat.value || ''}
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'value', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={stat.show !== false}
                              onChange={(e) => handleSimpleArrayChange('stats', index, 'show', e.target.checked)}
                            />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Key Features</h3>
                  {(editData.keyFeatures || []).map((feature, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Feature {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={feature.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('keyFeatures', index, 'icon', e.target.value)}
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
                            value={feature.title || ''}
                            onChange={(e) => handleSimpleArrayChange('keyFeatures', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={feature.description || ''}
                            onChange={(e) => handleSimpleArrayChange('keyFeatures', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={feature.show !== false}
                              onChange={(e) => handleSimpleArrayChange('keyFeatures', index, 'show', e.target.checked)}
                            />
                            <span>Show Feature</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Academic Programs Edit Form */}
              {editSection === 'academicPrograms' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Academic Programs</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Degree Programs</h3>
                  {(editData.degrees || []).map((degree, degreeIndex) => (
                    <div key={degreeIndex} className="mb-8 border border-gray-300 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-lg font-semibold mb-3">Degree: {degree.name || `Degree ${degreeIndex + 1}`}</h4>
                      <div className="space-y-3">
                        {/* ID is intentionally hidden from editors to prevent breaking references */}
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={degree.name || ''}
                            onChange={(e) => handleDegreeChange(degreeIndex, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={degree.icon || ''}
                            onChange={(e) => handleDegreeChange(degreeIndex, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select icon</option>
                            {Object.keys(iconMap).map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Duration</label>
                          <input
                            type="text"
                            value={degree.duration || ''}
                            onChange={(e) => handleDegreeChange(degreeIndex, 'duration', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={degree.description || ''}
                            onChange={(e) => handleDegreeChange(degreeIndex, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Specializations</label>
                          {(degree.specializations || []).map((spec, specIndex) => (
                            <div key={specIndex} className="ml-4 mb-3 p-3 border border-gray-200 rounded bg-white">
                              <h5 className="text-sm font-medium mb-2">Specialization {specIndex + 1}</h5>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={spec.name || ''}
                                  onChange={(e) => handleSpecializationChange(degreeIndex, specIndex, 'name', e.target.value)}
                                  className="w-full p-2 border rounded text-sm"
                                  placeholder="Specialization Name"
                                />
                                <div>
                                  <label className="block text-xs font-medium mb-1">Subjects</label>
                                  {(spec.subjects || []).map((subject, subjectIndex) => (
                                    <input
                                      key={subjectIndex}
                                      type="text"
                                      value={subject || ''}
                                      onChange={(e) => handleSubjectsChange(degreeIndex, specIndex, subjectIndex, e.target.value)}
                                      className="w-full p-2 border rounded text-sm mb-1"
                                      placeholder={`Subject ${subjectIndex + 1}`}
                                    />
                                  ))}
                                </div>
                                <label className="flex items-center space-x-2 text-sm">
                                  <input
                                    type="checkbox"
                                    checked={spec.show !== false}
                                    onChange={(e) => handleSpecializationChange(degreeIndex, specIndex, 'show', e.target.checked)}
                                  />
                                  <span>Show Specialization</span>
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Admission Requirements</label>
                          {(degree.admissionRequirements || []).map((req, reqIndex) => (
                            <input
                              key={reqIndex}
                              type="text"
                              value={req || ''}
                              onChange={(e) => handleRequirementChange(degreeIndex, reqIndex, e.target.value)}
                              className="w-full p-2 border rounded mb-1"
                            />
                          ))}
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Career Opportunities</label>
                          {(degree.careerOpportunities || []).map((opp, oppIndex) => (
                            <input
                              key={oppIndex}
                              type="text"
                              value={opp || ''}
                              onChange={(e) => handleCareerOpportunityChange(degreeIndex, oppIndex, e.target.value)}
                              className="w-full p-2 border rounded mb-1"
                            />
                          ))}
                        </div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={degree.show !== false}
                            onChange={(e) => handleDegreeChange(degreeIndex, 'show', e.target.checked)}
                          />
                          <span>Show Degree</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Program Highlights</h3>
                  {(editData.programHighlights || []).map((highlight, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Highlight {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={highlight.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('programHighlights', index, 'icon', e.target.value)}
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
                            value={highlight.title || ''}
                            onChange={(e) => handleSimpleArrayChange('programHighlights', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={highlight.description || ''}
                            onChange={(e) => handleSimpleArrayChange('programHighlights', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={highlight.show !== false}
                              onChange={(e) => handleSimpleArrayChange('programHighlights', index, 'show', e.target.checked)}
                            />
                            <span>Show Highlight</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Research & Innovation Edit Form */}
              {editSection === 'researchInnovation' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Research & Innovation</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Research Areas</h3>
                  {(editData.researchAreas || []).map((area, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Area {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={area.name || ''}
                            onChange={(e) => handleSimpleArrayChange('researchAreas', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Funding</label>
                          <input
                            type="text"
                            value={area.funding || ''}
                            onChange={(e) => handleSimpleArrayChange('researchAreas', index, 'funding', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Projects</label>
                          {(area.projects || []).map((project, pIndex) => (
                            <input
                              key={pIndex}
                              type="text"
                              value={project || ''}
                              onChange={(e) => {
                                const newProjects = [...(area.projects || [])];
                                newProjects[pIndex] = e.target.value;
                                setEditData(prev => {
                                  const updated = { ...prev };
                                  updated.researchAreas[index].projects = newProjects;
                                  return updated;
                                });
                              }}
                              className="w-full p-2 border rounded mb-1"
                            />
                          ))}
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={area.show !== false}
                              onChange={(e) => handleSimpleArrayChange('researchAreas', index, 'show', e.target.checked)}
                            />
                            <span>Show Area</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Facilities</h3>
                  {(editData.facilities || []).map((facility, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Facility {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={facility.name || ''}
                            onChange={(e) => handleSimpleArrayChange('facilities', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={facility.description || ''}
                            onChange={(e) => handleSimpleArrayChange('facilities', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={facility.show !== false}
                              onChange={(e) => handleSimpleArrayChange('facilities', index, 'show', e.target.checked)}
                            />
                            <span>Show Facility</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Achievements</h3>
                  {(editData.achievements || []).map((achievement, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Achievement {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Year</label>
                          <input
                            type="text"
                            value={achievement.year || ''}
                            onChange={(e) => handleSimpleArrayChange('achievements', index, 'year', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Achievement</label>
                          <textarea
                            value={achievement.achievement || ''}
                            onChange={(e) => handleSimpleArrayChange('achievements', index, 'achievement', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={achievement.show !== false}
                              onChange={(e) => handleSimpleArrayChange('achievements', index, 'show', e.target.checked)}
                            />
                            <span>Show Achievement</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* International Programs Edit Form */}
              {editSection === 'internationalPrograms' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show International Programs</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Partnerships</h3>
                  {(editData.partnerships || []).map((partner, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Partner {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">University</label>
                          <input
                            type="text"
                            value={partner.university || ''}
                            onChange={(e) => handleSimpleArrayChange('partnerships', index, 'university', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Country</label>
                          <input
                            type="text"
                            value={partner.country || ''}
                            onChange={(e) => handleSimpleArrayChange('partnerships', index, 'country', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Type</label>
                          <input
                            type="text"
                            value={partner.type || ''}
                            onChange={(e) => handleSimpleArrayChange('partnerships', index, 'type', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={partner.show !== false}
                              onChange={(e) => handleSimpleArrayChange('partnerships', index, 'show', e.target.checked)}
                            />
                            <span>Show Partnership</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Exchange Programs</h3>
                  {(editData.exchangePrograms || []).map((program, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={program.name || ''}
                            onChange={(e) => handleSimpleArrayChange('exchangePrograms', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Duration</label>
                          <input
                            type="text"
                            value={program.duration || ''}
                            onChange={(e) => handleSimpleArrayChange('exchangePrograms', index, 'duration', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={program.description || ''}
                            onChange={(e) => handleSimpleArrayChange('exchangePrograms', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={program.show !== false}
                              onChange={(e) => handleSimpleArrayChange('exchangePrograms', index, 'show', e.target.checked)}
                            />
                            <span>Show Program</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Benefits</h3>
                  {(editData.benefits || []).map((benefit, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={benefit || ''}
                        onChange={(e) => handleStringListChange('benefits', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Career Support Edit Form */}
              {editSection === 'careerSupport' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Career Support</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Services</h3>
                  {(editData.services || []).map((service, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Service {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={service.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('services', index, 'icon', e.target.value)}
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
                            value={service.title || ''}
                            onChange={(e) => handleSimpleArrayChange('services', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={service.description || ''}
                            onChange={(e) => handleSimpleArrayChange('services', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={service.show !== false}
                              onChange={(e) => handleSimpleArrayChange('services', index, 'show', e.target.checked)}
                            />
                            <span>Show Service</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Placement Stats</h3>
                  {(editData.placementStats || []).map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Sector</label>
                          <input
                            type="text"
                            value={stat.sector || ''}
                            onChange={(e) => handleSimpleArrayChange('placementStats', index, 'sector', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Percentage</label>
                          <input
                            type="text"
                            value={stat.percentage || ''}
                            onChange={(e) => handleSimpleArrayChange('placementStats', index, 'percentage', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={stat.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('placementStats', index, 'icon', e.target.value)}
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
                              checked={stat.show !== false}
                              onChange={(e) => handleSimpleArrayChange('placementStats', index, 'show', e.target.checked)}
                            />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Top Recruiters</h3>
                  {(editData.topRecruiters || []).map((recruiter, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={recruiter || ''}
                        onChange={(e) => handleStringListChange('topRecruiters', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Alumni Success</h3>
                  {(editData.alumniSuccess || []).map((alumni, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Alumni {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={alumni.name || ''}
                            onChange={(e) => handleSimpleArrayChange('alumniSuccess', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Position</label>
                          <input
                            type="text"
                            value={alumni.position || ''}
                            onChange={(e) => handleSimpleArrayChange('alumniSuccess', index, 'position', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Degree</label>
                          <input
                            type="text"
                            value={alumni.degree || ''}
                            onChange={(e) => handleSimpleArrayChange('alumniSuccess', index, 'degree', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Admissions Edit Form */}
              {editSection === 'admissions' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Admissions</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Admission Steps</h3>
                  {(editData.steps || []).map((step, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Step {step.step || index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Step Number</label>
                          <input
                            type="number"
                            value={step.step || ''}
                            onChange={(e) => handleSimpleArrayChange('steps', index, 'step', parseInt(e.target.value))}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => handleSimpleArrayChange('steps', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={step.description || ''}
                            onChange={(e) => handleSimpleArrayChange('steps', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="2"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={step.show !== false}
                              onChange={(e) => handleSimpleArrayChange('steps', index, 'show', e.target.checked)}
                            />
                            <span>Show Step</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Important Dates</h3>
                  {(editData.importantDates || []).map((date, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Date {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Event</label>
                          <input
                            type="text"
                            value={date.event || ''}
                            onChange={(e) => handleSimpleArrayChange('importantDates', index, 'event', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Date</label>
                          <input
                            type="text"
                            value={date.date || ''}
                            onChange={(e) => handleSimpleArrayChange('importantDates', index, 'date', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={date.show !== false}
                              onChange={(e) => handleSimpleArrayChange('importantDates', index, 'show', e.target.checked)}
                            />
                            <span>Show Date</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Required Documents</h3>
                  {(editData.documentsRequired || []).map((doc, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={doc || ''}
                        onChange={(e) => handleStringListChange('documentsRequired', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Section Edit Form */}
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show CTA</span>
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
                      placeholder="/admissions/higher-education"
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
            </div>
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Manage Section Visibility Modal */}
      {editMode && sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[70vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">Manage Section Visibility</h2>
              </div>
              <button onClick={() => setSectionVisibilityModal(false)} className="p-2 text-gray-600 hover:text-gray-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex-1 max-h-[70vh]">
              <div className="space-y-3">
                {sectionDisplay.map(section => (
                  <div key={section.key} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!safeData(section.key).show) ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(section.key)}
                      className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!safeData(section.key).show) ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                      <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end items-center px-4 py-3 bg-gray-50 border-t">
              <button onClick={() => setSectionVisibilityModal(false)} className="px-3 py-2 mr-2 text-sm text-gray-700 bg-white border border-gray-300 rounded">Cancel</button>
              <button onClick={saveSectionVisibility} className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Manage Visibility Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Manage Section Visibility"
        >
          <Edit className="h-5 w-5" />
        </button>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section className={`relative ${safeData('hero').height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          {safeData('hero').backgroundImageShow !== false && safeData('hero').backgroundImage && (
            <Image src={safeData('hero').backgroundImage} alt="Hero background" fill unoptimized className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {safeData('hero').subtitle}
              </p>
              {safeData('hero').cta?.show && (
                <a
                  href={safeData('hero').cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 bg-white hover:bg-gray-50 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {safeData('hero').cta.text}
                  <Download className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Tab Navigation */}
      {data.layout?.showTabs && filteredTabs.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-200 relative">
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
            <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Overview Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Introduction */}
          {data.layout?.showIntroduction && safeData('introduction').show && (
            <section className="py-16 bg-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{safeData('introduction').title}</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {safeData('introduction').description}
                    </p>
                    {filteredStats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {filteredStats.map((stat, index) => (
                          <div key={index} className="flex items-center">
                            {renderIcon(stat.icon, "h-5 w-5 text-green-600 mr-2")}
                            <span className="text-sm">{stat.value} {stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                    <div className="space-y-4">
                      {filteredKeyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                            {renderIcon(feature.icon, "h-4 w-4 text-green-600")}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('introduction')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}

          {/* Academic Programs Preview */}
          {data.layout?.showAcademicPrograms && safeData('academicPrograms').show && (
            <section className="py-16 bg-gray-50 relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('academicPrograms').title}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {safeData('academicPrograms').description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {filteredDegrees.map((degree) => (
                    <div key={degree.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        {renderIcon(degree.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">{degree.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{degree.duration}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{degree.description}</p>
                      <button 
                        onClick={() => {
                          setActiveTab('programs');
                          setActiveDegree(degree.id);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Learn More →
                      </button>
                    </div>
                  ))}
                </div>

                {/* Program Highlights */}
                {filteredProgramHighlights.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose Our Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {filteredProgramHighlights.map((highlight, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                            {renderIcon(highlight.icon, "h-6 w-6 text-green-600")}
                          </div>
                          <h4 className="font-semibold text-gray-800 mb-2">{highlight.title}</h4>
                          <p className="text-gray-600 text-sm">{highlight.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {editMode && (
                <button onClick={() => openEditModal('academicPrograms')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}

          {/* Call to Action */}
          {data.layout?.showCta && safeData('cta').show && (
            <section className="py-16 bg-green-800 text-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{safeData('cta').title}</h2>
                <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
                  {safeData('cta').description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                  {safeData('cta').primaryCta?.show && (
                    <a
                      href={safeData('cta').primaryCta.href}
                      className="w-full sm:w-auto min-w-[180px] text-center bg-white text-green-800 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden"
                      style={{ textOverflow: 'ellipsis' }}
                    >
                      <span className="truncate block">{safeData('cta').primaryCta.text}</span>
                    </a>
                  )}
                  {safeData('cta').secondaryCta?.show && (
                    <a
                      href={safeData('cta').secondaryCta.href}
                      download
                      className="w-full sm:w-auto min-w-[180px] text-center bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden inline-flex items-center justify-center"
                    >
                      <span className="truncate">{safeData('cta').secondaryCta.text}</span>
                      <Download className="ml-2 h-4 w-4 flex-shrink-0" />
                    </a>
                  )}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-800 p-2 rounded-full hover:bg-gray-50">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* Academic Programs Content */}
      {activeTab === 'programs' && data.layout?.showAcademicPrograms && safeData('academicPrograms').show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('academicPrograms').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore our comprehensive degree programs
              </p>
            </div>

            {/* Degree Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filteredDegrees.map((degree) => (
                <button
                  key={degree.id}
                  onClick={() => setActiveDegree(degree.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeDegree === degree.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  {renderIcon(degree.icon, "w-4 h-4 mr-2")}
                  {degree.name}
                </button>
              ))}
            </div>

            {/* Active Degree Details */}
            {filteredDegrees.find(degree => degree.id === activeDegree) && (
              <div className="max-w-5xl mx-auto">
                {filteredDegrees.map((degree) => activeDegree === degree.id && (
                  <div key={degree.id} className="bg-green-50 rounded-lg p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{degree.name}</h3>
                        <p className="text-green-600 font-medium mb-4">{degree.duration}</p>
                        <p className="text-lg text-gray-600 mb-6">{degree.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Specializations</h4>
                        <div className="space-y-4">
                          {degree.specializations.filter(s => s.show !== false).map((specialization, sIndex) => (
                            <div key={sIndex} className="bg-white rounded p-4">
                              <h5 className="font-medium text-gray-800 mb-2">{specialization.name}</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {specialization.subjects.map((subject, subIndex) => (
                                  <li key={subIndex} className="flex items-center">
                                    <ChevronRight className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                                    <span>{subject}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-6">
                          <h4 className="text-xl font-semibold mb-4">Admission Requirements</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {degree.admissionRequirements.map((requirement, rIndex) => (
                              <li key={rIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold mb-4">Career Opportunities</h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {degree.careerOpportunities.map((opportunity, oIndex) => (
                              <li key={oIndex} className="flex items-start">
                                <ChevronRight className="h-3 w-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span>{opportunity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('academicPrograms')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Research & Innovation Content */}
      {activeTab === 'research' && data.layout?.showResearchInnovation && safeData('researchInnovation').show && (
        <section className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('researchInnovation').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('researchInnovation').description}
              </p>
            </div>

            {/* Research Areas */}
            {filteredResearchAreas.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Research Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredResearchAreas.map((area, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{area.name}</h4>
                      <p className="text-green-600 font-medium mb-3">{area.funding}</p>
                      <ul className="space-y-2">
                        {area.projects.map((project, pIndex) => (
                          <li key={pIndex} className="flex items-center text-gray-700">
                            <ChevronRight className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research Facilities */}
            {filteredFacilities.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Research Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredFacilities.map((facility, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{facility.name}</h4>
                      <p className="text-gray-600">{facility.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {filteredAchievements.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Achievements</h3>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          {achievement.year}
                        </div>
                        <p className="text-gray-700">{achievement.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('researchInnovation')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* International Programs Content */}
      {activeTab === 'international' && data.layout?.showInternationalPrograms && safeData('internationalPrograms').show && (
        <section className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('internationalPrograms').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('internationalPrograms').description}
              </p>
            </div>

            {/* Partnerships */}
            {filteredPartnerships.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">International Partnerships</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPartnerships.map((partner, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <Globe2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{partner.university}</h4>
                      <p className="text-gray-500 text-sm mb-2">{partner.country}</p>
                      <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                        {partner.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exchange Programs */}
            {filteredExchangePrograms.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Exchange Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredExchangePrograms.map((program, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{program.name}</h4>
                      <p className="text-green-600 font-medium mb-2">{program.duration}</p>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {(safeData('internationalPrograms').benefits || []).length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Benefits of International Exposure</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(safeData('internationalPrograms').benefits || []).map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('internationalPrograms')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Career Support Content */}
      {activeTab === 'career' && data.layout?.showCareerSupport && safeData('careerSupport').show && (
        <section className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('careerSupport').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('careerSupport').description}
              </p>
            </div>

            {/* Services */}
            {filteredCareerServices.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Career Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCareerServices.map((service, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          {renderIcon(service.icon, "h-5 w-5 text-green-600")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Placement Statistics */}
            {filteredPlacementStats.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Placement Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {filteredPlacementStats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        {renderIcon(stat.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{stat.sector}</h4>
                      <p className="text-green-600 font-bold text-2xl">{stat.percentage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Recruiters */}
            {(safeData('careerSupport').topRecruiters || []).length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Top Recruiters</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-wrap gap-3">
                    {(safeData('careerSupport').topRecruiters || []).map((recruiter, index) => (
                      <span key={index} className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Alumni Success */}
            {(safeData('careerSupport').alumniSuccess || []).length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Alumni Success Stories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(safeData('careerSupport').alumniSuccess || []).map((alumni, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-bold text-gray-800 mb-1">{alumni.name}</h4>
                      <p className="text-green-600 font-medium mb-2">{alumni.position}</p>
                      <p className="text-gray-600 text-sm">{alumni.degree}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('careerSupport')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default HigherEducationPage;