"use client";
import React, { useState, useEffect } from 'react';
import { 
  CreditCard,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Receipt,
  FileText,
  Banknote,
  Wallet,
  QrCode,
  Building,
  Mail,
  Phone,
  HelpCircle,
  PieChart,
  IndianRupee,
  ArrowRight,
  ExternalLink,
  FileSpreadsheet,
  Percent,
  Shield,
  BadgeIndianRupee,
  Settings,
  Eye,
  EyeOff,
  X,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const FeesPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const role = 'admin'; // Should come from auth context
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});

  // Default data structure - Consistent with MiddleSchoolPage
  const defaultData = {
    hero: {
      show: true,
      title: "Fee Structure & Payment",
      subtitle: "Transparent and comprehensive fee information for academic year 2024-25",
      height: "h-96",
      primaryCta: { text: "Pay Fees Online", show: true, href: "#payment" },
      secondaryCta: { text: "Download Fee Structure", show: true, href: "" }
    },
    feeStructure: {
      show: true,
      title: "Detailed Fee Structure",
      description: "Breakdown of all fees and charges for different grade levels",
      feeCategories: [
        { id: 'tuition', name: 'Tuition Fee', description: 'Monthly academic charges', show: true },
        { id: 'development', name: 'Development Fee', description: 'Annual infrastructure charge', show: true },
        { id: 'annual', name: 'Annual Charges', description: 'Yearly administrative costs', show: true },
        { id: 'activity', name: 'Activity Fee', description: 'Co-curricular activities', show: true }
      ],
      gradeLevels: {
        nursery: { label: 'Pre-School (Nursery, KG)', tuition: 8000, development: 5000, annual: 3000, activity: 2000, show: true },
        primary: { label: 'Primary (Classes I-V)', tuition: 9000, development: 6000, annual: 3500, activity: 2500, show: true },
        middle: { label: 'Middle School (Classes VI-VIII)', tuition: 10000, development: 7000, annual: 4000, activity: 3000, show: true },
        secondary: { label: 'Secondary (Classes IX-X)', tuition: 12000, development: 8000, annual: 5000, activity: 3500, show: true },
        senior: { label: 'Senior Secondary (Classes XI-XII)', tuition: 14000, development: 10000, annual: 6000, activity: 4000, show: true }
      }
    },
    additionalCharges: {
      show: true,
      title: "Additional Charges (Optional)",
      charges: [
        { name: 'Transportation', amount: '₹2,000 - ₹4,000', description: 'Based on distance from school', show: true },
        { name: 'Meals', amount: '₹1,500', description: 'Optional monthly meal plan', show: true },
        { name: 'Uniform', amount: '₹3,500', description: 'One-time purchase (2 sets)', show: true },
        { name: 'Books & Stationery', amount: '₹2,000 - ₹5,000', description: 'Varies by grade level', show: true },
        { name: 'Examination', amount: '₹500 - ₹1,000', description: 'Per term', show: true }
      ]
    },
    paymentSchedule: {
      show: true,
      title: "Payment Schedule 2024-25",
      terms: [
        { term: 'Term I', dueDate: 'April 10, 2024', amount: '40% of annual fees', status: 'Upcoming', show: true },
        { term: 'Term II', dueDate: 'August 10, 2024', amount: '30% of annual fees', status: 'Upcoming', show: true },
        { term: 'Term III', dueDate: 'December 10, 2024', amount: '30% of annual fees', status: 'Upcoming', show: true }
      ],
      latePolicy: {
        show: true,
        title: "Late Payment Policy",
        description: "A late fee of ₹100 per day will be charged after the due date. After 15 days, students may not be permitted to attend classes until outstanding fees are cleared."
      }
    },
    paymentMethods: {
      show: true,
      title: "Payment Methods",
      methods: [
        {
          method: 'Online Payment',
          icon: 'CreditCard',
          description: 'Secure online payment gateway',
          options: ['Credit/Debit Cards', 'Net Banking', 'UPI', 'Wallet'],
          show: true
        },
        {
          method: 'Bank Transfer',
          icon: 'Building',
          description: 'Direct bank transfer to school account',
          options: ['NEFT', 'RTGS', 'IMPS'],
          show: true
        },
        {
          method: 'Cheque/DD',
          icon: 'Receipt',
          description: 'Payable to St. Columba\'s School',
          options: ['At par cheques only', 'Demand Draft'],
          show: true
        },
        {
          method: 'Cash Payment',
          icon: 'Banknote',
          description: 'In-person payment at accounts office',
          options: ['During office hours', 'Receipt provided immediately'],
          show: true
        }
      ],
      instructions: {
        show: true,
        title: "Secure Online Payment Instructions",
        steps: [
          "Visit our school portal and login to your account",
          "Navigate to the 'Fee Payment' section",
          "Select the term and verify the amount due",
          "Choose your preferred payment method",
          "Complete the secure payment process",
          "Download and save the payment receipt"
        ]
      }
    },
    scholarships: {
      show: true,
      title: "Scholarships & Financial Aid",
      description: "Financial support options for deserving students",
      scholarships: [
        { name: 'Academic Excellence Scholarship', discount: 'Up to 25%', criteria: '95%+ in previous final exams', show: true },
        { name: 'Sibling Discount', discount: '5%', criteria: 'For second child from same family', show: true },
        { name: 'Alumni Scholarship', discount: '10%', criteria: 'Children of St. Columba\'s alumni', show: true },
        { name: 'Sports Scholarship', discount: 'Up to 50%', criteria: 'State/National level sports achievements', show: true }
      ],
      cta: { text: "Download Financial Aid Form", show: true, href: "" },
      needBased: {
        show: true,
        title: "Need-Based Financial Assistance",
        description: "We offer limited need-based financial assistance for economically challenged families with academically outstanding students. Applications are reviewed confidentially on a case-by-case basis."
      }
    },
    faqs: {
      show: true,
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What is included in the tuition fee?",
          answer: "Tuition fee covers regular academic instruction, use of laboratory facilities, library access, and basic stationery. It does not include transportation, meals, uniforms, or special activities.",
          show: true
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, all fees are clearly communicated upfront. Additional charges only apply for optional services like transportation, meals, and specific extracurricular activities that parents choose to enroll their children in.",
          show: true
        },
        {
          question: "What is the development fee used for?",
          answer: "The development fee is used for infrastructure maintenance, technology upgrades, facility improvements, and campus development projects that benefit all students.",
          show: true
        },
        {
          question: "Can fees be paid in installments?",
          answer: "Yes, we offer quarterly payment options. The annual fee is divided into three terms with due dates in April, August, and December.",
          show: true
        },
        {
          question: "What is the policy for late fee payment?",
          answer: "A late fee of ₹100 per day is applicable after the due date. After 15 days, students may not be permitted to attend classes until fees are cleared.",
          show: true
        },
        {
          question: "Are fees refundable if a student withdraws?",
          answer: "Tuition fees are refundable on a pro-rata basis. Development and annual charges are non-refundable once the academic term has begun.",
          show: true
        }
      ]
    },
    contact: {
      show: true,
      title: "Accounts Office Contact",
      info: [
        { icon: "Mail", content: "accounts@stcolumbas.edu.in", show: true },
        { icon: "Phone", content: "011-2336-3462 (Ext. 120)", show: true },
        { icon: "Clock", content: "Monday-Friday: 9:00 AM - 4:00 PM", show: true },
        { icon: "HelpCircle", content: "Saturday: 9:00 AM - 12:00 PM (Fee related queries only)", show: true }
      ],
      resources: [
        { label: "Download Fee Structure PDF", icon: "Download", href: "", show: true },
        { label: "Payment Receipt Download", icon: "Receipt", href: "", show: true },
        { label: "Fee Payment Policy", icon: "FileText", href: "", show: true }
      ]
    },
    layout: {
      showHero: true,
      showFeeStructure: true,
      showAdditionalCharges: true,
      showPaymentSchedule: true,
      showPaymentMethods: true,
      showScholarships: true,
      showFaqs: true,
      showContact: true
    }
  };

  // Icon mapping
  const iconMap = {
    CreditCard,
    Download,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Receipt,
    FileText,
    Banknote,
    Wallet,
    QrCode,
    Building,
    Mail,
    Phone,
    HelpCircle,
    PieChart,
    IndianRupee,
    ArrowRight,
    ExternalLink,
    FileSpreadsheet,
    Percent,
    Shield,
    BadgeIndianRupee,
    Settings
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    feeStructure: 'showFeeStructure',
    additionalCharges: 'showAdditionalCharges',
    paymentSchedule: 'showPaymentSchedule',
    paymentMethods: 'showPaymentMethods',
    scholarships: 'showScholarships',
    faqs: 'showFaqs',
    contact: 'showContact'
  };

  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showFeeStructure', label: 'Fee Structure' },
    { key: 'showAdditionalCharges', label: 'Additional Charges' },
    { key: 'showPaymentSchedule', label: 'Payment Schedule' },
    { key: 'showPaymentMethods', label: 'Payment Methods' },
    { key: 'showScholarships', label: 'Scholarships' },
    { key: 'showFaqs', label: 'FAQs' },
    { key: 'showContact', label: 'Contact' }
  ];

  // Initialize data
  const [data, setData] = useState(defaultData);
  const [selectedGrade, setSelectedGrade] = useState('primary');
  const [selectedTerm, setSelectedTerm] = useState('term1');
  const [openFaq, setOpenFaq] = useState(null);

  // Safe access
  const safeData = (key) => data[key] || {};

  // Render icon
  const renderIcon = (iconName, className = "h-6 w-6 text-green-600") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
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
        const res = await apiRequest('save_data/get_all_fees_data', {});
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

  // IntersectionObserver
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

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    const layoutKey = layoutMap[section];
    let sectionData = { 
      showSection: data.layout[layoutKey],
      ...data[section]
    };
    setEditData(sectionData);
    setOriginalData(JSON.parse(JSON.stringify(sectionData)));
  };

  // Handle changes
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCtaChange = (ctaField, field, value) => {
    setEditData(prev => ({
      ...prev,
      [ctaField]: { ...prev[ctaField], [field]: value }
    }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
      return updated;
    });
  };

  const handleGradeChange = (gradeKey, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.gradeLevels[gradeKey] = { ...updated.gradeLevels[gradeKey], [field]: value };
      return updated;
    });
  };

  const handleOptionsChange = (methodIndex, optIndex, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const options = [...updated.methods[methodIndex].options];
      options[optIndex] = value;
      updated.methods[methodIndex].options = options;
      return updated;
    });
  };

  const handleStepsChange = (index, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const steps = [...updated.instructions.steps];
      steps[index] = value;
      updated.instructions.steps = steps;
      return updated;
    });
  };

  const handleInfoChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.info[index] = { ...updated.info[index], [field]: value };
      return updated;
    });
  };

  const handleResourceChange = (index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      updated.resources[index] = { ...updated.resources[index], [field]: value };
      return updated;
    });
  };

  const handleSubObjectChange = (subKey, field, value) => {
    setEditData(prev => ({
      ...prev,
      [subKey]: { ...prev[subKey], [field]: value }
    }));
  };

  const handleSubObjectToggle = (subKey, value) => {
    setEditData(prev => ({
      ...prev,
      [subKey]: { ...prev[subKey], show: value }
    }));
  };

  // Toggle section
  const handleToggleSection = (value) => {
    setEditData({ ...editData, showSection: value });
  };

  // Save
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
        const save_data = await apiRequest('save_data/save_fees_data', { payload: encrypted });
        console.log(save_data);
        
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

  // Cancel
  const cancelChanges = () => {
    if (originalData) {
      setEditData(originalData);
    }
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Section Visibility modal handlers
  const openSectionVisibilityModal = () => {
    // initialize visibility state from current layout
    setSectionVisibility({ ...data.layout });
    setSectionVisibilityModal(true);
  };

  const saveSectionVisibility = async () => {
    try {
      const updatedData = { ...data };
      updatedData.layout = { ...updatedData.layout, ...sectionVisibility };

      const payload = {
        ...updatedData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_fees_data', { payload: encrypted });
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
    setSectionVisibilityModal(false);
  };

  const toggleSectionVisibility = (key) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [key]: prev?.[key] === false ? true : false };
      return next;
    });
    // update live layout so the page reflects changes immediately
    setData(prev => ({ ...prev, layout: { ...prev.layout, [key]: prev?.layout?.[key] === false ? true : false } }));
  };

  // Filters
  const filteredFeeCategories = safeData('feeStructure').feeCategories?.filter(cat => cat.show !== false) || [];
  const filteredGradeLevels = Object.entries(safeData('feeStructure').gradeLevels || {}).filter(([key, level]) => level.show !== false);
  const filteredCharges = safeData('additionalCharges').charges?.filter(c => c.show !== false) || [];
  const filteredTerms = safeData('paymentSchedule').terms?.filter(t => t.show !== false) || [];
  const filteredMethods = safeData('paymentMethods').methods?.filter(m => m.show !== false) || [];
  const filteredScholarships = safeData('scholarships').scholarships?.filter(s => s.show !== false) || [];
  const filteredFaqItems = safeData('faqs').items?.filter(i => i.show !== false) || [];
  const filteredInfo = safeData('contact').info?.filter(i => i.show !== false) || [];
  const filteredResources = safeData('contact').resources?.filter(r => r.show !== false) || [];
  const latePolicy = safeData('paymentSchedule').latePolicy;
  const instructions = safeData('paymentMethods').instructions;
  const needBased = safeData('scholarships').needBased;

  // Calculate fees
  const calculateFees = () => {
    const gradeData = data.feeStructure?.gradeLevels?.[selectedGrade];
    if (!gradeData) return { term: 0, annual: 0 };

    const annualTotal = filteredFeeCategories.reduce((sum, cat) => {
      if (cat.id === 'tuition') return sum + (gradeData.tuition * 12);
      return sum + (gradeData[cat.id] || 0);
    }, 0);
    
    let termAmount = annualTotal;
    if (selectedTerm === 'term1') termAmount = annualTotal * 0.4;
    else if (selectedTerm === 'term2') termAmount = annualTotal * 0.3;
    else if (selectedTerm === 'term3') termAmount = annualTotal * 0.3;

    return {
      term: Math.round(termAmount),
      annual: Math.round(annualTotal)
    };
  };

  const estimatedFees = calculateFees();

  const PaymentMethodCard = ({ method }) => {
    const IconComponent = iconMap[method.icon];
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            {IconComponent ? <IconComponent className="h-6 w-6 text-green-600" /> : null}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{method.method}</h3>
        </div>
        <p className="text-gray-600 mb-4">{method.description}</p>
        <ul className="space-y-2">
          {method.options.map((option, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Modal Footer
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
          onClick={saveChanges}
          className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  // Reusable modal header (matches Council page)
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Reusable modal footer compatible with existing handlers
  const ModalFooterActions = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button onClick={onCancel} className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Cancel</button>
      <button onClick={onSave} className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">Save Changes</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit {editSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
              </div>
              <button onClick={cancelChanges} className="p-2 text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input type="text" value={editData.height || ''} onChange={(e) => handleObjectChange('height', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Primary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input type="text" value={editData.primaryCta?.text || ''} onChange={(e) => handleCtaChange('primaryCta', 'text', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Href</label>
                    <input type="text" value={editData.primaryCta?.href || ''} onChange={(e) => handleCtaChange('primaryCta', 'href', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.primaryCta?.show !== false} onChange={(e) => handleCtaChange('primaryCta', 'show', e.target.checked)} />
                      <span>Show Primary CTA</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Secondary CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input type="text" value={editData.secondaryCta?.text || ''} onChange={(e) => handleCtaChange('secondaryCta', 'text', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">File</label>
                    <FileUpload currentUrl={editData.secondaryCta?.href || ''} onUploadSuccess={(url) => handleCtaChange('secondaryCta', 'href', url)} label="Upload Secondary CTA File" />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.secondaryCta?.show !== false} onChange={(e) => handleCtaChange('secondaryCta', 'show', e.target.checked)} />
                      <span>Show Secondary CTA</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'feeStructure' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Fee Structure</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Fee Categories</h3>
                  {(editData.feeCategories || []).map((cat, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Category {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">ID</label>
                          <input type="text" value={cat.id || ''} onChange={(e) => handleArrayChange('feeCategories', index, 'id', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={cat.name || ''} onChange={(e) => handleArrayChange('feeCategories', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={cat.description || ''} onChange={(e) => handleArrayChange('feeCategories', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={cat.show !== false} onChange={(e) => handleArrayChange('feeCategories', index, 'show', e.target.checked)} />
                            <span>Show Category</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Grade Levels</h3>
                  {Object.entries(editData.gradeLevels || {}).map(([key, level]) => (
                    <div key={key} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Grade {key}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Label</label>
                          <input type="text" value={level.label || ''} onChange={(e) => handleGradeChange(key, 'label', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        {(editData.feeCategories || []).map((cat) => (
                          <div key={cat.id}>
                            <label className="block text-sm font-medium">{cat.name}</label>
                            <input type="number" value={level[cat.id] || 0} onChange={(e) => handleGradeChange(key, cat.id, parseInt(e.target.value))} className="w-full p-2 border rounded" />
                          </div>
                        ))}
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={level.show !== false} onChange={(e) => handleGradeChange(key, 'show', e.target.checked)} />
                            <span>Show Grade</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'additionalCharges' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Additional Charges</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Charges</h3>
                  {(editData.charges || []).map((charge, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Charge {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={charge.name || ''} onChange={(e) => handleArrayChange('charges', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Amount</label>
                          <input type="text" value={charge.amount || ''} onChange={(e) => handleArrayChange('charges', index, 'amount', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={charge.description || ''} onChange={(e) => handleArrayChange('charges', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={charge.show !== false} onChange={(e) => handleArrayChange('charges', index, 'show', e.target.checked)} />
                            <span>Show Charge</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'paymentSchedule' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Payment Schedule</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Terms</h3>
                  {(editData.terms || []).map((term, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Term {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Term</label>
                          <input type="text" value={term.term || ''} onChange={(e) => handleArrayChange('terms', index, 'term', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Due Date</label>
                          <input type="text" value={term.dueDate || ''} onChange={(e) => handleArrayChange('terms', index, 'dueDate', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Amount</label>
                          <input type="text" value={term.amount || ''} onChange={(e) => handleArrayChange('terms', index, 'amount', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Status</label>
                          <input type="text" value={term.status || ''} onChange={(e) => handleArrayChange('terms', index, 'status', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={term.show !== false} onChange={(e) => handleArrayChange('terms', index, 'show', e.target.checked)} />
                            <span>Show Term</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Late Payment Policy</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="space-y-2">
                      <div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={editData.latePolicy?.show !== false} onChange={(e) => handleSubObjectToggle('latePolicy', e.target.checked)} />
                          <span>Show Late Policy</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" value={editData.latePolicy?.title || ''} onChange={(e) => handleSubObjectChange('latePolicy', 'title', e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea value={editData.latePolicy?.description || ''} onChange={(e) => handleSubObjectChange('latePolicy', 'description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'paymentMethods' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Payment Methods</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Methods</h3>
                  {(editData.methods || []).map((method, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Method {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Method</label>
                          <input type="text" value={method.method || ''} onChange={(e) => handleArrayChange('methods', index, 'method', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Icon</label>
                          <input type="text" value={method.icon || ''} onChange={(e) => handleArrayChange('methods', index, 'icon', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Description</label>
                          <textarea value={method.description || ''} onChange={(e) => handleArrayChange('methods', index, 'description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                        </div>
                        <h5 className="text-sm font-medium mt-2 mb-1">Options</h5>
                        {(method.options || []).map((opt, oIndex) => (
                          <input key={oIndex} type="text" value={opt || ''} onChange={(e) => handleOptionsChange(index, oIndex, e.target.value)} className="w-full p-2 border rounded mb-1" />
                        ))}
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={method.show !== false} onChange={(e) => handleArrayChange('methods', index, 'show', e.target.checked)} />
                            <span>Show Method</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Instructions</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="space-y-2">
                      <div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={editData.instructions?.show !== false} onChange={(e) => handleSubObjectToggle('instructions', e.target.checked)} />
                          <span>Show Instructions</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" value={editData.instructions?.title || ''} onChange={(e) => handleSubObjectChange('instructions', 'title', e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                      <h5 className="text-sm font-medium mt-2 mb-1">Steps</h5>
                      {(editData.instructions?.steps || []).map((step, sIndex) => (
                        <textarea key={sIndex} value={step || ''} onChange={(e) => handleStepsChange(sIndex, e.target.value)} className="w-full p-2 border rounded mb-1" rows="2" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'scholarships' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Scholarships</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={editData.description || ''} onChange={(e) => handleObjectChange('description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Scholarships</h3>
                  {(editData.scholarships || []).map((sch, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">Scholarship {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Name</label>
                          <input type="text" value={sch.name || ''} onChange={(e) => handleArrayChange('scholarships', index, 'name', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Discount</label>
                          <input type="text" value={sch.discount || ''} onChange={(e) => handleArrayChange('scholarships', index, 'discount', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Criteria</label>
                          <textarea value={sch.criteria || ''} onChange={(e) => handleArrayChange('scholarships', index, 'criteria', e.target.value)} className="w-full p-2 border rounded" rows="2" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={sch.show !== false} onChange={(e) => handleArrayChange('scholarships', index, 'show', e.target.checked)} />
                            <span>Show Scholarship</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Financial Aid CTA</h3>
                  <div>
                    <label className="block text-sm font-medium">Text</label>
                    <input type="text" value={editData.cta?.text || ''} onChange={(e) => handleCtaChange('cta', 'text', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">File</label>
                    <FileUpload currentUrl={editData.cta?.href || ''} onUploadSuccess={(url) => handleCtaChange('cta', 'href', url)} label="Upload Financial Aid Form" />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.cta?.show !== false} onChange={(e) => handleCtaChange('cta', 'show', e.target.checked)} />
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Need-Based Financial Assistance</h3>
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="space-y-2">
                      <div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={editData.needBased?.show !== false} onChange={(e) => handleSubObjectToggle('needBased', e.target.checked)} />
                          <span>Show Need-Based</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input type="text" value={editData.needBased?.title || ''} onChange={(e) => handleSubObjectChange('needBased', 'title', e.target.value)} className="w-full p-2 border rounded" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea value={editData.needBased?.description || ''} onChange={(e) => handleSubObjectChange('needBased', 'description', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'faqs' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show FAQs</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">FAQ Items</h3>
                  {(editData.items || []).map((faq, index) => (
                    <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <h4 className="text-md font-semibold mb-2">FAQ {index + 1}</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium">Question</label>
                          <input type="text" value={faq.question || ''} onChange={(e) => handleArrayChange('items', index, 'question', e.target.value)} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium">Answer</label>
                          <textarea value={faq.answer || ''} onChange={(e) => handleArrayChange('items', index, 'answer', e.target.value)} className="w-full p-2 border rounded" rows="3" />
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" checked={faq.show !== false} onChange={(e) => handleArrayChange('items', index, 'show', e.target.checked)} />
                            <span>Show FAQ</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'contact' && (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Section Visibility</h3>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleToggleSection(e.target.checked)} />
                      <span>Show Contact</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input type="text" value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Info</h3>
                  {(editData.info || []).map((info, index) => (
                    <div key={index} className="mb-4 border border-gray-300 rounded p-3">
                      <h5 className="text-sm font-medium mb-2">Info {index + 1}</h5>
                      <div>
                        <label className="block text-sm font-medium">Icon</label>
                        <input type="text" value={info.icon || ''} onChange={(e) => handleInfoChange(index, 'icon', e.target.value)} className="w-full p-2 border rounded mb-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Content</label>
                        <input type="text" value={info.content || ''} onChange={(e) => handleInfoChange(index, 'content', e.target.value)} className="w-full p-2 border rounded mb-2" />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={info.show !== false} onChange={(e) => handleInfoChange(index, 'show', e.target.checked)} />
                          <span>Show Info</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Resources</h3>
                  {(editData.resources || []).map((res, index) => (
                    <div key={index} className="mb-4 border border-gray-300 rounded p-3">
                      <h5 className="text-sm font-medium mb-2">Resource {index + 1}</h5>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input type="text" value={res.label || ''} onChange={(e) => handleResourceChange(index, 'label', e.target.value)} className="w-full p-2 border rounded mb-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Icon</label>
                        <input type="text" value={res.icon || ''} onChange={(e) => handleResourceChange(index, 'icon', e.target.value)} className="w-full p-2 border rounded mb-2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">File</label>
                        <FileUpload currentUrl={res.href || ''} onUploadSuccess={(url) => handleResourceChange(index, 'href', url)} label="Upload Resource File" />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" checked={res.show !== false} onChange={(e) => handleResourceChange(index, 'show', e.target.checked)} />
                          <span>Show Resource</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Section Visibility Modal */}
      {sectionVisibilityModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[70vh]">
              {sectionDisplay.map(section => (
                <div key={section.key} className="flex items-center justify-between border p-3 rounded">
                  <div className="flex items-center space-x-3">
                    {sectionVisibility[section.key] !== false ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                    <div>
                      <div className="font-medium">{section.label}</div>
                      <div className="text-sm text-gray-500">Toggle visibility for this section</div>
                    </div>
                  </div>
                  <button onClick={() => toggleSectionVisibility(section.key)} className={`relative inline-flex items-center h-6 w-11 rounded-full ${sectionVisibility[section.key] !== false ? 'bg-green-600' : 'bg-gray-300'}`}>
                    <span className={`bg-white w-4 h-4 rounded-full transform transition ${sectionVisibility[section.key] !== false ? 'translate-x-5' : 'translate-x-1'}`}></span>
                  </button>
                </div>
              ))}
            </div>
            <ModalFooterActions onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.layout?.showHero && safeData('hero').show && (
        <section 
          id="hero"
          className={`relative ${safeData('hero').height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <BadgeIndianRupee className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Financial Information</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{safeData('hero').title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{safeData('hero').subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {safeData('hero').primaryCta?.show && (
                  <a href={safeData('hero').primaryCta.href} className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105">
                    {safeData('hero').primaryCta.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                )}
                {safeData('hero').secondaryCta?.show && safeData('hero').secondaryCta.href && (
                  <a href={safeData('hero').secondaryCta.href} download className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                    {safeData('hero').secondaryCta.text}
                    <Download className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fee Structure */}
        {data.layout?.showFeeStructure && safeData('feeStructure').show && (
          <section id="feeStructure" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{safeData('feeStructure').title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{safeData('feeStructure').description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade Level</label>
                <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  {filteredGradeLevels.map(([key, level]) => <option key={key} value={key}>{level.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Term</label>
                <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="term1">Term I (40%)</option>
                  <option value="term2">Term II (30%)</option>
                  <option value="term3">Term III (30%)</option>
                  <option value="annual">Full Annual Payment</option>
                </select>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Estimated {selectedTerm === 'annual' ? 'Annual' : 'Term'} Fee:</span>
                <span className="text-2xl font-bold text-green-600">₹{estimatedFees.term.toLocaleString()}</span>
              </div>
              {selectedTerm !== 'annual' && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Annual Total:</span>
                  <span>₹{estimatedFees.annual.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Grade</th>
                    {filteredFeeCategories.map(category => (
                      <th key={category.id} className="px-4 py-3 text-center font-semibold text-gray-800">{category.name}</th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold text-gray-800">Annual Total*</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGradeLevels.map(([key, level]) => {
                    const annualTotal = filteredFeeCategories.reduce((sum, cat) => {
                      if (cat.id === 'tuition') return sum + (level.tuition * 12);
                      return sum + (level[cat.id] || 0);
                    }, 0);
                    return (
                      <tr key={key} className={key === selectedGrade ? 'bg-green-50' : 'even:bg-gray-50'}>
                        <td className="px-4 py-3 font-medium text-gray-800">{level.label}</td>
                        {filteredFeeCategories.map(category => (
                          <td key={category.id} className="px-4 py-3 text-center text-gray-700">
                            ₹{level[category.id]?.toLocaleString() || 0}
                            {category.id === 'tuition' && '/mo'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center font-semibold text-green-600">₹{annualTotal.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Excluding additional optional charges</p>
            {editMode && <button onClick={() => openEditModal('feeStructure')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}
        {/* Global edit button to manage visibility (matches Council page) */}
        {editMode && (
          <button onClick={openSectionVisibilityModal} className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50">
            <Edit className="h-5 w-5" />
          </button>
        )}

        {/* Additional Charges */}
        {data.layout?.showAdditionalCharges && safeData('additionalCharges').show && filteredCharges.length > 0 && (
          <section id="additionalCharges" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{safeData('additionalCharges').title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCharges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-800">{charge.name}</h4>
                    <p className="text-sm text-gray-600">{charge.description}</p>
                  </div>
                  <span className="text-green-600 font-semibold whitespace-nowrap">{charge.amount}</span>
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('additionalCharges')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}

        {/* Payment Schedule */}
        {data.layout?.showPaymentSchedule && safeData('paymentSchedule').show && (
          <section id="paymentSchedule" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{safeData('paymentSchedule').title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Term</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Due Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTerms.map((term, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{term.term}</td>
                      <td className="px-4 py-3 text-gray-700">{term.dueDate}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">{term.amount}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {term.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {latePolicy?.show && (
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">{latePolicy.title}</h4>
                    <p className="text-yellow-700 text-sm mt-1">{latePolicy.description}</p>
                  </div>
                </div>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('paymentSchedule')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}

        {/* Payment Methods */}
        {data.layout?.showPaymentMethods && safeData('paymentMethods').show && (
          <section id="paymentMethods" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{safeData('paymentMethods').title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredMethods.map((method, index) => <PaymentMethodCard key={index} method={method} />)}
            </div>
            {instructions?.show && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-800">{instructions.title}</h3>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                  {instructions.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pay Fees Online
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('paymentMethods')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}

        {/* Scholarships */}
        {data.layout?.showScholarships && safeData('scholarships').show && (
          <section id="scholarships" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{safeData('scholarships').title}</h2>
              <Percent className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-gray-600 mb-6">{safeData('scholarships').description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredScholarships.map((scholarship, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{scholarship.name}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{scholarship.discount}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{scholarship.criteria}</p>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></button>
                </div>
              ))}
            </div>
            {needBased?.show && (
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{needBased.title}</h3>
                <p className="text-gray-700 mb-4">{needBased.description}</p>
                {safeData('scholarships').cta?.show && safeData('scholarships').cta.href && (
                  <a href={safeData('scholarships').cta.href} download className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    {safeData('scholarships').cta.text}
                  </a>
                )}
              </div>
            )}
            {editMode && <button onClick={() => openEditModal('scholarships')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}

        {/* FAQs */}
        {data.layout?.showFaqs && safeData('faqs').show && (
          <section id="faqs" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{safeData('faqs').title}</h2>
            <div className="space-y-4">
              {filteredFaqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {openFaq === index ? <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" /> : <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />}
                  </button>
                  {openFaq === index && <div className="p-4 bg-gray-50 border-t border-gray-200"><p className="text-gray-700 leading-relaxed">{faq.answer}</p></div>}
                </div>
              ))}
            </div>
            {editMode && <button onClick={() => openEditModal('faqs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}

        {/* Contact */}
        {data.layout?.showContact && safeData('contact').show && (
          <section id="contact" className="bg-white rounded-lg shadow-sm p-6 relative animate-on-scroll">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{safeData('contact').title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {filteredInfo.map((info, index) => {
                    const IconComponent = iconMap[info.icon];
                    return (
                      <div key={index} className="flex items-center">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          {IconComponent ? <IconComponent className="h-5 w-5 text-green-600" /> : null}
                        </div>
                        <span className="text-gray-700">{info.content}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Resources</h3>
                <div className="space-y-3">
                  {filteredResources.map((resource, index) => {
                    const IconComponent = iconMap[resource.icon];
                    return (
                      <a key={index} href={resource.href} download className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <span className="text-gray-700 group-hover:text-green-600 transition-colors">{resource.label}</span>
                        {IconComponent ? <IconComponent className="h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors" /> : null}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            {editMode && <button onClick={() => openEditModal('contact')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </section>
        )}
      </div>
    </div>
  );
};

export default FeesPage;