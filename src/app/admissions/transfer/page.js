"use client";
import React, { useState } from 'react';
import { 
  FileText,
  Download,
  Upload,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  User,
  Calendar,
  BookOpen,
  GraduationCap,
  Shield,
  Building,
  MapPin,
  IndianRupee,
  HelpCircle,
  FileCheck,
  FileSearch,
  Printer
} from 'lucide-react';

const TransferCertificatePage = () => {
  const [activeTab, setActiveTab] = useState('procedure');
  const [openFaq, setOpenFaq] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const tabs = [
    { id: 'procedure', name: 'Application Procedure', icon: FileText },
    { id: 'requirements', name: 'Requirements', icon: FileCheck },
    { id: 'track', name: 'Track Application', icon: FileSearch },
    { id: 'download', name: 'Download TC', icon: Download }
  ];

  const procedureSteps = [
    {
      step: 1,
      title: "Submit Application Form",
      description: "Complete the TC application form with all required details",
      time: "1-2 days",
      documents: ["Completed application form", "Student details"],
      important: "Form must be signed by both parents/guardians"
    },
    {
      step: 2,
      title: "Clear Dues",
      description: "Clear all outstanding fees and library dues",
      time: "1 day",
      documents: ["Fee clearance certificate", "Library clearance"],
      important: "No TC will be issued pending dues clearance"
    },
    {
      step: 3,
      title: "Submit Required Documents",
      description: "Provide all necessary supporting documents",
      time: "1 day",
      documents: ["ID proof", "Address proof", "Previous TC (if applicable)"],
      important: "All documents must be self-attested"
    },
    {
      step: 4,
      title: "Verification Process",
      description: "School administration verifies application and documents",
      time: "3-5 working days",
      documents: ["Application verification", "Document validation"],
      important: "Processing time may vary during peak periods"
    },
    {
      step: 5,
      title: "TC Issuance",
      description: "Collect the Transfer Certificate from school office",
      time: "1 day",
      documents: ["Identity proof", "Application receipt"],
      important: "TC must be collected by parent/guardian with valid ID"
    }
  ];

  const requirements = [
    {
      category: "Mandatory Documents",
      items: [
        "Completed TC application form (available at school office)",
        "Original fee receipt of current academic year",
        "Copy of student's Aadhaar card",
        "Copy of parent's Aadhaar card",
        "Two passport-size photographs of student"
      ]
    },
    {
      category: "Additional Documents (If Applicable)",
      items: [
        "Copy of previous Transfer Certificate",
        "Proof of address change (if applicable)",
        "Parent transfer proof (if relocation due to job transfer)",
        "Medical certificate (if withdrawal due to health reasons)"
      ]
    },
    {
      category: "Clearance Certificates",
      items: [
        "Library clearance certificate (no pending books)",
        "Laboratory clearance (science students)",
        "Sports equipment clearance (if applicable)",
        "No dues certificate from accounts department"
      ]
    }
  ];

  const feeStructure = [
    {
      type: "TC Processing Fee",
      amount: "₹500",
      description: "Non-refundable processing charge",
      timing: "Payable at time of application"
    },
    {
      type: "Late Application Fee",
      amount: "₹200",
      description: "For applications submitted after academic year ends",
      timing: "Additional charge"
    },
    {
      type: "Duplicate TC Fee",
      amount: "₹1000",
      description: "For lost/damaged TC re-issuance",
      timing: "Payable for duplicate copy"
    }
  ];

  const processingTime = [
    {
      period: "During Academic Year",
      duration: "7-10 working days",
      conditions: "Regular processing time"
    },
    {
      period: "End of Academic Year",
      duration: "15-20 working days",
      conditions: "High volume period - delayed processing"
    },
    {
      period: "Urgent Processing",
      duration: "3-5 working days",
      conditions: "50% extra charges apply - subject to approval"
    }
  ];

  const faqs = [
    {
      question: "How long is the Transfer Certificate valid?",
      answer: "The Transfer Certificate is valid for admission purposes for 6 months from the date of issue. After this period, you may need to get it revalidated from the school."
    },
    {
      question: "Can someone else collect the TC on behalf of parents?",
      answer: "Yes, but they need an authorization letter from parents, their identity proof, and the original application receipt."
    },
    {
      question: "What if I lose my Transfer Certificate?",
      answer: "You can apply for a duplicate TC by submitting a written application, police complaint copy, and paying the duplicate fee of ₹1000."
    },
    {
      question: "Is TC required for switching between CBSE schools?",
      answer: "Yes, Transfer Certificate is mandatory for admission to any new school, regardless of the education board."
    },
    {
      question: "Can I apply for TC online?",
      answer: "Currently, the application process requires physical submission of documents, but you can download the form from our website and submit it in person."
    },
    {
      question: "What if there are errors in the issued TC?",
      answer: "Immediately bring it to the school office for correction. Minor corrections are done free of charge if reported within 7 days."
    }
  ];

  const trackApplication = () => {
    // Simulate tracking functionality
    if (applicationId) {
      const statuses = ['Under Review', 'Documents Verified', 'Fee Cleared', 'Ready for Collection', 'Dispatched'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setApplicationStatus(randomStatus);
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'Under Review':
        return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Under Review</span>;
      case 'Documents Verified':
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Documents Verified</span>;
      case 'Fee Cleared':
        return <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Fee Cleared</span>;
      case 'Ready for Collection':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Ready for Collection</span>;
      case 'Dispatched':
        return <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Dispatched</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Transfer Certificate</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Application process, requirements, and tracking for school transfer certificates
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
              <h3 className="font-semibold text-gray-800">Download Form</h3>
              <p className="text-sm text-gray-600">TC application form PDF</p>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
            <FileSearch className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Track Application</h3>
              <p className="text-sm text-gray-600">Check your TC status</p>
            </div>
          </button>

          <button className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex items-center">
            <HelpCircle className="h-6 w-6 text-green-600 mr-3" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Get Help</h3>
              <p className="text-sm text-gray-600">Contact support</p>
            </div>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Procedure Tab */}
        {activeTab === 'procedure' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">TC Application Procedure</h2>
              
              <div className="space-y-6">
                {procedureSteps.map((step, index) => (
                  <div key={step.step} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      {index < procedureSteps.length - 1 && (
                        <div className="w-0.5 h-16 bg-green-200 my-1"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.time}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-700 mb-2">Required:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {step.documents.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-yellow-700">{step.important}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing Time */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Processing Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {processingTime.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">{item.period}</h4>
                    <div className="text-green-600 font-bold text-lg mb-2">{item.duration}</div>
                    <p className="text-sm text-gray-600">{item.conditions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Requirements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {requirements.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FileCheck className="h-5 w-5 text-green-600 mr-2" />
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Fee Structure */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Fee Structure</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Fee Type</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">Description</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-800">When to Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeStructure.map((fee, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-medium text-gray-800">{fee.type}</td>
                          <td className="px-4 py-3 text-green-600 font-semibold">{fee.amount}</td>
                          <td className="px-4 py-3 text-gray-700">{fee.description}</td>
                          <td className="px-4 py-3 text-gray-700">{fee.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Track Application Tab */}
        {activeTab === 'track' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Track Your TC Application</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Check Status</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your application ID"
                      value={applicationId}
                      onChange={(e) => setApplicationId(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Find your application ID on the receipt provided during submission
                    </p>
                  </div>
                  
                  <button
                    onClick={trackApplication}
                    disabled={!applicationId}
                    className={`w-full bg-green-600 text-white py-2 rounded-lg font-medium transition-colors ${
                      !applicationId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                  >
                    Track Application
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Status</h3>
                {applicationStatus ? (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="mb-4">
                      {renderStatus(applicationStatus)}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Your application <span className="font-mono bg-gray-100 px-2 py-1 rounded">{applicationId}</span> is currently:
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mb-4">{applicationStatus}</p>
                    
                    {applicationStatus === 'Ready for Collection' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-green-700">
                          Your TC is ready for collection. Please visit the school office with your ID proof and application receipt.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <FileSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Enter your application ID to check status</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Email Support</p>
                    <p className="text-sm text-gray-600">office@stcolumbas.edu.in</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Phone Support</p>
                    <p className="text-sm text-gray-600">011-2336-3462 (Ext. 115)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Tab */}
        {activeTab === 'download' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">TC Application Form</h3>
                <p className="text-gray-600 mb-4">Download the application form for transfer certificate</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Download PDF
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 text-center">
                <FileCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Checklist</h3>
                <p className="text-gray-600 mb-4">Document checklist for TC application</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                  Download Checklist
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Please print the form on A4 size paper only</li>
                <li>• Fill the form in capital letters using blue/black ink</li>
                <li>• Do not staple or pin any documents to the form</li>
                <li>• Submit the completed form along with required documents</li>
                <li>• Keep a copy of the submitted form for your reference</li>
              </ul>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-green-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">TC Office Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Monday - Friday: 9:00 AM - 4:00 PM</p>
                <p>Saturday: 9:00 AM - 12:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Email: tc@stcolumbas.edu.in</p>
                <p>Phone: 011-2336-3462 (Ext. 115)</p>
                <p>Address: Accounts Office, St. Columba's School, 1 Ashok Place, New Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCertificatePage;