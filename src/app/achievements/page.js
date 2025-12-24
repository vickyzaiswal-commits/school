"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy, Award, Star, TrendingUp, Calendar, Users, Target, Globe,
  Medal, ChevronDown, Loader2, Download, Edit, Trash2, Plus, X,
  Eye, EyeOff, Settings, Filter, Share, Search, ChevronRight,
  BarChart, PieChart, LineChart, BookOpen, GraduationCap
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const iconMap = {
  Trophy, Award, Star, TrendingUp, Calendar, Users, Target, Globe,
  Medal, ChevronDown, Loader2, Download, Edit, Trash2, Plus, X,
  Eye, EyeOff, Settings, Filter, Share, Search, ChevronRight,
  BarChart, PieChart, LineChart, BookOpen, GraduationCap
};

const defaultData = {
  showHero: true,
  showStats: true,
  showAcademic: true,
  showSports: true,
  showCultural: true,
  showAlumni: true,
  showTimeline: true,
  showGallery: true,
  
  hero: {
    show: true,
    title: "Celebrating Excellence at Abc School",
    subtitle: "Discover the remarkable achievements, awards, and milestones that showcase our commitment to holistic education and student success.",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "150+", label: "National Awards", show: true },
      { value: "98%", label: "Board Results", show: true },
      { value: "500+", label: "Students in Sports", show: true },
      { value: "75", label: "Cultural Events", show: true }
    ],
    ctaButton: { 
      label: "View Our Gallery", 
      show: true,
      link: "#achievement-gallery"
    },
    secondaryButton: {
      label: "Download Report",
      show: true,
      link: "/achievements-report.pdf"
    }
  },
  
  stats: {
    show: true,
    title: "Our Achievement Highlights",
    subtitle: "A comprehensive look at our accomplishments across various domains",
    items: [
      {
        icon: "GraduationCap",
        title: "Academic Excellence",
        value: "98.5%",
        description: "Average board results over the last 5 years",
        trend: "+2.3%",
        show: true
      },
      {
        icon: "Trophy",
        title: "Sports Championships",
        value: "42",
        description: "National level championships won",
        trend: "+8 this year",
        show: true
      },
      {
        icon: "Award",
        title: "Cultural Awards",
        value: "75+",
        description: "Awards in music, dance, and arts",
        trend: "Record high",
        show: true
      },
      {
        icon: "Globe",
        title: "International Recognition",
        value: "12",
        description: "International competitions participated",
        trend: "New regions",
        show: true
      }
    ]
  },
  
  academic: {
    show: true,
    title: "Academic Achievements",
    subtitle: "Celebrating scholastic excellence and intellectual accomplishments",
    categories: [
      {
        id: 'board-results',
        name: 'Board Results',
        description: 'Outstanding performance in CBSE examinations',
        achievements: [
          { year: '2024', description: 'School Topper: 98.6% in CBSE Class XII', highlight: true },
          { year: '2023', description: 'Perfect 100 in Mathematics: 15 students', highlight: true },
          { year: '2022', description: '100% pass rate for 10th consecutive year', highlight: true }
        ],
        show: true
      },
      {
        id: 'olympiads',
        name: 'Olympiads & Competitions',
        description: 'Success in national and international competitions',
        achievements: [
          { year: '2024', description: 'NTSE: 5 students selected for national camp' },
          { year: '2023', description: 'International Math Olympiad: Silver Medal' },
          { year: '2022', description: 'Science Olympiad: 3 Gold Medals' }
        ],
        show: true
      },
      {
        id: 'research',
        name: 'Research & Innovation',
        description: 'Student projects and research initiatives',
        achievements: [
          { year: '2024', description: 'National Science Fair: Best Innovation Award' },
          { year: '2023', description: 'Published 3 research papers in student journals' },
          { year: '2022', description: 'AI Project selected for national exhibition' }
        ],
        show: true
      }
    ]
  },
  
  sports: {
    show: true,
    title: "Sports & Athletics",
    subtitle: "Victories on the field and recognition in sports",
    featured: {
      title: "Championship Highlights",
      achievements: [
        {
          sport: "Basketball",
          achievement: "National School Games Champions 2024",
          level: "National",
          students: ["Rohan Sharma", "Priya Mehta", "Arjun Patel"],
          year: "2024",
          show: true
        },
        {
          sport: "Swimming",
          achievement: "5 Gold Medals in State Championships",
          level: "State",
          students: ["Ananya Singh", "Kabir Verma"],
          year: "2024",
          show: true
        },
        {
          sport: "Athletics",
          achievement: "Record in 100m Sprint - State Level",
          level: "State",
          students: ["Raj Malhotra"],
          year: "2023",
          show: true
        }
      ]
    },
    categories: [
      { name: "Team Sports", count: "8 championships", icon: "Users", show: true },
      { name: "Individual Sports", count: "24 gold medals", icon: "Medal", show: true },
      { name: "Annual Sports", count: "3 records broken", icon: "TrendingUp", show: true }
    ]
  },
  
  cultural: {
    show: true,
    title: "Cultural & Arts Achievements",
    subtitle: "Excellence in performing and visual arts",
    sections: [
      {
        category: "Music",
        achievements: [
          { event: "National Music Competition", award: "First Prize", year: "2024", show: true },
          { event: "Inter-School Orchestra", award: "Best Performance", year: "2023", show: true }
        ],
        show: true
      },
      {
        category: "Dance",
        achievements: [
          { event: "National Dance Championship", award: "Gold Medal", year: "2024", show: true },
          { event: "Cultural Festival", award: "Judges Choice Award", year: "2023", show: true }
        ],
        show: true
      },
      {
        category: "Visual Arts",
        achievements: [
          { event: "International Art Exhibition", award: "Special Mention", year: "2024", show: true },
          { event: "National Painting Competition", award: "Second Prize", year: "2023", show: true }
        ],
        show: true
      }
    ]
  },
  
  alumni: {
    show: true,
    title: "Distinguished Alumni Achievements",
    subtitle: "Our alumni making a mark in various fields worldwide",
    achievements: [
      {
        name: "Dr. Anjali Rao",
        batch: "2005",
        achievement: "Nobel Prize in Physics 2023",
        current: "Professor at MIT",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        show: true
      },
      {
        name: "Rahul Kapoor",
        batch: "2010",
        achievement: "Forbes 30 Under 30 - Technology",
        current: "CEO, TechGen Solutions",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        show: true
      },
      {
        name: "Meera Sharma",
        batch: "2012",
        achievement: "Olympic Gold Medalist - Swimming",
        current: "National Coach",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        show: true
      }
    ]
  },
  
  timeline: {
    show: true,
    title: "Milestones Timeline",
    subtitle: "Key achievements through the years",
    events: [
      {
        year: "2024",
        title: "National School Ranking - Top 10",
        description: "Ranked among top 10 schools in India by Education Today",
        category: "Recognition",
        show: true
      },
      {
        year: "2023",
        title: "Green School Award",
        description: "Received national award for environmental initiatives",
        category: "Sustainability",
        show: true
      },
      {
        year: "2022",
        title: "75 Years Celebration",
        description: "Successfully completed 75 years of excellence in education",
        category: "Milestone",
        show: true
      },
      {
        year: "2021",
        title: "Digital Learning Initiative",
        description: "Recognized as pioneer in digital education during pandemic",
        category: "Innovation",
        show: true
      }
    ]
  },
  
  gallery: {
    show: true,
    title: "Achievements Gallery",
    subtitle: "Visual moments of success and celebration",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "National Science Fair Winners 2024",
        category: "Academic",
        show: true
      },
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Basketball Championship Victory",
        category: "Sports",
        show: true
      },
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        caption: "Cultural Festival Performance",
        category: "Cultural",
        show: true
      }
    ],
    viewAllText: "View All Photos",
    viewAllLink: "/gallery"
  }
};

const AchievementsPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('board-results');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    stats: 'showStats',
    academic: 'showAcademic',
    sports: 'showSports',
    cultural: 'showCultural',
    alumni: 'showAlumni',
    timeline: 'showTimeline',
    gallery: 'showGallery'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showStats: 'Statistics',
    showAcademic: 'Academic Achievements',
    showSports: 'Sports Achievements',
    showCultural: 'Cultural Achievements',
    showAlumni: 'Alumni Achievements',
    showTimeline: 'Timeline',
    showGallery: 'Gallery'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_achievement_data', {});
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
            console.warn('Failed to decrypt/parse achievement data, using raw value', e);
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

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));

  const saveSectionVisibility = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (e) {
        console.warn('Encryption failed for achievement section visibility — sending raw payload', e);
        payload = data;
      }
      await apiRequest('save_data/save_achievement_data', { payload });
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
        console.warn('Encryption failed for achievement save — sending raw payload', e);
        payload = newData;
      }
      await apiRequest('save_data/save_achievement_data', { payload });
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
                field === 'icon' || field === 'category' ? (
                  <select
                    key={field}
                    value={item[field] || ''}
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select {field}</option>
                    {field === 'icon' ? (
                      Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)
                    ) : (
                      ['Academic', 'Sports', 'Cultural', 'Recognition', 'Milestone', 'Innovation'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    )}
                  </select>
                ) : field === 'students' || field === 'achievements' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)} (one per line)</label>
                    <textarea
                      value={Array.isArray(item[field]) ? item[field].join('\n') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split('\n'))}
                      placeholder={`Enter ${field}, one per line`}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                ) : field === 'image' || field === 'url' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">{field === 'url' ? 'Image URL / Upload' : 'Image'}</label>
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} accept="image/*" className="w-full" />
                  </div>
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <div className="text-2xl text-gray-600">Loading achievements page...</div>
      </div>
    </div>
  );

  const currentAcademicCategory = data.academic?.categories?.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the achievements page.
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
                    <h4 className="font-medium mb-2">Hero Stats</h4>
                    {ItemEditor('stats', ['value', 'label'])}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">CTA Button</h4>
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link URL" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Secondary Button</h4>
                    <input value={editData.secondaryButton?.label || ''} onChange={(e) => handleNestedChange('secondaryButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.secondaryButton?.link || ''} onChange={(e) => handleNestedChange('secondaryButton', 'link', e.target.value)} placeholder="Button Link URL" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.secondaryButton?.show !== false} onChange={(e) => handleNestedChange('secondaryButton', 'show', e.target.checked)} />
                      <span>Show Secondary Button</span>
                    </label>
                  </div>
                </div>
              )}

              {editSection === 'stats' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'value', 'description', 'trend'])}
                </div>
              )}

              {editSection === 'academic' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('categories', ['id', 'name', 'description'])}
                </div>
              )}

              {editSection === 'sports' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <div>
                    <h4 className="font-medium mb-2">Featured Achievements</h4>
                    {ItemEditor('featured.achievements', ['sport', 'achievement', 'level', 'students', 'year'])}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Categories</h4>
                    {ItemEditor('categories', ['name', 'count', 'icon'])}
                  </div>
                </div>
              )}

              {editSection === 'cultural' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('sections', ['category'])}
                </div>
              )}

              {editSection === 'alumni' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('achievements', ['name', 'batch', 'achievement', 'current', 'image'])}
                </div>
              )}

              {editSection === 'timeline' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('events', ['year', 'title', 'description', 'category'])}
                </div>
              )}

              {editSection === 'gallery' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.viewAllText || ''} onChange={(e) => handleObjectChange('viewAllText', e.target.value)} placeholder="View All Text" className="w-full p-2 border rounded mb-2" />
                  <input value={editData.viewAllLink || ''} onChange={(e) => handleObjectChange('viewAllLink', e.target.value)} placeholder="View All Link URL" className="w-full p-2 border rounded" />
                  <div>
                    <h4 className="font-medium mb-2">Gallery Images</h4>
                    {ItemEditor('images', ['url', 'caption', 'category'])}
                  </div>
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
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img
              src={data.hero.backgroundImage}
              alt="Achievements Hero"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
              {(data.hero.stats || []).filter(stat => stat.show !== false).length > 0 && (
                <div className="flex flex-wrap gap-8 mt-6">
                  {data.hero.stats.filter(stat => stat.show !== false).map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-green-300">{stat.value}</div>
                      <div className="text-green-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-4 mt-6">
                {data.hero.ctaButton?.show !== false && (
                  <a
                    href={data.hero.ctaButton?.link || '#achievement-gallery'}
                    className="inline-flex bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 items-center space-x-2"
                  >
                    <Trophy className="h-5 w-5" />
                    <span>{data.hero.ctaButton?.label}</span>
                  </a>
                )}
                {data.hero.secondaryButton?.show !== false && (
                  <a
                    href={data.hero.secondaryButton?.link || '/achievements-report.pdf'}
                    className="inline-flex border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 items-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>{data.hero.secondaryButton?.label}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-10 opacity-10">
            <Trophy className="h-32 w-32" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Award className="h-24 w-24" />
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Stats Section */}
      {data.showStats && data.stats?.show && (
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.stats.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.stats.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.stats.items?.filter(item => item.show !== false).map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 shadow-lg"
                  >
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="text-4xl font-bold text-gray-800 mb-2">{item.value}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <div className="inline-flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {item.trend}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('stats')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Academic Achievements */}
      {data.showAcademic && data.academic?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.academic.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.academic.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {data.academic.categories?.filter(cat => cat.show !== false).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {currentAcademicCategory && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 max-w-4xl mx-auto border border-green-100 shadow-xl">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{currentAcademicCategory.name}</h3>
                  <p className="text-gray-600">{currentAcademicCategory.description}</p>
                </div>
                <div className="space-y-4">
                  {currentAcademicCategory.achievements?.map((achievement, index) => (
                    <div key={index} className={`bg-white rounded-lg p-5 border-l-4 ${achievement.highlight ? 'border-l-green-400 border-l-4' : 'border-l-green-300'} hover:shadow-md transition-shadow`}>
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-lg p-3 mr-4">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-800">{achievement.description}</h4>
                              <div className="flex items-center mt-2">
                                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mr-3">
                                  {achievement.year}
                                </span>
                                {achievement.highlight && (
                                  <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                    <Star className="h-3 w-3 mr-1" />
                                    Highlight
                                  </span>
                                )}
                              </div>
                            </div>
                            <button className="text-green-600 hover:text-green-700">
                              <Share className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('academic')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Sports Achievements */}
      {data.showSports && data.sports?.show && (
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-green-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.sports.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.sports.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{data.sports.featured?.title}</h3>
                <div className="space-y-6">
                  {data.sports.featured?.achievements?.filter(a => a.show !== false).map((achievement, index) => (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-start">
                        <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                          <Trophy className="h-8 w-8 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm mb-2">
                                {achievement.sport}
                              </span>
                              <h4 className="text-lg font-semibold text-gray-800">{achievement.achievement}</h4>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              achievement.level === 'National' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {achievement.level}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">Year: {achievement.year}</p>
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Featured Students:</p>
                            <div className="flex flex-wrap gap-2">
                              {achievement.students?.map((student, i) => (
                                <span key={i} className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                  {student}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sports Categories</h3>
                <div className="grid grid-cols-1 gap-4">
                  {data.sports.categories?.filter(cat => cat.show !== false).map((category, index) => {
                    const IconComponent = iconMap[category.icon] || Trophy;
                    return (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-green-100 hover:shadow transition-shadow">
                        <div className="flex items-center">
                          <div className="bg-green-100 rounded-lg p-2 mr-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">{category.name}</h4>
                            <p className="text-2xl font-bold text-green-600">{category.count || ''}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
                  <h4 className="text-xl font-semibold mb-3">Sports Excellence Program</h4>
                  <p className="mb-4">Join our championship-winning sports teams</p>
                  <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('sports')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Alumni Achievements */}
      {data.showAlumni && data.alumni?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.alumni.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.alumni.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.alumni.achievements?.filter(a => a.show !== false).map((alum, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={alum.image} 
                      alt={alum.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Batch {alum.batch}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{alum.name}</h3>
                    <p className="text-gray-600 mb-3">{alum.current}</p>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg mb-4">
                      <p className="text-gray-800 font-semibold">{alum.achievement}</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Star className="h-4 w-4 mr-1 text-green-500" />
                      <span>Distinguished Alumnus Award</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('alumni')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Gallery Section */}
      {data.showGallery && data.gallery?.show && (
        <section id="achievement-gallery" className="py-16 bg-gradient-to-br from-gray-50 to-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.gallery.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.gallery.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.images?.filter(img => img.show !== false).map((image, index) => (
                <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={image.url} 
                      alt={image.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm">
                        {image.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-semibold text-gray-800">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <a 
                href={data.gallery.viewAllLink || "/gallery"} 
                className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-lg"
              >
                {data.gallery.viewAllText || "View All Photos"}
                <ChevronRight className="h-5 w-5 ml-2" />
              </a>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('gallery')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
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
          <Edit className="h-5 w-5 group-hover:rotate-90 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AchievementsPage;