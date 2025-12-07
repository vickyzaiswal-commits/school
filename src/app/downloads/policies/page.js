"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, Shield, Users, BookOpen, GraduationCap, Download,
  ChevronDown, Search, ArrowRight, Bookmark, Scale, Heart, Target,
  Eye, CheckCircle, AlertCircle, Clock, Settings, Edit, Trash2, Plus,
  X, EyeOff, Filter, ExternalLink, Calendar, UserCheck, Bell
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const iconMap = {
  FileText, Shield, Users, BookOpen, GraduationCap, Download,
  ChevronDown, Search, ArrowRight, Bookmark, Scale, Heart, Target,
  Eye, CheckCircle, AlertCircle, Clock, Settings, Edit, Trash2, Plus,
  X, EyeOff, Filter, ExternalLink, Calendar, UserCheck, Bell
};

const defaultData = {
  showHero: true,
  showPrinciples: true,
  showPolicies: true,
  showUpdates: true,
  showCompliance: true,
  hero: {
    show: true,
    title: "School Policies & Guidelines",
    subtitle: "Comprehensive policies that ensure a safe, respectful, and productive learning environment for our school community.",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "6+", label: "Comprehensive Policies", show: true },
      { value: "100%", label: "Community Compliance", show: true },
      { value: "Regular", label: "Updates & Reviews", show: true }
    ]
  },
  principles: {
    show: true,
    title: "Our Policy Framework",
    description: "Our policies are built on foundational principles that guide every aspect of school life",
    items: [
      {
        icon: "Shield",
        title: "Safety First",
        description: "Prioritizing the physical and emotional well-being of all community members",
        show: true
      },
      {
        icon: "Heart",
        title: "Respect for All",
        description: "Fostering an inclusive environment where every individual is valued",
        show: true
      },
      {
        icon: "Target",
        title: "Excellence in Education",
        description: "Maintaining high academic standards and supporting student achievement",
        show: true
      },
      {
        icon: "Scale",
        title: "Fairness & Equity",
        description: "Ensuring just treatment and equal opportunities for everyone",
        show: true
      }
    ]
  },
  policies: {
    show: true,
    title: "Browse Policies",
    description: "Explore our comprehensive set of policies designed to maintain a positive learning environment.",
    noResultsTitle: "No policies found",
    noResultsSubtitle: "Try adjusting your search",
    items: [
      {
        id: 1,
        title: "Academic Integrity Policy",
        category: "academic",
        lastUpdated: "2024-01-15",
        summary: "Guidelines for maintaining academic honesty and preventing plagiarism",
        content: `
          <h3>Purpose</h3>
          <p>To uphold the highest standards of academic integrity and ensure fair evaluation of student work.</p>
          <h3>Policy Details</h3>
          <ul>
            <li>All submitted work must be original and properly cited</li>
            <li>Plagiarism in any form will result in disciplinary action</li>
            <li>Collaboration guidelines for group projects</li>
            <li>Examination rules and protocols</li>
          </ul>
          <h3>Consequences</h3>
          <p>Violations may result in grade penalties, course failure, or further disciplinary action.</p>
        `,
        status: "active",
        applicableTo: "All students and faculty",
        fileUrl: "",
        show: true
      },
      {
        id: 2,
        title: "Student Code of Conduct",
        category: "conduct",
        lastUpdated: "2024-02-20",
        summary: "Expected behavior and disciplinary procedures for students",
        content: `
          <h3>Behavior Expectations</h3>
          <p>Students are expected to demonstrate respect, responsibility, and integrity at all times.</p>
          <h3>Prohibited Behaviors</h3>
          <ul>
            <li>Bullying or harassment of any kind</li>
            <li>Possession of prohibited items</li>
            <li>Unauthorized absence from school</li>
            <li>Damage to school property</li>
          </ul>
          <h3>Disciplinary Process</h3>
          <p>Progressive discipline approach including counseling, parental involvement, and possible suspension for serious violations.</p>
        `,
        status: "active",
        applicableTo: "All students",
        fileUrl: "",
        show: true
      },
      {
        id: 3,
        title: "Health and Safety Protocol",
        category: "safety",
        lastUpdated: "2024-03-10",
        summary: "Procedures for maintaining a safe learning environment",
        content: `
          <h3>Emergency Procedures</h3>
          <p>Detailed protocols for fire drills, lockdowns, and other emergency situations.</p>
          <h3>Health Requirements</h3>
          <ul>
            <li>Immunization records must be up to date</li>
            <li>Illness reporting procedures</li>
            <li>Medication administration policies</li>
          </ul>
          <h3>Campus Safety</h3>
          <p>Security measures, visitor policies, and campus monitoring procedures.</p>
        `,
        status: "active",
        applicableTo: "All students, staff, and visitors",
        fileUrl: "",
        show: true
      },
      {
        id: 4,
        title: "Admission Policy",
        category: "admission",
        lastUpdated: "2024-01-05",
        summary: "Criteria and process for student admissions",
        content: `
          <h3>Eligibility Criteria</h3>
          <p>Age requirements, academic prerequisites, and documentation needed for admission.</p>
          <h3>Selection Process</h3>
          <ul>
            <li>Application review timeline</li>
            <li>Assessment procedures</li>
            <li>Interview process (if applicable)</li>
            <li>Priority categories</li>
          </ul>
          <h3>Fee Structure</h3>
          <p>Detailed information about tuition fees, payment schedules, and financial aid options.</p>
        `,
        status: "active",
        applicableTo: "Prospective students and parents",
        fileUrl: "",
        show: true
      },
      {
        id: 5,
        title: "Digital Citizenship Policy",
        category: "digital",
        lastUpdated: "2024-02-28",
        summary: "Responsible use of technology and online resources",
        content: `
          <h3>Acceptable Use</h3>
          <p>Guidelines for appropriate use of school technology resources and networks.</p>
          <h3>Online Behavior</h3>
          <ul>
            <li>Respectful communication in digital spaces</li>
            <li>Privacy protection guidelines</li>
            <li>Social media policies</li>
          </ul>
          <h3>Cybersecurity</h3>
          <p>Password requirements, data protection measures, and reporting procedures for security concerns.</p>
        `,
        status: "active",
        applicableTo: "All technology users",
        fileUrl: "",
        show: true
      },
      {
        id: 6,
        title: "Anti-Bullying Policy",
        category: "conduct",
        lastUpdated: "2024-03-15",
        summary: "Prevention and response procedures for bullying incidents",
        content: `
          <h3>Definition of Bullying</h3>
          <p>Clear explanation of what constitutes bullying behavior, including cyberbullying.</p>
          <h3>Prevention Strategies</h3>
          <ul>
            <li>Educational programs on empathy and respect</li>
            <li>Peer support systems</li>
            <li>Regular monitoring of student interactions</li>
          </ul>
          <h3>Reporting and Response</h3>
          <p>Confidential reporting mechanisms and structured response protocol for addressing incidents.</p>
        `,
        status: "active",
        applicableTo: "All students and staff",
        fileUrl: "",
        show: true
      }
    ]
  },
  updates: {
    show: true,
    title: "Recent Policy Updates",
    description: "We regularly review and update our policies to reflect best practices",
    items: [
      {
        date: "March 15, 2024",
        title: "Anti-Bullying Policy Update",
        description: "Enhanced cyberbullying protocols and reporting mechanisms",
        show: true
      },
      {
        date: "February 28, 2024",
        title: "Digital Citizenship Policy",
        description: "New guidelines for responsible technology use",
        show: true
      },
      {
        date: "January 15, 2024",
        title: "Academic Integrity Revision",
        description: "Updated plagiarism detection and prevention measures",
        show: true
      },
      {
        date: "November 30, 2023",
        title: "Safety Protocol Enhancement",
        description: "Revised emergency response procedures",
        show: true
      }
    ]
  },
  compliance: {
    show: true,
    title: "Policy Compliance",
    description: "All members of our school community are expected to familiarize themselves with and adhere to our policies. Understanding these guidelines helps maintain a positive and productive learning environment.",
    items: [
      {
        text: "All policies are reviewed annually by the school board",
        show: true
      },
      {
        text: "Parents and students sign policy acknowledgment forms each academic year",
        show: true
      },
      {
        text: "Staff receive regular training on policy implementation and updates",
        show: true
      }
    ],
    contact: {
      title: "Need Policy Clarification?",
      description: "If you have questions about any school policy or need further explanation, our administrative team is here to help.",
      email: "policies@stcolumbas.edu.in",
      phone: "011-2336-3462 (Ext. 125)",
      coordinator: "Mrs. Priya Sharma",
      availability: "Monday-Friday, 8:00 AM - 4:00 PM",
      show: true
    },
    downloadForm: {
      show: true,
      text: "Download Compliance Form",
      fileUrl: ""
    }
  }
};

const SchoolPolicyPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [savedPolicies, setSavedPolicies] = useState(new Set());
  const [activeTab, setActiveTab] = useState('all');

  const role = 'admin';

  const layoutMap = {
    hero: 'showHero',
    principles: 'showPrinciples',
    policies: 'showPolicies',
    updates: 'showUpdates',
    compliance: 'showCompliance'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showPrinciples: 'Principles Section',
    showPolicies: 'Policies List',
    showUpdates: 'Recent Updates',
    showCompliance: 'Compliance Section'
  };

  const categories = [
    { id: 'all', name: 'All Policies', icon: FileText },
    { id: 'academic', name: 'Academic', icon: GraduationCap },
    { id: 'conduct', name: 'Conduct', icon: Users },
    { id: 'safety', name: 'Health & Safety', icon: Shield },
    { id: 'admission', name: 'Admission', icon: BookOpen },
    { id: 'digital', name: 'Digital', icon: Target }
  ];

  const tabs = [
    { id: 'all', name: 'All Policies', count: data.policies?.items?.filter(p => p.show !== false).length || 0 },
    { id: 'academic', name: 'Academic', count: data.policies?.items?.filter(p => p.category === 'academic' && p.show !== false).length || 0 },
    { id: 'conduct', name: 'Conduct', count: data.policies?.items?.filter(p => p.category === 'conduct' && p.show !== false).length || 0 },
    { id: 'safety', name: 'Safety', count: data.policies?.items?.filter(p => p.category === 'safety' && p.show !== false).length || 0 },
    { id: 'admission', name: 'Admission', count: data.policies?.items?.filter(p => p.category === 'admission' && p.show !== false).length || 0 },
    { id: 'digital', name: 'Digital', count: data.policies?.items?.filter(p => p.category === 'digital' && p.show !== false).length || 0 }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800 border-blue-200',
      conduct: 'bg-purple-100 text-purple-800 border-purple-200',
      safety: 'bg-red-100 text-red-800 border-red-200',
      admission: 'bg-green-100 text-green-800 border-green-200',
      digital: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_policy_data', {});
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

  const filteredPolicies = data.policies?.items
    ?.filter(policy => policy.show !== false)
    ?.filter(policy => activeTab === 'all' || policy.category === activeTab)
    ?.filter(policy => !searchTerm || 
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      policy.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    || [];

  const filteredPrinciples = data.principles?.items?.filter(item => item.show !== false) || [];
  const filteredUpdates = data.updates?.items?.filter(item => item.show !== false) || [];
  const filteredComplianceItems = data.compliance?.items?.filter(item => item.show !== false) || [];

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));
  
  const saveSectionVisibility = async () => {
    try {
      await apiRequest('save_data/save_policy_data', { payload: data });
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
      await apiRequest('save_data/save_policy_data', { payload: newData });
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

  const toggleSavePolicy = (policyId) => {
    setSavedPolicies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(policyId)) {
        newSet.delete(policyId);
      } else {
        newSet.add(policyId);
      }
      return newSet;
    });
  };

  const handleDownloadForm = () => {
    if (data.compliance?.downloadForm?.fileUrl) {
      window.open(data.compliance.downloadForm.fileUrl, '_blank');
    } else {
      alert('Download form URL not available. Please contact administration.');
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
                ) : field === 'category' ? (
                  <select 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select Category</option>
                    <option value="academic">Academic</option>
                    <option value="conduct">Conduct</option>
                    <option value="safety">Health & Safety</option>
                    <option value="admission">Admission</option>
                    <option value="digital">Digital</option>
                  </select>
                ) : field === 'fileUrl' ? (
                  <div key={field} className="mb-2">
                    <FileUpload 
                      initialValue={item[field] || ''} 
                      onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} 
                      className="w-full" 
                    />
                  </div>
                ) : field === 'content' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Content (HTML)</label>
                    <textarea
                      value={item[field] || ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)}
                      placeholder="Enter HTML content"
                      className="w-full p-2 border rounded"
                      rows="6"
                    />
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

  const togglePolicy = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <div className="text-2xl text-gray-600">Loading policies...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the policies page.
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
                  {/* height removed */}
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Background Image</span>
                  </label>
                  <div>
                    <h4 className="font-medium mb-2">Hero Stats</h4>
                    {ItemEditor('stats', ['value', 'label'])}
                  </div>
                </div>
              )}

              {editSection === 'principles' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}

              {editSection === 'policies' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.noResultsTitle || ''} onChange={(e) => handleObjectChange('noResultsTitle', e.target.value)} placeholder="No Results Title" className="w-full p-2 border rounded" />
                  <input value={editData.noResultsSubtitle || ''} onChange={(e) => handleObjectChange('noResultsSubtitle', e.target.value)} placeholder="No Results Subtitle" className="w-full p-2 border rounded" />
                  <div>
                    <h4 className="font-medium mb-3">Policies</h4>
                    {ItemEditor('items', ['title', 'category', 'lastUpdated', 'summary', 'content', 'status', 'applicableTo', 'fileUrl'])}
                  </div>
                </div>
              )}

              {editSection === 'updates' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['date', 'title', 'description'])}
                </div>
              )}

              {editSection === 'compliance' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <h4 className="font-medium mb-3">Compliance Items</h4>
                    {ItemEditor('items', ['text'])}
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    <label className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.contact?.show !== false} 
                        onChange={(e) => handleNestedChange('contact', 'show', e.target.checked)} 
                      />
                      <span>Show Contact Information</span>
                    </label>
                    <input value={editData.contact?.title || ''} onChange={(e) => handleNestedChange('contact', 'title', e.target.value)} placeholder="Contact Title" className="w-full p-2 border rounded mb-2" />
                    <textarea value={editData.contact?.description || ''} onChange={(e) => handleNestedChange('contact', 'description', e.target.value)} placeholder="Contact Description" className="w-full p-2 border rounded mb-2" rows="3" />
                    <input value={editData.contact?.email || ''} onChange={(e) => handleNestedChange('contact', 'email', e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.contact?.phone || ''} onChange={(e) => handleNestedChange('contact', 'phone', e.target.value)} placeholder="Phone" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.contact?.coordinator || ''} onChange={(e) => handleNestedChange('contact', 'coordinator', e.target.value)} placeholder="Coordinator" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.contact?.availability || ''} onChange={(e) => handleNestedChange('contact', 'availability', e.target.value)} placeholder="Availability" className="w-full p-2 border rounded mb-4" />
                  </div>

                  <div className="border-t pt-6 mt-6">
                    <h4 className="font-medium mb-3">Download Compliance Form</h4>
                    <label className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.downloadForm?.show !== false} 
                        onChange={(e) => handleNestedChange('downloadForm', 'show', e.target.checked)} 
                      />
                      <span>Show Download Button</span>
                    </label>
                    <input value={editData.downloadForm?.text || ''} onChange={(e) => handleNestedChange('downloadForm', 'text', e.target.value)} placeholder="Button Text" className="w-full p-2 border rounded mb-2" />
                    <div className="mb-2">
                      <FileUpload 
                        initialValue={editData.downloadForm?.fileUrl || ''} 
                        onUpload={(url) => handleNestedChange('downloadForm', 'fileUrl', url)} 
                        className="w-full" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img src={data.hero.backgroundImage} alt={data.hero.title || ''} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              {/* established year removed */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{data.hero.subtitle}</p>
              <div className="flex flex-wrap gap-6">
                {data.hero.stats?.filter(stat => stat.show !== false).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-sm text-green-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {data.showPrinciples && data.principles?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.principles.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.principles.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPrinciples.map((principle, index) => {
                const IconComponent = iconMap[principle.icon];
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center border border-gray-100 hover:border-green-200 hover:shadow-md">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{principle.title}</h3>
                    <p className="text-gray-600 text-sm">{principle.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('principles')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {data.showPolicies && data.policies?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{data.policies.title}</h2>
                <p className="text-lg text-gray-600 mt-2">{data.policies.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search policies..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                  const IconComponent = categories.find(cat => cat.id === tab.id)?.icon || FileText;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{tab.name}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activeTab === tab.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-6">
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <button
                      onClick={() => togglePolicy(policy.id)}
                      className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(policy.category)}`}>
                            {categories.find(cat => cat.id === policy.category)?.name}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            Updated: {policy.lastUpdated}
                          </div>
                          {policy.status === 'active' && (
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Active
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{policy.title}</h3>
                        <p className="text-gray-600 mb-4">{policy.summary}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <UserCheck className="h-4 w-4 mr-1" />
                          Applies to: {policy.applicableTo}
                        </div>
                      </div>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 ml-4 transition-transform ${expandedPolicy === policy.id ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    {expandedPolicy === policy.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-6">
                          <div 
                            className="prose max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: policy.content }}
                          />
                          <div className="mt-6 flex flex-wrap gap-3">
                            {policy.fileUrl && (
                              <a
                                href={policy.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </a>
                            )}
                            <button 
                              onClick={() => toggleSavePolicy(policy.id)}
                              className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                                savedPolicies.has(policy.id) 
                                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700' 
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Bookmark className={`h-4 w-4 mr-2 ${savedPolicies.has(policy.id) ? 'fill-yellow-500' : ''}`} />
                              {savedPolicies.has(policy.id) ? 'Saved' : 'Save for Later'}
                            </button>
                            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <Bell className="h-4 w-4 mr-2" />
                              Get Updates
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500">{data.policies.noResultsTitle}</h3>
                  <p className="text-gray-500">{data.policies.noResultsSubtitle}</p>
                </div>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('policies')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {data.showUpdates && data.updates?.show && filteredUpdates.length > 0 && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.updates.title}</h2>
              <p className="text-lg text-gray-600">{data.updates.description}</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-green-200"></div>
              <div className="space-y-12">
                {filteredUpdates.map((update, index) => (
                  <div key={index} className="relative pl-10 md:pl-0 md:flex md:items-center">
                    <div className="md:flex-1 md:pr-8 md:text-right">
                      <h3 className="text-xl font-semibold text-gray-800">{update.title}</h3>
                      <p className="text-gray-600 mt-2">{update.description}</p>
                      <span className="text-sm text-green-600 font-medium mt-1 block">{update.date}</span>
                    </div>
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shadow-lg">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="md:flex-1 md:pl-8 mt-4 md:mt-0">
                      <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center group">
                        View Changes
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('updates')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {data.showCompliance && data.compliance?.show && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{data.compliance.title}</h2>
                <p className="text-lg mb-6">{data.compliance.description}</p>
                <div className="space-y-4">
                  {filteredComplianceItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
                {data.compliance.downloadForm?.show && (
                  <button 
                    onClick={handleDownloadForm}
                    className="mt-8 bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center shadow-lg hover:shadow-xl"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    {data.compliance.downloadForm.text || "Download Compliance Form"}
                  </button>
                )}
              </div>
              {data.compliance.contact?.show && (
                <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm border border-white/20">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-300" />
                    {data.compliance.contact.title}
                  </h3>
                  <p className="mb-6">{data.compliance.contact.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Contact Information:</h4>
                      <p>Email: {data.compliance.contact.email}</p>
                      <p>Phone: {data.compliance.contact.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Policy Coordinator:</h4>
                      <p>{data.compliance.contact.coordinator}</p>
                      <p>Available: {data.compliance.contact.availability}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('compliance')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

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

export default SchoolPolicyPage;