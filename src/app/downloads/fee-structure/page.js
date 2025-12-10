"use client";
import React, { useState, useEffect } from 'react';
import { 
  Download, Search, Edit, Trash2, Plus, X, Eye, EyeOff, ChevronDown,
  CreditCard, Calendar, FileText, Users, Clock, ArrowRight, ExternalLink,
  FileDigit, FileSpreadsheet, BookOpen, Receipt, Banknote, QrCode,
  Building, Wallet, Bus, FileQuestion, Filter
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

const iconMap = {
  Download, Search, Filter, CreditCard, Calendar, FileText, Users,
  Clock, ChevronDown, ArrowRight, ExternalLink, FileDigit, FileSpreadsheet,
  BookOpen, Receipt, Banknote, QrCode, Building, Wallet, Bus, Edit, Trash2, 
  Plus, Eye, EyeOff, X, FileQuestion
};

const defaultData = {
  showHero: true,
  showBenefits: true,
  showCategories: true,
  showGrades: true,
  showPopular: true,
  showDocuments: true,
  showPayment: true,
  showNotes: true,
  showCta: true,

  hero: {
    show: true,
    title: "Download Fee Structure 2024-2025",
    subtitle: "Access complete fee details for all grades and categories",
    height: "h-96",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "6", label: "Fee Categories", show: true },
      { value: "8+", label: "Fee Documents", show: true },
      { value: "2024-25", label: "Academic Year", show: true }
    ],
    ctaButton: { 
      label: "Browse Fee Documents", 
      show: true,
      link: "#documents-section",
      openInNewTab: false
    }
  },
  benefits: {
    show: true,
    title: "Fee Structure Overview",
    subtitle: "Transparent and comprehensive fee details for your planning",
    items: [
      {
        icon: "BookOpen",
        title: "Detailed Breakdown",
        description: "Clear categorization of all fee components",
        show: true
      },
      {
        icon: "Calendar",
        title: "Payment Schedule",
        description: "Installment dates and options",
        show: true
      },
      {
        icon: "Users",
        title: "Grade-Specific",
        description: "Customized for different grade levels",
        show: true
      },
      {
        icon: "Wallet",
        title: "Multiple Options",
        description: "Various payment methods available",
        show: true
      }
    ]
  },
  categories: {
    show: true,
    items: [
      { id: 'all', name: 'All Fee Components', icon: "FileText", show: true },
      { id: 'tuition', name: 'Tuition Fees', icon: "BookOpen", show: true },
      { id: 'development', name: 'Development Fees', icon: "Building", show: true },
      { id: 'activities', name: 'Activity Fees', icon: "Users", show: true },
      { id: 'transport', name: 'Transport Fees', icon: "Bus", show: true },
      { id: 'other', name: 'Other Charges', icon: "Receipt", show: true }
    ]
  },
  grades: {
    show: true,
    items: [
      { id: 'all', name: 'All Grades', show: true },
      { id: 'primary', name: 'Primary (I-V)', show: true },
      { id: 'middle', name: 'Middle (VI-VIII)', show: true },
      { id: 'secondary', name: 'Secondary (IX-X)', show: true },
      { id: 'senior', name: 'Senior (XI-XII)', show: true }
    ]
  },
  popular: {
    show: true,
    title: "Popular Downloads",
    items: [
      { id: 1, title: "Complete Fee Structure 2024-2025", downloads: 1542, show: true },
      { id: 2, title: "Primary School Fee Breakdown", downloads: 876, show: true },
      { id: 5, title: "Secondary School Fee Structure", downloads: 987, show: true },
      { id: 7, title: "Senior School Fee Schedule", downloads: 765, show: true },
      { id: 3, title: "Transportation Fee Schedule", downloads: 765, show: true }
    ]
  },
  documents: {
    show: true,
    title: "Available Fee Documents",
    subtitle: "Search and download fee structure documents instantly",
    noResultsTitle: "No documents found",
    noResultsSubtitle: "Try different keywords or another category",
    clearSearchText: "Clear search",
    loadMoreText: "Load More Documents",
    items: [
      {
        id: 1,
        title: "Complete Fee Structure 2024-2025",
        category: "all",
        grade: "all",
        description: "Comprehensive fee structure for all grades including all components",
        format: "PDF",
        size: "2.8 MB",
        downloads: 1542,
        updated: "2024-03-15",
        academicYear: "2024-2025",
        pages: 24,
        icon: "FileSpreadsheet",
        fileUrl: "",
        show: true
      },
      {
        id: 2,
        title: "Primary School Fee Breakdown",
        category: "tuition",
        grade: "primary",
        description: "Detailed tuition fee structure for primary classes (I to V)",
        format: "PDF",
        size: "1.5 MB",
        downloads: 876,
        updated: "2024-03-10",
        academicYear: "2024-2025",
        pages: 12,
        icon: "FileDigit",
        fileUrl: "",
        show: true
      },
      {
        id: 3,
        title: "Transportation Fee Schedule",
        category: "transport",
        grade: "all",
        description: "Bus transportation fees for all routes and distance slabs",
        format: "PDF",
        size: "1.2 MB",
        downloads: 765,
        updated: "2024-03-08",
        academicYear: "2024-2025",
        pages: 8,
        icon: "FileText",
        fileUrl: "",
        show: true
      },
      {
        id: 4,
        title: "Activity Fee Details",
        category: "activities",
        grade: "all",
        description: "Breakdown of activity fees for sports, arts, and cultural programs",
        format: "PDF",
        size: "1.1 MB",
        downloads: 543,
        updated: "2024-03-05",
        academicYear: "2024-2025",
        pages: 6,
        icon: "FileText",
        fileUrl: "",
        show: true
      },
      {
        id: 5,
        title: "Secondary School Fee Structure",
        category: "tuition",
        grade: "secondary",
        description: "Tuition and development fees for classes IX and X",
        format: "PDF",
        size: "1.7 MB",
        downloads: 987,
        updated: "2024-03-12",
        academicYear: "2024-2025",
        pages: 14,
        icon: "FileDigit",
        fileUrl: "",
        show: true
      },
      {
        id: 6,
        title: "One-Time Admission Charges",
        category: "other",
        grade: "all",
        description: "One-time admission and registration fees for new students",
        format: "PDF",
        size: "0.9 MB",
        downloads: 432,
        updated: "2024-03-01",
        academicYear: "2024-2025",
        pages: 5,
        icon: "FileText",
        fileUrl: "",
        show: true
      },
      {
        id: 7,
        title: "Senior School Fee Schedule",
        category: "tuition",
        grade: "senior",
        description: "Detailed fee structure for classes XI and XII (all streams)",
        format: "PDF",
        size: "2.1 MB",
        downloads: 765,
        updated: "2024-03-18",
        academicYear: "2024-2025",
        pages: 18,
        icon: "FileDigit",
        fileUrl: "",
        show: true
      },
      {
        id: 8,
        title: "Development Fund Breakdown",
        category: "development",
        grade: "all",
        description: "Infrastructure development and maintenance fund details",
        format: "PDF",
        size: "1.3 MB",
        downloads: 654,
        updated: "2024-03-07",
        academicYear: "2024-2025",
        pages: 9,
        icon: "FileText",
        fileUrl: "",
        show: true
      }
    ]
  },
  payment: {
    show: true,
    title: "Payment Options & Schedule",
    methods: {
      show: true,
      title: "Payment Methods",
      items: [
        {
          method: "Online Payment",
          description: "Secure online payment through parent portal",
          icon: "CreditCard",
          features: ["Instant confirmation", "Multiple payment methods", "24/7 availability"],
          show: true
        },
        {
          method: "Bank Transfer",
          description: "Direct transfer to school bank account",
          icon: "Building",
          features: ["NEFT/RTGS/IMPS", "Bank receipt required", "2-3 business days processing"],
          show: true
        },
        {
          method: "Cheque/Cash",
          description: "Payment at school accounts office",
          icon: "Banknote",
          features: ["During office hours", "Receipt provided", "Exact change required for cash"],
          show: true
        },
        {
          method: "UPI/QR Code",
          description: "Scan and pay using UPI apps",
          icon: "QrCode",
          features: ["Instant payment", "Multiple UPI apps supported", "Transaction ID required"],
          show: true
        }
      ]
    },
    schedule: {
      show: true,
      title: "Fee Payment Schedule 2024-2025",
      items: [
        {
          installment: "First Term",
          dueDate: "April 15, 2024",
          amount: "40% of annual fees",
          status: "Upcoming",
          show: true
        },
        {
          installment: "Second Term",
          dueDate: "July 15, 2024",
          amount: "30% of annual fees",
          status: "Upcoming",
          show: true
        },
        {
          installment: "Third Term",
          dueDate: "October 15, 2024",
          amount: "30% of annual fees",
          status: "Upcoming",
          show: true
        }
      ]
    }
  },
  notes: {
    show: true,
    title: "Important Notes",
    items: [
      "A late fee of 1% per month will be charged for payments made after the due date",
      "Fee concessions are available for eligible students (contact accounts office)",
      "All fees are subject to revision as per school management guidelines",
      "Keep payment receipts for future reference and verification"
    ]
  },
  cta: {
    show: true,
    title: "Need Assistance with Fee Payment?",
    subtitle: "Our accounts office is available to help with any fee-related questions or payment issues",
    buttons: [
      { text: "Contact Accounts Office", Link: "#", show: true },
      { text: "Make Online Payment", Link: "#", show: true }
    ]
  }
};

const DownloadFeeStructurePage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGrade, setActiveGrade] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('category');
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [ctaLinkModal, setCtaLinkModal] = useState(false);

  const role = 'admin';

  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    categories: 'showCategories',
    grades: 'showGrades',
    popular: 'showPopular',
    documents: 'showDocuments',
    payment: 'showPayment',
    notes: 'showNotes',
    cta: 'showCta'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showBenefits: 'Benefits Section',
    showCategories: 'Fee Categories',
    showGrades: 'Grade Levels',
    showPopular: 'Popular Downloads',
    showDocuments: 'Documents List',
    showPayment: 'Payment Information',
    showNotes: 'Important Notes',
    showCta: 'CTA Section'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_fee_structure_data', {});
        if (res.status === 200 && res.data?.length > 0) {
          const raw = res.data[0].Data;
          let fetched = raw;
          try {
            if (raw?.encrypted) {
              fetched = await decryptObject(raw);
            } else if (typeof raw === 'string') {
              fetched = JSON.parse(raw);
            }
          } catch (deErr) {
            console.warn('Data decryption/parsing failed, using raw data', deErr);
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

  const filteredCategories = data.categories?.items?.filter(c => c.show !== false) || [];
  const filteredGrades = data.grades?.items?.filter(g => g.show !== false) || [];
  const filteredPopular = data.popular?.items?.filter(p => p.show !== false) || [];
  const documentItems = data.documents?.items?.filter(d => d.show !== false) || [];

  const filteredDocuments = documentItems
    .filter(document => activeCategory === 'all' || document.category === activeCategory)
    .filter(document => activeGrade === 'all' || document.grade === activeGrade)
    .filter(document => !searchQuery || document.title.toLowerCase().includes(searchQuery.toLowerCase()) || document.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'recent') return new Date(b.updated) - new Date(a.updated);
      return 0;
    });

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const formatDownloadCount = (c) => c >= 1000 ? (c / 1000).toFixed(1) + 'k' : c;
  const getCategoryDisplayName = (c) => ({ 
    all: 'All Fee Components', 
    tuition: 'Tuition Fees', 
    development: 'Development Fees', 
    activities: 'Activity Fees', 
    transport: 'Transport Fees', 
    other: 'Other Charges' 
  })[c] || c;

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));
  
  const saveSectionVisibility = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (encErr) {
        console.warn('Encryption failed, sending raw payload', encErr);
      }
      await apiRequest('save_data/save_fee_structure_data', { payload });
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
      } catch (encErr) {
        console.warn('Encryption failed, sending raw payload', encErr);
      }
      await apiRequest('save_data/save_fee_structure_data', { payload });
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

  const handleCtaLinkUpdate = (link, openInNewTab) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        ctaButton: {
          ...prev.hero.ctaButton,
          link,
          openInNewTab
        }
      }
    }));
    setCtaLinkModal(false);
  };

  const saveCtaLink = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (encErr) {
        console.warn('Encryption failed, sending raw payload', encErr);
      }
      await apiRequest('save_data/save_fee_structure_data', { payload });
    } catch (err) {
      console.error(err);
    }
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
                ) : field === 'category' || field === 'grade' ? (
                  <select 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select {field === 'category' ? 'Category' : 'Grade'}</option>
                    {field === 'category' ? (
                      <>
                        <option value="all">All Fee Components</option>
                        <option value="tuition">Tuition Fees</option>
                        <option value="development">Development Fees</option>
                        <option value="activities">Activity Fees</option>
                        <option value="transport">Transport Fees</option>
                        <option value="other">Other Charges</option>
                      </>
                    ) : (
                      <>
                        <option value="all">All Grades</option>
                        <option value="primary">Primary (I-V)</option>
                        <option value="middle">Middle (VI-VIII)</option>
                        <option value="secondary">Secondary (IX-X)</option>
                        <option value="senior">Senior (XI-XII)</option>
                      </>
                    )}
                  </select>
                ) : field === 'fileUrl' ? (
                  <div key={field} className="mb-2">
                    <FileUpload 
                      initialValue={item[field] || ''} 
                      onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} 
                      className="w-full" 
                    />
                  </div>
                ) : field === 'features' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                    <textarea
                      value={Array.isArray(item[field]) ? item[field].join('\n') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split('\n').filter(f => f.trim()))}
                      placeholder="Enter features, one per line"
                      className="w-full p-2 border rounded"
                      rows="4"
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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-2xl text-gray-600">Loading fee structure...</div>;

  return (
    <div className="min-h-screen bg-gray-50">

     

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the fee structure page.
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
                    <div className="flex items-center space-x-4 mb-2">
                      <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link URL" className="flex-1 p-2 border rounded" />
                    </div>
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

              {editSection === 'categories' && ItemEditor('items', ['id', 'name', 'icon'])}
              
              {editSection === 'grades' && ItemEditor('items', ['id', 'name'])}
              
              {editSection === 'popular' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'downloads'])}
                </div>
              )}

              {editSection === 'documents' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.noResultsTitle || ''} onChange={(e) => handleObjectChange('noResultsTitle', e.target.value)} placeholder="No Results Title" className="w-full p-2 border rounded" />
                  <input value={editData.noResultsSubtitle || ''} onChange={(e) => handleObjectChange('noResultsSubtitle', e.target.value)} placeholder="No Results Subtitle" className="w-full p-2 border rounded" />
                  <input value={editData.clearSearchText || ''} onChange={(e) => handleObjectChange('clearSearchText', e.target.value)} placeholder="Clear Search Text" className="w-full p-2 border rounded" />
                  <input value={editData.loadMoreText || ''} onChange={(e) => handleObjectChange('loadMoreText', e.target.value)} placeholder="Load More Text" className="w-full p-2 border rounded" />
                  <div>
                    <h4 className="font-medium mb-3">Fee Documents</h4>
                    {ItemEditor('items', ['title', 'description', 'category', 'grade', 'format', 'size', 'downloads', 'updated', 'academicYear', 'pages', 'icon', 'fileUrl'])}
                  </div>
                </div>
              )}

              {editSection === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Payment Methods</h4>
                    <label className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.methods?.show !== false} 
                        onChange={(e) => handleNestedChange('methods', 'show', e.target.checked)} 
                      />
                      <span>Show Payment Methods</span>
                    </label>
                    <input value={editData.methods?.title || ''} onChange={(e) => handleNestedChange('methods', 'title', e.target.value)} placeholder="Methods Title" className="w-full p-2 border rounded mb-4" />
                    {ItemEditor('methods.items', ['method', 'description', 'icon', 'features'])}
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Payment Schedule</h4>
                    <label className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.schedule?.show !== false} 
                        onChange={(e) => handleNestedChange('schedule', 'show', e.target.checked)} 
                      />
                      <span>Show Payment Schedule</span>
                    </label>
                    <input value={editData.schedule?.title || ''} onChange={(e) => handleNestedChange('schedule', 'title', e.target.value)} placeholder="Schedule Title" className="w-full p-2 border rounded mb-4" />
                    {ItemEditor('schedule.items', ['installment', 'dueDate', 'amount', 'status'])}
                  </div>
                </div>
              )}

              {editSection === 'notes' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  {ItemEditor('items', [], true)}
                </div>
              )}

              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text', 'Link'])}
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative" id="documents-section">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories & Grades Sidebar */}
            {(data.showCategories || data.showGrades) && (
              <div className="lg:w-1/4">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                  {data.showCategories && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Categories</h3>
                      <div className="space-y-2 mb-8">
                        {filteredCategories.map(category => {
                          const IconComponent = iconMap[category.icon];
                          return (
                            <button
                              key={category.id}
                              onClick={() => setActiveCategory(category.id)}
                              className={`w-full flex items-center p-3 rounded-lg transition-all text-gray-700 hover:bg-gray-100 ${
                                activeCategory === category.id ? 'bg-green-100 text-green-700 font-medium' : ''
                              }`}
                            >
                              <IconComponent className="h-5 w-5 mr-3" />
                              <span>{category.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {data.showGrades && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Grades</h3>
                      <div className="space-y-2">
                        {filteredGrades.map(grade => (
                          <button
                            key={grade.id}
                            onClick={() => setActiveGrade(grade.id)}
                            className={`w-full flex items-center p-3 rounded-lg transition-all text-gray-700 hover:bg-gray-100 ${
                              activeGrade === grade.id ? 'bg-green-100 text-green-700 font-medium' : ''
                            }`}
                          >
                            {grade.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Documents Content */}
            {data.showDocuments && (
              <div className="lg:w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.documents.title}</h2>
                    <p className="text-gray-600">{data.documents.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search fee documents..."
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
                      <option value="category">Sort by Category</option>
                      <option value="downloads">Most Downloaded</option>
                      <option value="recent">Recently Updated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map(document => {
                    const IconComponent = iconMap[document.icon];
                    return (
                      <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">{document.title}</h4>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-600">{document.format}</span>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-600">{document.size}</span>
                            </div>
                          </div>
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{document.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Category:</span>
                            <span className="ml-2">{getCategoryDisplayName(document.category)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Academic Year:</span>
                            <span className="ml-2">{document.academicYear}</span>
                          </div>
                          <div>
                            <span className="font-medium">Grade:</span>
                            <span className="ml-2">{getCategoryDisplayName(document.grade)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Pages:</span>
                            <span className="ml-2">{document.pages}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                          <span>{document.size}</span>
                          <span>Updated {formatDate(document.updated)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm text-gray-600">
                            <Download className="h-4 w-4 mr-1" />
                            {formatDownloadCount(document.downloads)} downloads
                          </span>
                          <a
                            href={document.fileUrl || '#'}
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

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-16">
                    <FileQuestion className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">{data.documents.noResultsTitle}</h3>
                    <p className="text-gray-500">{data.documents.noResultsSubtitle}</p>
                    {(searchQuery || activeCategory !== 'all' || activeGrade !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('all');
                          setActiveGrade('all');
                        }}
                        className="text-green-600 hover:text-green-700 font-medium mt-4"
                      >
                        {data.documents.clearSearchText}
                      </button>
                    )}
                  </div>
                )}

                {filteredDocuments.length > 0 && filteredDocuments.length % 8 === 0 && (
                  <div className="flex justify-center mt-12">
                    <button className="bg-white border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                      {data.documents.loadMoreText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {editMode && <button onClick={() => openEditModal('documents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </div>
      </div>

      {/* Payment Section */}
      {data.showPayment && data.payment?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{data.payment.title}</h2>
            {data.payment.methods?.show && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{data.payment.methods.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.payment.methods.items?.filter(method => method.show !== false).map((method, index) => {
                    const IconComponent = iconMap[method.icon];
                    return (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-4">
                          <IconComponent className="h-6 w-6 text-green-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">{method.method}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                        <ul className="space-y-2">
                          {method.features?.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {data.payment.schedule?.show && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{data.payment.schedule.title}</h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.payment.schedule.items?.filter(item => item.show !== false).map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.installment}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          {editMode && <button onClick={() => openEditModal('payment')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Notes Section */}
      {data.showNotes && data.notes?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{data.notes.title}</h2>
            <div className="bg-blue-50 rounded-lg p-6 max-w-3xl mx-auto">
              <ul className="space-y-4 text-gray-700">
                {data.notes.items?.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('notes')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
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
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.style === 'primary' ? 'bg-white text-green-700 hover:bg-gray-100' : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.text}
                </button>
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
          <Edit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default DownloadFeeStructurePage;