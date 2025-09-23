"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

const Navbar = ({ schoolData }) => {
  const role = 'admin'; // Change to 'user' for non-admin
  const [isScrolled, setIsScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false); // Controls modal visibility
  const [previewMode, setPreviewMode] = useState(false);
  const [config, setConfig] = useState(null);
  const [errors, setErrors] = useState({});

  // Default configuration
  const defaultConfig = {
    name: "St. Columba's School",
    address: "1, Ashok Place, New Delhi - 110001",
    tagline: "An Edmund Rice Educational Institution",
    establishedYear: "1927",
    yearsOfExistence: "97+",
    phone: "011 2336 3462 / 3134",
    email: "stcolumbas@stcolumbas.edu.in",
    workingHours: "Mon - Fri: 8:00 AM - 4:00 PM",
    showTopBar: true,
    showContactInfo: true,
    showQuickLinks: true,
    showLocationCard: true,
    showAdmissionsCard: true,
    showECareLogin: true,
    showFeePayment: true,
    showAdmissionsButton: true,
    showVirtualTour: true,
    showCareers: true,
    showAlumni: true,
    admissionsOpen: true,
    emergencyNotice: null,
    colors: {
      primary: '#166534', // green-700
      secondary: '#ca8a04', // yellow-500
      accent: '#ea580c' // orange-600
    }
  };

  // Merge provided schoolData with defaultConfig
  useEffect(() => {
    setConfig({ ...defaultConfig, ...schoolData });
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

  const handleColorChange = (colorKey, value) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorKey]: value }
    }));
    setErrors(prev => ({ ...prev, [colorKey]: null }));
  };

  const handleToggle = (field) => {
    setConfig(prev => ({ ...prev, [field]: !prev[field] }));
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
    if (!/^#[0-9A-Fa-f]{6}$/.test(config.colors.primary)) {
      newErrors.primary = 'Invalid primary color (use hex format, e.g., #166534)';
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(config.colors.secondary)) {
      newErrors.secondary = 'Invalid secondary color (use hex format, e.g., #ca8a04)';
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(config.colors.accent)) {
      newErrors.accent = 'Invalid accent color (use hex format, e.g., #ea580c)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save configuration
  const handleSave = () => {
    if (validateConfig()) {
      localStorage.setItem('navbarConfig', JSON.stringify(config));
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
      const dataStr = JSON.stringify(config, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = `navbar-config-${new Date().toISOString().split('T')[0]}.json`;
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
      localStorage.setItem('navbarConfig', JSON.stringify(config));
      alert('Configuration saved! Redirecting to homepage.');
      window.location.href = '/';
    } else {
      alert('Please fix validation errors before saving.');
    }
  };

  // Reset to default
  const handleReset = () => {
    setConfig(defaultConfig);
    setErrors({});
    alert('Configuration reset to default.');
  };

  // Render edit form for admins
  const renderEditForm = () => (
    <div className="space-y-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Navbar Configuration</h2>
        <button
          onClick={() => setEditFormOpen(false)}
          className="text-gray-600 hover:text-gray-800"
          aria-label="Close configuration"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-6">
        {/* General Settings */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
              <input
                type="text"
                value={config.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
              <input
                type="text"
                value={config.establishedYear}
                onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Existence</label>
              <input
                type="text"
                value={config.yearsOfExistence}
                onChange={(e) => handleInputChange('yearsOfExistence', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={config.showContactInfo}
              onChange={() => handleToggle('showContactInfo')}
              className="mr-2"
            />
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
          </div>
          {config.showContactInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  value={config.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={config.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                <input
                  type="text"
                  value={config.workingHours}
                  onChange={(e) => handleInputChange('workingHours', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={config.showQuickLinks}
              onChange={() => handleToggle('showQuickLinks')}
              className="mr-2"
            />
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          </div>
          {config.showQuickLinks && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showVirtualTour}
                  onChange={() => handleToggle('showVirtualTour')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Virtual Tour</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showCareers}
                  onChange={() => handleToggle('showCareers')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Careers</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.showAlumni}
                  onChange={() => handleToggle('showAlumni')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Alumni</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Action Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.showECareLogin}
                onChange={() => handleToggle('showECareLogin')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">e-Care Login</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.showFeePayment}
                onChange={() => handleToggle('showFeePayment')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Pay Fees</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.showAdmissionsButton}
                onChange={() => handleToggle('showAdmissionsButton')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Admissions Button</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.showLocationCard}
                onChange={() => handleToggle('showLocationCard')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Location Card</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.showAdmissionsCard}
                onChange={() => handleToggle('showAdmissionsCard')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Admissions Card</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.admissionsOpen}
                onChange={() => handleToggle('admissionsOpen')}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Admissions Open</span>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color *</label>
              <input
                type="color"
                value={config.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={config.colors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.primary ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="#166534"
              />
              {errors.primary && <p className="text-red-500 text-xs mt-1">{errors.primary}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color *</label>
              <input
                type="color"
                value={config.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={config.colors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.secondary ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="#ca8a04"
              />
              {errors.secondary && <p className="text-red-500 text-xs mt-1">{errors.secondary}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color *</label>
              <input
                type="color"
                value={config.colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={config.colors.accent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className={`w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.accent ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="#ea580c"
              />
              {errors.accent && <p className="text-red-500 text-xs mt-1">{errors.accent}</p>}
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Notice</h3>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={!!config.emergencyNotice}
              onChange={() => handleInputChange('emergencyNotice', config.emergencyNotice ? null : '')}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Show Emergency Notice</span>
          </div>
          {config.emergencyNotice !== null && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Text</label>
              <textarea
                value={config.emergencyNotice}
                onChange={(e) => handleInputChange('emergencyNotice', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
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
    </div>
  );

  // Render navbar for preview or normal view
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
              {config.showQuickLinks && (
                <div className="flex items-center space-x-4">
                  {config.showVirtualTour && (
                    <>
                      <Link href="/virtual-tour" className="hover:text-yellow-300 transition-colors flex items-center space-x-1">
                        <Globe className="w-3 h-3" />
                        <span>Virtual Tour</span>
                      </Link>
                      <span className="text-green-300">|</span>
                    </>
                  )}
                  {config.showCareers && (
                    <>
                      <Link href="/careers" className="hover:text-yellow-300 transition-colors">
                        Careers
                      </Link>
                      <span className="text-green-300">|</span>
                    </>
                  )}
                  {config.showAlumni && (
                    <Link href="/alumni" className="hover:text-yellow-300 transition-colors">
                      Alumni
                    </Link>
                  )}
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
              {config.showLocationCard && (
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                  <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Location</p>
                    <p className="text-xs text-blue-600 hover:underline flex items-center">
                      Virtual Tour <ExternalLink className="w-3 h-3 ml-1" />
                    </p>
                  </div>
                </div>
              )}
              {config.showAdmissionsCard && config.admissionsOpen && (
                <div className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-lg hover:from-green-100 hover:to-green-200 transition-all cursor-pointer group">
                  <div className="p-2 bg-green-200 rounded-full group-hover:bg-green-300 transition-colors">
                    <FileText className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Admissions</p>
                    <p className="text-xs text-green-700 font-medium">Open Now</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="flex lg:hidden items-center space-x-2">
                {config.showAdmissionsButton && config.admissionsOpen && (
                  <Link 
                    href="/admissions"
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
                {config.showECareLogin && (
                  <Link 
                    href="/ecare-login"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <User className="w-4 h-4" />
                    <span>e-Care Login</span>
                  </Link>
                )}
                {config.showFeePayment && (
                  <Link 
                    href="/pay-fees"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg"
                    style={{ 
                      backgroundColor: config?.colors?.accent || '#ea580c',
                    }}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Fees</span>
                  </Link>
                )}
                {config.showAdmissionsButton && config.admissionsOpen && (
                  <Link 
                    href="/admissions"
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2 shadow-md hover:shadow-lg"
                    style={{ 
                      background: config?.colors?.primary 
                        ? `linear-gradient(to right, ${config.colors.primary}, ${config.colors.primary}E6)`
                        : undefined,
                    }}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Admissions</span>
                  </Link>
                )}
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
                  <Settings className="h-5 w-5" />
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
            {config.showVirtualTour && (
              <Link href="/virtual-tour" className="flex items-center space-x-1 text-yellow-300 hover:text-yellow-200">
                <Globe className="w-3 h-3" />
                <span>Virtual Tour</span>
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

      {/* Edit Form Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            {previewMode ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Navbar Preview</h2>
                  <button
                    onClick={() => setEditFormOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                    aria-label="Close preview"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                {renderNavbar()}
              </div>
            ) : (
              renderEditForm()
            )}
          </div>
        </div>
      )}

      {/* Admin Action Buttons */}
      {/* {editMode && !editFormOpen && (
        <div className="fixed top-4 right-4 flex space-x-3 z-40">
          <button
            onClick={handleDownload}
            className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Download configuration"
            aria-label="Download configuration"
          >
            <Download className="h-5 w-5" />
          </button>
          <button
            onClick={handleSaveExit}
            className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
            title="Save and exit"
            aria-label="Save and exit"
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;