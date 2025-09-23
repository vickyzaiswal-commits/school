"use client";
import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Target,
  Calculator,
  Microscope,
  Globe,
  Code,
  Palette,
  Music,
  Heart,
  Shield,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  ArrowRight,
  Star,
  Award,
  GraduationCap,
  Lightbulb,
  Brain,
  Book,
  BarChart3,
  Languages,
  Clock,
  FileText,
  FlaskRound,
  Atom,
  Landmark,
  Scale,
  Eye,
  History,
  Activity,
  Camera,
  Speech
} from 'lucide-react';

const DepartmentsPage = () => {
  const [activeDepartment, setActiveDepartment] = useState('science');
  
  const departments = [
    {
      id: 'science',
      name: 'Science Department',
      icon: Microscope,
      description: 'Fostering scientific inquiry and innovation through hands-on experimentation and research',
      color: 'bg-blue-100 text-blue-800',
      faculty: '12 experienced faculty members',
      achievements: ['100% distinction in Board Exams', 'National Science Olympiad winners', 'Research publications']
    },
    {
      id: 'mathematics',
      name: 'Mathematics Department',
      icon: Calculator,
      description: 'Developing logical reasoning and problem-solving skills through mathematical concepts',
      color: 'bg-purple-100 text-purple-800',
      faculty: '8 specialized mathematics teachers',
      achievements: ['International Math Olympiad participants', 'Perfect scores in Board Exams', 'Math modeling competitions']
    },
    {
      id: 'english',
      name: 'English Department',
      icon: BookOpen,
      description: 'Cultivating communication skills, literary appreciation, and creative expression',
      color: 'bg-red-100 text-red-800',
      faculty: '10 language experts',
      achievements: ['National debating champions', 'Published student authors', 'Drama festival winners']
    },
    {
      id: 'social-science',
      name: 'Social Science Department',
      icon: Globe,
      description: 'Exploring human societies, historical developments, and geographical phenomena',
      color: 'bg-green-100 text-green-800',
      faculty: '9 subject specialists',
      achievements: ['Model UN excellence', 'History research projects', 'Geography olympiad medals']
    },
    {
      id: 'languages',
      name: 'Languages Department',
      icon: Languages,
      description: 'Promoting multilingualism and cultural understanding through language acquisition',
      color: 'bg-yellow-100 text-yellow-800',
      faculty: '7 language instructors',
      achievements: ['National Hindi debating awards', 'French proficiency certificates', 'Sanskrit recitation prizes']
    },
    {
      id: 'computer-science',
      name: 'Computer Science Department',
      icon: Code,
      description: 'Preparing students for the digital age through coding, robotics, and technology education',
      color: 'bg-indigo-100 text-indigo-800',
      faculty: '6 IT specialists',
      achievements: ['National coding competition winners', 'App development projects', 'Robotics championships']
    },
    {
      id: 'physical-education',
      name: 'Physical Education Department',
      icon: Activity,
      description: 'Promoting fitness, sportsmanship, and healthy lifestyle habits through physical activities',
      color: 'bg-orange-100 text-orange-800',
      faculty: '5 sports coaches',
      achievements: ['State level championships', 'National athletes', 'Sports scholarship recipients']
    },
    {
      id: 'arts',
      name: 'Visual & Performing Arts',
      icon: Palette,
      description: 'Nurturing creativity, artistic expression, and appreciation for various art forms',
      color: 'bg-pink-100 text-pink-800',
      faculty: '4 art and music teachers',
      achievements: ['Art exhibition awards', 'Music competition winners', 'Drama production accolades']
    }
  ];

  const departmentDetails = {
    science: {
      courses: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
      facilities: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Research Center'],
      faculty: [
        { name: 'Dr. Rajesh Kumar', qualification: 'Ph.D. in Physics', role: 'HOD Science' },
        { name: 'Ms. Priya Sharma', qualification: 'M.Sc. Chemistry', role: 'Senior Teacher' },
        { name: 'Mr. Amit Singh', qualification: 'M.Sc. Biology', role: 'Lab Incharge' }
      ],
      achievements: [
        'National Science Exhibition 2023 - 1st Prize',
        '15 students selected for National Science Olympiad',
        'Research paper published in student science journal'
      ]
    },
    mathematics: {
      courses: ['Mathematics', 'Applied Mathematics', 'Statistics'],
      facilities: ['Mathematics Lab', 'Digital Learning Center'],
      faculty: [
        { name: 'Dr. Sunil Mehta', qualification: 'Ph.D. in Mathematics', role: 'HOD Mathematics' },
        { name: 'Ms. Neha Gupta', qualification: 'M.Sc. Mathematics', role: 'Senior Teacher' }
      ],
      achievements: [
        'International Mathematics Olympiad - 2 Bronze Medals',
        '100% distinction in Mathematics Board Exams',
        'Math Club recognized as best in region'
      ]
    },
    english: {
      courses: ['English Core', 'English Elective', 'Media Studies'],
      facilities: ['Language Lab', 'Reading Room', 'Drama Studio'],
      faculty: [
        { name: 'Dr. Meera Desai', qualification: 'Ph.D. in English Literature', role: 'HOD English' },
        { name: 'Mr. Rohan Kapoor', qualification: 'M.A. English', role: 'Drama Instructor' }
      ],
      achievements: [
        'National Debating Championship Winners 2023',
        'Student poetry published in national magazine',
        'Annual literary fest attended by 500+ students'
      ]
    },
    'social-science': {
      courses: ['History', 'Geography', 'Political Science', 'Economics'],
      facilities: ['Geography Lab', 'History Museum', 'Model UN Room'],
      faculty: [
        { name: 'Dr. Anjali Patel', qualification: 'Ph.D. in History', role: 'HOD Social Science' },
        { name: 'Mr. Vikram Joshi', qualification: 'M.A. Geography', role: 'Senior Teacher' }
      ],
      achievements: [
        'Model United Nations - Best Delegation Award',
        'History project selected for national exhibition',
        'Geography quiz competition winners'
      ]
    },
    languages: {
      courses: ['Hindi', 'French', 'Sanskrit', 'German'],
      facilities: ['Language Lab', 'Cultural Center'],
      faculty: [
        { name: 'Dr. Sunita Devi', qualification: 'Ph.D. in Hindi', role: 'HOD Languages' },
        { name: 'Ms. Marie Leclerc', qualification: 'DELF Certified', role: 'French Instructor' }
      ],
      achievements: [
        'National Hindi Debating Competition - 1st Prize',
        'French proficiency certifications - 100% success rate',
        'Sanskrit recitation state level winners'
      ]
    },
    'computer-science': {
      courses: ['Computer Science', 'Informatics Practices', 'Artificial Intelligence'],
      facilities: ['Computer Lab', 'Robotics Lab', 'Innovation Hub'],
      faculty: [
        { name: 'Mr. Alok Sharma', qualification: 'M.Tech Computer Science', role: 'HOD Computer Science' },
        { name: 'Ms. Divya Menon', qualification: 'M.C.A.', role: 'Programming Instructor' }
      ],
      achievements: [
        'National Coding Championship - 1st Prize',
        'Student app featured on Google Play Store',
        'Robotics team qualified for international competition'
      ]
    },
    'physical-education': {
      courses: ['Physical Education', 'Health Education', 'Sports Training'],
      facilities: ['Sports Complex', 'Swimming Pool', 'Gymnasium'],
      faculty: [
        { name: 'Mr. Ravi Thakur', qualification: 'M.P.Ed', role: 'Sports Director' },
        { name: 'Ms. Sneha Reddy', qualification: 'B.P.Ed', role: 'Basketball Coach' }
      ],
      achievements: [
        'State Basketball Champions 2023',
        '5 students selected for national athletic meets',
        'Yoga demonstration award at national level'
      ]
    },
    arts: {
      courses: ['Visual Arts', 'Music', 'Dance', 'Theater'],
      facilities: ['Art Studio', 'Music Room', 'Dance Studio', 'Auditorium'],
      faculty: [
        { name: 'Ms. Ananya Roy', qualification: 'M.A. Fine Arts', role: 'Art Director' },
        { name: 'Mr. Karan Mehra', qualification: 'Sangeet Visharad', role: 'Music Teacher' }
      ],
      achievements: [
        'National Art Exhibition - 3 awards',
        'School band performed at national youth festival',
        'Annual art auction raised funds for charity'
      ]
    }
  };

  const activeDept = departments.find(dept => dept.id === activeDepartment);
  const activeDetails = departmentDetails[activeDepartment];
  const IconComponent = activeDept?.icon || BookOpen;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Academic Departments"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Academic Departments</h1>
            <p className="text-xl mb-6 text-gray-200">
              Excellence in specialized education through our dedicated subject departments
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Explore Departments
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Department Navigation */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((department) => {
              const DeptIcon = department.icon;
              return (
                <button
                  key={department.id}
                  onClick={() => setActiveDepartment(department.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeDepartment === department.id
                      ? `${department.color} shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <DeptIcon className="w-4 h-4 mr-2" />
                  {department.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Department Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${activeDept?.color} mb-4`}>
              <IconComponent className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{activeDept?.name}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{activeDept?.description}</p>
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{activeDept?.faculty}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Courses & Facilities */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Courses Offered */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                    Courses Offered
                  </h3>
                  <ul className="space-y-2">
                    {activeDetails.courses.map((course, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Facilities */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-green-600" />
                    Department Facilities
                  </h3>
                  <ul className="space-y-2">
                    {activeDetails.facilities.map((facility, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Faculty */}
                <div className="md:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
                    Faculty Members
                  </h3>
                  <div className="space-y-4">
                    {activeDetails.faculty.map((teacher, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{teacher.name}</h4>
                          <p className="text-sm text-gray-600">{teacher.qualification}</p>
                          <p className="text-xs text-green-600">{teacher.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Achievements & Resources */}
            <div className="space-y-6">
              {/* Achievements */}
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-green-600" />
                  Department Achievements
                </h3>
                <ul className="space-y-3">
                  {activeDetails.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Department Resources
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium">Curriculum Outline</span>
                    <Download className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium">Reading List</span>
                    <Book className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium">Research Papers</span>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Contact Department
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  For inquiries about courses, programs, or department activities
                </p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Department Highlights</h2>
            <p className="text-lg text-gray-600">
              Celebrating excellence and innovation across all academic departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Microscope,
                title: "Research Projects",
                value: "50+",
                description: "Student research projects conducted annually"
              },
              {
                icon: Award,
                title: "National Awards",
                value: "25+",
                description: "Awards won in national competitions"
              },
              {
                icon: GraduationCap,
                title: "Faculty Expertise",
                value: "60+",
                description: "Years of combined teaching experience"
              },
              {
                icon: BookOpen,
                title: "Publications",
                value: "15+",
                description: "Research papers published by students"
              }
            ].map((highlight, index) => {
              const HighlightIcon = highlight.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <HighlightIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{highlight.value}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 text-sm">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Upcoming Department Events</h2>
            <p className="text-lg text-gray-600">
              Workshops, seminars, and activities organized by our academic departments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                department: "Science",
                title: "Annual Science Fair",
                date: "Jan 15, 2024",
                description: "Showcasing student projects and experiments"
              },
              {
                department: "Mathematics",
                title: "Math Olympiad Workshop",
                date: "Feb 5, 2024",
                description: "Preparation sessions for mathematics competitions"
              },
              {
                department: "English",
                title: "Literary Festival",
                date: "Mar 12, 2024",
                description: "Poetry, debate, and creative writing competitions"
              },
              {
                department: "Computer Science",
                title: "Hackathon 2024",
                date: "Apr 8, 2024",
                description: "24-hour coding competition for students"
              },
              {
                department: "Arts",
                title: "Spring Art Exhibition",
                date: "May 20, 2024",
                description: "Display of student artwork and performances"
              },
              {
                department: "Sports",
                title: "Annual Sports Meet",
                date: "Jun 5, 2024",
                description: "Inter-house athletic competitions and games"
              }
            ].map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
                  {event.department}
                </span>
                <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date}
                </div>
                <p className="text-gray-600 text-sm">{event.description}</p>
                <button className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Our Academic Programs?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Learn more about our department offerings, faculty expertise, and academic achievements
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Academic Catalog
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Academic Dean
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;