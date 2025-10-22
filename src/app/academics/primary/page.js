"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Heart, 
  Palette,
  Music,
  Calculator,
  Globe,
  Languages,
  Code,
  Shield,
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Star,
  Award,
  GraduationCap,
  Lightbulb,
  Brain,
  TreePine,
  Book,
  Microscope,
  MapPin,
  Phone,
  Mail,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';

const PrimarySchoolPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const role = 'admin'; // Should come from auth context

  // Default data structure with dynamic controls
  const defaultData = {
    hero: {
      show: true,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Primary School",
      subtitle: "Nurturing young minds with love, care, and quality education for Classes I-V",
      cta: { text: "Download Primary School Brochure", show: true, href: "/download-brochure" },
      height: "h-96"
    },
    tabs: [
      { id: 'overview', name: 'Overview', icon: "BookOpen", show: true },
      { id: 'curriculum', name: 'Curriculum', icon: "Target", show: true },
      { id: 'activities', name: 'Activities', icon: "Palette", show: true },
      { id: 'facilities', name: 'Facilities', icon: "Heart", show: true }
    ],
    overview: {
      show: true,
      title: "Welcome to Primary School",
      description: "Our Primary School program (Classes I-V) provides a nurturing and stimulating environment where young learners develop foundational skills, curiosity, and a love for learning. We focus on holistic development through a balanced curriculum that addresses academic, social, emotional, and physical growth.",
      highlights: [
        { icon: "Users", text: "Student-Teacher Ratio: 25:1", show: true },
        { icon: "Clock", text: "8:00 AM - 2:30 PM Schedule", show: true },
        { icon: "Heart", text: "Personalized Attention", show: true },
        { icon: "Star", text: "Activity-Based Learning", show: true }
      ],
      teachingApproach: [
        {
          icon: "Lightbulb",
          title: "Play-Based Learning",
          description: "Learning through play, exploration, and hands-on activities that make education enjoyable and effective.",
          show: true
        },
        {
          icon: "Users",
          title: "Collaborative Activities",
          description: "Group projects and teamwork that develop social skills and cooperative learning habits.",
          show: true
        },
        {
          icon: "Brain",
          title: "Multiple Intelligences",
          description: "Teaching methods that cater to different learning styles and intelligences.",
          show: true
        },
        {
          icon: "Heart",
          title: "Emotional Development",
          description: "Focus on emotional intelligence, self-awareness, and interpersonal skills.",
          show: true
        }
      ]
    },
    gradeLevels: {
      show: true,
      title: "Grade Level Overview",
      description: "Our progressive curriculum builds skills and knowledge year by year",
      levels: [
        {
          grade: "Class I",
          focus: "Foundational Literacy & Numeracy",
          subjects: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art", "Physical Education"],
          description: "Building strong foundations in reading, writing, and basic arithmetic through play-based learning.",
          show: true
        },
        {
          grade: "Class II",
          focus: "Skill Development",
          subjects: ["English", "Hindi", "Mathematics", "Environmental Studies", "Art", "Music", "Physical Education"],
          description: "Developing core academic skills while encouraging creativity and social development.",
          show: true
        },
        {
          grade: "Class III",
          focus: "Conceptual Understanding",
          subjects: ["English", "Hindi", "Mathematics", "Environmental Science", "Social Studies", "Art", "Computer Basics"],
          description: "Strengthening conceptual understanding across subjects with hands-on learning experiences.",
          show: true
        },
        {
          grade: "Class IV",
          focus: "Application of Knowledge",
          subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Art", "Computer Science", "Value Education"],
          description: "Applying knowledge to real-world situations and developing critical thinking skills.",
          show: true
        },
        {
          grade: "Class V",
          focus: "Preparation for Middle School",
          subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Art", "Computer Science", "Value Education"],
          description: "Consolidating learning and preparing students for the transition to middle school.",
          show: true
        }
      ]
    },
    curriculum: {
      show: true,
      title: "Primary School Curriculum",
      description: "A balanced and comprehensive curriculum designed for young learners",
      coreSubjects: [
        { icon: "BookOpen", name: "English Language", description: "Reading, writing, speaking, and listening skills development", show: true },
        { icon: "Languages", name: "Hindi", description: "Language acquisition and communication skills", show: true },
        { icon: "Calculator", name: "Mathematics", description: "Number concepts, operations, and problem-solving", show: true },
        { icon: "Globe", name: "Environmental Studies", description: "Science and social studies integration", show: true }
      ],
      specialSubjects: [
        { icon: "Palette", name: "Art Education", description: "Creative expression through various media", show: true },
        { icon: "Music", name: "Music", description: "Introduction to rhythm, melody, and instruments", show: true },
        { icon: "Heart", name: "Physical Education", description: "Development of motor skills and healthy habits", show: true },
        { icon: "Code", name: "Computer Science", description: "Basic digital literacy and coding concepts", show: true }
      ],
      assessmentMethods: [
        {
          term: "Formative Assessment",
          description: "Ongoing evaluation through classwork, projects, quizzes, and observations",
          weightage: "40%",
          show: true
        },
        {
          term: "Summative Assessment",
          description: "Term-end examinations to evaluate comprehensive understanding",
          weightage: "60%",
          show: true
        }
      ],
      dailySchedule: {
        title: "Typical Daily Schedule",
        show: true,
        schedule: [
          { time: "8:00 AM", activity: "Assembly & Morning Prayer", show: true },
          { time: "8:15 AM", activity: "First Period", show: true },
          { time: "9:00 AM", activity: "Second Period", show: true },
          { time: "9:45 AM", activity: "Short Break", show: true },
          { time: "10:00 AM", activity: "Third Period", show: true },
          { time: "10:45 AM", activity: "Fourth Period", show: true },
          { time: "11:30 AM", activity: "Lunch Break", show: true },
          { time: "12:15 PM", activity: "Fifth Period", show: true },
          { time: "1:00 PM", activity: "Sixth Period", show: true },
          { time: "1:45 PM", activity: "Co-curricular Activities", show: true },
          { time: "2:30 PM", activity: "Dispersal", show: true }
        ]
      }
    },
    activities: {
      show: true,
      title: "Co-Curricular Activities",
      description: "Enriching experiences beyond the classroom for holistic development",
      specialPrograms: [
        {
          icon: "BookOpen",
          title: "Reading Program",
          description: "Develops reading habits through our leveled library system and reading challenges.",
          show: true
        },
        {
          icon: "Calculator",
          title: "Math Lab",
          description: "Hands-on mathematics learning with manipulatives and practical applications.",
          show: true
        },
        {
          icon: "Globe",
          title: "Global Awareness",
          description: "Introduction to different cultures, languages, and global perspectives.",
          show: true
        },
        {
          icon: "TreePine",
          title: "Eco Warriors",
          description: "Environmental education and sustainability practices for young learners.",
          show: true
        }
      ],
      annualEvents: [
        { name: "Annual Day", description: "Cultural performance showcasing talents", show: true },
        { name: "Sports Day", description: "Track and field events for all students", show: true },
        { name: "Science Exhibition", description: "Showcasing scientific projects and experiments", show: true },
        { name: "Reading Festival", description: "Celebration of books and reading", show: true },
        { name: "Art Exhibition", description: "Display of student artwork", show: true },
        { name: "Math Olympiad", description: "Inter-class mathematics competition", show: true }
      ],
      parentInvolvement: [
        {
          icon: "Users",
          title: "Parent-Teacher Meetings",
          description: "Regular meetings to discuss student progress and development",
          show: true
        },
        {
          icon: "Book",
          title: "Reading Partners",
          description: "Parent participation in reading activities and library programs",
          show: true
        },
        {
          icon: "Calendar",
          title: "Class Events",
          description: "Parents invited to special class presentations and celebrations",
          show: true
        },
        {
          icon: "Heart",
          title: "Volunteer Opportunities",
          description: "Parents can volunteer for field trips and special activities",
          show: true
        }
      ]
    },
    facilities: {
      show: true,
      title: "Primary School Facilities",
      description: "Purpose-built spaces designed for young learners",
      classroomFeatures: [
        "Age-appropriate furniture and learning materials",
        "Interactive whiteboards and digital learning tools",
        "Reading corners with classroom libraries",
        "Display areas for student work",
        "Ample natural light and ventilation",
        "Safety features designed for young children"
      ],
      specializedAreas: [
        "Primary Science Lab with child-safe equipment",
        "Computer Lab with educational software",
        "Art Room with various creative materials",
        "Music Room with instruments",
        "Indoor Play Area for rainy days",
        "Out Playground with age-appropriate equipment"
      ],
      safetyMeasures: [
        { title: "Secure Campus", description: "Controlled access and security personnel", show: true },
        { title: "Health Room", description: "Staffed with trained nurse for first aid", show: true },
        { title: "Hygiene Practices", description: "Regular cleaning and sanitization", show: true },
        { title: "Nutrition", description: "Healthy meal options in cafeteria", show: true }
      ],
      tourCta: {
        title: "Schedule a Campus Tour",
        description: "Experience our primary school facilities firsthand",
        cta: { text: "Book a Tour", show: true, href: "/book-tour" },
        show: true
      }
    },
    admissionsCta: {
      show: true,
      title: "Begin Your Child's Educational Journey",
      description: "Join our primary school community and give your child the foundation for a lifetime of learning and success.",
      primaryCta: { text: "Apply for Admission", show: true, href: "/apply-admission" },
      secondaryCta: { text: "Download Prospectus", show: true, href: "/download-prospectus" }
    },
    contactInfo: {
      show: true,
      title: "Have Questions About Our Primary Program?",
      address: "1, Ashok Place, New Delhi - 110001, India",
      phone: "011 2336 3462\n011 2336 3134",
      email: "primary@stcolumbas.edu.in",
      hours: "Monday - Friday: 9:00 AM - 3:00 PM\nSaturday: 9:00 AM - 12:00 PM"
    },
    layout: {
      showHero: true,
      showTabs: true,
      showOverview: true,
      showGradeLevels: true,
      showCurriculum: true,
      showActivities: true,
      showFacilities: true,
      showAdmissionsCta: true,
      showContactInfo: true
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    BookOpen,
    Users,
    Heart,
    Palette,
    Music,
    Calculator,
    Globe,
    Languages,
    Code,
    Shield,
    Target,
    Clock,
    Calendar,
    ChevronRight,
    Download,
    ExternalLink,
    ArrowRight,
    Star,
    Award,
    GraduationCap,
    Lightbulb,
    Brain,
    TreePine,
    Book,
    Microscope,
    MapPin,
    Phone,
    Mail,
    Settings
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    overview: 'showOverview',
    gradeLevels: 'showGradeLevels',
    curriculum: 'showCurriculum',
    activities: 'showActivities',
    facilities: 'showFacilities',
    admissionsCta: 'showAdmissionsCta',
    contactInfo: 'showContactInfo'
  };

  // Initialize data with default
  const [data, setData] = useState(defaultData);

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
      setPreviewMode(false);
    }
  }, [role]);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_primaryschool_data', {});
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
      }
    };
 
    fetchData();
  }, []);

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
    setPreviewMode(false);
    setEditFormOpen(true);
    const layoutKey = layoutMap[section];
    let sectionData = { 
      showSection: data.layout[layoutKey],
      ...data[section]
    };
    if (section === 'tabs') {
      sectionData = { ...data.tabs };
    }
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  // Handle change for CTA fields
  const handleCtaChange = (ctaField, field, value) => {
    setEditData(prev => ({
      ...prev,
      [ctaField]: { ...prev[ctaField], [field]: value }
    }));
  };

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string arrays (e.g., subjects in grade levels)
  const handleStringArrayChange = (nestedKey, levelIndex, subjectIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      const subjects = [...updated[nestedKey][levelIndex].subjects];
      subjects[subjectIndex] = value;
      updated[nestedKey][levelIndex].subjects = subjects;
      return updated;
    });
  };

  // Handle change for simple object arrays (e.g., highlights)
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string lists (e.g., classroomFeatures)
  const handleStringListChange = (arrayKey, index, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const list = [...updated[arrayKey]];
      list[index] = value;
      updated[arrayKey] = list;
      return updated;
    });
  };

  // Handle change for tabs array
  const handleTabsChange = (index, field, value) => {
    setEditData(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save changes
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

      console.log('Payload:', JSON.stringify(payload, null, 2));
      const save_data = await apiRequest('save_data/save_primaryschool', { payload });
      console.log(save_data);
      
      if (save_data.status === 200) {
        setData(updatedData);
      } else {
        console.error('Save failed:', save_data);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Cancel changes
  const cancelChanges = () => {
    if (originalData) {
      setEditData(originalData);
    }
    setEditFormOpen(false);
    setPreviewMode(false);
    setOriginalData(null);
  };

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  // Filter functions
  const filteredTabs = (data.tabs || []).filter(tab => tab.show !== false);
  const filteredOverviewHighlights = (data.overview?.highlights || []).filter(highlight => highlight.show !== false);
  const filteredTeachingApproach = (data.overview?.teachingApproach || []).filter(approach => approach.show !== false);
  const filteredGradeLevels = (data.gradeLevels?.levels || []).filter(level => level.show !== false);
  const filteredCoreSubjects = (data.curriculum?.coreSubjects || []).filter(subject => subject.show !== false);
  const filteredSpecialSubjects = (data.curriculum?.specialSubjects || []).filter(subject => subject.show !== false);
  const filteredAssessmentMethods = (data.curriculum?.assessmentMethods || []).filter(method => method.show !== false);
  const filteredSchedule = (data.curriculum?.dailySchedule?.schedule || []).filter(item => item.show !== false);
  const filteredSpecialPrograms = (data.activities?.specialPrograms || []).filter(program => program.show !== false);
  const filteredAnnualEvents = (data.activities?.annualEvents || []).filter(event => event.show !== false);
  const filteredParentInvolvement = (data.activities?.parentInvolvement || []).filter(item => item.show !== false);
  const filteredSafetyMeasures = (data.facilities?.safetyMeasures || []).filter(measure => measure.show !== false);

  // Safe access for rendering
  const safeData = (key) => data[key] || {};

  // Render icon component
  const renderIcon = (iconName, className = "h-6 w-6 text-green-600") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Modal Footer Component
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
          onClick={togglePreview}
          className="px-3 py-2 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>{previewMode ? 'Edit' : 'Preview'}</span>
        </button>
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
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button
                onClick={cancelChanges}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium mb-1">Hero Image</label>
                    <FileUpload
                      currentUrl={editData.image || ''}
                      onUploadSuccess={(url) => handleObjectChange('image', url)}
                      label="Upload Hero Image"
                    />
                  </div> */}
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
                    <label className="block text-sm font-medium">CTA Text</label>
                    <input
                      type="text"
                      value={editData.cta?.text || ''}
                      onChange={(e) => handleCtaChange('cta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA File</label>
                    <FileUpload
                      currentUrl={editData.cta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('cta', 'href', url)}
                      label="Upload CTA File"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.cta?.show !== false}
                        onChange={(e) => handleCtaChange('cta', 'show', e.target.checked)}
                      />
                      <span>Show CTA</span>
                    </label>
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
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Tabs</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tabs</h3>
                  {(editData || []).map((tab, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Tab {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">ID</label>
                          <input
                            type="text"
                            value={tab.id || ''}
                            onChange={(e) => handleTabsChange(index, 'id', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={tab.name || ''}
                            onChange={(e) => handleTabsChange(index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={tab.icon || ''}
                            onChange={(e) => handleTabsChange(index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. BookOpen"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={tab.show !== false}
                              onChange={(e) => handleTabsChange(index, 'show', e.target.checked)}
                            />
                            <span>Show Tab</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'overview' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Overview</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Highlights</h3>
                  {(editData.highlights || []).map((highlight, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Highlight {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={highlight.icon || ''}
                            onChange={(e) => handleSimpleArrayChange('highlights', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Users"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Text</label>
                          <input
                            type="text"
                            value={highlight.text || ''}
                            onChange={(e) => handleSimpleArrayChange('highlights', index, 'text', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={highlight.show !== false}
                              onChange={(e) => handleSimpleArrayChange('highlights', index, 'show', e.target.checked)}
                            />
                            <span>Show Highlight</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Teaching Approach</h3>
                  {(editData.teachingApproach || []).map((approach, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Approach {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={approach.icon || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Lightbulb"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={approach.title || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={approach.description || ''}
                            onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={approach.show !== false}
                              onChange={(e) => handleNestedArrayChange('teachingApproach', index, 'show', e.target.checked)}
                            />
                            <span>Show Approach</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'gradeLevels' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Grade Levels</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Levels</h3>
                  {(editData.levels || []).map((level, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Level {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Grade</label>
                          <input
                            type="text"
                            value={level.grade || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'grade', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Focus</label>
                          <input
                            type="text"
                            value={level.focus || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'focus', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={level.description || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Subjects</label>
                          {(level.subjects || []).map((subject, sIndex) => (
                            <input
                              key={sIndex}
                              type="text"
                              value={subject || ''}
                              onChange={(e) => handleStringArrayChange('levels', index, sIndex, e.target.value)}
                              className="w-full p-2 border rounded mb-1"
                            />
                          ))}
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={level.show !== false}
                              onChange={(e) => handleNestedArrayChange('levels', index, 'show', e.target.checked)}
                            />
                            <span>Show Level</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'curriculum' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Curriculum</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Core Subjects</h3>
                  {(editData.coreSubjects || []).map((subject, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Core Subject {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={subject.icon || ''}
                            onChange={(e) => handleNestedArrayChange('coreSubjects', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={subject.name || ''}
                            onChange={(e) => handleNestedArrayChange('coreSubjects', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={subject.description || ''}
                            onChange={(e) => handleNestedArrayChange('coreSubjects', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={subject.show !== false}
                              onChange={(e) => handleNestedArrayChange('coreSubjects', index, 'show', e.target.checked)}
                            />
                            <span>Show Subject</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Subjects</h3>
                  {(editData.specialSubjects || []).map((subject, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Special Subject {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={subject.icon || ''}
                            onChange={(e) => handleNestedArrayChange('specialSubjects', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={subject.name || ''}
                            onChange={(e) => handleNestedArrayChange('specialSubjects', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={subject.description || ''}
                            onChange={(e) => handleNestedArrayChange('specialSubjects', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={subject.show !== false}
                              onChange={(e) => handleNestedArrayChange('specialSubjects', index, 'show', e.target.checked)}
                            />
                            <span>Show Subject</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Assessment Methods</h3>
                  {(editData.assessmentMethods || []).map((method, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Method {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Term</label>
                          <input
                            type="text"
                            value={method.term || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'term', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={method.description || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Weightage</label>
                          <input
                            type="text"
                            value={method.weightage || ''}
                            onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'weightage', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={method.show !== false}
                              onChange={(e) => handleNestedArrayChange('assessmentMethods', index, 'show', e.target.checked)}
                            />
                            <span>Show Method</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Daily Schedule</h3>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.dailySchedule?.title || ''}
                      onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, title: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.dailySchedule?.show !== false}
                        onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, show: e.target.checked })}
                      />
                      <span>Show Daily Schedule</span>
                    </label>
                  </div>
                  {(editData.dailySchedule?.schedule || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Schedule Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Time</label>
                          <input
                            type="text"
                            value={item.time || ''}
                            onChange={(e) => {
                              const updatedSchedule = { ...editData.dailySchedule };
                              updatedSchedule.schedule[index].time = e.target.value;
                              handleObjectChange('dailySchedule', updatedSchedule);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Activity</label>
                          <input
                            type="text"
                            value={item.activity || ''}
                            onChange={(e) => {
                              const updatedSchedule = { ...editData.dailySchedule };
                              updatedSchedule.schedule[index].activity = e.target.value;
                              handleObjectChange('dailySchedule', updatedSchedule);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => {
                                const updatedSchedule = { ...editData.dailySchedule };
                                updatedSchedule.schedule[index].show = e.target.checked;
                                handleObjectChange('dailySchedule', updatedSchedule);
                              }}
                            />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'activities' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Activities</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Programs</h3>
                  {(editData.specialPrograms || []).map((program, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={program.icon || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={program.title || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={program.description || ''}
                            onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={program.show !== false}
                              onChange={(e) => handleNestedArrayChange('specialPrograms', index, 'show', e.target.checked)}
                            />
                            <span>Show Program</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Annual Events</h3>
                  {(editData.annualEvents || []).map((event, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={event.name || ''}
                            onChange={(e) => handleNestedArrayChange('annualEvents', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={event.description || ''}
                            onChange={(e) => handleNestedArrayChange('annualEvents', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={event.show !== false}
                              onChange={(e) => handleNestedArrayChange('annualEvents', index, 'show', e.target.checked)}
                            />
                            <span>Show Event</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Parent Involvement</h3>
                  {(editData.parentInvolvement || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleNestedArrayChange('parentInvolvement', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleNestedArrayChange('parentInvolvement', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={item.description || ''}
                            onChange={(e) => handleNestedArrayChange('parentInvolvement', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => handleNestedArrayChange('parentInvolvement', index, 'show', e.target.checked)}
                            />
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
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Facilities</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Classroom Features</h3>
                  {(editData.classroomFeatures || []).map((feature, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={feature || ''}
                        onChange={(e) => handleStringListChange('classroomFeatures', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Specialized Areas</h3>
                  {(editData.specializedAreas || []).map((area, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={area || ''}
                        onChange={(e) => handleStringListChange('specializedAreas', index, e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Safety Measures</h3>
                  {(editData.safetyMeasures || []).map((measure, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Measure {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={measure.title || ''}
                            onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={measure.description || ''}
                            onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={measure.show !== false}
                              onChange={(e) => handleNestedArrayChange('safetyMeasures', index, 'show', e.target.checked)}
                            />
                            <span>Show Measure</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tour CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.tourCta?.title || ''}
                      onChange={(e) => handleCtaChange('tourCta', 'title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.tourCta?.description || ''}
                      onChange={(e) => handleCtaChange('tourCta', 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">CTA Text</label>
                    <input
                      type="text"
                      value={editData.tourCta?.cta?.text || ''}
                      onChange={(e) => {
                        const updated = { ...editData.tourCta };
                        updated.cta = { ...updated.cta, text: e.target.value };
                        handleObjectChange('tourCta', updated);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CTA File</label>
                    <FileUpload
                      currentUrl={editData.tourCta?.cta?.href || ''}
                      onUploadSuccess={(url) => {
                        const updated = { ...editData.tourCta };
                        updated.cta = { ...updated.cta, href: url };
                        handleObjectChange('tourCta', updated);
                      }}
                      label="Upload Tour CTA File"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.tourCta?.cta?.show !== false}
                        onChange={(e) => {
                          const updated = { ...editData.tourCta };
                          updated.cta = { ...updated.cta, show: e.target.checked };
                          handleObjectChange('tourCta', updated);
                        }}
                      />
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.tourCta?.show !== false}
                        onChange={(e) => handleCtaChange('tourCta', 'show', e.target.checked)}
                      />
                      <span>Show Tour CTA</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'admissionsCta' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Admissions CTA</span>
                    </label>
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
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Primary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input
                      type="text"
                      value={editData.primaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('primaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Link</label>
                    <input
                      type="text"
                      value={editData.primaryCta?.href || ''}
                      onChange={(e) => handleCtaChange('primaryCta', 'href', e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="/apply-admission"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.primaryCta?.show !== false}
                        onChange={(e) => handleCtaChange('primaryCta', 'show', e.target.checked)}
                      />
                      <span>Show Primary CTA</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Secondary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input
                      type="text"
                      value={editData.secondaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('secondaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">File</label>
                    <FileUpload
                      currentUrl={editData.secondaryCta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('secondaryCta', 'href', url)}
                      label="Upload Secondary CTA File"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.secondaryCta?.show !== false}
                        onChange={(e) => handleCtaChange('secondaryCta', 'show', e.target.checked)}
                      />
                      <span>Show Secondary CTA</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'contactInfo' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Contact Info</span>
                    </label>
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
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                      value={editData.address || ''}
                      onChange={(e) => handleObjectChange('address', e.target.value)}
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
                    <label className="block text-sm font-medium">Hours</label>
                    <textarea
                      value={editData.hours || ''}
                      onChange={(e) => handleObjectChange('hours', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section
          id="hero"
          className={`relative ${safeData('hero').height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${safeData('hero').image})` }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
              {safeData('hero').cta?.show && (
                <a
                  href={safeData('hero').cta.href}
                  className="mt-8 inline-flex items-center bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {safeData('hero').cta.text}
                  <Download className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('hero')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Tab Navigation */}
      {data.layout?.showTabs && filteredTabs.length > 0 && (
        <section
          id="tabs"
          className="py-8 bg-white border-b border-gray-200 relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {filteredTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  {renderIcon(tab.icon, "w-4 h-4 mr-2")}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('tabs')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Overview Content */}
      {activeTab === 'overview' && data.layout?.showOverview && safeData('overview').show && (
        <div>
          {/* Introduction */}
          <section
            id="overview-intro"
            className="py-16 bg-white relative animate-on-scroll"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{safeData('overview').title}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {safeData('overview').description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredOverviewHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-center">
                        {renderIcon(highlight.icon, "h-5 w-5 text-green-600 mr-2")}
                        <span className="text-sm">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Approach</h3>
                  <div className="space-y-4">
                    {filteredTeachingApproach.map((approach, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                          {renderIcon(approach.icon, "h-4 w-4 text-green-600")}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{approach.title}</h4>
                          <p className="text-gray-600 text-sm">{approach.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('overview')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </section>

          {/* Grade Levels */}
          {data.layout?.showGradeLevels && safeData('gradeLevels').show && filteredGradeLevels.length > 0 && (
            <section
              id="gradeLevels"
              className="py-16 bg-gray-50 relative animate-on-scroll"
            >
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('gradeLevels').title}</h2>
                  <p className="text-lg text-gray-600">
                    {safeData('gradeLevels').description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {filteredGradeLevels.map((level, index) => (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow text-center">
                      <div className="bg-green-100 text-green-800 font-semibold text-sm px-3 py-1 rounded-full inline-block mb-4">
                        {level.grade}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{level.focus}</h3>
                      <p className="text-gray-600 text-sm mb-4">{level.description}</p>
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="text-xs font-semibold text-green-800 mb-2">SUBJECTS</h4>
                        <div className="flex flex-wrap justify-center gap-1">
                          {level.subjects.map((subject, sIndex) => (
                            <span key={sIndex} className="bg-white text-green-700 text-xs px-2 py-1 rounded">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {editMode && (
                <button
                  onClick={() => openEditModal('gradeLevels')}
                  className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* Curriculum Content */}
      {activeTab === 'curriculum' && data.layout?.showCurriculum && safeData('curriculum').show && (
        <section
          id="curriculum"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('curriculum').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('curriculum').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Subjects</h3>
                <div className="space-y-4">
                  {filteredCoreSubjects.map((subject, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {renderIcon(subject.icon, "h-5 w-5 text-green-600 mr-3 mt-1")}
                      <div>
                        <h4 className="font-medium text-gray-800">{subject.name}</h4>
                        <p className="text-gray-600 text-sm">{subject.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Subjects</h3>
                <div className="space-y-4">
                  {filteredSpecialSubjects.map((subject, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {renderIcon(subject.icon, "h-5 w-5 text-green-600 mr-3 mt-1")}
                      <div>
                        <h4 className="font-medium text-gray-800">{subject.name}</h4>
                        <p className="text-gray-600 text-sm">{subject.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Assessment */}
            {filteredAssessmentMethods.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Assessment Approach</h3>
                <p className="text-gray-600 mb-6">
                  We use a balanced approach to assessment that focuses on holistic development rather than just academic scores.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAssessmentMethods.map((method, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{method.term}</h4>
                      <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full inline-block">
                        Weightage: {method.weightage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Schedule */}
            {safeData('curriculum').dailySchedule?.show && filteredSchedule.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{safeData('curriculum').dailySchedule.title}</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {filteredSchedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium text-gray-800">{item.time}</span>
                        <span className="text-gray-600">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('curriculum')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Activities Content */}
      {activeTab === 'activities' && data.layout?.showActivities && safeData('activities').show && (
        <section
          id="activities"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('activities').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('activities').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Special Programs</h3>
                <div className="space-y-4">
                  {filteredSpecialPrograms.map((program, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                        {renderIcon(program.icon)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{program.title}</h4>
                        <p className="text-gray-600 text-sm">{program.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Annual Events</h3>
                <div className="space-y-4">
                  {filteredAnnualEvents.map((event, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800">{event.name}</h4>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent Involvement */}
            {filteredParentInvolvement.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Parent Involvement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredParentInvolvement.map((item, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-5 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        {renderIcon(item.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('activities')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Facilities Content */}
      {activeTab === 'facilities' && data.layout?.showFacilities && safeData('facilities').show && (
        <section
          id="facilities"
          className="py-16 bg-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('facilities').title}</h2>
              <p className="text-lg text-gray-600">
                {safeData('facilities').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Classroom Features</h3>
                <ul className="space-y-3">
                  {(safeData('facilities').classroomFeatures || []).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specialized Areas</h3>
                <ul className="space-y-3">
                  {(safeData('facilities').specializedAreas || []).map((area, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                      <span className="text-gray-600">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety Measures */}
            {filteredSafetyMeasures.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 mb-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Safety & Wellness</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSafetyMeasures.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {safeData('facilities').tourCta?.show && safeData('facilities').tourCta?.cta?.show && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{safeData('facilities').tourCta.title}</h3>
                <p className="text-gray-600 mb-6">{safeData('facilities').tourCta.description}</p>
                <a
                  href={safeData('facilities').tourCta.cta.href}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {safeData('facilities').tourCta.cta.text}
                  <Calendar className="ml-2 h-4 w-4" />
                </a>
              </div>
            )}
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('facilities')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Admissions CTA */}
      {data.layout?.showAdmissionsCta && safeData('admissionsCta').show && (
        <section
          id="admissionsCta"
          className="py-16 bg-green-800 text-white relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{safeData('admissionsCta').title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              {safeData('admissionsCta').description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              {safeData('admissionsCta').primaryCta?.show && (
                <a
                  href={safeData('admissionsCta').primaryCta.href}
                  className="w-full sm:w-auto min-w-[180px] text-center bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden"
                  style={{
                    textOverflow: 'ellipsis'
                  }}
                >
                  <span className="truncate block">{safeData('admissionsCta').primaryCta.text}</span>
                </a>
              )}

              {safeData('admissionsCta').secondaryCta?.show && (
                <a
                  href={safeData('admissionsCta').secondaryCta.href}
                  className="w-full sm:w-auto min-w-[180px] text-center bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden inline-flex items-center justify-center"
                >
                  <span className="truncate">{safeData('admissionsCta').secondaryCta.text}</span>
                  <Download className="ml-2 h-4 w-4 flex-shrink-0" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('admissionsCta')}
              className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Information */}
      {data.layout?.showContactInfo && safeData('contactInfo').show && (
        <section
          id="contactInfo"
          className="py-16 bg-gray-50 relative animate-on-scroll"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('contactInfo').title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').address}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').phone}</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email & Hours</h3>
                <p className="text-gray-600 whitespace-pre-line">{safeData('contactInfo').email}</p>
                <p className="text-gray-600 whitespace-pre-line mt-2">{safeData('contactInfo').hours}</p>
              </div>
            </div>
          </div>
          {editMode && (
            <button
              onClick={() => openEditModal('contactInfo')}
              className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
            >
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default PrimarySchoolPage;