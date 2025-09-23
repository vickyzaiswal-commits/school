"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Target,
  Clock,
  Download,
  ExternalLink,
  ArrowRight,
  Book,
  Calculator,
  Palette,
  Microscope,
  Globe,
  Code,
  Music,
  Heart,
  Brain,
  Lightbulb,
  Shield,
  BarChart3,
  Languages,
  FileText,
  Settings,
  X
} from 'lucide-react';

const CurriculumPage = ({ schoolData = {} }) => {
  const [activeLevel, setActiveLevel] = useState('primary');
  const [isVisible, setIsVisible] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const role = 'admin'; // Should come from auth context

  // Default data structure - Consistent with other pages
  const defaultData = {
    hero: {
      show: true,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Academic Curriculum",
      subtitle: "A comprehensive educational framework designed to nurture intellectual growth and character development",
      cta: "Download Curriculum Overview",
      height: "h-96"
    },
    philosophy: {
      show: true,
      title: "Our Educational Philosophy",
      description: "At St. Columba's, we follow a holistic approach to education that balances academic excellence with character formation, inspired by the Edmund Rice educational tradition.",
      pillars: [
        {
          icon: Brain,
          title: "Cognitive Development",
          description: "Developing critical thinking, problem-solving, and analytical skills through challenging academic content.",
          show: true
        },
        {
          icon: Heart,
          title: "Character Building",
          description: "Fostering values, ethics, and social responsibility through our Edmund Rice education philosophy.",
          show: true
        },
        {
          icon: Lightbulb,
          title: "Creative Expression",
          description: "Encouraging innovation, creativity, and artistic expression across all disciplines.",
          show: true
        },
        {
          icon: Users,
          title: "Collaborative Learning",
          description: "Promoting teamwork, communication, and interpersonal skills through group activities.",
          show: true
        }
      ],
      show: true
    },
    academicLevels: {
      show: true,
      title: "Academic Programs",
      description: "Explore our comprehensive curriculum across different educational stages",
      levels: [
        { id: 'primary', name: 'Primary School', icon: Book, grades: 'Classes I-V', show: true },
        { id: 'middle', name: 'Middle School', icon: Calculator, grades: 'Classes VI-VIII', show: true },
        { id: 'secondary', name: 'Secondary School', icon: GraduationCap, grades: 'Classes IX-X', show: true },
        { id: 'senior', name: 'Senior Secondary', icon: Target, grades: 'Classes XI-XII', show: true }
      ],
      show: true
    },
    subjects: {
      primary: [
        { name: "English Language", icon: BookOpen, show: true },
        { name: "Mathematics", icon: Calculator, show: true },
        { name: "Environmental Studies", icon: Globe, show: true },
        { name: "Hindi", icon: Languages, show: true },
        { name: "Art Education", icon: Palette, show: true },
        { name: "Physical Education", icon: Heart, show: true },
        { name: "Value Education", icon: Shield, show: true },
        { name: "Computer Basics", icon: Code, show: true }
      ],
      middle: [
        { name: "English", icon: BookOpen, show: true },
        { name: "Hindi", icon: Languages, show: true },
        { name: "Mathematics", icon: Calculator, show: true },
        { name: "Science", icon: Microscope, show: true },
        { name: "Social Science", icon: Globe, show: true },
        { name: "Computer Science", icon: Code, show: true },
        { name: "Art Education", icon: Palette, show: true },
        { name: "Physical Education", icon: Heart, show: true },
        { name: "Value Education", icon: Shield, show: true }
      ],
      secondary: [
        { name: "English Communicative", icon: BookOpen, show: true },
        { name: "Hindi Course A/B", icon: Languages, show: true },
        { name: "Mathematics Standard/Basic", icon: Calculator, show: true },
        { name: "Science", icon: Microscope, show: true },
        { name: "Social Science", icon: Globe, show: true },
        { name: "Information Technology", icon: Code, show: true },
        { name: "Art Education", icon: Palette, show: true },
        { name: "Health & Physical Education", icon: Heart, show: true }
      ],
      senior: [
        { 
          stream: "Science Stream",
          subjects: [
            { name: "Physics", icon: Microscope, show: true },
            { name: "Chemistry", icon: Microscope, show: true },
            { name: "Mathematics", icon: Calculator, show: true },
            { name: "Biology/Computer Science", icon: Code, show: true },
            { name: "English Core", icon: BookOpen, show: true }
          ],
          show: true
        },
        { 
          stream: "Commerce Stream",
          subjects: [
            { name: "Accountancy", icon: BarChart3, show: true },
            { name: "Business Studies", icon: Target, show: true },
            { name: "Economics", icon: Globe, show: true },
            { name: "Mathematics/Informatics Practices", icon: Calculator, show: true },
            { name: "English Core", icon: BookOpen, show: true }
          ],
          show: true
        },
        { 
          stream: "Humanities Stream",
          subjects: [
            { name: "History", icon: Book, show: true },
            { name: "Political Science", icon: Globe, show: true },
            { name: "Economics", icon: BarChart3, show: true },
            { name: "Psychology/Mathematics", icon: Brain, show: true },
            { name: "English Core", icon: BookOpen, show: true }
          ],
          show: true
        }
      ]
    },
    assessment: {
      show: true,
      title: "Assessment Structure",
      description: "Comprehensive evaluation system designed to measure holistic development",
      levels: [
        {
          level: "Primary (I-V)",
          pattern: "Continuous and Comprehensive Evaluation (CCE)",
          components: ["Formative Assessments", "Project Work", "Class Participation", "Skill Development", "Summative Tests"],
          show: true
        },
        {
          level: "Middle (VI-VIII)",
          pattern: "Grading System with Periodic Tests",
          components: ["Periodic Tests", "Notebook Submission", "Subject Enrichment", "Multiple Assessment", "Half-Yearly & Annual Exams"],
          show: true
        },
        {
          level: "Secondary (IX-X)",
          pattern: "CBSE Board Pattern Preparation",
          components: ["Periodic Tests", "Pre-Board Exams", "Practical Assessments", "Project Work", "Board Exam Preparation"],
          show: true
        },
        {
          level: "Senior Secondary (XI-XII)",
          pattern: "CBSE Board Examination",
          components: ["Unit Tests", "Practical Exams", "Project Submission", "Pre-Board Exams", "Board Examinations"],
          show: true
        }
      ],
      grading: {
        show: true,
        title: "Grading System",
        description: "We follow the CBSE grading system that emphasizes continuous comprehensive evaluation rather than just examination results.",
        weightage: [
          { component: "Periodic Tests", percentage: "20%", show: true },
          { component: "Notebook Submission", percentage: "5%", show: true },
          { component: "Subject Enrichment", percentage: "5%", show: true },
          { component: "Term-End Exam", percentage: "70%", show: true }
        ],
        show: true
      }
    },
    specialPrograms: {
      show: true,
      title: "Special Academic Programs",
      description: "Enhancing learning beyond the conventional curriculum",
      programs: [
        {
          icon: Code,
          title: "STEM Education",
          description: "Integrated Science, Technology, Engineering and Mathematics program with hands-on learning and robotics.",
          show: true
        },
        {
          icon: Globe,
          title: "Global Perspectives",
          description: "International exchange programs, model UN, and global citizenship education.",
          show: true
        },
        {
          icon: Heart,
          title: "Social Outreach",
          description: "Community service programs and social awareness initiatives as part of value education.",
          show: true
        },
        {
          icon: Lightbulb,
          title: "Innovation Lab",
          description: "Dedicated space for innovation, design thinking, and entrepreneurial projects.",
          show: true
        }
      ],
      show: true
    },
    resources: {
      show: true,
      title: "Curriculum Resources",
      description: "Download detailed curriculum documents and academic planners",
      items: [
        {
          title: "Primary School Curriculum Guide",
          description: "Detailed syllabus and learning objectives for Classes I-V",
          format: "PDF",
          size: "2.1 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Middle School Academic Planner",
          description: "Yearly academic plan and assessment schedule for Classes VI-VIII",
          format: "PDF",
          size: "1.8 MB",
          icon: FileText,
          show: true
        },
        {
          title: "CBSE Secondary Curriculum",
          description: "Complete syllabus for Classes IX-X as prescribed by CBSE",
          format: "PDF",
          size: "3.2 MB",
          icon: FileText,
          show: true
        },
        {
          title: "Senior Secondary Stream Options",
          description: "Detailed information about Science, Commerce and Humanities streams",
          format: "PDF",
          size: "2.5 MB",
          icon: FileText,
          show: true
        }
      ],
      show: true
    },
    academicCalendar: {
      show: true,
      title: "Academic Calendar 2024-25",
      description: "Download our comprehensive academic calendar containing important dates, examination schedules, holidays, and school events for the current academic year.",
      primaryCta: "Download Calendar",
      secondaryCta: "View Online Version",
      show: true
    },
    showHero: true,
    showPhilosophy: true,
    showAcademicLevels: true,
    showAssessment: true,
    showSpecialPrograms: true,
    showResources: true,
    showAcademicCalendar: true
  };

  // Initialize data by merging defaultData with schoolData
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

  // IntersectionObserver for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Handle opening edit modal for a section
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (Array.isArray(data[section])) {
      setEditData([...data[section]]);
    } else {
      setEditData({ ...data[section] });
    }
  };

  // Handle change for object fields
  const handleObjectChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  // Handle change for nested arrays
  const handleNestedArrayChange = (nestedKey, index, field, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = { ...updated[nestedKey][index], [field]: value };
    setEditData(updated);
  };

  // Handle change for string arrays (e.g., components in assessment levels)
  const handleStringArrayChange = (nestedKey, index, value) => {
    const updated = { ...editData };
    updated[nestedKey][index] = value;
    setEditData(updated);
  };

  // Special handler for subjects (since it's an object with arrays)
  const handleSubjectsChange = (level, index, field, value) => {
    const updated = { ...editData };
    if (level === 'senior') {
      updated.senior[index][field] = value;
    } else {
      updated[level][index][field] = value;
    }
    setEditData(updated);
  };

  // Special handler for senior subjects nested
  const handleSeniorSubjectsChange = (streamIndex, subjectIndex, field, value) => {
    const updated = { ...editData };
    updated.senior[streamIndex].subjects[subjectIndex][field] = value;
    setEditData(updated);
  };

  // Save changes to state
  const saveChanges = () => {
    const updatedData = { ...data, [editSection]: editData };
    setData(updatedData);
    console.log('Payload to save in database:', JSON.stringify(updatedData, null, 2));
    setEditFormOpen(false);
  };

  // Filter functions
  const filteredPhilosophyPillars = data.philosophy.pillars.filter(pillar => pillar.show !== false);
  const filteredAcademicLevels = data.academicLevels.levels.filter(level => level.show !== false);
  const filteredAssessmentLevels = data.assessment.levels.filter(level => level.show !== false);
  const filteredGradingWeightage = data.assessment.grading.weightage.filter(item => item.show !== false);
  const filteredSpecialPrograms = data.specialPrograms.programs.filter(program => program.show !== false);
  const filteredResources = data.resources.items.filter(item => item.show !== false);

  const getFilteredSubjects = () => {
    if (activeLevel === 'primary') return data.subjects.primary.filter(subject => subject.show !== false);
    if (activeLevel === 'middle') return data.subjects.middle.filter(subject => subject.show !== false);
    if (activeLevel === 'secondary') return data.subjects.secondary.filter(subject => subject.show !== false);
    if (activeLevel === 'senior') return data.subjects.senior.filter(stream => stream.show !== false);
    return [];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Edit Modal */}
      {editMode && editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl m-4 flex flex-col max-h-[90vh]">
            {/* Fixed Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit {editSection}</h2>
              <button
                onClick={() => setEditFormOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {/* Scrollable Modal Content */}
            <div className="p-6 overflow-y-auto">
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                      type="text"
                      value={editData.image || ''}
                      onChange={(e) => handleObjectChange('image', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Subtitle</label>
                    <textarea
                      value={editData.subtitle || ''}
                      onChange={(e) => handleObjectChange('subtitle', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">CTA</label>
                    <input
                      type="text"
                      value={editData.cta || ''}
                      onChange={(e) => handleObjectChange('cta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                      type="text"
                      value={editData.height || ''}
                      onChange={(e) => handleObjectChange('height', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Hero</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'philosophy' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Philosophy</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Pillars</h3>
                  {editData.pillars && editData.pillars.map((pillar, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Pillar {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={pillar.title || ''}
                          onChange={(e) => handleNestedArrayChange('pillars', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={pillar.description || ''}
                          onChange={(e) => handleNestedArrayChange('pillars', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={pillar.show !== false}
                            onChange={(e) => handleNestedArrayChange('pillars', index, 'show', e.target.checked)}
                          />
                          <span>Show Pillar</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'academicLevels' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Academic Levels</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Levels</h3>
                  {editData.levels && editData.levels.map((level, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Level {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">ID</label>
                        <input
                          type="text"
                          value={level.id || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'id', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={level.name || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Grades</label>
                        <input
                          type="text"
                          value={level.grades || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'grades', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={level.show !== false}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'show', e.target.checked)}
                          />
                          <span>Show Level</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'subjects' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-2">Primary Subjects</h3>
                  {editData.primary && editData.primary.map((subject, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={subject.name || ''}
                          onChange={(e) => handleSubjectsChange('primary', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subject.show !== false}
                            onChange={(e) => handleSubjectsChange('primary', index, 'show', e.target.checked)}
                          />
                          <span>Show Subject</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">Middle Subjects</h3>
                  {editData.middle && editData.middle.map((subject, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={subject.name || ''}
                          onChange={(e) => handleSubjectsChange('middle', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subject.show !== false}
                            onChange={(e) => handleSubjectsChange('middle', index, 'show', e.target.checked)}
                          />
                          <span>Show Subject</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">Secondary Subjects</h3>
                  {editData.secondary && editData.secondary.map((subject, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                          type="text"
                          value={subject.name || ''}
                          onChange={(e) => handleSubjectsChange('secondary', index, 'name', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={subject.show !== false}
                            onChange={(e) => handleSubjectsChange('secondary', index, 'show', e.target.checked)}
                          />
                          <span>Show Subject</span>
                        </label>
                      </div>
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mb-2">Senior Streams</h3>
                  {editData.senior && editData.senior.map((stream, index) => (
                    <div key={index} className="mb-6 border p-2 rounded">
                      <h4 className="text-md font-semibold mb-2">Stream {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Stream Name</label>
                        <input
                          type="text"
                          value={stream.stream || ''}
                          onChange={(e) => handleSubjectsChange('senior', index, 'stream', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={stream.show !== false}
                            onChange={(e) => handleSubjectsChange('senior', index, 'show', e.target.checked)}
                          />
                          <span>Show Stream</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Subjects</h5>
                      {stream.subjects && stream.subjects.map((subject, sIndex) => (
                        <div key={sIndex} className="mb-2">
                          <label className="block text-sm font-medium">Subject {sIndex + 1}</label>
                          <input
                            type="text"
                            value={subject.name || ''}
                            onChange={(e) => handleSeniorSubjectsChange(index, sIndex, 'name', e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                          <label className="flex items-center space-x-2 mt-1">
                            <input
                              type="checkbox"
                              checked={subject.show !== false}
                              onChange={(e) => handleSeniorSubjectsChange(index, sIndex, 'show', e.target.checked)}
                            />
                            <span>Show Subject</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'assessment' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Assessment</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Levels</h3>
                  {editData.levels && editData.levels.map((level, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Level {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Level</label>
                        <input
                          type="text"
                          value={level.level || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'level', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Pattern</label>
                        <input
                          type="text"
                          value={level.pattern || ''}
                          onChange={(e) => handleNestedArrayChange('levels', index, 'pattern', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={level.show !== false}
                            onChange={(e) => handleNestedArrayChange('levels', index, 'show', e.target.checked)}
                          />
                          <span>Show Level</span>
                        </label>
                      </div>
                      <h5 className="text-sm font-semibold mt-4 mb-2">Components</h5>
                      {level.components && level.components.map((component, cIndex) => (
                        <div key={cIndex} className="mb-2">
                          <label className="block text-sm font-medium">Component {cIndex + 1}</label>
                          <input
                            type="text"
                            value={component || ''}
                            onChange={(e) => {
                              const updated = { ...editData };
                              updated.levels[index].components[cIndex] = e.target.value;
                              setEditData(updated);
                            }}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                  <h3 className="text-lg font-semibold mt-4 mb-2">Grading</h3>
                  <div>
                    <label className="block text-sm font-medium">Grading Title</label>
                    <input
                      type="text"
                      value={editData.grading.title || ''}
                      onChange={(e) => {
                        const updated = { ...editData };
                        updated.grading.title = e.target.value;
                        setEditData(updated);
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Grading Description</label>
                    <textarea
                      value={editData.grading.description || ''}
                      onChange={(e) => {
                        const updated = { ...editData };
                        updated.grading.description = e.target.value;
                        setEditData(updated);
                      }}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.grading.show !== false}
                        onChange={(e) => {
                          const updated = { ...editData };
                          updated.grading.show = e.target.checked;
                          setEditData(updated);
                        }}
                      />
                      <span>Show Grading</span>
                    </label>
                  </div>
                  <h5 className="text-sm font-semibold mt-4 mb-2">Weightage</h5>
                  {editData.grading.weightage && editData.grading.weightage.map((item, index) => (
                    <div key={index} className="mb-4 border p-2 rounded">
                      <div>
                        <label className="block text-sm font-medium">Component</label>
                        <input
                          type="text"
                          value={item.component || ''}
                          onChange={(e) => {
                            const updated = { ...editData };
                            updated.grading.weightage[index].component = e.target.value;
                            setEditData(updated);
                          }}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Percentage</label>
                        <input
                          type="text"
                          value={item.percentage || ''}
                          onChange={(e) => {
                            const updated = { ...editData };
                            updated.grading.weightage[index].percentage = e.target.value;
                            setEditData(updated);
                          }}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => {
                              const updated = { ...editData };
                              updated.grading.weightage[index].show = e.target.checked;
                              setEditData(updated);
                            }}
                          />
                          <span>Show Weightage</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'specialPrograms' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Special Programs</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Programs</h3>
                  {editData.programs && editData.programs.map((program, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Program {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={program.title || ''}
                          onChange={(e) => handleNestedArrayChange('programs', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={program.description || ''}
                          onChange={(e) => handleNestedArrayChange('programs', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={program.show !== false}
                            onChange={(e) => handleNestedArrayChange('programs', index, 'show', e.target.checked)}
                          />
                          <span>Show Program</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Resources</span>
                    </label>
                  </div>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Items</h3>
                  {editData.items && editData.items.map((item, index) => (
                    <div key={index} className="mb-6 border-b pb-4">
                      <h4 className="text-md font-semibold mb-2">Item {index + 1}</h4>
                      <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'title', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                          value={item.description || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'description', e.target.value)}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Format</label>
                        <input
                          type="text"
                          value={item.format || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'format', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Size</label>
                        <input
                          type="text"
                          value={item.size || ''}
                          onChange={(e) => handleNestedArrayChange('items', index, 'size', e.target.value)}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={item.show !== false}
                            onChange={(e) => handleNestedArrayChange('items', index, 'show', e.target.checked)}
                          />
                          <span>Show Item</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {editSection === 'academicCalendar' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => handleObjectChange('title', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => handleObjectChange('description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Primary CTA</label>
                    <input
                      type="text"
                      value={editData.primaryCta || ''}
                      onChange={(e) => handleObjectChange('primaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Secondary CTA</label>
                    <input
                      type="text"
                      value={editData.secondaryCta || ''}
                      onChange={(e) => handleObjectChange('secondaryCta', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editData.show !== false}
                        onChange={(e) => handleObjectChange('show', e.target.checked)}
                      />
                      <span>Show Academic Calendar</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditFormOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero.show && (
        <section
          id="hero"
          className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden animate-on-scroll ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">{data.hero.subtitle}</p>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('hero')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Philosophy Section */}
      {data.showPhilosophy && data.philosophy.show && filteredPhilosophyPillars.length > 0 && (
        <section
          id="philosophy"
          className={`py-16 bg-white animate-on-scroll ${isVisible.philosophy ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.philosophy.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.philosophy.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhilosophyPillars.map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('philosophy')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Academic Levels */}
      {data.showAcademicLevels && data.academicLevels.show && filteredAcademicLevels.length > 0 && (
        <section
          id="academicLevels"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.academicLevels ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.academicLevels.title}</h2>
              <p className="text-lg text-gray-600">{data.academicLevels.description}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {filteredAcademicLevels.map((level) => {
                const IconComponent = level.icon;
                return (
                  <button
                    key={level.id}
                    onClick={() => setActiveLevel(level.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeLevel === level.id
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {level.name}
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {filteredAcademicLevels.find(l => l.id === activeLevel)?.name} Curriculum
              </h3>
              
              {activeLevel !== 'senior' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getFilteredSubjects().map((subject, index) => {
                    const IconComponent = subject.icon;
                    return (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                        <IconComponent className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-sm font-medium">{subject.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getFilteredSubjects().map((stream, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-800 mb-4 text-lg">{stream.stream}</h4>
                      <div className="space-y-3">
                        {stream.subjects.filter(subject => subject.show !== false).map((subject, sIndex) => {
                          const IconComponent = subject.icon;
                          return (
                            <div key={sIndex} className="flex items-center">
                              <IconComponent className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm">{subject.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Additional Components</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-green-700">
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" /> Value Education
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-3 w-3 mr-1" /> Physical Education
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-3 w-3 mr-1" /> General Studies
                  </span>
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" /> Life Skills
                  </span>
                </div>
              </div>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('academicLevels')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Assessment Pattern */}
      {data.showAssessment && data.assessment.show && filteredAssessmentLevels.length > 0 && (
        <section
          id="assessment"
          className={`py-16 bg-white animate-on-scroll ${isVisible.assessment ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.assessment.title}</h2>
              <p className="text-lg text-gray-600">{data.assessment.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAssessmentLevels.map((level, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800 mb-3">{level.level}</h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full inline-block mb-3">
                    {level.pattern}
                  </div>
                  <ul className="space-y-2">
                    {level.components.map((component, cIndex) => (
                      <li key={cIndex} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span>{component}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {data.assessment.grading.show && (
              <div className="mt-12 bg-green-700 text-white rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{data.assessment.grading.title}</h3>
                    <p className="mb-4">{data.assessment.grading.description}</p>
                    <a href="/grading-policy" className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center">
                      View Grading Policy
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Assessment Weightage</h4>
                    <div className="space-y-2 text-sm">
                      {filteredGradingWeightage.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.component}</span>
                          <span className="font-semibold">{item.percentage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {editMode && (
              <button
                onClick={() => openEditModal('assessment')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Special Programs */}
      {data.showSpecialPrograms && data.specialPrograms.show && filteredSpecialPrograms.length > 0 && (
        <section
          id="specialPrograms"
          className={`py-16 bg-gray-50 animate-on-scroll ${isVisible.specialPrograms ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.specialPrograms.title}</h2>
              <p className="text-lg text-gray-600">{data.specialPrograms.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpecialPrograms.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow group">
                    <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{program.title}</h3>
                    <p className="text-gray-600 text-sm">{program.description}</p>
                  </div>
                );
              })}
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('specialPrograms')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Resources */}
      {data.showResources && data.resources.show && filteredResources.length > 0 && (
        <section
          id="resources"
          className={`py-16 bg-white animate-on-scroll ${isVisible.resources ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
              <p className="text-lg text-gray-600">{data.resources.description}</p>
            </div>

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
                      Download Resource
                      <Download className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <a href="/curriculum-repository" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                View Complete Curriculum Repository
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('resources')}
                className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* Academic Calendar CTA */}
      {data.showAcademicCalendar && data.academicCalendar.show && (
        <section
          id="academicCalendar"
          className={`py-16 bg-green-800 text-white animate-on-scroll ${isVisible.academicCalendar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-4">{data.academicCalendar.title}</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">{data.academicCalendar.description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/download-calendar" className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                {data.academicCalendar.primaryCta}
              </a>
              <a href="/online-calendar" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
                {data.academicCalendar.secondaryCta}
              </a>
            </div>
            {editMode && (
              <button
                onClick={() => openEditModal('academicCalendar')}
                className="absolute top-4 right-4 bg-white/50 text-green-800 p-2 rounded-full hover:bg-white/70"
              >
                <Settings className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default CurriculumPage;




























// "use client";
// import React, { useState } from 'react';
// import { 
//   BookOpen, 
//   GraduationCap, 
//   Users, 
//   Target,
//   Clock,
//   Download,
//   ExternalLink,
//   ArrowRight,
//   Book,
//   Calculator,
//   Palette,
//   Microscope,
//   Globe,
//   Code,
//   Music,
//   Heart,
//   Brain,
//   Lightbulb,
//   Shield,
//   BarChart3,
//   Languages,
//   FileText
// } from 'lucide-react';

// const CurriculumPage = ({ schoolData = {} }) => {
//   const [activeLevel, setActiveLevel] = useState('primary');
  
//   // Default data structure - Consistent with other pages
//   const defaultData = {
//     hero: {
//       show: true,
//       image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Academic Curriculum",
//       subtitle: "A comprehensive educational framework designed to nurture intellectual growth and character development",
//       cta: "Download Curriculum Overview",
//       height: "h-96" // Consistent with other pages
//     },
//     philosophy: {
//       show: true,
//       title: "Our Educational Philosophy",
//       description: "At St. Columba's, we follow a holistic approach to education that balances academic excellence with character formation, inspired by the Edmund Rice educational tradition.",
//       pillars: [
//         {
//           icon: Brain,
//           title: "Cognitive Development",
//           description: "Developing critical thinking, problem-solving, and analytical skills through challenging academic content.",
//           show: true
//         },
//         {
//           icon: Heart,
//           title: "Character Building",
//           description: "Fostering values, ethics, and social responsibility through our Edmund Rice education philosophy.",
//           show: true
//         },
//         {
//           icon: Lightbulb,
//           title: "Creative Expression",
//           description: "Encouraging innovation, creativity, and artistic expression across all disciplines.",
//           show: true
//         },
//         {
//           icon: Users,
//           title: "Collaborative Learning",
//           description: "Promoting teamwork, communication, and interpersonal skills through group activities.",
//           show: true
//         }
//       ],
//       show: true
//     },
//     academicLevels: {
//       show: true,
//       title: "Academic Programs",
//       description: "Explore our comprehensive curriculum across different educational stages",
//       levels: [
//         { id: 'primary', name: 'Primary School', icon: Book, grades: 'Classes I-V', show: true },
//         { id: 'middle', name: 'Middle School', icon: Calculator, grades: 'Classes VI-VIII', show: true },
//         { id: 'secondary', name: 'Secondary School', icon: GraduationCap, grades: 'Classes IX-X', show: true },
//         { id: 'senior', name: 'Senior Secondary', icon: Target, grades: 'Classes XI-XII', show: true }
//       ],
//       show: true
//     },
//     subjects: {
//       primary: [
//         { name: "English Language", icon: BookOpen, show: true },
//         { name: "Mathematics", icon: Calculator, show: true },
//         { name: "Environmental Studies", icon: Globe, show: true },
//         { name: "Hindi", icon: Languages, show: true },
//         { name: "Art Education", icon: Palette, show: true },
//         { name: "Physical Education", icon: Heart, show: true },
//         { name: "Value Education", icon: Shield, show: true },
//         { name: "Computer Basics", icon: Code, show: true }
//       ],
//       middle: [
//         { name: "English", icon: BookOpen, show: true },
//         { name: "Hindi", icon: Languages, show: true },
//         { name: "Mathematics", icon: Calculator, show: true },
//         { name: "Science", icon: Microscope, show: true },
//         { name: "Social Science", icon: Globe, show: true },
//         { name: "Computer Science", icon: Code, show: true },
//         { name: "Art Education", icon: Palette, show: true },
//         { name: "Physical Education", icon: Heart, show: true },
//         { name: "Value Education", icon: Shield, show: true }
//       ],
//       secondary: [
//         { name: "English Communicative", icon: BookOpen, show: true },
//         { name: "Hindi Course A/B", icon: Languages, show: true },
//         { name: "Mathematics Standard/Basic", icon: Calculator, show: true },
//         { name: "Science", icon: Microscope, show: true },
//         { name: "Social Science", icon: Globe, show: true },
//         { name: "Information Technology", icon: Code, show: true },
//         { name: "Art Education", icon: Palette, show: true },
//         { name: "Health & Physical Education", icon: Heart, show: true }
//       ],
//       senior: [
//         { 
//           stream: "Science Stream",
//           subjects: [
//             { name: "Physics", icon: Microscope, show: true },
//             { name: "Chemistry", icon: Microscope, show: true },
//             { name: "Mathematics", icon: Calculator, show: true },
//             { name: "Biology/Computer Science", icon: Code, show: true },
//             { name: "English Core", icon: BookOpen, show: true }
//           ],
//           show: true
//         },
//         { 
//           stream: "Commerce Stream",
//           subjects: [
//             { name: "Accountancy", icon: BarChart3, show: true },
//             { name: "Business Studies", icon: Target, show: true },
//             { name: "Economics", icon: Globe, show: true },
//             { name: "Mathematics/Informatics Practices", icon: Calculator, show: true },
//             { name: "English Core", icon: BookOpen, show: true }
//           ],
//           show: true
//         },
//         { 
//           stream: "Humanities Stream",
//           subjects: [
//             { name: "History", icon: Book, show: true },
//             { name: "Political Science", icon: Globe, show: true },
//             { name: "Economics", icon: BarChart3, show: true },
//             { name: "Psychology/Mathematics", icon: Brain, show: true },
//             { name: "English Core", icon: BookOpen, show: true }
//           ],
//           show: true
//         }
//       ]
//     },
//     assessment: {
//       show: true,
//       title: "Assessment Structure",
//       description: "Comprehensive evaluation system designed to measure holistic development",
//       levels: [
//         {
//           level: "Primary (I-V)",
//           pattern: "Continuous and Comprehensive Evaluation (CCE)",
//           components: ["Formative Assessments", "Project Work", "Class Participation", "Skill Development", "Summative Tests"],
//           show: true
//         },
//         {
//           level: "Middle (VI-VIII)",
//           pattern: "Grading System with Periodic Tests",
//           components: ["Periodic Tests", "Notebook Submission", "Subject Enrichment", "Multiple Assessment", "Half-Yearly & Annual Exams"],
//           show: true
//         },
//         {
//           level: "Secondary (IX-X)",
//           pattern: "CBSE Board Pattern Preparation",
//           components: ["Periodic Tests", "Pre-Board Exams", "Practical Assessments", "Project Work", "Board Exam Preparation"],
//           show: true
//         },
//         {
//           level: "Senior Secondary (XI-XII)",
//           pattern: "CBSE Board Examination",
//           components: ["Unit Tests", "Practical Exams", "Project Submission", "Pre-Board Exams", "Board Examinations"],
//           show: true
//         }
//       ],
//       grading: {
//         show: true,
//         title: "Grading System",
//         description: "We follow the CBSE grading system that emphasizes continuous comprehensive evaluation rather than just examination results.",
//         weightage: [
//           { component: "Periodic Tests", percentage: "20%", show: true },
//           { component: "Notebook Submission", percentage: "5%", show: true },
//           { component: "Subject Enrichment", percentage: "5%", show: true },
//           { component: "Term-End Exam", percentage: "70%", show: true }
//         ],
//         show: true
//       }
//     },
//     specialPrograms: {
//       show: true,
//       title: "Special Academic Programs",
//       description: "Enhancing learning beyond the conventional curriculum",
//       programs: [
//         {
//           icon: Code,
//           title: "STEM Education",
//           description: "Integrated Science, Technology, Engineering and Mathematics program with hands-on learning and robotics.",
//           show: true
//         },
//         {
//           icon: Globe,
//           title: "Global Perspectives",
//           description: "International exchange programs, model UN, and global citizenship education.",
//           show: true
//         },
//         {
//           icon: Heart,
//           title: "Social Outreach",
//           description: "Community service programs and social awareness initiatives as part of value education.",
//           show: true
//         },
//         {
//           icon: Lightbulb,
//           title: "Innovation Lab",
//           description: "Dedicated space for innovation, design thinking, and entrepreneurial projects.",
//           show: true
//         }
//       ],
//       show: true
//     },
//     resources: {
//       show: true,
//       title: "Curriculum Resources",
//       description: "Download detailed curriculum documents and academic planners",
//       items: [
//         {
//           title: "Primary School Curriculum Guide",
//           description: "Detailed syllabus and learning objectives for Classes I-V",
//           format: "PDF",
//           size: "2.1 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "Middle School Academic Planner",
//           description: "Yearly academic plan and assessment schedule for Classes VI-VIII",
//           format: "PDF",
//           size: "1.8 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "CBSE Secondary Curriculum",
//           description: "Complete syllabus for Classes IX-X as prescribed by CBSE",
//           format: "PDF",
//           size: "3.2 MB",
//           icon: FileText,
//           show: true
//         },
//         {
//           title: "Senior Secondary Stream Options",
//           description: "Detailed information about Science, Commerce and Humanities streams",
//           format: "PDF",
//           size: "2.5 MB",
//           icon: FileText,
//           show: true
//         }
//       ],
//       show: true
//     },
//     academicCalendar: {
//       show: true,
//       title: "Academic Calendar 2024-25",
//       description: "Download our comprehensive academic calendar containing important dates, examination schedules, holidays, and school events for the current academic year.",
//       primaryCta: "Download Calendar",
//       secondaryCta: "View Online Version",
//       show: true
//     },
//     showHero: true,
//     showPhilosophy: true,
//     showAcademicLevels: true,
//     showAssessment: true,
//     showSpecialPrograms: true,
//     showResources: true,
//     showAcademicCalendar: true
//   };

//   // Merge provided data with defaults
//   const data = { ...defaultData, ...schoolData };

//   // Filter functions
//   const filteredPhilosophyPillars = data.philosophy.pillars.filter(pillar => pillar.show !== false);
//   const filteredAcademicLevels = data.academicLevels.levels.filter(level => level.show !== false);
//   const filteredAssessmentLevels = data.assessment.levels.filter(level => level.show !== false);
//   const filteredGradingWeightage = data.assessment.grading.weightage.filter(item => item.show !== false);
//   const filteredSpecialPrograms = data.specialPrograms.programs.filter(program => program.show !== false);
//   const filteredResources = data.resources.items.filter(item => item.show !== false);

//   // Get filtered subjects based on active level
//   const getFilteredSubjects = () => {
//     if (activeLevel === 'senior') {
//       return data.subjects.senior.filter(stream => stream.show !== false);
//     }
//     return data.subjects[activeLevel].filter(subject => subject.show !== false);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section - Consistent with other pages */}
//       {data.showHero && data.hero.show && (
//         <section className={`relative ${data.hero.height} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
//             <div className="max-w-3xl">
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
//               <p className="text-xl text-green-100 leading-relaxed">
//                 {data.hero.subtitle}
//               </p>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Curriculum Philosophy */}
//       {data.showPhilosophy && data.philosophy.show && filteredPhilosophyPillars.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.philosophy.title}</h2>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 {data.philosophy.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredPhilosophyPillars.map((pillar, index) => {
//                 const IconComponent = pillar.icon;
//                 return (
//                   <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-green-50 transition-all duration-300 group text-center">
//                     <div className="bg-green-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{pillar.title}</h3>
//                     <p className="text-gray-600 text-sm">{pillar.description}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Academic Levels Navigation */}
//       {data.showAcademicLevels && data.academicLevels.show && filteredAcademicLevels.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.academicLevels.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.academicLevels.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
//               {filteredAcademicLevels.map((level) => {
//                 const IconComponent = level.icon;
//                 return (
//                   <button
//                     key={level.id}
//                     onClick={() => setActiveLevel(level.id)}
//                     className={`flex flex-col items-center p-6 rounded-lg transition-all ${
//                       activeLevel === level.id
//                         ? 'bg-green-600 text-white shadow-lg'
//                         : 'bg-white text-gray-700 hover:bg-green-50'
//                     }`}
//                   >
//                     <IconComponent className="h-8 w-8 mb-3" />
//                     <h3 className="font-semibold mb-1">{level.name}</h3>
//                     <p className={`text-sm ${activeLevel === level.id ? 'text-green-100' : 'text-gray-500'}`}>
//                       {level.grades}
//                     </p>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Subjects for Selected Level */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                 {filteredAcademicLevels.find(l => l.id === activeLevel)?.name} Curriculum
//               </h3>
              
//               {activeLevel !== 'senior' ? (
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {getFilteredSubjects().map((subject, index) => {
//                     const IconComponent = subject.icon;
//                     return (
//                       <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
//                         <IconComponent className="h-5 w-5 text-green-600 mr-3" />
//                         <span className="text-sm font-medium">{subject.name}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {getFilteredSubjects().map((stream, index) => (
//                     <div key={index} className="bg-gray-50 rounded-lg p-5">
//                       <h4 className="font-semibold text-gray-800 mb-4 text-lg">{stream.stream}</h4>
//                       <div className="space-y-3">
//                         {stream.subjects.filter(subject => subject.show !== false).map((subject, sIndex) => {
//                           const IconComponent = subject.icon;
//                           return (
//                             <div key={sIndex} className="flex items-center">
//                               <IconComponent className="h-4 w-4 text-green-600 mr-2" />
//                               <span className="text-sm">{subject.name}</span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <div className="mt-8 p-4 bg-green-50 rounded-lg">
//                 <h4 className="font-semibold text-green-800 mb-2">Additional Components</h4>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-green-700">
//                   <span className="flex items-center">
//                     <Heart className="h-3 w-3 mr-1" /> Value Education
//                   </span>
//                   <span className="flex items-center">
//                     <Heart className="h-3 w-3 mr-1" /> Physical Education
//                   </span>
//                   <span className="flex items-center">
//                     <Globe className="h-3 w-3 mr-1" /> General Studies
//                   </span>
//                   <span className="flex items-center">
//                     <Shield className="h-3 w-3 mr-1" /> Life Skills
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Assessment Pattern */}
//       {data.showAssessment && data.assessment.show && filteredAssessmentLevels.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.assessment.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.assessment.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredAssessmentLevels.map((level, index) => (
//                 <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
//                   <h3 className="font-semibold text-gray-800 mb-3">{level.level}</h3>
//                   <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full inline-block mb-3">
//                     {level.pattern}
//                   </div>
//                   <ul className="space-y-2">
//                     {level.components.map((component, cIndex) => (
//                       <li key={cIndex} className="flex items-start text-sm text-gray-600">
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
//                         <span>{component}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>

//             {data.assessment.grading.show && (
//               <div className="mt-12 bg-green-700 text-white rounded-lg p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//                   <div>
//                     <h3 className="text-xl font-semibold mb-3">{data.assessment.grading.title}</h3>
//                     <p className="mb-4">{data.assessment.grading.description}</p>
//                     <a href="/grading-policy" className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center">
//                       View Grading Policy
//                       <ExternalLink className="ml-2 h-4 w-4" />
//                     </a>
//                   </div>
//                   <div className="bg-white/10 rounded-lg p-4">
//                     <h4 className="font-semibold mb-3">Assessment Weightage</h4>
//                     <div className="space-y-2 text-sm">
//                       {filteredGradingWeightage.map((item, index) => (
//                         <div key={index} className="flex justify-between">
//                           <span>{item.component}</span>
//                           <span className="font-semibold">{item.percentage}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* Special Programs */}
//       {data.showSpecialPrograms && data.specialPrograms.show && filteredSpecialPrograms.length > 0 && (
//         <section className="py-16 bg-gray-50">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.specialPrograms.title}</h2>
//               <p className="text-lg text-gray-600">
//                 {data.specialPrograms.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {filteredSpecialPrograms.map((program, index) => {
//                 const IconComponent = program.icon;
//                 return (
//                   <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow group">
//                     <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
//                       <IconComponent className="h-6 w-6 text-green-600" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">{program.title}</h3>
//                     <p className="text-gray-600 text-sm">{program.description}</p>
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
//                       Download Resource
//                       <Download className="ml-2 h-4 w-4" />
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="mt-12 text-center">
//               <a href="/curriculum-repository" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
//                 View Complete Curriculum Repository
//                 <ExternalLink className="ml-2 h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Academic Calendar CTA */}
//       {data.showAcademicCalendar && data.academicCalendar.show && (
//         <section className="py-16 bg-green-800 text-white">
//           <div className="max-w-7xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">{data.academicCalendar.title}</h2>
//             <p className="text-lg mb-8 max-w-3xl mx-auto">
//               {data.academicCalendar.description}
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <a href="/download-calendar" className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
//                 <Download className="mr-2 h-5 w-5" />
//                 {data.academicCalendar.primaryCta}
//               </a>
//               <a href="/online-calendar" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
//                 {data.academicCalendar.secondaryCta}
//               </a>
//             </div>
//           </div>
//         </section>
//       )}
//     </div>
//   );
// };

// export default CurriculumPage;