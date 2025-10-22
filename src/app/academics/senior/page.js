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
  X
} from 'lucide-react';

const SeniorSchoolPage = ({ schoolData = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStream, setActiveStream] = useState('science');
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
      title: "Senior School",
      subtitle: "Preparing future leaders for academic excellence and professional success in Classes XI-XII",
      height: "h-96",
      cta: "Download Senior School Prospectus",
      ctaIcon: Download,
      ctaLink: "#"
    },
    tabs: [
      { id: 'overview', name: 'Overview', icon: BookOpen, show: true },
      { id: 'streams', name: 'Academic Streams', icon: Target, show: true },
      { id: 'curriculum', name: 'Curriculum', icon: GraduationCap, show: true },
      { id: 'career', name: 'Career Guidance', icon: Briefcase, show: true }
    ],
    introduction: {
      show: true,
      title: "Welcome to Senior School",
      description: "Our Senior School program (Classes XI-XII) provides specialized education through three academic streams, preparing students for higher education and professional careers. We offer a rigorous curriculum, expert faculty guidance, and comprehensive support for competitive examinations and university admissions.",
      stats: [
        { icon: Users, value: "25:1", label: "Student-Teacher Ratio", show: true },
        { icon: Clock, value: "8:00 AM - 3:30 PM", label: "Daily Schedule", show: true },
        { icon: GraduationCap, value: "Subject Expert", label: "Faculty", show: true },
        { icon: Star, value: "100%", label: "Board Pass Rate", show: true }
      ],
      teachingApproach: [
        {
          icon: Lightbulb,
          title: "Conceptual Mastery",
          description: "Deep understanding of fundamental concepts through advanced pedagogical approaches",
          show: true
        },
        {
          icon: Brain,
          title: "Critical Analysis",
          description: "Developing analytical skills and higher-order thinking for competitive examinations",
          show: true
        },
        {
          icon: Target,
          title: "Exam Preparation",
          description: "Comprehensive preparation for board exams and competitive entrance tests",
          show: true
        },
        {
          icon: Briefcase,
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
          icon: Microscope,
          description: 'For students aspiring to pursue careers in engineering, medicine, research, and technology',
          subjects: [
            { name: 'Physics', icon: Atom, show: true },
            { name: 'Chemistry', icon: FlaskRound, show: true },
            { name: 'Mathematics', icon: Calculator, show: true },
            { name: 'Biology', icon: Eye, show: true },
            { name: 'Computer Science', icon: Code, show: true },
            { name: 'English Core', icon: Book, show: true }
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
          icon: BarChart3,
          description: 'For students interested in business, finance, accounting, and economics',
          subjects: [
            { name: 'Accountancy', icon: FileText, show: true },
            { name: 'Business Studies', icon: Briefcase, show: true },
            { name: 'Economics', icon: Globe, show: true },
            { name: 'Mathematics', icon: Calculator, show: true },
            { name: 'Informatics Practices', icon: Code, show: true },
            { name: 'English Core', icon: Book, show: true }
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
          icon: Landmark,
          description: 'For students passionate about social sciences, languages, arts, and humanities',
          subjects: [
            { name: 'History', icon: Book, show: true },
            { name: 'Political Science', icon: Landmark, show: true },
            { name: 'Economics', icon: Globe, show: true },
            { name: 'Psychology', icon: Brain, show: true },
            { name: 'Geography', icon: Globe, show: true },
            { name: 'English Core', icon: Book, show: true }
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
      ]
    },
    specialPrograms: [
      {
        icon: Microscope,
        title: "Advanced Science Program",
        description: "Research projects, Olympiad training, and advanced laboratory work",
        show: true
      },
      {
        icon: BarChart3,
        title: "Commerce Excellence",
        description: "Stock market simulations, business case studies, and financial literacy programs",
        show: true
      },
      {
        icon: Landmark,
        title: "Humanities Research",
        description: "Social research projects, debate competitions, and model United Nations",
        show: true
      },
      {
        icon: Code,
        title: "Technology Innovation",
        description: "Advanced programming, robotics, and technology development projects",
        show: true
      }
    ],
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
        ],
        show: true
      }
    },
    careerGuidance: {
      show: true,
      title: "Career Guidance & University Placement",
      description: "Comprehensive support for career planning and higher education admissions",
      services: [
        {
          icon: GraduationCap,
          title: "University Counseling",
          description: "Personalized guidance for college selection and admission processes",
          show: true
        },
        {
          icon: Briefcase,
          title: "Career Workshops",
          description: "Sessions with industry professionals and career experts",
          show: true
        },
        {
          icon: FileText,
          title: "Entrance Exam Preparation",
          description: "Specialized coaching for JEE, NEET, CLAT, and other competitive exams",
          show: true
        },
        {
          icon: Users,
          title: "Alumni Mentorship",
          description: "Guidance from successful alumni in various professional fields",
          show: true
        }
      ],
      placementRecord: [
        { university: "IITs & NITs", count: "45+ placements", icon: GraduationCap, show: true },
        { university: "Medical Colleges", count: "30+ placements", icon: Heart, show: true },
        { university: "Law Schools", count: "25+ placements", icon: Scale, show: true },
        { university: "Business Schools", count: "40+ placements", icon: Briefcase, show: true },
        { university: "Foreign Universities", count: "20+ placements", icon: Globe, show: true }
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
      buttons: [
        { label: "Apply for Admission", link: "/admissions", show: true },
        { label: "Download Stream Selection Guide", link: "/streams", show: true }
      ]
    },
    showHero: true,
    showTabs: true,
    showIntroduction: true,
    showAcademicStreams: true,
    showCurriculum: true,
    showCareerGuidance: true,
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

  // Handle change for simple arrays of objects
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[arrayKey]) updated[arrayKey] = [];
    updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for string arrays
  const handleStringListChange = (arrayKey, index, value) => {
    const updated = { ...editData };
    if (!updated[arrayKey]) updated[arrayKey] = [];
    const list = [...updated[arrayKey]];
    list[index] = value;
    updated[arrayKey] = list;
    setEditData(updated);
  };

  // Handle change for streams
  const handleStreamChange = (streamIndex, field, value) => {
    const updated = { ...editData };
    if (!updated.streams) updated.streams = [];
    updated.streams[streamIndex] = { ...updated.streams[streamIndex], [field]: value };
    setEditData(updated);
  };

  // Handle change for stream subjects
  const handleStreamSubjectChange = (streamIndex, subjectIndex, field, value) => {
    const updated = { ...editData };
    if (!updated.streams) updated.streams = [];
    if (!updated.streams[streamIndex].subjects) updated.streams[streamIndex].subjects = [];
    updated.streams[streamIndex].subjects[subjectIndex] = { 
      ...updated.streams[streamIndex].subjects[subjectIndex], 
      [field]: value 
    };
    setEditData(updated);
  };

  // Handle change for stream career pathways
  const handleCareerPathwayChange = (streamIndex, pathwayIndex, value) => {
    const updated = { ...editData };
    if (!updated.streams) updated.streams = [];
    const pathways = [...updated.streams[streamIndex].careerPathways];
    pathways[pathwayIndex] = value;
    updated.streams[streamIndex].careerPathways = pathways;
    setEditData(updated);
  };

  // Handle change for assessment structure
  const handleAssessmentChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.assessmentStructure) updated.assessmentStructure = [];
    updated.assessmentStructure[index] = { ...updated.assessmentStructure[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for academic support
  const handleAcademicSupportChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.academicSupport) updated.academicSupport = [];
    updated.academicSupport[index] = { ...updated.academicSupport[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for schedule items
  const handleScheduleChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.dailySchedule) updated.dailySchedule = { schedule: [] };
    if (!updated.dailySchedule.schedule) updated.dailySchedule.schedule = [];
    updated.dailySchedule.schedule[index] = { ...updated.dailySchedule.schedule[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for career services
  const handleCareerServiceChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.services) updated.services = [];
    updated.services[index] = { ...updated.services[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for placement records
  const handlePlacementRecordChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.placementRecord) updated.placementRecord = [];
    updated.placementRecord[index] = { ...updated.placementRecord[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for university partners
  const handleUniversityPartnerChange = (index, value) => {
    const updated = { ...editData };
    if (!updated.universityPartners) updated.universityPartners = [];
    const partners = [...updated.universityPartners];
    partners[index] = value;
    updated.universityPartners = partners;
    setEditData(updated);
  };

  // Handle change for special programs
  const handleSpecialProgramChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.specialPrograms) updated.specialPrograms = [];
    updated.specialPrograms[index] = { ...updated.specialPrograms[index], [field]: value };
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
  const filteredTabs = data.tabs.filter(tab => tab.show !== false);
  const filteredStats = data.introduction.stats.filter(stat => stat.show !== false);
  const filteredTeachingApproach = data.introduction.teachingApproach.filter(approach => approach.show !== false);
  const filteredStreams = data.academicStreams.streams.filter(stream => stream.show !== false);
  const filteredSpecialPrograms = data.specialPrograms.filter(program => program.show !== false);
  const filteredAssessmentStructure = data.curriculum.assessmentStructure.filter(item => item.show !== false);
  const filteredAcademicSupport = data.curriculum.academicSupport.filter(support => support.show !== false);
  const filteredSchedule = data.curriculum.dailySchedule.schedule.filter(item => item.show !== false);
  const filteredCareerServices = data.careerGuidance.services.filter(service => service.show !== false);
  const filteredPlacementRecords = data.careerGuidance.placementRecord.filter(record => record.show !== false);
  const filteredCTAButtons = data.cta.buttons.filter(button => button.show !== false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {data.showHero && data.hero.show && (
        <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {data.hero.cta && (
                <a 
                  href={data.hero.ctaLink} 
                  className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  {data.hero.cta}
                  <Download className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Tab Navigation */}
      {data.showTabs && filteredTabs.length > 0 && (
        <section className="py-8 bg-white border-b border-gray-200 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {filteredTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
            </button>
          )}
        </section>
      )}

      {/* Overview Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Introduction */}
          {data.showIntroduction && data.introduction.show && (
            <section className="py-16 bg-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.introduction.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {data.introduction.description}
                    </p>
                    {filteredStats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {filteredStats.map((stat, index) => {
                          const IconComponent = stat.icon;
                          return (
                            <div key={index} className="flex items-center">
                              <IconComponent className="h-5 w-5 text-green-600 mr-2" />
                              <span className="text-sm">{stat.value} {stat.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Educational Approach</h3>
                    <div className="space-y-4">
                      {filteredTeachingApproach.map((approach, index) => {
                        const IconComponent = approach.icon;
                        return (
                          <div key={index} className="flex items-start">
                            <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                              <IconComponent className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{approach.title}</h4>
                              <p className="text-gray-600 text-sm">{approach.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('introduction')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <Settings className="h-4 w-4 mr-1" />
                </button>
              )}
            </section>
          )}

          {/* Academic Streams Preview */}
          {data.showAcademicStreams && data.academicStreams.show && (
            <section className="py-16 bg-gray-50 relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.academicStreams.title}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {data.academicStreams.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredStreams.map((stream) => {
                    const IconComponent = stream.icon;
                    return (
                      <div key={stream.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                        <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-green-600" />
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
                    );
                  })}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('academicStreams')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <Settings className="h-4 w-4 mr-1" />
                </button>
              )}
            </section>
          )}

          {/* Call to Action */}
          {data.showCTA && data.cta.show && (
            <section className="py-16 bg-green-800 text-white relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
                <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
                  {data.cta.description}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {filteredCTAButtons.map((button, index) => (
                    <a
                      key={index}
                      href={button.link}
                      className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                    >
                      {button.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-yellow-400 text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                  <Settings className="h-4 w-4 mr-1" />
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* Academic Streams Content */}
      {activeTab === 'streams' && data.showAcademicStreams && data.academicStreams.show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.academicStreams.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Choose your specialized pathway for Classes XI and XII
              </p>
            </div>

            {/* Stream Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filteredStreams.map((stream) => {
                const IconComponent = stream.icon;
                return (
                  <button
                    key={stream.id}
                    onClick={() => setActiveStream(stream.id)}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                      activeStream === stream.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 mr-2" />
                    {stream.name}
                  </button>
                );
              })}
            </div>

            {/* Stream Details */}
            {filteredStreams.map((stream) => {
              if (stream.id !== activeStream) return null;
              
              const filteredSubjects = stream.subjects.filter(subject => subject.show !== false);
              
              return (
                <div key={stream.id} className="bg-gray-50 rounded-lg p-8">
                  <div className="text-center mb-8">
                    <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <stream.icon className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stream.name}</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">{stream.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Subjects */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Subjects Offered</h4>
                      <div className="space-y-3">
                        {filteredSubjects.map((subject, index) => {
                          const IconComponent = subject.icon;
                          return (
                            <div key={index} className="flex items-center p-3 bg-white rounded-lg">
                              <IconComponent className="h-5 w-5 text-green-600 mr-3" />
                              <span className="font-medium text-gray-800">{subject.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Career Pathways */}
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">Career Pathways</h4>
                      <div className="bg-white rounded-lg p-4">
                        <ul className="space-y-2">
                          {stream.careerPathways.map((pathway, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              <span>{pathway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Special Programs */}
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Stream-Specific Programs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredSpecialPrograms.map((program, index) => {
                        const IconComponent = program.icon;
                        return (
                          <div key={index} className="bg-white rounded-lg p-4 flex items-start">
                            <IconComponent className="h-5 w-5 text-green-600 mr-3 mt-1" />
                            <div>
                              <h5 className="font-medium text-gray-800">{program.title}</h5>
                              <p className="text-gray-600 text-sm">{program.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('academicStreams')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
            </button>
          )}
        </div>
      )}

      {/* Curriculum Content */}
      {activeTab === 'curriculum' && data.showCurriculum && data.curriculum.show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.curriculum.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.curriculum.description}
              </p>
            </div>

            {/* Assessment Structure */}
            <div className="bg-green-50 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Assessment Structure</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive evaluation system designed to prepare students for board examinations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAssessmentStructure.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.component}</h4>
                    <div className="bg-green-100 text-green-800 text-lg font-bold px-3 py-1 rounded-full inline-block mb-2">
                      {item.weightage}
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Support */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Academic Support Systems</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAcademicSupport.map((support, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">{support.title}</h4>
                    <p className="text-gray-600 text-sm">{support.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Schedule */}
            {data.curriculum.dailySchedule.show && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.curriculum.dailySchedule.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSchedule.map((item, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-4 w-4 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-800">{item.time}</div>
                        <div className="text-gray-600 text-sm">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {editMode && (
            <button onClick={() => openEditModal('curriculum')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
            </button>
          )}
        </div>
      )}

      {/* Career Guidance Content */}
      {activeTab === 'career' && data.showCareerGuidance && data.careerGuidance.show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.careerGuidance.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.careerGuidance.description}
              </p>
            </div>

            {/* Career Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredCareerServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Placement Record */}
            <div className="bg-green-50 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Placement Record (Last 3 Years)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {filteredPlacementRecords.map((record, index) => {
                  const IconComponent = record.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg p-4 text-center">
                      <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">{record.university}</h4>
                      <div className="text-green-600 font-bold">{record.count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* University Partners */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">University Partners</h3>
              <div className="flex flex-wrap gap-3">
                {data.careerGuidance.universityPartners.map((university, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
                    {university}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('careerGuidance')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
            </button>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Edit {editSection}</h3>
              <button onClick={() => setEditFormOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Hero Section Edit Form */}
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <textarea 
                      value={editData.subtitle || ''} 
                      onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <input 
                      type="text" 
                      value={editData.height || ''} 
                      onChange={(e) => handleObjectChange('height', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                    <input 
                      type="text" 
                      value={editData.cta || ''} 
                      onChange={(e) => handleObjectChange('cta', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                    <input 
                      type="text" 
                      value={editData.ctaLink || ''} 
                      onChange={(e) => handleObjectChange('ctaLink', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}

              {/* Tabs Section Edit Form */}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  {editData.map((tab, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{tab.name}</h4>
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            checked={tab.show !== false} 
                            onChange={(e) => handleSimpleArrayChange('tabs', index, 'show', e.target.checked)}
                            className="mr-2"
                          />
                          <label className="text-sm">Show</label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          value={tab.name || ''} 
                          onChange={(e) => handleSimpleArrayChange('tabs', index, 'name', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Tab Name"
                        />
                        <input 
                          type="text" 
                          value={tab.id || ''} 
                          onChange={(e) => handleSimpleArrayChange('tabs', index, 'id', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Tab ID"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Introduction Section Edit Form */}
              {editSection === 'introduction' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={editData.description || ''} 
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="4"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Statistics</h4>
                    {editData.stats?.map((stat, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Stat {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={stat.show !== false} 
                              onChange={(e) => handleSimpleArrayChange('stats', index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            value={stat.value || ''} 
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'value', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Value"
                          />
                          <input 
                            type="text" 
                            value={stat.label || ''} 
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'label', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Label"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Teaching Approach</h4>
                    {editData.teachingApproach?.map((approach, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Approach {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={approach.show !== false} 
                              onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={approach.title || ''} 
                            onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Title"
                          />
                          <textarea 
                            value={approach.description || ''} 
                            onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}

              {/* Academic Streams Edit Form */}
              {editSection === 'academicStreams' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={editData.description || ''} 
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="3"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Streams</h4>
                    {editData.streams?.map((stream, streamIndex) => (
                      <div key={streamIndex} className="border p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium">{stream.name || `Stream ${streamIndex + 1}`}</h5>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={stream.show !== false} 
                              onChange={(e) => handleStreamChange(streamIndex, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <input 
                            type="text" 
                            value={stream.name || ''} 
                            onChange={(e) => handleStreamChange(streamIndex, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Stream Name"
                          />
                          <textarea 
                            value={stream.description || ''} 
                            onChange={(e) => handleStreamChange(streamIndex, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                            rows="2"
                          />
                          
                          <div>
                            <h6 className="font-medium text-sm mb-1">Subjects</h6>
                            {stream.subjects?.map((subject, subjectIndex) => (
                              <div key={subjectIndex} className="flex items-center space-x-2 mb-1">
                                <input 
                                  type="text" 
                                  value={subject.name || ''} 
                                  onChange={(e) => handleStreamSubjectChange(streamIndex, subjectIndex, 'name', e.target.value)}
                                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                                  placeholder="Subject Name"
                                />
                                <input 
                                  type="checkbox" 
                                  checked={subject.show !== false} 
                                  onChange={(e) => handleStreamSubjectChange(streamIndex, subjectIndex, 'show', e.target.checked)}
                                  className="mr-1"
                                />
                                <label className="text-xs">Show</label>
                              </div>
                            ))}
                          </div>

                          <div>
                            <h6 className="font-medium text-sm mb-1">Career Pathways</h6>
                            {stream.careerPathways?.map((pathway, pathwayIndex) => (
                              <input 
                                key={pathwayIndex}
                                type="text" 
                                value={pathway || ''} 
                                onChange={(e) => handleCareerPathwayChange(streamIndex, pathwayIndex, e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1"
                                placeholder="Career Pathway"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Special Programs</h4>
                    {editData.specialPrograms?.map((program, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Program {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={program.show !== false} 
                              onChange={(e) => handleSpecialProgramChange(index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={program.title || ''} 
                            onChange={(e) => handleSpecialProgramChange(index, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Title"
                          />
                          <textarea 
                            value={program.description || ''} 
                            onChange={(e) => handleSpecialProgramChange(index, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}

              {/* Curriculum Edit Form */}
              {editSection === 'curriculum' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={editData.description || ''} 
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="3"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Assessment Structure</h4>
                    {editData.assessmentStructure?.map((item, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Assessment {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={item.show !== false} 
                              onChange={(e) => handleAssessmentChange(index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <input 
                            type="text" 
                            value={item.component || ''} 
                            onChange={(e) => handleAssessmentChange(index, 'component', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Component"
                          />
                          <input 
                            type="text" 
                            value={item.weightage || ''} 
                            onChange={(e) => handleAssessmentChange(index, 'weightage', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Weightage"
                          />
                          <input 
                            type="text" 
                            value={item.description || ''} 
                            onChange={(e) => handleAssessmentChange(index, 'description', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Academic Support</h4>
                    {editData.academicSupport?.map((support, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Support {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={support.show !== false} 
                              onChange={(e) => handleAcademicSupportChange(index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={support.title || ''} 
                            onChange={(e) => handleAcademicSupportChange(index, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Title"
                          />
                          <textarea 
                            value={support.description || ''} 
                            onChange={(e) => handleAcademicSupportChange(index, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Daily Schedule</h4>
                    <div className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={editData.dailySchedule?.show !== false} 
                        onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, show: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="text-sm">Show Daily Schedule</label>
                    </div>
                    <input 
                      type="text" 
                      value={editData.dailySchedule?.title || ''} 
                      onChange={(e) => handleObjectChange('dailySchedule', { ...editData.dailySchedule, title: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-3"
                      placeholder="Schedule Title"
                    />
                    {editData.dailySchedule?.schedule?.map((item, index) => (
                      <div key={index} className="border p-2 rounded-lg mb-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">Item {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={item.show !== false} 
                              onChange={(e) => handleScheduleChange(index, 'show', e.target.checked)}
                              className="mr-1"
                            />
                            <label className="text-xs">Show</label>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <input 
                            type="text" 
                            value={item.time || ''} 
                            onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs"
                            placeholder="Time"
                          />
                          <input 
                            type="text" 
                            value={item.activity || ''} 
                            onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-xs"
                            placeholder="Activity"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}

              {/* Career Guidance Edit Form */}
              {editSection === 'careerGuidance' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={editData.description || ''} 
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="3"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Career Services</h4>
                    {editData.services?.map((service, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Service {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={service.show !== false} 
                              onChange={(e) => handleCareerServiceChange(index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            value={service.title || ''} 
                            onChange={(e) => handleCareerServiceChange(index, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Title"
                          />
                          <textarea 
                            value={service.description || ''} 
                            onChange={(e) => handleCareerServiceChange(index, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Description"
                            rows="2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Placement Records</h4>
                    {editData.placementRecord?.map((record, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Record {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={record.show !== false} 
                              onChange={(e) => handlePlacementRecordChange(index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={record.university || ''} 
                            onChange={(e) => handlePlacementRecordChange(index, 'university', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="University"
                          />
                          <input 
                            type="text" 
                            value={record.count || ''} 
                            onChange={(e) => handlePlacementRecordChange(index, 'count', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Count"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">University Partners</h4>
                    {editData.universityPartners?.map((partner, index) => (
                      <input 
                        key={index}
                        type="text" 
                        value={partner || ''} 
                        onChange={(e) => handleUniversityPartnerChange(index, e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-1"
                        placeholder="University Partner"
                      />
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}

              {/* CTA Section Edit Form */}
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={editData.title || ''} 
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      value={editData.description || ''} 
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Buttons</h4>
                    {editData.buttons?.map((button, index) => (
                      <div key={index} className="border p-3 rounded-lg mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Button {index + 1}</span>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              checked={button.show !== false} 
                              onChange={(e) => handleSimpleArrayChange('buttons', index, 'show', e.target.checked)}
                              className="mr-2"
                            />
                            <label className="text-sm">Show</label>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            value={button.label || ''} 
                            onChange={(e) => handleSimpleArrayChange('buttons', index, 'label', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Button Text"
                          />
                          <input 
                            type="text" 
                            value={button.link || ''} 
                            onChange={(e) => handleSimpleArrayChange('buttons', index, 'link', e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="Button Link"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={editData.show !== false} 
                      onChange={(e) => handleObjectChange('show', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Show Section</label>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button 
                onClick={() => setEditFormOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorSchoolPage;