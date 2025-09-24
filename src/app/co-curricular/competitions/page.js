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

const CompetitionsPage = ({ competitionsData }) => {
  const [activeCategory, setActiveCategory] = useState('academic');

  // JSON data to drive all content (will later come from a database)
  const jsonData = {
    hero: {
      show: true,
      title: "School Competitions",
      subtitle: "Challenge yourself, showcase your talents, and achieve excellence in competitive arenas",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Competition Handbook",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Participate in Competitions?",
      description: "Competitions provide unique opportunities for growth, recognition, and skill development",
      items: [
        {
          icon: Trophy,
          title: "Skill Development",
          description: "Enhancing subject knowledge, critical thinking, and problem-solving abilities through competitive challenges.",
          show: true
        },
        {
          icon: Users,
          title: "Teamwork & Collaboration",
          description: "Learning to work effectively in teams and developing leadership qualities.",
          show: true
        },
        {
          icon: Brain,
          title: "Intellectual Growth",
          description: "Pushing boundaries of knowledge and creativity beyond standard curriculum.",
          show: true
        },
        {
          icon: Heart,
          title: "Confidence Building",
          description: "Gaining self-assurance through preparation, performance, and achievement.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Competition Categories",
      description: "Explore our diverse range of competitive opportunities",
      items: [
        { id: 'academic', name: 'Academic Competitions', icon: Book, description: 'Subject-based challenges', show: true },
        { id: 'arts', name: 'Arts & Creative', icon: Palette, description: 'Creative expression contests', show: true },
        { id: 'sports', name: 'Sports & Athletics', icon: Trophy, description: 'Physical competitions', show: true },
        { id: 'tech', name: 'Technology & Innovation', icon: Code, description: 'STEM challenges', show: true }
      ]
    },
    competitions: {
      show: true,
      labels: {
        level: "Level",
        advisor: "Advisor",
        meeting: "Meeting",
        eligibility: "Eligibility",
        status: "Status",
        learnMore: "Learn more and register"
      },
      statusColors: {
        "Ongoing": "bg-green-100 text-green-800",
        "Upcoming": "bg-yellow-100 text-yellow-800",
        "Registration Open": "bg-blue-100 text-blue-800",
        "Completed": "bg-gray-100 text-gray-800"
      },
      items: {
        academic: [
          { 
            name: "Math Olympiad", 
            icon: Calculator, 
            level: "National", 
            advisor: "Dr. Mathur", 
            meeting: "Wed 3:30-5:00 PM",
            description: "Advanced mathematical problem solving competition",
            eligibility: "Grades 9-12",
            status: "Ongoing",
            show: true
          },
          { 
            name: "Science Bowl", 
            icon: Microscope, 
            level: "Regional", 
            advisor: "Ms. Patel", 
            meeting: "Tue 4:00-5:30 PM",
            description: "Quick-response science knowledge competition",
            eligibility: "Grades 6-8",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Debate Tournament", 
            icon: Mic, 
            level: "State", 
            advisor: "Mr. Kumar", 
            meeting: "Mon/Thu 3:30-5:30 PM",
            description: "Competitive public speaking and argumentation",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Spelling Bee", 
            icon: Book, 
            level: "School", 
            advisor: "Ms. Evans", 
            meeting: "Fri 3:30-4:30 PM",
            description: "Spelling competition for language excellence",
            eligibility: "Grades 4-8",
            status: "Completed",
            show: true
          },
          { 
            name: "Model United Nations", 
            icon: Globe, 
            level: "International", 
            advisor: "Mr. Sharma", 
            meeting: "Wed 4:00-6:00 PM",
            description: "Simulation of United Nations procedures",
            eligibility: "Grades 10-12",
            status: "Registration Open",
            show: true
          },
          { 
            name: "History Bowl", 
            icon: Book, 
            level: "Regional", 
            advisor: "Ms. Johnson", 
            meeting: "Thu 3:30-5:00 PM",
            description: "Competition testing historical knowledge",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            show: true
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
            status: "Ongoing",
            show: true
          },
          { 
            name: "Music Festival", 
            icon: Music, 
            level: "State", 
            advisor: "Mr. Williams", 
            meeting: "Tue 4:00-6:00 PM",
            description: "Solo and ensemble performance competition",
            eligibility: "All Grades",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Drama Competition", 
            icon: Mic, 
            level: "Regional", 
            advisor: "Ms. Roberts", 
            meeting: "Wed 4:00-6:30 PM",
            description: "One-act plays and dramatic interpretation",
            eligibility: "Grades 6-12",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Creative Writing Contest", 
            icon: Book, 
            level: "National", 
            advisor: "Mr. Anderson", 
            meeting: "Fri 3:30-5:00 PM",
            description: "Poetry, short story, and essay competitions",
            eligibility: "All Grades",
            status: "Ongoing",
            show: true
          },
          { 
            name: "Digital Arts Showcase", 
            icon: Code, 
            level: "State", 
            advisor: "Ms. Chen", 
            meeting: "Thu 4:00-5:30 PM",
            description: "Digital media, animation, and graphic design",
            eligibility: "Grades 7-12",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Photography Contest", 
            icon: Award, 
            level: "School", 
            advisor: "Mr. Thompson", 
            meeting: "Mon 3:30-4:30 PM",
            description: "Various photography categories and themes",
            eligibility: "All Grades",
            status: "Completed",
            show: true
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
            status: "Ongoing",
            show: true
          },
          { 
            name: "Swimming Championship", 
            icon: Trophy, 
            level: "State", 
            advisor: "Coach Wilson", 
            meeting: "Mon-Fri 4:00-6:00 PM",
            description: "Various swimming strokes and relays",
            eligibility: "Grades 6-12",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Track & Field Meet", 
            icon: Trophy, 
            level: "District", 
            advisor: "Coach Davis", 
            meeting: "Mon/Wed/Fri 4:00-6:00 PM",
            description: "Running, jumping, and throwing events",
            eligibility: "All Grades",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Chess Championship", 
            icon: Trophy, 
            level: "National", 
            advisor: "Mr. Rodriguez", 
            meeting: "Tue/Thu 3:30-5:00 PM",
            description: "Individual and team chess competitions",
            eligibility: "All Grades",
            status: "Ongoing",
            show: true
          },
          { 
            name: "Soccer League", 
            icon: Trophy, 
            level: "Regional", 
            advisor: "Coach Martinez", 
            meeting: "Daily Practice",
            description: "Inter-school soccer competition",
            eligibility: "Grades 9-12",
            status: "Completed",
            show: true
          },
          { 
            name: "Table Tennis Tournament", 
            icon: Trophy, 
            level: "School", 
            advisor: "Mr. Kim", 
            meeting: "Fri 3:30-5:30 PM",
            description: "Singles and doubles table tennis",
            eligibility: "All Grades",
            status: "Upcoming",
            show: true
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
            status: "Ongoing",
            show: true
          },
          { 
            name: "Coding Challenge", 
            icon: Code, 
            level: "National", 
            advisor: "Ms. Johnson", 
            meeting: "Tue/Thu 3:30-5:30 PM",
            description: "Algorithmic problem solving and programming",
            eligibility: "Grades 9-12",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Science Fair", 
            icon: Microscope, 
            level: "Regional", 
            advisor: "Dr. Evans", 
            meeting: "Wed 4:00-6:00 PM",
            description: "Original scientific research projects",
            eligibility: "All Grades",
            status: "Upcoming",
            show: true
          },
          { 
            name: "App Development Contest", 
            icon: Code, 
            level: "State", 
            advisor: "Mr. Brown", 
            meeting: "Mon 4:00-6:00 PM",
            description: "Mobile application design and development",
            eligibility: "Grades 9-12",
            status: "Ongoing",
            show: true
          },
          { 
            name: "Engineering Challenge", 
            icon: Zap, 
            level: "National", 
            advisor: "Mr. Wilson", 
            meeting: "Thu 4:00-6:30 PM",
            description: "Design and build solutions to engineering problems",
            eligibility: "Grades 10-12",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Cybersecurity Competition", 
            icon: Shield, 
            level: "National", 
            advisor: "Ms. Garcia", 
            meeting: "Fri 4:00-6:00 PM",
            description: "Network security, cryptography, and forensics",
            eligibility: "Grades 9-12",
            status: "Upcoming",
            show: true
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Competition Events",
      description: "Important dates and deadlines for upcoming competitions",
      ctaButton: {
        label: "View Full Competition Calendar",
        show: true
      },
      items: [
        {
          title: "Regional Science Bowl",
          date: "2024-10-28",
          time: "9:00 AM - 4:00 PM",
          competition: "Science Bowl",
          location: "State University",
          status: "Registration Open",
          description: "Regional qualifying round for national science competition",
          show: true
        },
        {
          title: "Math Olympiad Qualifiers",
          date: "2024-11-05",
          time: "10:00 AM - 2:00 PM",
          competition: "Math Olympiad",
          location: "School Campus",
          status: "Upcoming",
          description: "Qualifying examination for national math competition",
          show: true
        },
        {
          title: "Robotics Regional Championship",
          date: "2024-11-12",
          time: "8:00 AM - 5:00 PM",
          competition: "Robotics Competition",
          location: "Convention Center",
          status: "Ongoing",
          description: "Regional robotics competition with multiple divisions",
          show: true
        },
        {
          title: "Basketball Tournament Finals",
          date: "2024-11-19",
          time: "6:00 PM - 9:00 PM",
          competition: "Basketball Tournament",
          location: "School Gymnasium",
          status: "Upcoming",
          description: "Championship finals for inter-school basketball tournament",
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Recent Competition Achievements",
      description: "Celebrating the accomplishments of our talented students",
      galleryButton: {
        label: "View Our Achievement Gallery",
        show: true
      },
      items: [
        {
          title: "National Robotics Champions",
          year: "2024",
          description: "1st Place in National Robotics Competition",
          icon: Trophy,
          category: "tech",
          show: true
        },
        {
          title: "State Science Bowl Winners",
          year: "2023",
          description: "1st Place in State Science Bowl Competition",
          icon: Microscope,
          category: "academic",
          show: true
        },
        {
          title: "Regional Art Awards",
          year: "2024",
          description: "12 students received awards in Regional Art Competition",
          icon: Palette,
          category: "arts",
          show: true
        },
        {
          title: "Math Olympiad Finalists",
          year: "2023",
          description: "3 students qualified for National Math Olympiad",
          icon: Calculator,
          category: "academic",
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Competition Resources",
      description: "Download important documents, preparation materials, and registration forms",
      downloadLabel: "Download",
      items: [
        {
          title: "Competition Calendar 2024-25",
          description: "Complete schedule of all competitions and events",
          format: "PDF",
          size: "1.2 MB",
          icon: Calendar,
          show: true
        },
        {
          title: "Competition Preparation Guide",
          description: "Tips and strategies for competition success",
          format: "PDF",
          size: "2.1 MB",
          icon: Book,
          show: true
        },
        {
          title: "Permission Slip Template",
          description: "Standard form for competition participation",
          format: "DOCX",
          size: "0.4 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Past Competition Papers",
          description: "Archive of previous years' competition materials",
          format: "ZIP",
          size: "4.7 MB",
          icon: FileText,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Ready to Compete?",
      description: "Join our competitive teams and represent our school in various competitions",
      buttons: [
        { 
          label: "Register for Competitions", 
          variant: "primary",
          show: true 
        },
        { 
          label: "Contact Competition Coordinator", 
          variant: "secondary",
          show: true 
        }
      ]
    },
    general: {
      learnMore: "Learn more and register",
      viewDetails: "View details and register"
    },
    // Section visibility controls
    showHero: true,
    showBenefits: true,
    showCategories: true,
    showCompetitions: true,
    showUpcomingEvents: true,
    showAchievements: true,
    showResources: true,
    showCta: true
  };

  // Use competitionsData if provided (e.g., from a database), otherwise fall back to jsonData
  const data = competitionsData || jsonData;

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredCompetitions = data.competitions?.items ? 
    Object.fromEntries(
      Object.entries(data.competitions.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  // Get status colors from JSON or fallback to default
  const statusColors = data.competitions?.statusColors || {
    "Ongoing": "bg-green-100 text-green-800",
    "Upcoming": "bg-yellow-100 text-yellow-800",
    "Registration Open": "bg-blue-100 text-blue-800",
    "Completed": "bg-gray-100 text-gray-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero?.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* <img
            src={data.hero?.backgroundImage || 'https://via.placeholder.com/1920x400'}
            alt={data.hero?.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          /> */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero?.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero?.subtitle}
              </p>
              {data.hero?.ctaButton?.show && (
                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.hero?.ctaButton?.label}
                  <Download className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.benefits?.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.benefits?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon || Trophy; // Fallback icon
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
        )}

        {/* Categories Navigation */}
        {data.showCategories && data.categories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.categories?.title}</h2>
              <p className="text-gray-600">
                {data.categories?.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = category.icon || Book; // Fallback icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className={`text-xs mt-1 ${activeCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {category.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Competitions for Selected Category */}
            {data.showCompetitions && data.competitions?.show && filteredCompetitions[activeCategory] && filteredCompetitions[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompetitions[activeCategory].map((competition, index) => {
                    const IconComponent = competition.icon || Book; // Fallback icon
                    const statusColorClass = statusColors[competition.status] || "bg-gray-100 text-gray-800";
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{competition.name}</h4>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColorClass}`}>
                              {competition.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.level}: {competition.level}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.advisor}: {competition.advisor}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.meeting}: {competition.meeting}</span>
                          </div>
                          <div className="flex items-center">
                            <Book className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.competitions?.labels?.eligibility}: {competition.eligibility}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{competition.description}</p>
                        
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                          {data.competitions?.labels?.learnMore}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Events */}
        {data.showUpcomingEvents && data.upcomingEvents?.show && filteredUpcomingEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents?.title}</h2>
            <p className="text-gray-600 mb-6">{data.upcomingEvents?.description}</p>
            
            <div className="space-y-4">
              {filteredUpcomingEvents.map((event, index) => {
                const statusColorClass = statusColors[event.status] || "bg-gray-100 text-gray-800";
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                          <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{event.title}</h3>
                          <span className={`inline-block ${statusColorClass} text-xs font-medium px-2 py-1 rounded-full mt-1`}>
                            {event.status}
                          </span>
                          <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
                            <span className="flex items-center mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(event.date).toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'long' 
                              })}
                            </span>
                            <span className="flex items-center mr-4">
                              <Clock className="h-4 w-4 mr-1" />
                              {event.time}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                        </div>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                        {data.general?.viewDetails}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {data.upcomingEvents?.ctaButton?.show && (
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                {data.upcomingEvents?.ctaButton?.label}
              </button>
            )}
          </div>
        )}

        {/* Achievements */}
        {data.showAchievements && data.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.achievements?.title}</h2>
            <p className="text-gray-600 mb-6">{data.achievements?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon || Trophy; // Fallback icon
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300">
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
            {data.achievements?.galleryButton?.show && (
              <div className="mt-6 text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.achievements?.galleryButton?.label}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Resources */}
        {data.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources?.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = resource.icon || FileText; // Fallback icon
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
                      {data.resources?.downloadLabel}
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {data.showCta && data.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{data.cta?.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.cta?.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <button 
                  key={index} 
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.variant === 'primary' 
                      ? 'bg-white text-green-800 hover:bg-gray-100' 
                      : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionsPage;