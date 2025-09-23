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
  ExternalLink
} from 'lucide-react';

const SchoolCalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [activeCategory, setActiveCategory] = useState('all');

  const eventCategories = [
    { id: 'all', name: 'All Events', color: 'bg-gray-500' },
    { id: 'academic', name: 'Academic', color: 'bg-blue-500' },
    { id: 'sports', name: 'Sports', color: 'bg-green-500' },
    { id: 'cultural', name: 'Cultural', color: 'bg-purple-500' },
    { id: 'holidays', name: 'Holidays', color: 'bg-red-500' },
    { id: 'other', name: 'Other', color: 'bg-yellow-500' }
  ];

  const calendarEvents = [
    {
      id: 1,
      title: "First Day of School",
      date: new Date(2024, 3, 1),
      category: 'academic',
      description: "Beginning of new academic session 2024-2025",
      icon: Book
    },
    {
      id: 2,
      title: "Sports Day",
      date: new Date(2024, 3, 15),
      category: 'sports',
      description: "Annual sports competition between houses",
      icon: Trophy
    },
    {
      id: 3,
      title: "Science Fair",
      date: new Date(2024, 3, 22),
      category: 'academic',
      description: "Student science projects exhibition",
      icon: Microscope
    },
    {
      id: 4,
      title: "Earth Day Celebration",
      date: new Date(2024, 3, 22),
      category: 'cultural',
      description: "Environmental awareness activities",
      icon: Globe
    },
    {
      id: 5,
      title: "Spring Break",
      date: new Date(2024, 4, 1),
      endDate: new Date(2024, 4, 7),
      category: 'holidays',
      description: "Spring vacation - no classes",
      icon: Heart
    },
    {
      id: 6,
      title: "Mid-Term Examinations",
      date: new Date(2024, 4, 15),
      endDate: new Date(2024, 4, 20),
      category: 'academic',
      description: "Mid-term assessment for all classes",
      icon: Book
    },
    {
      id: 7,
      title: "Art Exhibition",
      date: new Date(2024, 4, 25),
      category: 'cultural',
      description: "Display of student artwork",
      icon: Palette
    },
    {
      id: 8,
      title: "Music Concert",
      date: new Date(2024, 5, 5),
      category: 'cultural',
      description: "Annual music performance",
      icon: Music
    },
    {
      id: 9,
      title: "Parent-Teacher Meeting",
      date: new Date(2024, 5, 15),
      category: 'academic',
      description: "Discussion of student progress",
      icon: Users
    },
    {
      id: 10,
      title: "Summer Vacation Begins",
      date: new Date(2024, 5, 25),
      category: 'holidays',
      description: "End of academic year",
      icon: Heart
    },
    {
      id: 11,
      title: "Independence Day Celebration",
      date: new Date(2024, 7, 15),
      category: 'cultural',
      description: "Flag hoisting and cultural programs",
      icon: Star
    },
    {
      id: 12,
      title: "Annual Day",
      date: new Date(2024, 10, 20),
      category: 'cultural',
      description: "Grand cultural event and prize distribution",
      icon: Award
    }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const resources = [
    {
      title: "2024-2025 Academic Calendar",
      description: "Complete printable academic calendar for the entire year",
      format: "PDF",
      size: "2.1 MB",
      icon: FileText
    },
    {
      title: "Exam Schedule",
      description: "Detailed timetable for all examinations",
      format: "PDF",
      size: "1.2 MB",
      icon: FileText
    },
    {
      title: "Holiday List",
      description: "List of all school holidays and breaks",
      format: "PDF",
      size: "0.8 MB",
      icon: FileText
    },
    {
      title: "Event Planning Guide",
      description: "Information for event organizers and participants",
      format: "DOCX",
      size: "1.5 MB",
      icon: FileText
    }
  ];

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Calendar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Calendar 2024-2025</h1>
            <p className="text-xl mb-6 text-gray-200">
              Plan your academic year with important dates, events, and holidays
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto">
              <Download className="mr-2 h-5 w-5" />
              Download Full Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Navigation */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
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
              {eventCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                          const category = eventCategories.find(cat => cat.id === event.category);
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
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600">
              Important events happening in {monthNames[currentMonth]}
            </p>
          </div>

          {currentMonthEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMonthEvents.map(event => {
                const IconComponent = event.icon;
                const category = eventCategories.find(cat => cat.id === event.category);
                return (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`p-4 text-white ${category?.color || 'bg-gray-500'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className="h-6 w-6" />
                        <span className="text-sm font-medium">{category?.name}</span>
                      </div>
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <p className="text-sm opacity-90">{event.description}</p>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      {event.endDate && (
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Clock className="h-4 w-4 mr-2" />
                          Through {event.endDate.toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        School Campus
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events scheduled</h3>
              <p className="text-gray-600">There are no events in this category for {monthNames[currentMonth]}.</p>
            </div>
          )}
        </div>
      </section>

      {/* Academic Year Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Year 2024-2025 Overview</h2>
            <p className="text-lg text-gray-600">
              Key periods and important dates for the entire academic year
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 transform -translate-y-1/2"></div>
            
            <div className="relative grid grid-cols-5 gap-8">
              {[
                { period: "Spring Term", date: "Apr 1 - May 25", color: "bg-blue-500" },
                { period: "Summer Break", date: "May 26 - Jul 14", color: "bg-yellow-500" },
                { period: "Monsoon Term", date: "Jul 15 - Sep 30", color: "bg-green-500" },
                { period: "Autumn Break", date: "Oct 1 - Oct 15", color: "bg-orange-500" },
                { period: "Winter Term", date: "Oct 16 - Mar 31", color: "bg-purple-500" }
              ].map((term, index) => (
                <div key={index} className="relative text-center">
                  <div className={`${term.color} w-6 h-6 rounded-full mx-auto mb-2`}></div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold text-gray-800 mb-1">{term.period}</h3>
                    <p className="text-sm text-gray-600">{term.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">180</h3>
              <p className="text-gray-600">Instructional Days</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">45</h3>
              <p className="text-gray-600">Holidays & Breaks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Major Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Calendar Resources</h2>
            <p className="text-lg text-gray-600">
              Downloadable resources for planning your academic year
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

      {/* Subscription CTA */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Subscribe to our calendar updates and never miss an important school event
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe to Updates
            </button>
          </div>
          <p className="text-sm text-green-200 mt-4">
            You can also sync our calendar with your Google Calendar, Outlook, or iCal
          </p>
          <button className="mt-6 text-green-200 hover:text-white font-medium text-sm flex items-center justify-center mx-auto">
            <ExternalLink className="mr-2 h-4 w-4" />
            View calendar subscription options
          </button>
        </div>
      </section>
    </div>
  );
};

export default SchoolCalendarPage;