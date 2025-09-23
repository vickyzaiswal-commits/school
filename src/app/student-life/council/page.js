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
  ExternalLink,
  ArrowRight,
  FileText,
  MapPin,
  Shield,
  Star,
  Trophy
} from 'lucide-react';

const StudentCouncilPage = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedPosition, setSelectedPosition] = useState('president');

  const councilTabs = [
    { id: 'members', name: 'Council Members', icon: Users },
    { id: 'elections', name: 'Elections', icon: Vote },
    { id: 'initiatives', name: 'Initiatives', icon: Lightbulb },
    { id: 'achievements', name: 'Achievements', icon: Trophy }
  ];

  const councilBenefits = [
    {
      icon: Users,
      title: "Student Representation",
      description: "Ensuring student voices are heard in school decisions"
    },
    {
      icon: Megaphone,
      title: "Leadership Development",
      description: "Building future leaders through practical experience"
    },
    {
      icon: Heart,
      title: "Community Service",
      description: "Organizing events that benefit the school and community"
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Implementing student ideas for school improvement"
    }
  ];

  const councilMembers = {
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
      ]
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
      ]
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
      ]
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
      ]
    }
  };

  const departmentHeads = [
    {
      name: "Vikram Singh",
      position: "Academic Affairs Head",
      grade: "XII-C",
      department: "Works on curriculum feedback, study resources, and academic events"
    },
    {
      name: "Neha Joshi",
      position: "Cultural Affairs Head",
      grade: "XI-A",
      department: "Organizes cultural events, festivals, and performing arts activities"
    },
    {
      name: "Arjun Kumar",
      position: "Sports Head",
      grade: "XII-D",
      department: "Coordinates sports events, teams, and athletic development"
    },
    {
      name: "Ananya Desai",
      position: "Social Service Head",
      grade: "XI-B",
      department: "Leads community service projects and charity initiatives"
    },
    {
      name: "Riya Malhotra",
      position: "Environmental Head",
      grade: "XI-C",
      department: "Promotes sustainability and environmental awareness programs"
    },
    {
      name: "Siddharth Rao",
      position: "Technology Head",
      grade: "XII-A",
      department: "Manages digital initiatives and tech-related student projects"
    }
  ];

  const electionProcess = [
    {
      stage: "Nomination",
      date: "August 1-5, 2024",
      description: "Students submit nomination forms with teacher recommendations",
      icon: FileText
    },
    {
      stage: "Campaign",
      date: "August 8-12, 2024",
      description: "Candidates present their manifestos and campaign ideas",
      icon: Megaphone
    },
    {
      stage: "Voting",
      date: "August 15, 2024",
      description: "All students from grades 6-12 vote for their representatives",
      icon: Vote
    },
    {
      stage: "Results",
      date: "August 16, 2024",
      description: "Election results announced in special assembly",
      icon: Award
    },
    {
      stage: "Induction",
      date: "August 19, 2024",
      description: "New council members sworn in during ceremony",
      icon: Shield
    }
  ];

  const currentInitiatives = [
    {
      title: "Mental Health Awareness Program",
      status: "Ongoing",
      description: "Workshops, counseling sessions, and resources to support student mental health",
      lead: "Wellness Committee",
      progress: 75
    },
    {
      title: "Digital Student Feedback System",
      status: "Completed",
      description: "Online platform for students to submit suggestions and feedback",
      lead: "Technology Department",
      progress: 100
    },
    {
      title: "School Green Initiative",
      status: "Ongoing",
      description: "Campus beautification and sustainability projects",
      lead: "Environmental Department",
      progress: 40
    },
    {
      title: "Peer Tutoring Program",
      status: "Planning",
      description: "Senior students tutoring junior students in various subjects",
      lead: "Academic Affairs",
      progress: 20
    }
  ];

  const pastAchievements = [
    {
      title: "Annual Charity Drive 2023",
      description: "Raised ₹2,50,000 for local orphanage through various events",
      impact: "Funded educational resources and infrastructure improvements"
    },
    {
      title: "School Recycling Program",
      description: "Implemented comprehensive recycling system throughout campus",
      impact: "Reduced school waste by 40% and raised environmental awareness"
    },
    {
      title: "Cultural Exchange Program",
      description: "Organized exchange with international school for cultural learning",
      impact: "150 students participated in cross-cultural activities and workshops"
    },
    {
      title: "Student Wellness Center",
      description: "Established dedicated space for student relaxation and support",
      impact: "Provides resources and quiet space for over 100 students daily"
    }
  ];

  const resources = [
    {
      title: "Council Election Guidelines",
      description: "Complete rules and procedures for student council elections",
      format: "PDF",
      size: "1.8 MB",
      icon: Vote
    },
    {
      title: "Meeting Minutes Archive",
      description: "Records of all student council meetings from current academic year",
      format: "PDF",
      size: "3.2 MB",
      icon: FileText
    },
    {
      title: "Initiative Proposal Form",
      description: "Form to propose new ideas and projects to the student council",
      format: "DOCX",
      size: "0.6 MB",
      icon: Lightbulb
    },
    {
      title: "Annual Report 2023-24",
      description: "Comprehensive report of council activities and achievements",
      format: "PDF",
      size: "4.5 MB",
      icon: BookOpen
    }
  ];

  const currentMember = councilMembers[selectedPosition];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Student Council"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Student Council 2024-2025</h1>
            <p className="text-xl mb-6 text-gray-200">
              Leadership, Service, and Representation for the Student Body
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto">
              <Users className="mr-2 h-5 w-5" />
              Meet Your Representatives
            </button>
          </div>
        </div>
      </section>

      {/* Council Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Role of the Student Council</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The student council serves as the voice of the student body and plays a vital role in school life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {councilBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {councilTabs.map((tab) => {
              const IconComponent = tab.icon;
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

      {/* Tab Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Council Members Tab */}
          {activeTab === 'members' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Student Council</h3>
              <p className="text-gray-600 mb-8">Meet the elected representatives serving the student body</p>
              
              {/* Executive Committee */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-gray-800 mb-6">Executive Committee</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {Object.keys(councilMembers).map(position => (
                    <button
                      key={position}
                      onClick={() => setSelectedPosition(position)}
                      className={`p-4 rounded-lg transition-all text-left ${
                        selectedPosition === position
                          ? 'bg-green-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="font-semibold mb-1">{councilMembers[position].position}</div>
                      <div className="text-sm opacity-80">{councilMembers[position].name}</div>
                    </button>
                  ))}
                </div>

                {/* Selected Member Details */}
                {currentMember && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3">
                        <div className="bg-green-100 rounded-lg p-6 text-center">
                          <div className="bg-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            {currentMember.name.split(' ')[0].charAt(0)}{currentMember.name.split(' ')[1].charAt(0)}
                          </div>
                          <h4 className="text-xl font-bold text-gray-800">{currentMember.name}</h4>
                          <p className="text-green-600 font-semibold">{currentMember.position}</p>
                          <p className="text-gray-600">{currentMember.grade}</p>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <h5 className="font-semibold text-gray-800 mb-4">Bio</h5>
                        <p className="text-gray-600 mb-6">{currentMember.bio}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Key Responsibilities</h5>
                            <ul className="space-y-2">
                              {currentMember.responsibilities.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-3">Notable Achievements</h5>
                            <ul className="space-y-2">
                              {currentMember.achievements.map((item, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600">
                                  <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Department Heads */}
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-6">Department Heads</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departmentHeads.map((member, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800">{member.name}</h5>
                      <p className="text-green-600 text-sm mb-2">{member.position}</p>
                      <p className="text-gray-600 text-sm mb-3">Grade {member.grade}</p>
                      <p className="text-gray-600 text-sm">{member.department}</p>
                      <button className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                        Contact <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Elections Tab */}
          {activeTab === 'elections' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Student Council Elections</h3>
              <p className="text-gray-600 mb-8">Democracy in action - how our student leaders are chosen</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                {electionProcess.map((stage, index) => {
                  const IconComponent = stage.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 text-center hover:shadow-md transition-shadow">
                      <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{stage.stage}</h4>
                      <p className="text-green-600 text-sm font-medium mb-2">{stage.date}</p>
                      <p className="text-gray-600 text-sm">{stage.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Election Guidelines</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Candidates must maintain a minimum 3.0 GPA</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>No negative campaigning allowed</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Campaign spending limited to ₹2000 per candidate</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>All students grades 9-12 are eligible to vote</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Results are certified by faculty election committee</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-4">Important Dates 2024</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Nomination forms available</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">Jul 25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Candidate orientation</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">Aug 7</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Pre-election assembly</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">Aug 14</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">New council training</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">Aug 20-21</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Initiatives Tab */}
          {activeTab === 'initiatives' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Current Initiatives</h3>
              <p className="text-gray-600 mb-8">Projects and programs being implemented by your student council</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {currentInitiatives.map((initiative, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">{initiative.title}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          initiative.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          initiative.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {initiative.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{initiative.lead}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{initiative.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{initiative.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            initiative.status === 'Completed' ? 'bg-green-500' :
                            initiative.status === 'Ongoing' ? 'bg-blue-500' :
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
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Propose an Initiative</h4>
                <p className="text-green-700 mb-4">
                  Have an idea to improve our school? The student council wants to hear from you!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                  <div className="flex items-center">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Submit your idea using the initiative proposal form</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Attend council meetings on first Wednesday of each month</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Email your representatives directly with suggestions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Join committee meetings for specific initiatives</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Council Achievements</h3>
              <p className="text-gray-600 mb-8">Notable accomplishments and impacts made by student councils over the years</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {pastAchievements.map((achievement, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Awards & Recognition</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Best Student Council Award 2023</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">State Level</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Community Service Excellence 2022</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">National</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Innovation in Education 2023</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">Regional</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Environmental Leadership 2022</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">City Level</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-4">Annual Impact Report</h4>
                  <div className="space-y-3 text-sm text-green-700">
                    <div className="flex justify-between">
                      <span>Funds raised for charity</span>
                      <span className="font-semibold">₹5,75,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Student proposals implemented</span>
                      <span className="font-semibold">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community service hours</span>
                      <span className="font-semibold">2,150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Events organized</span>
                      <span className="font-semibold">68</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Council Resources</h2>
            <p className="text-lg text-gray-600">
              Documents, forms, and information about the student council
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
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
                  <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved with Student Council</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Your voice matters! Participate in council activities, share your ideas, or consider running for office
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Attend a Meeting
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Your Representative
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentCouncilPage;