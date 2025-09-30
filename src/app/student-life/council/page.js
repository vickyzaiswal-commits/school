"use client";
import React, { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const studentCouncilData = {
  hero: {
    show: true,
    establishedYear: "2024",
    title: "Student Council 2024-2025",
    subtitle: "Leadership, Service, and Representation for the Student Body",
    buttonText: "Meet Your Representatives",
    stats: [
      { value: "15+", label: "Active Members", show: true },
      { value: "25+", label: "Initiatives", show: true },
      { value: "₹5L+", label: "Funds Raised", show: true }
    ],
    height: "h-96"
  },
  benefits: {
    show: true,
    title: "Role of the Student Council",
    subtitle: "The student council serves as the voice of the student body and plays a vital role in school life",
    items: [
      {
        icon: "Users",
        title: "Student Representation",
        description: "Ensuring student voices are heard in school decisions",
        show: true
      },
      {
        icon: "Megaphone",
        title: "Leadership Development",
        description: "Building future leaders through practical experience",
        show: true
      },
      {
        icon: "Heart",
        title: "Community Service",
        description: "Organizing events that benefit the school and community",
        show: true
      },
      {
        icon: "Lightbulb",
        title: "Innovation Hub",
        description: "Implementing student ideas for school improvement",
        show: true
      }
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
        show: true
      },
      {
        title: "Meeting Minutes Archive",
        description: "Records of all student council meetings from current academic year",
        format: "PDF",
        size: "3.2 MB",
        icon: "FileText",
        show: true
      },
      {
        title: "Initiative Proposal Form",
        description: "Form to propose new ideas and projects to the student council",
        format: "DOCX",
        size: "0.6 MB",
        icon: "Lightbulb",
        show: true
      },
      {
        title: "Annual Report 2023-24",
        description: "Comprehensive report of council activities and achievements",
        format: "PDF",
        size: "4.5 MB",
        icon: "BookOpen",
        show: true
      }
    ]
  },
  cta: {
    show: true,
    title: "Get Involved with Student Council",
    subtitle: "Your voice matters! Participate in council activities, share your ideas, or consider running for office",
    buttons: [
      { text: "Attend a Meeting", style: "primary", show: true },
      { text: "Contact Your Representative", style: "secondary", show: true }
    ]
  },
  labels: {
    show: true,
    bio: "Bio",
    responsibilities: "Responsibilities",
    achievements: "Achievements",
    symbol: "Symbol",
    houseHead: "House Head",
    captain: "Captain",
    viceCaptain: "Vice Captain",
    currentPoints: "Current Points",
    strengths: "Strengths",
    houseDescription: "House Description",
    houseTraditions: "House Traditions"
  }
};

// Map string icon names to Lucide React components
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
  Trophy,
  Activity,
  TrendingUp
};

