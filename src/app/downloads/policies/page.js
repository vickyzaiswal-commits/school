"use client";
import React, { useState } from 'react';
import { 
  FileText, 
  Shield, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Download,
  ChevronDown,
  Search,
  ArrowRight,
  Bookmark,
  Scale,
  Heart,
  Target,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SchoolPolicyPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const policyCategories = [
    { id: 'all', name: 'All Policies', icon: FileText },
    { id: 'academic', name: 'Academic Policies', icon: BookOpen },
    { id: 'conduct', name: 'Code of Conduct', icon: Users },
    { id: 'safety', name: 'Health & Safety', icon: Shield },
    { id: 'admission', name: 'Admission Policies', icon: GraduationCap },
    { id: 'digital', name: 'Digital Policies', icon: Shield }
  ];

  const policies = [
    {
      id: 1,
      title: "Academic Integrity Policy",
      category: "academic",
      lastUpdated: "2024-01-15",
      summary: "Guidelines for maintaining academic honesty and preventing plagiarism",
      content: `
        <h3>Purpose</h3>
        <p>To uphold the highest standards of academic integrity and ensure fair evaluation of student work.</p>
        
        <h3>Policy Details</h3>
        <ul>
          <li>All submitted work must be original and properly cited</li>
          <li>Plagiarism in any form will result in disciplinary action</li>
          <li>Collaboration guidelines for group projects</li>
          <li>Examination rules and protocols</li>
        </ul>
        
        <h3>Consequences</h3>
        <p>Violations may result in grade penalties, course failure, or further disciplinary action.</p>
      `,
      status: "active",
      applicableTo: "All students and faculty"
    },
    {
      id: 2,
      title: "Student Code of Conduct",
      category: "conduct",
      lastUpdated: "2024-02-20",
      summary: "Expected behavior and disciplinary procedures for students",
      content: `
        <h3>Behavior Expectations</h3>
        <p>Students are expected to demonstrate respect, responsibility, and integrity at all times.</p>
        
        <h3>Prohibited Behaviors</h3>
        <ul>
          <li>Bullying or harassment of any kind</li>
          <li>Possession of prohibited items</li>
          <li>Unauthorized absence from school</li>
          <li>Damage to school property</li>
        </ul>
        
        <h3>Disciplinary Process</h3>
        <p>Progressive discipline approach including counseling, parental involvement, and possible suspension for serious violations.</p>
      `,
      status: "active",
      applicableTo: "All students"
    },
    {
      id: 3,
      title: "Health and Safety Protocol",
      category: "safety",
      lastUpdated: "2024-03-10",
      summary: "Procedures for maintaining a safe learning environment",
      content: `
        <h3>Emergency Procedures</h3>
        <p>Detailed protocols for fire drills, lockdowns, and other emergency situations.</p>
        
        <h3>Health Requirements</h3>
        <ul>
          <li>Immunization records must be up to date</li>
          <li>Illness reporting procedures</li>
          <li>Medication administration policies</li>
        </ul>
        
        <h3>Campus Safety</h3>
        <p>Security measures, visitor policies, and campus monitoring procedures.</p>
      `,
      status: "active",
      applicableTo: "All students, staff, and visitors"
    },
    {
      id: 4,
      title: "Admission Policy",
      category: "admission",
      lastUpdated: "2024-01-05",
      summary: "Criteria and process for student admissions",
      content: `
        <h3>Eligibility Criteria</h3>
        <p>Age requirements, academic prerequisites, and documentation needed for admission.</p>
        
        <h3>Selection Process</h3>
        <ul>
          <li>Application review timeline</li>
          <li>Assessment procedures</li>
          <li>Interview process (if applicable)</li>
          <li>Priority categories</li>
        </ul>
        
        <h3>Fee Structure</h3>
        <p>Detailed information about tuition fees, payment schedules, and financial aid options.</p>
      `,
      status: "active",
      applicableTo: "Prospective students and parents"
    },
    {
      id: 5,
      title: "Digital Citizenship Policy",
      category: "digital",
      lastUpdated: "2024-02-28",
      summary: "Responsible use of technology and online resources",
      content: `
        <h3>Acceptable Use</h3>
        <p>Guidelines for appropriate use of school technology resources and networks.</p>
        
        <h3>Online Behavior</h3>
        <ul>
          <li>Respectful communication in digital spaces</li>
          <li>Privacy protection guidelines</li>
          <li>Social media policies</li>
        </ul>
        
        <h3>Cybersecurity</h3>
        <p>Password requirements, data protection measures, and reporting procedures for security concerns.</p>
      `,
      status: "active",
      applicableTo: "All technology users"
    },
    {
      id: 6,
      title: "Anti-Bullying Policy",
      category: "conduct",
      lastUpdated: "2024-03-15",
      summary: "Prevention and response procedures for bullying incidents",
      content: `
        <h3>Definition of Bullying</h3>
        <p>Clear explanation of what constitutes bullying behavior, including cyberbullying.</p>
        
        <h3>Prevention Strategies</h3>
        <ul>
          <li>Educational programs on empathy and respect</li>
          <li>Peer support systems</li>
          <li>Regular monitoring of student interactions</li>
        </ul>
        
        <h3>Reporting and Response</h3>
        <p>Confidential reporting mechanisms and structured response protocol for addressing incidents.</p>
      `,
      status: "active",
      applicableTo: "All students and staff"
    }
  ];

  const filteredPolicies = policies.filter(policy => {
    const categoryMatch = activeCategory === 'all' || policy.category === activeCategory;
    const searchMatch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       policy.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const togglePolicy = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Scale className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">School Policies</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Clear guidelines and procedures that ensure a safe, respectful, and productive learning environment for all members of our school community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-semibold">20+</span> Comprehensive Policies
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-semibold">100%</span> Community Compliance
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="font-semibold">Regular</span> Updates & Reviews
            </div>
          </div>
        </div>
      </section>

      {/* Policy Navigation and Search */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Browse Policies</h2>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {policyCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id
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

          {/* Policies List */}
          <div className="space-y-6">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <div key={policy.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => togglePolicy(policy.id)}
                    className="w-full text-left p-6 flex justify-between items-start hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {policyCategories.find(cat => cat.id === policy.category)?.name}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500">Updated: {policy.lastUpdated}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{policy.title}</h3>
                      <p className="text-gray-600 mb-4">{policy.summary}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        Applies to: {policy.applicableTo}
                      </div>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-400 ml-4 transition-transform ${expandedPolicy === policy.id ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {expandedPolicy === policy.id && (
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-200 pt-6">
                        <div 
                          className="prose max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: policy.content }}
                        />
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </button>
                          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save for Later
                          </button>
                          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            <Eye className="h-4 w-4 mr-2" />
                            View History
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500">No policies found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Policy Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Policy Framework</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our policies are built on foundational principles that guide every aspect of school life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Prioritizing the physical and emotional well-being of all community members"
              },
              {
                icon: Heart,
                title: "Respect for All",
                description: "Fostering an inclusive environment where every individual is valued"
              },
              {
                icon: Target,
                title: "Excellence in Education",
                description: "Maintaining high academic standards and supporting student achievement"
              },
              {
                icon: Scale,
                title: "Fairness & Equity",
                description: "Ensuring just treatment and equal opportunities for everyone"
              }
            ].map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Update Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Policy Updates</h2>
            <p className="text-lg text-gray-600">We regularly review and update our policies to reflect best practices</p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-green-200"></div>
            
            <div className="space-y-12">
              {[
                {
                  date: "March 15, 2024",
                  title: "Anti-Bullying Policy Update",
                  description: "Enhanced cyberbullying protocols and reporting mechanisms"
                },
                {
                  date: "February 28, 2024",
                  title: "Digital Citizenship Policy",
                  description: "New guidelines for responsible technology use"
                },
                {
                  date: "January 15, 2024",
                  title: "Academic Integrity Revision",
                  description: "Updated plagiarism detection and prevention measures"
                },
                {
                  date: "November 30, 2023",
                  title: "Safety Protocol Enhancement",
                  description: "Revised emergency response procedures"
                }
              ].map((update, index) => (
                <div key={index} className="relative pl-10 md:pl-0 md:flex md:items-center">
                  <div className="md:flex-1 md:pr-8 md:text-right">
                    <h3 className="text-xl font-semibold text-gray-800">{update.title}</h3>
                    <p className="text-gray-600 mt-2">{update.description}</p>
                    <span className="text-sm text-green-600 font-medium mt-1 block">{update.date}</span>
                  </div>
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="md:flex-1 md:pl-8 mt-4 md:mt-0">
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                      View Changes
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Policy Compliance</h2>
              <p className="text-lg mb-6">
                All members of our school community are expected to familiarize themselves with and adhere to our policies.
                Understanding these guidelines helps maintain a positive and productive learning environment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <p>All policies are reviewed annually by the school board</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <p>Parents and students sign policy acknowledgment forms each academic year</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                  <p>Staff receive regular training on policy implementation and updates</p>
                </div>
              </div>
              
              <button className="mt-8 bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                Download Compliance Form
                <Download className="inline ml-2 h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-yellow-300" />
                Need Policy Clarification?
              </h3>
              <p className="mb-6">
                If you have questions about any school policy or need further explanation, 
                our administrative team is here to help.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Contact Information:</h4>
                  <p>Email: policies@stcolumbas.edu.in</p>
                  <p>Phone: 011-2336-3462 (Ext. 125)</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Policy Coordinator:</h4>
                  <p>Mrs. Priya Sharma</p>
                  <p>Available: Monday-Friday, 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchoolPolicyPage;