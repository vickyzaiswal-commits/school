
"use client";
import React, { useState } from 'react';
import { 
  Trophy,
  Users,
  Calendar,
  Award,
  Star,
  Shield,
  Book,
  Music,
  Palette,
  Heart,
  Activity,
  Brain,
  TrendingUp,
  Download,
  ChevronRight,
  Clock
} from 'lucide-react';

// JSON data structure (to be replaced with database data)
const houseSystemData = {
  hero: {
    show: true,
    establishedYear: "1950",
    title: "Our House System",
    subtitle: "Fostering camaraderie, competition, and character development through our vibrant house system since 1950.",
    stats: [
      { value: "75+", label: "Years of Tradition", show: true },
      { value: "4", label: "Houses", show: true },
      { value: "100+", label: "Annual Events", show: true }
    ],
    height: "h-96"
  },
  benefits: {
    show: true,
    title: "Why We Have a House System",
    subtitle: "The house system is a cornerstone of our school community, promoting values beyond the classroom",
    items: [
      { icon: "Users", title: "Community Building", description: "Fostering camaraderie and school spirit across grade levels", show: true },
      { icon: "Trophy", title: "Healthy Competition", description: "Encouraging students to strive for excellence in various fields", show: true },
      { icon: "Heart", title: "Leadership Development", description: "Providing opportunities for students to develop leadership skills", show: true },
      { icon: "Star", title: "Talent Recognition", description: "Showcasing diverse talents beyond academic achievements", show: true }
    ]
  },
  tabs: {
    show: true,
    items: [
      { id: "overview", name: "Overview", icon: "Shield", show: true },
      { id: "houses", name: "Houses", icon: "Users", show: true },
      { id: "competitions", name: "Competitions", icon: "Trophy", show: true },
      { id: "points", name: "Points", icon: "TrendingUp", show: true }
    ]
  },
  overview: {
    show: true,
    title: "House System Overview",
    subtitle: "Learn about our tradition of house competition and camaraderie",
    history: {
      show: true,
      title: "History & Tradition",
      content: [
        "The House System at St. Columba's has been a cherished tradition since 1950, when the school was founded. The system was established to create smaller communities within our larger school family, fostering closer relationships between students of different ages and backgrounds.",
        "Each of our four houses—Ruby, Emerald, Sapphire, and Topaz—represents different values and strengths, but all share the common goal of developing well-rounded individuals who contribute positively to their community.",
        "Over the decades, the house system has evolved to include a wide range of competitions and activities, but its core purpose remains the same: to build character, leadership, and school spirit."
      ]
    },
    system: {
      show: true,
      title: "How the System Works",
      steps: [
        { step: 1, title: "House Allocation", description: "New students are randomly allocated to one of the four houses, creating a balanced mix across grades.", show: true },
        { step: 2, title: "Points Competition", description: "Houses compete throughout the year in academic, sports, cultural, and service activities.", show: true },
        { step: 3, title: "Leadership Roles", description: "Senior students serve as House Captains, developing leadership skills and mentoring younger members.", show: true },
        { step: 4, title: "Annual Championship", description: "The house with the most points at year-end wins the prestigious House Championship Cup.", show: true }
      ]
    },
    captains: {
      show: true,
      title: "House Captains",
      viewProfileButton: "View Profile",
      items: [
        {
          name: "Aarav Patel",
          house: "Ruby",
          position: "Captain",
          grade: "XII-A",
          achievements: ["Basketball Team Captain", "Debate Club President", "National Science Olympiad Winner"],
          quote: "Ruby House teaches us that true strength comes from supporting each other.",
          show: true
        },
        {
          name: "Neha Verma",
          house: "Emerald",
          position: "Captain",
          grade: "XII-C",
          achievements: ["Student Council Secretary", "Math Olympiad Gold Medalist", "Environmental Club Head"],
          quote: "In Emerald, we grow together by sharing knowledge and supporting each other's dreams.",
          show: true
        },
        {
          name: "Siddharth Mehta",
          house: "Sapphire",
          position: "Captain",
          grade: "XII-D",
          achievements: ["School Band Lead", "Art Exhibition Winner", "Innovation Fair Champion"],
          quote: "Creativity is intelligence having fun - that's the Sapphire way!",
          show: true
        },
        {
          name: "Vikram Singh",
          house: "Topaz",
          position: "Captain",
          grade: "XII-B",
          achievements: ["Chess Team Captain", "Coding Competition Winner", "Robotics Club President"],
          quote: "Topaz teaches us to see the bigger picture and work strategically toward our goals.",
          show: true
        }
      ]
    }
  },
  houses: {
    show: true,
    title: "Our Houses",
    subtitle: "Learn about the unique identity and strengths of each house",
    items: {
      ruby: {
        name: "Ruby House",
        color: "bg-green-600",
        textColor: "text-white",
        borderColor: "border-green-600",
        symbol: "Lion",
        motto: "Courage and Strength",
        head: "Mr. Sharma",
        captain: "Aarav Patel (XII-A)",
        viceCaptain: "Priya Singh (XI-B)",
        points: 1245,
        strengths: ["Sports", "Debate", "Leadership"],
        description: "Ruby House is known for its courageous members who demonstrate strength in both physical and intellectual pursuits. Founded in 1952, Ruby has won the House Championship 15 times.",
        traditions: [
          "Annual Ruby House Dinner for all members",
          "Special cheer performed at all inter-house competitions",
          "Mentorship program pairing senior and junior members",
          "House-specific community service project each term"
        ],
        show: true
      },
      emerald: {
        name: "Emerald House",
        color: "bg-green-600",
        textColor: "text-white",
        borderColor: "border-green-600",
        symbol: "Oak Tree",
        motto: "Growth and Wisdom",
        head: "Ms. Gupta",
        captain: "Neha Verma (XII-C)",
        viceCaptain: "Rahul Kumar (XI-A)",
        points: 1180,
        strengths: ["Academics", "Science", "Environment"],
        description: "Emerald House values growth, wisdom, and environmental consciousness. With a strong focus on academic excellence, Emerald has produced many scholarship winners.",
        traditions: [
          "Annual Emerald House Dinner for all members",
          "Special cheer performed at all inter-house competitions",
          "Mentorship program pairing senior and junior members",
          "House-specific community service project each term"
        ],
        show: true
      },
      sapphire: {
        name: "Sapphire House",
        color: "bg-green-600",
        textColor: "text-white",
        borderColor: "border-green-600",
        symbol: "Dolphin",
        motto: "Creativity and Flow",
        head: "Mr. Fernandez",
        captain: "Siddharth Mehta (XII-D)",
        viceCaptain: "Ananya Das (XI-C)",
        points: 1320,
        strengths: ["Arts", "Music", "Innovation"],
        description: "Sapphire House celebrates creativity, artistic expression, and innovative thinking. Known for dominating cultural events and art competitions.",
        traditions: [
          "Annual Sapphire House Dinner for all members",
          "Special cheer performed at all inter-house competitions",
          "Mentorship program pairing senior and junior members",
          "House-specific community service project each term"
        ],
        show: true
      },
      topaz: {
        name: "Topaz House",
        color: "bg-green-600",
        textColor: "text-white",
        borderColor: "border-green-600",
        symbol: "Eagle",
        motto: "Vision and Perseverance",
        head: "Ms. Roberts",
        captain: "Vikram Singh (XII-B)",
        viceCaptain: "Meera Joshi (XI-D)",
        points: 1095,
        strengths: ["Mathematics", "Technology", "Chess"],
        description: "Topaz House embodies vision, strategy, and perseverance. With strong analytical skills, Topaz excels in mathematical and technological competitions.",
        traditions: [
          "Annual Topaz House Dinner for all members",
          "Special cheer performed at all inter-house competitions",
          "Mentorship program pairing senior and junior members",
          "House-specific community service project each term"
        ],
        show: true
      }
    }
  },
  competitions: {
    show: true,
    title: "Inter-House Competitions",
    subtitle: "Houses compete throughout the year in various events to earn points",
    pointsSystem: {
      show: true,
      title: "Points System Explained",
      rules: [
        "1st place receives 100% of available points",
        "2nd place receives 75% of available points",
        "3rd place receives 50% of available points",
        "4th place receives 25% of available points",
        "Participation points awarded for all entries",
        "Sportsmanship points awarded by faculty judges"
      ]
    },
    categories: [
      {
        category: "Sports",
        icon: "Activity",
        events: [
          { name: "Annual Sports Meet", points: 100, date: "Oct 15, 2025", show: true },
          { name: "Inter-House Basketball", points: 50, date: "Nov 10, 2025", show: true },
          { name: "Swimming Championship", points: 50, date: "Oct 20, 2025", show: true },
          { name: "Athletics Competition", points: 75, date: "Nov 5, 2025", show: true }
        ],
        show: true
      },
      {
        category: "Cultural",
        icon: "Music",
        events: [
          { name: "Annual Day Performance", points: 100, date: "Nov 20, 2025", show: true },
          { name: "Music Competition", points: 50, date: "Oct 8, 2025", show: true },
          { name: "Drama Festival", points: 75, date: "Oct 30, 2025", show: true },
          { name: "Dance Championship", points: 60, date: "Nov 15, 2025", show: true }
        ],
        show: true
      },
      {
        category: "Academic",
        icon: "Brain",
        events: [
          { name: "Science Exhibition", points: 75, date: "Oct 18, 2025", show: true },
          { name: "Quiz Competition", points: 50, date: "Nov 12, 2025", show: true },
          { name: "Debate Tournament", points: 60, date: "Oct 25, 2025", show: true },
          { name: "Math Olympiad", points: 50, date: "Nov 8, 2025", show: true }
        ],
        show: true
      },
      {
        category: "Art & Literature",
        icon: "Palette",
        events: [
          { name: "Art Exhibition", points: 50, date: "Oct 10, 2025", show: true },
          { name: "Creative Writing Contest", points: 40, date: "Nov 5, 2025", show: true },
          { name: "Poetry Slam", points: 40, date: "Oct 15, 2025", show: true },
          { name: "Photography Competition", points: 40, date: "Nov 18, 2025", show: true }
        ],
        show: true
      }
    ]
  },
  points: {
    show: true,
    title: "House Points Standings",
    subtitle: "Current points distribution across all houses",
    tableHeaders: [
      { label: "House", show: true },
      { label: "Total Points", show: true },
      { label: "Sports", show: true },
      { label: "Cultural", show: true },
      { label: "Academic", show: true },
      { label: "Art", show: true },
      { label: "Trend", show: true }
    ],
    breakdown: [
      {
        house: "Ruby",
        points: 1245,
        sports: 320,
        cultural: 280,
        academic: 385,
        art: 260,
        trend: "up",
        show: true
      },
      {
        house: "Emerald",
        points: 1180,
        sports: 270,
        cultural: 250,
        academic: 420,
        art: 240,
        trend: "down",
        show: true
      },
      {
        house: "Sapphire",
        points: 1320,
        sports: 290,
        cultural: 450,
        academic: 310,
        art: 270,
        trend: "up",
        show: true
      },
      {
        house: "Topaz",
        points: 1095,
        sports: 250,
        cultural: 220,
        academic: 395,
        art: 230,
        trend: "stable",
        show: true
      }
    ],
    trendOptions: [
      { value: "up", label: "↑ Rising", style: "text-green-600 font-semibold" },
      { value: "down", label: "↓ Falling", style: "text-red-600 font-semibold" },
      { value: "stable", label: "→ Stable", style: "text-green-600 font-semibold" }
    ],
    recentEvents: {
      show: true,
      title: "Recent Point Events",
      events: [
        { description: "Sapphire won Music Competition", points: 50, show: true },
        { description: "Ruby placed 2nd in Basketball", points: 38, show: true },
        { description: "Emerald won Science Exhibition", points: 75, show: true },
        { description: "Topaz won Chess Tournament", points: 50, show: true }
      ]
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Point Opportunities",
      events: [
        { description: "Annual Sports Meet (Oct 15, 2025)", points: 100, show: true },
        { description: "Debate Tournament (Oct 25, 2025)", points: 60, show: true },
        { description: "Drama Festival (Oct 30, 2025)", points: 75, show: true },
        { description: "Art Exhibition (Nov 5, 2025)", points: 50, show: true }
      ]
    }
  },
  resources: {
    show: true,
    title: "House System Resources",
    subtitle: "Download guides, calendars, and information about the house system",
    downloadButton: "Download",
    items: [
      {
        title: "House System Handbook",
        description: "Complete guide to the house system rules and traditions",
        format: "PDF",
        size: "2.1 MB",
        icon: "Book",
        show: true
      },
      {
        title: "Competition Calendar",
        description: "Schedule of all inter-house events for 2025-26",
        format: "PDF",
        size: "1.5 MB",
        icon: "Calendar",
        show: true
      },
      {
        title: "Points System Guide",
        description: "Detailed explanation of how points are awarded",
        format: "PDF",
        size: "1.2 MB",
        icon: "TrendingUp",
        show: true
      },
      {
        title: "House Captain Application",
        description: "Form to apply for house leadership positions",
        format: "DOCX",
        size: "0.8 MB",
        icon: "Users",
        show: true
      }
    ]
  },
  cta: {
    show: true,
    title: "Proud of Your House?",
    subtitle: "Show your house spirit and participate in upcoming competitions to earn points for your house",
    buttons: [
      { text: "View Competition Schedule", style: "primary", show: true },
      { text: "Learn About House Leadership", style: "secondary", show: true }
    ]
  },
  labels: {
    show: true,
    symbol: "Symbol",
    houseHead: "House Head",
    captain: "Captain",
    viceCaptain: "Vice Captain",
    currentPoints: "Current Points",
    strengths: "Strengths",
    houseDescription: "House Description",
    houseTraditions: "House Traditions"
  }
};

