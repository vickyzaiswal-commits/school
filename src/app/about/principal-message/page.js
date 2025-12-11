"use client";
import React, { useState, useEffect } from 'react';
import { 
  User,
  Heart,
  BookOpen,
  Users,
  Globe,
  Star,
  Award,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Target,
  Lightbulb,
  Shield,
  Trophy,
  Clock,
  Building,
  FileText,
  Camera,
  Phone,
  ExternalLink,
  Quote,
  Crown,
  Handshake,
  Mail,
  MapPin,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

const PrincipalMessagePage = ({ schoolData = {} }) => {
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [role, setRole] = useState(null); // Will be derived from stored user

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

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      title: "Principal's Message",
      subtitle: "A message of inspiration and commitment to excellence",
      height: "h-96"
    },
    principalInfo: {
      show: true,
      name: "Dr. Mary Johnson",
      role: "Principal, St. Columba's School",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      experience: "25+ years in education",
      tenure: "Principal since 2015",
      education: [
        "Ph.D. Educational Administration, Delhi University",
        "M.Ed. Educational Leadership, Jamia Millia Islamia",
        "B.Ed. Teaching Methodology, Lady Shri Ram College"
      ],
      description: "With over 25 years of experience in educational leadership and administration, Dr. Mary Johnson brings a wealth of knowledge and passion for student-centered learning to St. Columba's School.",
      show: true
    },
    message: {
      show: true,
      title: "A Message of Commitment",
      quote: "Education is not just about imparting knowledge; it's about igniting a passion for learning, nurturing character, and empowering young minds to become compassionate leaders who will shape a better tomorrow.",
      content: [
        "As I reflect on our journey at St. Columba's School, I am filled with immense pride and gratitude. Our institution stands as a testament to nearly a century of educational excellence, built on the solid foundation of Edmund Rice values that continue to guide us today.",
        "In today's rapidly evolving world, we face both unprecedented challenges and extraordinary opportunities. Our role as educators extends far beyond traditional academics. We are called to prepare students not just for examinations, but for life.",
        "Every day, I witness the incredible potential within our students. Our dedicated faculty works tirelessly to create an environment where this potential can flourish through personalized attention, innovative teaching methods, and a holistic approach."
      ],
      show: true
    },
    educationalPriorities: {
      show: true,
      title: "Our Educational Priorities",
      description: "The key areas where we focus our efforts to ensure comprehensive development of every student.",
      priorities: [
        {
          icon: "BookOpen",
          title: "Academic Excellence",
          description: "Fostering intellectual curiosity and critical thinking skills that prepare students for higher education and lifelong learning.",
          show: true
        },
        {
          icon: "Heart",
          title: "Character Development",
          description: "Nurturing moral values, integrity, and compassion based on Edmund Rice's educational philosophy.",
          show: true
        },
        {
          icon: "Users",
          title: "Community Building",
          description: "Creating an inclusive environment where diversity is celebrated and every voice is heard and valued.",
          show: true
        },
        {
          icon: "Globe",
          title: "Global Citizenship",
          description: "Preparing students to be responsible global citizens who can contribute meaningfully to society.",
          show: true
        }
      ],
      show: true
    },
    achievements: {
      show: true,
      title: "Achievements Under My Leadership",
      description: "Since joining St. Columba's as Principal in 2015, we have achieved remarkable milestones that reflect our commitment to excellence.",
      stats: [
        { value: "100%", label: "Board Pass Rate", show: true },
        { value: "95%", label: "College Admissions", show: true },
        { value: "85%", label: "Above 90% Scores", show: true },
        { value: "50+", label: "Awards Won", show: true }
      ],
      highlights: [
        {
          icon: "Trophy",
          title: "ISO 9001:2015 Certification",
          description: "Quality management system recognition",
          show: true
        },
        {
          icon: "Award",
          title: "Best Principal Award 2022",
          description: "Delhi Education Excellence Awards",
          show: true
        },
        {
          icon: "Star",
          title: "Green School Certification",
          description: "Environmental sustainability initiative",
          show: true
        }
      ],
      show: true
    },
    leadershipPrinciples: {
      show: true,
      title: "Leadership Philosophy",
      principles: [
        {
          icon: "Target",
          title: "Vision-Driven Leadership",
          description: "Leading with a clear vision that inspires excellence and innovation in education.",
          show: true
        },
        {
          icon: "Handshake",
          title: "Collaborative Approach",
          description: "Working together with teachers, parents, and students to create the best learning environment.",
          show: true
        },
        {
          icon: "Shield",
          title: "Ethical Foundation",
          description: "Upholding the highest standards of integrity and moral leadership in all decisions.",
          show: true
        },
        {
          icon: "Lightbulb",
          title: "Continuous Innovation",
          description: "Embracing new ideas and methodologies to enhance educational outcomes.",
          show: true
        }
      ],
      show: true
    },
    contact: {
      show: true,
      title: "Connect With Me",
      description: "I believe in open communication and welcome the opportunity to connect with parents, students, and community members.",
      info: [
        {
          icon: "Clock",
          title: "Office Hours",
          content: "Monday - Friday: 9:00 AM - 5:00 PM",
          show: true
        },
        {
          icon: "Mail",
          title: "Email",
          content: "principal@stcolumbas.edu.in",
          show: true
        },
        {
          icon: "MapPin",
          title: "Principal's Office",
          content: "Administrative Block, First Floor",
          show: true
        }
      ],
      buttons: [
        { label: "Schedule Appointment", icon: "ExternalLink", link: "/appointment", show: true },
        { label: "Admission Information", icon: "FileText", link: "/admissions", show: true },
        { label: "Academic Programs", icon: "BookOpen", link: "/academics", show: true },
        { label: "Vision & Mission", icon: "Target", link: "/about/vision-mission", show: true }
      ],
      show: true
    },
    showHero: true,
    showPrincipalInfo: true,
    showMessage: true,
    showPriorities: true,
    showAchievements: true,
    showLeadership: true,
    showContact: true
  };

  // Icon mapping for rendering
  const iconMap = {
    User,
    Heart,
    BookOpen,
    Users,
    Globe,
    Star,
    Award,
    ArrowRight,
    CheckCircle,
    GraduationCap,
    Target,
    Lightbulb,
    Shield,
    Trophy,
    Clock,
    Building,
    FileText,
    Camera,
    Phone,
    ExternalLink,
    Quote,
    Crown,
    Handshake,
    Mail,
    MapPin
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    principalInfo: 'showPrincipalInfo',
    message: 'showMessage',
    educationalPriorities: 'showPriorities',
    achievements: 'showAchievements',
    leadershipPrinciples: 'showLeadership',
    contact: 'showContact'
  };

  // Initialize data with default
  const [data, setData] = useState({ ...defaultData, ...schoolData });

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_principal_message_data', {});
        console.log('API Response:', res);
        if (res.status == 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedRaw = res.data[0]?.Data || {};
          console.log('Fetched Raw Data:', fetchedRaw);

          let fetchedData = fetchedRaw;
          if (typeof fetchedRaw === 'string' || (fetchedRaw && typeof fetchedRaw === 'object' && fetchedRaw.encrypted)) {
            const decrypted = await decryptObject(fetchedRaw);
            if (decrypted) fetchedData = decrypted;
            else {
              try {
                fetchedData = JSON.parse(fetchedRaw);
              } catch (e) {
                console.warn('Failed to parse fetchedRaw as JSON and decryption failed');
                fetchedData = {};
              }
            }
          }

          console.log('Fetched Data (after decrypt/parse):', fetchedData);
          setData({ ...defaultData, ...fetchedData });
        } else {
          console.log('No data or invalid response, using default');
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      }
    };
 
    fetchData();
  }, []);

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

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setPreviewMode(false);
    setEditFormOpen(true);
    const layoutKey = layoutMap[section];
    const sectionData = { 
      showSection: data[layoutKey],
      ...JSON.parse(JSON.stringify(data[section]))
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (object arrays)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for string arrays
  const handleStringArrayChange = (arrayKey, index, value) => {
    const updatedArray = [...editData[arrayKey]];
    updatedArray[index] = value;
    setEditData({ ...editData, [arrayKey]: updatedArray });
  };

  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const layoutKey = layoutMap[editSection];
      let updatedData = { ...data };
      if ('showSection' in editData) {
        updatedData[layoutKey] = editData.showSection;
      }
      const { showSection, ...sectionUpdates } = editData;
      updatedData[editSection] = { ...data[editSection], ...sectionUpdates };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      console.log('Payload (pre-encrypt):', JSON.stringify(payload, null, 2));

      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_principal_message', { payload: encryptedPayload });
      console.log('Save response:', save_data);

      if (save_data?.status === 200) {
        setData(updatedData);
      } else {
        console.error('Save failed:', save_data);
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
  const filteredEducation = (data.principalInfo?.education || []).filter(edu => edu.show !== false);
  const filteredPriorities = (data.educationalPriorities?.priorities || []).filter(priority => priority.show !== false);
  const filteredAchievementStats = (data.achievements?.stats || []).filter(stat => stat.show !== false);
  const filteredAchievementHighlights = (data.achievements?.highlights || []).filter(highlight => highlight.show !== false);
  const filteredPrinciples = (data.leadershipPrinciples?.principles || []).filter(principle => principle.show !== false);
  const filteredContactInfo = (data.contact?.info || []).filter(info => info.show !== false);
  const filteredContactButtons = (data.contact?.buttons || []).filter(button => button.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Section visibility helpers
  const sectionDisplayNames = {
    hero: 'Hero',
    principalInfo: 'Principal Info',
    message: 'Message',
    educationalPriorities: 'Educational Priorities',
    achievements: 'Achievements',
    leadershipPrinciples: 'Leadership Principles',
    contact: 'Contact'
  };

  const getDataValue = (key) => {
    const layoutKey = layoutMap[key];
    if (layoutKey) return data[layoutKey] !== false;
    if (data[key] && typeof data[key] === 'object' && 'show' in data[key]) return data[key].show !== false;
    if (Array.isArray(data[key])) return data[key].some((t) => t && t.show !== false);
    return true;
  };

  const toggleSectionVisibility = (key) => {
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const layoutKey = layoutMap[key];
      const current = layoutKey ? copy[layoutKey] : (Array.isArray(copy[key]) ? copy[key].some(i => i && i.show !== false) : (copy[key]?.show !== false));
      const newVal = !current;
      if (layoutKey) copy[layoutKey] = newVal;

      if (Array.isArray(copy[key])) {
        copy[key] = copy[key].map((t) => ({ ...(t || {}), show: newVal }));
      } else if (copy[key] && typeof copy[key] === 'object' && 'show' in copy[key]) {
        copy[key].show = newVal;
      } else {
        copy[key] = { ...(copy[key] || {}), show: newVal };
      }

      return copy;
    });
  };

  // Keep layout flags in sync with arrays/objects
  useEffect(() => {
    const anyPriorities = Array.isArray(data.educationalPriorities?.priorities) ? data.educationalPriorities.priorities.some(p => p && p.show !== false) : false;
    if ((data.showPriorities || false) !== anyPriorities) {
      setData((prev) => ({ ...prev, showPriorities: anyPriorities }));
    }

    const anyAchievements = (Array.isArray(data.achievements?.highlights) ? data.achievements.highlights.some(h => h && h.show !== false) : false) || (Array.isArray(data.achievements?.stats) ? data.achievements.stats.some(s => s && s.show !== false) : false);
    if ((data.showAchievements || false) !== anyAchievements) {
      setData((prev) => ({ ...prev, showAchievements: anyAchievements }));
    }

    const anyLeadership = Array.isArray(data.leadershipPrinciples?.principles) ? data.leadershipPrinciples.principles.some(p => p && p.show !== false) : false;
    if ((data.showLeadership || false) !== anyLeadership) {
      setData((prev) => ({ ...prev, showLeadership: anyLeadership }));
    }

    const anyContact = (Array.isArray(data.contact?.info) ? data.contact.info.some(i => i && i.show !== false) : false) || (Array.isArray(data.contact?.buttons) ? data.contact.buttons.some(b => b && b.show !== false) : false);
    if ((data.showContact || false) !== anyContact) {
      setData((prev) => ({ ...prev, showContact: anyContact }));
    }
  }, [data.educationalPriorities, data.achievements, data.leadershipPrinciples, data.contact]);

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      // encrypt payload before sending
      const encrypted = await encryptObject(payload);
      const res = await apiRequest('save_data/save_principal_message', { payload: encrypted });
      if (res.status === 200) {
        setSectionVisibilityModal(false);
      } else {
        console.error('Save failed', res);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
  };

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
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button
                onClick={cancelChanges}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
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
                    <label className="block text-sm font-medium">Height</label>
                    <input
                      type="text"
                      value={editData.height || ''}
                      onChange={(e) => handleObjectChange('height', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              )}
              {editSection === 'principalInfo' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Principal Info</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleObjectChange('name', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input
                      type="text"
                      value={editData.role || ''}
                      onChange={(e) => handleObjectChange('role', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Principal Image</label>
                    <FileUpload
                      currentUrl={editData.image || ''}
                      onUploadSuccess={(url) => handleObjectChange('image', url)}
                      label="Principal Image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Experience</label>
                    <input
                      type="text"
                      value={editData.experience || ''}
                      onChange={(e) => handleObjectChange('experience', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Tenure</label>
                    <input
                      type="text"
                      value={editData.tenure || ''}
                      onChange={(e) => handleObjectChange('tenure', e.target.value)}
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Education</h3>
                  {(editData.education || []).map((edu, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Degree {index + 1}</label>
                        <input
                          type="text"
                          value={edu || ''}
                          onChange={(e) => handleStringArrayChange('education', index, e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'message' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Message</span>
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
                    <label className="block text-sm font-medium">Quote</label>
                    <textarea
                      value={editData.quote || ''}
                      onChange={(e) => handleObjectChange('quote', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Content</h3>
                  {(editData.content || []).map((paragraph, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <textarea
                        value={paragraph || ''}
                        onChange={(e) => handleStringArrayChange('content', index, e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'educationalPriorities' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Educational Priorities</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Priorities</h3>
                  {(editData.priorities || []).map((priority, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Priority {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={priority.icon || ''}
                            onChange={(e) => handleNestedArrayChange('priorities', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. BookOpen"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={priority.title || ''}
                            onChange={(e) => handleNestedArrayChange('priorities', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={priority.description || ''}
                            onChange={(e) => handleNestedArrayChange('priorities', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={priority.show !== false}
                              onChange={(e) => handleNestedArrayChange('priorities', index, 'show', e.target.checked)}
                            />
                            <span>Show Priority</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'achievements' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Achievements</span>
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
                          <label className="block text-sm font-medium">Value</label>
                          <input
                            type="text"
                            value={stat.value || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'value', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={stat.show !== false}
                              onChange={(e) => handleNestedArrayChange('stats', index, 'show', e.target.checked)}
                            />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Highlights</h3>
                  {(editData.highlights || []).map((highlight, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Highlight {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={highlight.icon || ''}
                            onChange={(e) => handleNestedArrayChange('highlights', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Trophy"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={highlight.title || ''}
                            onChange={(e) => handleNestedArrayChange('highlights', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={highlight.description || ''}
                            onChange={(e) => handleNestedArrayChange('highlights', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={highlight.show !== false}
                              onChange={(e) => handleNestedArrayChange('highlights', index, 'show', e.target.checked)}
                            />
                            <span>Show Highlight</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'leadershipPrinciples' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Leadership Principles</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Principles</h3>
                  {(editData.principles || []).map((principle, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Principle {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={principle.icon || ''}
                            onChange={(e) => handleNestedArrayChange('principles', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Target"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={principle.title || ''}
                            onChange={(e) => handleNestedArrayChange('principles', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={principle.description || ''}
                            onChange={(e) => handleNestedArrayChange('principles', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={principle.show !== false}
                              onChange={(e) => handleNestedArrayChange('principles', index, 'show', e.target.checked)}
                            />
                            <span>Show Principle</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'contact' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Contact</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Info</h3>
                  {(editData.info || []).map((infoItem, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Info {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={infoItem.icon || ''}
                            onChange={(e) => handleNestedArrayChange('info', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Clock"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={infoItem.title || ''}
                            onChange={(e) => handleNestedArrayChange('info', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Content</label>
                          <input
                            type="text"
                            value={infoItem.content || ''}
                            onChange={(e) => handleNestedArrayChange('info', index, 'content', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={infoItem.show !== false}
                              onChange={(e) => handleNestedArrayChange('info', index, 'show', e.target.checked)}
                            />
                            <span>Show Info</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                  {(editData.buttons || []).map((button, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Button {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={button.label || ''}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={button.icon || ''}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. ExternalLink"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Link</label>
                          <input
                            type="text"
                            value={button.link || ''}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'link', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={button.show !== false}
                              onChange={(e) => handleNestedArrayChange('buttons', index, 'show', e.target.checked)}
                            />
                            <span>Show Button</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && safeData('hero').show && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Leadership Message</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Principal Introduction */}
      {data.showPrincipalInfo && safeData('principalInfo').show && (
        <section
          id="principalInfo"
          className={`py-16 bg-white animate-on-scroll ${isVisible.principalInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-green-50 inline-block px-3 py-1 rounded-full mb-4">
                  <span className="text-green-700 font-semibold text-sm">Educational Leadership</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('principalInfo').name}</h2>
                <p className="text-lg text-green-600 mb-6 font-medium">{safeData('principalInfo').role}</p>
                
                <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                  <p>{safeData('principalInfo').description}</p>
                </div>
                
                {filteredEducation.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Academic Background:</h4>
                    <div className="space-y-2">
                      {filteredEducation.map((edu, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <GraduationCap className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700 text-sm">{edu}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  {safeData('principalInfo').image && <img
                    src={safeData('principalInfo').image}
                    alt={safeData('principalInfo').name}
                    className="w-full h-96 object-cover"
                  />}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800">{safeData('principalInfo').name}</h3>
                      <p className="text-sm text-gray-600">{safeData('principalInfo').tenure}</p>
                      <p className="text-xs text-gray-500 mt-1">{safeData('principalInfo').experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('principalInfo')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Principal's Core Message */}
      {data.showMessage && safeData('message').show && (
        <section
          id="message"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('message').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                My vision for St. Columba's School and our journey together toward educational excellence.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-6">
                    "{safeData('message').quote}"
                  </blockquote>
                  
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {(safeData('message').content || []).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('message')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Educational Priorities */}
      {data.showPriorities && safeData('educationalPriorities').show && filteredPriorities.length > 0 && (
        <section
          id="educationalPriorities"
          className={`py-16 bg-white animate-on-scroll ${isVisible.educationalPriorities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('educationalPriorities').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('educationalPriorities').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPriorities.map((priority, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(priority.icon, "h-5 w-5 text-green-600")}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{priority.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{priority.description}</p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('educationalPriorities')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Achievements */}
      {data.showAchievements && safeData('achievements').show && (
        <section
          id="achievements"
          className={`py-16 bg-gradient-to-r from-green-700 to-green-600 text-white animate-on-scroll ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{safeData('achievements').title}</h2>
                <p className="text-base leading-relaxed mb-6 text-green-100">
                  {safeData('achievements').description}
                </p>
                
                <div className="space-y-4">
                  {filteredAchievementHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {renderIcon(highlight.icon, "h-5 w-5 text-yellow-400 flex-shrink-0 mt-1")}
                      <div>
                        <h3 className="text-base font-semibold mb-1">{highlight.title}</h3>
                        <p className="text-green-100 text-sm">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {filteredAchievementStats.length > 0 && (
                <div className="relative">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {filteredAchievementStats.map((stat, index) => (
                        <div key={index}>
                          <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.value}</div>
                          <div className="text-xs text-green-100">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('achievements')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Leadership Philosophy */}
      {data.showLeadership && safeData('leadershipPrinciples').show && filteredPrinciples.length > 0 && (
        <section
          id="leadershipPrinciples"
          className={`py-16 bg-white animate-on-scroll ${isVisible.leadershipPrinciples ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{safeData('leadershipPrinciples').title}</h2>
              <a href="/about/vision-mission" className="text-green-600 hover:text-green-700 font-semibold flex items-center text-sm">
                Our Vision
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPrinciples.map((principle, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    {renderIcon(principle.icon, "h-5 w-5 text-green-600 mr-2")}
                    <span className="text-sm font-semibold text-green-600">{principle.title}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('leadershipPrinciples')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Section */}
      {data.showContact && safeData('contact').show && (
        <section
          id="contact"
          className={`py-16 bg-green-800 text-white animate-on-scroll ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">{safeData('contact').title}</h2>
                <p className="text-green-100 text-base leading-relaxed mb-6">
                  {safeData('contact').description}
                </p>
                
                <div className="space-y-4">
                  {filteredContactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {renderIcon(info.icon, "h-5 w-5 text-yellow-400 flex-shrink-0 mt-1")}
                      <div>
                        <h3 className="text-base font-semibold mb-1">{info.title}</h3>
                        <p className="text-green-100 text-sm">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <a 
                    href="/appointment" 
                    className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-5 py-2 rounded-lg font-semibold transition-colors text-sm inline-flex items-center"
                  >
                    Schedule Appointment
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {filteredContactButtons.length > 0 && (
                <div>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {filteredContactButtons.map((button, index) => (
                        <a key={index} href={button.link} className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm">
                          <div className="flex items-center space-x-2">
                            {renderIcon(button.icon, "h-4 w-4 text-yellow-400")}
                            <span>{button.label}</span>
                          </div>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('contact')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}
      {/* Manage Section Visibility Floating Button */}
      {editMode && (
        <>
          <button
            onClick={() => setSectionVisibilityModal(true)}
            title="Manage Section Visibility"
            className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700"
          >
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-2xl m-4 flex flex-col max-h-[90vh]">
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Manage Section Visibility</h3>
                  <button onClick={() => setSectionVisibilityModal(false)} className="p-2 text-gray-600 hover:text-gray-800">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto flex-1">
                  <div className="space-y-3">
                    {Object.entries(sectionDisplayNames).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between border border-gray-100 rounded p-3">
                        <div className="text-sm font-medium text-gray-800">{label}</div>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!getDataValue(key)}
                            onChange={() => toggleSectionVisibility(key)}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => setSectionVisibilityModal(false)}
                    className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSectionVisibility}
                    className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PrincipalMessagePage;