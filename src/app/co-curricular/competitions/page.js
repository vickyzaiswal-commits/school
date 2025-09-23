"use client";
import React, { useState } from 'react';
import { 
  Trophy,
  Users, 
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Heart,
  Brain,
  Lightbulb,
  Award,
  Mic,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  FileText,
  Star,
  MapPin,
  Shield,
  Zap
} from 'lucide-react';

const CompetitionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('academic');

  const competitionCategories = [
    { id: 'academic', name: 'Academic Competitions', icon: Book, description: 'Subject-based challenges' },
    { id: 'arts', name: 'Arts & Creative', icon: Palette, description: 'Creative expression contests' },
    { id: 'sports', name: 'Sports & Athletics', icon: Trophy, description: 'Physical competitions' },
    { id: 'tech', name: 'Technology & Innovation', icon: Code, description: 'STEM challenges' }
  ];

  const competitionBenefits = [
    {
      icon: Trophy,
      title: "Skill Development",
      description: "Enhancing subject knowledge, critical thinking, and problem-solving abilities through competitive challenges."
    },
    {
      icon: Users,
      title: "Teamwork & Collaboration",
      description: "Learning to work effectively in teams and developing leadership qualities."
    },
    {
      icon: Brain,
      title: "Intellectual Growth",
      description: "Pushing boundaries of knowledge and creativity beyond standard curriculum."
    },
    {
      icon: Heart,
      title: "Confidence Building",
      description: "Gaining self-assurance through preparation, performance, and achievement."
    }
  ];

  const competitions = {
    academic: [
      { 
        name: "Math Olympiad", 
        icon: Calculator, 
        level: "National", 
        advisor: "Dr. Mathur", 
        meeting: "Wed 3:30-5:00 PM",
        description: "Advanced mathematical problem solving competition",
        eligibility: "Grades 9-12",
        status: "Ongoing"
      },
      { 
        name: "Science Bowl", 
        icon: Microscope, 
        level: "Regional", 
        advisor: "Ms. Patel", 
        meeting: "Tue 4:00-5:30 PM",
        description: "Quick-response science knowledge competition",
        eligibility: "Grades 6-8",
        status: "Registration Open"
      },
      { 
        name: "Debate Tournament", 
        icon: Mic, 
        level: "State", 
        advisor: "Mr. Kumar", 
        meeting: "Mon/Thu 3:30-5:30 PM",
        description: "Competitive public speaking and argumentation",
        eligibility: "Grades 9-12",
        status: "Upcoming"
      },
      { 
        name: "Spelling Bee", 
        icon: Book, 
        level: "School", 
        advisor: "Ms. Evans", 
        meeting: "Fri 3:30-4:30 PM",
        description: "Spelling competition for language excellence",
        eligibility: "Grades 4-8",
        status: "Completed"
      },
      { 
        name: "Model United Nations", 
        icon: Globe, 
        level: "International", 
        advisor: "Mr. Sharma", 
        meeting: "Wed 4:00-6:00 PM",
        description: "Simulation of United Nations procedures",
        eligibility: "Grades 10-12",
        status: "Registration Open"
      },
      { 
        name: "History Bowl", 
        icon: Book, 
        level: "Regional", 
        advisor: "Ms. Johnson", 
        meeting: "Thu 3:30-5:00 PM",
        description: "Competition testing historical knowledge",
        eligibility: "Grades 9-12",
        status: "Upcoming"
      }
    ],
    arts: [
      { 
        name: "Art Competition", 
        icon: Palette, 
        level: "National", 
        advisor: "Ms. Davis", 
        meeting: "Mon 3:30-5:00 PM",
        description: "Various visual arts categories and mediums",
        eligibility: "All Grades",
        status: "Ongoing"
      },
      { 
        name: "Music Festival", 
        icon: Music, 
        level: "State", 
        advisor: "Mr. Williams", 
        meeting: "Tue 4:00-6:00 PM",
        description: "Solo and ensemble performance competition",
        eligibility: "All Grades",
        status: "Registration Open"
      },
      { 
        name: "Drama Competition", 
        icon: Mic, 
        level: "Regional", 
        advisor: "Ms. Roberts", 
        meeting: "Wed 4:00-6:30 PM",
        description: "One-act plays and dramatic interpretation",
        eligibility: "Grades 6-12",
        status: "Upcoming"
      },
      { 
        name: "Creative Writing Contest", 
        icon: Book, 
        level: "National", 
        advisor: "Mr. Anderson", 
        meeting: "Fri 3:30-5:00 PM",
        description: "Poetry, short story, and essay competitions",
        eligibility: "All Grades",
        status: "Ongoing"
      },
      { 
        name: "Digital Arts Showcase", 
        icon: Code, 
        level: "State", 
        advisor: "Ms. Chen", 
        meeting: "Thu 4:00-5:30 PM",
        description: "Digital media, animation, and graphic design",
        eligibility: "Grades 7-12",
        status: "Registration Open"
      },
      { 
        name: "Photography Contest", 
        icon: Award, 
        level: "School", 
        advisor: "Mr. Thompson", 
        meeting: "Mon 3:30-4:30 PM",
        description: "Various photography categories and themes",
        eligibility: "All Grades",
        status: "Completed"
      }
    ],
    sports: [
      { 
        name: "Basketball Tournament", 
        icon: Trophy, 
        level: "Regional", 
        advisor: "Coach Miller", 
        meeting: "Daily Practice",
        description: "Inter-school basketball championship",
        eligibility: "Grades 9-12",
        status: "Ongoing"
      },
      { 
        name: "Swimming Championship", 
        icon: Trophy, 
        level: "State", 
        advisor: "Coach Wilson", 
        meeting: "Mon-Fri 4:00-6:00 PM",
        description: "Various swimming strokes and relays",
        eligibility: "Grades 6-12",
        status: "Upcoming"
      },
      { 
        name: "Track & Field Meet", 
        icon: Trophy, 
        level: "District", 
        advisor: "Coach Davis", 
        meeting: "Mon/Wed/Fri 4:00-6:00 PM",
        description: "Running, jumping, and throwing events",
        eligibility: "All Grades",
        status: "Registration Open"
      },
      { 
        name: "Chess Championship", 
        icon: Trophy, 
        level: "National", 
        advisor: "Mr. Rodriguez", 
        meeting: "Tue/Thu 3:30-5:00 PM",
        description: "Individual and team chess competitions",
        eligibility: "All Grades",
        status: "Ongoing"
      },
      { 
        name: "Soccer League", 
        icon: Trophy, 
        level: "Regional", 
        advisor: "Coach Martinez", 
        meeting: "Daily Practice",
        description: "Inter-school soccer competition",
        eligibility: "Grades 9-12",
        status: "Completed"
      },
      { 
        name: "Table Tennis Tournament", 
        icon: Trophy, 
        level: "School", 
        advisor: "Mr. Kim", 
        meeting: "Fri 3:30-5:30 PM",
        description: "Singles and doubles table tennis",
        eligibility: "All Grades",
        status: "Upcoming"
      }
    ],
    tech: [
      { 
        name: "Robotics Competition", 
        icon: Code, 
        level: "International", 
        advisor: "Mr. Zhang", 
        meeting: "Mon/Wed/Fri 4:00-6:30 PM",
        description: "Design, build, and program competitive robots",
        eligibility: "Grades 7-12",
        status: "Ongoing"
      },
      { 
        name: "Coding Challenge", 
        icon: Code, 
        level: "National", 
        advisor: "Ms. Johnson", 
        meeting: "Tue/Thu 3:30-5:30 PM",
        description: "Algorithmic problem solving and programming",
        eligibility: "Grades 9-12",
        status: "Registration Open"
      },
      { 
        name: "Science Fair", 
        icon: Microscope, 
        level: "Regional", 
        advisor: "Dr. Evans", 
        meeting: "Wed 4:00-6:00 PM",
        description: "Original scientific research projects",
        eligibility: "All Grades",
        status: "Upcoming"
      },
      { 
        name: "App Development Contest", 
        icon: Code, 
        level: "State", 
        advisor: "Mr. Brown", 
        meeting: "Mon 4:00-6:00 PM",
        description: "Mobile application design and development",
        eligibility: "Grades 9-12",
        status: "Ongoing"
      },
      { 
        name: "Engineering Challenge", 
        icon: Zap, 
        level: "National", 
        advisor: "Mr. Wilson", 
        meeting: "Thu 4:00-6:30 PM",
        description: "Design and build solutions to engineering problems",
        eligibility: "Grades 10-12",
        status: "Registration Open"
      },
      { 
        name: "Cybersecurity Competition", 
        icon: Shield, 
        level: "National", 
        advisor: "Ms. Garcia", 
        meeting: "Fri 4:00-6:00 PM",
        description: "Network security, cryptography, and forensics",
        eligibility: "Grades 9-12",
        status: "Upcoming"
      }
    ]
  };

  const upcomingEvents = [
    {
      title: "Regional Science Bowl",
      date: "Oct 28, 2024",
      time: "9:00 AM - 4:00 PM",
      competition: "Science Bowl",
      location: "State University",
      status: "Registration Open"
    },
    {
      title: "Math Olympiad Qualifiers",
      date: "Nov 5, 2024",
      time: "10:00 AM - 2:00 PM",
      competition: "Math Olympiad",
      location: "School Campus",
      status: "Upcoming"
    },
    {
      title: "Robotics Regional Championship",
      date: "Nov 12-13, 2024",
      time: "8:00 AM - 5:00 PM",
      competition: "Robotics Competition",
      location: "Convention Center",
      status: "Ongoing"
    },
    {
      title: "Basketball Tournament Finals",
      date: "Nov 19, 2024",
      time: "6:00 PM - 9:00 PM",
      competition: "Basketball Tournament",
      location: "School Gymnasium",
      status: "Upcoming"
    }
  ];

  const achievements = [
    {
      title: "National Robotics Champions",
      year: "2024",
      description: "1st Place in National Robotics Competition",
      icon: Trophy,
      category: "tech"
    },
    {
      title: "State Science Bowl Winners",
      year: "2023",
      description: "1st Place in State Science Bowl Competition",
      icon: Microscope,
      category: "academic"
    },
    {
      title: "Regional Art Awards",
      year: "2024",
      description: "12 students received awards in Regional Art Competition",
      icon: Palette,
      category: "arts"
    },
    {
      title: "Math Olympiad Finalists",
      year: "2023",
      description: "3 students qualified for National Math Olympiad",
      icon: Calculator,
      category: "academic"
    }
  ];

  const resources = [
    {
      title: "Competition Calendar 2024-25",
      description: "Complete schedule of all competitions and events",
      format: "PDF",
      size: "1.2 MB",
      icon: Calendar
    },
    {
      title: "Competition Preparation Guide",
      description: "Tips and strategies for competition success",
      format: "PDF",
      size: "2.1 MB",
      icon: Book
    },
    {
      title: "Permission Slip Template",
      description: "Standard form for competition participation",
      format: "DOCX",
      size: "0.4 MB",
      icon: FileText
    },
    {
      title: "Past Competition Papers",
      description: "Archive of previous years' competition materials",
      format: "ZIP",
      size: "4.7 MB",
      icon: FileText
    }
  ];

  const statusColors = {
    "Ongoing": "bg-green-100 text-green-800",
    "Upcoming": "bg-blue-100 text-blue-800",
    "Registration Open": "bg-yellow-100 text-yellow-800",
    "Completed": "bg-gray-100 text-gray-800"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Competitions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Competitions</h1>
            <p className="text-xl mb-6 text-gray-200">
              Challenging students to excel beyond the classroom through competitive excellence
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Competition Handbook
              <Download className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Competition Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Participate in Competitions?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Competitions provide unique opportunities for growth, recognition, and skill development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competitionBenefits.map((benefit, index) => {
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

      {/* Competition Categories Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Competition Categories</h2>
            <p className="text-lg text-gray-600">
              Explore our diverse range of competitive opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {competitionCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center p-6 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className={`text-sm ${activeCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Competitions for Selected Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {competitionCategories.find(c => c.id === activeCategory)?.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions[activeCategory].map((competition, index) => {
                const IconComponent = competition.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <IconComponent className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{competition.name}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[competition.status]}`}>
                          {competition.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-green-500" />
                        <span>Level: {competition.level}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-500" />
                        <span>Advisor: {competition.advisor}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <span>{competition.meeting}</span>
                      </div>
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-green-500" />
                        <span>Eligibility: {competition.eligibility}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{competition.description}</p>
                    
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      Learn more and register
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Competition Events</h2>
            <p className="text-lg text-gray-600">
              Important dates and deadlines for upcoming competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {event.competition}
                    </span>
                  </div>
                  <div className="bg-green-50 text-green-700 text-center p-2 rounded-lg">
                    <div className="font-bold text-sm">{event.date.split(' ')[0]}</div>
                    <div className="text-xs">{event.date.split(' ')[1]}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                  View details and register
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              View Full Competition Calendar
              <Calendar className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Competition Achievements</h2>
            <p className="text-lg text-gray-600">
              Celebrating the accomplishments of our talented students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                    {achievement.year}
                  </span>
                  <h3 className="font-semibold text-gray-800 mb-3">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              View Our Achievement Gallery
              <ExternalLink className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Competition Resources</h2>
            <p className="text-lg text-gray-600">
              Download important documents, preparation materials, and registration forms
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
          <h2 className="text-3xl font-bold mb-4">Ready to Compete?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join our competitive teams and represent our school in various competitions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Register for Competitions
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Competition Coordinator
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompetitionsPage;