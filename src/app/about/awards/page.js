"use client";
import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Star, 
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  Target,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Filter,
  Search,
  Download,
  Shield,
  Heart,
  Globe,
  Lightbulb,
  Medal,
  Ribbon,
  Crown,
  TrendingUp,
  Clock
} from 'lucide-react';

const AwardsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  
  const awardCategories = [
    { id: 'all', name: 'All Awards', icon: Trophy },
    { id: 'academic', name: 'Academic Excellence', icon: BookOpen },
    { id: 'sports', name: 'Sports Achievements', icon: Medal },
    { id: 'arts', name: 'Arts & Culture', icon: Ribbon },
    { id: 'service', name: 'Community Service', icon: Heart },
    { id: 'innovation', name: 'Innovation & Technology', icon: Lightbulb }
  ];

  const yearFilters = [
    { id: 'all', name: 'All Years' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' }
  ];

  const awards = [
    {
      id: 1,
      title: "Best School Award 2024",
      organization: "Delhi Education Board",
      category: "academic",
      year: "2024",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Recognized as the best school in Delhi for overall academic excellence and student development.",
      significance: "National Level",
      students: ["Rahul Sharma", "Priya Mehta"],
      achievement: "Overall School Excellence"
    },
    {
      id: 2,
      title: "National Science Olympiad Champions",
      organization: "Science Olympiad Foundation",
      category: "academic",
      year: "2023",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Our students secured 5 gold medals in the National Science Olympiad, ranking first among 500+ schools.",
      significance: "National Level",
      students: ["Aarav Patel", "Neha Singh", "Vikram Joshi"],
      achievement: "5 Gold Medals"
    },
    {
      id: 3,
      title: "State Basketball Champions",
      organization: "Delhi Sports Authority",
      category: "sports",
      year: "2024",
      image: "https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Senior boys basketball team won the state championship for the third consecutive year.",
      significance: "State Level",
      students: ["Team: Senior Boys Basketball"],
      achievement: "State Champions"
    },
    {
      id: 4,
      title: "National Youth Parliament Excellence",
      organization: "Ministry of Parliamentary Affairs",
      category: "arts",
      year: "2022",
      image: "https://images.unsplash.com/photo-1582573618381-c9a77c31f6f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      description: "Won best delegation award in the National Youth Parliament Competition.",
      significance: "National Level",
      students: ["Debating Society"],
      achievement: "Best Delegation Award"
    },
    {
      id: 5,
      title: "Green School Award",
      organization: "Ministry of Environment",
      category: "innovation",
      year: "2023",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Recognized for outstanding environmental initiatives and sustainable practices.",
      significance: "National Level",
      students: ["Eco Club"],
      achievement: "Environmental Excellence"
    },
    {
      id: 6,
      title: "Community Service Leadership Award",
      organization: "National Service Scheme",
      category: "service",
      year: "2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Awarded for exceptional community service initiatives and student volunteer programs.",
      significance: "National Level",
      students: ["NSS Unit"],
      achievement: "Community Service Excellence"
    },
    {
      id: 7,
      title: "National Mathematics Olympiad Winners",
      organization: "Mathematics Teachers' Association",
      category: "academic",
      year: "2022",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Students secured top positions in the National Mathematics Olympiad with perfect scores.",
      significance: "National Level",
      students: ["Siddharth Roy", "Ananya Desai"],
      achievement: "Top National Rankings"
    },
    {
      id: 8,
      title: "All India Music Competition Champions",
      organization: "Cultural Ministry of India",
      category: "arts",
      year: "2021",
      image: "https://images.unsplash.com/photo-1511370235399-1802cdeb5a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "School choir won first place in the All India Inter-School Music Competition.",
      significance: "National Level",
      students: ["School Choir"],
      achievement: "First Place - Music Competition"
    }
  ];

  const filteredAwards = awards.filter(award => {
    const categoryMatch = activeCategory === 'all' || award.category === activeCategory;
    const yearMatch = selectedYear === 'all' || award.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  const stats = [
    { number: "150+", label: "National Awards", icon: Trophy },
    { number: "75+", label: "International Recognition", icon: Globe },
    { number: "300+", label: "Student Achievements", icon: Users },
    { number: "25+", label: "Sports Championships", icon: Medal }
  ];

  const featuredAchievement = {
    title: "Century of Excellence Award",
    organization: "National Education Board",
    year: "2024",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "St. Columba's School received the prestigious 'Century of Excellence Award' for maintaining exceptional educational standards and producing outstanding alumni for nearly 100 years. This award recognizes our sustained commitment to academic excellence, character formation, and holistic development of students.",
    significance: "Lifetime Achievement",
    quote: "St. Columba's represents the gold standard in education, consistently producing leaders and change-makers for generations."
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Awards and Achievements"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">Awards & Achievements</h1>
            <p className="text-xl mb-6 text-gray-200">
              Celebrating excellence and recognizing outstanding accomplishments
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View Our Achievements
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">A Legacy of Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              For nearly a century, St. Columba's has been recognized for academic excellence, 
              sporting achievements, and contributions to the community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</h3>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Achievement */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Crown className="h-6 w-6 text-yellow-300 mr-2" />
                <span className="text-yellow-300 font-semibold">Featured Achievement</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{featuredAchievement.title}</h2>
              <div className="flex items-center mb-4 text-green-100">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{featuredAchievement.year}</span>
                <span className="mx-2">•</span>
                <Shield className="h-4 w-4 mr-2" />
                <span>{featuredAchievement.organization}</span>
              </div>
              <p className="text-lg leading-relaxed mb-6">{featuredAchievement.description}</p>
              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <p className="italic">"{featuredAchievement.quote}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-green-800 px-5 py-2 rounded-lg font-semibold transition-colors">
                  Read More
                  <ExternalLink className="inline ml-2 h-4 w-4" />
                </button>
                <button className="border border-white text-white hover:bg-white/10 px-5 py-2 rounded-lg font-semibold transition-colors">
                  Download Certificate
                  <Download className="inline ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={featuredAchievement.image} 
                alt={featuredAchievement.title}
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-green-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Gallery with Filter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Awards & Recognitions</h2>
            <p className="text-lg text-gray-600">
              Celebrating the achievements of our students, faculty, and institution
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex flex-wrap gap-3">
              {awardCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-500"
              >
                {yearFilters.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((award) => (
              <div key={award.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={award.image} 
                    alt={award.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {award.year}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                    {award.significance}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{award.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{award.organization}</span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{award.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      Achievement:
                    </h4>
                    <p className="text-green-700 font-medium">{award.achievement}</p>
                  </div>
                  
                  {award.students && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <Users className="h-4 w-4 mr-1 text-green-600" />
                        Recognized Students:
                      </h4>
                      <p className="text-gray-600 text-sm">{award.students.join(", ")}</p>
                    </div>
                  )}
                  
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredAwards.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-500">No awards found</h3>
              <p className="text-gray-500">Try selecting different filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline of Major Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Timeline of Excellence</h2>
            <p className="text-lg text-gray-600">
              Major milestones and achievements throughout our history
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {[
                { year: "2024", title: "Century of Excellence Award", content: "Received national recognition for 100 years of educational excellence" },
                { year: "2023", title: "Green School Award", content: "Recognized for environmental initiatives and sustainability practices" },
                { year: "2022", title: "ISO 21001:2018 Certification", content: "Awarded certification for educational organizations management systems" },
                { year: "2020", title: "International School Award", content: "Recognized for outstanding development of international learning" },
                { year: "2018", title: "Digital School of the Year", content: "Awarded for technology integration in teaching and learning" },
                { year: "2015", title: "Top CBSE School in Delhi", content: "Ranked among top 5 schools in Delhi for academic excellence" }
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.content}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white font-bold relative z-10">
                    {item.year}
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Celebrating Excellence Together</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Join us in recognizing and celebrating the achievements of our students and institution. 
            Your support helps us continue our tradition of excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Nominate for Awards
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              View Achievement Policy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AwardsPage;