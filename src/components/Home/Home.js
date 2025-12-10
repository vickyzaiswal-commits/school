"use client";
import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronRight,
  Award,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Trophy,
  GraduationCap,
  Heart,
  Target,
  Clock,
  FileText,
  CreditCard,
  User,
  Lightbulb,
  Globe,
  ExternalLink,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';
import { toast } from "sonner";
import Spinner from '@components/Spinner/Spinner';
const HomePage = ({ schoolData = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(!Object.keys(schoolData || {}).length);
  // Manage Section Visibility modal state
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const role = 'admin'; // This should ideally come from auth context

  // Default data structure - all from JSON
  const defaultData = {
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Excellence in Education Since 1927",
        subtitle: "Nurturing young minds with Edmund Rice values",
        cta: "Explore Our Legacy",
        ctaLink: "/about",
        show: true
      },
      {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Admissions Open for 2025-26",
        subtitle: "Join our community of learners and leaders",
        cta: "Apply Now",
        ctaLink: "/admissions",
        show: true
      },
      {
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
        title: "Holistic Development",
        subtitle: "Academic excellence with character building",
        cta: "Our Programs",
        ctaLink: "/academics",
        show: true
      }
    ],
    quickStats: [
      { number: "97+", label: "Years of Excellence", icon: "Trophy", show: true },
      { number: "2000+", label: "Students", icon: "Users", show: true },
      { number: "150+", label: "Faculty Members", icon: "GraduationCap", show: true },
      { number: "50+", label: "Co-curricular Activities", icon: "Award", show: true }
    ],
    features: [
      {
        icon: "Heart",
        title: "Edmund Rice Values",
        description: "Character formation based on Christian values of compassion, justice, and respect.",
        show: true
      },
      {
        icon: "BookOpen",
        title: "Academic Excellence",
        description: "Comprehensive curriculum designed to nurture intellectual growth and critical thinking.",
        show: true
      },
      {
        icon: "Users",
        title: "Holistic Development",
        description: "Focus on emotional, social, physical, and spiritual development of every child.",
        show: true
      },
      {
        icon: "Target",
        title: "Individual Attention",
        description: "Small class sizes ensuring personalized learning and mentorship for each student.",
        show: true
      },
      {
        icon: "Globe",
        title: "Global Perspective",
        description: "International exposure and multicultural learning environment preparing students for the world.",
        show: true
      },
      {
        icon: "Lightbulb",
        title: "Innovation & Technology",
        description: "Modern facilities and technology-integrated learning for 21st-century skills.",
        show: true
      }
    ],
    principalMessage: {
      show: true,
      name: "Dr. Mary Johnson",
      role: "Principal",
      message: "At St. Columba's, we believe that education is not just about academic achievement, but about nurturing the whole person. Our commitment to Edmund Rice values ensures that each student develops not only intellectually but also morally and spiritually.",
      stats: [
        { value: "100%", label: "Board Pass Rate", show: true },
        { value: "95%", label: "College Admissions", show: true },
        { value: "50+", label: "Awards Won", show: true },
        { value: "25+", label: "Sports Titles", show: true }
      ]
    },
    announcements: [
      {
        date: "Dec 15, 2024",
        title: "Winter Break Schedule",
        content: "School will be closed from December 25, 2024 to January 6, 2025. Classes resume on January 7, 2025.",
        urgent: false,
        show: true
      },
      {
        date: "Dec 10, 2024",
        title: "Annual Sports Day 2024",
        content: "Join us for our Annual Sports Day on December 20, 2024. Parents are cordially invited.",
        urgent: true,
        show: true
      },
      {
        date: "Dec 5, 2024",
        title: "Parent-Teacher Conference",
        content: "Scheduled meetings with parents for academic progress discussion from December 18-19, 2024.",
        urgent: false,
        show: true
      }
    ],
    testimonials: [
      {
        name: "Dr. Rajesh Kumar",
        role: "Parent, Class XII",
        content: "St. Columba's has provided my son with not just excellent education, but also strong moral values. The teachers are dedicated and caring.",
        rating: 5,
        show: true
      },
      {
        name: "Arjun Mehta",
        role: "Alumni, Batch 2020",
        content: "The foundation I received at St. Columba's prepared me well for engineering college and life. Forever grateful to this institution.",
        rating: 5,
        show: true
      },
      {
        name: "Mrs. Priya Sharma",
        role: "Parent, Class VIII",
        content: "The holistic approach to education here is remarkable. My daughter has grown tremendously in confidence and character.",
        rating: 5,
        show: true
      }
    ],
    contactInfo: {
      show: true,
      address: "1, Ashok Place, New Delhi - 110001, India",
      phone: "011 2336 3462\n011 2336 3134",
      email: "stcolumbas@stcolumbas.edu.in",
      hours: "Monday - Friday: 8:00 AM - 4:00 PM\nSaturday: 8:00 AM - 12:00 PM"
    },
    quickActions: [
      { label: "Apply for Admission", icon: "FileText", link: "/admissions", show: true, isDownload: false },
      { label: "Virtual Campus Tour", icon: "Globe", link: "/virtual-tour", show: true, isDownload: false },
      { label: "Download Prospectus", icon: "FileText", link: "/downloads", show: true, isDownload: true, fileUrl: null },
      { label: "Contact Admissions", icon: "Phone", link: "/contact", show: true, isDownload: false }
    ],
    quickAccess: [
      { label: "Admissions Open", sublabel: "Apply for 2025-26", icon: "FileText", link: "/admissions", show: true },
      { label: "e-Care Portal", sublabel: "Student & Parent Login", icon: "User", link: "/ecare", show: true },
      { label: "Pay Fees", sublabel: "Secure Online Payment", icon: "CreditCard", link: "/pay-fees", show: true }
    ],
    titles: {
      features: {
        title: "Why Choose Our School?",
        subtitle: "Committed to nurturing young minds with values, knowledge, and character."
      },
      principal: {
        title: "Principal's Message"
      },
      announcements: {
        title: "Latest Announcements",
        viewAll: "View All",
        viewAllLink: "/news-events"
      },
      testimonials: {
        title: "What Our Community Says",
        subtitle: "Hear from our parents, students, and alumni about their experience."
      },
      contact: {
        title: "Visit Our Campus",
        buttonText: "Schedule a Visit",
        ctaLink: "/appointment",
      }
    },
    layout: {
      showHero: true,
      showStats: true,
      showFeatures: true,
      showPrincipal: true,
      showAnnouncements: true,
      showTestimonials: true,
      showContact: true
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    Trophy,
    Users,
    GraduationCap,
    Award,
    Heart,
    BookOpen,
    Target,
    Globe,
    Lightbulb,
    FileText,
    Phone,
    CreditCard,
    User
  };

  // Start with server-provided data if present, otherwise default data
  const [data, setData] = useState(Object.keys(schoolData || {}).length ? schoolData : defaultData);

  // Fetch data from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest('save_data/get_all_homes', {});
        console.log('Fetched data from DB:', res);
        
        if (res && res.status === 200 && res.data && res.data.length > 0) {
          // Get the first home record (assuming single record for home page)
          const homeRecord = res.data[0];
          
          // Check if Data exists and has the expected structure
          if (homeRecord.Data) {
            let fetched = homeRecord.Data;

            // If server returned an encrypted wrapper, attempt to decrypt
            if (typeof fetched === 'string' || (fetched && typeof fetched === 'object' && fetched.encrypted)) {
              const decrypted = await decryptObject(fetched);
              if (decrypted) fetched = decrypted;
              else {
                try {
                  fetched = JSON.parse(fetched);
                } catch (e) {
                  console.warn('Failed to parse/decrypt homeRecord.Data');
                  fetched = null;
                }
              }
            }

            if (fetched && fetched.homeData) {
              console.log('Using database data:', fetched.homeData);
              setData(fetched.homeData);
            } else if (fetched) {
              console.log('Using database data (direct):', fetched);
              setData(fetched);
            } else {
              console.log('No valid data in database, using default');
              setData(defaultData);
            }
          } else {
            // Fallback to default data
            console.log('No valid data in database, using default');
            setData(defaultData);
          }
        } else {
          // No data in database, use default JSON data
          console.log('No data in database, using default');
          setData(defaultData);
        }
      } catch (error) {
        console.error("Failed to fetch school data:", error);
        // Fallback to default data if fetch fails
        setData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  // Safe filter functions that handle non-array data
  const getSafeArray = (arrayData, fallback = []) => {
    return Array.isArray(arrayData) ? arrayData : fallback;
  };

  const getSafeObject = (objectData, fallback = {}) => {
    return objectData && typeof objectData === 'object' ? objectData : fallback;
  };

  // Memoized filtered arrays to prevent unnecessary re-renders
  const filteredHeroSlides = useMemo(() => 
    getSafeArray(data.heroSlides).filter(slide => slide && slide.show !== false),
    [data.heroSlides]
  );

  const filteredTestimonials = useMemo(() => 
    getSafeArray(data.testimonials).filter(testimonial => testimonial && testimonial.show !== false),
    [data.testimonials]
  );

  const filteredQuickStats = getSafeArray(data.quickStats).filter(stat => stat && stat.show !== false);
  const filteredFeatures = getSafeArray(data.features).filter(feature => feature && feature.show !== false);
  const filteredAnnouncements = getSafeArray(data.announcements).filter(announcement => announcement && announcement.show !== false);
  const filteredQuickActions = getSafeArray(data.quickActions).filter(action => action && action.show !== false);
  const filteredQuickAccess = getSafeArray(data.quickAccess).filter(access => access && access.show !== false);
  
  // Safe access for principal message stats
  const principalMessage = getSafeObject(data.principalMessage);
  const filteredPrincipalStats = getSafeArray(principalMessage.stats).filter(stat => stat && stat.show !== false);
  // Sections and layout helpers for Manage Section Visibility
  const layoutMap = {
    heroSlides: 'showHero',
    quickStats: 'showStats',
    features: 'showFeatures',
    principalMessage: 'showPrincipal',
    announcements: 'showAnnouncements',
    testimonials: 'showTestimonials',
    contactInfo: 'showContact'
  };

  const sectionDisplay = [
    { key: 'heroSlides', label: 'Hero' },
    { key: 'quickStats', label: 'Quick Stats' },
    { key: 'features', label: 'Features' },
    { key: 'principalMessage', label: 'Principal Message' },
    { key: 'announcements', label: 'Announcements' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'contactInfo', label: 'Contact' }
  ];

  const toggleSectionVisibility = (key) => {
    setData(prev => {
      const layoutKey = layoutMap[key];
      const updated = { ...prev };
      updated.layout = { ...(prev.layout || {}) };
      updated.layout[layoutKey] = !prev.layout?.[layoutKey];

      const newVal = !!updated.layout[layoutKey];

      // update nested arrays/objects
      if (key === 'heroSlides' && Array.isArray(prev.heroSlides)) {
        updated.heroSlides = prev.heroSlides.map(s => ({ ...s, show: newVal }));
      } else if (key === 'quickStats' && Array.isArray(prev.quickStats)) {
        updated.quickStats = prev.quickStats.map(s => ({ ...s, show: newVal }));
      } else if (key === 'features' && Array.isArray(prev.features)) {
        updated.features = prev.features.map(f => ({ ...f, show: newVal }));
      } else if (key === 'announcements' && Array.isArray(prev.announcements)) {
        updated.announcements = prev.announcements.map(a => ({ ...a, show: newVal }));
      } else if (key === 'testimonials' && Array.isArray(prev.testimonials)) {
        updated.testimonials = prev.testimonials.map(t => ({ ...t, show: newVal }));
      } else if (key === 'principalMessage' && prev.principalMessage) {
        updated.principalMessage = { ...prev.principalMessage, show: newVal };
      } else if (key === 'contactInfo' && prev.contactInfo) {
        updated.contactInfo = { ...prev.contactInfo, show: newVal };
      }

      return updated;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        homeData: data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      // encrypt payload before sending
      const encrypted = await encryptObject(payload);
      const res = await apiRequest('save_data/save_home', { payload: encrypted });
      if (res && (res.status === 200 || res.status === 201)) {
        setSectionVisibilityModal(false);
        toast.success('Visibility settings saved');
      } else {
        console.error('Save failed', res);
        toast.error('Failed to save visibility settings');
      }
    } catch (err) {
      console.error('Save error', err);
      toast.error('Error saving visibility settings');
    }
  };

  // Safe access for layout
  const layout = getSafeObject(data.layout);
  const titles = getSafeObject(data.titles);

  // Set up intervals only when data is available and arrays are valid
  useEffect(() => {
    if (filteredHeroSlides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredHeroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredHeroSlides.length]); // Depend on length instead of array reference

  useEffect(() => {
    if (filteredTestimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [filteredTestimonials.length]);

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setPreviewMode(false);
    setEditFormOpen(true);
    let sectionData = {};
    let layoutKey = null;
    let titlesKey = null;

    switch (section) {
      case 'heroSlides':
        sectionData = { ...layout, showSection: layout.showHero, items: [...getSafeArray(data.heroSlides)] };
        layoutKey = 'showHero';
        break;
      case 'quickStats':
        sectionData = { ...layout, showSection: layout.showStats, items: [...getSafeArray(data.quickStats)] };
        layoutKey = 'showStats';
        break;
      case 'features':
        sectionData = {
          ...layout,
          showSection: layout.showFeatures,
          title: titles.features?.title || '',
          subtitle: titles.features?.subtitle || '',
          items: [...getSafeArray(data.features)]
        };
        layoutKey = 'showFeatures';
        titlesKey = 'features';
        break;
      case 'principalMessage':
        sectionData = {
          ...layout,
          showSection: layout.showPrincipal,
          title: titles.principal?.title || '',
          ...principalMessage
        };
        layoutKey = 'showPrincipal';
        titlesKey = 'principal';
        break;
      case 'announcements':
        sectionData = {
          ...layout,
          showSection: layout.showAnnouncements,
          title: titles.announcements?.title || '',
          viewAll: titles.announcements?.viewAll || '',
          viewAllLink: titles.announcements?.viewAllLink || '',
          items: [...getSafeArray(data.announcements)]
        };
        layoutKey = 'showAnnouncements';
        titlesKey = 'announcements';
        break;
      case 'testimonials':
        sectionData = {
          ...layout,
          showSection: layout.showTestimonials,
          title: titles.testimonials?.title || '',
          subtitle: titles.testimonials?.subtitle || '',
          items: [...getSafeArray(data.testimonials)]
        };
        layoutKey = 'showTestimonials';
        titlesKey = 'testimonials';
        break;
      case 'contactInfo':
        const contactInfo = getSafeObject(data.contactInfo);
        const updatedQuickActions = getSafeArray(data.quickActions).map(action => {
          if (action.label === "Download Prospectus") {
            return { ...action, isDownload: true };
          }
          return action;
        });
        sectionData = {
          ...layout,
          showSection: layout.showContact,
          title: titles.contact?.title || '',
          buttonText: titles.contact?.buttonText || '',
          ctaLink: titles.contact?.ctaLink || '',
          ...contactInfo,
          quickActions: [...updatedQuickActions]
        };
        layoutKey = 'showContact';
        titlesKey = 'contact';
        break;
      case 'quickAccess':
        sectionData = { items: [...getSafeArray(data.quickAccess)] };
        break;
      default:
        sectionData = { ...getSafeObject(data[section]) };
    }
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for array items
  const handleArrayChange = (arrayKey, index, field, value) => {
    const updatedArray = [...(editData[arrayKey] || [])];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setEditData(prev => ({ ...prev, [arrayKey]: updatedArray }));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested array like principal stats
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle download for prospectus
const handleDownload = async (url, filename = 'prospectus.pdf') => {
  if (!url) {
    toast.error('No file available for download. Please contact administration.');
    return;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    toast.error('Download failed. Please try again.');
  }
};
  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save changes - Save complete JSON data to database
  const saveChanges = async () => {
    let updatedData = { ...data };

    // Update layout if present
    if (editData.showSection !== undefined) {
      const layoutKey = editSection === 'heroSlides' ? 'showHero' :
        editSection === 'quickStats' ? 'showStats' :
          editSection === 'features' ? 'showFeatures' :
            editSection === 'principalMessage' ? 'showPrincipal' :
              editSection === 'announcements' ? 'showAnnouncements' :
                editSection === 'testimonials' ? 'showTestimonials' :
                  editSection === 'contactInfo' ? 'showContact' : null;
      if (layoutKey) {
        updatedData.layout = { ...updatedData.layout, [layoutKey]: editData.showSection };
      }
    }

    // Update titles if present
    if (editData.title !== undefined || editData.subtitle !== undefined || editData.viewAll !== undefined || editData.buttonText !== undefined || editData.ctaLink !== undefined) {
      const titlesKey = editSection === 'features' ? 'features' :
        editSection === 'principalMessage' ? 'principal' :
          editSection === 'announcements' ? 'announcements' :
            editSection === 'testimonials' ? 'testimonials' :
              editSection === 'contactInfo' ? 'contact' : null;
      if (titlesKey) {
        const titleUpdates = {};
        if (editData.title !== undefined) titleUpdates.title = editData.title;
        if (editData.subtitle !== undefined) titleUpdates.subtitle = editData.subtitle;
        if (editData.viewAll !== undefined) {
          titleUpdates.viewAll = editData.viewAll;
          titleUpdates.viewAllLink = editData.viewAllLink || (titles[titlesKey]?.viewAllLink || '');
        }
        if (editData.buttonText !== undefined) titleUpdates.buttonText = editData.buttonText;
        if (editData.ctaLink !== undefined) titleUpdates.ctaLink = editData.ctaLink;
        updatedData.titles = {
          ...updatedData.titles,
          [titlesKey]: {
            ...(updatedData.titles?.[titlesKey] || {}),
            ...titleUpdates
          }
        };
      }
    }

    // Update main section data
    if (editSection === 'contactInfo') {
      const { quickActions, showSection, title, buttonText, ctaLink, ...contactUpdates } = editData;
      updatedData.contactInfo = { ...updatedData.contactInfo, ...contactUpdates };
      if (quickActions) updatedData.quickActions = quickActions;
    } else if (editSection === 'principalMessage') {
      const { showSection, title, ...principalUpdates } = editData;
      updatedData.principalMessage = { ...updatedData.principalMessage, ...principalUpdates };
    } else if (editData.items !== undefined) {
      updatedData[editSection] = editData.items;
    } else {
      updatedData[editSection] = { ...editData };
    }

    // Prepare the complete JSON payload with all data
    const payload = {
      homeData: updatedData, // Send complete JSON data
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin',
      version: '1.0'
    };

    console.log('Saving complete JSON payload:', JSON.stringify(payload, null, 2));
    
    try {
      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const res = await apiRequest('save_data/save_home', { payload: encryptedPayload });
      console.log('Save response:', res);
      
      if (res && res.status === 201) {
        // Update local state only after successful API call
        setData(updatedData);
        setEditFormOpen(false);
        setOriginalData(null);
        toast.success('Data saved successfully!');
      } else {
        toast.error('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
      toast.error('Error saving data. Please try again.');
    }
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
          className="px-3 py-2 text-sm text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center space-x-1"
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

  // Render icon component
  const renderIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-4 w-4 text-yellow-400" /> : <Globe className="h-4 w-4 text-yellow-400" />;
  };

  // Show loading state
  if (isLoading) {
    return (
     <Spinner fullScreen={true} />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
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
              {editSection === 'heroSlides' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Hero Section</span>
                    </label>
                  </div>
                  {editData.items.map((slide, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Slide {index + 1}</h3>
                      <div className="space-y-4">
                        <div>
                          {/* <label className="block text-sm font-medium mb-1">Image URL</label>
                          <input
                            type="text"
                            value={slide.image || ''}
                            onChange={(e) => handleArrayChange('items', index, 'image', e.target.value)}
                            placeholder="Enter image URL"
                            className="w-full p-2 border rounded mb-2"
                          /> */}
                          <label className="block text-sm font-medium mb-1">Or Upload File</label>
                          <FileUpload
                            currentUrl={slide.image || ''}
                            onUploadSuccess={(url) => handleArrayChange('items', index, 'image', url)}
                            label="Hero Slide Image"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Subtitle</label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => handleArrayChange('items', index, 'subtitle', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">CTA Text</label>
                          <input
                            type="text"
                            value={slide.cta || ''}
                            onChange={(e) => handleArrayChange('items', index, 'cta', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={slide.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Slide</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'quickStats' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Quick Stats</span>
                    </label>
                  </div>
                  {editData.items.map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Stat {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Number</label>
                          <input
                            type="text"
                            value={stat.number || ''}
                            onChange={(e) => handleArrayChange('items', index, 'number', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input
                            type="text"
                            value={stat.label || ''}
                            onChange={(e) => handleArrayChange('items', index, 'label', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={stat.icon || ''}
                            onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            {Object.keys(iconMap).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={stat.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'features' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Features Section</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title & Subtitle</h3>
                    <div className="space-y-3">
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
                        <input
                          type="text"
                          value={editData.subtitle || ''}
                          onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  {editData.items.map((feature, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Feature {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select
                            value={feature.icon || ''}
                            onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          >
                            {Object.keys(iconMap).map((key) => (
                              <option key={key} value={key}>
                                {key}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={feature.title || ''}
                            onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={feature.description || ''}
                            onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={feature.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Feature</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'principalMessage' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Principal Message</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={editData.title || ''}
                          onChange={(e) => handleObjectChange('title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Message Details</h3>
                    <div className="space-y-3">
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
                        <label className="block text-sm font-medium">Message</label>
                        <textarea
                          value={editData.message || ''}
                          onChange={(e) => handleObjectChange('message', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Stats</h3>
                    {editData.stats?.map((stat, index) => (
                      <div key={index} className="mb-4 p-3 border rounded bg-white">
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
                  </div>
                </div>
              )}
              {editSection === 'announcements' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Announcements</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title & View All</h3>
                    <div className="space-y-3">
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
                        <label className="block text-sm font-medium">View All Text</label>
                        <input
                          type="text"
                          value={editData.viewAll || ''}
                          onChange={(e) => handleObjectChange('viewAll', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">View All Link</label>
                        <input
                          type="text"
                          value={editData.viewAllLink || ''}
                          onChange={(e) => handleObjectChange('viewAllLink', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="/news-events"
                        />
                      </div>
                    </div>
                  </div>
                  {editData.items.map((announcement, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Announcement {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Date</label>
                          <input
                            type="text"
                            value={announcement.date || ''}
                            onChange={(e) => handleArrayChange('items', index, 'date', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={announcement.title || ''}
                            onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Content</label>
                          <textarea
                            value={announcement.content || ''}
                            onChange={(e) => handleArrayChange('items', index, 'content', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={announcement.urgent || false}
                              onChange={(e) => handleArrayChange('items', index, 'urgent', e.target.checked)}
                            />
                            <span>Urgent</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={announcement.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Announcement</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'testimonials' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Testimonials</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title & Subtitle</h3>
                    <div className="space-y-3">
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
                        <input
                          type="text"
                          value={editData.subtitle || ''}
                          onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                  {editData.items.map((test, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">Testimonial {index + 1}</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={test.name || ''}
                            onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Role</label>
                          <input
                            type="text"
                            value={test.role || ''}
                            onChange={(e) => handleArrayChange('items', index, 'role', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Content</label>
                          <textarea
                            value={test.content || ''}
                            onChange={(e) => handleArrayChange('items', index, 'content', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Rating (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={test.rating || 5}
                            onChange={(e) => handleArrayChange('items', index, 'rating', parseInt(e.target.value))}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={test.show !== false}
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Testimonial</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Contact Section</span>
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Title & Button</h3>
                    <div className="space-y-3">
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
                        <label className="block text-sm font-medium">Button Text</label>
                        <input
                          type="text"
                          value={editData.buttonText || ''}
                          onChange={(e) => handleObjectChange('buttonText', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Button Link</label>
                        <input
                          type="text"
                          value={editData.ctaLink !== undefined ? editData.ctaLink : (titles.contact?.ctaLink || '')}
                          onChange={(e) => handleObjectChange('ctaLink', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="/appointment"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Address</label>
                        <textarea
                          value={editData.address || ''}
                          onChange={(e) => handleObjectChange('address', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <textarea
                          value={editData.phone || ''}
                          onChange={(e) => handleObjectChange('phone', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                          type="text"
                          value={editData.email || ''}
                          onChange={(e) => handleObjectChange('email', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Hours</label>
                        <textarea
                          value={editData.hours || ''}
                          onChange={(e) => handleObjectChange('hours', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                    {editData.quickActions.map((action, index) => (
                      <div key={index} className="mb-4 border p-2 rounded bg-white">
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium">Label</label>
                            <input
                              type="text"
                              value={action.label || ''}
                              onChange={(e) => handleArrayChange('quickActions', index, 'label', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Icon</label>
                            <select
                              value={action.icon || ''}
                              onChange={(e) => handleArrayChange('quickActions', index, 'icon', e.target.value)}
                              className="w-full p-2 border rounded"
                            >
                              {Object.keys(iconMap).map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </select>
                          </div>
                          {!action.isDownload && (
                            <div>
                              <label className="block text-sm font-medium">Link</label>
                              <input
                                type="text"
                                value={action.link || ''}
                                onChange={(e) => handleArrayChange('quickActions', index, 'link', e.target.value)}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                          )}
                          {action.isDownload && (
                            <div>
                              <label className="block text-sm font-medium">Upload Prospectus File</label>
                              <FileUpload
                                currentUrl={action.fileUrl || ''}
                                onUploadSuccess={(url) => handleArrayChange('quickActions', index, 'fileUrl', url)}
                                label="Upload PDF"
                                accept="application/pdf"
                                isDocument={true}
                              />
                            </div>
                          )}
                          <div>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={action.show !== false}
                                onChange={(e) => handleArrayChange('quickActions', index, 'show', e.target.checked)}
                              />
                              <span>Show Action</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {editSection === 'quickAccess' && editData.items && editData.items.map((access, index) => (
                <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Access {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Label</label>
                      <input
                        type="text"
                        value={access.label || ''}
                        onChange={(e) => handleArrayChange('items', index, 'label', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Sublabel</label>
                      <input
                        type="text"
                        value={access.sublabel || ''}
                        onChange={(e) => handleArrayChange('items', index, 'sublabel', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Icon</label>
                      <select
                        value={access.icon || ''}
                        onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        {Object.keys(iconMap).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Link</label>
                      <input
                        type="text"
                        value={access.link || ''}
                        onChange={(e) => handleArrayChange('items', index, 'link', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={access.show !== false}
                          onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)}
                        />
                        <span>Show Access</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Manage Section Visibility Floating Button & Modal */}
      {editMode && (
        <>
          <button
            onClick={() => setSectionVisibilityModal(true)}
            className="fixed bottom-6 right-6 z-50 bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            title="Manage Section Visibility"
          >
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[70vh]">
                <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-bold">Manage Section Visibility</h2>
                  </div>
                  <div>
                    <button onClick={() => setSectionVisibilityModal(false)} className="p-2 text-gray-600 hover:text-gray-800">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto flex-1 max-h-[70vh]">
                  <div className="space-y-3">
                    {sectionDisplay.map(section => (
                      <div key={section.key} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                        <div className="flex items-center space-x-3">
                          <span className={`w-3 h-3 rounded-full ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!data[section.key]?.show) ? 'bg-green-600' : 'bg-gray-300'}`} />
                          <span className="font-medium">{section.label}</span>
                        </div>
                        <button
                          onClick={() => toggleSectionVisibility(section.key)}
                          className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!data[section.key]?.show) ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                          <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end items-center px-4 py-3 bg-gray-50 border-t">
                  <button onClick={() => setSectionVisibilityModal(false)} className="px-3 py-2 mr-2 text-sm text-gray-700 bg-white border border-gray-300 rounded">Cancel</button>
                  <button onClick={saveSectionVisibility} className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded">Save</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Hero Section */}
      {layout.showHero && filteredHeroSlides.length > 0 && (
        <section className="relative h-[450px] overflow-hidden">
          {filteredHeroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onLoad={() => console.log(`Slide ${index} loaded`)} // Debug log
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl mb-6 text-gray-200">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.ctaLink || "#"}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
                  >
                    {slide.cta}
                    <ArrowRight className="inline ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {filteredHeroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
              />
            ))}
          </div>

          {/* Quick Access Bar */}
          {filteredQuickAccess.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-green-800/90 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 py-3 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white">
                  {filteredQuickAccess.map((access, index) => (
                    <a key={index} href={access.link} className="flex items-center space-x-2 hover:bg-green-700/50 p-2 rounded-lg transition-colors text-sm">
                      {renderIcon(access.icon)}
                      <div>
                        <h3 className="font-semibold">{access.label}</h3>
                        <p className="text-xs text-green-100">{access.sublabel}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </a>
                  ))}
                </div>
                {editMode && (
                  <button
                    onClick={() => openEditModal('quickAccess')}
                    className="absolute top-2 right-2 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
          {editMode && (
            <button
              onClick={() => openEditModal('heroSlides')}
              className="absolute top-4 right-4 bg-white/80 text-green-800 p-2 rounded-full hover:bg-white"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Quick Stats */}
      {layout.showStats && filteredQuickStats.length > 0 && (
        <section className="py-12 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-2 ${filteredQuickStats.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-6`}>
              {filteredQuickStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    {renderIcon(stat.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('quickStats')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {layout.showFeatures && filteredFeatures.length > 0 && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{titles.features?.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {titles.features?.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(feature.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('features')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Principal's Message */}
      {layout.showPrincipal && principalMessage.show && (
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{titles.principal?.title}</h2>
                <blockquote className="text-base leading-relaxed mb-4">
                  "{principalMessage.message}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{principalMessage.name}</h4>
                    <p className="text-green-100 text-sm">{principalMessage.role}</p>
                  </div>
                </div>
              </div>

              {filteredPrincipalStats.length > 0 && (
                <div className="relative">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className={`grid ${filteredPrincipalStats.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 text-center`}>
                      {filteredPrincipalStats.map((stat, index) => (
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
            {editMode && (
              <button
                onClick={() => openEditModal('principalMessage')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Announcements */}
      {layout.showAnnouncements && filteredAnnouncements.length > 0 && (
        <section className="py-16 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">{titles.announcements?.title}</h2>
              <a href={titles.announcements?.viewAllLink} className="text-green-600 hover:text-green-700 font-semibold flex items-center text-sm">
                {titles.announcements?.viewAll}
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredAnnouncements.map((announcement, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">{announcement.date}</span>
                    {announcement.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('announcements')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {layout.showTestimonials && filteredTestimonials.length > 0 && (
        <section className="py-16 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{titles.testimonials?.title}</h2>
              <p className="text-lg text-gray-600">
                {titles.testimonials?.subtitle}
              </p>
            </div>

            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(filteredTestimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-800 mb-4 leading-relaxed">
                  "{filteredTestimonials[activeTestimonial].content}"
                </blockquote>
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {filteredTestimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 text-sm">{filteredTestimonials[activeTestimonial].role}</p>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('testimonials')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Contact Section */}
      {layout.showContact && (
        <section className="py-16 bg-green-800 text-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">{titles.contact?.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Address</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Phone</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Email</h3>
                      <p className="text-green-100 text-sm">{data.contactInfo?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Office Hours</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo?.hours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={titles.contact?.ctaLink || "#"}
                    className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-5 py-2 rounded-lg font-semibold transition-colors text-sm inline-flex items-center"
                  >
                    {titles.contact?.buttonText}
                    <ExternalLink className="inline ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              {filteredQuickActions.length > 0 && (
                <div>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
{filteredQuickActions.map((action, index) => (
  <a 
    key={index} 
    href={action.isDownload ? (action.fileUrl || action.link) : action.link} 
    download={action.isDownload ? "prospectus.pdf" : undefined}
    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm"
  >
    <div className="flex items-center space-x-2">
      {renderIcon(action.icon)}
      <span>{action.label}</span>
    </div>
    <ChevronRight className="h-4 w-4" />
  </a>
))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('contactInfo')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;