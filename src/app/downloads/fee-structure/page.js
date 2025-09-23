"use client";
import React, { useState } from 'react';
import { 
  Download,
  Search,
  Filter,
  CreditCard,
  Calendar,
  FileText,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  FileDigit,
  FileSpreadsheet,
  BookOpen,
  Receipt,
  Banknote,
  QrCode,
  Building,
  Wallet
} from 'lucide-react';

const DownloadFeeStructurePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGrade, setActiveGrade] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  
  // Bus icon component
  const Bus = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
  const feeCategories = [
    { id: 'all', name: 'All Fee Components', icon: FileText },
    { id: 'tuition', name: 'Tuition Fees', icon: BookOpen },
    { id: 'development', name: 'Development Fees', icon: Building },
    { id: 'activities', name: 'Activity Fees', icon: Users },
    { id: 'transport', name: 'Transport Fees', icon: Bus },
    { id: 'other', name: 'Other Charges', icon: Receipt }
  ];

  const gradeLevels = [
    { id: 'all', name: 'All Grades' },
    { id: 'primary', name: 'Primary (I-V)' },
    { id: 'middle', name: 'Middle (VI-VIII)' },
    { id: 'secondary', name: 'Secondary (IX-X)' },
    { id: 'senior', name: 'Senior (XI-XII)' }
  ];

  const feeDocuments = [
    {
      id: 1,
      title: "Complete Fee Structure 2024-2025",
      category: "all",
      grade: "all",
      description: "Comprehensive fee structure for all grades including all components",
      format: "PDF",
      size: "2.8 MB",
      downloads: 1542,
      updated: "2024-03-15",
      academicYear: "2024-2025",
      pages: 24,
      icon: FileSpreadsheet
    },
    {
      id: 2,
      title: "Primary School Fee Breakdown",
      category: "tuition",
      grade: "primary",
      description: "Detailed tuition fee structure for primary classes (I to V)",
      format: "PDF",
      size: "1.5 MB",
      downloads: 876,
      updated: "2024-03-10",
      academicYear: "2024-2025",
      pages: 12,
      icon: FileDigit
    },
    {
      id: 3,
      title: "Transportation Fee Schedule",
      category: "transport",
      grade: "all",
      description: "Bus transportation fees for all routes and distance slabs",
      format: "PDF",
      size: "1.2 MB",
      downloads: 765,
      updated: "2024-03-08",
      academicYear: "2024-2025",
      pages: 8,
      icon: FileText
    },
    {
      id: 4,
      title: "Activity Fee Details",
      category: "activities",
      grade: "all",
      description: "Breakdown of activity fees for sports, arts, and cultural programs",
      format: "PDF",
      size: "1.1 MB",
      downloads: 543,
      updated: "2024-03-05",
      academicYear: "2024-2025",
      pages: 6,
      icon: FileText
    },
    {
      id: 5,
      title: "Secondary School Fee Structure",
      category: "tuition",
      grade: "secondary",
      description: "Tuition and development fees for classes IX and X",
      format: "PDF",
      size: "1.7 MB",
      downloads: 987,
      updated: "2024-03-12",
      academicYear: "2024-2025",
      pages: 14,
      icon: FileDigit
    },
    {
      id: 6,
      title: "One-Time Admission Charges",
      category: "other",
      grade: "all",
      description: "One-time admission and registration fees for new students",
      format: "PDF",
      size: "0.9 MB",
      downloads: 432,
      updated: "2024-03-01",
      academicYear: "2024-2025",
      pages: 5,
      icon: FileText
    },
    {
      id: 7,
      title: "Senior School Fee Schedule",
      category: "tuition",
      grade: "senior",
      description: "Detailed fee structure for classes XI and XII (all streams)",
      format: "PDF",
      size: "2.1 MB",
      downloads: 765,
      updated: "2024-03-18",
      academicYear: "2024-2025",
      pages: 18,
      icon: FileDigit
    },
    {
      id: 8,
      title: "Development Fund Breakdown",
      category: "development",
      grade: "all",
      description: "Infrastructure development and maintenance fund details",
      format: "PDF",
      size: "1.3 MB",
      downloads: 654,
      updated: "2024-03-07",
      academicYear: "2024-2025",
      pages: 9,
      icon: FileText
    }
  ];

  const paymentOptions = [
    {
      method: "Online Payment",
      description: "Secure online payment through parent portal",
      icon: CreditCard,
      features: ["Instant confirmation", "Multiple payment methods", "24/7 availability"]
    },
    {
      method: "Bank Transfer",
      description: "Direct transfer to school bank account",
      icon: Building,
      features: ["NEFT/RTGS/IMPS", "Bank receipt required", "2-3 business days processing"]
    },
    {
      method: "Cheque/Cash",
      description: "Payment at school accounts office",
      icon: Banknote,
      features: ["During office hours", "Receipt provided", "Exact change required for cash"]
    },
    {
      method: "UPI/QR Code",
      description: "Scan and pay using UPI apps",
      icon: QrCode,
      features: ["Instant payment", "Multiple UPI apps supported", "Transaction ID required"]
    }
  ];

  const feeInstallments = [
    {
      installment: "First Term",
      dueDate: "April 15, 2024",
      amount: "40% of annual fees",
      status: "Upcoming"
    },
    {
      installment: "Second Term",
      dueDate: "July 15, 2024",
      amount: "30% of annual fees",
      status: "Upcoming"
    },
    {
      installment: "Third Term",
      dueDate: "October 15, 2024",
      amount: "30% of annual fees",
      status: "Upcoming"
    }
  ];

  const popularDownloads = [
    { id: 1, title: "Complete Fee Structure 2024-2025", downloads: 1542 },
    { id: 2, title: "Primary School Fee Breakdown", downloads: 876 },
    { id: 5, title: "Secondary School Fee Structure", downloads: 987 },
    { id: 7, title: "Senior School Fee Schedule", downloads: 765 },
    { id: 3, title: "Transportation Fee Schedule", downloads: 765 }
  ];

  const filteredDocuments = feeDocuments
    .filter(document => 
      (activeCategory === 'all' || document.category === activeCategory) &&
      (activeGrade === 'all' || document.grade === activeGrade) &&
      (searchQuery === '' || document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       document.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDownloadCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Fee Structure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Fee Structure & Payments</h1>
            <p className="text-xl mb-6 text-gray-200">
              Access detailed fee information, payment options, and financial resources
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for fee documents, payment information..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Categories</h3>
                <div className="space-y-2">
                  {feeCategories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${
                          activeCategory === category.id
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-5 w-5 mr-3" />
                        <span>{category.name}</span>
                      </button>
                    );
                  })}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Grade Levels</h3>
                <div className="space-y-2">
                  {gradeLevels.map(grade => (
                    <button
                      key={grade.id}
                      onClick={() => setActiveGrade(grade.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeGrade === grade.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {grade.name}
                    </button>
                  ))}
                </div>

                {/* Popular Downloads */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Downloaded</h3>
                  <div className="space-y-3">
                    {popularDownloads.map((item, index) => (
                      <div key={item.id} className="flex items-start">
                        <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-600">{formatDownloadCount(item.downloads)} downloads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Fee Related Questions?</h4>
                  <p className="text-sm text-blue-700 mb-3">Contact our accounts office for fee-related queries</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    Contact Accounts Office <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content - Fee Documents */}
            <div className="lg:w-3/4">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Fee Structure Documents
                </h2>
                <p className="text-gray-600">
                  {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} found
                  {activeCategory !== 'all' && ` in ${feeCategories.find(c => c.id === activeCategory)?.name}`}
                  {activeGrade !== 'all' && ` for ${gradeLevels.find(g => g.id === activeGrade)?.name}`}
                </p>
              </div>

              {/* Fee Documents Grid */}
              {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map(document => {
                    const IconComponent = document.icon;
                    return (
                      <div key={document.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-green-100 rounded-lg p-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                            {document.format}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{document.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{document.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Academic Year:</span>
                            <span className="ml-2">{document.academicYear}</span>
                          </div>
                          <div>
                            <span className="font-medium">Pages:</span>
                            <span className="ml-2">{document.pages}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{document.size}</span>
                          <span>Updated {formatDate(document.updated)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm text-gray-600">
                            <Download className="h-4 w-4 mr-1" />
                            {formatDownloadCount(document.downloads)} downloads
                          </span>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No documents found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No fee documents match your search for "${searchQuery}". Try different keywords.`
                      : `No fee documents available for the selected filters.`}
                  </p>
                  {(searchQuery || activeCategory !== 'all' || activeGrade !== 'all') && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                        setActiveGrade('all');
                      }}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {/* Payment Information Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Options & Schedule</h2>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentOptions.map((option, index) => {
                      const IconComponent = option.icon;
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <IconComponent className="h-5 w-5 text-green-600 mr-2" />
                            <h4 className="font-medium text-gray-800">{option.method}</h4>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                          <ul className="space-y-1">
                            {option.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Payment Schedule 2024-2025</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Installment</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Due Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {feeInstallments.map((installment, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-800">{installment.installment}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{installment.dueDate}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{installment.amount}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                installment.status === 'Upcoming' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {installment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Notes</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>A late fee of 1% per month will be charged for payments made after the due date</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>Fee concessions are available for eligible students (contact accounts office)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>All fees are subject to revision as per school management guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>Keep payment receipts for future reference and verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Assistance with Fee Payment?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Our accounts office is available to help with any fee-related questions or payment issues
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Accounts Office
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Make Online Payment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadFeeStructurePage;