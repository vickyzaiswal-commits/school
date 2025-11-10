"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Trophy,
  Users,
  Calendar,
  Award,
  Star,
  Shield,
  Book,
  Music,
  Palette,
  Heart,
  Activity,
  Brain,
  TrendingUp,
  Download,
  ChevronRight,
  Clock,
  Edit,
  X,
  Trash2,
  Plus
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const HouseSystemPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHouse, setSelectedHouse] = useState('ruby');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const role = 'admin'; // Should come from auth context

  // Icon mapping
  const iconMap = {
    Trophy,
    Users,
    Calendar,
    Award,
    Star,
    Shield,
    Book,
    Music,
    Palette,
    Heart,
    Activity,
    Brain,
    TrendingUp,
    Download,
    ChevronRight,
    Clock
  };

  // House symbols for dropdown
  const houseSymbols = [
    { value: "🦁", label: "🦁 Lion (Ruby)" },
    { value: "🌳", label: "🌳 Tree (Emerald)" },
    { value: "🐬", label: "🐬 Dolphin (Sapphire)" },
    { value: "🦅", label: "🦅 Eagle (Topaz)" },
    { value: "", label: "Custom (Enter manually)" }
  ];

  // Trend options for points
  const trendOptions = [
    { value: "up", label: "↑ Rising", style: "text-green-600 font-semibold" },
    { value: "down", label: "↓ Falling", style: "text-red-600 font-semibold" },
    { value: "stable", label: "→ Stable", style: "text-green-600 font-semibold" }
  ];

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    tabs: 'showTabs',
    overview: 'showOverview',
    houses: 'showHouses',
    competitions: 'showCompetitions',
    points: 'showPoints',
    resources: 'showResources',
    cta: 'showCta',
    labels: 'showLabels'
  };

  // Default data structure (from original houseSystemData)
  const defaultData = {
    showHero: true,
    showBenefits: true,
    showTabs: true,
    showOverview: true,
    showHouses: true,
    showCompetitions: true,
    showPoints: true,
    showResources: true,
    showCta: true,
    showLabels: true,
    hero: {
      show: true,
      title: "Our House System",
      subtitle: "Fostering camaraderie, competition, and character development through our vibrant house system since 1950.",
      showImage: false,
      backgroundImage: "",
      stats: [
        { value: "75+", label: "Years of Tradition", show: true },
        { value: "4", label: "Houses", show: true },
        { value: "100+", label: "Annual Events", show: true }
      ],
      ctaButton: {
        label: "Learn More About Houses",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why We Have a House System",
      subtitle: "The house system is a cornerstone of our school community, promoting values beyond the classroom",
      items: [
        { icon: "Users", title: "Community Building", description: "Fostering camaraderie and school spirit across grade levels", show: true },
        { icon: "Trophy", title: "Healthy Competition", description: "Encouraging students to strive for excellence in various fields", show: true },
        { icon: "Heart", title: "Leadership Development", description: "Providing opportunities for students to develop leadership skills", show: true },
        { icon: "Star", title: "Talent Recognition", description: "Showcasing diverse talents beyond academic achievements", show: true }
      ]
    },
    tabs: {
      show: true,
      items: [
        { id: "overview", name: "Overview", icon: "Shield", show: true },
        { id: "houses", name: "Houses", icon: "Users", show: true },
        { id: "competitions", name: "Competitions", icon: "Trophy", show: true },
        { id: "points", name: "Points", icon: "TrendingUp", show: true }
      ]
    },
    overview: {
      show: true,
      title: "House System Overview",
      subtitle: "Learn about our tradition of house competition and camaraderie",
      history: {
        show: true,
        title: "History & Tradition",
        content: [
          "The House System at St. Columba's has been a cherished tradition since 1950, when the school was founded. The system was established to create smaller communities within our larger school family, fostering closer relationships between students of different ages and backgrounds.",
          "Each of our four houses—Ruby, Emerald, Sapphire, and Topaz—represents different values and strengths, but all share the common goal of developing well-rounded individuals who contribute positively to their community.",
          "Over the decades, the house system has evolved to include a wide range of competitions and activities, but its core purpose remains the same: to build character, leadership, and school spirit."
        ]
      },
      system: {
        show: true,
        title: "How the System Works",
        steps: [
          { step: 1, title: "House Allocation", description: "New students are randomly allocated to one of the four houses, creating a balanced mix across grades.", show: true },
          { step: 2, title: "Points Competition", description: "Houses compete throughout the year in academic, sports, cultural, and service activities.", show: true },
          { step: 3, title: "Leadership Roles", description: "Senior students serve as House Captains, developing leadership skills and mentoring younger members.", show: true },
          { step: 4, title: "Annual Championship", description: "The house with the most points at year-end wins the prestigious House Championship Cup.", show: true }
        ]
      },
      captains: {
        show: true,
        title: "House Captains",
        viewProfileButton: "View Profile",
        items: [
          {
            name: "Aarav Patel",
            house: "Ruby",
            position: "Captain",
            grade: "XII-A",
            achievements: ["Basketball Team Captain", "Debate Club President", "National Science Olympiad Winner"],
            quote: "Ruby House teaches us that true strength comes from supporting each other.",
            show: true
          },
          {
            name: "Neha Verma",
            house: "Emerald",
            position: "Captain",
            grade: "XII-C",
            achievements: ["Student Council Secretary", "Math Olympiad Gold Medalist", "Environmental Club Head"],
            quote: "In Emerald, we grow together by sharing knowledge and supporting each other's dreams.",
            show: true
          },
          {
            name: "Siddharth Mehta",
            house: "Sapphire",
            position: "Captain",
            grade: "XII-D",
            achievements: ["School Band Lead", "Art Exhibition Winner", "Innovation Fair Champion"],
            quote: "Creativity is intelligence having fun - that's the Sapphire way!",
            show: true
          },
          {
            name: "Vikram Singh",
            house: "Topaz",
            position: "Captain",
            grade: "XII-B",
            achievements: ["Chess Team Captain", "Coding Competition Winner", "Robotics Club President"],
            quote: "Topaz teaches us to see the bigger picture and work strategically toward our goals.",
            show: true
          }
        ]
      }
    },
    houses: {
      show: true,
      title: "Our Houses",
      subtitle: "Learn about the unique identity and strengths of each house",
      items: {
        ruby: {
          name: "Ruby House",
          color: "bg-red-600",
          textColor: "text-white",
          borderColor: "border-red-600",
          symbol: "🦁",
          motto: "Courage and Strength",
          head: "Mr. Sharma",
          captain: "Aarav Patel (XII-A)",
          viceCaptain: "Priya Singh (XI-B)",
          points: 1245,
          strengths: ["Sports", "Debate", "Leadership"],
          description: "Ruby House is known for its courageous members who demonstrate strength in both physical and intellectual pursuits. Founded in 1952, Ruby has won the House Championship 15 times.",
          traditions: [
            "Annual Ruby House Dinner for all members",
            "Special cheer performed at all inter-house competitions",
            "Mentorship program pairing senior and junior members",
            "House-specific community service project each term"
          ],
          show: true
        },
        emerald: {
          name: "Emerald House",
          color: "bg-green-600",
          textColor: "text-white",
          borderColor: "border-green-600",
          symbol: "🌳",
          motto: "Growth and Wisdom",
          head: "Ms. Gupta",
          captain: "Neha Verma (XII-C)",
          viceCaptain: "Rahul Kumar (XI-A)",
          points: 1180,
          strengths: ["Academics", "Science", "Environment"],
          description: "Emerald House values growth, wisdom, and environmental consciousness. With a strong focus on academic excellence, Emerald has produced many scholarship winners.",
          traditions: [
            "Annual Emerald House Dinner for all members",
            "Special cheer performed at all inter-house competitions",
            "Mentorship program pairing senior and junior members",
            "House-specific community service project each term"
          ],
          show: true
        },
        sapphire: {
          name: "Sapphire House",
          color: "bg-blue-600",
          textColor: "text-white",
          borderColor: "border-blue-600",
          symbol: "🐬",
          motto: "Creativity and Flow",
          head: "Mr. Fernandez",
          captain: "Siddharth Mehta (XII-D)",
          viceCaptain: "Ananya Das (XI-C)",
          points: 1320,
          strengths: ["Arts", "Music", "Innovation"],
          description: "Sapphire House celebrates creativity, artistic expression, and innovative thinking. Known for dominating cultural events and art competitions.",
          traditions: [
            "Annual Sapphire House Dinner for all members",
            "Special cheer performed at all inter-house competitions",
            "Mentorship program pairing senior and junior members",
            "House-specific community service project each term"
          ],
          show: true
        },
        topaz: {
          name: "Topaz House",
          color: "bg-yellow-600",
          textColor: "text-white",
          borderColor: "border-yellow-600",
          symbol: "🦅",
          motto: "Vision and Perseverance",
          head: "Ms. Roberts",
          captain: "Vikram Singh (XII-B)",
          viceCaptain: "Meera Joshi (XI-D)",
          points: 1095,
          strengths: ["Mathematics", "Technology", "Chess"],
          description: "Topaz House embodies vision, strategy, and perseverance. With strong analytical skills, Topaz excels in mathematical and technological competitions.",
          traditions: [
            "Annual Topaz House Dinner for all members",
            "Special cheer performed at all inter-house competitions",
            "Mentorship program pairing senior and junior members",
            "House-specific community service project each term"
          ],
          show: true
        }
      }
    },
    competitions: {
      show: true,
      title: "Inter-House Competitions",
      subtitle: "Houses compete throughout the year in various events to earn points",
      pointsSystem: {
        show: true,
        title: "Points System Explained",
        rules: [
          "1st place receives 100% of available points",
          "2nd place receives 75% of available points",
          "3rd place receives 50% of available points",
          "4th place receives 25% of available points",
          "Participation points awarded for all entries",
          "Sportsmanship points awarded by faculty judges"
        ]
      },
      categories: [
        {
          category: "Sports",
          icon: "Activity",
          events: [
            { name: "Annual Sports Meet", points: 100, date: "Oct 15, 2025", show: true },
            { name: "Inter-House Basketball", points: 50, date: "Nov 10, 2025", show: true },
            { name: "Swimming Championship", points: 50, date: "Oct 20, 2025", show: true },
            { name: "Athletics Competition", points: 75, date: "Nov 5, 2025", show: true }
          ],
          show: true
        },
        {
          category: "Cultural",
          icon: "Music",
          events: [
            { name: "Annual Day Performance", points: 100, date: "Nov 20, 2025", show: true },
            { name: "Music Competition", points: 50, date: "Oct 8, 2025", show: true },
            { name: "Drama Festival", points: 75, date: "Oct 30, 2025", show: true },
            { name: "Dance Championship", points: 60, date: "Nov 15, 2025", show: true }
          ],
          show: true
        },
        {
          category: "Academic",
          icon: "Brain",
          events: [
            { name: "Science Exhibition", points: 75, date: "Oct 18, 2025", show: true },
            { name: "Quiz Competition", points: 50, date: "Nov 12, 2025", show: true },
            { name: "Debate Tournament", points: 60, date: "Oct 25, 2025", show: true },
            { name: "Math Olympiad", points: 50, date: "Nov 8, 2025", show: true }
          ],
          show: true
        },
        {
          category: "Art & Literature",
          icon: "Palette",
          events: [
            { name: "Art Exhibition", points: 50, date: "Oct 10, 2025", show: true },
            { name: "Creative Writing Contest", points: 40, date: "Nov 5, 2025", show: true },
            { name: "Poetry Slam", points: 40, date: "Oct 15, 2025", show: true },
            { name: "Photography Competition", points: 40, date: "Nov 18, 2025", show: true }
          ],
          show: true
        }
      ]
    },
    points: {
      show: true,
      title: "House Points Standings",
      subtitle: "Current points distribution across all houses",
      tableHeaders: [
        { label: "House", show: true },
        { label: "Total Points", show: true },
        { label: "Sports", show: true },
        { label: "Cultural", show: true },
        { label: "Academic", show: true },
        { label: "Art", show: true },
        { label: "Trend", show: true }
      ],
      breakdown: [
        {
          house: "Ruby",
          points: 1245,
          sports: 320,
          cultural: 280,
          academic: 385,
          art: 260,
          trend: "up",
          show: true
        },
        {
          house: "Emerald",
          points: 1180,
          sports: 270,
          cultural: 250,
          academic: 420,
          art: 240,
          trend: "down",
          show: true
        },
        {
          house: "Sapphire",
          points: 1320,
          sports: 290,
          cultural: 450,
          academic: 310,
          art: 270,
          trend: "up",
          show: true
        },
        {
          house: "Topaz",
          points: 1095,
          sports: 250,
          cultural: 220,
          academic: 395,
          art: 230,
          trend: "stable",
          show: true
        }
      ],
      recentEvents: {
        show: true,
        title: "Recent Point Events",
        events: [
          { description: "Sapphire won Music Competition", points: 50, show: true },
          { description: "Ruby placed 2nd in Basketball", points: 38, show: true },
          { description: "Emerald won Science Exhibition", points: 75, show: true },
          { description: "Topaz won Chess Tournament", points: 50, show: true }
        ]
      },
      upcomingEvents: {
        show: true,
        title: "Upcoming Point Opportunities",
        events: [
          { description: "Annual Sports Meet (Oct 15, 2025)", points: 100, show: true },
          { description: "Debate Tournament (Oct 25, 2025)", points: 60, show: true },
          { description: "Drama Festival (Oct 30, 2025)", points: 75, show: true },
          { description: "Art Exhibition (Nov 5, 2025)", points: 50, show: true }
        ]
      }
    },
    resources: {
      show: true,
      title: "House System Resources",
      subtitle: "Download guides, calendars, and information about the house system",
      downloadButton: "Download",
      items: [
        {
          title: "House System Handbook",
          description: "Complete guide to the house system rules and traditions",
          format: "PDF",
          size: "2.1 MB",
          icon: "Book",
          fileUrl: "",
          show: true
        },
        {
          title: "Competition Calendar",
          description: "Schedule of all inter-house events for 2025-26",
          format: "PDF",
          size: "1.5 MB",
          icon: "Calendar",
          fileUrl: "",
          show: true
        },
        {
          title: "Points System Guide",
          description: "Detailed explanation of how points are awarded",
          format: "PDF",
          size: "1.2 MB",
          icon: "TrendingUp",
          fileUrl: "",
          show: true
        },
        {
          title: "House Captain Application",
          description: "Form to apply for house leadership positions",
          format: "DOCX",
          size: "0.8 MB",
          icon: "Users",
          fileUrl: "",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Proud of Your House?",
      subtitle: "Show your house spirit and participate in upcoming competitions to earn points for your house",
      buttons: [
        { text: "View Competition Schedule", style: "primary", link: "#", show: true },
        { text: "Learn About House Leadership", style: "secondary", link: "#", show: true }
      ]
    },
    labels: {
      show: true,
      houseInformation: "House Information",
      symbol: "Symbol",
      houseHead: "House Head",
      captain: "Captain",
      viceCaptain: "Vice Captain",
      currentPoints: "Current Points",
      strengths: "Strengths",
      houseDescription: "House Description",
      houseTraditions: "House Traditions"
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
        const res = await apiRequest('save_data/get_all_house_data', {});
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

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(item => item.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredCaptains = data.overview?.captains?.items?.filter(captain => captain.show !== false) || [];
  const filteredHouses = Object.keys(data.houses?.items || {}).filter(key => data.houses?.items?.[key]?.show !== false);
  const filteredCategories = data.competitions?.categories?.filter(category => category.show !== false) || [];
  const filteredBreakdown = data.points?.breakdown?.filter(house => house.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const currentHouse = data.houses?.items?.[selectedHouse];

  // Helper to get house color
  const getHouseColor = (houseName) => {
    const colors = {
      Ruby: 'bg-red-500',
      Emerald: 'bg-green-500',
      Sapphire: 'bg-blue-500',
      Topaz: 'bg-yellow-500',
    };
    return colors[houseName] || 'bg-gray-500';
  };

  // Nested update helper - FIXED: Use immutable updates without full JSON clone to prevent re-render issues
  const updateByPath = useCallback((path, value) => {
    setEditData(prev => {
      if (!prev) return prev;
      const parts = path.split('.');
      const lastPart = parts.pop();
      let current = { ...prev };
      let parent = current;
      for (const part of parts) {
        if (parent[part] === undefined) {
          parent[part] = typeof value === 'object' ? (Array.isArray(value) ? [] : {}) : value;
        }
        parent = parent[part];
      }
      parent[lastPart] = value;
      return current;
    });
  }, []);

  // Updated array change handler - FIXED: Immutable updates, no full clone
  const handleArrayChange = useCallback((arrayPath, index, field, value) => {
    setEditData(prev => {
      if (!prev) return prev;
      const pathToArray = arrayPath.split('.');
      const lastKey = pathToArray.pop();
      let parent = { ...prev };
      let currentParent = parent;
      for (const part of pathToArray) {
        if (currentParent[part] === undefined) {
          currentParent[part] = {};
        }
        currentParent = currentParent[part];
      }
      let array = [...(currentParent[lastKey] || [])];
      const isStringUpdate = field === lastKey;
      if (isStringUpdate) {
        // Handle string arrays
        array[index] = value.includes('\n') ? value.split('\n').map(s => s.trim()).filter(Boolean) : [value];
      } else if (field === 'achievements' || field === 'strengths' || field === 'traditions' || field === 'rules' || field === 'content' || field === 'events') {
        // Handle comma-separated or special arrays
        const currentItem = { ...array[index] };
        if (Array.isArray(currentItem[field])) {
          currentItem[field] = value.split(',').map(i => i.trim()).filter(i => i);
        } else {
          currentItem[field] = value;
        }
        array[index] = currentItem;
      } else {
        const currentItem = { ...array[index] };
        currentItem[field] = value;
        array[index] = currentItem;
      }
      currentParent[lastKey] = array;
      return parent;
    });
  }, []);

  // Edit modal functions
  const openEditModal = (section) => {
    setEditSection(section);
   
    if (section === 'tabs') {
      // For tabs, include all tab-related data
      const tabsData = {
        showTabs: data.showTabs,
        tabs: data.tabs,
        showOverview: data.showOverview,
        overview: data.overview,
        showHouses: data.showHouses,
        houses: data.houses,
        showCompetitions: data.showCompetitions,
        competitions: data.competitions,
        showPoints: data.showPoints,
        points: data.points
      };
      setEditData(JSON.parse(JSON.stringify(tabsData)));
      setOriginalData(JSON.parse(JSON.stringify(tabsData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = {
        showSection: data[layoutKey],
        ...data[section]
      };
      setEditData(JSON.parse(JSON.stringify(sectionData)));
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    }
   
    setEditFormOpen(true);
  };

  const closeEditModal = () => {
    setEditFormOpen(false);
    setEditSection(null);
    setEditData({});
    setOriginalData(null);
  };

  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
   
    if (editSection === 'tabs') {
      // Update all tab-related data
      newData.showTabs = updatedData.showTabs;
      newData.tabs = updatedData.tabs;
      newData.showOverview = updatedData.showOverview;
      newData.overview = updatedData.overview;
      newData.showHouses = updatedData.showHouses;
      newData.houses = updatedData.houses;
      newData.showCompetitions = updatedData.showCompetitions;
      newData.competitions = updatedData.competitions;
      newData.showPoints = updatedData.showPoints;
      newData.points = updatedData.points;
    } else {
      const layoutKey = layoutMap[editSection];
      newData[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
   
    setData(newData);
    try {
      // Match payload shape used by other pages (e.g. canteen)
      await apiRequest('save_data/save_house_data', { payload: newData });
    } catch (error) {
      console.error('Save error:', error);
    }
    closeEditModal();
  };

  const cancelEdit = () => {
    if (originalData) {
      setEditData(originalData);
    }
    closeEditModal();
  };

  // Item Editor Component - FIXED: Use getNested helper
  const getNested = useCallback((obj, path) => {
    return path.split('.').reduce((current, part) => current?.[part], obj);
  }, []);

  const ItemEditor = (arrayKey, fields = [], isStringArray = false, options = {}) => {
    const items = getNested(editData, arrayKey) || (isStringArray ? [] : []);
    
    const removeItem = (index) => {
      setEditData(prev => {
        const newData = { ...prev };
        const parts = arrayKey.split('.');
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]] || {};
        }
        const arr = current[parts[parts.length - 1]] || [];
        current[parts[parts.length - 1]] = arr.filter((_, i) => i !== index);
        return newData;
      });
    };

    const addItem = () => {
      const newItem = isStringArray ? '' : (options.defaultItem || { show: true });
      setEditData(prev => {
        const newData = { ...prev };
        const parts = arrayKey.split('.');
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]] || {};
        }
        const arr = current[parts[parts.length - 1]] || [];
        current[parts[parts.length - 1]] = [...arr, newItem];
        return newData;
      });
    };

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Item {index + 1}</h4>
              <button onClick={() => removeItem(index)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {isStringArray ? (
              <textarea 
                value={item || ''} 
                onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} 
                placeholder="Enter items, one per line" 
                className="w-full p-2 border rounded mb-2" 
                rows="4" 
              />
            ) : (
              fields.filter(field => field !== 'id').map(field => (
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
                ) : field === 'fileUrl' ? (
                  <div key={field} className="mb-2">
                    <label className="block text-sm font-medium mb-1">Upload File</label>
                    <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} className="w-full" />
                    <input value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} placeholder="File URL" className="w-full p-2 border rounded mt-2" />
                  </div>
                ) : field === 'trend' ? (
                  <select 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    className="w-full p-2 border rounded mb-2"
                  >
                    <option value="">Select Trend</option>
                    {trendOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : (
                  <input 
                    key={field} 
                    value={item[field] || ''} 
                    onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                    placeholder={field} 
                    className="w-full p-2 border rounded mb-2" 
                  />
                )
              ))
            )}
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={item.show !== false} 
                onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} 
              />
              <span>Show Item</span>
            </label>
          </div>
        ))}
        <button onClick={addItem} className="flex items-center text-green-600">
          <Plus className="h-4 w-4 mr-2" /> Add New Item
        </button>
      </div>
    );
  };

  // Captain Editor Component
  const CaptainEditor = () => {
    const captains = getNested(editData, 'overview.captains.items') || [];
    const houses = ['Ruby', 'Emerald', 'Sapphire', 'Topaz'];
    return (
      <div className="space-y-6">
        {captains.map((captain, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-semibold mb-4">Captain {index + 1}</h4>
            <input
              value={captain.name || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'name', e.target.value)}
              placeholder="Name"
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={captain.house || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'house', e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Select House</option>
              {houses.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            <input
              value={captain.position || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'position', e.target.value)}
              placeholder="Position"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              value={captain.grade || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'grade', e.target.value)}
              placeholder="Grade"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={captain.quote || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'quote', e.target.value)}
              placeholder="Quote"
              className="w-full p-2 border rounded mb-2"
              rows="2"
            />
            <label className="block text-sm font-medium mb-2">Achievements (comma separated)</label>
            <textarea
              value={captain.achievements?.join(', ') || ''}
              onChange={(e) => handleArrayChange('overview.captains.items', index, 'achievements', e.target.value)}
              placeholder="Achievements"
              className="w-full p-2 border rounded mb-2"
              rows="3"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={captain.show !== false}
                onChange={(e) => handleArrayChange('overview.captains.items', index, 'show', e.target.checked)}
              />
              <span>Show Captain</span>
            </label>
          </div>
        ))}
        <button onClick={() => handleArrayChange('overview.captains.items', captains.length, 'name', '')} className="flex items-center text-green-600">
          <Plus className="h-4 w-4 mr-2" /> Add New Captain
        </button>
      </div>
    );
  };

  // House Editor Component
  const HouseEditor = () => {
    const houseKeys = ['ruby', 'emerald', 'sapphire', 'topaz'];
    return (
      <div className="space-y-6">
        {houseKeys.map(houseKey => {
          const house = getNested(editData, `houses.items.${houseKey}`) || {};
          return (
            <div key={houseKey} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-4">{houseKey.toUpperCase()} House</h4>
              <input
                value={house.name || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.name`, e.target.value)}
                placeholder="House Name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.color || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.color`, e.target.value)}
                placeholder="Color Class (e.g., bg-red-600)"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.textColor || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.textColor`, e.target.value)}
                placeholder="Text Color Class (e.g., text-white)"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.borderColor || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.borderColor`, e.target.value)}
                placeholder="Border Color Class (e.g., border-red-600)"
                className="w-full p-2 border rounded mb-2"
              />
              <select
                value={house.symbol || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.symbol`, e.target.value)}
                className="w-full p-2 border rounded mb-2"
              >
                {houseSymbols.map(sym => <option key={sym.value} value={sym.value}>{sym.label}</option>)}
              </select>
              <input
                value={house.motto || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.motto`, e.target.value)}
                placeholder="Motto"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.head || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.head`, e.target.value)}
                placeholder="House Head"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.captain || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.captain`, e.target.value)}
                placeholder="Captain"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={house.viceCaptain || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.viceCaptain`, e.target.value)}
                placeholder="Vice Captain"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                value={house.points || 0}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.points`, parseInt(e.target.value))}
                placeholder="Points"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={house.description || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.description`, e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded mb-2"
                rows="3"
              />
              <label className="block text-sm font-medium mb-2">Strengths (comma separated)</label>
              <textarea
                value={house.strengths?.join(', ') || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.strengths`, e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                placeholder="Strengths"
                className="w-full p-2 border rounded mb-2"
                rows="2"
              />
              <label className="block text-sm font-medium mb-2">Traditions (one per line)</label>
              <textarea
                value={house.traditions?.join('\n') || ''}
                onChange={(e) => updateByPath(`houses.items.${houseKey}.traditions`, e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                placeholder="Traditions"
                className="w-full p-2 border rounded mb-2"
                rows="4"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={house.show !== false}
                  onChange={(e) => updateByPath(`houses.items.${houseKey}.show`, e.target.checked)}
                />
                <span>Show House</span>
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  // Modal Header Component
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">Edit {title}</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button onClick={onCancel} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
        Cancel
      </button>
      <button onClick={onSave} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
        Save Changes
      </button>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={editSection.charAt(0).toUpperCase() + editSection.slice(1)} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {editSection !== 'tabs' && editSection !== 'labels' && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={editData.showSection !== false} 
                      onChange={(e) => updateByPath('showSection', e.target.checked)} 
                    />
                    <span>Show Section</span>
                  </label>
                </div>
              )}
              
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={getNested(editData, 'title') || ''} onChange={(e) => updateByPath('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={getNested(editData, 'subtitle') || ''} onChange={(e) => updateByPath('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />                
                  <div>
                    <label className="block text-sm font-medium mb-2">Background Image</label>
                    <FileUpload initialValue={getNested(editData, 'backgroundImage') || ''} onUpload={(url) => updateByPath('backgroundImage', url)} className="w-full mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={getNested(editData, 'showImage') !== false} onChange={(e) => updateByPath('showImage', e.target.checked)} />
                      <span>Show Background Image</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CTA Button Label</label>
                    <input value={getNested(editData, 'ctaButton.label') || ''} onChange={(e) => updateByPath('ctaButton.label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={getNested(editData, 'ctaButton.link') || ''} onChange={(e) => updateByPath('ctaButton.link', e.target.value)} placeholder="Button Link" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={getNested(editData, 'ctaButton.show') !== false} onChange={(e) => updateByPath('ctaButton.show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                  </div>
                  {ItemEditor('stats', ['value', 'label'])}
                </div>
              )}

              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={getNested(editData, 'title') || ''} onChange={(e) => updateByPath('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={getNested(editData, 'subtitle') || ''} onChange={(e) => updateByPath('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}

              {editSection === 'resources' && (
                <div className="space-y-4">
                  <input value={getNested(editData, 'title') || ''} onChange={(e) => updateByPath('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={getNested(editData, 'subtitle') || ''} onChange={(e) => updateByPath('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={getNested(editData, 'downloadButton') || ''} onChange={(e) => updateByPath('downloadButton', e.target.value)} placeholder="Download Button Text" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'description', 'format', 'size', 'icon', 'fileUrl'], false, { allowFileUpload: true })}
                </div>
              )}

              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={getNested(editData, 'title') || ''} onChange={(e) => updateByPath('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={getNested(editData, 'subtitle') || ''} onChange={(e) => updateByPath('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text', 'style', 'link'], false, { allowFileUpload: false })}
                </div>
              )}

              {editSection === 'labels' && (
                <div className="space-y-4">
                  <input value={getNested(editData, 'houseInformation') || ''} onChange={(e) => updateByPath('houseInformation', e.target.value)} placeholder="House Information Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'symbol') || ''} onChange={(e) => updateByPath('symbol', e.target.value)} placeholder="Symbol Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'houseHead') || ''} onChange={(e) => updateByPath('houseHead', e.target.value)} placeholder="House Head Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'captain') || ''} onChange={(e) => updateByPath('captain', e.target.value)} placeholder="Captain Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'viceCaptain') || ''} onChange={(e) => updateByPath('viceCaptain', e.target.value)} placeholder="Vice Captain Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'currentPoints') || ''} onChange={(e) => updateByPath('currentPoints', e.target.value)} placeholder="Current Points Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'strengths') || ''} onChange={(e) => updateByPath('strengths', e.target.value)} placeholder="Strengths Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'houseDescription') || ''} onChange={(e) => updateByPath('houseDescription', e.target.value)} placeholder="House Description Label" className="w-full p-2 border rounded" />
                  <input value={getNested(editData, 'houseTraditions') || ''} onChange={(e) => updateByPath('houseTraditions', e.target.value)} placeholder="House Traditions Label" className="w-full p-2 border rounded" />
                </div>
              )}

              {editSection === 'tabs' && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={getNested(editData, 'showTabs') !== false} onChange={(e) => updateByPath('showTabs', e.target.checked)} />
                      <span>Show Tabs Section</span>
                    </label>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tabs Navigation</h3>
                    {ItemEditor('tabs.items', ['id', 'name', 'icon'])}
                  </div>

                  {/* Overview Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={getNested(editData, 'showOverview') !== false} onChange={(e) => updateByPath('showOverview', e.target.checked)} />
                      <span className="text-lg font-semibold">Overview Tab</span>
                    </div>
                    <input value={getNested(editData, 'overview.title') || ''} onChange={(e) => updateByPath('overview.title', e.target.value)} placeholder="Overview Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={getNested(editData, 'overview.subtitle') || ''} onChange={(e) => updateByPath('overview.subtitle', e.target.value)} placeholder="Overview Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    <div className="ml-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">History Section Title</label>
                        <input value={getNested(editData, 'overview.history.title') || ''} onChange={(e) => updateByPath('overview.history.title', e.target.value)} placeholder="History Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'overview.history.show') !== false} onChange={(e) => updateByPath('overview.history.show', e.target.checked)} />
                          <span>Show History</span>
                        </label>
                        <textarea value={getNested(editData, 'overview.history.content')?.join('\n') || ''} onChange={(e) => updateByPath('overview.history.content', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} placeholder="Content (one paragraph per line)" className="w-full p-2 border rounded" rows="6" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">System Section Title</label>
                        <input value={getNested(editData, 'overview.system.title') || ''} onChange={(e) => updateByPath('overview.system.title', e.target.value)} placeholder="System Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'overview.system.show') !== false} onChange={(e) => updateByPath('overview.system.show', e.target.checked)} />
                          <span>Show System</span>
                        </label>
                        {ItemEditor('overview.system.steps', ['step', 'title', 'description'])}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Captains Section Title</label>
                        <input value={getNested(editData, 'overview.captains.title') || ''} onChange={(e) => updateByPath('overview.captains.title', e.target.value)} placeholder="Captains Title" className="w-full p-2 border rounded mb-2" />
                        <input value={getNested(editData, 'overview.captains.viewProfileButton') || ''} onChange={(e) => updateByPath('overview.captains.viewProfileButton', e.target.value)} placeholder="View Profile Button" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'overview.captains.show') !== false} onChange={(e) => updateByPath('overview.captains.show', e.target.checked)} />
                          <span>Show Captains</span>
                        </label>
                        <CaptainEditor />
                      </div>
                    </div>
                  </div>

                  {/* Houses Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={getNested(editData, 'showHouses') !== false} onChange={(e) => updateByPath('showHouses', e.target.checked)} />
                      <span className="text-lg font-semibold">Houses Tab</span>
                    </div>
                    <input value={getNested(editData, 'houses.title') || ''} onChange={(e) => updateByPath('houses.title', e.target.value)} placeholder="Houses Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={getNested(editData, 'houses.subtitle') || ''} onChange={(e) => updateByPath('houses.subtitle', e.target.value)} placeholder="Houses Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    <div className="ml-6">
                      <HouseEditor />
                    </div>
                  </div>

                  {/* Competitions Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={getNested(editData, 'showCompetitions') !== false} onChange={(e) => updateByPath('showCompetitions', e.target.checked)} />
                      <span className="text-lg font-semibold">Competitions Tab</span>
                    </div>
                    <input value={getNested(editData, 'competitions.title') || ''} onChange={(e) => updateByPath('competitions.title', e.target.value)} placeholder="Competitions Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={getNested(editData, 'competitions.subtitle') || ''} onChange={(e) => updateByPath('competitions.subtitle', e.target.value)} placeholder="Competitions Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    <div className="ml-6 space-y-4">
                      {ItemEditor('competitions.categories', ['category', 'icon'], false, { defaultItem: { events: [] } })}
                      {getNested(editData, 'competitions.categories')?.map((cat, catIndex) => (
                        <div key={catIndex} className="ml-4 border p-4 rounded">
                          <h5>Events for {cat.category}</h5>
                          {ItemEditor(`competitions.categories.${catIndex}.events`, ['name', 'points', 'date'])}
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm font-medium mb-2">Points System Title</label>
                        <input value={getNested(editData, 'competitions.pointsSystem.title') || ''} onChange={(e) => updateByPath('competitions.pointsSystem.title', e.target.value)} placeholder="Points System Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'competitions.pointsSystem.show') !== false} onChange={(e) => updateByPath('competitions.pointsSystem.show', e.target.checked)} />
                          <span>Show Points System</span>
                        </label>
                        <textarea value={getNested(editData, 'competitions.pointsSystem.rules')?.join('\n') || ''} onChange={(e) => updateByPath('competitions.pointsSystem.rules', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))} placeholder="Rules (one per line)" className="w-full p-2 border rounded" rows="6" />
                      </div>
                    </div>
                  </div>

                  {/* Points Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={getNested(editData, 'showPoints') !== false} onChange={(e) => updateByPath('showPoints', e.target.checked)} />
                      <span className="text-lg font-semibold">Points Tab</span>
                    </div>
                    <input value={getNested(editData, 'points.title') || ''} onChange={(e) => updateByPath('points.title', e.target.value)} placeholder="Points Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={getNested(editData, 'points.subtitle') || ''} onChange={(e) => updateByPath('points.subtitle', e.target.value)} placeholder="Points Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    <div className="ml-6 space-y-4">
                      {ItemEditor('points.tableHeaders', ['label'])}
                      {ItemEditor('points.breakdown', ['house', 'points', 'sports', 'cultural', 'academic', 'art', 'trend'])}
                      <div>
                        <label className="block text-sm font-medium mb-2">Recent Events Title</label>
                        <input value={getNested(editData, 'points.recentEvents.title') || ''} onChange={(e) => updateByPath('points.recentEvents.title', e.target.value)} placeholder="Recent Events Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'points.recentEvents.show') !== false} onChange={(e) => updateByPath('points.recentEvents.show', e.target.checked)} />
                          <span>Show Recent Events</span>
                        </label>
                        {ItemEditor('points.recentEvents.events', ['description', 'points'])}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Upcoming Events Title</label>
                        <input value={getNested(editData, 'points.upcomingEvents.title') || ''} onChange={(e) => updateByPath('points.upcomingEvents.title', e.target.value)} placeholder="Upcoming Events Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={getNested(editData, 'points.upcomingEvents.show') !== false} onChange={(e) => updateByPath('points.upcomingEvents.show', e.target.checked)} />
                          <span>Show Upcoming Events</span>
                        </label>
                        {ItemEditor('points.upcomingEvents.events', ['description', 'points'])}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
  <section className={`relative ${data.hero.height || ''} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden ${editMode ? 'pr-12' : ''}`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero.showImage && data.hero.backgroundImage && (
            <img src={data.hero.backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl mb-8 leading-relaxed">{data.hero.subtitle}</p>
              {data.hero.stats?.filter(stat => stat.show !== false).length > 0 && (
                <div className="flex flex-wrap gap-6 mb-8">
                  {data.hero.stats?.filter(stat => stat.show !== false).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.hero.ctaButton?.show !== false && (
                <a 
                  href={data.hero.ctaButton?.link || '#'} 
                  className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {data.hero.ctaButton?.label}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Benefits Section */}
      {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
        <section className={`py-16 bg-gray-50 relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Navigation */}
      {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
        <section className={`py-4 bg-gray-50 z-10 shadow-sm relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div role="tablist" aria-label="House tabs" className="-mx-4 px-4 overflow-x-auto no-scrollbar">
              <div className="inline-flex items-center space-x-3">
                {filteredTabs.map((tab, idx) => {
                  const IconComponent = iconMap[tab.icon];
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') {
                          const next = filteredTabs[(idx + 1) % filteredTabs.length];
                          setActiveTab(next.id);
                        } else if (e.key === 'ArrowLeft') {
                          const prev = filteredTabs[(idx - 1 + filteredTabs.length) % filteredTabs.length];
                          setActiveTab(prev.id);
                        } else if (e.key === 'Home') {
                          setActiveTab(filteredTabs[0].id);
                        } else if (e.key === 'End') {
                          setActiveTab(filteredTabs[filteredTabs.length - 1].id);
                        }
                      }}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-300 ${isActive ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-green-50'}`}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Content */}
      {data.showTabs && (
        <section className={`py-16 bg-white relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && data.showOverview && data.overview?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.overview.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.overview.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {data.overview.history?.show && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{data.overview.history.title}</h4>
                      <div className="prose prose-lg text-gray-600">
                        {data.overview.history.content?.map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.overview.system?.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{data.overview.system.title}</h4>
                      <div className="space-y-4">
                        {data.overview.system.steps?.filter(step => step.show !== false).map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                              {step.step}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{step.title}</h5>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {data.overview.captains?.show && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{data.overview.captains.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredCaptains.map((captain, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                          <div className={`w-16 h-16 ${getHouseColor(captain.house)} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold`}>
                            {captain.house.charAt(0)}
                          </div>
                          <h5 className="font-semibold text-gray-800">{captain.name}</h5>
                          <p className="text-sm text-gray-600 mb-2">{captain.position}, {captain.house} House</p>
                          <p className="text-xs text-gray-500 mb-4">Grade {captain.grade}</p>
                          <div className="bg-gray-50 p-3 rounded-lg mb-3">
                            <p className="text-sm text-gray-700 italic">"{captain.quote}"</p>
                          </div>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            {data.overview.captains.viewProfileButton} <ChevronRight className="inline h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Houses Tab */}
            {activeTab === 'houses' && data.showHouses && data.houses?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.houses.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.houses.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                  {filteredHouses.map(houseKey => (
                    <button
                      key={houseKey}
                      onClick={() => setSelectedHouse(houseKey)}
                      className={`p-4 rounded-lg transition-all text-left ${
                        selectedHouse === houseKey
                          ? `${data.houses.items[houseKey].color} ${data.houses.items[houseKey].textColor} shadow-md`
                          : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="font-semibold mb-1">{data.houses.items[houseKey].name}</div>
                      <div className="text-sm opacity-80">{data.houses.items[houseKey].motto}</div>
                    </button>
                  ))}
                </div>

                {currentHouse && currentHouse.show !== false && (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className={`${currentHouse.color} ${currentHouse.textColor} p-6`}>
                      <h4 className="text-2xl font-bold mb-2">{currentHouse.name}</h4>
                      <p className="text-lg opacity-90">{currentHouse.motto}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">{data.labels.houseInformation}</h5>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Shield className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{data.labels.symbol}: <strong>{currentHouse.symbol}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{data.labels.houseHead}: <strong>{currentHouse.head}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Award className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{data.labels.captain}: <strong>{currentHouse.captain}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{data.labels.viceCaptain}: <strong>{currentHouse.viceCaptain}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{data.labels.currentPoints}: <strong>{currentHouse.points}</strong></span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">{data.labels.strengths}</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {currentHouse.strengths?.map((strength, index) => (
                              <span key={index} className={`${currentHouse.color} bg-opacity-10 ${currentHouse.textColor} px-3 py-1 rounded-full text-sm`}>
                                {strength}
                              </span>
                            ))}
                          </div>
                          
                          <h5 className="font-semibold text-gray-800 mb-3">{data.labels.houseDescription}</h5>
                          <p className="text-gray-600">{currentHouse.description}</p>
                        </div>
                      </div>
                      
                      <div className={`border-t ${currentHouse.borderColor} pt-4`}>
                        <h5 className="font-semibold text-gray-800 mb-3">{data.labels.houseTraditions}</h5>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {currentHouse.traditions?.map((tradition, index) => (
                            <li key={index}>{tradition}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Competitions Tab */}
            {activeTab === 'competitions' && data.showCompetitions && data.competitions?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.competitions.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.competitions.subtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {filteredCategories.map((category, index) => {
                    const IconComponent = iconMap[category.icon];
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">{category.category}</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {category.events?.filter(event => event.show !== false).map((event, eventIndex) => (
                            <div key={eventIndex} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                              <div>
                                <h5 className="font-medium text-gray-800">{event.name}</h5>
                                <p className="text-sm text-gray-600">{event.date}</p>
                              </div>
                              <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                                {event.points} pts
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {data.competitions.pointsSystem?.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">{data.competitions.pointsSystem.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      {data.competitions.pointsSystem.rules?.map((rule, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                          </div>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Points Tab */}
            {activeTab === 'points' && data.showPoints && data.points?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.points.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.points.subtitle}</p>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {data.points.tableHeaders?.filter(header => header.show !== false).map((header, index) => (
                          <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBreakdown.map((house, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 ${getHouseColor(house.house)} rounded-full mr-3`}></div>
                              <div className="font-medium text-gray-900">{house.house}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-green-600">{house.points}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.sports}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.cultural}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.academic}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.art}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {trendOptions.find(option => option.value === house.trend)?.label ? (
                              <span className={trendOptions.find(option => option.value === house.trend).style}>
                                {trendOptions.find(option => option.value === house.trend).label}
                              </span>
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data.points.recentEvents?.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-4">{data.points.recentEvents.title}</h4>
                      <div className="space-y-3">
                        {data.points.recentEvents.events?.filter(event => event.show !== false).map((event, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{event.description}</span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">+{event.points} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.points.upcomingEvents?.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-4">{data.points.upcomingEvents.title}</h4>
                      <div className="space-y-3">
                        {data.points.upcomingEvents.events?.filter(event => event.show !== false).map((event, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{event.description}</span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">{event.points} pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          {editMode && activeTab !== 'overview' && <button onClick={() => openEditModal(activeTab)} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Resources Section */}
      {data.showResources && data.resources?.show && filteredResources.length > 0 && (
        <section className={`py-16 bg-gray-50 relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
              <p className="text-lg text-gray-600">{data.resources.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon];
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
                    {resource.fileUrl ? (
                      <a
                        href={resource.fileUrl}
                        download={resource.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                      >
                        {data.resources.downloadButton}
                        <Download className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 mt-4 block">No file available</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* CTA Section */}
      {data.showCta && data.cta?.show && (
        <section className={`py-16 bg-gradient-to-r from-green-800 to-green-700 text-white relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.link || '#'}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.style === 'primary'
                      ? 'bg-white text-green-700 hover:bg-gray-100'
                      : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Edit Labels Button (Global) */}
      {editMode && data.showLabels && (
        <button onClick={() => openEditModal('labels')} className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50">
          <Edit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default HouseSystemPage;