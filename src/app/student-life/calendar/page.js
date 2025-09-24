"use client";
import React, { useState } from 'react';
import {
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Book,
  Trophy,
  Music,
  Palette,
  Microscope,
  Globe,
  Award,
  Star,
  Heart,
  FileText,
  ExternalLink,
  GraduationCap,
  TestTube,
  Drama,
  Bell,
  Bus
} from 'lucide-react';

// JSON data for all page content
const pageData = {
  hero: {
    show: true,
    title: "School Calendar 2024-2025",
    subtitle: "Plan your academic year with important dates, events, and holidays",
    height: "h-96",
    backgroundImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaButton: {
      label: "Download Full Calendar",
      show: true
    }
  },

  benefits: {
    show: true,
    title: "Why Our Academic Calendar Matters",
    description: "A well-structured calendar ensures optimal learning and balanced development throughout the year",
    items: [
      {
        icon: Calendar,
        title: "Structured Planning",
        description: "Carefully planned academic terms with balanced instructional days and breaks",
        show: true
      },
      {
        icon: Bell,
        title: "Event Coordination",
        description: "Synchronized schedules for academics, sports, and cultural activities",
        show: true
      },
      {
        icon: Users,
        title: "Family Planning",
        description: "Helps parents and students plan vacations and important family events",
        show: true
      },
      {
        icon: Book,
        title: "Academic Success",
        description: "Ensures adequate time for curriculum coverage and exam preparation",
        show: true
      }
    ]
  },

  eventCategories: [
    { id: 'all', name: 'All Events', color: 'bg-gray-500', show: true },
    { id: 'academic', name: 'Academic', color: 'bg-blue-500', show: true },
    { id: 'sports', name: 'Sports', color: 'bg-green-500', show: true },
    { id: 'cultural', name: 'Cultural', color: 'bg-purple-500', show: true },
    { id: 'holidays', name: 'Holidays', color: 'bg-red-500', show: true },
    { id: 'other', name: 'Other', color: 'bg-yellow-500', show: true }
  ],

  calendarEvents: [
    {
      id: 1,
      title: "First Day of School",
      date: "2024-04-01",
      time: "8:00 AM",
      category: 'academic',
      description: "Welcome back students! Beginning of new academic session 2024-2025 with orientation program",
      icon: 'Book',
      location: "Main Auditorium",
      priority: "high",
      show: true
    },
    {
      id: 2,
      title: "Mathematics Olympiad",
      date: "2024-04-10",
      time: "10:00 AM",
      category: 'academic',
      description: "Inter-school mathematics competition for grades 9-12",
      icon: 'GraduationCap',
      location: "Mathematics Lab",
      priority: "medium",
      show: true
    },
    {
      id: 3,
      title: "Basketball Tournament",
      date: "2024-04-15",
      time: "3:00 PM",
      category: 'sports',
      description: "Annual inter-house basketball championship finals",
      icon: 'Trophy',
      location: "School Basketball Court",
      priority: "high",
      show: true
    },
    {
      id: 4,
      title: "Science Fair",
      date: "2024-04-22",
      time: "9:00 AM - 4:00 PM",
      category: 'academic',
      description: "Student science projects exhibition with guest judges from local universities",
      icon: 'Microscope',
      location: "Science Block",
      priority: "high",
      show: true
    },
    {
      id: 5,
      title: "Earth Day Celebration",
      date: "2024-04-22",
      time: "11:00 AM",
      category: 'cultural',
      description: "Environmental awareness activities, tree plantation, and eco-friendly workshops",
      icon: 'Globe',
      location: "School Garden",
      priority: "medium",
      show: true
    },
    {
      id: 6,
      title: "Spring Break Begins",
      date: "2024-05-01",
      endDate: "2024-05-07",
      category: 'holidays',
      description: "Spring vacation - no classes. School premises closed for maintenance",
      icon: 'Heart',
      location: "No Classes",
      priority: "high",
      show: true
    },
    {
      id: 7,
      title: "Mid-Term Examinations",
      date: "2024-05-15",
      endDate: "2024-05-20",
      time: "9:00 AM Daily",
      category: 'academic',
      description: "Mid-term assessment for all classes. Regular timetable suspended",
      icon: 'Book',
      location: "Respective Classrooms",
      priority: "high",
      show: true
    },
    {
      id: 8,
      title: "Art Exhibition Opening",
      date: "2024-05-25",
      time: "5:00 PM",
      category: 'cultural',
      description: "Grand opening of student artwork exhibition with special guest artist",
      icon: 'Palette',
      location: "Art Gallery",
      priority: "medium",
      show: true
    },
    {
      id: 9,
      title: "Annual Music Concert",
      date: "2024-06-05",
      time: "6:30 PM",
      category: 'cultural',
      description: "Evening of musical performances by school bands, orchestra, and choir",
      icon: 'Music',
      location: "School Auditorium",
      priority: "high",
      show: true
    },
    {
      id: 10,
      title: "Parent-Teacher Meeting",
      date: "2024-06-15",
      time: "9:00 AM - 1:00 PM",
      category: 'academic',
      description: "Discussion of student progress with subject teachers and class advisors",
      icon: 'Users',
      location: "Respective Classrooms",
      priority: "high",
      show: true
    }
  ],

  academicOverview: {
    show: true,
    title: "Academic Year 2024-2025 Overview",
    subtitle: "Key periods and important dates for the entire academic year",
    terms: [
      { period: "Spring Term", date: "Apr 1 - May 25", color: "bg-blue-500", events: 8, show: true },
      { period: "Summer Break", date: "May 26 - Jul 14", color: "bg-yellow-500", events: 0, show: true },
      { period: "Monsoon Term", date: "Jul 15 - Sep 30", color: "bg-green-500", events: 3, show: true },
      { period: "Autumn Break", date: "Oct 1 - Oct 15", color: "bg-orange-500", events: 0, show: true },
      { period: "Winter Term", date: "Oct 16 - Mar 31", color: "bg-purple-500", events: 5, show: true }
    ],
    stats: [
      { value: "180", label: "Instructional Days", icon: "Book", color: "blue", show: true },
      { value: "45", label: "Holidays & Breaks", icon: "Heart", color: "green", show: true },
      { value: "25+", label: "Major Events", icon: "Trophy", color: "purple", show: true }
    ]
  },

  resources: {
    show: true,
    title: "Calendar Resources",
    description: "Download important calendar-related documents and schedules",
    downloadLabel: "Download",
    items: [
      {
        title: "Complete Academic Calendar 2024-25",
        description: "Full academic year schedule with all holidays and important dates",
        format: "PDF",
        size: "2.1 MB",
        icon: FileText,
        downloads: 1247,
        show: true
      },
      {
        title: "Exam Schedule & Syllabus",
        description: "Detailed timetable for all examinations with subject-wise syllabus",
        format: "PDF",
        size: "1.2 MB",
        icon: FileText,
        downloads: 892,
        show: true
      },
      {
        title: "Holiday List & School Closures",
        description: "Complete list of all school holidays, breaks, and administrative closures",
        format: "PDF",
        size: "0.8 MB",
        icon: FileText,
        downloads: 1563,
        show: true
      },
      {
        title: "Event Planning Guidebook",
        description: "Comprehensive guide for event organizers, participants, and volunteers",
        format: "DOCX",
        size: "1.5 MB",
        icon: FileText,
        downloads: 567,
        show: true
      }
    ]
  },

  subscription: {
    show: true,
    title: "Stay Updated With School Events",
    subtitle: "Subscribe to our calendar updates and never miss an important school event or deadline",
    placeholder: "Enter your email address",
    buttonText: "Subscribe to Updates",
    note: "You can also sync our calendar with your Google Calendar, Outlook, or iCal",
    linkText: "View calendar subscription options",
    subscribers: "2,348 parents and students"
  },

  cta: {
    show: true,
    title: "Need Calendar Assistance?",
    description: "Contact our administration office for any questions about school events or schedule changes",
    buttons: [
      { 
        label: "Email Administration", 
        variant: "primary",
        show: true 
      },
      { 
        label: "Request Event Information", 
        variant: "secondary",
        show: true 
      }
    ]
  }
};

// Icon mapping
const iconMap = {
  Calendar, Download, ChevronLeft, ChevronRight, MapPin, Clock, Users, Book, Trophy, Music, Palette, Microscope, Globe, Award, Star, Heart, FileText, ExternalLink, GraduationCap, TestTube, Drama, Bell, Bus
};

const SchoolCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeCategory, setActiveCategory] = useState('all');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter functions
  const filteredBenefits = pageData.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredEventCategories = pageData.eventCategories?.filter(category => category.show !== false) || [];
  const filteredCalendarEvents = pageData.calendarEvents?.filter(event => event.show !== false) || [];
  const filteredAcademicTerms = pageData.academicOverview?.terms?.filter(term => term.show !== false) || [];
  const filteredAcademicStats = pageData.academicOverview?.stats?.filter(stat => stat.show !== false) || [];
  const filteredResources = pageData.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = pageData.cta?.buttons?.filter(button => button.show !== false) || [];

  // Process events to convert date strings to Date objects
  const processEvents = () => {
    return filteredCalendarEvents.map(event => ({
      ...event,
      date: new Date(event.date),
      endDate: event.endDate ? new Date(event.endDate) : null,
      icon: iconMap[event.icon]
    }));
  };

  const calendarEvents = processEvents();

  // Function to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, events: [] });
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear &&
          (activeCategory === 'all' || event.category === activeCategory);
      });
      days.push({ day, date, events: dayEvents });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const goToToday = () => {
    setCurrentMonth(new Date().getMonth());
    setCurrentYear(new Date().getFullYear());
  };

  const calendarDays = generateCalendarDays();
  const currentMonthEvents = calendarEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth &&
      eventDate.getFullYear() === currentYear &&
      (activeCategory === 'all' || event.category === activeCategory);
  });

  // Sort events by date for better display
  const sortedMonthEvents = [...currentMonthEvents].sort((a, b) => a.date - b.date);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {pageData.hero?.show && (
        <section className={`relative ${pageData.hero?.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* <img
            src={pageData.hero?.backgroundImage}
            alt={pageData.hero?.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          /> */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageData.hero?.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {pageData.hero?.subtitle}
              </p>
              {pageData.hero?.ctaButton?.show && (
                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                  {pageData.hero?.ctaButton?.label}
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
        {pageData.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{pageData.benefits?.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {pageData.benefits?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon || Calendar;
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

        {/* Calendar Navigation & Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800">
                {monthNames[currentMonth]} {currentYear}
              </h2>

              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={goToToday}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Today
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filteredEventCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name} ({calendarEvents.filter(e => e.category === category.id || category.id === 'all').length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="bg-white rounded-lg overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center font-semibold text-gray-700 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((dayData, index) => (
                <div
                  key={index}
                  className={`min-h-32 border border-gray-100 p-2 ${
                    dayData.day === new Date().getDate() &&
                    currentMonth === new Date().getMonth() &&
                    currentYear === new Date().getFullYear()
                      ? 'bg-green-50'
                      : ''
                  }`}
                >
                  {dayData.day && (
                    <>
                      <div className="text-right mb-1">
                        <span className={`inline-block w-7 h-7 text-center leading-7 rounded-full ${
                          dayData.day === new Date().getDate() &&
                          currentMonth === new Date().getMonth() &&
                          currentYear === new Date().getFullYear()
                            ? 'bg-green-600 text-white'
                            : 'text-gray-700'
                        }`}>
                          {dayData.day}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {dayData.events.slice(0, 2).map(event => {
                          const IconComponent = event.icon;
                          const category = filteredEventCategories.find(cat => cat.id === event.category);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded ${category?.color || 'bg-gray-200'} text-white truncate`}
                              title={event.title}
                            >
                              <IconComponent className="inline h-3 w-3 mr-1" />
                              {event.title}
                            </div>
                          );
                        })}
                        {dayData.events.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayData.events.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Events - {monthNames[currentMonth]} {currentYear}</h2>
            <p className="text-gray-600">
              {sortedMonthEvents.length} events scheduled this month • Filter by category above
            </p>
          </div>

          {sortedMonthEvents.length > 0 ? (
            <div className="space-y-6">
              {sortedMonthEvents.map(event => {
                const IconComponent = event.icon;
                const category = filteredEventCategories.find(cat => cat.id === event.category);
                const isMultiDay = event.endDate;
                const isToday = event.date.toDateString() === new Date().toDateString();

                return (
                  <div key={event.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-full ${category?.color} text-white`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${category?.color} text-white`}>
                            {category?.name}
                          </span>
                          {isToday && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              Today
                            </span>
                          )}
                          {event.priority === 'high' && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                              Important
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-green-600" />
                            {event.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                            {isMultiDay && (
                              <>
                                <span className="mx-2">→</span>
                                {event.endDate.toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </>
                            )}
                          </div>

                          {event.time && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-blue-600" />
                              {event.time}
                            </div>
                          )}

                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-red-600" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Add to Calendar
                        </button>
                        <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events scheduled for {monthNames[currentMonth]}</h3>
              <p className="text-gray-600 mb-4">There are no events in the "{filteredEventCategories.find(cat => cat.id === activeCategory)?.name}" category for this month.</p>
              <button
                onClick={() => setActiveCategory('all')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View all events
              </button>
            </div>
          )}
        </div>

        {/* Academic Year Overview */}
        {pageData.academicOverview?.show && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{pageData.academicOverview.title}</h2>
              <p className="text-gray-600">
                {pageData.academicOverview.subtitle}
              </p>
            </div>

            <div className="relative mb-12">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2"></div>

              <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
                {filteredAcademicTerms.map((term, index) => (
                  <div key={index} className="relative text-center">
                    <div className={`${term.color} w-6 h-6 rounded-full mx-auto mb-2`}></div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-1">{term.period}</h3>
                      <p className="text-sm text-gray-600 mb-2">{term.date}</p>
                      <p className="text-xs text-gray-500">{term.events} major events</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredAcademicStats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-8 w-8 text-${stat.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources */}
        {pageData.resources?.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{pageData.resources.title}</h2>
            <p className="text-gray-600 mb-6">{pageData.resources.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
                const IconComponent = resource.icon || FileText;
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-start">
                      <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                            <span>{resource.size}</span>
                          </div>
                          <span className="text-xs text-gray-400">{resource.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      {pageData.resources.downloadLabel}
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Subscription CTA */}
        {pageData.subscription?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{pageData.subscription.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {pageData.subscription.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder={pageData.subscription.placeholder}
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                {pageData.subscription.buttonText}
              </button>
            </div>
            <p className="text-sm text-green-200 mt-4">
              {pageData.subscription.note} • {pageData.subscription.subscribers}
            </p>
            <button className="mt-6 text-green-200 hover:text-white font-medium text-sm flex items-center justify-center mx-auto">
              <ExternalLink className="mr-2 h-4 w-4" />
              {pageData.subscription.linkText}
            </button>
          </div>
        )}

        {/* CTA Section */}
        {pageData.cta?.show && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{pageData.cta.title}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {pageData.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.variant === 'primary'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-transparent border border-green-600 text-green-600 hover:bg-green-50'
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

export default SchoolCalendarPage;