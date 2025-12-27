"use client";
import React, { useState, useEffect } from 'react';
import { 
  Palette,
  Music,
  Camera,
  Video,
  Users,
  Calendar,
  MapPin,
  Clock,
  Award,
  Star,
  ChevronDown,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  Heart,
  BookOpen,
  Theater,
  Brush,
  Mic,
  Phone,
  Mail,
  Piano,
  ArrowRight,
  Trophy,
  GraduationCap,
  Building,
  Globe,
  Lightbulb,
  Edit,
  X,
  Settings,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const ArtsCulturePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProgram, setActiveProgram] = useState('visual-arts');
  const [openEvent, setOpenEvent] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
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

  // Default data structure
  const defaultData = {
    hero: {
      show: true,
      title: "Arts & Culture",
      subtitle: "Nurturing creativity, expression, and cultural appreciation through comprehensive arts education",
      stats: [
        { value: "15+", label: "Arts Programs", show: true },
        { value: "200+", label: "Annual Events", show: true },
        { value: "50+", label: "National Awards", show: true }
      ],
      height: 'h-96',
      backgroundImage: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2158&q=80",
      backgroundImageShow: true,
    },
    categories: {
      show: true,
      title: "Arts Programs",
      items: [
        { id: 'all', name: 'All Programs', icon: "Palette", show: true },
        { id: 'visual-arts', name: 'Visual Arts', icon: "Brush", show: true },
        { id: 'performing-arts', name: 'Performing Arts', icon: "Theater", show: true },
        { id: 'literary-arts', name: 'Literary Arts', icon: "BookOpen", show: true },
        { id: 'media-arts', name: 'Media Arts', icon: "Camera", show: true }
      ]
    },
    programs: {
      show: true,
      title: "Program Details",
      offeringsTitle: "Program Offerings",
      achievementsTitle: "Recent Achievements",
      joinButton: { label: "Join This Program", link: "#", show: true },
      items: {
        'visual-arts': {
          title: 'Visual Arts Program',
          description: 'Exploring creativity through various visual media and techniques',
          activities: [
            {
              name: 'Drawing & Painting',
              description: 'Techniques in pencil, charcoal, watercolor, oil, and acrylic',
              schedule: 'Mon & Wed, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Ananya Roy',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Sculpture & Pottery',
              description: '3D art forms including clay modeling and ceramics',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Ravi Verma',
              level: 'Intermediate to Advanced',
              show: true
            },
            {
              name: 'Digital Art',
              description: 'Digital painting and graphic design using modern software',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Divya Mehta',
              level: 'Basic computer skills required',
              show: true
            }
          ],
          achievements: [
            'National Art Competition - 3 Gold Medals',
            'Annual Art Exhibition - 200+ artworks displayed',
            'Student artwork featured in local galleries',
            'Scholarships to art institutes'
          ],
          show: true
        },
        'performing-arts': {
          title: 'Performing Arts Program',
          description: 'Developing talent in music, dance, drama, and theater',
          activities: [
            {
              name: 'Western Music',
              description: 'Vocal training and instrument lessons (piano, guitar, violin)',
              schedule: 'Mon, Wed, Fri - 4:00 PM - 6:00 PM',
              instructor: 'Mr. Karan Mehra',
              level: 'Beginner to Advanced',
              show: true
            },
            {
              name: 'Indian Classical Music',
              description: 'Hindustani and Carnatic vocal and instrumental training',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Ms. Sunita Devi',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Dance',
              description: 'Indian classical, contemporary, and western dance forms',
              schedule: 'Mon - Fri, 4:30 PM - 6:30 PM',
              instructor: 'Ms. Priya Sharma',
              level: 'Various levels available',
              show: true
            },
            {
              name: 'Drama & Theater',
              description: 'Acting, stagecraft, and production skills',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Rajiv Kapoor',
              level: 'All levels welcome',
              show: true
            }
          ],
          achievements: [
            'National Youth Theater Festival - Best Production',
            'Inter-School Music Competition - 5 First Prizes',
            'Annual Cultural Night - 500+ audience',
            'Broadway Workshop collaboration'
          ],
          show: true
        },
        'literary-arts': {
          title: 'Literary Arts Program',
          description: 'Fostering creativity in writing, poetry, and literary expression',
          activities: [
            {
              name: 'Creative Writing',
              description: 'Fiction, non-fiction, and poetry writing workshops',
              schedule: 'Mon & Wed, 4:00 PM - 5:30 PM',
              instructor: 'Dr. Meera Desai',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Debate & Public Speaking',
              description: 'Rhetoric, argumentation, and presentation skills',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Rohan Malhotra',
              level: 'Competitive team selection',
              show: true
            },
            {
              name: 'Journalism',
              description: 'School newspaper and digital media publishing',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Neha Gupta',
              level: 'Application required',
              show: true
            }
          ],
          achievements: [
            'National Debating Championship - Winners',
            'Student poetry published in literary magazines',
            'School newspaper award for excellence',
            'Creative writing scholarships'
          ],
          show: true
        },
        'media-arts': {
          title: 'Media Arts Program',
          description: 'Exploring digital creativity through photography, film, and design',
          activities: [
            {
              name: 'Photography',
              description: 'Digital and film photography techniques and editing',
              schedule: 'Mon & Wed, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Alok Singh',
              level: 'Camera required',
              show: true
            },
            {
              name: 'Videography & Film',
              description: 'Short film production, editing, and storytelling',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Ms. Sneha Reddy',
              level: 'Intermediate to Advanced',
              show: true
            },
            {
              name: 'Graphic Design',
              description: 'Digital design, branding, and visual communication',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Mr. Vikram Joshi',
              level: 'Basic computer skills required',
              show: true
            }
          ],
          achievements: [
            'Student Film Festival - Best Documentary',
            'Photography exhibitions in city galleries',
            'Graphic design commissions for local businesses',
            'Media arts scholarships'
          ],
          show: true
        }
      }
    },
    facilities: {
      show: true,
      title: "Arts Facilities",
      items: [
        {
          name: 'Art Studio',
          description: 'Fully equipped studio with natural lighting and various media supplies',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2158&q=80',
          features: ['Natural lighting', 'Pottery wheels', 'Printing press', 'Drying racks'],
          show: true
        },
        {
          name: 'Music Rooms',
          description: 'Soundproof practice rooms with various instruments and recording equipment',
          image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          features: ['Grand piano', 'Recording equipment', 'Practice rooms', 'Instrument storage'],
          show: true
        },
        {
          name: 'Theater Auditorium',
          description: '300-seat professional theater with stage lighting and sound systems',
          image: 'https://images.unsplash.com/photo-1542327897-d73d4ec2f6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
          features: ['Professional lighting', 'Sound system', 'Green room', 'Costume storage'],
          show: true
        },
        {
          name: 'Media Lab',
          description: 'Computer lab with professional software for digital arts and media production',
          image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=2086&q=80',
          features: ['iMac workstations', 'Adobe Creative Suite', 'Recording booth', 'Editing stations'],
          show: true
        }
      ]
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Events",
      registerButton: { label: "Register", link: "#", show: true },
      items: [
        {
          date: '2024-04-20',
          title: 'Annual Art Exhibition',
          time: '10:00 AM - 4:00 PM',
          venue: 'School Art Gallery',
          description: 'Showcasing student artwork from all visual arts programs',
          category: 'visual-arts',
          show: true
        },
        {
          date: '2024-05-05',
          title: 'Spring Music Concert',
          time: '6:00 PM - 8:00 PM',
          venue: 'School Auditorium',
          description: 'Performance by music students featuring various genres',
          category: 'performing-arts',
          show: true
        },
        {
          date: '2024-05-15',
          title: 'Drama Production: "The Tempest"',
          time: '7:00 PM - 9:00 PM',
          venue: 'Main Auditorium',
          description: 'Shakespearean play performed by drama students',
          category: 'performing-arts',
          show: true
        },
        {
          date: '2024-05-25',
          title: 'Poetry Slam Competition',
          time: '4:00 PM - 6:00 PM',
          venue: 'Library Amphitheater',
          description: 'Inter-school poetry performance competition',
          category: 'literary-arts',
          show: true
        },
        {
          date: '2024-06-05',
          title: 'Student Film Festival',
          time: '5:00 PM - 8:00 PM',
          venue: 'Media Center',
          description: 'Screening of student-produced short films and documentaries',
          category: 'media-arts',
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Arts Achievements",
      items: [
        {
          year: '2023',
          items: [
            'National Art Competition - 5 Gold Medals',
            'All-India Music Festival - Best Choir Award',
            'Youth Theater Festival - Best Original Script',
            'National Debating Championship - Runners-up'
          ],
          show: true
        },
        {
          year: '2022',
          items: [
            'Student film selected for International Children\'s Film Festival',
            'Art students received scholarships to prestigious art schools',
            'Dance team won regional classical dance competition',
            'School newspaper awarded "Best Layout Design"'
          ],
          show: true
        },
        {
          year: '2021',
          items: [
            'Music students performed with Symphony Orchestra',
            'Art exhibition featured in city art gallery',
            'Drama production invited to national theater festival',
            'Creative writing published in national literary magazine'
          ],
          show: true
        }
      ]
    },
    faculty: {
      show: true,
      title: "Arts Faculty",
      items: [
        {
          name: 'Ms. Ananya Roy',
          role: 'Visual Arts Director',
          qualification: 'MFA in Painting, College of Art, Delhi',
          specialty: 'Oil Painting, Mixed Media',
          experience: '15 years',
          show: true
        },
        {
          name: 'Mr. Karan Mehra',
          role: 'Music Director',
          qualification: 'Sangeet Visharad, Trinity College Certified',
          specialty: 'Western Classical, Piano',
          experience: '12 years',
          show: true
        },
        {
          name: 'Ms. Priya Sharma',
          role: 'Dance Instructor',
          qualification: 'Kathak Visharad, Contemporary Dance Certification',
          specialty: 'Kathak, Contemporary Fusion',
          experience: '10 years',
          show: true
        },
        {
          name: 'Dr. Meera Desai',
          role: 'Literary Arts Coordinator',
          qualification: 'Ph.D. in English Literature',
          specialty: 'Creative Writing, Poetry',
          experience: '18 years',
          show: true
        }
      ]
    },
    gallery: {
      show: true,
      title: "Student Gallery",
      items: [
        { image: 'https://via.placeholder.com/300?text=Art+1', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+2', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+3', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+4', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+5', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+6', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+7', show: true },
        { image: 'https://via.placeholder.com/300?text=Art+8', show: true }
      ],
      fullGalleryButton: { label: "View Full Gallery", link: "#", show: true }
    },
    cta: {
      show: true,
      title: "Join Our Creative Community",
      description: "Discover your artistic potential and be part of our vibrant arts community. Whether you're a beginner or advanced artist, we have programs to nurture your talent.",
      buttons: [
        { label: "Apply for Arts Program", link: "#", show: true },
        { label: "Schedule Audition", link: "#", show: true }
      ]
    },
    contact: {
      show: true,
      title: "Arts Department Contact",
      items: [
        {
          icon: "Phone",
          label: "Phone",
          value: "011-2336-3462 (Ext. 330)",
          show: true
        },
        {
          icon: "Mail",
          label: "Email",
          value: "arts@stcolumbas.edu.in",
          show: true
        },
        {
          icon: "Clock",
          label: "Office Hours",
          value: "Mon-Fri: 9:00 AM - 5:00 PM",
          show: true
        }
      ]
    },
    layout: {
      showHero: true,
      showCategories: true,
      showPrograms: true,
      showFacilities: true,
      showUpcomingEvents: true,
      showAchievements: true,
      showFaculty: true,
      showGallery: true,
      showCta: true,
      showContact: true
    }
  };

  // Icon mapping
  const iconMap = {
    Palette, Music, Camera, Video, Users, Calendar, MapPin, Clock, Award, Star, ChevronDown, ChevronRight,
    Play, Download, ExternalLink, Heart, BookOpen, Theater, Brush, Mic, Phone, Mail, Piano,
    ArrowRight, Trophy, GraduationCap, Building, Globe, Lightbulb
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    categories: 'showCategories',
    programs: 'showPrograms',
    facilities: 'showFacilities',
    upcomingEvents: 'showUpcomingEvents',
    achievements: 'showAchievements',
    faculty: 'showFaculty',
    gallery: 'showGallery',
    cta: 'showCta',
    contact: 'showContact'
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
        const res = await apiRequest('save_data/get_all_arts_data', {});
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
            console.warn('Decryption failed for arts page:', deErr);
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
    const layoutKey = layoutMap[section];
    let sectionData = { 
      showSection: data.layout[layoutKey],
      ...data[section]
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle changes
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
      currentObj[nestedKey] = field === 'show' ? value : { ...currentObj[nestedKey], [field]: value };
      updated[objKey] = currentObj;
      return updated;
    });
  };

  const handleProgramChange = (programId, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.items) updated.items = {};
      if (!updated.items[programId]) updated.items[programId] = {};
      updated.items[programId] = { ...updated.items[programId], [field]: value };
      return updated;
    });
  };

  const handleProgramArrayChange = (programId, arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.items) updated.items = {};
      if (!updated.items[programId]) updated.items[programId] = {};
      if (!updated.items[programId][arrayKey]) updated.items[programId][arrayKey] = [];
      updated.items[programId][arrayKey][index] = { ...updated.items[programId][arrayKey][index], [field]: value };
      return updated;
    });
  };

  const handleProgramListChange = (programId, arrayKey, index, listField, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.items) updated.items = {};
      if (!updated.items[programId]) updated.items[programId] = {};
      if (!updated.items[programId][arrayKey]) updated.items[programId][arrayKey] = [];
      updated.items[programId][arrayKey][index][listField] = value;
      return updated;
    });
  };

  const handleImageChange = (field, url, arrayKey = null, index = null, programId = null) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (programId && arrayKey && index !== null) {
        if (!updated.items) updated.items = {};
        if (!updated.items[programId]) updated.items[programId] = {};
        if (!updated.items[programId][arrayKey]) updated.items[programId][arrayKey] = [];
        updated.items[programId][arrayKey][index][field] = url;
      } else if (arrayKey && index !== null) {
        if (!updated[arrayKey]) updated[arrayKey] = [];
        updated[arrayKey][index][field] = url;
      } else {
        updated[field] = url;
      }
      return updated;
    });
  };

  // Toggle section
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Section visibility mapping and helpers
  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showCategories', label: 'Categories' },
    { key: 'showPrograms', label: 'Programs' },
    { key: 'showFacilities', label: 'Facilities' },
    { key: 'showUpcomingEvents', label: 'Upcoming Events' },
    { key: 'showAchievements', label: 'Achievements' },
    { key: 'showFaculty', label: 'Faculty' },
    { key: 'showGallery', label: 'Gallery' },
    { key: 'showCta', label: 'CTA' },
    { key: 'showContact', label: 'Contact' }
  ];

  const openSectionVisibilityModal = () => {
    const layout = data?.layout || {};
    const initial = {};
    sectionDisplay.forEach(s => { initial[s.key] = !!layout[s.key]; });
    setSectionVisibility(initial);
    setSectionVisibilityModal(true);
  };

  const toggleSectionVisibility = (key) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [key]: !prev[key] };
      // update live data layout so changes take effect immediately
      setData(curr => ({ ...curr, layout: { ...curr.layout, [key]: next[key] } }));
      return next;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const updatedData = { ...data, layout: { ...data.layout, ...sectionVisibility } };
      const payload = { ...updatedData, lastUpdated: new Date().toISOString(), updatedBy: 'admin', version: '1.0' };
      try {
        const encrypted = await encryptObject(payload);
        const res = await apiRequest('save_data/save_arts_data', { payload: encrypted });
        if (res?.status === 200) {
          setData(updatedData);
        } else {
          console.error('Save failed:', res);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
    setSectionVisibilityModal(false);
  };

  // Save
  const saveChanges = async () => {
    try {
      const layoutKey = layoutMap[editSection];
      let updatedData = { ...data };
      if (layoutKey && 'showSection' in editData) {
        updatedData.layout[layoutKey] = editData.showSection;
      }
      const { showSection, ...sectionUpdates } = editData;
      updatedData[editSection] = { ...data[editSection], ...sectionUpdates };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_arts_data', { payload: encrypted });
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
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredPrograms = data.programs?.items ? 
    Object.fromEntries(
      Object.entries(data.programs.items).filter(([key, program]) => program.show !== false)
    ) : {};
  const filteredFacilities = data.facilities?.items?.filter(facility => facility.show !== false) || [];
  const filteredEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredFaculty = data.faculty?.items?.filter(teacher => teacher.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredContactItems = data.contact?.items?.filter(item => item.show !== false) || [];
  const filteredGalleryItems = data.gallery?.items?.filter(item => item.show !== false) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading arts data...</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button onClick={cancelChanges} className="p-2 text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
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
                  <div>
                    <label className="block text-sm font-medium">Background Image</label>
                    <FileUpload currentUrl={editData.backgroundImage || ''} onUploadSuccess={(url) => handleImageChange('backgroundImage', url)} label="Background Image" />
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.backgroundImageShow !== false} onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)} />
                      <span>Show Background Image</span>
                    </label>
                  </div>
                 
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Value</label>
                          <input type="text" value={stat.value || ''} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input type="text" value={stat.label || ''} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={stat.show !== false} onChange={(e) => handleArrayChange('stats', index, 'show', e.target.checked)} />
                            <span>Show Stat</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'categories' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Categories</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">ID</label>
                          <input type="text" value={item.id || ''} onChange={(e) => handleArrayChange('items', index, 'id', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={item.name || ''} onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Icon</option>
                            {Object.keys(iconMap).map(key => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'programs' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Programs</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Offerings Title</label>
                    <input type="text" value={editData.offeringsTitle || ''} onChange={(e) => handleObjectChange('offeringsTitle', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Achievements Title</label>
                    <input type="text" value={editData.achievementsTitle || ''} onChange={(e) => handleObjectChange('achievementsTitle', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Join Button</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.joinButton?.show !== false} onChange={(e) => handleObjectNestedChange('joinButton', 'show', e.target.checked)} />
                        <span>Show Button</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.joinButton?.label || ''} onChange={(e) => handleObjectNestedChange('joinButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.joinButton?.link || ''} onChange={(e) => handleObjectNestedChange('joinButton', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., # or /apply" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Programs</h3>
                  {Object.keys(editData.items || {}).map(programId => (
                    <div key={programId} className="mb-8 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Program: {programId}</h4>
                      <div className="space-y-2 mb-4">
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input type="text" value={editData.items[programId]?.title || ''} onChange={(e) => handleProgramChange(programId, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={editData.items[programId]?.description || ''} onChange={(e) => handleProgramChange(programId, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={editData.items[programId]?.show !== false} onChange={(e) => handleProgramChange(programId, 'show', e.target.checked)} />
                            <span>Show Program</span>
                          </label>
                        </div>
                      </div>
                      <h5 className="text-sm font-medium mb-2">Activities</h5>
                      {(editData.items[programId]?.activities || []).map((activity, index) => (
                        <div key={index} className="mb-4 p-3 border rounded bg-white">
                          <div className="space-y-2">
                            <div>
                              <label className="block text-sm font-medium">Name</label>
                              <input type="text" value={activity.name || ''} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Description</label>
                              <textarea value={activity.description || ''} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Schedule</label>
                              <input type="text" value={activity.schedule || ''} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'schedule', e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Instructor</label>
                              <input type="text" value={activity.instructor || ''} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'instructor', e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Level</label>
                              <input type="text" value={activity.level || ''} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'level', e.target.value)} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                              <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={activity.show !== false} onChange={(e) => handleProgramArrayChange(programId, 'activities', index, 'show', e.target.checked)} />
                                <span>Show Activity</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <h5 className="text-sm font-medium mb-2">Achievements</h5>
                      {(editData.items[programId]?.achievements || []).map((ach, achIndex) => (
                        <input
                          key={achIndex}
                          type="text"
                          value={ach || ''}
                          onChange={(e) => handleProgramListChange(programId, 'achievements', achIndex, e.target.value)}
                          className="w-full p-1 border rounded mb-1 text-sm"
                          placeholder={`Achievement ${achIndex + 1}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'facilities' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Facilities</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={item.name || ''} onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image</label>
                          <FileUpload currentUrl={item.image || ''} onUploadSuccess={(url) => handleImageChange('image', url, 'items', index)} label="Upload Facility Image" />
                        </div>
                        <h5 className="text-sm font-medium mt-3 mb-1">Features</h5>
                        {(item.features || []).map((feat, featIndex) => (
                          <input
                            key={featIndex}
                            type="text"
                            value={feat || ''}
                            onChange={(e) => handleListChange('items', index, 'features', item.features.map((f, i) => i === featIndex ? e.target.value : f))}
                            className="w-full p-1 border rounded mb-1 text-sm"
                            placeholder={`Feature ${featIndex + 1}`}
                          />
                        ))}
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Register Button</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.registerButton?.show !== false} onChange={(e) => handleObjectNestedChange('registerButton', 'show', e.target.checked)} />
                        <span>Show Button</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.registerButton?.label || ''} onChange={(e) => handleObjectNestedChange('registerButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.registerButton?.link || ''} onChange={(e) => handleObjectNestedChange('registerButton', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., # or /register" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Date</label>
                          <input type="date" value={item.date || ''} onChange={(e) => handleArrayChange('items', index, 'date', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Time</label>
                          <input type="text" value={item.time || ''} onChange={(e) => handleArrayChange('items', index, 'time', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Venue</label>
                          <input type="text" value={item.venue || ''} onChange={(e) => handleArrayChange('items', index, 'venue', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Category</label>
                          <input type="text" value={item.category || ''} onChange={(e) => handleArrayChange('items', index, 'category', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
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
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Achievements</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Year {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Year</label>
                          <input type="text" value={item.year || ''} onChange={(e) => handleArrayChange('items', index, 'year', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <h5 className="text-sm font-medium mt-3 mb-1">Achievements</h5>
                        {(item.items || []).map((ach, achIndex) => (
                          <input
                            key={achIndex}
                            type="text"
                            value={ach || ''}
                            onChange={(e) => handleListChange('items', index, 'items', item.items.map((a, i) => i === achIndex ? e.target.value : a))}
                            className="w-full p-1 border rounded mb-1 text-sm"
                            placeholder={`Achievement ${achIndex + 1}`}
                          />
                        ))}
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'faculty' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Faculty</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={item.name || ''} onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Role</label>
                          <input type="text" value={item.role || ''} onChange={(e) => handleArrayChange('items', index, 'role', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Qualification</label>
                          <input type="text" value={item.qualification || ''} onChange={(e) => handleArrayChange('items', index, 'qualification', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Specialty</label>
                          <input type="text" value={item.specialty || ''} onChange={(e) => handleArrayChange('items', index, 'specialty', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Experience</label>
                          <input type="text" value={item.experience || ''} onChange={(e) => handleArrayChange('items', index, 'experience', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'gallery' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Gallery</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Full Gallery Button</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.fullGalleryButton?.show !== false} onChange={(e) => handleObjectNestedChange('fullGalleryButton', 'show', e.target.checked)} />
                        <span>Show Button</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.fullGalleryButton?.label || ''} onChange={(e) => handleObjectNestedChange('fullGalleryButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.fullGalleryButton?.link || ''} onChange={(e) => handleObjectNestedChange('fullGalleryButton', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., # or /gallery" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium mb-1">Image</label>
                          <FileUpload currentUrl={item.image || ''} onUploadSuccess={(url) => handleImageChange('image', url, 'items', index)} label="Upload Gallery Image" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
                          </label>
                        </div>
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
                          <input type="text" value={button.link || ''} onChange={(e) => handleArrayChange('buttons', index, 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="Button link (e.g., # or /apply)" />
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
              {editSection === 'contact' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Contact</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Icon</option>
                            {Object.keys(iconMap).map(key => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input type="text" value={item.label || ''} onChange={(e) => handleArrayChange('items', index, 'label', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Value</label>
                          <input type="text" value={item.value || ''} onChange={(e) => handleArrayChange('items', index, 'value', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show Item</span>
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
      {editMode && sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[70vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">Manage Section Visibility</h2>
              </div>
              <div className="flex items-center space-x-2">
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
                      <span className={`w-3 h-3 rounded-full ${sectionVisibility[section.key] ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(section.key)}
                      className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${sectionVisibility[section.key] ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                      <span className="block w-4 h-4 bg-white rounded-full shadow" />
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

      {/* Hero Section */}
      {data.layout?.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.backgroundImageShow !== false && (
            <img
              src={data.hero.backgroundImage || 'https://via.placeholder.com/1920x400'}
              alt={data.hero.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
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
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Floating FAB: Manage Section Visibility */}
      {editMode && (
        <button onClick={openSectionVisibilityModal} className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-shadow z-40">
          <Edit className="h-5 w-5" />
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories Navigation */}
        {data.layout?.showCategories && data.categories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.categories.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = iconMap[category.icon] || Palette;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      if (category.id !== 'all') setActiveProgram(category.id);
                    }}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('categories')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Program Details */}
        {data.layout?.showPrograms && data.programs?.show && filteredPrograms[activeProgram] && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{filteredPrograms[activeProgram].title}</h2>
            <p className="text-gray-600 mb-8">{filteredPrograms[activeProgram].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Activities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.programs.offeringsTitle}</h3>
                <div className="space-y-4">
                  {filteredPrograms[activeProgram].activities
                    ?.filter(activity => activity.show !== false)
                    .map((activity, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{activity.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            {activity.schedule}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Users className="h-4 w-4 mr-2" />
                            Instructor: {activity.instructor}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Star className="h-4 w-4 mr-2" />
                            Level: {activity.level}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.programs.achievementsTitle}</h3>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    {filteredPrograms[activeProgram].achievements?.map((achievement, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  {data.programs.joinButton?.show !== false && (
                    <a href={data.programs.joinButton?.link || '#'} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block">
                      {data.programs.joinButton?.label || 'Join This Program'}
                    </a>
                  )}
                </div>
              </div>
            </div>
            {editMode && <button onClick={() => openEditModal('programs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Facilities */}
        {data.layout?.showFacilities && data.facilities?.show && filteredFacilities.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.facilities.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map((facility, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={facility.image || 'https://via.placeholder.com/300'}
                      alt={facility.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{facility.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.features?.map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('facilities')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Upcoming Events */}
        {data.layout?.showUpcomingEvents && data.upcomingEvents?.show && filteredEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents.title}</h2>
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                          <span className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long' 
                            })}
                          </span>
                          <span className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.venue}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                      </div>
                    </div>
                    {data.upcomingEvents.registerButton?.show !== false && (
                      <a href={data.upcomingEvents.registerButton?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                        {data.upcomingEvents.registerButton?.label || 'Register'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('upcomingEvents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Achievements */}
        {data.layout?.showAchievements && data.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.achievements.title}</h2>
            <div className="space-y-6">
              {filteredAchievements.map((year, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{year.year}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {year.items?.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Award className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('achievements')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Faculty */}
        {data.layout?.showFaculty && data.faculty?.show && filteredFaculty.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.faculty.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFaculty.map((teacher, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                    <p className="text-green-600 font-medium">{teacher.role}</p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>{teacher.qualification}</p>
                      <p>Specialty: {teacher.specialty}</p>
                      <p>Experience: {teacher.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('faculty')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Gallery Preview */}
        {data.layout?.showGallery && data.gallery?.show && filteredGalleryItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.gallery.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredGalleryItems.map((item, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img src={item.image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            {data.gallery.fullGalleryButton?.show !== false && (
              <a href={data.gallery.fullGalleryButton?.link || '#'} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium inline-block">
                {data.gallery.fullGalleryButton?.label || 'View Full Gallery'}
              </a>
            )}
            {editMode && <button onClick={() => openEditModal('gallery')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
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

        {/* Contact Information */}
        {data.layout?.showContact && data.contact?.show && filteredContactItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{data.contact.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredContactItems.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Phone;
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('contact')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtsCulturePage;