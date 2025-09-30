"use client";
import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const contactPageData = {
  hero: {
    show: true,
    title: "Contact St. Columba's School",
    subtitle: "We're here to answer your questions and help you connect with our school community. Reach out to us through any of the channels below.",
    buttonText: "Send a Message",
    secondaryButtonText: "Call Now",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "St. Columba's School Contact"
  },
  contactMethods: {
    show: true,
    title: "Contact Methods",
    subtitle: "Choose the most convenient way to get in touch with us",
    items: [
      {
        icon: "Phone",
        title: "Phone",
        details: ["011-2336-3462", "011-2336-3134"],
        description: "Call us during school hours",
        link: "tel:01123363462",
        show: true
      },
      {
        icon: "Mail",
        title: "Email",
        details: ["stcolumbas@stcolumbas.edu.in", "info@stcolumbas.edu.in"],
        description: "We'll respond within 24 hours",
        link: "mailto:stcolumbas@stcolumbas.edu.in",
        show: true
      },
      {
        icon: "MapPin",
        title: "Address",
        details: ["1, Ashok Place", "New Delhi - 110001"],
        description: "Visit our campus",
        link: "https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi",
        show: true
      },
      {
        icon: "Clock",
        title: "Office Hours",
        details: ["Mon-Fri: 8:00 AM - 4:00 PM", "Sat: 8:00 AM - 12:00 PM"],
        description: "Reception remains open during these hours",
        link: null,
        show: true
      }
    ]
  },
  visitSection: {
    show: true,
    title: "Visit Our Campus",
    description: "Our school is located in the heart of New Delhi, easily accessible by public and private transport. We welcome visitors during school hours with prior appointment.",
    directions: {
      title: "Directions",
      items: [
        "Nearest Metro: Rajiv Chowk (Yellow Line) - 1.5km",
        "Nearest Bus Stop: Ashok Road - 200m",
        "Parking available for visitors"
      ]
    },
    bestTime: {
      title: "Best Time to Visit",
      description: "For campus tours and meetings with administration, we recommend scheduling your visit between 9:00 AM and 2:00 PM on weekdays."
    },
    buttonText: "Get Directions"
  },
  departments: {
    show: true,
    title: "Department Contacts",
    subtitle: "Connect directly with the relevant department for specific inquiries",
    items: [
      {
        id: 'general',
        name: 'General Inquiries',
        email: 'info@stcolumbas.edu.in',
        phone: '011-2336-3462',
        show: true
      },
      {
        id: 'admissions',
        name: 'Admissions',
        email: 'admissions@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 101',
        show: true
      },
      {
        id: 'academics',
        name: 'Academic Affairs',
        email: 'academics@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 102',
        show: true
      },
      {
        id: 'accounts',
        name: 'Accounts & Fees',
        email: 'accounts@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 103',
        show: true
      },
      {
        id: 'transport',
        name: 'Transport',
        email: 'transport@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 104',
        show: true
      },
      {
        id: 'sports',
        name: 'Sports Department',
        email: 'sports@stcolumbas.edu.in',
        phone: '011-2336-3462 Ext. 105',
        show: true
      }
    ]
  },
  contactForm: {
    show: true,
    title: "Send us a Message",
    description: "Fill out the form and we'll get back to you as soon as possible. For urgent matters, please call us directly.",
    responseTime: "Within 24-48 hours",
    officeHours: "Mon-Fri: 8AM-4PM, Sat: 8AM-12PM",
    successMessage: {
      title: "Message Sent Successfully!",
      description: "Thank you for contacting us. We'll get back to you shortly."
    }
  },
  faqs: {
    show: true,
    title: "Frequently Asked Questions",
    subtitle: "Quick answers to common questions we receive",
    items: [
      {
        question: "What are the school office hours?",
        answer: "Our administrative office is open Monday to Friday from 8:00 AM to 4:00 PM, and on Saturdays from 8:00 AM to 12:00 PM.",
        show: true
      },
      {
        question: "How can I schedule a campus tour?",
        answer: "You can schedule a campus tour by contacting our admissions office at admissions@stcolumbas.edu.in or by calling 011-2336-3462 Ext. 101 at least 48 hours in advance.",
        show: true
      },
      {
        question: "Who should I contact for academic records?",
        answer: "For academic records and transcripts, please contact the academic affairs department at academics@stcolumbas.edu.in with your student details and requirements.",
        show: true
      },
      {
        question: "How do I report my child's absence?",
        answer: "Please call the school reception at 011-2336-3462 before 9:00 AM on the day of absence, or send an email to your child's class teacher with the reason for absence.",
        show: true
      }
    ]
  },
  socialMedia: {
    show: true,
    title: "Connect With Us",
    subtitle: "Follow our social media channels to stay updated with school news, events, and activities",
    newsletter: {
      title: "School Newsletter",
      description: "Subscribe to our monthly newsletter for updates on school events, achievements, and important announcements.",
      placeholder: "Your email address",
      buttonText: "Subscribe"
    },
    platforms: [
      { icon: "Facebook", name: 'Facebook', color: 'text-blue-400', show: true },
      { icon: "Twitter", name: 'Twitter', color: 'text-blue-300', show: true },
      { icon: "Instagram", name: 'Instagram', color: 'text-pink-400', show: true },
      { icon: "Youtube", name: 'YouTube', color: 'text-red-400', show: true }
    ]
  }
};

// Map string icon names to Lucide React components
const iconMap = {
  MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Youtube,
  MessageCircle, Building, User, Calendar, ChevronDown, Loader2, Download
};

