"use client";
import defaultData from '@/data/school-calendar.json';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Book,
  Trophy,
  Music,
  Palette,
  Microscope,
  Globe,
  Award,
  Star,
  Heart,
  FileText,
  ExternalLink,
  GraduationCap,
  TestTube,
  Drama,
  Bell,
  Bus,
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
import Spinner from '@components/Spinner/Spinner';
import Image from 'next/image';

const SchoolCalendarPage = ({  }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeCategory, setActiveCategory] = useState('all');
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
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

  // Layout mapping for sections with show property
  const layoutMap = {
    hero: 'hero',
    benefits: 'benefits',
    academicOverview: 'academicOverview',
    resources: 'resources',
    cta: 'cta'
  };

  const sectionDisplayNames = {
    hero: 'Hero Section',
    benefits: 'Benefits',
    academicOverview: 'Academic Overview',
    resources: 'Resources',
    cta: 'CTA'
  };

  // Icon mapping
  const iconMap = {
    Calendar,
    Download,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Clock,
    Users,
    Book,
    Trophy,
    Music,
    Palette,
    Microscope,
    Globe,
    Award,
    Star,
    Heart,
    FileText,
    ExternalLink,
    GraduationCap,
    TestTube,
    Drama,
    Bell,
    Bus
  };

  // Default data structure for School Calendar
  

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
  

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredEventCategories = data.eventCategories?.filter(category => category.show !== false) || [];
  const filteredCalendarEvents = data.calendarEvents?.filter(event => event.show !== false) || [];
  const filteredAcademicTerms = data.academicOverview?.terms?.filter(term => term.show !== false) || [];
  const filteredAcademicStats = data.academicOverview?.stats?.filter(stat => stat.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  const toggleSectionVisibility = (key) => {
    setData(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        show: !(prev[key]?.show !== false)
      }
    }));
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = await encryptObject(data);
      await apiRequest('save_data/save_calendar_data', { payload });
      setSectionVisibilityModal(false);
    } catch (error) {
      console.error('Failed to save section visibility', error);
    }
  };

  // Process events to convert date strings to Date objects
  const processEvents = () => {
    return filteredCalendarEvents.map(event => ({
      ...event,
      date: new Date(event.date),
      endDate: event.endDate ? new Date(event.endDate) : null,
      icon: iconMap[event.icon]
    }));
  };

  const calendarEvents = processEvents();

  // Function to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, events: [] });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear &&
          (activeCategory === 'all' || event.category === activeCategory);
      });
      days.push({ day, date, events: dayEvents });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const goToToday = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calendarDays = generateCalendarDays();
  const currentMonthEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear &&
      (activeCategory === 'all' || event.category === activeCategory);
  });

  // Sort events by date for better display
  const sortedMonthEvents = [...currentMonthEvents].sort((a, b) => a.date - b.date);

  if (loading) {
    return <Spinner />;
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

  // Event Editor Component
  const EventEditor = () => {
    const events = editData.calendarEvents || [];
    const removeEvent = (index) => {
      const newEvents = events.filter((_, i) => i !== index);
      setEditData(prev => ({ ...prev, calendarEvents: newEvents }));
    };
    const addEvent = () => {
      const newEvents = [...events, {
        id: Date.now(),
        title: '',
        date: '',
        time: '',
        category: '',
        description: '',
        icon: '',
        location: '',
        priority: 'medium',
        show: true
      }];
      setEditData(prev => ({ ...prev, calendarEvents: newEvents }));
    };
    return (
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Event {index + 1}</h4>
              <button onClick={() => removeEvent(index)} className="text-red-600 hover:text-red-800">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <input value={event.title || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded mb-2" />
            <input type="date" value={event.date || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'date', e.target.value)} className="w-full p-2 border rounded mb-2" />
            <input value={event.time || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'time', e.target.value)} placeholder="Time" className="w-full p-2 border rounded mb-2" />
            <select value={event.category || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'category', e.target.value)} className="w-full p-2 border rounded mb-2">
              <option value="">Select Category</option>
              {filteredEventCategories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <textarea value={event.description || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" rows="3" />
            <input value={event.location || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'location', e.target.value)} placeholder="Location" className="w-full p-2 border rounded mb-2" />
            <select value={event.icon || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'icon', e.target.value)} className="w-full p-2 border rounded mb-2">
              <option value="">Select Icon</option>
              {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <input value={event.priority || ''} onChange={(e) => handleArrayChange('calendarEvents', index, 'priority', e.target.value)} placeholder="Priority (low/medium/high)" className="w-full p-2 border rounded mb-2" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={event.show !== false} onChange={(e) => handleArrayChange('calendarEvents', index, 'show', e.target.checked)} />
              <span>Show Event</span>
            </label>
          </div>
        ))}
        <button onClick={addEvent} className="flex items-center text-green-600 hover:text-green-800">
          <Plus className="h-4 w-4 mr-2" /> Add New Event
        </button>
      </div>
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

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (section === 'calendar') {
      const sectionData = { 
        calendarEvents: data.calendarEvents || [] 
      };
      setEditData(sectionData);
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data[layoutKey]?.show || false,
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
    if (editSection === 'calendar') {
      newData.calendarEvents = updatedData.calendarEvents || [];
    } else {
      const layoutKey = layoutMap[editSection];
      if (newData[layoutKey]) {
        newData[layoutKey].show = updatedData.showSection;
      }
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      if (newData[editSection]) {
        newData[editSection] = { ...newData[editSection], ...sectionContent };
      } else {
        newData[editSection] = sectionContent;
      }
    }
    setData(newData);
    try {
      const payload = await encryptObject(newData);
      await apiRequest('save_data/save_calendar_data', { payload });
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">CTA Button</h3>
                  <div className="space-y-2">
                    <input
                      value={editData.ctaButton?.label || ''}
                      onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full p-2 border rounded"
                    />
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload File (replaces link)</label>
                      <FileUpload
                        currentUrl={editData.ctaButton?.link || ''}
                        onUploadSuccess={(url) => handleNestedChange('ctaButton', 'link', url)}
                        isDocument={true}
                        label="Upload Full Calendar (PDF, DOCX, etc.)"
                        className="w-full"
                      />
                    </div>
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
              {editSection === 'academicOverview' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                      <span>Show Academic Overview</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Terms</h3>
                  {(editData.terms || []).map((term, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Term {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={term.period || ''} onChange={(e) => handleArrayChange('terms', index, 'period', e.target.value)} placeholder="Period" className="w-full p-2 border rounded" />
                        <input value={term.date || ''} onChange={(e) => handleArrayChange('terms', index, 'date', e.target.value)} placeholder="Date" className="w-full p-2 border rounded" />
                        <input value={term.events || ''} onChange={(e) => handleArrayChange('terms', index, 'events', e.target.value)} placeholder="Events" className="w-full p-2 border rounded" />
                        <input value={term.color || ''} onChange={(e) => handleArrayChange('terms', index, 'color', e.target.value)} placeholder="Color (e.g., bg-blue-500)" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={term.show !== false} onChange={(e) => handleArrayChange('terms', index, 'show', e.target.checked)} />
                          <span>Show Term</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div className="space-y-2">
                        <input value={stat.value || ''} onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)} placeholder="Value" className="w-full p-2 border rounded" />
                        <input value={stat.label || ''} onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)} placeholder="Label" className="w-full p-2 border rounded" />
                        <select value={stat.icon || ''} onChange={(e) => handleArrayChange('stats', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={stat.color || ''} onChange={(e) => handleArrayChange('stats', index, 'color', e.target.value)} placeholder="Color (e.g., blue)" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={stat.show !== false} onChange={(e) => handleArrayChange('stats', index, 'show', e.target.checked)} />
                          <span>Show Stat</span>
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
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <input value={item.format || ''} onChange={(e) => handleArrayChange('items', index, 'format', e.target.value)} placeholder="Format" className="w-full p-2 border rounded" />
                        <input value={item.size || ''} onChange={(e) => handleArrayChange('items', index, 'size', e.target.value)} placeholder="Size" className="w-full p-2 border rounded" />
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.downloads || ''} onChange={(e) => handleArrayChange('items', index, 'downloads', e.target.value)} placeholder="Downloads" className="w-full p-2 border rounded" />
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
                        <input value={button.variant || ''} onChange={(e) => handleArrayChange('buttons', index, 'variant', e.target.value)} placeholder="Variant (primary/secondary)" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={button.show !== false} onChange={(e) => handleArrayChange('buttons', index, 'show', e.target.checked)} />
                          <span>Show Button</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'calendar' && <EventEditor />}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <Image src={data.hero.backgroundImage || 'https://via.placeholder.com/1920x400'} alt={data.hero.title} fill className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed mb-8">
                {data.hero.subtitle}
              </p>
              {data.hero.ctaButton?.show !== false && (
                data.hero.ctaButton?.link ? (
                  <a
                    href={data.hero.ctaButton.link}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-green-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                  >
                    {data.hero.ctaButton.label}
                    <Download className="ml-2 h-5 w-5" />
                  </a>
                ) : (
                  <button disabled className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center opacity-60 cursor-not-allowed">
                    {data.hero.ctaButton.label}
                    <Download className="ml-2 h-5 w-5" />
                  </button>
                )
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.benefits.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Calendar;
                return (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                      <IconComponent className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Calendar Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800">{monthNames[currentMonth]} {currentYear}</h1>
              <p className="text-gray-600">Click on dates to view events</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigateMonth('prev')} className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={goToToday} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Today
              </button>
              <button onClick={() => navigateMonth('next')} className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {filteredEventCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 font-semibold text-gray-600 bg-gray-50 rounded-t-lg">
                {day}
              </div>
            ))}
            {calendarDays.map((dayData, index) => (
              <div key={index} className={`p-2 h-24 relative border rounded-lg transition-colors ${
                dayData.day ? 'cursor-pointer hover:bg-gray-50' : 'bg-gray-100'
              }`}>
                {dayData.day && (
                  <>
                    <div className="text-sm font-medium text-gray-800 mb-1">{dayData.day}</div>
                    <div className="space-y-1">
                      {dayData.events.slice(0, 2).map(event => {
                        const IconComponent = event.icon;
                        const category = filteredEventCategories.find(cat => cat.id === event.category);
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded ${category?.color || 'bg-gray-200'} text-white truncate`}
                            title={event.title}
                          >
                            <IconComponent className="inline h-3 w-3 mr-1" />
                            {event.title}
                          </div>
                        );
                      })}
                      {dayData.events.length > 2 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{dayData.events.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events - {monthNames[currentMonth]} {currentYear}</h2>
            <p className="text-gray-600">
              {sortedMonthEvents.length} events scheduled this month • Filter by category above
            </p>
          </div>

          {sortedMonthEvents.length > 0 ? (
            <div className="space-y-6">
              {sortedMonthEvents.map(event => {
                const IconComponent = event.icon;
                const category = filteredEventCategories.find(cat => cat.id === event.category);
                const isMultiDay = event.endDate;
                const isToday = event.date.toDateString() === new Date().toDateString();

                return (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-full ${category?.color} text-white`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${category?.color} text-white`}>
                            {category?.name}
                          </span>
                          {isToday && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              Today
                            </span>
                          )}
                          {event.priority === 'high' && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Important
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            {event.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                            {isMultiDay && (
                              <>
                                <span className="mx-2">→</span>
                                {event.endDate.toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </>
                            )}
                          </div>

                          {event.time && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-blue-600" />
                              {event.time}
                            </div>
                          )}

                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-red-600" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Add to Calendar
                        </button>
                        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events scheduled for {monthNames[currentMonth]}</h3>
              <p className="text-gray-600 mb-4">There are no events in the "{filteredEventCategories.find(cat => cat.id === activeCategory)?.name}" category for this month.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View all events
              </button>
            </div>
          )}
          {editMode && <button onClick={() => openEditModal('calendar')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </div>

        {/* Academic Year Overview */}
        {data.academicOverview?.show && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.academicOverview.title}</h2>
              <p className="text-gray-600">
                {data.academicOverview.subtitle}
              </p>
            </div>

            <div className="relative mb-12">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
                {filteredAcademicTerms.map((term, index) => (
                  <div key={index} className="relative text-center">
                    <div className={`${term.color} w-6 h-6 rounded-full mx-auto mb-2`}></div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-1">{term.period}</h3>
                      <p className="text-sm text-gray-600 mb-2">{term.date}</p>
                      <p className="text-xs text-gray-500">{term.events} major events</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredAcademicStats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 text-${stat.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('academicOverview')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Resources */}
        {data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon] || FileText;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-start">
                      <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                            <span>{resource.size}</span>
                          </div>
                          <span className="text-xs text-gray-400">{resource.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      {data.resources.downloadLabel}
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Subscription CTA */}
        {data.subscription?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{data.subscription.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.subscription.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto mb-4">
              <input
                type="email"
                placeholder={data.subscription.placeholder}
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                {data.subscription.buttonText}
              </button>
            </div>
            <p className="text-sm text-green-200 mb-4">
              {data.subscription.note} • {data.subscription.subscribers}
            </p>
            <button className="text-green-200 hover:text-white font-medium text-sm flex items-center justify-center mx-auto">
              <ExternalLink className="mr-2 h-4 w-4" />
              {data.subscription.linkText}
            </button>
          </div>
        )}

        {/* CTA Section */}
        {data.cta?.show && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.cta.title}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {data.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.variant === 'primary'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}
      {/* Floating Edit Button / Manage Section Visibility */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
        >
          <Edit className="h-5 w-5" />
        </button>
      )}

      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-gray-600 mb-6">Toggle sections on or off to control what visitors see on this page.</p>
              <div className="space-y-4">
                {Object.keys(sectionDisplayNames).map(sectionKey => {
                  const visible = data[sectionKey]?.show !== false;
                  return (
                    <div key={sectionKey} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        {visible ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                        <div>
                          <h3 className="font-medium text-gray-900">{sectionDisplayNames[sectionKey]}</h3>
                          <p className="text-sm text-gray-500">{visible ? 'Visible' : 'Hidden'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSectionVisibility(sectionKey)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${visible ? 'bg-green-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${visible ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default SchoolCalendarPage;  