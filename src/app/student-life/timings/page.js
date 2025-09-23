"use client";
import React, { useState } from 'react';
import { 
  Clock,
  Calendar,
  Bell,
  Download,
  ChevronRight,
  ExternalLink,
  MapPin,
  Users,
  Book,
  Calculator,
  Microscope,
  Languages,
  Palette,
  Music,
  Heart,
  Shield,
  Code,
  Globe,
  BookOpen,
  Coffee,
  Bus,
  Home
} from 'lucide-react';

const SchoolTimingsPage = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const timingTabs = [
    { id: 'daily', name: 'Daily Schedule', icon: Clock },
    { id: 'calendar', name: 'Academic Calendar', icon: Calendar },
    { id: 'bell', name: 'Bell Schedule', icon: Bell },
    { id: 'transport', name: 'Transport Timings', icon: Bus }
  ];

  const scheduleBenefits = [
    {
      icon: Clock,
      title: "Structured Learning",
      description: "Consistent daily routine optimized for effective learning and development"
    },
    {
      icon: Calendar,
      title: "Academic Planning",
      description: "Well-planned academic calendar with balanced instructional days and breaks"
    },
    {
      icon: Users,
      title: "Community Coordination",
      description: "Synchronized schedules for students, teachers, and parents"
    },
    {
      icon: Bell,
      title: "Time Management",
      description: "Teaches students valuable time management and organizational skills"
    }
  ];

  const dailySchedules = {
    primary: [
      { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and national anthem" },
      { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English" },
      { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics" },
      { period: "Short Break", time: "9:45 AM - 10:00 AM", description: "Snack time" },
      { period: "Period 3", time: "10:00 AM - 10:45 AM", subject: "Environmental Studies" },
      { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Second Language" },
      { period: "Lunch Break", time: "11:30 AM - 12:15 PM", description: "Lunch and recreation" },
      { period: "Period 5", time: "12:15 PM - 1:00 PM", subject: "Art/Music/PE" },
      { period: "Period 6", time: "1:00 PM - 1:45 PM", subject: "Value Education" },
      { period: "Dispersal", time: "1:45 PM - 2:00 PM", description: "Preparation for home" }
    ],
    middle: [
      { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and thought for the day" },
      { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English" },
      { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics" },
      { period: "Period 3", time: "9:45 AM - 10:30 AM", subject: "Science" },
      { period: "Short Break", time: "10:30 AM - 10:45 AM", description: "Snack time" },
      { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Social Studies" },
      { period: "Period 5", time: "11:30 AM - 12:15 PM", subject: "Second Language" },
      { lunch: "Lunch Break", time: "12:15 PM - 1:00 PM", description: "Lunch and recreation" },
      { period: "Period 6", time: "1:00 PM - 1:45 PM", subject: "Computer Science" },
      { period: "Period 7", time: "1:45 PM - 2:30 PM", subject: "Art/Music/PE" },
      { period: "Period 8", time: "2:30 PM - 3:15 PM", subject: "Value Education/Life Skills" },
      { period: "Dispersal", time: "3:15 PM - 3:30 PM", description: "Preparation for home" }
    ],
    high: [
      { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and motivational talk" },
      { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English" },
      { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics" },
      { period: "Period 3", time: "9:45 AM - 10:30 AM", subject: "Science" },
      { period: "Short Break", time: "10:30 AM - 10:45 AM", description: "Snack time" },
      { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Social Studies" },
      { period: "Period 5", time: "11:30 AM - 12:15 PM", subject: "Second Language" },
      { period: "Period 6", time: "12:15 PM - 1:00 PM", subject: "Elective 1" },
      { lunch: "Lunch Break", time: "1:00 PM - 1:45 PM", description: "Lunch and recreation" },
      { period: "Period 7", time: "1:45 PM - 2:30 PM", subject: "Elective 2" },
      { period: "Period 8", time: "2:30 PM - 3:15 PM", subject: "Physical Education" },
      { period: "Period 9", time: "3:15 PM - 4:00 PM", subject: "Remedial/Enrichment" },
      { period: "Dispersal", time: "4:00 PM - 4:15 PM", description: "Preparation for home" }
    ]
  };

  const academicCalendar = [
    {
      month: "April 2024",
      events: [
        { date: "1", description: "New Academic Year Begins", highlight: true },
        { date: "5-12", description: "Orientation Week" },
        { date: "14", description: "Parent-Teacher Meeting" },
        { date: "20", description: "Earth Day Celebration" }
      ]
    },
    {
      month: "May 2024",
      events: [
        { date: "1", description: "Labour Day Holiday" },
        { date: "10", description: "Summer Project Assignments" },
        { date: "15-25", description: "Annual Examinations" },
        { date: "28", description: "Summer Vacation Begins" }
      ]
    },
    {
      month: "June-July 2024",
      events: [
        { date: "1 Jun - 15 Jul", description: "Summer Vacation", highlight: true },
        { date: "16 Jul", description: "School Reopens" },
        { date: "20 Jul", description: "Sports Day Practice" }
      ]
    },
    {
      month: "August 2024",
      events: [
        { date: "15", description: "Independence Day Celebration", highlight: true },
        { date: "20-25", description: "Mid-Term Assessments" },
        { date: "30", description: "Results Declaration" }
      ]
    },
    {
      month: "September 2024",
      events: [
        { date: "5", description: "Teacher's Day Celebration" },
        { date: "15-20", description: "Science Exhibition" },
        { date: "25", description: "Parent-Teacher Meeting" }
      ]
    },
    {
      month: "October 2024",
      events: [
        { date: "2", description: "Gandhi Jayanti Holiday" },
        { date: "8-12", description: "Autumn Break" },
        { date: "20", description: "Cultural Fest Preparation" }
      ]
    },
    {
      month: "November 2024",
      events: [
        { date: "1-3", description: "Annual Cultural Festival", highlight: true },
        { date: "14", description: "Children's Day Celebration" },
        { date: "20-25", description: "Unit Tests" }
      ]
    },
    {
      month: "December 2024",
      events: [
        { date: "25", description: "Christmas Celebration" },
        { date: "28-31", description: "Winter Break Begins" }
      ]
    },
    {
      month: "January 2025",
      events: [
        { date: "1", description: "New Year Holiday" },
        { date: "2", description: "School Reopens" },
        { date: "15", description: "Makara Sankranti Celebration" },
        { date: "26", description: "Republic Day Celebration", highlight: true }
      ]
    },
    {
      month: "February 2025",
      events: [
        { date: "10-15", description: "Pre-Board Exams (X & XII)" },
        { date: "20", description: "Annual Sports Day", highlight: true }
      ]
    },
    {
      month: "March 2025",
      events: [
        { date: "1-15", description: "Final Examinations" },
        { date: "20", description: "Result Declaration" },
        { date: "25", description: "Academic Year Ends", highlight: true }
      ]
    }
  ];

  const bellSchedule = [
    { period: "Morning Bell", time: "7:55 AM", description: "First bell - students proceed to assembly" },
    { period: "Period 1", time: "8:15 AM", description: "Class begins" },
    { period: "Period 2", time: "9:00 AM", description: "Change of periods" },
    { period: "Short Break", time: "9:45 AM", description: "Break bell" },
    { period: "Period 3", time: "10:00 AM", description: "Class resumes" },
    { period: "Period 4", time: "10:45 AM", description: "Change of periods" },
    { period: "Period 5", time: "11:30 AM", description: "Change of periods" },
    { period: "Lunch", time: "12:15 PM", description: "Lunch break begins" },
    { period: "Period 6", time: "1:00 PM", description: "Classes resume" },
    { period: "Period 7", time: "1:45 PM", description: "Change of periods" },
    { period: "Period 8", time: "2:30 PM", description: "Change of periods" },
    { period: "Period 9", time: "3:15 PM", description: "Change of periods (High School only)" },
    { period: "Dispersal", time: "3:30 PM/4:15 PM", description: "School ends (Middle/High School)" }
  ];

  const transportSchedule = [
    { route: "Route 1 - North Zone", morning: "7:00 AM", afternoon: "3:45 PM", stops: "5 stops" },
    { route: "Route 2 - South Zone", morning: "7:15 AM", afternoon: "3:45 PM", stops: "6 stops" },
    { route: "Route 3 - East Zone", morning: "7:10 AM", afternoon: "3:50 PM", stops: "4 stops" },
    { route: "Route 4 - West Zone", morning: "7:20 AM", afternoon: "4:00 PM", stops: "7 stops" },
    { route: "Route 5 - Central Zone", morning: "7:05 AM", afternoon: "3:40 PM", stops: "5 stops" }
  ];

  const resources = [
    {
      title: "2024-2025 Academic Calendar",
      description: "Complete academic calendar with all holidays and important dates",
      format: "PDF",
      size: "1.8 MB",
      icon: Calendar
    },
    {
      title: "Daily Schedule Printable",
      description: "Printable version of daily schedule for all grades",
      format: "PDF",
      size: "0.9 MB",
      icon: Clock
    },
    {
      title: "Transportation Form",
      description: "Application for school bus transportation",
      format: "DOCX",
      size: "0.4 MB",
      icon: Bus
    },
    {
      title: "Bell Schedule",
      description: "Detailed bell schedule for the entire school",
      format: "PDF",
      size: "0.7 MB",
      icon: Bell
    }
  ];

  const subjectIcons = {
    "English": BookOpen,
    "Mathematics": Calculator,
    "Science": Microscope,
    "Social Studies": Globe,
    "Second Language": Languages,
    "Computer Science": Code,
    "Art/Music/PE": Palette,
    "Value Education": Heart,
    "Physical Education": Heart,
    "Elective 1": Book,
    "Elective 2": Book,
    "Remedial/Enrichment": Users
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Timings"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Timings & Schedules</h1>
            <p className="text-xl mb-6 text-gray-200">
              Plan your academic year with our comprehensive scheduling information
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download Academic Calendar
              </button>
              <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                View Bell Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Importance of School Schedules</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Well-structured timings create an optimal learning environment and help students develop time management skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleBenefits.map((benefit, index) => {
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
            {timingTabs.map((tab) => {
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
          {/* Daily Schedule Tab */}
          {activeTab === 'daily' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Daily Schedule</h3>
              <p className="text-gray-600 mb-8">Regular school day timings for different grade levels</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">P</span>
                    Primary School (I-V)
                  </h4>
                  <div className="space-y-4">
                    {dailySchedules.primary.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-green-700">{item.time}</span>
                          {item.subject && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {item.subject}
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-800 mt-1">{item.period}</h5>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">M</span>
                    Middle School (VI-VIII)
                  </h4>
                  <div className="space-y-4">
                    {dailySchedules.middle.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-green-700">{item.time}</span>
                          {item.subject && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {item.subject}
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-800 mt-1">{item.period}</h5>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">H</span>
                    High School (IX-XII)
                  </h4>
                  <div className="space-y-4">
                    {dailySchedules.high.map((item, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-green-700">{item.time}</span>
                          {item.subject && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              {item.subject}
                            </span>
                          )}
                        </div>
                        <h5 className="font-medium text-gray-800 mt-1">{item.period}</h5>
                        {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Important Notes</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Students should arrive 15 minutes before the first bell</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Wednesday schedule includes extended assembly until 8:30 AM</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Early dismissal at 1:00 PM on last working day before holidays</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Academic Calendar Tab */}
          {activeTab === 'calendar' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Academic Calendar 2024-2025</h3>
              <p className="text-gray-600 mb-8">Important dates, holidays, and events for the current academic year</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {academicCalendar.map((month, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">{month.month}</h4>
                    <div className="space-y-3">
                      {month.events.map((event, eventIndex) => (
                        <div key={eventIndex} className={`flex items-start ${event.highlight ? 'bg-green-100 p-2 rounded-lg' : ''}`}>
                          <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                            {event.date}
                          </span>
                          <span className="text-sm text-gray-700">{event.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Calendar Notes</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>School will remain closed on all national and state government holidays</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Unexpected closures due to emergencies will be communicated via SMS and parent portal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Make-up classes may be scheduled on some Saturdays if needed</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Bell Schedule Tab */}
          {activeTab === 'bell' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Bell Schedule</h3>
              <p className="text-gray-600 mb-8">Daily bell timings for period changes and breaks</p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period/Activity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bellSchedule.map((bell, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bell.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{bell.time}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{bell.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Bell Schedule Notes</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Two short bells ring 2 minutes before period end to signal teachers</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Emergency drills will use a continuous bell for 30 seconds</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Special schedules are followed during examinations and events</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Transport Timings Tab */}
          {activeTab === 'transport' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Transportation Schedule</h3>
              <p className="text-gray-600 mb-8">School bus timings for different routes and zones</p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Morning Pickup</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Afternoon Dropoff</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stops</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transportSchedule.map((route, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.route}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.morning}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.afternoon}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.stops}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Transportation Policies</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start">
                      <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      </div>
                      <span>Students must be at stops 5 minutes before scheduled pickup time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      </div>
                      <span>Late students will not be waited for beyond 2 minutes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      </div>
                      <span>Route changes require 48 hours advance notice</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Safety Information</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>All buses equipped with GPS tracking and speed governors</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Female attendants on all buses with primary students</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Emergency contact numbers displayed inside each bus</span>
                    </li>
                  </ul>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Schedule Resources</h2>
            <p className="text-lg text-gray-600">
              Download important timing-related documents and forms
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
          <h2 className="text-3xl font-bold mb-4">Need Schedule Assistance?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our administration office for any questions about school timings or schedule changes
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Email Administration
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Request Schedule Change
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolTimingsPage;