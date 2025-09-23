"use client";
import React, { useState } from 'react';
import { 
  Download,
  Search,
  Filter,
  FileText,
  BookOpen,
  Users,
  Calendar,
  Award,
  MapPin,
  Clock,
  Heart,
  ChevronDown,
  ExternalLink,
  ArrowRight,
  FileCheck,
  FileDigit,
  FileQuestion,
  FileSpreadsheet
} from 'lucide-react';

const DownloadFormsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const formCategories = [
    { id: 'all', name: 'All Forms', icon: FileText, count: 42 },
    { id: 'admission', name: 'Admission', icon: BookOpen, count: 8 },
    { id: 'academic', name: 'Academic', icon: Award, count: 12 },
    { id: 'transport', name: 'Transport', icon: MapPin, count: 5 },
    { id: 'activities', name: 'Activities', icon: Heart, count: 7 },
    { id: 'administrative', name: 'Administrative', icon: Users, count: 10 }
  ];

  const allForms = [
    {
      id: 1,
      title: "Admission Application Form",
      category: "admission",
      description: "Application form for new student admissions for the academic year 2024-2025",
      format: "PDF",
      size: "2.1 MB",
      downloads: 1245,
      updated: "2024-01-15",
      icon: FileText
    },
    {
      id: 2,
      title: "Transportation Registration",
      category: "transport",
      description: "Form to register for school bus transportation services",
      format: "PDF",
      size: "1.8 MB",
      downloads: 876,
      updated: "2024-02-10",
      icon: MapPin
    },
    {
      id: 3,
      title: "Medical Information Form",
      category: "administrative",
      description: "Student health information and emergency medical consent form",
      format: "DOCX",
      size: "1.2 MB",
      downloads: 987,
      updated: "2024-01-20",
      icon: FileCheck
    },
    {
      id: 4,
      title: "Extracurricular Activities Permission",
      category: "activities",
      description: "Permission form for participation in after-school activities and clubs",
      format: "PDF",
      size: "1.5 MB",
      downloads: 765,
      updated: "2024-02-05",
      icon: Heart
    },
    {
      id: 5,
      title: "Library Book Issue Form",
      category: "academic",
      description: "Form for issuing library books and reading materials",
      format: "PDF",
      size: "0.8 MB",
      downloads: 543,
      updated: "2024-01-30",
      icon: BookOpen
    },
    {
      id: 6,
      title: "Fee Payment Form",
      category: "administrative",
      description: "Form for various fee payment purposes and payment plans",
      format: "PDF",
      size: "1.3 MB",
      downloads: 1342,
      updated: "2024-02-15",
      icon: FileDigit
    },
    {
      id: 7,
      title: "Sports Participation Form",
      category: "activities",
      description: "Registration and medical consent form for sports activities",
      format: "DOCX",
      size: "1.6 MB",
      downloads: 654,
      updated: "2024-02-08",
      icon: Award
    },
    {
      id: 8,
      title: "Leave Application Form",
      category: "academic",
      description: "Form for requesting student leave of absence",
      format: "PDF",
      size: "0.9 MB",
      downloads: 1123,
      updated: "2024-01-25",
      icon: Calendar
    },
    {
      id: 9,
      title: "Scholarship Application",
      category: "admission",
      description: "Application form for various scholarship programs",
      format: "PDF",
      size: "2.3 MB",
      downloads: 765,
      updated: "2024-02-12",
      icon: Award
    },
    {
      id: 10,
      title: "Parent-Teacher Meeting Schedule",
      category: "academic",
      description: "Schedule and appointment form for parent-teacher meetings",
      format: "PDF",
      size: "1.1 MB",
      downloads: 876,
      updated: "2024-02-18",
      icon: Users
    },
    {
      id: 11,
      title: "Field Trip Permission Slip",
      category: "activities",
      description: "Permission form for educational field trips and excursions",
      format: "DOCX",
      size: "1.4 MB",
      downloads: 432,
      updated: "2024-02-14",
      icon: MapPin
    },
    {
      id: 12,
      title: "Exam Registration Form",
      category: "academic",
      description: "Form for registering for various examinations and tests",
      format: "PDF",
      size: "1.7 MB",
      downloads: 987,
      updated: "2024-02-20",
      icon: FileDigit
    }
  ];

  const popularDownloads = [
    { id: 1, title: "Admission Application Form", downloads: 1245 },
    { id: 6, title: "Fee Payment Form", downloads: 1342 },
    { id: 8, title: "Leave Application Form", downloads: 1123 },
    { id: 3, title: "Medical Information Form", downloads: 987 },
    { id: 12, title: "Exam Registration Form", downloads: 987 }
  ];

  const filteredForms = allForms
    .filter(form => 
      (activeCategory === 'all' || form.category === activeCategory) &&
      (searchQuery === '' || form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       form.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'popular') return b.downloads - a.downloads;
      if (sortBy === 'recent') return new Date(b.updated) - new Date(a.updated);
      if (sortBy === 'name') return a.title.localeCompare(b.title);
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Download Forms"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Download Forms</h1>
            <p className="text-xl mb-6 text-gray-200">
              Access all school forms, applications, and documents in one place
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for forms, applications, documents..."
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
            {/* Sidebar - Categories */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {formCategories.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          activeCategory === category.id
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 mr-3" />
                          <span>{category.name}</span>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Popular Downloads */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Downloads</h3>
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
                  <h4 className="font-semibold text-blue-800 mb-2">Need Help?</h4>
                  <p className="text-sm text-blue-700 mb-3">Having trouble finding or downloading forms?</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                    Contact Support <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content - Forms List */}
            <div className="lg:w-3/4">
              {/* Header with Sort Options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {activeCategory === 'all' ? 'All Forms' : formCategories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredForms.length} {filteredForms.length === 1 ? 'form' : 'forms'} found
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
                      <option value="popular">Most Popular</option>
                      <option value="recent">Recently Updated</option>
                      <option value="name">Alphabetical</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Forms Grid */}
              {filteredForms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredForms.map(form => {
                    const IconComponent = form.icon;
                    return (
                      <div key={form.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-green-100 rounded-lg p-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                            {form.format}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{form.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{form.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span>{form.size}</span>
                          <span>Updated {formatDate(form.updated)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-sm text-gray-600">
                            <Download className="h-4 w-4 mr-1" />
                            {formatDownloadCount(form.downloads)} downloads
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No forms found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? `No forms match your search for "${searchQuery}". Try different keywords.`
                      : `No forms available in this category.`}
                  </p>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}

              {/* Load More Button (if needed) */}
              {filteredForms.length > 0 && filteredForms.length % 8 === 0 && (
                <div className="flex justify-center mt-12">
                  <button className="bg-white border border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    Load More Forms
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
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Form Instructions</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step guides for filling out common forms and applications</p>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                View Instructions <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="bg-green-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Submission Deadlines</h3>
              <p className="text-gray-600 text-sm mb-4">Important dates and deadlines for form submissions</p>
              <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                View Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="bg-purple-100 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Support & Assistance</h3>
              <p className="text-gray-600 text-sm mb-4">Get help with form submission and technical issues</p>
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                Contact Support <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Request a form or get assistance from our administrative staff
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Request a Form
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Administration
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadFormsPage;