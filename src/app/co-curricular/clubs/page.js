"use client";
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  Heart,
  Brain,
  Lightbulb,
  Shield,
  BarChart3,
  Languages,
  FileText,
  Trophy,
  Camera,
  Mic,
  Drama,
  Speech,
  Telescope,
  MapPin,
  Leaf,
  Scale,
  PenTool,
  Eye,
  EyeOff,
  Edit,
  X,
  Settings,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Image from 'next/image';

const ClubsPage = () => {
  const [activeCategory, setActiveCategory] = useState('academic');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});
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

  // Default data structure for Clubs
  const defaultData = {
    hero: {
      show: true,
      title: "Student Clubs & Activities",
      subtitle: "Discover your passions, develop new skills, and build lasting friendships beyond the classroom",
      stats: [
        { value: "25+", label: "Active Clubs", show: true },
        { value: "500+", label: "Student Members", show: true },
        { value: "100+", label: "Annual Events", show: true }
      ],
      backgroundImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true,
      ctaButton: {
        label: "View Club Handbook",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Join a Club?",
      description: "Participation in extracurricular activities provides holistic development and enhances your school experience",
      items: [
        {
          icon: "Users",
          title: "Social Development",
          description: "Building friendships, teamwork, and communication skills through shared interests.",
          show: true
        },
        {
          icon: "Brain",
          title: "Skill Enhancement",
          description: "Developing specialized skills beyond the academic curriculum.",
          show: true
        },
        {
          icon: "Heart",
          title: "Wellness & Balance",
          description: "Providing creative outlets and stress relief from academic pressures.",
          show: true
        },
        {
          icon: "Target",
          title: "Leadership Opportunities",
          description: "Fostering responsibility, initiative, and organizational skills.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Club Categories",
      description: "Explore our diverse range of clubs and activities",
      items: [
        { id: 'academic', name: 'Academic Clubs', icon: "Book", description: 'Subject-focused enrichment', show: true },
        { id: 'arts', name: 'Arts & Culture', icon: "Palette", description: 'Creative expression', show: true },
        { id: 'sports', name: 'Sports & Fitness', icon: "Trophy", description: 'Physical development', show: true },
        { id: 'service', name: 'Service & Leadership', icon: "Heart", description: 'Community engagement', show: true }
      ]
    },
    clubs: {
      show: true,
      labels: {
        meeting: "Meeting Time",
        advisor: "Advisor"
      },
      items: {
        academic: [
          { 
            name: "Science Club", 
            icon: "Microscope", 
            meeting: "Mondays, 3:00 PM", 
            advisor: "Dr. Sharma",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Math Olympiad", 
            icon: "Calculator", 
            meeting: "Tuesdays, 3:30 PM", 
            advisor: "Mr. Gupta",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Literary Society", 
            icon: "Book", 
            meeting: "Wednesdays, 3:00 PM", 
            advisor: "Ms. Das",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Debate Club", 
            icon: "Speech", 
            meeting: "Thursdays, 4:00 PM", 
            advisor: "Mr. Kapoor",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Computer Coding", 
            icon: "Code", 
            meeting: "Fridays, 3:30 PM", 
            advisor: "Mr. Singh",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Eco Club", 
            icon: "Leaf", 
            meeting: "Saturdays, 10:00 AM", 
            advisor: "Ms. Reddy",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          }
        ],
        arts: [
          { 
            name: "Art & Painting", 
            icon: "Palette", 
            meeting: "Mondays, 3:30 PM", 
            advisor: "Ms. Chaturvedi",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Drama Club", 
            icon: "Drama", 
            meeting: "Tuesdays, 4:00 PM", 
            advisor: "Mr. Malhotra",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Music Club", 
            icon: "Music", 
            meeting: "Wednesdays, 3:30 PM", 
            advisor: "Mr. Joshi",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Photography Club", 
            icon: "Camera", 
            meeting: "Thursdays, 3:00 PM", 
            advisor: "Ms. Mehta",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Creative Writing", 
            icon: "PenTool", 
            meeting: "Fridays, 3:00 PM", 
            advisor: "Ms. Banerjee",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          }
        ],
        sports: [
          { 
            name: "Basketball", 
            icon: "Trophy", 
            meeting: "Mondays & Wednesdays, 4:00 PM", 
            advisor: "Mr. Kumar",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Cricket", 
            icon: "Trophy", 
            meeting: "Tuesdays & Thursdays, 4:00 PM", 
            advisor: "Mr. Patel",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Chess Club", 
            icon: "Trophy", 
            meeting: "Fridays, 3:30 PM", 
            advisor: "Mr. Iyer",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Yoga & Meditation", 
            icon: "Heart", 
            meeting: "Daily, 7:30 AM", 
            advisor: "Ms. Desai",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Table Tennis", 
            icon: "Trophy", 
            meeting: "Mondays & Fridays, 3:30 PM", 
            advisor: "Mr. Sharma",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          }
        ],
        service: [
          { 
            name: "Student Council", 
            icon: "Users", 
            meeting: "Bi-weekly Tuesdays, 3:00 PM", 
            advisor: "Mr. Khanna",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Community Service", 
            icon: "Heart", 
            meeting: "Saturdays, 9:00 AM", 
            advisor: "Ms. Sengupta",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Peer Tutoring", 
            icon: "Book", 
            meeting: "After school as needed", 
            advisor: "Mr. Ahmed",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          },
          { 
            name: "Event Planning", 
            icon: "Calendar", 
            meeting: "Wednesdays, 3:30 PM", 
            advisor: "Ms. Kapoor",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true 
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Club Events",
      description: "Mark your calendars for these exciting club activities and competitions",
      labels: {
        time: "Time",
        location: "Location",
        viewDetails: "View details"
      },
      items: [
        {
          title: "Inter-School Science Exhibition",
          date: "15 Oct 2024",
          time: "10:00 AM - 3:00 PM",
          club: "Science Club",
          location: "School Auditorium",
          viewDetails: {
            show: true,
            text: "View details",
            link: "#"
          },
          show: true
        },
        {
          title: "Annual Drama Production",
          date: "25-27 Oct 2024",
          time: "6:00 PM onwards",
          club: "Drama Club",
          location: "School Amphitheater",
          viewDetails: {
            show: true,
            text: "View details",
            link: "#"
          },
          show: true
        },
        {
          title: "Basketball Tournament",
          date: "5 Nov 2024",
          time: "9:00 AM - 5:00 PM",
          club: "Basketball Club",
          location: "School Ground",
          viewDetails: {
            show: true,
            text: "View details",
            link: "#"
          },
          show: true
        },
        {
          title: "Community Clean-Up Drive",
          date: "12 Nov 2024",
          time: "8:00 AM - 12:00 PM",
          club: "Community Service",
          location: "Local Park",
          viewDetails: {
            show: true,
            text: "View details",
            link: "#"
          },
          show: true
        }
      ],
      ctaButton: {
        label: "View Full Events Calendar",
        link: "#",
        show: true
      }
    },
    registration: {
      show: true,
      title: "How to Join a Club",
      description: "Follow these simple steps to become part of our vibrant club community",
      items: [
        {
          step: "1",
          title: "Explore Clubs",
          description: "Review all available clubs and their descriptions",
          show: true
        },
        {
          step: "2",
          title: "Attend Trial Sessions",
          description: "Visit clubs during their meeting times to find your interest",
          show: true
        },
        {
          step: "3",
          title: "Submit Form",
          description: "Complete the registration form with parent consent",
          show: true
        },
        {
          step: "4",
          title: "Commitment",
          description: "Attend regularly and participate actively",
          show: true
        }
      ],
      timeline: {
        title: "Registration Timeline",
        description: "Club registration opens on August 15, 2024 and remains open throughout the year with advisor approval.",
        buttonLabel: "Register Now",
        link: "#",
        show: true
      }
    },
    resources: {
      show: true,
      title: "Club Resources",
      description: "Download important documents and forms for club participation",
      items: [
        {
          title: "Club Registration Form",
          description: "Official form to join any school club",
          format: "PDF",
          size: "0.8 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Club Activities Calendar",
          description: "Schedule of all club meetings and events for 2024-25",
          format: "PDF",
          size: "1.2 MB",
          icon: "Calendar",
          link: "#",
          show: true
        },
        {
          title: "Parent Consent Guidelines",
          description: "Information for parents about club participation",
          format: "PDF",
          size: "0.5 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Club Achievement Portfolio",
          description: "Record of club accomplishments and competitions",
          format: "PDF",
          size: "2.1 MB",
          icon: "Trophy",
          link: "#",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Questions About Clubs?",
      description: "Contact our Club Coordinator for more information about club activities, registration, or starting a new club.",
      buttons: [
        { label: "Email Coordinator", link: "#", show: true },
        { label: "Request Club Information", link: "#", show: true }
      ]
    },
    general: {
      learnMore: {
        text: "Learn more",
        link: "#",
        show: true
      },
      download: {
        text: "Download",
        link: "#",
        show: true
      },
      viewDetails: {
        text: "View Details",
        link: "#",
        show: true
      }
    },
    layout: {
      showHero: true,
      showBenefits: true,
      showCategories: true,
      showClubs: true,
      showUpcomingEvents: true,
      showRegistration: true,
      showResources: true,
      showCta: true
    }
  };

  // Icon mapping
  const iconMap = {
    Users, Target, Clock, Calendar, ChevronDown, ChevronRight,
    Download, ExternalLink, ArrowRight, Book, Calculator, Palette,
    Microscope, Globe, Code, Music, Heart, Brain, Lightbulb, Shield,
    BarChart3, Languages, FileText, Trophy, Camera, Mic, Drama, Speech,
    Telescope, MapPin, Leaf, Scale, PenTool
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    categories: 'showCategories',
    clubs: 'showClubs',
    upcomingEvents: 'showUpcomingEvents',
    registration: 'showRegistration',
    resources: 'showResources',
    cta: 'showCta'
  };

  // Download file function to prevent HTML download issues
  const downloadFile = async (url, filename) => {
    if (!url || url === '#') return;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct navigation if fetch fails
      window.open(url, '_blank');
    }
  };

  // Check role
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_clubs_data', {});
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          try {
            if (fetchedData && typeof fetchedData === 'object' && fetchedData.encrypted) {
              const dec = await decryptObject(fetchedData);
              if (dec) fetchedData = dec;
            } else if (typeof fetchedData === 'string') {
              try { fetchedData = JSON.parse(fetchedData); } catch (e) { /* leave as-is */ }
            }
          } catch (deErr) {
            console.warn('Decryption failed for clubs page:', deErr);
          }
          setData({ ...defaultData, ...fetchedData });
        } else {
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (section === 'overview') {
      const overviewData = {
        showCategories: data.layout.showCategories,
        showClubs: data.layout.showClubs,
        categories: data.categories,
        clubs: data.clubs,
        general: data.general
      };
      setEditData(overviewData);
      setOriginalData(JSON.parse(JSON.stringify(overviewData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data.layout[layoutKey],
        ...data[section]
      };
      setEditData(sectionData);
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    }
  };

  // Handle changes for regular sections
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  const handleListChange = (arrayKey, index, listField, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      updated[arrayKey][index][listField] = value;
      return updated;
    });
  };

  const handleNestedObjectChange = (arrayKey, index, nestedKey, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      const currentItem = { ...updated[arrayKey][index] };
      if (!currentItem[nestedKey]) currentItem[nestedKey] = {};
      currentItem[nestedKey][field] = value;
      updated[arrayKey][index] = currentItem;
      return updated;
    });
  };

  const handleObjectNestedChange = (objKey, nestedKey, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[objKey]) updated[objKey] = {};
      const currentObj = { ...updated[objKey] };
      if (!currentObj[nestedKey]) currentObj[nestedKey] = {};
      currentObj[nestedKey][field] = value;
      updated[objKey] = currentObj;
      return updated;
    });
  };

  const handleImageChange = (field, url, arrayKey = null, index = null) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (arrayKey && index !== null) {
        if (!updated[arrayKey]) updated[arrayKey] = [];
        updated[arrayKey][index][field] = url;
      } else {
        updated[field] = url;
      }
      return updated;
    });
  };

  // Handle general nested changes (for learnMore, download, etc.)
  const handleGeneralNestedChange = (generalKey, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.general) updated.general = {};
      if (!updated.general[generalKey]) updated.general[generalKey] = {};
      if (field === 'show') {
        updated.general[generalKey] = value;
      } else {
        updated.general[generalKey] = { ...updated.general[generalKey], [field]: value };
      }
      return updated;
    });
  };

  // Toggle section
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save
  const saveChanges = async () => {
    try {
      let updatedData = { ...data };
      if (editSection === 'overview') {
        updatedData.layout.showCategories = editData.showCategories;
        updatedData.layout.showClubs = editData.showClubs;
        updatedData.categories = editData.categories;
        updatedData.clubs = editData.clubs;
        updatedData.general = editData.general;
      } else {
        const layoutKey = layoutMap[editSection];
        if (layoutKey && 'showSection' in editData) {
          updatedData.layout[layoutKey] = editData.showSection;
        }
        const { showSection, ...sectionUpdates } = editData;
        updatedData[editSection] = { ...data[editSection], ...sectionUpdates };
      }

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_clubs_data', { payload: encrypted });
        if (save_data.status === 200) {
          setData(updatedData);
        } else {
          console.error('Save failed:', save_data);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Cancel
  const cancelChanges = () => {
    if (originalData) {
      setEditData(originalData);
    }
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Filters
  const filteredHeroStats = data.hero?.stats?.filter(stat => stat.show !== false) || [];
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredClubs = data.clubs?.items ? 
    Object.fromEntries(
      Object.entries(data.clubs.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredRegistrationSteps = data.registration?.items?.filter(step => step.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showBenefits', label: 'Benefits' },
    { key: 'showCategories', label: 'Categories' },
    { key: 'showClubs', label: 'Clubs' },
    { key: 'showUpcomingEvents', label: 'Upcoming Events' },
    { key: 'showRegistration', label: 'Registration' },
    { key: 'showResources', label: 'Resources' },
    { key: 'showCta', label: 'CTA Section' }
  ];

  const openSectionVisibilityModal = () => {
    const visibility = {};
    sectionDisplay.forEach(s => {
      visibility[s.key] = data.layout?.[s.key];
    });
    setSectionVisibility(visibility);
    setSectionVisibilityModal(true);
  };

  const toggleSectionVisibility = (key) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [key]: prev?.[key] === false ? true : false };
      return next;
    });
    setData(prev => ({ ...prev, layout: { ...prev.layout, [key]: prev.layout?.[key] === false ? true : false } }));
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      try {
        const encrypted = await encryptObject(payload);
        await apiRequest('save_data/save_clubs_data', { payload: encrypted });
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (err) {
      console.error('Failed to save section visibility', err);
    }
    setSectionVisibilityModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading clubs data...</p>
        </div>
      </div>
    );
  }

  // Modal Footer
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
          onClick={saveChanges}
          className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  // Overview handlers
  const handleOverviewCategoriesObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, categories: { ...prev.categories, [field]: value } }));
  };

  const handleOverviewCategoriesArrayChange = (index, field, value) => {
    setEditData(prev => {
      const newItems = [...(prev.categories.items || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, categories: { ...prev.categories, items: newItems } };
    });
  };

  const handleOverviewClubsLabelsChange = (labelKey, value) => {
    setEditData(prev => {
      const newLabels = { ...prev.clubs.labels };
      newLabels[labelKey] = value;
      return { ...prev, clubs: { ...prev.clubs, labels: newLabels } };
    });
  };

  const handleOverviewClubsArrayChange = (categoryId, index, field, value) => {
    setEditData(prev => {
      const newItemsObj = { ...prev.clubs.items };
      if (!newItemsObj[categoryId]) newItemsObj[categoryId] = [];
      const newArray = [...newItemsObj[categoryId]];
      newArray[index] = { ...newArray[index], [field]: value };
      newItemsObj[categoryId] = newArray;
      return { ...prev, clubs: { ...prev.clubs, items: newItemsObj } };
    });
  };

  const handleOverviewClubsNestedChange = (categoryId, index, nestedKey, field, value) => {
    setEditData(prev => {
      const newItemsObj = { ...prev.clubs.items };
      if (!newItemsObj[categoryId]) newItemsObj[categoryId] = [];
      const newArray = [...newItemsObj[categoryId]];
      if (!newArray[index][nestedKey]) newArray[index][nestedKey] = {};
      newArray[index][nestedKey][field] = value;
      newItemsObj[categoryId] = newArray;
      return { ...prev, clubs: { ...prev.clubs, items: newItemsObj } };
    });
  };

  const handleOverviewToggleCategories = (value) => {
    setEditData(prev => ({ ...prev, showCategories: value }));
  };

  const handleOverviewToggleClubs = (value) => {
    setEditData(prev => ({ ...prev, showClubs: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit {editSection.charAt(0).toUpperCase() + editSection.slice(1)}</h2>
              <button onClick={cancelChanges} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={stat.value || ''} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={stat.label || ''} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={stat.show !== false} onChange={(e) => handleArrayChange('stats', index, 'show', e.target.checked)} />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  
                  <div>
                    <FileUpload currentUrl={editData.backgroundImage || ''} onUploadSuccess={(url) => handleObjectChange('backgroundImage', url)} label="Background Image" />
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.backgroundImageShow !== false} onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)} />
                      <span>Show Background Image</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedObjectChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                    <input type="text" value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedObjectChange('ctaButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedObjectChange('ctaButton', 'link', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Benefits</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded" placeholder="Icon name" />
                        <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'overview' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showCategories || false} onChange={(e) => handleOverviewToggleCategories(e.target.checked)} />
                      <span>Show Categories</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showClubs || false} onChange={(e) => handleOverviewToggleClubs(e.target.checked)} />
                      <span>Show Clubs</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Categories</h3>
                  <div className="space-y-2">
                    <input type="text" value={editData.categories?.title || ''} onChange={(e) => handleOverviewCategoriesObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                    <textarea value={editData.categories?.description || ''} onChange={(e) => handleOverviewCategoriesObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                  </div>
                  {(editData.categories?.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Category {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.id || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'id', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.name || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.icon || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'icon', e.target.value)} className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'show', e.target.checked)} />
                          <span>Show Category</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Clubs Labels</h3>
                  <div className="space-y-2">
                    <input type="text" value={editData.clubs?.labels?.meeting || ''} onChange={(e) => handleOverviewClubsLabelsChange('meeting', e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" value={editData.clubs?.labels?.advisor || ''} onChange={(e) => handleOverviewClubsLabelsChange('advisor', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  {Object.entries(editData.clubs?.items || {}).map(([categoryId, items]) => (
                    <div key={categoryId} className="mt-4">
                      <h4 className="text-md font-semibold mb-2">{categoryId}</h4>
                      {(items || []).map((item, index) => (
                        <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h5 className="text-sm font-medium mb-2">Club {index + 1}</h5>
                          <div className="space-y-2">
                            <input type="text" value={item.name || ''} onChange={(e) => handleOverviewClubsArrayChange(categoryId, index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                            <input type="text" value={item.icon || ''} onChange={(e) => handleOverviewClubsArrayChange(categoryId, index, 'icon', e.target.value)} className="w-full p-2 border rounded" />
                            <input type="text" value={item.meeting || ''} onChange={(e) => handleOverviewClubsArrayChange(categoryId, index, 'meeting', e.target.value)} className="w-full p-2 border rounded" />
                            <input type="text" value={item.advisor || ''} onChange={(e) => handleOverviewClubsArrayChange(categoryId, index, 'advisor', e.target.value)} className="w-full p-2 border rounded" />
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={item.learnMore?.show !== false} onChange={(e) => handleOverviewClubsNestedChange(categoryId, index, 'learnMore', 'show', e.target.checked)} />
                                <span>Show Learn More</span>
                              </label>
                              <input type="text" value={item.learnMore?.text || ''} onChange={(e) => handleOverviewClubsNestedChange(categoryId, index, 'learnMore', 'text', e.target.value)} className="w-full p-2 border rounded" />
                              <input type="text" value={item.learnMore?.link || ''} onChange={(e) => handleOverviewClubsNestedChange(categoryId, index, 'learnMore', 'link', e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked={item.show !== false} onChange={(e) => handleOverviewClubsArrayChange(categoryId, index, 'show', e.target.checked)} />
                              <span>Show Club</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">General</h3>
                  <div className="space-y-2">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.general?.learnMore?.show !== false} onChange={(e) => handleGeneralNestedChange('learnMore', 'show', e.target.checked)} />
                        <span>Show Learn More</span>
                      </label>
                      <input type="text" value={editData.general?.learnMore?.text || ''} onChange={(e) => handleGeneralNestedChange('learnMore', 'text', e.target.value)} className="w-full p-2 border rounded" />
                      <input type="text" value={editData.general?.learnMore?.link || ''} onChange={(e) => handleGeneralNestedChange('learnMore', 'link', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.general?.download?.show !== false} onChange={(e) => handleGeneralNestedChange('download', 'show', e.target.checked)} />
                        <span>Show Download</span>
                      </label>
                      <input type="text" value={editData.general?.download?.text || ''} onChange={(e) => handleGeneralNestedChange('download', 'text', e.target.value)} className="w-full p-2 border rounded" />
                      <input type="text" value={editData.general?.download?.link || ''} onChange={(e) => handleGeneralNestedChange('download', 'link', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.general?.viewDetails?.show !== false} onChange={(e) => handleGeneralNestedChange('viewDetails', 'show', e.target.checked)} />
                        <span>Show View Details</span>
                      </label>
                      <input type="text" value={editData.general?.viewDetails?.text || ''} onChange={(e) => handleGeneralNestedChange('viewDetails', 'text', e.target.value)} className="w-full p-2 border rounded" />
                      <input type="text" value={editData.general?.viewDetails?.link || ''} onChange={(e) => handleGeneralNestedChange('viewDetails', 'link', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'upcomingEvents' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Upcoming Events</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Labels</h3>
                  <div className="space-y-2">
                    <input type="text" value={editData.labels?.time || ''} onChange={(e) => handleObjectNestedChange('labels', 'time', e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" value={editData.labels?.location || ''} onChange={(e) => handleObjectNestedChange('labels', 'location', e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" value={editData.labels?.viewDetails || ''} onChange={(e) => handleObjectNestedChange('labels', 'viewDetails', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.date || ''} onChange={(e) => handleArrayChange('items', index, 'date', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.time || ''} onChange={(e) => handleArrayChange('items', index, 'time', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.club || ''} onChange={(e) => handleArrayChange('items', index, 'club', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.location || ''} onChange={(e) => handleArrayChange('items', index, 'location', e.target.value)} className="w-full p-2 border rounded" />
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.viewDetails?.show !== false} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'show', e.target.checked)} />
                            <span>Show View Details</span>
                          </label>
                          <input type="text" value={item.viewDetails?.text || ''} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'text', e.target.value)} className="w-full p-2 border rounded" />
                          <input type="text" value={item.viewDetails?.link || ''} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'link', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Event</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleObjectNestedChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                    <input type="text" value={editData.ctaButton?.label || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" value={editData.ctaButton?.link || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'link', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                </div>
              )}
              {editSection === 'registration' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Registration</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Steps</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Step {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.step || ''} onChange={(e) => handleArrayChange('items', index, 'step', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Step</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Timeline</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.timeline?.show !== false} onChange={(e) => handleObjectNestedChange('timeline', 'show', e.target.checked)} />
                        <span>Show Timeline</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input type="text" value={editData.timeline?.title || ''} onChange={(e) => handleObjectNestedChange('timeline', 'title', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Description</label>
                      <textarea value={editData.timeline?.description || ''} onChange={(e) => handleObjectNestedChange('timeline', 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.timeline?.buttonLabel || ''} onChange={(e) => handleObjectNestedChange('timeline', 'buttonLabel', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.timeline?.link || ''} onChange={(e) => handleObjectNestedChange('timeline', 'link', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Resources</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        <input type="text" value={item.format || ''} onChange={(e) => handleArrayChange('items', index, 'format', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.size || ''} onChange={(e) => handleArrayChange('items', index, 'size', e.target.value)} className="w-full p-2 border rounded" />
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                        <div>
                          <FileUpload currentUrl={item.link || ''} onUploadSuccess={(url) => handleArrayChange('items', index, 'link', url)} label="Upload Resource File" />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                  {(editData.buttons || []).map((button, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Button {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input type="text" value={button.label || ''} onChange={(e) => handleArrayChange('buttons', index, 'label', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Link</label>
                          <input type="text" value={button.link || ''} onChange={(e) => handleArrayChange('buttons', index, 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="Button link" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={button.show !== false} onChange={(e) => handleArrayChange('buttons', index, 'show', e.target.checked)} />
                            <span>Show Button</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ModalFooter />
          </div>
        </div>
      )}

            {/* Manage Section Visibility Modal */}
            {sectionVisibilityModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                  <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-900">Manage Section Visibility</h2>
                    <button onClick={() => setSectionVisibilityModal(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[70vh]">
                    {sectionDisplay.map(section => (
                      <div key={section.key} className="flex items-center justify-between border p-3 rounded">
                        <div className="flex items-center space-x-3">
                          {sectionVisibility[section.key] !== false ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                          <div>
                            <div className="font-medium">{section.label}</div>
                            <div className="text-sm text-gray-500">Toggle visibility for this section</div>
                          </div>
                        </div>
                        <button onClick={() => toggleSectionVisibility(section.key)} className={`relative inline-flex items-center h-6 w-11 rounded-full ${sectionVisibility[section.key] !== false ? 'bg-green-600' : 'bg-gray-300'}`}>
                          <span className={`bg-white w-4 h-4 rounded-full transform transition ${sectionVisibility[section.key] !== false ? 'translate-x-5' : 'translate-x-1'}`}></span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
                    <button onClick={() => setSectionVisibilityModal(false)} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={saveSectionVisibility} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

      {/* Hero Section */}
      {data.layout?.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.backgroundImageShow !== false && (
            <Image src={data.hero.backgroundImage || 'https://via.placeholder.com/1920x400'} alt={data.hero.title} fill unoptimized className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-8">
                  {filteredHeroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.hero?.ctaButton?.show !== false && (
                <a 
                  href={data.hero.ctaButton?.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {data.hero.ctaButton?.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {editMode && (
        <button onClick={openSectionVisibilityModal} className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50">
          <Edit className="h-5 w-5" />
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.layout?.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.benefits.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Users;
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
            {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Categories Navigation */}
        {data.layout?.showCategories && data.categories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.categories.title}</h2>
              <p className="text-gray-600">
                {data.categories.description}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = iconMap[category.icon] || Book;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className={`text-xs mt-1 ${activeCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {category.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clubs for Selected Category */}
            {data.layout?.showClubs && data.clubs?.show && filteredClubs[activeCategory] && filteredClubs[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs[activeCategory].map((club, index) => {
                    const IconComponent = iconMap[club.icon] || Book;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">{club.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.clubs?.labels?.meeting}: {club.meeting}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.clubs?.labels?.advisor}: {club.advisor}</span>
                          </div>
                        </div>
                        {club.learnMore?.show !== false && (
                          <a href={club.learnMore?.link || '#'} className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                            {club.learnMore?.text || 'Learn more'}
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('overview')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Upcoming Events */}
        {data.layout?.showUpcomingEvents && data.upcomingEvents?.show && filteredUpcomingEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.upcomingEvents.title}</h2>
              <p className="text-gray-600">
                {data.upcomingEvents.description}
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {filteredUpcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {event.club}
                        </span>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                          <span className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {data.upcomingEvents.labels?.time || 'Time'}: {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {data.upcomingEvents.labels?.location || 'Location'}: {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    {event.viewDetails?.show !== false && (
                      <a href={event.viewDetails?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                        {event.viewDetails?.text || data.upcomingEvents.labels?.viewDetails || 'View details'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data.upcomingEvents.ctaButton?.show !== false && (
              <div className="text-center">
                <a href={data.upcomingEvents.ctaButton?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.upcomingEvents.ctaButton?.label}
                  <Calendar className="ml-2 h-5 w-5" />
                </a>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('upcomingEvents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Registration Process */}
        {data.layout?.showRegistration && data.registration?.show && filteredRegistrationSteps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.registration.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.registration.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRegistrationSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300 group">
                  <div className="bg-green-100 text-green-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            {data.registration?.timeline?.show !== false && (
              <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{data.registration?.timeline?.title}</h3>
                <p className="text-gray-600 mb-4">
                  {data.registration?.timeline?.description}
                </p>
                <a href={data.registration?.timeline?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center">
                  {data.registration?.timeline?.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('registration')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Resources */}
        {data.layout?.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
              <p className="text-gray-600">
                {data.resources.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon] || FileText;
                const downloadUrl = data.general?.download?.link || resource.link || '#';
                const downloadFilename = `${resource.title}.${resource.format?.toLowerCase() || 'pdf'}`;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-start">
                      <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                    </div>
                    {data.general?.download?.show !== false && (
                      <button onClick={() => downloadFile(downloadUrl, downloadFilename)} className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                        {data.general?.download?.text || 'Download'}
                        <Download className="ml-2 h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* CTA Section */}
        {data.layout?.showCta && data.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center relative">
            <h2 className="text-2xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <a key={index} href={button.link || '#'} className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                  {button.label}
                </a>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubsPage;