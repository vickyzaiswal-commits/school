"use client";
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Wifi,
  Shield,
  TreePine,
  Car,
  Utensils,
  BookOpen,
  Microscope,
  Monitor,
  Palette,
  Music,
  Dumbbell,
  HeartPulse,
  Building,
  Library,
  FlaskRound,
  Computer,
  GraduationCap,
  Users,
  Settings,
  X
} from 'lucide-react';

const InfrastructurePage = ({ schoolData = {} }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Campus Infrastructure",
      subtitle: "State-of-the-art facilities designed to inspire learning and growth",
      height: "h-96"
    },
    introduction: {
      show: true,
      title: "World-Class Learning Environment",
      description: "Our school boasts a sprawling campus with modern infrastructure that provides students with an ideal environment for academic excellence and holistic development.",
      stats: [
        { icon: Building, value: "10-acre", label: "Spacious Campus", description: "Dedicated areas for academics, sports, and arts", show: true },
        { icon: Users, value: "2,000+", label: "Student Capacity", description: "Optimal teacher-student ratio", show: true },
        { icon: GraduationCap, value: "60+", label: "Modern Classrooms", description: "Smart classrooms with digital learning tools", show: true }
      ]
    },
    facilityCategories: [
      { id: 'all', name: 'All Facilities', icon: Building, show: true },
      { id: 'academic', name: 'Academic', icon: BookOpen, show: true },
      { id: 'science', name: 'Science Labs', icon: Microscope, show: true },
      { id: 'technology', name: 'Technology', icon: Computer, show: true },
      { id: 'sports', name: 'Sports', icon: Dumbbell, show: true },
      { id: 'arts', name: 'Arts & Culture', icon: Palette, show: true },
    ],
    facilities: [
      {
        id: 1,
        title: "Smart Classrooms",
        description: "Digitally equipped classrooms with interactive whiteboards, projectors, and audio-visual learning aids.",
        image: "https://images.unsplash.com/photo-1588072432836-4b4f2ca5fdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "academic",
        features: ["Interactive Whiteboards", "Digital Projectors", "Audio Systems", "Climate Controlled"],
        show: true
      },
      {
        id: 2,
        title: "Science Laboratories",
        description: "Well-equipped physics, chemistry and biology laboratories for practical experimentation and learning.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "science",
        features: ["Modern Equipment", "Safety Systems", "Demonstration Areas", "Research Resources"],
        show: true
      },
      {
        id: 3,
        title: "Computer Labs",
        description: "State-of-the-art computer laboratories with high-speed internet and latest software resources.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "technology",
        features: ["High-Speed Computers", "Programming Software", "Internet Access", "IT Support"],
        show: true
      },
      {
        id: 4,
        title: "Library & Resource Center",
        description: "Spacious library with vast collection of books, periodicals, and digital learning resources.",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
        category: "academic",
        features: ["Extensive Collection", "Reading Areas", "Digital Resources", "Research Assistance"],
        show: true
      },
      {
        id: 5,
        title: "Sports Complex",
        description: "Comprehensive sports facilities including indoor and outdoor arenas for various sports activities.",
        image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "sports",
        features: ["Basketball Court", "Football Field", "Cricket Ground", "Indoor Games"],
        show: true
      },
      {
        id: 6,
        title: "Auditorium",
        description: "Modern auditorium with seating capacity of 500+ for events, performances, and assemblies.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
        category: "arts",
        features: ["Sound System", "Lighting", "Stage", "Green Rooms"],
        show: true
      }
    ],
    campusFeatures: [
      {
        icon: Shield,
        title: "Security",
        description: "24/7 security with CCTV surveillance, access control, and trained security personnel",
        show: true
      },
      {
        icon: TreePine,
        title: "Green Campus",
        description: "Eco-friendly campus with lush greenery, rainwater harvesting, and waste management systems",
        show: true
      },
      {
        icon: Wifi,
        title: "Wi-Fi Enabled",
        description: "Complete campus Wi-Fi coverage with controlled access for educational purposes",
        show: true
      },
      {
        icon: Car,
        title: "Ample Parking",
        description: "Spacious parking facilities for staff, visitors, and school buses",
        show: true
      },
      {
        icon: Utensils,
        title: "Cafeteria",
        description: "Hygienic cafeteria serving nutritious meals and snacks for students and staff",
        show: true
      },
      {
        icon: HeartPulse,
        title: "Health & Safety",
        description: "Regular safety drills, fire safety systems, and comprehensive health policies",
        show: true
      }
    ],
    virtualTour: {
      show: true,
      title: "Experience Our Campus Virtually",
      description: "Can't visit in person? Take our virtual tour to explore our facilities from anywhere in the world.",
      primaryCta: "Start Virtual Tour",
      secondaryCta: "Schedule Campus Visit"
    },
    contactInfo: {
      show: true,
      title: "Plan Your Visit",
      address: "1, Ashok Place, New Delhi - 110001, India",
      hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM\n(Prior appointment recommended)",
      phone: "011 2336 3462\n011 2336 3134",
      email: "infrastructure@stcolumbas.edu.in",
      mapTitle: "Campus Map",
      mapDescription: "Download our campus map to navigate our facilities easily during your visit."
    },
    showHero: true,
    showIntroduction: true,
    showFacilities: true,
    showCampusFeatures: true,
    showVirtualTour: true,
    showContact: true
  };

  // Initialize data by merging defaultData with schoolData
  const [data, setData] = useState({ ...defaultData, ...schoolData });

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // IntersectionObserver for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (Array.isArray(data[section])) {
      setEditData([...data[section]]);
    } else {
      setEditData({ ...data[section] });
    }
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (e.g., stats, facilityCategories, facilities, campusFeatures)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for string arrays (e.g., features in facilities)
  const handleStringArrayChange = (nestedKey, index, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = value;
    setEditData(updated);
  };

  // Save changes to state
  const saveChanges = () => {
    const updatedData = { ...data, [editSection]: editData };
    setData(updatedData);
    console.log('Payload to save in database:', JSON.stringify(updatedData, null, 2));
    setEditFormOpen(false);
  };

  // Filter functions
  const filteredFacilityCategories = data.facilityCategories.filter(cat => cat.show !== false);
  const filteredFacilities = data.facilities.filter(facility => facility.show !== false);
  const filteredCampusFeatures = data.campusFeatures.filter(feature => feature.show !== false);
  const filteredIntroductionStats = data.introduction.stats.filter(stat => stat.show !== false);

  const displayedFacilities = activeCategory === 'all' 
    ? filteredFacilities 
    : filteredFacilities.filter(facility => facility.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit {editSection}</h2>
              <button
                onClick={() => setEditFormOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                      type="text"
                      value={editData.image || ''}
                      onChange={(e) => handleObjectChange('image', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea
                      value={editData.subtitle || ''}
                      onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                      type="text"
                      value={editData.height || ''}
                      onChange={(e) => handleObjectChange('height', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Hero</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'introduction' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Introduction</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {editData.stats && editData.stats.map((stat, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'value', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={stat.description || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stat.show !== false}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'show', e.target.checked)}
                          />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'facilityCategories' && (
                <div className="space-y-4">
                  {editData && editData.map((category, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <h4 className="text-md font-semibold mb-2">Category {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">ID</label>
                        <input
                          type="text"
                          value={category.id || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'id', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={category.name || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={category.show !== false}
                            onChange={(e) => handleNestedArrayChange('', index, 'show', e.target.checked)}
                          />
                          <span>Show Category</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'facilities' && (
                <div className="space-y-4">
                  {editData && editData.map((facility, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Facility {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={facility.title || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={facility.description || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                          type="text"
                          value={facility.image || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'image', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                          value={facility.category || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'category', e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          {filteredFacilityCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={facility.show !== false}
                            onChange={(e) => handleNestedArrayChange('', index, 'show', e.target.checked)}
                          />
                          <span>Show Facility</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Features</h5>
                      {facility.features && facility.features.map((feature, fIndex) => (
                        <div key={fIndex} className="mb-2">
                          <label className="block text-sm font-medium">Feature {fIndex + 1}</label>
                          <input
                            type="text"
                            value={feature || ''}
                            onChange={(e) => {
                              const updated = { ...editData };
                              updated[index].features[fIndex] = e.target.value;
                              setEditData(updated);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'campusFeatures' && (
                <div className="space-y-4">
                  {editData && editData.map((feature, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <h4 className="text-md font-semibold mb-2">Feature {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={feature.title || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={feature.description || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={feature.show !== false}
                            onChange={(e) => handleNestedArrayChange('', index, 'show', e.target.checked)}
                          />
                          <span>Show Feature</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'virtualTour' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Primary CTA</label>
                    <input
                      type="text"
                      value={editData.primaryCta || ''}
                      onChange={(e) => handleObjectChange('primaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Secondary CTA</label>
                    <input
                      type="text"
                      value={editData.secondaryCta || ''}
                      onChange={(e) => handleObjectChange('secondaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Virtual Tour</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                      value={editData.address || ''}
                      onChange={(e) => handleObjectChange('address', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Hours</label>
                    <textarea
                      value={editData.hours || ''}
                      onChange={(e) => handleObjectChange('hours', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <textarea
                      value={editData.phone || ''}
                      onChange={(e) => handleObjectChange('phone', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                      type="text"
                      value={editData.email || ''}
                      onChange={(e) => handleObjectChange('email', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Map Title</label>
                    <input
                      type="text"
                      value={editData.mapTitle || ''}
                      onChange={(e) => handleObjectChange('mapTitle', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Map Description</label>
                    <textarea
                      value={editData.mapDescription || ''}
                      onChange={(e) => handleObjectChange('mapDescription', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Contact Info</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditFormOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero.show && (
        <section
          id="hero"
          className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('hero')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Introduction */}
      {data.showIntroduction && data.introduction.show && (
        <section
          id="introduction"
          className={`py-16 bg-white animate-on-scroll ${isVisible.introduction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.introduction.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.introduction.description}</p>
            </div>

            {filteredIntroductionStats.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredIntroductionStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.value} {stat.label}</h3>
                      <p className="text-gray-600">{stat.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('introduction')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Facilities Gallery */}
      {data.showFacilities && filteredFacilities.length > 0 && (
        <section
          id="facilities"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.facilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
              <p className="text-lg text-gray-600">Explore our comprehensive range of facilities designed to support every aspect of student development</p>
            </div>

            {/* Category Filters */}
            {filteredFacilityCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filteredFacilityCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === category.id
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-green-50'
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
                {editMode && (
                  <button
                    onClick={() => openEditModal('facilityCategories')}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFacilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.title}</h3>
                    <p className="text-gray-600 mb-4">{facility.description}</p>
                    
                    {facility.features && facility.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {facility.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('facilities')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Campus Features */}
      {data.showCampusFeatures && filteredCampusFeatures.length > 0 && (
        <section
          id="campusFeatures"
          className={`py-16 bg-white animate-on-scroll ${isVisible.campusFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Amenities</h2>
              <p className="text-lg text-gray-600">Our campus is designed with student safety, comfort, and learning in mind</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampusFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('campusFeatures')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Virtual Tour CTA */}
      {data.showVirtualTour && data.virtualTour.show && (
        <section
          id="virtualTour"
          className={`py-16 bg-green-700 text-white animate-on-scroll ${isVisible.virtualTour ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{data.virtualTour.title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{data.virtualTour.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/virtual-tour" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                {data.virtualTour.primaryCta}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <a href="/visit" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
                {data.virtualTour.secondaryCta}
              </a>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('virtualTour')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Contact Information */}
      {data.showContact && data.contactInfo.show && (
        <section
          id="contactInfo"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.contactInfo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.contactInfo.title}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Address</h3>
                      <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Visiting Hours</h3>
                      <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.hours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Contact</h3>
                      <p className="text-gray-600 whitespace-pre-line">{data.contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">{data.contactInfo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors flex items-center inline-block">
                    Request Information
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-6 shadow-md h-full">
                  <h3 className="text-xl font-bold mb-4">{data.contactInfo.mapTitle}</h3>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-500">Interactive Campus Map</span>
                  </div>
                  <p className="text-gray-600 mb-4">{data.contactInfo.mapDescription}</p>
                  <a href="/campus-map" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Download Campus Map (PDF)
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('contactInfo')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default InfrastructurePage;





















// "use client";
// import React, { useState } from 'react';
// import { 
//   MapPin, 
//   Clock, 
//   Phone, 
//   Mail, 
//   ExternalLink,
//   ChevronRight,
//   ArrowRight,
//   Wifi,
//   Shield,
//   TreePine,
//   Car,
//   Utensils,
//   BookOpen,
//   Microscope,
//   Monitor,
//   Palette,
//   Music,
//   Dumbbell,
//   HeartPulse,
//   Building,
//   Library,
//   FlaskRound,
//   Computer,
//   GraduationCap,
//   Users
// } from 'lucide-react';

// const InfrastructurePage = ({ schoolData = {} }) => {
//   const [activeCategory, setActiveCategory] = useState('all');
  
//   // Default data structure - Consistent with other pages
//   const defaultData = {
//     hero: {
//       show: true,
//       image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Campus Infrastructure",
//       subtitle: "State-of-the-art facilities designed to inspire learning and growth",
//       height: "h-96" // Consistent with other pages
//     },
//     introduction: {
//       show: true,
//       title: "World-Class Learning Environment",
//       description: "Our school boasts a sprawling campus with modern infrastructure that provides students with an ideal environment for academic excellence and holistic development.",
//       stats: [
//         { icon: Building, value: "10-acre", label: "Spacious Campus", description: "Dedicated areas for academics, sports, and arts", show: true },
//         { icon: Users, value: "2,000+", label: "Student Capacity", description: "Optimal teacher-student ratio", show: true },
//         { icon: GraduationCap, value: "60+", label: "Modern Classrooms", description: "Smart classrooms with digital learning tools", show: true }
//       ]
//     },
//     facilityCategories: [
//       { id: 'all', name: 'All Facilities', icon: Building, show: true },
//       { id: 'academic', name: 'Academic', icon: BookOpen, show: true },
//       { id: 'science', name: 'Science Labs', icon: Microscope, show: true },
//       { id: 'technology', name: 'Technology', icon: Computer, show: true },
//       { id: 'sports', name: 'Sports', icon: Dumbbell, show: true },
//       { id: 'arts', name: 'Arts & Culture', icon: Palette, show: true },
//     ],
//     facilities: [
//       {
//         id: 1,
//         title: "Smart Classrooms",
//         description: "Digitally equipped classrooms with interactive whiteboards, projectors, and audio-visual learning aids.",
//         image: "https://images.unsplash.com/photo-1588072432836-4b4f2ca5fdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         category: "academic",
//         features: ["Interactive Whiteboards", "Digital Projectors", "Audio Systems", "Climate Controlled"],
//         show: true
//       },
//       {
//         id: 2,
//         title: "Science Laboratories",
//         description: "Well-equipped physics, chemistry and biology laboratories for practical experimentation and learning.",
//         image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         category: "science",
//         features: ["Modern Equipment", "Safety Systems", "Demonstration Areas", "Research Resources"],
//         show: true
//       },
//       {
//         id: 3,
//         title: "Computer Labs",
//         description: "State-of-the-art computer laboratories with high-speed internet and latest software resources.",
//         image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         category: "technology",
//         features: ["High-Speed Computers", "Programming Software", "Internet Access", "IT Support"],
//         show: true
//       },
//       {
//         id: 4,
//         title: "Library & Resource Center",
//         description: "Spacious library with vast collection of books, periodicals, and digital learning resources.",
//         image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
//         category: "academic",
//         features: ["Extensive Collection", "Reading Areas", "Digital Resources", "Research Assistance"],
//         show: true
//       },
//       {
//         id: 5,
//         title: "Sports Complex",
//         description: "Comprehensive sports facilities including indoor and outdoor arenas for various sports activities.",
//         image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         category: "sports",
//         features: ["Basketball Court", "Football Field", "Cricket Ground", "Indoor Games"],
//         show: true
//       },
//       {
//         id: 6,
//         title: "Auditorium",
//         description: "Modern auditorium with seating capacity of 500+ for events, performances, and assemblies.",
//         image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
//         category: "arts",
//         features: ["Sound System", "Lighting", "Stage", "Green Rooms"],
//         show: true
//       }
//     ],
//     campusFeatures: [
//       {
//         icon: Shield,
//         title: "Security",
//         description: "24/7 security with CCTV surveillance, access control, and trained security personnel",
//         show: true
//       },
//       {
//         icon: TreePine,
//         title: "Green Campus",
//         description: "Eco-friendly campus with lush greenery, rainwater harvesting, and waste management systems",
//         show: true
//       },
//       {
//         icon: Wifi,
//         title: "Wi-Fi Enabled",
//         description: "Complete campus Wi-Fi coverage with controlled access for educational purposes",
//         show: true
//       },
//       {
//         icon: Car,
//         title: "Ample Parking",
//         description: "Spacious parking facilities for staff, visitors, and school buses",
//         show: true
//       },
//       {
//         icon: Utensils,
//         title: "Cafeteria",
//         description: "Hygienic cafeteria serving nutritious meals and snacks for students and staff",
//         show: true
//       },
//       {
//         icon: HeartPulse,
//         title: "Health & Safety",
//         description: "Regular safety drills, fire safety systems, and comprehensive health policies",
//         show: true
//       }
//     ],
//     virtualTour: {
//       show: true,
//       title: "Experience Our Campus Virtually",
//       description: "Can't visit in person? Take our virtual tour to explore our facilities from anywhere in the world.",
//       primaryCta: "Start Virtual Tour",
//       secondaryCta: "Schedule Campus Visit"
//     },
//     contactInfo: {
//       show: true,
//       title: "Plan Your Visit",
//       address: "1, Ashok Place, New Delhi - 110001, India",
//       hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM\n(Prior appointment recommended)",
//       phone: "011 2336 3462\n011 2336 3134",
//       email: "infrastructure@stcolumbas.edu.in",
//       mapTitle: "Campus Map",
//       mapDescription: "Download our campus map to navigate our facilities easily during your visit."
//     },
//     showHero: true,
//     showIntroduction: true,
//     showFacilities: true,
//     showCampusFeatures: true,
//     showVirtualTour: true,
//     showContact: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...schoolData };

//   // Filter functions
//   const filteredFacilityCategories = data.facilityCategories.filter(cat => cat.show !== false);
//   const filteredFacilities = data.facilities.filter(facility => facility.show !== false);
//   const filteredCampusFeatures = data.campusFeatures.filter(feature => feature.show !== false);
//   const filteredIntroductionStats = data.introduction.stats.filter(stat => stat.show !== false);

//   const displayedFacilities = activeCategory === 'all' 
//     ? filteredFacilities 
//     : filteredFacilities.filter(facility => facility.category === activeCategory);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - Consistent with other pages */}
//       {/* {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/40 z-10"></div>
//           <img
//             src={data.hero.image}
//             alt="School Campus"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 z-20 flex items-center justify-center">
//             <div className="text-center text-white px-4 max-w-4xl">
//               <h1 className="text-4xl font-bold mb-4">{data.hero.title}</h1>
//               <p className="text-xl mb-6 text-gray-200">
//                 {data.hero.subtitle}
//               </p>
//               <a 
//                 href={data.hero.ctaLink || "#"} 
//                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
//               >
//                 {data.hero.cta}
//                 <ExternalLink className="ml-2 h-4 w-4" />
//               </a>
//             </div>
//           </div>
//         </section>
//       )} */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Introduction */}
//       {data.showIntroduction && data.introduction.show && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.introduction.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.introduction.description}
//               </p>
//             </div>

//             {filteredIntroductionStats.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                 {filteredIntroductionStats.map((stat, index) => {
//                   const IconComponent = stat.icon;
//                   return (
//                     <div key={index} className="text-center">
//                       <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                         <IconComponent className="h-8 w-8 text-green-600" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-800 mb-2">{stat.value} {stat.label}</h3>
//                       <p className="text-gray-600">{stat.description}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Facilities Gallery */}
//       {data.showFacilities && filteredFacilities.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
//               <p className="text-lg text-gray-600">
//                 Explore our comprehensive range of facilities designed to support every aspect of student development
//               </p>
//             </div>

//             {/* Category Filters */}
//             {filteredFacilityCategories.length > 0 && (
//               <div className="flex flex-wrap justify-center gap-3 mb-10">
//                 {filteredFacilityCategories.map((category) => {
//                   const IconComponent = category.icon;
//                   return (
//                     <button
//                       key={category.id}
//                       onClick={() => setActiveCategory(category.id)}
//                       className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                         activeCategory === category.id
//                           ? 'bg-green-600 text-white'
//                           : 'bg-white text-gray-700 hover:bg-green-50'
//                       }`}
//                     >
//                       <IconComponent className="w-4 h-4 mr-2" />
//                       {category.name}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Facilities Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {displayedFacilities.map((facility) => (
//                 <div key={facility.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//                   <div className="h-48 overflow-hidden">
//                     <img 
//                       src={facility.image} 
//                       alt={facility.title}
//                       className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
//                     />
//                   </div>
//                   <div className="p-5">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.title}</h3>
//                     <p className="text-gray-600 mb-4">{facility.description}</p>
                    
//                     {facility.features && facility.features.length > 0 && (
//                       <div className="mb-4">
//                         <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
//                         <ul className="space-y-1">
//                           {facility.features.map((feature, index) => (
//                             <li key={index} className="flex items-center text-sm text-gray-600">
//                               <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
                    
//                     <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
//                       View Details
//                       <ArrowRight className="ml-1 h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Campus Features */}
//       {data.showCampusFeatures && filteredCampusFeatures.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Amenities</h2>
//               <p className="text-lg text-gray-600">
//                 Our campus is designed with student safety, comfort, and learning in mind
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredCampusFeatures.map((feature, index) => {
//                 const IconComponent = feature.icon;
//                 return (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group">
//                     <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
//                     <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Virtual Tour CTA */}
//       {data.showVirtualTour && data.virtualTour.show && (
//         <section className="py-16 bg-green-700 text-white">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">{data.virtualTour.title}</h2>
//             <p className="text-lg mb-8 max-w-3xl mx-auto">
//               {data.virtualTour.description}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <a href="/virtual-tour" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
//                 {data.virtualTour.primaryCta}
//                 <ExternalLink className="ml-2 h-5 w-5" />
//               </a>
//               <a href="/visit" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
//                 {data.virtualTour.secondaryCta}
//               </a>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Contact Information */}
//       {data.showContact && data.contactInfo.show && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.contactInfo.title}</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Address</h3>
//                       <p className="text-gray-600 whitespace-pre-line">
//                         {data.contactInfo.address}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Clock className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Visiting Hours</h3>
//                       <p className="text-gray-600 whitespace-pre-line">
//                         {data.contactInfo.hours}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Phone className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Contact</h3>
//                       <p className="text-gray-600 whitespace-pre-line">
//                         {data.contactInfo.phone}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Mail className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Email</h3>
//                       <p className="text-gray-600">{data.contactInfo.email}</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6">
//                   <a href="/contact" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors flex items-center inline-block">
//                     Request Information
//                     <ChevronRight className="ml-2 h-4 w-4" />
//                   </a>
//                 </div>
//               </div>
              
//               <div>
//                 <div className="bg-white rounded-lg p-6 shadow-md h-full">
//                   <h3 className="text-xl font-bold mb-4">{data.contactInfo.mapTitle}</h3>
//                   <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
//                     <span className="text-gray-500">Interactive Campus Map</span>
//                   </div>
//                   <p className="text-gray-600 mb-4">
//                     {data.contactInfo.mapDescription}
//                   </p>
//                   <a href="/campus-map" className="text-green-600 hover:text-green-700 font-medium flex items-center">
//                     Download Campus Map (PDF)
//                     <ExternalLink className="ml-2 h-4 w-4" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default InfrastructurePage;