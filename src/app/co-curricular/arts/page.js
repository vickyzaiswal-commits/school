"use client";
import React, { useState } from 'react';
import { 
  Palette,
  Music,
  Camera,
  Video,
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
  BookOpen,
  Theater,
  Dance,
  Brush,
  Mic,
  Phone,
  Mail,
  Piano,
  ArrowRight,
  Trophy,
  GraduationCap,
  Building,
  Globe,
  Lightbulb
} from 'lucide-react';

const ArtsCulturePage = ({ artsData }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProgram, setActiveProgram] = useState('visual-arts');
  const [openEvent, setOpenEvent] = useState(null);

  // JSON data to drive all content (will later come from a database)
  const jsonData = {
    hero: {
      show: true,
      title: "Arts & Culture",
      subtitle: "Nurturing creativity, expression, and cultural appreciation through comprehensive arts education",
      stats: [
        { value: "15+", label: "Arts Programs", show: true },
        { value: "200+", label: "Annual Events", show: true },
        { value: "50+", label: "National Awards", show: true }
      ],
      height: "h-96"
    },
    categories: {
      show: true,
      title: "Arts Programs",
      items: [
        { id: 'all', name: 'All Programs', icon: Palette, show: true },
        { id: 'visual-arts', name: 'Visual Arts', icon: Brush, show: true },
        { id: 'performing-arts', name: 'Performing Arts', icon: Theater, show: true },
        { id: 'literary-arts', name: 'Literary Arts', icon: BookOpen, show: true },
        { id: 'media-arts', name: 'Media Arts', icon: Camera, show: true }
      ]
    },
    programs: {
      show: true,
      title: "Program Details",
      offeringsTitle: "Program Offerings",
      achievementsTitle: "Recent Achievements",
      joinButtonLabel: "Join This Program",
      items: {
        'visual-arts': {
          title: 'Visual Arts Program',
          description: 'Exploring creativity through various visual media and techniques',
          activities: [
            {
              name: 'Drawing & Painting',
              description: 'Techniques in pencil, charcoal, watercolor, oil, and acrylic',
              schedule: 'Mon & Wed, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Ananya Roy',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Sculpture & Pottery',
              description: '3D art forms including clay modeling and ceramics',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Ravi Verma',
              level: 'Intermediate to Advanced',
              show: true
            },
            {
              name: 'Digital Art',
              description: 'Digital painting and graphic design using modern software',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Divya Mehta',
              level: 'Basic computer skills required',
              show: true
            }
          ],
          achievements: [
            'National Art Competition - 3 Gold Medals',
            'Annual Art Exhibition - 200+ artworks displayed',
            'Student artwork featured in local galleries',
            'Scholarships to art institutes'
          ],
          show: true
        },
        'performing-arts': {
          title: 'Performing Arts Program',
          description: 'Developing talent in music, dance, drama, and theater',
          activities: [
            {
              name: 'Western Music',
              description: 'Vocal training and instrument lessons (piano, guitar, violin)',
              schedule: 'Mon, Wed, Fri - 4:00 PM - 6:00 PM',
              instructor: 'Mr. Karan Mehra',
              level: 'Beginner to Advanced',
              show: true
            },
            {
              name: 'Indian Classical Music',
              description: 'Hindustani and Carnatic vocal and instrumental training',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Ms. Sunita Devi',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Dance',
              description: 'Indian classical, contemporary, and western dance forms',
              schedule: 'Mon - Fri, 4:30 PM - 6:30 PM',
              instructor: 'Ms. Priya Sharma',
              level: 'Various levels available',
              show: true
            },
            {
              name: 'Drama & Theater',
              description: 'Acting, stagecraft, and production skills',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Rajiv Kapoor',
              level: 'All levels welcome',
              show: true
            }
          ],
          achievements: [
            'National Youth Theater Festival - Best Production',
            'Inter-School Music Competition - 5 First Prizes',
            'Annual Cultural Night - 500+ audience',
            'Broadway Workshop collaboration'
          ],
          show: true
        },
        'literary-arts': {
          title: 'Literary Arts Program',
          description: 'Fostering creativity in writing, poetry, and literary expression',
          activities: [
            {
              name: 'Creative Writing',
              description: 'Fiction, non-fiction, and poetry writing workshops',
              schedule: 'Mon & Wed, 4:00 PM - 5:30 PM',
              instructor: 'Dr. Meera Desai',
              level: 'All levels welcome',
              show: true
            },
            {
              name: 'Debate & Public Speaking',
              description: 'Rhetoric, argumentation, and presentation skills',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Rohan Malhotra',
              level: 'Competitive team selection',
              show: true
            },
            {
              name: 'Journalism',
              description: 'School newspaper and digital media publishing',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Ms. Neha Gupta',
              level: 'Application required',
              show: true
            }
          ],
          achievements: [
            'National Debating Championship - Winners',
            'Student poetry published in literary magazines',
            'School newspaper award for excellence',
            'Creative writing scholarships'
          ],
          show: true
        },
        'media-arts': {
          title: 'Media Arts Program',
          description: 'Exploring digital creativity through photography, film, and design',
          activities: [
            {
              name: 'Photography',
              description: 'Digital and film photography techniques and editing',
              schedule: 'Mon & Wed, 4:00 PM - 6:00 PM',
              instructor: 'Mr. Alok Singh',
              level: 'Camera required',
              show: true
            },
            {
              name: 'Videography & Film',
              description: 'Short film production, editing, and storytelling',
              schedule: 'Tue & Thu, 4:00 PM - 6:00 PM',
              instructor: 'Ms. Sneha Reddy',
              level: 'Intermediate to Advanced',
              show: true
            },
            {
              name: 'Graphic Design',
              description: 'Digital design, branding, and visual communication',
              schedule: 'Fri, 3:30 PM - 5:30 PM',
              instructor: 'Mr. Vikram Joshi',
              level: 'Basic computer skills required',
              show: true
            }
          ],
          achievements: [
            'Student Film Festival - Best Documentary',
            'Photography exhibitions in city galleries',
            'Graphic design commissions for local businesses',
            'Media arts scholarships'
          ],
          show: true
        }
      }
    },
    facilities: {
      show: true,
      title: "Arts Facilities",
      items: [
        {
          name: 'Art Studio',
          description: 'Fully equipped studio with natural lighting and various media supplies',
          image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2158&q=80',
          features: ['Natural lighting', 'Pottery wheels', 'Printing press', 'Drying racks'],
          show: true
        },
        {
          name: 'Music Rooms',
          description: 'Soundproof practice rooms with various instruments and recording equipment',
          image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
          features: ['Grand piano', 'Recording equipment', 'Practice rooms', 'Instrument storage'],
          show: true
        },
        {
          name: 'Theater Auditorium',
          description: '300-seat professional theater with stage lighting and sound systems',
          image: 'https://images.unsplash.com/photo-1542327897-d73d4ec2f6f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
          features: ['Professional lighting', 'Sound system', 'Green room', 'Costume storage'],
          show: true
        },
        {
          name: 'Media Lab',
          description: 'Computer lab with professional software for digital arts and media production',
          image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=2086&q=80',
          features: ['iMac workstations', 'Adobe Creative Suite', 'Recording booth', 'Editing stations'],
          show: true
        }
      ]
    },
    upcomingEvents: {
      show: true,
      title: "Upcoming Events",
      registerButtonLabel: "Register",
      items: [
        {
          date: '2024-04-20',
          title: 'Annual Art Exhibition',
          time: '10:00 AM - 4:00 PM',
          venue: 'School Art Gallery',
          description: 'Showcasing student artwork from all visual arts programs',
          category: 'visual-arts',
          show: true
        },
        {
          date: '2024-05-05',
          title: 'Spring Music Concert',
          time: '6:00 PM - 8:00 PM',
          venue: 'School Auditorium',
          description: 'Performance by music students featuring various genres',
          category: 'performing-arts',
          show: true
        },
        {
          date: '2024-05-15',
          title: 'Drama Production: "The Tempest"',
          time: '7:00 PM - 9:00 PM',
          venue: 'Main Auditorium',
          description: 'Shakespearean play performed by drama students',
          category: 'performing-arts',
          show: true
        },
        {
          date: '2024-05-25',
          title: 'Poetry Slam Competition',
          time: '4:00 PM - 6:00 PM',
          venue: 'Library Amphitheater',
          description: 'Inter-school poetry performance competition',
          category: 'literary-arts',
          show: true
        },
        {
          date: '2024-06-05',
          title: 'Student Film Festival',
          time: '5:00 PM - 8:00 PM',
          venue: 'Media Center',
          description: 'Screening of student-produced short films and documentaries',
          category: 'media-arts',
          show: true
        }
      ]
    },
    achievements: {
      show: true,
      title: "Arts Achievements",
      items: [
        {
          year: '2023',
          items: [
            'National Art Competition - 5 Gold Medals',
            'All-India Music Festival - Best Choir Award',
            'Youth Theater Festival - Best Original Script',
            'National Debating Championship - Runners-up'
          ],
          show: true
        },
        {
          year: '2022',
          items: [
            'Student film selected for International Children\'s Film Festival',
            'Art students received scholarships to prestigious art schools',
            'Dance team won regional classical dance competition',
            'School newspaper awarded "Best Layout Design"'
          ],
          show: true
        },
        {
          year: '2021',
          items: [
            'Music students performed with Symphony Orchestra',
            'Art exhibition featured in city art gallery',
            'Drama production invited to national theater festival',
            'Creative writing published in national literary magazine'
          ],
          show: true
        }
      ]
    },
    faculty: {
      show: true,
      title: "Arts Faculty",
      items: [
        {
          name: 'Ms. Ananya Roy',
          role: 'Visual Arts Director',
          qualification: 'MFA in Painting, College of Art, Delhi',
          specialty: 'Oil Painting, Mixed Media',
          experience: '15 years',
          show: true
        },
        {
          name: 'Mr. Karan Mehra',
          role: 'Music Director',
          qualification: 'Sangeet Visharad, Trinity College Certified',
          specialty: 'Western Classical, Piano',
          experience: '12 years',
          show: true
        },
        {
          name: 'Ms. Priya Sharma',
          role: 'Dance Instructor',
          qualification: 'Kathak Visharad, Contemporary Dance Certification',
          specialty: 'Kathak, Contemporary Fusion',
          experience: '10 years',
          show: true
        },
        {
          name: 'Dr. Meera Desai',
          role: 'Literary Arts Coordinator',
          qualification: 'Ph.D. in English Literature',
          specialty: 'Creative Writing, Poetry',
          experience: '18 years',
          show: true
        }
      ]
    },
    gallery: {
      show: true,
      title: "Student Gallery",
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      showFullGalleryButton: true,
      fullGalleryButtonLabel: "View Full Gallery"
    },
    cta: {
      show: true,
      title: "Join Our Creative Community",
      description: "Discover your artistic potential and be part of our vibrant arts community. Whether you're a beginner or advanced artist, we have programs to nurture your talent.",
      buttons: [
        { label: "Apply for Arts Program", show: true },
        { label: "Schedule Audition", show: true }
      ]
    },
    contact: {
      show: true,
      title: "Arts Department Contact",
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
          value: "arts@stcolumbas.edu.in",
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
    showHero: true,
    showCategories: true,
    showPrograms: true,
    showFacilities: true,
    showUpcomingEvents: true,
    showAchievements: true,
    showFaculty: true,
    showGallery: true,
    showCta: true,
    showContact: true
  };

  // Use artsData if provided (e.g., from a database), otherwise fall back to jsonData
  const data = artsData || jsonData;

  // Filter functions to respect show properties
  const filteredHeroStats = data.hero?.stats?.filter(stat => stat.show !== false) || [];
  const filteredCategories = data.categories?.items?.filter(cat => cat.show !== false) || [];
  const filteredPrograms = data.programs?.items ? 
    Object.fromEntries(
      Object.entries(data.programs.items).filter(([key, program]) => program.show !== false)
    ) : {};
  const filteredFacilities = data.facilities?.items?.filter(facility => facility.show !== false) || [];
  const filteredEvents = data.upcomingEvents?.items?.filter(event => event.show !== false) || [];
  const filteredAchievements = data.achievements?.items?.filter(achievement => achievement.show !== false) || [];
  const filteredFaculty = data.faculty?.items?.filter(teacher => teacher.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredContactItems = data.contact?.items?.filter(item => item.show !== false) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero?.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero?.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero?.subtitle}
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
        {/* Categories Navigation */}
        {data.showCategories && data.categories?.show && filteredCategories.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.categories?.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {filteredCategories.map(category => {
                const IconComponent = category.icon || Palette; // Fallback to Palette if icon is missing
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      if (category.id !== 'all') setActiveProgram(category.id);
                    }}
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

        {/* Program Details */}
        {data.showPrograms && data.programs?.show && filteredPrograms[activeProgram] && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{filteredPrograms[activeProgram].title}</h2>
            <p className="text-gray-600 mb-8">{filteredPrograms[activeProgram].description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Activities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.programs?.offeringsTitle}</h3>
                <div className="space-y-4">
                  {filteredPrograms[activeProgram].activities
                    ?.filter(activity => activity.show !== false)
                    .map((activity, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-2">{activity.name}</h4>
                        <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2" />
                            {activity.schedule}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Users className="h-4 w-4 mr-2" />
                            Instructor: {activity.instructor}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Star className="h-4 w-4 mr-2" />
                            Level: {activity.level}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{data.programs?.achievementsTitle}</h3>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    {filteredPrograms[activeProgram].achievements?.map((achievement, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Award className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    {data.programs?.joinButtonLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Facilities */}
        {data.showFacilities && data.facilities?.show && filteredFacilities.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.facilities?.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFacilities.map((facility, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={facility.image || 'https://via.placeholder.com/300'}
                      alt={facility.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{facility.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{facility.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {facility.features?.map((feature, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {data.showUpcomingEvents && data.upcomingEvents?.show && filteredEvents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.upcomingEvents?.title}</h2>
            <div className="space-y-4">
              {filteredEvents.map((event, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
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
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-shrink-0">
                      {data.upcomingEvents?.registerButtonLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {data.showAchievements && data.achievements?.show && filteredAchievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.achievements?.title}</h2>
            <div className="space-y-6">
              {filteredAchievements.map((year, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{year.year}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {year.items?.map((item, idx) => (
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
        {data.showFaculty && data.faculty?.show && filteredFaculty.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.faculty?.title}</h2>
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

        {/* Gallery Preview */}
        {data.showGallery && data.gallery?.show && data.gallery?.items?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{data.gallery?.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery.items.map((item) => (
                <div key={item} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
                    <Palette className="h-8 w-8 text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
            {data.gallery?.showFullGalleryButton && (
              <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                {data.gallery?.fullGalleryButtonLabel}
              </button>
            )}
          </div>
        )}

        {/* CTA Section */}
        {data.showCta && data.cta?.show && (
          <div className="bg-green-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{data.cta?.title}</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              {data.cta?.description}
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
        {data.showContact && data.contact?.show && filteredContactItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{data.contact?.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredContactItems.map((item, index) => {
                const IconComponent = item.icon || Phone; // Fallback to Phone if icon is missing
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

export default ArtsCulturePage;