const StudentCouncilPage = () => {
  const [activeTab, setActiveTab] = useState(studentCouncilData.tabs.items[0].id);
  const [selectedPosition, setSelectedPosition] = useState(Object.keys(studentCouncilData.members.executive.items)[0]);

  const currentMember = studentCouncilData.members.executive.items[selectedPosition];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {studentCouncilData.hero.show && (
        <section className={`relative ${studentCouncilData.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{studentCouncilData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{studentCouncilData.hero.subtitle}</p>
              {studentCouncilData.hero.stats && studentCouncilData.hero.stats.length > 0 && (
                <div className="flex flex-wrap gap-6 mb-6">
                  {studentCouncilData.hero.stats
                    .filter(stat => stat.show !== false)
                    .map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                        <div className="text-sm text-green-100">{stat.label}</div>
                      </div>
                    ))}
                </div>
              )}
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{studentCouncilData.hero.buttonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Council Benefits */}
      {studentCouncilData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{studentCouncilData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentCouncilData.benefits.items
                .filter(item => item.show !== false)
                .map((benefit, index) => {
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
        </section>
      )}

      {/* Tab Navigation */}
      {studentCouncilData.tabs.show && (
        <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {studentCouncilData.tabs.items
                .filter(tab => tab.show !== false)
                .map((tab) => {
                  const IconComponent = iconMap[tab.icon];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-green-50'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-2" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Tab Content */}
      {studentCouncilData.tabs.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && studentCouncilData.overview.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.overview.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{studentCouncilData.overview.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {studentCouncilData.overview.mission.show && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{studentCouncilData.overview.mission.title}</h4>
                      <div className="prose prose-lg text-gray-600">
                        {studentCouncilData.overview.mission.content.map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {studentCouncilData.overview.structure.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{studentCouncilData.overview.structure.title}</h4>
                      <div className="space-y-4">
                        {studentCouncilData.overview.structure.steps
                          .filter(step => step.show !== false)
                          .map((step, index) => (
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

                {studentCouncilData.overview.impact.show && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{studentCouncilData.overview.impact.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {studentCouncilData.overview.impact.items
                        .filter(item => item.show !== false)
                        .map((item, index) => (
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
            {activeTab === 'members' && studentCouncilData.members.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.members.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{studentCouncilData.members.subtitle}</p>

                {/* Executive Committee */}
                {studentCouncilData.members.executive.show && (
                  <div className="mb-12">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{studentCouncilData.members.executive.title}</h4>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {Object.keys(studentCouncilData.members.executive.items)
                        .filter(key => studentCouncilData.members.executive.items[key].show !== false)
                        .map(positionKey => (
                          <button
                            key={positionKey}
                            onClick={() => setSelectedPosition(positionKey)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              selectedPosition === positionKey
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {studentCouncilData.members.executive.items[positionKey].position}
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
                            <h5 className="font-semibold text-gray-800 mb-3">{studentCouncilData.labels.responsibilities}</h5>
                            <ul className="space-y-2 text-gray-600">
                              {currentMember.responsibilities.map((resp, index) => (
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
                            <h5 className="font-semibold text-gray-800 mb-3">{studentCouncilData.labels.achievements}</h5>
                            <ul className="space-y-2 text-gray-600">
                              {currentMember.achievements.map((ach, index) => (
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
                {studentCouncilData.members.departments.show && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{studentCouncilData.members.departments.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {studentCouncilData.members.departments.items
                        .filter(head => head.show !== false)
                        .map((head, index) => (
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
            {activeTab === 'elections' && studentCouncilData.elections.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.elections.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{studentCouncilData.elections.subtitle}</p>

                <div className="space-y-6 mb-12">
                  {studentCouncilData.elections.process
                    .filter(step => step.show !== false)
                    .map((step, index) => {
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

                {studentCouncilData.elections.timeline.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">{studentCouncilData.elections.timeline.title}</h4>
                    <div className="space-y-3">
                      {studentCouncilData.elections.timeline.items
                        .filter(item => item.show !== false)
                        .map((item, index) => (
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
            {activeTab === 'initiatives' && studentCouncilData.initiatives.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.initiatives.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{studentCouncilData.initiatives.subtitle}</p>

                {studentCouncilData.initiatives.current.show && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {studentCouncilData.initiatives.current.items
                      .filter(initiative => initiative.show !== false)
                      .map((initiative, index) => (
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

                {studentCouncilData.initiatives.proposal.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">{studentCouncilData.initiatives.proposal.title}</h4>
                    <p className="text-green-700 mb-4">{studentCouncilData.initiatives.proposal.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                      {studentCouncilData.initiatives.proposal.ways.map((way, index) => (
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
            {activeTab === 'achievements' && studentCouncilData.achievements.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.achievements.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{studentCouncilData.achievements.subtitle}</p>

                {studentCouncilData.achievements.highlights.show && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {studentCouncilData.achievements.highlights.items
                      .filter(achievement => achievement.show !== false)
                      .map((achievement, index) => (
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

                {studentCouncilData.achievements.awards.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">{studentCouncilData.achievements.awards.title}</h4>
                    <div className="space-y-3">
                      {studentCouncilData.achievements.awards.items
                        .filter(item => item.show !== false)
                        .map((item, index) => (
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
        </section>
      )}

      {/* Resources Section */}
      {studentCouncilData.resources.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{studentCouncilData.resources.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{studentCouncilData.resources.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentCouncilData.resources.items
                .filter(item => item.show !== false)
                .map((resource, index) => {
                  const IconComponent = iconMap[resource.icon];
                  return (
                    <div key={index} className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <IconComponent className="h-6 w-6 text-green-600" />
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {resource.format}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{resource.size}</span>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          {studentCouncilData.resources.downloadButton}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {studentCouncilData.cta.show && (
        <section className="py-16 bg-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{studentCouncilData.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">{studentCouncilData.cta.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {studentCouncilData.cta.buttons
                .filter(button => button.show !== false)
                .map((button, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      button.style === 'primary'
                        ? 'bg-white text-green-700 hover:bg-gray-100'
                        : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700'
                    }`}
                  >
                    {button.text}
                  </button>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default StudentCouncilPage;