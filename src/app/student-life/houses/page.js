"use client";
import React, { useState } from 'react';
import { 
  Trophy,
  Users,
  Calendar,
  Award,
  Star,
  Shield,
  Flag,
  Book,
  Music,
  Palette,
  Microscope,
  Globe,
  Heart,
  Activity,
  Brain,
  TrendingUp,
  Download,
  ChevronRight,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

const HouseSystemPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHouse, setSelectedHouse] = useState('ruby');

  const houseTabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'houses', name: 'Houses', icon: Users },
    { id: 'competitions', name: 'Competitions', icon: Trophy },
    { id: 'points', name: 'Points', icon: TrendingUp }
  ];

  const houseSystemBenefits = [
    {
      icon: Users,
      title: "Community Building",
      description: "Fostering camaraderie and school spirit across grade levels"
    },
    {
      icon: Trophy,
      title: "Healthy Competition",
      description: "Encouraging students to strive for excellence in various fields"
    },
    {
      icon: Heart,
      title: "Leadership Development",
      description: "Providing opportunities for students to develop leadership skills"
    },
    {
      icon: Star,
      title: "Talent Recognition",
      description: "Showcasing diverse talents beyond academic achievements"
    }
  ];

  const houses = {
    ruby: {
      name: "Ruby House",
      color: "bg-red-500",
      textColor: "text-red-500",
      borderColor: "border-red-500",
      symbol: "Lion",
      motto: "Courage and Strength",
      head: "Mr. Sharma",
      captain: "Aarav Patel (XII-A)",
      viceCaptain: "Priya Singh (XI-B)",
      points: 1245,
      strengths: ["Sports", "Debate", "Leadership"],
      description: "Ruby House is known for its courageous members who demonstrate strength in both physical and intellectual pursuits. Founded in 1952, Ruby has won the House Championship 15 times."
    },
    emerald: {
      name: "Emerald House",
      color: "bg-green-500",
      textColor: "text-green-500",
      borderColor: "border-green-500",
      symbol: "Oak Tree",
      motto: "Growth and Wisdom",
      head: "Ms. Gupta",
      captain: "Neha Verma (XII-C)",
      viceCaptain: "Rahul Kumar (XI-A)",
      points: 1180,
      strengths: ["Academics", "Science", "Environment"],
      description: "Emerald House values growth, wisdom, and environmental consciousness. With a strong focus on academic excellence, Emerald has produced many scholarship winners."
    },
    sapphire: {
      name: "Sapphire House",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      borderColor: "border-blue-500",
      symbol: "Dolphin",
      motto: "Creativity and Flow",
      head: "Mr. Fernandez",
      captain: "Siddharth Mehta (XII-D)",
      viceCaptain: "Ananya Das (XI-C)",
      points: 1320,
      strengths: ["Arts", "Music", "Innovation"],
      description: "Sapphire House celebrates creativity, artistic expression, and innovative thinking. Known for dominating cultural events and art competitions."
    },
    topaz: {
      name: "Topaz House",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500",
      symbol: "Eagle",
      motto: "Vision and Perseverance",
      head: "Ms. Roberts",
      captain: "Vikram Singh (XII-B)",
      viceCaptain: "Meera Joshi (XI-D)",
      points: 1095,
      strengths: ["Mathematics", "Technology", "Chess"],
      description: "Topaz House embodies vision, strategy, and perseverance. With strong analytical skills, Topaz excels in mathematical and technological competitions."
    }
  };

  const competitions = [
    {
      category: "Sports",
      icon: Activity,
      events: [
        { name: "Annual Sports Meet", points: 100, date: "Oct 15, 2024" },
        { name: "Inter-House Basketball", points: 50, date: "Aug 20, 2024" },
        { name: "Swimming Championship", points: 50, date: "Jul 12, 2024" },
        { name: "Athletics Competition", points: 75, date: "Sep 5, 2024" }
      ]
    },
    {
      category: "Cultural",
      icon: Music,
      events: [
        { name: "Annual Day Performance", points: 100, date: "Nov 20, 2024" },
        { name: "Music Competition", points: 50, date: "Aug 8, 2024" },
        { name: "Drama Festival", points: 75, date: "Oct 30, 2024" },
        { name: "Dance Championship", points: 60, date: "Jul 25, 2024" }
      ]
    },
    {
      category: "Academic",
      icon: Brain,
      events: [
        { name: "Science Exhibition", points: 75, date: "Sep 18, 2024" },
        { name: "Quiz Competition", points: 50, date: "Aug 15, 2024" },
        { name: "Debate Tournament", points: 60, date: "Oct 5, 2024" },
        { name: "Math Olympiad", points: 50, date: "Jul 30, 2024" }
      ]
    },
    {
      category: "Art & Literature",
      icon: Palette,
      events: [
        { name: "Art Exhibition", points: 50, date: "Sep 8, 2024" },
        { name: "Creative Writing Contest", points: 40, date: "Aug 22, 2024" },
        { name: "Poetry Slam", points: 40, date: "Oct 12, 2024" },
        { name: "Photography Competition", points: 40, date: "Jul 18, 2024" }
      ]
    }
  ];

  const pointsBreakdown = [
    {
      house: "Ruby",
      points: 1245,
      sports: 320,
      cultural: 280,
      academic: 385,
      art: 260,
      trend: "up"
    },
    {
      house: "Emerald",
      points: 1180,
      sports: 270,
      cultural: 250,
      academic: 420,
      art: 240,
      trend: "down"
    },
    {
      house: "Sapphire",
      points: 1320,
      sports: 290,
      cultural: 450,
      academic: 310,
      art: 270,
      trend: "up"
    },
    {
      house: "Topaz",
      points: 1095,
      sports: 250,
      cultural: 220,
      academic: 395,
      art: 230,
      trend: "stable"
    }
  ];

  const houseCaptains = [
    {
      name: "Aarav Patel",
      house: "Ruby",
      position: "Captain",
      grade: "XII-A",
      achievements: ["Basketball Team Captain", "Debate Club President", "National Science Olympiad Winner"],
      quote: "Ruby House teaches us that true strength comes from supporting each other."
    },
    {
      name: "Neha Verma",
      house: "Emerald",
      position: "Captain",
      grade: "XII-C",
      achievements: ["Student Council Secretary", "Math Olympiad Gold Medalist", "Environmental Club Head"],
      quote: "In Emerald, we grow together by sharing knowledge and supporting each other's dreams."
    },
    {
      name: "Siddharth Mehta",
      house: "Sapphire",
      position: "Captain",
      grade: "XII-D",
      achievements: ["School Band Lead", "Art Exhibition Winner", "Innovation Fair Champion"],
      quote: "Creativity is intelligence having fun - that's the Sapphire way!"
    },
    {
      name: "Vikram Singh",
      house: "Topaz",
      position: "Captain",
      grade: "XII-B",
      achievements: ["Chess Team Captain", "Coding Competition Winner", "Robotics Club President"],
      quote: "Topaz teaches us to see the bigger picture and work strategically toward our goals."
    }
  ];

  const resources = [
    {
      title: "House System Handbook",
      description: "Complete guide to the house system rules and traditions",
      format: "PDF",
      size: "2.1 MB",
      icon: Book
    },
    {
      title: "Competition Calendar",
      description: "Schedule of all inter-house events for 2024-25",
      format: "PDF",
      size: "1.5 MB",
      icon: Calendar
    },
    {
      title: "Points System Guide",
      description: "Detailed explanation of how points are awarded",
      format: "PDF",
      size: "1.2 MB",
      icon: TrendingUp
    },
    {
      title: "House Captain Application",
      description: "Form to apply for house leadership positions",
      format: "DOCX",
      size: "0.8 MB",
      icon: Users
    }
  ];

  const currentHouse = houses[selectedHouse];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="House System"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">House System</h1>
            <p className="text-xl mb-6 text-gray-200">
              Fostering camaraderie, competition, and character development through our four houses
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto">
              <Trophy className="mr-2 h-5 w-5" />
              View Current Standings
            </button>
          </div>
        </div>
      </section>

      {/* House System Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why We Have a House System</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The house system is a cornerstone of our school community, promoting values beyond the classroom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houseSystemBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {houseTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-green-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5 mr-2" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">House System Overview</h3>
              <p className="text-gray-600 mb-8">Learn about our tradition of house competition and camaraderie</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">History & Tradition</h4>
                  <div className="prose prose-lg text-gray-600">
                    <p className="mb-4">
                      The House System at St. Columba's has been a cherished tradition since 1950, when the school was founded. 
                      The system was established to create smaller communities within our larger school family, fostering closer relationships 
                      between students of different ages and backgrounds.
                    </p>
                    <p className="mb-4">
                      Each of our four houses—Ruby, Emerald, Sapphire, and Topaz—represents different values and strengths, 
                      but all share the common goal of developing well-rounded individuals who contribute positively to their community.
                    </p>
                    <p>
                      Over the decades, the house system has evolved to include a wide range of competitions and activities, 
                      but its core purpose remains the same: to build character, leadership, and school spirit.
                    </p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-green-800 mb-4">How the System Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div>
                      <div>
                        <h5 className="font-medium text-gray-800">House Allocation</h5>
                        <p className="text-sm text-gray-600">New students are randomly allocated to one of the four houses, creating a balanced mix across grades.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div>
                      <div>
                        <h5 className="font-medium text-gray-800">Points Competition</h5>
                        <p className="text-sm text-gray-600">Houses compete throughout the year in academic, sports, cultural, and service activities.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div>
                      <div>
                        <h5 className="font-medium text-gray-800">Leadership Roles</h5>
                        <p className="text-sm text-gray-600">Senior students serve as House Captains, developing leadership skills and mentoring younger members.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div>
                      <div>
                        <h5 className="font-medium text-gray-800">Annual Championship</h5>
                        <p className="text-sm text-gray-600">The house with the most points at year-end wins the prestigious House Championship Cup.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-6">House Captains</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {houseCaptains.map((captain, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <div className={`w-16 h-16 ${houses[captain.house.toLowerCase()].color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold`}>
                        {captain.house.charAt(0)}
                      </div>
                      <h5 className="font-semibold text-gray-800">{captain.name}</h5>
                      <p className="text-sm text-gray-600 mb-2">{captain.position}, {captain.house} House</p>
                      <p className="text-xs text-gray-500 mb-4">Grade {captain.grade}</p>
                      <div className="bg-gray-100 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 italic">"{captain.quote}"</p>
                      </div>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        View Profile <ChevronRight className="inline h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Houses Tab */}
          {activeTab === 'houses' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Houses</h3>
              <p className="text-gray-600 mb-8">Learn about the unique identity and strengths of each house</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                {Object.keys(houses).map(houseKey => (
                  <button
                    key={houseKey}
                    onClick={() => setSelectedHouse(houseKey)}
                    className={`p-4 rounded-lg transition-all text-left ${
                      selectedHouse === houseKey
                        ? `${houses[houseKey].color} text-white shadow-md`
                        : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold mb-1">{houses[houseKey].name}</div>
                    <div className="text-sm opacity-80">{houses[houseKey].motto}</div>
                  </button>
                ))}
              </div>

              {currentHouse && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <div className={`${currentHouse.color} p-6 text-white`}>
                    <h4 className="text-2xl font-bold mb-2">{currentHouse.name}</h4>
                    <p className="text-lg opacity-90">{currentHouse.motto}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">House Information</h5>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-gray-500 mr-3" />
                            <span>Symbol: <strong>{currentHouse.symbol}</strong></span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-500 mr-3" />
                            <span>House Head: <strong>{currentHouse.head}</strong></span>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-5 w-5 text-gray-500 mr-3" />
                            <span>Captain: <strong>{currentHouse.captain}</strong></span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-5 w-5 text-gray-500 mr-3" />
                            <span>Vice Captain: <strong>{currentHouse.viceCaptain}</strong></span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-5 w-5 text-gray-500 mr-3" />
                            <span>Current Points: <strong>{currentHouse.points}</strong></span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Strengths</h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentHouse.strengths.map((strength, index) => (
                            <span key={index} className={`${currentHouse.color} bg-opacity-10 ${currentHouse.textColor} px-3 py-1 rounded-full text-sm`}>
                              {strength}
                            </span>
                          ))}
                        </div>
                        
                        <h5 className="font-semibold text-gray-800 mb-3">House Description</h5>
                        <p className="text-gray-600">{currentHouse.description}</p>
                      </div>
                    </div>
                    
                    <div className={`border-t ${currentHouse.borderColor} pt-4`}>
                      <h5 className="font-semibold text-gray-800 mb-3">House Traditions</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Annual {currentHouse.name} House Dinner for all members</li>
                        <li>Special cheer performed at all inter-house competitions</li>
                        <li>Mentorship program pairing senior and junior members</li>
                        <li>House-specific community service project each term</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Competitions Tab */}
          {activeTab === 'competitions' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Inter-House Competitions</h3>
              <p className="text-gray-600 mb-8">Houses compete throughout the year in various events to earn points</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {competitions.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <IconComponent className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-800">{category.category}</h4>
                      </div>
                      
                      <div className="space-y-4">
                        {category.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                            <div>
                              <h5 className="font-medium text-gray-800">{event.name}</h5>
                              <p className="text-sm text-gray-600">{event.date}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                              {event.points} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4">Points System Explained</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>1st place receives 100% of available points</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>2nd place receives 75% of available points</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>3rd place receives 50% of available points</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>4th place receives 25% of available points</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>Participation points awarded for all entries</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>Sportsmanship points awarded by faculty judges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Points Tab */}
          {activeTab === 'points' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">House Points Standings</h3>
              <p className="text-gray-600 mb-8">Current points distribution across all houses</p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">House</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sports</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cultural</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Academic</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Art</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pointsBreakdown.map((house, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 ${houses[house.house.toLowerCase()].color} rounded-full mr-3`}></div>
                            <div className="font-medium text-gray-900">{house.house}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-bold text-green-600">{house.points}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.sports}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.cultural}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.academic}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.art}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {house.trend === 'up' && (
                            <span className="text-green-600 font-semibold">↑ Rising</span>
                          )}
                          {house.trend === 'down' && (
                            <span className="text-red-600 font-semibold">↓ Falling</span>
                          )}
                          {house.trend === 'stable' && (
                            <span className="text-yellow-600 font-semibold">→ Stable</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-4">Recent Point Events</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Sapphire won Music Competition</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">+50 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Ruby placed 2nd in Basketball</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">+38 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Emerald won Science Exhibition</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">+75 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-700">Topaz won Chess Tournament</span>
                      <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded">+50 pts</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4">Upcoming Point Opportunities</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Annual Sports Meet (Oct 15)</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">100 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Debate Tournament (Oct 5)</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">60 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Drama Festival (Oct 30)</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">75 pts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Art Exhibition (Sep 8)</span>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded">50 pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">House System Resources</h2>
            <p className="text-lg text-gray-600">
              Download guides, calendars, and information about the house system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                  <div className="flex items-start">
                    <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Proud of Your House?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Show your house spirit and participate in upcoming competitions to earn points for your house
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              View Competition Schedule
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Learn About House Leadership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HouseSystemPage;