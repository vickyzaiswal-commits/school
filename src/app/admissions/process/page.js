"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Calendar,
  Clock,
  Users,
  Award,
  Download,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  BookOpen,
  UserCheck,
  CreditCard,
  FileCheck,
  ClipboardList,
  Star,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Settings,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';
import FileUpload from '@/utils/fileUpload';

const AdmissionProcessPage = ({ schoolData = {} }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [slideWidth, setSlideWidth] = useState(100 / 3);
  const [role, setRole] = useState(null); // Will be derived from stored user
  const sliderRef = useRef(null);

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
 

  // Icon mapping for rendering
  const iconMap = {
    Users,
    FileText,
    UserCheck,
    Award,
    CheckCircle,
    Mail,
    Phone,
    Clock,
    MapPin
  };

  // Render icon component
  const renderIcon = (iconName, className = "h-6 w-6 text-green-600") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  // Default data structure
  const defaultData = {
    hero: {
      show: true,
      title: "Admission Process",
      subtitle: "Join the Abc family - Where excellence in education meets values for life",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      backgroundImageShow: true,
      cta: "Begin Your Application",
      ctaLink: "#"
    },
    stats: {
      show: true,
      items: [
        { number: "97%", label: "Acceptance Rate", show: true },
        { number: "1:25", label: "Teacher-Student Ratio", show: true },
        { number: "5", label: "Step Process", show: true },
        { number: "15", label: "Days Average Processing", show: true }
      ]
    },
    admissionSteps: {
      show: true,
      title: "Admission Process",
      description: "Our streamlined 5-step process makes applying to Abc simple and straightforward",
      steps: [
        {
          step: 1,
          title: "Inquiry & Information",
          description: "Learn about our school and admission process",
          icon: "Users",
          details: [
            { text: "Attend virtual information session", show: true },
            { text: "Download prospectus and fee structure", show: true },
            { text: "Schedule campus tour (optional)", show: true },
            { text: "Meet with admission counselor", show: true }
          ],
          show: true
        },
        {
          step: 2,
          title: "Application Submission",
          description: "Complete and submit the application form",
          icon: "FileText",
          details: [
            { text: "Fill online application form", show: true },
            { text: "Upload required documents", show: true },
            { text: "Pay application fee (₹1,000)", show: true },
            { text: "Receive application confirmation", show: true }
          ],
          show: true
        },
        {
          step: 3,
          title: "Assessment & Interaction",
          description: "Student assessment and parent interaction",
          icon: "UserCheck",
          details: [
            { text: "Age-appropriate assessment for student", show: true },
            { text: "Parent interaction with admission committee", show: true },
            { text: "Observation of student in group setting", show: true },
            { text: "Review of previous school records", show: true }
          ],
          show: true
        },
        {
          step: 4,
          title: "Admission Decision",
          description: "Receive and review admission offer",
          icon: "Award",
          details: [
            { text: "Admission committee review", show: true },
            { text: "Decision communicated via email", show: true },
            { text: "Offer letter with fee details", show: true },
            { text: "Next steps information", show: true }
          ],
          show: true
        },
        {
          step: 5,
          title: "Confirmation & Enrollment",
          description: "Complete enrollment formalities",
          icon: "CheckCircle",
          details: [
            { text: "Submit acceptance form", show: true },
            { text: "Pay admission fee and first installment", show: true },
            { text: "Complete documentation", show: true },
            { text: "Receive welcome package", show: true }
          ],
          show: true
        }
      ]
    },
    gradeLevels: {
      show: true,
      title: "Grade Level Information",
      description: "Admission criteria and process varies by grade level",
      levels: [
        {
          id: 'nursery',
          name: 'Pre-School (Nursery, KG)',
          age: '3-5 years',
          seats: 40,
          assessment: "Informal interaction and observation",
          show: true
        },
        {
          id: 'primary',
          name: 'Primary (Classes I-V)',
          age: '6-10 years',
          seats: 35,
          assessment: "Basic skills assessment in English and Mathematics",
          show: true
        },
        {
          id: 'middle',
          name: 'Middle (Classes VI-VIII)',
          age: '11-13 years',
          seats: 30,
          assessment: "Subject proficiency test and interaction",
          show: true
        },
        {
          id: 'secondary',
          name: 'Secondary (Classes IX-X)',
          age: '14-15 years',
          seats: 25,
          assessment: "Comprehensive entrance test in core subjects",
          show: true
        },
        {
          id: 'senior',
          name: 'Senior Secondary (Classes XI-XII)',
          age: '16-17 years',
          seats: 20,
          assessment: "Subject-specific tests and stream eligibility evaluation",
          show: true
        }
      ]
    },
    importantDates: {
      show: true,
      title: "Important Dates for 2026-27 Admissions",
      dates: [
        {
          event: "Admission Process Begins",
          date: "December 1, 2025",
          description: "Online applications open for all classes",
          show: true
        },
        {
          event: "Last Date for Applications",
          date: "January 15, 2026",
          description: "Deadline for submission of complete application forms",
          show: true
        },
        {
          event: "Assessments & Interactions",
          date: "January 20-30, 2026",
          description: "Grade-wise scheduled assessments and parent meetings",
          show: true
        },
        {
          event: "First Round of Offers",
          date: "February 5, 2026",
          description: "First batch of admission offers communicated",
          show: true
        },
        {
          event: "Fee Payment Deadline",
          date: "February 20, 2026",
          description: "Last date for fee payment to secure admission",
          show: true
        },
        {
          event: "Academic Year Begins",
          date: "April 1, 2026",
          description: "New academic session 2026-27 commences",
          show: true
        }
      ]
    },
    requiredDocuments: {
      show: true,
      title: "Required Documents",
      description: "Please keep these documents ready for the application process",
      categories: [
        {
          category: "Application Documents",
          items: [
            { text: "Completed application form", show: true },
            { text: "2 recent passport-size photographs of student", show: true },
            { text: "Photograph of parents/guardians", show: true }
          ],
          show: true
        },
        {
          category: "Birth & Identity Proof",
          items: [
            { text: "Birth certificate (original for verification)", show: true },
            { text: "Aadhaar card of student (if available)", show: true }
          ],
          show: true
        },
        {
          category: "Academic Records",
          items: [
            { text: "Report card of previous academic year", show: true },
            { text: "Transfer certificate from previous school (if applicable)", show: true },
            { text: "Achievement records (academic and co-curricular)", show: true }
          ],
          show: true
        },
        {
          category: "Parent Documents",
          items: [
            { text: "Aadhaar card of both parents", show: true },
            { text: "Address proof (electricity bill, rent agreement, etc.)", show: true }
          ],
          show: true
        }
      ]
    },
    feeStructure: {
      show: true,
      title: "Fee Structure 2026-27",
      items: [
        {
          item: "Application Fee",
          amount: "₹1,000",
          description: "Non-refundable, payable with application submission",
          show: true
        },
        {
          item: "Admission Fee",
          amount: "₹25,000",
          description: "One-time payment upon admission confirmation",
          show: true
        },
        {
          item: "Annual Charges",
          amount: "₹15,000",
          description: "Payable at the beginning of each academic year",
          show: true
        },
        {
          item: "Tuition Fee (Monthly)",
          amount: "₹8,000 - ₹12,000",
          description: "Varies by grade level, payable quarterly in advance",
          show: true
        },
        {
          item: "Development Fee",
          amount: "₹10,000",
          description: "Annual charge for infrastructure development",
          show: true
        }
      ]
    },
    scholarships: {
      show: true,
      title: "Scholarships & Financial Aid",
      description: "We believe in rewarding excellence and supporting deserving students",
      scholarships: [
        {
          name: "Academic Excellence Scholarship",
          eligibility: "95%+ in previous class & excellent assessment performance",
          coverage: "Up to 25% tuition fee waiver",
          show: true
        },
        {
          name: "Sports Scholarship",
          eligibility: "State/National level sports achievement",
          coverage: "Up to 50% tuition fee waiver",
          show: true
        },
        {
          name: "Sibling Scholarship",
          eligibility: "Second child from the same family",
          coverage: "5% discount on tuition fees",
          show: true
        },
        {
          name: "Alumni Scholarship",
          eligibility: "Children of Abc alumni",
          coverage: "10% discount on tuition fees",
          show: true
        }
      ]
    },
    faqs: {
      show: true,
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our admission process",
      items: [
        {
          question: "What is the age criteria for admission to Nursery?",
          answer: "The child should have completed 3 years of age as of March 31, 2026 for admission to Nursery. For KG, the child should have completed 4 years of age by the same date.",
          show: true
        },
        {
          question: "Is there any sibling preference in admission?",
          answer: "Yes, we offer sibling preference subject to availability of seats and the child meeting the admission criteria. A 5% discount on tuition fees is also offered for the second child.",
          show: true
        },
        {
          question: "What is the student-teacher ratio in classrooms?",
          answer: "We maintain an optimal student-teacher ratio of 25:1 in primary classes and 30:1 in middle and secondary classes to ensure personalized attention.",
          show: true
        },
        {
          question: "Are transportation facilities available?",
          answer: "Yes, we provide safe and reliable transportation services covering most areas in the city. The bus fee is additional and varies based on distance.",
          show: true
        },
        {
          question: "What is the school's policy on transfers?",
          answer: "Transfer certificates from recognized schools are accepted. Students may need to take an entrance test for admission to classes II and above based on seat availability.",
          show: true
        }
      ]
    },
    contact: {
      show: true,
      title: "Ready to Begin Your Journey?",
      description: "Start your application today or contact our admission team for personalized assistance",
      info: [
        {
          icon: "Mail",
          content: "admissions@stcolumbas.edu.in",
          show: true
        },
        {
          icon: "Phone",
          content: "011-2336-3462 (Ext. 110)",
          show: true
        },
        {
          icon: "Clock",
          content: "Monday-Friday: 9:00 AM - 4:00 PM",
          show: true
        },
        {
          icon: "MapPin",
          content: "1, Ashok Place, Birgunj - 110001",
          show: true
        }
      ],
      buttons: [
        { label: "Apply Now", icon: "FileText", link: "#", show: true },
        { label: "Schedule Campus Tour", icon: "MapPin", link: "#", show: true }
      ]
    },
    layout: {
      showHero: true,
      showStats: true,
      showAdmissionSteps: true,
      showGradeLevels: true,
      showImportantDates: true,
      showRequiredDocuments: true,
      showFeeStructure: true,
      showScholarships: true,
      showFaqs: true,
      showContact: true
    }
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    stats: 'showStats',
    admissionSteps: 'showAdmissionSteps',
    gradeLevels: 'showGradeLevels',
    importantDates: 'showImportantDates',
    requiredDocuments: 'showRequiredDocuments',
    feeStructure: 'showFeeStructure',
    scholarships: 'showScholarships',
    faqs: 'showFaqs',
    contact: 'showContact'
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
        const res = await apiRequest('save_data/get_all_admission_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data (raw):', fetchedData);
          try {
            if (fetchedData && fetchedData.encrypted) {
              fetchedData = await decryptObject(fetchedData);
            } else if (typeof fetchedData === 'string') {
              try {
                fetchedData = JSON.parse(fetchedData);
              } catch (e) {
                console.warn('Failed to parse fetchedData string, using default', e);
                fetchedData = {};
              }
            }
          } catch (e) {
            console.warn('Decryption failed, falling back to raw data or default', e);
            try {
              if (typeof fetchedData === 'string') fetchedData = JSON.parse(fetchedData);
            } catch (err) {
              fetchedData = {};
            }
          }
          setData({ ...defaultData, ...fetchedData, ...schoolData });
        } else {
          console.log('No data or invalid response, using default');
          setData({ ...defaultData, ...schoolData });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData({ ...defaultData, ...schoolData });
      }
    };

    fetchData();
  }, []);

  // Responsive slide width
  useEffect(() => {
    const handleResize = () => {
      setSlideWidth(window.innerWidth >= 768 ? 100 / 3 : 100);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter functions
  const filteredStats = (data.stats?.items || []).filter(item => item.show !== false);
  const filteredSteps = (data.admissionSteps?.steps || []).filter(step => step.show !== false);
  const filteredGradeLevels = (data.gradeLevels?.levels || []).filter(level => level.show !== false);
  const filteredImportantDates = (data.importantDates?.dates || []).filter(date => date.show !== false);
  const filteredDocumentCategories = (data.requiredDocuments?.categories || []).filter(category => category.show !== false);
  const filteredFeeItems = (data.feeStructure?.items || []).filter(item => item.show !== false);
  const filteredScholarships = (data.scholarships?.scholarships || []).filter(scholarship => scholarship.show !== false);
  const filteredFaqs = (data.faqs?.items || []).filter(faq => faq.show !== false);
  const filteredContactInfo = (data.contact?.info || []).filter(info => info.show !== false);
  const filteredContactButtons = (data.contact?.buttons || []).filter(button => button.show !== false);

  const totalSlides = filteredGradeLevels.length;
  const visibleCards = slideWidth === 100 ? 1 : 3;
  const maxSlide = Math.max(0, totalSlides - visibleCards);

  // Reset current slide when totalSlides or maxSlide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [totalSlides, maxSlide]);

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
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
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

  // Handle change for simple arrays of objects (e.g., stats.items, feeStructure.items)
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for string arrays now objects with text and show
  const handleTextItemChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[arrayKey]) updated[arrayKey] = [];
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  // Handle change for steps details now array of objects
  const handleStepDetailsChange = (stepIndex, detailIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.steps) updated.steps = [];
      updated.steps[stepIndex].details[detailIndex] = { ...updated.steps[stepIndex].details[detailIndex], [field]: value };
      return updated;
    });
  };

  // Handle change for categories in requiredDocuments
  const handleCategoryChange = (categoryIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.categories) updated.categories = [];
      updated.categories[categoryIndex] = { ...updated.categories[categoryIndex], [field]: value };
      return updated;
    });
  };

  // Handle change for items in categories now objects
  const handleCategoryItemChange = (categoryIndex, itemIndex, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated.categories) updated.categories = [];
      updated.categories[categoryIndex].items[itemIndex] = { ...updated.categories[categoryIndex].items[itemIndex], [field]: value };
      return updated;
    });
  };

  // Toggle showSection
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Toggle preview mode
  const togglePreview = () => {
    setPreviewMode(!previewMode);
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
        const save_data = await apiRequest('save_data/save_admission_data', { payload: encrypted });
        console.log('save result', save_data);
        if (save_data.status === 200) {
          setData(updatedData);
        } else {
          console.error('Save failed:', save_data);
        }
      } catch (err) {
        console.error('Save/Encryption error:', err);
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
    // keys like showStats live under data.layout
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
      try {
        const encrypted = await encryptObject(payload);
        const res = await apiRequest('save_data/save_admission_data', { payload: encrypted });
        if (res?.status !== 200) console.error('Save failed', res);
      } catch (err) {
        console.error('Save/Encryption error', err);
      }
    } catch (error) {
      console.error('Error saving visibility', error);
    }
    setSectionVisibilityModal(false);
  };

  // Safe data access helper
  const safeData = (section, key = null) => {
    if (key) {
      return data[section]?.[key] ?? '';
    }
    return data[section] ?? {};
  };

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide));
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isPaused && totalSlides > visibleCards) {
      const timer = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, maxSlide]);

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
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editData.showSection || false}
                      onChange={(e) => handleToggleSection(e.target.checked)}
                    />
                    <span>Show {editSection.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                </div>

                {editSection === 'hero' && (
                  <div>
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
                      <label className="block text-sm font-medium">CTA</label>
                      <input
                        type="text"
                        value={editData.cta || ''}
                        onChange={(e) => handleObjectChange('cta', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">CTA Link</label>
                      <input
                        type="text"
                        value={editData.ctaLink || ''}
                        onChange={(e) => handleObjectChange('ctaLink', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="mt-3">
                      <FileUpload
                        currentUrl={editData.backgroundImage || ''}
                        onUpload={(url) => handleObjectChange('backgroundImage', url)}
                        label="Upload Hero Background"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editData.backgroundImageShow !== false}
                          onChange={(e) => handleObjectChange('backgroundImageShow', e.target.checked)}
                        />
                        <span>Show Background Image</span>
                      </label>
                    </div>
                  </div>
                )}

                {editSection === 'stats' && (
                  <div>
                    {(editData.items || []).map((item, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={item.show || false}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show this stat</span>
                        </label>
                        <div className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={item.number || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'number', e.target.value)}
                            placeholder="Number"
                            className="w-1/2 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={item.label || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'label', e.target.value)}
                            placeholder="Label"
                            className="w-1/2 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'admissionSteps' && (
                  <div>
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
                    {(editData.steps || []).map((step, stepIndex) => (
                      <div key={stepIndex} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={step.show || false}
                            onChange={(e) => handleNestedArrayChange('steps', stepIndex, 'show', e.target.checked)}
                          />
                          <span>Show this step</span>
                        </label>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => handleNestedArrayChange('steps', stepIndex, 'title', e.target.value)}
                          placeholder="Step Title"
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          value={step.description || ''}
                          onChange={(e) => handleNestedArrayChange('steps', stepIndex, 'description', e.target.value)}
                          placeholder="Step Description"
                          className="w-full p-2 border rounded mb-2"
                        />
                        {(step.details || []).map((detail, detailIndex) => (
                          <div key={detailIndex} className="border p-3 rounded mt-2">
                            <label className="flex items-center space-x-2 mb-2">
                              <input
                                type="checkbox"
                                checked={detail.show || false}
                                onChange={(e) => handleStepDetailsChange(stepIndex, detailIndex, 'show', e.target.checked)}
                              />
                              <span>Show this detail</span>
                            </label>
                            <input
                              type="text"
                              value={detail.text || ''}
                              onChange={(e) => handleStepDetailsChange(stepIndex, detailIndex, 'text', e.target.value)}
                              placeholder="Detail"
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'gradeLevels' && (
                  <div>
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
                    {(editData.levels || []).map((level, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={level.show || false}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'show', e.target.checked)}
                          />
                          <span>Show this level</span>
                        </label>
                        <input
                          type="text"
                          value={level.name || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'name', e.target.value)}
                          placeholder="Name"
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          value={level.age || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'age', e.target.value)}
                          placeholder="Age"
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="number"
                          value={level.seats || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'seats', e.target.value)}
                          placeholder="Seats"
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          value={level.assessment || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'assessment', e.target.value)}
                          placeholder="Assessment"
                          className="w-full p-2 border rounded mb-2"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'importantDates' && (
                  <div>
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleObjectChange('title', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {(editData.dates || []).map((date, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={date.show || false}
                            onChange={(e) => handleNestedArrayChange('dates', index, 'show', e.target.checked)}
                          />
                          <span>Show this date</span>
                        </label>
                        <div className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={date.event || ''}
                            onChange={(e) => handleNestedArrayChange('dates', index, 'event', e.target.value)}
                            placeholder="Event"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={date.date || ''}
                            onChange={(e) => handleNestedArrayChange('dates', index, 'date', e.target.value)}
                            placeholder="Date"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={date.description || ''}
                            onChange={(e) => handleNestedArrayChange('dates', index, 'description', e.target.value)}
                            placeholder="Description"
                            className="w-1/3 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'requiredDocuments' && (
                  <div>
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
                    {(editData.categories || []).map((category, catIndex) => (
                      <div key={catIndex} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={category.show || false}
                            onChange={(e) => handleCategoryChange(catIndex, 'show', e.target.checked)}
                          />
                          <span>Show this category</span>
                        </label>
                        <input
                          type="text"
                          value={category.category || ''}
                          onChange={(e) => handleCategoryChange(catIndex, 'category', e.target.value)}
                          placeholder="Category"
                          className="w-full p-2 border rounded mb-2"
                        />
                        {(category.items || []).map((item, itemIndex) => (
                          <div key={itemIndex} className="border p-3 rounded mt-2">
                            <label className="flex items-center space-x-2 mb-2">
                              <input
                                type="checkbox"
                                checked={item.show || false}
                                onChange={(e) => handleCategoryItemChange(catIndex, itemIndex, 'show', e.target.checked)}
                              />
                              <span>Show this item</span>
                            </label>
                            <input
                              type="text"
                              value={item.text || ''}
                              onChange={(e) => handleCategoryItemChange(catIndex, itemIndex, 'text', e.target.value)}
                              placeholder="Item"
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'feeStructure' && (
                  <div>
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input
                        type="text"
                        value={editData.title || ''}
                        onChange={(e) => handleObjectChange('title', e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    {(editData.items || []).map((item, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={item.show || false}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show this fee item</span>
                        </label>
                        <div className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={item.item || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'item', e.target.value)}
                            placeholder="Item"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={item.amount || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'amount', e.target.value)}
                            placeholder="Amount"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={item.description || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'description', e.target.value)}
                            placeholder="Description"
                            className="w-1/3 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'scholarships' && (
                  <div>
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
                    {(editData.scholarships || []).map((sch, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={sch.show || false}
                            onChange={(e) => handleNestedArrayChange('scholarships', index, 'show', e.target.checked)}
                          />
                          <span>Show this scholarship</span>
                        </label>
                        <div className="flex space-x-2 mt-2">
                          <input
                            type="text"
                            value={sch.name || ''}
                            onChange={(e) => handleNestedArrayChange('scholarships', index, 'name', e.target.value)}
                            placeholder="Name"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={sch.eligibility || ''}
                            onChange={(e) => handleNestedArrayChange('scholarships', index, 'eligibility', e.target.value)}
                            placeholder="Eligibility"
                            className="w-1/3 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={sch.coverage || ''}
                            onChange={(e) => handleNestedArrayChange('scholarships', index, 'coverage', e.target.value)}
                            placeholder="Coverage"
                            className="w-1/3 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'faqs' && (
                  <div>
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
                    {(editData.items || []).map((faq, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={faq.show || false}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show this FAQ</span>
                        </label>
                        <div className="space-y-2 mt-2">
                          <input
                            type="text"
                            value={faq.question || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'question', e.target.value)}
                            placeholder="Question"
                            className="w-full p-2 border rounded"
                          />
                          <textarea
                            value={faq.answer || ''}
                            onChange={(e) => handleSimpleArrayChange('items', index, 'answer', e.target.value)}
                            placeholder="Answer"
                            className="w-full p-2 border rounded"
                            rows="3"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {editSection === 'contact' && (
                  <div>
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
                    <h3 className="text-lg font-semibold mt-4 mb-2">Contact Info</h3>
                    {(editData.info || []).map((info, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={info.show || false}
                            onChange={(e) => handleNestedArrayChange('info', index, 'show', e.target.checked)}
                          />
                          <span>Show this info</span>
                        </label>
                        <div className="space-y-2 mt-2">
                          <input
                            type="text"
                            value={info.content || ''}
                            onChange={(e) => handleNestedArrayChange('info', index, 'content', e.target.value)}
                            placeholder="Content"
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                    <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                    {(editData.buttons || []).map((button, index) => (
                      <div key={index} className="border p-4 rounded mt-4">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={button.show || false}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'show', e.target.checked)}
                          />
                          <span>Show this button</span>
                        </label>
                        <div className="space-y-2 mt-2">
                          <input
                            type="text"
                            value={button.label || ''}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'label', e.target.value)}
                            placeholder="Label"
                            className="w-1/2 p-2 border rounded"
                          />
                          <input
                            type="text"
                            value={button.link || ''}
                            onChange={(e) => handleNestedArrayChange('buttons', index, 'link', e.target.value)}
                            placeholder="Link"
                            className="w-1/2 p-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section className={`relative ${safeData('hero').height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} id="hero">
          {safeData('hero').backgroundImageShow !== false && safeData('hero').backgroundImage && (
            <img src={safeData('hero').backgroundImage} alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {safeData('hero').subtitle}
              </p>
              {safeData('hero').cta && (
                <a 
                  href={safeData('hero').ctaLink} 
                  className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105"
                >
                  {safeData('hero').cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Stats Section */}
      {data.layout?.showStats && safeData('stats').show && filteredStats.length > 0 && (
        <section className="py-12 bg-green-700 text-white relative animate-on-scroll" id="stats">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {filteredStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('stats')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Admission Process Steps */}
      {data.layout?.showAdmissionSteps && safeData('admissionSteps').show && filteredSteps.length > 0 && (
        <section className="py-16 bg-white relative animate-on-scroll" id="admissionSteps">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('admissionSteps').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('admissionSteps').description}
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center w-full max-w-4xl">
                {filteredSteps.map((step, index) => (
                  <React.Fragment key={step.step}>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setActiveStep(step.step)}
                        className={`flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold transition-all duration-300 ${
                          activeStep === step.step
                            ? 'bg-green-600 text-white scale-110'
                            : activeStep > step.step
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {activeStep > step.step ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          step.step
                        )}
                      </button>
                      <div className="mt-2 text-xs font-medium text-gray-500 text-center max-w-20">
                        {step.title.split(' ')[0]}
                      </div>
                    </div>
                    {index < filteredSteps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          activeStep > step.step ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="max-w-4xl mx-auto">
              {filteredSteps.map((step) => {
                if (activeStep !== step.step) return null;
                const filteredDetails = (step.details || []).filter(detail => detail.show !== false);
                return (
                  <div key={step.step} className="bg-gray-50 rounded-lg p-8">
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        {renderIcon(step.icon, "h-8 w-8 text-green-600")}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {filteredDetails.map((detail, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setActiveStep(activeStep - 1)}
                        disabled={activeStep === 1}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                          activeStep === 1
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        disabled={activeStep === filteredSteps.length}
                        className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                          activeStep === filteredSteps.length
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('admissionSteps')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Grade Levels Slider */}
      {data.layout?.showGradeLevels && safeData('gradeLevels').show && filteredGradeLevels.length > 0 && (
        <section className="py-16 bg-gray-50 relative animate-on-scroll" id="gradeLevels">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('gradeLevels').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('gradeLevels').description}
              </p>
            </div>
            <div 
              ref={sliderRef}
              className="relative overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
              >
                {filteredGradeLevels.map((level, index) => (
                  <div key={index} className="w-full md:w-1/3 px-4 flex-shrink-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center h-full">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{level.name}</h3>
                      <p className="text-green-600 font-semibold mb-4">{level.age}</p>
                      <p className="text-gray-600 mb-4">Seats: <span className="font-bold">{level.seats}</span></p>
                      <p className="text-sm text-gray-700">{level.assessment}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === maxSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
              {totalSlides > visibleCards && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('gradeLevels')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Important Dates */}
      {data.layout?.showImportantDates && safeData('importantDates').show && filteredImportantDates.length > 0 && (
        <section className="py-16 bg-white relative animate-on-scroll" id="importantDates">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('importantDates').title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImportantDates.map((dateItem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{dateItem.event}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">{dateItem.date}</p>
                  <p className="text-gray-600 text-sm">{dateItem.description}</p>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('importantDates')} className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Required Documents */}
      {data.layout?.showRequiredDocuments && safeData('requiredDocuments').show && filteredDocumentCategories.length > 0 && (
        <section className="py-16 bg-gray-50 relative animate-on-scroll" id="requiredDocuments">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('requiredDocuments').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('requiredDocuments').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDocumentCategories.map((category, index) => {
                const filteredItems = (category.items || []).filter(item => item.show !== false);
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{category.category}</h3>
                    <ul className="space-y-3">
                      {filteredItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <FileCheck className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('requiredDocuments')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Fee Structure */}
      {data.layout?.showFeeStructure && safeData('feeStructure').show && filteredFeeItems.length > 0 && (
        <section className="py-16 bg-white relative animate-on-scroll" id="feeStructure">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('feeStructure').title}</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {filteredFeeItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.item}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  <div className="text-lg font-bold text-green-700">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('feeStructure')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Scholarships */}
      {data.layout?.showScholarships && safeData('scholarships').show && filteredScholarships.length > 0 && (
        <section className="py-16 bg-gray-50 relative animate-on-scroll" id="scholarships">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('scholarships').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('scholarships').description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredScholarships.map((scholarship, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{scholarship.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Eligibility:</strong> {scholarship.eligibility}</span>
                    </div>
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700"><strong>Coverage:</strong> {scholarship.coverage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('scholarships')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* FAQs */}
      {data.layout?.showFaqs && safeData('faqs').show && filteredFaqs.length > 0 && (
        <section className="py-16 bg-white relative animate-on-scroll" id="faqs">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('faqs').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {safeData('faqs').description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 py-6">
                  <button
                    className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    {faq.question}
                    {openFaq === index ? (
                      <ChevronDown className="h-5 w-5 text-green-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-green-600" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('faqs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Contact Section */}
      {data.layout?.showContact && safeData('contact').show && (
        <section className="py-16 bg-green-700 text-white relative animate-on-scroll" id="contact">
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
              <h2 className="text-3xl font-bold mb-4">{safeData('contact').title}</h2>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                {safeData('contact').description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {filteredContactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-green-600 p-3 rounded-lg mr-4">
                      {renderIcon(info.icon, "h-6 w-6 text-white")}
                    </div>
                    <span>{info.content}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {filteredContactButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center hover:scale-105"
                  >
                    {button.label}
                    {renderIcon(button.icon, "ml-2 h-4 w-4 text-green-800")}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('contact')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Edit className="h-5 w-5" />
            </button>
          )}
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
                    ['showStats', 'Stats Section'],
                    ['showAdmissionSteps', 'Admission Steps'],
                    ['showGradeLevels', 'Grade Levels'],
                    ['showImportantDates', 'Important Dates'],
                    ['showRequiredDocuments', 'Required Documents'],
                    ['showFeeStructure', 'Fee Structure'],
                    ['showScholarships', 'Scholarships'],
                    ['showFaqs', 'FAQs'],
                    ['showContact', 'Contact Section']
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

export default AdmissionProcessPage;