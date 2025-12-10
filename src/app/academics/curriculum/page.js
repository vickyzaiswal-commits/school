"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Target,
  Clock,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  Heart,
  Brain,
  Lightbulb,
  Shield,
  BarChart3,
  Languages,
  FileText,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

const CurriculumPage = () => {
  const [activeLevel, setActiveLevel] = useState('primary');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const role = 'admin'; // Should come from auth context

  // Default data structure with dynamic controls
  const defaultData = {
    hero: {
      show: true,
      title: "Academic Curriculum",
      subtitle: "A comprehensive educational framework designed to nurture intellectual growth and character development",
      cta: { text: "Download Curriculum Overview", show: true, href: "/download-curriculum" },
      height: "h-96"
    },
    philosophy: {
      show: true,
      title: "Our Educational Philosophy",
      description: "At St. Columba's, we follow a holistic approach to education that balances academic excellence with character formation, inspired by the Edmund Rice educational tradition.",
      pillars: [
        {
          icon: "Brain",
          title: "Cognitive Development",
          description: "Developing critical thinking, problem-solving, and analytical skills through challenging academic content.",
          show: true
        },
        {
          icon: "Heart",
          title: "Character Building",
          description: "Fostering values, ethics, and social responsibility through our Edmund Rice education philosophy.",
          show: true
        },
        {
          icon: "Lightbulb",
          title: "Creative Expression",
          description: "Encouraging innovation, creativity, and artistic expression across all disciplines.",
          show: true
        },
        {
          icon: "Users",
          title: "Collaborative Learning",
          description: "Promoting teamwork, communication, and interpersonal skills through group activities.",
          show: true
        }
      ]
    },
    academicLevels: {
      show: true,
      title: "Academic Programs",
      description: "Explore our comprehensive curriculum across different educational stages",
      levels: [
        { id: 'primary', name: 'Primary School', icon: "Book", grades: 'Classes I-V', show: true },
        { id: 'middle', name: 'Middle School', icon: "Calculator", grades: 'Classes VI-VIII', show: true },
        { id: 'secondary', name: 'Secondary School', icon: "GraduationCap", grades: 'Classes IX-X', show: true },
        { id: 'senior', name: 'Senior Secondary', icon: "Target", grades: 'Classes XI-XII', show: true }
      ]
    },
    subjects: {
      primary: [
        { name: "English Language", icon: "BookOpen", show: true },
        { name: "Mathematics", icon: "Calculator", show: true },
        { name: "Environmental Studies", icon: "Globe", show: true },
        { name: "Hindi", icon: "Languages", show: true },
        { name: "Art Education", icon: "Palette", show: true },
        { name: "Physical Education", icon: "Heart", show: true },
        { name: "Value Education", icon: "Shield", show: true },
        { name: "Computer Basics", icon: "Code", show: true }
      ],
      middle: [
        { name: "English", icon: "BookOpen", show: true },
        { name: "Hindi", icon: "Languages", show: true },
        { name: "Mathematics", icon: "Calculator", show: true },
        { name: "Science", icon: "Microscope", show: true },
        { name: "Social Science", icon: "Globe", show: true },
        { name: "Computer Science", icon: "Code", show: true },
        { name: "Art Education", icon: "Palette", show: true },
        { name: "Physical Education", icon: "Heart", show: true },
        { name: "Value Education", icon: "Shield", show: true }
      ],
      secondary: [
        { name: "English Communicative", icon: "BookOpen", show: true },
        { name: "Hindi Course A/B", icon: "Languages", show: true },
        { name: "Mathematics Standard/Basic", icon: "Calculator", show: true },
        { name: "Science", icon: "Microscope", show: true },
        { name: "Social Science", icon: "Globe", show: true },
        { name: "Information Technology", icon: "Code", show: true },
        { name: "Art Education", icon: "Palette", show: true },
        { name: "Health & Physical Education", icon: "Heart", show: true }
      ],
      senior: [
        { 
          stream: "Science Stream",
          subjects: [
            { name: "Physics", icon: "Microscope", show: true },
            { name: "Chemistry", icon: "Microscope", show: true },
            { name: "Mathematics", icon: "Calculator", show: true },
            { name: "Biology/Computer Science", icon: "Code", show: true },
            { name: "English Core", icon: "BookOpen", show: true }
          ],
          show: true
        },
        { 
          stream: "Commerce Stream",
          subjects: [
            { name: "Accountancy", icon: "BarChart3", show: true },
            { name: "Business Studies", icon: "Target", show: true },
            { name: "Economics", icon: "Globe", show: true },
            { name: "Mathematics/Informatics Practices", icon: "Calculator", show: true },
            { name: "English Core", icon: "BookOpen", show: true }
          ],
          show: true
        },
        { 
          stream: "Humanities Stream",
          subjects: [
            { name: "History", icon: "Book", show: true },
            { name: "Political Science", icon: "Globe", show: true },
            { name: "Economics", icon: "BarChart3", show: true },
            { name: "Psychology/Mathematics", icon: "Brain", show: true },
            { name: "English Core", icon: "BookOpen", show: true }
          ],
          show: true
        }
      ]
    },
    assessment: {
      show: true,
      title: "Assessment Structure",
      description: "Comprehensive evaluation system designed to measure holistic development",
      cta: { text: "View Grading Policy", show: true, href: "/grading-policy" },
      levels: [
        {
          level: "Primary (I-V)",
          pattern: "Continuous and Comprehensive Evaluation (CCE)",
          components: ["Formative Assessments", "Project Work", "Class Participation", "Skill Development", "Summative Tests"],
          show: true
        },
        {
          level: "Middle (VI-VIII)",
          pattern: "Grading System with Periodic Tests",
          components: ["Periodic Tests", "Notebook Submission", "Subject Enrichment", "Multiple Assessment", "Half-Yearly & Annual Exams"],
          show: true
        },
        {
          level: "Secondary (IX-X)",
          pattern: "CBSE Board Pattern Preparation",
          components: ["Periodic Tests", "Pre-Board Exams", "Practical Assessments", "Project Work", "Board Exam Preparation"],
          show: true
        },
        {
          level: "Senior Secondary (XI-XII)",
          pattern: "CBSE Board Examination",
          components: ["Unit Tests", "Practical Exams", "Project Submission", "Pre-Board Exams", "Board Examinations"],
          show: true
        }
      ],
      grading: {
        show: true,
        title: "Grading System",
        description: "We follow the CBSE grading system that emphasizes continuous comprehensive evaluation rather than just examination results.",
        weightage: [
          { component: "Periodic Tests", percentage: "20%", show: true },
          { component: "Notebook Submission", percentage: "5%", show: true },
          { component: "Subject Enrichment", percentage: "5%", show: true },
          { component: "Term-End Exam", percentage: "70%", show: true }
        ]
      }
    },
    specialPrograms: {
      show: true,
      title: "Special Academic Programs",
      description: "Enhancing learning beyond the conventional curriculum",
      programs: [
        {
          icon: "Code",
          title: "STEM Education",
          description: "Integrated Science, Technology, Engineering and Mathematics program with hands-on learning and robotics.",
          show: true
        },
        {
          icon: "Globe",
          title: "Global Perspectives",
          description: "International exchange programs, model UN, and global citizenship education.",
          show: true
        },
        {
          icon: "Heart",
          title: "Social Outreach",
          description: "Community service programs and social awareness initiatives as part of value education.",
          show: true
        },
        {
          icon: "Lightbulb",
          title: "Innovation Lab",
          description: "Dedicated space for innovation, design thinking, and entrepreneurial projects.",
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Curriculum Resources",
      description: "Download detailed curriculum documents and academic planners",
      cta: { text: "View Complete Curriculum Repository", show: true, href: "/curriculum-repository" },
      items: [
        {
          title: "Primary School Curriculum Guide",
          description: "Detailed syllabus and learning objectives for Classes I-V",
          format: "PDF",
          size: "2.1 MB",
          icon: "FileText",
          show: true,
          cta: { text: "Download Resource", show: true, href: "/download-resource/primary" }
        },
        {
          title: "Middle School Academic Planner",
          description: "Yearly academic plan and assessment schedule for Classes VI-VIII",
          format: "PDF",
          size: "1.8 MB",
          icon: "FileText",
          show: true,
          cta: { text: "Download Resource", show: true, href: "/download-resource/middle" }
        },
        {
          title: "CBSE Secondary Curriculum",
          description: "Complete syllabus for Classes IX-X as prescribed by CBSE",
          format: "PDF",
          size: "3.2 MB",
          icon: "FileText",
          show: true,
          cta: { text: "Download Resource", show: true, href: "/download-resource/secondary" }
        },
        {
          title: "Senior Secondary Stream Options",
          description: "Detailed information about Science, Commerce and Humanities streams",
          format: "PDF",
          size: "2.5 MB",
          icon: "FileText",
          show: true,
          cta: { text: "Download Resource", show: true, href: "/download-resource/senior" }
        }
      ]
    },
    academicCalendar: {
      show: true,
      title: "Academic Calendar 2024-25",
      description: "Download our comprehensive academic calendar containing important dates, examination schedules, holidays, and school events for the current academic year.",
      primaryCta: { text: "Download Calendar", show: true, href: "/download-calendar" },
      secondaryCta: { text: "View Online Version", show: true, href: "/online-calendar" }
    },
    layout: {
      showHero: true,
      showPhilosophy: true,
      showAcademicLevels: true,
      showAssessment: true,
      showSpecialPrograms: true,
      showResources: true,
      showAcademicCalendar: true
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    BookOpen,
    GraduationCap,
    Users,
    Target,
    Clock,
    Download,
    ExternalLink,
    ArrowRight,
    Book,
    Calculator,
    Palette,
    Microscope,
    Globe,
    Code,
    Music,
    Heart,
    Brain,
    Lightbulb,
    Shield,
    BarChart3,
    Languages,
    FileText
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    philosophy: 'showPhilosophy',
    academicLevels: 'showAcademicLevels',
    assessment: 'showAssessment',
    specialPrograms: 'showSpecialPrograms',
    resources: 'showResources',
    academicCalendar: 'showAcademicCalendar'
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
        const res = await apiRequest('save_data/get_all_curriculum_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedRaw = res.data[0]?.Data || {};
          console.log('Fetched Raw Data:', fetchedRaw);

          let fetchedData = fetchedRaw;
          if (typeof fetchedRaw === 'string' || (fetchedRaw && typeof fetchedRaw === 'object' && fetchedRaw.encrypted)) {
            const decrypted = await decryptObject(fetchedRaw);
            if (decrypted) fetchedData = decrypted;
            else {
              try {
                fetchedData = JSON.parse(fetchedRaw);
              } catch (e) {
                console.warn('Failed to parse fetchedRaw as JSON and decryption failed');
                fetchedData = {};
              }
            }
          }

          console.log('Fetched Data (after decrypt/parse):', fetchedData);
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
    if (section === 'subjects') {
      sectionData = { ...data.subjects };
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

  // Handle change for string arrays (e.g., components in assessment levels)
  const handleStringArrayChange = (nestedKey, index, itemIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      if (!updated[nestedKey][index].components) updated[nestedKey][index].components = [];
      updated[nestedKey][index].components[itemIndex] = value;
      return updated;
    });
  };

  // Handle change for subjects
  const handleSubjectsChange = (level, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (level in updated) {
        updated[level][index] = { ...updated[level][index], [field]: value };
      }
      return updated;
    });
  };

  // Handle change for senior stream subjects
  const handleSeniorSubjectsChange = (streamIndex, subjectIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (prev.senior && prev.senior[streamIndex] && prev.senior[streamIndex].subjects) {
        updated.senior[streamIndex].subjects[subjectIndex] = { ...updated.senior[streamIndex].subjects[subjectIndex], [field]: value };
      }
      return updated;
    });
  };

  // Handle change for resource CTA
  const handleResourceCtaChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (prev.items && prev.items[index] && prev.items[index].cta) {
        updated.items[index].cta[field] = value;
      }
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

      console.log('Payload (pre-encrypt):', JSON.stringify(payload, null, 2));

      // encrypt payload before sending
      const encryptedPayload = await encryptObject(payload);
      const save_data = await apiRequest('save_data/save_curriculum', { payload: encryptedPayload });
      console.log('Save response:', save_data);

      if (save_data?.status === 200) {
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

  // Section visibility helpers (toggles for modal)
  const getDataValue = (key) => {
    if (!data) return false;
    if (key.includes('.')) {
      const parts = key.split('.');
      let cur = data;
      for (const p of parts) {
        if (cur === undefined || cur === null) return false;
        cur = cur[p];
      }
      return cur;
    }
    if (key.startsWith('show')) {
      return data.layout?.[key];
    }
    return data[key];
  };

  const toggleSectionVisibility = (key) => {
    if (!data) return;
    if (key.includes('.')) {
      const parts = key.split('.');
      setData(prev => {
        const next = { ...prev };
        let cur = next;
        for (let i = 0; i < parts.length - 1; i++) {
          const p = parts[i];
          cur[p] = { ...cur[p] };
          cur = cur[p];
        }
        const last = parts[parts.length - 1];
        cur[last] = !cur[last];
        return next;
      });
      return;
    }

    if (key.startsWith('show')) {
      setData(prev => ({ ...prev, layout: { ...prev.layout, [key]: !prev.layout?.[key] } }));
      return;
    }

    setData(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = { ...data, lastUpdated: new Date().toISOString(), updatedBy: 'admin' };
      // encrypt payload before sending
      const encrypted = await encryptObject(payload);
      const res = await apiRequest('save_data/save_curriculum', { payload: encrypted });
      if (res?.status !== 200) console.error('Save failed', res);
    } catch (error) {
      console.error('Error saving visibility', error);
    }
    setSectionVisibilityModal(false);
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
  const filteredPhilosophyPillars = (data.philosophy?.pillars || []).filter(pillar => pillar.show !== false);
  const filteredAcademicLevels = (data.academicLevels?.levels || []).filter(level => level.show !== false);
  const filteredAssessmentLevels = (data.assessment?.levels || []).filter(level => level.show !== false);
  const filteredGradingWeightage = (data.assessment?.grading?.weightage || []).filter(item => item.show !== false);
  const filteredSpecialPrograms = (data.specialPrograms?.programs || []).filter(program => program.show !== false);
  const filteredResources = (data.resources?.items || []).filter(item => item.show !== false);

  const getFilteredSubjects = () => {
    const subjects = data.subjects || {};
    if (activeLevel === 'primary') return (subjects.primary || []).filter(subject => subject.show !== false);
    if (activeLevel === 'middle') return (subjects.middle || []).filter(subject => subject.show !== false);
    if (activeLevel === 'secondary') return (subjects.secondary || []).filter(subject => subject.show !== false);
    if (activeLevel === 'senior') return (subjects.senior || []).filter(stream => stream.show !== false);
    return [];
  };

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
              {editSection === 'philosophy' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Philosophy</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Pillars</h3>
                  {(editData.pillars || []).map((pillar, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Pillar {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={pillar.icon || ''}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Brain"
                          />
                        </div>
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
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'academicLevels' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Academic Levels</span>
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
                          <label className="block text-sm font-medium">ID</label>
                          <input
                            type="text"
                            value={level.id || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'id', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input
                            type="text"
                            value={level.name || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={level.icon || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Book"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Grades</label>
                          <input
                            type="text"
                            value={level.grades || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'grades', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
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
              {editSection === 'subjects' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Subjects by Level</h3>
                  {['primary', 'middle', 'secondary', 'senior'].map((level) => (
                    <div key={level} className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
                      <h4 className="text-md font-semibold mb-4">{level.charAt(0).toUpperCase() + level.slice(1)} School</h4>
                      {(editData[level] || []).map((subject, index) => (
                        <div key={index} className="mb-4 p-3 border rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Subject {index + 1}</span>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={subject.show !== false}
                                onChange={(e) => handleSubjectsChange(level, index, 'show', e.target.checked)}
                              />
                              <span>Show</span>
                            </label>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-sm font-medium">Name</label>
                              <input
                                type="text"
                                value={subject.name || ''}
                                onChange={(e) => handleSubjectsChange(level, index, 'name', e.target.value)}
                                className="w-full p-2 border rounded"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Icon</label>
                              <input
                                type="text"
                                value={subject.icon || ''}
                                onChange={(e) => handleSubjectsChange(level, index, 'icon', e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="e.g. BookOpen"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {level === 'senior' && (editData.senior || []).map((stream, sIndex) => (
                        <div key={sIndex} className="ml-4 mb-4 p-3 border rounded bg-white">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Stream: {stream.stream}</span>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={stream.show !== false}
                                onChange={(e) => handleSubjectsChange('senior', sIndex, 'show', e.target.checked)}
                              />
                              <span>Show Stream</span>
                            </label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Stream Name</label>
                            <input
                              type="text"
                              value={stream.stream || ''}
                              onChange={(e) => handleSubjectsChange('senior', sIndex, 'stream', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          {(stream.subjects || []).map((subject, subIndex) => (
                            <div key={subIndex} className="ml-4 mt-3 p-2 border rounded bg-gray-50">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs">Subject {subIndex + 1}</span>
                                <label className="flex items-center space-x-1">
                                  <input
                                    type="checkbox"
                                    checked={subject.show !== false}
                                    onChange={(e) => handleSeniorSubjectsChange(sIndex, subIndex, 'show', e.target.checked)}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-xs">Show</span>
                                </label>
                              </div>
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  value={subject.name || ''}
                                  onChange={(e) => handleSeniorSubjectsChange(sIndex, subIndex, 'name', e.target.value)}
                                  className="w-full p-1 border rounded text-sm"
                                  placeholder="Subject name"
                                />
                                <input
                                  type="text"
                                  value={subject.icon || ''}
                                  onChange={(e) => handleSeniorSubjectsChange(sIndex, subIndex, 'icon', e.target.value)}
                                  className="w-full p-1 border rounded text-sm"
                                  placeholder="Icon e.g. Microscope"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'assessment' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Assessment</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Levels</h3>
                  {(editData.levels || []).map((level, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Level {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Level Name</label>
                          <input
                            type="text"
                            value={level.level || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'level', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Pattern</label>
                          <input
                            type="text"
                            value={level.pattern || ''}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'pattern', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
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
                        <h5 className="text-md font-semibold mt-3 mb-2">Components</h5>
                        {(level.components || []).map((component, cIndex) => (
                          <div key={cIndex} className="ml-4 p-2 border rounded">
                            <input
                              type="text"
                              value={component || ''}
                              onChange={(e) => handleStringArrayChange('levels', index, cIndex, e.target.value)}
                              className="w-full p-1 border rounded text-sm"
                              placeholder={`Component ${cIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {editData.grading && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mt-6">
                      <h4 className="text-lg font-semibold mb-2">Grading</h4>
                      <div className="space-y-2 ml-4">
                        <div>
                          <label className="block text-sm font-medium">Show Grading</label>
                          <input
                            type="checkbox"
                            checked={editData.grading.show !== false}
                            onChange={(e) => handleObjectChange('grading', { ...editData.grading, show: e.target.checked })}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={editData.grading.title || ''}
                            onChange={(e) => handleObjectChange('grading', { ...editData.grading, title: e.target.value })}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={editData.grading.description || ''}
                            onChange={(e) => handleObjectChange('grading', { ...editData.grading, description: e.target.value })}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <h5 className="text-md font-semibold mt-3 mb-2">Weightage</h5>
                        {(editData.grading.weightage || []).map((item, wIndex) => (
                          <div key={wIndex} className="ml-4 p-2 border rounded">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs">Weightage {wIndex + 1}</span>
                              <label className="flex items-center space-x-1">
                                <input
                                  type="checkbox"
                                  checked={item.show !== false}
                                  onChange={(e) => {
                                    const newWeightage = editData.grading.weightage.map((w, i) => 
                                      i === wIndex ? { ...w, show: e.target.checked } : w
                                    );
                                    handleObjectChange('grading', { ...editData.grading, weightage: newWeightage });
                                  }}
                                  className="w-4 h-4"
                                />
                                <span className="text-xs">Show</span>
                              </label>
                            </div>
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={item.component || ''}
                                onChange={(e) => {
                                  const newWeightage = editData.grading.weightage.map((w, i) => 
                                    i === wIndex ? { ...w, component: e.target.value } : w
                                  );
                                  handleObjectChange('grading', { ...editData.grading, weightage: newWeightage });
                                }}
                                className="w-full p-1 border rounded text-sm"
                                placeholder="Component name"
                              />
                              <input
                                type="text"
                                value={item.percentage || ''}
                                onChange={(e) => {
                                  const newWeightage = editData.grading.weightage.map((w, i) => 
                                    i === wIndex ? { ...w, percentage: e.target.value } : w
                                  );
                                  handleObjectChange('grading', { ...editData.grading, weightage: newWeightage });
                                }}
                                className="w-full p-1 border rounded text-sm"
                                placeholder="Percentage e.g. 20%"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {editSection === 'specialPrograms' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Special Programs</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Programs</h3>
                  {(editData.programs || []).map((program, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={program.icon || ''}
                            onChange={(e) => handleNestedArrayChange('programs', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. Code"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={program.title || ''}
                            onChange={(e) => handleNestedArrayChange('programs', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={program.description || ''}
                            onChange={(e) => handleNestedArrayChange('programs', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={program.show !== false}
                              onChange={(e) => handleNestedArrayChange('programs', index, 'show', e.target.checked)}
                            />
                            <span>Show Program</span>
                          </label>
                        </div>
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
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Resources</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {(editData.items || []).map((item, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Title</label>
                          <input
                            type="text"
                            value={item.title || ''}
                            onChange={(e) => handleNestedArrayChange('items', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea
                            value={item.description || ''}
                            onChange={(e) => handleNestedArrayChange('items', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Format</label>
                          <input
                            type="text"
                            value={item.format || ''}
                            onChange={(e) => handleNestedArrayChange('items', index, 'format', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Size</label>
                          <input
                            type="text"
                            value={item.size || ''}
                            onChange={(e) => handleNestedArrayChange('items', index, 'size', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input
                            type="text"
                            value={item.icon || ''}
                            onChange={(e) => handleNestedArrayChange('items', index, 'icon', e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="e.g. FileText"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">CTA Text</label>
                          <input
                            type="text"
                            value={item.cta?.text || ''}
                            onChange={(e) => handleResourceCtaChange(index, 'text', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CTA File</label>
                          <FileUpload
                            currentUrl={item.cta?.href || ''}
                            onUploadSuccess={(url) => handleResourceCtaChange(index, 'href', url)}
                            label="Upload Item File"
                          />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.cta?.show !== false}
                              onChange={(e) => handleResourceCtaChange(index, 'show', e.target.checked)}
                            />
                            <span>Show CTA</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={item.show !== false}
                              onChange={(e) => handleNestedArrayChange('items', index, 'show', e.target.checked)}
                            />
                            <span>Show Item</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'academicCalendar' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Academic Calendar</span>
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
                  <div>
                    <label className="block text-sm font-medium">Primary CTA Text</label>
                    <input
                      type="text"
                      value={editData.primaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('primaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary CTA File</label>
                    <FileUpload
                      currentUrl={editData.primaryCta?.href || ''}
                      onUploadSuccess={(url) => handleCtaChange('primaryCta', 'href', url)}
                      label="Upload Primary CTA File"
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
                  <div>
                    <label className="block text-sm font-medium">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={editData.secondaryCta?.text || ''}
                      onChange={(e) => handleCtaChange('secondaryCta', 'text', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Secondary CTA File</label>
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
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
              {safeData('hero').cta?.show && (
                <a
                  href={safeData('hero').cta.href}
                  className="mt-6 inline-flex items-center bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {safeData('hero').cta.text}
                  <Download className="ml-2 h-5 w-5" />
                </a>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('hero')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Philosophy Section */}
      {data.layout?.showPhilosophy && safeData('philosophy').show && filteredPhilosophyPillars.length > 0 && (
        <section
          id="philosophy"
          className={`py-16 bg-white animate-on-scroll ${isVisible.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('philosophy').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{safeData('philosophy').description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhilosophyPillars.map((pillar, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    {renderIcon(pillar.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('philosophy')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Academic Levels */}
      {data.layout?.showAcademicLevels && safeData('academicLevels').show && filteredAcademicLevels.length > 0 && (
        <section
          id="academicLevels"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.academicLevels ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('academicLevels').title}</h2>
              <p className="text-lg text-gray-600">{safeData('academicLevels').description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {filteredAcademicLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeLevel === level.id
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-green-50'
                  }`}
                >
                  {renderIcon(level.icon, "w-4 h-4 mr-2")}
                  {level.name}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {filteredAcademicLevels.find(l => l.id === activeLevel)?.name} Curriculum
              </h3>
              
              {activeLevel !== 'senior' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getFilteredSubjects().map((subject, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                      {renderIcon(subject.icon, "h-5 w-5 text-green-600 mr-3")}
                      <span className="text-sm font-medium">{subject.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getFilteredSubjects().map((stream, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">{stream.stream}</h4>
                      <div className="space-y-3">
                        {stream.subjects.filter(subject => subject.show !== false).map((subject, sIndex) => (
                          <div key={sIndex} className="flex items-center">
                            {renderIcon(subject.icon, "h-4 w-4 text-green-600 mr-2")}
                            <span className="text-sm">{subject.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Additional Components</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-green-700">
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" /> Value Education
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" /> Physical Education
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-3 w-3 mr-1" /> General Studies
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" /> Life Skills
                  </span>
                </div>
              </div>
              {editMode && (
                <button
                  onClick={() => openEditModal('subjects')}
                  className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('academicLevels')}
                className="absolute top-4 right-20 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Assessment Pattern */}
      {data.layout?.showAssessment && safeData('assessment').show && filteredAssessmentLevels.length > 0 && (
        <section
          id="assessment"
          className={`py-16 bg-white animate-on-scroll ${isVisible.assessment ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('assessment').title}</h2>
              <p className="text-lg text-gray-600">{safeData('assessment').description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAssessmentLevels.map((level, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-3">{level.level}</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full inline-block mb-3">
                    {level.pattern}
                  </div>
                  <ul className="space-y-2">
                    {level.components.map((component, cIndex) => (
                      <li key={cIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span>{component}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {safeData('assessment').grading?.show && (
              <div className="mt-12 bg-green-700 text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{safeData('assessment').grading.title}</h3>
                    <p className="mb-4">{safeData('assessment').grading.description}</p>
                    {safeData('assessment').cta?.show && (
                      <a
                        href={safeData('assessment').cta.href}
                        className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center"
                      >
                        {safeData('assessment').cta.text}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Assessment Weightage</h4>
                    <div className="space-y-2 text-sm">
                      {filteredGradingWeightage.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.component}</span>
                          <span className="font-semibold">{item.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('assessment')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Special Programs */}
      {data.layout?.showSpecialPrograms && safeData('specialPrograms').show && filteredSpecialPrograms.length > 0 && (
        <section
          id="specialPrograms"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.specialPrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('specialPrograms').title}</h2>
              <p className="text-lg text-gray-600">{safeData('specialPrograms').description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpecialPrograms.map((program, index) => (
                <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow group">
                  <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    {renderIcon(program.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-sm">{program.description}</p>
                </div>
              ))}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('specialPrograms')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Resources */}
      {data.layout?.showResources && safeData('resources').show && filteredResources.length > 0 && (
        <section
          id="resources"
          className={`py-16 bg-white animate-on-scroll ${isVisible.resources ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('resources').title}</h2>
              <p className="text-lg text-gray-600">{safeData('resources').description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                  <div className="flex items-start">
                    {renderIcon(resource.icon, "h-6 w-6 text-green-600 mr-4 mt-1")}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  {resource.cta?.show && (
                    <a
                      href={resource.cta.href}
                      className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                    >
                      {resource.cta.text}
                      <Download className="ml-2 h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {safeData('resources').cta?.show && (
              <div className="mt-12 text-center">
                <a
                  href={safeData('resources').cta.href}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {safeData('resources').cta.text}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('resources')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Academic Calendar CTA */}
      {data.layout?.showAcademicCalendar && safeData('academicCalendar').show && (
        <section
          id="academicCalendar"
          className={`py-16 bg-green-800 text-white animate-on-scroll ${isVisible.academicCalendar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{safeData('academicCalendar').title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{safeData('academicCalendar').description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {safeData('academicCalendar').primaryCta?.show && (
                <a
                  href={safeData('academicCalendar').primaryCta.href}
                  className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {safeData('academicCalendar').primaryCta.text}
                </a>
              )}
              {safeData('academicCalendar').secondaryCta?.show && (
                <a
                  href={safeData('academicCalendar').secondaryCta.href}
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {safeData('academicCalendar').secondaryCta.text}
                </a>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('academicCalendar')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}
      {editMode && (
        <>
          <button onClick={() => setSectionVisibilityModal(true)} className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
                <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                  <h2 className="text-xl font-semibold">Manage Section Visibility</h2>
                  <button onClick={() => setSectionVisibilityModal(false)} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
                  {[
                    ['hero.show', 'Hero Section'],
                    ['showPhilosophy', 'Philosophy Section'],
                    ['showAcademicLevels', 'Academic Levels'],
                    ['showAssessment', 'Assessment'],
                    ['showSpecialPrograms', 'Special Programs'],
                    ['showResources', 'Resources'],
                    ['showAcademicCalendar', 'Academic Calendar']
                  ].map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded">
                      <div className="text-sm font-medium text-gray-700">{label}</div>
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!getDataValue(key)}
                          onChange={() => toggleSectionVisibility(key)}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-green-300 peer-checked:bg-green-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
                  <button onClick={() => setSectionVisibilityModal(false)} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
                  <button onClick={saveSectionVisibility} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurriculumPage;