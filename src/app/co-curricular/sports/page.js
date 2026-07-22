"use client";
import defaultData from '@/data/sports.json';

import React, { useState, useEffect } from 'react';
import { 
  Trophy,
  Medal,
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
  Activity,
  Target,
  Shield,
  TrendingUp,
  Camera,
  Video,
  BookOpen,
  Phone,
  Mail,
  Map,
  ArrowRight,
  Crown,
  Filter,
  Globe,
  Lightbulb,
  Ribbon,
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

const SportsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTeam, setActiveTeam] = useState('basketball');
  const [openAchievement, setOpenAchievement] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [role, setRole] = useState(null); // Will be derived from stored user
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

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
  

  // Icon mapping
  const iconMap = {
    Trophy, Medal, Users, Calendar, MapPin, Clock, Award, Star, ChevronDown, ChevronRight,
    Play, Download, ExternalLink, Heart, Activity, Target, Shield, TrendingUp, Camera,
    Video, BookOpen, Phone, Mail, Map, ArrowRight, Crown, Filter, Globe, Lightbulb, Ribbon
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    sportsCategories: 'showSportsCategories',
    teamSports: 'showTeamSports',
    individualSports: 'showIndividualSports',
    facilities: 'showFacilities',
    upcomingEvents: 'showUpcomingEvents',
    achievements: 'showAchievements',
    coaches: 'showCoaches',
    cta: 'showCta',
    contact: 'showContact'
  };

  // Sections for visibility modal
  const sectionDisplay = [
    { key: 'hero', label: 'Hero' },
    { key: 'sportsCategories', label: 'Sports Categories' },
    { key: 'teamSports', label: 'Team Sports' },
    { key: 'individualSports', label: 'Individual Sports' },
    { key: 'facilities', label: 'Facilities' },
    { key: 'upcomingEvents', label: 'Upcoming Events' },
    { key: 'achievements', label: 'Achievements' },
    { key: 'coaches', label: 'Coaches' },
    { key: 'cta', label: 'Call To Action' },
    { key: 'contact', label: 'Contact' }
  ];

  const toggleSectionVisibility = (key) => {
    setData(prev => {
      const layoutKey = layoutMap[key];
      const updated = { ...prev };
      // clone layout to avoid mutating nested object
      updated.layout = { ...(prev.layout || {}) };
      if (layoutKey) {
        updated.layout[layoutKey] = !Boolean(prev.layout?.[layoutKey]);
      }
      // clone section object if present and it's an object
      if (prev[key] && typeof prev[key] === 'object') {
        updated[key] = { ...prev[key], show: !Boolean(prev[key]?.show) };
      }
      return updated;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_sports_data', { payload: encrypted });
        if (save_data?.status === 200) {
          // data already updated locally via toggleSectionVisibility
        } else {
          console.error('Save failed:', save_data);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    setSectionVisibilityModal(false);
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

  const handleImageChange = (field, url, arrayKey = null, index = null) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (arrayKey && index !== null) {
        if (!updated[arrayKey]) updated[arrayKey] = [];
        updated[arrayKey][index][field] = url;
      } else {
        updated[field] = url;
      }
      return updated;
    });
  };

  const handleSubObjectToggle = (subKey, value) => {
    setEditData(prev => ({
      ...prev,
      [subKey]: { ...prev[subKey], show: value }
    }));
  };

  // Toggle section
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
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
        const save_data = await apiRequest('save_data/save_sports_data', { payload: encrypted });
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
  const filteredCategories = data.sportsCategories?.items?.filter(cat => cat.show !== false) || [];
  const filteredTeams = data.teamSports?.teams?.filter(team => team.show !== false) || [];
  const filteredIndividualSports = data.individualSports?.items?.filter(sport => sport.show !== false) || [];
  const filteredFacilities = data.facilities?.items?.filter(facility => facility.show !== false) || [];
  const filteredEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredCoaches = data.coaches?.items?.filter(coach => coach.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredContactItems = data.contact?.items?.filter(item => item.show !== false) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sports data...</p>
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
              {editSection === 'sportsCategories' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Sports Categories</span>
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
              {editSection === 'teamSports' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Team Sports</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Teams</h3>
                  {(editData.teams || []).map((team, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Team {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">ID</label>
                          <input type="text" value={team.id || ''} onChange={(e) => handleArrayChange('teams', index, 'id', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={team.name || ''} onChange={(e) => handleArrayChange('teams', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <select value={team.icon || ''} onChange={(e) => handleArrayChange('teams', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Icon</option>
                            {Object.keys(iconMap).map(key => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Coach</label>
                          <input type="text" value={team.coach || ''} onChange={(e) => handleArrayChange('teams', index, 'coach', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image</label>
                          <FileUpload currentUrl={team.image || ''} onUploadSuccess={(url) => handleImageChange('image', url, 'teams', index)} label="Upload Team Image" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Schedule</label>
                          <input type="text" value={team.schedule || ''} onChange={(e) => handleArrayChange('teams', index, 'schedule', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Members</label>
                          <input type="text" value={team.members || ''} onChange={(e) => handleArrayChange('teams', index, 'members', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <h5 className="text-sm font-medium mt-3 mb-1">Achievements</h5>
                        {(team.achievements || []).map((ach, achIndex) => (
                          <input
                            key={achIndex}
                            type="text"
                            value={ach || ''}
                            onChange={(e) => handleListChange('teams', index, 'achievements', team.achievements.map((a, i) => i === achIndex ? e.target.value : a))}
                            className="w-full p-1 border rounded mb-1 text-sm"
                            placeholder={`Achievement ${achIndex + 1}`}
                          />
                        ))}
                        <h5 className="text-sm font-medium mt-3 mb-1">Button</h5>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={team.button?.show !== false} onChange={(e) => handleNestedObjectChange('teams', index, 'button', 'show', e.target.checked)} />
                            <span>Show Button</span>
                          </label>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium">Button Label</label>
                            <input type="text" value={team.button?.label || ''} onChange={(e) => handleNestedObjectChange('teams', index, 'button', 'label', e.target.value)} className="w-full p-2 border rounded" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Button Link</label>
                            <input type="text" value={team.button?.link || ''} onChange={(e) => handleNestedObjectChange('teams', index, 'button', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., # or /register" />
                          </div>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={team.show !== false} onChange={(e) => handleArrayChange('teams', index, 'show', e.target.checked)} />
                            <span>Show Team</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'individualSports' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Individual Sports</span>
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
                          <label className="block text-sm font-medium">Icon</label>
                          <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Select Icon</option>
                            {Object.keys(iconMap).map(key => (
                              <option key={key} value={key}>{key}</option>
                            ))}
                          </select>
                        </div>
                        <h5 className="text-sm font-medium mt-3 mb-1">Achievements</h5>
                        {(item.achievements || []).map((ach, achIndex) => (
                          <input
                            key={achIndex}
                            type="text"
                            value={ach || ''}
                            onChange={(e) => handleListChange('items', index, 'achievements', item.achievements.map((a, i) => i === achIndex ? e.target.value : a))}
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
                        <h5 className="text-sm font-medium mt-3 mb-1">Button</h5>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={item.button?.show !== false} onChange={(e) => handleNestedObjectChange('items', index, 'button', 'show', e.target.checked)} />
                            <span>Show Button</span>
                          </label>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="block text-sm font-medium">Button Label</label>
                            <input type="text" value={item.button?.label || ''} onChange={(e) => handleNestedObjectChange('items', index, 'button', 'label', e.target.value)} className="w-full p-2 border rounded" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Button Link</label>
                            <input type="text" value={item.button?.link || ''} onChange={(e) => handleNestedObjectChange('items', index, 'button', 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., # or /register" />
                          </div>
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
              {editSection === 'coaches' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Coaches</span>
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
                          <label className="block text-sm font-medium">Sport</label>
                          <input type="text" value={item.sport || ''} onChange={(e) => handleArrayChange('items', index, 'sport', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Qualification</label>
                          <input type="text" value={item.qualification || ''} onChange={(e) => handleArrayChange('items', index, 'qualification', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Experience</label>
                          <input type="text" value={item.experience || ''} onChange={(e) => handleArrayChange('items', index, 'experience', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Achievement</label>
                          <input type="text" value={item.achievement || ''} onChange={(e) => handleArrayChange('items', index, 'achievement', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Image</label>
                          <FileUpload currentUrl={item.image || ''} onUploadSuccess={(url) => handleImageChange('image', url, 'items', index)} label="Upload Coach Image" />
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
                          <input type="text" value={button.link || ''} onChange={(e) => handleArrayChange('buttons', index, 'link', e.target.value)} className="w-full p-2 border rounded" placeholder="Button link (e.g., # or /contact)" />
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
                      <span className={`w-3 h-3 rounded-full ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!data[section.key]?.show) ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(section.key)}
                      className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!data[section.key]?.show) ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                      <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform`} />
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

      {/* Floating Manage Visibility Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Manage Section Visibility"
        >
          <Edit className="h-5 w-5" />
        </button>
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
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sports Categories */}
        {data.layout?.showSportsCategories && data.sportsCategories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.sportsCategories.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = iconMap[category.icon];
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
                  </button>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('sportsCategories')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Team Sports */}
        {data.layout?.showTeamSports && data.teamSports?.show && filteredTeams.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.teamSports.title}</h2>
            
            {/* Team Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
                  {filteredTeams.map(team => {
                const IconComponent = iconMap[team.icon];
                return (
                  <button
                    key={team.id}
                    onClick={() => setActiveTeam(team.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTeam === team.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {team.name}
                  </button>
                );
              })}
            </div>

            {/* Team Details */}
            {filteredTeams.map(team => {
              if (team.id !== activeTeam) return null;
              const IconComponent = iconMap[team.icon];
              return (
                <div key={team.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {team.image && (
                      <div className="w-full h-48 relative mb-4">
                        <Image src={team.image} alt={team.name} fill unoptimized className="object-cover rounded-lg" />
                      </div>
                    )}
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-lg p-3 mr-4">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{team.name} Team</h3>
                        <p className="text-gray-600">Coach: {team.coach}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Practice Schedule</h4>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {team.schedule}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Team Members</h4>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {team.members}
                        </div>
                      </div>

                      {team.button?.show !== false && (
                        <a href={team.button?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block">
                          {team.button?.label || 'Join Team Tryouts'}
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Recent Achievements</h4>
                    <ul className="space-y-2">
                      {team.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
            {editMode && <button onClick={() => openEditModal('teamSports')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Individual Sports */}
        {data.layout?.showIndividualSports && data.individualSports?.show && filteredIndividualSports.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.individualSports.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIndividualSports.map((sport, index) => {
                const IconComponent = iconMap[sport.icon];
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{sport.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{sport.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Achievements</h4>
                      <ul className="space-y-1">
                        {sport.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <Award className="h-3 w-3 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('individualSports')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Sports Facilities */}
        {data.layout?.showFacilities && data.facilities?.show && filteredFacilities.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.facilities.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredFacilities.map((facility, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <div className="w-full h-48 relative">
                      <Image src={facility.image} alt={facility.name} fill unoptimized className="object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{facility.name}</h3>
                  <p className="text-sm text-gray-600">{facility.description}</p>
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
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 rounded-lg p-3 mr-4 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
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
                  {event.button?.show !== false && (
                    <a href={event.button?.link || '#'} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                      {event.button?.label || 'Register'}
                    </a>
                  )}
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
                    {year.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
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

        {/* Coaches */}
        {data.layout?.showCoaches && data.coaches?.show && filteredCoaches.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.coaches.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCoaches.map((coach, index) => (
                <div key={index} className="text-center">
                  {coach.image ? (
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 relative overflow-hidden">
                      <Image src={coach.image} alt={coach.name} fill unoptimized className="object-cover" />
                    </div>
                  ) : (
                    <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-800">{coach.name}</h3>
                  <p className="text-green-600 font-medium">{coach.sport} Coach</p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>{coach.qualification}</p>
                    <p>{coach.experience} Experience</p>
                    <p className="text-green-700">{coach.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('coaches')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
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
                <a 
                  key={index} 
                  href={button.link || '#'} 
                  className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105"
                >
                  {button.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                const IconComponent = iconMap[item.icon];
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

export default SportsPage;