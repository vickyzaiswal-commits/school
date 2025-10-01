
"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  GraduationCap, 
  User, 
  CreditCard,
  FileText,
  Globe,
  ExternalLink,
  Save,
  Download,
  Bookmark,
  Eye,
  AlertCircle,
  Settings,
  X,
  Edit,
  Building,
  Users,
  BookOpen,
  Calendar,
  Award,
  Send,
  Ban,
  Move
} from 'lucide-react';

const Navbar = ({ schoolData }) => {
  const role = 'admin'; // Change to 'user' for non-admin
  const [isScrolled, setIsScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [config, setConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const [originalConfig, setOriginalConfig] = useState(null);
  
  // Modal drag state
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Default configuration with all dynamic data
  const defaultConfig = {
    // School Information
    name: "St. Columba's School",
    address: "1, Ashok Place, New Delhi - 110001",
    tagline: "An Edmund Rice Educational Institution",
    establishedYear: "1927",
    yearsOfExistence: "97+",
    
    // Contact Information
    phone: "011 2336 3462 / 3134",
    email: "stcolumbas@stcolumbas.edu.in",
    workingHours: "Mon - Fri: 8:00 AM - 4:00 PM",
    
    // Top Bar Settings
    showTopBar: true,
    showContactInfo: true,
    showQuickLinks: true,
    
    // Quick Links Data
    quickLinks: {
      virtualTour: {
        show: true,
        label: "Virtual Tour",
        url: "/virtual-tour",
        icon: "Globe"
      },
      careers: {
        show: true,
        label: "Careers",
        url: "/careers",
        icon: "Users"
      },
      alumni: {
        show: true,
        label: "Alumni",
        url: "/alumni",
        icon: "GraduationCap"
      },
      academics: {
        show: true,
        label: "Academics",
        url: "/academics",
        icon: "BookOpen"
      },
      events: {
        show: true,
        label: "Events",
        url: "/events",
        icon: "Calendar"
      },
      achievements: {
        show: true,
        label: "Achievements",
        url: "/achievements",
        icon: "Award"
      }
    },
    
    // Action Buttons Data
    actionButtons: {
      eCareLogin: {
        show: true,
        label: "e-Care Login",
        url: "/ecare-login",
        icon: "User",
        buttonText: "e-Care Login"
      },
      feePayment: {
        show: true,
        label: "Pay Fees",
        url: "/pay-fees",
        icon: "CreditCard",
        buttonText: "Pay Fees"
      },
      admissionsButton: {
        show: true,
        label: "Admissions",
        url: "/admissions",
        icon: "FileText",
        buttonText: "Admissions"
      }
    },
    
    // Cards Data
    cards: {
      locationCard: {
        show: true,
        title: "Location",
        subtitle: "Virtual Tour",
        url: "/virtual-tour",
        icon: "MapPin"
      },
      admissionsCard: {
        show: true,
        title: "Admissions",
        subtitle: "Open Now",
        url: "/admissions",
        icon: "FileText",
        showStatus: true
      }
    },
    
    // Admissions Status
    admissionsOpen: true,
    
    // Emergency Notice
    emergencyNotice: null,
    
    // Colors
    colors: {
      primary: '#166534',
      secondary: '#ca8a04',
      accent: '#ea580c'
    }
  };

  // Merge provided schoolData with defaultConfig
  useEffect(() => {
    const mergedConfig = { ...defaultConfig, ...schoolData };
    setConfig(mergedConfig);
    setOriginalConfig(JSON.parse(JSON.stringify(mergedConfig))); // Deep copy for original config
  }, [schoolData]);

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setPreviewMode(false);
      setEditFormOpen(false);
    }
  }, []);

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Modal drag handlers
  const handleMouseDown = (e) => {
    if (!modalRef.current) return;
    
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y
    };
    
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStartPos.current.x;
    const newY = e.clientY - dragStartPos.current.y;
    
    // Boundary checks to keep modal within viewport
    const maxX = window.innerWidth - (modalRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (modalRef.current?.offsetHeight || 0);
    
    setModalPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Reset modal position when opened
  useEffect(() => {
    if (editFormOpen) {
      setModalPosition({ x: 0, y: 0 });
    }
  }, [editFormOpen]);

  // Helper function to apply color styles
  const getColorStyle = (colorType, isBg = false) => {
    if (!config?.colors) return {};
    const colorValue = config.colors[colorType];
    if (!colorValue) return {};
    return isBg ? { backgroundColor: colorValue } : { color: colorValue };
  };

  // Handle configuration changes
  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setConfig(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleObjectInputChange = (parent, child, field, value) => {
    setConfig(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [field]: value
        }
      }
    }));
  };

  const handleToggle = (field) => {
    setConfig(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleObjectToggle = (parent, child, field) => {
    setConfig(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [field]: !prev[parent][child][field]
        }
      }
    }));
  };

  // Validate configuration
  const validateConfig = () => {
    const newErrors = {};
    if (!config.name.trim()) {
      newErrors.name = 'School name is required';
    }
    if (!config.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (config.showContactInfo && !config.phone.trim()) {
      newErrors.phone = 'Phone number is required when contact info is shown';
    }
    if (config.showContactInfo && !config.email.trim()) {
      newErrors.email = 'Email is required when contact info is shown';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prepare payload for submission
  const preparePayload = () => {
    const payload = {
      // School Information
      name: config.name,
      address: config.address,
      tagline: config.tagline,
      establishedYear: config.establishedYear,
      yearsOfExistence: config.yearsOfExistence,
      
      // Contact Information
      phone: config.phone,
      email: config.email,
      workingHours: config.workingHours,
      
      // Top Bar Settings
      showTopBar: config.showTopBar,
      showContactInfo: config.showContactInfo,
      showQuickLinks: config.showQuickLinks,
      
      // Quick Links Data
      quickLinks: config.quickLinks,
      
      // Action Buttons Data
      actionButtons: config.actionButtons,
      
      // Cards Data
      cards: config.cards,
      
      // Admissions Status
      admissionsOpen: config.admissionsOpen,
      
      // Emergency Notice
      emergencyNotice: config.emergencyNotice,
      
      // Colors
      colors: config.colors,
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin', // This should come from auth context
      version: '1.0'
    };

    return payload;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateConfig()) {
      const payload = preparePayload();
      
      // Log payload to console in a beautiful format
      console.log('🚀 ========== NAVBAR CONFIGURATION PAYLOAD ==========');
      console.log('📦 Payload ready for database submission:');
      console.log(JSON.stringify(payload, null, 2));
      console.log('📍 Payload details:');
      console.log(`   - School: ${payload.name}`);
      console.log(`   - Quick Links: ${Object.values(payload.quickLinks).filter(link => link.show).length} enabled`);
      console.log(`   - Action Buttons: ${Object.values(payload.actionButtons).filter(btn => btn.show).length} enabled`);
      console.log(`   - Cards: ${Object.values(payload.cards).filter(card => card.show).length} enabled`);
      console.log(`   - Last Updated: ${payload.lastUpdated}`);
      console.log('✅ ========== END PAYLOAD ==========');
      
      // Here you would typically send the payload to your backend API
      // Example: 
      // try {
      //   const response = await fetch('/api/navbar-config', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(payload)
      //   });
      //   if (response.ok) {
      //     alert('Configuration saved to database!');
      //   }
      // } catch (error) {
      //   console.error('Failed to save configuration:', error);
      //   alert('Failed to save configuration.');
      // }
      
      alert('Configuration submitted successfully! Check console for payload.');
      setEditFormOpen(false);
      
      // Update original config after successful submission
      setOriginalConfig(JSON.parse(JSON.stringify(config)));
    } else {
      alert('Please fix validation errors before submitting.');
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset to original config
    setConfig(JSON.parse(JSON.stringify(originalConfig)));
    setErrors({});
    setEditFormOpen(false);
    setPreviewMode(false);
  };

  // Handle download configuration
  const handleDownload = () => {
    const payload = preparePayload();
    const dataStr = JSON.stringify(payload, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `navbar-config-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Reset to default
  const handleReset = () => {
    setConfig(defaultConfig);
    setErrors({});
    alert('Configuration reset to default.');
  };

  // Icon mapping
  const iconMap = {
    MapPin, Phone, Mail, Clock, GraduationCap, User, CreditCard,
    FileText, Globe, ExternalLink, Building, Users, BookOpen,
    Calendar, Award
  };

  // Render dynamic quick links
  const renderQuickLinks = () => {
    if (!config?.quickLinks) return null;
    
    return Object.entries(config.quickLinks).map(([key, link]) => {
      if (!link.show) return null;
      
      const IconComponent = iconMap[link.icon] || Globe;
      
      return (
        <div key={key}>
          <Link 
            href={link.url} 
            className="hover:text-yellow-300 transition-colors flex items-center space-x-1"
          >
            <IconComponent className="w-3 h-3" />
            <span>{link.label}</span>
          </Link>
          {/* <span className="text-green-300">|</span> */}
        </div>
      );
    }).filter(Boolean);
  };

  // Render action buttons
  const renderActionButtons = () => {
    if (!config?.actionButtons) return null;
    
    return Object.entries(config.actionButtons).map(([key, button]) => {
      if (!button.show) return null;
      
      const IconComponent = iconMap[button.icon] || User;
      const isAdmissions = key === 'admissionsButton';
      const isFeePayment = key === 'feePayment';
      
      return (
        <Link 
          key={key}
          href={button.url}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg ${
            isAdmissions 
              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
              : isFeePayment
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          style={isAdmissions ? { 
            background: config?.colors?.primary 
              ? `linear-gradient(to right, ${config.colors.primary}, ${config.colors.primary}E6)`
              : undefined,
          } : isFeePayment ? {
            backgroundColor: config?.colors?.accent || '#ea580c',
          } : {}}
        >
          <IconComponent className="w-4 h-4" />
          <span>{button.buttonText}</span>
        </Link>
      );
    }).filter(Boolean);
  };

  // Render cards
  const renderCards = () => {
    if (!config?.cards) return null;
    
    return Object.entries(config.cards).map(([key, card]) => {
      if (!card.show) return null;
      
      const IconComponent = iconMap[card.icon] || MapPin;
      const isLocationCard = key === 'locationCard';
      const isAdmissionsCard = key === 'admissionsCard';
      
      return (
        <div 
          key={key}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors cursor-pointer group ${
            isLocationCard 
              ? 'bg-gray-50 hover:bg-gray-100' 
              : 'bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
          }`}
        >
          <div className={`p-2 rounded-full group-hover:bg-opacity-80 transition-colors ${
            isLocationCard ? 'bg-blue-100 group-hover:bg-blue-200' : 'bg-green-200 group-hover:bg-green-300'
          }`}>
            <IconComponent className={`w-4 h-4 ${
              isLocationCard ? 'text-blue-600' : 'text-green-700'
            }`} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{card.title}</p>
            <p className={`text-xs ${
              isLocationCard 
                ? 'text-blue-600 hover:underline flex items-center' 
                : 'text-green-700 font-medium'
            }`}>
              {card.subtitle}
              {isLocationCard && <ExternalLink className="w-3 h-3 ml-1" />}
            </p>
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  // Professional Edit Form with all dynamic data
  const renderEditForm = () => (
    <div className="space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg">
      <div 
        className="flex justify-between items-center border-b pb-4 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Move className="h-5 w-5 mr-2 text-gray-500" />
            Navbar Configuration
          </h2>
          <p className="text-sm text-gray-600 mt-1">Edit all navbar content and settings - Drag to move</p>
        </div>
        <button
          onClick={handleCancel}
          className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close configuration"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto p-2">
        {/* Content remains the same as before */}
        {/* ... existing form content ... */}
        
        {/* Left Column - Core Information */}
        <div className="space-y-6">
          {/* School Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-green-600" />
              School Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter school name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <textarea
                  value={config.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows="2"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter complete address"
                />
                {errors.address && <p className="text-red-500 text-xs mt-2 flex items-center">
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.address}
                </p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={config.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter school tagline"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                  <input
                    type="text"
                    value={config.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., 1927"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Existence</label>
                  <input
                    type="text"
                    value={config.yearsOfExistence}
                    onChange={(e) => handleInputChange('yearsOfExistence', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., 97+"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />
                Contact Information
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showContactInfo}
                  onChange={() => handleToggle('showContactInfo')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Show in navbar</span>
              </label>
            </div>
            
            {config.showContactInfo && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="text"
                    value={config.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-2 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={config.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                  <input
                    type="text"
                    value={config.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., Mon - Fri: 8:00 AM - 4:00 PM"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Features & Settings */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                Quick Links
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.showQuickLinks}
                  onChange={() => handleToggle('showQuickLinks')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Show in navbar</span>
              </label>
            </div>
            
            {config.showQuickLinks && config.quickLinks && (
              <div className="space-y-3">
                {Object.entries(config.quickLinks).map(([key, link]) => (
                  <div key={key} className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-3 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={link.show}
                          onChange={() => handleObjectToggle('quickLinks', key, 'show')}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm font-medium text-gray-700">{link.label}</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => handleObjectInputChange('quickLinks', key, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                        placeholder="Link label"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleObjectInputChange('quickLinks', key, 'url', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-100 cursor-not-allowed"
                        placeholder="Link URL"
                        readOnly
                        title="URL paths are managed separately"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-orange-600" />
              Action Buttons
            </h3>
            
            <div className="space-y-3">
              {config.actionButtons && Object.entries(config.actionButtons).map(([key, button]) => (
                <div key={key} className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={button.show}
                        onChange={() => handleObjectToggle('actionButtons', key, 'show')}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{button.label}</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={button.buttonText}
                      onChange={(e) => handleObjectInputChange('actionButtons', key, 'buttonText', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Button text"
                    />
                    <input
                      type="text"
                      value={button.url}
                      onChange={(e) => handleObjectInputChange('actionButtons', key, 'url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-gray-100 cursor-not-allowed"
                      placeholder="Button URL"
                      readOnly
                      title="URL paths are managed separately"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              Information Cards
            </h3>
            
            <div className="space-y-3">
              {config.cards && Object.entries(config.cards).map(([key, card]) => (
                <div key={key} className="p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={card.show}
                        onChange={() => handleObjectToggle('cards', key, 'show')}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{card.title}</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleObjectInputChange('cards', key, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Card title"
                    />
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => handleObjectInputChange('cards', key, 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      placeholder="Card subtitle"
                    />
                  </div>
                  <input
                    type="text"
                    value={card.url}
                    onChange={(e) => handleObjectInputChange('cards', key, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm mt-2 bg-gray-100 cursor-not-allowed"
                    placeholder="Card URL"
                    readOnly
                    title="URL paths are managed separately"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Admissions Status */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              Admissions Status
            </h3>
            
            <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={config.admissionsOpen}
                onChange={() => handleToggle('admissionsOpen')}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <div className={`h-3 w-3 rounded-full ${config.admissionsOpen ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-medium text-gray-700">Admissions Open</span>
            </label>
          </div>

          {/* Emergency Notice */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
              Emergency Notice
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={!!config.emergencyNotice}
                  onChange={() => handleInputChange('emergencyNotice', config.emergencyNotice ? null : 'Emergency notice text here...')}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Show Emergency Notice</span>
              </label>
              
              {config.emergencyNotice !== null && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Text</label>
                  <textarea
                    value={config.emergencyNotice}
                    onChange={(e) => handleInputChange('emergencyNotice', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter emergency notice text..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = () => (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200 bg-gray-50 px-6 py-4 rounded-b-lg">
      <div className="flex space-x-3">
        <button
          onClick={handleCancel}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Ban className="h-4 w-4" />
          <span>Cancel</span>
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Settings className="h-4 w-4" />
          <span>Reset to Default</span>
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Eye className="h-4 w-4" />
          <span>{previewMode ? 'Back to Edit' : 'Preview'}</span>
        </button>
        
        <button
          onClick={handleSubmit}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <Send className="h-4 w-4" />
          <span>Submit Configuration</span>
        </button>
      </div>
    </div>
  );

  // Rest of the navbar rendering code remains the same...
  const renderNavbar = () => (
    <>
      {/* Top Info Bar - Hidden on mobile */}
      {config.showTopBar && (
        <div 
          className="hidden lg:block bg-gradient-to-r from-green-800 to-green-700 text-white"
          style={{ 
            background: config?.colors 
              ? `linear-gradient(to right, ${config.colors.primary}CC, ${config.colors.primary})`
              : undefined 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 text-xs">
              {config.showContactInfo && (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>{config.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3" />
                    <span>{config.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{config.workingHours}</span>
                  </div>
                </div>
              )}
              {config.showQuickLinks && config.quickLinks && (
                <div className="flex items-center space-x-4">
                  {renderQuickLinks()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg border-b border-gray-200' : 'shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="flex-shrink-0">
                <div 
                  className="h-12 w-12 lg:h-16 lg:w-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center border-3 border-green-500 shadow-lg"
                  style={{ 
                    background: config?.colors 
                      ? `linear-gradient(to bottom right, ${config.colors.primary}, ${config.colors.primary}E6)`
                      : undefined,
                    borderColor: config?.colors?.primary || '#22c55e'
                  }}
                >
                  <GraduationCap 
                    className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400" 
                    style={getColorStyle('secondary')}
                  />
                </div>
              </div>
              <div>
                <h1 
                  className="text-lg lg:text-2xl font-bold text-green-700 leading-tight"
                  style={getColorStyle('primary')}
                >
                  {config.name}
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">
                  {config.address}
                </p>
                <p className="text-xs text-green-600 italic font-medium hidden lg:block">
                  {config.tagline}
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              {config.cards && renderCards()}
            </div>
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="flex lg:hidden items-center space-x-2">
                {config.actionButtons?.admissionsButton?.show && config.admissionsOpen && (
                  <Link 
                    href={config.actionButtons.admissionsButton.url}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1"
                    style={{ 
                      backgroundColor: config?.colors?.primary || '#16a34a',
                    }}
                  >
                    <FileText className="w-3 h-3" />
                    <span>Apply</span>
                  </Link>
                )}
              </div>
              <div className="hidden lg:flex items-center space-x-3">
                {config.actionButtons && renderActionButtons()}
              </div>
              {config.establishedYear && (
                <div className="hidden xl:block">
                  <div className="relative">
                    <div 
                      className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center border-3 border-yellow-600 shadow-lg"
                      style={{ 
                        background: config?.colors?.secondary 
                          ? `linear-gradient(to bottom right, ${config.colors.secondary}, ${config.colors.secondary}E6)`
                          : undefined,
                        borderColor: config?.colors?.secondary ? `${config.colors.secondary}CC` : '#ca8a04'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-xs font-bold text-gray-800">EST</div>
                        <div className="text-xs font-bold text-gray-800">{config.establishedYear}</div>
                      </div>
                    </div>
                    {config.yearsOfExistence && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold shadow-md">
                        {config.yearsOfExistence}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {editMode && (
                <button
                  onClick={() => setEditFormOpen(true)}
                  className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                  title="Configure Navbar"
                  aria-label="Configure Navbar"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div 
          className="h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600"
          style={{ 
            background: config?.colors 
              ? `linear-gradient(to right, ${config.colors.primary}, ${config.colors.secondary}, ${config.colors.primary})`
              : undefined 
          }}
        ></div>
      </nav>

      {/* Mobile Contact Bar */}
      <div 
        className="lg:hidden bg-green-700 text-white"
        style={{ backgroundColor: config?.colors?.primary || '#166534' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-2 text-xs">
            {config.showContactInfo && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{config.phone.split(' / ')[0]}</span>
                </div>
                <Link href={`mailto:${config.email}`} className="flex items-center space-x-1 hover:text-yellow-300">
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </Link>
              </div>
            )}
            {config.quickLinks?.virtualTour?.show && (
              <Link href={config.quickLinks.virtualTour.url} className="flex items-center space-x-1 text-yellow-300 hover:text-yellow-200">
                <Globe className="w-3 h-3" />
                <span>{config.quickLinks.virtualTour.label}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      {config.emergencyNotice && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-medium" id="emergency-notice">
          <div className="max-w-7xl mx-auto px-4">
            🚨 {config.emergencyNotice}
          </div>
        </div>
      )}
    </>
  );

  // Render component
  if (!config) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {/* Navbar */}
      {renderNavbar()}

      {/* Professional Edit Form Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
            style={{
              transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
              cursor: isDragging ? 'grabbing' : 'default',
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
          >
            {previewMode ? (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Navbar Preview</h2>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {renderNavbar()}
                  </div>
                </div>
                <ModalFooter />
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {renderEditForm()}
                <ModalFooter />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
