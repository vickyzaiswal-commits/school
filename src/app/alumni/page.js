"use client";
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Phone, Mail, ExternalLink, ChevronRight, ArrowRight, Users, Award, Globe, Heart, Building, Settings, X, Edit, Trash2, Plus, Loader2, Eye, EyeOff
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const iconMap = {
  MapPin, Clock, Phone, Mail, ExternalLink, ChevronRight, ArrowRight, Users, Award, Globe, Heart, Building, Settings, X, Edit, Trash2, Plus
};

const defaultData = {
  hero: {
    show: true,
    title: "Our Alumni Community",
    subtitle: "Connecting generations of leaders, innovators, and change-makers",
    backgroundImage: "https://images.unsplash.com/photo-1516321310762-479437144403?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    showImage: true,
    latestHighlight: {
      title: "Welcome Back to Alumni Portal – Yearbook Highlights",
      date: "2025-12-01",
      category: "Featured",
      excerpt: "Check out our featured alumni stories and upcoming reunion events."
    },
    
  },
  introduction: {
    show: true,
    title: "A Legacy of Excellence",
    description: "Our alumni form a vibrant global network, contributing to society through leadership, innovation, and service. Stay connected, share your achievements, and inspire the next generation.",
    stats: [
      { icon: "Users", value: "10,000+", label: "Alumni Worldwide", description: "A global network of graduates", show: true },
      { icon: "Award", value: "50+", label: "Notable Alumni", description: "Leaders in various fields", show: true },
      { icon: "Globe", value: "30+", label: "Countries Represented", description: "A diverse alumni community", show: true }
    ]
  },
  alumniCategories: {
    show: true,
    items: [
      { id: 'all', name: 'All Stories', icon: "Users", show: true },
      { id: 'leadership', name: 'Leadership', icon: "Award", show: true },
      { id: 'innovation', name: 'Innovation', icon: "Globe", show: true },
      { id: 'community', name: 'Community Service', icon: "Heart", show: true }
    ]
  },
  alumniStories: {
    show: true,
    items: [
      {
        id: '1',
        name: "Dr. Anita Sharma",
        description: "Renowned cardiologist leading groundbreaking research in heart disease prevention.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "leadership",
        achievements: ["Published 50+ research papers", "Received National Health Award", "Mentors young doctors"],
        show: true
      },
      {
        id: '2',
        name: "Rahul Kapoor",
        description: "Tech entrepreneur who founded a leading AI startup revolutionizing education.",
        image: "https://images.unsplash.com/photo-1516321310762-479437144403?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "innovation",
        achievements: ["Raised $10M in funding", "Featured in Forbes 30 Under 30", "Developed award-winning app"],
        show: true
      },
      {
        id: '3',
        name: "Priya Mehra",
        description: "Social worker dedicated to uplifting underprivileged communities through education.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d877c828f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "community",
        achievements: ["Founded NGO for education", "Impacted 5,000+ children", "Received Social Impact Award"],
        show: true
      }
    ]
  },
  alumniFeatures: {
    show: true,
    items: [
      {
        icon: "Globe",
        title: "Global Network",
        description: "Join our worldwide alumni network to connect, collaborate, and share opportunities.",
        show: true
      },
      {
        icon: "Award",
        title: "Mentorship Program",
        description: "Mentor current students or seek guidance from experienced alumni in your field.",
        show: true
      },
      {
        icon: "Heart",
        title: "Giving Back",
        description: "Support scholarships, infrastructure, and programs to empower future generations.",
        show: true
      }
    ]
  },
  connectSection: {
    show: true,
    title: "Stay Connected",
    description: "Join our alumni portal, attend events, or share your story to inspire others.",
    primaryCta: "Join Alumni Portal",
    primaryLink: "https://alumni.example.com",
    showPrimary: true,
    secondaryCta: "Attend an Event",
    secondaryLink: "#",
    showSecondary: true
  },
  contactInfo: {
    show: true,
    title: "Connect with Us",
    address: "1, Ashok Place, New Delhi - 110001, India",
    addressShow: true,
    hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM",
    hoursShow: true,
    phone: "011 2336 3462\n011 2336 3134",
    phoneShow: true,
    email: "alumni@stcolumbas.edu.in",
    emailShow: true,
    mapTitle: "Visit Us",
    mapDescription: "Come to our campus for alumni events or meetings.",
    mapShow: true,
    mapEmbedUrl: ""
  },
  showHero: true,
  showIntroduction: true,
  showAlumniStories: true,
  showAlumniFeatures: true,
  showConnectSection: true,
  showContact: true
};

const AlumniPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [isVisible, setIsVisible] = useState({});

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
    introduction: 'showIntroduction',
    alumniStories: 'showAlumniStories',
    alumniFeatures: 'showAlumniFeatures',
    connectSection: 'showConnectSection',
    contactInfo: 'showContact'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showIntroduction: 'Introduction Section',
    showAlumniStories: 'Alumni Stories',
    showAlumniFeatures: 'Alumni Features',
    showConnectSection: 'Connect Section',
    showContact: 'Contact Info'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_alumni_data', {});
        if (res.status === 200 && res.data?.length > 0) {
          const raw = res.data[0].Data;
          let fetched = raw;
          try {
            if (raw && raw.encrypted) {
              fetched = await decryptObject(raw);
            } else if (typeof raw === 'string') {
              fetched = JSON.parse(raw);
            }
          } catch (e) {
            console.warn('Failed to decrypt/parse alumni data, using raw value', e);
            fetched = raw;
          }
          setData({ ...defaultData, ...fetched });
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));

  const saveSectionVisibility = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (e) {
        console.warn('Encryption failed for alumni section visibility — sending raw payload', e);
        payload = data;
      }
      await apiRequest('save_data/save_alumni_data', { payload });
    } catch (error) {
      console.error('Save failed', error);
    }
    setSectionVisibilityModal(false);
  };

  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    const sectionData = { showSection: data[layoutMap[section]] !== false, ...JSON.parse(JSON.stringify(data[section] || {})) };
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
        console.warn('Encryption failed for alumni save — sending raw payload', e);
        payload = newData;
      }
      await apiRequest('save_data/save_alumni_data', { payload });
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
                ) : field === 'achievements' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Achievements (one per line)</label>
                    <textarea
                      value={Array.isArray(item[field]) ? item[field].join('\n') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split('\n'))}
                      placeholder="Enter achievements, one per line"
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                ) : field === 'image' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} accept="image/*" />
                  </div>
                ) : field === 'category' ? (
                  <select
                    key={field}
                    value={item[field] || ''}
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select Category</option>
                    {data.alumniCategories.items?.filter(c => c.show !== false).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field}
                    type="text"
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

  const filteredAlumniCategories = data.alumniCategories.items?.filter(cat => cat.show !== false) || [];
  const filteredAlumniStories = data.alumniStories.items?.filter(story => story.show !== false) || [];
  const filteredAlumniFeatures = data.alumniFeatures.items?.filter(feature => feature.show !== false) || [];
  const filteredIntroductionStats = data.introduction.stats?.filter(stat => stat.show !== false) || [];

  const displayedAlumniStories = activeCategory === 'all'
    ? filteredAlumniStories
    : filteredAlumniStories.filter(story => story.category === activeCategory);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">Toggle sections on or off to control what visitors see on the alumni page.</p>
              <div className="space-y-4">
                {Object.keys(sectionDisplayNames).map(key => (
                  <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      {data[key] ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                      <div>
                        <h3 className="font-medium text-gray-900">{sectionDisplayNames[key]}</h3>
                        <p className="text-sm text-gray-500">{data[key] ? 'Visible' : 'Hidden'}</p>
                      </div>
                    </div>
                    <button onClick={() => toggleSectionVisibility(key)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data[key] ? 'bg-green-600' : 'bg-gray-300'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
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
                  
                </div>
              )}

              {editSection === 'introduction' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" rows="3" className="w-full p-2 border rounded" />
                  {ItemEditor('stats', ['icon', 'value', 'label', 'description'])}
                </div>
              )}

              {editSection === 'alumniCategories' && ItemEditor('items', ['id', 'name', 'icon'])}

              {editSection === 'alumniStories' && ItemEditor('items', ['name', 'description', 'image', 'category', 'achievements'])}

              {editSection === 'alumniFeatures' && ItemEditor('items', ['icon', 'title', 'description'])}

              {editSection === 'connectSection' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" rows="3" className="w-full p-2 border rounded" />
                  <input value={editData.primaryCta || ''} onChange={(e) => handleObjectChange('primaryCta', e.target.value)} placeholder="Primary CTA" className="w-full p-2 border rounded" />
                      <input value={editData.primaryLink || ''} onChange={(e) => handleObjectChange('primaryLink', e.target.value)} placeholder="Primary CTA Link (https://...)" className="w-full p-2 border rounded" />
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.showPrimary !== false} onChange={(e) => handleObjectChange('showPrimary', e.target.checked)} />
                        <span>Show Primary Button</span>
                      </label>
                      <input value={editData.secondaryCta || ''} onChange={(e) => handleObjectChange('secondaryCta', e.target.value)} placeholder="Secondary CTA" className="w-full p-2 border rounded" />
                      <input value={editData.secondaryLink || ''} onChange={(e) => handleObjectChange('secondaryLink', e.target.value)} placeholder="Secondary CTA Link (https://...)" className="w-full p-2 border rounded" />
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.showSecondary !== false} onChange={(e) => handleObjectChange('showSecondary', e.target.checked)} />
                        <span>Show Secondary Button</span>
                      </label>
                </div>
              )}

              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={editData.addressShow !== false} onChange={(e) => handleObjectChange('addressShow', e.target.checked)} />
                    <span>Show Address</span>
                  </label>
                  <textarea value={editData.address || ''} onChange={(e) => handleObjectChange('address', e.target.value)} placeholder="Address" rows="2" className="w-full p-2 border rounded" />

                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={editData.hoursShow !== false} onChange={(e) => handleObjectChange('hoursShow', e.target.checked)} />
                    <span>Show Hours</span>
                  </label>
                  <textarea value={editData.hours || ''} onChange={(e) => handleObjectChange('hours', e.target.value)} placeholder="Hours" rows="2" className="w-full p-2 border rounded" />

                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={editData.phoneShow !== false} onChange={(e) => handleObjectChange('phoneShow', e.target.checked)} />
                    <span>Show Phone</span>
                  </label>
                  <textarea value={editData.phone || ''} onChange={(e) => handleObjectChange('phone', e.target.value)} placeholder="Phone" rows="2" className="w-full p-2 border rounded" />

                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={editData.emailShow !== false} onChange={(e) => handleObjectChange('emailShow', e.target.checked)} />
                    <span>Show Email</span>
                  </label>
                  <input value={editData.email || ''} onChange={(e) => handleObjectChange('email', e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />

                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={editData.mapShow !== false} onChange={(e) => handleObjectChange('mapShow', e.target.checked)} />
                    <span>Show Map</span>
                  </label>
                  <input value={editData.mapTitle || ''} onChange={(e) => handleObjectChange('mapTitle', e.target.value)} placeholder="Map Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.mapDescription || ''} onChange={(e) => handleObjectChange('mapDescription', e.target.value)} placeholder="Map Description" rows="2" className="w-full p-2 border rounded" />
                  <label className="block text-sm font-medium">Map Embed URL (iframe src)</label>
                  <input value={editData.mapEmbedUrl || ''} onChange={(e) => handleObjectChange('mapEmbedUrl', e.target.value)} placeholder="https://www.google.com/maps?...&output=embed" className="w-full p-2 border rounded" />
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.hero?.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden" id="hero">
          {data.hero.showImage !== false && data.hero.backgroundImage && (
            <img src={data.hero.backgroundImage} alt="Alumni Hero" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{data.hero.title}</h1>
              <p className="text-xl text-gray-200">{data.hero.subtitle}</p>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Introduction Section */}
      {data.introduction?.show && (
        <section className="py-16 bg-gray-50 relative" id="introduction">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.introduction.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.introduction.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredIntroductionStats.map((stat) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={stat.label} className="text-center">
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                    <p className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</p>
                    <p className="text-gray-600">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('introduction')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Alumni Stories Section */}
      {data.alumniStories?.show && (
        <section className="py-16 bg-white relative" id="alumniStories">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Alumni Stories</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the achievements of our alumni who are making a difference worldwide</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {filteredAlumniCategories.map((cat) => {
                const IconComponent = iconMap[cat.icon];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${activeCategory === cat.id ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'}`}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5 mr-2 inline" />}
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedAlumniStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img src={story.image} alt={story.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.name}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    {story.achievements && (
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        {story.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('alumniStories')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Alumni Features Section */}
      {data.alumniFeatures?.show && (
        <section className="py-16 bg-gray-50 relative" id="alumniFeatures">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Alumni Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Exclusive opportunities for our alumni community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAlumniFeatures.map((feature) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <div key={feature.title} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('alumniFeatures')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Connect Section */}
      {data.connectSection?.show && (
        <section className="py-16 bg-gradient-to-br from-green-700 to-green-600 text-white relative" id="connectSection">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{data.connectSection.title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{data.connectSection.description}</p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {data.connectSection.showPrimary !== false && data.connectSection.primaryCta && (
                data.connectSection.primaryLink ? (
                  <a href={data.connectSection.primaryLink} target="_blank" rel="noopener noreferrer" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                    {data.connectSection.primaryCta} <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                ) : (
                  <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 flex items-center justify-center">
                    {data.connectSection.primaryCta} <ExternalLink className="ml-2 h-5 w-5" />
                  </button>
                )
              )}

              {data.connectSection.showSecondary !== false && data.connectSection.secondaryCta && (
                data.connectSection.secondaryLink ? (
                  <a href={data.connectSection.secondaryLink} target="_blank" rel="noopener noreferrer" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 flex items-center justify-center">
                    {data.connectSection.secondaryCta}
                  </a>
                ) : (
                  <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10">
                    {data.connectSection.secondaryCta}
                  </button>
                )
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('connectSection')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Info Section */}
      {data.contactInfo?.show && (
        <section className="py-16 bg-white relative" id="contactInfo">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.contactInfo.title}</h2>
                <div className="space-y-6">
                    {data.contactInfo.addressShow !== false && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Address</h3>
                          <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.address}</p>
                        </div>
                      </div>
                    )}

                    {data.contactInfo.hoursShow !== false && (
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Hours</h3>
                          <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.hours}</p>
                        </div>
                      </div>
                    )}

                    {data.contactInfo.phoneShow !== false && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Phone</h3>
                          <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.phone}</p>
                        </div>
                      </div>
                    )}

                    {data.contactInfo.emailShow !== false && (
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <p className="text-gray-600">{data.contactInfo.email}</p>
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div>
                  <h3 className="text-2xl font-bold mb-4">{data.contactInfo.mapTitle}</h3>
                  <p className="text-gray-600 mb-4">{data.contactInfo.mapDescription}</p>
                  {data.contactInfo.mapShow !== false && data.contactInfo.mapEmbedUrl ? (
                    <div className="rounded-lg overflow-hidden h-64">
                      <iframe
                        src={data.contactInfo.mapEmbedUrl}
                        title="Alumni Map"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Map Placeholder</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('contactInfo')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Floating Edit Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 group"
        >
          <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AlumniPage;