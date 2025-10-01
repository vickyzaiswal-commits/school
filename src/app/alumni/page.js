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
  Users,
  Award,
  Globe,
  Heart,
  Building,
  Settings,
  X
} from 'lucide-react';

const AlumniPage = ({ schoolData = {} }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure - Consistent with Infrastructure page
  const defaultData = {
    hero: {
      show: true,
      image: "https://images.unsplash.com/photo-1516321310762-479437144403?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Our Alumni Community",
      subtitle: "Connecting generations of leaders, innovators, and change-makers",
      height: "h-96"
    },
    introduction: {
      show: true,
      title: "A Legacy of Excellence",
      description: "Our alumni form a vibrant global network, contributing to society through leadership, innovation, and service. Stay connected, share your achievements, and inspire the next generation.",
      stats: [
        { icon: Users, value: "10,000+", label: "Alumni Worldwide", description: "A global network of graduates", show: true },
        { icon: Award, value: "50+", label: "Notable Alumni", description: "Leaders in various fields", show: true },
        { icon: Globe, value: "30+", label: "Countries Represented", description: "A diverse alumni community", show: true }
      ]
    },
    alumniCategories: [
      { id: 'all', name: 'All Stories', icon: Users, show: true },
      { id: 'leadership', name: 'Leadership', icon: Award, show: true },
      { id: 'innovation', name: 'Innovation', icon: Globe, show: true },
      { id: 'community', name: 'Community Service', icon: Heart, show: true }
    ],
    alumniStories: [
      {
        id: 1,
        name: "Dr. Anita Sharma",
        description: "Renowned cardiologist leading groundbreaking research in heart disease prevention.",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "leadership",
        achievements: ["Published 50+ research papers", "Received National Health Award", "Mentors young doctors"],
        show: true
      },
      {
        id: 2,
        name: "Rahul Kapoor",
        description: "Tech entrepreneur who founded a leading AI startup revolutionizing education.",
        image: "https://images.unsplash.com/photo-1516321310762-479437144403?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "innovation",
        achievements: ["Raised $10M in funding", "Featured in Forbes 30 Under 30", "Developed award-winning app"],
        show: true
      },
      {
        id: 3,
        name: "Priya Mehra",
        description: "Social worker dedicated to uplifting underprivileged communities through education.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d877c828f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        category: "community",
        achievements: ["Founded NGO for education", "Impacted 5,000+ children", "Received Social Impact Award"],
        show: true
      }
    ],
    alumniFeatures: [
      {
        icon: Globe,
        title: "Global Network",
        description: "Join our worldwide alumni network to connect, collaborate, and share opportunities.",
        show: true
      },
      {
        icon: Award,
        title: "Mentorship Program",
        description: "Mentor current students or seek guidance from experienced alumni in your field.",
        show: true
      },
      {
        icon: Heart,
        title: "Giving Back",
        description: "Support scholarships, infrastructure, and programs to empower future generations.",
        show: true
      }
    ],
    connectSection: {
      show: true,
      title: "Stay Connected",
      description: "Join our alumni portal, attend events, or share your story to inspire others.",
      primaryCta: "Join Alumni Portal",
      secondaryCta: "Attend an Event"
    },
    contactInfo: {
      show: true,
      title: "Connect with Us",
      address: "1, Ashok Place, New Delhi - 110001, India",
      hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM",
      phone: "011 2336 3462\n011 2336 3134",
      email: "alumni@stcolumbas.edu.in",
      mapTitle: "Visit Us",
      mapDescription: "Come to our campus for alumni events or meetings."
    },
    showHero: true,
    showIntroduction: true,
    showAlumniStories: true,
    showAlumniFeatures: true,
    showConnectSection: true,
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

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for string arrays (e.g., achievements in alumniStories)
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
  const filteredAlumniCategories = data.alumniCategories.filter(cat => cat.show !== false);
  const filteredAlumniStories = data.alumniStories.filter(story => story.show !== false);
  const filteredAlumniFeatures = data.alumniFeatures.filter(feature => feature.show !== false);
  const filteredIntroductionStats = data.introduction.stats.filter(stat => stat.show !== false);

  const displayedAlumniStories = activeCategory === 'all' 
    ? filteredAlumniStories 
    : filteredAlumniStories.filter(story => story.category === activeCategory);

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
              {editSection === 'alumniCategories' && (
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
              {editSection === 'alumniStories' && (
                <div className="space-y-4">
                  {editData && editData.map((story, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Story {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={story.name || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={story.description || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                          type="text"
                          value={story.image || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'image', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                          value={story.category || ''}
                          onChange={(e) => handleNestedArrayChange('', index, 'category', e.target.value)}
                          className="w-full p-2 border rounded"
                        >
                          {filteredAlumniCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={story.show !== false}
                            onChange={(e) => handleNestedArrayChange('', index, 'show', e.target.checked)}
                          />
                          <span>Show Story</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Achievements</h5>
                      {story.achievements && story.achievements.map((achievement, aIndex) => (
                        <div key={aIndex} className="mb-2">
                          <label className="block text-sm font-medium">Achievement {aIndex + 1}</label>
                          <input
                            type="text"
                            value={achievement || ''}
                            onChange={(e) => {
                              const updated = { ...editData };
                              updated[index].achievements[aIndex] = e.target.value;
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
              {editSection === 'alumniFeatures' && (
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
              {editSection === 'connectSection' && (
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
                      <span>Show Connect Section</span>
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

      {/* Alumni Stories */}
      {data.showAlumniStories && filteredAlumniStories.length > 0 && (
        <section
          id="alumniStories"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.alumniStories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Alumni Stories</h2>
              <p className="text-lg text-gray-600">Discover the achievements of our alumni who are making a difference worldwide</p>
            </div>
            {/* Category Filters */}
            {filteredAlumniCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filteredAlumniCategories.map((category) => {
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
                    onClick={() => openEditModal('alumniCategories')}
                    className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                )}
              </div>
            )}
            {/* Alumni Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedAlumniStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.name}</h3>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    {story.achievements && story.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {story.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      Read Full Story
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('alumniStories')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Alumni Features */}
      {data.showAlumniFeatures && filteredAlumniFeatures.length > 0 && (
        <section
          id="alumniFeatures"
          className={`py-16 bg-white animate-on-scroll ${isVisible.alumniFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Alumni Benefits</h2>
              <p className="text-lg text-gray-600">Engage with our alumni community and unlock exclusive opportunities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumniFeatures.map((feature, index) => {
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
                onClick={() => openEditModal('alumniFeatures')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Connect Section */}
      {data.showConnectSection && data.connectSection.show && (
        <section
          id="connectSection"
          className={`py-16 bg-green-700 text-white animate-on-scroll ${isVisible.connectSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{data.connectSection.title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{data.connectSection.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/alumni-portal" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                {data.connectSection.primaryCta}
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <a href="/alumni-events" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
                {data.connectSection.secondaryCta}
              </a>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('connectSection')}
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

export default AlumniPage;