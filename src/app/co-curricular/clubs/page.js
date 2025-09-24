"use client";
import React, { useState } from 'react';
import { 
  Users, 
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  Heart,
  Brain,
  Lightbulb,
  Shield,
  BarChart3,
  Languages,
  FileText,
  Trophy,
  Camera,
  Mic,
  Drama,
  Speech,
  Telescope,
  MapPin,
  Leaf,
  Scale,
  PenTool
} from 'lucide-react';

const ClubsPage = ({ clubsData }) => {
  const [activeCategory, setActiveCategory] = useState('academic');

  // JSON data to drive all content (will later come from a database)
  const jsonData = {
    hero: {
      show: true,
      title: "Student Clubs & Activities",
      subtitle: "Discover your passions, develop new skills, and build lasting friendships beyond the classroom",
      stats: [
        { value: "25+", label: "Active Clubs", show: true },
        { value: "500+", label: "Student Members", show: true },
        { value: "100+", label: "Annual Events", show: true }
      ],
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Club Handbook",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Join a Club?",
      description: "Participation in extracurricular activities provides holistic development and enhances your school experience",
      items: [
        {
          icon: Users,
          title: "Social Development",
          description: "Building friendships, teamwork, and communication skills through shared interests.",
          show: true
        },
        {
          icon: Brain,
          title: "Skill Enhancement",
          description: "Developing specialized skills beyond the academic curriculum.",
          show: true
        },
        {
          icon: Heart,
          title: "Wellness & Balance",
          description: "Providing creative outlets and stress relief from academic pressures.",
          show: true
        },
        {
          icon: Target,
          title: "Leadership Opportunities",
          description: "Fostering responsibility, initiative, and organizational skills.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Club Categories",
      description: "Explore our diverse range of clubs and activities",
      items: [
        { id: 'academic', name: 'Academic Clubs', icon: Book, description: 'Subject-focused enrichment', show: true },
        { id: 'arts', name: 'Arts & Culture', icon: Palette, description: 'Creative expression', show: true },
        { id: 'sports', name: 'Sports & Fitness', icon: Trophy, description: 'Physical development', show: true },
        { id: 'service', name: 'Service & Leadership', icon: Heart, description: 'Community engagement', show: true }
      ]
    },
    clubs: {
      show: true,
      labels: {
        meeting: "Meeting Time",
        advisor: "Advisor"
      },
      items: {
        academic: [
          { 
            name: "Science Club", 
            icon: Microscope, 
            meeting: "Mondays, 3:00 PM", 
            advisor: "Dr. Sharma",
            show: true 
          },
          { 
            name: "Math Olympiad", 
            icon: Calculator, 
            meeting: "Tuesdays, 3:30 PM", 
            advisor: "Mr. Gupta",
            show: true 
          },
          { 
            name: "Literary Society", 
            icon: Book, 
            meeting: "Wednesdays, 3:00 PM", 
            advisor: "Ms. Das",
            show: true 
          },
          { 
            name: "Debate Club", 
            icon: Speech, 
            meeting: "Thursdays, 4:00 PM", 
            advisor: "Mr. Kapoor",
            show: true 
          },
          { 
            name: "Computer Coding", 
            icon: Code, 
            meeting: "Fridays, 3:30 PM", 
            advisor: "Mr. Singh",
            show: true 
          },
          { 
            name: "Eco Club", 
            icon: Leaf, 
            meeting: "Saturdays, 10:00 AM", 
            advisor: "Ms. Reddy",
            show: true 
          }
        ],
        arts: [
          { 
            name: "Art & Painting", 
            icon: Palette, 
            meeting: "Mondays, 3:30 PM", 
            advisor: "Ms. Chaturvedi",
            show: true 
          },
          { 
            name: "Drama Club", 
            icon: Drama, 
            meeting: "Tuesdays, 4:00 PM", 
            advisor: "Mr. Malhotra",
            show: true 
          },
          { 
            name: "Music Club", 
            icon: Music, 
            meeting: "Wednesdays, 3:30 PM", 
            advisor: "Mr. Joshi",
            show: true 
          },
          { 
            name: "Photography Club", 
            icon: Camera, 
            meeting: "Thursdays, 3:00 PM", 
            advisor: "Ms. Mehta",
            show: true 
          },
          { 
            name: "Creative Writing", 
            icon: PenTool, 
            meeting: "Fridays, 3:00 PM", 
            advisor: "Ms. Banerjee",
            show: true 
          }
        ],
        sports: [
          { 
            name: "Basketball", 
            icon: Trophy, 
            meeting: "Mondays & Wednesdays, 4:00 PM", 
            advisor: "Mr. Kumar",
            show: true 
          },
          { 
            name: "Cricket", 
            icon: Trophy, 
            meeting: "Tuesdays & Thursdays, 4:00 PM", 
            advisor: "Mr. Patel",
            show: true 
          },
          { 
            name: "Chess Club", 
            icon: Trophy, 
            meeting: "Fridays, 3:30 PM", 
            advisor: "Mr. Iyer",
            show: true 
          },
          { 
            name: "Yoga & Meditation", 
            icon: Heart, 
            meeting: "Daily, 7:30 AM", 
            advisor: "Ms. Desai",
            show: true 
          },
          { 
            name: "Table Tennis", 
            icon: Trophy, 
            meeting: "Mondays & Fridays, 3:30 PM", 
            advisor: "Mr. Sharma",
            show: true 
          }
        ],
        service: [
          { 
            name: "Student Council", 
            icon: Users, 
            meeting: "Bi-weekly Tuesdays, 3:00 PM", 
            advisor: "Mr. Khanna",
            show: true 
          },
          { 
            name: "Community Service", 
            icon: Heart, 
            meeting: "Saturdays, 9:00 AM", 
            advisor: "Ms. Sengupta",
            show: true 
          },
          { 
            name: "Peer Tutoring", 
            icon: Book, 
            meeting: "After school as needed", 
            advisor: "Mr. Ahmed",
            show: true 
          },
          { 
            name: "Event Planning", 
            icon: Calendar, 
            meeting: "Wednesdays, 3:30 PM", 
            advisor: "Ms. Kapoor",
            show: true 
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Club Events",
      description: "Mark your calendars for these exciting club activities and competitions",
      labels: {
        time: "Time",
        location: "Location",
        viewDetails: "View details"
      },
      items: [
        {
          title: "Inter-School Science Exhibition",
          date: "15 Oct 2024",
          time: "10:00 AM - 3:00 PM",
          club: "Science Club",
          location: "School Auditorium",
          show: true
        },
        {
          title: "Annual Drama Production",
          date: "25-27 Oct 2024",
          time: "6:00 PM onwards",
          club: "Drama Club",
          location: "School Amphitheater",
          show: true
        },
        {
          title: "Basketball Tournament",
          date: "5 Nov 2024",
          time: "9:00 AM - 5:00 PM",
          club: "Basketball Club",
          location: "School Ground",
          show: true
        },
        {
          title: "Community Clean-Up Drive",
          date: "12 Nov 2024",
          time: "8:00 AM - 12:00 PM",
          club: "Community Service",
          location: "Local Park",
          show: true
        }
      ],
      ctaButton: {
        label: "View Full Events Calendar",
        show: true
      }
    },
    registration: {
      show: true,
      title: "How to Join a Club",
      description: "Follow these simple steps to become part of our vibrant club community",
      items: [
        {
          step: "1",
          title: "Explore Clubs",
          description: "Review all available clubs and their descriptions",
          show: true
        },
        {
          step: "2",
          title: "Attend Trial Sessions",
          description: "Visit clubs during their meeting times to find your interest",
          show: true
        },
        {
          step: "3",
          title: "Submit Form",
          description: "Complete the registration form with parent consent",
          show: true
        },
        {
          step: "4",
          title: "Commitment",
          description: "Attend regularly and participate actively",
          show: true
        }
      ],
      timeline: {
        title: "Registration Timeline",
        description: "Club registration opens on August 15, 2024 and remains open throughout the year with advisor approval.",
        buttonLabel: "Register Now",
        show: true
      }
    },
    resources: {
      show: true,
      title: "Club Resources",
      description: "Download important documents and forms for club participation",
      items: [
        {
          title: "Club Registration Form",
          description: "Official form to join any school club",
          format: "PDF",
          size: "0.8 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Club Activities Calendar",
          description: "Schedule of all club meetings and events for 2024-25",
          format: "PDF",
          size: "1.2 MB",
          icon: Calendar,
          show: true
        },
        {
          title: "Parent Consent Guidelines",
          description: "Information for parents about club participation",
          format: "PDF",
          size: "0.5 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Club Achievement Portfolio",
          description: "Record of club accomplishments and competitions",
          format: "PDF",
          size: "2.1 MB",
          icon: Trophy,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Questions About Clubs?",
      description: "Contact our Club Coordinator for more information about club activities, registration, or starting a new club.",
      buttons: [
        { label: "Email Coordinator", show: true },
        { label: "Request Club Information", show: true }
      ]
    },
    general: {
      learnMore: "Learn more",
      download: "Download",
      show: true
    },
    // Section visibility controls
    showHero: true,
    showBenefits: true,
    showCategories: true,
    showClubs: true,
    showUpcomingEvents: true,
    showRegistration: true,
    showResources: true,
    showCta: true
  };

  // Use clubsData if provided (e.g., from a database), otherwise fall back to jsonData
  const data = clubsData || jsonData;

  // Filter functions
  const filteredHeroStats = data.hero?.stats?.filter(stat => stat.show !== false) || [];
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredClubs = data.clubs?.items ? 
    Object.fromEntries(
      Object.entries(data.clubs.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredRegistrationSteps = data.registration?.items?.filter(step => step.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

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
              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-8">
                  {filteredHeroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
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
                const IconComponent = benefit.icon || Users; // Fallback icon
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

            {/* Clubs for Selected Category */}
            {data.showClubs && data.clubs?.show && filteredClubs[activeCategory] && filteredClubs[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClubs[activeCategory].map((club, index) => {
                    const IconComponent = club.icon || Book; // Fallback icon
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">{club.name}</h4>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.clubs?.labels?.meeting}: {club.meeting}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.clubs?.labels?.advisor}: {club.advisor}</span>
                          </div>
                        </div>
                        <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                          {data.general?.learnMore}
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
              {filteredUpcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {event.club}
                        </span>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                          <span className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                      {data.upcomingEvents?.labels?.viewDetails}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {data.upcomingEvents?.ctaButton?.show && (
              <div className="text-center mt-6">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.upcomingEvents?.ctaButton?.label}
                  <Calendar className="ml-2 h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Registration Process */}
        {data.showRegistration && data.registration?.show && filteredRegistrationSteps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.registration?.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.registration?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRegistrationSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300 group">
                  <div className="bg-green-100 text-green-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>

            {data.registration?.timeline?.show && (
              <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{data.registration?.timeline?.title}</h3>
                <p className="text-gray-600 mb-4">
                  {data.registration?.timeline?.description}
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center">
                  {data.registration?.timeline?.buttonLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                      {data.general?.download}
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
                <button key={index} className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
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

export default ClubsPage;