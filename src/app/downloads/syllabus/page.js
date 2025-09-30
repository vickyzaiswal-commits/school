"use client";
import React, { useState } from 'react';
import { 
  Download,
  Search,
  Filter,
  BookOpen,
  BookText,
  Calendar,
  FileText,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  FileCheck,
  FileDigit,
  FileQuestion,
  GraduationCap,
  BookMarked,
  Award
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const downloadSyllabusData = {
  hero: {
    show: true,
    title: "Download Syllabus 2024-2025",
    subtitle: "Access complete curriculum details for all classes",
    buttonText: "Browse Syllabus",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Download Syllabus"
  },
  benefits: {
    show: true,
    title: "Why Download Our Syllabus",
    subtitle: "Comprehensive curriculum designed for holistic development",
    items: [
      {
        icon: "BookOpen",
        title: "Detailed Coverage",
        description: "Chapter-wise breakdown with learning objectives",
        show: true
      },
      {
        icon: "Calendar",
        title: "Academic Planning",
        description: "Helps in effective study planning",
        show: true
      },
      {
        icon: "Users",
        title: "Parent Support",
        description: "Enables better parental guidance",
        show: true
      },
      {
        icon: "Award",
        title: "Exam Preparation",
        description: "Aligned with examination patterns",
        show: true
      }
    ]
  },
  levels: {
    show: ({ activeLevel }) => activeLevel !== 'all',
    items: [
      { id: 'all', name: 'All Classes', icon: "Users", show: true },
      { id: 'primary', name: 'Primary (I-V)', icon: "BookOpen", show: true },
      { id: 'middle', name: 'Middle (VI-VIII)', icon: "BookText", show: true },
      { id: 'secondary', name: 'Secondary (IX-X)', icon: "GraduationCap", show: true },
      { id: 'senior', name: 'Senior (XI-XII)', icon: "BookMarked", show: true }
    ]
  },
  popular: {
    show: true,
    title: "Popular Downloads",
    items: [
      { id: 7, title: "Class X Complete Syllabus", downloads: 1342, show: true },
      { id: 3, title: "Class IX Complete Syllabus", downloads: 1123, show: true },
      { id: 1, title: "Class I Complete Syllabus", downloads: 987, show: true },
      { id: 11, title: "Class II Complete Syllabus", downloads: 987, show: true },
      { id: 4, title: "Class XI Complete Syllabus", downloads: 876, show: true }
    ]
  },
  syllabus: {
    show: true,
    title: "Available Syllabus Materials",
    noResultsTitle: "No syllabus materials found",
    noResultsSubtitle: "Try different filters or search terms",
    clearFiltersText: "Clear all filters",
    loadMoreText: "Load More Materials",
    items: [
      {
        id: 1,
        title: "Class I Complete Syllabus",
        grade: "primary",
        description: "Complete curriculum for Class I including all subjects",
        format: "PDF",
        size: "3.2 MB",
        downloads: 987,
        updated: "2024-01-15",
        academicYear: "2024-2025",
        pages: 45,
        icon: "FileText",
        show: true
      },
      {
        id: 2,
        title: "Class II Complete Syllabus",
        grade: "primary",
        description: "Complete curriculum for Class II including all subjects",
        format: "PDF",
        size: "3.0 MB",
        downloads: 950,
        updated: "2024-01-20",
        academicYear: "2024-2025",
        pages: 42,
        icon: "FileText",
        show: true
      },
      {
        id: 3,
        title: "Class III Complete Syllabus",
        grade: "primary",
        description: "Complete curriculum for Class III including all subjects",
        format: "PDF",
        size: "3.5 MB",
        downloads: 900,
        updated: "2024-01-25",
        academicYear: "2024-2025",
        pages: 48,
        icon: "FileText",
        show: true
      },
      {
        id: 4,
        title: "Class IV Complete Syllabus",
        grade: "primary",
        description: "Complete curriculum for Class IV including all subjects",
        format: "PDF",
        size: "3.7 MB",
        downloads: 850,
        updated: "2024-01-30",
        academicYear: "2024-2025",
        pages: 50,
        icon: "FileText",
        show: true
      },
      {
        id: 5,
        title: "Class V Complete Syllabus",
        grade: "primary",
        description: "Complete curriculum for Class V including all subjects",
        format: "PDF",
        size: "3.9 MB",
        downloads: 800,
        updated: "2024-02-05",
        academicYear: "2024-2025",
        pages: 52,
        icon: "FileText",
        show: true
      },
      {
        id: 6,
        title: "Class VI Complete Syllabus",
        grade: "middle",
        description: "Complete curriculum for Class VI including all subjects",
        format: "PDF",
        size: "4.0 MB",
        downloads: 750,
        updated: "2024-02-08",
        academicYear: "2024-2025",
        pages: 55,
        icon: "FileText",
        show: true
      },
      {
        id: 7,
        title: "Class VII Complete Syllabus",
        grade: "middle",
        description: "Complete curriculum for Class VII including all subjects",
        format: "PDF",
        size: "4.2 MB",
        downloads: 700,
        updated: "2024-02-10",
        academicYear: "2024-2025",
        pages: 58,
        icon: "FileText",
        show: true
      },
      {
        id: 8,
        title: "Class VIII Complete Syllabus",
        grade: "middle",
        description: "Complete curriculum for Class VIII including all subjects",
        format: "PDF",
        size: "4.3 MB",
        downloads: 680,
        updated: "2024-02-12",
        academicYear: "2024-2025",
        pages: 60,
        icon: "FileText",
        show: true
      },
      {
        id: 9,
        title: "Class IX Complete Syllabus",
        grade: "secondary",
        description: "Complete curriculum for Class IX including all subjects",
        format: "PDF",
        size: "4.5 MB",
        downloads: 1123,
        updated: "2024-02-15",
        academicYear: "2024-2025",
        pages: 65,
        icon: "FileText",
        show: true
      },
      {
        id: 10,
        title: "Class X Complete Syllabus",
        grade: "secondary",
        description: "Complete curriculum for Class X including all subjects",
        format: "PDF",
        size: "4.7 MB",
        downloads: 1342,
        updated: "2024-02-18",
        academicYear: "2024-2025",
        pages: 70,
        icon: "FileText",
        show: true
      },
      {
        id: 11,
        title: "Class XI Complete Syllabus",
        grade: "senior",
        description: "Complete curriculum for Class XI including all subjects",
        format: "PDF",
        size: "5.0 MB",
        downloads: 876,
        updated: "2024-02-20",
        academicYear: "2024-2025",
        pages: 75,
        icon: "FileText",
        show: true
      },
      {
        id: 12,
        title: "Class XII Complete Syllabus",
        grade: "senior",
        description: "Complete curriculum for Class XII including all subjects",
        format: "PDF",
        size: "5.2 MB",
        downloads: 850,
        updated: "2024-02-22",
        academicYear: "2024-2025",
        pages: 80,
        icon: "FileText",
        show: true
      }
    ]
  },
  resources: {
    show: true,
    title: "Related Resources",
    items: [
      {
        title: "Academic Calendar",
        description: "Important dates, exams, and holiday schedule for the academic year",
        icon: "Calendar",
        buttonText: "View Calendar",
        show: true
      },
      {
        title: "Textbook List",
        description: "Recommended textbooks and reference materials for all classes",
        icon: "BookOpen",
        buttonText: "Download List",
        show: true
      },
      {
        title: "Teacher Support",
        description: "Resources and guides for teachers implementing the curriculum",
        icon: "Users",
        buttonText: "Access Resources",
        show: true
      }
    ]
  },
  cta: {
    show: true,
    title: "Need Help With Curriculum Materials?",
    subtitle: "Contact our academic department for assistance with syllabus materials or curriculum questions",
    buttons: [
      { text: "Contact Academic Department", style: "primary", show: true },
      { text: "Request Additional Materials", style: "secondary", show: true }
    ]
  }
};

// Map string icon names to Lucide React components
const iconMap = {
  Download,
  Search,
  Filter,
  BookOpen,
  BookText,
  Calendar,
  FileText,
  Users,
  Clock,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  FileCheck,
  FileDigit,
  FileQuestion,
  GraduationCap,
  BookMarked,
  Award
};

const DownloadSyllabusPage = () => {
  const [activeLevel, setActiveLevel] = useState(downloadSyllabusData.levels.items.find(l => l.show !== false)?.id || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('grade');

  const filteredSyllabus = downloadSyllabusData.syllabus.items
    .filter(material => material.show !== false)
    .filter(material => activeLevel === 'all' || material.grade === activeLevel)
    .filter(material => searchQuery === '' || material.title.toLowerCase().includes(searchQuery.toLowerCase()) || material.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'grade') {
        const gradeOrder = { primary: 1, middle: 2, secondary: 3, senior: 4 };
        return gradeOrder[a.grade] - gradeOrder[b.grade] || a.title.localeCompare(b.title);
      }
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'recent') return new Date(b.updated) - new Date(a.updated);
      return 0;
    });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatDownloadCount = (count) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count;
  };

  const getGradeDisplayName = (grade) => {
    const gradeNames = {
      primary: 'Primary (I-V)',
      middle: 'Middle (VI-VIII)',
      secondary: 'Secondary (IX-X)',
      senior: 'Senior (XI-XII)'
    };
    return gradeNames[grade] || grade;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {downloadSyllabusData.hero.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src={downloadSyllabusData.hero.image}
            alt={downloadSyllabusData.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{downloadSyllabusData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{downloadSyllabusData.hero.subtitle}</p>
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>{downloadSyllabusData.hero.buttonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {downloadSyllabusData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{downloadSyllabusData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{downloadSyllabusData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {downloadSyllabusData.benefits.items.filter(item => item.show !== false).map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      {IconComponent ? (
                        <IconComponent className="h-6 w-6 text-green-600" />
                      ) : (
                        <FileText className="h-6 w-6 text-green-600" />
                      )}
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
      {downloadSyllabusData.syllabus.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Classes</h3>
                  <div className="space-y-2">
                    {downloadSyllabusData.levels.items.filter(level => level.show !== false).map(level => {
                      const IconComponent = iconMap[level.icon];
                      return (
                        <button
                          key={level.id}
                          onClick={() => setActiveLevel(level.id)}
                          className={`w-full flex items-center p-3 rounded-lg transition-all ${
                            activeLevel === level.id ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <IconComponent className="h-5 w-5 mr-3" />
                          {level.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{downloadSyllabusData.syllabus.title}</h2>
                    <p className="text-lg text-gray-600">{filteredSyllabus.length} materials found</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative max-w-md w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search syllabus materials..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="grade">Sort by Class</option>
                        <option value="downloads">Most Downloaded</option>
                        <option value="recent">Recently Updated</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {filteredSyllabus.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredSyllabus.map(material => {
                      const IconComponent = iconMap[material.icon];
                      return (
                        <div key={material.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="bg-green-100 rounded-lg p-3">
                              {IconComponent ? (
                                <IconComponent className="h-6 w-6 text-green-600" />
                              ) : (
                                <FileText className="h-6 w-6 text-green-600" />
                              )}
                            </div>
                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                              {material.format}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{material.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                            <div>
                              <span className="font-medium">Class:</span>
                              <span className="ml-2">{getGradeDisplayName(material.grade)}</span>
                            </div>
                            <div>
                              <span className="font-medium">Academic Year:</span>
                              <span className="ml-2">{material.academicYear}</span>
                            </div>
                            <div>
                              <span className="font-medium">Pages:</span>
                              <span className="ml-2">{material.pages}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>{material.size}</span>
                            <span>Updated {formatDate(material.updated)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-sm text-gray-600">
                              <Download className="h-4 w-4 mr-1" />
                              {formatDownloadCount(material.downloads)} downloads
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{downloadSyllabusData.syllabus.noResultsTitle}</h3>
                    <p className="text-gray-600 mb-4">{downloadSyllabusData.syllabus.noResultsSubtitle}</p>
                    {(searchQuery || activeLevel !== 'all') && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveLevel('all');
                        }}
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        {downloadSyllabusData.syllabus.clearFiltersText}
                      </button>
                    )}
                  </div>
                )}

                {filteredSyllabus.length > 0 && filteredSyllabus.length % 8 === 0 && (
                  <div className="flex justify-center mt-12">
                    <button className="bg-white border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                      {downloadSyllabusData.syllabus.loadMoreText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      {downloadSyllabusData.resources.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">{downloadSyllabusData.resources.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {downloadSyllabusData.resources.items.filter(res => res.show !== false).map((resource, index) => {
                const IconComponent = iconMap[resource.icon];
                const color = ['blue', 'green', 'purple'][index % 3];
                return (
                  <div key={index} className={`bg-${color}-50 rounded-lg p-6`}>
                    <div className={`bg-${color}-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                      {IconComponent ? (
                        <IconComponent className={`h-6 w-6 text-${color}-600`} />
                      ) : (
                        <FileText className={`h-6 w-6 text-${color}-600`} />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <button className={`text-${color}-600 hover:text-${color}-800 text-sm font-medium flex items-center`}>
                      {resource.buttonText} <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {downloadSyllabusData.cta.show && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{downloadSyllabusData.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{downloadSyllabusData.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {downloadSyllabusData.cta.buttons.filter(button => button.show !== false).map((button, index) => (
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

export default DownloadSyllabusPage;