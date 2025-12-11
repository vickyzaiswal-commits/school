"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Target,
  Calculator,
  Microscope,
  Globe,
  Code,
  BarChart3,
  Book,
  Heart,
  Shield,
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
  Clock,
  FileText,
  Briefcase,
  FlaskRound,
  Atom,
  Landmark,
  Scale,
  Eye,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const SeniorSchoolPage = ({ schoolData = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStream, setActiveStream] = useState('science');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [role, setRole] = useState(null); // Will be derived from stored user
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);

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

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      title: "Senior School",
      subtitle: "Preparing future leaders for academic excellence and professional success in Classes XI-XII",
      height: "h-96",
      cta: { text: "Download Senior School Prospectus", show: true, href: "#" }
    },
    tabs: [
      { id: 'overview', name: 'Overview', icon: "BookOpen", show: true },
      { id: 'streams', name: 'Academic Streams', icon: "Target", show: true },
      { id: 'curriculum', name: 'Curriculum', icon: "GraduationCap", show: true },
      { id: 'career', name: 'Career Guidance', icon: "Briefcase", show: true }
    ],
    introduction: {
      show: true,
      title: "Welcome to Senior School",
      description: "Our Senior School program (Classes XI-XII) provides specialized education through three academic streams, preparing students for higher education and professional careers. We offer a rigorous curriculum, expert faculty guidance, and comprehensive support for competitive examinations and university admissions.",
      stats: [
        { icon: "Users", value: "25:1", label: "Student-Teacher Ratio", show: true },
        { icon: "Clock", value: "8:00 AM - 3:30 PM", label: "Daily Schedule", show: true },
        { icon: "GraduationCap", value: "Subject Expert", label: "Faculty", show: true },
        { icon: "Star", value: "100%", label: "Board Pass Rate", show: true }
      ],
      teachingApproach: [
        {
          icon: "Lightbulb",
          title: "Conceptual Mastery",
          description: "Deep understanding of fundamental concepts through advanced pedagogical approaches",
          show: true
        },
        {
          icon: "Brain",
          title: "Critical Analysis",
          description: "Developing analytical skills and higher-order thinking for competitive examinations",
          show: true
        },
        {
          icon: "Target",
          title: "Exam Preparation",
          description: "Comprehensive preparation for board exams and competitive entrance tests",
          show: true
        },
        {
          icon: "Briefcase",
          title: "Career Readiness",
          description: "Developing skills and knowledge required for university education and professional careers",
          show: true
        }
      ]
    },
    academicStreams: {
      show: true,
      title: "Academic Streams",
      description: "Specialized pathways designed to prepare students for higher education and careers",
      streams: [
        {
          id: 'science',
          name: 'Science Stream',
          icon: "Microscope",
          description: 'For students aspiring to pursue careers in engineering, medicine, research, and technology',
          subjects: [
            { name: 'Physics', icon: "Atom", show: true },
            { name: 'Chemistry', icon: "FlaskRound", show: true },
            { name: 'Mathematics', icon: "Calculator", show: true },
            { name: 'Biology', icon: "Eye", show: true },
            { name: 'Computer Science', icon: "Code", show: true },
            { name: 'English Core', icon: "Book", show: true }
          ],
          careerPathways: [
            "Engineering (Various Specializations)",
            "Medical Sciences (MBBS, Dentistry, Nursing)",
            "Pure Sciences (Physics, Chemistry, Biology)",
            "Research and Development",
            "Technology and IT Services",
            "Defense Services"
          ],
          show: true
        },
        {
          id: 'commerce',
          name: 'Commerce Stream',
          icon: "BarChart3",
          description: 'For students interested in business, finance, accounting, and economics',
          subjects: [
            { name: 'Accountancy', icon: "FileText", show: true },
            { name: 'Business Studies', icon: "Briefcase", show: true },
            { name: 'Economics', icon: "Globe", show: true },
            { name: 'Mathematics', icon: "Calculator", show: true },
            { name: 'Informatics Practices', icon: "Code", show: true },
            { name: 'English Core', icon: "Book", show: true }
          ],
          careerPathways: [
            "Chartered Accountancy (CA)",
            "Company Secretary (CS)",
            "Business Management (BBA, MBA)",
            "Economics and Finance",
            "Banking and Insurance",
            "Entrepreneurship"
          ],
          show: true
        },
        {
          id: 'humanities',
          name: 'Humanities Stream',
          icon: "Landmark",
          description: 'For students passionate about social sciences, languages, arts, and humanities',
          subjects: [
            { name: 'History', icon: "Book", show: true },
            { name: 'Political Science', icon: "Landmark", show: true },
            { name: 'Economics', icon: "Globe", show: true },
            { name: 'Psychology', icon: "Brain", show: true },
            { name: 'Geography', icon: "Globe", show: true },
            { name: 'English Core', icon: "Book", show: true }
          ],
          careerPathways: [
            "Law and Judiciary",
            "Civil Services",
            "Journalism and Mass Communication",
            "Psychology and Counseling",
            "Social Work and Research",
            "Arts and Design"
          ],
          show: true
        }
      ],
      specialPrograms: [
        {
          icon: "Microscope",
          title: "Advanced Science Program",
          description: "Research projects, Olympiad training, and advanced laboratory work",
          show: true
        },
        {
          icon: "BarChart3",
          title: "Commerce Excellence",
          description: "Stock market simulations, business case studies, and financial literacy programs",
          show: true
        },
        {
          icon: "Landmark",
          title: "Humanities Research",
          description: "Social research projects, debate competitions, and model United Nations",
          show: true
        },
        {
          icon: "Code",
          title: "Technology Innovation",
          description: "Advanced programming, robotics, and technology development projects",
          show: true
        }
      ]
    },
    curriculum: {
      show: true,
      title: "Senior School Curriculum",
      description: "Rigorous academic program aligned with CBSE guidelines and competitive exam requirements",
      assessmentStructure: [
        {
          component: "Unit Tests",
          weightage: "10%",
          description: "Regular assessment of individual units and chapters",
          show: true
        },
        {
          component: "Practical Examinations",
          weightage: "20%",
          description: "Laboratory work, projects, and practical application",
          show: true
        },
        {
          component: "Mid-Term Examinations",
          weightage: "30%",
          description: "Comprehensive assessment of half-yearly syllabus",
          show: true
        },
        {
          component: "Board Examinations",
          weightage: "40%",
          description: "Final CBSE board examinations at end of Class XII",
          show: true
        }
      ],
      academicSupport: [
        {
          title: "Remedial Classes",
          description: "Additional support for students needing extra help in specific subjects",
          show: true
        },
        {
          title: "Advanced Placement",
          description: "Enrichment programs for high-achieving students seeking additional challenges",
          show: true
        },
        {
          title: "Study Groups",
          description: "Peer learning and collaborative study sessions",
          show: true
        },
        {
          title: "Faculty Mentoring",
          description: "One-on-one guidance from subject teachers and mentors",
          show: true
        }
      ],
      dailySchedule: {
        title: "Typical Daily Schedule",
        show: true,
        schedule: [
          { time: "8:00 AM", activity: "Assembly & Morning Briefing", show: true },
          { time: "8:15 AM", activity: "Period 1: Core Subject", show: true },
          { time: "9:00 AM", activity: "Period 2: Core Subject", show: true },
          { time: "9:45 AM", activity: "Period 3: Core Subject", show: true },
          { time: "10:30 AM", activity: "Short Break", show: true },
          { time: "10:45 AM", activity: "Period 4: Core Subject", show: true },
          { time: "11:30 AM", activity: "Period 5: Elective/Additional", show: true },
          { time: "12:15 PM", activity: "Lunch Break", show: true },
          { time: "1:00 PM", activity: "Period 6: Practical/Lab", show: true },
          { time: "1:45 PM", activity: "Period 7: Revision/Remedial", show: true },
          { time: "2:30 PM", activity: "Period 8: Test/Assessment", show: true },
          { time: "3:15 PM", activity: "Dispersal/Extra Help Sessions", show: true }
        ]
      }
    },
    careerGuidance: {
      show: true,
      title: "Career Guidance & University Placement",
      description: "Comprehensive support for career planning and higher education admissions",
      services: [
        {
          icon: "GraduationCap",
          title: "University Counseling",
          description: "Personalized guidance for college selection and admission processes",
          show: true
        },
        {
          icon: "Briefcase",
          title: "Career Workshops",
          description: "Sessions with industry professionals and career experts",
          show: true
        },
        {
          icon: "FileText",
          title: "Entrance Exam Preparation",
          description: "Specialized coaching for JEE, NEET, CLAT, and other competitive exams",
          show: true
        },
        {
          icon: "Users",
          title: "Alumni Mentorship",
          description: "Guidance from successful alumni in various professional fields",
          show: true
        }
      ],
      placementRecord: [
        { university: "IITs & NITs", count: "45+ placements", icon: "GraduationCap", show: true },
        { university: "Medical Colleges", count: "30+ placements", icon: "Heart", show: true },
        { university: "Law Schools", count: "25+ placements", icon: "Scale", show: true },
        { university: "Business Schools", count: "40+ placements", icon: "Briefcase", show: true },
        { university: "Foreign Universities", count: "20+ placements", icon: "Globe", show: true }
      ],
      universityPartners: [
        "Delhi University", "IIT Delhi", "AIIMS", "SRCC", 
        "NLU Delhi", "IIM Indore", "BITS Pilani", "University of Toronto"
      ]
    },
    cta: {
      show: true,
      title: "Begin Your Journey to Excellence",
      description: "Join our senior school program and take the first step toward your dream career with our comprehensive academic and career guidance.",
      primaryCta: { text: "Apply for Admission", show: true, href: "/admissions" },
      secondaryCta: { text: "Download Stream Selection Guide", show: true, href: "/streams" }
    },
    layout: {
      showHero: true,
      showTabs: true,
      showIntroduction: true,
      showAcademicStreams: true,
      showCurriculum: true,
      showCareerGuidance: true,
      showCta: true
    }
  };

  // Icon mapping for rendering
  const iconMap = {
    BookOpen,
    Users,
    Target,
    Calculator,
    Microscope,
    Globe,
    Code,
    BarChart3,
    Book,
    Heart,
    Shield,
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
    Clock,
    FileText,
    Briefcase,
    FlaskRound,
    Atom,
    Landmark,
    Scale,
    Eye,
    Settings
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    tabs: 'showTabs',
    introduction: 'showIntroduction',
    academicStreams: 'showAcademicStreams',
    curriculum: 'showCurriculum',
    careerGuidance: 'showCareerGuidance',
    cta: 'showCta'
  };

  const sectionDisplay = [
    { key: 'tabs', label: 'Tabs' },
    { key: 'hero', label: 'Hero' },
    { key: 'introduction', label: 'Introduction' },
    { key: 'academicStreams', label: 'Academic Streams' },
    { key: 'curriculum', label: 'Curriculum' },
    { key: 'careerGuidance', label: 'Career Guidance' },
    { key: 'cta', label: 'Call To Action' }
  ];

  const toggleSectionVisibility = (key) => {
    setData(prev => {
      const layoutKey = layoutMap[key];
      const updated = { ...prev };
      updated.layout = { ...(prev.layout || {}) };
      if (layoutKey) {
        updated.layout[layoutKey] = !Boolean(prev.layout?.[layoutKey]);
      }
      if (prev[key] && typeof prev[key] === 'object' && !Array.isArray(prev[key])) {
        updated[key] = { ...prev[key], show: !Boolean(prev[key]?.show) };
      }
      return updated;
    });
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = {
        ...data,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };
      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_seniorschool', { payload: encrypted });
        if (save_data?.status !== 200) console.error('Save failed:', save_data);
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
      }
    } catch (error) {
      console.error('Save error:', error);
    }
    setSectionVisibilityModal(false);
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
        const res = await apiRequest('save_data/get_all_seniorschool_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data (raw):', fetchedData);
          try {
            if (fetchedData && typeof fetchedData === 'object' && fetchedData.encrypted) {
              const dec = await decryptObject(fetchedData);
              if (dec) fetchedData = dec;
            } else if (typeof fetchedData === 'string') {
              try { fetchedData = JSON.parse(fetchedData); } catch (e) { /* leave as-is */ }
            }
          } catch (deErr) {
            console.warn('Decryption failed for senior page:', deErr);
          }
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
      sectionData = [...(data.tabs || [])];
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

  // Handle change for string arrays (e.g., careerPathways)
  const handleStringArrayChange = (nestedKey, streamIndex, arrayIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[nestedKey]) updated[nestedKey] = [];
      const array = [...updated[nestedKey][streamIndex][nestedKey.replace('streams.', '')]];
      array[arrayIndex] = value;
      updated[nestedKey][streamIndex][nestedKey.replace('streams.', '')] = array;
      return updated;
    });
  };

  // Handle change for simple object arrays (e.g., stats)
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string lists (e.g., universityPartners)
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

  // Handle change for streams
  const handleStreamChange = (streamIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.streams) updated.streams = [];
      updated.streams[streamIndex] = { ...updated.streams[streamIndex], [field]: value };
      return updated;
    });
  };

  // Handle change for stream subjects
  const handleStreamSubjectChange = (streamIndex, subjectIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.streams) updated.streams = [];
      if (!updated.streams[streamIndex].subjects) updated.streams[streamIndex].subjects = [];
      updated.streams[streamIndex].subjects[subjectIndex] = { 
        ...updated.streams[streamIndex].subjects[subjectIndex], 
        [field]: value 
      };
      return updated;
    });
  };

  // Handle change for stream career pathways
  const handleCareerPathwayChange = (streamIndex, pathwayIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.streams) updated.streams = [];
      const pathways = [...updated.streams[streamIndex].careerPathways];
      pathways[pathwayIndex] = value;
      updated.streams[streamIndex].careerPathways = pathways;
      return updated;
    });
  };

  // Handle change for assessment structure
  const handleAssessmentChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.assessmentStructure) updated.assessmentStructure = [];
      updated.assessmentStructure[index] = { ...updated.assessmentStructure[index], [field]: value };
      return updated;
    });
  };

  // Handle change for academic support
  const handleAcademicSupportChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.academicSupport) updated.academicSupport = [];
      updated.academicSupport[index] = { ...updated.academicSupport[index], [field]: value };
      return updated;
    });
  };

  // Handle change for schedule items
  const handleScheduleChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.dailySchedule) updated.dailySchedule = { schedule: [] };
      updated.dailySchedule.schedule[index] = { ...updated.dailySchedule.schedule[index], [field]: value };
      return updated;
    });
  };

  // Handle change for career services
  const handleCareerServiceChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.services) updated.services = [];
      updated.services[index] = { ...updated.services[index], [field]: value };
      return updated;
    });
  };

  // Handle change for placement records
  const handlePlacementRecordChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.placementRecord) updated.placementRecord = [];
      updated.placementRecord[index] = { ...updated.placementRecord[index], [field]: value };
      return updated;
    });
  };

  // Handle change for university partners
  const handleUniversityPartnerChange = (index, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.universityPartners) updated.universityPartners = [];
      const partners = [...updated.universityPartners];
      partners[index] = value;
      updated.universityPartners = partners;
      return updated;
    });
  };

  // Handle change for special programs
  const handleSpecialProgramChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.specialPrograms) updated.specialPrograms = [];
      updated.specialPrograms[index] = { ...updated.specialPrograms[index], [field]: value };
      return updated;
    });
  };

  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save changes to state
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
      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_seniorschool', { payload: encrypted });
        console.log(save_data);
        if (save_data.status === 200) {
          setData(updatedData);
        } else {
          console.error('Save failed:', save_data);
        }
      } catch (encErr) {
        console.error('Encryption/Save error:', encErr);
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
  const filteredStats = (data.introduction?.stats || []).filter(stat => stat.show !== false);
  const filteredTeachingApproach = (data.introduction?.teachingApproach || []).filter(approach => approach.show !== false);
  const filteredStreams = (data.academicStreams?.streams || []).filter(stream => stream.show !== false);
  const filteredSpecialPrograms = (data.academicStreams?.specialPrograms || []).filter(program => program.show !== false);
  const filteredAssessmentStructure = (data.curriculum?.assessmentStructure || []).filter(item => item.show !== false);
  const filteredAcademicSupport = (data.curriculum?.academicSupport || []).filter(support => support.show !== false);
  const filteredSchedule = (data.curriculum?.dailySchedule?.schedule || []).filter(item => item.show !== false);
  const filteredCareerServices = (data.careerGuidance?.services || []).filter(service => service.show !== false);
  const filteredPlacementRecords = (data.careerGuidance?.placementRecord || []).filter(record => record.show !== false);

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
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Tabs</h3>
                  {editData.map((tab, index) => (
                    <div key={index} className="border p-3 rounded mb-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Tab {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={tab.show !== false}
                            onChange={(e) => handleTabsChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={tab.name || ''}
                          onChange={(e) => handleTabsChange(index, 'name', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={tab.id || ''}
                          onChange={(e) => handleTabsChange(index, 'id', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="ID"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'introduction' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Introduction</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {(editData.stats || []).map((stat, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Stat {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stat.show !== false}
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleSimpleArrayChange('stats', index, 'value', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Value"
                        />
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleSimpleArrayChange('stats', index, 'label', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Label"
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Teaching Approach</h3>
                  {(editData.teachingApproach || []).map((approach, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Approach {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={approach.show !== false}
                            onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={approach.title || ''}
                          onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Title"
                        />
                        <textarea
                          value={approach.description || ''}
                          onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'academicStreams' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Academic Streams</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Streams</h3>
                  {(editData.streams || []).map((stream, streamIndex) => (
                    <div key={streamIndex} className="mb-6 border p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{stream.name || `Stream ${streamIndex + 1}`}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stream.show !== false}
                            onChange={(e) => handleStreamChange(streamIndex, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={stream.name || ''}
                          onChange={(e) => handleStreamChange(streamIndex, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Stream Name"
                        />
                        <textarea
                          value={stream.description || ''}
                          onChange={(e) => handleStreamChange(streamIndex, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                        <h4 className="text-md font-semibold mb-2">Subjects</h4>
                        {(stream.subjects || []).map((subject, subjectIndex) => (
                          <div key={subjectIndex} className="flex items-center space-x-2 mb-1">
                            <input
                              type="text"
                              value={subject.name || ''}
                              onChange={(e) => handleStreamSubjectChange(streamIndex, subjectIndex, 'name', e.target.value)}
                              className="flex-1 p-2 border rounded"
                              placeholder="Subject Name"
                            />
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={subject.show !== false}
                                onChange={(e) => handleStreamSubjectChange(streamIndex, subjectIndex, 'show', e.target.checked)}
                              />
                              <span className="text-xs">Show</span>
                            </label>
                          </div>
                        ))}
                        <h4 className="text-md font-semibold mb-2">Career Pathways</h4>
                        {(stream.careerPathways || []).map((pathway, pathwayIndex) => (
                          <input
                            key={pathwayIndex}
                            type="text"
                            value={pathway || ''}
                            onChange={(e) => handleCareerPathwayChange(streamIndex, pathwayIndex, e.target.value)}
                            className="w-full p-2 border rounded mb-1"
                            placeholder="Career Pathway"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Programs</h3>
                  {(editData.specialPrograms || []).map((program, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Program {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={program.show !== false}
                            onChange={(e) => handleSpecialProgramChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={program.title || ''}
                          onChange={(e) => handleSpecialProgramChange(index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Title"
                        />
                        <textarea
                          value={program.description || ''}
                          onChange={(e) => handleSpecialProgramChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Assessment Structure</h3>
                  {(editData.assessmentStructure || []).map((item, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Assessment {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleAssessmentChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={item.component || ''}
                          onChange={(e) => handleAssessmentChange(index, 'component', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Component"
                        />
                        <input
                          type="text"
                          value={item.weightage || ''}
                          onChange={(e) => handleAssessmentChange(index, 'weightage', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Weightage"
                        />
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => handleAssessmentChange(index, 'description', e.target.value)}
                          className="p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Academic Support</h3>
                  {(editData.academicSupport || []).map((support, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Support {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={support.show !== false}
                            onChange={(e) => handleAcademicSupportChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={support.title || ''}
                          onChange={(e) => handleAcademicSupportChange(index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Title"
                        />
                        <textarea
                          value={support.description || ''}
                          onChange={(e) => handleAcademicSupportChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Daily Schedule</h3>
                  <div className="flex items-center mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.dailySchedule?.show !== false}
                        onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, show: e.target.checked })}
                      />
                      <span>Show Daily Schedule</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={editData.dailySchedule?.title || ''}
                    onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, title: e.target.value })}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Schedule Title"
                  />
                  {(editData.dailySchedule?.schedule || []).map((item, index) => (
                    <div key={index} className="mb-2 border p-2 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Item {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleScheduleChange(index, 'show', e.target.checked)}
                          />
                          <span className="text-xs">Show</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <input
                          type="text"
                          value={item.time || ''}
                          onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                          className="p-1 border rounded text-sm"
                          placeholder="Time"
                        />
                        <input
                          type="text"
                          value={item.activity || ''}
                          onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                          className="p-1 border rounded text-sm"
                          placeholder="Activity"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'careerGuidance' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show Career Guidance</span>
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
                  <h3 className="text-lg font-semibold mt-4 mb-2">Services</h3>
                  {(editData.services || []).map((service, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Service {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={service.show !== false}
                            onChange={(e) => handleCareerServiceChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={service.title || ''}
                          onChange={(e) => handleCareerServiceChange(index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Title"
                        />
                        <textarea
                          value={service.description || ''}
                          onChange={(e) => handleCareerServiceChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Placement Records</h3>
                  {(editData.placementRecord || []).map((record, index) => (
                    <div key={index} className="mb-4 border p-3 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Record {index + 1}</span>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={record.show !== false}
                            onChange={(e) => handlePlacementRecordChange(index, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={record.university || ''}
                          onChange={(e) => handlePlacementRecordChange(index, 'university', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="University"
                        />
                        <input
                          type="text"
                          value={record.count || ''}
                          onChange={(e) => handlePlacementRecordChange(index, 'count', e.target.value)}
                          className="p-2 border rounded"
                          placeholder="Count"
                        />
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">University Partners</h3>
                  {(editData.universityPartners || []).map((partner, index) => (
                    <input
                      key={index}
                      type="text"
                      value={partner || ''}
                      onChange={(e) => handleUniversityPartnerChange(index, e.target.value)}
                      className="w-full p-2 border rounded mb-1"
                      placeholder="University Partner"
                    />
                  ))}
                </div>
              )}
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.showSection || false}
                        onChange={(e) => handleToggleSection(e.target.checked)}
                      />
                      <span>Show CTA</span>
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
                      placeholder="/admissions"
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
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Manage Section Visibility Modal */}
      {editMode && sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[70vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold">Manage Section Visibility</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setSectionVisibilityModal(false)} className="p-2 text-gray-600 hover:text-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1 max-h-[70vh]">
              <div className="space-y-3">
                {sectionDisplay.map(section => (
                  <div key={section.key} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!safeData(section.key).show) ? 'bg-green-600' : 'bg-gray-300'}`} />
                      <span className="font-medium">{section.label}</span>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(section.key)}
                      className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${(layoutMap[section.key] ? !!data.layout?.[layoutMap[section.key]] : !!safeData(section.key).show) ? 'bg-green-600 justify-end' : 'bg-gray-300 justify-start'}`}>
                      <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end items-center px-4 py-3 bg-gray-50 border-t">
              <button onClick={() => setSectionVisibilityModal(false)} className="px-3 py-2 mr-2 text-sm text-gray-700 bg-white border border-gray-300 rounded">Cancel</button>
              <button onClick={saveSectionVisibility} className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Manage Visibility Button */}
      {editMode && (
        <button
          onClick={() => setSectionVisibilityModal(true)}
          className="fixed bottom-6 right-6 z-50 bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Manage Section Visibility"
        >
          <Edit className="h-5 w-5" />
        </button>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section className={`relative ${safeData('hero').height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {safeData('hero').subtitle}
              </p>
              {safeData('hero').cta?.show && (
                <a 
                  href={safeData('hero').cta.href} 
                  download
                  className="mt-6 bg-white hover:bg-gray-50 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {safeData('hero').cta.text}
                  <Download className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Tab Navigation */}
      {data.layout?.showTabs && filteredTabs.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-200 relative">
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
            <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Overview Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Introduction */}
          {data.layout?.showIntroduction && safeData('introduction').show && (
            <section className="py-16 bg-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{safeData('introduction').title}</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {safeData('introduction').description}
                    </p>
                    {filteredStats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {filteredStats.map((stat, index) => (
                          <div key={index} className="flex items-center">
                            {renderIcon(stat.icon, "h-5 w-5 text-green-600 mr-2")}
                            <span className="text-sm">{stat.value} {stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Educational Approach</h3>
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
                <button onClick={() => openEditModal('introduction')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}

          {/* Academic Streams Preview */}
          {data.layout?.showAcademicStreams && safeData('academicStreams').show && (
            <section className="py-16 bg-gray-50 relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('academicStreams').title}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {safeData('academicStreams').description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => (
                    <div key={stream.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        {renderIcon(stream.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">{stream.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{stream.description}</p>
                      <button 
                        onClick={() => {
                          setActiveTab('streams');
                          setActiveStream(stream.id);
                        }}
                        className="text-green-600 hover:text-green-700 font-medium text-sm"
                      >
                        Explore Stream →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('academicStreams')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}

          {/* Call to Action */}
          {data.layout?.showCta && safeData('cta').show && (
            <section className="py-16 bg-green-800 text-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{safeData('cta').title}</h2>
                <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
                  {safeData('cta').description}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                  {safeData('cta').primaryCta?.show && (
                    <a
                      href={safeData('cta').primaryCta.href}
                      className="w-full sm:w-auto min-w-[180px] text-center bg-white text-green-800 hover:bg-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden"
                      style={{ textOverflow: 'ellipsis' }}
                    >
                      <span className="truncate block">{safeData('cta').primaryCta.text}</span>
                    </a>
                  )}
                  {safeData('cta').secondaryCta?.show && (
                    <a
                      href={safeData('cta').secondaryCta.href}
                      download
                      className="w-full sm:w-auto min-w-[180px] text-center bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap overflow-hidden inline-flex items-center justify-center"
                    >
                      <span className="truncate">{safeData('cta').secondaryCta.text}</span>
                      <Download className="ml-2 h-4 w-4 flex-shrink-0" />
                    </a>
                  )}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-800 p-2 rounded-full hover:bg-gray-50">
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* Academic Streams Content */}
      {activeTab === 'streams' && data.layout?.showAcademicStreams && safeData('academicStreams').show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('academicStreams').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose your specialized pathway for Classes XI and XII
              </p>
            </div>

            {/* Stream Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filteredStreams.map((stream) => (
                <button
                  key={stream.id}
                  onClick={() => setActiveStream(stream.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeStream === stream.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  {renderIcon(stream.icon, "w-4 h-4 mr-2")}
                  {stream.name}
                </button>
              ))}
            </div>

            {/* Active Stream Details */}
            {filteredStreams.find(stream => stream.id === activeStream) && (
              <div className="max-w-4xl mx-auto">
                {filteredStreams.map((stream) => activeStream === stream.id && (
                  <div key={stream.id} className="bg-gray-50 rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{stream.name}</h3>
                    <p className="text-lg text-gray-600 mb-6">{stream.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Core Subjects</h4>
                        <ul className="space-y-2">
                          {stream.subjects.filter(s => s.show !== false).map((subject, sIndex) => (
                            <li key={sIndex} className="flex items-center text-gray-700">
                              {renderIcon(subject.icon, "h-5 w-5 text-green-600 mr-3")}
                              {subject.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-4">Career Pathways</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {stream.careerPathways.map((pathway, pIndex) => (
                            <li key={pIndex} className="flex items-start">
                              <ChevronRight className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{pathway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Special Programs */}
            {filteredSpecialPrograms.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Special Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSpecialPrograms.map((program, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          {renderIcon(program.icon, "h-5 w-5 text-green-600")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{program.title}</h4>
                          <p className="text-gray-600">{program.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('academicStreams')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </div>
      )}

      {/* Curriculum Content */}
      {activeTab === 'curriculum' && data.layout?.showCurriculum && safeData('curriculum').show && (
        <section className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('curriculum').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('curriculum').description}
              </p>
            </div>

            {/* Assessment Structure */}
            {filteredAssessmentStructure.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Assessment Structure</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {filteredAssessmentStructure.map((item, index) => (
                      <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-green-600 mb-2">{item.weightage}</div>
                        <h4 className="font-medium text-gray-800 mb-1">{item.component}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Academic Support */}
            {filteredAcademicSupport.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Academic Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAcademicSupport.map((support, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{support.title}</h4>
                      <p className="text-gray-600">{support.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Schedule */}
            {safeData('curriculum').dailySchedule?.show && filteredSchedule.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{safeData('curriculum').dailySchedule.title}</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    {filteredSchedule.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-24 font-medium text-gray-800">{item.time}</div>
                        <div className="flex-1 text-gray-600">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('curriculum')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Career Guidance Content */}
      {activeTab === 'career' && data.layout?.showCareerGuidance && safeData('careerGuidance').show && (
        <section className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('careerGuidance').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('careerGuidance').description}
              </p>
            </div>

            {/* Services */}
            {filteredCareerServices.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Our Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCareerServices.map((service, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                          {renderIcon(service.icon, "h-5 w-5 text-green-600")}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Placement Record */}
            {filteredPlacementRecords.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8">Placement Record</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPlacementRecords.map((record, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        {renderIcon(record.icon, "h-6 w-6 text-green-600")}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{record.university}</h4>
                      <p className="text-green-600 font-medium">{record.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* University Partners */}
            {(safeData('careerGuidance').universityPartners || []).length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">University Partners</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(safeData('careerGuidance').universityPartners || []).map((partner, index) => (
                      <li key={index} className="bg-white rounded p-3 text-center font-medium text-gray-700">
                        {partner}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('careerGuidance')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}
    </div>
  );
};

export default SeniorSchoolPage;