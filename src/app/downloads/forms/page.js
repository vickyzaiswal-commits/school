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

// JSON data structure (to be replaced with database data)
const downloadFormsData = {
  hero: {
    show: true,
    title: "Download Forms 2024-2025",
    subtitle: "Access all school forms, applications, and documents in one place",
    buttonText: "Browse Categories",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Download Forms"
  },
  benefits: {
    show: true,
    title: "Why Use Our Forms Portal",
    subtitle: "Streamlined access to all necessary documents for students, parents, and staff",
    items: [
      {
        icon: "FileText",
        title: "Easy Access",
        description: "Download forms anytime, anywhere",
        show: true
      },
      {
        icon: "Download",
        title: "Multiple Formats",
        description: "Available in PDF, DOCX, and more",
        show: true
      },
      {
        icon: "Clock",
        title: "Up-to-Date",
        description: "Always the latest versions",
        show: true
      },
      {
        icon: "Users",
        title: "For Everyone",
        description: "Forms for students, parents, and staff",
        show: true
      }
    ]
  },
  tabs: {
    show: false, // Set to false if not needed, or implement if required
    items: [] 
  },
  categories: {
    show: true,
    items: [
      { id: 'all', name: 'All Forms', icon: "FileText", count: 42, show: true },
      { id: 'admission', name: 'Admission', icon: "BookOpen", count: 8, show: true },
      { id: 'academic', name: 'Academic', icon: "Award", count: 12, show: true },
      { id: 'transport', name: 'Transport', icon: "MapPin", count: 5, show: true },
      { id: 'activities', name: 'Activities', icon: "Heart", count: 7, show: true },
      { id: 'administrative', name: 'Administrative', icon: "Users", count: 10, show: true }
    ]
  },
  forms: {
    show: true,
    title: "Available Forms",
    subtitle: "Browse and download forms",
    noResultsTitle: "No forms found",
    noResultsSubtitle: "Try different keywords or another category",
    loadMoreText: "Load More Forms",
    items: [
      {
        id: 1,
        title: "Admission Application Form",
        category: "admission",
        description: "Application form for new student admissions for the academic year 2024-2025",
        format: "PDF",
        size: "2.1 MB",
        downloads: 1245,
        updated: "2024-01-15",
        icon: "FileText",
        show: true
      },
      // Add all other forms similarly with show: true
    ]
  },
  resources: {
    show: true,
    title: "Additional Resources",
    items: [
      // Add resources as in previous
    ]
  },
  cta: {
    show: true,
    title: "Can't Find What You Need?",
    subtitle: "Request a form or get assistance from our administrative staff",
    buttons: [
      { text: "Request a Form", style: "primary", show: true },
      { text: "Contact Administration", style: "secondary", show: true }
    ]
  }
};

// Map string icon names to Lucide React components
const iconMap = {
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
};

const DownloadFormsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredForms = downloadFormsData.forms.items.filter(form => form.show !== false)
    .filter(form => activeCategory === 'all' || form.category === activeCategory)
    .filter(form => form.title.toLowerCase().includes(searchQuery.toLowerCase()) || form.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.downloads - a.downloads); // Example sort

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {downloadFormsData.hero.show && (
        <section className="relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* <img
            src={downloadFormsData.hero.image}
            alt={downloadFormsData.hero.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          /> */}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{downloadFormsData.hero.title}</h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">{downloadFormsData.hero.subtitle}</p>
              <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{downloadFormsData.hero.buttonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {downloadFormsData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{downloadFormsData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{downloadFormsData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {downloadFormsData.benefits.items.filter(item => item.show !== false).map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {downloadFormsData.categories.items.filter(cat => cat.show !== false).map(category => {
                    const IconComponent = iconMap[category.icon];
                    return (
                      <button key={category.id} onClick={() => setActiveCategory(category.id)} className="w-full flex items-center justify-between p-3 rounded-lg transition-all text-gray-700 hover:bg-gray-100">
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 mr-3" />
                          <span>{category.name}</span>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{category.count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Forms List */}
            <div className="lg:w-3/4">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{downloadFormsData.forms.title}</h3>
              <p className="text-lg text-gray-600 mb-8">{downloadFormsData.forms.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredForms.map(form => {
                  const IconComponent = iconMap[form.icon];
                  return (
                    <div key={form.id} className="bg-white rounded-lg p-5 shadow-md">
                      <IconComponent className="h-6 w-6 text-green-600 mb-3" />
                      <h4 className="font-semibold text-gray-800 mb-2">{form.title}</h4>
                      <p className="text-gray-600 text-sm">{form.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {downloadFormsData.cta.show && (
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{downloadFormsData.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{downloadFormsData.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {downloadFormsData.cta.buttons.filter(button => button.show !== false).map((button, index) => (
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

export default DownloadFormsPage;