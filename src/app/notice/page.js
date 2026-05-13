"use client";
import React, { useState, useEffect } from 'react';
import {
  Megaphone, Calendar, FileText, Download, Edit, Trash2, Plus, X,
  Eye, EyeOff, Settings, AlertCircle, Loader2
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Spinner from '@/components/Spinner/Spinner';
import Image from 'next/image';

const defaultData = {
  showHero: true,
  showCategories: true,
  showNotices: true,

  hero: {
    show: true,
    title: "School Notices & Announcements",
    subtitle: "Stay updated with the latest circulars, events, and important information from Abc School.",
    backgroundImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    showImage: true,
    latestNotice: {
      title: "Welcome Back to School – Term II Guidelines",
      date: "2025-12-01",
      category: "General",
      excerpt: "Dear Parents & Students, please go through the updated guidelines for Term II..."
    }
  },

  categories: {
    show: true,
    title: "Browse by Category",
    subtitle: "Filter notices by department or type",
    items: [
      { name: "All Notices", value: "all", color: "bg-gray-600", show: true },
      { name: "General", value: "general", color: "bg-blue-600", show: true },
      { name: "Academics", value: "academics", color: "bg-green-600", show: true },
      { name: "Examinations", value: "exams", color: "bg-purple-600", show: true },
      { name: "Events & Activities", value: "events", color: "bg-yellow-600", show: true },
      { name: "Holidays", value: "holidays", color: "bg-red-600", show: true },
      { name: "Admissions", value: "admissions", color: "bg-indigo-600", show: true }
    ]
  },

  notices: {
    show: true,
    title: "Latest Notices",
    subtitle: "Important updates and circulars from the school administration",
    items: [
      {
        id: "1",
        title: "Winter Vacation Homework – Class X & XII",
        date: "2025-12-05",
        category: "academics",
        excerpt: "Subject-wise holiday homework has been uploaded. Students are requested to complete and submit on reopening.",
        content: "Detailed holiday homework guidelines for Classes X and XII have been uploaded on the school portal. Students must download and complete all assignments before the school reopens on 6th January 2026.",
        attachment: null,
        pinned: true,
        show: true
      },
      {
        id: "2",
        title: "Annual Sports Day 2025 – Schedule & Guidelines",
        date: "2025-11-28",
        category: "events",
        excerpt: "The much-awaited Annual Sports Day will be held on 15th December 2025.",
        content: "Detailed schedule, events list, participation guidelines, and practice timings are attached. Parents are requested to encourage participation.",
        attachment: "https://example.com/sports-schedule.pdf",
        pinned: false,
        show: true
      }
    ]
  }
};

const NoticePage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState(null);

  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
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

  const layoutMap = {
    hero: 'showHero',
    categories: 'showCategories',
    notices: 'showNotices'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showCategories: 'Categories',
    showNotices: 'Notices List'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_notice_data', {});
        if (res.status === 200 && res.data?.length > 0) {
          const raw = res.data[0].data;
          let fetched = raw;
          try {
            if (raw && raw.encrypted) {
              fetched = await decryptObject(raw);
            } else if (typeof raw === 'string') {
              fetched = JSON.parse(raw);
            }
          } catch (e) {
            console.warn('Failed to decrypt/parse notice data, using raw value', e);
            fetched = raw;
          }
          setData({ ...defaultData, ...fetched });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));

  const saveSectionVisibility = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (e) {
        console.warn('Encryption failed for notice section visibility — sending raw payload', e);
        payload = data;
      }
      await apiRequest('save_data/save_notice_data', { payload });
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
      let payload = newData;
      try {
        payload = await encryptObject(newData);
      } catch (e) {
        console.warn('Encryption failed for notice save — sending raw payload', e);
        payload = newData;
      }
      await apiRequest('save_data/save_notice_data', { payload });
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

  const ItemEditor = (arrayKey, isNotice = false) => {
    const items = editData[arrayKey] || [];

    const removeItem = (index) => {
      setEditData(prev => ({ ...prev, [arrayKey]: items.filter((_, i) => i !== index) })); // ← Fixed: was "set SchData"
    };

    const addNewItem = () => {
      const newItem = isNotice
        ? { id: Date.now().toString(), title: "", date: "", category: "general", excerpt: "", content: "", attachment: "", pinned: false, show: true }
        : { name: "", value: "", color: "bg-gray-600", show: true };
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

            {isNotice ? (
              <>
                <input value={item.title || ''} onChange={e => handleArrayChange(arrayKey, index, 'title', e.target.value)} placeholder="Notice Title" className="w-full p-2 border rounded mb-2" />
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <input type="date" value={item.date || ''} onChange={e => handleArrayChange(arrayKey, index, 'date', e.target.value)} className="p-2 border rounded" />
                  <select value={item.category || 'general'} onChange={e => handleArrayChange(arrayKey, index, 'category', e.target.value)} className="p-2 border rounded">
                    {data.categories.items.filter(c => c.show !== false).map(c => (
                      <option key={c.value} value={c.value}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <textarea value={item.excerpt || ''} onChange={e => handleArrayChange(arrayKey, index, 'excerpt', e.target.value)} placeholder="Short excerpt" rows={2} className="w-full p-2 border rounded mb-2" />
                <textarea value={item.content || ''} onChange={e => handleArrayChange(arrayKey, index, 'content', e.target.value)} placeholder="Full content" rows={5} className="w-full p-2 border rounded mb-2" />
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Attachment</label>
                  <FileUpload initialValue={item.attachment || ''} onUpload={url => handleArrayChange(arrayKey, index, 'attachment', url)} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                </div>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2"><input type="checkbox" checked={item.pinned || false} onChange={e => handleArrayChange(arrayKey, index, 'pinned', e.target.checked)} /><span>Pinned</span></label>
                  <label className="flex items-center space-x-2"><input type="checkbox" checked={item.show !== false} onChange={e => handleArrayChange(arrayKey, index, 'show', e.target.checked)} /><span>Show</span></label>
                </div>
              </>
            ) : (
              <>
                <input value={item.name || ''} onChange={e => handleArrayChange(arrayKey, index, 'name', e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
                <input value={item.value || ''} onChange={e => handleArrayChange(arrayKey, index, 'value', e.target.value)} placeholder="Value (lowercase)" className="w-full p-2 border rounded mb-2" />
                <input value={item.color || ''} onChange={e => handleArrayChange(arrayKey, index, 'color', e.target.value)} placeholder="Color (e.g. bg-green-600)" className="w-full p-2 border rounded mb-2" />
                <label className="flex items-center space-x-2"><input type="checkbox" checked={item.show !== false} onChange={e => handleArrayChange(arrayKey, index, 'show', e.target.checked)} /><span>Show</span></label>
              </>
            )}
          </div>
        ))}
        <button onClick={addNewItem} className="flex items-center text-green-600 hover:text-green-700">
          <Plus className="h-4 w-4 mr-2" /> Add New {isNotice ? 'Notice' : 'Category'}
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

  const filteredNotices = data.notices?.items?.filter(n => n.show && (selectedCategory === "all" || n.category === selectedCategory)) || [];
  const pinnedNotices = filteredNotices.filter(n => n.pinned);
  const regularNotices = filteredNotices.filter(n => !n.pinned);

  if (loading) return (
    <Spinner />
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the notice page.
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
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" rows="3" className="w-full p-2 border rounded" />
                  <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Background Image</span>
                  </label>
                  {/* Featured Notice editor removed */}
                </div>
              )}

              {editSection === 'categories' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" rows="2" className="w-full p-2 border rounded" />
                  {ItemEditor('items')}
                </div>
              )}

              {editSection === 'notices' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" rows="2" className="w-full p-2 border rounded" />
                  {ItemEditor('items', true)}
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero.showImage !== false && data.hero.backgroundImage && (
            <Image src={data.hero.backgroundImage} alt="Notices" fill className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
              {/* Featured Notice display removed */}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Categories Section */}
      {data.showCategories && data.categories?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.categories.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.categories.subtitle}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {data.categories.items.filter(c => c.show !== false).map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === cat.value ? cat.color + ' text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('categories')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Notices Section */}
      {data.showNotices && data.notices?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.notices.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.notices.subtitle}</p>
            </div>

            {pinnedNotices.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-red-700 mb-8 text-center flex items-center justify-center gap-3">
                  <AlertCircle className="h-8 w-8" /> Important Notices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pinnedNotices.map(notice => (
                    <div key={notice.id} onClick={() => setSelectedNotice(notice)} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer border-2 border-red-200">
                      <div className="bg-red-600 text-white text-center py-2 text-sm font-semibold">PINNED</div>
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">{notice.title}</h4>
                        <p className="text-sm text-gray-500 mb-3">{notice.date}</p>
                        <p className="text-gray-600">{notice.excerpt}</p>
                        {notice.attachment && (
                          <div className="mt-4 text-green-600 font-medium flex items-center gap-2">
                            <Download className="h-5 w-5" /> Attachment Available
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNotices.length === 0 ? (
                <p className="col-span-full text-center text-gray-500 py-12 text-lg">No notices found in this category.</p>
              ) : (
                regularNotices.map(notice => {
                  const category = data.categories.items.find(c => c.value === notice.category);
                  return (
                    <div key={notice.id} onClick={() => setSelectedNotice(notice)} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-green-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${category?.color || 'bg-gray-600'}`}>
                          {category?.name || notice.category}
                        </span>
                        <span className="text-xs text-gray-500">{notice.date}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">{notice.title}</h4>
                      <p className="text-gray-600 line-clamp-3">{notice.excerpt}</p>
                      {notice.attachment && (
                        <div className="mt-4 text-green-600 font-medium flex items-center gap-2">
                          <Download className="h-5 w-5" /> Download File
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('notices')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedNotice(null)}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">{selectedNotice.title}</h2>
              <button onClick={() => setSelectedNotice(null)}>
                <X className="h-6 w-6 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <span className="flex items-center gap-2"><Calendar className="h-5 w-5" /> {selectedNotice.date}</span>
                <span className="flex items-center gap-2"><FileText className="h-5 w-5" /> {data.categories.items.find(c => c.value === selectedNotice.category)?.name || selectedNotice.category}</span>
                {selectedNotice.pinned && <span className="text-red-600 font-bold">PINNED</span>}
              </div>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="whitespace-pre-line">{selectedNotice.content}</p>
              </div>
              {selectedNotice.attachment && (
                <a href={selectedNotice.attachment} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold">
                  <Download className="h-5 w-5 mr-2" /> Download Attachment
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Edit Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 group"
        >
          <Edit className="h-5 w-5 group-hover:rotate-90 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default NoticePage;