// Map string icon names to Lucide React components
const iconMap = {
  Trophy,
  Users,
  Calendar,
  Award,
  Star,
  Shield,
  Book,
  Music,
  Palette,
  Heart,
  Activity,
  Brain,
  TrendingUp,
  Download,
  ChevronRight,
  Clock
};

const HouseSystemPage = () => {
  const [activeTab, setActiveTab] = useState(houseSystemData.tabs.items[0].id);
  const [selectedHouse, setSelectedHouse] = useState(Object.keys(houseSystemData.houses.items)[0]);
  const currentHouse = houseSystemData.houses.items[selectedHouse];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {houseSystemData.hero.show && (
        <section className={`relative ${houseSystemData.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
            
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{houseSystemData.hero.title}</h1>
              <p className="text-xl mb-8 leading-relaxed">{houseSystemData.hero.subtitle}</p>
              {houseSystemData.hero.stats.length > 0 && (
                <div className="flex flex-wrap gap-6">
                  {houseSystemData.hero.stats
                    .filter(stat => stat.show !== false)
                    .map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold ">{stat.value}</div>
                        <div className="text-sm">{stat.label}</div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* House System Benefits */}
      {houseSystemData.benefits.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{houseSystemData.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {houseSystemData.benefits.items
                .filter(item => item.show !== false)
                .map((benefit, index) => {
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

      {/* Tab Navigation */}
      {houseSystemData.tabs.show && (
        <section className="py-8 bg-gray-50 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {houseSystemData.tabs.items
                .filter(tab => tab.show !== false)
                .map((tab) => {
                  const IconComponent = iconMap[tab.icon];
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
      )}

      {/* Tab Content */}
      {houseSystemData.tabs.show && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Overview Tab */}
            {activeTab === 'overview' && houseSystemData.overview.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.overview.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{houseSystemData.overview.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {houseSystemData.overview.history.show && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{houseSystemData.overview.history.title}</h4>
                      <div className="prose prose-lg text-gray-600">
                        {houseSystemData.overview.history.content.map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {houseSystemData.overview.system.show && (
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">{houseSystemData.overview.system.title}</h4>
                      <div className="space-y-4">
                        {houseSystemData.overview.system.steps
                          .filter(step => step.show !== false)
                          .map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                {step.step}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-800">{step.title}</h5>
                                <p className="text-sm text-gray-600">{step.description}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {houseSystemData.overview.captains.show && (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">{houseSystemData.overview.captains.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {houseSystemData.overview.captains.items
                        .filter(captain => captain.show !== false)
                        .map((captain, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className={`w-16 h-16 ${houseSystemData.houses.items[captain.house.toLowerCase()].color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold`}>
                              {captain.house.charAt(0)}
                            </div>
                            <h5 className="font-semibold text-gray-800">{captain.name}</h5>
                            <p className="text-sm text-gray-600 mb-2">{captain.position}, {captain.house} House</p>
                            <p className="text-xs text-gray-500 mb-4">Grade {captain.grade}</p>
                            <div className="bg-gray-50 p-3 rounded-lg mb-3">
                              <p className="text-sm text-gray-700 italic">"{captain.quote}"</p>
                            </div>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              {houseSystemData.overview.captains.viewProfileButton} <ChevronRight className="inline h-4 w-4" />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Houses Tab */}
            {activeTab === 'houses' && houseSystemData.houses.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.houses.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{houseSystemData.houses.subtitle}</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
                  {Object.keys(houseSystemData.houses.items)
                    .filter(key => houseSystemData.houses.items[key].show !== false)
                    .map(houseKey => (
                      <button
                        key={houseKey}
                        onClick={() => setSelectedHouse(houseKey)}
                        className={`p-4 rounded-lg transition-all text-left ${
                          selectedHouse === houseKey
                            ? `${houseSystemData.houses.items[houseKey].color} text-white shadow-md`
                            : 'bg-white text-gray-700 border border-gray-200 hover:shadow-md'
                        }`}
                      >
                        <div className="font-semibold mb-1">{houseSystemData.houses.items[houseKey].name}</div>
                        <div className="text-sm opacity-80">{houseSystemData.houses.items[houseKey].motto}</div>
                      </button>
                    ))}
                </div>

                {currentHouse && currentHouse.show !== false && (
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className={`${currentHouse.color} p-6 text-white`}>
                      <h4 className="text-2xl font-bold mb-2">{currentHouse.name}</h4>
                      <p className="text-lg opacity-90">{currentHouse.motto}</p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">{houseSystemData.labels.houseInformation}</h5>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Shield className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{houseSystemData.labels.symbol}: <strong>{currentHouse.symbol}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{houseSystemData.labels.houseHead}: <strong>{currentHouse.head}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Award className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{houseSystemData.labels.captain}: <strong>{currentHouse.captain}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{houseSystemData.labels.viceCaptain}: <strong>{currentHouse.viceCaptain}</strong></span>
                            </div>
                            <div className="flex items-center">
                              <TrendingUp className="h-5 w-5 text-gray-500 mr-3" />
                              <span>{houseSystemData.labels.currentPoints}: <strong>{currentHouse.points}</strong></span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-800 mb-3">{houseSystemData.labels.strengths}</h5>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {currentHouse.strengths.map((strength, index) => (
                              <span key={index} className={`${currentHouse.color} bg-opacity-10 ${currentHouse.textColor} px-3 py-1 rounded-full text-sm`}>
                                {strength}
                              </span>
                            ))}
                          </div>
                          
                          <h5 className="font-semibold text-gray-800 mb-3">{houseSystemData.labels.houseDescription}</h5>
                          <p className="text-gray-600">{currentHouse.description}</p>
                        </div>
                      </div>
                      
                      <div className={`border-t ${currentHouse.borderColor} pt-4`}>
                        <h5 className="font-semibold text-gray-800 mb-3">{houseSystemData.labels.houseTraditions}</h5>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {currentHouse.traditions.map((tradition, index) => (
                            <li key={index}>{tradition}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Competitions Tab */}
            {activeTab === 'competitions' && houseSystemData.competitions.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.competitions.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{houseSystemData.competitions.subtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {houseSystemData.competitions.categories
                    .filter(category => category.show !== false)
                    .map((category, index) => {
                      const IconComponent = iconMap[category.icon];
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
                          <div className="flex items-center mb-4">
                            <div className="bg-green-100 rounded-full p-2 mr-3">
                              <IconComponent className="h-6 w-6 text-green-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800">{category.category}</h4>
                          </div>
                          
                          <div className="space-y-4">
                            {category.events
                              .filter(event => event.show !== false)
                              .map((event, eventIndex) => (
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
                
                {houseSystemData.competitions.pointsSystem.show && (
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-4">{houseSystemData.competitions.pointsSystem.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      {houseSystemData.competitions.pointsSystem.rules.map((rule, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                          </div>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Points Tab */}
            {activeTab === 'points' && houseSystemData.points.show && (
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.points.title}</h3>
                <p className="text-lg text-gray-600 mb-8">{houseSystemData.points.subtitle}</p>
                
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {houseSystemData.points.tableHeaders
                          .filter(header => header.show !== false)
                          .map((header, index) => (
                            <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {header.label}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {houseSystemData.points.breakdown
                        .filter(house => house.show !== false)
                        .map((house, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`w-3 h-3 ${houseSystemData.houses.items[house.house.toLowerCase()].color} rounded-full mr-3`}></div>
                                <div className="font-medium text-gray-900">{house.house}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-bold text-green-600">{house.points}</span>
                            </td>
                            {houseSystemData.points.tableHeaders.find(h => h.label === "Sports")?.show !== false && (
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.sports}</td>
                            )}
                            {houseSystemData.points.tableHeaders.find(h => h.label === "Cultural")?.show !== false && (
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.cultural}</td>
                            )}
                            {houseSystemData.points.tableHeaders.find(h => h.label === "Academic")?.show !== false && (
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.academic}</td>
                            )}
                            {houseSystemData.points.tableHeaders.find(h => h.label === "Art")?.show !== false && (
                              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{house.art}</td>
                            )}
                            {houseSystemData.points.tableHeaders.find(h => h.label === "Trend")?.show !== false && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                {houseSystemData.points.trendOptions.find(option => option.value === house.trend)?.label ? (
                                  <span className={houseSystemData.points.trendOptions.find(option => option.value === house.trend).style}>
                                    {houseSystemData.points.trendOptions.find(option => option.value === house.trend).label}
                                  </span>
                                ) : (
                                  <span className="text-gray-600">N/A</span>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {houseSystemData.points.recentEvents.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-4">{houseSystemData.points.recentEvents.title}</h4>
                      <div className="space-y-3">
                        {houseSystemData.points.recentEvents.events
                          .filter(event => event.show !== false)
                          .map((event, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{event.description}</span>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">+{event.points} pts</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {houseSystemData.points.upcomingEvents.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-4">{houseSystemData.points.upcomingEvents.title}</h4>
                      <div className="space-y-3">
                        {houseSystemData.points.upcomingEvents.events
                          .filter(event => event.show !== false)
                          .map((event, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{event.description}</span>
                              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">{event.points} pts</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Resources */}
      {houseSystemData.resources.show && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{houseSystemData.resources.title}</h2>
              <p className="text-lg text-gray-600">{houseSystemData.resources.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {houseSystemData.resources.items
                .filter(resource => resource.show !== false)
                .map((resource, index) => {
                  const IconComponent = iconMap[resource.icon];
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
                        {houseSystemData.resources.downloadButton}
                        <Download className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {houseSystemData.cta.show && (
        <section className="py-16 bg-gradient-to-r from-green-800 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{houseSystemData.cta.title}</h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">{houseSystemData.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {houseSystemData.cta.buttons
                .filter(button => button.show !== false)
                .map((button, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      button.style === 'primary'
                        ? 'bg-white text-green-700 hover:bg-gray-100'
                        : 'bg-transparent border border-white text-white hover:bg-white/10'
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

export default HouseSystemPage;
