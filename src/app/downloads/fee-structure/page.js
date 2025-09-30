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
  Wallet,
  Bus
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const downloadFeeStructureData = {
  hero: {
    show: true,
    title: "Download Fee Structure 2024-2025",
    subtitle: "Access complete fee details for all grades and categories",
    buttonText: "Browse Fee Documents",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Download Fee Structure"
  },
  benefits: {
    show: true,
    title: "Fee Structure Overview",
    subtitle: "Transparent and comprehensive fee details for your planning",
    items: [
      {
        icon: "BookOpen",
        title: "Detailed Breakdown",
        description: "Clear categorization of all fee components",
        show: true
      },
      {
        icon: "Calendar",
        title: "Payment Schedule",
        description: "Installment dates and options",
        show: true
      },
      {
        icon: "Users",
        title: "Grade-Specific",
        description: "Customized for different grade levels",
        show: true
      },
      {
        icon: "Wallet",
        title: "Multiple Options",
        description: "Various payment methods available",
        show: true
      }
    ]
  },
  categories: {
    show: true,
    items: [
      { id: 'all', name: 'All Fee Components', icon: "FileText", show: true },
      { id: 'tuition', name: 'Tuition Fees', icon: "BookOpen", show: true },
      { id: 'development', name: 'Development Fees', icon: "Building", show: true },
      { id: 'activities', name: 'Activity Fees', icon: "Users", show: true },
      { id: 'transport', name: 'Transport Fees', icon: "Bus", show: true },
      { id: 'other', name: 'Other Charges', icon: "Receipt", show: true }
    ]
  },
  grades: {
    show: true,
    items: [
      { id: 'all', name: 'All Grades', show: true },
      { id: 'primary', name: 'Primary (I-V)', show: true },
      { id: 'middle', name: 'Middle (VI-VIII)', show: true },
      { id: 'secondary', name: 'Secondary (IX-X)', show: true },
      { id: 'senior', name: 'Senior (XI-XII)', show: true }
    ]
  },
  popular: {
    show: true,
    title: "Popular Downloads",
    items: [
      { id: 1, title: "Complete Fee Structure 2024-2025", downloads: 1542, show: true },
      { id: 2, title: "Primary School Fee Breakdown", downloads: 876, show: true },
      { id: 5, title: "Secondary School Fee Structure", downloads: 987, show: true },
      { id: 7, title: "Senior School Fee Schedule", downloads: 765, show: true },
      { id: 3, title: "Transportation Fee Schedule", downloads: 765, show: true }
    ]
  },
  help: {
    show: true,
    title: "Need Help?",
    subtitle: "Having trouble finding or downloading fee documents?",
    buttonText: "Contact Support"
  },
  documents: {
    show: true,
    title: "Available Fee Documents",
    noResultsTitle: "No documents found",
    noResultsSubtitle: "Try different keywords or another category",
    clearSearchText: "Clear search",
    loadMoreText: "Load More Documents",
    items: [
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
        icon: "FileSpreadsheet",
        show: true
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
        icon: "FileDigit",
        show: true
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
        icon: "FileText",
        show: true
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
        icon: "FileText",
        show: true
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
        icon: "FileDigit",
        show: true
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
        icon: "FileText",
        show: true
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
        icon: "FileDigit",
        show: true
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
        icon: "FileText",
        show: true
      }
    ]
  },
  payment: {
    show: true,
    title: "Payment Options & Schedule",
    methods: {
      show: true,
      title: "Payment Methods",
      items: [
        {
          method: "Online Payment",
          description: "Secure online payment through parent portal",
          icon: "CreditCard",
          features: ["Instant confirmation", "Multiple payment methods", "24/7 availability"],
          show: true
        },
        {
          method: "Bank Transfer",
          description: "Direct transfer to school bank account",
          icon: "Building",
          features: ["NEFT/RTGS/IMPS", "Bank receipt required", "2-3 business days processing"],
          show: true
        },
        {
          method: "Cheque/Cash",
          description: "Payment at school accounts office",
          icon: "Banknote",
          features: ["During office hours", "Receipt provided", "Exact change required for cash"],
          show: true
        },
        {
          method: "UPI/QR Code",
          description: "Scan and pay using UPI apps",
          icon: "QrCode",
          features: ["Instant payment", "Multiple UPI apps supported", "Transaction ID required"],
          show: true
        }
      ]
    },
    schedule: {
      show: true,
      title: "Fee Payment Schedule 2024-2025",
      items: [
        {
          installment: "First Term",
          dueDate: "April 15, 2024",
          amount: "40% of annual fees",
          status: "Upcoming",
          show: true
        },
        {
          installment: "Second Term",
          dueDate: "July 15, 2024",
          amount: "30% of annual fees",
          status: "Upcoming",
          show: true
        },
        {
          installment: "Third Term",
          dueDate: "October 15, 2024",
          amount: "30% of annual fees",
          status: "Upcoming",
          show: true
        }
      ]
    }
  },
  notes: {
    show: true,
    title: "Important Notes",
    items: [
      "A late fee of 1% per month will be charged for payments made after the due date",
      "Fee concessions are available for eligible students (contact accounts office)",
      "All fees are subject to revision as per school management guidelines",
      "Keep payment receipts for future reference and verification"
    ]
  },
  cta: {
    show: true,
    title: "Need Assistance with Fee Payment?",
    subtitle: "Our accounts office is available to help with any fee-related questions or payment issues",
    buttons: [
      { text: "Contact Accounts Office", style: "primary", show: true },
      { text: "Make Online Payment", style: "secondary", show: true }
    ]
  }
};

