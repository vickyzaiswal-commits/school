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
  Leaf,
  Scale,
  PenTool
} from 'lucide-react';

const ClubsPage = () => {
  const [activeCategory, setActiveCategory] = useState('academic');

  const clubCategories = [
    { id: 'academic', name: 'Academic Clubs', icon: Book, description: 'Subject-focused enrichment' },
    { id: 'arts', name: 'Arts & Culture', icon: Palette, description: 'Creative expression' },
    { id: 'sports', name: 'Sports & Fitness', icon: Trophy, description: 'Physical development' },
    { id: 'service', name: 'Service & Leadership', icon: Heart, description: 'Community engagement' }
  ];

  const clubBenefits = [
    {
      icon: Users,
      title: "Social Development",
      description: "Building friendships, teamwork, and communication skills through shared interests."
    },
    {
      icon: Brain,
      title: "Skill Enhancement",
      description: "Developing specialized skills beyond the academic curriculum."
    },
    {
      icon: Heart,
      title: "Wellness & Balance",
      description: "Providing creative outlets and stress relief from academic pressures."
    },
    {
      icon: Target,
      title: "Leadership Opportunities",
      description: "Fostering responsibility, initiative, and organizational skills."
    }
  ];

  const clubs = {
    academic: [
      { name: "Science Club", icon: Microscope, meeting: "Mondays, 3:00 PM", advisor: "Dr. Sharma" },
      { name: "Math Olympiad", icon: Calculator, meeting: "Tuesdays, 3:30 PM", advisor: "Mr. Gupta" },
      { name: "Literary Society", icon: Book, meeting: "Wednesdays, 3:00 PM", advisor: "Ms. Das" },
      { name: "Debate Club", icon: Speech, meeting: "Thursdays, 4:00 PM", advisor: "Mr. Kapoor" },
      { name: "Computer Coding", icon: Code, meeting: "Fridays, 3:30 PM", advisor: "Mr. Singh" },
      { name: "Eco Club", icon: Leaf, meeting: "Saturdays, 10:00 AM", advisor: "Ms. Reddy" }
    ],
    arts: [
      { name: "Art & Painting", icon: Palette, meeting: "Mondays, 3:30 PM", advisor: "Ms. Chaturvedi" },
      { name: "Drama Club", icon: Drama, meeting: "Tuesdays, 4:00 PM", advisor: "Mr. Malhotra" },
      { name: "Music Club", icon: Music, meeting: "Wednesdays, 3:30 PM", advisor: "Mr. Joshi" },
      { name: "Photography Club", icon: Camera, meeting: "Thursdays, 3:00 PM", advisor: "Ms. Mehta" },
      { name: "Creative Writing", icon: PenTool, meeting: "Fridays, 3:00 PM", advisor: "Ms. Banerjee" }
    ],
    sports: [
      { name: "Basketball", icon: Trophy, meeting: "Mondays & Wednesdays, 4:00 PM", advisor: "Mr. Kumar" },
      { name: "Cricket", icon: Trophy, meeting: "Tuesdays & Thursdays, 4:00 PM", advisor: "Mr. Patel" },
      { name: "Chess Club", icon: Trophy, meeting: "Fridays, 3:30 PM", advisor: "Mr. Iyer" },
      { name: "Yoga & Meditation", icon: Heart, meeting: "Daily, 7:30 AM", advisor: "Ms. Desai" },
      { name: "Table Tennis", icon: Trophy, meeting: "Mondays & Fridays, 3:30 PM", advisor: "Mr. Sharma" }
    ],
    service: [
      { name: "Student Council", icon: Users, meeting: "Bi-weekly Tuesdays, 3:00 PM", advisor: "Mr. Khanna" },
      { name: "Community Service", icon: Heart, meeting: "Saturdays, 9:00 AM", advisor: "Ms. Sengupta" },
      { name: "Peer Tutoring", icon: Book, meeting: "After school as needed", advisor: "Mr. Ahmed" },
      { name: "Event Planning", icon: Calendar, meeting: "Wednesdays, 3:30 PM", advisor: "Ms. Kapoor" }
    ]
  };

  const upcomingEvents = [
    {
      title: "Inter-School Science Exhibition",
      date: "15 Oct 2024",
      time: "10:00 AM - 3:00 PM",
      club: "Science Club",
      location: "School Auditorium"
    },
    {
      title: "Annual Drama Production",
      date: "25-27 Oct 2024",
      time: "6:00 PM onwards",
      club: "Drama Club",
      location: "School Amphitheater"
    },
    {
      title: "Basketball Tournament",
      date: "5 Nov 2024",
      time: "9:00 AM - 5:00 PM",
      club: "Basketball Club",
      location: "School Ground"
    },
    {
      title: "Community Clean-Up Drive",
      date: "12 Nov 2024",
      time: "8:00 AM - 12:00 PM",
      club: "Community Service",
      location: "Local Park"
    }
  ];

  const registrationProcess = [
    {
      step: "1",
      title: "Explore Clubs",
      description: "Review all available clubs and their descriptions"
    },
    {
      step: "2",
      title: "Attend Trial Sessions",
      description: "Visit clubs during their meeting times to find your interest"
    },
    {
      step: "3",
      title: "Submit Form",
      description: "Complete the registration form with parent consent"
    },
    {
      step: "4",
      title: "Commitment",
      description: "Attend regularly and participate actively"
    }
  ];

  const resources = [
    {
      title: "Club Registration Form",
      description: "Official form to join any school club",
      format: "PDF",
      size: "0.8 MB",
      icon: FileText
    },
    {
      title: "Club Activities Calendar",
      description: "Schedule of all club meetings and events for 2024-25",
      format: "PDF",
      size: "1.2 MB",
      icon: Calendar
    },
    {
      title: "Parent Consent Guidelines",
      description: "Information for parents about club participation",
      format: "PDF",
      size: "0.5 MB",
      icon: FileText
    },
    {
      title: "Club Achievement Portfolio",
      description: "Record of club accomplishments and competitions",
      format: "PDF",
      size: "2.1 MB",
      icon: Trophy
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Clubs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Student Clubs & Activities</h1>
            <p className="text-xl mb-6 text-gray-200">
              Discover your passions, develop new skills, and build lasting friendships beyond the classroom
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Club Handbook
              <Download className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Club Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join a Club?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Participation in extracurricular activities provides holistic development and enhances your school experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-blue-50 transition-all duration-300 group text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Club Categories Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Club Categories</h2>
            <p className="text-lg text-gray-600">
              Explore our diverse range of clubs and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {clubCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex flex-col items-center p-6 rounded-lg transition-all ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <IconComponent className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className={`text-sm ${activeCategory === category.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Clubs for Selected Category */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {clubCategories.find(c => c.id === activeCategory)?.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs[activeCategory].map((club, index) => {
                const IconComponent = club.icon;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800">{club.name}</h4>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{club.meeting}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Advisor: {club.advisor}</span>
                      </div>
                    </div>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                      Learn more
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Club Events</h2>
            <p className="text-lg text-gray-600">
              Mark your calendars for these exciting club activities and competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {event.club}
                    </span>
                  </div>
                  <div className="bg-blue-50 text-blue-700 text-center p-2 rounded-lg">
                    <div className="font-bold text-sm">{event.date.split(' ')[0]}</div>
                    <div className="text-xs">{event.date.split(' ')[1]}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                  View details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              View Full Events Calendar
              <Calendar className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How to Join a Club</h2>
            <p className="text-lg text-gray-600">
              Follow these simple steps to become part of our vibrant club community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {registrationProcess.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Registration Timeline</h3>
            <p className="text-gray-600 mb-4">
              Club registration opens on <span className="font-semibold">August 15, 2024</span> and remains open throughout the year with advisor approval.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Club Resources</h2>
            <p className="text-lg text-gray-600">
              Download important documents and forms for club participation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                  <div className="flex items-start">
                    <IconComponent className="h-6 w-6 text-blue-600 mr-4 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
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
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Clubs?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our Club Coordinator for more information about club activities, registration, or starting a new club.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Email Coordinator
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Request Club Information
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClubsPage;