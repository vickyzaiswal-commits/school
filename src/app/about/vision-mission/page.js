"use client";
import React, { useState, useEffect } from 'react';
import { 
  Target,
  Compass,
  Heart,
  BookOpen,
  Users,
  Globe,
  Star,
  Lightbulb,
  Shield,
  Award,
  ArrowRight,
  CheckCircle,
  Eye,
  Mountain,
  User,
  FileText,
  Camera,
  Crown,
  Handshake,
  GraduationCap,
  Phone,
  ExternalLink,
  Settings,
  X
} from 'lucide-react';

const VisionMissionPage = ({ schoolData = {} }) => {
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
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Vision & Mission",
      subtitle: "Guided by Edmund Rice values for nearly a century",
      height: "h-96"
    },
    vision: {
      show: true,
      title: "Our Vision",
      quote: "To be a beacon of educational excellence, nurturing compassionate leaders who transform communities through knowledge, service, and unwavering commitment to justice.",
      points: [
        {
          icon: Crown,
          title: "Academic Excellence",
          description: "To be recognized as a premier educational institution setting the highest standards in academic achievement.",
          show: true
        },
        {
          icon: Heart,
          title: "Character Formation",
          description: "Develop individuals of integrity, compassion, and moral courage who contribute positively to society.",
          show: true
        },
        {
          icon: Globe,
          title: "Global Citizens",
          description: "Nurture students who think globally, act locally, and embrace diversity in an interconnected world.",
          show: true
        },
        {
          icon: Lightbulb,
          title: "Innovation & Leadership",
          description: "Foster creative thinking, entrepreneurial spirit, and ethical leadership in all students.",
          show: true
        }
      ]
    },
    mission: {
      show: true,
      title: "Our Mission",
      description: "To provide holistic education rooted in Edmund Rice values, fostering academic excellence, character formation, and global citizenship in a nurturing, inclusive community that empowers students to serve humanity with distinction.",
      pillars: [
        {
          icon: BookOpen,
          title: "Quality Education",
          description: "Comprehensive, innovative education that challenges students intellectually and prepares them for higher learning.",
          show: true
        },
        {
          icon: Users,
          title: "Inclusive Community",
          description: "A welcoming, diverse environment where every student feels valued and empowered to reach their potential.",
          show: true
        },
        {
          icon: Shield,
          title: "Edmund Rice Values",
          description: "Core values of compassion, justice, respect, and liberation through daily practices and education.",
          show: true
        },
        {
          icon: Star,
          title: "Holistic Development",
          description: "Nurture intellectual, emotional, physical, social, and spiritual growth through comprehensive programs.",
          show: true
        }
      ]
    },
    coreValues: {
      show: true,
      title: "Core Values",
      description: "The foundational principles that guide every aspect of our educational mission.",
      values: [
        {
          icon: Heart,
          title: "Compassion",
          description: "Teaching empathy, kindness, and care for others in all relationships.",
          show: true
        },
        {
          icon: Shield,
          title: "Justice",
          description: "Promoting fairness, equality, and courage to stand up for what is right.",
          show: true
        },
        {
          icon: Users,
          title: "Respect",
          description: "Honoring the dignity of every individual and celebrating diversity.",
          show: true
        },
        {
          icon: Award,
          title: "Excellence",
          description: "Striving for the highest standards in all endeavors and continuous improvement.",
          show: true
        }
      ]
    },
    callToAction: {
      show: true,
      title: "Join Our Educational Community",
      description: "Experience education that combines academic excellence with strong values and character formation.",
      buttons: [
        { label: "Apply for Admission", icon: FileText, link: "/admissions", show: true },
        { label: "Take Virtual Tour", icon: Camera, link: "/virtual-tour", show: true }
      ]
    },
    showHero: true,
    showVision: true,
    showMission: true,
    showCoreValues: true,
    showCTA: true
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

  // Handle change for nested arrays (e.g., vision.points, mission.pillars)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
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
  const filteredVisionPoints = data.vision.points.filter(point => point.show !== false);
  const filteredMissionPillars = data.mission.pillars.filter(pillar => pillar.show !== false);
  const filteredCoreValues = data.coreValues.values.filter(value => value.show !== false);
  const filteredCTAButtons = data.callToAction.buttons.filter(button => button.show !== false);

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
              {editSection === 'vision' && (
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
                    <label className="block text-sm font-medium">Quote</label>
                    <textarea
                      value={editData.quote || ''}
                      onChange={(e) => handleObjectChange('quote', e.target.value)}
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
                      <span>Show Vision</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Points</h3>
                  {editData.points && editData.points.map((point, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Point {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={point.title || ''}
                          onChange={(e) => handleNestedArrayChange('points', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={point.description || ''}
                          onChange={(e) => handleNestedArrayChange('points', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={point.show !== false}
                            onChange={(e) => handleNestedArrayChange('points', index, 'show', e.target.checked)}
                          />
                          <span>Show Point</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'mission' && (
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
                      <span>Show Mission</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Pillars</h3>
                  {editData.pillars && editData.pillars.map((pillar, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Pillar {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={pillar.title || ''}
                          onChange={(e) => handleNestedArrayChange('pillars', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={pillar.description || ''}
                          onChange={(e) => handleNestedArrayChange('pillars', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={pillar.show !== false}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'show', e.target.checked)}
                          />
                          <span>Show Pillar</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'coreValues' && (
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
                      <span>Show Core Values</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Values</h3>
                  {editData.values && editData.values.map((value, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Value {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={value.title || ''}
                          onChange={(e) => handleNestedArrayChange('values', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={value.description || ''}
                          onChange={(e) => handleNestedArrayChange('values', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={value.show !== false}
                            onChange={(e) => handleNestedArrayChange('values', index, 'show', e.target.checked)}
                          />
                          <span>Show Value</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'callToAction' && (
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
                      <span>Show Call to Action</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                  {editData.buttons && editData.buttons.map((button, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Button {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={button.label || ''}
                          onChange={(e) => handleNestedArrayChange('buttons', index, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Link</label>
                        <input
                          type="text"
                          value={button.link || ''}
                          onChange={(e) => handleNestedArrayChange('buttons', index, 'link', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={button.show !== false}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'show', e.target.checked)}
                          />
                          <span>Show Button</span>
                        </label>
                      </div>
                    </div>
                  ))}
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
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Our Direction</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Vision Statement */}
      {data.showVision && data.vision.show && filteredVisionPoints.length > 0 && (
        <section
          id="vision"
          className={`py-16 bg-white animate-on-scroll ${isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">{data.vision.title}</h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <blockquote className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
                  "{data.vision.quote}"
                </blockquote>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVisionPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      {IconComponent && <IconComponent className="h-6 w-6 text-blue-600" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{point.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('vision')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Mission Statement */}
      {data.showMission && data.mission.show && filteredMissionPillars.length > 0 && (
        <section
          id="mission"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Compass className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">{data.mission.title}</h2>
              </div>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {data.mission.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMissionPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('mission')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Core Values */}
      {data.showCoreValues && data.coreValues.show && filteredCoreValues.length > 0 && (
        <section
          id="coreValues"
          className={`py-16 bg-white animate-on-scroll ${isVisible.coreValues ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.coreValues.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.coreValues.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCoreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center">
                      <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('coreValues')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Call to Action */}
      {data.showCTA && data.callToAction.show && filteredCTAButtons.length > 0 && (
        <section
          id="callToAction"
          className={`py-16 bg-gradient-to-r from-green-600 to-green-700 text-white animate-on-scroll ${isVisible.callToAction ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{data.callToAction.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              {data.callToAction.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {filteredCTAButtons.map((button, index) => {
                const IconComponent = button.icon;
                return (
                  <a
                    key={index}
                    href={button.link}
                    className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                    <span>{button.label}</span>
                  </a>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('callToAction')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
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

export default VisionMissionPage;













// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Target,
//   Compass,
//   Heart,
//   BookOpen,
//   Users,
//   Globe,
//   Star,
//   Lightbulb,
//   Shield,
//   Award,
//   ArrowRight,
//   CheckCircle,
//   Eye,
//   Mountain,
//   User,
//   FileText,
//   Camera,
//   Crown,
//   Handshake,
//   GraduationCap,
//   Phone,
//   ExternalLink
// } from 'lucide-react';

// const VisionMissionPage = ({ schoolData = {} }) => {
//   const [isVisible, setIsVisible] = useState({});

//   // Default data structure - Consistent with other pages
//   const defaultData = {
//     hero: {
//       show: true,
//       image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Vision & Mission",
//       subtitle: "Guided by Edmund Rice values for nearly a century",
//       height: "h-96" // Consistent with Infrastructure and History pages
//     },
//     vision: {
//       show: true,
//       title: "Our Vision",
//       quote: "To be a beacon of educational excellence, nurturing compassionate leaders who transform communities through knowledge, service, and unwavering commitment to justice.",
//       points: [
//         {
//           icon: Crown,
//           title: "Academic Excellence",
//           description: "To be recognized as a premier educational institution setting the highest standards in academic achievement.",
//           show: true
//         },
//         {
//           icon: Heart,
//           title: "Character Formation",
//           description: "Develop individuals of integrity, compassion, and moral courage who contribute positively to society.",
//           show: true
//         },
//         {
//           icon: Globe,
//           title: "Global Citizens",
//           description: "Nurture students who think globally, act locally, and embrace diversity in an interconnected world.",
//           show: true
//         },
//         {
//           icon: Lightbulb,
//           title: "Innovation & Leadership",
//           description: "Foster creative thinking, entrepreneurial spirit, and ethical leadership in all students.",
//           show: true
//         }
//       ]
//     },
//     mission: {
//       show: true,
//       title: "Our Mission",
//       description: "To provide holistic education rooted in Edmund Rice values, fostering academic excellence, character formation, and global citizenship in a nurturing, inclusive community that empowers students to serve humanity with distinction.",
//       pillars: [
//         {
//           icon: BookOpen,
//           title: "Quality Education",
//           description: "Comprehensive, innovative education that challenges students intellectually and prepares them for higher learning.",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Inclusive Community",
//           description: "A welcoming, diverse environment where every student feels valued and empowered to reach their potential.",
//           show: true
//         },
//         {
//           icon: Shield,
//           title: "Edmund Rice Values",
//           description: "Core values of compassion, justice, respect, and liberation through daily practices and education.",
//           show: true
//         },
//         {
//           icon: Star,
//           title: "Holistic Development",
//           description: "Nurture intellectual, emotional, physical, social, and spiritual growth through comprehensive programs.",
//           show: true
//         }
//       ]
//     },
//     coreValues: {
//       show: true,
//       title: "Core Values",
//       description: "The foundational principles that guide every aspect of our educational mission.",
//       values: [
//         {
//           icon: Heart,
//           title: "Compassion",
//           description: "Teaching empathy, kindness, and care for others in all relationships.",
//           show: true
//         },
//         {
//           icon: Shield,
//           title: "Justice",
//           description: "Promoting fairness, equality, and courage to stand up for what is right.",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Respect",
//           description: "Honoring the dignity of every individual and celebrating diversity.",
//           show: true
//         },
//         {
//           icon: Award,
//           title: "Excellence",
//           description: "Striving for the highest standards in all endeavors and continuous improvement.",
//           show: true
//         }
//       ]
//     },
//     showHero: true,
//     showVision: true,
//     showMission: true,
//     showCoreValues: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...schoolData };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible((prev) => ({
//               ...prev,
//               [entry.target.id]: true
//             }));
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = document.querySelectorAll('.animate-on-scroll');
//     elements.forEach((el) => observer.observe(el));

//     return () => observer.disconnect();
//   }, []);

//   // Filter functions
//   const filteredVisionPoints = data.vision.points.filter(point => point.show !== false);
//   const filteredMissionPillars = data.mission.pillars.filter(pillar => pillar.show !== false);
//   const filteredCoreValues = data.coreValues.values.filter(value => value.show !== false);

//   return (
//     <div className="min-h-screen bg-white">
      
//       {/* Hero Section - Consistent with other pages */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Target className="h-6 w-6 text-yellow-400" />
//                 <span className="text-yellow-400 font-semibold">Our Direction</span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Vision Statement */}
//       {data.showVision && data.vision.show && filteredVisionPoints.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <div className="flex items-center justify-center space-x-3 mb-4">
//                 <Eye className="h-8 w-8 text-blue-600" />
//                 <h2 className="text-3xl font-bold text-gray-800">{data.vision.title}</h2>
//               </div>
//               <div className="max-w-4xl mx-auto">
//                 <blockquote className="text-2xl font-light text-gray-700 leading-relaxed mb-6">
//                   "{data.vision.quote}"
//                 </blockquote>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredVisionPoints.map((point, index) => {
//                 const IconComponent = point.icon;
//                 return (
//                   <div 
//                     key={index}
//                     className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg group"
//                   >
//                     <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{point.title}</h3>
//                     <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Mission Statement */}
//       {data.showMission && data.mission.show && filteredMissionPillars.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <div className="flex items-center justify-center space-x-3 mb-4">
//                 <Compass className="h-8 w-8 text-green-600" />
//                 <h2 className="text-3xl font-bold text-gray-800">{data.mission.title}</h2>
//               </div>
//               <div className="max-w-4xl mx-auto">
//                 <p className="text-lg text-gray-600 leading-relaxed mb-6">
//                   {data.mission.description}
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredMissionPillars.map((pillar, index) => {
//                 const IconComponent = pillar.icon;
//                 return (
//                   <div 
//                     key={index}
//                     className="bg-white rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group"
//                   >
//                     <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
//                     <p className="text-gray-600 leading-relaxed text-sm">{pillar.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Core Values */}
//       {data.showCoreValues && data.coreValues.show && filteredCoreValues.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.coreValues.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.coreValues.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredCoreValues.map((value, index) => {
//                 const IconComponent = value.icon;
//                 return (
//                   <div 
//                     key={index}
//                     className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="text-center">
//                       <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
//                       <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Call to Action - Consistent with other pages */}
//       <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6">Join Our Educational Community</h2>
//           <p className="text-xl text-green-100 mb-8 leading-relaxed">
//             Experience education that combines academic excellence with strong values 
//             and character formation.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a 
//               href="/admissions" 
//               className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
//             >
//               <FileText className="h-5 w-5" />
//               <span>Apply for Admission</span>
//             </a>
//             <a 
//               href="/virtual-tour" 
//               className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
//             >
//               <Camera className="h-5 w-5" />
//               <span>Take Virtual Tour</span>
//             </a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default VisionMissionPage;