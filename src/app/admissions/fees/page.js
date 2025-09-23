"use client";
import React, { useState, useEffect } from 'react';
import { 
  CreditCard,
  Download,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Receipt,
  FileText,
  Banknote,
  Wallet,
  QrCode,
  Building,
  Mail,
  Phone,
  HelpCircle,
  PieChart,
  IndianRupee,
  ArrowRight,
  ExternalLink,
  FileSpreadsheet,
  Percent,
  Shield,
  BadgeIndianRupee,
  Settings,
  X
} from 'lucide-react';

const FeesPage = ({ schoolData = {} }) => {
  const [activeTerm, setActiveTerm] = useState('term1');
  const [activeCategory, setActiveCategory] = useState('tuition');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('primary');
  const [selectedTerm, setSelectedTerm] = useState('term1');
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      title: "Fee Structure & Payment",
      subtitle: "Transparent and comprehensive fee information for academic year 2024-25",
      height: "h-96",
      cta: "Pay Fees Online",
      ctaIcon: CreditCard,
      ctaLink: "#payment"
    },
    feeStructure: {
      show: true,
      title: "Detailed Fee Structure",
      description: "Breakdown of all fees and charges for different grade levels",
      feeCategories: [
        { id: 'tuition', name: 'Tuition Fee', description: 'Monthly academic charges' },
        { id: 'development', name: 'Development Fee', description: 'Annual infrastructure charge' },
        { id: 'annual', name: 'Annual Charges', description: 'Yearly administrative costs' },
        { id: 'activity', name: 'Activity Fee', description: 'Co-curricular activities' }
      ],
      gradeLevels: {
        nursery: { label: 'Pre-School (Nursery, KG)', tuition: 8000, development: 5000, annual: 3000, activity: 2000 },
        primary: { label: 'Primary (Classes I-V)', tuition: 9000, development: 6000, annual: 3500, activity: 2500 },
        middle: { label: 'Middle School (Classes VI-VIII)', tuition: 10000, development: 7000, annual: 4000, activity: 3000 },
        secondary: { label: 'Secondary (Classes IX-X)', tuition: 12000, development: 8000, annual: 5000, activity: 3500 },
        senior: { label: 'Senior Secondary (Classes XI-XII)', tuition: 14000, development: 10000, annual: 6000, activity: 4000 }
      }
    },
    additionalCharges: {
      show: true,
      title: "Additional Charges (Optional)",
      charges: [
        { name: 'Transportation', amount: '₹2,000 - ₹4,000', description: 'Based on distance from school' },
        { name: 'Meals', amount: '₹1,500', description: 'Optional monthly meal plan' },
        { name: 'Uniform', amount: '₹3,500', description: 'One-time purchase (2 sets)' },
        { name: 'Books & Stationery', amount: '₹2,000 - ₹5,000', description: 'Varies by grade level' },
        { name: 'Examination', amount: '₹500 - ₹1,000', description: 'Per term' }
      ]
    },
    paymentSchedule: {
      show: true,
      title: "Payment Schedule 2024-25",
      terms: [
        { term: 'Term I', dueDate: 'April 10, 2024', amount: '40% of annual fees', status: 'Upcoming' },
        { term: 'Term II', dueDate: 'August 10, 2024', amount: '30% of annual fees', status: 'Upcoming' },
        { term: 'Term III', dueDate: 'December 10, 2024', amount: '30% of annual fees', status: 'Upcoming' }
      ]
    },
    paymentMethods: {
      show: true,
      title: "Payment Methods",
      methods: [
        {
          method: 'Online Payment',
          icon: CreditCard,
          description: 'Secure online payment gateway',
          options: ['Credit/Debit Cards', 'Net Banking', 'UPI', 'Wallet']
        },
        {
          method: 'Bank Transfer',
          icon: Building,
          description: 'Direct bank transfer to school account',
          options: ['NEFT', 'RTGS', 'IMPS']
        },
        {
          method: 'Cheque/DD',
          icon: Receipt,
          description: 'Payable to St. Columba\'s School',
          options: ['At par cheques only', 'Demand Draft']
        },
        {
          method: 'Cash Payment',
          icon: Banknote,
          description: 'In-person payment at accounts office',
          options: ['During office hours', 'Receipt provided immediately']
        }
      ]
    },
    scholarships: {
      show: true,
      title: "Scholarships & Financial Aid",
      description: "Financial support options for deserving students",
      scholarships: [
        { name: 'Academic Excellence Scholarship', discount: 'Up to 25%', criteria: '95%+ in previous final exams' },
        { name: 'Sibling Discount', discount: '5%', criteria: 'For second child from same family' },
        { name: 'Alumni Scholarship', discount: '10%', criteria: 'Children of St. Columba\'s alumni' },
        { name: 'Sports Scholarship', discount: 'Up to 50%', criteria: 'State/National level sports achievements' }
      ]
    },
    faqs: {
      show: true,
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What is included in the tuition fee?",
          answer: "Tuition fee covers regular academic instruction, use of laboratory facilities, library access, and basic stationery. It does not include transportation, meals, uniforms, or special activities."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No, all fees are clearly communicated upfront. Additional charges only apply for optional services like transportation, meals, and specific extracurricular activities that parents choose to enroll their children in."
        },
        {
          question: "What is the development fee used for?",
          answer: "The development fee is used for infrastructure maintenance, technology upgrades, facility improvements, and campus development projects that benefit all students."
        },
        {
          question: "Can fees be paid in installments?",
          answer: "Yes, we offer quarterly payment options. The annual fee is divided into three terms with due dates in April, August, and December."
        },
        {
          question: "What is the policy for late fee payment?",
          answer: "A late fee of ₹100 per day is applicable after the due date. After 15 days, students may not be permitted to attend classes until fees are cleared."
        },
        {
          question: "Are fees refundable if a student withdraws?",
          answer: "Tuition fees are refundable on a pro-rata basis. Development and annual charges are non-refundable once the academic term has begun."
        }
      ]
    },
    contact: {
      show: true,
      title: "Accounts Office Contact",
      info: [
        { icon: Mail, content: "accounts@stcolumbas.edu.in", show: true },
        { icon: Phone, content: "011-2336-3462 (Ext. 120)", show: true },
        { icon: Clock, content: "Monday-Friday: 9:00 AM - 4:00 PM", show: true },
        { icon: HelpCircle, content: "Saturday: 9:00 AM - 12:00 PM (Fee related queries only)", show: true }
      ],
      resources: [
        { label: "Download Fee Structure PDF", icon: Download, show: true },
        { label: "Payment Receipt Download", icon: Receipt, show: true },
        { label: "Fee Payment Policy", icon: FileText, show: true }
      ]
    },
    showHero: true,
    showFeeCalculator: true,
    showFeeStructure: true,
    showAdditionalCharges: true,
    showPaymentSchedule: true,
    showPaymentMethods: true,
    showScholarships: true,
    showFaqs: true,
    showContact: true
  };

  // Merge with provided configuration
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

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    setEditData({ ...data[section] });
  };

  // Handle change for simple fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for arrays (e.g., feeCategories, charges)
  const handleArrayChange = (arrayKey, index, field, value) => {
    const updated = { ...editData };
    updated[arrayKey][index] = { ...updated[arrayKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for nested objects (e.g., gradeLevels)
  const handleNestedObjectChange = (nestedKey, key, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][key] = { ...updated[nestedKey][key], [field]: value };
    setEditData(updated);
  };

  // Handle change for info array in contact
  const handleInfoChange = (index, field, value) => {
    const updated = { ...editData };
    updated.info[index] = { ...updated.info[index], [field]: value };
    setEditData(updated);
  };

  // Handle change for resources array in contact
  const handleResourceChange = (index, field, value) => {
    const updated = { ...editData };
    updated.resources[index] = { ...updated.resources[index], [field]: value };
    setEditData(updated);
  };

  // Save changes
  const saveChanges = () => {
    const updatedData = { ...data, [editSection]: editData };
    setData(updatedData);
    console.log('Payload to save in database:', JSON.stringify(updatedData, null, 2));
    setEditFormOpen(false);
  };

  // Calculate estimated fees
  const calculateFees = () => {
    const gradeData = data.feeStructure.gradeLevels[selectedGrade];
    if (!gradeData) return { term: 0, annual: 0 };

    const annualTotal = gradeData.tuition * 12 + gradeData.development + gradeData.annual + gradeData.activity;
    
    let termAmount = 0;
    if (selectedTerm === 'term1') termAmount = annualTotal * 0.4;
    else if (selectedTerm === 'term2') termAmount = annualTotal * 0.3;
    else if (selectedTerm === 'term3') termAmount = annualTotal * 0.3;
    else termAmount = annualTotal;

    return {
      term: Math.round(termAmount),
      annual: Math.round(annualTotal)
    };
  };

  const estimatedFees = calculateFees();

  const FeeCategory = ({ name, amount, description, active }) => (
    <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
      active ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 bg-white hover:border-green-300'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <span className="text-lg font-bold text-green-600">{amount}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  const PaymentMethodCard = ({ method }) => {
    const IconComponent = method.icon;
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
            <IconComponent className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{method.method}</h3>
        </div>
        <p className="text-gray-600 mb-4">{method.description}</p>
        <ul className="space-y-2">
          {method.options.map((option, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Consistent with other pages */}
      {data.showHero && data.hero.show && (
        <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <BadgeIndianRupee className="h-6 w-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Financial Information</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {data.hero.cta && (
                <a 
                  href={data.hero.ctaLink} 
                  className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105"
                >
                  {data.hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {editMode && (
            <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
              <Settings className="h-5 w-5" />
            </button>
          )}
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fee Calculator */}
        {data.showFeeCalculator && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Fee Calculator</h2>
              <div className="flex items-center text-green-600">
                <PieChart className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">Interactive Calculator</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade Level</label>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {Object.entries(data.feeStructure.gradeLevels).map(([key, level]) => (
                    <option key={key} value={key}>{level.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Term</label>
                <select 
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="term1">Term I (40%)</option>
                  <option value="term2">Term II (30%)</option>
                  <option value="term3">Term III (30%)</option>
                  <option value="annual">Full Annual Payment</option>
                </select>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Estimated {selectedTerm === 'annual' ? 'Annual' : 'Term'} Fee:</span>
                <span className="text-2xl font-bold text-green-600">₹{estimatedFees.term.toLocaleString()}</span>
              </div>
              {selectedTerm !== 'annual' && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Annual Total:</span>
                  <span>₹{estimatedFees.annual.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Grade</th>
                    {data.feeStructure.feeCategories.map(category => (
                      <th key={category.id} className="px-4 py-3 text-center font-semibold text-gray-800">
                        {category.name}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold text-gray-800">Annual Total*</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.feeStructure.gradeLevels).map(([key, level]) => {
                    const annualTotal = level.tuition * 12 + level.development + level.annual + level.activity;
                    return (
                      <tr key={key} className={key === selectedGrade ? 'bg-green-50' : 'even:bg-gray-50'}>
                        <td className="px-4 py-3 font-medium text-gray-800">{level.label}</td>
                        {data.feeStructure.feeCategories.map(category => (
                          <td key={category.id} className="px-4 py-3 text-center text-gray-700">
                            ₹{level[category.id]?.toLocaleString() || 0}
                            {category.id === 'tuition' && '/mo'}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center font-semibold text-green-600">
                          ₹{annualTotal.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Excluding additional optional charges</p>
            {editMode && (
              <button onClick={() => openEditModal('feeStructure')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* Additional Charges */}
        {data.showAdditionalCharges && data.additionalCharges.show && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.additionalCharges.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.additionalCharges.charges.map((charge, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-gray-800">{charge.name}</h4>
                    <p className="text-sm text-gray-600">{charge.description}</p>
                  </div>
                  <span className="text-green-600 font-semibold whitespace-nowrap">{charge.amount}</span>
                </div>
              ))}
            </div>
            {editMode && (
              <button onClick={() => openEditModal('additionalCharges')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* Payment Schedule */}
        {data.showPaymentSchedule && data.paymentSchedule.show && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.paymentSchedule.title}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Term</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Due Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.paymentSchedule.terms.map((term, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-800">{term.term}</td>
                      <td className="px-4 py-3 text-gray-700">{term.dueDate}</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">{term.amount}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {term.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Late Payment Policy</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    A late fee of ₹100 per day will be charged after the due date. After 15 days, students may not be 
                    permitted to attend classes until outstanding fees are cleared.
                  </p>
                </div>
              </div>
            </div>
            {editMode && (
              <button onClick={() => openEditModal('paymentSchedule')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* Payment Methods */}
        {data.showPaymentMethods && data.paymentMethods.show && (
          <section id="payment" className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.paymentMethods.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {data.paymentMethods.methods.map((method, index) => (
                <PaymentMethodCard key={index} method={method} />
              ))}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-800">Secure Online Payment Instructions</h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Visit our school portal and login to your account</li>
                <li>Navigate to the 'Fee Payment' section</li>
                <li>Select the term and verify the amount due</li>
                <li>Choose your preferred payment method</li>
                <li>Complete the secure payment process</li>
                <li>Download and save the payment receipt</li>
              </ol>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors">
                <CreditCard className="h-5 w-5 mr-2" />
                Pay Fees Online
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
            {editMode && (
              <button onClick={() => openEditModal('paymentMethods')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* Scholarships & Financial Aid */}
        {data.showScholarships && data.scholarships.show && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{data.scholarships.title}</h2>
              <Percent className="h-6 w-6 text-green-600" />
            </div>
            
            <p className="text-gray-600 mb-6">{data.scholarships.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {data.scholarships.scholarships.map((scholarship, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{scholarship.name}</h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {scholarship.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{scholarship.criteria}</p>
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center">
                    Apply Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Need-Based Financial Assistance</h3>
              <p className="text-gray-700 mb-4">
                We offer limited need-based financial assistance for economically challenged families with 
                academically outstanding students. Applications are reviewed confidentially on a case-by-case basis.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Download Financial Aid Form
              </button>
            </div>
            {editMode && (
              <button onClick={() => openEditModal('scholarships')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* FAQ Section */}
        {data.showFaqs && data.faqs.show && (
          <section className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.faqs.title}</h2>
            
            <div className="space-y-4">
              {data.faqs.items.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {editMode && (
              <button onClick={() => openEditModal('faqs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}

        {/* Contact Information */}
        {data.showContact && data.contact.show && (
          <section className="bg-white rounded-lg shadow-sm p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.contact.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {data.contact.info.filter(info => info.show).map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="text-gray-700">{info.content}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Resources</h3>
                <div className="space-y-3">
                  {data.contact.resources.filter(resource => resource.show).map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <button key={index} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <span className="text-gray-700 group-hover:text-green-600 transition-colors">{resource.label}</span>
                        <IconComponent className="h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {editMode && (
              <button onClick={() => openEditModal('contact')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow">
                <Settings className="h-5 w-5" />
              </button>
            )}
          </section>
        )}
      </div>

      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit {editSection}</h2>
              <button onClick={() => setEditFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Hero Edit */}
            {editSection === 'hero' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.subtitle}
                  onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                  placeholder="Subtitle"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.height}
                  onChange={(e) => handleObjectChange('height', e.target.value)}
                  placeholder="Height"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.cta}
                  onChange={(e) => handleObjectChange('cta', e.target.value)}
                  placeholder="CTA"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.ctaLink}
                  onChange={(e) => handleObjectChange('ctaLink', e.target.value)}
                  placeholder="CTA Link"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}

            {/* Fee Structure Edit */}
            {editSection === 'feeStructure' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => handleObjectChange('description', e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <h4>Fee Categories</h4>
                {editData.feeCategories.map((cat, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleArrayChange('feeCategories', index, 'name', e.target.value)}
                      placeholder="Name"
                      className="w-1/3 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={cat.description}
                      onChange={(e) => handleArrayChange('feeCategories', index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-2/3 p-2 border rounded"
                    />
                  </div>
                ))}
                <h4>Grade Levels</h4>
                {Object.entries(editData.gradeLevels).map(([key, level]) => (
                  <div key={key} className="border p-4 rounded">
                    <input
                      type="text"
                      value={level.label}
                      onChange={(e) => handleNestedObjectChange('gradeLevels', key, 'label', e.target.value)}
                      placeholder="Label"
                      className="w-full p-2 border rounded mb-2"
                    />
                    {editData.feeCategories.map((cat) => (
                      <input
                        key={cat.id}
                        type="number"
                        value={level[cat.id]}
                        onChange={(e) => handleNestedObjectChange('gradeLevels', key, cat.id, parseInt(e.target.value))}
                        placeholder={`${cat.name} Amount`}
                        className="w-full p-2 border rounded mb-2"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Additional Charges Edit */}
            {editSection === 'additionalCharges' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                {editData.charges.map((charge, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={charge.name}
                      onChange={(e) => handleArrayChange('charges', index, 'name', e.target.value)}
                      placeholder="Name"
                      className="w-1/3 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={charge.amount}
                      onChange={(e) => handleArrayChange('charges', index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="w-1/3 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={charge.description}
                      onChange={(e) => handleArrayChange('charges', index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-1/3 p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Payment Schedule Edit */}
            {editSection === 'paymentSchedule' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                {editData.terms.map((term, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={term.term}
                      onChange={(e) => handleArrayChange('terms', index, 'term', e.target.value)}
                      placeholder="Term"
                      className="w-1/4 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={term.dueDate}
                      onChange={(e) => handleArrayChange('terms', index, 'dueDate', e.target.value)}
                      placeholder="Due Date"
                      className="w-1/4 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={term.amount}
                      onChange={(e) => handleArrayChange('terms', index, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="w-1/4 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={term.status}
                      onChange={(e) => handleArrayChange('terms', index, 'status', e.target.value)}
                      placeholder="Status"
                      className="w-1/4 p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Payment Methods Edit */}
            {editSection === 'paymentMethods' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                {editData.methods.map((method, index) => (
                  <div key={index} className="border p-4 rounded">
                    <input
                      type="text"
                      value={method.method}
                      onChange={(e) => handleArrayChange('methods', index, 'method', e.target.value)}
                      placeholder="Method"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <input
                      type="text"
                      value={method.description}
                      onChange={(e) => handleArrayChange('methods', index, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <h5>Options</h5>
                    {method.options.map((opt, optIndex) => (
                      <input
                        key={optIndex}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = { ...editData };
                          updated.methods[index].options[optIndex] = e.target.value;
                          setEditData(updated);
                        }}
                        placeholder="Option"
                        className="w-full p-2 border rounded mb-2"
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Scholarships Edit */}
            {editSection === 'scholarships' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => handleObjectChange('description', e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                {editData.scholarships.map((sch, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={sch.name}
                      onChange={(e) => handleArrayChange('scholarships', index, 'name', e.target.value)}
                      placeholder="Name"
                      className="w-1/3 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={sch.discount}
                      onChange={(e) => handleArrayChange('scholarships', index, 'discount', e.target.value)}
                      placeholder="Discount"
                      className="w-1/3 p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={sch.criteria}
                      onChange={(e) => handleArrayChange('scholarships', index, 'criteria', e.target.value)}
                      placeholder="Criteria"
                      className="w-1/3 p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* FAQs Edit */}
            {editSection === 'faqs' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                {editData.items.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleArrayChange('items', index, 'question', e.target.value)}
                      placeholder="Question"
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => handleArrayChange('items', index, 'answer', e.target.value)}
                      placeholder="Answer"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Contact Edit */}
            {editSection === 'contact' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => handleObjectChange('title', e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <h4>Info</h4>
                {editData.info.map((info, index) => (
                  <input
                    key={index}
                    type="text"
                    value={info.content}
                    onChange={(e) => handleInfoChange(index, 'content', e.target.value)}
                    placeholder="Content"
                    className="w-full p-2 border rounded mb-2"
                  />
                ))}
                <h4>Resources</h4>
                {editData.resources.map((resource, index) => (
                  <input
                    key={index}
                    type="text"
                    value={resource.label}
                    onChange={(e) => handleResourceChange(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="w-full p-2 border rounded mb-2"
                  />
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button onClick={saveChanges} className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesPage;













// "use client";
// import React, { useState } from 'react';
// import { 
//   CreditCard,
//   Download,
//   Calendar,
//   Clock,
//   AlertCircle,
//   CheckCircle,
//   ChevronDown,
//   ChevronRight,
//   Receipt,
//   FileText,
//   Banknote,
//   Wallet,
//   QrCode,
//   Building,
//   Mail,
//   Phone,
//   HelpCircle,
//   PieChart,
//   IndianRupee,
//   ArrowRight,
//   ExternalLink,
//   FileSpreadsheet,
//   Percent,
//   Shield,
//   BadgeIndianRupee
// } from 'lucide-react';

// const FeesPage = ({ schoolData = {} }) => {
//   const [activeTerm, setActiveTerm] = useState('term1');
//   const [activeCategory, setActiveCategory] = useState('tuition');
//   const [openFaq, setOpenFaq] = useState(null);
//   const [selectedGrade, setSelectedGrade] = useState('primary');
//   const [selectedTerm, setSelectedTerm] = useState('term1');

//   // Default data structure - Consistent with other pages
//   const defaultData = {
//     hero: {
//       show: true,
//       title: "Fee Structure & Payment",
//       subtitle: "Transparent and comprehensive fee information for academic year 2024-25",
//       height: "h-96",
//       cta: "Pay Fees Online",
//       ctaIcon: CreditCard,
//       ctaLink: "#payment"
//     },
//     feeStructure: {
//       show: true,
//       title: "Detailed Fee Structure",
//       description: "Breakdown of all fees and charges for different grade levels",
//       feeCategories: [
//         { id: 'tuition', name: 'Tuition Fee', description: 'Monthly academic charges' },
//         { id: 'development', name: 'Development Fee', description: 'Annual infrastructure charge' },
//         { id: 'annual', name: 'Annual Charges', description: 'Yearly administrative costs' },
//         { id: 'activity', name: 'Activity Fee', description: 'Co-curricular activities' }
//       ],
//       gradeLevels: {
//         nursery: { label: 'Pre-School (Nursery, KG)', tuition: 8000, development: 5000, annual: 3000, activity: 2000 },
//         primary: { label: 'Primary (Classes I-V)', tuition: 9000, development: 6000, annual: 3500, activity: 2500 },
//         middle: { label: 'Middle School (Classes VI-VIII)', tuition: 10000, development: 7000, annual: 4000, activity: 3000 },
//         secondary: { label: 'Secondary (Classes IX-X)', tuition: 12000, development: 8000, annual: 5000, activity: 3500 },
//         senior: { label: 'Senior Secondary (Classes XI-XII)', tuition: 14000, development: 10000, annual: 6000, activity: 4000 }
//       }
//     },
//     additionalCharges: {
//       show: true,
//       title: "Additional Charges (Optional)",
//       charges: [
//         { name: 'Transportation', amount: '₹2,000 - ₹4,000', description: 'Based on distance from school' },
//         { name: 'Meals', amount: '₹1,500', description: 'Optional monthly meal plan' },
//         { name: 'Uniform', amount: '₹3,500', description: 'One-time purchase (2 sets)' },
//         { name: 'Books & Stationery', amount: '₹2,000 - ₹5,000', description: 'Varies by grade level' },
//         { name: 'Examination', amount: '₹500 - ₹1,000', description: 'Per term' }
//       ]
//     },
//     paymentSchedule: {
//       show: true,
//       title: "Payment Schedule 2024-25",
//       terms: [
//         { term: 'Term I', dueDate: 'April 10, 2024', amount: '40% of annual fees', status: 'Upcoming' },
//         { term: 'Term II', dueDate: 'August 10, 2024', amount: '30% of annual fees', status: 'Upcoming' },
//         { term: 'Term III', dueDate: 'December 10, 2024', amount: '30% of annual fees', status: 'Upcoming' }
//       ]
//     },
//     paymentMethods: {
//       show: true,
//       title: "Payment Methods",
//       methods: [
//         {
//           method: 'Online Payment',
//           icon: CreditCard,
//           description: 'Secure online payment gateway',
//           options: ['Credit/Debit Cards', 'Net Banking', 'UPI', 'Wallet']
//         },
//         {
//           method: 'Bank Transfer',
//           icon: Building,
//           description: 'Direct bank transfer to school account',
//           options: ['NEFT', 'RTGS', 'IMPS']
//         },
//         {
//           method: 'Cheque/DD',
//           icon: Receipt,
//           description: 'Payable to St. Columba\'s School',
//           options: ['At par cheques only', 'Demand Draft']
//         },
//         {
//           method: 'Cash Payment',
//           icon: Banknote,
//           description: 'In-person payment at accounts office',
//           options: ['During office hours', 'Receipt provided immediately']
//         }
//       ]
//     },
//     scholarships: {
//       show: true,
//       title: "Scholarships & Financial Aid",
//       description: "Financial support options for deserving students",
//       scholarships: [
//         { name: 'Academic Excellence Scholarship', discount: 'Up to 25%', criteria: '95%+ in previous final exams' },
//         { name: 'Sibling Discount', discount: '5%', criteria: 'For second child from same family' },
//         { name: 'Alumni Scholarship', discount: '10%', criteria: 'Children of St. Columba\'s alumni' },
//         { name: 'Sports Scholarship', discount: 'Up to 50%', criteria: 'State/National level sports achievements' }
//       ]
//     },
//     faqs: {
//       show: true,
//       title: "Frequently Asked Questions",
//       items: [
//         {
//           question: "What is included in the tuition fee?",
//           answer: "Tuition fee covers regular academic instruction, use of laboratory facilities, library access, and basic stationery. It does not include transportation, meals, uniforms, or special activities."
//         },
//         {
//           question: "Are there any hidden charges?",
//           answer: "No, all fees are clearly communicated upfront. Additional charges only apply for optional services like transportation, meals, and specific extracurricular activities that parents choose to enroll their children in."
//         },
//         {
//           question: "What is the development fee used for?",
//           answer: "The development fee is used for infrastructure maintenance, technology upgrades, facility improvements, and campus development projects that benefit all students."
//         },
//         {
//           question: "Can fees be paid in installments?",
//           answer: "Yes, we offer quarterly payment options. The annual fee is divided into three terms with due dates in April, August, and December."
//         },
//         {
//           question: "What is the policy for late fee payment?",
//           answer: "A late fee of ₹100 per day is applicable after the due date. After 15 days, students may not be permitted to attend classes until fees are cleared."
//         },
//         {
//           question: "Are fees refundable if a student withdraws?",
//           answer: "Tuition fees are refundable on a pro-rata basis. Development and annual charges are non-refundable once the academic term has begun."
//         }
//       ]
//     },
//     contact: {
//       show: true,
//       title: "Accounts Office Contact",
//       info: [
//         { icon: Mail, content: "accounts@stcolumbas.edu.in", show: true },
//         { icon: Phone, content: "011-2336-3462 (Ext. 120)", show: true },
//         { icon: Clock, content: "Monday-Friday: 9:00 AM - 4:00 PM", show: true },
//         { icon: HelpCircle, content: "Saturday: 9:00 AM - 12:00 PM (Fee related queries only)", show: true }
//       ],
//       resources: [
//         { label: "Download Fee Structure PDF", icon: Download, show: true },
//         { label: "Payment Receipt Download", icon: Receipt, show: true },
//         { label: "Fee Payment Policy", icon: FileText, show: true }
//       ]
//     },
//     showHero: true,
//     showFeeCalculator: true,
//     showFeeStructure: true,
//     showAdditionalCharges: true,
//     showPaymentSchedule: true,
//     showPaymentMethods: true,
//     showScholarships: true,
//     showFaqs: true,
//     showContact: true
//   };

//   // Merge with provided configuration
//   const data = { ...defaultData, ...schoolData };

//   // Calculate estimated fees
//   const calculateFees = () => {
//     const gradeData = data.feeStructure.gradeLevels[selectedGrade];
//     if (!gradeData) return { term: 0, annual: 0 };

//     const annualTotal = gradeData.tuition * 12 + gradeData.development + gradeData.annual + gradeData.activity;
    
//     let termAmount = 0;
//     if (selectedTerm === 'term1') termAmount = annualTotal * 0.4;
//     else if (selectedTerm === 'term2') termAmount = annualTotal * 0.3;
//     else if (selectedTerm === 'term3') termAmount = annualTotal * 0.3;
//     else termAmount = annualTotal;

//     return {
//       term: Math.round(termAmount),
//       annual: Math.round(annualTotal)
//     };
//   };

//   const estimatedFees = calculateFees();

//   const FeeCategory = ({ name, amount, description, active }) => (
//     <div className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
//       active ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 bg-white hover:border-green-300'
//     }`}>
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="font-semibold text-gray-800">{name}</h4>
//         <span className="text-lg font-bold text-green-600">{amount}</span>
//       </div>
//       <p className="text-sm text-gray-600">{description}</p>
//     </div>
//   );

//   const PaymentMethodCard = ({ method }) => {
//     const IconComponent = method.icon;
//     return (
//       <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow h-full">
//         <div className="flex items-center mb-4">
//           <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
//             <IconComponent className="h-6 w-6 text-green-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800">{method.method}</h3>
//         </div>
//         <p className="text-gray-600 mb-4">{method.description}</p>
//         <ul className="space-y-2">
//           {method.options.map((option, index) => (
//             <li key={index} className="flex items-center text-sm text-gray-700">
//               <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
//               {option}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section - Consistent with other pages */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <div className="flex items-center space-x-2 mb-4">
//                 <BadgeIndianRupee className="h-6 w-6 text-yellow-400" />
//                 <span className="text-yellow-400 font-semibold">Financial Information</span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//               {data.hero.cta && (
//                 <a 
//                   href={data.hero.ctaLink} 
//                   className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-800 px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center hover:scale-105"
//                 >
//                   {data.hero.cta}
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </a>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Fee Calculator */}
//         {data.showFeeCalculator && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">Fee Calculator</h2>
//               <div className="flex items-center text-green-600">
//                 <PieChart className="h-5 w-5 mr-2" />
//                 <span className="text-sm font-medium">Interactive Calculator</span>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Grade Level</label>
//                 <select 
//                   value={selectedGrade}
//                   onChange={(e) => setSelectedGrade(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   {Object.entries(data.feeStructure.gradeLevels).map(([key, level]) => (
//                     <option key={key} value={key}>{level.label}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Term</label>
//                 <select 
//                   value={selectedTerm}
//                   onChange={(e) => setSelectedTerm(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   <option value="term1">Term I (April - July)</option>
//                   <option value="term2">Term II (August - November)</option>
//                   <option value="term3">Term III (December - March)</option>
//                   <option value="annual">Full Year</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-gray-700 font-medium">Estimated {selectedTerm === 'annual' ? 'Annual' : 'Term'} Fee:</span>
//                 <span className="text-2xl font-bold text-green-600">₹{estimatedFees.term.toLocaleString()}</span>
//               </div>
//               {selectedTerm !== 'annual' && (
//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <span>Annual Total:</span>
//                   <span>₹{estimatedFees.annual.toLocaleString()}</span>
//                 </div>
//               )}
//               <div className="mt-3 pt-3 border-t border-green-200">
//                 <p className="text-xs text-gray-500">
//                   * Includes tuition, development, annual, and activity fees. Additional charges may apply.
//                 </p>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Detailed Fee Structure */}
//         {data.showFeeStructure && data.feeStructure.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">{data.feeStructure.title}</h2>
//               <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                 {data.feeStructure.gradeLevels[selectedGrade].label}
//               </span>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//               {data.feeStructure.feeCategories.map(category => {
//                 const amount = data.feeStructure.gradeLevels[selectedGrade][category.id];
//                 return (
//                   <div
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
//                       activeCategory === category.id
//                         ? 'border-green-500 bg-green-50 shadow-md'
//                         : 'border-gray-200 bg-white hover:border-green-300'
//                     }`}
//                   >
//                     <div className="flex justify-between items-start mb-2">
//                       <h4 className="font-semibold text-gray-800">{category.name}</h4>
//                       <span className="text-lg font-bold text-green-600">₹{amount?.toLocaleString()}</span>
//                     </div>
//                     <p className="text-sm text-gray-600">{category.description}</p>
//                     {category.id === 'tuition' && (
//                       <p className="text-xs text-gray-500 mt-1">* Monthly charge</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Grade Level Comparison */}
//             <div className="border-t pt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Comparison Across Grades</h3>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-green-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left font-semibold text-gray-800">Grade Level</th>
//                       {data.feeStructure.feeCategories.map(category => (
//                         <th key={category.id} className="px-4 py-3 text-center font-semibold text-gray-800">
//                           {category.name}
//                         </th>
//                       ))}
//                       <th className="px-4 py-3 text-center font-semibold text-gray-800">Annual Total*</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {Object.entries(data.feeStructure.gradeLevels).map(([key, level]) => {
//                       const annualTotal = level.tuition * 12 + level.development + level.annual + level.activity;
//                       return (
//                         <tr key={key} className={key === selectedGrade ? 'bg-green-50' : 'even:bg-gray-50'}>
//                           <td className="px-4 py-3 font-medium text-gray-800">{level.label}</td>
//                           {data.feeStructure.feeCategories.map(category => (
//                             <td key={category.id} className="px-4 py-3 text-center text-gray-700">
//                               ₹{level[category.id]?.toLocaleString()}
//                               {category.id === 'tuition' && '/mo'}
//                             </td>
//                           ))}
//                           <td className="px-4 py-3 text-center font-semibold text-green-600">
//                             ₹{annualTotal.toLocaleString()}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//               <p className="text-xs text-gray-500 mt-3">* Excluding additional optional charges</p>
//             </div>
//           </section>
//         )}

//         {/* Additional Charges */}
//         {data.showAdditionalCharges && data.additionalCharges.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.additionalCharges.title}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {data.additionalCharges.charges.map((charge, index) => (
//                 <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
//                   <div>
//                     <h4 className="font-medium text-gray-800">{charge.name}</h4>
//                     <p className="text-sm text-gray-600">{charge.description}</p>
//                   </div>
//                   <span className="text-green-600 font-semibold whitespace-nowrap">{charge.amount}</span>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Payment Schedule */}
//         {data.showPaymentSchedule && data.paymentSchedule.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.paymentSchedule.title}</h2>
            
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-green-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left font-semibold text-gray-800">Term</th>
//                     <th className="px-4 py-3 text-left font-semibold text-gray-800">Due Date</th>
//                     <th className="px-4 py-3 text-left font-semibold text-gray-800">Amount</th>
//                     <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.paymentSchedule.terms.map((term, index) => (
//                     <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                       <td className="px-4 py-3 font-medium text-gray-800">{term.term}</td>
//                       <td className="px-4 py-3 text-gray-700">{term.dueDate}</td>
//                       <td className="px-4 py-3 text-green-600 font-semibold">{term.amount}</td>
//                       <td className="px-4 py-3">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           <Clock className="h-3 w-3 mr-1" />
//                           {term.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <div className="flex items-start">
//                 <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-medium text-yellow-800">Late Payment Policy</h4>
//                   <p className="text-yellow-700 text-sm mt-1">
//                     A late fee of ₹100 per day will be charged after the due date. After 15 days, students may not be 
//                     permitted to attend classes until outstanding fees are cleared.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Payment Methods */}
//         {data.showPaymentMethods && data.paymentMethods.show && (
//           <section id="payment" className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.paymentMethods.title}</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               {data.paymentMethods.methods.map((method, index) => (
//                 <PaymentMethodCard key={index} method={method} />
//               ))}
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
//               <div className="flex items-center mb-4">
//                 <Shield className="h-6 w-6 text-green-600 mr-3" />
//                 <h3 className="text-lg font-semibold text-gray-800">Secure Online Payment Instructions</h3>
//               </div>
//               <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
//                 <li>Visit our school portal and login to your account</li>
//                 <li>Navigate to the 'Fee Payment' section</li>
//                 <li>Select the term and verify the amount due</li>
//                 <li>Choose your preferred payment method</li>
//                 <li>Complete the secure payment process</li>
//                 <li>Download and save the payment receipt</li>
//               </ol>
//               <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors">
//                 <CreditCard className="h-5 w-5 mr-2" />
//                 Pay Fees Online
//                 <ExternalLink className="ml-2 h-4 w-4" />
//               </button>
//             </div>
//           </section>
//         )}

//         {/* Scholarships & Financial Aid */}
//         {data.showScholarships && data.scholarships.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">{data.scholarships.title}</h2>
//               <Percent className="h-6 w-6 text-green-600" />
//             </div>
            
//             <p className="text-gray-600 mb-6">{data.scholarships.description}</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               {data.scholarships.scholarships.map((scholarship, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="font-semibold text-gray-800">{scholarship.name}</h3>
//                     <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {scholarship.discount}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-4">{scholarship.criteria}</p>
//                   <button className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center">
//                     Apply Now
//                     <ArrowRight className="ml-1 h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Need-Based Financial Assistance</h3>
//               <p className="text-gray-700 mb-4">
//                 We offer limited need-based financial assistance for economically challenged families with 
//                 academically outstanding students. Applications are reviewed confidentially on a case-by-case basis.
//               </p>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center">
//                 <FileSpreadsheet className="h-4 w-4 mr-2" />
//                 Download Financial Aid Form
//               </button>
//             </div>
//           </section>
//         )}

//         {/* FAQ Section */}
//         {data.showFaqs && data.faqs.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.faqs.title}</h2>
            
//             <div className="space-y-4">
//               {data.faqs.items.map((faq, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => setOpenFaq(openFaq === index ? null : index)}
//                     className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-medium text-gray-800">{faq.question}</span>
//                     {openFaq === index ? (
//                       <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
//                     ) : (
//                       <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
//                     )}
//                   </button>
//                   {openFaq === index && (
//                     <div className="p-4 bg-gray-50 border-t border-gray-200">
//                       <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Contact Information */}
//         {data.showContact && data.contact.show && (
//           <section className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.contact.title}</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
//                 <div className="space-y-4">
//                   {data.contact.info.filter(info => info.show).map((info, index) => {
//                     const IconComponent = info.icon;
//                     return (
//                       <div key={index} className="flex items-center">
//                         <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
//                           <IconComponent className="h-5 w-5 text-green-600" />
//                         </div>
//                         <span className="text-gray-700">{info.content}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Resources</h3>
//                 <div className="space-y-3">
//                   {data.contact.resources.filter(resource => resource.show).map((resource, index) => {
//                     const IconComponent = resource.icon;
//                     return (
//                       <button key={index} className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
//                         <span className="text-gray-700 group-hover:text-green-600 transition-colors">{resource.label}</span>
//                         <IconComponent className="h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors" />
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeesPage;