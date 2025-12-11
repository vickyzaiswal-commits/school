"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  Award,
  Calendar,
  Vote,
  Megaphone,
  Lightbulb,
  BookOpen,
  Heart,
  Clock,
  Mail,
  Download,
  ChevronRight,
  FileText,
  MapPin,
  Shield,
  Star,
  Activity,
  Trophy,
  TrendingUp,
  Edit,
  Eye,
  EyeOff,
  X,
  Trash2,
  Plus
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';

const StudentCouncilPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPosition, setSelectedPosition] = useState('president');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [role, setRole] = useState(null); // Will be derived from stored user

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

  // Icon mapping
  const iconMap = {
    Users,
    Award,
    Calendar,
    Vote,
    Megaphone,
    Lightbulb,
    BookOpen,
    Heart,
    Clock,
    Mail,
    Download,
    ChevronRight,
    FileText,
    MapPin,
    Shield,
    Star,
    Activity,
    Trophy,
    TrendingUp
  };

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    tabs: 'showTabs',
    overview: 'showOverview',
    members: 'showMembers',
    elections: 'showElections',
    initiatives: 'showInitiatives',
    achievements: 'showAchievements',
    resources: 'showResources',
    cta: 'showCta',
    labels: 'showLabels'
  };

  const sectionDisplay = [
    { key: 'showHero', label: 'Hero' },
    { key: 'showBenefits', label: 'Benefits' },
    { key: 'showTabs', label: 'Tabs' },
    { key: 'showOverview', label: 'Overview Tab' },
    { key: 'showMembers', label: 'Members Tab' },
    { key: 'showElections', label: 'Elections Tab' },
    { key: 'showInitiatives', label: 'Initiatives Tab' },
    { key: 'showAchievements', label: 'Achievements Tab' },
    { key: 'showResources', label: 'Resources' },
    { key: 'showCta', label: 'CTA Section' },
    { key: 'showLabels', label: 'Labels' }
  ];

  // Default data structure
  const defaultData = {
    showHero: true,
    showBenefits: true,
    showTabs: true,
    showOverview: true,
    showMembers: true,
    showElections: true,
    showInitiatives: true,
    showAchievements: true,
    showResources: true,
    showCta: true,
    showLabels: true,
    hero: {
      show: true,
      title: "Student Council 2024-2025",
      subtitle: "Leadership, Service, and Representation for the Student Body",
      height: "h-96",
      showImage: false,
      backgroundImage: "",
      stats: [
        { value: "15+", label: "Active Members", show: true },
        { value: "25+", label: "Initiatives", show: true },
        { value: "₹5L+", label: "Funds Raised", show: true }
      ],
      ctaButton: {
        label: "Meet Your Representatives",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Role of the Student Council",
      subtitle: "The student council serves as the voice of the student body and plays a vital role in school life",
      items: [
        { icon: "Users", title: "Student Representation", description: "Ensuring student voices are heard in school decisions", show: true },
        { icon: "Megaphone", title: "Leadership Development", description: "Building future leaders through practical experience", show: true },
        { icon: "Heart", title: "Community Service", description: "Organizing events that benefit the school and community", show: true },
        { icon: "Lightbulb", title: "Innovation Hub", description: "Implementing student ideas for school improvement", show: true }
      ]
    },
    tabs: {
      show: true,
      items: [
        { id: "overview", name: "Overview", icon: "Users", show: true },
        { id: "members", name: "Council Members", icon: "Users", show: true },
        { id: "elections", name: "Elections", icon: "Vote", show: true },
        { id: "initiatives", name: "Initiatives", icon: "Lightbulb", show: true },
        { id: "achievements", name: "Achievements", icon: "Trophy", show: true }
      ]
    },
    overview: {
      show: true,
      title: "Council Overview",
      subtitle: "Learn about our mission, structure, and impact",
      mission: {
        show: true,
        title: "Our Mission",
        content: [
          "The Student Council serves as the official voice of the student body, representing student interests and concerns to the school administration.",
          "We work to enhance the student experience through organized events, community service projects, and meaningful initiatives that benefit our school community.",
          "Our mission is to foster leadership skills, promote school spirit, and create positive change through collaborative efforts between students, faculty, and administration."
        ]
      },
      structure: {
        show: true,
        title: "Council Structure",
        steps: [
          { step: 1, title: "Executive Committee", description: "Elected positions including President, Vice President, Secretary, and Treasurer", show: true },
          { step: 2, title: "Department Heads", description: "Specialized roles focusing on academics, culture, sports, and community service", show: true },
          { step: 3, title: "Class Representatives", description: "Elected representatives from each grade level", show: true },
          { step: 4, title: "Committee Members", description: "Student volunteers supporting various council initiatives", show: true }
        ]
      },
      impact: {
        show: true,
        title: "Annual Impact",
        items: [
          { label: "Student Proposals Implemented", value: "42", show: true },
          { label: "Funds Raised for Charity", value: "₹5,75,000", show: true },
          { label: "Community Service Hours", value: "2,150", show: true },
          { label: "Events Organized", value: "68", show: true }
        ]
      }
    },
    members: {
      show: true,
      title: "Council Members",
      subtitle: "Meet your student representatives and department heads",
      executive: {
        show: true,
        title: "Executive Committee",
        items: {
          president: {
            name: "Aarav Sharma",
            position: "President",
            grade: "XII-A",
            bio: "Aarav is a dedicated leader with a passion for debate and community service. He has been part of the student council for three years.",
            responsibilities: [
              "Presides over all council meetings",
              "Represents student body at school functions",
              "Oversees all council activities and initiatives"
            ],
            achievements: [
              "Led the annual charity drive that raised ₹2,00,000",
              "Organized the successful Mental Health Awareness Week",
              "Implemented the student feedback system"
            ],
            show: true
          },
          vicePresident: {
            name: "Priya Patel",
            position: "Vice President",
            grade: "XII-B",
            bio: "Priya is an accomplished debater and writer who believes in empowering student voices through effective communication.",
            responsibilities: [
              "Assists the president in all duties",
              "Takes charge in president's absence",
              "Coordinates between different council departments"
            ],
            achievements: [
              "Founded the Student Newsletter",
              "Organized inter-school debate competition",
              "Developed leadership workshop for junior students"
            ],
            show: true
          },
          secretary: {
            name: "Rohan Mehta",
            position: "Secretary",
            grade: "XI-C",
            bio: "Rohan is highly organized and dedicated to ensuring smooth operations of all council activities and documentation.",
            responsibilities: [
              "Maintains all council records and minutes",
              "Handles official correspondence",
              "Manages council calendar and schedules"
            ],
            achievements: [
              "Created digital filing system for council documents",
              "Streamlined meeting procedures",
              "Implemented efficient communication channels"
            ],
            show: true
          },
          treasurer: {
            name: "Sneha Gupta",
            position: "Treasurer",
            grade: "XI-D",
            bio: "Sneha has a knack for numbers and organization, ensuring transparent management of all council funds.",
            responsibilities: [
              "Manages council budget and finances",
              "Maintains financial records",
              "Prepares financial reports for review"
            ],
            achievements: [
              "Created transparent budgeting system",
              "Organized profitable fundraising events",
              "Implemented cost-saving measures for events"
            ],
            show: true
          }
        }
      },
      departments: {
        show: true,
        title: "Department Heads",
        items: [
          {
            name: "Vikram Singh",
            position: "Academic Affairs Head",
            grade: "XII-C",
            department: "Works on curriculum feedback, study resources, and academic events",
            show: true
          },
          {
            name: "Neha Joshi",
            position: "Cultural Affairs Head",
            grade: "XI-A",
            department: "Organizes cultural events, festivals, and performing arts activities",
            show: true
          },
          {
            name: "Arjun Kumar",
            position: "Sports Head",
            grade: "XII-D",
            department: "Coordinates sports events, teams, and athletic development",
            show: true
          },
          {
            name: "Ananya Desai",
            position: "Social Service Head",
            grade: "XI-B",
            department: "Leads community service projects and charity initiatives",
            show: true
          },
          {
            name: "Riya Malhotra",
            position: "Environmental Head",
            grade: "XI-C",
            department: "Promotes sustainability and environmental awareness programs",
            show: true
          },
          {
            name: "Siddharth Rao",
            position: "Technology Head",
            grade: "XII-A",
            department: "Manages digital initiatives and tech-related student projects",
            show: true
          }
        ]
      }
    },
    elections: {
      show: true,
      title: "Election Process",
      subtitle: "How we select our student representatives",
      process: [
        {
          stage: "Nomination",
          date: "August 1-5, 2024",
          description: "Students submit nomination forms with teacher recommendations",
          icon: "FileText",
          show: true
        },
        {
          stage: "Campaign",
          date: "August 8-12, 2024",
          description: "Candidates present their manifestos and campaign ideas",
          icon: "Megaphone",
          show: true
        },
        {
          stage: "Voting",
          date: "August 15, 2024",
          description: "All students from grades 6-12 vote for their representatives",
          icon: "Vote",
          show: true
        },
        {
          stage: "Results",
          date: "August 16, 2024",
          description: "Election results announced in special assembly",
          icon: "Award",
          show: true
        },
        {
          stage: "Induction",
          date: "August 19, 2024",
          description: "New council members sworn in during ceremony",
          icon: "Shield",
          show: true
        }
      ],
      timeline: {
        show: true,
        title: "Election Timeline 2024",
        items: [
          { phase: "Nominations Open", date: "Aug 1", status: "completed", show: true },
          { phase: "Campaign Period", date: "Aug 8-12", status: "completed", show: true },
          { phase: "Voting Day", date: "Aug 15", status: "completed", show: true },
          { phase: "Results Announcement", date: "Aug 16", status: "completed", show: true },
          { phase: "Next Elections", date: "Aug 2025", status: "upcoming", show: true }
        ]
      }
    },
    initiatives: {
      show: true,
      title: "Current Initiatives",
      subtitle: "Ongoing projects and programs led by the student council",
      current: {
        show: true,
        items: [
          {
            title: "Mental Health Awareness Program",
            status: "Ongoing",
            description: "Workshops, counseling sessions, and resources to support student mental health",
            lead: "Wellness Committee",
            progress: 75,
            show: true
          },
          {
            title: "Digital Student Feedback System",
            status: "Completed",
            description: "Online platform for students to submit suggestions and feedback",
            lead: "Technology Department",
            progress: 100,
            show: true
          },
          {
            title: "School Green Initiative",
            status: "Ongoing",
            description: "Campus beautification and sustainability projects",
            lead: "Environmental Department",
            progress: 40,
            show: true
          },
          {
            title: "Peer Tutoring Program",
            status: "Planning",
            description: "Senior students tutoring junior students in various subjects",
            lead: "Academic Affairs",
            progress: 20,
            show: true
          }
        ]
      },
      proposal: {
        show: true,
        title: "Propose an Initiative",
        description: "Have an idea to improve our school? The student council wants to hear from you!",
        ways: [
          "Submit your idea using the initiative proposal form",
          "Attend council meetings on first Wednesday of each month",
          "Email your representatives directly with suggestions",
          "Join committee meetings for specific initiatives"
        ]
      }
    },
    achievements: {
      show: true,
      title: "Council Achievements",
      subtitle: "Notable accomplishments and impacts made by student councils over the years",
      highlights: {
        show: true,
        items: [
          {
            title: "Annual Charity Drive 2023",
            description: "Raised ₹2,50,000 for local orphanage through various events",
            impact: "Funded educational resources and infrastructure improvements",
            show: true
          },
          {
            title: "School Recycling Program",
            description: "Implemented comprehensive recycling system throughout campus",
            impact: "Reduced school waste by 40% and raised environmental awareness",
            show: true
          },
          {
            title: "Cultural Exchange Program",
            description: "Organized exchange with international school for cultural learning",
            impact: "150 students participated in cross-cultural activities and workshops",
            show: true
          },
          {
            title: "Student Wellness Center",
            description: "Established dedicated space for student relaxation and support",
            impact: "Provides resources and quiet space for over 100 students daily",
            show: true
          }
        ]
      },
      awards: {
        show: true,
        title: "Awards & Recognition",
        items: [
          { name: "Best Student Council Award 2023", level: "State Level", show: true },
          { name: "Community Service Excellence 2022", level: "National", show: true },
          { name: "Innovation in Education 2023", level: "Regional", show: true },
          { name: "Environmental Leadership 2022", level: "City Level", show: true }
        ]
      }
    },
    resources: {
      show: true,
      title: "Council Resources",
      subtitle: "Documents, forms, and information about the student council",
      downloadButton: "Download",
      items: [
        {
          title: "Council Election Guidelines",
          description: "Complete rules and procedures for student council elections",
          format: "PDF",
          size: "1.8 MB",
          icon: "Vote",
          fileUrl: "",
          show: true
        },
        {
          title: "Meeting Minutes Archive",
          description: "Records of all student council meetings from current academic year",
          format: "PDF",
          size: "3.2 MB",
          icon: "FileText",
          fileUrl: "",
          show: true
        },
        {
          title: "Initiative Proposal Form",
          description: "Form to propose new ideas and projects to the student council",
          format: "DOCX",
          size: "0.6 MB",
          icon: "Lightbulb",
          fileUrl: "",
          show: true
        },
        {
          title: "Annual Report 2023-24",
          description: "Comprehensive report of council activities and achievements",
          format: "PDF",
          size: "4.5 MB",
          icon: "BookOpen",
          fileUrl: "",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Get Involved with Student Council",
      subtitle: "Your voice matters! Participate in council activities, share your ideas, or consider running for office",
      buttons: [
        { text: "Attend a Meeting",  link: "#", show: true },
        { text: "Contact Your Representative", link: "#", show: true }
      ]
    },
    labels: {
      show: true,
      bio: "Bio",
      responsibilities: "Responsibilities",
      achievements: "Achievements"
    }
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
        const res = await apiRequest('save_data/get_all_student_council_data', {});
        console.log('API Response:', res);
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          console.log('Fetched Data (raw):', fetchedData);
          try {
            if (fetchedData && fetchedData.encrypted) {
              fetchedData = await decryptObject(fetchedData);
            } else if (typeof fetchedData === 'string') {
              fetchedData = JSON.parse(fetchedData);
            }
          } catch (err) {
            console.warn('Failed to decrypt/parse fetched council data, using raw:', err);
            try { fetchedData = JSON.parse(fetchedData); } catch(e) { /* leave as-is */ }
          }
          setData({ ...defaultData, ...fetchedData });
        } else {
          console.log('No data or invalid response, using default');
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(item => item.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredDepartments = data.members?.departments?.items?.filter(item => item.show !== false) || [];
  const filteredProcess = data.elections?.process?.filter(item => item.show !== false) || [];
  const filteredTimeline = data.elections?.timeline?.items?.filter(item => item.show !== false) || [];
  const filteredInitiatives = data.initiatives?.current?.items?.filter(item => item.show !== false) || [];
  const filteredHighlights = data.achievements?.highlights?.items?.filter(item => item.show !== false) || [];
  const filteredAwards = data.achievements?.awards?.items?.filter(item => item.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredExecutive = Object.keys(data.members?.executive?.items || {}).filter(key => data.members?.executive?.items?.[key]?.show !== false);
  const currentMember = data.members?.executive?.items?.[selectedPosition];

  // Generic handlers (similar to CanteenPage)
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      const parts = arrayKey.split('.');
      let current = updated;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      
      const arr = current[parts[parts.length - 1]] || [];
      const newArray = [...arr];
      
      if (field === arrayKey && typeof value === 'string') {
        newArray[index] = value.includes('\n') ? value.split('\n').map(s => s.trim()).filter(Boolean) : value;
      } else {
        const currentItem = newArray[index] || {};
        if (field === 'responsibilities' || field === 'achievements' || field === 'ways' || field === 'content') {
          currentItem[field] = value.split(',').map(i => i.trim()).filter(i => i);
        } else {
          currentItem[field] = value;
        }
        newArray[index] = currentItem;
      }
      
      current[parts[parts.length - 1]] = newArray;
      return updated;
    });
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setEditData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  // Item Editor Component (similar to CanteenPage)
  const ItemEditor = (arrayKey, fields = [], isStringArray = false, options = {}) => {
    const getNested = (obj, path) => {
      const parts = path.split('.');
      let cur = obj;
      for (let p of parts) {
        if (cur == null) return undefined;
        cur = cur[p];
      }
      return cur;
    };

  const allowFileUpload = options.allowFileUpload !== false;

    const items = getNested(editData, arrayKey) || [];
    
    const removeItem = (index) => {
      // Use a deep clone update to avoid mutating nested references
      setEditData(prev => {
        const updated = JSON.parse(JSON.stringify(prev || {}));
        const parts = arrayKey.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const arr = cur[parts[parts.length - 1]] || [];
        cur[parts[parts.length - 1]] = arr.filter((_, i) => i !== index);
        return updated;
      });
    };

    const addItem = () => {
      const newItem = isStringArray ? '' : (options.defaultItem || { show: true });
      // Deep clone prev and create new nested array to ensure immutable update
      setEditData(prev => {
        const updated = JSON.parse(JSON.stringify(prev || {}));
        const parts = arrayKey.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const arr = cur[parts[parts.length - 1]] || [];
        cur[parts[parts.length - 1]] = [...arr, newItem];
        return updated;
      });
    };

    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Item {index + 1}</h4>
              <button onClick={() => removeItem(index)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
              {isStringArray ? (
              <textarea 
                value={item || ''} 
                onChange={(e) => handleArrayChange(arrayKey, index, arrayKey, e.target.value)} 
                placeholder="Enter items, one per line or comma separated" 
                className="w-full p-2 border rounded mb-2" 
                rows="4" 
              />
            ) : (
                fields.filter(field => field !== 'id').map(field => (
                  field === 'icon' ? (
                    <select 
                      key={field} 
                      value={item[field] || ''} 
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                      className="w-full p-2 border rounded mb-2"
                    >
                      <option value="">Select Icon</option>
                      {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                  ) : field === 'fileUrl' && allowFileUpload ? (
                    <div key={field} className="mb-2">
                      <label className="block text-sm font-medium mb-1">Upload File</label>
                      <FileUpload initialValue={item[field] || ''} onUpload={(url) => handleArrayChange(arrayKey, index, field, url)} className="w-full" />
                      <input value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} placeholder="File URL (fallback)" className="w-full p-2 border rounded mt-2" />
                    </div>
                  ) : (
                    <input 
                      key={field} 
                      value={item[field] || ''} 
                      onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} 
                      placeholder={field} 
                      className="w-full p-2 border rounded mb-2" 
                    />
                  )
                ))
            )}
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={item.show !== false} 
                onChange={(e) => handleArrayChange(arrayKey, index, 'show', e.target.checked)} 
              />
              <span>Show Item</span>
            </label>
          </div>
        ))}
        <button onClick={addItem} className="flex items-center text-green-600">
          <Plus className="h-4 w-4 mr-2" /> Add New Item
        </button>
      </div>
    );
  };


  // Modal Header Component
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">Edit {title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );

  // Open edit modal - FIXED: Properly handle tabs data structure
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    
    if (section === 'tabs') {
      // For tabs, we need to include all the tab-related sections
      const tabsData = {
        showTabs: data.showTabs,
        tabs: data.tabs,
        showOverview: data.showOverview,
        overview: data.overview,
        showMembers: data.showMembers,
        members: data.members,
        showElections: data.showElections,
        elections: data.elections,
        showInitiatives: data.showInitiatives,
        initiatives: data.initiatives,
        showAchievements: data.showAchievements,
        achievements: data.achievements
      };
      console.log('Opening tabs modal with data:', tabsData);
      setEditData(JSON.parse(JSON.stringify(tabsData)));
      setOriginalData(JSON.parse(JSON.stringify(tabsData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data[layoutKey],
        ...data[section]
      };
      console.log(`Opening ${section} modal with data:`, sectionData);
      setEditData(JSON.parse(JSON.stringify(sectionData)));
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    }
  };

  // Save section - FIXED: Properly handle tabs data structure
  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
    
    console.log('Saving section:', editSection, 'with data:', updatedData);
    
    if (editSection === 'tabs') {
      // Update all tab-related data
      newData.showTabs = updatedData.showTabs;
      newData.tabs = updatedData.tabs;
      newData.showOverview = updatedData.showOverview;
      newData.overview = updatedData.overview;
      newData.showMembers = updatedData.showMembers;
      newData.members = updatedData.members;
      newData.showElections = updatedData.showElections;
      newData.elections = updatedData.elections;
      newData.showInitiatives = updatedData.showInitiatives;
      newData.initiatives = updatedData.initiatives;
      newData.showAchievements = updatedData.showAchievements;
      newData.achievements = updatedData.achievements;
    } else {
      const layoutKey = layoutMap[editSection];
      newData[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
    
    setData(newData);
    try {
      const payload = await encryptObject(newData);
      await apiRequest('save_data/save_student_council_data', { payload });
      console.log('Data saved successfully (encrypted payload sent)');
    } catch (error) {
      console.error('Save failed', error);
    }
    setEditFormOpen(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditData(originalData);
    setEditFormOpen(false);
  };

  // Section Visibility modal handlers
  const openSectionVisibilityModal = () => {
    const visibility = {};
    sectionDisplay.forEach(s => {
      visibility[s.key] = data[s.key];
    });
    setSectionVisibility(visibility);
    setSectionVisibilityModal(true);
  };

  const saveSectionVisibility = async () => {
    const newData = { ...data };
    Object.keys(sectionVisibility).forEach(k => {
      newData[k] = sectionVisibility[k];
    });
    setData(newData);
    try {
      const payload = await encryptObject(newData);
      await apiRequest('save_data/save_student_council_data', { payload });
    } catch (err) {
      console.error('Failed to save section visibility', err);
    }
    setSectionVisibilityModal(false);
  };

  const toggleSectionVisibility = (key) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [key]: prev?.[key] === false ? true : false };
      return next;
    });
    // Also update live page data so the section hides/shows immediately
    setData(prev => ({ ...prev, [key]: prev?.[key] === false ? true : false }));
  };

  // Executive Members Editor
  const ExecutiveEditor = () => {
    const positions = ['president', 'vicePresident', 'secretary', 'treasurer'];

    const getExecItem = (position) => {
      // Support both editData.members.executive.items and editData.executive.items
      return (
        editData?.members?.executive?.items?.[position] ||
        editData?.executive?.items?.[position] ||
        {}
      );
    };

    const updateExecField = (position, field, value) => {
      setEditData(prev => {
        const updated = JSON.parse(JSON.stringify(prev || {}));
        // prefer members.executive when present (tabs modal), else executive (members modal)
        if (updated.members && updated.members.executive) {
          if (!updated.members.executive.items) updated.members.executive.items = {};
          if (!updated.members.executive.items[position]) updated.members.executive.items[position] = { show: true };
          if (field === 'responsibilities' || field === 'achievements') {
            updated.members.executive.items[position][field] = typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value;
          } else {
            updated.members.executive.items[position][field] = value;
          }
        } else {
          if (!updated.executive) updated.executive = { items: {} };
          if (!updated.executive.items) updated.executive.items = {};
          if (!updated.executive.items[position]) updated.executive.items[position] = { show: true };
          if (field === 'responsibilities' || field === 'achievements') {
            updated.executive.items[position][field] = typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value;
          } else {
            updated.executive.items[position][field] = value;
          }
        }
        return updated;
      });
    };

    return (
      <div className="space-y-6">
        {positions.map(position => {
          const item = getExecItem(position);
          return (
            <div key={position} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-4">{position.toUpperCase()}</h4>
              <input
                value={item?.name || ''}
                onChange={(e) => updateExecField(position, 'name', e.target.value)}
                placeholder="Name"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={item?.position || ''}
                onChange={(e) => updateExecField(position, 'position', e.target.value)}
                placeholder="Position"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                value={item?.grade || ''}
                onChange={(e) => updateExecField(position, 'grade', e.target.value)}
                placeholder="Grade"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                value={item?.bio || ''}
                onChange={(e) => updateExecField(position, 'bio', e.target.value)}
                placeholder="Bio"
                className="w-full p-2 border rounded mb-2"
                rows="3"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Responsibilities (comma separated)</label>
                <textarea
                  value={(item?.responsibilities || []).join(', ')}
                  onChange={(e) => updateExecField(position, 'responsibilities', e.target.value)}
                  placeholder="Responsibilities"
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Achievements (comma separated)</label>
                <textarea
                  value={(item?.achievements || []).join(', ')}
                  onChange={(e) => updateExecField(position, 'achievements', e.target.value)}
                  placeholder="Achievements"
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item?.show !== false}
                  onChange={(e) => updateExecField(position, 'show', e.target.checked)}
                />
                <span>Show {position}</span>
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={editSection} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6">
              {editSection !== 'tabs' && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                  <label className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      checked={editData.showSection || false} 
                      onChange={(e) => handleObjectChange('showSection', e.target.checked)} 
                    />
                    <span>Show Section</span>
                  </label>
                </div>
              )}
              
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
              {/* height removed from hero modal as requested */}

                <div>
                        <label className="block text-sm font-medium">Background Image</label>
                        <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full mb-2" />
                        <label className="flex items-center space-x-2 mb-4">
                          <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                          <span>Show Background Image</span>
                        </label>
                  
                      <div>
                    <label className="block text-sm font-medium">CTA Button</label>
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                    </div>
                  </div>

                  {ItemEditor('stats', ['value', 'label'])}
                </div>
              )}
              
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}
              
              {editSection === 'tabs' && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showTabs || false} onChange={(e) => handleObjectChange('showTabs', e.target.checked)} />
                      <span>Show Tabs Section</span>
                    </label>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tabs Navigation</h3>
                    {ItemEditor('tabs.items', ['id', 'name', 'icon'])}
                  </div>

                  {/* Overview Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.showOverview || false} 
                        onChange={(e) => handleObjectChange('showOverview', e.target.checked)} 
                      />
                      <span className="text-lg font-semibold">Overview Tab</span>
                    </div>
                    
                    <input value={editData.overview?.title || ''} onChange={(e) => handleObjectChange('overview.title', e.target.value)} placeholder="Overview Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={editData.overview?.subtitle || ''} onChange={(e) => handleObjectChange('overview.subtitle', e.target.value)} placeholder="Overview Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    
                    <div className="ml-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Mission Section</label>
                        <input value={editData.overview?.mission?.title || ''} onChange={(e) => handleNestedChange('overview.mission', 'title', e.target.value)} placeholder="Mission Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.overview?.mission?.show !== false} onChange={(e) => handleNestedChange('overview.mission', 'show', e.target.checked)} />
                          <span>Show Mission</span>
                        </label>
                        {ItemEditor('overview.mission.content', [], true)}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium">Structure Section</label>
                        <input value={editData.overview?.structure?.title || ''} onChange={(e) => handleNestedChange('overview.structure', 'title', e.target.value)} placeholder="Structure Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.overview?.structure?.show !== false} onChange={(e) => handleNestedChange('overview.structure', 'show', e.target.checked)} />
                          <span>Show Structure</span>
                        </label>
                        {ItemEditor('overview.structure.steps', ['step', 'title', 'description'])}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium">Impact Section</label>
                        <input value={editData.overview?.impact?.title || ''} onChange={(e) => handleNestedChange('overview.impact', 'title', e.target.value)} placeholder="Impact Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.overview?.impact?.show !== false} onChange={(e) => handleNestedChange('overview.impact', 'show', e.target.checked)} />
                          <span>Show Impact</span>
                        </label>
                        {ItemEditor('overview.impact.items', ['label', 'value'])}
                      </div>
                    </div>
                  </div>

                  {/* Members Tab Content */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.showMembers || false} 
                        onChange={(e) => handleObjectChange('showMembers', e.target.checked)} 
                      />
                      <span className="text-lg font-semibold">Members Tab</span>
                    </div>
                    
                    <input value={editData.members?.title || ''} onChange={(e) => handleObjectChange('members.title', e.target.value)} placeholder="Members Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={editData.members?.subtitle || ''} onChange={(e) => handleObjectChange('members.subtitle', e.target.value)} placeholder="Members Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    
                    <div className="ml-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Executive Committee</label>
                        <input value={editData.members?.executive?.title || ''} onChange={(e) => handleNestedChange('members.executive', 'title', e.target.value)} placeholder="Executive Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.members?.executive?.show !== false} onChange={(e) => handleNestedChange('members.executive', 'show', e.target.checked)} />
                          <span>Show Executive Committee</span>
                        </label>
                        <ExecutiveEditor />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium">Department Heads</label>
                        <input value={editData.members?.departments?.title || ''} onChange={(e) => handleNestedChange('members.departments', 'title', e.target.value)} placeholder="Departments Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.members?.departments?.show !== false} onChange={(e) => handleNestedChange('members.departments', 'show', e.target.checked)} />
                          <span>Show Department Heads</span>
                        </label>
                        {ItemEditor('members.departments.items', ['name', 'position', 'grade', 'department'])}
                      </div>
                    </div>
                  </div>

                  {/* Add similar sections for elections, initiatives, achievements */}
                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.showElections || false} 
                        onChange={(e) => handleObjectChange('showElections', e.target.checked)} 
                      />
                      <span className="text-lg font-semibold">Elections Tab</span>
                    </div>
                    
                    <input value={editData.elections?.title || ''} onChange={(e) => handleObjectChange('elections.title', e.target.value)} placeholder="Elections Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={editData.elections?.subtitle || ''} onChange={(e) => handleObjectChange('elections.subtitle', e.target.value)} placeholder="Elections Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    
                    <div className="ml-6 space-y-4">
                      {ItemEditor('elections.process', ['stage', 'date', 'description', 'icon'])}
                      
                      <div>
                        <label className="block text-sm font-medium">Timeline</label>
                        <input value={editData.elections?.timeline?.title || ''} onChange={(e) => handleNestedChange('elections.timeline', 'title', e.target.value)} placeholder="Timeline Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.elections?.timeline?.show !== false} onChange={(e) => handleNestedChange('elections.timeline', 'show', e.target.checked)} />
                          <span>Show Timeline</span>
                        </label>
                        {ItemEditor('elections.timeline.items', ['phase', 'date', 'status'])}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.showInitiatives || false} 
                        onChange={(e) => handleObjectChange('showInitiatives', e.target.checked)} 
                      />
                      <span className="text-lg font-semibold">Initiatives Tab</span>
                    </div>
                    
                    <input value={editData.initiatives?.title || ''} onChange={(e) => handleObjectChange('initiatives.title', e.target.value)} placeholder="Initiatives Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={editData.initiatives?.subtitle || ''} onChange={(e) => handleObjectChange('initiatives.subtitle', e.target.value)} placeholder="Initiatives Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    
                    <div className="ml-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Current Initiatives</label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.initiatives?.current?.show !== false} onChange={(e) => handleNestedChange('initiatives.current', 'show', e.target.checked)} />
                          <span>Show Current Initiatives</span>
                        </label>
                        {ItemEditor('initiatives.current.items', ['title', 'status', 'description', 'lead', 'progress'])}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium">Proposal Section</label>
                        <input value={editData.initiatives?.proposal?.title || ''} onChange={(e) => handleNestedChange('initiatives.proposal', 'title', e.target.value)} placeholder="Proposal Title" className="w-full p-2 border rounded mb-2" />
                        <textarea value={editData.initiatives?.proposal?.description || ''} onChange={(e) => handleNestedChange('initiatives.proposal', 'description', e.target.value)} placeholder="Proposal Description" className="w-full p-2 border rounded mb-2" rows="3" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.initiatives?.proposal?.show !== false} onChange={(e) => handleNestedChange('initiatives.proposal', 'show', e.target.checked)} />
                          <span>Show Proposal Section</span>
                        </label>
                        {ItemEditor('initiatives.proposal.ways', [], true)}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <input 
                        type="checkbox" 
                        checked={editData.showAchievements || false} 
                        onChange={(e) => handleObjectChange('showAchievements', e.target.checked)} 
                      />
                      <span className="text-lg font-semibold">Achievements Tab</span>
                    </div>
                    
                    <input value={editData.achievements?.title || ''} onChange={(e) => handleObjectChange('achievements.title', e.target.value)} placeholder="Achievements Title" className="w-full p-2 border rounded mb-4" />
                    <textarea value={editData.achievements?.subtitle || ''} onChange={(e) => handleObjectChange('achievements.subtitle', e.target.value)} placeholder="Achievements Subtitle" className="w-full p-2 border rounded mb-4" rows="3" />
                    
                    <div className="ml-6 space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Highlights</label>
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.achievements?.highlights?.show !== false} onChange={(e) => handleNestedChange('achievements.highlights', 'show', e.target.checked)} />
                          <span>Show Highlights</span>
                        </label>
                        {ItemEditor('achievements.highlights.items', ['title', 'description', 'impact'])}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium">Awards</label>
                        <input value={editData.achievements?.awards?.title || ''} onChange={(e) => handleNestedChange('achievements.awards', 'title', e.target.value)} placeholder="Awards Title" className="w-full p-2 border rounded mb-2" />
                        <label className="flex items-center space-x-2 mb-2">
                          <input type="checkbox" checked={editData.achievements?.awards?.show !== false} onChange={(e) => handleNestedChange('achievements.awards', 'show', e.target.checked)} />
                          <span>Show Awards</span>
                        </label>
                        {ItemEditor('achievements.awards.items', ['name', 'level'])}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Other sections remain the same */}
              {editSection === 'members' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <label className="block text-sm font-medium">Executive Committee</label>
                    <input value={editData.executive?.title || ''} onChange={(e) => handleNestedChange('executive', 'title', e.target.value)} placeholder="Executive Title" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.executive?.show !== false} onChange={(e) => handleNestedChange('executive', 'show', e.target.checked)} />
                      <span>Show Executive Committee</span>
                    </label>
                    <ExecutiveEditor />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium">Department Heads</label>
                    <input value={editData.departments?.title || ''} onChange={(e) => handleNestedChange('departments', 'title', e.target.value)} placeholder="Departments Title" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.departments?.show !== false} onChange={(e) => handleNestedChange('departments', 'show', e.target.checked)} />
                      <span>Show Department Heads</span>
                    </label>
                    {ItemEditor('departments.items', ['name', 'position', 'grade', 'department'])}
                  </div>
                </div>
              )}
              
              {editSection === 'elections' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('process', ['stage', 'date', 'description', 'icon'])}
                  
                  <div>
                    <label className="block text-sm font-medium">Timeline</label>
                    <input value={editData.timeline?.title || ''} onChange={(e) => handleNestedChange('timeline', 'title', e.target.value)} placeholder="Timeline Title" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.timeline?.show !== false} onChange={(e) => handleNestedChange('timeline', 'show', e.target.checked)} />
                      <span>Show Timeline</span>
                    </label>
                    {ItemEditor('timeline.items', ['phase', 'date', 'status'])}
                  </div>
                </div>
              )}
              
              {editSection === 'initiatives' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <label className="block text-sm font-medium">Current Initiatives</label>
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.current?.show !== false} onChange={(e) => handleNestedChange('current', 'show', e.target.checked)} />
                      <span>Show Current Initiatives</span>
                    </label>
                    {ItemEditor('current.items', ['title', 'status', 'description', 'lead', 'progress'])}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium">Proposal</label>
                    <input value={editData.proposal?.title || ''} onChange={(e) => handleNestedChange('proposal', 'title', e.target.value)} placeholder="Proposal Title" className="w-full p-2 border rounded mb-2" />
                    <textarea value={editData.proposal?.description || ''} onChange={(e) => handleNestedChange('proposal', 'description', e.target.value)} placeholder="Proposal Description" className="w-full p-2 border rounded mb-2" rows="3" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.proposal?.show !== false} onChange={(e) => handleNestedChange('proposal', 'show', e.target.checked)} />
                      <span>Show Proposal</span>
                    </label>
                    {ItemEditor('proposal.ways', [], true)}
                  </div>
                </div>
              )}
              
              {editSection === 'achievements' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  
                  <div>
                    <label className="block text-sm font-medium">Highlights</label>
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.highlights?.show !== false} onChange={(e) => handleNestedChange('highlights', 'show', e.target.checked)} />
                      <span>Show Highlights</span>
                    </label>
                    {ItemEditor('highlights.items', ['title', 'description', 'impact'])}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium">Awards</label>
                    <input value={editData.awards?.title || ''} onChange={(e) => handleNestedChange('awards', 'title', e.target.value)} placeholder="Awards Title" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" checked={editData.awards?.show !== false} onChange={(e) => handleNestedChange('awards', 'show', e.target.checked)} />
                      <span>Show Awards</span>
                    </label>
                    {ItemEditor('awards.items', ['name', 'level'])}
                  </div>
                </div>
              )}
              
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.downloadButton || ''} onChange={(e) => handleObjectChange('downloadButton', e.target.value)} placeholder="Download Button" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'description', 'format', 'size', 'icon', 'fileUrl'])}
                </div>
              )}
              
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text', 'link'], false, { allowFileUpload: false })}
                </div>
              )}
              
              {editSection === 'labels' && (
                <div className="space-y-4">
                  <input value={editData.bio || ''} onChange={(e) => handleObjectChange('bio', e.target.value)} placeholder="Bio Label" className="w-full p-2 border rounded" />
                  <input value={editData.responsibilities || ''} onChange={(e) => handleObjectChange('responsibilities', e.target.value)} placeholder="Responsibilities Label" className="w-full p-2 border rounded" />
                  <input value={editData.achievements || ''} onChange={(e) => handleObjectChange('achievements', e.target.value)} placeholder="Achievements Label" className="w-full p-2 border rounded" />
                </div>
              )}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Manage Section Visibility Modal (canonical UI) */}
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
            <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
          </div>
        </div>
      )}

      {/* Rest of your component JSX remains exactly the same */}
      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden ${editMode ? 'pr-12' : ''}`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl mb-8 leading-relaxed">{data.hero.subtitle}</p>
              {data.hero.stats?.filter(stat => stat.show !== false).length > 0 && (
                <div className="flex flex-wrap gap-6 mb-8">
                  {data.hero.stats?.filter(stat => stat.show !== false).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.hero.ctaButton?.show !== false && (
                <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  {data.hero.ctaButton.label}
                  <Users className="ml-2 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Benefits Section */}
      {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
        <section className={`py-16 bg-gray-50 relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Navigation - UPDATED UI/UX: Underline style with smooth transitions, no wrapping, horizontal scroll if needed */}
      {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
        <section className={`relative py-4 bg-white z-10 shadow-sm border-b border-gray-200 ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="overflow-x-auto">
              <div className="flex ">
                {filteredTabs.map((tab) => {
                  const IconComponent = iconMap[tab.icon];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex items-center px-4 py-4 border-b-2 font-medium transition-all duration-200 ease-in-out whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <IconComponent className={`h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110 ${activeTab === tab.id ? 'scale-110' : ''}`} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Tab Content */}
      {data.showTabs && (
        <section className={`py-16 bg-white relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && data.showOverview && data.overview?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.overview.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.overview.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {data.overview.mission?.show && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{data.overview.mission.title}</h4>
                      <div className="prose prose-lg text-gray-600">
                        {data.overview.mission.content?.map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.overview.structure?.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{data.overview.structure.title}</h4>
                      <div className="space-y-4">
                        {data.overview.structure.steps?.filter(step => step.show !== false).map((step, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                              {step.step}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{step.title}</h5>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {data.overview.impact?.show && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{data.overview.impact.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {data.overview.impact.items?.filter(item => item.show !== false).map((item, index) => (
                        <div key={index} className="text-center">
                          <div className="text-3xl font-bold text-green-600 mb-2">{item.value}</div>
                          <div className="text-sm text-gray-600">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && data.showMembers && data.members?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.members.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.members.subtitle}</p>

                {/* Executive Committee */}
                {data.members.executive?.show && (
                  <div className="mb-12">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{data.members.executive.title}</h4>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {filteredExecutive.map(positionKey => (
                        <button
                          key={positionKey}
                          onClick={() => setSelectedPosition(positionKey)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            selectedPosition === positionKey
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {data.members.executive.items[positionKey].position}
                        </button>
                      ))}
                    </div>

                    {currentMember && currentMember.show !== false && (
                      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">{currentMember.name}</h4>
                        <p className="text-lg text-green-600 mb-4">{currentMember.position} - Grade {currentMember.grade}</p>
                        <p className="text-gray-600 mb-6">{currentMember.bio}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">{data.labels.responsibilities}</h5>
                            <ul className="space-y-2 text-gray-600">
                              {currentMember.responsibilities?.map((resp, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                    <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                                  </div>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">{data.labels.achievements}</h5>
                            <ul className="space-y-2 text-gray-600">
                              {currentMember.achievements?.map((ach, index) => (
                                <li key={index} className="flex items-start">
                                  <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                    <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                                  </div>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Department Heads */}
                {data.members.departments?.show && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{data.members.departments.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDepartments.map((head, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h5 className="font-semibold text-gray-800 mb-1">{head.name}</h5>
                          <p className="text-sm text-green-600 mb-1">{head.position}</p>
                          <p className="text-xs text-gray-500 mb-2">Grade {head.grade}</p>
                          <p className="text-sm text-gray-600">{head.department}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Elections Tab */}
            {activeTab === 'elections' && data.showElections && data.elections?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.elections.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.elections.subtitle}</p>

                <div className="space-y-6 mb-12">
                  {filteredProcess.map((step, index) => {
                    const IconComponent = iconMap[step.icon];
                    return (
                      <div key={index} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-3">
                          <IconComponent className="h-6 w-6 text-green-600 mr-3" />
                          <h4 className="font-semibold text-gray-800">{step.stage}</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{step.date}</p>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    );
                  })}
                </div>

                {data.elections.timeline?.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">{data.elections.timeline.title}</h4>
                    <div className="space-y-3">
                      {filteredTimeline.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              item.status === 'completed' ? 'bg-green-500' : 
                              item.status === 'upcoming' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></div>
                            <span className="text-sm text-gray-700">{item.phase}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Initiatives Tab */}
            {activeTab === 'initiatives' && data.showInitiatives && data.initiatives?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.initiatives.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.initiatives.subtitle}</p>

                {data.initiatives.current?.show && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {filteredInitiatives.map((initiative, index) => (
                      <div key={index} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{initiative.title}</h4>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            initiative.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                            initiative.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {initiative.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{initiative.lead}</span>
                        <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{initiative.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                initiative.status === 'Ongoing' ? 'bg-green-500' :
                                initiative.status === 'Completed' ? 'bg-green-500' :
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${initiative.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                          Learn more <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {data.initiatives.proposal?.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">{data.initiatives.proposal.title}</h4>
                    <p className="text-green-700 mb-4">{data.initiatives.proposal.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                      {data.initiatives.proposal.ways?.map((way, index) => (
                        <div key={index} className="flex items-center">
                          <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                          </div>
                          <span>{way}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && data.showAchievements && data.achievements?.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{data.achievements.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{data.achievements.subtitle}</p>

                {data.achievements.highlights?.show && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {filteredHighlights.map((achievement, index) => (
                      <div key={index} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-center mb-3">
                          <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                          <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h5 className="font-medium text-green-800 text-sm mb-1">Impact</h5>
                          <p className="text-green-700 text-sm">{achievement.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {data.achievements.awards?.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">{data.achievements.awards.title}</h4>
                    <div className="space-y-3">
                      {filteredAwards.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-green-700">{item.name}</span>
                          <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            {item.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {editMode && activeTab !== 'overview' && <button onClick={() => openEditModal(activeTab)} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Resources Section */}
      {data.showResources && data.resources?.show && filteredResources.length > 0 && (
        <section className={`py-16 bg-gray-50 relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
              <p className="text-lg text-gray-600">{data.resources.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = iconMap[resource.icon];
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-start">
                      <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                          <span>{resource.size}</span>
                        </div>
                      </div>
                    </div>
                    {resource.fileUrl ? (
                      <a
                        href={resource.fileUrl}
                        download={resource.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                      >
                        {data.resources.downloadButton}
                        <Download className="ml-2 h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 mt-4 block">No file available</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* CTA Section */}
      {data.showCta && data.cta?.show && (
        <section className={`py-16 bg-gradient-to-r from-green-800 to-green-700 text-white relative ${editMode ? 'pr-12' : ''}`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{data.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.link || '#'}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.style === 'primary'
                      ? 'bg-white text-green-700 hover:bg-gray-100'
                      : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Edit Labels Button (Global) */}
      {editMode && (
        <button onClick={openSectionVisibilityModal} className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50">
          <Edit className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default StudentCouncilPage;