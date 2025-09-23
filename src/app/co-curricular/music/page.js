"use client";
import React, { useState } from 'react';
import { 
  Music,
  Users,
  Target,
  Clock,
  Calendar,
  ChevronRight,
  Download,
  Book,
  Heart,
  Brain,
  Trophy,
  Mic,
  Headphones,
  Piano,
  Guitar,
  Drum,
  Music2,
  FileText,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Play,
  ExternalLink,
  ArrowRight,
  Lightbulb,
  Building,
  GraduationCap,
  Palette,
  Camera,
  Video,
  Theater,
  Dance,
  Brush,
  BookOpen
} from 'lucide-react';

const MusicPage = ({ musicData = {} }) => {
  const [activeCategory, setActiveCategory] = useState('programs');

  // Default data structure with show properties
  const defaultData = {
    hero: {
      show: true,
      title: "Music Program",
      subtitle: "Cultivating musical excellence, creativity, and lifelong appreciation for the arts",
      stats: [
        { value: "12+", label: "Music Ensembles", show: true },
        { value: "50+", label: "Annual Performances", show: true },
        { value: "25+", label: "State Awards", show: true }
      ],
      height: "h-96"
    },
    benefits: {
      show: true,
      title: "Why Study Music?",
      description: "Music education provides countless benefits that extend far beyond the rehearsal room",
      items: [
        {
          icon: Brain,
          title: "Cognitive Development",
          description: "Enhancing memory, pattern recognition, and mathematical abilities through musical training.",
          show: true
        },
        {
          icon: Heart,
          title: "Emotional Expression",
          description: "Providing creative outlets for emotional expression and building confidence.",
          show: true
        },
        {
          icon: Users,
          title: "Collaborative Skills",
          description: "Developing teamwork and communication through ensemble performances.",
          show: true
        },
        {
          icon: Trophy,
          title: "Discipline & Achievement",
          description: "Cultivating perseverance, goal-setting, and pride in accomplishments.",
          show: true
        }
      ]
    },
    categories: {
      show: true,
      title: "Music Program Overview",
      description: "Explore our comprehensive music curriculum and offerings",
      items: [
        { id: 'programs', name: 'Music Programs', icon: Music, description: 'Comprehensive offerings', show: true },
        { id: 'ensembles', name: 'Ensembles', icon: Users, description: 'Performance groups', show: true },
        { id: 'instruments', name: 'Instruments', icon: Guitar, description: 'What we teach', show: true },
        { id: 'events', name: 'Events', icon: Calendar, description: 'Performances & competitions', show: true }
      ]
    },
    programs: {
      show: true,
      items: {
        'programs': [
          { 
            name: "Elementary Music", 
            icon: Music, 
            grades: "K-5", 
            description: "Foundational music appreciation and basic instrument exposure",
            show: true
          },
          { 
            name: "Middle School Band", 
            icon: Drum, 
            grades: "6-8", 
            description: "Concert band, jazz band, and marching band fundamentals",
            show: true
          },
          { 
            name: "High School Orchestra", 
            icon: Music, 
            grades: "9-12", 
            description: "Symphonic orchestra and chamber music ensembles",
            show: true
          },
          { 
            name: "Choral Program", 
            icon: Mic, 
            grades: "4-12", 
            description: "Choirs for all experience levels from beginner to advanced",
            show: true
          },
          { 
            name: "Music Theory", 
            icon: Book, 
            grades: "9-12", 
            description: "AP Music Theory and composition classes",
            show: true
          },
          { 
            name: "Digital Music Production", 
            icon: Headphones, 
            grades: "9-12", 
            description: "Modern music technology and recording arts",
            show: true
          }
        ],
        'ensembles': [
          { 
            name: "Concert Band", 
            icon: Drum, 
            level: "Intermediate", 
            director: "Mr. Johnson", 
            meeting: "Mon/Wed 3:30-5:00 PM",
            show: true
          },
          { 
            name: "Jazz Ensemble", 
            icon: Music, 
            level: "Advanced", 
            director: "Ms. Davis", 
            meeting: "Tues/Thurs 3:30-5:30 PM",
            show: true
          },
          { 
            name: "Symphonic Orchestra", 
            icon: Music, 
            level: "Advanced", 
            director: "Mr. Chen", 
            meeting: "Mon/Tues/Thurs 3:30-5:30 PM",
            show: true
          },
          { 
            name: "Concert Choir", 
            icon: Mic, 
            level: "All Levels", 
            director: "Ms. Williams", 
            meeting: "Mon/Wed/Fri 3:30-5:00 PM",
            show: true
          },
          { 
            name: "Chamber Singers", 
            icon: Mic, 
            level: "Advanced", 
            director: "Ms. Williams", 
            meeting: "Tues/Thurs 4:00-6:00 PM",
            show: true
          },
          { 
            name: "Percussion Ensemble", 
            icon: Drum, 
            level: "Intermediate", 
            director: "Mr. Johnson", 
            meeting: "Fri 3:30-5:30 PM",
            show: true
          }
        ],
        'instruments': [
          { 
            name: "Strings", 
            icon: Music, 
            family: "Orchestral", 
            instruments: "Violin, Viola, Cello, Bass",
            show: true
          },
          { 
            name: "Woodwinds", 
            icon: Music, 
            family: "Band", 
            instruments: "Flute, Clarinet, Saxophone, Oboe, Bassoon",
            show: true
          },
          { 
            name: "Brass", 
            icon: Music, 
            family: "Band", 
            instruments: "Trumpet, Trombone, French Horn, Tuba, Euphonium",
            show: true
          },
          { 
            name: "Percussion", 
            icon: Drum, 
            family: "Band/Orchestra", 
            instruments: "Snare Drum, Timpani, Xylophone, Auxiliary",
            show: true
          },
          { 
            name: "Piano", 
            icon: Piano, 
            family: "All", 
            instruments: "Classical, Jazz, Contemporary",
            show: true
          },
          { 
            name: "Guitar", 
            icon: Guitar, 
            family: "Contemporary", 
            instruments: "Acoustic, Electric, Bass Guitar",
            show: true
          }
        ],
        'events': [
          { 
            name: "Winter Concert", 
            icon: Calendar, 
            date: "Dec 15, 2024", 
            time: "7:00 PM", 
            location: "School Auditorium",
            show: true
          },
          { 
            name: "Solo & Ensemble Festival", 
            icon: Trophy, 
            date: "Feb 22, 2024", 
            time: "9:00 AM", 
            location: "Music Wing",
            show: true
          },
          { 
            name: "Spring Musical", 
            icon: Calendar, 
            date: "Mar 20-23, 2024", 
            time: "7:00 PM", 
            location: "Main Theater",
            show: true
          },
          { 
            name: "Jazz Night", 
            icon: Music2, 
            date: "Apr 12, 2024", 
            time: "6:30 PM", 
            location: "Black Box Theater",
            show: true
          },
          { 
            name: "State Music Competition", 
            icon: Award, 
            date: "May 5-6, 2024", 
            time: "All Day", 
            location: "State University",
            show: true
          },
          { 
            name: "Pops Concert", 
            icon: Star, 
            date: "Jun 1, 2024", 
            time: "6:00 PM", 
            location: "Football Field",
            show: true
          }
        ]
      }
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Music Events",
      description: "Mark your calendars for these exciting performances and activities",
      items: [
        {
          title: "Fall Choral Concert",
          date: "2024-10-25",
          time: "7:00 PM - 9:00 PM",
          ensemble: "Concert Choir & Chamber Singers",
          location: "School Auditorium",
          show: true
        },
        {
          title: "Band Olympics",
          date: "2024-11-08",
          time: "4:00 PM - 7:00 PM",
          ensemble: "All Band Students",
          location: "Football Field",
          show: true
        },
        {
          title: "Middle School Music Night",
          date: "2024-11-15",
          time: "6:30 PM - 8:30 PM",
          ensemble: "Middle School Bands & Choirs",
          location: "Cafeteria",
          show: true
        },
        {
          title: "Orchestra Hall Field Trip",
          date: "2024-12-05",
          time: "9:00 AM - 4:00 PM",
          ensemble: "Symphonic Orchestra",
          location: "Downtown Concert Hall",
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Recent Achievements",
      description: "Celebrating the accomplishments of our talented student musicians",
      items: [
        {
          year: '2024',
          items: [
            'Concert Band awarded 1st Place in State Competition',
            '12 students selected for All-State Honor Ensembles',
            'Jazz Ensemble received superior ratings at regional festival'
          ],
          show: true
        },
        {
          year: '2023',
          items: [
            'Music Program recognized as Outstanding by State Association',
            'Chamber Singers invited to perform at national conference',
            'Student compositions published in national journal'
          ],
          show: true
        },
        {
          year: '2022',
          items: [
            'Marching Band placed 2nd in State Championships',
            'Orchestra awarded Gold Rating at Heritage Festival',
            'Student won Young Composer Award'
          ],
          show: true
        }
      ]
    },
    faculty: {
      show: true,
      title: "Music Faculty",
      items: [
        {
          name: 'Mr. Karan Mehra',
          role: 'Music Director',
          qualification: 'Sangeet Visharad, Trinity College Certified',
          specialty: 'Western Classical, Piano',
          experience: '12 years',
          show: true
        },
        {
          name: 'Ms. Sunita Devi',
          role: 'Indian Classical Music Instructor',
          qualification: 'M.A. in Indian Classical Music',
          specialty: 'Hindustani Vocal, Sitar',
          experience: '15 years',
          show: true
        },
        {
          name: 'Ms. Priya Sharma',
          role: 'Choral Director',
          qualification: 'M.M. in Choral Conducting',
          specialty: 'Choral Arranging, Vocal Pedagogy',
          experience: '10 years',
          show: true
        },
        {
          name: 'Mr. Ravi Verma',
          role: 'Instrumental Music Coordinator',
          qualification: 'B.M. in Music Education',
          specialty: 'Brass Instruments, Marching Band',
          experience: '8 years',
          show: true
        }
      ]
    },
    resources: {
      show: true,
      title: "Music Resources",
      description: "Download important documents, practice materials, and performance schedules",
      items: [
        {
          title: "Music Program Handbook",
          description: "Policies, expectations, and calendar for all music students",
          format: "PDF",
          size: "1.8 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Practice Schedule Templates",
          description: "Weekly practice logs and goal-setting worksheets",
          format: "PDF",
          size: "0.7 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Instrument Rental Guide",
          description: "Information on acquiring and maintaining instruments",
          format: "PDF",
          size: "1.2 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Upcoming Performances Calendar",
          description: "Complete schedule of concerts and events for 2024-25",
          format: "PDF",
          size: "0.9 MB",
          icon: Calendar,
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Join Our Music Program",
      description: "Whether you're a beginner or an experienced musician, there's a place for you in our music family",
      buttons: [
        { label: "Register for Music Classes", show: true },
        { label: "Contact Music Director", show: true }
      ]
    },
    contact: {
      show: true,
      title: "Music Department Contact",
      items: [
        {
          icon: Phone,
          label: "Phone",
          value: "011-2336-3462 (Ext. 330)",
          show: true
        },
        {
          icon: Mail,
          label: "Email",
          value: "music@stcolumbas.edu.in",
          show: true
        },
        {
          icon: Clock,
          label: "Office Hours",
          value: "Mon-Fri: 9:00 AM - 5:00 PM",
          show: true
        }
      ]
    },
    // Section visibility controls
    showHero: true,
    showBenefits: true,
    showCategories: true,
    showPrograms: true,
    showUpcomingEvents: true,
    showAchievements: true,
    showFaculty: true,
    showResources: true,
    showCta: true,
    showContact: true
  };

  // Merge provided data with defaults
  const data = { ...defaultData, ...musicData };

  // Filter functions
  const filteredHeroStats = data.hero.stats.filter(stat => stat.show !== false);
  const filteredBenefits = data.benefits.items.filter(benefit => benefit.show !== false);
  const filteredCategories = data.categories.items.filter(cat => cat.show !== false);
  const filteredPrograms = Object.fromEntries(
    Object.entries(data.programs.items).map(([key, items]) => [
      key, 
      items.filter(item => item.show !== false)
    ])
  );
  const filteredUpcomingEvents = data.upcomingEvents.items.filter(event => event.show !== false);
  const filteredAchievements = data.achievements.items.filter(achievement => achievement.show !== false);
  const filteredFaculty = data.faculty.items.filter(teacher => teacher.show !== false);
  const filteredResources = data.resources.items.filter(resource => resource.show !== false);
  const filteredCtaButtons = data.cta.buttons.filter(button => button.show !== false);
  const filteredContactItems = data.contact.items.filter(item => item.show !== false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {data.showHero && data.hero.show && (
        <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
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
              <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                View Music Handbook
                <Download className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.showBenefits && data.benefits.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {data.benefits.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
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
        )}

        {/* Categories Navigation */}
        {data.showCategories && data.categories.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.categories.title}</h2>
              <p className="text-gray-600">
                {data.categories.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = category.icon;
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
                    <span className={`text-xs mt-1 ${activeCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
                      {category.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Content for Selected Category */}
            {data.showPrograms && data.programs.show && filteredPrograms[activeCategory] && filteredPrograms[activeCategory].length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {data.categories.items.find(c => c.id === activeCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms[activeCategory].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex items-center mb-4">
                          <div className="bg-green-100 rounded-full p-2 mr-3">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        </div>
                        
                        {activeCategory === 'programs' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-green-500" />
                              <span>Grades: {item.grades}</span>
                            </div>
                            <p>{item.description}</p>
                          </div>
                        )}
                        
                        {activeCategory === 'ensembles' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-green-500" />
                              <span>Level: {item.level}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-green-500" />
                              <span>Director: {item.director}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-green-500" />
                              <span>{item.meeting}</span>
                            </div>
                          </div>
                        )}
                        
                        {activeCategory === 'instruments' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Music className="h-4 w-4 mr-2 text-green-500" />
                              <span>Family: {item.family}</span>
                            </div>
                            <p>Instruments: {item.instruments}</p>
                          </div>
                        )}
                        
                        {activeCategory === 'events' && (
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-green-500" />
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-green-500" />
                              <span>{item.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-green-500" />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        )}
                        
                        <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                          Learn more
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upcoming Events */}
        {data.showUpcomingEvents && data.upcomingEvents.show && filteredUpcomingEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents.title}</h2>
            <p className="text-gray-600 mb-6">{data.upcomingEvents.description}</p>
            
            <div className="space-y-4">
              {filteredUpcomingEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{event.title}</h3>
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                          {event.ensemble}
                        </span>
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-2">
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
                            {event.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                View Full Events Calendar
                <Calendar className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.showAchievements && data.achievements.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.achievements.title}</h2>
            <p className="text-gray-600 mb-6">{data.achievements.description}</p>
            
            <div className="space-y-6">
              {filteredAchievements.map((year, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{year.year}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {year.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <Award className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Faculty */}
        {data.showFaculty && data.faculty.show && filteredFaculty.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.faculty.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFaculty.map((teacher, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mr-4 flex-shrink-0">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                    <p className="text-green-600 font-medium">{teacher.role}</p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>{teacher.qualification}</p>
                      <p>Specialty: {teacher.specialty}</p>
                      <p>Experience: {teacher.experience}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {data.showResources && data.resources.show && filteredResources.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.resources.title}</h2>
            <p className="text-gray-600 mb-6">{data.resources.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => {
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
        )}

        {/* CTA Section */}
        {data.showCta && data.cta.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">{data.cta.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.cta.description}
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
        {data.showContact && data.contact.show && filteredContactItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{data.contact.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredContactItems.map((item, index) => {
                const IconComponent = item.icon;
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

export default MusicPage;












// "use client";
// import React, { useState } from 'react';
// import { 
//   Music,
//   Users, 
//   Target,
//   Clock,
//   Calendar,
//   ChevronRight,
//   Download,
//   Book,
//   Heart,
//   Brain,
//   Trophy,
//   Mic,
//   Headphones,
//   Piano,
//   Guitar,
//   Drum,
//   Music2,
//   FileText,
//   Star,
//   Award,
//   MapPin,
//   Phone,
//   Mail,
//   ChevronDown,
//   Play,
//   ExternalLink,
//   ArrowRight,
//   Lightbulb,
//   Building,
//   GraduationCap
// } from 'lucide-react';

// const MusicPage = ({ musicData = {} }) => {
//   const [activeCategory, setActiveCategory] = useState('programs');
//   const [openEvent, setOpenEvent] = useState(null);

//   // Default data structure with show properties
//   const defaultData = {
//     hero: {
//       show: true,
//       title: "Music Program",
//       subtitle: "Cultivating musical excellence, creativity, and lifelong appreciation for the arts",
//       stats: [
//         { value: "12+", label: "Music Ensembles", show: true },
//         { value: "50+", label: "Annual Performances", show: true },
//         { value: "25+", label: "State Awards", show: true }
//       ],
//       height: "h-96",
//       backgroundImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       ctaButton: {
//         label: "View Music Handbook",
//         show: true
//       }
//     },
//     benefits: {
//       show: true,
//       title: "Why Study Music?",
//       description: "Music education provides countless benefits that extend far beyond the rehearsal room",
//       items: [
//         {
//           icon: Brain,
//           title: "Cognitive Development",
//           description: "Enhancing memory, pattern recognition, and mathematical abilities through musical training.",
//           show: true
//         },
//         {
//           icon: Heart,
//           title: "Emotional Expression",
//           description: "Providing creative outlets for emotional expression and building confidence.",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Collaborative Skills",
//           description: "Developing teamwork and communication through ensemble performances.",
//           show: true
//         },
//         {
//           icon: Trophy,
//           title: "Discipline & Achievement",
//           description: "Cultivating perseverance, goal-setting, and pride in accomplishments.",
//           show: true
//         }
//       ]
//     },
//     categories: {
//       show: true,
//       title: "Music Program Overview",
//       description: "Explore our comprehensive music curriculum and offerings",
//       items: [
//         { id: 'programs', name: 'Music Programs', icon: Music, description: 'Comprehensive offerings', show: true },
//         { id: 'ensembles', name: 'Ensembles', icon: Users, description: 'Performance groups', show: true },
//         { id: 'instruments', name: 'Instruments', icon: Guitar, description: 'What we teach', show: true },
//         { id: 'events', name: 'Events', icon: Calendar, description: 'Performances & competitions', show: true }
//       ]
//     },
//     programs: {
//       show: true,
//       items: {
//         'programs': [
//           { 
//             name: "Elementary Music", 
//             icon: Music, 
//             grades: "K-5", 
//             description: "Foundational music appreciation and basic instrument exposure",
//             show: true
//           },
//           { 
//             name: "Middle School Band", 
//             icon: Drum, 
//             grades: "6-8", 
//             description: "Concert band, jazz band, and marching band fundamentals",
//             show: true
//           },
//           { 
//             name: "High School Orchestra", 
//             icon: Music, 
//             grades: "9-12", 
//             description: "Symphonic orchestra and chamber music ensembles",
//             show: true
//           },
//           { 
//             name: "Choral Program", 
//             icon: Mic, 
//             grades: "4-12", 
//             description: "Choirs for all experience levels from beginner to advanced",
//             show: true
//           },
//           { 
//             name: "Music Theory", 
//             icon: Book, 
//             grades: "9-12", 
//             description: "AP Music Theory and composition classes",
//             show: true
//           },
//           { 
//             name: "Digital Music Production", 
//             icon: Headphones, 
//             grades: "9-12", 
//             description: "Modern music technology and recording arts",
//             show: true
//           }
//         ],
//         'ensembles': [
//           { 
//             name: "Concert Band", 
//             icon: Drum, 
//             level: "Intermediate", 
//             director: "Mr. Johnson", 
//             meeting: "Mon/Wed 3:30-5:00 PM",
//             show: true
//           },
//           { 
//             name: "Jazz Ensemble", 
//             icon: Music, 
//             level: "Advanced", 
//             director: "Ms. Davis", 
//             meeting: "Tues/Thurs 3:30-5:30 PM",
//             show: true
//           },
//           { 
//             name: "Symphonic Orchestra", 
//             icon: Music, 
//             level: "Advanced", 
//             director: "Mr. Chen", 
//             meeting: "Mon/Tues/Thurs 3:30-5:30 PM",
//             show: true
//           },
//           { 
//             name: "Concert Choir", 
//             icon: Mic, 
//             level: "All Levels", 
//             director: "Ms. Williams", 
//             meeting: "Mon/Wed/Fri 3:30-5:00 PM",
//             show: true
//           },
//           { 
//             name: "Chamber Singers", 
//             icon: Mic, 
//             level: "Advanced", 
//             director: "Ms. Williams", 
//             meeting: "Tues/Thurs 4:00-6:00 PM",
//             show: true
//           },
//           { 
//             name: "Percussion Ensemble", 
//             icon: Drum, 
//             level: "Intermediate", 
//             director: "Mr. Johnson", 
//             meeting: "Fri 3:30-5:30 PM",
//             show: true
//           }
//         ],
//         'instruments': [
//           { 
//             name: "Strings", 
//             icon: Music, 
//             family: "Orchestral", 
//             instruments: "Violin, Viola, Cello, Bass",
//             show: true
//           },
//           { 
//             name: "Woodwinds", 
//             icon: Music, 
//             family: "Band", 
//             instruments: "Flute, Clarinet, Saxophone, Oboe, Bassoon",
//             show: true
//           },
//           { 
//             name: "Brass", 
//             icon: Music, 
//             family: "Band", 
//             instruments: "Trumpet, Trombone, French Horn, Tuba, Euphonium",
//             show: true
//           },
//           { 
//             name: "Percussion", 
//             icon: Drum, 
//             family: "Band/Orchestra", 
//             instruments: "Snare Drum, Timpani, Xylophone, Auxiliary",
//             show: true
//           },
//           { 
//             name: "Piano", 
//             icon: Piano, 
//             family: "All", 
//             instruments: "Classical, Jazz, Contemporary",
//             show: true
//           },
//           { 
//             name: "Guitar", 
//             icon: Guitar, 
//             family: "Contemporary", 
//             instruments: "Acoustic, Electric, Bass Guitar",
//             show: true
//           }
//         ],
//         'events': [
//           { 
//             name: "Winter Concert", 
//             icon: Calendar, 
//             date: "Dec 15, 2024", 
//             time: "7:00 PM", 
//             location: "School Auditorium",
//             show: true
//           },
//           { 
//             name: "Solo & Ensemble Festival", 
//             icon: Trophy, 
//             date: "Feb 22, 2024", 
//             time: "9:00 AM", 
//             location: "Music Wing",
//             show: true
//           },
//           { 
//             name: "Spring Musical", 
//             icon: Calendar, 
//             date: "Mar 20-23, 2024", 
//             time: "7:00 PM", 
//             location: "Main Theater",
//             show: true
//           },
//           { 
//             name: "Jazz Night", 
//             icon: Music2, 
//             date: "Apr 12, 2024", 
//             time: "6:30 PM", 
//             location: "Black Box Theater",
//             show: true
//           },
//           { 
//             name: "State Music Competition", 
//             icon: Award, 
//             date: "May 5-6, 2024", 
//             time: "All Day", 
//             location: "State University",
//             show: true
//           },
//           { 
//             name: "Pops Concert", 
//             icon: Star, 
//             date: "Jun 1, 2024", 
//             time: "6:00 PM", 
//             location: "Football Field",
//             show: true
//           }
//         ]
//       }
//     },
//     upcomingEvents: {
//       show: true,
//       title: "Upcoming Music Events",
//       description: "Mark your calendars for these exciting performances and activities",
//       items: [
//         {
//           title: "Fall Choral Concert",
//           date: "Oct 25, 2024",
//           time: "7:00 PM - 9:00 PM",
//           ensemble: "Concert Choir & Chamber Singers",
//           location: "School Auditorium",
//           show: true
//         },
//         {
//           title: "Band Olympics",
//           date: "Nov 8, 2024",
//           time: "4:00 PM - 7:00 PM",
//           ensemble: "All Band Students",
//           location: "Football Field",
//           show: true
//         },
//         {
//           title: "Middle School Music Night",
//           date: "Nov 15, 2024",
//           time: "6:30 PM - 8:30 PM",
//           ensemble: "Middle School Bands & Choirs",
//           location: "Cafeteria",
//           show: true
//         },
//         {
//           title: "Orchestra Hall Field Trip",
//           date: "Dec 5, 2024",
//           time: "9:00 AM - 4:00 PM",
//           ensemble: "Symphonic Orchestra",
//           location: "Downtown Concert Hall",
//           show: true
//         }
//       ],
//       ctaButton: {
//         label: "View Full Events Calendar",
//         show: true
//       }
//     },
//     achievements: {
//       show: true,
//       title: "Recent Achievements",
//       description: "Celebrating the accomplishments of our talented student musicians",
//       items: [
//         {
//           title: "State Champions",
//           year: "2024",
//           description: "Concert Band awarded 1st Place in State Competition",
//           icon: Trophy,
//           show: true
//         },
//         {
//           title: "Superior Ratings",
//           year: "2023",
//           description: "Jazz Ensemble received straight superior ratings at festival",
//           icon: Award,
//           show: true
//         },
//         {
//           title: "All-State Musicians",
//           year: "2024",
//           description: "12 students selected for All-State Honor Ensembles",
//           icon: Star,
//           show: true
//         },
//         {
//           title: "Music Program Award",
//           year: "2023",
//           description: "Recognized as Outstanding Music Program by State Association",
//           icon: Music,
//           show: true
//         }
//       ]
//     },
//     resources: {
//       show: true,
//       title: "Music Resources",
//       description: "Download important documents, practice materials, and performance schedules",
//       items: [
//         {
//           title: "Music Program Handbook",
//           description: "Policies, expectations, and calendar for all music students",
//           format: "PDF",
//           size: "1.8 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "Practice Schedule Templates",
//           description: "Weekly practice logs and goal-setting worksheets",
//           format: "PDF",
//           size: "0.7 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "Instrument Rental Guide",
//           description: "Information on acquiring and maintaining instruments",
//           format: "PDF",
//           size: "1.2 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "Upcoming Performances Calendar",
//           description: "Complete schedule of concerts and events for 2024-25",
//           format: "PDF",
//           size: "0.9 MB",
//           icon: Calendar,
//           show: true
//         }
//       ]
//     },
//     cta: {
//       show: true,
//       title: "Join Our Music Program",
//       description: "Whether you're a beginner or an experienced musician, there's a place for you in our music family",
//       buttons: [
//         { label: "Register for Music Classes", show: true },
//         { label: "Contact Music Director", show: true }
//       ]
//     },
//     contact: {
//       show: true,
//       title: "Music Department Contact",
//       items: [
//         {
//           icon: Phone,
//           label: "Phone",
//           value: "011-2336-3462 (Ext. 330)",
//           show: true
//         },
//         {
//           icon: Mail,
//           label: "Email",
//           value: "music@stcolumbas.edu.in",
//           show: true
//         },
//         {
//           icon: Clock,
//           label: "Office Hours",
//           value: "Mon-Fri: 9:00 AM - 5:00 PM",
//           show: true
//         }
//       ]
//     },
//     // Section visibility controls
//     showHero: true,
//     showBenefits: true,
//     showCategories: true,
//     showPrograms: true,
//     showUpcomingEvents: true,
//     showAchievements: true,
//     showResources: true,
//     showCta: true,
//     showContact: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...musicData };

//   // Filter functions
//   const filteredHeroStats = data.hero.stats.filter(stat => stat.show !== false);
//   const filteredBenefits = data.benefits.items.filter(benefit => benefit.show !== false);
//   const filteredCategories = data.categories.items.filter(cat => cat.show !== false);
//   const filteredPrograms = Object.fromEntries(
//     Object.entries(data.programs.items).map(([key, items]) => [
//       key, 
//       items.filter(item => item.show !== false)
//     ])
//   );
//   const filteredUpcomingEvents = data.upcomingEvents.items.filter(event => event.show !== false);
//   const filteredAchievements = data.achievements.items.filter(achievement => achievement.show !== false);
//   const filteredResources = data.resources.items.filter(resource => resource.show !== false);
//   const filteredCtaButtons = data.cta.buttons.filter(button => button.show !== false);
//   const filteredContactItems = data.contact.items.filter(item => item.show !== false);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} overflow-hidden`}>
//           <div className="absolute inset-0 bg-green-900/60 z-10"></div>
//           <img
//             src={data.hero.backgroundImage}
//             alt="Music Program"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 z-20 flex items-center justify-center">
//             <div className="text-center text-white px-4 max-w-4xl">
//               <h1 className="text-4xl font-bold mb-4">{data.hero.title}</h1>
//               <p className="text-xl mb-6 text-gray-200">
//                 {data.hero.subtitle}
//               </p>
//               {filteredHeroStats.length > 0 && (
//                 <div className="flex flex-wrap justify-center gap-6 mt-8">
//                   {filteredHeroStats.map((stat, index) => (
//                     <div key={index} className="text-center">
//                       <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
//                       <div className="text-sm text-green-200">{stat.label}</div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {data.hero.ctaButton.show && (
//                 <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-8">
//                   {data.hero.ctaButton.label}
//                   <Download className="inline ml-2 h-4 w-4" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Music Benefits */}
//       {data.showBenefits && data.benefits.show && filteredBenefits.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.benefits.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredBenefits.map((benefit, index) => {
//                 const IconComponent = benefit.icon;
//                 return (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center">
//                     <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{benefit.title}</h3>
//                     <p className="text-gray-600 text-sm">{benefit.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Music Categories Navigation */}
//       {data.showCategories && data.categories.show && filteredCategories.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.categories.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.categories.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//               {filteredCategories.map((category) => {
//                 const IconComponent = category.icon;
//                 return (
//                   <button
//                     key={category.id}
//                     onClick={() => setActiveCategory(category.id)}
//                     className={`flex flex-col items-center p-6 rounded-lg transition-all ${
//                       activeCategory === category.id
//                         ? 'bg-green-600 text-white shadow-lg'
//                         : 'bg-white text-gray-700 hover:bg-green-50'
//                     }`}
//                   >
//                     <IconComponent className="h-8 w-8 mb-3" />
//                     <h3 className="font-semibold mb-1">{category.name}</h3>
//                     <p className={`text-sm ${activeCategory === category.id ? 'text-green-100' : 'text-gray-500'}`}>
//                       {category.description}
//                     </p>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Content for Selected Category */}
//             {data.showPrograms && data.programs.show && filteredPrograms[activeCategory] && filteredPrograms[activeCategory].length > 0 && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                   {data.categories.items.find(c => c.id === activeCategory)?.name}
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {filteredPrograms[activeCategory].map((item, index) => {
//                     const IconComponent = item.icon;
//                     return (
//                       <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
//                         <div className="flex items-center mb-4">
//                           <div className="bg-green-100 rounded-full p-2 mr-3">
//                             <IconComponent className="h-5 w-5 text-green-600" />
//                           </div>
//                           <h4 className="font-semibold text-gray-800">{item.name}</h4>
//                         </div>
                        
//                         {activeCategory === 'programs' && (
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex items-center">
//                               <Users className="h-4 w-4 mr-2 text-green-500" />
//                               <span>Grades: {item.grades}</span>
//                             </div>
//                             <p>{item.description}</p>
//                           </div>
//                         )}
                        
//                         {activeCategory === 'ensembles' && (
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex items-center">
//                               <Target className="h-4 w-4 mr-2 text-green-500" />
//                               <span>Level: {item.level}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <Users className="h-4 w-4 mr-2 text-green-500" />
//                               <span>Director: {item.director}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <Clock className="h-4 w-4 mr-2 text-green-500" />
//                               <span>{item.meeting}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         {activeCategory === 'instruments' && (
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex items-center">
//                               <Music className="h-4 w-4 mr-2 text-green-500" />
//                               <span>Family: {item.family}</span>
//                             </div>
//                             <p>Instruments: {item.instruments}</p>
//                           </div>
//                         )}
                        
//                         {activeCategory === 'events' && (
//                           <div className="space-y-2 text-sm text-gray-600">
//                             <div className="flex items-center">
//                               <Calendar className="h-4 w-4 mr-2 text-green-500" />
//                               <span>{item.date}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <Clock className="h-4 w-4 mr-2 text-green-500" />
//                               <span>{item.time}</span>
//                             </div>
//                             <div className="flex items-center">
//                               <MapPin className="h-4 w-4 mr-2 text-green-500" />
//                               <span>{item.location}</span>
//                             </div>
//                           </div>
//                         )}
                        
//                         <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
//                           Learn more
//                           <ChevronRight className="ml-1 h-4 w-4" />
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Upcoming Events */}
//       {data.showUpcomingEvents && data.upcomingEvents.show && filteredUpcomingEvents.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.upcomingEvents.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.upcomingEvents.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//               {filteredUpcomingEvents.map((event, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
//                       <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
//                         {event.ensemble}
//                       </span>
//                     </div>
//                     <div className="bg-green-50 text-green-700 text-center p-2 rounded-lg">
//                       <div className="font-bold text-sm">{event.date.split(' ')[0]}</div>
//                       <div className="text-xs">{event.date.split(' ')[1]}</div>
//                     </div>
//                   </div>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-2" />
//                       <span>{event.time}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <MapPin className="h-4 w-4 mr-2" />
//                       <span>{event.location}</span>
//                     </div>
//                   </div>
//                   <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
//                     View details
//                     <ChevronRight className="ml-1 h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {data.upcomingEvents.ctaButton.show && (
//               <div className="text-center">
//                 <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
//                   {data.upcomingEvents.ctaButton.label}
//                   <Calendar className="ml-2 h-5 w-5" />
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Achievements */}
//       {data.showAchievements && data.achievements.show && filteredAchievements.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.achievements.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.achievements.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredAchievements.map((achievement, index) => {
//                 const IconComponent = achievement.icon;
//                 return (
//                   <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
//                     <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <IconComponent className="h-6 w-6" />
//                     </div>
//                     <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
//                       {achievement.year}
//                     </span>
//                     <h3 className="font-semibold text-gray-800 mb-3">{achievement.title}</h3>
//                     <p className="text-gray-600 text-sm">{achievement.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Resources */}
//       {data.showResources && data.resources.show && filteredResources.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.resources.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredResources.map((resource, index) => {
//                 const IconComponent = resource.icon;
//                 return (
//                   <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
//                     <div className="flex items-start">
//                       <IconComponent className="h-6 w-6 text-green-600 mr-4 mt-1" />
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
//                         <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
//                         <div className="flex items-center text-xs text-gray-500">
//                           <span className="bg-gray-100 px-2 py-1 rounded mr-2">{resource.format}</span>
//                           <span>{resource.size}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
//                       Download
//                       <Download className="ml-2 h-4 w-4" />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* CTA Section */}
//       {data.showCta && data.cta.show && (
//         <section className="py-16 bg-green-800 text-white">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
//             <p className="text-lg mb-8 max-w-3xl mx-auto">
//               {data.cta.description}
//             </p>
//             {filteredCtaButtons.length > 0 && (
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 {filteredCtaButtons.map((button, index) => (
//                   <button key={index} className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
//                     {button.label}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Contact Information */}
//       {data.showContact && data.contact.show && filteredContactItems.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="bg-gray-50 rounded-lg p-8">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{data.contact.title}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {filteredContactItems.map((item, index) => {
//                   const IconComponent = item.icon;
//                   return (
//                     <div key={index} className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm">
//                       <IconComponent className="h-8 w-8 text-green-600 mb-3" />
//                       <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
//                       <p className="text-gray-600">{item.value}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default MusicPage;