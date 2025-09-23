"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Home,
  Users,
  BookOpen,
  Calendar,
  Download as DownloadIcon,
  Camera,
  Phone,
  Award,
  FileText,
  GraduationCap,
  Clock,
  Target,
  UserCheck,
  Building,
  Trophy,
  Book,
  Library,
  Calculator,
  Palette,
  Music,
  Activity,
  Bus,
  ShieldCheck,
  Utensils,
  Star,
  Save,
  Bookmark,
  Eye,
  AlertCircle,
  Settings
} from 'lucide-react';

const Navigation = ({ schoolData = {} }) => {
  const role = 'admin'; // Change to 'user' for non-admin
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [config, setConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const dropdownRefs = useRef({});

  // Icon mapping to restore components after deserialization
  const iconMap = {
    Home,
    Users,
    BookOpen,
    Calendar,
    DownloadIcon,
    Camera,
    Phone,
    Award,
    FileText,
    GraduationCap,
    Clock,
    Target,
    UserCheck,
    Building,
    Trophy,
    Book,
    Library,
    Calculator,
    Palette,
    Music,
    Activity,
    Bus,
    ShieldCheck,
    Utensils,
    Star,
    Save,
    Bookmark,
    Eye,
    AlertCircle,
    Settings,
    ArrowRight,
    ChevronDown,
    Menu,
    X
  };

  // Default navigation structure
  const defaultNavItems = [
    { 
      name: 'Home', 
      href: '/',
      icon: 'Home',
      show: true
    },
    { 
      name: 'About Us', 
      href: '/about',
      icon: 'Users',
      show: true,
      dropdown: [
        { 
          name: 'Our History', 
          href: '/about/history', 
          desc: 'School legacy', 
          icon: 'Clock',
          show: true
        },
        { 
          name: 'Vision & Mission', 
          href: '/about/vision-mission', 
          desc: 'Our guiding principles', 
          icon: 'Target',
          show: true
        },
        { 
          name: 'Principal\'s Message', 
          href: '/about/principal-message', 
          desc: 'Leadership perspective', 
          icon: 'UserCheck',
          show: true
        },
        { 
          name: 'School Infrastructure', 
          href: '/about/infrastructure', 
          desc: 'Campus facilities', 
          icon: 'Building',
          show: true
        }
      ]
    },
    { 
      name: 'Academics', 
      href: '/academics',
      icon: 'BookOpen',
      show: true,
      dropdown: [
        { 
          name: 'Curriculum', 
          href: '/academics/curriculum', 
          desc: 'Academic framework', 
          icon: 'Book',
          show: true
        },
        { 
          name: 'Primary School', 
          href: '/academics/primary', 
          desc: 'Foundation years', 
          icon: 'GraduationCap',
          show: true
        },
        { 
          name: 'Middle School', 
          href: '/academics/middle', 
          desc: 'Developing skills', 
          icon: 'Calculator',
          show: true
        },
        { 
          name: 'Senior School', 
          href: '/academics/senior', 
          desc: 'Specialized learning', 
          icon: 'Library',
          show: true
        }
      ]
    },
    { 
      name: 'Admissions', 
      href: '/admissions',
      icon: 'FileText',
      show: true,
      dropdown: [
        { 
          name: 'Admission Process', 
          href: '/admissions/process', 
          desc: 'Step-by-step guide', 
          icon: 'ArrowRight',
          show: true
        },
        { 
          name: 'Application Form', 
          href: '/admissions/application', 
          desc: 'Apply online', 
          icon: 'FileText',
          show: true
        },
        { 
          name: 'Fee Structure', 
          href: '/admissions/fees', 
          desc: 'Financial information', 
          icon: 'Calculator',
          show: true
        }
      ]
    },
    { 
      name: 'Co-Curricular', 
      href: '/co-curricular',
      icon: 'Palette',
      show: true,
      dropdown: [
        { 
          name: 'Sports', 
          href: '/co-curricular/sports', 
          desc: 'Physical education programs', 
          icon: 'Activity',
          show: true
        },
        { 
          name: 'Arts & Culture', 
          href: '/co-curricular/arts', 
          desc: 'Creative expression', 
          icon: 'Palette',
          show: true
        },
        { 
          name: 'Music & Dance', 
          href: '/co-curricular/music', 
          desc: 'Performing arts', 
          icon: 'Music',
          show: true
        },
        { 
          name: 'Clubs & Societies', 
          href: '/co-curricular/clubs', 
          desc: 'Student organizations', 
          icon: 'Users',
          show: true
        },
        { 
          name: 'Competitions', 
          href: '/co-curricular/competitions', 
          desc: 'Inter-school events', 
          icon: 'Trophy',
          show: true
        },
        { 
          name: 'Annual Events', 
          href: '/co-curricular/events', 
          desc: 'School celebrations', 
          icon: 'Star',
          show: true
        }
      ]
    },
    { 
      name: 'Student Life', 
      href: '/student-life',
      icon: 'Users',
      show: true,
      dropdown: [
        { 
          name: 'School Timings', 
          href: '/student-life/timings', 
          desc: 'Daily schedule', 
          icon: 'Clock',
          show: true
        },
        { 
          name: 'School Calendar', 
          href: '/student-life/calendar', 
          desc: 'Academic year events', 
          icon: 'Calendar',
          show: true
        },
        { 
          name: 'Transport', 
          href: '/student-life/transport', 
          desc: 'Bus routes & fees', 
          icon: 'Bus',
          show: true
        },
        { 
          name: 'Canteen', 
          href: '/student-life/canteen', 
          desc: 'Meal services', 
          icon: 'Utensils',
          show: true
        },
        { 
          name: 'House System', 
          href: '/student-life/houses', 
          desc: 'Inter-house activities', 
          icon: 'Building',
          show: true
        },
        { 
          name: 'Student Council', 
          href: '/student-life/council', 
          desc: 'Leadership opportunities', 
          icon: 'Award',
          show: true
        }
      ]
    },
    { 
      name: 'Gallery', 
      href: '/gallery',
      icon: 'Camera',
      show: true
    },
    { 
      name: 'Downloads', 
      href: '/downloads',
      icon: 'DownloadIcon',
      show: true,
      dropdown: [
        { 
          name: 'Forms & Applications', 
          href: '/downloads/forms', 
          desc: 'Official documents', 
          icon: 'FileText',
          show: true
        },
        { 
          name: 'Syllabus & Curriculum', 
          href: '/downloads/syllabus', 
          desc: 'Academic materials', 
          icon: 'Book',
          show: true
        },
        { 
          name: 'Fee Structure', 
          href: '/downloads/fee-structure', 
          desc: 'Payment information', 
          icon: 'Calculator',
          show: true
        },
        { 
          name: 'School Policies', 
          href: '/downloads/policies', 
          desc: 'Rules & guidelines', 
          icon: 'ShieldCheck',
          show: true
        }
      ]
    },
    { 
      name: 'Contact Us', 
      href: '/contact',
      icon: 'Phone',
      show: true
    }
  ];

  // Function to map icon strings to components
  const mapIconsToComponents = (items) => {
    return items.map(item => ({
      ...item,
      icon: iconMap[item.icon] || Home, // Fallback to Home if icon not found
      dropdown: item.dropdown ? item.dropdown.map(sub => ({
        ...sub,
        icon: iconMap[sub.icon] || Home // Fallback to Home if icon not found
      })) : undefined
    }));
  };

  // Initialize config with defaultNavItems
  useEffect(() => {
    const savedConfig = localStorage.getItem('navigationConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(mapIconsToComponents(parsedConfig));
    } else {
      const mergedNavItems = schoolData.navigationItems || defaultNavItems;
      setConfig(mapIconsToComponents(mergedNavItems));
    }
  }, []); // Empty dependency array to run only on mount

  // Update config only if schoolData.navigationItems changes
  useEffect(() => {
    if (schoolData.navigationItems) {
      const prevConfig = JSON.stringify(config);
      const newConfig = JSON.stringify(schoolData.navigationItems);
      if (prevConfig !== newConfig) {
        setConfig(mapIconsToComponents(schoolData.navigationItems));
      }
    }
  }, [schoolData.navigationItems]); // Only depend on schoolData.navigationItems

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setPreviewMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // Handle scroll for sticky navigation
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(ref => 
        ref && !ref.contains(event.target)
      );
      if (isOutside) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setActiveDropdown(null);
  };

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Filter items based on show property
  const filteredNavItems = config ? config.filter(item => item.show !== false) : [];

  // Handle configuration changes
  const handleInputChange = (index, field, value) => {
    setConfig(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    setErrors(prev => ({ ...prev, [`${index}-${field}`]: null }));
  };

  const handleSubItemChange = (mainIndex, subIndex, field, value) => {
    setConfig(prev => prev.map((item, i) => {
      if (i === mainIndex && item.dropdown) {
        return {
          ...item,
          dropdown: item.dropdown.map((sub, j) => j === subIndex ? { ...sub, [field]: value } : sub)
        };
      }
      return item;
    }));
    setErrors(prev => ({ ...prev, [`${mainIndex}-${subIndex}-${field}`]: null }));
  };

  const handleToggle = (index, field) => {
    setConfig(prev => prev.map((item, i) => i === index ? { ...item, [field]: !item[field] } : item));
  };

  const handleSubItemToggle = (mainIndex, subIndex, field) => {
    setConfig(prev => prev.map((item, i) => {
      if (i === mainIndex && item.dropdown) {
        return {
          ...item,
          dropdown: item.dropdown.map((sub, j) => j === subIndex ? { ...sub, [field]: !sub[field] } : sub)
        };
      }
      return item;
    }));
  };

  // Validate configuration
  const validateConfig = () => {
    const newErrors = {};
    if (!config || config.filter(item => item.show).length === 0) {
      newErrors.general = 'At least one navigation item must be visible';
    }
    config.forEach((item, index) => {
      if (item.show) {
        if (!item.name.trim()) {
          newErrors[`${index}-name`] = 'Navigation item name is required';
        }
        if (!item.href.trim()) {
          newErrors[`${index}-href`] = 'Navigation item URL is required';
        }
        if (item.dropdown) {
          item.dropdown.forEach((sub, subIndex) => {
            if (sub.show) {
              if (!sub.name.trim()) {
                newErrors[`${index}-${subIndex}-name`] = `Sub-item name is required for ${item.name}`;
              }
              if (!sub.href.trim()) {
                newErrors[`${index}-${subIndex}-href`] = `Sub-item URL is required for ${item.name}`;
              }
            }
          });
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save configuration
  const handleSave = () => {
    if (validateConfig()) {
      // Store config without icon components to avoid serialization issues
      const configToSave = config.map(item => ({
        ...item,
        icon: Object.keys(iconMap).find(key => iconMap[key] === item.icon) || 'Home',
        dropdown: item.dropdown ? item.dropdown.map(sub => ({
          ...sub,
          icon: Object.keys(iconMap).find(key => iconMap[key] === sub.icon) || 'Home'
        })) : undefined
      }));
      localStorage.setItem('navigationConfig', JSON.stringify(configToSave));
      alert('Configuration saved successfully!');
      setPreviewMode(false);
      setEditFormOpen(false);
    } else {
      alert('Please fix validation errors before saving.');
    }
  };

  // Download configuration
  const handleDownload = () => {
    if (validateConfig()) {
      const configToSave = config.map(item => ({
        ...item,
        icon: Object.keys(iconMap).find(key => iconMap[key] === item.icon) || 'Home',
        dropdown: item.dropdown ? item.dropdown.map(sub => ({
          ...sub,
          icon: Object.keys(iconMap).find(key => iconMap[key] === sub.icon) || 'Home'
        })) : undefined
      }));
      const dataStr = JSON.stringify(configToSave, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `navigation-config-${new Date().toISOString().split('T')[0]}.json`;
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else {
      alert('Please fix validation errors before downloading.');
    }
  };

  // Save and exit
  const handleSaveExit = () => {
    if (validateConfig()) {
      const configToSave = config.map(item => ({
        ...item,
        icon: Object.keys(iconMap).find(key => iconMap[key] === item.icon) || 'Home',
        dropdown: item.dropdown ? item.dropdown.map(sub => ({
          ...sub,
          icon: Object.keys(iconMap).find(key => iconMap[key] === sub.icon) || 'Home'
        })) : undefined
      }));
      localStorage.setItem('navigationConfig', JSON.stringify(configToSave));
      alert('Configuration saved! Redirecting to homepage.');
      window.location.href = '/';
    } else {
      alert('Please fix validation errors before saving.');
    }
  };

  // Reset to default
  const handleReset = () => {
    setConfig(mapIconsToComponents(defaultNavItems));
    setErrors({});
    alert('Configuration reset to default.');
  };

  // Render edit form for admins
  const renderEditForm = () => (
    <div className="space-y-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Navigation Configuration</h2>
        <button
          onClick={() => setEditFormOpen(false)}
          className="text-gray-600 hover:text-gray-800"
          aria-label="Close configuration"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-6">
        {config.map((item, index) => (
          <div key={item.name} className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={item.show}
                onChange={() => handleToggle(index, 'show')}
                className="mr-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">Main Item: {item.name}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-name`] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[`${index}-name`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-name`]}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => handleInputChange(index, 'href', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-href`] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[`${index}-href`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-href`]}</p>}
              </div>
            </div>
            {item.dropdown && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Dropdown Items</h4>
                <div className="ml-6 space-y-3">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div key={subItem.name} className="border rounded p-3 bg-gray-50">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={subItem.show}
                          onChange={() => handleSubItemToggle(index, subIndex, 'show')}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">{subItem.name}</span>
                      </div>
                      {subItem.show && (
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Item Name *</label>
                            <input
                              type="text"
                              value={subItem.name}
                              onChange={(e) => handleSubItemChange(index, subIndex, 'name', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-${subIndex}-name`] ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors[`${index}-${subIndex}-name`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-${subIndex}-name`]}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Item URL *</label>
                            <input
                              type="text"
                              value={subItem.href}
                              onChange={(e) => handleSubItemChange(index, subIndex, 'href', e.target.value)}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-${subIndex}-href`] ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors[`${index}-${subIndex}-href`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-${subIndex}-href`]}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={subItem.desc}
                              onChange={(e) => handleSubItemChange(index, subIndex, 'desc', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {errors.general && <p className="text-red-500 text-sm mt-4">{errors.general}</p>}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Reset to Default
          <Settings className="ml-2 h-4 w-4" />
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            {previewMode ? 'Edit Configuration' : 'Preview Configuration'}
            <Eye className="ml-2 h-4 w-4" />
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Save Configuration
            <Save className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Render navigation for preview or normal view
  const renderNavigation = () => (
    <nav className={`bg-white shadow-sm border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon; // Use the icon component directly
              return (
                <div key={item.name} className="relative" ref={el => dropdownRefs.current[item.name] = el}>
                  {item.dropdown && item.dropdown.filter(sub => sub.show !== false).length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 group relative rounded-md hover:bg-green-50
                          ${activeDropdown === item.name ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700'}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                        <ChevronDown className={`ml-2 h-3 w-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="absolute z-50 left-0 mt-2 w-80 rounded-lg shadow-xl bg-white ring-1 ring-gray-200 overflow-hidden">
                          <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                              <Icon className="w-4 h-4 mr-2 text-green-600" />
                              {item.name}
                            </h3>
                          </div>
                          <div className="p-2 max-h-96 overflow-y-auto">
                            {item.dropdown.filter(sub => sub.show !== false).map((subItem) => {
                              const SubIcon = subItem.icon; // Use the sub-item icon component
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all duration-200"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  <div className="flex-shrink-0">
                                    <SubIcon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium text-gray-800 group-hover:text-green-700">
                                        {subItem.name}
                                      </span>
                                      <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{subItem.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 relative group rounded-md flex items-center"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
            {editMode && (
              <button
                onClick={() => setEditFormOpen(true)}
                className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                title="Configure Navigation"
                aria-label="Configure Navigation"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-700">Menu</span>
            </div>
            <div className="flex items-center space-x-2">
              {editMode && (
                <button
                  onClick={() => setEditFormOpen(true)}
                  className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                  title="Configure Navigation"
                  aria-label="Configure Navigation"
                >
                  <Settings className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const Icon = item.icon; // Use the icon component directly
              return (
                <div key={item.name}>
                  {item.dropdown && item.dropdown.filter(sub => sub.show !== false).length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="w-full text-left flex justify-between items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-3 text-gray-500" />
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-1 border-l-2 border-green-100 pl-4">
                          {item.dropdown.filter(sub => sub.show !== false).map((subItem) => {
                            const SubIcon = subItem.icon; // Use the sub-item icon component
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="block px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
                              >
                                <div className="flex items-center">
                                  <SubIcon className="w-4 h-4 mr-2 text-gray-400" />
                                  <div>
                                    <div className="font-medium">{subItem.name}</div>
                                    <div className="text-xs text-gray-500">{subItem.desc}</div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4 mr-3 text-gray-500" />
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );

  // Render component
  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {renderNavigation()}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            {previewMode ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Navigation Preview</h2>
                  <button
                    onClick={() => setEditFormOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Close preview"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {renderNavigation()}
              </div>
            ) : (
              renderEditForm()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;











// "use client";
// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { 
//   Menu, 
//   X, 
//   ChevronDown, 
//   ArrowRight, 
//   Home,
//   Users,
//   BookOpen,
//   Calendar,
//   Download as DownloadIcon,
//   Camera,
//   Phone,
//   Award,
//   FileText,
//   GraduationCap,
//   Clock,
//   Target,
//   UserCheck,
//   Building,
//   Trophy,
//   Book,
//   Library,
//   Calculator,
//   Palette,
//   Music,
//   Activity,
//   Bus,
//   ShieldCheck,
//   Utensils,
//   Star,
//   Save,
//   Bookmark,
//   Eye,
//   AlertCircle,
//   Settings
// } from 'lucide-react';

// const Navigation = ({ schoolData = {} }) => {
//   const role = 'admin'; // Change to 'user' for non-admin
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editFormOpen, setEditFormOpen] = useState(false);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [config, setConfig] = useState(null);
//   const [errors, setErrors] = useState({});
//   const dropdownRefs = useRef({});

//   // Default navigation structure
//   const defaultNavItems = [
//     { 
//       name: 'Home', 
//       href: '/',
//       icon: Home,
//       show: true
//     },
//     { 
//       name: 'About Us', 
//       href: '/about',
//       icon: Users,
//       show: true,
//       dropdown: [
//         { 
//           name: 'Our History', 
//           href: '/about/history', 
//           desc: 'School legacy', 
//           icon: Clock,
//           show: true
//         },
//         { 
//           name: 'Vision & Mission', 
//           href: '/about/vision-mission', 
//           desc: 'Our guiding principles', 
//           icon: Target,
//           show: true
//         },
//         { 
//           name: 'Principal\'s Message', 
//           href: '/about/principal-message', 
//           desc: 'Leadership perspective', 
//           icon: UserCheck,
//           show: true
//         },
//         { 
//           name: 'School Infrastructure', 
//           href: '/about/infrastructure', 
//           desc: 'Campus facilities', 
//           icon: Building,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Academics', 
//       href: '/academics',
//       icon: BookOpen,
//       show: true,
//       dropdown: [
//         { 
//           name: 'Curriculum', 
//           href: '/academics/curriculum', 
//           desc: 'Academic framework', 
//           icon: Book,
//           show: true
//         },
//         { 
//           name: 'Primary School', 
//           href: '/academics/primary', 
//           desc: 'Foundation years', 
//           icon: GraduationCap,
//           show: true
//         },
//         { 
//           name: 'Middle School', 
//           href: '/academics/middle', 
//           desc: 'Developing skills', 
//           icon: Calculator,
//           show: true
//         },
//         { 
//           name: 'Senior School', 
//           href: '/academics/senior', 
//           desc: 'Specialized learning', 
//           icon: Library,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Admissions', 
//       href: '/admissions',
//       icon: FileText,
//       show: true,
//       dropdown: [
//         { 
//           name: 'Admission Process', 
//           href: '/admissions/process', 
//           desc: 'Step-by-step guide', 
//           icon: ArrowRight,
//           show: true
//         },
//         { 
//           name: 'Application Form', 
//           href: '/admissions/application', 
//           desc: 'Apply online', 
//           icon: FileText,
//           show: true
//         },
//         { 
//           name: 'Fee Structure', 
//           href: '/admissions/fees', 
//           desc: 'Financial information', 
//           icon: Calculator,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Co-Curricular', 
//       href: '/co-curricular',
//       icon: Palette,
//       show: true,
//       dropdown: [
//         { 
//           name: 'Sports', 
//           href: '/co-curricular/sports', 
//           desc: 'Physical education programs', 
//           icon: Activity,
//           show: true
//         },
//         { 
//           name: 'Arts & Culture', 
//           href: '/co-curricular/arts', 
//           desc: 'Creative expression', 
//           icon: Palette,
//           show: true
//         },
//         { 
//           name: 'Music & Dance', 
//           href: '/co-curricular/music', 
//           desc: 'Performing arts', 
//           icon: Music,
//           show: true
//         },
//         { 
//           name: 'Clubs & Societies', 
//           href: '/co-curricular/clubs', 
//           desc: 'Student organizations', 
//           icon: Users,
//           show: true
//         },
//         { 
//           name: 'Competitions', 
//           href: '/co-curricular/competitions', 
//           desc: 'Inter-school events', 
//           icon: Trophy,
//           show: true
//         },
//         { 
//           name: 'Annual Events', 
//           href: '/co-curricular/events', 
//           desc: 'School celebrations', 
//           icon: Star,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Student Life', 
//       href: '/student-life',
//       icon: Users,
//       show: true,
//       dropdown: [
//         { 
//           name: 'School Timings', 
//           href: '/student-life/timings', 
//           desc: 'Daily schedule', 
//           icon: Clock,
//           show: true
//         },
//         { 
//           name: 'School Calendar', 
//           href: '/student-life/calendar', 
//           desc: 'Academic year events', 
//           icon: Calendar,
//           show: true
//         },
//         { 
//           name: 'Transport', 
//           href: '/student-life/transport', 
//           desc: 'Bus routes & fees', 
//           icon: Bus,
//           show: true
//         },
//         { 
//           name: 'Canteen', 
//           href: '/student-life/canteen', 
//           desc: 'Meal services', 
//           icon: Utensils,
//           show: true
//         },
//         { 
//           name: 'House System', 
//           href: '/student-life/houses', 
//           desc: 'Inter-house activities', 
//           icon: Building,
//           show: true
//         },
//         { 
//           name: 'Student Council', 
//           href: '/student-life/council', 
//           desc: 'Leadership opportunities', 
//           icon: Award,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Gallery', 
//       href: '/gallery',
//       icon: Camera,
//       show: true
//     },
//     { 
//       name: 'Downloads', 
//       href: '/downloads',
//       icon: DownloadIcon,
//       show: true,
//       dropdown: [
//         { 
//           name: 'Forms & Applications', 
//           href: '/downloads/forms', 
//           desc: 'Official documents', 
//           icon: FileText,
//           show: true
//         },
//         { 
//           name: 'Syllabus & Curriculum', 
//           href: '/downloads/syllabus', 
//           desc: 'Academic materials', 
//           icon: Book,
//           show: true
//         },
//         { 
//           name: 'Fee Structure', 
//           href: '/downloads/fee-structure', 
//           desc: 'Payment information', 
//           icon: Calculator,
//           show: true
//         },
//         { 
//           name: 'School Policies', 
//           href: '/downloads/policies', 
//           desc: 'Rules & guidelines', 
//           icon: ShieldCheck,
//           show: true
//         }
//       ]
//     },
//     { 
//       name: 'Contact Us', 
//       href: '/contact',
//       icon: Phone,
//       show: true
//     }
//   ];

//   // Initialize config with defaultNavItems
//   useEffect(() => {
//     const savedConfig = localStorage.getItem('navigationConfig');
//     if (savedConfig) {
//       setConfig(JSON.parse(savedConfig));
//     } else {
//       const mergedNavItems = schoolData.navigationItems || defaultNavItems;
//       setConfig(mergedNavItems.map(item => ({
//         ...item,
//         dropdown: item.dropdown ? item.dropdown.map(sub => ({ ...sub, show: sub.show !== false })) : undefined
//       })));
//     }
//   }, []); // Empty dependency array to run only on mount

//   // Update config only if schoolData.navigationItems changes
//   useEffect(() => {
//     if (schoolData.navigationItems) {
//       const prevConfig = JSON.stringify(config);
//       const newConfig = JSON.stringify(schoolData.navigationItems.map(item => ({
//         ...item,
//         dropdown: item.dropdown ? item.dropdown.map(sub => ({ ...sub, show: sub.show !== false })) : undefined
//       })));
//       if (prevConfig !== newConfig) {
//         setConfig(JSON.parse(newConfig));
//       }
//     }
//   }, [schoolData.navigationItems]); // Only depend on schoolData.navigationItems

//   // Check role to enable edit mode
//   useEffect(() => {
//     if (role === 'admin') {
//       setEditMode(true);
//     } else {
//       setEditMode(false);
//       setPreviewMode(false);
//       setEditFormOpen(false);
//     }
//   }, [role]);

//   // Handle scroll for sticky navigation
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 5);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Handle click outside to close dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const isOutside = Object.values(dropdownRefs.current).every(ref => 
//         ref && !ref.contains(event.target)
//       );
//       if (isOutside) setActiveDropdown(null);
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Toggle mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (!isMobileMenuOpen) setActiveDropdown(null);
//   };

//   // Toggle dropdown
//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
//   };

//   // Filter items based on show property
//   const filteredNavItems = config ? config.filter(item => item.show !== false) : [];

//   // Handle configuration changes
//   const handleInputChange = (index, field, value) => {
//     setConfig(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
//     setErrors(prev => ({ ...prev, [`${index}-${field}`]: null }));
//   };

//   const handleSubItemChange = (mainIndex, subIndex, field, value) => {
//     setConfig(prev => prev.map((item, i) => {
//       if (i === mainIndex && item.dropdown) {
//         return {
//           ...item,
//           dropdown: item.dropdown.map((sub, j) => j === subIndex ? { ...sub, [field]: value } : sub)
//         };
//       }
//       return item;
//     }));
//     setErrors(prev => ({ ...prev, [`${mainIndex}-${subIndex}-${field}`]: null }));
//   };

//   const handleToggle = (index, field) => {
//     setConfig(prev => prev.map((item, i) => i === index ? { ...item, [field]: !item[field] } : item));
//   };

//   const handleSubItemToggle = (mainIndex, subIndex, field) => {
//     setConfig(prev => prev.map((item, i) => {
//       if (i === mainIndex && item.dropdown) {
//         return {
//           ...item,
//           dropdown: item.dropdown.map((sub, j) => j === subIndex ? { ...sub, [field]: !sub[field] } : sub)
//         };
//       }
//       return item;
//     }));
//   };

//   // Validate configuration
//   const validateConfig = () => {
//     const newErrors = {};
//     if (!config || config.filter(item => item.show).length === 0) {
//       newErrors.general = 'At least one navigation item must be visible';
//     }
//     config.forEach((item, index) => {
//       if (item.show) {
//         if (!item.name.trim()) {
//           newErrors[`${index}-name`] = 'Navigation item name is required';
//         }
//         if (!item.href.trim()) {
//           newErrors[`${index}-href`] = 'Navigation item URL is required';
//         }
//         if (item.dropdown) {
//           item.dropdown.forEach((sub, subIndex) => {
//             if (sub.show) {
//               if (!sub.name.trim()) {
//                 newErrors[`${index}-${subIndex}-name`] = `Sub-item name is required for ${item.name}`;
//               }
//               if (!sub.href.trim()) {
//                 newErrors[`${index}-${subIndex}-href`] = `Sub-item URL is required for ${item.name}`;
//               }
//             }
//           });
//         }
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Save configuration
//   const handleSave = () => {
//     if (validateConfig()) {
//       localStorage.setItem('navigationConfig', JSON.stringify(config));
//       alert('Configuration saved successfully!');
//       setPreviewMode(false);
//       setEditFormOpen(false);
//     } else {
//       alert('Please fix validation errors before saving.');
//     }
//   };

//   // Download configuration
//   const handleDownload = () => {
//     if (validateConfig()) {
//       const dataStr = JSON.stringify(config, null, 2);
//       const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
//       const exportFileDefaultName = `navigation-config-${new Date().toISOString().split('T')[0]}.json`;
//       const linkElement = document.createElement('a');
//       linkElement.setAttribute('href', dataUri);
//       linkElement.setAttribute('download', exportFileDefaultName);
//       linkElement.click();
//     } else {
//       alert('Please fix validation errors before downloading.');
//     }
//   };

//   // Save and exit
//   const handleSaveExit = () => {
//     if (validateConfig()) {
//       localStorage.setItem('navigationConfig', JSON.stringify(config));
//       alert('Configuration saved! Redirecting to homepage.');
//       window.location.href = '/';
//     } else {
//       alert('Please fix validation errors before saving.');
//     }
//   };

//   // Reset to default
//   const handleReset = () => {
//     setConfig(defaultNavItems);
//     setErrors({});
//     alert('Configuration reset to default.');
//   };

//   // Render edit form for admins
//   const renderEditForm = () => (
//     <div className="space-y-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Navigation Configuration</h2>
//         <button
//           onClick={() => setEditFormOpen(false)}
//           className="text-gray-600 hover:text-gray-800"
//           aria-label="Close configuration"
//         >
//           <X className="h-6 w-6" />
//         </button>
//       </div>
//       <div className="space-y-6">
//         {config.map((item, index) => (
//           <div key={item.name} className="border rounded-lg p-4">
//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 checked={item.show}
//                 onChange={() => handleToggle(index, 'show')}
//                 className="mr-2"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">Main Item: {item.name}</h3>
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//                 <input
//                   type="text"
//                   value={item.name}
//                   onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-name`] ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors[`${index}-name`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-name`]}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
//                 <input
//                   type="text"
//                   value={item.href}
//                   onChange={(e) => handleInputChange(index, 'href', e.target.value)}
//                   className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-href`] ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {errors[`${index}-href`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-href`]}</p>}
//               </div>
//             </div>
//             {item.dropdown && (
//               <div className="mt-4">
//                 <h4 className="text-sm font-semibold text-gray-800 mb-2">Dropdown Items</h4>
//                 <div className="ml-6 space-y-3">
//                   {item.dropdown.map((subItem, subIndex) => (
//                     <div key={subItem.name} className="border rounded p-3 bg-gray-50">
//                       <div className="flex items-center mb-2">
//                         <input
//                           type="checkbox"
//                           checked={subItem.show}
//                           onChange={() => handleSubItemToggle(index, subIndex, 'show')}
//                           className="mr-2"
//                         />
//                         <span className="text-sm font-medium text-gray-700">{subItem.name}</span>
//                       </div>
//                       {subItem.show && (
//                         <div className="grid grid-cols-1 gap-2">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Item Name *</label>
//                             <input
//                               type="text"
//                               value={subItem.name}
//                               onChange={(e) => handleSubItemChange(index, subIndex, 'name', e.target.value)}
//                               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-${subIndex}-name`] ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors[`${index}-${subIndex}-name`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-${subIndex}-name`]}</p>}
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Item URL *</label>
//                             <input
//                               type="text"
//                               value={subItem.href}
//                               onChange={(e) => handleSubItemChange(index, subIndex, 'href', e.target.value)}
//                               className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors[`${index}-${subIndex}-href`] ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors[`${index}-${subIndex}-href`] && <p className="text-red-500 text-xs mt-1">{errors[`${index}-${subIndex}-href`]}</p>}
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                             <input
//                               type="text"
//                               value={subItem.desc}
//                               onChange={(e) => handleSubItemChange(index, subIndex, 'desc', e.target.value)}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         {errors.general && <p className="text-red-500 text-sm mt-4">{errors.general}</p>}
//       </div>
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={handleReset}
//           className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
//         >
//           Reset to Default
//           <Settings className="ml-2 h-4 w-4" />
//         </button>
//         <div className="flex space-x-3">
//           <button
//             onClick={() => setPreviewMode(!previewMode)}
//             className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
//           >
//             {previewMode ? 'Edit Configuration' : 'Preview Configuration'}
//             <Eye className="ml-2 h-4 w-4" />
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
//           >
//             Save Configuration
//             <Save className="ml-2 h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Render navigation for preview or normal view
//   const renderNavigation = () => (
//     <nav className={`bg-white shadow-sm border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14">
//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex lg:items-center lg:space-x-1">
//             {filteredNavItems.map((item) => (
//               <div key={item.name} className="relative" ref={el => dropdownRefs.current[item.name] = el}>
//                 {item.dropdown && item.dropdown.filter(sub => sub.show !== false).length > 0 ? (
//                   <>
//                     <button
//                       onClick={() => toggleDropdown(item.name)}
//                       className={`px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 group relative rounded-md hover:bg-green-50
//                         ${activeDropdown === item.name ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700'}`}
//                     >
//                       <item.icon className="w-4 h-4 mr-2" />
//                       {item.name}
//                       <ChevronDown className={`ml-2 h-3 w-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
//                     </button>
//                     {activeDropdown === item.name && (
//                       <div className="absolute z-50 left-0 mt-2 w-80 rounded-lg shadow-xl bg-white ring-1 ring-gray-200 overflow-hidden">
//                         <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
//                           <h3 className="text-sm font-semibold text-gray-800 flex items-center">
//                             <item.icon className="w-4 h-4 mr-2 text-green-600" />
//                             {item.name}
//                           </h3>
//                         </div>
//                         <div className="p-2 max-h-96 overflow-y-auto">
//                           {item.dropdown.filter(sub => sub.show !== false).map((subItem) => (
//                             <Link
//                               key={subItem.name}
//                               href={subItem.href}
//                               className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all duration-200"
//                               onClick={() => setActiveDropdown(null)}
//                             >
//                               <div className="flex-shrink-0">
//                                 <subItem.icon className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
//                               </div>
//                               <div className="ml-3 flex-1">
//                                 <div className="flex items-center justify-between">
//                                   <span className="text-sm font-medium text-gray-800 group-hover:text-green-700">
//                                     {subItem.name}
//                                   </span>
//                                   <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
//                                 </div>
//                                 <p className="text-xs text-gray-500 mt-0.5">{subItem.desc}</p>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 relative group rounded-md flex items-center"
//                   >
//                     <item.icon className="w-4 h-4 mr-2" />
//                     {item.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//             {editMode && (
//               <button
//                 onClick={() => setEditFormOpen(true)}
//                 className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
//                 title="Configure Navigation"
//                 aria-label="Configure Navigation"
//               >
//                 <Settings className="h-5 w-5" />
//               </button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden flex items-center justify-between w-full">
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-semibold text-green-700">Menu</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               {editMode && (
//                 <button
//                   onClick={() => setEditFormOpen(true)}
//                   className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   title="Configure Navigation"
//                   aria-label="Configure Navigation"
//                 >
//                   <Settings className="h-5 w-5" />
//                 </button>
//               )}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
//                 aria-label="Toggle navigation menu"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
//           <div className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
//             {filteredNavItems.map((item) => (
//               <div key={item.name}>
//                 {item.dropdown && item.dropdown.filter(sub => sub.show !== false).length > 0 ? (
//                   <>
//                     <button
//                       onClick={() => toggleDropdown(item.name)}
//                       className="w-full text-left flex justify-between items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
//                     >
//                       <div className="flex items-center">
//                         <item.icon className="w-4 h-4 mr-3 text-gray-500" />
//                         <span>{item.name}</span>
//                       </div>
//                       <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
//                     </button>
//                     {activeDropdown === item.name && (
//                       <div className="ml-4 mt-2 space-y-1 border-l-2 border-green-100 pl-4">
//                         {item.dropdown.filter(sub => sub.show !== false).map((subItem) => (
//                           <Link
//                             key={subItem.name}
//                             href={subItem.href}
//                             onClick={() => {
//                               setActiveDropdown(null);
//                               setIsMobileMenuOpen(false);
//                             }}
//                             className="block px-3 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
//                           >
//                             <div className="flex items-center">
//                               <subItem.icon className="w-4 h-4 mr-2 text-gray-400" />
//                               <div>
//                                 <div className="font-medium">{subItem.name}</div>
//                                 <div className="text-xs text-gray-500">{subItem.desc}</div>
//                               </div>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <Link
//                     href={item.href}
//                     className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors duration-200"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     <item.icon className="w-4 h-4 mr-3 text-gray-500" />
//                     {item.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );

//   // Render component
//   if (!config) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="relative">
//       {renderNavigation()}
//       {editMode && editFormOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
//             {previewMode ? (
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-800">Navigation Preview</h2>
//                   <button
//                     onClick={() => setEditFormOpen(false)}
//                     className="text-gray-600 hover:text-gray-800"
//                     aria-label="Close preview"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
//                 {renderNavigation()}
//               </div>
//             ) : (
//               renderEditForm()
//             )}
//           </div>
//         </div>
//       )}
//       {/* {editMode && !editFormOpen && (
//         <div className="fixed top-4 right-4 flex space-x-3 z-40">
//           <button
//             onClick={handleDownload}
//             className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
//             title="Download configuration"
//             aria-label="Download configuration"
//           >
//             <DownloadIcon className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleSaveExit}
//             className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
//             title="Save and exit"
//             aria-label="Save and exit"
//           >
//             <Bookmark className="h-5 w-5" />
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default Navigation;