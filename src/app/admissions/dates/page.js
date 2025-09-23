"use client";
import React, { useState } from 'react';
import { 
  Calendar,
  Clock,
  Download,
  Bell,
  Filter,
  ChevronDown,
  ChevronRight,
  MapPin,
  Users,
  Trophy,
  BookOpen,
  GraduationCap,
  Music,
  Palette,
  Microscope,
  Star,
  Award,
  Heart,
  TreePine,
  Globe,
  Bookmark
} from 'lucide-react';

const ImportantDatesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeMonth, setActiveMonth] = useState('april');
  const [openEvents, setOpenEvents] = useState({});

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'cultural', name: 'Cultural', icon: Music },
    { id: 'holidays', name: 'Holidays', icon: Heart },
    { id: 'examinations', name: 'Examinations', icon: GraduationCap }
  ];

  const months = [
    { id: 'april', name: 'April 2024', events: 6 },
    { id: 'may', name: 'May 2024', events: 5 },
    { id: 'june', name: 'June 2024', events: 4 },
    { id: 'july', name: 'July 2024', events: 7 },
    { id: 'august', name: 'August 2024', events: 8 },
    { id: 'september', name: 'September 2024', events: 6 },
    { id: 'october', name: 'October 2024', events: 5 },
    { id: 'november', name: 'November 2024', events: 7 },
    { id: 'december', name: 'December 2024', events: 4 },
    { id: 'january', name: 'January 2025', events: 6 },
    { id: 'february', name: 'February 2025', events: 5 },
    { id: 'march', name: 'March 2025', events: 8 }
  ];

  const events = {
    april: [
      {
        id: 1,
        date: '2024-04-01',
        title: 'New Academic Year Begins',
        category: 'academic',
        description: 'Commencement of academic session 2024-25 for all classes',
        time: '8:00 AM',
        venue: 'School Campus',
        importance: 'high'
      },
      {
        id: 2,
        date: '2024-04-05',
        title: 'Orientation Program for New Parents',
        category: 'academic',
        description: 'Welcome session for parents of new students',
        time: '10:00 AM',
        venue: 'School Auditorium',
        importance: 'medium'
      },
      {
        id: 3,
        date: '2024-04-14',
        title: 'Ambedkar Jayanti',
        category: 'holidays',
        description: 'School holiday - Dr. B.R. Ambedkar Birthday',
        time: 'All Day',
        venue: '-',
        importance: 'holiday'
      },
      {
        id: 4,
        date: '2024-04-20',
        title: 'Earth Day Celebration',
        category: 'cultural',
        description: 'Environmental awareness activities and tree plantation',
        time: '9:00 AM - 12:00 PM',
        venue: 'School Grounds',
        importance: 'medium'
      },
      {
        id: 5,
        date: '2024-04-25',
        title: 'Inter-House Quiz Competition',
        category: 'academic',
        description: 'Annual inter-house academic quiz competition',
        time: '2:00 PM',
        venue: 'Science Lab',
        importance: 'medium'
      },
      {
        id: 6,
        date: '2024-04-30',
        title: 'PTM - Class I to V',
        category: 'academic',
        description: 'Parent-Teacher Meeting for Primary Section',
        time: '9:00 AM - 12:00 PM',
        venue: 'Respective Classrooms',
        importance: 'high'
      }
    ],
    may: [
      {
        id: 1,
        date: '2024-05-01',
        title: 'Labour Day Holiday',
        category: 'holidays',
        description: 'School holiday - International Workers Day',
        time: 'All Day',
        venue: '-',
        importance: 'holiday'
      },
      {
        id: 2,
        date: '2024-05-10',
        title: 'Summer Sports Trials',
        category: 'sports',
        description: 'Selection trials for various sports teams',
        time: '3:00 PM - 5:00 PM',
        venue: 'Sports Complex',
        importance: 'medium'
      },
      {
        id: 3,
        date: '2024-05-15',
        title: 'Annual Science Exhibition',
        category: 'academic',
        description: 'Student science projects and demonstrations',
        time: '9:00 AM - 3:00 PM',
        venue: 'Science Block',
        importance: 'high'
      },
      {
        id: 4,
        date: '2024-05-25',
        title: 'Summer Break Begins',
        category: 'academic',
        description: 'School closes for summer vacation',
        time: 'After School',
        venue: '-',
        importance: 'high'
      },
      {
        id: 5,
        date: '2024-05-30',
        title: 'Teachers Workshop',
        category: 'academic',
        description: 'Professional development session for teaching staff',
        time: '9:00 AM - 4:00 PM',
        venue: 'Conference Hall',
        importance: 'medium'
      }
    ],
    june: [
      {
        id: 1,
        date: '2024-06-05',
        title: 'World Environment Day',
        category: 'cultural',
        description: 'Special assembly and environmental activities',
        time: '8:00 AM - 10:00 AM',
        venue: 'School Amphitheater',
        importance: 'medium'
      },
      {
        id: 2,
        date: '2024-06-15',
        title: 'Summer Camp Begins',
        category: 'cultural',
        description: 'Summer activities and workshops for interested students',
        time: '9:00 AM - 12:00 PM',
        venue: 'Various Locations',
        importance: 'medium'
      },
      {
        id: 3,
        date: '2024-06-21',
        title: 'International Yoga Day',
        category: 'sports',
        description: 'Mass yoga session for students and staff',
        time: '7:00 AM - 8:00 AM',
        venue: 'School Grounds',
        importance: 'medium'
      },
      {
        id: 4,
        date: '2024-06-30',
        title: 'Summer Camp Ends',
        category: 'cultural',
        description: 'Conclusion of summer activities program',
        time: '12:00 PM',
        venue: '-',
        importance: 'medium'
      }
    ]
  };

  const academicCalendar = {
    terms: [
      {
        term: 'First Term',
        period: 'April 1 - July 31',
        events: '40 working days',
        holidays: 'Summer Break (3 weeks)'
      },
      {
        term: 'Second Term',
        period: 'August 1 - November 30',
        events: '45 working days',
        holidays: 'Autumn Break (1 week)'
      },
      {
        term: 'Third Term',
        period: 'December 1 - March 31',
        events: '50 working days',
        holidays: 'Winter Break (2 weeks)'
      }
    ],
    holidays: [
      { date: '2024-04-14', occasion: 'Ambedkar Jayanti' },
      { date: '2024-05-01', occasion: 'Labour Day' },
      { date: '2024-06-15', occasion: 'Summer Break Begins' },
      { date: '2024-07-01', occasion: 'Summer Break Ends' },
      { date: '2024-08-15', occasion: 'Independence Day' },
      { date: '2024-10-02', occasion: 'Gandhi Jayanti' },
      { date: '2024-10-20', occasion: 'Autumn Break Begins' },
      { date: '2024-10-27', occasion: 'Autumn Break Ends' },
      { date: '2024-12-25', occasion: 'Christmas' },
      { date: '2025-01-01', occasion: 'New Year' },
      { date: '2025-01-15', occasion: 'Winter Break Begins' },
      { date: '2025-01-26', occasion: 'Republic Day' },
      { date: '2025-02-01', occasion: 'Winter Break Ends' },
      { date: '2025-03-15', occasion: 'Annual Exams Begin' }
    ]
  };

  const toggleEvent = (monthId, eventId) => {
    setOpenEvents(prev => ({
      ...prev,
      [`${monthId}-${eventId}`]: !prev[`${monthId}-${eventId}`]
    }));
  };

  const getEventIcon = (category) => {
    switch (category) {
      case 'academic': return BookOpen;
      case 'sports': return Trophy;
      case 'cultural': return Music;
      case 'holidays': return Heart;
      case 'examinations': return GraduationCap;
      default: return Calendar;
    }
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'holiday': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Important Dates & Calendar</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Academic calendar, events, and important dates for the 2024-25 academic year
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
            <Download className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Download Calendar</h3>
              <p className="text-sm text-gray-600">PDF version for printing</p>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
            <Bell className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Set Reminders</h3>
              <p className="text-sm text-gray-600">Get notifications for events</p>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
            <Calendar className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Sync Calendar</h3>
              <p className="text-sm text-gray-600">Import to your digital calendar</p>
            </div>
          </button>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Events</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Academic Calendar Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Academic Calendar 2024-25</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {academicCalendar.terms.map((term, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{term.term}</h3>
                <p className="text-green-600 font-medium mb-2">{term.period}</p>
                <p className="text-sm text-gray-600 mb-1">{term.events}</p>
                <p className="text-sm text-gray-500">Holidays: {term.holidays}</p>
              </div>
            ))}
          </div>

          {/* Major Holidays */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Major Holidays</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academicCalendar.holidays.map((holiday, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">
                      {new Date(holiday.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </span>
                    <span className="text-gray-600 ml-2">- {holiday.occasion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Events */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Events Schedule</h2>
          
          {/* Month Navigation */}
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
            {months.map(month => (
              <button
                key={month.id}
                onClick={() => setActiveMonth(month.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeMonth === month.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                }`}
              >
                {month.name}
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {month.events}
                </span>
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {events[activeMonth]?.map(event => {
              const EventIcon = getEventIcon(event.category);
              const isOpen = openEvents[`${activeMonth}-${event.id}`];
              
              return (
                <div key={event.id} className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleEvent(activeMonth, event.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-lg p-3">
                        <EventIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-IN', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                          {event.time !== 'All Day' && ` • ${event.time}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(event.importance)}`}>
                        {event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}
                      </span>
                      {isOpen ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">{event.venue}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">
                            {event.category === 'holidays' ? 'No Attendance' : 'All Students'}
                          </span>
                        </div>
                      </div>
                      {event.importance !== 'holiday' && (
                        <button className="mt-3 flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                          <Bell className="h-4 w-4 mr-1" />
                          Set Reminder
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Highlights */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                date: '2024-04-01',
                title: 'New Session Begins',
                icon: BookOpen,
                color: 'bg-blue-100 text-blue-800'
              },
              {
                date: '2024-05-15',
                title: 'Science Exhibition',
                icon: Microscope,
                color: 'bg-purple-100 text-purple-800'
              },
              {
                date: '2024-08-15',
                title: 'Independence Day',
                icon: Trophy,
                color: 'bg-orange-100 text-orange-800'
              },
              {
                date: '2024-12-25',
                title: 'Christmas Celebration',
                icon: Star,
                color: 'bg-red-100 text-red-800'
              }
            ].map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${highlight.color} mb-3`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(highlight.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                  <div className="mt-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {Math.ceil((new Date(highlight.date) - new Date()) / (1000 * 60 * 60 * 24))} days to go
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Get notified about important dates, events, and schedule changes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Subscribe to Updates</h3>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Download Resources</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span>Annual Calendar 2024-25 (PDF)</span>
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span>Examination Schedule</span>
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span>Holiday List</span>
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantDatesPage;