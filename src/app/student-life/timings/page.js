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

const SchoolTimingsPage = ({ schoolTimingsData }) => {
  const [activeTab, setActiveTab] = useState('daily');

  // JSON data to drive all content (will later come from a database)
  const jsonData = {
    hero: {
      show: true,
      title: "School Timings & Schedules",
      subtitle: "Discover our structured daily routines, academic calendar, and transportation schedules designed for optimal learning",
      height: "h-96",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "Download School Schedule",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Benefits of Our Structured Schedule",
      description: "Our carefully designed timings ensure a balanced and productive school day",
      items: [
        {
          icon: Clock,
          title: "Structured Learning",
          description: "Consistent daily routine optimized for effective learning and development",
          show: true
        },
        {
          icon: Calendar,
          title: "Academic Planning",
          description: "Well-planned academic calendar with balanced instructional days and breaks",
          show: true
        },
        {
          icon: Users,
          title: "Community Coordination",
          description: "Synchronized schedules for students, teachers, and parents",
          show: true
        },
        {
          icon: Bell,
          title: "Time Management",
          description: "Teaches students valuable time management and organizational skills",
          show: true
        }
      ]
    },
    tabs: {
      show: true,
      title: "Timing Information",
      description: "Explore our school schedules and timings",
      items: [
        { id: 'daily', name: 'Daily Schedule', icon: Clock, description: 'Class timings', show: true },
        { id: 'calendar', name: 'Academic Calendar', icon: Calendar, description: 'Yearly events', show: true },
        { id: 'bell', name: 'Bell Schedule', icon: Bell, description: 'Period changes', show: true },
        { id: 'transport', name: 'Transport Timings', icon: Bus, description: 'Bus schedules', show: true }
      ]
    },
    dailySchedules: {
      show: true,
      labels: {
        period: "Period",
        time: "Time",
        description: "Description",
        subject: "Subject"
      },
      items: {
        primary: {
          title: "Primary School (Grades 1-5)",
          schedule: [
            { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and national anthem", show: true },
            { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English", show: true },
            { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics", show: true },
            { period: "Short Break", time: "9:45 AM - 10:00 AM", description: "Snack time", show: true },
            { period: "Period 3", time: "10:00 AM - 10:45 AM", subject: "Environmental Studies", show: true },
            { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Second Language", show: true },
            { period: "Lunch Break", time: "11:30 AM - 12:15 PM", description: "Lunch and recreation", show: true },
            { period: "Period 5", time: "12:15 PM - 1:00 PM", subject: "Art/Music/PE", show: true },
            { period: "Period 6", time: "1:00 PM - 1:45 PM", subject: "Value Education", show: true },
            { period: "Dispersal", time: "1:45 PM - 2:00 PM", description: "Preparation for home", show: true }
          ],
          show: true
        },
        middle: {
          title: "Middle School (Grades 6-8)",
          schedule: [
            { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and thought for the day", show: true },
            { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English", show: true },
            { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics", show: true },
            { period: "Period 3", time: "9:45 AM - 10:30 AM", subject: "Science", show: true },
            { period: "Short Break", time: "10:30 AM - 10:45 AM", description: "Snack time", show: true },
            { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Social Studies", show: true },
            { period: "Period 5", time: "11:30 AM - 12:15 PM", subject: "Second Language", show: true },
            { period: "Lunch Break", time: "12:15 PM - 1:00 PM", description: "Lunch and recreation", show: true },
            { period: "Period 6", time: "1:00 PM - 1:45 PM", subject: "Computer Science", show: true },
            { period: "Period 7", time: "1:45 PM - 2:30 PM", subject: "Art/Music/PE", show: true },
            { period: "Period 8", time: "2:30 PM - 3:15 PM", subject: "Value Education/Life Skills", show: true },
            { period: "Dispersal", time: "3:15 PM - 3:30 PM", description: "Preparation for home", show: true }
          ],
          show: true
        },
        high: {
          title: "High School (Grades 9-12)",
          schedule: [
            { period: "Morning Assembly", time: "8:00 AM - 8:15 AM", description: "Prayers, announcements, and motivational talk", show: true },
            { period: "Period 1", time: "8:15 AM - 9:00 AM", subject: "English", show: true },
            { period: "Period 2", time: "9:00 AM - 9:45 AM", subject: "Mathematics", show: true },
            { period: "Period 3", time: "9:45 AM - 10:30 AM", subject: "Science", show: true },
            { period: "Short Break", time: "10:30 AM - 10:45 AM", description: "Snack time", show: true },
            { period: "Period 4", time: "10:45 AM - 11:30 AM", subject: "Social Studies", show: true },
            { period: "Period 5", time: "11:30 AM - 12:15 PM", subject: "Second Language", show: true },
            { period: "Period 6", time: "12:15 PM - 1:00 PM", subject: "Elective 1", show: true },
            { period: "Lunch Break", time: "1:00 PM - 1:45 PM", description: "Lunch and recreation", show: true },
            { period: "Period 7", time: "1:45 PM - 2:30 PM", subject: "Elective 2", show: true },
            { period: "Period 8", time: "2:30 PM - 3:15 PM", subject: "Physical Education", show: true },
            { period: "Period 9", time: "3:15 PM - 4:00 PM", subject: "Remedial/Enrichment", show: true },
            { period: "Dispersal", time: "4:00 PM - 4:15 PM", description: "Preparation for home", show: true }
          ],
          show: true
        }
      }
    },
    academicCalendar: {
      show: true,
      title: "Academic Calendar 2024-25",
      description: "Key dates and events for the academic year",
      items: [
        {
          month: "April 2024",
          events: [
            { date: "1", description: "New Academic Year Begins", highlight: true, show: true },
            { date: "5-12", description: "Orientation Week", show: true },
            { date: "14", description: "Parent-Teacher Meeting", show: true },
            { date: "20", description: "Earth Day Celebration", show: true }
          ],
          show: true
        },
        {
          month: "May 2024",
          events: [
            { date: "1", description: "Labour Day Holiday", show: true },
            { date: "10", description: "Summer Project Assignments", show: true },
            { date: "15-25", description: "Annual Examinations", show: true },
            { date: "28", description: "Summer Vacation Begins", show: true }
          ],
          show: true
        },
        {
          month: "June-July 2024",
          events: [
            { date: "1 Jun - 15 Jul", description: "Summer Vacation", highlight: true, show: true },
            { date: "16 Jul", description: "School Reopens", show: true },
            { date: "20 Jul", description: "Sports Day Practice", show: true }
          ],
          show: true
        },
        {
          month: "August 2024",
          events: [
            { date: "15", description: "Independence Day Celebration", highlight: true, show: true },
            { date: "20-25", description: "Mid-Term Assessments", show: true },
            { date: "30", description: "Results Declaration", show: true }
          ],
          show: true
        },
        {
          month: "September 2024",
          events: [
            { date: "5", description: "Teacher's Day Celebration", show: true },
            { date: "15-20", description: "Science Exhibition", show: true },
            { date: "25", description: "Parent-Teacher Meeting", show: true }
          ],
          show: true
        },
        {
          month: "October 2024",
          events: [
            { date: "2", description: "Gandhi Jayanti Holiday", show: true },
            { date: "8-12", description: "Autumn Break", show: true },
            { date: "20", description: "Cultural Fest Preparation", show: true }
          ],
          show: true
        },
        {
          month: "November 2024",
          events: [
            { date: "1-3", description: "Annual Cultural Festival", highlight: true, show: true },
            { date: "14", description: "Children's Day Celebration", show: true },
            { date: "20-25", description: "Unit Tests", show: true }
          ],
          show: true
        },
        {
          month: "December 2024",
          events: [
            { date: "25", description: "Christmas Celebration", show: true },
            { date: "28-31", description: "Winter Break Begins", show: true }
          ],
          show: true
        },
        {
          month: "January 2025",
          events: [
            { date: "1", description: "New Year Holiday", show: true },
            { date: "2", description: "School Reopens", show: true },
            { date: "15", description: "Makara Sankranti Celebration", show: true },
            { date: "26", description: "Republic Day Celebration", highlight: true, show: true }
          ],
          show: true
        },
        {
          month: "February 2025",
          events: [
            { date: "10-15", description: "Pre-Board Exams (X & XII)", show: true },
            { date: "20", description: "Annual Sports Day", highlight: true, show: true }
          ],
          show: true
        },
        {
          month: "March 2025",
          events: [
            { date: "1-15", description: "Final Examinations", show: true },
            { date: "20", description: "Result Declaration", show: true },
            { date: "25", description: "Academic Year Ends", highlight: true, show: true }
          ],
          show: true
        }
      ]
    },
    bellSchedule: {
      show: true,
      title: "Bell Schedule",
      description: "Detailed timing for period changes and breaks",
      labels: {
        period: "Period",
        time: "Time",
        description: "Description"
      },
      items: [
        { period: "Morning Bell", time: "7:55 AM", description: "First bell - students proceed to assembly", show: true },
        { period: "Period 1", time: "8:15 AM", description: "Class begins", show: true },
        { period: "Period 2", time: "9:00 AM", description: "Change of periods", show: true },
        { period: "Short Break", time: "9:45 AM", description: "Break bell", show: true },
        { period: "Period 3", time: "10:00 AM", description: "Classes resume", show: true },
        { period: "Period 4", time: "10:45 AM", description: "Change of periods", show: true },
        { period: "Period 5", time: "11:30 AM", description: "Change of periods", show: true },
        { period: "Lunch Break", time: "12:15 PM", description: "Lunch bell", show: true },
        { period: "Period 6", time: "1:00 PM", description: "Classes resume after lunch", show: true },
        { period: "Period 7", time: "1:45 PM", description: "Change of periods", show: true },
        { period: "Period 8", time: "2:30 PM", description: "Change of periods", show: true },
        { period: "Dispersal", time: "3:15 PM", description: "Final bell - end of school day", show: true }
      ]
    },
    transport: {
      show: true,
      title: "Transportation Schedule",
      description: "School bus timings for different routes and zones",
      labels: {
        route: "Route",
        morningPickup: "Morning Pickup",
        afternoonDropoff: "Afternoon Dropoff",
        stops: "Stops"
      },
      items: [
        { 
          route: "Route 1 - North Zone", 
          morningPickup: "7:00 AM - 7:45 AM", 
          afternoonDropoff: "3:30 PM - 4:15 PM", 
          stops: "Sector 12, Main Market, Park Road",
          show: true 
        },
        { 
          route: "Route 2 - East Zone", 
          morningPickup: "6:45 AM - 7:30 AM", 
          afternoonDropoff: "3:45 PM - 4:30 PM", 
          stops: "River Side, Temple Area, Bus Stand",
          show: true 
        },
        { 
          route: "Route 3 - South Zone", 
          morningPickup: "7:15 AM - 8:00 AM", 
          afternoonDropoff: "3:15 PM - 4:00 PM", 
          stops: "Industrial Area, Hospital Road, Railway Station",
          show: true 
        },
        { 
          route: "Route 4 - West Zone", 
          morningPickup: "6:30 AM - 7:15 AM", 
          afternoonDropoff: "4:00 PM - 4:45 PM", 
          stops: "Farm Area, Village Road, Highway Point",
          show: true 
        }
      ],
      policiesTitle: "Transportation Policies",
      policies: [
        { text: "Students must be at stops 5 minutes before scheduled pickup time", show: true },
        { text: "Late students will not be waited for beyond 2 minutes", show: true },
        { text: "Route changes require 48 hours advance notice", show: true }
      ],
      safetyTitle: "Safety Information",
      safety: [
        { text: "All buses equipped with GPS tracking and speed governors", show: true },
        { text: "Female attendants on all buses with primary students", show: true },
        { text: "Emergency contact numbers displayed inside each bus", show: true }
      ]
    },
    resources: {
      show: true,
      title: "Schedule Resources",
      description: "Download important timing-related documents and forms",
      downloadLabel: "Download",
      items: [
        {
          title: "Complete School Calendar",
          description: "Full academic year schedule with holidays",
          format: "PDF",
          size: "1.2 MB",
          icon: Calendar,
          show: true
        },
        {
          title: "Daily Schedule Handbook",
          description: "Detailed daily timings for all grades",
          format: "PDF",
          size: "0.8 MB",
          icon: Book,
          show: true
        },
        {
          title: "Transport Route Map",
          description: "Detailed map of all bus routes",
          format: "PDF",
          size: "2.1 MB",
          icon: MapPin,
          show: true
        },
        {
          title: "Bell Schedule Chart",
          description: "Visual representation of daily bell timings",
          format: "PDF",
          size: "0.5 MB",
          icon: Bell,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Need Schedule Assistance?",
      description: "Contact our administration office for any questions about school timings or schedule changes",
      buttons: [
        { 
          label: "Email Administration", 
          variant: "primary",
          show: true 
        },
        { 
          label: "Request Schedule Change", 
          variant: "secondary",
          show: true 
        }
      ]
    },
    general: {
      learnMore: "Learn More",
      viewDetails: "View Details"
    },
    // Section visibility controls
    showHero: true,
    showBenefits: true,
    showTabs: true,
    showDailySchedules: true,
    showAcademicCalendar: true,
    showBellSchedule: true,
    showTransport: true,
    showResources: true,
    showCta: true
  };

  // Use schoolTimingsData if provided (e.g., from a database), otherwise fall back to jsonData
  const data = schoolTimingsData || jsonData;

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredDailySchedules = data.dailySchedules?.items ? 
    Object.fromEntries(
      Object.entries(data.dailySchedules.items).filter(([key, item]) => item.show !== false)
    ) : {};
  const filteredAcademicCalendar = data.academicCalendar?.items?.filter(month => month.show !== false) || [];
  const filteredBellSchedule = data.bellSchedule?.items?.filter(item => item.show !== false) || [];
  const filteredTransport = data.transport?.items?.filter(route => route.show !== false) || [];
  const filteredTransportPolicies = data.transport?.policies?.filter(policy => policy.show !== false) || [];
  const filteredTransportSafety = data.transport?.safety?.filter(safety => safety.show !== false) || [];
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
                const IconComponent = benefit.icon || Clock; // Fallback icon
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

        {/* Tabs Navigation */}
        {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.tabs?.title}</h2>
              <p className="text-gray-600">
                {data.tabs?.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTabs.map(tab => {
                const IconComponent = tab.icon || Clock; // Fallback icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{tab.name}</span>
                    <span className={`text-xs mt-1 ${activeTab === tab.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content for Selected Tab */}
            <div className="mt-8">
              {/* Daily Schedule Tab */}
              {activeTab === 'daily' && data.showDailySchedules && data.dailySchedules?.show && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Daily School Schedules</h3>
                  <div className="space-y-8">
                    {Object.entries(filteredDailySchedules).map(([key, schedule]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-gray-800 mb-4">{schedule.title}</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.period}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.time}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.dailySchedules?.labels?.description || data.dailySchedules?.labels?.subject}</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {schedule.schedule.filter(item => item.show !== false).map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.period}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description || item.subject}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Calendar Tab */}
              {activeTab === 'calendar' && data.showAcademicCalendar && data.academicCalendar?.show && filteredAcademicCalendar.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.academicCalendar?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.academicCalendar?.description}</p>
                  <div className="space-y-6">
                    {filteredAcademicCalendar.map((month, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-800 mb-4">{month.month}</h4>
                        <ul className="space-y-3">
                          {month.events.filter(event => event.show !== false).map((event, idx) => (
                            <li key={idx} className={`flex items-center text-gray-700 ${event.highlight ? 'font-semibold' : ''}`}>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                                {event.date}
                              </span>
                              {event.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bell Schedule Tab */}
              {activeTab === 'bell' && data.showBellSchedule && data.bellSchedule?.show && filteredBellSchedule.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.bellSchedule?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.bellSchedule?.description}</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.period}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.time}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.bellSchedule?.labels?.description}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBellSchedule.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.period}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Transport Timings Tab */}
              {activeTab === 'transport' && data.showTransport && data.transport?.show && filteredTransport.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">{data.transport?.title}</h3>
                  <p className="text-gray-600 mb-6">{data.transport?.description}</p>
                  
                  <div className="overflow-x-auto mb-8">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.route}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.morningPickup}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.afternoonDropoff}</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{data.transport?.labels?.stops}</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTransport.map((route, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.route}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.morningPickup}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{route.afternoonDropoff}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{route.stops}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">{data.transport?.policiesTitle}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {filteredTransportPolicies.map((policy, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{policy.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">{data.transport?.safetyTitle}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {filteredTransportSafety.map((safety, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{safety.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
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

export default SchoolTimingsPage;