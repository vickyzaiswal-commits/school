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
  Palette,
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
  Book,
  BarChart3,
  Languages,
  Clock,
  FileText,
  Settings,
  X
} from 'lucide-react';

const MiddleSchoolPage = ({ schoolData = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');
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
      title: "Middle School",
      subtitle: "Building strong foundations for future success in Classes VI-VIII",
      height: "h-96", // Consistent with other pages
      cta: "Download Middle School Brochure",
      ctaIcon: Download,
      ctaLink: "#"
    },
    tabs: [
      { id: 'overview', name: 'Overview', icon: BookOpen, show: true },
      { id: 'curriculum', name: 'Curriculum', icon: Target, show: true },
      { id: 'activities', name: 'Activities', icon: Palette, show: true },
      { id: 'facilities', name: 'Facilities', icon: Microscope, show: true }
    ],
    introduction: {
      show: true,
      title: "Welcome to Middle School",
      description: "Our Middle School program (Classes VI-VIII) is designed to guide students through a critical period of intellectual, social, and emotional development. We provide a challenging yet supportive environment that prepares students for the academic rigors of secondary school while nurturing their individual interests and talents.",
      stats: [
        { icon: Users, value: "28:1", label: "Student-Teacher Ratio", show: true },
        { icon: Clock, value: "8:00 AM - 3:30 PM", label: "Daily Schedule", show: true },
        { icon: GraduationCap, value: "Specialist", label: "Subject Teachers", show: true },
        { icon: Star, value: "Advanced", label: "Learning Resources", show: true }
      ],
      teachingApproach: [
        {
          icon: Lightbulb,
          title: "Inquiry-Based Learning",
          description: "Encouraging curiosity and independent research through project-based learning and investigations.",
          show: true
        },
        {
          icon: Users,
          title: "Collaborative Learning",
          description: "Structured group work that develops teamwork, communication, and problem-solving skills.",
          show: true
        },
        {
          icon: Brain,
          title: "Critical Thinking",
          description: "Developing analytical skills through challenging problems and logical reasoning exercises.",
          show: true
        },
        {
          icon: Target,
          title: "Goal Setting",
          description: "Teaching students to set academic and personal goals and develop strategies to achieve them.",
          show: true
        }
      ]
    },
    gradeLevels: {
      show: true,
      title: "Grade Level Overview",
      description: "Our progressive curriculum builds skills and knowledge through middle school years",
      levels: [
        {
          grade: "Class VI",
          focus: "Transition & Foundation Building",
          subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education"],
          description: "Smooth transition from primary to middle school with emphasis on organizational skills and foundational knowledge.",
          show: true
        },
        {
          grade: "Class VII",
          focus: "Skill Development & Exploration",
          subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education", "Value Education"],
          description: "Developing critical thinking skills and exploring various academic disciplines in greater depth.",
          show: true
        },
        {
          grade: "Class VIII",
          focus: "Consolidation & Preparation",
          subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education", "Value Education"],
          description: "Consolidating learning and preparing for the transition to secondary school with advanced concepts.",
          show: true
        }
      ]
    },
    curriculum: {
      show: true,
      title: "Middle School Curriculum",
      description: "A comprehensive and challenging curriculum designed for adolescent learners",
      subjectDetails: [
        {
          category: "Core Academic Subjects",
          subjects: [
            {
              name: "Mathematics",
              description: "Advanced concepts in algebra, geometry, statistics, and logical reasoning",
              icon: Calculator,
              features: ["Problem-solving strategies", "Mathematical reasoning", "Application to real-world scenarios"],
              show: true
            },
            {
              name: "Science",
              description: "Integrated approach to physics, chemistry, and biology with laboratory work",
              icon: Microscope,
              features: ["Hands-on experiments", "Scientific method", "Research projects"],
              show: true
            },
            {
              name: "English",
              description: "Literature, composition, grammar, and communication skills development",
              icon: BookOpen,
              features: ["Creative writing", "Literary analysis", "Presentation skills"],
              show: true
            },
            {
              name: "Social Studies",
              description: "History, geography, civics, and economics with interdisciplinary connections",
              icon: Globe,
              features: ["Research projects", "Map skills", "Current events analysis"],
              show: true
            }
          ],
          show: true
        },
        {
          category: "Additional Subjects",
          subjects: [
            {
              name: "Computer Science",
              description: "Programming fundamentals, digital literacy, and technology applications",
              icon: Code,
              features: ["Coding basics", "Digital citizenship", "Multimedia projects"],
              show: true
            },
            {
              name: "Hindi",
              description: "Language proficiency, literature, and communication skills",
              icon: Languages,
              features: ["Language mastery", "Creative expression", "Cultural context"],
              show: true
            },
            {
              name: "Visual Arts",
              description: "Exploring various media, techniques, and art history",
              icon: Palette,
              features: ["Technical skills", "Art appreciation", "Creative expression"],
              show: true
            },
            {
              name: "Physical Education",
              description: "Sports, fitness, health education, and teamwork development",
              icon: Heart,
              features: ["Skill development", "Health education", "Team sports"],
              show: true
            }
          ],
          show: true
        }
      ],
      assessmentMethods: [
        {
          term: "Periodic Tests",
          description: "Regular assessments covering recent topics and concepts",
          weightage: "20%",
          show: true
        },
        {
          term: "Notebook Submission",
          description: "Evaluation of classwork, homework, and organization",
          weightage: "5%",
          show: true
        },
        {
          term: "Subject Enrichment",
          description: "Projects, practical work, and activities specific to each subject",
          weightage: "5%",
          show: true
        },
        {
          term: "Term-End Examination",
          description: "Comprehensive evaluation of entire term's syllabus",
          weightage: "70%",
          show: true
        }
      ],
      dailySchedule: {
        title: "Typical Daily Schedule",
        schedule: [
          { time: "8:00 AM", activity: "Assembly & Morning Prayer", show: true },
          { time: "8:15 AM", activity: "First Period", show: true },
          { time: "9:00 AM", activity: "Second Period", show: true },
          { time: "9:45 AM", activity: "Third Period", show: true },
          { time: "10:30 AM", activity: "Short Break", show: true },
          { time: "10:45 AM", activity: "Fourth Period", show: true },
          { time: "11:30 AM", activity: "Fifth Period", show: true },
          { time: "12:15 PM", activity: "Lunch Break", show: true },
          { time: "1:00 PM", activity: "Sixth Period", show: true },
          { time: "1:45 PM", activity: "Seventh Period", show: true },
          { time: "2:30 PM", activity: "Co-curricular Activities", show: true },
          { time: "3:30 PM", activity: "Dispersal", show: true }
        ],
        show: true
      }
    },
    activities: {
      show: true,
      title: "Co-Curricular Activities",
      description: "Enriching experiences that complement academic learning and develop well-rounded individuals",
      specialPrograms: [
        {
          icon: Microscope,
          title: "Science Lab Program",
          description: "Hands-on experiments and scientific inquiry across physics, chemistry, and biology.",
          show: true
        },
        {
          icon: Code,
          title: "Coding & Robotics",
          description: "Introduction to programming languages, computational thinking, and robotics projects.",
          show: true
        },
        {
          icon: Globe,
          title: "Model United Nations",
          description: "Developing global perspectives through debate, diplomacy, and international issues.",
          show: true
        },
        {
          icon: Book,
          title: "Literature Circles",
          description: "Reading and discussion groups that explore diverse literary works and themes.",
          show: true
        }
      ],
      clubs: [
        { name: "Science Club", icon: Microscope, show: true },
        { name: "Math Club", icon: Calculator, show: true },
        { name: "Debate Society", icon: Globe, show: true },
        { name: "Art Club", icon: Palette, show: true },
        { name: "Music Club", icon: FileText, show: true },
        { name: "Eco Club", icon: Heart, show: true },
        { name: "IT Club", icon: Code, show: true },
        { name: "Drama Club", icon: Users, show: true }
      ],
      annualEvents: [
        { name: "Science Exhibition", description: "Showcasing innovative projects and experiments", show: true },
        { name: "Math Olympiad", description: "Inter-school mathematics competition", show: true },
        { name: "Literary Fest", description: "Debate, creative writing, and storytelling events", show: true },
        { name: "Sports Day", description: "Annual athletic competition and games", show: true },
        { name: "Art Exhibition", description: "Display of student artwork across mediums", show: true },
        { name: "Annual Day", description: "Cultural performances and talent showcase", show: true }
      ]
    },
    facilities: {
      show: true,
      title: "Middle School Facilities",
      description: "Specialized learning environments designed for adolescent learners",
      academicFacilities: [
        "Subject-specific classrooms with advanced teaching aids",
        "Science laboratories for physics, chemistry, and biology",
        "Computer lab with programming software and internet access",
        "Mathematics lab with manipulatives and learning tools",
        "Library with extensive reference and fiction collections",
        "Audio-visual room for multimedia presentations"
      ],
      specializedAreas: [
        "Art studio with various media and equipment",
        "Music room with instruments and practice spaces",
        "Drama and performance area with stage facilities",
        "Indoor sports complex for badminton, table tennis, etc.",
        "Outdoor sports fields for cricket, football, and athletics",
        "Counseling center for academic and personal guidance"
      ],
      technologyIntegration: [
        { title: "Smart Classrooms", description: "Interactive whiteboards and digital learning tools", show: true },
        { title: "1:1 Device Program", description: "Controlled access to tablets for educational purposes", show: true },
        { title: "Coding Curriculum", description: "Structured programming education across grades", show: true },
        { title: "Digital Library", description: "Access to e-books, online journals, and research databases", show: true }
      ]
    },
    cta: {
      show: true,
      title: "Prepare for Academic Excellence",
      description: "Join our middle school program and give your child the strong foundation needed for success in secondary school and beyond.",
      buttons: [
        { label: "Apply for Admission", link: "/admissions", show: true },
        { label: "Download Curriculum Guide", link: "/curriculum", show: true }
      ]
    },
    showHero: true,
    showTabs: true,
    showIntroduction: true,
    showGradeLevels: true,
    showCurriculum: true,
    showActivities: true,
    showFacilities: true,
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

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[nestedKey]) updated[nestedKey] = [];
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for simple arrays of objects (e.g., stats, teachingApproach)
  const handleSimpleArrayChange = (arrayKey, index, field, value) => {
    const updated = { ...editData };
    if (!updated[arrayKey]) updated[arrayKey] = [];
    updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for grade levels subjects (array of strings)
  const handleGradeSubjectsChange = (levelIndex, subjectIndex, value) => {
    const updated = { ...editData };
    if (!updated.levels) updated.levels = [];
    const subjects = [...updated.levels[levelIndex].subjects];
    subjects[subjectIndex] = value;
    updated.levels[levelIndex].subjects = subjects;
    setEditData(updated);
  };

  // Handle change for string arrays (e.g., academicFacilities)
  const handleStringListChange = (arrayKey, index, value) => {
    const updated = { ...editData };
    if (!updated[arrayKey]) updated[arrayKey] = [];
    const list = [...updated[arrayKey]];
    list[index] = value;
    updated[arrayKey] = list;
    setEditData(updated);
  };

  // Handle change for subjectDetails categories
  const handleCategoryChange = (categoryIndex, field, value) => {
    const updated = { ...editData };
    if (!updated.subjectDetails) updated.subjectDetails = [];
    updated.subjectDetails[categoryIndex] = { ...updated.subjectDetails[categoryIndex], [field]: value };
    setEditData(updated);
  };

  // Handle change for subjects in categories
  const handleSubjectChange = (categoryIndex, subjectIndex, field, value) => {
    const updated = { ...editData };
    if (!updated.subjectDetails) updated.subjectDetails = [];
    const subject = { ...updated.subjectDetails[categoryIndex].subjects[subjectIndex], [field]: value };
    updated.subjectDetails[categoryIndex].subjects[subjectIndex] = subject;
    setEditData(updated);
  };

  // Handle features in subjects
  const handleFeatureChange = (categoryIndex, subjectIndex, featureIndex, value) => {
    const updated = { ...editData };
    if (!updated.subjectDetails) updated.subjectDetails = [];
    const features = [...updated.subjectDetails[categoryIndex].subjects[subjectIndex].features];
    features[featureIndex] = value;
    updated.subjectDetails[categoryIndex].subjects[subjectIndex].features = features;
    setEditData(updated);
  };

  // Handle clubs
  const handleClubChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.clubs) updated.clubs = [];
    updated.clubs[index] = { ...updated.clubs[index], [field]: value };
    setEditData(updated);
  };

  // Handle annual events
  const handleEventChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.annualEvents) updated.annualEvents = [];
    updated.annualEvents[index] = { ...updated.annualEvents[index], [field]: value };
    setEditData(updated);
  };

  // Handle technology integration
  const handleTechChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.technologyIntegration) updated.technologyIntegration = [];
    updated.technologyIntegration[index] = { ...updated.technologyIntegration[index], [field]: value };
    setEditData(updated);
  };

  // Handle schedule items
  const handleScheduleChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.dailySchedule) updated.dailySchedule = { schedule: [] };
    if (!updated.dailySchedule.schedule) updated.dailySchedule.schedule = [];
    updated.dailySchedule.schedule[index] = { ...updated.dailySchedule.schedule[index], [field]: value };
    setEditData(updated);
  };

  // Handle assessment methods
  const handleAssessmentChange = (index, field, value) => {
    const updated = { ...editData };
    if (!updated.assessmentMethods) updated.assessmentMethods = [];
    updated.assessmentMethods[index] = { ...updated.assessmentMethods[index], [field]: value };
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
  const filteredGradeLevels = data.gradeLevels.levels.filter(level => level.show !== false);
  const filteredSubjectCategories = data.curriculum.subjectDetails.filter(category => category.show !== false);
  const filteredAssessmentMethods = data.curriculum.assessmentMethods.filter(method => method.show !== false);
  const filteredSchedule = data.curriculum.dailySchedule.schedule.filter(item => item.show !== false);
  const filteredSpecialPrograms = data.activities.specialPrograms.filter(program => program.show !== false);
  const filteredClubs = data.activities.clubs.filter(club => club.show !== false);
  const filteredAnnualEvents = data.activities.annualEvents.filter(event => event.show !== false);
  const filteredTechIntegration = data.facilities.technologyIntegration.filter(item => item.show !== false);
  const filteredCTAButtons = data.cta.buttons.filter(button => button.show !== false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Consistent with other pages */}
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Approach</h3>
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

          {/* Grade Levels */}
          {data.showGradeLevels && data.gradeLevels.show && (
            <section className="py-16 bg-gray-50 relative animate-on-scroll">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.gradeLevels.title}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {data.gradeLevels.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredGradeLevels.map((level, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="bg-green-700 text-white p-4">
                        <h3 className="text-xl font-semibold">{level.grade}</h3>
                        <p className="text-green-100">{level.focus}</p>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 mb-4">{level.description}</p>
                        <h4 className="font-medium text-gray-800 mb-2">Subjects:</h4>
                        <ul className="text-sm text-gray-600 grid grid-cols-2 gap-1">
                          {level.subjects.map((subject, sIndex) => (
                            <li key={sIndex} className="flex items-center">
                              <ChevronRight className="h-3 w-3 text-green-600 mr-1" />
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {editMode && (
                <button onClick={() => openEditModal('gradeLevels')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
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

            {/* Subject Details */}
            {filteredSubjectCategories.map((category, index) => (
              <div key={index} className="mb-16">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-2">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.subjects.filter(subject => subject.show !== false).map((subject, sIndex) => {
                    const IconComponent = subject.icon;
                    return (
                      <div key={sIndex} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="text-xl font-semibold text-gray-800">{subject.name}</h4>
                        </div>
                        <p className="text-gray-600 mb-4">{subject.description}</p>
                        <ul className="space-y-1">
                          {subject.features.map((feature, fIndex) => (
                            <li key={fIndex} className="text-sm text-gray-600 flex items-center">
                              <ChevronRight className="h-3 w-3 text-green-600 mr-1" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Assessment Methods */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Assessment & Evaluation</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {filteredAssessmentMethods.map((method, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-2">{method.weightage}</div>
                      <h4 className="font-medium text-gray-800 mb-1">{method.term}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            {data.curriculum.dailySchedule.show && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{data.curriculum.dailySchedule.title}</h3>
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
            <button onClick={() => openEditModal('curriculum')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
              
            </button>
          )}
        </div>
      )}

      {/* Activities Content */}
      {activeTab === 'activities' && data.showActivities && data.activities.show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.activities.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.activities.description}
              </p>
            </div>

            {/* Special Programs */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Special Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredSpecialPrograms.map((program, index) => {
                  const IconComponent = program.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                          <IconComponent className="h-5 w-5 text-green-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">{program.title}</h4>
                      </div>
                      <p className="text-gray-600">{program.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clubs */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Student Clubs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredClubs.map((club, index) => {
                  const IconComponent = club.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-medium text-gray-800">{club.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Annual Events */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-8">Annual Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnualEvents.map((event, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h4>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('activities')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
             
            </button>
          )}
        </div>
      )}

      {/* Facilities Content */}
      {activeTab === 'facilities' && data.showFacilities && data.facilities.show && (
        <div className="py-16 bg-white relative animate-on-scroll">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.facilities.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {data.facilities.description}
              </p>
            </div>

            {/* Academic Facilities */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Academic Facilities</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.facilities.academicFacilities.map((facility, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Specialized Areas */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Specialized Areas</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.facilities.specializedAreas.map((area, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technology Integration */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technology Integration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTechIntegration.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('facilities')} className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4 mr-1" />
          
            </button>
          )}
        </div>
      )}

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
            <div className="p-6 overflow-y-auto flex-1">
              {editSection === 'hero' && (
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
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mt-4 mb-2">Tabs</h3>
                  {editData.map((tab, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Tab {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">ID</label>
                        <input
                          type="text"
                          value={tab.id || ''}
                          onChange={(e) => {
                            const updated = [...editData];
                            updated[index].id = e.target.value;
                            setEditData(updated);
                          }}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={tab.name || ''}
                          onChange={(e) => {
                            const updated = [...editData];
                            updated[index].name = e.target.value;
                            setEditData(updated);
                          }}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={tab.show !== false}
                            onChange={(e) => {
                              const updated = [...editData];
                              updated[index].show = e.target.checked;
                              setEditData(updated);
                            }}
                          />
                          <span>Show Tab</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'introduction' && (
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
                      <span>Show Introduction</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {editData.stats && editData.stats.map((stat, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Stat {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleSimpleArrayChange('stats', index, 'value', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleSimpleArrayChange('stats', index, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stat.show !== false}
                            onChange={(e) => handleSimpleArrayChange('stats', index, 'show', e.target.checked)}
                          />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Teaching Approach</h3>
                  {editData.teachingApproach && editData.teachingApproach.map((approach, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Approach {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={approach.title || ''}
                          onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={approach.description || ''}
                          onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={approach.show !== false}
                            onChange={(e) => handleSimpleArrayChange('teachingApproach', index, 'show', e.target.checked)}
                          />
                          <span>Show Approach</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'gradeLevels' && (
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
                      <span>Show Grade Levels</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Levels</h3>
                  {editData.levels && editData.levels.map((level, lIndex) => (
                    <div key={lIndex} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Level {lIndex + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Grade</label>
                        <input
                          type="text"
                          value={level.grade || ''}
                          onChange={(e) => handleNestedArrayChange('levels', lIndex, 'grade', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Focus</label>
                        <input
                          type="text"
                          value={level.focus || ''}
                          onChange={(e) => handleNestedArrayChange('levels', lIndex, 'focus', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={level.description || ''}
                          onChange={(e) => handleNestedArrayChange('levels', lIndex, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <h5 className="text-sm font-medium mb-2">Subjects</h5>
                      {level.subjects && level.subjects.map((subject, sIndex) => (
                        <input
                          key={sIndex}
                          type="text"
                          value={subject}
                          onChange={(e) => handleGradeSubjectsChange(lIndex, sIndex, e.target.value)}
                          className="w-full p-2 border rounded mb-2"
                          placeholder={`Subject ${sIndex + 1}`}
                        />
                      ))}
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={level.show !== false}
                            onChange={(e) => handleNestedArrayChange('levels', lIndex, 'show', e.target.checked)}
                          />
                          <span>Show Level</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'curriculum' && (
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
                      <span>Show Curriculum</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Subject Details Categories</h3>
                  {editData.subjectDetails && editData.subjectDetails.map((category, cIndex) => (
                    <div key={cIndex} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Category {cIndex + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Category Name</label>
                        <input
                          type="text"
                          value={category.category || ''}
                          onChange={(e) => handleCategoryChange(cIndex, 'category', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={category.show !== false}
                            onChange={(e) => handleCategoryChange(cIndex, 'show', e.target.checked)}
                          />
                          <span>Show Category</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-medium mb-2">Subjects</h5>
                      {category.subjects && category.subjects.map((subject, sIndex) => (
                        <div key={sIndex} className="mb-4 p-4 border rounded">
                          <h6 className="text-sm font-semibold mb-2">Subject {sIndex + 1}</h6>
                          <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                              type="text"
                              value={subject.name || ''}
                              onChange={(e) => handleSubjectChange(cIndex, sIndex, 'name', e.target.value)}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                              value={subject.description || ''}
                              onChange={(e) => handleSubjectChange(cIndex, sIndex, 'description', e.target.value)}
                              className="w-full p-2 border rounded"
                              rows="2"
                            />
                          </div>
                          <div>
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={subject.show !== false}
                                onChange={(e) => handleSubjectChange(cIndex, sIndex, 'show', e.target.checked)}
                              />
                              <span>Show Subject</span>
                            </label>
                          </div>
                          <h6 className="text-sm font-medium mb-2">Features</h6>
                          {subject.features && subject.features.map((feature, fIndex) => (
                            <input
                              key={fIndex}
                              type="text"
                              value={feature}
                              onChange={(e) => handleFeatureChange(cIndex, sIndex, fIndex, e.target.value)}
                              className="w-full p-2 border rounded mb-1"
                              placeholder={`Feature ${fIndex + 1}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Assessment Methods</h3>
                  {editData.assessmentMethods && editData.assessmentMethods.map((method, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Method {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Term</label>
                        <input
                          type="text"
                          value={method.term || ''}
                          onChange={(e) => handleAssessmentChange(index, 'term', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={method.description || ''}
                          onChange={(e) => handleAssessmentChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Weightage</label>
                        <input
                          type="text"
                          value={method.weightage || ''}
                          onChange={(e) => handleAssessmentChange(index, 'weightage', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={method.show !== false}
                            onChange={(e) => handleAssessmentChange(index, 'show', e.target.checked)}
                          />
                          <span>Show Method</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Daily Schedule</h3>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.dailySchedule?.title || ''}
                      onChange={(e) => {
                        const updated = { ...editData };
                        if (!updated.dailySchedule) updated.dailySchedule = {};
                        updated.dailySchedule.title = e.target.value;
                        setEditData(updated);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.dailySchedule?.show !== false}
                        onChange={(e) => {
                          const updated = { ...editData };
                          if (!updated.dailySchedule) updated.dailySchedule = {};
                          updated.dailySchedule.show = e.target.checked;
                          setEditData(updated);
                        }}
                      />
                      <span>Show Schedule</span>
                    </label>
                  </div>
                  {editData.dailySchedule?.schedule && editData.dailySchedule.schedule.map((item, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                      <h4 className="text-md font-semibold mb-2">Schedule Item {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Time</label>
                        <input
                          type="text"
                          value={item.time || ''}
                          onChange={(e) => handleScheduleChange(index, 'time', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Activity</label>
                        <input
                          type="text"
                          value={item.activity || ''}
                          onChange={(e) => handleScheduleChange(index, 'activity', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleScheduleChange(index, 'show', e.target.checked)}
                          />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'activities' && (
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
                      <span>Show Activities</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Special Programs</h3>
                  {editData.specialPrograms && editData.specialPrograms.map((program, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={program.title || ''}
                          onChange={(e) => handleSimpleArrayChange('specialPrograms', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={program.description || ''}
                          onChange={(e) => handleSimpleArrayChange('specialPrograms', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={program.show !== false}
                            onChange={(e) => handleSimpleArrayChange('specialPrograms', index, 'show', e.target.checked)}
                          />
                          <span>Show Program</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Clubs</h3>
                  {editData.clubs && editData.clubs.map((club, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Club {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={club.name || ''}
                          onChange={(e) => handleClubChange(index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={club.show !== false}
                            onChange={(e) => handleClubChange(index, 'show', e.target.checked)}
                          />
                          <span>Show Club</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Annual Events</h3>
                  {editData.annualEvents && editData.annualEvents.map((event, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Event {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={event.name || ''}
                          onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={event.description || ''}
                          onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={event.show !== false}
                            onChange={(e) => handleEventChange(index, 'show', e.target.checked)}
                          />
                          <span>Show Event</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'facilities' && (
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
                      <span>Show Facilities</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Academic Facilities</h3>
                  {editData.academicFacilities && editData.academicFacilities.map((facility, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={facility}
                        onChange={(e) => handleStringListChange('academicFacilities', index, e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder={`Facility ${index + 1}`}
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Specialized Areas</h3>
                  {editData.specializedAreas && editData.specializedAreas.map((area, index) => (
                    <div key={index} className="mb-2">
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => handleStringListChange('specializedAreas', index, e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder={`Area ${index + 1}`}
                      />
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Technology Integration</h3>
                  {editData.technologyIntegration && editData.technologyIntegration.map((item, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleTechChange(index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => handleTechChange(index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleTechChange(index, 'show', e.target.checked)}
                          />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'cta' && (
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
                      <span>Show CTA</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Buttons</h3>
                  {editData.buttons && editData.buttons.map((button, bIndex) => (
                    <div key={bIndex} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Button {bIndex + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={button.label || ''}
                          onChange={(e) => handleNestedArrayChange('buttons', bIndex, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Link</label>
                        <input
                          type="text"
                          value={button.link || ''}
                          onChange={(e) => handleNestedArrayChange('buttons', bIndex, 'link', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={button.show !== false}
                            onChange={(e) => handleNestedArrayChange('buttons', bIndex, 'show', e.target.checked)}
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
            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => setEditFormOpen(false)}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

export default MiddleSchoolPage;























// "use client";
// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   Users, 
//   Target,
//   Calculator,
//   Microscope,
//   Globe,
//   Code,
//   Palette,
//   Heart,
//   Shield,
//   Calendar,
//   ChevronRight,
//   Download,
//   ExternalLink,
//   ArrowRight,
//   Star,
//   Award,
//   GraduationCap,
//   Lightbulb,
//   Brain,
//   Book,
//   BarChart3,
//   Languages,
//   Clock,
//   FileText
// } from 'lucide-react';

// const MiddleSchoolPage = ({ schoolData = {} }) => {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   // Default data structure - Consistent with other pages
//   const defaultData = {
//     hero: {
//       show: true,
//       title: "Middle School",
//       subtitle: "Building strong foundations for future success in Classes VI-VIII",
//       height: "h-96", // Consistent with other pages
//       cta: "Download Middle School Brochure",
//       ctaIcon: Download,
//       ctaLink: "#"
//     },
//     tabs: [
//       { id: 'overview', name: 'Overview', icon: BookOpen, show: true },
//       { id: 'curriculum', name: 'Curriculum', icon: Target, show: true },
//       { id: 'activities', name: 'Activities', icon: Palette, show: true },
//       { id: 'facilities', name: 'Facilities', icon: Microscope, show: true }
//     ],
//     introduction: {
//       show: true,
//       title: "Welcome to Middle School",
//       description: "Our Middle School program (Classes VI-VIII) is designed to guide students through a critical period of intellectual, social, and emotional development. We provide a challenging yet supportive environment that prepares students for the academic rigors of secondary school while nurturing their individual interests and talents.",
//       stats: [
//         { icon: Users, value: "28:1", label: "Student-Teacher Ratio", show: true },
//         { icon: Clock, value: "8:00 AM - 3:30 PM", label: "Daily Schedule", show: true },
//         { icon: GraduationCap, value: "Specialist", label: "Subject Teachers", show: true },
//         { icon: Star, value: "Advanced", label: "Learning Resources", show: true }
//       ],
//       teachingApproach: [
//         {
//           icon: Lightbulb,
//           title: "Inquiry-Based Learning",
//           description: "Encouraging curiosity and independent research through project-based learning and investigations.",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Collaborative Learning",
//           description: "Structured group work that develops teamwork, communication, and problem-solving skills.",
//           show: true
//         },
//         {
//           icon: Brain,
//           title: "Critical Thinking",
//           description: "Developing analytical skills through challenging problems and logical reasoning exercises.",
//           show: true
//         },
//         {
//           icon: Target,
//           title: "Goal Setting",
//           description: "Teaching students to set academic and personal goals and develop strategies to achieve them.",
//           show: true
//         }
//       ]
//     },
//     gradeLevels: {
//       show: true,
//       title: "Grade Level Overview",
//       description: "Our progressive curriculum builds skills and knowledge through middle school years",
//       levels: [
//         {
//           grade: "Class VI",
//           focus: "Transition & Foundation Building",
//           subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education"],
//           description: "Smooth transition from primary to middle school with emphasis on organizational skills and foundational knowledge.",
//           show: true
//         },
//         {
//           grade: "Class VII",
//           focus: "Skill Development & Exploration",
//           subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education", "Value Education"],
//           description: "Developing critical thinking skills and exploring various academic disciplines in greater depth.",
//           show: true
//         },
//         {
//           grade: "Class VIII",
//           focus: "Consolidation & Preparation",
//           subjects: ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Computer Science", "Art", "Physical Education", "Value Education"],
//           description: "Consolidating learning and preparing for the transition to secondary school with advanced concepts.",
//           show: true
//         }
//       ]
//     },
//     curriculum: {
//       show: true,
//       title: "Middle School Curriculum",
//       description: "A comprehensive and challenging curriculum designed for adolescent learners",
//       subjectDetails: [
//         {
//           category: "Core Academic Subjects",
//           subjects: [
//             {
//               name: "Mathematics",
//               description: "Advanced concepts in algebra, geometry, statistics, and logical reasoning",
//               icon: Calculator,
//               features: ["Problem-solving strategies", "Mathematical reasoning", "Application to real-world scenarios"],
//               show: true
//             },
//             {
//               name: "Science",
//               description: "Integrated approach to physics, chemistry, and biology with laboratory work",
//               icon: Microscope,
//               features: ["Hands-on experiments", "Scientific method", "Research projects"],
//               show: true
//             },
//             {
//               name: "English",
//               description: "Literature, composition, grammar, and communication skills development",
//               icon: BookOpen,
//               features: ["Creative writing", "Literary analysis", "Presentation skills"],
//               show: true
//             },
//             {
//               name: "Social Studies",
//               description: "History, geography, civics, and economics with interdisciplinary connections",
//               icon: Globe,
//               features: ["Research projects", "Map skills", "Current events analysis"],
//               show: true
//             }
//           ],
//           show: true
//         },
//         {
//           category: "Additional Subjects",
//           subjects: [
//             {
//               name: "Computer Science",
//               description: "Programming fundamentals, digital literacy, and technology applications",
//               icon: Code,
//               features: ["Coding basics", "Digital citizenship", "Multimedia projects"],
//               show: true
//             },
//             {
//               name: "Hindi",
//               description: "Language proficiency, literature, and communication skills",
//               icon: Languages,
//               features: ["Language mastery", "Creative expression", "Cultural context"],
//               show: true
//             },
//             {
//               name: "Visual Arts",
//               description: "Exploring various media, techniques, and art history",
//               icon: Palette,
//               features: ["Technical skills", "Art appreciation", "Creative expression"],
//               show: true
//             },
//             {
//               name: "Physical Education",
//               description: "Sports, fitness, health education, and teamwork development",
//               icon: Heart,
//               features: ["Skill development", "Health education", "Team sports"],
//               show: true
//             }
//           ],
//           show: true
//         }
//       ],
//       assessmentMethods: [
//         {
//           term: "Periodic Tests",
//           description: "Regular assessments covering recent topics and concepts",
//           weightage: "20%",
//           show: true
//         },
//         {
//           term: "Notebook Submission",
//           description: "Evaluation of classwork, homework, and organization",
//           weightage: "5%",
//           show: true
//         },
//         {
//           term: "Subject Enrichment",
//           description: "Projects, practical work, and activities specific to each subject",
//           weightage: "5%",
//           show: true
//         },
//         {
//           term: "Term-End Examination",
//           description: "Comprehensive evaluation of entire term's syllabus",
//           weightage: "70%",
//           show: true
//         }
//       ],
//       dailySchedule: {
//         title: "Typical Daily Schedule",
//         schedule: [
//           { time: "8:00 AM", activity: "Assembly & Morning Prayer", show: true },
//           { time: "8:15 AM", activity: "First Period", show: true },
//           { time: "9:00 AM", activity: "Second Period", show: true },
//           { time: "9:45 AM", activity: "Third Period", show: true },
//           { time: "10:30 AM", activity: "Short Break", show: true },
//           { time: "10:45 AM", activity: "Fourth Period", show: true },
//           { time: "11:30 AM", activity: "Fifth Period", show: true },
//           { time: "12:15 PM", activity: "Lunch Break", show: true },
//           { time: "1:00 PM", activity: "Sixth Period", show: true },
//           { time: "1:45 PM", activity: "Seventh Period", show: true },
//           { time: "2:30 PM", activity: "Co-curricular Activities", show: true },
//           { time: "3:30 PM", activity: "Dispersal", show: true }
//         ],
//         show: true
//       }
//     },
//     activities: {
//       show: true,
//       title: "Co-Curricular Activities",
//       description: "Enriching experiences that complement academic learning and develop well-rounded individuals",
//       specialPrograms: [
//         {
//           icon: Microscope,
//           title: "Science Lab Program",
//           description: "Hands-on experiments and scientific inquiry across physics, chemistry, and biology.",
//           show: true
//         },
//         {
//           icon: Code,
//           title: "Coding & Robotics",
//           description: "Introduction to programming languages, computational thinking, and robotics projects.",
//           show: true
//         },
//         {
//           icon: Globe,
//           title: "Model United Nations",
//           description: "Developing global perspectives through debate, diplomacy, and international issues.",
//           show: true
//         },
//         {
//           icon: Book,
//           title: "Literature Circles",
//           description: "Reading and discussion groups that explore diverse literary works and themes.",
//           show: true
//         }
//       ],
//       clubs: [
//         { name: "Science Club", icon: Microscope, show: true },
//         { name: "Math Club", icon: Calculator, show: true },
//         { name: "Debate Society", icon: Globe, show: true },
//         { name: "Art Club", icon: Palette, show: true },
//         { name: "Music Club", icon: FileText, show: true },
//         { name: "Eco Club", icon: Heart, show: true },
//         { name: "IT Club", icon: Code, show: true },
//         { name: "Drama Club", icon: Users, show: true }
//       ],
//       annualEvents: [
//         { name: "Science Exhibition", description: "Showcasing innovative projects and experiments", show: true },
//         { name: "Math Olympiad", description: "Inter-school mathematics competition", show: true },
//         { name: "Literary Fest", description: "Debate, creative writing, and storytelling events", show: true },
//         { name: "Sports Day", description: "Annual athletic competition and games", show: true },
//         { name: "Art Exhibition", description: "Display of student artwork across mediums", show: true },
//         { name: "Annual Day", description: "Cultural performances and talent showcase", show: true }
//       ]
//     },
//     facilities: {
//       show: true,
//       title: "Middle School Facilities",
//       description: "Specialized learning environments designed for adolescent learners",
//       academicFacilities: [
//         "Subject-specific classrooms with advanced teaching aids",
//         "Science laboratories for physics, chemistry, and biology",
//         "Computer lab with programming software and internet access",
//         "Mathematics lab with manipulatives and learning tools",
//         "Library with extensive reference and fiction collections",
//         "Audio-visual room for multimedia presentations"
//       ],
//       specializedAreas: [
//         "Art studio with various media and equipment",
//         "Music room with instruments and practice spaces",
//         "Drama and performance area with stage facilities",
//         "Indoor sports complex for badminton, table tennis, etc.",
//         "Outdoor sports fields for cricket, football, and athletics",
//         "Counseling center for academic and personal guidance"
//       ],
//       technologyIntegration: [
//         { title: "Smart Classrooms", description: "Interactive whiteboards and digital learning tools", show: true },
//         { title: "1:1 Device Program", description: "Controlled access to tablets for educational purposes", show: true },
//         { title: "Coding Curriculum", description: "Structured programming education across grades", show: true },
//         { title: "Digital Library", description: "Access to e-books, online journals, and research databases", show: true }
//       ]
//     },
//     cta: {
//       show: true,
//       title: "Prepare for Academic Excellence",
//       description: "Join our middle school program and give your child the strong foundation needed for success in secondary school and beyond.",
//       buttons: [
//         { label: "Apply for Admission", link: "/admissions", show: true },
//         { label: "Download Curriculum Guide", link: "/curriculum", show: true }
//       ]
//     },
//     showHero: true,
//     showTabs: true,
//     showIntroduction: true,
//     showGradeLevels: true,
//     showCurriculum: true,
//     showActivities: true,
//     showFacilities: true,
//     showCTA: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...schoolData };

//   // Filter functions
//   const filteredTabs = data.tabs.filter(tab => tab.show !== false);
//   const filteredStats = data.introduction.stats.filter(stat => stat.show !== false);
//   const filteredTeachingApproach = data.introduction.teachingApproach.filter(approach => approach.show !== false);
//   const filteredGradeLevels = data.gradeLevels.levels.filter(level => level.show !== false);
//   const filteredSubjectCategories = data.curriculum.subjectDetails.filter(category => category.show !== false);
//   const filteredAssessmentMethods = data.curriculum.assessmentMethods.filter(method => method.show !== false);
//   const filteredSchedule = data.curriculum.dailySchedule.schedule.filter(item => item.show !== false);
//   const filteredSpecialPrograms = data.activities.specialPrograms.filter(program => program.show !== false);
//   const filteredClubs = data.activities.clubs.filter(club => club.show !== false);
//   const filteredAnnualEvents = data.activities.annualEvents.filter(event => event.show !== false);
//   const filteredTechIntegration = data.facilities.technologyIntegration.filter(item => item.show !== false);
//   const filteredCTAButtons = data.cta.buttons.filter(button => button.show !== false);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - Consistent with other pages */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//               {data.hero.cta && (
//                 <a 
//                   href={data.hero.ctaLink} 
//                   className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
//                 >
//                   {data.hero.cta}
//                   <Download className="ml-2 h-4 w-4" />
//                 </a>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Tab Navigation */}
//       {data.showTabs && filteredTabs.length > 0 && (
//         <section className="py-8 bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex flex-wrap justify-center gap-2">
//               {filteredTabs.map((tab) => {
//                 const IconComponent = tab.icon;
//                 return (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all ${
//                       activeTab === tab.id
//                         ? 'bg-green-600 text-white shadow-md'
//                         : 'bg-gray-100 text-gray-700 hover:bg-green-50'
//                     }`}
//                   >
//                     <IconComponent className="w-4 h-4 mr-2" />
//                     {tab.name}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Overview Content */}
//       {activeTab === 'overview' && (
//         <div>
//           {/* Introduction */}
//           {data.showIntroduction && data.introduction.show && (
//             <section className="py-16 bg-white">
//               <div className="max-w-7xl mx-auto px-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-800 mb-6">{data.introduction.title}</h2>
//                     <p className="text-lg text-gray-600 mb-6">
//                       {data.introduction.description}
//                     </p>
//                     {filteredStats.length > 0 && (
//                       <div className="grid grid-cols-2 gap-4">
//                         {filteredStats.map((stat, index) => {
//                           const IconComponent = stat.icon;
//                           return (
//                             <div key={index} className="flex items-center">
//                               <IconComponent className="h-5 w-5 text-green-600 mr-2" />
//                               <span className="text-sm">{stat.value} {stat.label}</span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Approach</h3>
//                     <div className="space-y-4">
//                       {filteredTeachingApproach.map((approach, index) => {
//                         const IconComponent = approach.icon;
//                         return (
//                           <div key={index} className="flex items-start">
//                             <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
//                               <IconComponent className="h-4 w-4 text-green-600" />
//                             </div>
//                             <div>
//                               <h4 className="font-medium text-gray-800">{approach.title}</h4>
//                               <p className="text-gray-600 text-sm">{approach.description}</p>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Grade Levels */}
//           {data.showGradeLevels && data.gradeLevels.show && (
//             <section className="py-16 bg-gray-50">
//               <div className="max-w-7xl mx-auto px-4">
//                 <div className="text-center mb-12">
//                   <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.gradeLevels.title}</h2>
//                   <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                     {data.gradeLevels.description}
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                   {filteredGradeLevels.map((level, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                       <div className="bg-green-700 text-white p-4">
//                         <h3 className="text-xl font-semibold">{level.grade}</h3>
//                         <p className="text-green-100">{level.focus}</p>
//                       </div>
//                       <div className="p-6">
//                         <p className="text-gray-600 mb-4">{level.description}</p>
//                         <h4 className="font-medium text-gray-800 mb-2">Subjects:</h4>
//                         <ul className="text-sm text-gray-600 grid grid-cols-2 gap-1">
//                           {level.subjects.map((subject, i) => (
//                             <li key={i} className="flex items-center">
//                               <ChevronRight className="h-3 w-3 text-green-600 mr-1" />
//                               {subject}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Call to Action */}
//           {data.showCTA && data.cta.show && (
//             <section className="py-16 bg-green-800 text-white">
//               <div className="max-w-7xl mx-auto px-4 text-center">
//                 <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
//                 <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
//                   {data.cta.description}
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {filteredCTAButtons.map((button, index) => (
//                     <a
//                       key={index}
//                       href={button.link}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
//                     >
//                       {button.label}
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>
//       )}

//       {/* Curriculum Content */}
//       {activeTab === 'curriculum' && data.showCurriculum && data.curriculum.show && (
//         <div className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.curriculum.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.curriculum.description}
//               </p>
//             </div>

//             {/* Subject Details */}
//             {filteredSubjectCategories.map((category, index) => (
//               <div key={index} className="mb-16">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-2">{category.category}</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {category.subjects.filter(subject => subject.show !== false).map((subject, sIndex) => {
//                     const IconComponent = subject.icon;
//                     return (
//                       <div key={sIndex} className="bg-gray-50 rounded-lg p-6">
//                         <div className="flex items-center mb-4">
//                           <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
//                             <IconComponent className="h-5 w-5 text-green-600" />
//                           </div>
//                           <h4 className="text-xl font-semibold text-gray-800">{subject.name}</h4>
//                         </div>
//                         <p className="text-gray-600 mb-4">{subject.description}</p>
//                         <ul className="space-y-1">
//                           {subject.features.map((feature, fIndex) => (
//                             <li key={fIndex} className="text-sm text-gray-600 flex items-center">
//                               <ChevronRight className="h-3 w-3 text-green-600 mr-1" />
//                               {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             {/* Assessment Methods */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Assessment & Evaluation</h3>
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   {filteredAssessmentMethods.map((method, index) => (
//                     <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
//                       <div className="text-2xl font-bold text-green-600 mb-2">{method.weightage}</div>
//                       <h4 className="font-medium text-gray-800 mb-1">{method.term}</h4>
//                       <p className="text-sm text-gray-600">{method.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Daily Schedule */}
//             {data.curriculum.dailySchedule.show && (
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-6">{data.curriculum.dailySchedule.title}</h3>
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <div className="space-y-4">
//                     {filteredSchedule.map((item, index) => (
//                       <div key={index} className="flex items-center">
//                         <div className="w-24 font-medium text-gray-800">{item.time}</div>
//                         <div className="flex-1 text-gray-600">{item.activity}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Activities Content */}
//       {activeTab === 'activities' && data.showActivities && data.activities.show && (
//         <div className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.activities.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.activities.description}
//               </p>
//             </div>

//             {/* Special Programs */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-8">Special Programs</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {filteredSpecialPrograms.map((program, index) => {
//                   const IconComponent = program.icon;
//                   return (
//                     <div key={index} className="bg-gray-50 rounded-lg p-6">
//                       <div className="flex items-center mb-4">
//                         <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
//                           <IconComponent className="h-5 w-5 text-green-600" />
//                         </div>
//                         <h4 className="text-xl font-semibold text-gray-800">{program.title}</h4>
//                       </div>
//                       <p className="text-gray-600">{program.description}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Clubs */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-8">Student Clubs</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {filteredClubs.map((club, index) => {
//                   const IconComponent = club.icon;
//                   return (
//                     <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
//                       <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
//                         <IconComponent className="h-6 w-6 text-green-600" />
//                       </div>
//                       <h4 className="font-medium text-gray-800">{club.name}</h4>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Annual Events */}
//             <div>
//               <h3 className="text-2xl font-semibold text-gray-800 mb-8">Annual Events</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredAnnualEvents.map((event, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h4>
//                     <p className="text-gray-600">{event.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Facilities Content */}
//       {activeTab === 'facilities' && data.showFacilities && data.facilities.show && (
//         <div className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.facilities.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.facilities.description}
//               </p>
//             </div>

//             {/* Academic Facilities */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Academic Facilities</h3>
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {data.facilities.academicFacilities.map((facility, index) => (
//                     <li key={index} className="flex items-center">
//                       <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
//                       <span className="text-gray-700">{facility}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Specialized Areas */}
//             <div className="mb-16">
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Specialized Areas</h3>
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {data.facilities.specializedAreas.map((area, index) => (
//                     <li key={index} className="flex items-center">
//                       <ChevronRight className="h-4 w-4 text-green-600 mr-2" />
//                       <span className="text-gray-700">{area}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Technology Integration */}
//             <div>
//               <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technology Integration</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredTechIntegration.map((item, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6">
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
//                     <p className="text-gray-600">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MiddleSchoolPage;