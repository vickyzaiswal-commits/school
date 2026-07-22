"use client";
import defaultData from '@/data/school-timings.json';

import React, { useState, useEffect } from 'react';
import { 
  Clock,
  Calendar,
  Bell,
  Download,
  ChevronRight,
  ExternalLink,
  MapPin,
  Users,
  Book,
  Calculator,
  Microscope,
  Languages,
  Palette,
  Music,
  Heart,
  Shield,
  Code,
  Globe,
  BookOpen,
  Coffee,
  Bus,
  Home,
  Eye,
  EyeOff,
  Edit,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import Image from 'next/image';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Spinner from '@components/Spinner/Spinner';
const SchoolTimingsPage = ({ schoolTimingsData }) => {
  const [activeTab, setActiveTab] = useState('daily');
  const [data, setData] = useState(schoolTimingsData || defaultData);
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

  // Icon mapping (string-based for consistency)
  const iconMap = {
    Clock,
    Calendar,
    Bell,
    Download,
    ChevronRight,
    ExternalLink,
    MapPin,
    Users,
    Book,
    Calculator,
    Microscope,
    Languages,
    Palette,
    Music,
    Heart,
    Shield,
    Code,
    Globe,
    BookOpen,
    Coffee,
    Bus,
    Home
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    tabs: 'showTabs',
    dailySchedules: 'showDailySchedules',
    academicCalendar: 'showAcademicCalendar',
    bellSchedule: 'showBellSchedule',
    transport: 'showTransport',
    resources: 'showResources',
    cta: 'showCta'
  };

  const sectionDisplayNames = {
    showHero: 'Hero Section',
    showBenefits: 'Benefits',
    showTabs: 'Tabs',
    showDailySchedules: 'Daily Schedules',
    showAcademicCalendar: 'Academic Calendar',
    showBellSchedule: 'Bell Schedule',
    showTransport: 'Transport',
    showResources: 'Resources',
    showCta: 'CTA'
  };

  // Default data structure for School Timings
  

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
  

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(item => item.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredDailySchedules = Object.fromEntries(
    Object.entries(data.dailySchedules?.items || {}).filter(([key, item]) => item.show !== false)
  );
  const filteredAcademicCalendar = data.academicCalendar?.items?.filter(item => item.show !== false) || [];
  const filteredBellSchedule = data.bellSchedule?.items?.filter(item => item.show !== false) || [];
  const filteredTransport = data.transport?.items?.filter(item => item.show !== false) || [];
  const filteredTransportPolicies = data.transport?.policies?.filter(item => item.show !== false) || [];
  const filteredTransportSafety = data.transport?.safety?.filter(item => item.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(item => item.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  const toggleSectionVisibility = (key) => setData(prev => ({ ...prev, [key]: !prev[key] }));

  const saveSectionVisibility = async () => {
    try {
      try {
        const encrypted = await encryptObject(data);
        await apiRequest('save_data/save_school_timings_data', { payload: encrypted });
      } catch (err) {
        console.error('Save/Encryption error', err);
      }
    } catch (error) {
      console.error('Save failed', error);
    }
    setSectionVisibilityModal(false);
  };

  // Open edit modal
  const openEditModal = (section) => {
    const addIdsToSchedules = (obj) => {
      try {
        const copy = JSON.parse(JSON.stringify(obj || {}));
        if (copy?.dailySchedules?.items && typeof copy.dailySchedules.items === 'object') {
          Object.keys(copy.dailySchedules.items).forEach(level => {
            const levelObj = copy.dailySchedules.items[level] || {};
            if (Array.isArray(levelObj.schedule)) {
              levelObj.schedule = levelObj.schedule.map(item => ({
                ...(item || {}),
                id: item?.id || `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
              }));
              copy.dailySchedules.items[level] = levelObj;
            }
          });
        }
        return copy;
      } catch (e) {
        return obj;
      }
    };
    setEditSection(section);
    setEditFormOpen(true);
    if (section === 'tabs') {
      const tabsData = {
        showTabs: data.showTabs,
        tabs: data.tabs,
        showDailySchedules: data.showDailySchedules,
        dailySchedules: addIdsToSchedules({ dailySchedules: data.dailySchedules }).dailySchedules || data.dailySchedules,
        showAcademicCalendar: data.showAcademicCalendar,
        academicCalendar: data.academicCalendar,
        showBellSchedule: data.showBellSchedule,
        bellSchedule: data.bellSchedule,
        showTransport: data.showTransport,
        transport: data.transport
      };
      setEditData(tabsData);
      setOriginalData(JSON.parse(JSON.stringify(tabsData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data[layoutKey],
        ...data[section]
      };
      // ensure schedule items have ids so React keys stay stable
      if (sectionData?.dailySchedules) {
        sectionData = addIdsToSchedules(sectionData);
      }
      setEditData(sectionData);
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    }
  };

  // Save section
  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
    if (editSection === 'tabs') {
      newData.showTabs = updatedData.showTabs;
      newData.showDailySchedules = updatedData.showDailySchedules;
      newData.dailySchedules = updatedData.dailySchedules;
      newData.showAcademicCalendar = updatedData.showAcademicCalendar;
      newData.academicCalendar = updatedData.academicCalendar;
      newData.showBellSchedule = updatedData.showBellSchedule;
      newData.bellSchedule = updatedData.bellSchedule;
      newData.showTransport = updatedData.showTransport;
      newData.transport = updatedData.transport;
      newData.tabs = updatedData.tabs;
    } else {
      const layoutKey = layoutMap[editSection];
      newData[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
    setData(newData);
    try {
      try {
        const encrypted = await encryptObject(newData);
        await apiRequest('save_data/save_school_timings_data', { payload: encrypted });
      } catch (err) {
        console.error('Save/Encryption error', err);
      }
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
      tabs: {
        ...prev.tabs,
        items: prev.tabs.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
      }
    }));
  };

  const handleLabelsChange = (sectionKey, labelKey, field, value) => {
    setEditData(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        labels: {
          ...prev[sectionKey].labels,
          [labelKey]: value
        }
      }
    }));
  };

  const handleScheduleItemChange = (level, id, field, value) => {
    setEditData(prev => {
      const prevDailyItems = prev?.dailySchedules?.items || {};
      const levelObj = prevDailyItems[level] || { schedule: [] };
      const schedule = (levelObj.schedule || []).map(item => item?.id === id ? { ...(item || {}), [field]: value } : item);

      return {
        ...prev,
        dailySchedules: {
          ...(prev?.dailySchedules || {}),
          items: {
            ...prevDailyItems,
            [level]: { ...levelObj, schedule }
          }
        }
      };
    });
  };

  // Memoized per-row editor to avoid remounts / caret loss while typing
  const ScheduleRowEditor = React.useMemo(() =>
    React.memo(({ item, level }) => {
      const [local, setLocal] = React.useState({ ...(item || {}) });

      React.useEffect(() => {
        // reset local state when the identity of the item changes
        setLocal({ ...(item || {}) });
      }, [item?.id]);

      const handleLocalChange = (field, value) => setLocal(prev => ({ ...prev, [field]: value }));
      const handleLocalBlur = (field) => {
        // push change to parent on blur
        handleScheduleItemChange(level, item.id, field, local[field]);
      };

      return (
        <div className="flex gap-2 items-center">
          <input
            value={local.period || ''}
            onChange={(e) => handleLocalChange('period', e.target.value)}
            onBlur={() => handleLocalBlur('period')}
            placeholder="Period"
            className="flex-1 p-2 border rounded"
          />
          <input
            value={local.time || ''}
            onChange={(e) => handleLocalChange('time', e.target.value)}
            onBlur={() => handleLocalBlur('time')}
            placeholder="Time"
            className="flex-1 p-2 border rounded"
          />
          <input
            value={local.subject || ''}
            onChange={(e) => handleLocalChange('subject', e.target.value)}
            onBlur={() => handleLocalBlur('subject')}
            placeholder="Subject"
            className="flex-1 p-2 border rounded"
          />
          <input
            value={local.description || ''}
            onChange={(e) => handleLocalChange('description', e.target.value)}
            onBlur={() => handleLocalBlur('description')}
            placeholder="Description"
            className="flex-1 p-2 border rounded"
          />
          <button onClick={() => removeScheduleItem(level, item.id)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      );
    }),
    [handleScheduleItemChange]
  );

  // Update the title (or other top-level fields) of a daily schedule level
  const handleDailyScheduleTitleChange = (level, value) => {
    setEditData(prev => {
      const prevDailyItems = prev?.dailySchedules?.items || {};
      const levelObj = prevDailyItems[level] || { schedule: [] };
      return {
        ...prev,
        dailySchedules: {
          ...(prev?.dailySchedules || {}),
          items: {
            ...prevDailyItems,
            [level]: { ...levelObj, title: value }
          }
        }
      };
    });
  };

  const handleMonthEventChange = (monthIndex, eventIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.academicCalendar.items[monthIndex].events[eventIndex] = { ...updated.academicCalendar.items[monthIndex].events[eventIndex], [field]: value };
      return updated;
    });
  };

  const handleTransportItemChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.transport.items[index] = { ...updated.transport.items[index], [field]: value };
      return updated;
    });
  };

  const handlePolicySafetyChange = (type, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.transport[type][index] = { ...updated.transport[type][index], [field]: value };
      return updated;
    });
  };

  // Handlers for adding/removing
  // small helper to deep-clone state to avoid accidental mutations
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const addScheduleItem = (level) => {
    setEditData(prev => {
      const prevDailyItems = prev?.dailySchedules?.items || {};
      const levelObj = prevDailyItems[level] || { schedule: [] };
      const schedule = [...(levelObj.schedule || []), {
        period: "",
        time: "",
        description: "",
        subject: "",
        show: true,
        id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`
      }];

      return {
        ...prev,
        dailySchedules: {
          ...(prev?.dailySchedules || {}),
          items: {
            ...prevDailyItems,
            [level]: { ...levelObj, schedule }
          }
        }
      };
    });
  };

  const removeScheduleItem = (level, id) => {
    setEditData(prev => {
      const prevDailyItems = prev?.dailySchedules?.items || {};
      const levelObj = prevDailyItems[level];
      if (!levelObj) return prev;
      const schedule = (levelObj.schedule || []).filter(item => item?.id !== id);

      return {
        ...prev,
        dailySchedules: {
          ...(prev?.dailySchedules || {}),
          items: {
            ...prevDailyItems,
            [level]: { ...levelObj, schedule }
          }
        }
      };
    });
  };

  const addMonthEvent = (monthIndex) => {
    setEditData(prev => {
      const updated = deepClone(prev || {});
      if (!updated.academicCalendar) updated.academicCalendar = { items: [] };
      if (!Array.isArray(updated.academicCalendar.items)) updated.academicCalendar.items = [];
      const targetMonth = updated.academicCalendar.items[monthIndex] || { events: [] };
      targetMonth.events = [...(targetMonth.events || []), { date: "", description: "", highlight: false, show: true }];
      updated.academicCalendar.items[monthIndex] = targetMonth;
      return updated;
    });
  };

  const removeMonthEvent = (monthIndex, eventIndex) => {
    setEditData(prev => {
      const updated = deepClone(prev || {});
      if (!updated.academicCalendar?.items?.[monthIndex]) return prev;
      updated.academicCalendar.items[monthIndex].events = (updated.academicCalendar.items[monthIndex].events || []).filter((_, i) => i !== eventIndex);
      return updated;
    });
  };

  const addTransportItem = () => {
    setEditData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        items: [...(prev.transport?.items || []), {
          route: "",
          morningPickup: "",
          afternoonDropoff: "",
          stops: "",
          show: true
        }]
      }
    }));
  };

  const removeTransportItem = (index) => {
    setEditData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        items: prev.transport.items.filter((_, i) => i !== index)
      }
    }));
  };

  const addPolicySafetyItem = (type) => {
    setEditData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        [type]: [...(prev.transport?.[type] || []), { text: "", show: true }]
      }
    }));
  };

  const removePolicySafetyItem = (type, index) => {
    setEditData(prev => ({
      ...prev,
      transport: {
        ...prev.transport,
        [type]: prev.transport[type].filter((_, i) => i !== index)
      }
    }));
  };

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

  // Daily Schedule Editor
  const DailyScheduleEditor = () => (
    <div className="space-y-6">
      {Object.entries(editData.dailySchedules?.items || {}).map(([level, item]) => (
        <div key={level} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-2">{item.title || level}</h4>
          <div className="space-y-2">
            <input value={item.title || ''} onChange={(e) => handleDailyScheduleTitleChange(level, e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
            {(item.schedule || []).map((scheduleItem, index) => (
              <ScheduleRowEditor
                key={scheduleItem.id || index}
                item={scheduleItem}
                level={level}
              />
            ))}
            <button onClick={() => addScheduleItem(level)} className="text-green-600 flex items-center"><Plus className="h-4 w-4 mr-1" /> Add Schedule Item</button>
          </div>
        </div>
      ))}
    </div>
  );

  // Academic Calendar Editor
  const AcademicCalendarEditor = () => (
    <div className="space-y-6">
      {(editData.academicCalendar?.items || []).map((month, monthIndex) => (
        <div key={monthIndex} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-2">{month.month}</h4>
          <input value={month.month} onChange={(e) => handleArrayChange('items', monthIndex, 'month', e.target.value)} placeholder="Month" className="w-full p-2 border rounded mb-2" />
          <div className="space-y-2">
            {(month.events || []).map((event, eventIndex) => (
              <div key={eventIndex} className="flex gap-2 items-center">
                <input value={event.date} onChange={(e) => handleMonthEventChange(monthIndex, eventIndex, 'date', e.target.value)} placeholder="Date" className="flex-1 p-2 border rounded" />
                <input value={event.description} onChange={(e) => handleMonthEventChange(monthIndex, eventIndex, 'description', e.target.value)} placeholder="Description" className="flex-2 p-2 border rounded" />
                <label className="flex items-center">
                  <input type="checkbox" checked={event.highlight || false} onChange={(e) => handleMonthEventChange(monthIndex, eventIndex, 'highlight', e.target.checked)} className="mr-1" />
                  <span>Highlight</span>
                </label>
                <button onClick={() => removeMonthEvent(monthIndex, eventIndex)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
            <button onClick={() => addMonthEvent(monthIndex)} className="text-green-600 flex items-center"><Plus className="h-4 w-4 mr-1" /> Add Event</button>
          </div>
        </div>
      ))}
    </div>
  );

  // Bell Schedule Editor
  const BellScheduleEditor = () => (
    <div className="space-y-4">
      {(editData.bellSchedule?.items || []).map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input value={item.period} onChange={(e) => handleArrayChange('items', index, 'period', e.target.value)} placeholder="Period" className="flex-1 p-2 border rounded" />
          <input value={item.time} onChange={(e) => handleArrayChange('items', index, 'time', e.target.value)} placeholder="Time" className="flex-1 p-2 border rounded" />
          <input value={item.description} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="flex-2 p-2 border rounded" />
          <button onClick={() => {/* remove logic */}} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );

  // Transport Editor
  const TransportEditor = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Routes</h3>
      {(editData.transport?.items || []).map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">Route {index + 1}</h4>
            <button onClick={() => removeTransportItem(index)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="space-y-2">
            <input value={item.route} onChange={(e) => handleTransportItemChange(index, 'route', e.target.value)} placeholder="Route" className="w-full p-2 border rounded" />
            <input value={item.morningPickup} onChange={(e) => handleTransportItemChange(index, 'morningPickup', e.target.value)} placeholder="Morning Pickup" className="w-full p-2 border rounded" />
            <input value={item.afternoonDropoff} onChange={(e) => handleTransportItemChange(index, 'afternoonDropoff', e.target.value)} placeholder="Afternoon Dropoff" className="w-full p-2 border rounded" />
            <textarea value={item.stops} onChange={(e) => handleTransportItemChange(index, 'stops', e.target.value)} placeholder="Stops" className="w-full p-2 border rounded" rows="2" />
          </div>
        </div>
      ))}
      <button onClick={addTransportItem} className="text-green-600 flex items-center"><Plus className="h-4 w-4 mr-1" /> Add Route</button>

      <h3 className="text-lg font-semibold">Policies</h3>
      {(editData.transport?.policies || []).map((policy, index) => (
        <div key={index} className="flex gap-2 items-center">
          <textarea value={policy.text} onChange={(e) => handlePolicySafetyChange('policies', index, 'text', e.target.value)} placeholder="Policy Text" className="flex-1 p-2 border rounded" rows="2" />
          <button onClick={() => removePolicySafetyItem('policies', index)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <button onClick={() => addPolicySafetyItem('policies')} className="text-green-600 flex items-center"><Plus className="h-4 w-4 mr-1" /> Add Policy</button>

      <h3 className="text-lg font-semibold">Safety</h3>
      {(editData.transport?.safety || []).map((safety, index) => (
        <div key={index} className="flex gap-2 items-center">
          <textarea value={safety.text} onChange={(e) => handlePolicySafetyChange('safety', index, 'text', e.target.value)} placeholder="Safety Text" className="flex-1 p-2 border rounded" rows="2" />
          <button onClick={() => removePolicySafetyItem('safety', index)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      <button onClick={() => addPolicySafetyItem('safety')} className="text-green-600 flex items-center"><Plus className="h-4 w-4 mr-1" /> Add Safety Item</button>
    </div>
  );

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
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Background Image</span>
                  </label>
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
                        label="Upload School Schedule (PDF, DOCX, etc.)"
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
              {editSection === 'tabs' && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showTabs || false} onChange={(e) => handleObjectChange('showTabs', e.target.checked)} />
                      <span>Show Tabs</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.tabs?.title || ''} onChange={(e) => handleObjectChange('tabs.title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.tabs?.description || ''} onChange={(e) => handleObjectChange('tabs.description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tab Items</h3>
                  {(editData.tabs?.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Tab {index + 1}</h4>
                      <div className="space-y-2">
                        <select value={item.icon || ''} onChange={(e) => handleCategoriesItemChange(index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.name || ''} onChange={(e) => handleCategoriesItemChange(index, 'name', e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
                        <input value={item.description || ''} onChange={(e) => handleCategoriesItemChange(index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleCategoriesItemChange(index, 'show', e.target.checked)} />
                          <span>Show Tab</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Daily Schedules</h3>
                  <label className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" checked={editData.showDailySchedules || false} onChange={(e) => handleObjectChange('showDailySchedules', e.target.checked)} />
                    <span>Show Daily Schedules</span>
                  </label>
                  <DailyScheduleEditor />
                  <h3 className="text-lg font-semibold mt-4 mb-2">Academic Calendar</h3>
                  <label className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" checked={editData.showAcademicCalendar || false} onChange={(e) => handleObjectChange('showAcademicCalendar', e.target.checked)} />
                    <span>Show Academic Calendar</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.academicCalendar?.title || ''} onChange={(e) => handleObjectChange('academicCalendar.title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.academicCalendar?.description || ''} onChange={(e) => handleObjectChange('academicCalendar.description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <AcademicCalendarEditor />
                  <h3 className="text-lg font-semibold mt-4 mb-2">Bell Schedule</h3>
                  <label className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" checked={editData.showBellSchedule || false} onChange={(e) => handleObjectChange('showBellSchedule', e.target.checked)} />
                    <span>Show Bell Schedule</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.bellSchedule?.title || ''} onChange={(e) => handleObjectChange('bellSchedule.title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.bellSchedule?.description || ''} onChange={(e) => handleObjectChange('bellSchedule.description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <BellScheduleEditor />
                  <h3 className="text-lg font-semibold mt-4 mb-2">Transport</h3>
                  <label className="flex items-center space-x-2 mb-2">
                    <input type="checkbox" checked={editData.showTransport || false} onChange={(e) => handleObjectChange('showTransport', e.target.checked)} />
                    <span>Show Transport</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input value={editData.transport?.title || ''} onChange={(e) => handleObjectChange('transport.title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.transport?.description || ''} onChange={(e) => handleObjectChange('transport.description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <TransportEditor />
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
                        <input value={button.variant || ''} onChange={(e) => handleArrayChange('buttons', index, 'variant', e.target.value)} placeholder="Variant" className="w-full p-2 border rounded" />
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
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <Image src={data.hero.backgroundImage} alt={data.hero.title || ''} fill unoptimized className="absolute inset-0 w-full h-full object-cover opacity-50" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero?.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero?.subtitle}
              </p>
              {data.hero?.ctaButton?.show !== false && (
                <button onClick={() => downloadFile(data.hero.ctaButton?.link || '#', 'school-schedule.pdf')} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.hero.ctaButton?.label}
                  <Download className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Main Content Container */}
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
                const IconComponent = iconMap[benefit.icon] || Clock;
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

        {/* Tabs Navigation */}
        {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.tabs?.title}</h2>
              <p className="text-gray-600">
                {data.tabs?.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTabs.map(tab => {
                const IconComponent = iconMap[tab.icon] || Clock;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{tab.name}</span>
                    <span className={`text-xs mt-1 ${activeTab === tab.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content for Selected Tab */}
            <div className="mt-8">
              {/* Daily Schedule Tab */}
              {activeTab === 'daily' && data.showDailySchedules && data.dailySchedules?.show && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.dailySchedules?.title}</h3>
                  {data.dailySchedules?.description && <p className="text-gray-600 mb-6">{data.dailySchedules?.description}</p>}
                  <div className="space-y-8">
                    {Object.entries(filteredDailySchedules).map(([key, schedule]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-gray-800 mb-4">{schedule.title}</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.period}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.time}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.description || data.dailySchedules?.labels?.subject}</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {schedule.schedule.filter(item => item.show !== false).map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.period}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description || item.subject}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Calendar Tab */}
              {activeTab === 'calendar' && data.showAcademicCalendar && data.academicCalendar?.show && filteredAcademicCalendar.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.academicCalendar?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.academicCalendar?.description}</p>
                  <div className="space-y-6">
                    {filteredAcademicCalendar.map((month, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-800 mb-4">{month.month}</h4>
                        <ul className="space-y-3">
                          {month.events.filter(event => event.show !== false).map((event, idx) => (
                            <li key={idx} className={`flex items-center text-gray-700 ${event.highlight ? 'font-semibold' : ''}`}>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                {event.date}
                              </span>
                              {event.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bell Schedule Tab */}
              {activeTab === 'bell' && data.showBellSchedule && data.bellSchedule?.show && filteredBellSchedule.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.bellSchedule?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.bellSchedule?.description}</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.period}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.time}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.description}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBellSchedule.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.period}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Transport Timings Tab */}
              {activeTab === 'transport' && data.showTransport && data.transport?.show && filteredTransport.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.transport?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.transport?.description}</p>
                  
                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.route}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.morningPickup}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.afternoonDropoff}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.stops}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransport.map((route, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.route}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.morningPickup}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.afternoonDropoff}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{route.stops}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">{data.transport?.policiesTitle}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {filteredTransportPolicies.map((policy, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{policy.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">{data.transport?.safetyTitle}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {filteredTransportSafety.map((safety, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{safety.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Resources */}
        {data.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources?.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon] || Book;
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

        {/* Floating Edit Button / Manage Section Visibility */}
        {editMode && (
          <button
            onClick={() => setSectionVisibilityModal(true)}
            className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
          >
            <Edit className="h-5 w-5" />
          </button>
        )}

        {/* Section Visibility Modal */}
        {sectionVisibilityModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden">
              <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-600 mb-6">Toggle sections on or off to control what visitors see on this page.</p>
                <div className="space-y-4">
                  {Object.keys(sectionDisplayNames).map(sectionKey => (
                    <div key={sectionKey} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        {data[sectionKey] ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                        <div>
                          <h3 className="font-medium text-gray-900">{sectionDisplayNames[sectionKey]}</h3>
                          <p className="text-sm text-gray-500">{data[sectionKey] ? 'Visible' : 'Hidden'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSectionVisibility(sectionKey)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data[sectionKey] ? 'bg-green-600' : 'bg-gray-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data[sectionKey] ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
            </div>
          </div>
        )}
    </div>
  );
};

export default SchoolTimingsPage;