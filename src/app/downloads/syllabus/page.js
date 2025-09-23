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
  BookMarked
} from 'lucide-react';

const DownloadSyllabusPage = () => {
  const [activeLevel, setActiveLevel] = useState('all');
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('grade');

  const gradeLevels = [
    { id: 'all', name: 'All Levels', icon: Users },
    { id: 'primary', name: 'Primary (I-V)', icon: BookOpen },
    { id: 'middle', name: 'Middle (VI-VIII)', icon: BookText },
    { id: 'secondary', name: 'Secondary (IX-X)', icon: GraduationCap },
    { id: 'senior', name: 'Senior (XI-XII)', icon: BookMarked }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'english', name: 'English' },
    { id: 'math', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'social', name: 'Social Studies' },
    { id: 'hindi', name: 'Hindi' },
    { id: 'computer', name: 'Computer Science' },
    { id: 'arts', name: 'Arts Education' },
    { id: 'pe', name: 'Physical Education' }
  ];

  const syllabusMaterials = [
    {
      id: 1,
      title: "Class I Complete Syllabus",
      grade: "primary",
      subject: "all",
      description: "Complete curriculum for Class I including all subjects",
      format: "PDF",
      size: "3.2 MB",
      downloads: 987,
      updated: "2024-01-15",
      academicYear: "2024-2025",
      pages: 45,
      icon: FileText
    },
    {
      id: 2,
      title: "Class VI Mathematics Syllabus",
      grade: "middle",
      subject: "math",
      description: "Mathematics curriculum for Class VI with chapter details",
      format: "PDF",
      size: "2.8 MB",
      downloads: 765,
      updated: "2024-01-20",
      academicYear: "2024-2025",
      pages: 32,
      icon: FileDigit
    },
    {
      id: 3,
      title: "Class IX Science Syllabus",
      grade: "secondary",
      subject: "science",
      description: "Science curriculum for Class IX (Physics, Chemistry, Biology)",
      format: "PDF",
      size: "4.1 MB",
      downloads: 1123,
      updated: "2024-02-05",
      academicYear: "2024-2025",
      pages: 56,
      icon: FileCheck
    },
    {
      id: 4,
      title: "Class XI Physics Syllabus",
      grade: "senior",
      subject: "science",
      description: "Physics curriculum for Class XI with practical details",
      format: "PDF",
      size: "3.7 MB",
      downloads: 876,
      updated: "2024-02-10",
      academicYear: "2024-2025",
      pages: 48,
      icon: FileText
    },
    {
      id: 5,
      title: "Class III English Syllabus",
      grade: "primary",
      subject: "english",
      description: "English language curriculum for Class III",
      format: "PDF",
      size: "2.3 MB",
      downloads: 654,
      updated: "2024-01-25",
      academicYear: "2024-2025",
      pages: 28,
      icon: FileText
    },
    {
      id: 6,
      title: "Class VIII Social Studies Syllabus",
      grade: "middle",
      subject: "social",
      description: "Social Studies curriculum for Class VIII",
      format: "PDF",
      size: "3.5 MB",
      downloads: 543,
      updated: "2024-02-08",
      academicYear: "2024-2025",
      pages: 38,
      icon: FileText
    },
    {
      id: 7,
      title: "Class X Mathematics Syllabus",
      grade: "secondary",
      subject: "math",
      description: "Mathematics curriculum for Class X (Basic and Standard)",
      format: "PDF",
      size: "4.2 MB",
      downloads: 1342,
      updated: "2024-02-15",
      academicYear: "2024-2025",
      pages: 62,
      icon: FileDigit
    },
    {
      id: 8,
      title: "Class XII Computer Science Syllabus",
      grade: "senior",
      subject: "computer",
      description: "Computer Science curriculum for Class XII with Python programming",
      format: "PDF",
      size: "3.9 MB",
      downloads: 765,
      updated: "2024-02-18",
      academicYear: "2024-2025",
      pages: 52,
      icon: FileCheck
    },
    {
      id: 9,
      title: "Class II Hindi Syllabus",
      grade: "primary",
      subject: "hindi",
      description: "Hindi language curriculum for Class II",
      format: "PDF",
      size: "2.1 MB",
      downloads: 432,
      updated: "2024-01-30",
      academicYear: "2024-2025",
      pages: 26,
      icon: FileText
    },
    {
      id: 10,
      title: "Class VII Science Syllabus",
      grade: "middle",
      subject: "science",
      description: "Science curriculum for Class VII",
      format: "PDF",
      size: "3.3 MB",
      downloads: 678,
      updated: "2024-02-12",
      academicYear: "2024-2025",
      pages: 42,
      icon: FileCheck
    },
    {
      id: 11,
      title: "Class X English Syllabus",
      grade: "secondary",
      subject: "english",
      description: "English language and literature curriculum for Class X",
      format: "PDF",
      size: "3.6 MB",
      downloads: 987,
      updated: "2024-02-20",
      academicYear: "2024-2025",
      pages: 47,
      icon: FileText
    },
    {
      id: 12,
      title: "Class XII Economics Syllabus",
      grade: "senior",
      subject: "social",
      description: "Economics curriculum for Class XII",
      format: "PDF",
      size: "3.8 MB",
      downloads: 654,
      updated: "2024-02-22",
      academicYear: "2024-2025",
      pages: 51,
      icon: FileText
    }
  ];

  const popularDownloads = [
    { id: 7, title: "Class X Mathematics Syllabus", downloads: 1342 },
    { id: 3, title: "Class IX Science Syllabus", downloads: 1123 },
    { id: 1, title: "Class I Complete Syllabus", downloads: 987 },
    { id: 11, title: "Class X English Syllabus", downloads: 987 },
    { id: 4, title: "Class XI Physics Syllabus", downloads: 876 }
  ];

  const filteredSyllabus = syllabusMaterials
    .filter(material => 
      (activeLevel === 'all' || material.grade === activeLevel) &&
      (activeSubject === 'all' || material.subject === activeSubject) &&
      (searchQuery === '' || material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       material.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
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
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
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

  const getSubjectDisplayName = (subject) => {
    return subjects.find(s => s.id === subject)?.name || subject;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Download Syllabus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Download Syllabus</h1>
            <p className="text-xl mb-6 text-gray-200">
              Access complete curriculum materials for all grades and subjects
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for syllabus, subjects, or grades..."
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Levels</h3>
                <div className="space-y-2">
                  {gradeLevels.map(level => {
                    const IconComponent = level.icon;
                    return (
                      <button
                        key={level.id}
                        onClick={() => setActiveLevel(level.id)}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${
                          activeLevel === level.id
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-5 w-5 mr-3" />
                        <span>{level.name}</span>
                      </button>
                    );
                  })}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Subjects</h3>
                <div className="space-y-2">
                  {subjects.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => setActiveSubject(subject.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        activeSubject === subject.id
                          ? 'bg-green-100 text-green-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {subject.name}
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

                {/* Academic Calendar */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Academic Year 2024-2025</h4>
                  <p className="text-sm text-blue-700 mb-3">All syllabus materials are for the current academic year</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    View Academic Calendar <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content - Syllabus List */}
            <div className="lg:w-3/4">
              {/* Header with Sort Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {activeLevel === 'all' ? 'All Syllabus Materials' : gradeLevels.find(l => l.id === activeLevel)?.name}
                    {activeSubject !== 'all' && ` - ${getSubjectDisplayName(activeSubject)}`}
                  </h2>
                  <p className="text-gray-600">
                    {filteredSyllabus.length} {filteredSyllabus.length === 1 ? 'syllabus' : 'syllabus materials'} found
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="grade">Grade Level</option>
                      <option value="downloads">Most Popular</option>
                      <option value="recent">Recently Updated</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Syllabus Grid */}
              {filteredSyllabus.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSyllabus.map(material => {
                    const IconComponent = material.icon;
                    return (
                      <div key={material.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-green-100 rounded-lg p-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                            {material.format}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{material.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Grade:</span>
                            <span className="ml-2">{getGradeDisplayName(material.grade)}</span>
                          </div>
                          <div>
                            <span className="font-medium">Subject:</span>
                            <span className="ml-2">{getSubjectDisplayName(material.subject)}</span>
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No syllabus materials found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No syllabus materials match your search for "${searchQuery}". Try different keywords.`
                      : `No syllabus materials available for the selected filters.`}
                  </p>
                  {(searchQuery || activeLevel !== 'all' || activeSubject !== 'all') && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveLevel('all');
                        setActiveSubject('all');
                      }}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {/* Load More Button (if needed) */}
              {filteredSyllabus.length > 0 && filteredSyllabus.length % 8 === 0 && (
                <div className="flex justify-center mt-12">
                  <button className="bg-white border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    Load More Materials
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Related Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Academic Calendar</h3>
              <p className="text-gray-600 text-sm mb-4">Important dates, exams, and holiday schedule for the academic year</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="bg-green-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Textbook List</h3>
              <p className="text-gray-600 text-sm mb-4">Recommended textbooks and reference materials for all classes</p>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                Download List <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="bg-purple-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Teacher Support</h3>
              <p className="text-gray-600 text-sm mb-4">Resources and guides for teachers implementing the curriculum</p>
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                Access Resources <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help With Curriculum Materials?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our academic department for assistance with syllabus materials or curriculum questions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Academic Department
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Request Additional Materials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadSyllabusPage;