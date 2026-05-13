
"use client";
import Link from 'next/link';
import Image from 'next/image';
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
  Plus,
  Trash2
} from 'lucide-react';
import FileUpload from '@/utils/fileUpload';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';

const Navbar = ({ schoolData }) => {
  const [role, setRole] = useState(null);

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
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [config, setConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const [originalConfig, setOriginalConfig] = useState(null);

  // Track eCare user login state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const fromLocal = localStorage.getItem('ecareUser');
        const fromSession = sessionStorage.getItem('ecareUser');
        const raw = fromLocal || fromSession || null;
        if (!raw) { setUser(null); return; }
        let parsed;
        try { parsed = JSON.parse(raw); } catch (e) { setUser(null); return; }

        // If stored object is encrypted (matches earlier save flow), attempt to decrypt
        if (parsed && parsed.encrypted) {
          try {
            const decrypted = await decryptObject(parsed);
            const userObj = decrypted?.user || decrypted;
            setUser(userObj);
            return;
          } catch (e) {
            console.warn('Failed to decrypt stored ecareUser', e);
            setUser(null);
            return;
          }
        }

        const userObj = parsed.user || parsed;
        setUser(userObj);
      } catch (err) {
        setUser(null);
      }
    };

    loadUserFromStorage();

    const onStorage = (e) => {
      if (!e || !e.key) return;
      if (e.key === 'ecareUser' || e.key === 'ecareToken') {
        loadUserFromStorage();
      }
    };

    window.addEventListener('storage', onStorage);
    // also listen to a custom event dispatched from the login page in the same tab
    window.addEventListener('ecareUserChanged', loadUserFromStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('ecareUserChanged', loadUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('ecareUser');
      localStorage.removeItem('ecareToken');
      sessionStorage.removeItem('ecareUser');
      sessionStorage.removeItem('ecareToken');
    } catch (e) {}
    setUser(null);
    // redirect to home
    window.location.href = '/';
  };

  // Default configuration
  const defaultConfig = {
    name: "Abc School",
    address: "1, Ashok Place, Birgunj - 110001",
    tagline: "An Edmund Rice Educational Institution",
    establishedYear: "1927",
    yearsOfExistence: "97+",
    
    phone: "011 2336 3462 / 3134",
    email: "stcolumbas@stcolumbas.edu.in",
    workingHours: "Mon - Fri: 8:00 AM - 4:00 PM",
    
    showTopBar: true,
    showContactInfo: true,
    showQuickLinks: true,
    
    quickLinks: [
      {
        id: 'virtualTour',
        show: true,
        label: "Virtual Tour",
        url: "/virtual-tour",
        icon: "Globe"
      },
      {
        id: 'careers',
        show: true,
        label: "Careers",
        url: "/careers",
        icon: "Users"
      },
      {
        id: 'alumni',
        show: true,
        label: "Alumni",
        url: "/alumni",
        icon: "GraduationCap"
      },
      {
        id: 'notice',
        show: true,
        label: "Notice",
        url: "/notice",
        icon: "BookOpen"
      },
      {
        id: 'events',
        show: true,
        label: "Events",
        url: "/co-curricular/events",
        icon: "Calendar"
      },
      {
        id: 'achievements',
        show: true,
        label: "Achievements",
        url: "/achievements",
        icon: "Award"
      }
    ],
    
    actionButtons: [
      {
        id: 'eCareLogin',
        show: true,
        label: "e-Care Login",
        url: "/ecare-login",
        icon: "User",
        buttonText: "e-Care Login"
      },
      {
        id: 'feePayment',
        show: true,
        label: "Pay Fees",
        url: "/pay-fees",
        icon: "CreditCard",
        buttonText: "Pay Fees"
      },
      {
        id: 'noticeButton',
        show: true,
        label: "Notice",
        url: "/notice",
        icon: "FileText",
        buttonText: "Notice"
      }
    ],
    
    cards: [
      {
        id: 'locationCard',
        show: true,
        title: "Location",
        subtitle: "Virtual Tour",
        url: "/virtual-tour",
        icon: "MapPin"
      },
      {
        id: 'admissionsCard',
        show: true,
        title: "Admissions",
        subtitle: "Open Now",
        url: "/admissions/application",
        icon: "FileText",
        showStatus: true
      }
    ],
    
    admissionsOpen: true,
    emergencyNotice: null
    ,
    // logo url (optional) - if provided will render image instead of icon
    logo: ''
  };

  // Icon mapping
  const iconMap = {
    MapPin, Phone, Mail, Clock, GraduationCap, User, CreditCard,
    FileText, Globe, ExternalLink, Building, Users, BookOpen,
    Calendar, Award
  };

  // Initialize config: prefer remote data but fallback to static after timeout
  useEffect(() => {
    let mounted = true;
    let usedFallback = false;
    const TIMEOUT_MS = 30000; // 30 seconds

    const fetchNavbar = async () => {
      // do not set local defaults immediately — wait for remote or timeout

      const fetchPromise = (async () => {
        try {
          const res = await apiRequest('save_data/get_navbar_data', {});
          const remoteData = Array.isArray(res.data) && res.data.length > 0
            ? res.data[0].data
            : res.data?.Data || res.data;
          return { timeout: false, remoteData };
        } catch (err) {
          return { timeout: false, remoteData: null, error: err };
        }
      })();

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve({ timeout: true }), TIMEOUT_MS);
      });

      const result = await Promise.race([fetchPromise, timeoutPromise]);

      if (!mounted) return;

      if (result && result.timeout) {
        // timeout won: use static merged config as fallback
        usedFallback = true;
        const mergedConfig = { ...defaultConfig, ...schoolData };
        setConfig(mergedConfig);
        setOriginalConfig(JSON.parse(JSON.stringify(mergedConfig)));

        // still attempt to fetch in background but do not override fallback
        fetchPromise.then((r) => {
          if (!mounted || usedFallback) return; // do not override
          const remoteData = r?.remoteData || null;
          if (remoteData) {
            const merged = { ...defaultConfig, ...remoteData };
            setConfig(merged);
            setOriginalConfig(JSON.parse(JSON.stringify(merged)));
          }
        }).catch(() => {});
      } else {
        // fetch completed first (or immediately)
        const remote = result?.remoteData || null;
        if (remote) {
          const merged = { ...defaultConfig, ...remote };
          setConfig(merged);
          setOriginalConfig(JSON.parse(JSON.stringify(merged)));
        } else {
          // fetch completed but no remote data; fall back
          const mergedConfig = { ...defaultConfig, ...schoolData };
          setConfig(mergedConfig);
          setOriginalConfig(JSON.parse(JSON.stringify(mergedConfig)));
        }
      }
    };

    fetchNavbar();
    return () => { mounted = false };
  }, [schoolData]);

  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setPreviewMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  useEffect(() => {
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight || 0;
      setNavHeight(h);
    };

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1; // 10% of viewport
      setIsScrolled(window.scrollY > threshold);
    };

    // initial measurement and listeners
    updateNavHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateNavHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavHeight);
    };
  }, [config, previewMode, editFormOpen]);

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleArrayItemChange = (arrayName, index, field, value) => {
    setConfig(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleToggle = (field) => {
    setConfig(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleArrayItemToggle = (arrayName, index, field) => {
    setConfig(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: !item[field] } : item
      )
    }));
  };

  const validateConfig = () => {
    const newErrors = {};
    if (!config.name.trim()) {
      newErrors.name = 'School name is required';
    }
    if (!config.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (config.showContactInfo && !config.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (config.showContactInfo && !config.email.trim()) {
      newErrors.email = 'Email is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const preparePayload = () => {
    const payload = {
      ...config,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'admin',
      version: '1.0'
    };
    return payload;
  };

  const handleSave = () => {
    if (validateConfig()) {
      const payload = preparePayload();
      // localStorage.setItem('navbarConfig', JSON.stringify(payload));
      (async () => {
        try {
          await apiRequest('save_data/save_navbar_data', { payload });
        } catch (err) {
          console.warn('Failed to save navbar remotely, falling back to localStorage', err);
          try {
            localStorage.setItem('navbarConfig', JSON.stringify(payload));
          } catch (e) {
            console.error('Failed to persist navbar locally', e);
          }
        }
        setPreviewMode(false);
        setEditFormOpen(false);
        setOriginalConfig(JSON.parse(JSON.stringify(config)));
      })();
    }
  };

  const handleCancel = () => {
    setConfig(JSON.parse(JSON.stringify(originalConfig)));
    setErrors({});
    setEditFormOpen(false);
    setPreviewMode(false);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setErrors({});
  };

  const renderQuickLinks = () => {
    if (!config?.quickLinks) return null;
    
    return config.quickLinks.map((link) => {
      if (!link.show) return null;
      const IconComponent = iconMap[link.icon] || Globe;
      
      return (
        <div key={link.id}>
          <Link 
            href={link.url} 
            className="hover:text-yellow-300 transition-colors flex items-center space-x-1"
          >
            <IconComponent className="w-3 h-3" />
            <span>{link.label}</span>
          </Link>
        </div>
      );
    }).filter(Boolean);
  };

  const renderActionButtons = () => {
    if (!config?.actionButtons) return null;
    return config.actionButtons.map((button) => {
      if (!button.show) return null;
      const IconComponent = iconMap[button.icon] || User;

      // For eCare login button, show Logout when user is present
      if (button.id === 'eCareLogin') {
        if (user) {
          return (
            <button
              key={button.id}
              onClick={handleLogout}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg bg-red-600 hover:bg-red-700 text-white`}
            >
              <IconComponent className="w-4 h-4" />
              <span>Logout</span>
            </button>
          );
        }

        return (
          <Link
            key={button.id}
            href={button.url}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{button.buttonText}</span>
          </Link>
        );
      }

      return (
        <Link 
          key={button.id}
          href={button.url}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg ${
            button.id === 'admissionsButton'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : button.id === 'feePayment'
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <IconComponent className="w-4 h-4" />
          <span>{button.buttonText}</span>
        </Link>
      );
    }).filter(Boolean);
  };

  const renderCards = () => {
    if (!config?.cards) return null;
    
    return config.cards.map((card) => {
      if (!card.show) return null;
      const IconComponent = iconMap[card.icon] || MapPin;
      const isLocationCard = card.id === 'locationCard';
      
      return (
        <Link 
          key={card.id}
          href={card.url}
          className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors cursor-pointer group ${
            isLocationCard 
              ? 'bg-gray-50 hover:bg-gray-100' 
              : 'bg-green-50 hover:bg-green-100'
          }`}
        >
          <div className={`p-2 rounded-full ${
            isLocationCard ? 'bg-blue-100' : 'bg-green-200'
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
        </Link>
      );
    }).filter(Boolean);
  };

  const renderEditForm = () => (
    <div className="p-4 bg-white max-h-[70vh] overflow-y-auto">
      <div className="space-y-6">
        {/* School Information */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <Building className="h-4 w-4 mr-2 text-green-600" />
              School Information
            </h3>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo (optional)</label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border relative">
                    {config.logo ? (
                      (config.logo && (typeof config.logo === 'string') && config.logo.startsWith('http')) ? (
                        <img src={config.logo} alt="Logo preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image src={config.logo} alt="Logo preview" fill className="object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <FileUpload
                      currentUrl={config.logo || ''}
                      onUploadSuccess={(url) => handleInputChange('logo', url)}
                      label="Upload Logo"
                    />
                    {config.logo && (
                      <button
                        onClick={() => handleInputChange('logo', '')}
                        className="mt-2 text-sm text-red-600 hover:underline flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove Logo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <textarea
                value={config.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows="2"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Established</label>
                <input
                  type="text"
                  value={config.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years</label>
                <input
                  type="text"
                  value={config.yearsOfExistence}
                  onChange={(e) => handleInputChange('yearsOfExistence', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <input
              type="checkbox"
              checked={config.showContactInfo}
              onChange={() => handleToggle('showContactInfo')}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          {config.showContactInfo && (
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <Globe className="h-4 w-4 mr-2 text-purple-600" />
              Quick Links
            </h3>
            <input
              type="checkbox"
              checked={config.showQuickLinks}
              onChange={() => handleToggle('showQuickLinks')}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
          <div className="p-4 space-y-3">
            {config.quickLinks.map((link, index) => (
              <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={link.show}
                    onChange={() => handleArrayItemToggle('quickLinks', index, 'show')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <div className="flex items-center space-x-2">
                    <select
                      value={link.icon}
                      onChange={(e) => handleArrayItemChange('quickLinks', index, 'icon', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.keys(iconMap).map(iconKey => (
                        <option key={iconKey} value={iconKey}>{iconKey}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleArrayItemChange('quickLinks', index, 'label', e.target.value)}
                      className="text-sm border-0 bg-transparent p-1 rounded text-gray-900"
                    />
                  </div>
                  <input
                    type="text"
                    value={link.url}
                    readOnly
                    className="text-xs text-gray-400 border-0 bg-transparent p-1 rounded flex-1 cursor-not-allowed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <Settings className="h-4 w-4 mr-2 text-orange-600" />
              Action Buttons
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {config.actionButtons.map((button, index) => (
              <div key={button.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={button.show}
                    onChange={() => handleArrayItemToggle('actionButtons', index, 'show')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <div className="flex items-center space-x-2">
                    <select
                      value={button.icon}
                      onChange={(e) => handleArrayItemChange('actionButtons', index, 'icon', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.keys(iconMap).map(iconKey => (
                        <option key={iconKey} value={iconKey}>{iconKey}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={button.buttonText}
                      onChange={(e) => handleArrayItemChange('actionButtons', index, 'buttonText', e.target.value)}
                      className="text-sm border-0 bg-transparent p-1 rounded text-gray-900"
                    />
                  </div>
                  <input
                    type="text"
                    value={button.url}
                    readOnly
                    className="text-xs text-gray-400 border-0 bg-transparent p-1 rounded flex-1 cursor-not-allowed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-green-600" />
              Information Cards
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {config.cards.map((card, index) => (
              <div key={card.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={card.show}
                    onChange={() => handleArrayItemToggle('cards', index, 'show')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <div className="flex items-center space-x-2">
                    <select
                      value={card.icon}
                      onChange={(e) => handleArrayItemChange('cards', index, 'icon', e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      {Object.keys(iconMap).map(iconKey => (
                        <option key={iconKey} value={iconKey}>{iconKey}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleArrayItemChange('cards', index, 'title', e.target.value)}
                      className="text-sm border-0 bg-transparent p-1 rounded text-gray-900"
                    />
                  </div>
                  <input
                    type="text"
                    value={card.subtitle}
                    onChange={(e) => handleArrayItemChange('cards', index, 'subtitle', e.target.value)}
                    className="text-sm border-0 bg-transparent p-1 rounded text-gray-900 flex-1"
                  />
                  <input
                    type="text"
                    value={card.url}
                    onChange={(e) => handleArrayItemChange('cards', index, 'url', e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 flex-1"
                    placeholder="URL path"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admissions Status */}
        <div className="border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-semibold text-gray-800 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-green-600" />
              Admissions Status
            </h3>
            <input
              type="checkbox"
              checked={config.admissionsOpen}
              onChange={() => handleToggle('admissionsOpen')}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ModalFooter = () => (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex space-x-2">
        <button
          onClick={handleCancel}
          className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1"
        >
          <Ban className="h-4 w-4" />
          <span>Cancel</span>
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 text-sm text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center space-x-1"
        >
          <Settings className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-3 py-2 text-sm text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center space-x-1"
        >
          <Eye className="h-4 w-4" />
          <span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  const renderNavbar = () => (
    <>
      {isScrolled && navHeight > 0 && (
        <div style={{ height: navHeight }} aria-hidden="true" />
      )}
      {/* Top Info Bar */}
      {config.showTopBar && (
        <div className="hidden lg:block bg-green-800 text-white">
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
                </div>
              )}
              {config.showQuickLinks && (
                <div className="flex items-center space-x-4">
                  {renderQuickLinks()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={`${isScrolled ? 'fixed top-0 left-0 right-0 w-full z-50' : 'sticky top-0 left-0 z-50'} bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 lg:py-4">
            <div className="flex items-center space-x-3 lg:space-x-4">
                <Link href="/" className="flex-shrink-0">
                  <div className="h-12 w-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center border-3 border-green-500 shadow-lg overflow-hidden bg-green-600 relative">
                      {config.logo ? (
                        (config.logo && (typeof config.logo === 'string') && config.logo.startsWith('http')) ? (
                          <img src={config.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <Image src={config.logo} alt="Logo" fill className="object-cover" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-green-600">
                          <GraduationCap className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400" />
                        </div>
                      )}
                    </div>
                </Link>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-green-700 leading-tight">
                  {config.name}
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">
                  {config.address}
                </p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-6">
              {renderCards()}
            </div>
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="hidden lg:flex items-center space-x-3">
                {renderActionButtons()}
              </div>
              {editMode && (
                <button
                  onClick={() => setEditFormOpen(true)}
                  className="bg-white text-green-600 rounded-full p-2 shadow-sm hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-105"
                  title="Configure Navbar"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600"></div>
      </nav>
    </>
  );

  if (!config) return <div className="h-20 bg-white border-b"></div>;

  return (
    <div className="relative">
      {previewMode ? (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50 bg-yellow-500 text-white text-center py-1 text-xs font-medium">
            Preview Mode
          </div>
          <div className="pt-8">
            {renderNavbar()}
          </div>
        </div>
      ) : (
        renderNavbar()
      )}

      {editFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleCancel}></div>
            
            <div className="relative inline-block w-full max-w-4xl text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Navbar Configuration</h2>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {config.quickLinks.filter(item => item.show).length} quick links
                  </span>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Edit Form Content */}
              {renderEditForm()}

              {/* Modal Footer */}
              <ModalFooter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
