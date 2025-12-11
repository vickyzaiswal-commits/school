"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Award,
  Heart,
  Shield,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  AlertCircle,
  GraduationCap,
  School,
  BookKey,
  Eye,
  EyeOff,
  ArrowRight,
  Settings,
  Edit,
  Ban,
  Send
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import { encryptObject, decryptObject } from '@/utils/encryption';

const ApplicationFormPage = ({ schoolData = {} }) => {
  // All useState calls FIRST, unconditionally
  const [currentStep, setCurrentStep] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [config, setConfig] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    bloodGroup: '',
    
    // Contact Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    
    // Parent Information
    fatherName: '',
    fatherOccupation: '',
    fatherQualification: '',
    fatherPhone: '',
    fatherEmail: '',
    
    motherName: '',
    motherOccupation: '',
    motherQualification: '',
    motherPhone: '',
    motherEmail: '',
    
    // Academic Information
    applyingForClass: '',
    currentSchool: '',
    lastClass: '',
    lastPercentage: '',
    board: '',
    
    // Documents
    birthCertificate: null,
    aadhaarCard: null,
    photograph: null,
    previousMarksheet: null,
    transferCertificate: null,
    
    // Declaration
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [role, setRole] = useState(null);

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
  
  // Default configuration with all fields enabled
  const defaultConfig = {
    // Hero Section
    hero: {
      show: true,
      title: "Admission Application",
      subtitle: "Join the St. Columba's family - Begin your journey to excellence",
      height: "h-96",
      cta: "Start Application",
      ctaIcon: ArrowRight,
      ctaLink: "#"
    },
    // Help Section
    helpSection: {
      show: true,
      title: {
        show: true,
        value: "Need Help?"
      },
      contact: {
        show: true,
        title: {
          show: true,
          value: "Contact Admission Office"
        },
        email: {
          show: true,
          value: "admissions@stcolumbas.edu.in"
        },
        phone: {
          show: true,
          value: "011-2336-3462 (Ext. 110)"
        }
      },
      officeHours: {
        show: true,
        title: {
          show: true,
          value: "Office Hours"
        },
        mondayFriday: {
          show: true,
          value: "Monday-Friday: 9:00 AM - 4:00 PM"
        },
        saturday: {
          show: true,
          value: "Saturday: 9:00 AM - 12:00 PM"
        }
      }
    },
    // Student Information
    firstName: { show: true, required: true, label: 'First Name' },
    lastName: { show: true, required: true, label: 'Last Name' },
    dateOfBirth: { show: true, required: true, label: 'Date of Birth' },
    gender: { show: true, required: true, label: 'Gender' },
    nationality: { show: true, required: true, label: 'Nationality' },
    bloodGroup: { show: true, required: false, label: 'Blood Group' },
    
    // Contact Information
    address: { show: true, required: true, label: 'Address' },
    city: { show: true, required: true, label: 'City' },
    state: { show: true, required: true, label: 'State' },
    pincode: { show: true, required: true, label: 'Pincode' },
    phone: { show: true, required: true, label: 'Phone Number' },
    email: { show: true, required: true, label: 'Email Address' },
    
    // Parent Information
    fatherName: { show: true, required: true, label: "Father's Name" },
    fatherOccupation: { show: true, required: false, label: "Father's Occupation" },
    fatherQualification: { show: true, required: false, label: "Father's Qualification" },
    fatherPhone: { show: true, required: false, label: "Father's Phone" },
    fatherEmail: { show: true, required: false, label: "Father's Email" },
    
    motherName: { show: true, required: true, label: "Mother's Name" },
    motherOccupation: { show: true, required: false, label: "Mother's Occupation" },
    motherQualification: { show: true, required: false, label: "Mother's Qualification" },
    motherPhone: { show: true, required: false, label: "Mother's Phone" },
    motherEmail: { show: true, required: false, label: "Mother's Email" },
    
    // Academic Information
    applyingForClass: { show: true, required: true, label: 'Applying for Class' },
    currentSchool: { show: true, required: true, label: 'Current/Previous School' },
    lastClass: { show: true, required: false, label: 'Last Class Completed' },
    lastPercentage: { show: true, required: false, label: 'Percentage/CGPA in Last Class' },
    board: { show: true, required: false, label: 'Board/Curriculum' },
    
    // Documents
    birthCertificate: { show: true, required: true, label: 'Birth Certificate' },
    aadhaarCard: { show: true, required: true, label: 'Aadhaar Card' },
    photograph: { show: true, required: true, label: 'Passport Size Photograph' },
    previousMarksheet: { show: true, required: false, label: 'Previous Year Marksheet' },
    transferCertificate: { show: true, required: false, label: 'Transfer Certificate' },
    
    // Steps configuration
    showStudentInfo: true,
    showContactDetails: true,
    showParentInfo: true,
    showAcademicInfo: true,
    showDocuments: true,
    showReview: true,
    
    // Custom labels
    stepTitles: {
      studentInfo: 'Student Information',
      contactDetails: 'Contact Details',
      parentInfo: 'Parent Information',
      academicInfo: 'Academic History',
      documents: 'Documents Upload',
      review: 'Review & Submit'
    }
  };

  // Field groups for editing
  const fieldGroups = {
    student: {
      title: 'Student Information Fields',
      fields: ['firstName', 'lastName', 'dateOfBirth', 'gender', 'nationality', 'bloodGroup']
    },
    contact: {
      title: 'Contact Details Fields',
      fields: ['address', 'city', 'state', 'pincode', 'phone', 'email']
    },
    parent: {
      title: 'Parent Information Fields',
      fields: ['fatherName', 'fatherOccupation', 'fatherQualification', 'fatherPhone', 'fatherEmail', 'motherName', 'motherOccupation', 'motherQualification', 'motherPhone', 'motherEmail']
    },
    academic: {
      title: 'Academic Information Fields',
      fields: ['applyingForClass', 'currentSchool', 'lastClass', 'lastPercentage', 'board']
    },
    documents: {
      title: 'Document Upload Fields',
      fields: ['birthCertificate', 'aadhaarCard', 'photograph', 'previousMarksheet', 'transferCertificate']
    }
  };

  const stepKeys = ['showStudentInfo', 'showContactDetails', 'showParentInfo', 'showAcademicInfo', 'showDocuments', 'showReview'];

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_application_forms', {});
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
          setConfig({ ...defaultConfig, ...fetchedData, ...schoolData });
        } else {
          console.log('No data or invalid response, using default');
          setConfig({ ...defaultConfig, ...schoolData });
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setConfig({ ...defaultConfig, ...schoolData });
      }
    };

    fetchData();
  }, []);

  // Early return AFTER all hooks
  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }

  // Open edit modal
  const openEdit = () => {
    if (!config) return;
    setEditData({ ...config });
    setOriginalData(JSON.parse(JSON.stringify(config)));
    setEditFormOpen(true);
  };

  // Handle field change
  const handleFieldChange = (field, prop, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [prop]: value
      }
    }));
  };

  // Handle step visibility change
  const handleStepChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle step title change
  const handleStepTitleChange = (key, value) => {
    setEditData(prev => ({
      ...prev,
      stepTitles: {
        ...prev.stepTitles,
        [key]: value
      }
    }));
  };

  // Handle hero change
  const handleHeroChange = (prop, value) => {
    setEditData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [prop]: value
      }
    }));
  };

  // Helper to update help section nested values
  const updateHelpSection = (path, value, isShow = false) => {
    setEditData(prev => {
      const newHelp = { ...prev.helpSection || {} };
      let current = newHelp;
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        if (current[key] === undefined) {
          current[key] = {};
        }
        current = current[key];
      }
      const lastKey = path[path.length - 1];
      current[lastKey] = value;
      return {
        ...prev,
        helpSection: newHelp
      };
    });
  };

  // Cancel changes
  const cancelChanges = () => {
    if (originalData) {
      setEditData(originalData);
    }
    setEditFormOpen(false);
    setOriginalData(null);
  };

  // Save changes
  const saveChanges = async () => {
    try {
      const payload = {
        ...editData,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'admin',
        version: '1.0'
      };

      console.log('Payload:', JSON.stringify(payload, null, 2));
      try {
        const encrypted = await encryptObject(payload);
        const save_data = await apiRequest('save_data/save_application_form', { payload: encrypted });
        console.log(save_data);
        if (save_data.status === 200) {
          setConfig(editData);
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

  // Section visibility helpers
  const sectionDisplayNames = {
    showStudentInfo: 'Student Information Step',
    showContactDetails: 'Contact Details Step',
    showParentInfo: 'Parent Information Step',
    showAcademicInfo: 'Academic Information Step',
    showDocuments: 'Documents Upload Step',
    showReview: 'Review & Submit Step',
    'helpSection.show': 'Help Section'
  };

  const getConfigValue = (key) => {
    if (!config) return false;
    if (key.includes('.')) {
      const parts = key.split('.');
      let cur = config;
      for (const p of parts) {
        if (cur === undefined || cur === null) return false;
        cur = cur[p];
      }
      return cur;
    }
    return config[key];
  };

  const toggleSectionVisibility = (key) => {
    if (!config) return;
    if (key.includes('.')) {
      const parts = key.split('.');
      setConfig(prev => {
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
    } else {
      setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const saveSectionVisibility = async () => {
    try {
      // attempt to persist visibility changes if api exists
      if (typeof apiRequest === 'function') {
        const payload = { ...config, lastUpdated: new Date().toISOString(), updatedBy: 'admin' };
        try {
          const encrypted = await encryptObject(payload);
          await apiRequest('save_data/save_application_form', { payload: encrypted });
        } catch (err) {
          console.error('Save/Encryption error', err);
        }
      }
    } catch (error) {
      console.error('Error saving visibility settings', error);
    }
    setSectionVisibilityModal(false);
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
          onClick={saveChanges}
          className="px-3 py-2 text-sm text-white bg-green-600 border border-green-700 rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
        >
          <Send className="h-4 w-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: config.stepTitles.studentInfo, icon: User, show: config.showStudentInfo },
    { number: 2, title: config.stepTitles.contactDetails, icon: MapPin, show: config.showContactDetails },
    { number: 3, title: config.stepTitles.parentInfo, icon: Users, show: config.showParentInfo },
    { number: 4, title: config.stepTitles.academicInfo, icon: BookOpen, show: config.showAcademicInfo },
    { number: 5, title: config.stepTitles.documents, icon: Upload, show: config.showDocuments },
    { number: 6, title: config.stepTitles.review, icon: CheckCircle, show: config.showReview }
  ].filter(step => step.show);

  const classOptions = [
    'Nursery', 'Kindergarten', 'Class I', 'Class II', 'Class III', 
    'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII',
    'Class IX', 'Class X', 'Class XI (Science)', 'Class XI (Commerce)', 'Class XI (Humanities)',
    'Class XII (Science)', 'Class XII (Commerce)', 'Class XII (Humanities)'
  ];

  const boardOptions = [
    'CBSE', 'ICSE', 'State Board', 'IGCSE', 'IB', 'Other'
  ];

  const bloodGroupOptions = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));

    if (type === 'file' && files[0]) {
      setUploadedFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const removeFile = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: null
    }));
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[name];
      return newFiles;
    });
  };

  // Validate all required fields across all steps
  const validateAll = () => {
    const newErrors = {};

    // Student Info
    if (config.showStudentInfo) {
      if (config.firstName.show && config.firstName.required && !formData.firstName) 
        newErrors.firstName = `${config.firstName.label} is required`;
      if (config.lastName.show && config.lastName.required && !formData.lastName) 
        newErrors.lastName = `${config.lastName.label} is required`;
      if (config.dateOfBirth.show && config.dateOfBirth.required && !formData.dateOfBirth) 
        newErrors.dateOfBirth = `${config.dateOfBirth.label} is required`;
      if (config.gender.show && config.gender.required && !formData.gender) 
        newErrors.gender = `${config.gender.label} is required`;
      if (config.nationality.show && config.nationality.required && !formData.nationality) 
        newErrors.nationality = `${config.nationality.label} is required`;
    }

    // Contact Details
    if (config.showContactDetails) {
      if (config.address.show && config.address.required && !formData.address) 
        newErrors.address = `${config.address.label} is required`;
      if (config.city.show && config.city.required && !formData.city) 
        newErrors.city = `${config.city.label} is required`;
      if (config.state.show && config.state.required && !formData.state) 
        newErrors.state = `${config.state.label} is required`;
      if (config.pincode.show && config.pincode.required && !formData.pincode) 
        newErrors.pincode = `${config.pincode.label} is required`;
      if (config.phone.show && config.phone.required && !formData.phone) 
        newErrors.phone = `${config.phone.label} is required`;
      if (config.email.show && config.email.required && !formData.email) 
        newErrors.email = `${config.email.label} is required`;
    }

    // Parent Info
    if (config.showParentInfo) {
      if (config.fatherName.show && config.fatherName.required && !formData.fatherName) 
        newErrors.fatherName = `${config.fatherName.label} is required`;
      if (config.motherName.show && config.motherName.required && !formData.motherName) 
        newErrors.motherName = `${config.motherName.label} is required`;
    }

    // Academic Info
    if (config.showAcademicInfo) {
      if (config.applyingForClass.show && config.applyingForClass.required && !formData.applyingForClass) 
        newErrors.applyingForClass = `${config.applyingForClass.label} is required`;
      if (config.currentSchool.show && config.currentSchool.required && !formData.currentSchool) 
        newErrors.currentSchool = `${config.currentSchool.label} is required`;
    }

    // Documents
    if (config.showDocuments) {
      if (config.birthCertificate.show && config.birthCertificate.required && !formData.birthCertificate) 
        newErrors.birthCertificate = `${config.birthCertificate.label} is required`;
      if (config.aadhaarCard.show && config.aadhaarCard.required && !formData.aadhaarCard) 
        newErrors.aadhaarCard = `${config.aadhaarCard.label} is required`;
      if (config.photograph.show && config.photograph.required && !formData.photograph) 
        newErrors.photograph = `${config.photograph.label} is required`;
    }

    // Terms
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      // Submit form logic here
      alert('Application submitted successfully!');
      // Redirect or show success message
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Form validation and submission functions will be here

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        if (!config.showStudentInfo) return nextStep();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.studentInfo}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.firstName.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.firstName.label} {config.firstName.required && '*'}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
              )}

              {config.lastName.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.lastName.label} {config.lastName.required && '*'}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              )}

              {config.dateOfBirth.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.dateOfBirth.label} {config.dateOfBirth.required && '*'}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                </div>
              )}

              {config.gender.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.gender.label} {config.gender.required && '*'}
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
              )}

              {config.nationality.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.nationality.label} {config.nationality.required && '*'}
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.nationality ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                </div>
              )}

              {config.bloodGroup.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.bloodGroup.label} {config.bloodGroup.required && '*'}
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroupOptions.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        if (!config.showContactDetails) return nextStep();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.contactDetails}</h3>
            
            <div className="grid grid-cols-1 gap-6">
              {config.address.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.address.label} {config.address.required && '*'}
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {config.city.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.city.label} {config.city.required && '*'}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                )}

                {config.state.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.state.label} {config.state.required && '*'}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                )}

                {config.pincode.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.pincode.label} {config.pincode.required && '*'}
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.pincode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.phone.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.phone.label} {config.phone.required && '*'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                )}

                {config.email.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.email.label} {config.email.required && '*'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        if (!config.showParentInfo) return nextStep();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.parentInfo}</h3>
            
            {/* Father Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">Father's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.fatherName.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.fatherName.label} {config.fatherName.required && '*'}
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.fatherName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                  </div>
                )}

                {config.fatherOccupation.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.fatherOccupation.label}
                    </label>
                    <input
                      type="text"
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.fatherQualification.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.fatherQualification.label}
                    </label>
                    <input
                      type="text"
                      name="fatherQualification"
                      value={formData.fatherQualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.fatherPhone.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.fatherPhone.label}
                    </label>
                    <input
                      type="tel"
                      name="fatherPhone"
                      value={formData.fatherPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.fatherEmail.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.fatherEmail.label}
                    </label>
                    <input
                      type="email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Mother Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-800">Mother's Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.motherName.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.motherName.label} {config.motherName.required && '*'}
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.motherName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
                  </div>
                )}

                {config.motherOccupation.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.motherOccupation.label}
                    </label>
                    <input
                      type="text"
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.motherQualification.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.motherQualification.label}
                    </label>
                    <input
                      type="text"
                      name="motherQualification"
                      value={formData.motherQualification}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.motherPhone.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.motherPhone.label}
                    </label>
                    <input
                      type="tel"
                      name="motherPhone"
                      value={formData.motherPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {config.motherEmail.show && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {config.motherEmail.label}
                    </label>
                    <input
                      type="email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        if (!config.showAcademicInfo) return nextStep();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.academicInfo}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.applyingForClass.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.applyingForClass.label} {config.applyingForClass.required && '*'}
                  </label>
                  <select
                    name="applyingForClass"
                    value={formData.applyingForClass}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.applyingForClass ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Class</option>
                    {classOptions.map(className => (
                      <option key={className} value={className}>{className}</option>
                    ))}
                  </select>
                  {errors.applyingForClass && <p className="text-red-500 text-sm mt-1">{errors.applyingForClass}</p>}
                </div>
              )}

              {config.currentSchool.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.currentSchool.label} {config.currentSchool.required && '*'}
                  </label>
                  <input
                    type="text"
                    name="currentSchool"
                    value={formData.currentSchool}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.currentSchool ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.currentSchool && <p className="text-red-500 text-sm mt-1">{errors.currentSchool}</p>}
                </div>
              )}

              {config.lastClass.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.lastClass.label}
                  </label>
                  <input
                    type="text"
                    name="lastClass"
                    value={formData.lastClass}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}

              {config.lastPercentage.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.lastPercentage.label}
                  </label>
                  <input
                    type="text"
                    name="lastPercentage"
                    value={formData.lastPercentage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}

              {config.board.show && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {config.board.label}
                  </label>
                  <select
                    name="board"
                    value={formData.board}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Board</option>
                    {boardOptions.map(board => (
                      <option key={board} value={board}>{board}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        if (!config.showDocuments) return nextStep();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.documents}</h3>
            <p className="text-gray-600 mb-6">Please upload scanned copies of the following documents (PDF, JPG, or PNG, max 2MB each)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'birthCertificate', config: config.birthCertificate },
                { id: 'aadhaarCard', config: config.aadhaarCard },
                { id: 'photograph', config: config.photograph },
                { id: 'previousMarksheet', config: config.previousMarksheet },
                { id: 'transferCertificate', config: config.transferCertificate }
              ].filter(doc => doc.config.show).map((doc) => (
                <div key={doc.id} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id={doc.id}
                    name={doc.id}
                    onChange={handleInputChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor={doc.id} className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">{doc.config.label} {doc.config.required && '*'}</p>
                    <p className="text-xs text-gray-500 mt-1">Click to upload</p>
                  </label>
                  {uploadedFiles[doc.id] && (
                    <div className="mt-3 flex items-center justify-between bg-green-50 p-2 rounded">
                      <span className="text-sm text-green-700 truncate">{uploadedFiles[doc.id].name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(doc.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  {errors[doc.id] && <p className="text-red-500 text-sm mt-1">{errors[doc.id]}</p>}
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        if (!config.showReview) return handleSubmit();
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{config.stepTitles.review}</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Please review your information before submitting</h4>
              
              <div className="space-y-4">
                {config.showStudentInfo && (
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Student Information</h5>
                    {config.firstName.show && config.lastName.show && (
                      <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                    )}
                    {config.dateOfBirth.show && (
                      <p className="text-gray-600">DOB: {formData.dateOfBirth}</p>
                    )}
                    {config.gender.show && (
                      <p className="text-gray-600">Gender: {formData.gender}</p>
                    )}
                  </div>
                )}

                {config.showContactDetails && (
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Contact Details</h5>
                    {config.address.show && config.city.show && config.state.show && config.pincode.show && (
                      <p className="text-gray-600">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
                    )}
                    {config.phone.show && (
                      <p className="text-gray-600">Phone: {formData.phone}</p>
                    )}
                    {config.email.show && (
                      <p className="text-gray-600">Email: {formData.email}</p>
                    )}
                  </div>
                )}

                {config.showParentInfo && (
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Parent Information</h5>
                    {config.fatherName.show && (
                      <p className="text-gray-600">Father: {formData.fatherName}</p>
                    )}
                    {config.motherName.show && (
                      <p className="text-gray-600">Mother: {formData.motherName}</p>
                    )}
                  </div>
                )}

                {config.showAcademicInfo && (
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Academic Information</h5>
                    {config.applyingForClass.show && (
                      <p className="text-gray-600">Applying for: {formData.applyingForClass}</p>
                    )}
                    {config.currentSchool.show && (
                      <p className="text-gray-600">Current School: {formData.currentSchool}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Application Fee</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    A non-refundable application fee of ₹1,000 is required. You will be redirected to the payment gateway after submission.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1 mr-3"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                I hereby declare that all the information provided is true to the best of my knowledge. 
                I understand that any false information may lead to cancellation of admission.
              </label>
              {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-6xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold">Edit Application Form Configuration</h2>
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
              <div className="space-y-6">
                {/* Hero Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                  <div className="space-y-3">
                    <input
                      value={editData.hero?.title || ''}
                      onChange={(e) => handleHeroChange('title', e.target.value)}
                      placeholder="Hero Title"
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      value={editData.hero?.subtitle || ''}
                      onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                      placeholder="Hero Subtitle"
                      rows="3"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editData.hero?.cta || ''}
                      onChange={(e) => handleHeroChange('cta', e.target.value)}
                      placeholder="CTA Text"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editData.hero?.ctaLink || ''}
                      onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
                      placeholder="CTA Link"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      value={editData.hero?.height || ''}
                      onChange={(e) => handleHeroChange('height', e.target.value)}
                      placeholder="Height (e.g., h-96)"
                      className="w-full p-2 border rounded"
                    />
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.hero?.show || false}
                        onChange={(e) => handleHeroChange('show', e.target.checked)}
                      />
                      <span>Show Hero Section</span>
                    </label>
                  </div>
                </div>

                {/* Steps Visibility */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Steps Visibility</h3>
                  {stepKeys.map((key) => (
                    <label key={key} className="flex items-center space-x-2 mb-2 block">
                      <input
                        type="checkbox"
                        checked={editData[key] || false}
                        onChange={(e) => handleStepChange(key, e.target.checked)}
                      />
                      <span>{key.replace('show', '').replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>

                {/* Step Titles */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Step Titles</h3>
                  {Object.keys(defaultConfig.stepTitles).map((key) => (
                    <div key={key} className="flex items-center space-x-2 mb-2">
                      <span className="w-32 text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <input
                        value={editData.stepTitles?.[key] || ''}
                        onChange={(e) => handleStepTitleChange(key, e.target.value)}
                        className="flex-1 p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>

                {/* Field Groups */}
                {Object.entries(fieldGroups).map(([groupKey, group]) => (
                  <div key={groupKey} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
                    {group.fields.map((field) => (
                      <div key={field} className="flex items-center p-3 border rounded mb-2 space-x-4">
                        <span className="w-40 font-medium text-sm">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <input
                          value={editData[field]?.label || ''}
                          onChange={(e) => handleFieldChange(field, 'label', e.target.value)}
                          placeholder="Label"
                          className="flex-1 p-2 border rounded"
                        />
                        <label className="flex items-center space-x-1 text-sm">
                          <input
                            type="checkbox"
                            checked={editData[field]?.show || false}
                            onChange={(e) => handleFieldChange(field, 'show', e.target.checked)}
                          />
                          <span>Show</span>
                        </label>
                        <label className="flex items-center space-x-1 text-sm">
                          <input
                            type="checkbox"
                            checked={editData[field]?.required || false}
                            onChange={(e) => handleFieldChange(field, 'required', e.target.checked)}
                          />
                          <span>Required</span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Help Section */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Help Section</h3>
                  <label className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      checked={editData.helpSection?.show || false}
                      onChange={(e) => updateHelpSection(['show'], e.target.checked, true)}
                    />
                    <span>Show Help Section</span>
                  </label>
                  {editData.helpSection?.show && (
                    <div className="space-y-4 ml-4">
                      {/* Main Title */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={editData.helpSection?.title?.show || false}
                          onChange={(e) => updateHelpSection(['title', 'show'], e.target.checked, true)}
                        />
                        <input
                          value={editData.helpSection?.title?.value || ''}
                          onChange={(e) => updateHelpSection(['title', 'value'], e.target.value)}
                          placeholder="Help Title (e.g., Need Help?)"
                          className="flex-1 p-2 border rounded"
                        />
                      </div>

                      {/* Contact Section */}
                      <div className="p-4 border rounded">
                        <label className="flex items-center space-x-2 mb-2 block">
                          <input
                            type="checkbox"
                            checked={editData.helpSection?.contact?.show || false}
                            onChange={(e) => updateHelpSection(['contact', 'show'], e.target.checked, true)}
                          />
                          <span>Show Contact Section</span>
                        </label>
                        {editData.helpSection?.contact?.show && (
                          <div className="space-y-2 ml-4">
                            {/* Contact Title */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.contact?.title?.show || false}
                                onChange={(e) => updateHelpSection(['contact', 'title', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.contact?.title?.value || ''}
                                onChange={(e) => updateHelpSection(['contact', 'title', 'value'], e.target.value)}
                                placeholder="Contact Title (e.g., Contact Admission Office)"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                            {/* Email */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.contact?.email?.show || false}
                                onChange={(e) => updateHelpSection(['contact', 'email', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.contact?.email?.value || ''}
                                onChange={(e) => updateHelpSection(['contact', 'email', 'value'], e.target.value)}
                                placeholder="Email (e.g., admissions@stcolumbas.edu.in)"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                            {/* Phone */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.contact?.phone?.show || false}
                                onChange={(e) => updateHelpSection(['contact', 'phone', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.contact?.phone?.value || ''}
                                onChange={(e) => updateHelpSection(['contact', 'phone', 'value'], e.target.value)}
                                placeholder="Phone (e.g., 011-2336-3462 (Ext. 110))"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Office Hours Section */}
                      <div className="p-4 border rounded">
                        <label className="flex items-center space-x-2 mb-2 block">
                          <input
                            type="checkbox"
                            checked={editData.helpSection?.officeHours?.show || false}
                            onChange={(e) => updateHelpSection(['officeHours', 'show'], e.target.checked, true)}
                          />
                          <span>Show Office Hours Section</span>
                        </label>
                        {editData.helpSection?.officeHours?.show && (
                          <div className="space-y-2 ml-4">
                            {/* Office Hours Title */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.officeHours?.title?.show || false}
                                onChange={(e) => updateHelpSection(['officeHours', 'title', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.officeHours?.title?.value || ''}
                                onChange={(e) => updateHelpSection(['officeHours', 'title', 'value'], e.target.value)}
                                placeholder="Office Hours Title (e.g., Office Hours)"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                            {/* Monday-Friday */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.officeHours?.mondayFriday?.show || false}
                                onChange={(e) => updateHelpSection(['officeHours', 'mondayFriday', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.officeHours?.mondayFriday?.value || ''}
                                onChange={(e) => updateHelpSection(['officeHours', 'mondayFriday', 'value'], e.target.value)}
                                placeholder="Monday-Friday Hours (e.g., Monday-Friday: 9:00 AM - 4:00 PM)"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                            {/* Saturday */}
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={editData.helpSection?.officeHours?.saturday?.show || false}
                                onChange={(e) => updateHelpSection(['officeHours', 'saturday', 'show'], e.target.checked, true)}
                              />
                              <input
                                value={editData.helpSection?.officeHours?.saturday?.value || ''}
                                onChange={(e) => updateHelpSection(['officeHours', 'saturday', 'value'], e.target.value)}
                                placeholder="Saturday Hours (e.g., Saturday: 9:00 AM - 12:00 PM)"
                                className="flex-1 p-2 border rounded"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Modal Footer */}
            <ModalFooter />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {config.hero.show && (
        <section className={`relative ${config.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{config.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {config.hero.subtitle}
              </p>
              {config.hero.cta && (
                <a 
                  href={config.hero.ctaLink} 
                  className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105"
                >
                  {config.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
            {/* Header Buttons */}
            <div className="absolute top-4 right-4 flex items-center space-x-4">
              {editMode && (
                <button 
                  className="bg-white text-green-600 rounded-full p-2 shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={openEdit}
                  title="Edit form configuration"
                  aria-label="Edit form configuration"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}

            </div>
          </div>
        </section>
      )}

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      currentStep >= step.number
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? 'text-green-600' : 'text-gray-600'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-4 w-12 h-0.5 ${
                        currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-2 rounded-lg transition-all duration-200 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Submit Application
                <CheckCircle className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </form>

        {/* Help Section */}
        {config.helpSection?.show && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            {config.helpSection.title?.show && (
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{config.helpSection.title.value}</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.helpSection.contact?.show && (
                <div>
                  {config.helpSection.contact.title?.show && (
                    <h4 className="font-medium text-gray-800 mb-2">{config.helpSection.contact.title.value}</h4>
                  )}
                  {config.helpSection.contact.email?.show && (
                    <p className="text-gray-600 text-sm">Email: {config.helpSection.contact.email.value}</p>
                  )}
                  {config.helpSection.contact.phone?.show && (
                    <p className="text-gray-600 text-sm">Phone: {config.helpSection.contact.phone.value}</p>
                  )}
                </div>
              )}
              {config.helpSection.officeHours?.show && (
                <div>
                  {config.helpSection.officeHours.title?.show && (
                    <h4 className="font-medium text-gray-800 mb-2">{config.helpSection.officeHours.title.value}</h4>
                  )}
                  {config.helpSection.officeHours.mondayFriday?.show && (
                    <p className="text-gray-600 text-sm">{config.helpSection.officeHours.mondayFriday.value}</p>
                  )}
                  {config.helpSection.officeHours.saturday?.show && (
                    <p className="text-gray-600 text-sm">{config.helpSection.officeHours.saturday.value}</p>
                  )}
                </div>
              )}
            </div>
          </div>
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
                    ['helpSection.show', 'Help Section'],
                    ['showStudentInfo', 'Student Information Step'],
                    ['showContactDetails', 'Contact Details Step'],
                    ['showParentInfo', 'Parent Information Step'],
                    ['showAcademicInfo', 'Academic Information Step'],
                    ['showDocuments', 'Documents Upload Step'],
                    ['showReview', 'Review & Submit Step']
                  ].map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded">
                      <div className="text-sm font-medium text-gray-700">{label}</div>
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!getConfigValue(key)}
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
    </div>
  );
};

export default ApplicationFormPage;