const ContactUsPage = () => {
  const [activeTab, setActiveTab] = useState(contactPageData.departments.items.find(dept => dept.show !== false)?.id || 'general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          department: 'general',
          urgency: 'normal'
        });
      }, 5000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDepartment = contactPageData.departments.items.find(dept => dept.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Updated to match Download Syllabus page */}
      {contactPageData.hero.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-green/20"></div>
          {/* <img
            src={contactPageData.hero.image}
            alt={contactPageData.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          /> */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{contactPageData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{contactPageData.hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact-form" 
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {contactPageData.hero.buttonText}
                </a>
                <a 
                  href="tel:01123363462" 
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all flex items-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {contactPageData.hero.secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute top-10 right-10 opacity-10">
            <MessageCircle className="h-32 w-32" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Building className="h-24 w-24" />
          </div>
        </section>
      )}

      {/* Contact Methods */}
      {contactPageData.contactMethods.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{contactPageData.contactMethods.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {contactPageData.contactMethods.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactPageData.contactMethods.items.filter(method => method.show !== false).map((method, index) => {
                const IconComponent = iconMap[method.icon];
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 shadow-md"
                  >
                    <div className="bg-green-100 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{method.title}</h3>
                    <div className="space-y-1 mb-4">
                      {method.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{method.description}</p>
                    {method.link && (
                      <a 
                        href={method.link} 
                        className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center"
                      >
                        Contact via {method.title.toLowerCase()}
                        <ChevronDown className="h-4 w-4 ml-1 transform rotate-270" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Map and Visit Section */}
      {contactPageData.visitSection.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{contactPageData.visitSection.title}</h2>
                <p className="text-lg text-gray-600 mb-8">
                  {contactPageData.visitSection.description}
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{contactPageData.visitSection.directions.title}</h3>
                    <ul className="space-y-2 text-gray-600">
                      {contactPageData.visitSection.directions.items.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{contactPageData.visitSection.bestTime.title}</h3>
                    <p className="text-gray-600">
                      {contactPageData.visitSection.bestTime.description}
                    </p>
                  </div>
                  
                  <a 
                    href="https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    {contactPageData.visitSection.buttonText}
                  </a>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-xl h-96 bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">St. Columba's School</h3>
                    <p className="text-gray-600 mb-4">1, Ashok Place, New Delhi - 110001</p>
                    <div className="bg-white rounded-lg p-4 inline-block shadow-md">
                      <p className="text-sm text-gray-500">Google Maps integration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Department Contacts */}
      {contactPageData.departments.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{contactPageData.departments.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {contactPageData.departments.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {contactPageData.departments.items.filter(dept => dept.show !== false).map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveTab(dept.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeTab === dept.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 max-w-2xl mx-auto border border-green-100 shadow-md">
              {currentDepartment && (
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{currentDepartment.name}</h3>
                  <p className="text-gray-600 mb-6">We handle all inquiries related to {currentDepartment.name.toLowerCase()}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                    <a 
                      href={`mailto:${currentDepartment.email}`} 
                      className="flex items-center justify-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {currentDepartment.email}
                    </a>
                    <a 
                      href={`tel:${currentDepartment.phone.replace(/[^0-9]/g, '')}`} 
                      className="flex items-center justify-center text-gray-700 hover:text-gray-900 font-medium"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      {currentDepartment.phone}
                    </a>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 text-left border border-green-100 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-600" />
                      Response Time
                    </h4>
                    <p className="text-gray-600">
                      We typically respond to {currentDepartment.name.toLowerCase()} inquiries within 24-48 hours 
                      during school working days.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form */}
      {contactPageData.contactForm.show && (
        <section id="contact-form" className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-b from-green-700 to-green-600 p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6">{contactPageData.contactForm.title}</h2>
                  <p className="mb-8 opacity-90">
                    {contactPageData.contactForm.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                      <div>
                        <h4 className="font-semibold">Response Time</h4>
                        <p className="text-sm text-green-100 opacity-90">{contactPageData.contactForm.responseTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 opacity-80" />
                      <div>
                        <h4 className="font-semibold">Office Hours</h4>
                        <p className="text-sm text-green-100 opacity-90">{contactPageData.contactForm.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-3/5 p-8">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Send className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{contactPageData.contactForm.successMessage.title}</h3>
                      <p className="text-gray-600">
                        {contactPageData.contactForm.successMessage.description}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="Your name"
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="your.email@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                            placeholder="+91 1234567890"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                          </label>
                          <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          >
                            {contactPageData.departments.items.filter(dept => dept.show !== false).map(dept => (
                              <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="What is your message regarding?"
                        />
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows="5"
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                            errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder="Please provide details of your inquiry..."
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {contactPageData.faqs.show && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{contactPageData.faqs.title}</h2>
              <p className="text-lg text-gray-600">
                {contactPageData.faqs.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {contactPageData.faqs.items.filter(faq => faq.show !== false).map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600">
                Still have questions?{" "}
                <a href="#contact-form" className="text-green-600 hover:text-green-700 font-semibold underline">
                  Contact us directly
                </a>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Social Media Connect */}
      {contactPageData.socialMedia.show && (
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">{contactPageData.socialMedia.title}</h2>
            <p className="text-lg text-gray-300 mb-10">
              {contactPageData.socialMedia.subtitle}
            </p>
            
            <div className="flex justify-center space-x-6">
              {contactPageData.socialMedia.platforms.filter(platform => platform.show !== false).map((social, index) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a 
                    key={index}
                    href="#" 
                    className={`bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-700 transition-colors hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            
            <div className="mt-10 bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto border border-gray-700 shadow-md">
              <h3 className="text-xl font-semibold mb-4">{contactPageData.socialMedia.newsletter.title}</h3>
              <p className="text-gray-300 mb-4">
                {contactPageData.socialMedia.newsletter.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder={contactPageData.socialMedia.newsletter.placeholder}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  {contactPageData.socialMedia.newsletter.buttonText}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContactUsPage;