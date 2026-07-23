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
  Eye,
  Settings,
  Edit,
  Plus,
  Ban,
  Send,
  Download as DownloadIcon
} from 'lucide-react';
import defaultNavItems from '@/data/navigation.json';

const Navigation = ({ schoolData = {} }) => {
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
            const { decryptObject } = await import('@/utils/encryption');
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);   // Mobile dropdown state
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState(null); // Desktop dropdown state
  const [isScrolled, setIsScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [config, setConfig] = useState(null);
  const [errors, setErrors] = useState({});
  const [originalConfig, setOriginalConfig] = useState(null);

  const dropdownRefs = useRef({});

  const iconMap = {
    Home, Users, BookOpen, Calendar, Camera, Phone, Award, FileText,
    GraduationCap, Clock, Target, UserCheck, Building, Trophy, Book,
    Library, Calculator, Palette, Music, Activity, Bus, ShieldCheck,
    Utensils, Star, Eye, Settings, ArrowRight, ChevronDown,
    Menu, X, Edit, Plus, Ban, Send, DownloadIcon
  };



  const getIconComponent = (iconName) => iconMap[iconName] || Home;

  const mapIconsToComponents = (items) => items.map(item => ({
    ...item,
    icon: item.icon,
    dropdown: item.dropdown ? item.dropdown.map(sub => ({ ...sub, icon: sub.icon })) : undefined
  }));

  useEffect(() => {
    const savedConfig = localStorage.getItem('navigationConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(mapIconsToComponents(parsedConfig));
        setOriginalConfig(JSON.parse(JSON.stringify(parsedConfig)));
      } catch (error) {
        const mergedNavItems = schoolData.navigationItems || defaultNavItems;
        setConfig(mapIconsToComponents(mergedNavItems));
        setOriginalConfig(JSON.parse(JSON.stringify(mergedNavItems)));
      }
    } else {
      const mergedNavItems = schoolData.navigationItems || defaultNavItems;
      setConfig(mapIconsToComponents(mergedNavItems));
      setOriginalConfig(JSON.parse(JSON.stringify(mergedNavItems)));
    }
  }, []);

  useEffect(() => {
    if (role === 'admin') setEditMode(true);
    else {
      setEditMode(false);
      setPreviewMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(ref =>
        ref && !ref.contains(event.target)
      );
      if (isOutside) setDesktopActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
    if (isMobileMenuOpen) setMobileActiveDropdown(null);
  };

  const toggleMobileDropdown = (name) => {
    setMobileActiveDropdown(prev => prev === name ? null : name);
  };

  const toggleDesktopDropdown = (name) => {
    setDesktopActiveDropdown(prev => prev === name ? null : name);
  };

  const filteredNavItems = config ? config.filter(item => item.show !== false) : [];

  // === All your edit functions - 100% preserved ===
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

  const addMainItem = () => {
    setConfig(prev => [...prev, {
      name: 'New Item',
      href: '/new-item',
      icon: 'Home',
      show: true,
      dropdown: [],
      isNew: true
    }]);
  };

  const validateConfig = () => {
    const newErrors = {};
    if (!config || config.filter(item => item.show).length === 0) {
      newErrors.general = 'At least one navigation item must be visible';
    }
    config.forEach((item, index) => {
      if (item.show) {
        if (!item.name.trim()) newErrors[`${index}-name`] = 'Name is required';
        if (!item.href.trim()) newErrors[`${index}-href`] = 'URL is required';
        if (item.dropdown) {
          item.dropdown.forEach((sub, subIndex) => {
            if (sub.show) {
              if (!sub.name.trim()) newErrors[`${index}-${subIndex}-name`] = 'Sub-item name is required';
              if (!sub.href.trim()) newErrors[`${index}-${subIndex}-href`] = 'Sub-item URL is required';
            }
          });
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateConfig()) {
      localStorage.setItem('navigationConfig', JSON.stringify(config));
      setPreviewMode(false);
      setEditFormOpen(false);
      setOriginalConfig(JSON.parse(JSON.stringify(config)));
    }
  };

  const handleCancel = () => {
    setConfig(mapIconsToComponents(originalConfig));
    setErrors({});
    setEditFormOpen(false);
    setPreviewMode(false);
  };

  const handleReset = () => {
    setConfig(mapIconsToComponents(defaultNavItems));
    setErrors({});
  };

  // Your exact edit form - untouched
  const renderEditForm = () => (
    <div className="p-4 bg-white max-h-[70vh] overflow-y-auto">
      <div className="space-y-4">
        {config.map((item, index) => {
          const IconComponent = getIconComponent(item.icon);
          return (
            <div key={index} className="border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-3 flex-1">
                  <input type="checkbox" checked={item.show} onChange={() => handleToggle(index, 'show')} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                    <input type="text" value={item.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} className={`text-sm font-medium border-0 bg-transparent p-1 rounded ${errors[`${index}-name`] ? 'text-red-600 bg-red-50' : 'text-gray-900'}`} placeholder="Menu name" />
                  </div>
                  <input type="text" value={item.href} onChange={(e) => handleInputChange(index, 'href', e.target.value)} readOnly={!item.isNew} className={`text-xs border-0 bg-transparent p-1 rounded flex-1 ${item.isNew ? 'text-gray-700' : 'text-gray-400 cursor-not-allowed'} ${errors[`${index}-href`] ? 'text-red-600 bg-red-50' : ''}`} placeholder="/url-path" />
                </div>
              </div>

              {item.dropdown && item.dropdown.length > 0 && (
                <div className="p-2 bg-gray-25 border-t border-gray-100">
                  <div className="space-y-2">
                    {item.dropdown.map((subItem, subIndex) => {
                      const SubIconComponent = getIconComponent(subItem.icon);
                      return (
                        <div key={subIndex} className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded">
                          <div className="flex items-center space-x-3 flex-1">
                            <input type="checkbox" checked={subItem.show} onChange={() => handleSubItemToggle(index, subIndex, 'show')} className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                            <div className="flex items-center space-x-2">
                              <SubIconComponent className="h-3 w-3 text-gray-500" />
                              <input type="text" value={subItem.name} onChange={(e) => handleSubItemChange(index, subIndex, 'name', e.target.value)} className={`text-xs border-0 bg-transparent p-1 rounded ${errors[`${index}-${subIndex}-name`] ? 'text-red-600 bg-red-50' : 'text-gray-700'}`} placeholder="Submenu name" />
                            </div>
                            <input type="text" value={subItem.href} onChange={(e) => handleSubItemChange(index, subIndex, 'href', e.target.value)} readOnly={!subItem.isNew} className={`text-xs border-0 bg-transparent p-1 rounded flex-1 ${subItem.isNew ? 'text-gray-700' : 'text-gray-400 cursor-not-allowed'} ${errors[`${index}-${subIndex}-href`] ? 'text-red-600 bg-red-50' : ''}`} placeholder="/submenu-url" />
                            <input type="text" value={subItem.desc || ''} onChange={(e) => handleSubItemChange(index, subIndex, 'desc', e.target.value)} className="text-xs border-0 bg-transparent p-1 rounded flex-1 text-gray-400" placeholder="Description (optional)" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button onClick={addMainItem} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center space-x-2">
          <Plus className="h-4 w-4" />
          <span className="text-sm">Add New Menu Item</span>
        </button>
      </div>
    </div>
  );

  const ModalFooter = () => (
    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
      <div className="flex space-x-2">
        <button onClick={handleCancel} className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1">
          <Ban className="h-4 w-4" /><span>Cancel</span>
        </button>
        <button onClick={handleReset} className="px-3 py-2 text-sm text-red-700 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center space-x-1">
          <Settings className="h-4 w-4" /><span>Reset</span>
        </button>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => setPreviewMode(!previewMode)} className="px-3 py-2 text-sm text-blue-700 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors flex items-center space-x-1">
          <Eye className="h-4 w-4" /><span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
        <button onClick={handleSave} className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1">
          <Send className="h-4 w-4" /><span>Save</span>
        </button>
      </div>
    </div>
  );

  const renderNavigation = () => (
    <nav className={`bg-white shadow-sm border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Navigation - Your design */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {filteredNavItems.map((item) => {
              const IconComponent = getIconComponent(item.icon);
              const hasDropdown = item.dropdown && item.dropdown.some(sub => sub.show !== false);

              return (
                <div key={item.name} className="relative" ref={el => dropdownRefs.current[item.name] = el}>
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleDesktopDropdown(item.name)}
                      className={`px-3 py-2 text-sm font-medium flex items-center transition-all duration-200 group relative rounded-md hover:bg-green-50
                        ${desktopActiveDropdown === item.name ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700'}`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                      <ChevronDown className={`ml-2 h-3 w-3 transition-transform duration-200 ${desktopActiveDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors duration-200 relative group rounded-md flex items-center"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )}

                  {hasDropdown && desktopActiveDropdown === item.name && (
                    <div className="absolute z-50 left-0 mt-2 w-80 rounded-lg shadow-xl bg-white ring-1 ring-gray-200 overflow-hidden">
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-800 flex items-center">
                          <IconComponent className="w-4 h-4 mr-2 text-green-600" />
                          {item.name}
                        </h3>
                      </div>
                      <div className="p-2 max-h-96 overflow-y-auto">
                        {item.dropdown.filter(sub => sub.show !== false).map((subItem) => {
                          const SubIconComponent = getIconComponent(subItem.icon);
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group flex items-center p-3 rounded-lg hover:bg-green-50 transition-all duration-200"
                              onClick={() => setDesktopActiveDropdown(null)}
                            >
                              <div className="flex-shrink-0">
                                <SubIconComponent className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-800 group-hover:text-green-700">{subItem.name}</span>
                                  <ArrowRight className="h-3 w-3 text-gray-400 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                                </div>
                                {subItem.desc && <p className="text-xs text-gray-500 mt-0.5">{subItem.desc}</p>}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {editMode && (
              <button
                onClick={() => setEditFormOpen(true)}
                className="ml-2 bg-white text-green-600 rounded-full p-2 shadow-sm hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-105"
                title="Configure Navigation"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <span className="text-sm font-semibold text-green-700">Menu</span>
            <div className="flex items-center space-x-2">
              {editMode && (
                <button onClick={() => setEditFormOpen(true)} className="bg-white text-green-600 rounded-full p-2 shadow-sm hover:bg-green-50 transition-all duration-200 border border-green-200">
                  <Edit className="h-4 w-4" />
                </button>
              )}
              <button onClick={toggleMobileMenu} className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Now fixed and working perfectly */}
      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={toggleMobileMenu} />
          <div className="lg:hidden fixed inset-x-0 top-14 bottom-0 bg-white z-50 overflow-y-auto border-t border-gray-200">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation Menu</span>
              <button 
                onClick={toggleMobileMenu}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
            <div className="px-4 py-2 space-y-1">
              {filteredNavItems.map((item) => {
                const IconComponent = getIconComponent(item.icon);
                const hasDropdown = item.dropdown && item.dropdown.some(sub => sub.show !== false);

                return (
                  <div key={item.name}>
                    {hasDropdown ? (
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                      >
                        <div className="flex items-center">
                          <IconComponent className="w-4 h-4 mr-2" />
                          {item.name}
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileActiveDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    )}

                    {hasDropdown && mobileActiveDropdown === item.name && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-100 pl-3">
                        {item.dropdown.filter(sub => sub.show !== false).map((subItem) => {
                          const SubIconComponent = getIconComponent(subItem.icon);
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={toggleMobileMenu}
                              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                            >
                              <SubIconComponent className="w-4 h-4 mr-2 text-gray-400" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </nav>
  );

  if (!config) return <div className="h-14 bg-white border-b"></div>;

  return (
    <>
      {previewMode ? (
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50 bg-yellow-500 text-white text-center py-1 text-xs font-medium">
            Preview Mode
          </div>
          <div className="pt-8">{renderNavigation()}</div>
        </div>
      ) : (
        renderNavigation()
      )}

      {/* Your full edit modal - completely preserved */}
      {editFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleCancel}></div>

            <div className="relative inline-block w-full max-w-4xl text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Navigation Menu</h2>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {config.filter(item => item.show).length} visible items
                  </span>
                </div>
                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 p-1 rounded">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {renderEditForm()}

              <ModalFooter />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;