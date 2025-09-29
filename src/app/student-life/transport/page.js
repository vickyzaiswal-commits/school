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

// JSON data for all page content
const pageData = {
  hero: {
    show: true,
    title: "School Transport Services",
    subtitle: "Safe, reliable, and convenient transportation for all students",
    height: "h-96",
    backgroundImage: "https://images.unsplash.com/photo-1544620127-51a44c51c241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ctaButton: {
      label: "Apply for Transport",
      show: true
    }
  },

  benefits: {
    show: true,
    title: "Why Choose Our Transport Service?",
    description: "We prioritize safety, convenience, and reliability in our transportation services",
    items: [
      {
        icon: Shield,
        title: "Safety First",
        description: "GPS tracked buses with trained drivers and attendants",
        show: true
      },
      {
        icon: Clock,
        title: "Punctuality",
        description: "Reliable and timely pick-up and drop services",
        show: true
      },
      {
        icon: Users,
        title: "Trained Staff",
        description: "Well-trained drivers and supportive attendants",
        show: true
      },
      {
        icon: Zap,
        title: "Convenience",
        description: "Doorstep service with extensive route coverage",
        show: true
      }
    ]
  },

  tabs: {
    show: true,
    title: "Transport Information",
    description: "Explore our transportation services and facilities",
    items: [
      { id: 'routes', name: 'Routes & Schedules', icon: MapPin, description: 'Bus routes', show: true },
      { id: 'safety', name: 'Safety Measures', icon: Shield, description: 'Safety protocols', show: true },
      { id: 'fees', name: 'Transport Fees', icon: Ticket, description: 'Fee structure', show: true },
      { id: 'contact', name: 'Contact', icon: Phone, description: 'Get in touch', show: true }
    ]
  },

  busRoutes: {
    show: true,
    title: "Bus Routes & Schedules",
    description: "Comprehensive information about our transportation routes and timings",
    routes: [
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
        status: "Active",
        show: true
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
        status: "Active",
        show: true
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
        status: "Active",
        show: true
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
        status: "Active",
        show: true
      }
    ]
  },

  safetyFeatures: {
    show: true,
    title: "Safety Measures",
    description: "Our comprehensive safety protocols ensure your child's security during transit",
    features: [
      {
        title: "GPS Tracking",
        description: "Real-time tracking of all buses with live location sharing with parents",
        icon: Navigation,
        show: true
      },
      {
        title: "Trained Staff",
        description: "Drivers with minimum 5 years experience and attendants trained in first aid",
        icon: Users,
        show: true
      },
      {
        title: "Speed Governors",
        description: "All buses equipped with speed limiters not exceeding 40 km/h",
        icon: Zap,
        show: true
      },
      {
        title: "Emergency Alerts",
        description: "Panic buttons and emergency alert systems in all vehicles",
        icon: AlertCircle,
        show: true
      },
      {
        title: "Regular Maintenance",
        description: "Weekly maintenance checks and comprehensive quarterly servicing",
        icon: CheckCircle,
        show: true
      },
      {
        title: "Safety Drills",
        description: "Monthly safety drills and evacuation practice for students",
        icon: Shield,
        show: true
      }
    ],
    guidelines: {
      title: "Safety Guidelines for Students",
      items: [
        "Remain seated while the bus is in motion",
        "Keep hands and head inside the bus at all times",
        "Follow instructions from the driver and attendant",
        "Use seat belts if available",
        "Report any concerns to the transport incharge"
      ],
      show: true
    }
  },

  feeStructure: {
    show: true,
    title: "Transport Fees",
    description: "Affordable and flexible payment options for our transportation services",
    plans: [
      {
        plan: "Annual Payment",
        amount: "₹18,000",
        discount: "10% discount",
        savings: "Save ₹2,000",
        description: "One-time payment for the entire academic year",
        show: true
      },
      {
        plan: "Term Payment",
        amount: "₹6,500 per term",
        discount: "No discount",
        savings: "3 terms per year",
        description: "Pay at the beginning of each term",
        show: true
      },
      {
        plan: "Monthly Payment",
        amount: "₹2,200 per month",
        discount: "No discount",
        savings: "10 months per year",
        description: "Monthly payment option for flexibility",
        show: true
      },
      {
        plan: "Sibling Discount",
        amount: "15% off",
        discount: "For second child",
        savings: "Additional 10% for third child",
        description: "Special discounts for families with multiple children",
        show: true
      }
    ],
    paymentMethods: {
      title: "Payment Methods",
      items: [
        "Online payment through parent portal",
        "Bank transfer to school account",
        "Cash payment at school accounts office",
        "Cheque payable to school name"
      ],
      show: true
    },
    policies: {
      title: "Transport Policies",
      items: [
        {
          title: "Pickup Policy",
          description: "Students must be ready 5 minutes before scheduled pickup time. Bus will wait maximum 2 minutes.",
          show: true
        },
        {
          title: "Absence Notification",
          description: "Parents must inform transport incharge if student will not use bus on any day.",
          show: true
        },
        {
          title: "Route Changes",
          description: "Route change requests require 48 hours notice and are subject to availability.",
          show: true
        },
        {
          title: "Code of Conduct",
          description: "Students must follow bus rules and maintain discipline during transit.",
          show: true
        }
      ],
      show: true
    }
  },

  contact: {
    show: true,
    title: "Transport Contact",
    description: "Get in touch with our transport department for any queries or assistance",
    contacts: [
      {
        type: "Transport Incharge",
        name: "Mr. Anil Sharma",
        position: "Transport Incharge",
        phone: "+91 98765 43210",
        hours: "Mon-Sat, 8:00 AM - 5:00 PM",
        email: "transport@stcolumbas.edu",
        show: true
      },
      {
        type: "Transport Office",
        officeHours: "Monday to Saturday: 7:30 AM - 5:30 PM",
        location: "Near Main Gate, School Campus",
        officePhone: "+91 11 1234 5678",
        show: true
      }
    ],
    emergency: {
      title: "Emergency Contact",
      description: "For urgent transport-related issues during bus operation hours:",
      hotline: "+91 98765 43219",
      availability: "Available during all bus operational hours (6:30 AM - 5:30 PM)",
      show: true
    }
  },

  resources: {
    show: true,
    title: "Transport Resources",
    description: "Downloadable forms and information about our transport services",
    downloadLabel: "Download",
    items: [
      {
        title: "Transport Application Form",
        description: "Application form for new transport service requests",
        format: "PDF",
        size: "0.8 MB",
        icon: FileText,
        downloads: 234,
        show: true
      },
      {
        title: "Bus Routes Map",
        description: "Detailed map of all bus routes and pickup points",
        format: "PDF",
        size: "1.5 MB",
        icon: MapPin,
        downloads: 189,
        show: true
      },
      {
        title: "Parent Transport Guide",
        description: "Complete guide for parents about transport services",
        format: "PDF",
        size: "2.1 MB",
        icon: Users,
        downloads: 156,
        show: true
      },
      {
        title: "Fee Payment Schedule",
        description: "Transport fee payment dates and methods",
        format: "PDF",
        size: "0.6 MB",
        icon: Calendar,
        downloads: 278,
        show: true
      }
    ]
  },

  cta: {
    show: true,
    title: "Need Transport Services?",
    description: "Apply for school transport or get answers to your transportation questions",
    buttons: [
      { 
        label: "Apply for Transport", 
        variant: "primary",
        show: true 
      },
      { 
        label: "Contact Transport Office", 
        variant: "secondary",
        show: true 
      }
    ]
  }
};

