"use client";
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download,
  Edit, Trash2, Plus, X, Eye, EyeOff, Settings
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const iconMap = {
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download,
  Edit, Trash2, Plus, X, Eye, EyeOff, Settings
};

const defaultData = {
  showHero: true,
  showContactMethods: true,
  showVisitSection: true,
  showDepartments: true,
  showContactForm: true,
  showFaqs: true,
  showSocialMedia: true,
  
  hero: {
    show: true,
    title: "Contact Abc School",
    subtitle: "We're here to answer your questions and help you connect with our school community. Reach out to us through any of the channels below.",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "24/7", label: "Email Support", show: true },
      { value: "6", label: "Departments", show: true },
      { value: "98%", label: "Response Rate", show: true }
    ],
    ctaButton: { 
      label: "Send a Message", 
      show: true,
      link: "#contact-form"
    },
    secondaryButton: {
      label: "Call Now",
      show: true,
      link: "tel:01123363462"
    }
  },
  contactMethods: {
    show: true,
    title: "Contact Methods",
    subtitle: "Choose the most convenient way to get in touch with us",
    items: [
      {
        icon: "Phone",
        title: "Phone",
        details: ["011-2336-3462", "011-2336-3134"],
        description: "Call us during school hours",
        link: "tel:01123363462",
        show: true
      },
      {
        icon: "Mail",
        title: "Email",
        details: ["stcolumbas@stcolumbas.edu.in", "info@stcolumbas.edu.in"],
        description: "We'll respond within 24 hours",
        link: "mailto:stcolumbas@stcolumbas.edu.in",
        show: true
      },
      {
        icon: "MapPin",
        title: "Address",
        details: ["1, Ashok Place", "Birgunj - 110001"],
        description: "Visit our campus",
        link: "https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi",
        show: true
      },
      {
        icon: "Clock",
        title: "Office Hours",
        details: ["Mon-Fri: 8:00 AM - 4:00 PM", "Sat: 8:00 AM - 12:00 PM"],
        description: "Reception remains open during these hours",
        link: null,
        show: true
      }
    ]
  },
  visitSection: {
    show: true,
    title: "Visit Our Campus",
    description: "Our school is located in the heart of Birgunj, easily accessible by public and private transport. We welcome visitors during school hours with prior appointment.",
    directions: {
      title: "Directions",
      items: [
        "Nearest Metro: Rajiv Chowk (Yellow Line) - 1.5km",
        "Nearest Bus Stop: Ashok Road - 200m",
        "Parking available for visitors"
      ]
    },
    bestTime: {
      title: "Best Time to Visit",
      description: "For campus tours and meetings with administration, we recommend scheduling your visit between 9:00 AM and 2:00 PM on weekdays."
    },
    buttonText: "Get Directions",
    buttonLink: "https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi",
    mapEmbedUrl: "https://www.google.com/maps?q=St.+Columba's+School+Ashok+Place+New+Delhi&output=embed"
  },
  departments: {
    show: true,
    title: "Department Contacts",
    subtitle: "Connect directly with the relevant department for specific inquiries",
    items: [
      {
        id: 'general',
        name: 'General Inquiries',
        email: 'info@stcolumbas.edu.in',
        phone: '011-2336-3462',
        show: true
      },
      {
        id: 'admissions',
        name: 'Admissions',
        email: 'admissions@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 101',
        show: true
      },
      {
        id: 'academics',
        name: 'Academic Affairs',
        email: 'academics@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 102',
        show: true
      },
      {
        id: 'accounts',
        name: 'Accounts & Fees',
        email: 'accounts@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 103',
        show: true
      },
      {
        id: 'transport',
        name: 'Transport',
        email: 'transport@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 104',
        show: true
      },
      {
        id: 'sports',
        name: 'Sports Department',
        email: 'sports@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 105',
        show: true
      }
    ]
  },
  contactForm: {
    show: true,
    title: "Send us a Message",
    description: "Fill out the form and we'll get back to you as soon as possible. For urgent matters, please call us directly.",
    responseTime: "Within 24-48 hours",
    officeHours: "Mon-Fri: 8AM-4PM, Sat: 8AM-12PM",
    successMessage: {
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you shortly."
    }
  },
  faqs: {
    show: true,
    title: "Frequently Asked Questions",
    subtitle: "Quick answers to common questions we receive",
    items: [
      {
        question: "What are the school office hours?",
        answer: "Our administrative office is open Monday to Friday from 8:00 AM to 4:00 PM, and on Saturdays from 8:00 AM to 12:00 PM.",
        show: true
      },
      {
        question: "How can I schedule a campus tour?",
        answer: "You can schedule a campus tour by contacting our admissions office at admissions@stcolumbas.edu.in or by calling 011-2336-3462 Ext. 101 at least 48 hours in advance.",
        show: true
      },
      {
        question: "Who should I contact for academic records?",
        answer: "For academic records and transcripts, please contact the academic affairs department at academics@stcolumbas.edu.in with your student details and requirements.",
        show: true
      },
      {
        question: "How do I report my child's absence?",
        answer: "Please call the school reception at 011-2336-3462 before 9:00 AM on the day of absence, or send an email to your child's class teacher with the reason for absence.",
        show: true
      }
    ]
  },
  socialMedia: {
    show: true,
    title: "Connect With Us",
    subtitle: "Follow our social media channels to stay updated with school news, events, and activities",
    newsletter: {
      title: "School Newsletter",
      description: "Subscribe to our monthly newsletter for updates on school events, achievements, and important announcements.",
      placeholder: "Your email address",
      buttonText: "Subscribe"
    },
    platforms: [
      { icon: "Facebook", name: 'Facebook', color: 'text-blue-400', show: true },
      { icon: "Twitter", name: 'Twitter', color: 'text-blue-300', show: true },
      { icon: "Instagram", name: 'Instagram', color: 'text-pink-400', show: true },
      { icon: "Youtube", name: 'YouTube', color: 'text-red-400', show: true }
    ]
  }
};

const ContactUsPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(data.departments.items.find(dept => dept.show !== false)?.id || 'general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
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
    contactMethods: 'showContactMethods',
    visitSection: 'showVisitSection',
    departments: 'showDepartments',
    contactForm: 'showContactForm',
    faqs: 'showFaqs',
    socialMedia: 'showSocialMedia'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showContactMethods: 'Contact Methods',
    showVisitSection: 'Visit Section',
    showDepartments: 'Departments',
    showContactForm: 'Contact Form',
    showFaqs: 'FAQs',
    showSocialMedia: 'Social Media'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_contact_data', {});
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

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));
  
  const saveSectionVisibility = async () => {
    try {
      let payload = data;
      try {
        payload = await encryptObject(data);
      } catch (encErr) {
        console.warn('Encryption failed, sending raw payload', encErr);
      }
      await apiRequest('save_data/save_contact_data', { payload });
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
      await apiRequest('save_data/save_contact_data', { payload });
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
                ) : field === 'details' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Details (one per line)</label>
                    <textarea
                      value={Array.isArray(item[field]) ? item[field].join('\n') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split('\n'))}
                      placeholder="Enter details, one per line"
                      className="w-full p-2 border rounded"
                      rows="3"
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // form submitted (debug log removed)
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          department: 'general',
          urgency: 'normal'
        });
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDepartment = data.departments?.items?.find(dept => dept.id === activeTab);
  const filteredDepartments = data.departments?.items?.filter(dept => dept.show !== false) || [];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <div className="text-2xl text-gray-600">Loading contact page...</div>
      </div>
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
              <p className="text-gray-600 mb-6">
                Toggle sections on or off to control what visitors see on the contact page.
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

              {editSection === 'contactMethods' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'details', 'description', 'link'])}
                </div>
              )}

              {editSection === 'visitSection' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  <div>
                    <h4 className="font-medium mb-2">Directions</h4>
                    <input value={editData.directions?.title || ''} onChange={(e) => handleNestedChange('directions', 'title', e.target.value)} placeholder="Directions Title" className="w-full p-2 border rounded mb-2" />
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">Direction Items (one per line)</label>
                      <textarea
                        value={Array.isArray(editData.directions?.items) ? editData.directions.items.join('\n') : ''}
                        onChange={(e) => handleNestedChange('directions', 'items', e.target.value.split('\n'))}
                        placeholder="Enter direction items, one per line"
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Best Time to Visit</h4>
                    <input value={editData.bestTime?.title || ''} onChange={(e) => handleNestedChange('bestTime', 'title', e.target.value)} placeholder="Best Time Title" className="w-full p-2 border rounded mb-2" />
                    <textarea value={editData.bestTime?.description || ''} onChange={(e) => handleNestedChange('bestTime', 'description', e.target.value)} placeholder="Best Time Description" className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <input value={editData.buttonText || ''} onChange={(e) => handleObjectChange('buttonText', e.target.value)} placeholder="Button Text" className="w-full p-2 border rounded" />
                  <input value={editData.buttonLink || ''} onChange={(e) => handleObjectChange('buttonLink', e.target.value)} placeholder="Button Link URL" className="w-full p-2 border rounded mt-2" />
                  <label className="block text-sm font-medium mt-3 mb-1">Map Embed URL (iframe src)</label>
                  <input value={editData.mapEmbedUrl || ''} onChange={(e) => handleObjectChange('mapEmbedUrl', e.target.value)} placeholder="https://www.google.com/maps?...&output=embed" className="w-full p-2 border rounded" />
                </div>
              )}

              {editSection === 'departments' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['name', 'email', 'phone'])}
                </div>
              )}

              {editSection === 'contactForm' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Section Description" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.responseTime || ''} onChange={(e) => handleObjectChange('responseTime', e.target.value)} placeholder="Response Time" className="w-full p-2 border rounded" />
                  <input value={editData.officeHours || ''} onChange={(e) => handleObjectChange('officeHours', e.target.value)} placeholder="Office Hours" className="w-full p-2 border rounded" />
                  <div>
                    <h4 className="font-medium mb-2">Success Message</h4>
                    <input value={editData.successMessage?.title || ''} onChange={(e) => handleNestedChange('successMessage', 'title', e.target.value)} placeholder="Success Title" className="w-full p-2 border rounded mb-2" />
                    <textarea value={editData.successMessage?.description || ''} onChange={(e) => handleNestedChange('successMessage', 'description', e.target.value)} placeholder="Success Description" className="w-full p-2 border rounded" rows="3" />
                  </div>
                </div>
              )}

              {editSection === 'faqs' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['question', 'answer'])}
                </div>
              )}

              {editSection === 'socialMedia' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <div>
                    <h4 className="font-medium mb-2">Newsletter</h4>
                    <input value={editData.newsletter?.title || ''} onChange={(e) => handleNestedChange('newsletter', 'title', e.target.value)} placeholder="Newsletter Title" className="w-full p-2 border rounded mb-2" />
                    <textarea value={editData.newsletter?.description || ''} onChange={(e) => handleNestedChange('newsletter', 'description', e.target.value)} placeholder="Newsletter Description" className="w-full p-2 border rounded mb-2" rows="3" />
                    <input value={editData.newsletter?.placeholder || ''} onChange={(e) => handleNestedChange('newsletter', 'placeholder', e.target.value)} placeholder="Placeholder Text" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.newsletter?.buttonText || ''} onChange={(e) => handleNestedChange('newsletter', 'buttonText', e.target.value)} placeholder="Button Text" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Social Media Platforms</h4>
                    {ItemEditor('platforms', ['icon', 'name', 'color'])}
                  </div>
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Rest of the contact page content remains the same */}
      {data.showHero && data.hero?.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img 
              src={data.hero.backgroundImage} 
              alt="Hero Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-50" 
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
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-green-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-4 mt-6">
                {data.hero.ctaButton?.show !== false && (
                  <a
                    href={data.hero.ctaButton?.link || '#contact-form'}
                    className="inline-flex bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 items-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>{data.hero.ctaButton?.label}</span>
                  </a>
                )}
                {data.hero.secondaryButton?.show !== false && (
                  <a
                    href={data.hero.secondaryButton?.link || 'tel:01123363462'}
                    className="inline-flex border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 items-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{data.hero.secondaryButton?.label}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-10 opacity-10">
            <MessageCircle className="h-32 w-32" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Building className="h-24 w-24" />
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Methods Section */}
      {data.showContactMethods && data.contactMethods?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.contactMethods.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.contactMethods.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.contactMethods.items?.filter(method => method.show !== false).map((method, index) => {
                const IconComponent = iconMap[method.icon];
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 shadow-md"
                  >
                    <div className="bg-green-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{method.title}</h3>
                    <div className="space-y-1 mb-4">
                      {method.details?.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{method.description}</p>
                    {method.link && (
                      <a 
                        href={method.link} 
                        className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center"
                      >
                        Contact via {method.title.toLowerCase()}
                        <ChevronDown className="h-4 w-4 ml-1 transform rotate-270" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('contactMethods')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Visit Section */}
      {data.showVisitSection && data.visitSection?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.visitSection.title}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {data.visitSection.description}
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{data.visitSection.directions?.title}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {data.visitSection.directions?.items?.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{data.visitSection.bestTime?.title}</h3>
                    <p className="text-gray-600">
                      {data.visitSection.bestTime?.description}
                    </p>
                  </div>
                  <a 
                    href={data.visitSection.buttonLink || "https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    {data.visitSection.buttonText}
                  </a>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl h-96 bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200">
                {data.visitSection.mapEmbedUrl ? (
                  <iframe
                    src={data.visitSection.mapEmbedUrl}
                    title="Campus Map"
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Abc School</h3>
                      <p className="text-gray-600 mb-4">1, Ashok Place, Birgunj - 110001</p>
                      <div className="bg-white rounded-lg p-4 inline-block shadow-md">
                        <p className="text-sm text-gray-500">Google Maps integration</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('visitSection')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Departments Section */}
      {data.showDepartments && data.departments?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.departments.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.departments.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {data.departments.items?.filter(dept => dept.show !== false).map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeTab === dept.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 max-w-2xl mx-auto border border-green-100 shadow-md">
              {currentDepartment && (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{currentDepartment.name}</h3>
                  <p className="text-gray-600 mb-6">We handle all inquiries related to {currentDepartment.name.toLowerCase()}</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                    <a 
                      href={`mailto:${currentDepartment.email}`} 
                      className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {currentDepartment.email}
                    </a>
                    <a 
                      href={`tel:${currentDepartment.phone.replace(/[^0-9]/g, '')}`} 
                      className="flex items-center justify-center text-gray-700 hover:text-gray-900 font-medium"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      {currentDepartment.phone}
                    </a>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-left border border-green-100 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      Response Time
                    </h4>
                    <p className="text-gray-600">
                      We typically respond to {currentDepartment.name.toLowerCase()} inquiries within 24-48 hours 
                      during school working days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('departments')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Form Section */}
      {/* Contact Form Section */}
{data.showContactForm && data.contactForm?.show && (
  <section id="contact-form" className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 relative">
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
        <div className="md:flex">
          <div className="md:w-2/5 bg-gradient-to-b from-green-700 to-green-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">{data.contactForm.title}</h2>
            <p className="mb-8 opacity-90">
              {data.contactForm.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                <div>
                  <h4 className="font-semibold">Response Time</h4>
                  <p className="text-sm text-green-100 opacity-90">{data.contactForm.responseTime}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <User className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                <div>
                  <h4 className="font-semibold">Office Hours</h4>
                  <p className="text-sm text-green-100 opacity-90">{data.contactForm.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5 p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{data.contactForm.successMessage.title}</h3>
                <p className="text-gray-600">
                  {data.contactForm.successMessage.description}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="+91 1234567890"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    >
                      {filteredDepartments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="What is your message regarding?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Please provide details of your inquiry..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    {editMode && (
      <button onClick={() => openEditModal('contactForm')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
        <Edit className="h-5 w-5" />
      </button>
    )}
  </section>
)}

      {/* FAQs Section */}
      {data.showFaqs && data.faqs?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.faqs.title}</h2>
              <p className="text-lg text-gray-600">
                {data.faqs.subtitle}
              </p>
            </div>
            <div className="space-y-4">
              {data.faqs.items?.filter(faq => faq.show !== false).map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-600">
                Still have questions?{" "}
                <a href="#contact-form" className="text-green-600 hover:text-green-700 font-semibold underline">
                  Contact us directly
                </a>
              </p>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('faqs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Social Media Section */}
      {data.showSocialMedia && data.socialMedia?.show && (
        <section className="py-16 bg-gray-900 text-white relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{data.socialMedia.title}</h2>
            <p className="text-lg text-gray-300 mb-10">
              {data.socialMedia.subtitle}
            </p>
            <div className="flex justify-center space-x-6">
              {data.socialMedia.platforms?.filter(platform => platform.show !== false).map((social, index) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a 
                    key={index}
                    href="#" 
                    className={`bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-700 transition-colors hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <div className="mt-10 bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto border border-gray-700 shadow-md">
              <h3 className="text-xl font-semibold mb-4">{data.socialMedia.newsletter?.title}</h3>
              <p className="text-gray-300 mb-4">
                {data.socialMedia.newsletter?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder={data.socialMedia.newsletter?.placeholder}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  {data.socialMedia.newsletter?.buttonText}
                </button>
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('socialMedia')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
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

export default ContactUsPage;