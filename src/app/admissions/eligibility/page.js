"use client";
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar,
  Clock,
  Users,
  Award,
  Download,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowRight,
  Shield,
  Star,
  Bookmark,
  Heart,
  GraduationCap,
  BookOpen,
  Target,
  Clock4,
  UserCheck,
  CreditCard,
  FileCheck,
  ClipboardList,
  CalendarDays,
  UserCog,
  School,
  BookType,
  BookKey
} from 'lucide-react';

const EligibilityPage = () => {
  const [activeLevel, setActiveLevel] = useState('pre-school');
  const [openFaq, setOpenFaq] = useState(null);

  const gradeLevels = [
    {
      id: 'pre-school',
      name: 'Pre-School (Nursery & KG)',
      ages: '3-5 years',
      icon: Heart,
      criteria: [
        {
          title: "Age Requirement",
          description: "Child must meet the age criteria as of March 31st of the academic year",
          details: [
            "Nursery: 3+ years",
            "Kindergarten: 4+ years"
          ]
        },
        {
          title: "Documentation",
          description: "Required documents for verification",
          details: [
            "Birth certificate (original)",
            "Aadhaar card (if available)",
            "2 passport-sized photographs"
          ]
        },
        {
          title: "Interaction Process",
          description: "Informal assessment procedure",
          details: [
            "Child interaction with teachers",
            "Basic observation of social skills",
            "Parent interaction session"
          ]
        }
      ],
      seats: 40,
      priority: ["Siblings of current students", "Children of alumni", "General applicants"]
    },
    {
      id: 'primary',
      name: 'Primary (Classes I-V)',
      ages: '6-10 years',
      icon: BookOpen,
      criteria: [
        {
          title: "Age Requirement",
          description: "Appropriate age for each class level",
          details: [
            "Class I: 5.5+ years",
            "Class II: 6.5+ years",
            "Class III: 7.5+ years",
            "Class IV: 8.5+ years",
            "Class V: 9.5+ years"
          ]
        },
        {
          title: "Academic Records",
          description: "Previous school performance evaluation",
          details: [
            "Report cards from previous school",
            "Transfer certificate (if applicable)",
            "Basic literacy and numeracy assessment"
          ]
        },
        {
          title: "Assessment Process",
          description: "Evaluation methodology",
          details: [
            "Basic skills test in English and Mathematics",
            "Informal interaction with teachers",
            "Observation of learning readiness"
          ]
        }
      ],
      seats: 35,
      priority: ["Current students progressing to next class", "Siblings", "Transfer cases with strong academic records"]
    },
    {
      id: 'middle',
      name: 'Middle School (Classes VI-VIII)',
      ages: '11-13 years',
      icon: GraduationCap,
      criteria: [
        {
          title: "Age Requirement",
          description: "Age appropriateness for each class",
          details: [
            "Class VI: 10.5+ years",
            "Class VII: 11.5+ years",
            "Class VIII: 12.5+ years"
          ]
        },
        {
          title: "Academic Performance",
          description: "Previous academic achievement requirements",
          details: [
            "Minimum 60% in previous class",
            "Proficiency in English and Mathematics",
            "Good conduct certificate from previous school"
          ]
        },
        {
          title: "Entrance Assessment",
          description: "Comprehensive evaluation process",
          details: [
            "Written test in English, Mathematics, and Science",
            "Logical reasoning assessment",
            "Personal interview with student and parents"
          ]
        }
      ],
      seats: 30,
      priority: ["Academic merit", "Siblings of current students", "Special talent in sports/arts"]
    },
    {
      id: 'secondary',
      name: 'Secondary (Classes IX-X)',
      ages: '14-15 years',
      icon: Target,
      criteria: [
        {
          title: "Academic Requirements",
          description: "Stringent academic criteria for admission",
          details: [
            "Minimum 70% in Class VIII",
            "Proficiency in all core subjects",
            "Strong foundation in Science and Mathematics"
          ]
        },
        {
          title: "Assessment Process",
          description: "Rigorous selection procedure",
          details: [
            "Comprehensive entrance examination",
            "Subject-specific aptitude tests",
            "Detailed interview with academic panel"
          ]
        },
        {
          title: "Documentation",
          description: "Essential documents for verification",
          details: [
            "Transfer certificate from recognized school",
            "Complete academic transcripts",
            "Achievement records and certificates"
          ]
        }
      ],
      seats: 25,
      priority: ["Academic excellence", "Consistent performance record", "Special achievements"]
    },
    {
      id: 'senior-secondary',
      name: 'Senior Secondary (Classes XI-XII)',
      ages: '16-17 years',
      icon: BookKey,
      criteria: [
        {
          title: "Stream Eligibility",
          description: "Subject-specific requirements for each stream",
          details: [
            "Science: Minimum 80% in Science and Mathematics",
            "Commerce: Minimum 75% in Mathematics/Accounts",
            "Humanities: Minimum 70% overall with strong language skills"
          ]
        },
        {
          title: "Entrance Criteria",
          description: "Comprehensive selection process",
          details: [
            "Class X board exam results (minimum 75%)",
            "Stream-specific aptitude test",
            "Personal interview and career counseling session"
          ]
        },
        {
          title: "Documentation",
          description: "Required academic records",
          details: [
            "Class X board marksheet",
            "Transfer certificate",
            "Subject preference form with parent consent"
          ]
        }
      ],
      seats: 20,
      priority: ["Class X board exam performance", "Aptitude test scores", "Interview assessment"]
    }
  ];

  const documentsRequired = [
    {
      category: "All Applicants",
      items: [
        "Completed application form",
        "Birth certificate (original for verification)",
        "Aadhaar card copy of student",
        "4 recent passport-sized photographs",
        "Address proof (Aadhaar card/electricity bill/rent agreement)"
      ]
    },
    {
      category: "Academic Documents",
      items: [
        "Previous year's report card",
        "Transfer certificate (for Classes II and above)",
        "Achievement records (academic and co-curricular)",
        "Board examination marksheet (for Class XI admission)"
      ]
    },
    {
      category: "Parent Documents",
      items: [
        "Aadhaar card copies of both parents",
        "Photograph of parents/guardians",
        "Occupation and income details (for scholarship applications)"
      ]
    }
  ];

  const ageCriteria = [
    { class: "Nursery", age: "3+ years", cutOff: "March 31, 2025" },
    { class: "Kindergarten", age: "4+ years", cutOff: "March 31, 2025" },
    { class: "Class I", age: "5.5+ years", cutOff: "March 31, 2025" },
    { class: "Class II", age: "6.5+ years", cutOff: "March 31, 2025" },
    { class: "Class III", age: "7.5+ years", cutOff: "March 31, 2025" },
    { class: "Class IV", age: "8.5+ years", cutOff: "March 31, 2025" },
    { class: "Class V", age: "9.5+ years", cutOff: "March 31, 2025" },
    { class: "Class VI", age: "10.5+ years", cutOff: "March 31, 2025" },
    { class: "Class VII", age: "11.5+ years", cutOff: "March 31, 2025" },
    { class: "Class VIII", age: "12.5+ years", cutOff: "March 31, 2025" },
    { class: "Class IX", age: "13.5+ years", cutOff: "March 31, 2025" },
    { class: "Class X", age: "14.5+ years", cutOff: "March 31, 2025" },
    { class: "Class XI", age: "15.5+ years", cutOff: "March 31, 2025" },
    { class: "Class XII", age: "16.5+ years", cutOff: "March 31, 2025" }
  ];

  const faqs = [
    {
      question: "What is the age cutoff date for admission?",
      answer: "The age cutoff for all classes is March 31st of the academic year. The child must have attained the required age as of this date."
    },
    {
      question: "Is there any relaxation in age criteria?",
      answer: "No, we strictly adhere to the age criteria as per CBSE guidelines. No age relaxation is permitted for any category."
    },
    {
      question: "Are transfer students accepted in all classes?",
      answer: "Yes, we accept transfer students based on availability of seats and meeting our eligibility criteria. Admission is subject to performance in entrance assessment."
    },
    {
      question: "What is the sibling policy for admission?",
      answer: "Siblings of current students receive priority in admission, subject to meeting the eligibility criteria and availability of seats."
    },
    {
      question: "Is there any special consideration for children of alumni?",
      answer: "Yes, children of St. Columba's alumni receive special consideration in the admission process, though they must meet all eligibility requirements."
    }
  ];

  const specialCategories = [
    {
      category: "Sibling Priority",
      description: "Preference for siblings of current students",
      requirements: ["Current student must be enrolled", "Meeting all eligibility criteria", "Application submitted before deadline"]
    },
    {
      category: "Alumni Children",
      description: "Special consideration for children of alumni",
      requirements: ["Parent must be verified alumni", "Submission of alumni proof", "Meeting academic requirements"]
    },
    {
      category: "Transfer Cases",
      description: "Admission for students transferring from other schools",
      requirements: ["Valid transfer certificate", "Good academic record", "Positive conduct certificate"]
    },
    {
      category: "Special Talent",
      description: "Recognition for exceptional talent in sports/arts",
      requirements: ["National/state level achievements", "Audition or portfolio review", "Maintenance of academic standards"]
    }
  ];

  const currentLevel = gradeLevels.find(level => level.id === activeLevel);
  const LevelIcon = currentLevel?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Eligibility Criteria"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Eligibility Criteria</h1>
            <p className="text-xl mb-6 text-gray-200">
              Admission requirements and criteria for different grade levels at St. Columba's School
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Eligibility Guidelines
              <Download className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Grade Level Navigation */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {gradeLevels.map((level) => {
              const LevelIcon = level.icon;
              return (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeLevel === level.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <LevelIcon className="w-4 h-4 mr-2" />
                  {level.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Current Level Details */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <LevelIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentLevel?.name}</h2>
              <p className="text-gray-600">Ages: {currentLevel?.ages} | Seats: {currentLevel?.seats}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {currentLevel?.criteria.map((criterion, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{criterion.title}</h3>
                <p className="text-gray-600 mb-4">{criterion.description}</p>
                <ul className="space-y-2">
                  {criterion.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Priority Criteria */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Admission Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentLevel?.priority.map((item, index) => (
                <div key={index} className="flex items-center bg-white p-3 rounded-lg">
                  <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Age Criteria Table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Age Eligibility Chart</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Class</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Minimum Age</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Age Cutoff Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ageCriteria.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{item.class}</td>
                      <td className="px-4 py-3 text-gray-700">{item.age}</td>
                      <td className="px-4 py-3 text-gray-700">{item.cutOff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            * Age is calculated as of March 31st of the academic year. No exceptions to age criteria are permitted.
          </p>
        </section>

        {/* Documents Required */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentsRequired.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <FileText className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Special Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Special Admission Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{category.category}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {category.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
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
        </section>

        {/* Contact Information */}
        <section className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Need Clarification?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Admission Office</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-green-600 mr-3" />
                  <span>admissions@stcolumbas.edu.in</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-green-600 mr-3" />
                  <span>011-2336-3462 (Ext. 110)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-600 mr-3" />
                  <span>Monday-Friday: 9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span>1, Ashok Place, New Delhi - 110001</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-100 transition-colors">
                  <span>Download Application Form</span>
                  <Download className="h-4 w-4 text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-100 transition-colors">
                  <span>Fee Structure</span>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-100 transition-colors">
                  <span>Schedule Campus Visit</span>
                  <Calendar className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            If you meet the eligibility criteria, begin your application process today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Start Application
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Check Availability
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EligibilityPage;