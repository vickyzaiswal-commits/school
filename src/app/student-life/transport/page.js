"use client";
import React, { useState } from 'react';
import { 
  Bus,
  MapPin,
  Clock,
  Users,
  Shield,
  Phone,
  Mail,
  Download,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Navigation,
  Ticket,
  AlertCircle,
  CheckCircle,
  FileText,
  Calendar,
  Zap
} from 'lucide-react';

const TransportPage = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [selectedRoute, setSelectedRoute] = useState(1);

  const transportTabs = [
    { id: 'routes', name: 'Routes & Schedules', icon: MapPin },
    { id: 'safety', name: 'Safety Measures', icon: Shield },
    { id: 'fees', name: 'Transport Fees', icon: Ticket },
    { id: 'contact', name: 'Contact', icon: Phone }
  ];

  const transportBenefits = [
    {
      icon: Shield,
      title: "Safety First",
      description: "GPS tracked buses with trained drivers and attendants"
    },
    {
      icon: Clock,
      title: "Punctuality",
      description: "Reliable and timely pick-up and drop services"
    },
    {
      icon: Users,
      title: "Trained Staff",
      description: "Well-trained drivers and supportive attendants"
    },
    {
      icon: Zap,
      title: "Convenience",
      description: "Doorstep service with extensive route coverage"
    }
  ];

  const busRoutes = [
    {
      id: 1,
      name: "Route 1 - North Zone",
      driver: "Mr. Rajesh Kumar",
      attendant: "Ms. Sunita Devi",
      busNumber: "DL 01 AB 1234",
      capacity: "40 students",
      morningPickup: "7:00 AM - 7:45 AM",
      afternoonDrop: "3:45 PM - 4:30 PM",
      areas: ["Sector 14", "Sector 15", "Sector 16", "Sector 17", "Sector 18"],
      stops: 5,
      status: "Active"
    },
    {
      id: 2,
      name: "Route 2 - South Zone",
      driver: "Mr. Vijay Singh",
      attendant: "Ms. Priya Sharma",
      busNumber: "DL 01 CD 5678",
      capacity: "42 students",
      morningPickup: "7:15 AM - 8:00 AM",
      afternoonDrop: "3:45 PM - 4:30 PM",
      areas: ["Sector 21", "Sector 22", "Sector 23", "Sector 24", "Sector 25", "Sector 26"],
      stops: 6,
      status: "Active"
    },
    {
      id: 3,
      name: "Route 3 - East Zone",
      driver: "Mr. Amit Patel",
      attendant: "Ms. Rekha Gupta",
      busNumber: "DL 01 EF 9012",
      capacity: "38 students",
      morningPickup: "7:10 AM - 7:55 AM",
      afternoonDrop: "3:50 PM - 4:35 PM",
      areas: ["Sector 8", "Sector 9", "Sector 10", "Sector 11"],
      stops: 4,
      status: "Active"
    },
    {
      id: 4,
      name: "Route 4 - West Zone",
      driver: "Mr. Sanjay Verma",
      attendant: "Ms. Neha Singh",
      busNumber: "DL 01 GH 3456",
      capacity: "45 students",
      morningPickup: "7:20 AM - 8:05 AM",
      afternoonDrop: "4:00 PM - 4:45 PM",
      areas: ["Sector 5", "Sector 6", "Sector 7", "Sector 12", "Sector 13", "Sector 19", "Sector 20"],
      stops: 7,
      status: "Active"
    },
    {
      id: 5,
      name: "Route 5 - Central Zone",
      driver: "Mr. Ramesh Tiwari",
      attendant: "Ms. Anjali Mehta",
      busNumber: "DL 01 IJ 7890",
      capacity: "36 students",
      morningPickup: "7:05 AM - 7:50 AM",
      afternoonDrop: "3:40 PM - 4:25 PM",
      areas: ["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 27"],
      stops: 5,
      status: "Active"
    }
  ];

  const safetyFeatures = [
    {
      title: "GPS Tracking",
      description: "Real-time tracking of all buses with live location sharing with parents",
      icon: Navigation
    },
    {
      title: "Trained Staff",
      description: "Drivers with minimum 5 years experience and attendants trained in first aid",
      icon: Users
    },
    {
      title: "Speed Governors",
      description: "All buses equipped with speed limiters not exceeding 40 km/h",
      icon: Zap
    },
    {
      title: "Emergency Alerts",
      description: "Panic buttons and emergency alert systems in all vehicles",
      icon: AlertCircle
    },
    {
      title: "Regular Maintenance",
      description: "Weekly maintenance checks and comprehensive quarterly servicing",
      icon: CheckCircle
    },
    {
      title: "Safety Drills",
      description: "Monthly safety drills and evacuation practice for students",
      icon: Shield
    }
  ];

  const feeStructure = [
    {
      plan: "Annual Payment",
      amount: "₹18,000",
      discount: "10% discount",
      savings: "Save ₹2,000",
      description: "One-time payment for the entire academic year"
    },
    {
      plan: "Term Payment",
      amount: "₹6,500 per term",
      discount: "No discount",
      savings: "3 terms per year",
      description: "Pay at the beginning of each term"
    },
    {
      plan: "Monthly Payment",
      amount: "₹2,200 per month",
      discount: "No discount",
      savings: "10 months per year",
      description: "Monthly payment option for flexibility"
    },
    {
      plan: "Sibling Discount",
      amount: "15% off",
      discount: "For second child",
      savings: "Additional 10% for third child",
      description: "Special discounts for families with multiple children"
    }
  ];

  const policies = [
    {
      title: "Pickup Policy",
      description: "Students must be ready 5 minutes before scheduled pickup time. Bus will wait maximum 2 minutes."
    },
    {
      title: "Absence Notification",
      description: "Parents must inform transport incharge if student will not use bus on any day."
    },
    {
      title: "Route Changes",
      description: "Route change requests require 48 hours notice and are subject to availability."
    },
    {
      title: "Code of Conduct",
      description: "Students must follow bus rules and maintain discipline during transit."
    }
  ];

  const resources = [
    {
      title: "Transport Application Form",
      description: "Application form for new transport service requests",
      format: "PDF",
      size: "0.8 MB",
      icon: FileText
    },
    {
      title: "Bus Routes Map",
      description: "Detailed map of all bus routes and pickup points",
      format: "PDF",
      size: "1.5 MB",
      icon: MapPin
    },
    {
      title: "Parent Transport Guide",
      description: "Complete guide for parents about transport services",
      format: "PDF",
      size: "2.1 MB",
      icon: Users
    },
    {
      title: "Fee Payment Schedule",
      description: "Transport fee payment dates and methods",
      format: "PDF",
      size: "0.6 MB",
      icon: Calendar
    }
  ];

  const selectedRouteData = busRoutes.find(route => route.id === selectedRoute);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1544620127-51a44c51c241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Transport"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Transport Services</h1>
            <p className="text-xl mb-6 text-gray-200">
              Safe, reliable, and convenient transportation for all students
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto">
              <Bus className="mr-2 h-5 w-5" />
              Apply for Transport
            </button>
          </div>
        </div>
      </section>

      {/* Transport Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Transport Service?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We prioritize safety, convenience, and reliability in our transportation services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transportBenefits.map((benefit, index) => {
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
            {transportTabs.map((tab) => {
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
          {/* Routes & Schedules Tab */}
          {activeTab === 'routes' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Bus Routes & Schedules</h3>
              <p className="text-gray-600 mb-8">Comprehensive information about our transportation routes and timings</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Route Selector */}
                <div className="lg:col-span-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h4>
                  <div className="space-y-2">
                    {busRoutes.map(route => (
                      <button
                        key={route.id}
                        onClick={() => setSelectedRoute(route.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedRoute === route.id
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="font-medium">{route.name}</div>
                        <div className="text-sm opacity-80">{route.areas.length} areas • {route.stops} stops</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Route Details */}
                <div className="lg:col-span-3">
                  {selectedRouteData && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">{selectedRouteData.name}</h4>
                          <p className="text-gray-600">Bus No: {selectedRouteData.busNumber}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mt-2 md:mt-0">
                          {selectedRouteData.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">Staff Information</h5>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-green-600 mr-2" />
                              <span>Driver: <strong>{selectedRouteData.driver}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-green-600 mr-2" />
                              <span>Attendant: <strong>{selectedRouteData.attendant}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-green-600 mr-2" />
                              <span>Capacity: <strong>{selectedRouteData.capacity}</strong></span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">Timings</h5>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-green-600 mr-2" />
                              <span>Morning Pickup: <strong>{selectedRouteData.morningPickup}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-green-600 mr-2" />
                              <span>Afternoon Drop: <strong>{selectedRouteData.afternoonDrop}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Coverage Areas</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {selectedRouteData.areas.map((area, index) => (
                            <div key={index} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm">
                              {area}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Safety Measures Tab */}
          {activeTab === 'safety' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Safety Measures</h3>
              <p className="text-gray-600 mb-8">Our comprehensive safety protocols ensure your child's security during transit</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {safetyFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-4">Safety Guidelines for Students</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Remain seated while the bus is in motion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Keep hands and head inside the bus at all times</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Follow instructions from the driver and attendant</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Use seat belts if available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Report any concerns to the transport incharge</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Transport Fees Tab */}
          {activeTab === 'fees' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Transport Fees</h3>
              <p className="text-gray-600 mb-8">Affordable and flexible payment options for our transportation services</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {feeStructure.map((fee, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{fee.plan}</h4>
                    <div className="text-2xl font-bold text-green-600 mb-2">{fee.amount}</div>
                    <div className="text-sm text-gray-600 mb-4">{fee.description}</div>
                    <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
                      {fee.discount}
                    </div>
                    <div className="text-sm text-gray-500">{fee.savings}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Payment Methods</h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Online payment through parent portal</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Bank transfer to school account</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Cash payment at school accounts office</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>Cheque payable to school name</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Transport Policies</h4>
                  <div className="space-y-4">
                    {policies.map((policy, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                        <h5 className="font-medium text-gray-800">{policy.title}</h5>
                        <p className="text-sm text-gray-600">{policy.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Transport Contact</h3>
              <p className="text-gray-600 mb-8">Get in touch with our transport department for any queries or assistance</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Transport Incharge</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Mr. Anil Sharma</p>
                        <p className="text-sm text-gray-600">Transport Incharge</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">+91 98765 43210</p>
                        <p className="text-sm text-gray-600">Mon-Sat, 8:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-green-600 mr-3" />
                      <p className="font-medium">transport@stcolumbas.edu</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Transport Office</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-sm text-gray-600">Monday to Saturday: 7:30 AM - 5:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">Near Main Gate, School Campus</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Office Phone</p>
                        <p className="text-sm text-gray-600">+91 11 1234 5678</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Emergency Contact</h4>
                <p className="text-green-700 mb-4">For urgent transport-related issues during bus operation hours:</p>
                <div className="flex items-center bg-white p-4 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
                  <div>
                    <p className="font-bold text-red-600">Emergency Hotline: +91 98765 43219</p>
                    <p className="text-sm text-gray-600">Available during all bus operational hours (6:30 AM - 5:30 PM)</p>
                  </div>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Transport Resources</h2>
            <p className="text-lg text-gray-600">
              Downloadable forms and information about our transport services
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
          <h2 className="text-3xl font-bold mb-4">Need Transport Services?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Apply for school transport or get answers to your transportation questions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Apply for Transport
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Transport Office
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransportPage;