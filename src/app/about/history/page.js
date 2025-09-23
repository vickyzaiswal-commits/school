
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Award,
  Users,
  BookOpen,
  Building2,
  Heart,
  Star,
  Trophy,
  GraduationCap,
  Clock,
  MapPin,
  ArrowRight,
  Lightbulb,
  Globe,
  Target,
  Shield,
  Camera,
  FileText,
  User,
  Settings,
  X
} from 'lucide-react';

const OurHistoryPage = ({ schoolData = {}, schoolId = 'default' }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure
  const defaultData = {
    hero: {
      show: true,
      establishedYear: "1927",
      title: "Our Rich Heritage",
      subtitle: "Nearly a century of educational excellence, rooted in Edmund Rice values and committed to nurturing generations of compassionate leaders.",
      stats: [
        { value: "97+", label: "Years of Excellence", show: true },
        { value: "10,000+", label: "Alumni Worldwide", show: true },
        { value: "2,000+", label: "Current Students", show: true }
      ],
      height: "h-96"
    },
    edmundRiceValues: {
      show: true,
      title: "Edmund Rice Legacy",
      description: "Our school is built on the educational philosophy of Blessed Edmund Rice, who dedicated his life to providing quality education to young people, especially those from disadvantaged backgrounds.",
      values: [
        {
          icon: Heart,
          title: "Compassion",
          description: "Teaching students to care for others and show empathy in all relationships",
          show: true
        },
        {
          icon: Shield,
          title: "Justice",
          description: "Promoting fairness, equality, and standing up for what is right",
          show: true
        },
        {
          icon: Users,
          title: "Respect",
          description: "Honoring the dignity of every person regardless of background or circumstances",
          show: true
        },
        {
          icon: BookOpen,
          title: "Liberation",
          description: "Empowering students through education to achieve their full potential",
          show: true
        }
      ]
    },
    timeline: {
      show: true,
      title: "Journey Through Time",
      description: "Explore the key milestones and transformative moments that have shaped our institution into what it is today.",
      events: [
        {
          year: "1927",
          title: "Foundation Years",
          subtitle: "The Beginning of Excellence",
          description: "Our school was established as part of the educational mission to provide quality education grounded in strong values.",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Founded with strong values",
            "First batch of students",
            "Original campus established",
            "Educational philosophy established"
          ],
          show: true
        },
        {
          year: "1930s-1940s",
          title: "Growth & Recognition",
          subtitle: "Building Foundations",
          description: "The school gained recognition for its academic excellence and character formation during challenging times.",
          image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Government recognition received",
            "Expansion of academic programs",
            "First sports achievements",
            "Community service initiatives"
          ],
          show: true
        },
        {
          year: "1950s-1960s",
          title: "Post-Independence Era",
          subtitle: "Serving New India",
          description: "As India gained independence, our school played a crucial role in educating the leaders of tomorrow.",
          image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Adapted to Indian education system",
            "Increased enrollment significantly",
            "New facilities built",
            "Alumni network establishment"
          ],
          show: true
        },
        {
          year: "2010s-Present",
          title: "Contemporary Excellence",
          subtitle: "Leading Educational Innovation",
          description: "Today, our school stands as a beacon of educational excellence, combining traditional values with modern pedagogy.",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          highlights: [
            "Quality certifications",
            "Green school initiatives",
            "Advanced educational programs",
            "Global citizenship focus"
          ],
          show: true
        }
      ]
    },
    milestones: {
      show: true,
      title: "Historic Milestones",
      description: "Key achievements and pivotal moments that define our journey of excellence.",
      items: [
        { year: "1927", event: "School Founded", icon: Building2, show: true },
        { year: "1935", event: "First Graduation", icon: GraduationCap, show: true },
        { year: "1947", event: "Post-Independence Growth", icon: Globe, show: true },
        { year: "1960", event: "500+ Students", icon: Users, show: true },
        { year: "1975", event: "Modern Facilities", icon: Lightbulb, show: true },
        { year: "1990", event: "Technology Integration", icon: Target, show: true },
        { year: "2010", event: "Quality Certification", icon: Award, show: true },
        { year: "2024", event: "97 Years of Excellence", icon: Star, show: true }
      ]
    },
    achievements: {
      show: true,
      title: "Our Achievements",
      description: "Recognition and accomplishments that reflect our commitment to excellence across academics, sports, and community service.",
      categories: [
        {
          category: "Academic Excellence",
          items: [
            "100% Board Pass Rate for consecutive years",
            "Top schools in the region",
            "National level competition winners",
            "Inter-school debate champions"
          ],
          show: true
        },
        {
          category: "Sports & Activities",
          items: [
            "Multiple inter-school championships",
            "National level athletes produced",
            "Cultural fest winners",
            "Student conference hosts"
          ],
          show: true
        },
        {
          category: "Infrastructure",
          items: [
            "State-of-the-art laboratories",
            "Extensive library collection",
            "Modern sports facilities",
            "Large capacity auditorium"
          ],
          show: true
        }
      ]
    },
    quote: {
      show: true,
      text: "The mind once enlightened cannot again become dark.",
      author: "Blessed Edmund Rice",
      role: "Founder of Christian Brothers Education"
    },
    callToAction: {
      show: true,
      title: "Continue Our Legacy",
      description: "Join our family and become part of our continuing story of excellence, values, and service to humanity.",
      buttons: [
        { label: "Apply for Admission", icon: FileText, link: "/admissions", show: true },
        { label: "Take Virtual Tour", icon: Camera, link: "/virtual-tour", show: true }
      ]
    },
    showHero: true,
    showValues: true,
    showTimeline: true,
    showMilestones: true,
    showAchievements: true,
    showQuote: true,
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

  // Handle change for array items
  const handleArrayChange = (index, field, value) => {
    const updated = [...editData];
    updated[index] = { ...updated[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays (e.g., hero.stats, timeline.events.highlights)
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for nested array of strings (e.g., achievements.categories.items)
  const handleNestedStringArrayChange = (nestedKey, index, itemIndex, value) => {
    const updated = { ...editData };
    updated[nestedKey][index].items[itemIndex] = value;
    setEditData(updated);
  };

  // Save changes to state
  const saveChanges = () => {
    setData({ ...data, [editSection]: editData });
    setEditFormOpen(false);
  };

  // Filter functions
  const filteredHeroStats = data.hero.stats.filter(stat => stat.show !== false);
  const filteredValues = data.edmundRiceValues.values.filter(value => value.show !== false);
  const filteredTimelineEvents = data.timeline.events.filter(event => event.show !== false);
  const filteredMilestones = data.milestones.items.filter(item => item.show !== false);
  const filteredAchievementCategories = data.achievements.categories.filter(cat => cat.show !== false);
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
                    <label className="block text-sm font-medium">Established Year</label>
                    <input
                      type="text"
                      value={editData.establishedYear || ''}
                      onChange={(e) => handleObjectChange('establishedYear', e.target.value)}
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
              {editSection === 'edmundRiceValues' && (
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
                      <span>Show Values</span>
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
              {editSection === 'timeline' && (
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
                      <span>Show Timeline</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Events</h3>
                  {editData.events && editData.events.map((event, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Year</label>
                        <input
                          type="text"
                          value={event.year || ''}
                          onChange={(e) => handleNestedArrayChange('events', index, 'year', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={event.title || ''}
                          onChange={(e) => handleNestedArrayChange('events', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Subtitle</label>
                        <input
                          type="text"
                          value={event.subtitle || ''}
                          onChange={(e) => handleNestedArrayChange('events', index, 'subtitle', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={event.description || ''}
                          onChange={(e) => handleNestedArrayChange('events', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                          type="text"
                          value={event.image || ''}
                          onChange={(e) => handleNestedArrayChange('events', index, 'image', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={event.show !== false}
                            onChange={(e) => handleNestedArrayChange('events', index, 'show', e.target.checked)}
                          />
                          <span>Show Event</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Highlights</h5>
                      {event.highlights && event.highlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="mb-2">
                          <label className="block text-sm font-medium">Highlight {hIndex + 1}</label>
                          <input
                            type="text"
                            value={highlight || ''}
                            onChange={(e) => {
                              const updated = [...editData];
                              updated[index].highlights[hIndex] = e.target.value;
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
              {editSection === 'milestones' && (
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
                      <span>Show Milestones</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {editData.items && editData.items.map((item, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Milestone {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Year</label>
                        <input
                          type="text"
                          value={item.year || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'year', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Event</label>
                        <input
                          type="text"
                          value={item.event || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'event', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleNestedArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show Milestone</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'achievements' && (
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
                      <span>Show Achievements</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Categories</h3>
                  {editData.categories && editData.categories.map((category, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Category {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Category Name</label>
                        <input
                          type="text"
                          value={category.category || ''}
                          onChange={(e) => handleNestedArrayChange('categories', index, 'category', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={category.show !== false}
                            onChange={(e) => handleNestedArrayChange('categories', index, 'show', e.target.checked)}
                          />
                          <span>Show Category</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Items</h5>
                      {category.items && category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-2">
                          <label className="block text-sm font-medium">Item {itemIndex + 1}</label>
                          <input
                            type="text"
                            value={item || ''}
                            onChange={(e) => handleNestedStringArrayChange('categories', index, itemIndex, e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'quote' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <textarea
                      value={editData.text || ''}
                      onChange={(e) => handleObjectChange('text', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Author</label>
                    <input
                      type="text"
                      value={editData.author || ''}
                      onChange={(e) => handleObjectChange('author', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input
                      type="text"
                      value={editData.role || ''}
                      onChange={(e) => handleObjectChange('role', e.target.value)}
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
                      <span>Show Quote</span>
                    </label>
                  </div>
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
          className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Est. {data.hero.establishedYear}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-6">
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

      {/* Edmund Rice Legacy */}
      {data.showValues && data.edmundRiceValues.show && filteredValues.length > 0 && (
        <section
          id="values"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.edmundRiceValues.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.edmundRiceValues.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent className="h-6 w-6 text-green-600" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('edmundRiceValues')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {data.showTimeline && data.timeline.show && filteredTimelineEvents.length > 0 && (
        <section
          id="timeline"
          className={`py-16 bg-white animate-on-scroll ${isVisible.timeline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.timeline.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.timeline.description}
              </p>
            </div>
            <div className="flex justify-center mb-12 overflow-x-auto">
              <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg">
                {filteredTimelineEvents.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 whitespace-nowrap ${
                      activeTimeline === index
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    {event.year}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-green-50 inline-block px-3 py-1 rounded-full mb-4">
                  <span className="text-green-700 font-semibold text-sm">
                    {filteredTimelineEvents[activeTimeline].year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {filteredTimelineEvents[activeTimeline].title}
                </h3>
                <p className="text-lg text-green-600 mb-4 font-medium">
                  {filteredTimelineEvents[activeTimeline].subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {filteredTimelineEvents[activeTimeline].description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 mb-3">Key Highlights:</h4>
                  {filteredTimelineEvents[activeTimeline].highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-green-600 rounded-full p-1">
                        <ArrowRight className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={filteredTimelineEvents[activeTimeline].image}
                    alt={filteredTimelineEvents[activeTimeline].title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('timeline')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Milestones */}
      {data.showMilestones && data.milestones.show && filteredMilestones.length > 0 && (
        <section
          id="milestones"
          className={`py-16 bg-gradient-to-br from-green-700 to-green-800 text-white animate-on-scroll ${isVisible.milestones ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{data.milestones.title}</h2>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                {data.milestones.description}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredMilestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                return (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="bg-yellow-400 rounded-full w-10 h-10 mx-auto mb-3 flex items-center justify-center">
                      {IconComponent && <IconComponent className="h-5 w-5 text-green-800" />}
                    </div>
                    <div className="text-xl font-bold text-yellow-400 mb-1">{milestone.year}</div>
                    <div className="text-sm text-white">{milestone.event}</div>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('milestones')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.showAchievements && data.achievements.show && filteredAchievementCategories.length > 0 && (
        <section
          id="achievements"
          className={`py-16 bg-white animate-on-scroll ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.achievements.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.achievements.description}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredAchievementCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <Trophy className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('achievements')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Legacy Quote */}
      {data.showQuote && data.quote.show && (
        <section
          id="quote"
          className={`py-16 bg-gray-900 text-white animate-on-scroll ${isVisible.quote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <blockquote className="text-2xl font-light leading-relaxed mb-6 italic">
              "{data.quote.text}"
            </blockquote>
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold">{data.quote.author}</h4>
                <p className="text-gray-300 text-sm">{data.quote.role}</p>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('quote')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
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
          <div className="max-w-4xl mx-auto px-4 text-center">
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

export default OurHistoryPage;







// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   Calendar,
//   Award,
//   Users,
//   BookOpen,
//   Building2,
//   Heart,
//   Star,
//   Trophy,
//   GraduationCap,
//   Clock,
//   MapPin,
//   ArrowRight,
//   Lightbulb,
//   Globe,
//   Target,
//   Shield,
//   Camera,
//   FileText,
//   User
// } from 'lucide-react';

// const OurHistoryPage = ({ schoolData = {} }) => {
//   const [activeTimeline, setActiveTimeline] = useState(0);
//   const [isVisible, setIsVisible] = useState({});

//   // Default data structure
//   const defaultData = {
//     hero: {
//       show: true,
//       establishedYear: "1927",
//       title: "Our Rich Heritage",
//       subtitle: "Nearly a century of educational excellence, rooted in Edmund Rice values and committed to nurturing generations of compassionate leaders.",
//       stats: [
//         { value: "97+", label: "Years of Excellence", show: true },
//         { value: "10,000+", label: "Alumni Worldwide", show: true },
//         { value: "2,000+", label: "Current Students", show: true }
//       ],
//       // Added consistent height property
//       height: "h-96"
//     },
//     // ... rest of the data structure remains the same
//     edmundRiceValues: {
//       show: true,
//       title: "Edmund Rice Legacy",
//       description: "Our school is built on the educational philosophy of Blessed Edmund Rice, who dedicated his life to providing quality education to young people, especially those from disadvantaged backgrounds.",
//       values: [
//         {
//           icon: Heart,
//           title: "Compassion",
//           description: "Teaching students to care for others and show empathy in all relationships",
//           show: true
//         },
//         {
//           icon: Shield,
//           title: "Justice",
//           description: "Promoting fairness, equality, and standing up for what is right",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Respect",
//           description: "Honoring the dignity of every person regardless of background or circumstances",
//           show: true
//         },
//         {
//           icon: BookOpen,
//           title: "Liberation",
//           description: "Empowering students through education to achieve their full potential",
//           show: true
//         }
//       ]
//     },
//     timeline: {
//       show: true,
//       title: "Journey Through Time",
//       description: "Explore the key milestones and transformative moments that have shaped our institution into what it is today.",
//       events: [
//         {
//           year: "1927",
//           title: "Foundation Years",
//           subtitle: "The Beginning of Excellence",
//           description: "Our school was established as part of the educational mission to provide quality education grounded in strong values.",
//           image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           highlights: [
//             "Founded with strong values",
//             "First batch of students",
//             "Original campus established",
//             "Educational philosophy established"
//           ],
//           show: true
//         },
//         {
//           year: "1930s-1940s",
//           title: "Growth & Recognition",
//           subtitle: "Building Foundations",
//           description: "The school gained recognition for its academic excellence and character formation during challenging times.",
//           image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           highlights: [
//             "Government recognition received",
//             "Expansion of academic programs",
//             "First sports achievements",
//             "Community service initiatives"
//           ],
//           show: true
//         },
//         {
//           year: "1950s-1960s",
//           title: "Post-Independence Era",
//           subtitle: "Serving New India",
//           description: "As India gained independence, our school played a crucial role in educating the leaders of tomorrow.",
//           image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           highlights: [
//             "Adapted to Indian education system",
//             "Increased enrollment significantly",
//             "New facilities built",
//             "Alumni network establishment"
//           ],
//           show: true
//         },
//         {
//           year: "2010s-Present",
//           title: "Contemporary Excellence",
//           subtitle: "Leading Educational Innovation",
//           description: "Today, our school stands as a beacon of educational excellence, combining traditional values with modern pedagogy.",
//           image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           highlights: [
//             "Quality certifications",
//             "Green school initiatives",
//             "Advanced educational programs",
//             "Global citizenship focus"
//           ],
//           show: true
//         }
//       ]
//     },
//     milestones: {
//       show: true,
//       title: "Historic Milestones",
//       description: "Key achievements and pivotal moments that define our journey of excellence.",
//       items: [
//         { year: "1927", event: "School Founded", icon: Building2, show: true },
//         { year: "1935", event: "First Graduation", icon: GraduationCap, show: true },
//         { year: "1947", event: "Post-Independence Growth", icon: Globe, show: true },
//         { year: "1960", event: "500+ Students", icon: Users, show: true },
//         { year: "1975", event: "Modern Facilities", icon: Lightbulb, show: true },
//         { year: "1990", event: "Technology Integration", icon: Target, show: true },
//         { year: "2010", event: "Quality Certification", icon: Award, show: true },
//         { year: "2024", event: "97 Years of Excellence", icon: Star, show: true }
//       ]
//     },
//     achievements: {
//       show: true,
//       title: "Our Achievements",
//       description: "Recognition and accomplishments that reflect our commitment to excellence across academics, sports, and community service.",
//       categories: [
//         {
//           category: "Academic Excellence",
//           items: [
//             "100% Board Pass Rate for consecutive years",
//             "Top schools in the region",
//             "National level competition winners",
//             "Inter-school debate champions"
//           ],
//           show: true
//         },
//         {
//           category: "Sports & Activities",
//           items: [
//             "Multiple inter-school championships",
//             "National level athletes produced",
//             "Cultural fest winners",
//             "Student conference hosts"
//           ],
//           show: true
//         },
//         {
//           category: "Infrastructure",
//           items: [
//             "State-of-the-art laboratories",
//             "Extensive library collection",
//             "Modern sports facilities",
//             "Large capacity auditorium"
//           ],
//           show: true
//         }
//       ]
//     },
//     quote: {
//       show: true,
//       text: "The mind once enlightened cannot again become dark.",
//       author: "Blessed Edmund Rice",
//       role: "Founder of Christian Brothers Education"
//     },
//     callToAction: {
//       show: true,
//       title: "Continue Our Legacy",
//       description: "Join our family and become part of our continuing story of excellence, values, and service to humanity.",
//       buttons: [
//         { label: "Apply for Admission", icon: FileText, link: "/admissions", show: true },
//         { label: "Take Virtual Tour", icon: Camera, link: "/virtual-tour", show: true }
//       ]
//     },
//     showHero: true,
//     showValues: true,
//     showTimeline: true,
//     showMilestones: true,
//     showAchievements: true,
//     showQuote: true,
//     showCTA: true
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
//   const filteredHeroStats = data.hero.stats.filter(stat => stat.show !== false);
//   const filteredValues = data.edmundRiceValues.values.filter(value => value.show !== false);
//   const filteredTimelineEvents = data.timeline.events.filter(event => event.show !== false);
//   const filteredMilestones = data.milestones.items.filter(item => item.show !== false);
//   const filteredAchievementCategories = data.achievements.categories.filter(cat => cat.show !== false);
//   const filteredCTAButtons = data.callToAction.buttons.filter(button => button.show !== false);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - Now using consistent height */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Clock className="h-6 w-6 text-yellow-400" />
//                 <span className="text-yellow-400 font-semibold">Est. {data.hero.establishedYear}</span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 mb-8 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//               {filteredHeroStats.length > 0 && (
//                 <div className="flex flex-wrap gap-6">
//                   {filteredHeroStats.map((stat, index) => (
//                     <div key={index} className="text-center">
//                       <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
//                       <div className="text-sm text-green-200">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Rest of the component remains the same */}
//       {/* Edmund Rice Legacy */}
//       {data.showValues && data.edmundRiceValues.show && filteredValues.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.edmundRiceValues.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.edmundRiceValues.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredValues.map((value, index) => {
//                 const IconComponent = value.icon;
//                 return (
//                   <div 
//                     key={index} 
//                     className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
//                   >
//                     <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
//                     <p className="text-gray-600 leading-relaxed">{value.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Timeline Section */}
//       {data.showTimeline && data.timeline.show && filteredTimelineEvents.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.timeline.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.timeline.description}
//               </p>
//             </div>

//             {/* Timeline Navigation */}
//             <div className="flex justify-center mb-12 overflow-x-auto">
//               <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-lg">
//                 {filteredTimelineEvents.map((event, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveTimeline(index)}
//                     className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 whitespace-nowrap ${
//                       activeTimeline === index
//                         ? 'bg-green-600 text-white shadow-md'
//                         : 'text-gray-600 hover:bg-green-100'
//                     }`}
//                   >
//                     {event.year}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Active Timeline Content */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//               <div>
//                 <div className="bg-green-50 inline-block px-3 py-1 rounded-full mb-4">
//                   <span className="text-green-700 font-semibold text-sm">
//                     {filteredTimelineEvents[activeTimeline].year}
//                   </span>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                   {filteredTimelineEvents[activeTimeline].title}
//                 </h3>
//                 <p className="text-lg text-green-600 mb-4 font-medium">
//                   {filteredTimelineEvents[activeTimeline].subtitle}
//                 </p>
//                 <p className="text-gray-600 leading-relaxed mb-6">
//                   {filteredTimelineEvents[activeTimeline].description}
//                 </p>
                
//                 <div className="space-y-3">
//                   <h4 className="font-semibold text-gray-800 mb-3">Key Highlights:</h4>
//                   {filteredTimelineEvents[activeTimeline].highlights.map((highlight, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <div className="bg-green-600 rounded-full p-1">
//                         <ArrowRight className="h-3 w-3 text-white" />
//                       </div>
//                       <span className="text-gray-700">{highlight}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <div className="relative rounded-lg overflow-hidden shadow-xl">
//                   <img
//                     src={filteredTimelineEvents[activeTimeline].image}
//                     alt={filteredTimelineEvents[activeTimeline].title}
//                     className="w-full h-80 object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Milestones */}
//       {data.showMilestones && data.milestones.show && filteredMilestones.length > 0 && (
//         <section className="py-16 bg-gradient-to-br from-green-700 to-green-800 text-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">{data.milestones.title}</h2>
//               <p className="text-lg text-green-100 max-w-3xl mx-auto">
//                 {data.milestones.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {filteredMilestones.map((milestone, index) => {
//                 const IconComponent = milestone.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300"
//                   >
//                     <div className="bg-yellow-400 rounded-full w-10 h-10 mx-auto mb-3 flex items-center justify-center">
//                       <IconComponent className="h-5 w-5 text-green-800" />
//                     </div>
//                     <div className="text-xl font-bold text-yellow-400 mb-1">{milestone.year}</div>
//                     <div className="text-sm text-white">{milestone.event}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Achievements */}
//       {data.showAchievements && data.achievements.show && filteredAchievementCategories.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.achievements.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.achievements.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {filteredAchievementCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-lg p-6"
//                 >
//                   <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
//                     {category.category}
//                   </h3>
//                   <div className="space-y-3">
//                     {category.items.map((item, itemIndex) => (
//                       <div key={itemIndex} className="flex items-start space-x-3">
//                         <Trophy className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                         <span className="text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Legacy Quote */}
//       {data.showQuote && data.quote.show && (
//         <section className="py-16 bg-gray-900 text-white">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//             <blockquote className="text-2xl font-light leading-relaxed mb-6 italic">
//               "{data.quote.text}"
//             </blockquote>
//             <div className="flex items-center justify-center space-x-3">
//               <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
//                 <User className="h-6 w-6 text-white" />
//               </div>
//               <div className="text-left">
//                 <h4 className="text-lg font-semibold">{data.quote.author}</h4>
//                 <p className="text-gray-300 text-sm">{data.quote.role}</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Call to Action */}
//       {data.showCTA && data.callToAction.show && filteredCTAButtons.length > 0 && (
//         <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">{data.callToAction.title}</h2>
//             <p className="text-lg text-green-100 mb-8 leading-relaxed">
//               {data.callToAction.description}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {filteredCTAButtons.map((button, index) => {
//                 const IconComponent = button.icon;
//                 return (
//                   <a 
//                     key={index}
//                     href={button.link} 
//                     className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
//                   >
//                     <IconComponent className="h-5 w-5" />
//                     <span>{button.label}</span>
//                   </a>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default OurHistoryPage;