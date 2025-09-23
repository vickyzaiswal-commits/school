"use client";
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Award, 
  Users, 
  BookOpen, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Trophy,
  GraduationCap,
  Heart,
  Target,
  Clock,
  FileText,
  CreditCard,
  User,
  Lightbulb,
  Globe,
  ExternalLink,
  Settings,
  X
} from 'lucide-react';

const HomePage = ({ schoolData = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // This should ideally come from auth context

  // Default data structure
  const defaultData = {
    heroSlides: [
      {
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Excellence in Education Since 1927",
        subtitle: "Nurturing young minds with Edmund Rice values",
        cta: "Explore Our Legacy",
        ctaLink: "/about",
        show: true
      },
      {
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        title: "Admissions Open for 2025-26",
        subtitle: "Join our community of learners and leaders",
        cta: "Apply Now",
        ctaLink: "/admissions",
        show: true
      },
      {
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
        title: "Holistic Development",
        subtitle: "Academic excellence with character building",
        cta: "Our Programs",
        ctaLink: "/academics",
        show: true
      }
    ],
    quickStats: [
      { number: "97+", label: "Years of Excellence", icon: Trophy, show: true },
      { number: "2000+", label: "Students", icon: Users, show: true },
      { number: "150+", label: "Faculty Members", icon: GraduationCap, show: true },
      { number: "50+", label: "Co-curricular Activities", icon: Award, show: true }
    ],
    features: [
      {
        icon: Heart,
        title: "Edmund Rice Values",
        description: "Character formation based on Christian values of compassion, justice, and respect.",
        show: true
      },
      {
        icon: BookOpen,
        title: "Academic Excellence",
        description: "Comprehensive curriculum designed to nurture intellectual growth and critical thinking.",
        show: true
      },
      {
        icon: Users,
        title: "Holistic Development",
        description: "Focus on emotional, social, physical, and spiritual development of every child.",
        show: true
      },
      {
        icon: Target,
        title: "Individual Attention",
        description: "Small class sizes ensuring personalized learning and mentorship for each student.",
        show: true
      },
      {
        icon: Globe,
        title: "Global Perspective",
        description: "International exposure and multicultural learning environment preparing students for the world.",
        show: true
      },
      {
        icon: Lightbulb,
        title: "Innovation & Technology",
        description: "Modern facilities and technology-integrated learning for 21st-century skills.",
        show: true
      }
    ],
    principalMessage: {
      show: true,
      name: "Dr. Mary Johnson",
      role: "Principal",
      message: "At St. Columba's, we believe that education is not just about academic achievement, but about nurturing the whole person. Our commitment to Edmund Rice values ensures that each student develops not only intellectually but also morally and spiritually.",
      stats: [
        { value: "100%", label: "Board Pass Rate", show: true },
        { value: "95%", label: "College Admissions", show: true },
        { value: "50+", label: "Awards Won", show: true },
        { value: "25+", label: "Sports Titles", show: true }
      ]
    },
    announcements: [
      {
        date: "Dec 15, 2024",
        title: "Winter Break Schedule",
        content: "School will be closed from December 25, 2024 to January 6, 2025. Classes resume on January 7, 2025.",
        urgent: false,
        show: true
      },
      {
        date: "Dec 10, 2024",
        title: "Annual Sports Day 2024",
        content: "Join us for our Annual Sports Day on December 20, 2024. Parents are cordially invited.",
        urgent: true,
        show: true
      },
      {
        date: "Dec 5, 2024",
        title: "Parent-Teacher Conference",
        content: "Scheduled meetings with parents for academic progress discussion from December 18-19, 2024.",
        urgent: false,
        show: true
      }
    ],
    testimonials: [
      {
        name: "Dr. Rajesh Kumar",
        role: "Parent, Class XII",
        content: "St. Columba's has provided my son with not just excellent education, but also strong moral values. The teachers are dedicated and caring.",
        rating: 5,
        show: true
      },
      {
        name: "Arjun Mehta",
        role: "Alumni, Batch 2020",
        content: "The foundation I received at St. Columba's prepared me well for engineering college and life. Forever grateful to this institution.",
        rating: 5,
        show: true
      },
      {
        name: "Mrs. Priya Sharma",
        role: "Parent, Class VIII",
        content: "The holistic approach to education here is remarkable. My daughter has grown tremendously in confidence and character.",
        rating: 5,
        show: true
      }
    ],
    contactInfo: {
      show: true,
      address: "1, Ashok Place, New Delhi - 110001, India",
      phone: "011 2336 3462\n011 2336 3134",
      email: "stcolumbas@stcolumbas.edu.in",
      hours: "Monday - Friday: 8:00 AM - 4:00 PM\nSaturday: 8:00 AM - 12:00 PM"
    },
    quickActions: [
      { label: "Apply for Admission", icon: FileText, link: "/admissions", show: true },
      { label: "Virtual Campus Tour", icon: Globe, link: "/virtual-tour", show: true },
      { label: "Download Prospectus", icon: FileText, link: "/downloads", show: true },
      { label: "Contact Admissions", icon: Phone, link: "/contact", show: true }
    ],
    quickAccess: [
      { label: "Admissions Open", sublabel: "Apply for 2025-26", icon: FileText, link: "/admissions", show: true },
      { label: "e-Care Portal", sublabel: "Student & Parent Login", icon: User, link: "/ecare", show: true },
      { label: "Pay Fees", sublabel: "Secure Online Payment", icon: CreditCard, link: "/pay-fees", show: true }
    ],
    showHero: true,
    showStats: true,
    showFeatures: true,
    showPrincipal: true,
    showAnnouncements: true,
    showTestimonials: true,
    showContact: true
  };

  // Merge provided data with defaults
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.heroSlides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % data.testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.testimonials.length]);

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

  // Handle change for nested array like principal stats
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Save changes
  const saveChanges = () => {
    setData({ ...data, [editSection]: editData });
    setEditFormOpen(false);
  };

  // Filter functions
  const filteredHeroSlides = data.heroSlides.filter(slide => slide.show !== false);
  const filteredQuickStats = data.quickStats.filter(stat => stat.show !== false);
  const filteredFeatures = data.features.filter(feature => feature.show !== false);
  const filteredAnnouncements = data.announcements.filter(announcement => announcement.show !== false);
  const filteredTestimonials = data.testimonials.filter(testimonial => testimonial.show !== false);
  const filteredQuickActions = data.quickActions.filter(action => action.show !== false);
  const filteredQuickAccess = data.quickAccess.filter(access => access.show !== false);
  const filteredPrincipalStats = data.principalMessage.stats ? data.principalMessage.stats.filter(stat => stat.show !== false) : [];

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
              {editSection === 'heroSlides' && Array.isArray(editData) && editData.map((slide, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Slide {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Image URL</label>
                      <input
                        type="text"
                        value={slide.image || ''}
                        onChange={(e) => handleArrayChange(index, 'image', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        value={slide.title || ''}
                        onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle || ''}
                        onChange={(e) => handleArrayChange(index, 'subtitle', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">CTA Text</label>
                      <input
                        type="text"
                        value={slide.cta || ''}
                        onChange={(e) => handleArrayChange(index, 'cta', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">CTA Link</label>
                      <input
                        type="text"
                        value={slide.ctaLink || ''}
                        onChange={(e) => handleArrayChange(index, 'ctaLink', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={slide.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Slide</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'quickStats' && Array.isArray(editData) && editData.map((stat, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Stat {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Number</label>
                      <input
                        type="text"
                        value={stat.number || ''}
                        onChange={(e) => handleArrayChange(index, 'number', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Label</label>
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => handleArrayChange(index, 'label', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={stat.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Stat</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'features' && Array.isArray(editData) && editData.map((feature, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Feature {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        value={feature.title || ''}
                        onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Description</label>
                      <textarea
                        value={feature.description || ''}
                        onChange={(e) => handleArrayChange(index, 'description', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={feature.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Feature</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'principalMessage' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => handleObjectChange('name', e.target.value)}
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
                    <label className="block text-sm font-medium">Message</label>
                    <textarea
                      value={editData.message || ''}
                      onChange={(e) => handleObjectChange('message', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="5"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Principal Message</span>
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
              {editSection === 'announcements' && Array.isArray(editData) && editData.map((ann, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Announcement {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Date</label>
                      <input
                        type="text"
                        value={ann.date || ''}
                        onChange={(e) => handleArrayChange(index, 'date', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        value={ann.title || ''}
                        onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Content</label>
                      <textarea
                        value={ann.content || ''}
                        onChange={(e) => handleArrayChange(index, 'content', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={ann.urgent || false}
                          onChange={(e) => handleArrayChange(index, 'urgent', e.target.checked)}
                        />
                        <span>Urgent</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={ann.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Announcement</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'testimonials' && Array.isArray(editData) && editData.map((test, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Testimonial {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        value={test.name || ''}
                        onChange={(e) => handleArrayChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Role</label>
                      <input
                        type="text"
                        value={test.role || ''}
                        onChange={(e) => handleArrayChange(index, 'role', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Content</label>
                      <textarea
                        value={test.content || ''}
                        onChange={(e) => handleArrayChange(index, 'content', e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Rating</label>
                      <input
                        type="number"
                        value={test.rating || 5}
                        onChange={(e) => handleArrayChange(index, 'rating', parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                        min="1"
                        max="5"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={test.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Testimonial</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                      value={editData.address || ''}
                      onChange={(e) => handleObjectChange('address', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <textarea
                      value={editData.phone || ''}
                      onChange={(e) => handleObjectChange('phone', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
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
                    <label className="block text-sm font-medium">Hours</label>
                    <textarea
                      value={editData.hours || ''}
                      onChange={(e) => handleObjectChange('hours', e.target.value)}
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
              {editSection === 'quickActions' && Array.isArray(editData) && editData.map((action, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Quick Action {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Label</label>
                      <input
                        type="text"
                        value={action.label || ''}
                        onChange={(e) => handleArrayChange(index, 'label', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Link</label>
                      <input
                        type="text"
                        value={action.link || ''}
                        onChange={(e) => handleArrayChange(index, 'link', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={action.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Action</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {editSection === 'quickAccess' && Array.isArray(editData) && editData.map((access, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold mb-2">Quick Access {index + 1}</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium">Label</label>
                      <input
                        type="text"
                        value={access.label || ''}
                        onChange={(e) => handleArrayChange(index, 'label', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Sublabel</label>
                      <input
                        type="text"
                        value={access.sublabel || ''}
                        onChange={(e) => handleArrayChange(index, 'sublabel', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Link</label>
                      <input
                        type="text"
                        value={access.link || ''}
                        onChange={(e) => handleArrayChange(index, 'link', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={access.show !== false}
                          onChange={(e) => handleArrayChange(index, 'show', e.target.checked)}
                        />
                        <span>Show Access</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
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
      {data.showHero && filteredHeroSlides.length > 0 && (
        <section className="relative h-[450px] overflow-hidden">
          {filteredHeroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-xl mb-6 text-gray-200">
                    {slide.subtitle}
                  </p>
                  <a 
                    href={slide.ctaLink || "#"} 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
                  >
                    {slide.cta}
                    <ArrowRight className="inline ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          {editMode && (
            <button
              onClick={() => openEditModal('heroSlides')}
              className="absolute top-4 right-4 z-30 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {filteredHeroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Quick Access Bar */}
          {filteredQuickAccess.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-green-800/90 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 py-3 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white">
                  {filteredQuickAccess.map((access, index) => (
                    <a key={index} href={access.link} className="flex items-center space-x-2 hover:bg-green-700/50 p-2 rounded-lg transition-colors text-sm">
                      <access.icon className="h-4 w-4 text-yellow-400" />
                      <div>
                        <h3 className="font-semibold">{access.label}</h3>
                        <p className="text-xs text-green-100">{access.sublabel}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </a>
                  ))}
                </div>
                {editMode && (
                  <button
                    onClick={() => openEditModal('quickAccess')}
                    className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded-full hover:bg-green-700"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Quick Stats */}
      {data.showStats && filteredQuickStats.length > 0 && (
        <section className="py-12 bg-gray-50 relative">
          {editMode && (
            <button
              onClick={() => openEditModal('quickStats')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-2 ${filteredQuickStats.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-6`}>
              {filteredQuickStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <stat.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {data.showFeatures && filteredFeatures.length > 0 && (
        <section className="py-16 bg-white relative">
          {editMode && (
            <button
              onClick={() => openEditModal('features')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our School?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Committed to nurturing young minds with values, knowledge, and character.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group">
                  <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <feature.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Principal's Message */}
      {data.showPrincipal && data.principalMessage.show && (
        <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white relative">
          {editMode && (
            <button
              onClick={() => openEditModal('principalMessage')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Principal's Message</h2>
                <blockquote className="text-base leading-relaxed mb-4">
                  "{data.principalMessage.message}"
                </blockquote>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{data.principalMessage.name}</h4>
                    <p className="text-green-100 text-sm">{data.principalMessage.role}</p>
                  </div>
                </div>
              </div>
              
              {filteredPrincipalStats.length > 0 && (
                <div className="relative">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className={`grid ${filteredPrincipalStats.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 text-center`}>
                      {filteredPrincipalStats.map((stat, index) => (
                        <div key={index}>
                          <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.value}</div>
                          <div className="text-xs text-green-100">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Announcements */}
      {data.showAnnouncements && filteredAnnouncements.length > 0 && (
        <section className="py-16 bg-white relative">
          {editMode && (
            <button
              onClick={() => openEditModal('announcements')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Latest Announcements</h2>
              <a href="/news-events" className="text-green-600 hover:text-green-700 font-semibold flex items-center text-sm">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredAnnouncements.map((announcement, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500">{announcement.date}</span>
                    {announcement.urgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
                        Urgent
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {data.showTestimonials && filteredTestimonials.length > 0 && (
        <section className="py-16 bg-gray-50 relative">
          {editMode && (
            <button
              onClick={() => openEditModal('testimonials')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
              <p className="text-lg text-gray-600">
                Hear from our parents, students, and alumni about their experience.
              </p>
            </div>

            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(filteredTestimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-800 mb-4 leading-relaxed">
                  "{filteredTestimonials[activeTestimonial].content}"
                </blockquote>
                <div>
                  <h4 className="text-base font-semibold text-gray-800">
                    {filteredTestimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 text-sm">{filteredTestimonials[activeTestimonial].role}</p>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {data.showContact && data.contactInfo.show && (
        <section className="py-16 bg-green-800 text-white relative">
          {editMode && (
            <button
              onClick={() => openEditModal('contactInfo')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-3xl font-bold mb-6">Visit Our Campus</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Address</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo.address}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Phone</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Email</h3>
                      <p className="text-green-100 text-sm">{data.contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base font-semibold mb-1">Office Hours</h3>
                      <p className="text-green-100 text-sm whitespace-pre-line">
                        {data.contactInfo.hours}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-5 py-2 rounded-lg font-semibold transition-colors text-sm">
                    Schedule a Visit
                    <ExternalLink className="inline ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {filteredQuickActions.length > 0 && (
                <div className="relative">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {filteredQuickActions.map((action, index) => (
                        <a key={index} href={action.link} className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm">
                          <div className="flex items-center space-x-2">
                            <action.icon className="h-4 w-4 text-yellow-400" />
                            <span>{action.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  </div>
                  {editMode && (
                    <button
                      onClick={() => openEditModal('quickActions')}
                      className="absolute top-2 right-2 bg-white/50 text-green-800 p-1 rounded-full hover:bg-white/70"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;



















// "use client";
// import React, { useState, useEffect } from 'react';
// import { 
//   ChevronRight, 
//   Award, 
//   Users, 
//   BookOpen, 
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   Star,
//   ArrowRight,
//   Trophy,
//   GraduationCap,
//   Heart,
//   Target,
//   Clock,
//   FileText,
//   CreditCard,
//   User,
//   Lightbulb,
//   Globe,
//   ExternalLink
// } from 'lucide-react';

// const HomePage = ({ schoolData = {} }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);

//   // Default data structure
//   const defaultData = {
//     heroSlides: [
//       {
//         image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         title: "Excellence in Education Since 1927",
//         subtitle: "Nurturing young minds with Edmund Rice values",
//         cta: "Explore Our Legacy",
//         ctaLink: "/about"
//       },
//       {
//         image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//         title: "Admissions Open for 2025-26",
//         subtitle: "Join our community of learners and leaders",
//         cta: "Apply Now",
//         ctaLink: "/admissions"
//       },
//       {
//         image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
//         title: "Holistic Development",
//         subtitle: "Academic excellence with character building",
//         cta: "Our Programs",
//         ctaLink: "/academics"
//       }
//     ],
//     quickStats: [
//       { number: "97+", label: "Years of Excellence", icon: Trophy, show: true },
//       { number: "2000+", label: "Students", icon: Users, show: true },
//       { number: "150+", label: "Faculty Members", icon: GraduationCap, show: true },
//       { number: "50+", label: "Co-curricular Activities", icon: Award, show: true }
//     ],
//     features: [
//       {
//         icon: Heart,
//         title: "Edmund Rice Values",
//         description: "Character formation based on Christian values of compassion, justice, and respect.",
//         show: true
//       },
//       {
//         icon: BookOpen,
//         title: "Academic Excellence",
//         description: "Comprehensive curriculum designed to nurture intellectual growth and critical thinking.",
//         show: true
//       },
//       {
//         icon: Users,
//         title: "Holistic Development",
//         description: "Focus on emotional, social, physical, and spiritual development of every child.",
//         show: true
//       },
//       {
//         icon: Target,
//         title: "Individual Attention",
//         description: "Small class sizes ensuring personalized learning and mentorship for each student.",
//         show: true
//       },
//       {
//         icon: Globe,
//         title: "Global Perspective",
//         description: "International exposure and multicultural learning environment preparing students for the world.",
//         show: true
//       },
//       {
//         icon: Lightbulb,
//         title: "Innovation & Technology",
//         description: "Modern facilities and technology-integrated learning for 21st-century skills.",
//         show: true
//       }
//     ],
//     principalMessage: {
//       show: true,
//       name: "Dr. Mary Johnson",
//       role: "Principal",
//       message: "At St. Columba's, we believe that education is not just about academic achievement, but about nurturing the whole person. Our commitment to Edmund Rice values ensures that each student develops not only intellectually but also morally and spiritually.",
//       stats: [
//         { value: "100%", label: "Board Pass Rate", show: true },
//         { value: "95%", label: "College Admissions", show: true },
//         { value: "50+", label: "Awards Won", show: true },
//         { value: "25+", label: "Sports Titles", show: true }
//       ]
//     },
//     announcements: [
//       {
//         date: "Dec 15, 2024",
//         title: "Winter Break Schedule",
//         content: "School will be closed from December 25, 2024 to January 6, 2025. Classes resume on January 7, 2025.",
//         urgent: false,
//         show: true
//       },
//       {
//         date: "Dec 10, 2024",
//         title: "Annual Sports Day 2024",
//         content: "Join us for our Annual Sports Day on December 20, 2024. Parents are cordially invited.",
//         urgent: true,
//         show: true
//       },
//       {
//         date: "Dec 5, 2024",
//         title: "Parent-Teacher Conference",
//         content: "Scheduled meetings with parents for academic progress discussion from December 18-19, 2024.",
//         urgent: false,
//         show: true
//       }
//     ],
//     testimonials: [
//       {
//         name: "Dr. Rajesh Kumar",
//         role: "Parent, Class XII",
//         content: "St. Columba's has provided my son with not just excellent education, but also strong moral values. The teachers are dedicated and caring.",
//         rating: 5,
//         show: true
//       },
//       {
//         name: "Arjun Mehta",
//         role: "Alumni, Batch 2020",
//         content: "The foundation I received at St. Columba's prepared me well for engineering college and life. Forever grateful to this institution.",
//         rating: 5,
//         show: true
//       },
//       {
//         name: "Mrs. Priya Sharma",
//         role: "Parent, Class VIII",
//         content: "The holistic approach to education here is remarkable. My daughter has grown tremendously in confidence and character.",
//         rating: 5,
//         show: true
//       }
//     ],
//     contactInfo: {
//       show: true,
//       address: "1, Ashok Place, New Delhi - 110001, India",
//       phone: "011 2336 3462\n011 2336 3134",
//       email: "stcolumbas@stcolumbas.edu.in",
//       hours: "Monday - Friday: 8:00 AM - 4:00 PM\nSaturday: 8:00 AM - 12:00 PM"
//     },
//     quickActions: [
//       { label: "Apply for Admission", icon: FileText, link: "/admissions", show: true },
//       { label: "Virtual Campus Tour", icon: Globe, link: "/virtual-tour", show: true },
//       { label: "Download Prospectus", icon: FileText, link: "/downloads", show: true },
//       { label: "Contact Admissions", icon: Phone, link: "/contact", show: true }
//     ],
//     quickAccess: [
//       { label: "Admissions Open", sublabel: "Apply for 2025-26", icon: FileText, link: "/admissions", show: true },
//       { label: "e-Care Portal", sublabel: "Student & Parent Login", icon: User, link: "/ecare", show: true },
//       { label: "Pay Fees", sublabel: "Secure Online Payment", icon: CreditCard, link: "/pay-fees", show: true }
//     ],
//     showHero: true,
//     showStats: true,
//     showFeatures: true,
//     showPrincipal: true,
//     showAnnouncements: true,
//     showTestimonials: true,
//     showContact: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...schoolData };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % data.heroSlides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [data.heroSlides.length]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % data.testimonials.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [data.testimonials.length]);

//   // Filter functions
//   const filteredHeroSlides = data.heroSlides.filter(slide => slide.show !== false);
//   const filteredQuickStats = data.quickStats.filter(stat => stat.show !== false);
//   const filteredFeatures = data.features.filter(feature => feature.show !== false);
//   const filteredAnnouncements = data.announcements.filter(announcement => announcement.show !== false);
//   const filteredTestimonials = data.testimonials.filter(testimonial => testimonial.show !== false);
//   const filteredQuickActions = data.quickActions.filter(action => action.show !== false);
//   const filteredQuickAccess = data.quickAccess.filter(access => access.show !== false);
//   const filteredPrincipalStats = data.principalMessage.stats.filter(stat => stat.show !== false);

//   return (
//     <div className="min-h-screen bg-white">
      
//       {/* Hero Section */}
//       {data.showHero && filteredHeroSlides.length > 0 && (
//         <section className="relative h-[450px] overflow-hidden">
//           {filteredHeroSlides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-all duration-1000 ${
//                 index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
//               }`}
//             >
//               <div className="absolute inset-0 bg-black/40 z-10"></div>
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 z-20 flex items-center justify-center">
//                 <div className="text-center text-white px-4 max-w-4xl">
//                   <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
//                     {slide.title}
//                   </h1>
//                   <p className="text-base md:text-xl mb-6 text-gray-200">
//                     {slide.subtitle}
//                   </p>
//                   <a 
//                     href={slide.ctaLink || "#"} 
//                     className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl inline-block"
//                   >
//                     {slide.cta}
//                     <ArrowRight className="inline ml-2 h-4 w-4" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Slide Indicators */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
//             {filteredHeroSlides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                   index === currentSlide ? 'bg-white' : 'bg-white/50'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Quick Access Bar */}
//           {filteredQuickAccess.length > 0 && (
//             <div className="absolute bottom-0 left-0 right-0 z-30 bg-green-800/90 backdrop-blur-sm">
//               <div className="max-w-7xl mx-auto px-4 py-3">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-white">
//                   {filteredQuickAccess.map((access, index) => (
//                     <a key={index} href={access.link} className="flex items-center space-x-2 hover:bg-green-700/50 p-2 rounded-lg transition-colors text-sm">
//                       <access.icon className="h-4 w-4 text-yellow-400" />
//                       <div>
//                         <h3 className="font-semibold">{access.label}</h3>
//                         <p className="text-xs text-green-100">{access.sublabel}</p>
//                       </div>
//                       <ChevronRight className="h-4 w-4 ml-auto" />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </section>
//       )}

//       {/* Quick Stats */}
//       {data.showStats && filteredQuickStats.length > 0 && (
//         <section className="py-12 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className={`grid grid-cols-2 ${filteredQuickStats.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-6`}>
//               {filteredQuickStats.map((stat, index) => (
//                 <div key={index} className="text-center group">
//                   <div className="bg-white rounded-full w-14 h-14 mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
//                     <stat.icon className="h-6 w-6 text-green-600" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</h3>
//                   <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Features Section */}
//       {data.showFeatures && filteredFeatures.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our School?</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 Committed to nurturing young minds with values, knowledge, and character.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredFeatures.map((feature, index) => (
//                 <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg group">
//                   <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
//                     <feature.icon className="h-5 w-5 text-green-600" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
//                   <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Principal's Message */}
//       {data.showPrincipal && data.principalMessage.show && (
//         <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//               <div>
//                 <h2 className="text-3xl font-bold mb-4">Principal's Message</h2>
//                 <blockquote className="text-base leading-relaxed mb-4">
//                   "{data.principalMessage.message}"
//                 </blockquote>
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
//                     <User className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold">{data.principalMessage.name}</h4>
//                     <p className="text-green-100 text-sm">{data.principalMessage.role}</p>
//                   </div>
//                 </div>
//               </div>
              
//               {filteredPrincipalStats.length > 0 && (
//                 <div className="relative">
//                   <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
//                     <div className={`grid ${filteredPrincipalStats.length > 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4 text-center`}>
//                       {filteredPrincipalStats.map((stat, index) => (
//                         <div key={index}>
//                           <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.value}</div>
//                           <div className="text-xs text-green-100">{stat.label}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Announcements */}
//       {data.showAnnouncements && filteredAnnouncements.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-bold text-gray-800">Latest Announcements</h2>
//               <a href="/news-events" className="text-green-600 hover:text-green-700 font-semibold flex items-center text-sm">
//                 View All
//                 <ChevronRight className="ml-1 h-4 w-4" />
//               </a>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {filteredAnnouncements.map((announcement, index) => (
//                 <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow">
//                   <div className="flex items-center justify-between mb-3">
//                     <span className="text-xs text-gray-500">{announcement.date}</span>
//                     {announcement.urgent && (
//                       <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
//                         Urgent
//                       </span>
//                     )}
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">{announcement.title}</h3>
//                   <p className="text-gray-600 leading-relaxed text-sm">{announcement.content}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Testimonials */}
//       {data.showTestimonials && filteredTestimonials.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
//               <p className="text-lg text-gray-600">
//                 Hear from our parents, students, and alumni about their experience.
//               </p>
//             </div>

//             <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
//               <div className="text-center">
//                 <div className="flex justify-center mb-3">
//                   {[...Array(filteredTestimonials[activeTestimonial].rating)].map((_, i) => (
//                     <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <blockquote className="text-lg text-gray-800 mb-4 leading-relaxed">
//                   "{filteredTestimonials[activeTestimonial].content}"
//                 </blockquote>
//                 <div>
//                   <h4 className="text-base font-semibold text-gray-800">
//                     {filteredTestimonials[activeTestimonial].name}
//                   </h4>
//                   <p className="text-gray-600 text-sm">{filteredTestimonials[activeTestimonial].role}</p>
//                 </div>
//               </div>

//               <div className="flex justify-center mt-6 space-x-2">
//                 {filteredTestimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveTestimonial(index)}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === activeTestimonial ? 'bg-green-600' : 'bg-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Contact Section */}
//       {data.showContact && data.contactInfo.show && (
//         <section className="py-16 bg-green-800 text-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6">Visit Our Campus</h2>
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Address</h3>
//                       <p className="text-green-100 text-sm whitespace-pre-line">
//                         {data.contactInfo.address}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Phone</h3>
//                       <p className="text-green-100 text-sm whitespace-pre-line">
//                         {data.contactInfo.phone}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Email</h3>
//                       <p className="text-green-100 text-sm">{data.contactInfo.email}</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start space-x-3">
//                     <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
//                     <div>
//                       <h3 className="text-base font-semibold mb-1">Office Hours</h3>
//                       <p className="text-green-100 text-sm whitespace-pre-line">
//                         {data.contactInfo.hours}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6">
//                   <button className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-5 py-2 rounded-lg font-semibold transition-colors text-sm">
//                     Schedule a Visit
//                     <ExternalLink className="inline ml-2 h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
              
//               {filteredQuickActions.length > 0 && (
//                 <div>
//                   <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
//                     <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
//                     <div className="grid grid-cols-1 gap-3">
//                       {filteredQuickActions.map((action, index) => (
//                         <a key={index} href={action.link} className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-colors text-sm">
//                           <div className="flex items-center space-x-2">
//                             <action.icon className="h-4 w-4 text-yellow-400" />
//                             <span>{action.label}</span>
//                           </div>
//                           <ChevronRight className="h-4 w-4" />
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default HomePage;