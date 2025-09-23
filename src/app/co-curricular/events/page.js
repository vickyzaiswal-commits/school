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

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('academic');

  const eventCategories = [
    { id: 'academic', name: 'Academic Events', icon: Book, description: 'Learning-focused activities' },
    { id: 'arts', name: 'Arts & Culture', icon: Palette, description: 'Creative performances' },
    { id: 'sports', name: 'Sports Events', icon: Trophy, description: 'Athletic competitions' },
    { id: 'special', name: 'Special Events', icon: Star, description: 'School-wide celebrations' }
  ];

  const eventBenefits = [
    {
      icon: Users,
      title: "Community Building",
      description: "Bringing together students, parents, teachers, and the wider community."
    },
    {
      icon: Star,
      title: "Skill Showcase",
      description: "Providing platforms for students to display their talents and achievements."
    },
    {
      icon: Heart,
      title: "School Spirit",
      description: "Fostering pride and connection to our school community."
    },
    {
      icon: Calendar,
      title: "Lifelong Memories",
      description: "Creating memorable experiences that students will cherish for years."
    }
  ];

  const events = {
    academic: [
      { 
        name: "Science Fair", 
        icon: Microscope, 
        date: "Nov 15, 2024", 
        time: "9:00 AM - 3:00 PM", 
        location: "School Gymnasium",
        description: "Annual showcase of student science projects and experiments",
        audience: "All Students & Parents",
        status: "Registration Open"
      },
      { 
        name: "Math Olympiad", 
        icon: Calculator, 
        date: "Dec 3, 2024", 
        time: "10:00 AM - 2:00 PM", 
        location: "Room 201",
        description: "Competitive mathematics problem-solving competition",
        audience: "Grades 9-12",
        status: "Upcoming"
      },
      { 
        name: "Literary Festival", 
        icon: Book, 
        date: "Jan 12, 2025", 
        time: "10:00 AM - 4:00 PM", 
        location: "Library & Auditorium",
        description: "Celebration of reading, writing, and literary arts",
        audience: "All Students",
        status: "Planning"
      },
      { 
        name: "History Symposium", 
        icon: Globe, 
        date: "Feb 8, 2025", 
        time: "1:00 PM - 4:00 PM", 
        location: "History Department",
        description: "Student presentations on historical research projects",
        audience: "Grades 10-12",
        status: "Upcoming"
      },
      { 
        name: "Career Day", 
        icon: Users, 
        date: "Mar 5, 2025", 
        time: "8:30 AM - 12:30 PM", 
        location: "Various Classrooms",
        description: "Professionals from various fields share their experiences",
        audience: "Grades 9-12",
        status: "Planning"
      },
      { 
        name: "Debate Tournament", 
        icon: Mic, 
        date: "Apr 18, 2025", 
        time: "9:00 AM - 5:00 PM", 
        location: "Auditorium",
        description: "Inter-school debate competition hosted at our campus",
        audience: "Debate Team & Spectators",
        status: "Registration Open"
      }
    ],
    arts: [
      { 
        name: "Fall Concert", 
        icon: Music, 
        date: "Oct 25, 2024", 
        time: "7:00 PM - 9:00 PM", 
        location: "School Auditorium",
        description: "Performance by band, orchestra, and choir students",
        audience: "All Welcome",
        status: "Tickets Available"
      },
      { 
        name: "Art Exhibition", 
        icon: Palette, 
        date: "Nov 8, 2024", 
        time: "6:00 PM - 8:00 PM", 
        location: "Art Gallery",
        description: "Showcase of student artwork from all grade levels",
        audience: "All Welcome",
        status: "Upcoming"
      },
      { 
        name: "Drama Production", 
        icon: Mic, 
        date: "Dec 12-14, 2024", 
        time: "7:00 PM each night", 
        location: "Main Theater",
        description: "Annual school play performed by drama students",
        audience: "All Welcome",
        status: "Tickets Available"
      },
      { 
        name: "Spring Musical", 
        icon: Music, 
        date: "Mar 20-23, 2025", 
        time: "7:00 PM (2:00 PM Sat matinee)", 
        location: "Main Theater",
        description: "Full-scale musical theater production",
        audience: "All Welcome",
        status: "Auditions Open"
      },
      { 
        name: "Poetry Slam", 
        icon: Mic, 
        date: "Apr 5, 2025", 
        time: "6:30 PM - 8:30 PM", 
        location: "Black Box Theater",
        description: "Student poetry performance competition",
        audience: "High School Students",
        status: "Planning"
      },
      { 
        name: "Dance Showcase", 
        icon: Star, 
        date: "May 10, 2025", 
        time: "6:00 PM - 8:00 PM", 
        location: "Auditorium",
        description: "Performance by dance classes and extracurricular groups",
        audience: "All Welcome",
        status: "Planning"
      }
    ],
    sports: [
      { 
        name: "Homecoming Game", 
        icon: Trophy, 
        date: "Oct 18, 2024", 
        time: "7:00 PM", 
        location: "Football Field",
        description: "Varsity football game with special halftime celebrations",
        audience: "All Welcome",
        status: "Upcoming"
      },
      { 
        name: "Basketball Tournament", 
        icon: Trophy, 
        date: "Nov 22-23, 2024", 
        time: "Various Times", 
        location: "Main Gym",
        description: "Annual inter-school basketball competition",
        audience: "All Welcome",
        status: "Registration Open"
      },
      { 
        name: "Swimming Championship", 
        icon: Trophy, 
        date: "Jan 25, 2025", 
        time: "9:00 AM - 4:00 PM", 
        location: "School Pool",
        description: "Regional swimming competition hosted at our facility",
        audience: "Spectators Welcome",
        status: "Planning"
      },
      { 
        name: "Track & Field Meet", 
        icon: Trophy, 
        date: "Feb 15, 2025", 
        time: "10:00 AM - 3:00 PM", 
        location: "Track Field",
        description: "Inter-school track and field competition",
        audience: "Spectators Welcome",
        status: "Upcoming"
      },
      { 
        name: "Spring Sports Banquet", 
        icon: Trophy, 
        date: "May 30, 2025", 
        time: "6:30 PM - 9:00 PM", 
        location: "Cafeteria",
        description: "Celebration of athletic achievements with awards",
        audience: "Athletes & Families",
        status: "Planning"
      },
      { 
        name: "Intramural Tournament", 
        icon: Trophy, 
        date: "Apr 12, 2025", 
        time: "9:00 AM - 2:00 PM", 
        location: "Various Fields",
        description: "Year-end tournament for intramural sports teams",
        audience: "Participants Only",
        status: "Registration Open"
      }
    ],
    special: [
      { 
        name: "Homecoming Dance", 
        icon: Star, 
        date: "Oct 19, 2024", 
        time: "7:00 PM - 10:00 PM", 
        location: "School Gymnasium",
        description: "Annual semi-formal dance with theme and decorations",
        audience: "Grades 9-12",
        status: "Tickets Available"
      },
      { 
        name: "International Day", 
        icon: Globe, 
        date: "Nov 16, 2024", 
        time: "11:00 AM - 2:00 PM", 
        location: "Cafeteria & Courtyard",
        description: "Celebration of diverse cultures with food and performances",
        audience: "School Community",
        status: "Upcoming"
      },
      { 
        name: "Holiday Festival", 
        icon: Heart, 
        date: "Dec 14, 2024", 
        time: "4:00 PM - 7:00 PM", 
        location: "School Grounds",
        description: "Seasonal celebration with activities and performances",
        audience: "All Welcome",
        status: "Planning"
      },
      { 
        name: "Science & Technology Fair", 
        icon: Microscope, 
        date: "Jan 18, 2025", 
        time: "10:00 AM - 3:00 PM", 
        location: "Science Wing",
        description: "Showcase of innovative student projects in STEM fields",
        audience: "All Welcome",
        status: "Registration Open"
      },
      { 
        name: "Spring Carnival", 
        icon: Star, 
        date: "Apr 26, 2025", 
        time: "12:00 PM - 5:00 PM", 
        location: "School Field",
        description: "Fun fair with games, food, and activities for all ages",
        audience: "Community Event",
        status: "Planning"
      },
      { 
        name: "Graduation Ceremony", 
        icon: Award, 
        date: "Jun 7, 2025", 
        time: "2:00 PM", 
        location: "Football Field",
        description: "Commencement exercises for graduating seniors",
        audience: "Graduates & Families",
        status: "By Invitation"
      }
    ]
  };

  const featuredEvents = [
    {
      title: "Annual Fall Festival",
      date: "Oct 12, 2024",
      time: "3:00 PM - 8:00 PM",
      category: "Special Event",
      location: "School Grounds",
      description: "An afternoon of games, food, and fun for the whole family featuring performances by student groups",
      status: "Tickets Available"
    },
    {
      title: "College Fair",
      date: "Nov 5, 2024",
      time: "6:00 PM - 8:30 PM",
      category: "Academic Event",
      location: "Gymnasium",
      description: "Representatives from over 50 colleges and universities will be available to meet with students and parents",
      status: "Registration Open"
    },
    {
      title: "Winter Concert Series",
      date: "Dec 5-7, 2024",
      time: "7:00 PM each night",
      category: "Arts Event",
      location: "Auditorium",
      description: "An evening of musical performances by our band, orchestra, and choral groups",
      status: "Tickets Available"
    },
    {
      title: "Science Olympiad Competition",
      date: "Jan 25, 2025",
      time: "8:00 AM - 5:00 PM",
      category: "Academic Event",
      location: "Science Wing",
      description: "Teams from across the region will compete in various science challenges and experiments",
      status: "Registration Open"
    }
  ];

  const pastEvents = [
    {
      title: "Back to School Night",
      date: "Sep 15, 2024",
      description: "Parents had the opportunity to meet teachers and learn about curriculum",
      attendance: "450+ attendees"
    },
    {
      title: "Student Leadership Conference",
      date: "Aug 20, 2024",
      description: "Workshops and training for student government and club leaders",
      attendance: "85 participants"
    },
    {
      title: "Community Service Day",
      date: "Sep 28, 2024",
      description: "Students volunteered at local organizations and community projects",
      attendance: "300+ volunteers"
    },
    {
      title: "Art & Music Festival",
      date: "May 18, 2024",
      description: "Spring showcase of visual and performing arts talent",
      attendance: "600+ attendees"
    }
  ];

  const resources = [
    {
      title: "Annual Events Calendar",
      description: "Complete schedule of events for the 2024-2025 school year",
      format: "PDF",
      size: "1.5 MB",
      icon: Calendar
    },
    {
      title: "Event Proposal Form",
      description: "Form to suggest new events or activities for the school",
      format: "DOCX",
      size: "0.3 MB",
      icon: FileText
    },
    {
      title: "Facility Rental Information",
      description: "Guidelines for renting school facilities for external events",
      format: "PDF",
      size: "0.8 MB",
      icon: FileText
    },
    {
      title: "Volunteer Sign-up Sheet",
      description: "Opportunities to help with upcoming school events",
      format: "PDF",
      size: "0.5 MB",
      icon: Users
    }
  ];

  const statusColors = {
    "Tickets Available": "bg-green-100 text-green-800",
    "Registration Open": "bg-blue-100 text-blue-800",
    "Upcoming": "bg-yellow-100 text-yellow-800",
    "Planning": "bg-gray-100 text-gray-800",
    "Auditions Open": "bg-purple-100 text-purple-800",
    "By Invitation": "bg-pink-100 text-pink-800"
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Events</h1>
            <p className="text-xl mb-6 text-gray-200">
              Connecting our community through memorable experiences and celebrations
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Annual Calendar
              <Download className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Event Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why School Events Matter</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Events create opportunities for connection, celebration, and community building
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventBenefits.map((benefit, index) => {
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

      {/* Featured Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Events</h2>
            <p className="text-lg text-gray-600">
              Don't miss these highlight events of the school year
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.title}</h3>
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
                        {event.category}
                      </span>
                    </div>
                    <div className="bg-green-50 text-green-700 text-center p-2 rounded-lg">
                      <div className="font-bold text-sm">{event.date.split(' ')[0]}</div>
                      <div className="text-xs">{event.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[event.status]}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                    {event.status === "Tickets Available" ? "Get Tickets" : "Learn More"}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Categories</h2>
            <p className="text-lg text-gray-600">
              Explore our diverse range of school events and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {eventCategories.map((category) => {
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

          {/* Events for Selected Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {eventCategories.find(c => c.id === activeCategory)?.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events[activeCategory].map((event, index) => {
                const IconComponent = event.icon;
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
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-green-500" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-green-500" />
                        <span>{event.audience}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                    
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      View details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Past Events</h2>
            <p className="text-lg text-gray-600">
              Celebrating our recent successful events and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                  {event.date}
                </span>
                <h3 className="font-semibold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <p className="text-xs text-gray-500">{event.attendance}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              View Event Photo Gallery
              <ExternalLink className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Event Resources</h2>
            <p className="text-lg text-gray-600">
              Download event information, forms, and planning resources
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
          <h2 className="text-3xl font-bold mb-4">Get Involved in School Events</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Whether you want to attend, volunteer, or propose a new event, there are many ways to participate
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Volunteer for Events
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Propose an Event
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;