// Map string icon names to Lucide React components
const iconMap = {
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
  Wallet,
  Bus
};

const DownloadFeeStructurePage = () => {
  const [activeCategory, setActiveCategory] = useState(downloadFeeStructureData.categories.items.find(cat => cat.show !== false)?.id || 'all');
  const [activeGrade, setActiveGrade] = useState(downloadFeeStructureData.grades.items.find(g => g.show !== false)?.id || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = downloadFeeStructureData.documents.items
    .filter(document => document.show !== false)
    .filter(document => activeCategory === 'all' || document.category === activeCategory)
    .filter(document => activeGrade === 'all' || document.grade === activeGrade)
    .filter(document => searchQuery === '' || document.title.toLowerCase().includes(searchQuery.toLowerCase()) || document.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDownloadCount = (count) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {downloadFeeStructureData.hero.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={downloadFeeStructureData.hero.image}
            alt={downloadFeeStructureData.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{downloadFeeStructureData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{downloadFeeStructureData.hero.subtitle}</p>
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>{downloadFeeStructureData.hero.buttonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {downloadFeeStructureData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{downloadFeeStructureData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{downloadFeeStructureData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {downloadFeeStructureData.benefits.items.filter(item => item.show !== false).map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-center">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      {downloadFeeStructureData.documents.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Categories</h3>
                  <div className="space-y-2 mb-8">
                    {downloadFeeStructureData.categories.items.filter(cat => cat.show !== false).map(category => {
                      const IconComponent = iconMap[category.icon];
                      return (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.id)}
                          className={`w-full flex items-center p-3 rounded-lg transition-all ${
                            activeCategory === category.id ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="h-5 w-5 mr-3" />
                          {category.name}
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Grades</h3>
                  <div className="space-y-2">
                    {downloadFeeStructureData.grades.items.filter(grade => grade.show !== false).map(grade => (
                      <button
                        key={grade.id}
                        onClick={() => setActiveGrade(grade.id)}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${
                          activeGrade === grade.id ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {grade.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{downloadFeeStructureData.documents.title}</h2>
                    <p className="text-lg text-gray-600">{filteredDocuments.length} documents found</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative max-w-md w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search fee documents..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {filteredDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDocuments.map(document => {
                      const IconComponent = iconMap[document.icon];
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
                    <FileQuestion className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{downloadFeeStructureData.documents.noResultsTitle}</h3>
                    <p className="text-gray-600 mb-4">{downloadFeeStructureData.documents.noResultsSubtitle}</p>
                    {(searchQuery || activeCategory !== 'all' || activeGrade !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveCategory('all');
                          setActiveGrade('all');
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        {downloadFeeStructureData.documents.clearSearchText}
                      </button>
                    )}
                  </div>
                )}

                {filteredDocuments.length > 0 && filteredDocuments.length % 8 === 0 && (
                  <div className="flex justify-center mt-12">
                    <button className="bg-white border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                      {downloadFeeStructureData.documents.loadMoreText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Payment Section */}
      {downloadFeeStructureData.payment.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{downloadFeeStructureData.payment.title}</h2>
            {downloadFeeStructureData.payment.methods.show && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{downloadFeeStructureData.payment.methods.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {downloadFeeStructureData.payment.methods.items.filter(method => method.show !== false).map((method, index) => {
                    const IconComponent = iconMap[method.icon];
                    return (
                      <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center mb-4">
                          <IconComponent className="h-6 w-6 text-green-600 mr-2" />
                          <h4 className="font-semibold text-gray-800">{method.method}</h4>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                        <ul className="space-y-2">
                          {method.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center text-sm text-gray-600">
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
            )}

            {downloadFeeStructureData.payment.schedule.show && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">{downloadFeeStructureData.payment.schedule.title}</h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Installment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {downloadFeeStructureData.payment.schedule.items.filter(item => item.show !== false).map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.installment}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Notes Section */}
      {downloadFeeStructureData.notes.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{downloadFeeStructureData.notes.title}</h2>
            <div className="bg-blue-50 rounded-lg p-6 max-w-3xl mx-auto">
              <ul className="space-y-4 text-gray-700">
                {downloadFeeStructureData.notes.items.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {downloadFeeStructureData.cta.show && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{downloadFeeStructureData.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{downloadFeeStructureData.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {downloadFeeStructureData.cta.buttons.filter(button => button.show !== false).map((button, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    button.style === 'primary' ? 'bg-white text-green-700 hover:bg-gray-100' : 'bg-transparent border border-white text-white hover:bg-white/10'
                  }`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DownloadFeeStructurePage;