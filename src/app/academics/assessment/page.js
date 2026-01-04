"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  FileText, 
  BarChart3, 
  Target,
  Calendar,
  Clock,
  Users,
  Award,
  TrendingUp,
  Download,
  Eye,
  BookOpen,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  PieChart,
  LineChart,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Shield,
  Star,
  Bookmark
} from 'lucide-react';

const AssessmentPage = () => {
  const [activeLevel, setActiveLevel] = useState('primary');
  const [activeTab, setActiveTab] = useState('system');
  const [openFaq, setOpenFaq] = useState(null);

  const assessmentTabs = [
    { id: 'system', name: 'Assessment System', icon: FileText },
    { id: 'grading', name: 'Grading Policy', icon: BarChart3 },
    { id: 'reports', name: 'Report Cards', icon: BookOpen },
    { id: 'support', name: 'Academic Support', icon: Users }
  ];

  const assessmentSystem = {
    primary: {
      approach: "Continuous and Comprehensive Evaluation (CCE)",
      components: [
        {
          type: "Formative Assessment",
          weightage: "40%",
          description: "Ongoing evaluation through class activities, projects, and observations",
          methods: ["Classwork", "Projects", "Oral Tests", "Quizzes", "Practical Work"]
        },
        {
          type: "Summative Assessment",
          weightage: "60%",
          description: "Term-end examinations to evaluate comprehensive understanding",
          methods: ["Written Examinations", "Term-End Tests", "Standardized Assessments"]
        }
      ],
      schedule: [
        { term: "Term I", period: "April - September", exams: "2 Formative, 1 Summative" },
        { term: "Term II", period: "October - March", exams: "2 Formative, 1 Summative" }
      ]
    },
    middle: {
      approach: "Structured Evaluation System",
      components: [
        {
          type: "Periodic Assessment",
          weightage: "20%",
          description: "Regular tests and evaluations throughout the term",
          methods: ["Unit Tests", "Class Tests", "Subject Enrichment"]
        },
        {
          type: "Notebook Submission",
          weightage: "5%",
          description: "Assessment of classwork, homework, and organization",
          methods: ["Regularity", "Neatness", "Completion"]
        },
        {
          type: "Subject Enrichment",
          weightage: "5%",
          description: "Practical and activity-based evaluation",
          methods: ["Projects", "Practical Work", "Activities"]
        },
        {
          type: "Term Examination",
          weightage: "70%",
          description: "Half-yearly and annual examinations",
          methods: ["Written Exams", "Practical Exams"]
        }
      ],
      schedule: [
        { term: "Half-Yearly", period: "September", weightage: "40%" },
        { term: "Annual", period: "February/March", weightage: "60%" }
      ]
    },
    secondary: {
      approach: "CBSE Board Pattern Preparation",
      components: [
        {
          type: "Periodic Tests",
          weightage: "10%",
          description: "Regular assessment of syllabus coverage",
          methods: ["Pen and Paper Tests", "Objective Assessments"]
        },
        {
          type: "Notebook Submission",
          weightage: "5%",
          description: "Evaluation of maintained notes and assignments",
          methods: ["Regularity", "Neatness", "Completion"]
        },
        {
          type: "Subject Enrichment",
          weightage: "5%",
          description: "Practical and activity-based learning assessment",
          methods: ["Projects", "Practical Work", "Activities"]
        },
        {
          type: "Board Examination",
          weightage: "80%",
          description: "Final CBSE board examinations",
          methods: ["Theory Papers", "Practical Examinations"]
        }
      ],
      schedule: [
        { term: "Pre-Board I", period: "November", purpose: "Board Exam Preparation" },
        { term: "Pre-Board II", period: "January", purpose: "Final Revision" },
        { term: "Board Exams", period: "February/March", purpose: "Final Assessment" }
      ]
    }
  };

  const gradingSystem = [
    {
      grade: "A1",
      range: "91-100",
      points: "10",
      description: "Outstanding"
    },
    {
      grade: "A2",
      range: "81-90",
      points: "9",
      description: "Excellent"
    },
    {
      grade: "B1",
      range: "71-80",
      points: "8",
      description: "Very Good"
    },
    {
      grade: "B2",
      range: "61-70",
      points: "7",
      description: "Good"
    },
    {
      grade: "C1",
      range: "51-60",
      points: "6",
      description: "Fair"
    },
    {
      grade: "C2",
      range: "41-50",
      points: "5",
      description: "Average"
    },
    {
      grade: "D",
      range: "33-40",
      points: "4",
      description: "Below Average"
    },
    {
      grade: "E",
      range: "0-32",
      points: "0",
      description: "Needs Improvement"
    }
  ];

  const reportCardElements = [
    {
      title: "Academic Performance",
      description: "Subject-wise grades and marks obtained",
      icon: BarChart3
    },
    {
      title: "Skill Development",
      description: "Assessment of co-scholastic skills and abilities",
      icon: Target
    },
    {
      title: "Behavioral Indicators",
      description: "Evaluation of values, attitudes, and social skills",
      icon: Users
    },
    {
      title: "Teacher Comments",
      description: "Personalized feedback and improvement suggestions",
      icon: FileText
    },
    {
      title: "Attendance Record",
      description: "Summary of attendance and punctuality",
      icon: Calendar
    },
    {
      title: "Progress Analysis",
      description: "Comparative analysis with previous performance",
      icon: TrendingUp
    }
  ];

  const academicSupport = [
    {
      program: "Remedial Classes",
      description: "Extra help for students needing additional support in specific subjects",
      schedule: "After school hours, twice weekly",
      icon: BookOpen
    },
    {
      program: "Enrichment Program",
      description: "Advanced learning opportunities for high-achieving students",
      schedule: "Weekend sessions and special workshops",
      icon: Award
    },
    {
      program: "Peer Tutoring",
      description: "Student-led tutoring and collaborative learning sessions",
      schedule: "During free periods and lunch breaks",
      icon: Users
    },
    {
      program: "Parent-Teacher Consultations",
      description: "Regular meetings to discuss student progress and strategies",
      schedule: "Monthly scheduled meetings",
      icon: GraduationCap
    }
  ];

  const faqs = [
    {
      question: "How often are assessments conducted?",
      answer: "Formative assessments are conducted continuously throughout the term, while summative assessments are held at the end of each term. The frequency varies by grade level."
    },
    {
      question: "Can parents access assessment results online?",
      answer: "Yes, parents can access assessment results, report cards, and progress reports through our secure parent portal using their login credentials."
    },
    {
      question: "What is the policy for absent students during exams?",
      answer: "Students absent during examinations must provide a medical certificate. Make-up tests may be arranged for genuine cases with prior permission."
    },
    {
      question: "How are co-scholastic areas assessed?",
      answer: "Co-scholastic areas including life skills, attitudes, values, and participation are assessed through continuous observation, rubrics, and specific assessment tasks."
    },
    {
      question: "What support is available for students struggling academically?",
      answer: "We offer remedial classes, peer tutoring, individual learning plans, and regular parent-teacher consultations to support students who need extra help."
    }
  ];

  const performanceData = [
    { subject: "Mathematics", average: 85, trend: "up" },
    { subject: "Science", average: 82, trend: "up" },
    { subject: "English", average: 88, trend: "stable" },
    { subject: "Social Studies", average: 79, trend: "up" },
    { subject: "Hindi", average: 84, trend: "stable" },
    { subject: "Computer Science", average: 91, trend: "up" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1582573618381-c9a77c31f6f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="Assessment & Evaluation"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Assessment & Evaluation</h1>
            <p className="text-xl mb-6 text-gray-200">
              Comprehensive evaluation system designed to measure holistic development and academic progress
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Assessment Policy
              <Download className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {assessmentTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
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
      </section>

      {/* Level Selection */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Select Academic Level</h2>
            <p className="text-gray-600">View assessment details specific to each academic level</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'primary', name: 'Primary School', icon: BookOpen },
              { id: 'middle', name: 'Middle School', icon: GraduationCap },
              { id: 'secondary', name: 'Secondary School', icon: Target }
            ].map((level) => {
              const IconComponent = level.icon;
              return (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                    activeLevel === level.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">{level.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Assessment System Content */}
      {activeTab === 'system' && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment System</h2>
              <p className="text-lg text-gray-600">
                {assessmentSystem[activeLevel].approach}
              </p>
            </div>

            {/* Assessment Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {assessmentSystem[activeLevel].components.map((component, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{component.type}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {component.weightage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{component.description}</p>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Assessment Methods:</h4>
                    <ul className="space-y-1">
                      {component.methods.map((method, mIndex) => (
                        <li key={mIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Assessment Schedule */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Assessment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assessmentSystem[activeLevel].schedule.map((term, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{term.term}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {term.period}
                    </div>
                    {(term.exams || term.weightage || term.purpose) && (
                      <p className="text-sm text-gray-700">
                        {term.exams || term.weightage || term.purpose}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grading Policy Content */}
      {activeTab === 'grading' && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Grading Policy</h2>
              <p className="text-lg text-gray-600">
                CBSE grading system for holistic evaluation of student performance
              </p>
            </div>

            {/* Grading Scale */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Grading Scale</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="px-4 py-2 text-left font-semibold text-gray-800">Grade</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-800">Range (%)</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-800">Points</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-800">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradingSystem.map((grade, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                        <td className="px-4 py-3 font-semibold text-gray-800">{grade.grade}</td>
                        <td className="px-4 py-3 text-gray-700">{grade.range}</td>
                        <td className="px-4 py-3 text-gray-700">{grade.points}</td>
                        <td className="px-4 py-3 text-gray-700">{grade.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Academic Performance Trends</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceData.map((subject, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-800">{subject.subject}</h4>
                      <div className="flex items-center">
                        {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {subject.trend === 'stable' && <BarChart3 className="h-4 w-4 text-blue-500" />}
                        {subject.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${subject.average}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Class Average</span>
                      <span className="text-sm font-semibold text-gray-800">{subject.average}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Evaluation Criteria</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Scholastic Areas</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Subject-specific knowledge and understanding</li>
                    <li>• Application of concepts and skills</li>
                    <li>• Analysis, evaluation, and creativity</li>
                    <li>• Problem-solving abilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Co-Scholastic Areas</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Life skills and emotional intelligence</li>
                    <li>• Attitudes and values</li>
                    <li>• Participation and achievement</li>
                    <li>• Health and physical education</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Cards Content */}
      {activeTab === 'reports' && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Report Cards & Progress Tracking</h2>
              <p className="text-lg text-gray-600">
                Comprehensive reporting system for tracking academic progress and development
              </p>
            </div>

            {/* Report Card Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {reportCardElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{element.title}</h3>
                    <p className="text-gray-600 text-sm">{element.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Report Schedule */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Report Card Schedule</h3>
              <div className="space-y-4">
                {[
                  { term: "First Term Report", issue: "End of September", purpose: "Progress update and parent-teacher meeting" },
                  { term: "Half-Yearly Report", issue: "End of October", purpose: "Comprehensive mid-year assessment" },
                  { term: "Second Term Report", issue: "End of January", purpose: "Progress update and guidance" },
                  { term: "Annual Report", issue: "End of March", purpose: "Final comprehensive evaluation" }
                ].map((report, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{report.term}</h4>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Issued: {report.issue}
                      </div>
                      <p className="text-sm text-gray-700">{report.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Access */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Parent Access Portal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Online Access Features</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• View detailed report cards and progress reports</li>
                    <li>• Access assignment grades and teacher comments</li>
                    <li>• Monitor attendance records and punctuality</li>
                    <li>• Receive notification of new assessments and reports</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How to Access</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Use provided parent login credentials</li>
                    <li>• Access through school website or mobile app</li>
                    <li>• Available 24/7 from any device with internet access</li>
                    <li>• Technical support available for login issues</li>
                  </ul>
                </div>
              </div>
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Access Parent Portal
                <ExternalLink className="inline ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Academic Support Content */}
      {activeTab === 'support' && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Academic Support Programs</h2>
              <p className="text-lg text-gray-600">
                Comprehensive support system to ensure every student achieves their full potential
              </p>
            </div>

            {/* Support Programs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {academicSupport.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{program.program}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{program.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {program.schedule}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h3>
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

            {/* Contact Support */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Need Additional Support?</h3>
              <p className="text-gray-700 mb-6">
                Our academic support team is available to help students and parents with any questions 
                about assessments, grading, or academic progress.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Email: academics@stcolumbas.edu.in</li>
                    <li>Phone: 011-2336-3462 (Ext. 112)</li>
                    <li>Hours: Monday-Friday, 8:00 AM - 4:00 PM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Support Services</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Individual learning plan development</li>
                    <li>• Assessment accommodation requests</li>
                    <li>• Progress monitoring consultations</li>
                    <li>• Study skills workshops</li>
                  </ul>
                </div>
              </div>
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Schedule Consultation
                <Calendar className="inline ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment System</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Our evaluation system is designed to provide meaningful feedback, track progress, 
            and support every student's academic journey toward excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Assessment Calendar
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              View Grading Policy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssessmentPage;