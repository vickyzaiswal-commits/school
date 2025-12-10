"use client";
import React, { useState, useEffect } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download,
  Edit, Trash2, Plus, X, Eye, EyeOff, Settings, Briefcase, GraduationCap,
  Users, Award, DollarSign, Heart, ArrowRight, ExternalLink, CheckCircle,
  BookOpen, Target, Zap, Shield, Globe, Coffee, TrendingUp, Home
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const iconMap = {
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download,
  Edit, Trash2, Plus, X, Eye, EyeOff, Settings, Briefcase, GraduationCap,
  Users, Award, DollarSign, Heart, ArrowRight, ExternalLink, CheckCircle,
  BookOpen, Target, Zap, Shield, Globe, Coffee, TrendingUp, Home
};

const defaultData = {
  showHero: true,
  showWhyJoin: true,
  showBenefits: true,
  showOpenPositions: true,
  showApplicationProcess: true,
  showTestimonials: true,
  showFAQ: true,
  showContactCTA: true,
  
  hero: {
    show: true,
    title: "Join St. Columba's School",
    subtitle: "Shape the future of education with us. We're looking for passionate educators and staff who want to make a difference in students' lives.",
    showImage: true,
    backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    stats: [
      { value: "50+", label: "Faculty Members", show: true },
      { value: "15:1", label: "Student-Teacher Ratio", show: true },
      { value: "90%", label: "Staff Retention", show: true }
    ],
    ctaButton: { 
      label: "View Open Positions", 
      show: true,
      link: "#open-positions"
    },
    secondaryButton: {
      label: "Learn About Us",
      show: true,
      link: "/about"
    }
  },
  
  whyJoin: {
    show: true,
    title: "Why Work With Us?",
    subtitle: "Join a community dedicated to excellence in education",
    items: [
      {
        icon: "GraduationCap",
        title: "Professional Growth",
        description: "Continuous professional development opportunities, workshops, and support for higher education.",
        show: true
      },
      {
        icon: "Users",
        title: "Collaborative Culture",
        description: "Work in a supportive team environment that values collaboration and shared success.",
        show: true
      },
      {
        icon: "Award",
        title: "Recognition & Rewards",
        description: "Regular recognition programs, performance bonuses, and career advancement opportunities.",
        show: true
      },
      {
        icon: "Heart",
        title: "Make a Difference",
        description: "Direct impact on students' lives and contribute to shaping future generations.",
        show: true
      }
    ]
  },
  
  benefits: {
    show: true,
    title: "Employee Benefits",
    subtitle: "We take care of our team with comprehensive benefits",
    categories: [
      {
        title: "Health & Wellness",
        items: ["Health Insurance", "Dental & Vision Coverage", "Mental Health Support", "Wellness Programs"],
        show: true
      },
      {
        title: "Financial Security",
        items: ["Competitive Salary", "Retirement Plans", "Performance Bonuses", "Tuition Reimbursement"],
        show: true
      },
      {
        title: "Work-Life Balance",
        items: ["Paid Time Off", "School Holidays", "Flexible Hours", "Parental Leave"],
        show: true
      },
      {
        title: "Professional Support",
        items: ["Training Budget", "Conference Allowance", "Mentorship Program", "Research Grants"],
        show: true
      }
    ]
  },
  
  openPositions: {
    show: true,
    title: "Open Positions",
    subtitle: "Explore current opportunities at our school",
    filterCategories: ["All", "Teaching", "Administration", "Support Staff", "Internships"],
    positions: [
      {
        id: 'math-teacher',
        title: 'Mathematics Teacher',
        department: 'Teaching',
        type: 'Full-time',
        location: 'High School',
        experience: '3+ years',
        deadline: '2024-06-15',
        description: 'We are seeking an enthusiastic Mathematics Teacher for grades 9-12. The ideal candidate will have a strong background in advanced mathematics and experience with innovative teaching methods.',
        responsibilities: [
          'Develop and implement engaging lesson plans',
          'Assess student progress and provide feedback',
          'Collaborate with math department colleagues',
          'Participate in school events and parent meetings'
        ],
        requirements: [
          'Master’s degree in Mathematics or related field',
          'Teaching certification',
          'Experience with CBSE curriculum',
          'Strong classroom management skills'
        ],
        show: true
      },
      {
        id: 'admissions-officer',
        title: 'Admissions Officer',
        department: 'Administration',
        type: 'Full-time',
        location: 'Main Office',
        experience: '2+ years',
        deadline: '2024-06-20',
        description: 'Join our admissions team to help guide prospective families through the enrollment process.',
        responsibilities: [
          'Manage admissions inquiries and applications',
          'Conduct school tours and interviews',
          'Coordinate admission testing',
          'Maintain applicant records'
        ],
        requirements: [
          'Bachelor’s degree in any discipline',
          'Excellent communication skills',
          'Experience in customer service',
          'Knowledge of school admissions processes'
        ],
        show: true
      },
      {
        id: 'librarian',
        title: 'School Librarian',
        department: 'Support Staff',
        type: 'Full-time',
        location: 'Library',
        experience: '1+ years',
        deadline: '2024-06-25',
        description: 'Manage our school library and promote reading culture among students.',
        responsibilities: [
          'Organize and maintain library collection',
          'Assist students with research',
          'Conduct reading programs',
          'Manage library software system'
        ],
        requirements: [
          'Degree in Library Science',
          'Familiarity with digital resources',
          'Love for children’s literature',
          'Organizational skills'
        ],
        show: true
      }
    ]
  },
  
  applicationProcess: {
    show: true,
    title: "Application Process",
    subtitle: "Simple steps to join our team",
    steps: [
      {
        number: "01",
        title: "Submit Application",
        description: "Complete our online application form with your resume and cover letter.",
        icon: "BookOpen",
        show: true
      },
      {
        number: "02",
        title: "Initial Screening",
        description: "Our HR team reviews applications and contacts qualified candidates.",
        icon: "Target",
        show: true
      },
      {
        number: "03",
        title: "Interview Process",
        description: "Participate in interviews with department heads and school leadership.",
        icon: "Users",
        show: true
      },
      {
        number: "04",
        title: "Demo Lesson/Task",
        description: "Teaching candidates conduct a demo lesson; other positions complete relevant tasks.",
        icon: "GraduationCap",
        show: true
      },
      {
        number: "05",
        title: "Offer & Onboarding",
        description: "Successful candidates receive an offer and begin our comprehensive onboarding process.",
        icon: "CheckCircle",
        show: true
      }
    ]
  },
  
  testimonials: {
    show: true,
    title: "Hear From Our Team",
    subtitle: "What our staff members say about working here",
    items: [
      {
        name: "Dr. Sarah Johnson",
        role: "Science Department Head",
        tenure: "8 years",
        quote: "St. Columba's has provided me with unparalleled opportunities for professional growth while maintaining a perfect work-life balance.",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        show: true
      },
      {
        name: "Rahul Verma",
        role: "IT Coordinator",
        tenure: "5 years",
        quote: "The collaborative environment and support for innovation make this an exceptional place to work.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        show: true
      },
      {
        name: "Priya Sharma",
        role: "Primary Teacher",
        tenure: "3 years",
        quote: "The mentorship I received as a new teacher was incredible. I've grown so much professionally here.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b786d4b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        show: true
      }
    ]
  },
  
  faq: {
    show: true,
    title: "Frequently Asked Questions",
    subtitle: "Common questions about careers at our school",
    items: [
      {
        question: "What is the typical hiring timeline?",
        answer: "The hiring process usually takes 3-4 weeks from application to offer, depending on the position and interview availability.",
        show: true
      },
      {
        question: "Do you provide relocation assistance?",
        answer: "Yes, we offer relocation assistance for select positions. Details are discussed during the offer stage.",
        show: true
      },
      {
        question: "Are there opportunities for career advancement?",
        answer: "Absolutely! We prioritize internal promotions and provide clear career paths for all staff members.",
        show: true
      },
      {
        question: "What is the school's approach to professional development?",
        answer: "We allocate a dedicated budget for each staff member's professional development and encourage attendance at workshops and conferences.",
        show: true
      },
      {
        question: "Do you hire international candidates?",
        answer: "Yes, we welcome applications from qualified international candidates who have the right to work in India.",
        show: true
      }
    ]
  },
  
  contactCTA: {
    show: true,
    title: "Still Have Questions?",
    subtitle: "Get in touch with our HR department",
    email: "hr@stcolumbas.edu.in",
    phone: "011-2336-3462 Ext. 201",
    officeHours: "Monday to Friday, 9:00 AM - 5:00 PM",
    buttonText: "Contact HR",
    buttonLink: "mailto:hr@stcolumbas.edu.in"
  }
};

const CareerPage = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [expandedPosition, setExpandedPosition] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    position: '',
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

  const role = 'admin';

  const layoutMap = {
    hero: 'showHero',
    whyJoin: 'showWhyJoin',
    benefits: 'showBenefits',
    openPositions: 'showOpenPositions',
    applicationProcess: 'showApplicationProcess',
    testimonials: 'showTestimonials',
    faq: 'showFAQ',
    contactCTA: 'showContactCTA'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showWhyJoin: 'Why Join Us',
    showBenefits: 'Benefits Section',
    showOpenPositions: 'Open Positions',
    showApplicationProcess: 'Application Process',
    showTestimonials: 'Team Testimonials',
    showFAQ: 'FAQs',
    showContactCTA: 'Contact CTA'
  };

  useEffect(() => {
    setEditMode(role === 'admin');
  }, [role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_career_data', {});
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
      await apiRequest('save_data/save_career_data', { payload });
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
      await apiRequest('save_data/save_career_data', { payload });
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
              <input 
                type="text"
                value={item || ''} 
                onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} 
                placeholder="Enter text" 
                className="w-full p-2 border rounded mb-2" 
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
                ) : field === 'items' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Items (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(item[field]) ? item[field].join(', ') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split(',').map(i => i.trim()))}
                      placeholder="Item 1, Item 2, Item 3"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ) : field === 'responsibilities' || field === 'requirements' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)} (one per line)</label>
                    <textarea
                      value={Array.isArray(item[field]) ? item[field].join('\n') : ''}
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value.split('\n'))}
                      placeholder="Enter items, one per line"
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                ) : field === 'image' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} accept="image/*" />
                  </div>
                ) : (
                  <input
                    key={field}
                    type={field === 'deadline' ? 'date' : 'text'}
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

  const filteredPositions = data.openPositions?.positions?.filter(position => {
    if (selectedDepartment === 'All') return position.show !== false;
    return position.show !== false && position.department === selectedDepartment;
  }) || [];

  const handlePositionClick = (positionId) => {
    setExpandedPosition(expandedPosition === positionId ? null : positionId);
  };

  const handleApplyClick = (positionId, positionTitle) => {
    setApplicationForm(prev => ({ ...prev, position: positionTitle }));
    const element = document.getElementById('application-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateApplication = () => {
    const newErrors = {};
    
    if (!applicationForm.name.trim()) newErrors.name = 'Name is required';
    if (!applicationForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(applicationForm.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!applicationForm.phone.trim()) newErrors.phone = 'Phone is required';
    if (!applicationForm.experience.trim()) newErrors.experience = 'Experience is required';
    if (!applicationForm.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!applicationForm.position.trim()) newErrors.position = 'Please select a position';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateApplication()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Application submitted:', applicationForm);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setApplicationForm({
          position: '',
          name: '',
          email: '',
          phone: '',
          experience: '',
          coverLetter: '',
          resume: null
        });
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApplicationForm(prev => ({ ...prev, resume: file }));
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <div className="text-2xl text-gray-600">Loading career page...</div>
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
                Toggle sections on or off to control what visitors see on the career page.
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

              {editSection === 'whyJoin' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}

              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('categories', ['title', 'items'])}
                </div>
              )}

              {editSection === 'openPositions' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <div>
                    <label className="block text-sm font-medium mb-2">Filter Categories (comma separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(editData.filterCategories) ? editData.filterCategories.join(', ') : ''}
                      onChange={(e) => handleObjectChange('filterCategories', e.target.value.split(',').map(cat => cat.trim()))}
                      placeholder="All, Teaching, Administration, Support Staff"
                      className="w-full p-2 border rounded mb-4"
                    />
                  </div>
                  {ItemEditor('positions', ['title', 'department', 'type', 'location', 'experience', 'deadline', 'description', 'responsibilities', 'requirements'])}
                </div>
              )}

              {editSection === 'applicationProcess' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('steps', ['number', 'title', 'description', 'icon'])}
                </div>
              )}

              {editSection === 'testimonials' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['name', 'role', 'tenure', 'quote', 'image'])}
                </div>
              )}

              {editSection === 'faq' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['question', 'answer'])}
                </div>
              )}

              {editSection === 'contactCTA' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.email || ''} onChange={(e) => handleObjectChange('email', e.target.value)} placeholder="HR Email" className="w-full p-2 border rounded" />
                  <input value={editData.phone || ''} onChange={(e) => handleObjectChange('phone', e.target.value)} placeholder="HR Phone" className="w-full p-2 border rounded" />
                  <input value={editData.officeHours || ''} onChange={(e) => handleObjectChange('officeHours', e.target.value)} placeholder="Office Hours" className="w-full p-2 border rounded" />
                  <input value={editData.buttonText || ''} onChange={(e) => handleObjectChange('buttonText', e.target.value)} placeholder="Button Text" className="w-full p-2 border rounded" />
                  <input value={editData.buttonLink || ''} onChange={(e) => handleObjectChange('buttonLink', e.target.value)} placeholder="Button Link" className="w-full p-2 border rounded" />
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
                    href={data.hero.ctaButton?.link || '#open-positions'}
                    className="inline-flex bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 items-center space-x-2"
                  >
                    <Briefcase className="h-5 w-5" />
                    <span>{data.hero.ctaButton?.label}</span>
                  </a>
                )}
                {data.hero.secondaryButton?.show !== false && (
                  <a
                    href={data.hero.secondaryButton?.link || '/about'}
                    className="inline-flex border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 items-center space-x-2"
                  >
                    <Building className="h-5 w-5" />
                    <span>{data.hero.secondaryButton?.label}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-10 opacity-10">
            <Users className="h-32 w-32" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <GraduationCap className="h-24 w-24" />
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Why Join Section */}
      {data.showWhyJoin && data.whyJoin?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.whyJoin.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.whyJoin.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.whyJoin.items?.filter(item => item.show !== false).map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 shadow-md"
                  >
                    <div className="bg-green-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('whyJoin')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Benefits Section */}
      {data.showBenefits && data.benefits?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.benefits.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.benefits.categories?.filter(category => category.show !== false).map((category, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items?.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Open Positions Section */}
      {data.showOpenPositions && data.openPositions?.show && (
        <section id="open-positions" className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.openPositions.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.openPositions.subtitle}
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {data.openPositions.filterCategories?.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDepartment(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedDepartment === category
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Positions List */}
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredPositions.length > 0 ? (
                filteredPositions.map((position, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div 
                      className="p-6 cursor-pointer"
                      onClick={() => handlePositionClick(position.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{position.title}</h3>
                          <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {position.department}
                            </span>
                            <span className="inline-flex items-center text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              <Clock className="h-3 w-3 mr-1" />
                              {position.type}
                            </span>
                            <span className="inline-flex items-center text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                              <MapPin className="h-3 w-3 mr-1" />
                              {position.location}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApplyClick(position.id, position.title);
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          Experience: {position.experience}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Apply by: {new Date(position.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {expandedPosition === position.id && (
                      <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-2">Job Description</h4>
                          <p className="text-gray-700">{position.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {position.responsibilities?.map((responsibility, i) => (
                                <li key={i} className="flex items-start">
                                  <ArrowRight className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Requirements</h4>
                            <ul className="space-y-2">
                              {position.requirements?.map((requirement, i) => (
                                <li key={i} className="flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <button
                            onClick={() => handleApplyClick(position.id, position.title)}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                          >
                            <Send className="h-5 w-5 mr-2" />
                            Apply for {position.title}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No positions available</h3>
                  <p className="text-gray-600">Check back later for new opportunities</p>
                </div>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('openPositions')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Application Process */}
      {data.showApplicationProcess && data.applicationProcess?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.applicationProcess.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.applicationProcess.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {data.applicationProcess.steps?.filter(step => step.show !== false).map((step, index) => {
                const IconComponent = iconMap[step.icon];
                return (
                  <div key={index} className="relative">
                    {index < data.applicationProcess.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-12 left-3/4 w-full h-0.5 bg-green-200"></div>
                    )}
                    <div className="bg-gradient-to-br from-green-50 to-green-50 rounded-xl p-6 text-center h-full border border-green-100">
                      <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                        {step.number}
                      </div>
                      <div className="bg-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('applicationProcess')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Testimonials Section */}
      {data.showTestimonials && data.testimonials?.show && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.testimonials.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.testimonials.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.items?.filter(item => item.show !== false).map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>{testimonial.role}</span>
                        <span className="mx-2">•</span>
                        <span>{testimonial.tenure}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('testimonials')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gradient-to-br from-green-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-b from-green-700 to-green-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Submit Your Application</h2>
                <p className="mb-8 opacity-90">
                  Complete this form to apply for a position at St. Columba's School. We'll review your application and contact you for the next steps.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                    <div>
                      <h4 className="font-semibold">Response Time</h4>
                      <p className="text-sm text-green-100 opacity-90">Within 5-7 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Briefcase className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                    <div>
                      <h4 className="font-semibold">Required Documents</h4>
                      <p className="text-sm text-green-100 opacity-90">Resume, Cover Letter, Certifications</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for applying. We'll review your application and contact you within 5-7 business days.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        Position Applying For *
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        required
                        value={applicationForm.position}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, position: e.target.value }))}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                          errors.position ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Mathematics Teacher"
                      />
                      {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                    </div>
                    
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
                          value={applicationForm.name}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
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
                          value={applicationForm.email}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
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
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={applicationForm.phone}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="+91 1234567890"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                          Years of Experience *
                        </label>
                        <input
                          type="text"
                          id="experience"
                          name="experience"
                          required
                          value={applicationForm.experience}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, experience: e.target.value }))}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="e.g., 5 years"
                        />
                        {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Letter *
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        required
                        rows="4"
                        value={applicationForm.coverLetter}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                          errors.coverLetter ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Tell us why you're interested in this position and what makes you a good candidate..."
                      ></textarea>
                      {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                        Resume/CV (PDF or DOC)
                      </label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      />
                      <p className="text-sm text-gray-500 mt-1">Maximum file size: 5MB</p>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {data.showFAQ && data.faq?.show && (
        <section className="py-16 bg-white relative">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.faq.title}</h2>
              <p className="text-lg text-gray-600">
                {data.faq.subtitle}
              </p>
            </div>
            <div className="space-y-4">
              {data.faq.items?.filter(item => item.show !== false).map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('faq')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact CTA Section */}
      {data.showContactCTA && data.contactCTA?.show && (
        <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{data.contactCTA.title}</h2>
            <p className="text-xl text-green-100 mb-8">
              {data.contactCTA.subtitle}
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto border border-white/20">
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-3" />
                  <a href={`mailto:${data.contactCTA.email}`} className="text-lg hover:text-green-200 transition-colors">
                    {data.contactCTA.email}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <a href={`tel:${data.contactCTA.phone.replace(/[^0-9]/g, '')}`} className="text-lg hover:text-green-200 transition-colors">
                    {data.contactCTA.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <span className="text-lg">{data.contactCTA.officeHours}</span>
                </div>
              </div>
              
              <a 
                href={data.contactCTA.buttonLink || "mailto:hr@stcolumbas.edu.in"} 
                className="inline-flex items-center bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {data.contactCTA.buttonText}
              </a>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('contactCTA')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl">
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

export default CareerPage;