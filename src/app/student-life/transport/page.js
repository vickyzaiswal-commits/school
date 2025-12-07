"use client";
import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { 
  Bus,
  MapPin,
  Clock,
  Users,
  Shield,
  Phone,
  Mail,
  Download,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Navigation,
  Ticket,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  Zap,
  Edit,
  Eye,
  EyeOff,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const TransportPage = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [selectedRoute, setSelectedRoute] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const role = 'admin'; // Should come from auth context

  // Icon mapping
  const iconMap = {
    Bus,
    MapPin,
    Clock,
    Users,
    Shield,
    Phone,
    Mail,
    Download,
    ChevronRight,
    ExternalLink,
    ArrowRight,
    Navigation,
    Ticket,
    AlertCircle,
    CheckCircle,
    FileText,
    Calendar,
    Zap
  };

  const sectionDisplayNames = {
    hero: 'Hero Section',
    benefits: 'Benefits',
    tabs: 'Tabs',
    busRoutes: 'Bus Routes',
    safetyFeatures: 'Safety Measures',
    feeStructure: 'Transport Fees',
    contact: 'Contact',
    resources: 'Resources',
    cta: 'CTA'
  };

  // Default data structure
  const defaultData = {
    hero: {
      show: true,
      title: "School Transport Services",
      subtitle: "Safe, reliable, and convenient transportation for all students",
      height: "h-96",
      // whether to render the <img> element for the hero background
      showImage: true,
      backgroundImage: "https://images.unsplash.com/photo-1544620127-51a44c51c241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "Apply for Transport",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Choose Our Transport Service?",
      description: "We prioritize safety, convenience, and reliability in our transportation services",
      items: [
        {
          icon: "Shield",
          title: "Safety First",
          description: "GPS tracked buses with trained drivers and attendants",
          show: true
        },
        {
          icon: "Clock",
          title: "Punctuality",
          description: "Reliable and timely pick-up and drop services",
          show: true
        },
        {
          icon: "Users",
          title: "Trained Staff",
          description: "Well-trained drivers and supportive attendants",
          show: true
        },
        {
          icon: "Zap",
          title: "Convenience",
          description: "Doorstep service with extensive route coverage",
          show: true
        }
      ]
    },
    tabs: {
      show: true,
      title: "Transport Information",
      description: "Explore our transportation services and facilities",
      items: [
        { id: 'routes', name: 'Routes & Schedules', icon: "MapPin", description: 'Bus routes', show: true },
        { id: 'safety', name: 'Safety Measures', icon: "Shield", description: 'Safety protocols', show: true },
        { id: 'fees', name: 'Transport Fees', icon: "Ticket", description: 'Fee structure', show: true },
        { id: 'contact', name: 'Contact', icon: "Phone", description: 'Get in touch', show: true }
      ]
    },
    busRoutes: {
      show: true,
      title: "Bus Routes & Schedules",
      description: "Comprehensive information about our transportation routes and timings",
      routes: [
        {
          id: 1,
          name: "Route 1 - North Zone",
          driver: "Mr. Rajesh Kumar",
          attendant: "Ms. Sunita Devi",
          busNumber: "DL 01 AB 1234",
          capacity: "40 students",
          morningPickup: "7:00 AM - 7:45 AM",
          afternoonDrop: "3:45 PM - 4:30 PM",
          areas: ["Sector 14", "Sector 15", "Sector 16", "Sector 17", "Sector 18"],
          stops: 5,
          status: "Active",
          show: true
        },
        {
          id: 2,
          name: "Route 2 - South Zone",
          driver: "Mr. Vijay Singh",
          attendant: "Ms. Priya Sharma",
          busNumber: "DL 01 CD 5678",
          capacity: "42 students",
          morningPickup: "7:15 AM - 8:00 AM",
          afternoonDrop: "3:45 PM - 4:30 PM",
          areas: ["Sector 21", "Sector 22", "Sector 23", "Sector 24", "Sector 25", "Sector 26"],
          stops: 6,
          status: "Active",
          show: true
        },
        {
          id: 3,
          name: "Route 3 - East Zone",
          driver: "Mr. Amit Patel",
          attendant: "Ms. Rekha Gupta",
          busNumber: "DL 01 EF 9012",
          capacity: "38 students",
          morningPickup: "7:10 AM - 7:55 AM",
          afternoonDrop: "3:50 PM - 4:35 PM",
          areas: ["Sector 8", "Sector 9", "Sector 10", "Sector 11"],
          stops: 4,
          status: "Active",
          show: true
        },
        {
          id: 4,
          name: "Route 4 - West Zone",
          driver: "Mr. Sanjay Verma",
          attendant: "Ms. Neha Singh",
          busNumber: "DL 01 GH 3456",
          capacity: "45 students",
          morningPickup: "7:20 AM - 8:05 AM",
          afternoonDrop: "4:00 PM - 4:45 PM",
          areas: ["Sector 5", "Sector 6", "Sector 7", "Sector 12", "Sector 13", "Sector 19", "Sector 20"],
          stops: 7,
          status: "Active",
          show: true
        }
      ]
    },
    safetyFeatures: {
      show: true,
      title: "Safety Measures",
      description: "Our comprehensive safety protocols ensure your child's security during transit",
      features: [
        {
          title: "GPS Tracking",
          description: "Real-time tracking of all buses with live location sharing with parents",
          icon: "Navigation",
          show: true
        },
        {
          title: "Trained Staff",
          description: "Drivers with minimum 5 years experience and attendants trained in first aid",
          icon: "Users",
          show: true
        },
        {
          title: "Speed Governors",
          description: "All buses equipped with speed limiters not exceeding 40 km/h",
          icon: "Zap",
          show: true
        },
        {
          title: "Emergency Alerts",
          description: "Panic buttons and emergency alert systems in all vehicles",
          icon: "AlertCircle",
          show: true
        },
        {
          title: "Regular Maintenance",
          description: "Weekly maintenance checks and comprehensive quarterly servicing",
          icon: "CheckCircle",
          show: true
        },
        {
          title: "Safety Drills",
          description: "Monthly safety drills and evacuation practice for students",
          icon: "Shield",
          show: true
        }
      ],
      guidelines: {
        title: "Safety Guidelines for Students",
        items: [
          "Remain seated while the bus is in motion",
          "Keep hands and head inside the bus at all times",
          "Follow instructions from the driver and attendant",
          "Use seat belts if available",
          "Report any concerns to the transport incharge"
        ],
        show: true
      }
    },
    feeStructure: {
      show: true,
      title: "Transport Fees",
      description: "Affordable and flexible payment options for our transportation services",
      plans: [
        {
          plan: "Annual Payment",
          amount: "₹18,000",
          discount: "10% discount",
          savings: "Save ₹2,000",
          description: "One-time payment for the entire academic year",
          show: true
        },
        {
          plan: "Term Payment",
          amount: "₹6,500 per term",
          discount: "No discount",
          savings: "3 terms per year",
          description: "Pay at the beginning of each term",
          show: true
        },
        {
          plan: "Monthly Payment",
          amount: "₹2,200 per month",
          discount: "No discount",
          savings: "10 months per year",
          description: "Monthly payment option for flexibility",
          show: true
        },
        {
          plan: "Sibling Discount",
          amount: "15% off",
          discount: "For second child",
          savings: "Additional 10% for third child",
          description: "Special discounts for families with multiple children",
          show: true
        }
      ],
      paymentMethods: {
        title: "Payment Methods",
        items: [
          "Online payment through parent portal",
          "Bank transfer to school account",
          "Cash payment at school accounts office",
          "Cheque payable to school name"
        ],
        show: true
      },
      policies: {
        title: "Transport Policies",
        items: [
          {
            title: "Pickup Policy",
            description: "Students must be ready 5 minutes before scheduled pickup time. Bus will wait maximum 2 minutes.",
            show: true
          },
          {
            title: "Absence Notification",
            description: "Parents must inform transport incharge if student will not use bus on any day.",
            show: true
          },
          {
            title: "Route Changes",
            description: "Route change requests require 48 hours notice and are subject to availability.",
            show: true
          },
          {
            title: "Code of Conduct",
            description: "Students must follow bus rules and maintain discipline during transit.",
            show: true
          }
        ],
        show: true
      }
    },
    contact: {
      show: true,
      title: "Transport Contact",
      description: "Get in touch with our transport department for any queries or assistance",
      contacts: [
        {
          type: "Transport Incharge",
          name: "Mr. Anil Sharma",
          position: "Transport Incharge",
          phone: "+91 98765 43210",
          hours: "Mon-Sat, 8:00 AM - 5:00 PM",
          email: "transport@stcolumbas.edu",
          show: true
        },
        {
          type: "Transport Office",
          officeHours: "Monday to Saturday: 7:30 AM - 5:30 PM",
          location: "Near Main Gate, School Campus",
          officePhone: "+91 11 1234 5678",
          show: true
        }
      ],
      emergency: {
        title: "Emergency Contact",
        description: "For urgent transport-related issues during bus operation hours:",
        hotline: "+91 98765 43219",
        availability: "Available during all bus operational hours (6:30 AM - 5:30 PM)",
        show: true
      }
    },
    resources: {
      show: true,
      title: "Transport Resources",
      description: "Downloadable forms and information about our transport services",
      downloadLabel: "Download",
      items: [
        {
          title: "Transport Application Form",
          description: "Application form for new transport service requests",
          format: "PDF",
          size: "0.8 MB",
          icon: "FileText",
          downloads: 234,
          show: true
        },
        {
          title: "Bus Routes Map",
          description: "Detailed map of all bus routes and pickup points",
          format: "PDF",
          size: "1.5 MB",
          icon: "MapPin",
          downloads: 189,
          show: true
        },
        {
          title: "Parent Transport Guide",
          description: "Complete guide for parents about transport services",
          format: "PDF",
          size: "2.1 MB",
          icon: "Users",
          downloads: 156,
          show: true
        },
        {
          title: "Fee Payment Schedule",
          description: "Transport fee payment dates and methods",
          format: "PDF",
          size: "0.6 MB",
          icon: "Calendar",
          downloads: 278,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Need Transport Services?",
      description: "Apply for school transport or get answers to your transportation questions",
      buttons: [
        { 
          label: "Apply for Transport", 
          variant: "primary",
          link: "#",
          show: true 
        },
        { 
          label: "Contact Transport Office", 
          variant: "secondary",
          link: "#",
          show: true 
        }
      ]
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
        const res = await apiRequest('save_data/get_all_transport_data', {});
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
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredRoutes = data.busRoutes?.routes?.filter(route => route.show !== false) || [];
  const filteredSafetyFeatures = data.safetyFeatures?.features?.filter(feature => feature.show !== false) || [];
  const filteredFeePlans = data.feeStructure?.plans?.filter(plan => plan.show !== false) || [];
  const filteredPolicies = data.feeStructure?.policies?.items?.filter(policy => policy.show !== false) || [];
  const filteredContacts = data.contact?.contacts?.filter(contact => contact.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  const selectedRouteData = filteredRoutes.find(route => route.id === selectedRoute);

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
      await apiRequest('save_data/save_transport_data', { payload: data });
      setSectionVisibilityModal(false);
    } catch (error) {
      console.error('Failed to save section visibility', error);
    }
  };

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

  // General handlers
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      if (Array.isArray(updated[arrayKey][index])) {
        // For string arrays, update the whole array
        updated[arrayKey][index] = value.split('\n').map(item => item.trim()).filter(item => item);
      } else {
        updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      }
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

  const handleNestedArrayChange = (parentKey, arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[parentKey]) updated[parentKey] = {};
      if (!updated[parentKey][arrayKey]) updated[parentKey][arrayKey] = [];
      if (Array.isArray(updated[parentKey][arrayKey][index])) {
        updated[parentKey][arrayKey][index] = value.split('\n').map(item => item.trim()).filter(item => item);
      } else {
        updated[parentKey][arrayKey][index] = { ...updated[parentKey][arrayKey][index], [field]: value };
      }
      return updated;
    });
  };

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    const sectionData = { showSection: data[section]?.show || false, ...data[section] };
    setEditData(JSON.parse(JSON.stringify(sectionData)));
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Save section
  const saveSection = async () => {
    let newData = { ...data };
    newData[editSection].show = editData.showSection;
    const sectionContent = { ...editData };
    delete sectionContent.showSection;
    // If saving busRoutes, convert any temporary _areasText into areas array
    if (editSection === 'busRoutes' && Array.isArray(sectionContent.routes)) {
      sectionContent.routes = sectionContent.routes.map(r => {
        const copy = { ...r };
        if (typeof copy._areasText === 'string') {
          copy.areas = copy._areasText.split('\n').map(a => a.trim()).filter(a => a);
          delete copy._areasText;
        } else if (!Array.isArray(copy.areas)) {
          copy.areas = [];
        }
        return copy;
      });
    }
    newData[editSection] = { ...newData[editSection], ...sectionContent };
    setData(newData);
    try {
      await apiRequest('save_data/save_transport_data', { payload: newData });
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

  // Generic Item Editor
  const ItemEditor = (arrayKey, fields, isStringArray = false) => {
    const items = editData[arrayKey] || [];
    const removeItem = (index) => {
      const newItems = items.filter((_, i) => i !== index);
      setEditData(prev => ({ ...prev, [arrayKey]: newItems }));
    };
    const addItem = () => {
      const newItem = isStringArray ? '' : {};
      const newItems = [...items, newItem];
      setEditData(prev => ({ ...prev, [arrayKey]: newItems }));
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
              <textarea value={item || ''} onChange={(e) => handleArrayChange(arrayKey, index, 'items', e.target.value)} placeholder="Enter items, one per line" className="w-full p-2 border rounded mb-2" rows="4" />
            ) : (
              fields.map(field => (
                field === 'icon' ? (
                  <select key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} className="w-full p-2 border rounded mb-2">
                    <option value="">Select Icon</option>
                    {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                  </select>
                ) : (
                  <input key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} placeholder={field} className="w-full p-2 border rounded mb-2" />
                )
              ))
            )}
            {!isStringArray && (
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} />
                <span>Show Item</span>
              </label>
            )}
          </div>
        ))}
        <button onClick={addItem} className="flex items-center text-green-600">
          <Plus className="h-4 w-4 mr-2" /> Add New Item
        </button>
      </div>
    );
  };

  // Route Editor
  const RouteEditor = () => {
    const updateRouteField = useCallback((index, field, value) => {
      setEditData(prev => {
        const routes = prev.routes || [];
        const newRoutes = routes.map((r, i) => i === index ? { ...r, [field]: value } : r);
        return { ...prev, routes: newRoutes };
      });
    }, []);

    const updateRouteAreas = useCallback((index, value) => {
      // Keep raw textarea content while editing to avoid cursor jump
      setEditData(prev => {
        const routes = prev.routes || [];
        const newRoutes = routes.map((r, i) => i === index ? { ...r, _areasText: value } : r);
        return { ...prev, routes: newRoutes };
      });
    }, []);

    const updateRouteShow = useCallback((index, checked) => {
      setEditData(prev => {
        const routes = prev.routes || [];
        const newRoutes = routes.map((r, i) => i === index ? { ...r, show: checked } : r);
        return { ...prev, routes: newRoutes };
      });
    }, []);

    const removeRoute = useCallback((index) => {
      setEditData(prev => ({
        ...prev,
        routes: prev.routes ? prev.routes.filter((_, i) => i !== index) : []
      }));
    }, []);

    const addRoute = useCallback(() => {
      setEditData(prev => {
        const currentRoutes = prev.routes || [];
        // use a unique id to avoid key collisions and remounts
        const newId = Date.now() + Math.floor(Math.random() * 1000);
        const newRoute = {
          id: newId,
          name: "",
          driver: "",
          attendant: "",
          busNumber: "",
          capacity: "",
          morningPickup: "",
          afternoonDrop: "",
          areas: [],
          stops: "",
          status: "Active",
          show: true
        };
        return {
          ...prev,
          routes: [...currentRoutes, newRoute]
        };
      });
    }, []);

    const RouteItemEditor = useMemo(() =>
      memo(({ route, index }) => {
        const [local, setLocal] = React.useState(() => ({
          ...route,
          _areasText: route._areasText !== undefined ? route._areasText : (route.areas || []).join('\n')
        }));

        React.useEffect(() => {
          // when route identity changes (new route loaded), reset local state
          setLocal({
            ...route,
            _areasText: route._areasText !== undefined ? route._areasText : (route.areas || []).join('\n')
          });
        }, [route.id]);

        const handleChange = (field, value) => {
          setLocal(prev => ({ ...prev, [field]: value }));
        };

        const handleBlurField = (field) => {
          // push the field change to parent state on blur
          updateRouteField(index, field, local[field]);
        };

        const handleAreasBlur = () => {
          // sync the textarea content to parent as array
          updateRouteAreas(index, local._areasText || '');
        };

        const handleShowChange = (checked) => {
          setLocal(prev => ({ ...prev, show: checked }));
          updateRouteShow(index, checked);
        };

        return (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Route {index + 1}</h4>
              <button onClick={() => removeRoute(index)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {['name', 'driver', 'attendant', 'busNumber', 'capacity', 'morningPickup', 'afternoonDrop', 'stops', 'status'].map(field => (
              <div key={field} className="mb-2">
                <input
                  value={local[field] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => handleBlurField(field)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Areas (one per line)</label>
              <textarea
                value={local._areasText || ''}
                onChange={(e) => handleChange('_areasText', e.target.value)}
                onBlur={handleAreasBlur}
                placeholder="Enter areas, one per line"
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={local.show !== false}
                onChange={(e) => handleShowChange(e.target.checked)}
              />
              <span>Show Route</span>
            </label>
          </div>
        );
      }),
      [updateRouteField, updateRouteAreas, updateRouteShow, removeRoute]
    );

    return (
      <div className="space-y-4">
        {(editData.routes || []).map((route, index) => (
          <RouteItemEditor key={route.id || index} route={route} index={index} />
        ))}
        <button 
          onClick={addRoute} 
          className="flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Route
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={`Edit ${editSection}`} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6" style={{ overscrollBehavior: 'contain' }}>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                  <span>Show Section</span>
                </label>
              </div>
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Image</span>
                  </label>
                  <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="CTA Label" className="w-full p-2 border rounded mb-2" />
                  <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="CTA Link (URL or path)" className="w-full p-2 border rounded" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                    <span>Show CTA Button</span>
                  </label>
                </div>
              )}
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  <div className="space-y-4">
                    {(editData.items || []).map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Tab {index + 1}</h4>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              checked={item.show !== false} 
                              onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} 
                            />
                            <span>Show Tab</span>
                          </label>
                        </div>
                        <input 
                          value={item.name || ''} 
                          onChange={(e) => handleArrayChange('items', index, 'name', e.target.value)} 
                          placeholder="Name" 
                          className="w-full p-2 border rounded mb-2" 
                        />
                        <select 
                          value={item.icon || ''} 
                          onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} 
                          className="w-full p-2 border rounded mb-2"
                        >
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input 
                          value={item.description || ''} 
                          onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} 
                          placeholder="Description" 
                          className="w-full p-2 border rounded mb-2" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {editSection === 'busRoutes' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  <RouteEditor />
                </div>
              )}
              {editSection === 'safetyFeatures' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('features', ['icon', 'title', 'description'])}
                  <input value={editData.guidelines?.title || ''} onChange={(e) => handleNestedChange('guidelines', 'title', e.target.value)} placeholder="Guidelines Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.guidelines?.items?.join('\n') || ''} onChange={(e) => handleNestedArrayChange('guidelines', 'items', 0, 'items', e.target.value)} placeholder="Guidelines items, one per line" className="w-full p-2 border rounded" rows="5" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.guidelines?.show !== false} onChange={(e) => handleNestedChange('guidelines', 'show', e.target.checked)} />
                    <span>Show Guidelines</span>
                  </label>
                </div>
              )}
              {editSection === 'feeStructure' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('plans', ['plan', 'amount', 'discount', 'savings', 'description'])}
                  <input value={editData.paymentMethods?.title || ''} onChange={(e) => handleNestedChange('paymentMethods', 'title', e.target.value)} placeholder="Payment Methods Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.paymentMethods?.items?.join('\n') || ''} onChange={(e) => handleNestedArrayChange('paymentMethods', 'items', 0, 'items', e.target.value)} placeholder="Payment Methods, one per line" className="w-full p-2 border rounded" rows="5" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.paymentMethods?.show !== false} onChange={(e) => handleNestedChange('paymentMethods', 'show', e.target.checked)} />
                    <span>Show Payment Methods</span>
                  </label>
                  <input value={editData.policies?.title || ''} onChange={(e) => handleNestedChange('policies', 'title', e.target.value)} placeholder="Policies Title" className="w-full p-2 border rounded" />
                  {ItemEditor('policies.items', ['title', 'description'], false)}
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.policies?.show !== false} onChange={(e) => handleNestedChange('policies', 'show', e.target.checked)} />
                    <span>Show Policies</span>
                  </label>
                </div>
              )}
              {editSection === 'contact' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('contacts', ['type', 'name', 'position', 'phone', 'hours', 'email', 'officeHours', 'location', 'officePhone'])}
                  <input value={editData.emergency?.title || ''} onChange={(e) => handleNestedChange('emergency', 'title', e.target.value)} placeholder="Emergency Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.emergency?.description || ''} onChange={(e) => handleNestedChange('emergency', 'description', e.target.value)} placeholder="Emergency Description" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.emergency?.hotline || ''} onChange={(e) => handleNestedChange('emergency', 'hotline', e.target.value)} placeholder="Hotline" className="w-full p-2 border rounded" />
                  <input value={editData.emergency?.availability || ''} onChange={(e) => handleNestedChange('emergency', 'availability', e.target.value)} placeholder="Availability" className="w-full p-2 border rounded" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.emergency?.show !== false} onChange={(e) => handleNestedChange('emergency', 'show', e.target.checked)} />
                    <span>Show Emergency</span>
                  </label>
                </div>
              )}
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.downloadLabel || ''} onChange={(e) => handleObjectChange('downloadLabel', e.target.value)} placeholder="Download Label" className="w-full p-2 border rounded" />
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-md font-semibold">Item {index + 1}</h4>
                        <button onClick={() => setEditData(prev => ({ ...prev, items: (prev.items || []).filter((_, i) => i !== index) }))} className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input value={item.title || ''} onChange={(e) => handleArrayChange('items', index, 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                        <textarea value={item.description || ''} onChange={(e) => handleArrayChange('items', index, 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
                        <input value={item.format || ''} onChange={(e) => handleArrayChange('items', index, 'format', e.target.value)} placeholder="Format (e.g. PDF)" className="w-full p-2 border rounded" />
                        <input value={item.size || ''} onChange={(e) => handleArrayChange('items', index, 'size', e.target.value)} placeholder="Size (e.g. 1.2 MB)" className="w-full p-2 border rounded" />
                        <div>
                      
                          <FileUpload initialValue={item.link || ''} onUpload={(url) => handleArrayChange('items', index, 'link', url)} className="w-full" />
                        </div>
                        <select value={item.icon || ''} onChange={(e) => handleArrayChange('items', index, 'icon', e.target.value)} className="w-full p-2 border rounded">
                          <option value="">Select Icon</option>
                          {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                        <input value={item.downloads || ''} onChange={(e) => handleArrayChange('items', index, 'downloads', e.target.value)} placeholder="Downloads (number)" className="w-full p-2 border rounded" />
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setEditData(prev => ({ ...prev, items: [...(prev.items || []), { title: '', description: '', format: '', size: '', icon: '', link: '', downloads: 0, show: true }] }))} className="flex items-center text-green-600 hover:text-green-700 transition-colors">
                    <Plus className="h-4 w-4 mr-2" /> Add New Item
                  </button>
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
      {data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img
              src={data.hero.backgroundImage}
              alt={data.hero.title || ''}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {data.hero.ctaButton?.show !== false && (
                data.hero.ctaButton?.link ? (
                  <a href={data.hero.ctaButton.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                      <Bus className="mr-2 h-5 w-5" />
                      {data.hero.ctaButton.label}
                    </button>
                  </a>
                ) : (
                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                    <Bus className="mr-2 h-5 w-5" />
                    {data.hero.ctaButton.label}
                  </button>
                )
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Main Content */}
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
                const IconComponent = iconMap[benefit.icon] || Shield;
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

        {/* Tab Navigation */}
        {data.tabs?.show && filteredTabs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.tabs.title}</h2>
              <p className="text-gray-600">
                {data.tabs.description}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filteredTabs.map((tab) => {
                const IconComponent = iconMap[tab.icon] || MapPin;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {/* Routes & Schedules Tab */}
              {activeTab === 'routes' && data.busRoutes?.show && (
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.busRoutes.title}</h3>
                  <p className="text-gray-600 mb-8">{data.busRoutes.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Route Selector */}
                    <div className="lg:col-span-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h4>
                      <div className="space-y-2">
                        {filteredRoutes.map(route => (
                          <button
                            key={route.id}
                            onClick={() => setSelectedRoute(route.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              selectedRoute === route.id
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <div className="font-medium">{route.name}</div>
                            <div className="text-sm opacity-80">{route.areas.length} areas • {route.stops} stops</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Route Details */}
                    <div className="lg:col-span-3">
                      {selectedRouteData && (
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                              <h4 className="text-xl font-bold text-gray-800">{selectedRouteData.name}</h4>
                              <p className="text-gray-600">Bus No: {selectedRouteData.busNumber}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mt-2 md:mt-0">
                              {selectedRouteData.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-3">Staff Information</h5>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Driver: <strong>{selectedRouteData.driver}</strong></span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Attendant: <strong>{selectedRouteData.attendant}</strong></span>
                                </div>
                                <div className="flex items-center">
                                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Capacity: <strong>{selectedRouteData.capacity}</strong></span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-800 mb-3">Timings</h5>
                              <div className="space-y-2">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Morning Pickup: <strong>{selectedRouteData.morningPickup}</strong></span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-green-600 mr-2" />
                                  <span>Afternoon Drop: <strong>{selectedRouteData.afternoonDrop}</strong></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Coverage Areas</h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {selectedRouteData.areas.map((area, index) => (
                                <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                                  {area}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {editMode && <button onClick={() => openEditModal('busRoutes')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
                </div>
              )}

              {/* Safety Measures Tab */}
              {activeTab === 'safety' && data.safetyFeatures?.show && (
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.safetyFeatures.title}</h3>
                  <p className="text-gray-600 mb-8">{data.safetyFeatures.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredSafetyFeatures.map((feature, index) => {
                      const IconComponent = iconMap[feature.icon] || Shield;
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {data.safetyFeatures.guidelines?.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-4">{data.safetyFeatures.guidelines.title}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {data.safetyFeatures.guidelines.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {editMode && <button onClick={() => openEditModal('safetyFeatures')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
                </div>
              )}

              {/* Transport Fees Tab */}
              {activeTab === 'fees' && data.feeStructure?.show && (
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.feeStructure.title}</h3>
                  <p className="text-gray-600 mb-8">{data.feeStructure.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {filteredFeePlans.map((fee, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{fee.plan}</h4>
                        <div className="text-2xl font-bold text-green-600 mb-2">{fee.amount}</div>
                        <div className="text-sm text-gray-600 mb-4">{fee.description}</div>
                        <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
                          {fee.discount}
                        </div>
                        <div className="text-sm text-gray-500">{fee.savings}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.feeStructure.paymentMethods?.show && (
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-4">{data.feeStructure.paymentMethods.title}</h4>
                        <ul className="space-y-2 text-sm text-blue-700">
                          {data.feeStructure.paymentMethods.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {data.feeStructure.policies?.show && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">{data.feeStructure.policies.title}</h4>
                        <div className="space-y-4">
                          {filteredPolicies.map((policy, index) => (
                            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                              <h5 className="font-medium text-gray-800">{policy.title}</h5>
                              <p className="text-sm text-gray-600">{policy.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {editMode && <button onClick={() => openEditModal('feeStructure')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && data.contact?.show && (
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.contact.title}</h3>
                  <p className="text-gray-600 mb-8">{data.contact.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {filteredContacts.map((contact, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{contact.type}</h4>
                        <div className="space-y-3">
                          {contact.name && (
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-600">{contact.position}</p>
                              </div>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">{contact.phone}</p>
                                <p className="text-sm text-gray-600">{contact.hours}</p>
                              </div>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-green-600 mr-3" />
                              <p className="font-medium">{contact.email}</p>
                            </div>
                          )}
                          {contact.officeHours && (
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">Office Hours</p>
                                <p className="text-sm text-gray-600">{contact.officeHours}</p>
                              </div>
                            </div>
                          )}
                          {contact.location && (
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">Location</p>
                                <p className="text-sm text-gray-600">{contact.location}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {data.contact.emergency?.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-4">{data.contact.emergency.title}</h4>
                      <p className="text-green-700 mb-4">{data.contact.emergency.description}</p>
                      <div className="flex items-center bg-white p-4 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
                        <div>
                          <p className="font-bold text-red-600">Emergency Hotline: {data.contact.emergency.hotline}</p>
                          <p className="text-sm text-gray-600">{data.contact.emergency.availability}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {editMode && <button onClick={() => openEditModal('contact')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
                </div>
              )}
            </div>
            {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
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

        {/* CTA Section */}
        {data.cta?.show && (
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

export default TransportPage;