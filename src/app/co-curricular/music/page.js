"use client";
import React, { useState, useEffect } from 'react';
import { 
  Music,
  Users, 
  Target,
  Clock,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download,
  Book,
  Heart,
  Brain,
  Trophy,
  Mic,
  Headphones,
  Piano,
  Guitar,
  Drum,
  Music2,
  FileText,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  Play,
  ExternalLink,
  ArrowRight,
  Lightbulb,
  Building,
  GraduationCap,
  Edit,
  X,
  Settings,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import Image from 'next/image';
import { encryptObject, decryptObject } from '@/utils/encryption';

const MusicPage = () => {
  const [activeCategory, setActiveCategory] = useState('programs');
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

  // Default data structure for Music
  const defaultData = {
    hero: {
      show: true,
      title: "Music Program",
      subtitle: "Cultivating musical excellence, creativity, and lifelong appreciation for the arts",
      stats: [
        { value: "12+", label: "Music Ensembles", show: true },
        { value: "50+", label: "Annual Performances", show: true },
        { value: "25+", label: "State Awards", show: true }
      ],
      backgroundImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true,
      ctaButton: {
        label: "View Music Handbook",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Study Music?",
      description: "Music education provides countless benefits that extend far beyond the rehearsal room",
      items: [
        {
          icon: "Brain",
          title: "Cognitive Development",
          description: "Enhancing memory, pattern recognition, and mathematical abilities through musical training.",
          show: true
        },
        {
          icon: "Heart",
          title: "Emotional Expression",
          description: "Providing creative outlets for emotional expression and building confidence.",
          show: true
        },
        {
          icon: "Users",
          title: "Collaborative Skills",
          description: "Developing teamwork and communication through ensemble performances.",
          show: true
        },
        {
          icon: "Trophy",
          title: "Discipline & Achievement",
          description: "Cultivating perseverance, goal-setting, and pride in accomplishments.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Music Program Overview",
      description: "Explore our comprehensive music curriculum and offerings",
      items: [
        { id: 'programs', name: 'Music Programs', icon: "Music", description: 'Comprehensive offerings', show: true },
        { id: 'ensembles', name: 'Ensembles', icon: "Users", description: 'Performance groups', show: true },
        { id: 'instruments', name: 'Instruments', icon: "Guitar", description: 'What we teach', show: true },
        { id: 'events', name: 'Events', icon: "Calendar", description: 'Performances & competitions', show: true }
      ]
    },
    programs: {
      show: true,
      labels: {
        programs: {
          grades: "Grades",
          description: "Description"
        },
        ensembles: {
          level: "Level",
          director: "Director",
          meeting: "Meeting"
        },
        instruments: {
          family: "Family",
          instruments: "Instruments"
        },
        events: {
          date: "Date",
          time: "Time",
          location: "Location"
        }
      },
      items: {
        'programs': [
          { 
            name: "Elementary Music", 
            icon: "Music", 
            grades: "K-5", 
            description: "Foundational music appreciation and basic instrument exposure",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Middle School Band", 
            icon: "Drum", 
            grades: "6-8", 
            description: "Concert band, jazz band, and marching band fundamentals",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "High School Orchestra", 
            icon: "Music", 
            grades: "9-12", 
            description: "Symphonic orchestra and chamber music ensembles",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Choral Program", 
            icon: "Mic", 
            grades: "4-12", 
            description: "Choirs for all experience levels from beginner to advanced",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Music Theory", 
            icon: "Book", 
            grades: "9-12", 
            description: "AP Music Theory and composition classes",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Digital Music Production", 
            icon: "Headphones", 
            grades: "9-12", 
            description: "Modern music technology and recording arts",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          }
        ],
        'ensembles': [
          { 
            name: "Concert Band", 
            icon: "Drum", 
            level: "Intermediate", 
            director: "Mr. Johnson", 
            meeting: "Mon/Wed 3:30-5:00 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Jazz Ensemble", 
            icon: "Music", 
            level: "Advanced", 
            director: "Ms. Davis", 
            meeting: "Tues/Thurs 3:30-5:30 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Symphonic Orchestra", 
            icon: "Music", 
            level: "Advanced", 
            director: "Mr. Chen", 
            meeting: "Mon/Tues/Thurs 3:30-5:30 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Concert Choir", 
            icon: "Mic", 
            level: "All Levels", 
            director: "Ms. Williams", 
            meeting: "Mon/Wed/Fri 3:30-5:00 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Chamber Singers", 
            icon: "Mic", 
            level: "Advanced", 
            director: "Ms. Williams", 
            meeting: "Tues/Thurs 4:00-6:00 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Percussion Ensemble", 
            icon: "Drum", 
            level: "Intermediate", 
            director: "Mr. Johnson", 
            meeting: "Fri 3:30-5:30 PM",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          }
        ],
        'instruments': [
          { 
            name: "Strings", 
            icon: "Music", 
            family: "Orchestral", 
            instruments: "Violin, Viola, Cello, Bass",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Woodwinds", 
            icon: "Music", 
            family: "Band", 
            instruments: "Flute, Clarinet, Saxophone, Oboe, Bassoon",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Brass", 
            icon: "Music", 
            family: "Band", 
            instruments: "Trumpet, Trombone, French Horn, Tuba, Euphonium",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Percussion", 
            icon: "Drum", 
            family: "Band/Orchestra", 
            instruments: "Snare Drum, Timpani, Xylophone, Auxiliary",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Piano", 
            icon: "Piano", 
            family: "All", 
            instruments: "Classical, Jazz, Contemporary",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Guitar", 
            icon: "Guitar", 
            family: "Contemporary", 
            instruments: "Acoustic, Electric, Bass Guitar",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          }
        ],
        'events': [
          { 
            name: "Winter Concert", 
            icon: "Calendar", 
            date: "Dec 15, 2024", 
            time: "7:00 PM", 
            location: "School Auditorium",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Solo & Ensemble Festival", 
            icon: "Trophy", 
            date: "Feb 22, 2024", 
            time: "9:00 AM", 
            location: "Music Wing",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Spring Musical", 
            icon: "Calendar", 
            date: "Mar 20-23, 2024", 
            time: "7:00 PM", 
            location: "Main Theater",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Jazz Night", 
            icon: "Music2", 
            date: "Apr 12, 2024", 
            time: "6:30 PM", 
            location: "Black Box Theater",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "State Music Competition", 
            icon: "Award", 
            date: "May 5-6, 2024", 
            time: "All Day", 
            location: "State University",
            learnMore: {
              show: true,
              text: "Learn more",
              link: "#"
            },
            show: true
          },
          { 
            name: "Pops Concert", 
            icon: "Star", 
            date: "Jun 1, 2024", 
            time: "6:00 PM", 
            location: "Football Field",
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
      title: "Upcoming Music Events",
      description: "Mark your calendars for these exciting performances and activities",
      labels: {
        time: "Time",
        location: "Location",
        viewDetails: "View Details"
      },
      items: [
        {
          title: "Fall Choral Concert",
          date: "2024-10-25",
          time: "7:00 PM - 9:00 PM",
          ensemble: "Concert Choir & Chamber Singers",
          location: "School Auditorium",
          description: "An evening of choral performances by our talented singers",
          viewDetails: {
            show: true,
            text: "View Details",
            link: "#"
          },
          show: true
        },
        {
          title: "Band Olympics",
          date: "2024-11-08",
          time: "4:00 PM - 7:00 PM",
          ensemble: "All Band Students",
          location: "Football Field",
          description: "A fun-filled competition showcasing band skills",
          viewDetails: {
            show: true,
            text: "View Details",
            link: "#"
          },
          show: true
        },
        {
          title: "Middle School Music Night",
          date: "2024-11-15",
          time: "6:30 PM - 8:30 PM",
          ensemble: "Middle School Bands & Choirs",
          location: "Cafeteria",
          description: "Performances by our middle school music ensembles",
          viewDetails: {
            show: true,
            text: "View Details",
            link: "#"
          },
          show: true
        },
        {
          title: "Orchestra Hall Field Trip",
          date: "2024-12-05",
          time: "9:00 AM - 4:00 PM",
          ensemble: "Symphonic Orchestra",
          location: "Downtown Concert Hall",
          description: "A special trip to experience a professional orchestra",
          viewDetails: {
            show: true,
            text: "View Details",
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
    achievements: {
      show: true,
      title: "Recent Achievements",
      description: "Celebrating the accomplishments of our talented student musicians",
      items: [
        {
          year: '2024',
          items: [
            'Concert Band awarded 1st Place in State Competition',
            '12 students selected for All-State Honor Ensembles',
            'Jazz Ensemble received superior ratings at regional festival'
          ],
          show: true
        },
        {
          year: '2023',
          items: [
            'Music Program recognized as Outstanding by State Association',
            'Chamber Singers invited to perform at national conference',
            'Student compositions published in national journal'
          ],
          show: true
        },
        {
          year: '2022',
          items: [
            'Marching Band placed 2nd in State Championships',
            'Orchestra awarded Gold Rating at Heritage Festival',
            'Student won Young Composer Award'
          ],
          show: true
        }
      ]
    },
    faculty: {
      show: true,
      title: "Music Faculty",
      labels: {
        role: "Role",
        qualification: "Qualification",
        specialty: "Specialty",
        experience: "Experience"
      },
      items: [
        {
          name: 'Mr. Karan Mehra',
          role: 'Music Director',
          qualification: 'Sangeet Visharad, Trinity College Certified',
          specialty: 'Western Classical, Piano',
          experience: '12 years',
          show: true
        },
        {
          name: 'Ms. Sunita Devi',
          role: 'Indian Classical Music Instructor',
          qualification: 'M.A. in Indian Classical Music',
          specialty: 'Hindustani Vocal, Sitar',
          experience: '15 years',
          show: true
        },
        {
          name: 'Ms. Priya Sharma',
          role: 'Choral Director',
          qualification: 'M.M. in Choral Conducting',
          specialty: 'Choral Arranging, Vocal Pedagogy',
          experience: '10 years',
          show: true
        },
        {
          name: 'Mr. Ravi Verma',
          role: 'Instrumental Music Coordinator',
          qualification: 'B.M. in Music Education',
          specialty: 'Brass Instruments, Marching Band',
          experience: '8 years',
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Music Resources",
      description: "Download important documents, practice materials, and performance schedules",
      items: [
        {
          title: "Music Program Handbook",
          description: "Policies, expectations, and calendar for all music students",
          format: "PDF",
          size: "1.8 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Practice Schedule Templates",
          description: "Weekly practice logs and goal-setting worksheets",
          format: "PDF",
          size: "0.7 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Instrument Rental Guide",
          description: "Information on acquiring and maintaining instruments",
          format: "PDF",
          size: "1.2 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Upcoming Performances Calendar",
          description: "Complete schedule of concerts and events for 2024-25",
          format: "PDF",
          size: "0.9 MB",
          icon: "Calendar",
          link: "#",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Join Our Music Program",
      description: "Whether you're a beginner or an experienced musician, there's a place for you in our music family",
      buttons: [
        { label: "Register for Music Classes", link: "#", show: true },
        { label: "Contact Music Director", link: "#", show: true }
      ]
    },
    contact: {
      show: true,
      title: "Music Department Contact",
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
          value: "music@stcolumbas.edu.in",
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
      showPrograms: true,
      showUpcomingEvents: true,
      showAchievements: true,
      showFaculty: true,
      showResources: true,
      showCta: true,
      showContact: true
    }
  };

  // Icon mapping
  const iconMap = {
    Music, Users, Target, Clock, Calendar, ChevronDown, ChevronRight,
    Download, Book, Heart, Brain, Trophy, Mic, Headphones, Piano,
    Guitar, Drum, Music2, FileText, Star, Award, MapPin, Phone, Mail,
    Play, ExternalLink, ArrowRight, Lightbulb, Building, GraduationCap
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    categories: 'showCategories',
    programs: 'showPrograms',
    upcomingEvents: 'showUpcomingEvents',
    achievements: 'showAchievements',
    faculty: 'showFaculty',
    resources: 'showResources',
    cta: 'showCta',
    contact: 'showContact'
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
        const res = await apiRequest('save_data/get_all_music_data', {});
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
            console.warn('Decryption failed for music page:', deErr);
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
        showPrograms: data.layout.showPrograms,
        categories: data.categories,
        programs: data.programs,
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
      currentObj[nestedKey] = field === 'show' ? value : { ...currentObj[nestedKey], [nestedKey]: value };
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
        updatedData.layout.showPrograms = editData.showPrograms;
        updatedData.categories = editData.categories;
        updatedData.programs = editData.programs;
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
        const save_data = await apiRequest('save_data/save_music_data', { payload: encrypted });
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
  const filteredPrograms = data.programs?.items ? 
    Object.fromEntries(
      Object.entries(data.programs.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredFaculty = data.faculty?.items?.filter(teacher => teacher.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredContactItems = data.contact?.items?.filter(item => item.show !== false) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading music data...</p>
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

  const handleOverviewProgramsLabelsChange = (category, labelKey, value) => {
    setEditData(prev => {
      const newLabels = { ...prev.programs.labels };
      if (!newLabels[category]) newLabels[category] = {};
      newLabels[category][labelKey] = value;
      return { ...prev, programs: { ...prev.programs, labels: newLabels } };
    });
  };

  const handleOverviewProgramsArrayChange = (programId, index, field, value) => {
    setEditData(prev => {
      const newItemsObj = { ...prev.programs.items };
      if (!newItemsObj[programId]) newItemsObj[programId] = [];
      const newArray = [...newItemsObj[programId]];
      newArray[index] = { ...newArray[index], [field]: value };
      newItemsObj[programId] = newArray;
      return { ...prev, programs: { ...prev.programs, items: newItemsObj } };
    });
  };

  const handleOverviewProgramsNestedChange = (programId, index, nestedKey, field, value) => {
    setEditData(prev => {
      const newItemsObj = { ...prev.programs.items };
      if (!newItemsObj[programId]) newItemsObj[programId] = [];
      const newArray = [...newItemsObj[programId]];
      if (!newArray[index][nestedKey]) newArray[index][nestedKey] = {};
      if (field === 'show') {
        newArray[index][nestedKey].show = value;
      } else {
        newArray[index][nestedKey][field] = value;
      }
      newItemsObj[programId] = newArray;
      return { ...prev, programs: { ...prev.programs, items: newItemsObj } };
    });
  };

  const handleOverviewToggleCategories = (value) => {
    setEditData(prev => ({ ...prev, showCategories: value }));
  };

  const handleOverviewTogglePrograms = (value) => {
    setEditData(prev => ({ ...prev, showPrograms: value }));
  };

  // Section visibility mapping for the Music page
  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showBenefits', label: 'Benefits' },
    { key: 'showCategories', label: 'Categories' },
    { key: 'showPrograms', label: 'Programs' },
    { key: 'showUpcomingEvents', label: 'Upcoming Events' },
    { key: 'showAchievements', label: 'Achievements' },
    { key: 'showFaculty', label: 'Faculty' },
    { key: 'showResources', label: 'Resources' },
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
      // immediately update live data so toggles hide/show without saving
      setData(curr => ({
        ...curr,
        layout: { ...curr.layout, [key]: next[key] }
      }));
      return next;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const updatedData = { ...data, layout: { ...data.layout, ...sectionVisibility } };
      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      try {
        const encrypted = await encryptObject(payload);
        const res = await apiRequest('save_data/save_music_data', { payload: encrypted });
        if (res?.status === 200) {
          setData(updatedData);
        } else {
          console.error('Save failed:', res);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    setSectionVisibilityModal(false);
  };

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
              {editSection === 'overview' && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.showCategories || false} onChange={(e) => handleOverviewToggleCategories(e.target.checked)} />
                        <span>Show Categories</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.showPrograms || false} onChange={(e) => handleOverviewTogglePrograms(e.target.checked)} />
                        <span>Show Programs</span>
                      </label>
                    </div>
                  </div>

                  {/* Categories Form */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" value={editData.categories.title || ''} onChange={(e) => handleOverviewCategoriesObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea value={editData.categories.description || ''} onChange={(e) => handleOverviewCategoriesObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                      </div>
                      <h4 className="text-md font-semibold mb-2">Items</h4>
                      {(editData.categories.items || []).map((item, index) => (
                        <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <h5 className="text-md font-semibold mb-2">Item {index + 1}</h5>
                          <div className="space-y-2">
                            <input type="text" value={item.name || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                            <input type="text" value={item.description || ''} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'description', e.target.value)} className="w-full p-2 border rounded" />
                            <label className="flex items-center space-x-2">
                              <input type="checkbox" checked={item.show !== false} onChange={(e) => handleOverviewCategoriesArrayChange(index, 'show', e.target.checked)} />
                              <span>Show Item</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programs Form */}
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Programs</h3>
                    <h4 className="text-md font-semibold mb-2">Labels</h4>
                    <div className="space-y-4">
                      {Object.entries(editData.programs.labels || {}).map(([category, labels]) => (
                        <div key={category} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-semibold mb-2">{category.toUpperCase()}</h5>
                          {Object.entries(labels).map(([labelKey, labelValue]) => (
                            <div key={labelKey}>
                              <label className="block text-sm font-medium">{labelKey}</label>
                              <input type="text" value={labelValue || ''} onChange={(e) => handleOverviewProgramsLabelsChange(category, labelKey, e.target.value)} className="w-full p-2 border rounded mt-1" />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <h4 className="text-md font-semibold mt-4 mb-2">Items</h4>
                    {Object.entries(editData.programs.items || {}).map(([programId, programItems]) => (
                      <div key={programId} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h5 className="text-md font-semibold mb-2">{programId.toUpperCase()}</h5>
                        {(programItems || []).map((item, index) => (
                          <div key={index} className="mb-4 p-3 border rounded">
                            <h6 className="font-medium mb-2">Item {index + 1}</h6>
                            <div className="space-y-2">
                              <input type="text" value={item.name || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                              {programId === 'programs' && (
                                <>
                                  <input type="text" value={item.grades || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'grades', e.target.value)} className="w-full p-2 border rounded" />
                                  <textarea value={item.description || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                                </>
                              )}
                              {programId === 'ensembles' && (
                                <>
                                  <input type="text" value={item.level || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'level', e.target.value)} className="w-full p-2 border rounded" />
                                  <input type="text" value={item.director || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'director', e.target.value)} className="w-full p-2 border rounded" />
                                  <input type="text" value={item.meeting || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'meeting', e.target.value)} className="w-full p-2 border rounded" />
                                </>
                              )}
                              {programId === 'instruments' && (
                                <>
                                  <input type="text" value={item.family || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'family', e.target.value)} className="w-full p-2 border rounded" />
                                  <input type="text" value={item.instruments || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'instruments', e.target.value)} className="w-full p-2 border rounded" />
                                </>
                              )}
                              {programId === 'events' && (
                                <>
                                  <input type="text" value={item.date || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'date', e.target.value)} className="w-full p-2 border rounded" />
                                  <input type="text" value={item.time || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'time', e.target.value)} className="w-full p-2 border rounded" />
                                  <input type="text" value={item.location || ''} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'location', e.target.value)} className="w-full p-2 border rounded" />
                                </>
                              )}
                              <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={item.show !== false} onChange={(e) => handleOverviewProgramsArrayChange(programId, index, 'show', e.target.checked)} />
                                <span>Show Item</span>
                              </label>
                              {/* Learn More per item */}
                              <div className="space-y-2 mt-3 p-2 bg-blue-50 rounded">
                                <h6 className="font-medium text-blue-800">Learn More</h6>
                                <label className="flex items-center space-x-2">
                                  <input type="checkbox" checked={item.learnMore?.show !== false} onChange={(e) => handleOverviewProgramsNestedChange(programId, index, 'learnMore', 'show', e.target.checked)} />
                                  <span>Show Learn More</span>
                                </label>
                                <input type="text" value={item.learnMore?.text || ''} onChange={(e) => handleOverviewProgramsNestedChange(programId, index, 'learnMore', 'text', e.target.value)} className="w-full p-2 border rounded" placeholder="Text" />
                                <input type="text" value={item.learnMore?.link || ''} onChange={(e) => handleOverviewProgramsNestedChange(programId, index, 'learnMore', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="Link" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  
                </div>
              )}
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
                    <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium">Background Image</label>
                    <FileUpload currentUrl={editData.backgroundImage || ''} onUploadSuccess={(url) => handleImageChange('backgroundImage', url)} label="Upload Hero Background" />
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.backgroundImageShow !== false} onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)} />
                      <span>Show Background Image</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={stat.value || ''} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} className="w-full p-2 border rounded" placeholder="Value" />
                        <input type="text" value={stat.label || ''} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} className="w-full p-2 border rounded" placeholder="Label" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={stat.show !== false} onChange={(e) => handleArrayChange('stats', index, 'show', e.target.checked)} />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleObjectNestedChange('ctaButton', 'show', e.target.checked)} />
                        <span>Show Button</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.ctaButton?.label || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.ctaButton?.link || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., #" />
                    </div>
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
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input type="text" value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
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
                    {Object.entries(editData.labels || {}).map(([labelKey]) => (
                      <div key={labelKey}>
                        <label className="block text-sm font-medium">{labelKey}</label>
                        <input type="text" value={editData.labels?.[labelKey] || ''} onChange={(e) => {
                          setEditData(prev => ({ ...prev, labels: { ...prev.labels, [labelKey]: e.target.value } }));
                        }} className="w-full p-2 border rounded" />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="date" value={item.date || ''} onChange={(e) => handleArrayChange('items', index, 'date', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.time || ''} onChange={(e) => handleArrayChange('items', index, 'time', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.ensemble || ''} onChange={(e) => handleArrayChange('items', index, 'ensemble', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.location || ''} onChange={(e) => handleArrayChange('items', index, 'location', e.target.value)} className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Item</span>
                        </label>
                        {/* View Details per item */}
                        <div className="space-y-2 mt-3 p-2 bg-blue-50 rounded">
                          <h6 className="font-medium text-blue-800">View Details</h6>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.viewDetails?.show !== false} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'show', e.target.checked)} />
                            <span>Show View Details</span>
                          </label>
                          <input type="text" value={item.viewDetails?.text || ''} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'text', e.target.value)} className="w-full p-2 border rounded" placeholder="Text" />
                          <input type="text" value={item.viewDetails?.link || ''} onChange={(e) => handleNestedObjectChange('items', index, 'viewDetails', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="Link" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleObjectNestedChange('ctaButton', 'show', e.target.checked)} />
                        <span>Show Button</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Label</label>
                      <input type="text" value={editData.ctaButton?.label || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'label', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Button Link</label>
                      <input type="text" value={editData.ctaButton?.link || ''} onChange={(e) => handleObjectNestedChange('ctaButton', 'link', e.target.value)} className="w-full p-2 border rounded" />
                    </div>
                  </div>
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
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Year {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.year || ''} onChange={(e) => handleArrayChange('items', index, 'year', e.target.value)} className="w-full p-2 border rounded" />
                        <div>
                          <label className="block text-sm font-medium">Achievements (comma-separated)</label>
                          <textarea value={(item.items || []).join(', ')} onChange={(e) => handleListChange('items', index, 'items', e.target.value.split(', '))} className="w-full p-2 border rounded" rows="3" />
                        </div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Year</span>
                        </label>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Labels</h3>
                  <div className="space-y-2">
                    {Object.entries(editData.labels || {}).map(([labelKey]) => (
                      <div key={labelKey}>
                        <label className="block text-sm font-medium">{labelKey}</label>
                        <input type="text" value={editData.labels?.[labelKey] || ''} onChange={(e) => {
                          setEditData(prev => ({ ...prev, labels: { ...prev.labels, [labelKey]: e.target.value } }));
                        }} className="w-full p-2 border rounded" />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Faculty {index + 1}</h4>
                      <div className="space-y-2">
                        <input type="text" value={item.name || ''} onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.role || ''} onChange={(e) => handleArrayChange('items', index, 'role', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.qualification || ''} onChange={(e) => handleArrayChange('items', index, 'qualification', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.specialty || ''} onChange={(e) => handleArrayChange('items', index, 'specialty', e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" value={item.experience || ''} onChange={(e) => handleArrayChange('items', index, 'experience', e.target.value)} className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Faculty</span>
                        </label>
                      </div>
                    </div>
                  ))}
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
                          <input type="text" value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded" />
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
                        <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform ${sectionVisibility[section.key] ? '' : ''}`} />
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
                <button onClick={() => downloadFile(data.hero.ctaButton?.link || '#', 'music-handbook.pdf')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.hero.ctaButton?.label}
                  <Download className="ml-2 h-4 w-4" />
                </button>
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
                const IconComponent = iconMap[benefit.icon] || Brain;
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
                const IconComponent = iconMap[category.icon] || Music;
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

            {/* Content for Selected Category */}
            {data.layout?.showPrograms && data.programs?.show && filteredPrograms[activeCategory] && filteredPrograms[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms[activeCategory].map((item, index) => {
                    const IconComponent = iconMap[item.icon] || Music;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        </div>
                        
                        {activeCategory === 'programs' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.programs?.grades}: {item.grades}</span>
                            </div>
                            <p>{data.programs?.labels?.programs?.description}: {item.description}</p>
                          </div>
                        )}
                        
                        {activeCategory === 'ensembles' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.ensembles?.level}: {item.level}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.ensembles?.director}: {item.director}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.ensembles?.meeting}: {item.meeting}</span>
                            </div>
                          </div>
                        )}
                        
                        {activeCategory === 'instruments' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Music className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.instruments?.family}: {item.family}</span>
                            </div>
                            <p>{data.programs?.labels?.instruments?.instruments}: {item.instruments}</p>
                          </div>
                        )}
                        
                        {activeCategory === 'events' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.events?.date}: {item.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.events?.time}: {item.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-green-500" />
                              <span>{data.programs?.labels?.events?.location}: {item.location}</span>
                            </div>
                          </div>
                        )}
                        
                        {item.learnMore?.show !== false && (
                          <a href={item.learnMore?.link || '#'} className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                            {item.learnMore?.text || 'Learn more'}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {filteredUpcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {event.ensemble}
                      </span>
                    </div>
                    <div className="bg-green-50 text-green-700 text-center p-2 rounded-lg">
                      <div className="font-bold text-sm">{new Date(event.date).getDate()}</div>
                      <div className="text-xs">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{data.upcomingEvents.labels?.time || 'Time'}: {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{data.upcomingEvents.labels?.location || 'Location'}: {event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  {event.viewDetails?.show !== false && (
                    <a href={event.viewDetails?.link || '#'} className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      {event.viewDetails?.text || 'View Details'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  )}
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

        {/* Achievements */}
        {data.layout?.showAchievements && data.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.achievements.title}</h2>
              <p className="text-gray-600">
                {data.achievements.description}
              </p>
            </div>

            <div className="space-y-6">
              {filteredAchievements.map((yearData, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{yearData.year}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {yearData.items?.map((item, idx) => (
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

export default MusicPage;