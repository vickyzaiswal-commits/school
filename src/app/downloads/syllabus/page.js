"use client";
import React, { useState, useEffect } from 'react';
import { 
  Download, Search, Edit, Trash2, Plus, X, Eye, EyeOff, ChevronDown,
  BookOpen, BookText, Calendar, Users, Award, GraduationCap, BookMarked,
  FileText, ArrowRight, FileQuestion, Filter, FileCheck, FileDigit, Clock,
  ExternalLink
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const iconMap = {
  Download, Search, Filter, BookOpen, BookText, Calendar, FileText, Users,
  Clock, ChevronDown, ArrowRight, ExternalLink, FileCheck: FileText,
  FileDigit: FileText, FileQuestion, GraduationCap, BookMarked, Award, Edit, Trash2, Plus, Eye, EyeOff, X
};

const defaultData = {
  showHero: true,
  showBenefits: true,
  showLevels: true,
  showPopular: true,
  showSyllabus: true,
  showResources: true,
  showCta: true,

  hero: {
    show: true,
    title: "Download Syllabus 2024-2025",
    subtitle: "Access complete curriculum details for all classes",
    height: "h-96",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "12", label: "Classes Covered", show: true },
      { value: "15K+", label: "Total Downloads", show: true },
      { value: "2024-25", label: "Academic Year", show: true }
    ],
    ctaButton: { 
      label: "Browse Syllabus", 
      show: true,
      link: "/syllabus-section",
      openInNewTab: false
    }
  },
  benefits: {
    show: true,
    title: "Why Download Our Syllabus",
    subtitle: "Comprehensive curriculum designed for holistic development",
    items: [
      { icon: "BookOpen", title: "Detailed Coverage", description: "Chapter-wise breakdown with learning objectives", show: true },
      { icon: "Calendar", title: "Academic Planning", description: "Helps in effective study planning", show: true },
      { icon: "Users", title: "Parent Support", description: "Enables better parental guidance", show: true },
      { icon: "Award", title: "Exam Preparation", description: "Aligned with examination patterns", show: true }
    ]
  },
  levels: {
    show: true,
    items: [
      { id: 'all', name: 'All Classes', icon: "Users", count: 12, show: true },
      { id: 'primary', name: 'Primary (I-V)', icon: "BookOpen", count: 5, show: true },
      { id: 'middle', name: 'Middle (VI-VIII)', icon: "BookText", count: 3, show: true },
      { id: 'secondary', name: 'Secondary (IX-X)', icon: "GraduationCap", count: 2, show: true },
      { id: 'senior', name: 'Senior (XI-XII)', icon: "BookMarked", count: 2, show: true }
    ]
  },
  popular: {
    show: true,
    title: "Popular Downloads",
    items: [
      { id: 7, title: "Class X Complete Syllabus", downloads: 1342, show: true },
      { id: 3, title: "Class IX Complete Syllabus", downloads: 1123, show: true },
      { id: 1, title: "Class I Complete Syllabus", downloads: 987, show: true },
      { id: 11, title: "Class II Complete Syllabus", downloads: 987, show: true },
      { id: 4, title: "Class XI Complete Syllabus", downloads: 876, show: true }
    ]
  },
  syllabus: {
    show: true,
    title: "Available Syllabus Materials",
    subtitle: "Search and download syllabus for any class instantly",
    noResultsTitle: "No syllabus materials found",
    noResultsSubtitle: "Try adjusting your search or class level",
    items: [
      { id: 1, title: "Class I Complete Syllabus", grade: "primary", description: "Complete curriculum for Class I including all subjects", format: "PDF", size: "3.2 MB", downloads: 987, updated: "2024-01-15", academicYear: "2024-2025", pages: 45, icon: "FileText", fileUrl: "", show: true },
      { id: 2, title: "Class II Complete Syllabus", grade: "primary", description: "Complete curriculum for Class II including all subjects", format: "PDF", size: "3.0 MB", downloads: 950, updated: "2024-01-20", academicYear: "2024-2025", pages: 42, icon: "FileText", fileUrl: "", show: true },
      { id: 3, title: "Class III Complete Syllabus", grade: "primary", description: "Complete curriculum for Class III including all subjects", format: "PDF", size: "3.5 MB", downloads: 900, updated: "2024-01-25", academicYear: "2024-2025", pages: 48, icon: "FileText", fileUrl: "", show: true },
      { id: 4, title: "Class IV Complete Syllabus", grade: "primary", description: "Complete curriculum for Class IV including all subjects", format: "PDF", size: "3.7 MB", downloads: 850, updated: "2024-01-30", academicYear: "2024-2025", pages: 50, icon: "FileText", fileUrl: "", show: true },
      { id: 5, title: "Class V Complete Syllabus", grade: "primary", description: "Complete curriculum for Class V including all subjects", format: "PDF", size: "3.9 MB", downloads: 800, updated: "2024-02-05", academicYear: "2024-2025", pages: 52, icon: "FileText", fileUrl: "", show: true },
      { id: 6, title: "Class VI Complete Syllabus", grade: "middle", description: "Complete curriculum for Class VI including all subjects", format: "PDF", size: "4.0 MB", downloads: 750, updated: "2024-02-08", academicYear: "2024-2025", pages: 55, icon: "FileText", fileUrl: "", show: true },
      { id: 7, title: "Class VII Complete Syllabus", grade: "middle", description: "Complete curriculum for Class VII including all subjects", format: "PDF", size: "4.2 MB", downloads: 700, updated: "2024-02-10", academicYear: "2024-2025", pages: 58, icon: "FileText", fileUrl: "", show: true },
      { id: 8, title: "Class VIII Complete Syllabus", grade: "middle", description: "Complete curriculum for Class VIII including all subjects", format: "PDF", size: "4.3 MB", downloads: 680, updated: "2024-02-12", academicYear: "2024-2025", pages: 60, icon: "FileText", fileUrl: "", show: true },
      { id: 9, title: "Class IX Complete Syllabus", grade: "secondary", description: "Complete curriculum for Class IX including all subjects", format: "PDF", size: "4.5 MB", downloads: 1123, updated: "2024-02-15", academicYear: "2024-2025", pages: 65, icon: "FileText", fileUrl: "", show: true },
      { id: 10, title: "Class X Complete Syllabus", grade: "secondary", description: "Complete curriculum for Class X including all subjects", format: "PDF", size: "4.7 MB", downloads: 1342, updated: "2024-02-18", academicYear: "2024-2025", pages: 70, icon: "FileText", fileUrl: "", show: true },
      { id: 11, title: "Class XI Complete Syllabus", grade: "senior", description: "Complete curriculum for Class XI including all subjects", format: "PDF", size: "5.0 MB", downloads: 876, updated: "2024-02-20", academicYear: "2024-2025", pages: 75, icon: "FileText", fileUrl: "", show: true },
      { id: 12, title: "Class XII Complete Syllabus", grade: "senior", description: "Complete curriculum for Class XII including all subjects", format: "PDF", size: "5.2 MB", downloads: 850, updated: "2024-02-22", academicYear: "2024-2025", pages: 80, icon: "FileText", fileUrl: "", show: true }
    ]
  },
  resources: {
    show: true,
    title: "Related Resources",
    items: [
      { title: "Academic Calendar", description: "Important dates, exams, and holiday schedule for the academic year", icon: "Calendar", buttonText: "View Calendar", show: true },
      { title: "Textbook List", description: "Recommended textbooks and reference materials for all classes", icon: "BookOpen", buttonText: "Download List", show: true },
      { title: "Teacher Support", description: "Resources and guides for teachers implementing the curriculum", icon: "Users", buttonText: "Access Resources", show: true }
    ]
  },
  cta: {
    show: true,
    title: "Need Help With Curriculum Materials?",
    subtitle: "Contact our academic department for assistance with syllabus materials or curriculum questions",
    buttons: [
      { text: "Contact Academic Department", link: "#", show: true },
      { text: "Request Additional Materials", link: "#", show: true }
    ]
  }
};

const DownloadSyllabusPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeLevel, setActiveLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('grade');
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

  const role = 'admin';

  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    levels: 'showLevels',
    popular: 'showPopular',
    syllabus: 'showSyllabus',
    resources: 'showResources',
    cta: 'showCta'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showBenefits: 'Benefits Section',
    showLevels: 'Class Levels',
    showPopular: 'Popular Downloads',
    showSyllabus: 'Syllabus List',
    showResources: 'Related Resources',
    showCta: 'CTA Section'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_syllabus_data', {});
        if (res.status === 200 && res.data?.length > 0) {
          setData({ ...defaultData, ...res.data[0].Data });
        } else {
          setData(defaultData);
        }
      } catch (err) {
        console.error(err);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredLevels = data.levels?.items?.filter(l => l.show !== false) || [];
  const filteredPopular = data.popular?.items?.filter(p => p.show !== false) || [];
  const syllabusItems = data.syllabus?.items?.filter(s => s.show !== false) || [];

  const filteredSyllabus = syllabusItems
    .filter(material => activeLevel === 'all' || material.grade === activeLevel)
    .filter(material => !searchQuery || material.title.toLowerCase().includes(searchQuery.toLowerCase()) || material.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'grade') {
        const order = { primary: 1, middle: 2, secondary: 3, senior: 4 };
        return (order[a.grade] || 5) - (order[b.grade] || 5) || a.title.localeCompare(b.title);
      }
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'recent') return new Date(b.updated) - new Date(a.updated);
      return 0;
    });

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatDownloadCount = (c) => c >= 1000 ? (c / 1000).toFixed(1) + 'k' : c;
  const getGradeDisplayName = (g) => ({ primary: 'Primary (I-V)', middle: 'Middle (VI-VIII)', secondary: 'Secondary (IX-X)', senior: 'Senior (XI-XII)' })[g] || g;

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));
  
  const saveSectionVisibility = async () => {
    try {
      await apiRequest('save_data/save_syllabus_data', { payload: data });
    } catch (error) {
      console.error('Save failed', error);
    }
    setSectionVisibilityModal(false);
  };

  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    const showKey = layoutMap[section];
    const sectionData = { showSection: data[showKey] !== false, ...JSON.parse(JSON.stringify(data[section] || {})) };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  const saveSection = async () => {
    const newData = { ...data };
    newData[layoutMap[editSection]] = editData.showSection;
    delete editData.showSection;
    newData[editSection] = editData;
    setData(newData);
    try {
      await apiRequest('save_data/save_syllabus_data', { payload: newData });
    } catch (err) {
      console.error(err);
    }
    setEditFormOpen(false);
  };

  const cancelEdit = () => {
    setEditData(originalData);
    setEditFormOpen(false);
  };

  const handleObjectChange = (field, value) => setEditData(prev => ({ ...prev, [field]: value }));
  
  const handleNestedChange = (parent, field, value) => {
    setEditData(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
  };
  
  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayKey]: arr };
    });
  };

  const ItemEditor = (arrayKey, fields = [], isStringArray = false) => {
    const items = editData[arrayKey] || [];

    const removeItem = (index) => {
      setEditData(prev => ({ ...prev, [arrayKey]: items.filter((_, i) => i !== index) }));
    };

    const addNewItem = () => {
      const newItem = isStringArray ? '' : { show: true };
      setEditData(prev => ({ ...prev, [arrayKey]: [...items, newItem] }));
    };

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold">Item {index + 1}</h4>
              <button onClick={() => removeItem(index)} className="text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {isStringArray ? (
              <textarea 
                value={item || ''} 
                onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} 
                placeholder="Enter text" 
                className="w-full p-2 border rounded" 
                rows="4" 
              />
            ) : (
              fields.map(field => (
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
                ) : field === 'grade' ? (
                  <select 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select Level</option>
                    <option value="primary">Primary (I-V)</option>
                    <option value="middle">Middle (VI-VIII)</option>
                    <option value="secondary">Secondary (IX-X)</option>
                    <option value="senior">Senior (XI-XII)</option>
                  </select>
                ) : field === 'fileUrl' ? (
                  <div key={field} className="mb-2">
                    <FileUpload 
                      initialValue={item[field] || ''} 
                      onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} 
                      className="w-full" 
                    />
                  </div>
                ) : (
                  <input
                    key={field}
                    type={field === 'downloads' || field === 'pages' ? 'number' : 'text'}
                    value={item[field] || ''}
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full p-2 border rounded mb-2"
                  />
                )
              ))
            )}
            {!isStringArray && (
              <label className="flex items-center space-x-2 mt-3">
                <input 
                  type="checkbox" 
                  checked={item.show !== false} 
                  onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} 
                />
                <span>Show this item</span>
              </label>
            )}
          </div>
        ))}
        <button onClick={addNewItem} className="flex items-center text-green-600 hover:text-green-700">
          <Plus className="h-4 w-4 mr-2" /> Add New Item
        </button>
      </div>
    );
  };

  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button onClick={onCancel} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
      <button onClick={onSave} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">Save Changes</button>
    </div>
  );

  if (loading) return <div className="flex items-center justify-center min-h-screen text-2xl text-gray-600">Loading syllabus...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the syllabus page.
              </p>
              <div className="space-y-4">
                {Object.keys(sectionDisplayNames).map(sectionKey => (
                  <div key={sectionKey} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {data[sectionKey] ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                      <div>
                        <h3 className="font-medium text-gray-900">{sectionDisplayNames[sectionKey]}</h3>
                        <p className="text-sm text-gray-500">{data[sectionKey] ? 'Visible' : 'Hidden'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(sectionKey)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data[sectionKey] ? 'bg-green-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data[sectionKey] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={`Edit ${editSection}`} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
                <label className="flex items-center space-x-2 text-lg">
                  <input 
                    type="checkbox" 
                    checked={editData.showSection || false} 
                    onChange={(e) => handleObjectChange('showSection', e.target.checked)} 
                  />
                  <span>Show Entire Section</span>
                </label>
              </div>

              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Background Image</span>
                  </label>
                  <div>
                    <label className="block font-medium mb-2">CTA Button</label>
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link URL" className="w-full p-2 border rounded mb-2" />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                        <span>Show CTA Button</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.ctaButton?.openInNewTab || false} onChange={(e) => handleNestedChange('ctaButton', 'openInNewTab', e.target.checked)} />
                        <span>Open in new tab</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Hero Stats</h4>
                    {ItemEditor('stats', ['value', 'label'])}
                  </div>
                </div>
              )}

              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}

              {editSection === 'levels' && ItemEditor('items', ['id', 'name', 'icon', 'count'])}
              
              {editSection === 'popular' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'downloads'])}
                </div>
              )}

              {editSection === 'syllabus' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.noResultsTitle || ''} onChange={(e) => handleObjectChange('noResultsTitle', e.target.value)} placeholder="No Results Title" className="w-full p-2 border rounded" />
                  <input value={editData.noResultsSubtitle || ''} onChange={(e) => handleObjectChange('noResultsSubtitle', e.target.value)} placeholder="No Results Subtitle" className="w-full p-2 border rounded" />
                  <div>
                    <h4 className="font-medium mb-3">Syllabus Materials</h4>
                    {ItemEditor('items', ['title', 'description', 'grade', 'format', 'size', 'downloads', 'updated', 'academicYear', 'pages', 'icon', 'fileUrl'])}
                  </div>
                </div>
              )}

              {editSection === 'resources' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'description', 'icon', 'buttonText'])}
                </div>
              )}

              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text', 'link'])}
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img src={data.hero.backgroundImage} alt={data.hero.imageAlt || ''} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
              {(data.hero.stats || []).filter(s => s.show !== false).length > 0 && (
                <div className="flex flex-wrap gap-8 mt-6">
                  {data.hero.stats.filter(s => s.show !== false).map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-green-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.hero.ctaButton?.show !== false && (
                <a
                  href={data.hero.ctaButton?.link || '#'}
                  target={data.hero.ctaButton?.openInNewTab ? '_blank' : '_self'}
                  rel={data.hero.ctaButton?.openInNewTab ? 'noopener noreferrer' : ''}
                  className="inline-flex mt-6 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>{data.hero.ctaButton.label}</span>
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <div className="absolute top-4 right-4 flex space-x-2">
              <button onClick={() => openEditModal('hero')} className="bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
                <Edit className="h-5 w-5" />
              </button>
            </div>
          )}
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.showBenefits && data.benefits?.show && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.benefits.items?.filter(item => item.show !== false).map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Popular Downloads */}
        {data.showPopular && data.popular?.show && filteredPopular.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.popular.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredPopular.map((item, index) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-green-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{formatDownloadCount(item.downloads)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{formatDownloadCount(item.downloads)} downloads</p>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('popular')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative" id="syllabus-section">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Class Levels Sidebar */}
            {data.showLevels && (
              <div className="lg:w-1/4">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Classes</h3>
                  <div className="space-y-2">
                    {filteredLevels.map(level => {
                      const IconComponent = iconMap[level.icon];
                      return (
                        <button
                          key={level.id}
                          onClick={() => setActiveLevel(level.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-gray-700 hover:bg-gray-100 ${
                            activeLevel === level.id ? 'bg-green-100 text-green-700 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <IconComponent className="h-5 w-5 mr-3" />
                            <span>{level.name}</span>
                          </div>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{level.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Syllabus Materials */}
            {data.showSyllabus && (
              <div className="lg:w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.syllabus?.title}</h3>
                    <p className="text-gray-600">{data.syllabus?.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search syllabus materials..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="grade">Sort by Class</option>
                      <option value="downloads">Most Downloaded</option>
                      <option value="recent">Recently Updated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSyllabus.map(material => {
                    const IconComponent = iconMap[material.icon];
                    return (
                      <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">{material.title}</h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-600">{material.format}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{material.size}</span>
                            </div>
                          </div>
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{material.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Class:</span>
                            <span className="ml-2">{getGradeDisplayName(material.grade)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Academic Year:</span>
                            <span className="ml-2">{material.academicYear}</span>
                          </div>
                          <div>
                            <span className="font-medium">Pages:</span>
                            <span className="ml-2">{material.pages}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>{material.size}</span>
                          <span>Updated {formatDate(material.updated)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm text-gray-600">
                            <Download className="h-4 w-4 mr-1" />
                            {formatDownloadCount(material.downloads)} downloads
                          </span>
                          <a
                            href={material.fileUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredSyllabus.length === 0 && (
                  <div className="text-center py-16">
                    <FileQuestion className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">{data.syllabus?.noResultsTitle}</h3>
                    <p className="text-gray-500">{data.syllabus?.noResultsSubtitle}</p>
                    {(searchQuery || activeLevel !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveLevel('all');
                        }}
                        className="text-green-600 hover:text-green-700 font-medium mt-4"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          {editMode && <button onClick={() => openEditModal('syllabus')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </div>
      </div>

      {/* Resources Section - Background Removed */}
      {data.showResources && data.resources?.show && (
        <section className="py-16 bg-white text-gray-800 relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{data.resources.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.resources.items?.filter(res => res.show !== false).map((resource, index) => {
                const IconComponent = iconMap[resource.icon];
                const colorClasses = [
                  { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', text: 'text-blue-600' },
                  { bg: 'bg-green-50', iconBg: 'bg-green-100', iconColor: 'text-green-600', text: 'text-green-600' },
                  { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', text: 'text-purple-600' }
                ];
                const colors = colorClasses[index % 3];
                return (
                  <div key={index} className={`${colors.bg} rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow`}>
                    <div className={`${colors.iconBg} rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                      <IconComponent className={`h-6 w-6 ${colors.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <button className={`${colors.text} hover:opacity-80 text-sm font-medium flex items-center transition-colors`}>
                      {resource.buttonText} <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* CTA Section */}
      {data.showCta && data.cta?.show && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {data.cta.buttons?.filter(b => b.show !== false).map((button, index) => (
                <a
                  key={index}
                  href={button.link || '#'}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    index === 0 ? 'bg-white text-green-700 hover:bg-gray-100' : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Floating Edit Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
        >
          <Edit className="h-7 w-7" />
        </button>
      )}
    </div>
  );
};

export default DownloadSyllabusPage;