const TransportPage = () => {
  const [activeTab, setActiveTab] = useState('routes');
  const [selectedRoute, setSelectedRoute] = useState(1);

  // Filter functions
  const filteredBenefits = pageData.benefits?.items?.filter(benefit => benefit.show !== false) || [];
  const filteredTabs = pageData.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredRoutes = pageData.busRoutes?.routes?.filter(route => route.show !== false) || [];
  const filteredSafetyFeatures = pageData.safetyFeatures?.features?.filter(feature => feature.show !== false) || [];
  const filteredFeePlans = pageData.feeStructure?.plans?.filter(plan => plan.show !== false) || [];
  const filteredPolicies = pageData.feeStructure?.policies?.items?.filter(policy => policy.show !== false) || [];
  const filteredContacts = pageData.contact?.contacts?.filter(contact => contact.show !== false) || [];
  const filteredResources = pageData.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = pageData.cta?.buttons?.filter(button => button.show !== false) || [];

  const selectedRouteData = filteredRoutes.find(route => route.id === selectedRoute);

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
                  <Bus className="mr-2 h-5 w-5" />
                  {pageData.hero?.ctaButton?.label}
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
                const IconComponent = benefit.icon || Shield;
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

        {/* Tab Navigation */}
        {pageData.tabs?.show && filteredTabs.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{pageData.tabs?.title}</h2>
              <p className="text-gray-600">
                {pageData.tabs?.description}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {filteredTabs.map((tab) => {
                const IconComponent = tab.icon || MapPin;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {/* Routes & Schedules Tab */}
              {activeTab === 'routes' && pageData.busRoutes?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pageData.busRoutes.title}</h3>
                  <p className="text-gray-600 mb-8">{pageData.busRoutes.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Route Selector */}
                    <div className="lg:col-span-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Select Route</h4>
                      <div className="space-y-2">
                        {filteredRoutes.map(route => (
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
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
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
              {activeTab === 'safety' && pageData.safetyFeatures?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pageData.safetyFeatures.title}</h3>
                  <p className="text-gray-600 mb-8">{pageData.safetyFeatures.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredSafetyFeatures.map((feature, index) => {
                      const IconComponent = feature.icon || Shield;
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
                  
                  {pageData.safetyFeatures.guidelines?.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-4">{pageData.safetyFeatures.guidelines.title}</h4>
                      <ul className="space-y-2 text-sm text-green-700">
                        {pageData.safetyFeatures.guidelines.items.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Transport Fees Tab */}
              {activeTab === 'fees' && pageData.feeStructure?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pageData.feeStructure.title}</h3>
                  <p className="text-gray-600 mb-8">{pageData.feeStructure.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {filteredFeePlans.map((fee, index) => (
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
                    {pageData.feeStructure.paymentMethods?.show && (
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-4">{pageData.feeStructure.paymentMethods.title}</h4>
                        <ul className="space-y-2 text-sm text-blue-700">
                          {pageData.feeStructure.paymentMethods.items.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {pageData.feeStructure.policies?.show && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4">{pageData.feeStructure.policies.title}</h4>
                        <div className="space-y-4">
                          {filteredPolicies.map((policy, index) => (
                            <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                              <h5 className="font-medium text-gray-800">{policy.title}</h5>
                              <p className="text-sm text-gray-600">{policy.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && pageData.contact?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pageData.contact.title}</h3>
                  <p className="text-gray-600 mb-8">{pageData.contact.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {filteredContacts.map((contact, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{contact.type}</h4>
                        <div className="space-y-3">
                          {contact.name && (
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-sm text-gray-600">{contact.position}</p>
                              </div>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center">
                              <Phone className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">{contact.phone}</p>
                                <p className="text-sm text-gray-600">{contact.hours}</p>
                              </div>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center">
                              <Mail className="h-5 w-5 text-green-600 mr-3" />
                              <p className="font-medium">{contact.email}</p>
                            </div>
                          )}
                          {contact.officeHours && (
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">Office Hours</p>
                                <p className="text-sm text-gray-600">{contact.officeHours}</p>
                              </div>
                            </div>
                          )}
                          {contact.location && (
                            <div className="flex items-center">
                              <MapPin className="h-5 w-5 text-green-600 mr-3" />
                              <div>
                                <p className="font-medium">Location</p>
                                <p className="text-sm text-gray-600">{contact.location}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {pageData.contact.emergency?.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-4">{pageData.contact.emergency.title}</h4>
                      <p className="text-green-700 mb-4">{pageData.contact.emergency.description}</p>
                      <div className="flex items-center bg-white p-4 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
                        <div>
                          <p className="font-bold text-red-600">Emergency Hotline: {pageData.contact.emergency.hotline}</p>
                          <p className="text-sm text-gray-600">{pageData.contact.emergency.availability}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
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

        {/* CTA Section */}
        {pageData.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{pageData.cta.title}</h2>
            <p className="text-green-100 mb-6 max-w-3xl mx-auto">
              {pageData.cta.description}
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

export default TransportPage;