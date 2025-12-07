"use client";
import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Star,
  Award,
  Music,
  Mic,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Heart,
  Trophy,
  Download,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  FileText,
  Edit,
  Eye,
  EyeOff,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const EventsPage = ({ eventsData }) => {
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
  const role = 'admin'; // Should come from auth context

  // Icon mapping
  const iconMap = {
    Calendar,
    MapPin,
    Clock,
    Users,
    Ticket,
    Star,
    Award,
    Music,
    Mic,
    Book,
    Calculator,
    Palette,
    Microscope,
    Globe,
    Code,
    Heart,
    Trophy,
    Download,
    ChevronRight,
    ExternalLink,
    ArrowRight,
    FileText
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    upcomingEvents: 'showFeaturedEvents',
    pastEvents: 'showPastEvents',
    resources: 'showResources',
    cta: 'showCta'
  };

  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showBenefits', label: 'Benefits' },
    { key: 'showFeaturedEvents', label: 'Featured Events' },
    { key: 'showCategories', label: 'Categories' },
    { key: 'showEvents', label: 'Events List' },
    { key: 'showPastEvents', label: 'Past Events' },
    { key: 'showResources', label: 'Resources' },
    { key: 'showCta', label: 'CTA Section' }
  ];

  // Default data structure for Events
  const defaultData = {
    showHero: true,
    showBenefits: true,
    showFeaturedEvents: true,
    showCategories: true,
    showEvents: true,
    showPastEvents: true,
    showResources: true,
    showCta: true,
    hero: {
      show: true,
      title: "School Events & Activities",
      subtitle: "Join our vibrant school community through exciting events and celebrations throughout the year",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Event Handbook",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Attend School Events?",
      description: "Our events provide unique opportunities for growth, community, and memorable experiences",
      items: [
        {
          icon: "Users",
          title: "Community Building",
          description: "Bringing together students, parents, teachers, and the wider community.",
          show: true
        },
        {
          icon: "Star",
          title: "Skill Showcase",
          description: "Providing platforms for students to display their talents and achievements.",
          show: true
        },
        {
          icon: "Heart",
          title: "School Spirit",
          description: "Fostering pride and connection to our school community.",
          show: true
        },
        {
          icon: "Calendar",
          title: "Lifelong Memories",
          description: "Creating memorable experiences that students will cherish for years.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Event Categories",
      description: "Explore our diverse range of school events and activities",
      items: [
        { id: 'academic', name: 'Academic Events', icon: "Book", description: 'Learning-focused activities', show: true },
        { id: 'arts', name: 'Arts & Culture', icon: "Palette", description: 'Creative performances', show: true },
        { id: 'sports', name: 'Sports Events', icon: "Trophy", description: 'Athletic competitions', show: true },
        { id: 'special', name: 'Special Events', icon: "Star", description: 'School-wide celebrations', show: true }
      ]
    },
    events: {
      show: true,
      labels: {
        date: "Date",
        time: "Time",
        location: "Location",
        audience: "Audience"
      },
      items: {
        academic: [
          { 
            name: "Science Fair", 
            icon: "Microscope", 
            date: "2025-11-15", 
            time: "9:00 AM - 3:00 PM", 
            location: "School Gymnasium",
            description: "Annual showcase of student science projects and experiments",
            audience: "All Students & Parents",
            status: "Registration Open",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Math Olympiad", 
            icon: "Calculator", 
            date: "2025-12-03", 
            time: "10:00 AM - 2:00 PM", 
            location: "Room 201",
            description: "Competitive mathematics problem-solving competition",
            audience: "Grades 9-12",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Literary Festival", 
            icon: "Book", 
            date: "2026-01-12", 
            time: "10:00 AM - 4:00 PM", 
            location: "Library & Auditorium",
            description: "Celebration of reading, writing, and literary arts",
            audience: "All Students",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "History Symposium", 
            icon: "Globe", 
            date: "2026-02-08", 
            time: "1:00 PM - 4:00 PM", 
            location: "History Department",
            description: "Student presentations on historical research projects",
            audience: "Grades 10-12",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Career Day", 
            icon: "Users", 
            date: "2026-03-05", 
            time: "8:30 AM - 12:30 PM", 
            location: "Various Classrooms",
            description: "Professionals from various fields share their experiences",
            audience: "Grades 9-12",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Debate Tournament", 
            icon: "Mic", 
            date: "2026-04-18", 
            time: "9:00 AM - 5:00 PM", 
            location: "Auditorium",
            description: "Inter-school debate competition hosted at our campus",
            audience: "Debate Team & Spectators",
            status: "Registration Open",
            link: "#",
            learnMore: "View details",
            show: true
          }
        ],
        arts: [
          { 
            name: "Fall Concert", 
            icon: "Music", 
            date: "2025-10-25", 
            time: "7:00 PM - 9:00 PM", 
            location: "School Auditorium",
            description: "Performance by band, orchestra, and choir students",
            audience: "All Welcome",
            status: "Tickets Available",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Art Exhibition", 
            icon: "Palette", 
            date: "2025-11-08", 
            time: "6:00 PM - 8:00 PM", 
            location: "Art Gallery",
            description: "Showcase of student artwork from all grade levels",
            audience: "All Welcome",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Drama Production", 
            icon: "Mic", 
            date: "2025-12-12", 
            time: "7:00 PM each night", 
            location: "Main Theater",
            description: "Annual school play performed by drama students",
            audience: "All Welcome",
            status: "Tickets Available",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Spring Musical", 
            icon: "Music", 
            date: "2026-03-20", 
            time: "7:00 PM (2:00 PM Sat matinee)", 
            location: "Main Theater",
            description: "Full-scale musical theater production",
            audience: "All Welcome",
            status: "Auditions Open",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Poetry Slam", 
            icon: "Mic", 
            date: "2026-04-05", 
            time: "6:30 PM - 8:30 PM", 
            location: "Black Box Theater",
            description: "Student poetry performance competition",
            audience: "High School Students",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Dance Showcase", 
            icon: "Star", 
            date: "2026-05-10", 
            time: "6:00 PM - 8:00 PM", 
            location: "Auditorium",
            description: "Performance by dance classes and extracurricular groups",
            audience: "All Welcome",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          }
        ],
        sports: [
          { 
            name: "Homecoming Game", 
            icon: "Trophy", 
            date: "2025-10-18", 
            time: "7:00 PM", 
            location: "Football Field",
            description: "Varsity football game with special halftime celebrations",
            audience: "All Welcome",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Basketball Tournament", 
            icon: "Trophy", 
            date: "2025-11-22", 
            time: "Various Times", 
            location: "Main Gym",
            description: "Annual inter-school basketball competition",
            audience: "All Welcome",
            status: "Registration Open",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Swimming Championship", 
            icon: "Trophy", 
            date: "2026-01-25", 
            time: "9:00 AM - 4:00 PM", 
            location: "School Pool",
            description: "Regional swimming competition hosted at our facility",
            audience: "Spectators Welcome",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Track & Field Meet", 
            icon: "Trophy", 
            date: "2026-02-15", 
            time: "10:00 AM - 3:00 PM", 
            location: "Track Field",
            description: "Inter-school track and field competition",
            audience: "Spectators Welcome",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Spring Sports Banquet", 
            icon: "Trophy", 
            date: "2026-05-30", 
            time: "6:30 PM - 9:00 PM", 
            location: "Cafeteria",
            description: "Celebration of athletic achievements with awards",
            audience: "Athletes & Families",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Intramural Tournament", 
            icon: "Trophy", 
            date: "2026-04-12", 
            time: "12:00 PM - 2:00 PM", 
            location: "Various Fields",
            description: "Year-end tournament for intramural sports teams",
            audience: "Participants Only",
            status: "Registration Open",
            link: "#",
            learnMore: "View details",
            show: true
          }
        ],
        special: [
          { 
            name: "Homecoming Dance", 
            icon: "Star", 
            date: "2025-10-19", 
            time: "7:00 PM - 10:00 PM", 
            location: "School Gymnasium",
            description: "Annual semi-formal dance with theme and decorations",
            audience: "Grades 9-12",
            status: "Tickets Available",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "International Day", 
            icon: "Globe", 
            date: "2025-11-16", 
            time: "11:00 AM - 2:00 PM", 
            location: "Cafeteria & Courtyard",
            description: "Celebration of diverse cultures with food and performances",
            audience: "School Community",
            status: "Upcoming",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Holiday Festival", 
            icon: "Heart", 
            date: "2025-12-14", 
            time: "4:00 PM - 7:00 PM", 
            location: "School Grounds",
            description: "Seasonal celebration with activities and performances",
            audience: "All Welcome",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Science & Technology Fair", 
            icon: "Microscope", 
            date: "2026-01-18", 
            time: "10:00 AM - 3:00 PM", 
            location: "Science Wing",
            description: "Showcase of innovative student projects in STEM fields",
            audience: "All Welcome",
            status: "Registration Open",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Spring Carnival", 
            icon: "Star", 
            date: "2026-04-26", 
            time: "12:00 PM - 5:00 PM", 
            location: "School Field",
            description: "Fun fair with games, food, and activities for all ages",
            audience: "Community Event",
            status: "Planning",
            link: "#",
            learnMore: "View details",
            show: true
          },
          { 
            name: "Graduation Ceremony", 
            icon: "Award", 
            date: "2026-06-07", 
            time: "2:00 PM", 
            location: "Football Field",
            description: "Commencement exercises for graduating seniors",
            audience: "Graduates & Families",
            status: "By Invitation",
            link: "#",
            learnMore: "View details",
            show: true
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Featured Upcoming Events",
      description: "Don't miss these exciting events coming soon",
      items: [
        {
          title: "Annual Fall Festival",
          date: "2025-11-12",
          time: "3:00 PM - 8:00 PM",
          category: "Special Event",
          location: "School Grounds",
          description: "An afternoon of games, food, and fun for the whole family featuring performances by student groups",
          status: "Tickets Available",
          buttonText: "Get Tickets",
          link: "#",
          showButton: true,
          show: true
        },
        {
          title: "College Fair",
          date: "2025-11-19",
          time: "6:00 PM - 8:30 PM",
          category: "Academic Event",
          location: "Gymnasium",
          description: "Representatives from over 50 colleges and universities",
          status: "Registration Open",
          buttonText: "Register",
          link: "#",
          showButton: true,
          show: true
        },
        {
          title: "Winter Concert Series",
          date: "2025-12-15",
          time: "7:00 PM - 9:00 PM",
          category: "Arts Event",
          location: "Auditorium",
          description: "Holiday performances by music and dance groups",
          status: "Tickets Available",
          buttonText: "Get Tickets",
          link: "#",
          showButton: true,
          show: true
        },
        {
          title: "Sports Day",
          date: "2026-04-05",
          time: "9:00 AM - 4:00 PM",
          category: "Sports Event",
          location: "School Fields",
          description: "Annual athletic competitions and family picnic",
          status: "Upcoming",
          buttonText: "Learn More",
          link: "#",
          showButton: true,
          show: true
        }
      ]
    },
    pastEvents: {
      show: true,
      title: "Past Events",
      description: "Celebrating our recent successful events and activities",
      galleryButton: {
        label: "View Event Photo Gallery",
        link: "#",
        show: true
      },
      items: [
        {
          title: "Orientation Day",
          date: "2025-08-25",
          description: "Welcome event for new students and families",
          attendance: "500+ participants",
          show: true
        },
        {
          title: "Independence Day Celebration",
          date: "2025-08-15",
          description: "Patriotic performances and cultural activities",
          attendance: "Whole school community",
          show: true
        },
        {
          title: "Back to School Night",
          date: "2025-09-10",
          description: "Parent-teacher meetings and classroom visits",
          attendance: "Parents & Teachers",
          show: true
        },
        {
          title: "Autumn Sports Meet",
          date: "2025-09-28",
          description: "Inter-house athletic competitions",
          attendance: "All students",
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Event Resources",
      description: "Download event information, forms, and planning resources",
      downloadLabel: "Download",
      items: [
        {
          title: "Event Calendar 2024-25",
          description: "Complete schedule of all school events",
          format: "PDF",
          size: "1.2 MB",
          icon: "Calendar",
          link: "#",
          show: true
        },
        {
          title: "Volunteer Signup Form",
          description: "Form to volunteer for school events",
          format: "PDF",
          size: "0.8 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Event Proposal Template",
          description: "Template to propose new school events",
          format: "DOCX",
          size: "0.5 MB",
          icon: "FileText",
          link: "#",
          show: true
        },
        {
          title: "Permission Slip Sample",
          description: "Standard permission form for events",
          format: "PDF",
          size: "0.4 MB",
          icon: "FileText",
          link: "#",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Get Involved in School Events",
      description: "Whether you want to attend, volunteer, or propose a new event, there are many ways to participate",
      buttons: [
        { 
          label: "Volunteer for Events", 
          variant: "primary",
          link: "#",
          show: true 
        },
        { 
          label: "Propose an Event", 
          variant: "secondary",
          link: "#",
          show: true 
        }
      ]
    },
    general: {
      viewDetails: "View details",
      getTickets: "Get Tickets",
      learnMore: "Learn More"
    },
    statusColors: {
      "Registration Open": "bg-yellow-100 text-yellow-800",
      "Upcoming": "bg-blue-100 text-blue-800",
      "Planning": "bg-purple-100 text-purple-800",
      "Tickets Available": "bg-green-100 text-green-800",
      "Auditions Open": "bg-orange-100 text-orange-800",
      "By Invitation": "bg-gray-100 text-gray-800"
    }
  };

  // Status color getter
  const getStatusColor = (status) => {
    return data.statusColors?.[status] || "bg-gray-100 text-gray-800";
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
        const res = await apiRequest('save_data/get_all_events_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          const fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data:', fetchedData);
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
        showCategories: data.showCategories,
        categories: data.categories,
        showEvents: data.showEvents,
        events: data.events
      };
      setEditData(overviewData);
      setOriginalData(JSON.parse(JSON.stringify(overviewData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data[layoutKey],
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
      newData.showCategories = updatedData.showCategories;
      newData.showEvents = updatedData.showEvents;
      newData.categories = updatedData.categories;
      newData.events = updatedData.events;
    } else {
      const layoutKey = layoutMap[editSection];
      newData[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
    setData(newData);
    try {
      await apiRequest('save_data/save_events_data', { payload: newData });
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

  // Section Visibility modal handlers
  const openSectionVisibilityModal = () => {
    const visibility = {};
    sectionDisplay.forEach(s => {
      visibility[s.key] = data[s.key];
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
    setData(prev => ({ ...prev, [key]: prev?.[key] === false ? true : false }));
  };

  const saveSectionVisibility = async () => {
    try {
      await apiRequest('save_data/save_events_data', { payload: data });
    } catch (err) {
      console.error('Failed to save section visibility', err);
    }
    setSectionVisibilityModal(false);
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
      events: {
        ...prev.events,
        labels: {
          ...prev.events.labels,
          [field]: value
        }
      }
    }));
  };

  const handleCategoryItemChange = (catId, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.events?.items) updated.events = { ...prev.events, items: { ...prev.events?.items } };
      if (!updated.events.items[catId]) updated.events.items[catId] = [];
      updated.events.items[catId][index] = { ...updated.events.items[catId][index], [field]: value };
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

  // Handlers for adding/removing category items
  const addCategoryItem = (catId) => {
    setEditData(prev => {
      const prevEvents = prev.events || {};
      const prevItems = prevEvents.items || {};
      const catItems = prevItems[catId] ? [...prevItems[catId]] : [];
      const newItem = {
        name: "",
        icon: "",
        date: "",
        time: "",
        location: "",
        description: "",
        audience: "",
        status: "",
        link: "#",
        learnMore: "View details",
        show: true
      };
      const newCatItems = [...catItems, newItem];
      const newItems = { ...prevItems, [catId]: newCatItems };
      return { ...prev, events: { ...prevEvents, items: newItems } };
    });
  };

  const removeCategoryItem = (catId, index) => {
    setEditData(prev => {
      const prevEvents = prev.events || {};
      const prevItems = prevEvents.items || {};
      const catItems = prevItems[catId] ? [...prevItems[catId]] : [];
      const newCatItems = catItems.filter((_, i) => i !== index);
      const newItems = { ...prevItems, [catId]: newCatItems };
      return { ...prev, events: { ...prevEvents, items: newItems } };
    });
  };

  // Filter functions (using data from state)
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredEvents = data.events?.items ? 
    Object.fromEntries(
      Object.entries(data.events.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredPastEvents = data.pastEvents?.items?.filter(event => event.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

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

  // Category Events Editor Component
  const CategoryEventsEditor = ({ catId, categoryName }) => {
    const items = editData.events?.items?.[catId] || [];
    return (
      <div className="mb-6 border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-800 rounded-t-lg">
          {categoryName} Events ({items.length} items)
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
                <input type="date" value={item.date || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'date', e.target.value)} className="w-full p-2 border rounded mb-2" />
                <input value={item.time || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'time', e.target.value)} placeholder="Time" className="w-full p-2 border rounded mb-2" />
                <input value={item.location || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'location', e.target.value)} placeholder="Location" className="w-full p-2 border rounded mb-2" />
                <textarea value={item.description || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" rows="2" />
                <input value={item.audience || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'audience', e.target.value)} placeholder="Audience" className="w-full p-2 border rounded mb-2" />
                <input value={item.status || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'status', e.target.value)} placeholder="Status" className="w-full p-2 border rounded mb-2" />
                <input value={item.link || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'link', e.target.value)} placeholder="Link" className="w-full p-2 border rounded mb-2" />
                <input value={item.learnMore || ''} onChange={(e) => handleCategoryItemChange(catId, index, 'learnMore', e.target.value)} placeholder="Learn More Text" className="w-full p-2 border rounded mb-2" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.show !== false} onChange={(e) => handleCategoryItemChange(catId, index, 'show', e.target.checked)} />
                  <span>Show Item</span>
                </label>
              </div>
            </div>
          ))}
          <button
            onClick={() => addCategoryItem(catId)}
            className="flex items-center text-green-600 hover:text-green-800 font-medium p-2 rounded border border-green-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New {categoryName} Event
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                      <input type="checkbox" checked={editData.showEvents || false} onChange={(e) => handleObjectChange('showEvents', e.target.checked)} />
                      <span>Show Events</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Events Labels</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.keys(editData.events?.labels || {}).map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="block text-sm font-medium">{key}</label>
                        <input value={editData.events?.labels?.[key] || ''} onChange={(e) => handleLabelsChange(key, e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Category Events</h3>
                  <CategoryEventsEditor catId="academic" categoryName="Academic" />
                  <CategoryEventsEditor catId="arts" categoryName="Arts" />
                  <CategoryEventsEditor catId="sports" categoryName="Sports" />
                  <CategoryEventsEditor catId="special" categoryName="Special" />
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
                        <input value={item.category || ''} onChange={(e) => handleArrayChange('items', index, 'category', e.target.value)} placeholder="Category" className="w-full p-2 border rounded" />
                        <input value={item.location || ''} onChange={(e) => handleArrayChange('items', index, 'location', e.target.value)} placeholder="Location" className="w-full p-2 border rounded" />
                        <input value={item.status || ''} onChange={(e) => handleArrayChange('items', index, 'status', e.target.value)} placeholder="Status" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <div className="border-t border-gray-200 mt-4 pt-4">
                          <h4 className="text-sm font-medium mb-2">Button</h4>
                          <input 
                            value={item.buttonText || ''} 
                            onChange={(e) => handleArrayChange('items', index, 'buttonText', e.target.value)} 
                            placeholder="Button Text" 
                            className="w-full p-2 border rounded mb-2" 
                          />
                          <input 
                            value={item.link || '#'} 
                            onChange={(e) => handleArrayChange('items', index, 'link', e.target.value)} 
                            placeholder="Button Link" 
                            className="w-full p-2 border rounded mb-2" 
                          />
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={item.showButton !== false} 
                              onChange={(e) => handleArrayChange('items', index, 'showButton', e.target.checked)} 
                            />
                            <span>Show Button</span>
                          </label>
                        </div>
                        <label className="flex items-center space-x-2 mt-4">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Event</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'pastEvents' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Past Events</span>
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
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <input value={item.attendance || ''} onChange={(e) => handleArrayChange('items', index, 'attendance', e.target.value)} placeholder="Attendance" className="w-full p-2 border rounded" />
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
                      <span>Show Button</span>
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

      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero?.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={data.hero.backgroundImage || 'https://via.placeholder.com/1920x400'}
            alt={data.hero.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero?.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero?.subtitle}
              </p>
              {data.hero?.ctaButton?.show !== false && (
                <button onClick={() => downloadFile(data.hero.ctaButton?.link || '#', 'event-handbook.pdf')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.hero.ctaButton?.label}
                  <Download className="ml-2 h-4 w-4" />
                </button>
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
        {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.benefits?.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.benefits?.description}
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

        {/* Featured Upcoming Events */}
        {data.showFeaturedEvents && data.upcomingEvents?.show && filteredUpcomingEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents?.title}</h2>
            <p className="text-gray-600 mb-6">{data.upcomingEvents?.description}</p>
            
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
                            {event.category}
                          </span>
                          <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
                            <span className="flex items-center mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(event.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'long',
                                year: 'numeric'
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
                          <span className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${statusColorClass}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                      {event.showButton !== false && (
                        <a 
                          href={event.link || '#'} 
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0"
                        >
                          {event.buttonText || (event.status === "Tickets Available" ? data.general?.getTickets : data.general?.learnMore)}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('upcomingEvents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Categories Navigation */}
        {data.showCategories && data.categories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.categories?.title}</h2>
              <p className="text-gray-600">
                {data.categories?.description}
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

            {/* Events for Selected Category */}
            {data.showEvents && data.events?.show && filteredEvents[activeCategory] && filteredEvents[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents[activeCategory].map((event, index) => {
                    const IconComponent = iconMap[event.icon] || Calendar;
                    const statusColorClass = getStatusColor(event.status);
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{event.name}</h4>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColorClass}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.date}: {new Date(event.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.time}: {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.location}: {event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.audience}: {event.audience}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                        
                        <a href={event.link || '#'} className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                          {event.learnMore || data.general?.viewDetails}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('overview')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Past Events */}
        {data.showPastEvents && data.pastEvents?.show && filteredPastEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.pastEvents?.title}</h2>
            <p className="text-gray-600 mb-6">{data.pastEvents?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPastEvents.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300">
                  <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                    {new Date(event.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <h3 className="font-semibold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.attendance}</p>
                </div>
              ))}
            </div>
            {data.pastEvents?.galleryButton?.show !== false && (
              <div className="mt-6 text-center">
                <button onClick={() => downloadFile(data.pastEvents.galleryButton?.link || '#', 'gallery.pdf')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.pastEvents?.galleryButton?.label}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('pastEvents')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Resources */}
        {data.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources?.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources?.description}</p>
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
        {data.showCta && data.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center relative">
            <h2 className="text-2xl font-bold mb-4">{data.cta?.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.cta?.description}
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

export default EventsPage;