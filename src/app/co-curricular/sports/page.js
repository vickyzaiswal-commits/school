"use client";
import React, { useState, useEffect } from 'react';
import { 
  Trophy,
  Medal,
  Users,
  Calendar,
  MapPin,
  Clock,
  Award,
  Star,
  ChevronDown,
  ChevronRight,
  Play,
  Download,
  ExternalLink,
  Heart,
  Activity,
  Target,
  Shield,
  TrendingUp,
  Camera,
  Video,
  BookOpen,
  Phone,
  Mail,
  Map,
  ArrowRight,
  Crown,
  Filter,
  Globe,
  Lightbulb,
  Ribbon
} from 'lucide-react';

const SportsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTeam, setActiveTeam] = useState('basketball');
  const [openAchievement, setOpenAchievement] = useState(null);
  const [selectedYear, setSelectedYear] = useState('all');
  const [sportsData, setSportsData] = useState({});
  const [loading, setLoading] = useState(true);

  // Default JSON data structure - all controlled by show property
  const defaultSportsData = {
    hero: {
      show: true,
      title: "Sports & Athletics",
      subtitle: "Excellence in sportsmanship, teamwork, and athletic achievement",
      stats: [
        { value: "25+", label: "Sports Disciplines", show: true },
        { value: "50+", label: "Championship Titles", show: true },
        { value: "300+", label: "Student Athletes", show: true }
      ],
      height: "h-96"
    },
    sportsCategories: {
      show: true,
      title: "Sports Programs",
      items: [
        { id: 'all', name: 'All Sports', icon: "Activity", show: true },
        { id: 'team', name: 'Team Sports', icon: "Users", show: true },
        { id: 'individual', name: 'Individual Sports', icon: "Target", show: true },
        { id: 'aquatics', name: 'Aquatics', icon: "Play", show: true },
        { id: 'indoor', name: 'Indoor Games', icon: "Shield", show: true }
      ]
    },
    teamSports: {
      show: true,
      title: "Team Sports",
      teams: [
        {
          id: 'basketball',
          name: 'Basketball',
          icon: "Trophy",
          coach: 'Mr. Rajesh Kumar',
          achievements: ['State Champions 2023', 'Inter-School Tournament Winners', '5 District Titles'],
          schedule: 'Monday, Wednesday, Friday (4:00 PM - 6:00 PM)',
          members: '25 players (Senior & Junior teams)',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
          show: true
        },
        {
          id: 'cricket',
          name: 'Cricket',
          icon: "Medal",
          coach: 'Mr. Vikram Singh',
          achievements: ['National Quarter-finalists', 'City Champions 2023', 'Best Batsman Award'],
          schedule: 'Tuesday, Thursday, Saturday (3:30 PM - 6:00 PM)',
          members: '30 players (Under-14, Under-16, Under-19)',
          image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          id: 'football',
          name: 'Football',
          icon: "Award",
          coach: 'Ms. Priya Sharma',
          achievements: ['Regional Champions', 'Fair Play Award 2023', '3 Tournament Wins'],
          schedule: 'Monday, Wednesday, Friday (4:00 PM - 6:00 PM)',
          members: '28 players (Junior & Senior divisions)',
          image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
          show: true
        },
        {
          id: 'swimming',
          name: 'Swimming',
          icon: "Play",
          coach: 'Mr. Anil Mehta',
          achievements: ['State Level Medalists', '10 School Records', 'National Qualifiers'],
          schedule: 'Daily (6:00 AM - 8:00 AM & 4:00 PM - 6:00 PM)',
          members: '20 swimmers (Competitive squad)',
          image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        }
      ]
    },
    individualSports: {
      show: true,
      title: "Individual Sports",
      items: [
        {
          name: 'Athletics',
          description: 'Track and field events including sprints, long distance, jumps, and throws',
          achievements: ['50+ medals in district meets', '10 school records broken', 'State level champions'],
          icon: "TrendingUp",
          show: true
        },
        {
          name: 'Table Tennis',
          description: 'Competitive table tennis with professional coaching',
          achievements: ['City champions 2023', '3 state level players', 'Inter-school tournament winners'],
          icon: "Target",
          show: true
        },
        {
          name: 'Badminton',
          description: 'Singles and doubles badminton training and competitions',
          achievements: ['District champions', '5 national level players', 'Annual tournament hosts'],
          icon: "Medal",
          show: true
        },
        {
          name: 'Chess',
          description: 'Strategic game development and competitive chess',
          achievements: ['State chess champions', 'International rating players', 'Mind sports excellence'],
          icon: "Shield",
          show: true
        }
      ]
    },
    facilities: {
      show: true,
      title: "World-Class Facilities",
      items: [
        {
          name: 'Olympic-size Swimming Pool',
          description: '25-meter pool with diving facilities and professional coaching',
          image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Basketball Courts',
          description: '4 professional courts with floodlights for evening practice',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
          show: true
        },
        {
          name: 'Cricket Ground',
          description: 'Professional pitch with practice nets and bowling machines',
          image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Football Field',
          description: 'FIFA-standard turf field with professional goal posts',
          image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
          show: true
        },
        {
          name: 'Indoor Sports Complex',
          description: 'Multi-purpose hall for badminton, table tennis, and martial arts',
          image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Athletics Track',
          description: '400-meter synthetic track with field event facilities',
          image: 'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80',
          show: true
        }
      ]
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Sports Events",
      items: [
        {
          date: '2024-04-15',
          title: 'Annual Sports Day',
          time: '8:00 AM - 4:00 PM',
          venue: 'School Grounds',
          description: 'Annual sports meet with track and field events for all classes',
          show: true
        },
        {
          date: '2024-04-22',
          title: 'Inter-School Basketball Tournament',
          time: '9:00 AM - 5:00 PM',
          venue: 'Main Basketball Courts',
          description: 'City level basketball competition hosting 12 schools',
          show: true
        },
        {
          date: '2024-05-05',
          title: 'Swimming Gala',
          time: '8:00 AM - 12:00 PM',
          venue: 'School Swimming Pool',
          description: 'Annual swimming competition for different age groups',
          show: true
        },
        {
          date: '2024-05-15',
          title: 'Cricket League Finals',
          time: '2:00 PM - 6:00 PM',
          venue: 'Main Cricket Ground',
          description: 'Final match of the inter-house cricket tournament',
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Sports Achievements",
      items: [
        {
          year: '2023',
          items: [
            'State Basketball Champions (Senior Boys)',
            'National Swimming Competition - 3 Gold Medals',
            'Inter-School Cricket Tournament Runners-up',
            'District Athletics Meet - 15 Gold Medals'
          ],
          show: true
        },
        {
          year: '2022',
          items: [
            'Football Regional Champions',
            'Table Tennis State Level Winners',
            'Chess Tournament National Qualifiers',
            'Best Sports School Award'
          ],
          show: true
        },
        {
          year: '2021',
          items: [
            'Basketball District Champions',
            'Swimming State Records Broken',
            'Athletics National Level Participation',
            'Sports Excellence Award'
          ],
          show: true
        }
      ]
    },
    coaches: {
      show: true,
      title: "Our Coaching Staff",
      items: [
        {
          name: 'Mr. Rajesh Kumar',
          sport: 'Basketball',
          qualification: 'NIS Certified Coach',
          experience: '15 years',
          achievement: 'Former National Player',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Ms. Priya Sharma',
          sport: 'Football',
          qualification: 'AIFF Certified Coach',
          experience: '12 years',
          achievement: 'FFA Licensed Trainer',
          image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Mr. Anil Mehta',
          sport: 'Swimming',
          qualification: 'Advanced Coaching Certification',
          experience: '20 years',
          achievement: 'Olympic Training Program',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        },
        {
          name: 'Mr. Vikram Singh',
          sport: 'Cricket',
          qualification: 'BCCI Level 2 Coach',
          experience: '18 years',
          achievement: 'Former First-Class Player',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Join Our Sports Program",
      description: "Whether you're a beginner or an aspiring athlete, our sports programs offer something for everyone. Develop skills, build character, and be part of our winning tradition.",
      buttons: [
        { label: "Register for Tryouts", show: true },
        { label: "Contact Sports Department", show: true }
      ]
    },
    contact: {
      show: true,
      title: "Sports Department Contact",
      items: [
        {
          icon: "Phone",
          label: "Phone",
          value: "011-2336-3462 (Ext. 220)",
          show: true
        },
        {
          icon: "Mail",
          label: "Email",
          value: "sports@stcolumbas.edu.in",
          show: true
        },
        {
          icon: "Clock",
          label: "Office Hours",
          value: "Mon-Fri: 8:00 AM - 5:00 PM",
          show: true
        }
      ]
    }
  };

  // Icon mapping
  const iconMap = {
    Trophy, Medal, Users, Calendar, MapPin, Clock, Award, Star, ChevronDown, ChevronRight,
    Play, Download, ExternalLink, Heart, Activity, Target, Shield, TrendingUp, Camera,
    Video, BookOpen, Phone, Mail, Map, ArrowRight, Crown, Filter, Globe, Lightbulb, Ribbon
  };

  // Load data from API or localStorage (simulating database fetch)
  useEffect(() => {
    const loadSportsData = async () => {
      try {
        // In a real application, you would fetch from your API
        // const response = await fetch('/api/sports-data');
        // const data = await response.json();
        
        // For now, using localStorage to simulate database storage
        const savedData = localStorage.getItem('sportsPageData');
        
        if (savedData) {
          setSportsData(JSON.parse(savedData));
        } else {
          // Save default data to localStorage (simulating database)
          localStorage.setItem('sportsPageData', JSON.stringify(defaultSportsData));
          setSportsData(defaultSportsData);
        }
      } catch (error) {
        console.error('Error loading sports data:', error);
        setSportsData(defaultSportsData);
      } finally {
        setLoading(false);
      }
    };

    loadSportsData();
  }, []);

  // Filter functions
  const filteredHeroStats = sportsData.hero?.stats?.filter(stat => stat.show !== false) || [];
  const filteredCategories = sportsData.sportsCategories?.items?.filter(cat => cat.show !== false) || [];
  const filteredTeams = sportsData.teamSports?.teams?.filter(team => team.show !== false) || [];
  const filteredIndividualSports = sportsData.individualSports?.items?.filter(sport => sport.show !== false) || [];
  const filteredFacilities = sportsData.facilities?.items?.filter(facility => facility.show !== false) || [];
  const filteredEvents = sportsData.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = sportsData.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredCoaches = sportsData.coaches?.items?.filter(coach => coach.show !== false) || [];
  const filteredCtaButtons = sportsData.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredContactItems = sportsData.contact?.items?.filter(item => item.show !== false) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sports data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {sportsData.hero?.show && (
        <section className={`relative ${sportsData.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{sportsData.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {sportsData.hero.subtitle}
              </p>
              {filteredHeroStats.length > 0 && (
                <div className="flex flex-wrap gap-6 mt-8">
                  {filteredHeroStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                      <div className="text-sm text-green-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sports Categories */}
        {sportsData.sportsCategories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.sportsCategories.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = iconMap[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Team Sports */}
        {sportsData.teamSports?.show && filteredTeams.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.teamSports.title}</h2>
            
            {/* Team Navigation */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
              {filteredTeams.map(team => {
                const IconComponent = iconMap[team.icon];
                return (
                  <button
                    key={team.id}
                    onClick={() => setActiveTeam(team.id)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTeam === team.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {team.name}
                  </button>
                );
              })}
            </div>

            {/* Team Details */}
            {filteredTeams.map(team => {
              if (team.id !== activeTeam) return null;
              const IconComponent = iconMap[team.icon];
              return (
                <div key={team.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-lg p-3 mr-4">
                        <IconComponent className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{team.name} Team</h3>
                        <p className="text-gray-600">Coach: {team.coach}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Practice Schedule</h4>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {team.schedule}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Team Members</h4>
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {team.members}
                        </div>
                      </div>

                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Join Team Tryouts
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Recent Achievements</h4>
                    <ul className="space-y-2">
                      {team.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Individual Sports */}
        {sportsData.individualSports?.show && filteredIndividualSports.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.individualSports.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIndividualSports.map((sport, index) => {
                const IconComponent = iconMap[sport.icon];
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{sport.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{sport.description}</p>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Achievements</h4>
                      <ul className="space-y-1">
                        {sport.achievements.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <Award className="h-3 w-3 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sports Facilities */}
        {sportsData.facilities?.show && filteredFacilities.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.facilities.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredFacilities.map((facility, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{facility.name}</h3>
                  <p className="text-sm text-gray-600">{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {sportsData.upcomingEvents?.show && filteredEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.upcomingEvents.title}</h2>
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 rounded-lg p-3 mr-4 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{event.title}</h3>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                      <span className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </span>
                      <span className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.venue}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {sportsData.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.achievements.title}</h2>
            <div className="space-y-6">
              {filteredAchievements.map((year, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{year.year}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {year.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coaches */}
        {sportsData.coaches?.show && filteredCoaches.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{sportsData.coaches.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCoaches.map((coach, index) => (
                <div key={index} className="text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{coach.name}</h3>
                  <p className="text-green-600 font-medium">{coach.sport} Coach</p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>{coach.qualification}</p>
                    <p>{coach.experience} Experience</p>
                    <p className="text-green-700">{coach.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        {sportsData.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{sportsData.cta.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {sportsData.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {filteredCtaButtons.map((button, index) => (
                <button key={index} className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        {sportsData.contact?.show && filteredContactItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{sportsData.contact.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredContactItems.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsPage;