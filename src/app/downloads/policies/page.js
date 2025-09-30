"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Shield, 
  Users, 
  BookOpen, 
  GraduationCap, 
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
  AlertCircle,
  Clock,
  Settings
} from 'lucide-react';

const SchoolPolicyPage = ({ schoolData = {}, schoolId = 'default' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure
  const defaultData = {
    hero: {
      show: true,
      establishedYear: "1927",
      title: "School Policies & Guidelines",
      subtitle: "Comprehensive policies that ensure a safe, respectful, and productive learning environment for our school community.",
      stats: [
        { value: "6+", label: "Comprehensive Policies", show: true },
        { value: "100%", label: "Community Compliance", show: true },
        { value: "Regular", label: "Updates & Reviews", show: true }
      ],
      height: "h-96"
    },
    policies: {
      show: true,
      title: "Browse Policies",
      description: "Explore our comprehensive set of policies designed to maintain a positive learning environment.",
      items: [
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
          applicableTo: "All students and faculty",
          show: true
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
          applicableTo: "All students",
          show: true
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
          applicableTo: "All students, staff, and visitors",
          show: true
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
          applicableTo: "Prospective students and parents",
          show: true
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
          applicableTo: "All technology users",
          show: true
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
          applicableTo: "All students and staff",
          show: true
        }
      ]
    },
    principles: {
      show: true,
      title: "Our Policy Framework",
      description: "Our policies are built on foundational principles that guide every aspect of school life",
      items: [
        {
          icon: Shield,
          title: "Safety First",
          description: "Prioritizing the physical and emotional well-being of all community members",
          show: true
        },
        {
          icon: Heart,
          title: "Respect for All",
          description: "Fostering an inclusive environment where every individual is valued",
          show: true
        },
        {
          icon: Target,
          title: "Excellence in Education",
          description: "Maintaining high academic standards and supporting student achievement",
          show: true
        },
        {
          icon: Scale,
          title: "Fairness & Equity",
          description: "Ensuring just treatment and equal opportunities for everyone",
          show: true
        }
      ]
    },
    updates: {
      show: true,
      title: "Recent Policy Updates",
      description: "We regularly review and update our policies to reflect best practices",
      items: [
        {
          date: "March 15, 2024",
          title: "Anti-Bullying Policy Update",
          description: "Enhanced cyberbullying protocols and reporting mechanisms",
          show: true
        },
        {
          date: "February 28, 2024",
          title: "Digital Citizenship Policy",
          description: "New guidelines for responsible technology use",
          show: true
        },
        {
          date: "January 15, 2024",
          title: "Academic Integrity Revision",
          description: "Updated plagiarism detection and prevention measures",
          show: true
        },
        {
          date: "November 30, 2023",
          title: "Safety Protocol Enhancement",
          description: "Revised emergency response procedures",
          show: true
        }
      ]
    },
    compliance: {
      show: true,
      title: "Policy Compliance",
      description: "All members of our school community are expected to familiarize themselves with and adhere to our policies. Understanding these guidelines helps maintain a positive and productive learning environment.",
      items: [
        {
          text: "All policies are reviewed annually by the school board",
          show: true
        },
        {
          text: "Parents and students sign policy acknowledgment forms each academic year",
          show: true
        },
        {
          text: "Staff receive regular training on policy implementation and updates",
          show: true
        }
      ],
      contact: {
        title: "Need Policy Clarification?",
        description: "If you have questions about any school policy or need further explanation, our administrative team is here to help.",
        email: "policies@stcolumbas.edu.in",
        phone: "011-2336-3462 (Ext. 125)",
        coordinator: "Mrs. Priya Sharma",
        availability: "Monday-Friday, 8:00 AM - 4:00 PM",
        show: true
      }
    }
  };

  // Initialize data by merging defaultData with schoolData
  const [data, setData] = useState({ ...defaultData, ...schoolData });

  // Check role to enable edit mode
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // IntersectionObserver for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (Array.isArray(data[section])) {
      setEditData([...data[section]]);
    } else {
      setEditData({ ...data[section] });
    }
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Save changes to state
  const saveChanges = () => {
    setData({ ...data, [editSection]: editData });
    setEditFormOpen(false);
  };

  const filteredPolicies = data.policies.items.filter(policy => {
    const searchMatch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       policy.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return searchMatch && policy.show !== false;
  });

  const filteredPrinciples = data.principles.items.filter(item => item.show !== false);
  const filteredUpdates = data.updates.items.filter(item => item.show !== false);
  const filteredComplianceItems = data.compliance.items.filter(item => item.show !== false);

  const togglePolicy = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit {editSection}</h2>
              <button
                onClick={() => setEditFormOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Established Year</label>
                    <input
                      type="text"
                      value={editData.establishedYear || ''}
                      onChange={(e) => handleObjectChange('establishedYear', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea
                      value={editData.subtitle || ''}
                      onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                      type="text"
                      value={editData.height || ''}
                      onChange={(e) => handleObjectChange('height', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Hero</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Stats</h3>
                  {editData.stats && editData.stats.map((stat, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'value', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => handleNestedArrayChange('stats', index, 'label', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stat.show !== false}
                            onChange={(e) => handleNestedArrayChange('stats', index, 'show', e.target.checked)}
                          />
                          <span>Show Stat</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'policies' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Policies</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {editData.items && editData.items.map((item, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Policy {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Summary</label>
                        <textarea
                          value={item.summary || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'summary', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Content</label>
                        <textarea
                          value={item.content || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'content', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Last Updated</label>
                        <input
                          type="text"
                          value={item.lastUpdated || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'lastUpdated', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Applicable To</label>
                        <input
                          type="text"
                          value={item.applicableTo || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'applicableTo', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleNestedArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show Policy</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Add similar edit forms for other sections as needed */}
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end space-x-2">
              <button
                onClick={() => setEditFormOpen(false)}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.hero.show && (
        <section
          id="hero"
          className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Est. {data.hero.establishedYear}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{data.hero.subtitle}</p>
              <div className="flex flex-wrap gap-6">
                {data.hero.stats.filter(stat => stat.show !== false).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-sm text-green-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('hero')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Policies List */}
      {data.policies.show && (
        <section
          id="policies"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.policies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{data.policies.title}</h2>
                <p className="text-lg text-gray-600 mt-2">{data.policies.description}</p>
              </div>
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
                  <p className="text-gray-500">Try adjusting your search</p>
                </div>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('policies')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Policy Principles */}
      {data.principles.show && filteredPrinciples.length > 0 && (
        <section
          id="principles"
          className={`py-16 bg-white animate-on-scroll ${isVisible.principles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.principles.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.principles.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPrinciples.map((principle, index) => {
                const IconComponent = principle.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{principle.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('principles')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Policy Update Timeline */}
      {data.updates.show && filteredUpdates.length > 0 && (
        <section
          id="updates"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.updates ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.updates.title}</h2>
              <p className="text-lg text-gray-600">{data.updates.description}</p>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-green-200"></div>
              <div className="space-y-12">
                {filteredUpdates.map((update, index) => (
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
            {editMode && (
              <button
                onClick={() => openEditModal('updates')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Compliance Section */}
      {data.compliance.show && (
        <section
          id="compliance"
          className={`py-16 bg-gradient-to-r from-green-600 to-green-700 text-white animate-on-scroll ${isVisible.compliance ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{data.compliance.title}</h2>
                <p className="text-lg mb-6">{data.compliance.description}</p>
                <div className="space-y-4">
                  {filteredComplianceItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-300 mr-3 mt-1 flex-shrink-0" />
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-white text-green-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Download Compliance Form
                </button>
              </div>
              {data.compliance.contact.show && (
                <div className="bg-white/10 rounded-lg p-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-yellow-300" />
                    {data.compliance.contact.title}
                  </h3>
                  <p className="mb-6">{data.compliance.contact.description}</p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">Contact Information:</h4>
                      <p>Email: {data.compliance.contact.email}</p>
                      <p>Phone: {data.compliance.contact.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Policy Coordinator:</h4>
                      <p>{data.compliance.contact.coordinator}</p>
                      <p>Available: {data.compliance.contact.availability}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('compliance')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default SchoolPolicyPage;