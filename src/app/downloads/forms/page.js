"use client";
import React, { useState, useEffect } from 'react';
import { 
  Download, Search, FileText, BookOpen, Users, Award, MapPin, Heart, Clock,
  ChevronRight, Edit, Trash2, Plus, X, Eye, EyeOff, Utensils
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const iconMap = {
  Download, Search, FileText, BookOpen, Users, Award, MapPin, Heart, Clock,
  ChevronRight, Edit, Trash2, Plus, X, Eye, EyeOff, Utensils
};

const categoryOptions = [
  { id: 'all', name: 'All Forms' },
  { id: 'admission', name: 'Admission' },
  { id: 'academic', name: 'Academic' },
  { id: 'transport', name: 'Transport' },
  { id: 'medical', name: 'Medical' },
  { id: 'administrative', name: 'Administrative' },
  { id: 'extracurricular', name: 'Extracurricular' },
  { id: 'scholarship', name: 'Scholarship' },
  { id: 'hostel', name: 'Hostel' },
  { id: 'library', name: 'Library' },
  { id: 'sports', name: 'Sports' },
  { id: 'cultural', name: 'Cultural' }
];

const DownloadFormsPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const role = 'admin';

  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    categories: 'showCategories',
    forms: 'showForms',
    cta: 'showCta'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showBenefits: 'Benefits Section',
    showCategories: 'Categories Sidebar',
    showForms: 'Forms List Section',
    showCta: 'CTA Section'
  };

  const defaultData = {
    showHero: true,
    showBenefits: true,
    showCategories: true,
    showForms: true,
    showCta: true,
    hero: {
      show: true,
      title: "Download Forms 2024-2025",
      subtitle: "Access all school forms, applications and documents in one place",
      height: "h-96",
      showImage: true,
      backgroundImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      stats: [
        { value: "50+", label: "Forms Available", show: true },
        { value: "15K+", label: "Total Downloads", show: true },
        { value: "6", label: "Categories", show: true }
      ],
      ctaButton: { label: "Browse All Forms", show: true }
    },
    benefits: {
      show: true,
      title: "Why Use Our Forms Portal",
      subtitle: "Streamlined access to all necessary documents for students, parents and staff",
      items: [
        { icon: "FileText", title: "Easy Access", description: "Download forms anytime, anywhere", show: true },
        { icon: "Download", title: "Multiple Formats", description: "Available in PDF, DOCX, and more", show: true },
        { icon: "Clock", title: "Up-to-Date", description: "Always the latest versions", show: true },
        { icon: "Users", title: "For Everyone", description: "Forms for students, parents and staff", show: true }
      ]
    },
    categories: {
      show: true,
      items: categoryOptions.map((cat) => ({
        id: cat.id,
        name: cat.name,
        icon: cat.id === 'all' ? "FileText" : cat.id === 'admission' ? "BookOpen" : cat.id === 'academic' ? "Award" : "Users",
        count: 0,
        show: true
      }))
    },
    forms: {
      show: true,
      title: "Available Forms & Documents",
      subtitle: "Search and download any form instantly",
      noResultsTitle: "No forms found",
      noResultsSubtitle: "Try adjusting your search or category",
      items: [
        { id: 1, title: "Admission Application Form 2025-26", category: "admission", description: "Complete application for new student enrollment", format: "PDF", size: "2.1 MB", fileUrl: "", downloads: 1847, icon: "FileText", show: true },
        { id: 2, title: "Medical & Health Declaration", category: "medical", description: "Required health information and medical history form", format: "PDF/DOCX", size: "1.8 MB", fileUrl: "", downloads: 923, icon: "Heart", show: true },
        { id: 3, title: "Transport Request Form", category: "transport", description: "Apply for school bus service or route change", format: "PDF", size: "980 KB", fileUrl: "", downloads: 567, icon: "MapPin", show: true }
      ]
    },
    cta: {
      show: true,
      title: "Can't Find the Form You Need?",
      subtitle: "Our administrative team is ready to assist you",
      buttons: [
        { text: "Request a Form", link: "mailto:admin@school.com", show: true },
        { text: "Contact Office", link: "/contact", show: true }
      ]
    }
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_downloads_data', {});
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

  const filteredCategories = data.categories?.items?.filter(c => c.show !== false) || [];
  const allForms = data.forms?.items?.filter(f => f.show !== false) || [];

  const filteredForms = allForms
    .filter(f => activeCategory === 'all' || f.category === activeCategory)
    .filter(f => f.title?.toLowerCase().includes(searchQuery.toLowerCase()) || f.description?.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleSectionVisibility = (sectionKey) => {
    setData(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const saveSectionVisibility = async () => {
    try {
      await apiRequest('save_data/save_downloads_data', { payload: data });
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
      await apiRequest('save_data/save_downloads_data', { payload: newData });
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
  const handleNestedChange = (parent, field, value) => setEditData(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const arr = [...(prev[arrayKey] || [])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [arrayKey]: arr };
    });
  };

  const ItemEditor = (arrayKey, fields = [], isStringArray = false) => {
    const items = editData[arrayKey] || [];
    const visibleCategoryOptions = categoryOptions.filter(opt =>
      data.categories?.items?.find(c => c.id === opt.id && c.show !== false)
    );

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
              <textarea value={item || ''} onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} placeholder="Enter text" className="w-full p-2 border rounded" rows="4" />
            ) : (
              fields.map(field => (
                field === 'icon' ? (
                  <select key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} className="w-full p-2 border rounded mb-2">
                    <option value="">Select Icon</option>
                    {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                  </select>
                ) : field === 'category' ? (
                  <select key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} className="w-full p-2 border rounded mb-2">
                    <option value="">Select Category</option>
                    {visibleCategoryOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                ) : field === 'fileUrl' ? (
                  <div key={field} className="mb-2">
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} className="w-full" />
                  </div>
                ) : (
                  <input
                    key={field}
                    type={field === 'downloads' ? 'number' : 'text'}
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
                <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} />
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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-2xl text-gray-600">Loading forms...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the downloads page.
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
                  <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                  <span>Show Entire Section</span>
                </label>
              </div>

              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full" />
                  <label className="flex items-center space-x-2"><input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} /><span>Show Background Image</span></label>
                  <div><label className="block font-medium mb-2">CTA Button</label><input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" /><label className="flex items-center space-x-2"><input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} /><span>Show CTA Button</span></label></div>
                  <div><h4 className="font-medium mb-2">Hero Stats</h4>{ItemEditor('stats', ['value', 'label'])}</div>
                </div>
              )}

              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}

              {editSection === 'categories' && ItemEditor('items', ['id', 'name', 'icon', 'count'])}

              {editSection === 'forms' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.noResultsTitle || ''} onChange={(e) => handleObjectChange('noResultsTitle', e.target.value)} placeholder="No Results Title" className="w-full p-2 border rounded" />
                  <input value={editData.noResultsSubtitle || ''} onChange={(e) => handleObjectChange('noResultsSubtitle', e.target.value)} placeholder="No Results Subtitle" className="w-full p-2 border rounded" />
                  <div><h4 className="font-medium mb-3">Forms List</h4>{ItemEditor('items', ['title', 'description', 'category', 'format', 'size', 'downloads', 'icon', 'fileUrl'])}</div>
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

      {/* Hero */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && <img src={data.hero.backgroundImage} alt={data.hero.title || ''} className="absolute inset-0 w-full h-full object-cover opacity-50" />}
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
                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> {data.hero.ctaButton.label}
                </button>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Benefits */}
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

        {/* Categories + Forms */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <div className="flex flex-col lg:flex-row gap-8">
            {data.showCategories && (
              <div className="lg:w-1/4">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {filteredCategories.map(category => {
                      const Icon = iconMap[category.icon] || FileText;
                      return (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-gray-700 hover:bg-gray-100 ${activeCategory === category.id ? 'bg-green-100 text-green-700 font-medium' : ''}`}
                        >
                          <div className="flex items-center">
                            <Icon className="h-5 w-5 mr-3" />
                            <span>{category.name}</span>
                          </div>
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{category.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {data.showForms && (
              <div className="lg:w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.forms?.title}</h3>
                    <p className="text-gray-600">{data.forms?.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search forms..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredForms.map(form => {
                    const Icon = iconMap[form.icon] || FileText;
                    return (
                      <div key={form.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">{form.title}</h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-600">{form.format}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{form.size}</span>
                            </div>
                          </div>
                          <Icon className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{form.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>{form.downloads} downloads</span>
                        </div>
                        <a
                          href={form.fileUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download {form.format}
                        </a>
                      </div>
                    );
                  })}
                </div>

                {filteredForms.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">{data.forms?.noResultsTitle}</h3>
                    <p className="text-gray-500">{data.forms?.noResultsSubtitle}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {editMode && <button onClick={() => openEditModal('forms')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </div>
      </div>

      {/* CTA */}
      {data.showCta && data.cta?.show && (
        <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {data.cta.buttons?.filter(b => b.show !== false).map((button, index) => (
                <a
                  key={index}
                  href={button.link || '#'}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${index === 0 ? 'bg-white text-green-700 hover:bg-gray-100' : 'bg-transparent border border-white text-white hover:bg-white/10'}`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Floating Edit Button - Opens Visibility Modal */}
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

export default DownloadFormsPage;