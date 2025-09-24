"use client";
import React, { useState } from 'react';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Star,
  Award,
  Music,
  Mic,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Heart,
  Trophy,
  Download,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  FileText
} from 'lucide-react';

const EventsPage = ({ eventsData }) => {
  const [activeCategory, setActiveCategory] = useState('academic');

  // JSON data to drive all content (will later come from a database)
  const jsonData = {
    hero: {
      show: true,
      title: "School Events & Activities",
      subtitle: "Join our vibrant school community through exciting events and celebrations throughout the year",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Event Handbook",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Attend School Events?",
      description: "Our events provide unique opportunities for growth, community, and memorable experiences",
      items: [
        {
          icon: Users,
          title: "Community Building",
          description: "Bringing together students, parents, teachers, and the wider community.",
          show: true
        },
        {
          icon: Star,
          title: "Skill Showcase",
          description: "Providing platforms for students to display their talents and achievements.",
          show: true
        },
        {
          icon: Heart,
          title: "School Spirit",
          description: "Fostering pride and connection to our school community.",
          show: true
        },
        {
          icon: Calendar,
          title: "Lifelong Memories",
          description: "Creating memorable experiences that students will cherish for years.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Event Categories",
      description: "Explore our diverse range of school events and activities",
      items: [
        { id: 'academic', name: 'Academic Events', icon: Book, description: 'Learning-focused activities', show: true },
        { id: 'arts', name: 'Arts & Culture', icon: Palette, description: 'Creative performances', show: true },
        { id: 'sports', name: 'Sports Events', icon: Trophy, description: 'Athletic competitions', show: true },
        { id: 'special', name: 'Special Events', icon: Star, description: 'School-wide celebrations', show: true }
      ]
    },
    events: {
      show: true,
      labels: {
        date: "Date",
        time: "Time",
        location: "Location",
        audience: "Audience"
      },
      items: {
        academic: [
          { 
            name: "Science Fair", 
            icon: Microscope, 
            date: "2024-11-15", 
            time: "9:00 AM - 3:00 PM", 
            location: "School Gymnasium",
            description: "Annual showcase of student science projects and experiments",
            audience: "All Students & Parents",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Math Olympiad", 
            icon: Calculator, 
            date: "2024-12-03", 
            time: "10:00 AM - 2:00 PM", 
            location: "Room 201",
            description: "Competitive mathematics problem-solving competition",
            audience: "Grades 9-12",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Literary Festival", 
            icon: Book, 
            date: "2025-01-12", 
            time: "10:00 AM - 4:00 PM", 
            location: "Library & Auditorium",
            description: "Celebration of reading, writing, and literary arts",
            audience: "All Students",
            status: "Planning",
            show: true
          },
          { 
            name: "History Symposium", 
            icon: Globe, 
            date: "2025-02-08", 
            time: "1:00 PM - 4:00 PM", 
            location: "History Department",
            description: "Student presentations on historical research projects",
            audience: "Grades 10-12",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Career Day", 
            icon: Users, 
            date: "2025-03-05", 
            time: "8:30 AM - 12:30 PM", 
            location: "Various Classrooms",
            description: "Professionals from various fields share their experiences",
            audience: "Grades 9-12",
            status: "Planning",
            show: true
          },
          { 
            name: "Debate Tournament", 
            icon: Mic, 
            date: "2025-04-18", 
            time: "9:00 AM - 5:00 PM", 
            location: "Auditorium",
            description: "Inter-school debate competition hosted at our campus",
            audience: "Debate Team & Spectators",
            status: "Registration Open",
            show: true
          }
        ],
        arts: [
          { 
            name: "Fall Concert", 
            icon: Music, 
            date: "2024-10-25", 
            time: "7:00 PM - 9:00 PM", 
            location: "School Auditorium",
            description: "Performance by band, orchestra, and choir students",
            audience: "All Welcome",
            status: "Tickets Available",
            show: true
          },
          { 
            name: "Art Exhibition", 
            icon: Palette, 
            date: "2024-11-08", 
            time: "6:00 PM - 8:00 PM", 
            location: "Art Gallery",
            description: "Showcase of student artwork from all grade levels",
            audience: "All Welcome",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Drama Production", 
            icon: Mic, 
            date: "2024-12-12", 
            time: "7:00 PM each night", 
            location: "Main Theater",
            description: "Annual school play performed by drama students",
            audience: "All Welcome",
            status: "Tickets Available",
            show: true
          },
          { 
            name: "Spring Musical", 
            icon: Music, 
            date: "2025-03-20", 
            time: "7:00 PM (2:00 PM Sat matinee)", 
            location: "Main Theater",
            description: "Full-scale musical theater production",
            audience: "All Welcome",
            status: "Auditions Open",
            show: true
          },
          { 
            name: "Poetry Slam", 
            icon: Mic, 
            date: "2025-04-05", 
            time: "6:30 PM - 8:30 PM", 
            location: "Black Box Theater",
            description: "Student poetry performance competition",
            audience: "High School Students",
            status: "Planning",
            show: true
          },
          { 
            name: "Dance Showcase", 
            icon: Star, 
            date: "2025-05-10", 
            time: "6:00 PM - 8:00 PM", 
            location: "Auditorium",
            description: "Performance by dance classes and extracurricular groups",
            audience: "All Welcome",
            status: "Planning",
            show: true
          }
        ],
        sports: [
          { 
            name: "Homecoming Game", 
            icon: Trophy, 
            date: "2024-10-18", 
            time: "7:00 PM", 
            location: "Football Field",
            description: "Varsity football game with special halftime celebrations",
            audience: "All Welcome",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Basketball Tournament", 
            icon: Trophy, 
            date: "2024-11-22", 
            time: "Various Times", 
            location: "Main Gym",
            description: "Annual inter-school basketball competition",
            audience: "All Welcome",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Swimming Championship", 
            icon: Trophy, 
            date: "2025-01-25", 
            time: "9:00 AM - 4:00 PM", 
            location: "School Pool",
            description: "Regional swimming competition hosted at our facility",
            audience: "Spectators Welcome",
            status: "Planning",
            show: true
          },
          { 
            name: "Track & Field Meet", 
            icon: Trophy, 
            date: "2025-02-15", 
            time: "10:00 AM - 3:00 PM", 
            location: "Track Field",
            description: "Inter-school track and field competition",
            audience: "Spectators Welcome",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Spring Sports Banquet", 
            icon: Trophy, 
            date: "2025-05-30", 
            time: "6:30 PM - 9:00 PM", 
            location: "Cafeteria",
            description: "Celebration of athletic achievements with awards",
            audience: "Athletes & Families",
            status: "Planning",
            show: true
          },
          { 
            name: "Intramural Tournament", 
            icon: Trophy, 
            date: "2025-04-12", 
            time: "12:00 PM - 2:00 PM", 
            location: "Various Fields",
            description: "Year-end tournament for intramural sports teams",
            audience: "Participants Only",
            status: "Registration Open",
            show: true
          }
        ],
        special: [
          { 
            name: "Homecoming Dance", 
            icon: Star, 
            date: "2024-10-19", 
            time: "7:00 PM - 10:00 PM", 
            location: "School Gymnasium",
            description: "Annual semi-formal dance with theme and decorations",
            audience: "Grades 9-12",
            status: "Tickets Available",
            show: true
          },
          { 
            name: "International Day", 
            icon: Globe, 
            date: "2024-11-16", 
            time: "11:00 AM - 2:00 PM", 
            location: "Cafeteria & Courtyard",
            description: "Celebration of diverse cultures with food and performances",
            audience: "School Community",
            status: "Upcoming",
            show: true
          },
          { 
            name: "Holiday Festival", 
            icon: Heart, 
            date: "2024-12-14", 
            time: "4:00 PM - 7:00 PM", 
            location: "School Grounds",
            description: "Seasonal celebration with activities and performances",
            audience: "All Welcome",
            status: "Planning",
            show: true
          },
          { 
            name: "Science & Technology Fair", 
            icon: Microscope, 
            date: "2025-01-18", 
            time: "10:00 AM - 3:00 PM", 
            location: "Science Wing",
            description: "Showcase of innovative student projects in STEM fields",
            audience: "All Welcome",
            status: "Registration Open",
            show: true
          },
          { 
            name: "Spring Carnival", 
            icon: Star, 
            date: "2025-04-26", 
            time: "12:00 PM - 5:00 PM", 
            location: "School Field",
            description: "Fun fair with games, food, and activities for all ages",
            audience: "Community Event",
            status: "Planning",
            show: true
          },
          { 
            name: "Graduation Ceremony", 
            icon: Award, 
            date: "2025-06-07", 
            time: "2:00 PM", 
            location: "Football Field",
            description: "Commencement exercises for graduating seniors",
            audience: "Graduates & Families",
            status: "By Invitation",
            show: true
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Featured Upcoming Events",
      description: "Don't miss these exciting events coming soon",
      items: [
        {
          title: "Annual Fall Festival",
          date: "2024-10-12",
          time: "3:00 PM - 8:00 PM",
          category: "Special Event",
          location: "School Grounds",
          description: "An afternoon of games, food, and fun for the whole family featuring performances by student groups",
          status: "Tickets Available",
          show: true
        },
        {
          title: "College Fair",
          date: "2024-11-05",
          time: "6:00 PM - 8:30 PM",
          category: "Academic Event",
          location: "Gymnasium",
          description: "Representatives from over 50 colleges and universities",
          status: "Registration Open",
          show: true
        },
        {
          title: "Winter Concert Series",
          date: "2024-12-15",
          time: "7:00 PM - 9:00 PM",
          category: "Arts Event",
          location: "Auditorium",
          description: "Holiday performances by music and dance groups",
          status: "Tickets Available",
          show: true
        },
        {
          title: "Sports Day",
          date: "2025-04-05",
          time: "9:00 AM - 4:00 PM",
          category: "Sports Event",
          location: "School Fields",
          description: "Annual athletic competitions and family picnic",
          status: "Upcoming",
          show: true
        }
      ]
    },
    pastEvents: {
      show: true,
      title: "Past Events",
      description: "Celebrating our recent successful events and activities",
      galleryButtonLabel: "View Event Photo Gallery",
      items: [
        {
          title: "Orientation Day",
          date: "2024-08-25",
          description: "Welcome event for new students and families",
          attendance: "500+ participants",
          show: true
        },
        {
          title: "Independence Day Celebration",
          date: "2024-08-15",
          description: "Patriotic performances and cultural activities",
          attendance: "Whole school community",
          show: true
        },
        {
          title: "Back to School Night",
          date: "2024-09-10",
          description: "Parent-teacher meetings and classroom visits",
          attendance: "Parents & Teachers",
          show: true
        },
        {
          title: "Autumn Sports Meet",
          date: "2024-09-28",
          description: "Inter-house athletic competitions",
          attendance: "All students",
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Event Resources",
      description: "Download event information, forms, and planning resources",
      downloadLabel: "Download",
      items: [
        {
          title: "Event Calendar 2024-25",
          description: "Complete schedule of all school events",
          format: "PDF",
          size: "1.2 MB",
          icon: Calendar,
          show: true
        },
        {
          title: "Volunteer Signup Form",
          description: "Form to volunteer for school events",
          format: "PDF",
          size: "0.8 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Event Proposal Template",
          description: "Template to propose new school events",
          format: "DOCX",
          size: "0.5 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Permission Slip Sample",
          description: "Standard permission form for events",
          format: "PDF",
          size: "0.4 MB",
          icon: FileText,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Get Involved in School Events",
      description: "Whether you want to attend, volunteer, or propose a new event, there are many ways to participate",
      buttons: [
        { 
          label: "Volunteer for Events", 
          variant: "primary",
          show: true 
        },
        { 
          label: "Propose an Event", 
          variant: "secondary",
          show: true 
        }
      ]
    },
    general: {
      viewDetails: "View details",
      getTickets: "Get Tickets",
      learnMore: "Learn More"
    },
    statusColors: {
      "Registration Open": "bg-yellow-100 text-yellow-800",
      "Upcoming": "bg-blue-100 text-blue-800",
      "Planning": "bg-purple-100 text-purple-800",
      "Tickets Available": "bg-green-100 text-green-800",
      "Auditions Open": "bg-orange-100 text-orange-800",
      "By Invitation": "bg-gray-100 text-gray-800"
    },
    // Section visibility controls
    showHero: true,
    showBenefits: true,
    showFeaturedEvents: true,
    showCategories: true,
    showEvents: true,
    showPastEvents: true,
    showResources: true,
    showCta: true
  };

  // Use eventsData if provided (e.g., from a database), otherwise fall back to jsonData
  const data = eventsData || jsonData;

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredEvents = data.events?.items ? 
    Object.fromEntries(
      Object.entries(data.events.items).map(([key, items]) => [
        key, 
        items.filter(item => item.show !== false)
      ])
    ) : {};
  const filteredUpcomingEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredPastEvents = data.pastEvents?.items?.filter(event => event.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];

  // Status color mapping
  const statusColors = data.statusColors || {
    "Registration Open": "bg-yellow-100 text-yellow-800",
    "Upcoming": "bg-blue-100 text-blue-800",
    "Planning": "bg-purple-100 text-purple-800",
    "Tickets Available": "bg-green-100 text-green-800",
    "Auditions Open": "bg-orange-100 text-orange-800",
    "By Invitation": "bg-gray-100 text-gray-800"
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

        {/* Featured Upcoming Events */}
        {data.showFeaturedEvents && data.upcomingEvents?.show && filteredUpcomingEvents.length > 0 && (
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
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                          {event.category}
                        </span>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
                          <span className="flex items-center mr-4">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
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
                        <span className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${statusColors[event.status]}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                      {event.status === "Tickets Available" ? data.general?.getTickets : data.general?.learnMore}
                    </button>
                  </div>
                </div>
              ))}
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

            {/* Events for Selected Category */}
            {data.showEvents && data.events?.show && filteredEvents[activeCategory] && filteredEvents[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories?.items?.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents[activeCategory].map((event, index) => {
                    const IconComponent = event.icon || Calendar; // Fallback icon
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{event.name}</h4>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[event.status]}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.date}: {new Date(event.date).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'long',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.time}: {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.location}: {event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-green-500" />
                            <span>{data.events?.labels?.audience}: {event.audience}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                        
                        <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                          {data.general?.viewDetails}
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

        {/* Past Events */}
        {data.showPastEvents && data.pastEvents?.show && filteredPastEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.pastEvents?.title}</h2>
            <p className="text-gray-600 mb-6">{data.pastEvents?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPastEvents.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-green-50 transition-all duration-300">
                  <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                    {new Date(event.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <h3 className="font-semibold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <p className="text-xs text-gray-500">{event.attendance}</p>
                </div>
              ))}
            </div>
            {data.pastEvents?.galleryButtonLabel && (
              <div className="mt-6 text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {data.pastEvents?.galleryButtonLabel}
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

export default EventsPage;