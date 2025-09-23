"use client";
import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  MessageCircle,
  Building,
  User,
  Calendar,
  ChevronDown
} from 'lucide-react';

const ContactUsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    urgency: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
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
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: ["011-2336-3462", "011-2336-3134"],
      description: "Call us during school hours",
      link: "tel:01123363462"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["stcolumbas@stcolumbas.edu.in", "info@stcolumbas.edu.in"],
      description: "We'll respond within 24 hours",
      link: "mailto:stcolumbas@stcolumbas.edu.in"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["1, Ashok Place", "New Delhi - 110001"],
      description: "Visit our campus",
      link: "https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon-Fri: 8:00 AM - 4:00 PM", "Sat: 8:00 AM - 12:00 PM"],
      description: "Reception remains open during these hours",
      link: null
    }
  ];

  const departments = [
    {
      id: 'general',
      name: 'General Inquiries',
      email: 'info@stcolumbas.edu.in',
      phone: '011-2336-3462'
    },
    {
      id: 'admissions',
      name: 'Admissions',
      email: 'admissions@stcolumbas.edu.in',
      phone: '011-2336-3462 Ext. 101'
    },
    {
      id: 'academics',
      name: 'Academic Affairs',
      email: 'academics@stcolumbas.edu.in',
      phone: '011-2336-3462 Ext. 102'
    },
    {
      id: 'accounts',
      name: 'Accounts & Fees',
      email: 'accounts@stcolumbas.edu.in',
      phone: '011-2336-3462 Ext. 103'
    },
    {
      id: 'transport',
      name: 'Transport',
      email: 'transport@stcolumbas.edu.in',
      phone: '011-2336-3462 Ext. 104'
    },
    {
      id: 'sports',
      name: 'Sports Department',
      email: 'sports@stcolumbas.edu.in',
      phone: '011-2336-3462 Ext. 105'
    }
  ];

  const faqs = [
    {
      question: "What are the school office hours?",
      answer: "Our administrative office is open Monday to Friday from 8:00 AM to 4:00 PM, and on Saturdays from 8:00 AM to 12:00 PM."
    },
    {
      question: "How can I schedule a campus tour?",
      answer: "You can schedule a campus tour by contacting our admissions office at admissions@stcolumbas.edu.in or by calling 011-2336-3462 Ext. 101 at least 48 hours in advance."
    },
    {
      question: "Who should I contact for academic records?",
      answer: "For academic records and transcripts, please contact the academic affairs department at academics@stcolumbas.edu.in with your student details and requirements."
    },
    {
      question: "How do I report my child's absence?",
      answer: "Please call the school reception at 011-2336-3462 before 9:00 AM on the day of absence, or send an email to your child's class teacher with the reason for absence."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-700 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl mb-8">
              We're here to answer your questions and help you connect with our school community. 
              Reach out to us through any of the channels below.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#contact-form" 
                className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send a Message
              </a>
              <a 
                href="tel:01123363462" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-10">
          <MessageCircle className="h-32 w-32" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <Building className="h-24 w-24" />
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Methods</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the most convenient way to get in touch with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
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

      {/* Map and Visit Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Visit Our Campus</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our school is located in the heart of New Delhi, easily accessible by public 
                and private transport. We welcome visitors during school hours with prior appointment.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Directions</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Nearest Metro: Rajiv Chowk (Yellow Line) - 1.5km</li>
                    <li>• Nearest Bus Stop: Ashok Road - 200m</li>
                    <li>• Parking available for visitors</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Best Time to Visit</h3>
                  <p className="text-gray-600">
                    For campus tours and meetings with administration, we recommend scheduling 
                    your visit between 9:00 AM and 2:00 PM on weekdays.
                  </p>
                </div>
                
                <a 
                  href="https://maps.google.com/?q=St.+Columba's+School+Ashok+Place+New+Delhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Get Directions
                </a>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl h-96">
              {/* Embedded Google Map - Replace with actual embed code */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700">Interactive Map</h3>
                  <p className="text-gray-500 mt-2">Google Maps integration would appear here</p>
                  <p className="text-sm text-gray-400 mt-4">1, Ashok Place, New Delhi - 110001</p>
                </div>
                {/* Actual embed code would look like:
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.366283764722!2d77.20658231508356!3d28.628888782407835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5a10cabcbd%3A0xbbe9c3dfab2e9c3e!2sSt.%20Columba&#39;s%20School!5e0!3m2!1sen!2sin!4v1644567890123!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
                */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Department Contacts</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect directly with the relevant department for specific inquiries
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${activeTab === dept.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto">
            {departments.filter(dept => dept.id === activeTab).map(dept => (
              <div key={dept.id} className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{dept.name}</h3>
                <p className="text-gray-600 mb-6">We handle all inquiries related to {dept.name.toLowerCase()}</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                  <a 
                    href={`mailto:${dept.email}`} 
                    className="flex items-center justify-center text-green-600 hover:text-green-700"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    {dept.email}
                  </a>
                  <a 
                    href={`tel:${dept.phone.replace(/[^0-9]/g, '')}`} 
                    className="flex items-center justify-center text-gray-700 hover:text-gray-900"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    {dept.phone}
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-left">
                  <h4 className="font-semibold text-gray-800 mb-3">Response Time</h4>
                  <p className="text-gray-600">
                    We typically respond to {dept.name.toLowerCase()} inquiries within 24-48 hours 
                    during school working days.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-b from-green-700 to-green-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <p className="mb-8">
                  Fill out the form and we'll get back to you as soon as possible. 
                  For urgent matters, please call us directly.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Response Time</h4>
                      <p className="text-sm text-green-100">Within 24-48 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Office Hours</h4>
                      <p className="text-sm text-green-100">Mon-Fri: 8AM-4PM, Sat: 8AM-12PM</p>
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="Your name"
                        />
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          placeholder="+91 1234567890"
                        />
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-4">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="What is your message regarding?"
                      />
                    </div>
                    
                    <div className="mb-6">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Please provide details of your inquiry..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions we receive
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600">
              Still have questions?{" "}
              <a href="#contact-form" className="text-green-600 hover:text-green-700 font-semibold">
                Contact us directly
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Connect */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
          <p className="text-lg text-gray-300 mb-10">
            Follow our social media channels to stay updated with school news, events, and activities
          </p>
          
          <div className="flex justify-center space-x-6">
            {[
              { icon: Facebook, name: 'Facebook', color: 'text-blue-400' },
              { icon: Twitter, name: 'Twitter', color: 'text-blue-300' },
              { icon: Instagram, name: 'Instagram', color: 'text-pink-400' },
              { icon: Youtube, name: 'YouTube', color: 'text-red-400' }
            ].map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a 
                  key={index}
                  href="#" 
                  className={`bg-gray-800 rounded-full w-14 h-14 flex items-center justify-center hover:bg-gray-700 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <IconComponent className="h-6 w-6" />
                </a>
              );
            })}
          </div>
          
          <div className="mt-10 bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">School Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our monthly newsletter for updates on school events, achievements, and important announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;