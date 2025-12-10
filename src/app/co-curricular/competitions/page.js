"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy,
  Users, 
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Heart,
  Brain,
  Lightbulb,
  Award,
  Mic,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  FileText,
  Star,
  MapPin,
  Shield,
  Zap,
  Edit,
  Eye,
  EyeOff,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const CompetitionsPage = ({ competitionsData }) => {
  const [activeCategory, setActiveCategory] = useState('academic');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [openCategories, setOpenCategories] = useState(['academic', 'arts', 'sports', 'tech']);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});
  const role = 'admin'; // Should come from auth context

  // Icon mapping
  const iconMap = {
    Trophy,
    Users,
    Target,
    Clock,
    Calendar,
    ChevronRight,
    Download,
    ExternalLink,
    ArrowRight,
    Book,
    Heart,
    Brain,
    Lightbulb,
    Award,
    Mic,
    Calculator,
    Palette,
    Microscope,
    Globe,
    Code,
    Music,
    FileText,
    Star,
    MapPin,
    Shield,
    Zap
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    upcomingEvents: 'showUpcomingEvents',
    achievements: 'showAchievements',
    resources: 'showResources',
    cta: 'showCta'
  };

  // Default data structure for Competitions
  const defaultData = {
    layout: {
      showHero: true,
      showBenefits: true,
      showCategories: true,
      showCompetitions: true,
      showUpcomingEvents: true,
      showAchievements: true,
      showResources: true,
      showCta: true
    },
    hero: {
      show: true,
      title: "School Competitions",
      subtitle: "Challenge yourself, showcase your talents, and achieve excellence in competitive arenas",
      stats: [
        { value: "50+", label: "Annual Competitions", show: true },
        { value: "100+", label: "Student Participants", show: true },
        { value: "30+", label: "Awards Won", show: true }
      ],
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Competition Handbook",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Participate in Competitions?",
      description: "Competitions provide unique opportunities for growth, recognition, and skill development",
      items: [
        {
          icon: "Trophy",
          title: "Skill Development",
          description: "Enhancing subject knowledge, critical thinking, and problem-solving abilities through competitive challenges.",
          show: true
        },
        {
          icon: "Users",
          title: "Teamwork & Collaboration",
          description: "Learning to work effectively in teams and developing leadership qualities.",
          show: true
        },
        {
          icon: "Brain",
          title: "Intellectual Growth",
          description: "Pushing boundaries of knowledge and creativity beyond standard curriculum.",
          show: true
        },
        {
          icon: "Heart",
          title: "Confidence Building",
          description: "Gaining self-assurance through preparation, performance, and achievement.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Competition Categories",
      description: "Explore our diverse range of competitive opportunities",
      items: [
        { id: 'academic', name: 'Academic Competitions', icon: "Book", description: 'Subject-based challenges', show: true },
        { id: 'arts', name: 'Arts & Creative', icon: "Palette", description: 'Creative expression contests', show: true },
        { id: 'sports', name: 'Sports & Athletics', icon: "Trophy", description: 'Physical competitions', show: true },
        { id: 'tech', name: 'Technology & Innovation', icon: "Code", description: 'STEM challenges', show: true }
      ]
    },
    competitions: {
      show: true,
      labels: {
        level: "Level",
        advisor: "Advisor",
        meeting: "Meeting",
        eligibility: "Eligibility"
      },
      items: {
        academic: [
          { 
            name: "Math Olympiad", 
            icon: "Calculator", 
            level: "National", 
            advisor: "Dr. Mathur", 
            meeting: "Wed 3:30-5:00 PM",
            description: "Advanced mathematical problem solving competition",
            eligibility: "Grades 9-12",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Science Bowl", 
            icon: "Microscope", 
            level: "Regional", 
            advisor: "Ms. Patel", 
            meeting: "Tue 4:00-5:30 PM",
            description: "Quick-response science knowledge competition",
            eligibility: "Grades 6-8",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Debate Tournament", 
            icon: "Mic", 
            level: "State", 
            advisor: "Mr. Kumar", 
            meeting: "Mon/Thu 3:30-5:30 PM",
            description: "Competitive public speaking and argumentation",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Spelling Bee", 
            icon: "Book", 
            level: "School", 
            advisor: "Ms. Evans", 
            meeting: "Fri 3:30-4:30 PM",
            description: "Spelling competition for language excellence",
            eligibility: "Grades 4-8",
            status: "Completed",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Model United Nations", 
            icon: "Globe", 
            level: "International", 
            advisor: "Mr. Sharma", 
            meeting: "Wed 4:00-6:00 PM",
            description: "Simulation of United Nations procedures",
            eligibility: "Grades 10-12",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "History Bowl", 
            icon: "Book", 
            level: "Regional", 
            advisor: "Ms. Johnson", 
            meeting: "Thu 3:30-5:00 PM",
            description: "Competition testing historical knowledge",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          }
        ],
        arts: [
          { 
            name: "Art Competition", 
            icon: "Palette", 
            level: "National", 
            advisor: "Ms. Davis", 
            meeting: "Mon 3:30-5:00 PM",
            description: "Various visual arts categories and mediums",
            eligibility: "All Grades",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Music Festival", 
            icon: "Music", 
            level: "State", 
            advisor: "Mr. Williams", 
            meeting: "Tue 4:00-6:00 PM",
            description: "Solo and ensemble performance competition",
            eligibility: "All Grades",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Drama Competition", 
            icon: "Mic", 
            level: "Regional", 
            advisor: "Ms. Roberts", 
            meeting: "Wed 4:00-6:30 PM",
            description: "One-act plays and dramatic interpretation",
            eligibility: "Grades 6-12",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Creative Writing Contest", 
            icon: "Book", 
            level: "National", 
            advisor: "Mr. Anderson", 
            meeting: "Fri 3:30-5:00 PM",
            description: "Poetry, short story, and essay competitions",
            eligibility: "All Grades",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Digital Arts Showcase", 
            icon: "Code", 
            level: "State", 
            advisor: "Ms. Chen", 
            meeting: "Thu 4:00-5:30 PM",
            description: "Digital media, animation, and graphic design",
            eligibility: "Grades 7-12",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Photography Contest", 
            icon: "Award", 
            level: "School", 
            advisor: "Mr. Thompson", 
            meeting: "Mon 3:30-4:30 PM",
            description: "Various photography categories and themes",
            eligibility: "All Grades",
            status: "Completed",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          }
        ],
        sports: [
          { 
            name: "Basketball Tournament", 
            icon: "Trophy", 
            level: "Regional", 
            advisor: "Coach Miller", 
            meeting: "Daily Practice",
            description: "Inter-school basketball championship",
            eligibility: "Grades 9-12",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Swimming Championship", 
            icon: "Trophy", 
            level: "State", 
            advisor: "Coach Wilson", 
            meeting: "Mon-Fri 4:00-6:00 PM",
            description: "Various swimming strokes and relays",
            eligibility: "Grades 6-12",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Track & Field Meet", 
            icon: "Trophy", 
            level: "District", 
            advisor: "Coach Davis", 
            meeting: "Mon/Wed/Fri 4:00-6:00 PM",
            description: "Running, jumping, and throwing events",
            eligibility: "All Grades",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Chess Championship", 
            icon: "Trophy", 
            level: "National", 
            advisor: "Mr. Rodriguez", 
            meeting: "Tue/Thu 3:30-5:00 PM",
            description: "Individual and team chess competitions",
            eligibility: "All Grades",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Soccer League", 
            icon: "Trophy", 
            level: "Regional", 
            advisor: "Coach Martinez", 
            meeting: "Daily Practice",
            description: "Inter-school soccer competition",
            eligibility: "Grades 9-12",
            status: "Completed",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Table Tennis Tournament", 
            icon: "Trophy", 
            level: "School", 
            advisor: "Mr. Kim", 
            meeting: "Fri 3:30-5:30 PM",
            description: "Singles and doubles table tennis",
            eligibility: "All Grades",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          }
        ],
        tech: [
          { 
            name: "Robotics Competition", 
            icon: "Code", 
            level: "International", 
            advisor: "Mr. Zhang", 
            meeting: "Mon/Wed/Fri 4:00-6:30 PM",
            description: "Design, build, and program competitive robots",
            eligibility: "Grades 7-12",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Coding Challenge", 
            icon: "Code", 
            level: "National", 
            advisor: "Ms. Johnson", 
            meeting: "Tue/Thu 3:30-5:30 PM",
            description: "Algorithmic problem solving and programming",
            eligibility: "Grades 9-12",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Science Fair", 
            icon: "Microscope", 
            level: "Regional", 
            advisor: "Dr. Evans", 
            meeting: "Wed 4:00-6:00 PM",
            description: "Original scientific research projects",
            eligibility: "All Grades",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "App Development Contest", 
            icon: "Code", 
            level: "State", 
            advisor: "Mr. Brown", 
            meeting: "Mon 4:00-6:00 PM",
            description: "Mobile application design and development",
            eligibility: "Grades 9-12",
            status: "Ongoing",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Engineering Challenge", 
            icon: "Zap", 
            level: "National", 
            advisor: "Mr. Wilson", 
            meeting: "Thu 4:00-6:30 PM",
            description: "Design and build solutions to engineering problems",
            eligibility: "Grades 10-12",
            status: "Registration Open",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          },
          { 
            name: "Cybersecurity Competition", 
            icon: "Shield", 
            level: "National", 
            advisor: "Ms. Garcia", 
            meeting: "Fri 4:00-6:00 PM",
            description: "Network security, cryptography, and forensics",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            link: "#",
            learnMore: "Learn more and register",
            showButton: true,
            show: true
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Competition Events",
      description: "Important dates and deadlines for upcoming competitions",
      ctaButton: {
        label: "View Full Competition Calendar",
        link: "#",
        show: true
      },
      items: [
        {
          title: "Regional Science Bowl",
          date: "2024-10-28",
          time: "9:00 AM - 4:00 PM",
          competition: "Science Bowl",
          location: "State University",
          status: "Registration Open",
          description: "Regional qualifying round for national science competition",
          show: true
        },
        {
          title: "Math Olympiad Qualifiers",
          date: "2024-11-05",
          time: "10:00 AM - 2:00 PM",
          competition: "Math Olympiad",
          location: "School Campus",
          status: "Upcoming",
          description: "Qualifying examination for national math competition",
          show: true
        },
        {
          title: "Robotics Regional Championship",
          date: "2024-11-12",
          time: "8:00 AM - 5:00 PM",
          competition: "Robotics Competition",
          location: "Convention Center",
          status: "Ongoing",
          description: "Regional robotics competition with multiple divisions",
          show: true
        },
        {
          title: "Basketball Tournament Finals",
          date: "2024-11-19",
          time: "6:00 PM - 9:00 PM",
          competition: "Basketball Tournament",
          location: "School Gymnasium",
          status: "Upcoming",
          description: "Championship finals for inter-school basketball tournament",
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Recent Competition Achievements",
      description: "Celebrating the accomplishments of our talented students",
      galleryButton: {
        label: "View Our Achievement Gallery",
        link: "#",
        show: true
      },
      items: [
        {
          title: "National Robotics Champions",
          year: "2024",
          description: "1st Place in National Robotics Competition",
          icon: "Trophy",
          category: "tech",
          show: true
        },
        {
          title: "State Science Bowl Winners",
          year: "2023",
          description: "1st Place in State Science Bowl Competition",
          icon: "Microscope",
          category: "academic",
          show: true
        },
        {
          title: "Regional Art Awards",
          year: "2024",
          description: "12 students received awards in Regional Art Competition",
          icon: "Palette",
          category: "arts",
          show: true
        },
        {
          title: "Math Olympiad Finalists",
          year: "2023",
          description: "3 students qualified for National Math Olympiad",
          icon: "Calculator",
          category: "academic",
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Competition Resources",
      description: "Download important documents, preparation materials, and registration forms",
      downloadLabel: "Download",
      items: [
        {
          title: "Competition Calendar 2024-25",
          description: "Complete schedule of all competitions and events",
          format: "PDF",
          size: "1.2 MB",
          icon: "Calendar",
          link: "#",
          show: true
        },
        {
          title: "Competition Preparation Guide",
          description: "Tips and strategies for competition success",
          format: "PDF",
          size: "2.1 MB",
          icon: "Book",
          link: "#",
          show: true
        },
        {
          title: "Permission Slip Template",
          description: "Standard form for competition participation",
          format: "DOCX",
          size: "0.4 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Past Competition Papers",
          description: "Archive of previous years' competition materials",
          format: "ZIP",
          size: "4.7 MB",
          icon: "FileText",
          link: "#",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Ready to Compete?",
      description: "Join our competitive teams and represent our school in various competitions",
      buttons: [
        { 
          label: "Register for Competitions", 
          variant: "primary",
          link: "#",
          show: true 
        },
        { 
          label: "Contact Competition Coordinator", 
          variant: "secondary",
          link: "#",
          show: true 
        }
      ]
    }
  };

  // Status color getter
  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-yellow-100 text-yellow-800";
      case "Registration Open": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Download file function
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
        const res = await apiRequest('save_data/get_all_competitions_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data (raw):', fetchedData);
          try {
            if (fetchedData && fetchedData.encrypted) {
              fetchedData = await decryptObject(fetchedData);
            } else if (typeof fetchedData === 'string') {
              try {
                fetchedData = JSON.parse(fetchedData);
              } catch (e) {
                console.warn('Failed to parse fetchedData string, using default', e);
                fetchedData = {};
              }
            }
          } catch (e) {
            console.warn('Decryption failed, falling back to raw data or default', e);
            try {
              if (typeof fetchedData === 'string') fetchedData = JSON.parse(fetchedData);
            } catch (err) {
              fetchedData = {};
            }
          }
          setData({ ...defaultData, ...fetchedData });
        } else {
          console.log('No data or invalid response, using default');
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
        categories: data.categories,
        showCompetitions: data.layout.showCompetitions,
        competitions: data.competitions
      };
      setEditData(overviewData);
      setOriginalData(JSON.parse(JSON.stringify(overviewData)));
      setOpenCategories(['academic', 'arts', 'sports', 'tech']);
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

  // Save section
  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
    if (editSection === 'overview') {
      newData.layout.showCategories = updatedData.showCategories;
      newData.layout.showCompetitions = updatedData.showCompetitions;
      newData.categories = updatedData.categories;
      newData.competitions = updatedData.competitions;
    } else {
      const layoutKey = layoutMap[editSection];
      newData.layout[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
    setData(newData);
    try {
      const encrypted = await encryptObject(newData);
      await apiRequest('save_data/save_competitions_data', { payload: encrypted });
    } catch (error) {
      console.error('Save failed', error);
    }
    setEditFormOpen(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditData(originalData);
    setEditFormOpen(false);
  };

  // Accordion toggle
  const toggleCategory = (catId) => {
    setOpenCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId)
        : [...prev, catId]
    );
  };

  // General handlers
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

  const handleNestedChange = (parentKey, childKey, value) => {
    setEditData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  const handleCategoriesItemChange = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        items: prev.categories.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
      }
    }));
  };

  const handleLabelsChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      competitions: {
        ...prev.competitions,
        labels: {
          ...prev.competitions.labels,
          [field]: value
        }
      }
    }));
  };

  const handleCategoryItemChange = (catId, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.competitions.items[catId]) updated.competitions.items[catId] = [];
      updated.competitions.items[catId][index] = { ...updated.competitions.items[catId][index], [field]: value };
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

  // New handlers for adding/removing category items
  const addCategoryItem = (catId) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.competitions?.items) updated.competitions = { ...prev.competitions, items: { ...prev.competitions?.items } };
      if (!updated.competitions.items[catId]) updated.competitions.items[catId] = [];
      const newItem = {
        name: "",
        icon: "",
        level: "",
        advisor: "",
        meeting: "",
        description: "",
        eligibility: "",
        status: "",
        link: "",
        learnMore: "Learn more and register",
        showButton: true,
        show: true
      };
      updated.competitions.items[catId].push(newItem);
      return updated;
    });
  };

  const removeCategoryItem = (catId, index) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (updated.competitions?.items?.[catId]) {
        updated.competitions.items[catId].splice(index, 1);
      }
      return updated;
    });
  };

  // Filter functions (using data from state)
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredCompetitions = data.competitions?.items ? 
    Object.fromEntries(
      Object.entries(data.competitions.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredHeroStats = data.hero?.stats?.filter(stat => stat.show !== false) || [];

  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showBenefits', label: 'Benefits' },
    { key: 'showCategories', label: 'Categories' },
    { key: 'showCompetitions', label: 'Competitions List' },
    { key: 'showUpcomingEvents', label: 'Upcoming Events' },
    { key: 'showAchievements', label: 'Achievements' },
    { key: 'showResources', label: 'Resources' },
    { key: 'showCta', label: 'CTA Section' }
  ];

  // Section Visibility modal handlers
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
    // update live data so sections reflect immediately
    setData(prev => ({ ...prev, layout: { ...prev.layout, [key]: prev.layout?.[key] === false ? true : false } }));
  };

  const saveSectionVisibility = async () => {
    try {
      const encrypted = await encryptObject(data);
      await apiRequest('save_data/save_competitions_data', { payload: encrypted });
    } catch (err) {
      console.error('Failed to save section visibility', err);
    }
    setSectionVisibilityModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Modal Header Component
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );

  // Category Competitions Editor Component (Accordion removed - all sections always expanded for easier editing)
  const CategoryCompetitionsEditor = ({ catId, categoryName }) => {
    const items = editData.competitions?.items?.[catId] || [];
    return (
      <div className="mb-6 border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-800 rounded-t-lg">
          {categoryName} Competitions ({items.length} items)
        </div>
        <div className="p-4 space-y-4">
          {items.map((item, index) => (
            <div key={`${catId}-${index}`} className="mb-4 p-4 border rounded bg-gray-50 relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Item {index + 1}</h4>
                <button
                  onClick={() => removeCategoryItem(catId, index)}
                  className="text-red-600 hover:text-red-800 p-1 rounded"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input value={item.name || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'name', e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
                <select value={item.icon || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'icon', e.target.value)} className="w-full p-2 border rounded mb-2">
                  <option value="">Select Icon</option>
                  {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                </select>
                <input value={item.level || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'level', e.target.value)} placeholder="Level" className="w-full p-2 border rounded mb-2" />
                <input value={item.advisor || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'advisor', e.target.value)} placeholder="Advisor" className="w-full p-2 border rounded mb-2" />
                <input value={item.meeting || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'meeting', e.target.value)} placeholder="Meeting" className="w-full p-2 border rounded mb-2" />
                <textarea value={item.description || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" rows="2" />
                <input value={item.eligibility || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'eligibility', e.target.value)} placeholder="Eligibility" className="w-full p-2 border rounded mb-2" />
                <input value={item.status || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'status', e.target.value)} placeholder="Status" className="w-full p-2 border rounded mb-2" />
                <input value={item.link || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'link', e.target.value)} placeholder="Link/Path" className="w-full p-2 border rounded mb-2" />
                <input value={item.learnMore || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'learnMore', e.target.value)} placeholder="Learn More Text" className="w-full p-2 border rounded mb-2" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.show !== false} onChange={(e) => handleCategoryItemChange(catId, index, 'show', e.target.checked)} />
                  <span>Show Item</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.showButton !== false} onChange={(e) => handleCategoryItemChange(catId, index, 'showButton', e.target.checked)} />
                  <span>Show Learn More Button</span>
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={() => addCategoryItem(catId)}
            className="flex items-center text-green-600 hover:text-green-800 font-medium p-2 rounded border border-green-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New {categoryName} Competition
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={`Edit ${editSection}`} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Background Image</label>
                    <FileUpload 
                      initialValue={editData.backgroundImage || ''} 
                      onUpload={(url) => handleObjectChange('backgroundImage', url)} 
                      className="w-full" 
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={stat.value || ''} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} placeholder="Value" className="w-full p-2 border rounded" />
                        <input value={stat.label || ''} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} placeholder="Label" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={stat.show !== false} onChange={(e) => handleArrayChange('stats', index, 'show', e.target.checked)} />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <input
                      value={editData.ctaButton?.label || ''}
                      onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editData.ctaButton?.link || ''}
                      onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)}
                      placeholder="Link"
                      className="w-full p-2 border rounded"
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.ctaButton?.show !== false}
                        onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)}
                      />
                      <span>Show Button</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Benefits</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
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
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
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
                      <input type="checkbox" checked={editData.showCategories || false} onChange={(e) => handleObjectChange('showCategories', e.target.checked)} />
                      <span>Show Categories</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showCompetitions || false} onChange={(e) => handleObjectChange('showCompetitions', e.target.checked)} />
                      <span>Show Competitions</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Categories Title</label>
                    <input value={editData.categories?.title || ''} onChange={(e) => handleNestedChange('categories', 'title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Categories Description</label>
                    <textarea value={editData.categories?.description || ''} onChange={(e) => handleNestedChange('categories', 'description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Categories Items</h3>
                  {(editData.categories?.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Category {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={item.name || ''} onChange={(e) => handleCategoriesItemChange(index, 'name', e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
                        <select value={item.icon || ''} onChange={(e) => handleCategoriesItemChange(index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.description || ''} onChange={(e) => handleCategoriesItemChange(index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleCategoriesItemChange(index, 'show', e.target.checked)} />
                          <span>Show Category</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Competitions Labels</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(editData.competitions?.labels || {}).map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium">{key}</label>
                        <input value={editData.competitions?.labels?.[key] || ''} onChange={(e) => handleLabelsChange(key, e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Category Competitions</h3>
                  <CategoryCompetitionsEditor catId="academic" categoryName="Academic" />
                  <CategoryCompetitionsEditor catId="arts" categoryName="Arts" />
                  <CategoryCompetitionsEditor catId="sports" categoryName="Sports" />
                  <CategoryCompetitionsEditor catId="tech" categoryName="Tech" />
                </div>
              )}
              {editSection === 'upcomingEvents' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Upcoming Events</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <input type="date" value={item.date || ''} onChange={(e) => handleArrayChange('items', index, 'date', e.target.value)} className="w-full p-2 border rounded" />
                        <input value={item.time || ''} onChange={(e) => handleArrayChange('items', index, 'time', e.target.value)} placeholder="Time" className="w-full p-2 border rounded" />
                        <input value={item.competition || ''} onChange={(e) => handleArrayChange('items', index, 'competition', e.target.value)} placeholder="Competition" className="w-full p-2 border rounded" />
                        <input value={item.location || ''} onChange={(e) => handleArrayChange('items', index, 'location', e.target.value)} placeholder="Location" className="w-full p-2 border rounded" />
                        <input value={item.status || ''} onChange={(e) => handleArrayChange('items', index, 'status', e.target.value)} placeholder="Status" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <div className="border-t border-gray-200 mt-4 pt-4">
                          <h4 className="text-sm font-medium mb-2">View Details Button</h4>
                          <input 
                            value={item.viewDetailsText || 'View Details'} 
                            onChange={(e) => handleArrayChange('items', index, 'viewDetailsText', e.target.value)} 
                            placeholder="Button Text" 
                            className="w-full p-2 border rounded mb-2" 
                          />
                          <input 
                            value={item.viewDetailsLink || '#'} 
                            onChange={(e) => handleArrayChange('items', index, 'viewDetailsLink', e.target.value)} 
                            placeholder="Button Link" 
                            className="w-full p-2 border rounded mb-2" 
                          />
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={item.showViewDetails !== false} 
                              onChange={(e) => handleArrayChange('items', index, 'showViewDetails', e.target.checked)} 
                            />
                            <span>Show View Details Button</span>
                          </label>
                        </div>
                        <label className="flex items-center space-x-2 mt-4">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Event</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedObjectChange('ctaButton', 0, 'label', e.target.value)} placeholder="Label" className="w-full p-2 border rounded" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedObjectChange('ctaButton', 0, 'link', e.target.value)} placeholder="Link" className="w-full p-2 border rounded" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedObjectChange('ctaButton', 0, 'show', e.target.checked)} />
                      <span>Show Button</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'achievements' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Achievements</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Achievement {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <input type="number" value={item.year || ''} onChange={(e) => handleArrayChange('items', index, 'year', e.target.value)} placeholder="Year" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Gallery Button</h3>
                  <div className="space-y-2">
                    <input value={editData.galleryButton?.label || ''} onChange={(e) => handleNestedChange('galleryButton', 'label', e.target.value)} placeholder="Label" className="w-full p-2 border rounded" />
                    <input value={editData.galleryButton?.link || ''} onChange={(e) => handleNestedChange('galleryButton', 'link', e.target.value)} placeholder="Link" className="w-full p-2 border rounded" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.galleryButton?.show !== false} onChange={(e) => handleNestedChange('galleryButton', 'show', e.target.checked)} />
                      <span>Show</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Resources</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Download Label</label>
                    <input value={editData.downloadLabel || ''} onChange={(e) => handleObjectChange('downloadLabel', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <input value={item.format || ''} onChange={(e) => handleArrayChange('items', index, 'format', e.target.value)} placeholder="Format" className="w-full p-2 border rounded" />
                        <input value={item.size || ''} onChange={(e) => handleArrayChange('items', index, 'size', e.target.value)} placeholder="Size" className="w-full p-2 border rounded" />
                        <div>
                          <label className="block text-sm font-medium">Link (or Upload)</label>
                          <input value={item.link || ''} onChange={(e) => handleArrayChange('items', index, 'link', e.target.value)} placeholder="URL" className="w-full p-2 border rounded mb-2" />
                          <FileUpload 
                            initialValue={item.link || ''} 
                            onUpload={(url) => handleArrayChange('items', index, 'link', url)} 
                            className="w-full" 
                          />
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
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
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
                        <input value={button.label || ''} onChange={(e) => handleArrayChange('buttons', index, 'label', e.target.value)} placeholder="Label" className="w-full p-2 border rounded" />
                        <input value={button.link || ''} onChange={(e) => handleArrayChange('buttons', index, 'link', e.target.value)} placeholder="Link" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={button.show !== false} onChange={(e) => handleArrayChange('buttons', index, 'show', e.target.checked)} />
                          <span>Show Button</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {editMode && (
        <button onClick={openSectionVisibilityModal} className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50">
          <Edit className="h-5 w-5" />
        </button>
      )}

        {/* Manage Section Visibility Modal */}
        {sectionVisibilityModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
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
              <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
            </div>
          </div>
        )}

      {/* Hero Section */}
      {data.layout?.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={data.hero.backgroundImage || 'https://via.placeholder.com/1920x400'}
            alt={data.hero.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
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
                <button onClick={() => downloadFile(data.hero.ctaButton?.link || '#', 'competition-handbook.pdf')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.hero.ctaButton?.label}
                  <Download className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
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
                const IconComponent = iconMap[benefit.icon] || Trophy;
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

            {/* Competitions for Selected Category */}
            {data.layout?.showCompetitions && data.competitions?.show && filteredCompetitions[activeCategory] && filteredCompetitions[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompetitions[activeCategory].map((competition, index) => {
                    const IconComponent = iconMap[competition.icon] || Book;
                    const statusColorClass = getStatusColor(competition.status);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{competition.name}</h4>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColorClass}`}>
                              {competition.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.level}: {competition.level}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.advisor}: {competition.advisor}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.meeting}: {competition.meeting}</span>
                          </div>
                          <div className="flex items-center">
                            <Book className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.eligibility}: {competition.eligibility}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{competition.description}</p>
                        
                        {competition.showButton !== false && (
                          <a href={competition.link || '#'} className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                            {competition.learnMore || "Learn more and register"}
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents.title}</h2>
            <p className="text-gray-600 mb-6">{data.upcomingEvents.description}</p>
            
            <div className="space-y-4">
              {filteredUpcomingEvents.map((event, index) => {
                const statusColorClass = getStatusColor(event.status);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{event.title}</h3>
                          <span className={`inline-block ${statusColorClass} text-xs font-medium px-2 py-1 rounded-full mt-1`}>
                            {event.status}
                          </span>
                          <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
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
                              {event.location}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                        </div>
                      </div>
                      {event.showViewDetails !== false && (
                        <a 
                          href={event.viewDetailsLink || '#'} 
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0"
                        >
                          {event.viewDetailsText || 'View Details'}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {data.upcomingEvents.ctaButton?.show !== false && (
              <button onClick={() => downloadFile(data.upcomingEvents.ctaButton?.link || '#', 'calendar.pdf')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                {data.upcomingEvents.ctaButton?.label}
              </button>
            )}
            {editMode && <button onClick={() => openEditModal('upcomingEvents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Achievements */}
        {data.layout?.showAchievements && data.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.achievements.title}</h2>
            <p className="text-gray-600 mb-6">{data.achievements.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAchievements.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon] || Trophy;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300">
                    <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                      {achievement.year}
                    </span>
                    <h3 className="font-semibold text-gray-800 mb-3">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
            {data.achievements?.galleryButton?.show !== false && (
              <div className="mt-6 text-center">
                <button onClick={() => downloadFile(data.achievements.galleryButton?.link || '#', 'gallery.pdf')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.achievements?.galleryButton?.label}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('achievements')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Resources */}
        {data.layout?.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon] || FileText;
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
                    {data.resources?.downloadLabel && (
                      <button onClick={() => downloadFile(resource.link, downloadFilename)} className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                        {data.resources.downloadLabel}
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
                <a key={index} href={button.link || '#'} className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  button.variant === 'primary' 
                    ? 'bg-white text-green-800 hover:bg-gray-100' 
                    : 'bg-transparent border border-white text-white hover:bg-white/10'
                }`}>
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

export default CompetitionsPage;