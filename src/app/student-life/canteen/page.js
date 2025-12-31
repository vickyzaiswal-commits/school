"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Utensils,
  Clock,
  Heart,
  Star,
  Users,
  Calendar,
  Download,
  Phone,
  MapPin,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Filter,
  Apple,
  Carrot,
  Wheat,
  Milk,
  Egg,
  ChefHat,
  Mail,
  Edit,
  X,
  Trash2
  ,
  Eye,
  EyeOff
} from 'lucide-react';
import { apiRequest } from '@/utils/apiRequest';
import FileUpload from '@/utils/fileUpload';
import { encryptObject, decryptObject } from '@/utils/encryption';
import Spinner from '@components/Spinner/Spinner';

const CanteenPage = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [cart, setCart] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [originalData, setOriginalData] = useState(null);
  const [sectionVisibilityModal, setSectionVisibilityModal] = useState(false);
  const [role, setRole] = useState(null); // Will be derived from stored user

  useEffect(() => {
    const initRole = async () => {
      try {
        const raw = localStorage.getItem('ecareUser') || sessionStorage.getItem('ecareUser');
        if (!raw) { setRole(null); return; }
        let parsed;
        try { parsed = JSON.parse(raw); } catch (e) { setRole(null); return; }
        if (parsed && parsed.encrypted) {
          try {
            const decrypted = await decryptObject(parsed);
            const user = decrypted?.user || decrypted;
            setRole(user?.role || null);
            return;
          } catch (e) {
            console.warn('Failed to decrypt stored ecareUser', e);
            setRole(null);
            return;
          }
        }
        const user = parsed.user || parsed;
        setRole(user?.role || null);
      } catch (err) {
        console.warn('Failed to read stored user for role detection', err);
        setRole(null);
      }
    };
    initRole();
  }, []);

  // Icon mapping
  const iconMap = {
    Utensils,
    Heart,
    Clock,
    Star,
    Users,
    Calendar,
    Download,
    Phone,
    MapPin,
    Apple,
    Carrot,
    Wheat,
    Milk,
    Egg,
    ChefHat,
    ShoppingCart,
    Search,
    Filter,
    Mail
  };

  // Dietary emojis for dropdown
  const dietaryEmojis = [
    { value: '🥬', label: 'Leafy Green' },
    { value: '💚', label: 'Green Heart' },
    { value: '🥛', label: 'Milk' },
    { value: '🌾', label: 'Wheat' },
    { value: '🥜', label: 'Nut' },
    { value: '🐟', label: 'Fish' },
    { value: '🍗', label: 'Meat' },
    { value: '🥗', label: 'Salad' },
    { value: '🍎', label: 'Apple' },
    { value: '🥦', label: 'Broccoli' }
  ];

  // Layout key mapping
  const layoutMap = {
    hero: 'showHero',
    benefits: 'showBenefits',
    tabs: 'showTabs',
    menu: 'showMenu',
    nutrition: 'showNutrition',
    ordering: 'showOrdering',
    contact: 'showContact',
    resources: 'showResources',
    cta: 'showCta',
    labels: 'showLabels'
  };

  const sectionDisplayNames = {
    showHero: 'Hero',
    showBenefits: 'Benefits',
    showTabs: 'Tabs',
    showMenu: 'Menu',
    showNutrition: 'Nutrition',
    showOrdering: 'Ordering',
    showContact: 'Contact',
    showResources: 'Resources',
    showCta: 'CTA',
    showLabels: 'Labels'
  };

  // Default data structure
  const defaultData = {
    showHero: true,
    showBenefits: true,
    showTabs: true,
    showMenu: true,
    showNutrition: true,
    showOrdering: true,
    showContact: true,
    showResources: true,
    showCta: true,
    showLabels: true,
    hero: {
      show: true,
      title: "School Canteen",
      subtitle: "Delicious, nutritious meals for growing minds and bodies",
      height: "h-96",
      showImage: true,
      backgroundImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ctaButton: {
        label: "View Today's Menu",
        link: "#",
        show: true
      }
    },
    benefits: {
      show: true,
      title: "Why Our Canteen?",
      subtitle: "We're committed to providing healthy, delicious meals that students love",
      items: [
        {
          icon: "Heart",
          title: "Healthy Options",
          description: "Nutritious meals prepared with fresh ingredients",
          show: true
        },
        {
          icon: "Star",
          title: "Quality Food",
          description: "High-quality ingredients and hygienic preparation",
          show: true
        },
        {
          icon: "Clock",
          title: "Quick Service",
          description: "Efficient service to minimize waiting time",
          show: true
        },
        {
          icon: "Users",
          title: "Student-Friendly",
          description: "Options tailored to student preferences and budgets",
          show: true
        }
      ]
    },
    tabs: {
      show: true,
      title: "Canteen Information",
      description: "Explore our canteen services and facilities",
      items: [
        { id: 'menu', name: 'Menu', icon: "Utensils", description: 'Weekly menu', show: true },
        { id: 'nutrition', name: 'Nutrition', icon: "Heart", description: 'Nutrition info', show: true },
        { id: 'ordering', name: 'Ordering', icon: "ShoppingCart", description: 'Order system', show: true },
        { id: 'contact', name: 'Contact', icon: "Phone", description: 'Get in touch', show: true }
      ]
    },
    menu: {
      show: true,
      title: "Weekly Menu",
      subtitle: "Delicious and nutritious meals prepared daily",
      dietaryGuideTitle: "Dietary Symbols Guide",
      dayNames: {
        monday: { name: "Monday", show: true },
        tuesday: { name: "Tuesday", show: true },
        wednesday: { name: "Wednesday", show: true },
        thursday: { name: "Thursday", show: true },
        friday: { name: "Friday", show: true },
        saturday: { name: "Saturday", show: false },
        sunday: { name: "Sunday", show: false }
      },
      weeklyMenu: {
        monday: [
          { id: 1, name: "Vegetable Pulao", category: "main", price: 60, rating: 4.5, ingredients: ["Rice", "Mixed Vegetables", "Spices"], isVeg: true, isHealthy: true, show: true },
          { id: 2, name: "Rajma Chawal", category: "main", price: 70, rating: 4.7, ingredients: ["Kidney Beans", "Rice", "Spices"], isVeg: true, isHealthy: true, show: true },
          { id: 3, name: "Aloo Paratha", category: "main", price: 40, rating: 4.3, ingredients: ["Whole Wheat", "Potatoes", "Spices"], isVeg: true, isHealthy: true, show: true },
          { id: 4, name: "Fresh Fruit Salad", category: "side", price: 30, rating: 4.8, ingredients: ["Seasonal Fruits"], isVeg: true, isHealthy: true, show: true },
          { id: 5, name: "Buttermilk", category: "beverage", price: 20, rating: 4.2, ingredients: ["Yogurt", "Water", "Spices"], isVeg: true, isHealthy: true, show: true }
        ],
        tuesday: [
          { id: 6, name: "Chole Bhature", category: "main", price: 80, rating: 4.6, ingredients: ["Chickpeas", "Flour", "Spices"], isVeg: true, isHealthy: false, show: true },
          { id: 7, name: "Vegetable Biryani", category: "main", price: 65, rating: 4.4, ingredients: ["Rice", "Mixed Vegetables", "Spices"], isVeg: true, isHealthy: true, show: true },
          { id: 8, name: "Paneer Sandwich", category: "main", price: 50, rating: 4.5, ingredients: ["Bread", "Paneer", "Vegetables"], isVeg: true, isHealthy: true, show: true },
          { id: 9, name: "Green Salad", category: "side", price: 25, rating: 4.3, ingredients: ["Lettuce", "Cucumber", "Tomato"], isVeg: true, isHealthy: true, show: true },
          { id: 10, name: "Fresh Lime Soda", category: "beverage", price: 25, rating: 4.1, ingredients: ["Lime", "Soda", "Sugar"], isVeg: true, isHealthy: true, show: true }
        ],
        wednesday: [
          { id: 11, name: "Masala Dosa", category: "main", price: 55, rating: 4.7, ingredients: ["Rice", "Lentils", "Potatoes"], isVeg: true, isHealthy: true, show: true },
          { id: 12, name: "Vegetable Noodles", category: "main", price: 60, rating: 4.2, ingredients: ["Noodles", "Mixed Vegetables", "Sauces"], isVeg: true, isHealthy: true, show: true },
          { id: 13, name: "Pizza Slice", category: "main", price: 45, rating: 4.0, ingredients: ["Flour", "Cheese", "Tomato Sauce"], isVeg: true, isHealthy: false, show: true },
          { id: 14, name: "French Fries", category: "side", price: 35, rating: 4.1, ingredients: ["Potatoes", "Oil", "Salt"], isVeg: true, isHealthy: false, show: true },
          { id: 15, name: "Mango Lassi", category: "beverage", price: 35, rating: 4.6, ingredients: ["Yogurt", "Mango", "Sugar"], isVeg: true, isHealthy: true, show: true }
        ],
        thursday: [
          { id: 16, name: "Palak Paneer with Roti", category: "main", price: 75, rating: 4.8, ingredients: ["Spinach", "Paneer", "Whole Wheat"], isVeg: true, isHealthy: true, show: true },
          { id: 17, name: "Vegetable Fried Rice", category: "main", price: 65, rating: 4.3, ingredients: ["Rice", "Mixed Vegetables", "Sauces"], isVeg: true, isHealthy: true, show: true },
          { id: 18, name: "Pav Bhaji", category: "main", price: 60, rating: 4.7, ingredients: ["Mixed Vegetables", "Bread", "Spices"], isVeg: true, isHealthy: true, show: true },
          { id: 19, name: "Fruit Yogurt", category: "side", price: 30, rating: 4.4, ingredients: ["Yogurt", "Fruits", "Honey"], isVeg: true, isHealthy: true, show: true },
          { id: 20, name: "Orange Juice", category: "beverage", price: 30, rating: 4.5, ingredients: ["Fresh Oranges"], isVeg: true, isHealthy: true, show: true }
        ],
        friday: [
          { id: 21, name: "Special Thali", category: "main", price: 90, rating: 4.9, ingredients: ["Roti", "Rice", "Dal", "Vegetables", "Salad"], isVeg: true, isHealthy: true, show: true },
          { id: 22, name: "Burger", category: "main", price: 50, rating: 4.2, ingredients: ["Bun", "Vegetable Patty", "Vegetables"], isVeg: true, isHealthy: false, show: true },
          { id: 23, name: "Macaroni Pasta", category: "main", price: 55, rating: 4.3, ingredients: ["Pasta", "Cheese", "Vegetables"], isVeg: true, isHealthy: true, show: true },
          { id: 24, name: "Chocolate muffin", category: "side", price: 25, rating: 4.0, ingredients: ["Flour", "Chocolate", "Sugar"], isVeg: true, isHealthy: false, show: true },
          { id: 25, name: "Iced Tea", category: "beverage", price: 25, rating: 4.1, ingredients: ["Tea", "Lemon", "Sugar"], isVeg: true, isHealthy: true, show: true }
        ],
        saturday: [
          { id: 26, name: "Weekend Special Pasta", category: "main", price: 70, rating: 4.6, ingredients: ["Pasta", "Vegetables", "Sauce"], isVeg: true, isHealthy: true, show: true },
          { id: 27, name: "Grilled Cheese Sandwich", category: "main", price: 45, rating: 4.4, ingredients: ["Bread", "Cheese"], isVeg: true, isHealthy: false, show: true },
          { id: 28, name: "Mixed Berry Smoothie", category: "beverage", price: 35, rating: 4.7, ingredients: ["Berries", "Yogurt"], isVeg: true, isHealthy: true, show: true },
          { id: 29, name: "Veggie Sticks", category: "side", price: 20, rating: 4.2, ingredients: ["Carrots", "Cucumber"], isVeg: true, isHealthy: true, show: true }
        ],
        sunday: [
          { id: 30, name: "Sunday Brunch Omelette", category: "main", price: 65, rating: 4.5, ingredients: ["Eggs", "Vegetables"], isVeg: false, isHealthy: true, show: true },
          { id: 31, name: "Fruit Platter", category: "side", price: 40, rating: 4.8, ingredients: ["Assorted Fruits"], isVeg: true, isHealthy: true, show: true },
          { id: 32, name: "Herbal Tea", category: "beverage", price: 25, rating: 4.3, ingredients: ["Herbs", "Hot Water"], isVeg: true, isHealthy: true, show: true }
        ],
        show: true
      },
      dietaryInfo: [
        {
          type: "Vegetarian",
          description: "Contains no meat, fish, or poultry products",
          icon: "🥬",
          show: true
        },
        {
          type: "Healthy Choice",
          description: "Lower in fat, sugar, or calories; higher in nutrients",
          icon: "💚",
          show: true
        },
        {
          type: "Contains Dairy",
          description: "Contains milk or milk products",
          icon: "🥛",
          show: true
        },
        {
          type: "Contains Gluten",
          description: "Contains wheat, barley, or rye products",
          icon: "🌾",
          show: true
        }
      ]
    },
    nutrition: {
      show: true,
      title: "Nutrition Information",
      subtitle: "We're committed to supporting student health through nutritious meal options",
      philosophy: {
        show: true,
        title: "Our Nutrition Philosophy",
        description: "We believe that healthy eating habits established during school years can last a lifetime. Our meals are designed to provide the energy and nutrients students need to focus, learn, and grow.",
        points: [
          "We limit processed foods and artificial ingredients",
          "We incorporate fruits and vegetables into every meal",
          "We offer appropriate portion sizes for different age groups",
          "We accommodate special dietary needs whenever possible"
        ]
      },
      facts: [
        {
          title: "Balanced Meals",
          description: "All meals are designed to provide balanced nutrition with appropriate portions of carbs, proteins, and fats",
          icon: "Apple",
          show: true
        },
        {
          title: "Fresh Ingredients",
          description: "We use fresh, locally sourced ingredients to ensure quality and nutritional value",
          icon: "Carrot",
          show: true
        },
        {
          title: "Whole Grains",
          description: "Where possible, we use whole grains for added fiber and nutrients",
          icon: "Wheat",
          show: true
        },
        {
          title: "Dairy Options",
          description: "We offer both dairy and non-dairy options to accommodate different dietary needs",
          icon: "Milk",
          show: true
        },
        {
          title: "Protein Sources",
          description: "Vegetarian protein sources like lentils, beans, and paneer are regularly included",
          icon: "Egg",
          show: true
        },
        {
          title: "Expert Guidance",
          description: "Our menu is developed with guidance from nutrition experts",
          icon: "ChefHat",
          show: true
        }
      ]
    },
    ordering: {
      show: true,
      title: "Ordering System",
      subtitle: "Convenient ways to order and enjoy your meals",
      howToOrderTitle: "How to Order",
      cartTitle: "Your Cart",
      emptyCartMessage: "Your cart is empty",
      totalLabel: "Total",
      checkoutButton: "Checkout",
      orderingInfo: [
        {
          step: 1,
          title: "Pre-order System",
          description: "Place your orders by 10:00 AM for lunch delivery",
          show: true
        },
        {
          step: 2,
          title: "Online Portal",
          description: "Use our student portal to browse menus and place orders",
          show: true
        },
        {
          step: 3,
          title: "Meal Cards",
          description: "Use your student ID card for cashless payments",
          show: true
        },
        {
          step: 4,
          title: "Pickup Points",
          description: "Collect your orders from designated pickup areas",
          show: true
        }
      ],
      paymentOptions: {
        show: true,
        title: "Payment Options",
        options: [
          "Student ID card (cashless system)",
          "Pre-paid meal plans",
          "Cash payments",
          "Online payments through parent portal"
        ]
      }
    },
    contact: {
      show: true,
      title: "Canteen Contact",
      subtitle: "Get in touch with our canteen staff for any queries or special requests",
      manager: {
        show: true,
        title: "Canteen Manager",
        name: "Mrs. Sunita Patel",
        position: "Canteen Manager",
        phone: "+91 98765 43210",
        phoneHours: "Mon-Sat, 8:00 AM - 4:00 PM",
        email: "canteen@stcolumbas.edu"
      },
      hoursTitle: "Canteen Hours",
      hours: [
        { meal: "Breakfast", time: "7:30 AM - 8:30 AM", show: true },
        { meal: "Lunch", time: "12:00 PM - 2:00 PM", show: true },
        { meal: "Snacks", time: "3:00 PM - 4:00 PM", show: true }
      ],
      location: {
        show: true,
        title: "Location",
        description: "Ground Floor, Near Main Building"
      },
      specialDietary: {
        show: true,
        title: "Special Dietary Requirements",
        description: "We accommodate special dietary needs whenever possible. Please contact the canteen manager at least 24 hours in advance for:",
        requirements: [
          "Food allergies (nuts, gluten, dairy, etc.)",
          "Religious dietary restrictions",
          "Medical dietary requirements",
          "Other special dietary needs"
        ]
      }
    },
    resources: {
      show: true,
      title: "Canteen Resources",
      subtitle: "Download menus, nutrition guides, and other helpful documents",
      downloadButton: "Download",
      items: [
        {
          title: "Monthly Menu Calendar",
          description: "Complete menu for the entire month",
          format: "PDF",
          size: "1.2 MB",
          icon: "Calendar",
          link: "#",
          show: true
        },
        {
          title: "Nutrition Guide",
          description: "Detailed nutritional information for all items",
          format: "PDF",
          size: "2.1 MB",
          icon: "Heart",
          link: "#",
          show: true
        },
        {
          title: "Order Form",
          description: "Printable order form for offline ordering",
          format: "DOCX",
          size: "0.5 MB",
          icon: "Download",
          link: "#",
          show: true
        },
        {
          title: "Feedback Form",
          description: "Share your feedback and suggestions",
          format: "PDF",
          size: "0.7 MB",
          icon: "Users",
          link: "#",
          show: true
        }
      ]
    },
    cta: {
      show: true,
      title: "Have Questions About Our Canteen?",
      subtitle: "Contact our canteen staff for menu questions, dietary concerns, or feedback",
      buttons: [
        { text: "Contact Canteen Manager", variant: "primary", link: "#", show: true },
        { text: "Provide Feedback", variant: "secondary", link: "#", show: true }
      ]
    },
    labels: {
      show: true,
      addToCart: "Add to Cart",
      vegLabel: "Veg",
      healthyLabel: "Healthy",
      ingredientsLabel: "Ingredients"
    }
  };

  // Download file function
  const downloadFile = async (url, filename) => {
    if (!url || url === '#') return;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    }
  };

  // Check role
  useEffect(() => {
    if (role === 'admin') {
      setEditMode(true);
    } else {
      setEditMode(false);
      setEditFormOpen(false);
    }
  }, [role]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest('save_data/get_all_canteen_data', {});
        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
          let fetchedData = res.data[0]?.Data || {};
          try {
            if (fetchedData && fetchedData.encrypted) {
              fetchedData = await decryptObject(fetchedData);
            } else if (typeof fetchedData === 'string') {
              fetchedData = JSON.parse(fetchedData);
            }
          } catch (err) {
            console.warn('Failed to decrypt/parse fetched canteen data, using raw:', err);
            try {
              fetchedData = JSON.parse(fetchedData);
            } catch (e) {
              // leave fetchedData as-is
            }
          }
          setData({ ...defaultData, ...fetchedData });
        } else {
          setData(defaultData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setData(defaultData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter functions
  const filteredBenefits = data.benefits?.items?.filter(item => item.show !== false) || [];
  const filteredTabs = data.tabs?.items?.filter(tab => tab.show !== false) || [];
  const filteredMenuItems = (day) => (data.menu?.weeklyMenu?.[day] || []).filter(item => item.show !== false);
  const filteredDietaryInfo = data.menu?.dietaryInfo?.filter(info => info.show !== false) || [];
  const filteredNutritionFacts = data.nutrition?.facts?.filter(fact => fact.show !== false) || [];
  const filteredOrderingInfo = data.ordering?.orderingInfo?.filter(info => info.show !== false) || [];
  const filteredPaymentOptions = data.ordering?.paymentOptions?.options || [];
  const filteredContactHours = data.contact?.hours?.filter(hour => hour.show !== false) || [];
  const filteredResources = data.resources?.items?.filter(resource => resource.show !== false) || [];
  const filteredCtaButtons = data.cta?.buttons?.filter(button => button.show !== false) || [];
  const filteredDays = Object.keys(data.menu?.dayNames || {}).filter(day => data.menu?.dayNames?.[day]?.show !== false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  if (loading) {
    return <Spinner />;
  }

  // Modal Header Component
  const ModalHeader = ({ title, onClose }) => (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );

  // Modal Footer Component
  const ModalFooter = ({ onCancel, onSave }) => (
    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 z-10">
      <button
        onClick={onCancel}
        className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );

  // Generic handlers
  const handleObjectChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (arrayKey, index, field, value) => {
    // Support nested paths like 'contact.specialDietary.requirements' and also simple keys
    const getNested = (obj, path) => {
      const parts = path.split('.');
      let cur = obj;
      for (let p of parts) {
        if (cur == null) return undefined;
        cur = cur[p];
      }
      return cur;
    };

    const setNested = (obj, path, value) => {
      const parts = path.split('.');
      let cur = obj;
      for (let i = 0; i < parts.length - 1; i++) {
        if (cur[parts[i]] == null) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = value;
    };

    setEditData(prev => {
      const updated = { ...prev };
      // Ensure target array exists
      let arr = getNested(updated, arrayKey);
      if (!Array.isArray(arr)) {
        // If not found directly, try to locate the array under common parents (menu, contact, ordering, nutrition, tabs)
        const parents = ['menu', 'contact', 'ordering', 'nutrition', 'tabs'];
        let foundPath = null;
        for (const p of parents) {
          const trial = getNested(updated, `${p}.${arrayKey}`);
          if (Array.isArray(trial)) {
            foundPath = `${p}.${arrayKey}`;
            break;
          }
        }
        if (foundPath) {
          arr = getNested(updated, foundPath);
          arrayKey = foundPath;
        } else {
          // create top-level array
          setNested(updated, arrayKey, []);
          arr = getNested(updated, arrayKey);
        }
      }

      // If field equals arrayKey and value is a string, assume string array element replacement (newline or comma separated)
      if (field === arrayKey && typeof value === 'string') {
        // if value contains newlines, split by newline, else keep string
        arr[index] = value.includes('\n') ? value.split('\n').map(s => s.trim()).filter(Boolean) : value;
      } else {
        const current = arr[index] || {};
        // if user is editing an ingredients textarea and provides comma separated list
        if (field === 'ingredients' && typeof value === 'string') {
          current[field] = value.split(',').map(i => i.trim()).filter(Boolean);
        } else {
          current[field] = value;
        }
        arr[index] = current;
      }

      setNested(updated, arrayKey, arr);
      return updated;
    });
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setEditData(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value
      }
    }));
  };

  const handleNestedArrayChange = (parentKey, arrayKey, index, field, value) => {
    setEditData(prev => {
      const updated = { ...prev };
      if (!updated[parentKey]) updated[parentKey] = {};
      if (!updated[parentKey][arrayKey]) updated[parentKey][arrayKey] = [];
      if (Array.isArray(updated[parentKey][arrayKey][index])) {
        updated[parentKey][arrayKey][index] = value.split('\n').map(item => item.trim()).filter(item => item);
      } else {
        updated[parentKey][arrayKey][index] = { ...updated[parentKey][arrayKey][index], [field]: value };
      }
      return updated;
    });
  };

  // Open edit modal
  const openEditModal = (section) => {
    setEditSection(section);
    setEditFormOpen(true);
    if (section === 'tabs') {
      const tabsData = {
        showTabs: data.showTabs,
        tabs: data.tabs,
        showMenu: data.showMenu,
        menu: data.menu,
        showNutrition: data.showNutrition,
        nutrition: data.nutrition,
        showOrdering: data.showOrdering,
        ordering: data.ordering,
        showContact: data.showContact,
        contact: data.contact
      };
      setEditData(JSON.parse(JSON.stringify(tabsData)));
      setOriginalData(JSON.parse(JSON.stringify(tabsData)));
    } else {
      const layoutKey = layoutMap[section];
      let sectionData = { 
        showSection: data[layoutKey],
        ...data[section]
      };
      setEditData(JSON.parse(JSON.stringify(sectionData)));
      setOriginalData(JSON.parse(JSON.stringify(sectionData)));
    }
  };

  // Save section
  const saveSection = async () => {
    let newData = { ...data };
    const updatedData = editData;
    if (editSection === 'tabs') {
      newData.showTabs = updatedData.showTabs;
      newData.showMenu = updatedData.showMenu;
      newData.menu = updatedData.menu;
      newData.showNutrition = updatedData.showNutrition;
      newData.nutrition = updatedData.nutrition;
      newData.showOrdering = updatedData.showOrdering;
      newData.ordering = updatedData.ordering;
      newData.showContact = updatedData.showContact;
      newData.contact = updatedData.contact;
      newData.tabs = updatedData.tabs;
    } else {
      const layoutKey = layoutMap[editSection];
      newData[layoutKey] = updatedData.showSection;
      const sectionContent = { ...updatedData };
      delete sectionContent.showSection;
      newData[editSection] = { ...newData[editSection], ...sectionContent };
    }
    setData(newData);
    try {
      const payload = await encryptObject(newData);
      await apiRequest('save_data/save_canteen_data', { payload });
    } catch (error) {
      console.error('Save failed', error);
    }
    setEditFormOpen(false);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditData(originalData);
    setEditFormOpen(false);
  };

  // Section visibility helpers
  const toggleSectionVisibility = (key) => {
    setData(prev => ({ ...prev, [key]: prev[key] === false ? true : !prev[key] }));
  };

  const saveSectionVisibility = async () => {
    try {
      const payload = await encryptObject(data);
      await apiRequest('save_data/save_canteen_data', { payload });
    } catch (error) {
      console.error('Save failed', error);
    }
    setSectionVisibilityModal(false);
  };

  // Item Editor Component
  const ItemEditor = (arrayKey, fields = [], isStringArray = false, isEmojiIcon = false, options = {}) => {
    // Helper to resolve nested array paths; falls back to common parents if needed
    const getNested = (obj, path) => {
      const parts = path.split('.');
      let cur = obj;
      for (let p of parts) {
        if (cur == null) return undefined;
        cur = cur[p];
      }
      return cur;
    };
    const findArrayPath = (key) => {
      if (Array.isArray(getNested(editData, key))) return key;
      const parents = ['menu', 'contact', 'ordering', 'nutrition', 'tabs', 'resources', 'cta'];
      for (const p of parents) {
        const path = `${p}.${key}`;
        if (Array.isArray(getNested(editData, path))) return path;
      }
      return key; // fallback - will be created when editing
    };

    const resolvedPath = findArrayPath(arrayKey);
    const items = getNested(editData, resolvedPath) || [];
    const removeItem = (index) => {
      const newItems = items.filter((_, i) => i !== index);
      setEditData(prev => {
        const updated = { ...prev };
        // set nested
        const parts = resolvedPath.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = newItems;
        return updated;
      });
    };
    const addItem = () => {
      const newItem = isStringArray ? '' : (isEmojiIcon ? { icon: '', type: '', description: '' } : { link: '#' });
      const newItems = [...items, newItem];
      setEditData(prev => {
        const updated = { ...prev };
        const parts = resolvedPath.split('.');
        let cur = updated;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        cur[parts[parts.length - 1]] = newItems;
        return updated;
      });
    };
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">Item {index + 1}</h4>
              <button onClick={() => removeItem(index)} className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {isStringArray ? (
              <textarea 
                value={item || ''} 
                onChange={(e) => handleArrayChange(resolvedPath, index, resolvedPath, e.target.value)} 
                placeholder="Enter items, one per line" 
                className="w-full p-2 border rounded mb-2" 
                rows="4" 
              />
            ) : (
              fields.map(field => (
                field === 'icon' ? (
                  isEmojiIcon ? (
                    <select 
                      key={field} 
                      value={item[field] || ''} 
                      onChange={(e) => handleArrayChange(resolvedPath, index, field, e.target.value)} 
                      className="w-full p-2 border rounded mb-2"
                    >
                      <option value="">Select Emoji</option>
                      {dietaryEmojis.map(emoji => (
                        <option key={emoji.value} value={emoji.value}>
                          {emoji.label} ({emoji.value})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(arrayKey, index, field, e.target.value)} className="w-full p-2 border rounded mb-2">
                      <option value="">Select Icon</option>
                      {Object.keys(iconMap).map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                  )
                ) : field === 'ingredients' || field === 'link' ? (
                  <div key={field}>
                    <input 
                      value={Array.isArray(item[field]) ? item[field].join(', ') : item[field] || ''} 
                      onChange={(e) => {
                        if (field === 'ingredients') {
                          handleArrayChange(resolvedPath, index, field, e.target.value);
                        } else {
                          handleArrayChange(resolvedPath, index, field, e.target.value);
                        }
                      }} 
                      placeholder={field === 'ingredients' ? "Ingredients (comma separated)" : "Link/URL"} 
                      className="w-full p-2 border rounded mb-2" 
                    />
                    {field === 'link' && options.allowFileUpload !== false && (
                      <FileUpload 
                        initialValue={item[field] || ''} 
                        onUpload={(url) => handleArrayChange(resolvedPath, index, field, url)} 
                        className="w-full" 
                      />
                    )}
                  </div>
                ) : (
                  <input key={field} value={item[field] || ''} onChange={(e) => handleArrayChange(resolvedPath, index, field, e.target.value)} placeholder={field} className="w-full p-2 border rounded mb-2" />
                )
              ))
            )}
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={item.show !== false} onChange={(e) => handleArrayChange(resolvedPath, index, 'show', e.target.checked)} />
              <span>Show Item</span>
            </label>
          </div>
        ))}
        <button onClick={addItem} className="flex items-center text-green-600">
          <Plus className="h-4 w-4 mr-2" /> Add New Item
        </button>
      </div>
    );
  };

  // Menu Day Editor
  const MenuDayEditor = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const updateDayName = (day, value) => {
      setEditData(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          dayNames: { 
            ...prev.menu.dayNames, 
            [day]: { ...prev.menu.dayNames[day], name: value } 
          }
        }
      }));
    };
    const updateDayShow = (day, value) => {
      setEditData(prev => ({
        ...prev,
        menu: {
          ...prev.menu,
          dayNames: { 
            ...prev.menu.dayNames, 
            [day]: { ...prev.menu.dayNames[day], show: value } 
          }
        }
      }));
    };
    const updateMenuItem = useCallback((day, index, field, value) => {
      setEditData(prev => {
        const menu = { ...prev.menu };
        if (!menu.weeklyMenu[day]) menu.weeklyMenu[day] = [];
        const newItems = menu.weeklyMenu[day].map((item, i) => 
          i === index ? { ...item, [field]: field === 'ingredients' ? value.split(',').map(i => i.trim()).filter(i => i) : value } : item
        );
        menu.weeklyMenu[day] = newItems;
        return { ...prev, menu };
      });
    }, []);
    const addMenuItem = useCallback((day) => {
      setEditData(prev => {
        const menu = { ...prev.menu };
        if (!menu.weeklyMenu[day]) menu.weeklyMenu[day] = [];
        const newId = Math.max(...menu.weeklyMenu[day].map(i => i.id || 0), 0) + 1;
        const newItem = {
          id: newId,
          name: "",
          category: "main",
          price: 0,
          rating: 4.0,
          ingredients: [],
          isVeg: true,
          isHealthy: true,
          show: true
        };
        return { ...prev, menu: { ...menu, weeklyMenu: { ...menu.weeklyMenu, [day]: [...menu.weeklyMenu[day], newItem] } } };
      });
    }, []);
    const removeMenuItem = (day, index) => {
      setEditData(prev => {
        const menu = { ...prev.menu };
        menu.weeklyMenu[day] = menu.weeklyMenu[day].filter((_, i) => i !== index);
        return { ...prev, menu };
      });
    };
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Day Names & Visibility</h3>
          {days.map(day => (
            <div key={day} className="flex items-center space-x-2 mb-2">
              <input
                value={editData.menu?.dayNames?.[day]?.name || ''}
                onChange={(e) => updateDayName(day, e.target.value)}
                placeholder={`Day name for ${day}`}
                className="flex-1 p-2 border rounded"
              />
              <label className="flex items-center space-x-1">
                <input type="checkbox" checked={editData.menu?.dayNames?.[day]?.show || false} onChange={(e) => updateDayShow(day, e.target.checked)} />
                <span className="text-sm">Show</span>
              </label>
            </div>
          ))}
        </div>
        {days.map(day => (
          <div key={day} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{day.toUpperCase()}</h4>
            {(editData.menu?.weeklyMenu?.[day] || []).map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded mb-2">
                <button onClick={() => removeMenuItem(day, index)} className="float-right text-red-600"><Trash2 className="h-4 w-4" /></button>
                <input
                  value={item.name || ''}
                  onChange={(e) => updateMenuItem(day, index, 'name', e.target.value)}
                  placeholder="Item name"
                  className="w-full p-1 border rounded mb-1"
                />
                <input
                  value={item.price || ''}
                  onChange={(e) => updateMenuItem(day, index, 'price', parseFloat(e.target.value) || 0)}
                  placeholder="Price"
                  type="number"
                  className="w-full p-1 border rounded mb-1"
                />
                <input
                  value={item.rating || ''}
                  onChange={(e) => updateMenuItem(day, index, 'rating', parseFloat(e.target.value) || 0)}
                  placeholder="Rating"
                  type="number"
                  step="0.1"
                  className="w-full p-1 border rounded mb-1"
                />
                <select
                  value={item.category || ''}
                  onChange={(e) => updateMenuItem(day, index, 'category', e.target.value)}
                  className="w-full p-1 border rounded mb-1"
                >
                  <option value="main">Main</option>
                  <option value="side">Side</option>
                  <option value="beverage">Beverage</option>
                </select>
                <textarea
                  value={item.ingredients?.join(', ') || ''}
                  onChange={(e) => updateMenuItem(day, index, 'ingredients', e.target.value)}
                  placeholder="Ingredients (comma separated)"
                  className="w-full p-1 border rounded mb-1"
                  rows="2"
                />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.isVeg} onChange={(e) => updateMenuItem(day, index, 'isVeg', e.target.checked)} />
                  <span>Veg</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.isHealthy} onChange={(e) => updateMenuItem(day, index, 'isHealthy', e.target.checked)} />
                  <span>Healthy</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={item.show !== false} onChange={(e) => updateMenuItem(day, index, 'show', e.target.checked)} />
                  <span>Show</span>
                </label>
              </div>
            ))}
            <button onClick={() => addMenuItem(day)} className="text-green-600">Add Item</button>
          </div>
        ))}
        {ItemEditor('dietaryInfo', ['icon', 'type', 'description'], false, true)}
      </div>
    );
  };

  // Nutrition Philosophy Editor
  const PhilosophyEditor = () => (
    <div className="space-y-4">
      <input value={editData.nutrition?.philosophy?.title || ''} onChange={(e) => handleNestedChange('nutrition', 'philosophy', { ...editData.nutrition.philosophy, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" />
      <textarea value={editData.nutrition?.philosophy?.description || ''} onChange={(e) => handleNestedChange('nutrition', 'philosophy', { ...editData.nutrition.philosophy, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" rows="3" />
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={editData.nutrition?.philosophy?.show !== false} onChange={(e) => handleNestedChange('nutrition', 'philosophy', { ...editData.nutrition.philosophy, show: e.target.checked })} />
        <span>Show Philosophy</span>
      </label>
      {ItemEditor('nutrition.philosophy.points', [], true)}
    </div>
  );

  // Contact Hours Editor
  const HoursEditor = () => (
    <div>
      {ItemEditor('contact.hours', ['meal', 'time'])}
    </div>
  );

  // Requirements Editor
  const RequirementsEditor = () => (
    <div>
      {ItemEditor('contact.specialDietary.requirements', [], true)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Edit Modal */}
      {editFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden">
            <ModalHeader title={`Edit ${editSection}`} onClose={cancelEdit} />
            <div className="flex-1 overflow-y-auto p-6">
              {editSection !== 'tabs' && (
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showSection || false} onChange={(e) => handleObjectChange('showSection', e.target.checked)} />
                    <span>Show Section</span>
                  </label>
                </div>
              )}
              {editSection === 'hero' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <FileUpload initialValue={editData.backgroundImage || ''} onUpload={(url) => handleObjectChange('backgroundImage', url)} className="w-full" />
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={editData.showImage !== false} onChange={(e) => handleObjectChange('showImage', e.target.checked)} />
                    <span>Show Background Image</span>
                  </label>
                  <div>
                    <label className="block text-sm font-medium">CTA Button</label>
                    <input value={editData.ctaButton?.label || ''} onChange={(e) => handleNestedChange('ctaButton', 'label', e.target.value)} placeholder="Button Label" className="w-full p-2 border rounded mb-2" />
                    <input value={editData.ctaButton?.link || ''} onChange={(e) => handleNestedChange('ctaButton', 'link', e.target.value)} placeholder="Button Link" className="w-full p-2 border rounded mb-2" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ctaButton?.show !== false} onChange={(e) => handleNestedChange('ctaButton', 'show', e.target.checked)} />
                      <span>Show CTA Button</span>
                    </label>
                  </div>
                </div>
              )}
              {editSection === 'benefits' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Section Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Section Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('items', ['icon', 'title', 'description'])}
                </div>
              )}
              {editSection === 'tabs' && (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showTabs || false} onChange={(e) => handleObjectChange('showTabs', e.target.checked)} />
                      <span>Show Tabs</span>
                    </label>
                  </div>
                  <input value={editData.tabs?.title || ''} onChange={(e) => handleObjectChange('tabs.title', e.target.value)} placeholder="Tabs Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.tabs?.description || ''} onChange={(e) => handleObjectChange('tabs.description', e.target.value)} placeholder="Tabs Description" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('tabs.items', ['name', 'icon', 'description'])}
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showMenu || false} onChange={(e) => handleObjectChange('showMenu', e.target.checked)} />
                      <span>Show Menu</span>
                    </label>
                    <input value={editData.menu?.title || ''} onChange={(e) => handleObjectChange('menu.title', e.target.value)} placeholder="Menu Title" className="w-full p-2 border rounded" />
                    <textarea value={editData.menu?.subtitle || ''} onChange={(e) => handleObjectChange('menu.subtitle', e.target.value)} placeholder="Menu Subtitle" className="w-full p-2 border rounded" rows="3" />
                    {/* search placeholder removed - search field not needed */}
                    <input value={editData.menu?.dietaryGuideTitle || ''} onChange={(e) => handleObjectChange('menu.dietaryGuideTitle', e.target.value)} placeholder="Dietary Guide Title" className="w-full p-2 border rounded" />
                    <MenuDayEditor />
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showNutrition || false} onChange={(e) => handleObjectChange('showNutrition', e.target.checked)} />
                      <span>Show Nutrition</span>
                    </label>
                    <input value={editData.nutrition?.title || ''} onChange={(e) => handleObjectChange('nutrition.title', e.target.value)} placeholder="Nutrition Title" className="w-full p-2 border rounded" />
                    <textarea value={editData.nutrition?.subtitle || ''} onChange={(e) => handleObjectChange('nutrition.subtitle', e.target.value)} placeholder="Nutrition Subtitle" className="w-full p-2 border rounded" rows="3" />
                    {editData.nutrition?.philosophy?.show !== false && <PhilosophyEditor />}
                    {ItemEditor('nutrition.facts', ['icon', 'title', 'description'])}
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showOrdering || false} onChange={(e) => handleObjectChange('showOrdering', e.target.checked)} />
                      <span>Show Ordering</span>
                    </label>
                    <input value={editData.ordering?.title || ''} onChange={(e) => handleObjectChange('ordering.title', e.target.value)} placeholder="Ordering Title" className="w-full p-2 border rounded" />
                    <textarea value={editData.ordering?.subtitle || ''} onChange={(e) => handleObjectChange('ordering.subtitle', e.target.value)} placeholder="Ordering Subtitle" className="w-full p-2 border rounded" rows="3" />
                    <input value={editData.ordering?.howToOrderTitle || ''} onChange={(e) => handleObjectChange('ordering.howToOrderTitle', e.target.value)} placeholder="How to Order Title" className="w-full p-2 border rounded" />
                    <input value={editData.ordering?.cartTitle || ''} onChange={(e) => handleObjectChange('ordering.cartTitle', e.target.value)} placeholder="Cart Title" className="w-full p-2 border rounded" />
                    <input value={editData.ordering?.emptyCartMessage || ''} onChange={(e) => handleObjectChange('ordering.emptyCartMessage', e.target.value)} placeholder="Empty Cart Message" className="w-full p-2 border rounded" />
                    <input value={editData.ordering?.totalLabel || ''} onChange={(e) => handleObjectChange('ordering.totalLabel', e.target.value)} placeholder="Total Label" className="w-full p-2 border rounded" />
                    <input value={editData.ordering?.checkoutButton || ''} onChange={(e) => handleObjectChange('ordering.checkoutButton', e.target.value)} placeholder="Checkout Button" className="w-full p-2 border rounded" />
                    {ItemEditor('ordering.orderingInfo', ['step', 'title', 'description'])}
                    <input value={editData.ordering?.paymentOptions?.title || ''} onChange={(e) => handleNestedChange('ordering.paymentOptions', 'title', e.target.value)} placeholder="Payment Options Title" className="w-full p-2 border rounded" />
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.ordering?.paymentOptions?.show !== false} onChange={(e) => handleNestedChange('ordering.paymentOptions', 'show', e.target.checked)} />
                      <span>Show Payment Options</span>
                    </label>
                    {ItemEditor('ordering.paymentOptions.options', [], true)}
                  </div>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" checked={editData.showContact || false} onChange={(e) => handleObjectChange('showContact', e.target.checked)} />
                      <span>Show Contact</span>
                    </label>
                    <input value={editData.contact?.title || ''} onChange={(e) => handleObjectChange('contact.title', e.target.value)} placeholder="Contact Title" className="w-full p-2 border rounded" />
                    <textarea value={editData.contact?.subtitle || ''} onChange={(e) => handleObjectChange('contact.subtitle', e.target.value)} placeholder="Contact Subtitle" className="w-full p-2 border rounded" rows="3" />
                    <input value={editData.contact?.hoursTitle || ''} onChange={(e) => handleObjectChange('contact.hoursTitle', e.target.value)} placeholder="Hours Title" className="w-full p-2 border rounded" />
                    <HoursEditor />
                    <div>
                      <label className="block text-sm font-medium">Manager</label>
                      <input value={editData.contact?.manager?.title || ''} onChange={(e) => handleNestedChange('contact.manager', 'title', e.target.value)} placeholder="Manager Title" className="w-full p-2 border rounded mb-2" />
                      <input value={editData.contact?.manager?.name || ''} onChange={(e) => handleNestedChange('contact.manager', 'name', e.target.value)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
                      <input value={editData.contact?.manager?.position || ''} onChange={(e) => handleNestedChange('contact.manager', 'position', e.target.value)} placeholder="Position" className="w-full p-2 border rounded mb-2" />
                      <input value={editData.contact?.manager?.phone || ''} onChange={(e) => handleNestedChange('contact.manager', 'phone', e.target.value)} placeholder="Phone" className="w-full p-2 border rounded mb-2" />
                      <input value={editData.contact?.manager?.phoneHours || ''} onChange={(e) => handleNestedChange('contact.manager', 'phoneHours', e.target.value)} placeholder="Phone Hours" className="w-full p-2 border rounded mb-2" />
                      <input value={editData.contact?.manager?.email || ''} onChange={(e) => handleNestedChange('contact.manager', 'email', e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-2" />
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.contact?.manager?.show !== false} onChange={(e) => handleNestedChange('contact.manager', 'show', e.target.checked)} />
                        <span>Show Manager</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Location</label>
                      <input value={editData.contact?.location?.title || ''} onChange={(e) => handleNestedChange('contact.location', 'title', e.target.value)} placeholder="Location Title" className="w-full p-2 border rounded mb-2" />
                      <textarea value={editData.contact?.location?.description || ''} onChange={(e) => handleNestedChange('contact.location', 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" rows="2" />
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.contact?.location?.show !== false} onChange={(e) => handleNestedChange('contact.location', 'show', e.target.checked)} />
                        <span>Show Location</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Special Dietary</label>
                      <input value={editData.contact?.specialDietary?.title || ''} onChange={(e) => handleNestedChange('contact.specialDietary', 'title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded mb-2" />
                      <textarea value={editData.contact?.specialDietary?.description || ''} onChange={(e) => handleNestedChange('contact.specialDietary', 'description', e.target.value)} placeholder="Description" className="w-full p-2 border rounded mb-2" rows="3" />
                      <RequirementsEditor />
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={editData.contact?.specialDietary?.show !== false} onChange={(e) => handleNestedChange('contact.specialDietary', 'show', e.target.checked)} />
                        <span>Show Special Dietary</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {editSection === 'resources' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  <input value={editData.downloadButton || ''} onChange={(e) => handleObjectChange('downloadButton', e.target.value)} placeholder="Download Button" className="w-full p-2 border rounded" />
                  {ItemEditor('items', ['title', 'description', 'format', 'size', 'icon', 'link'])}
                </div>
              )}
              {editSection === 'cta' && (
                <div className="space-y-4">
                  <input value={editData.title || ''} onChange={(e) => handleObjectChange('title', e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
                  <textarea value={editData.subtitle || ''} onChange={(e) => handleObjectChange('subtitle', e.target.value)} placeholder="Subtitle" className="w-full p-2 border rounded" rows="3" />
                  {ItemEditor('buttons', ['text', 'link'], false, false, { allowFileUpload: false })}
                </div>
              )}
              {/* labels editor removed as requested */}
            </div>
            <ModalFooter onCancel={cancelEdit} onSave={saveSection} />
          </div>
        </div>
      )}

      {/* Hero Section */}
      {data.showHero && data.hero?.show && (
        <section className={`relative ${data.hero.height || 'h-96'} bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          {data.hero?.showImage !== false && data.hero?.backgroundImage && (
            <img
              src={data.hero.backgroundImage}
              alt={data.hero.title || ''}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              <p className="text-xl text-green-100 leading-relaxed">
                {data.hero.subtitle}
              </p>
              {data.hero.ctaButton?.show !== false && (
                data.hero.ctaButton?.link ? (
                  <a href={data.hero.ctaButton.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-6">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                      <Utensils className="mr-2 h-5 w-5" />
                      {data.hero.ctaButton.label}
                    </button>
                  </a>
                ) : (
                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
                    <Utensils className="mr-2 h-5 w-5" />
                    {data.hero.ctaButton.label}
                  </button>
                )
              )}
            </div>
          </div>
          {editMode && <button onClick={() => openEditModal('hero')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
        </section>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Section */}
        {data.showBenefits && data.benefits?.show && filteredBenefits.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.benefits.title}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBenefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon];
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
            {editMode && <button onClick={() => openEditModal('benefits')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}
        {/* Tabs Navigation */}
        {data.showTabs && data.tabs?.show && filteredTabs.length > 0 && (
          <div className="py-8 bg-gray-50 z-10 shadow-sm relative mb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.tabs.title}</h2>
                <p className="text-gray-600">{data.tabs.description}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {filteredTabs.map((tab) => {
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
            {editMode && <button onClick={() => openEditModal('tabs')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* Tab Content */}
        {data.showTabs && (
          <div className="py-16 bg-white relative mb-8">
            <div className="max-w-7xl mx-auto px-4">
              {/* Menu Tab */}
              {activeTab === 'menu' && data.showMenu && data.menu?.show && (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.menu.title}</h3>
                      <p className="text-gray-600">{data.menu.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Filter className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                  </div>

                  {/* Day Selector */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {filteredDays.map(day => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          selectedDay === day
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {data.menu.dayNames[day]?.name}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredMenuItems(selectedDay).map(item => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center text-yellow-500">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="text-sm ml-1 text-gray-600">{item.rating}</span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-600">₹{item.price}</span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {item.isVeg && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{data.labels?.vegLabel}</span>}
                            {item.isHealthy && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{data.labels?.healthyLabel}</span>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{data.labels?.ingredientsLabel}: {item.ingredients.join(", ")}</p>
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            {data.labels?.addToCart}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dietary Information */}
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-4">{data.menu.dietaryGuideTitle}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredDietaryInfo.map((info, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-2xl mr-3">{info.icon}</span>
                          <div>
                            <p className="font-medium text-green-800">{info.type}</p>
                            <p className="text-sm text-green-700">{info.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Nutrition Tab */}
              {activeTab === 'nutrition' && data.showNutrition && data.nutrition?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.nutrition.title}</h3>
                  <p className="text-gray-600 mb-8">{data.nutrition.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredNutritionFacts.map((fact, index) => {
                      const IconComponent = iconMap[fact.icon];
                      return (
                        <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="bg-green-100 rounded-full w-12 h-12 mb-4 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">{fact.title}</h4>
                          <p className="text-gray-600 text-sm">{fact.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  {data.nutrition.philosophy?.show && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-4">{data.nutrition.philosophy.title}</h4>
                      <p className="text-blue-700 mb-4">{data.nutrition.philosophy.description}</p>
                      <ul className="space-y-2 text-sm text-blue-700">
                        {data.nutrition.philosophy.points.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                            </div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Ordering Tab */}
              {activeTab === 'ordering' && data.showOrdering && data.ordering?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.ordering.title}</h3>
                  <p className="text-gray-600 mb-8">{data.ordering.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{data.ordering.howToOrderTitle}</h4>
                      <div className="space-y-6">
                        {filteredOrderingInfo.map((info, index) => (
                          <div key={index} className="flex items-start">
                            <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                              {info.step}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{info.title}</h5>
                              <p className="text-sm text-gray-600">{info.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{data.ordering.cartTitle}</h4>
                      {cart.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">{data.ordering.emptyCartMessage}</p>
                      ) : (
                        <div>
                          <div className="space-y-4 mb-4">
                            {cart.map(item => (
                              <div key={item.id} className="flex justify-between items-center border-b border-gray-200 pb-3">
                                <div>
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-600">₹{item.price}</p>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center font-semibold text-gray-800 mb-4">
                              <span>{data.ordering.totalLabel}</span>
                              <span>₹{cartTotal}</span>
                            </div>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                              {data.ordering.checkoutButton}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {data.ordering.paymentOptions?.show && (
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-4">{data.ordering.paymentOptions.title}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                        {filteredPaymentOptions.map((option, index) => (
                          <div key={index} className="flex items-center">
                            <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                            </div>
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && data.showContact && data.contact?.show && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.contact.title}</h3>
                  <p className="text-gray-600 mb-8">{data.contact.subtitle}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {data.contact.manager?.show && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{data.contact.manager.title}</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium">{data.contact.manager.name}</p>
                              <p className="text-sm text-gray-600">{data.contact.manager.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium">{data.contact.manager.phone}</p>
                              <p className="text-sm text-gray-600">{data.contact.manager.phoneHours}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-green-600 mr-3" />
                            <p className="font-medium">{data.contact.manager.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">{data.contact.hoursTitle}</h4>
                      <div className="space-y-3">
                        {filteredContactHours.map((hour, index) => (
                          <div key={index} className="flex items-center">
                            <Clock className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium">{hour.meal}</p>
                              <p className="text-sm text-gray-600">{hour.time}</p>
                            </div>
                          </div>
                        ))}
                        {data.contact.location?.show && (
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-green-600 mr-3" />
                            <div>
                              <p className="font-medium">{data.contact.location.title}</p>
                              <p className="text-sm text-gray-600">{data.contact.location.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {data.contact.specialDietary?.show && (
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-4">{data.contact.specialDietary.title}</h4>
                      <p className="text-green-700 mb-4">{data.contact.specialDietary.description}</p>
                      <ul className="space-y-2 text-sm text-green-700">
                        {data.contact.specialDietary.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                            </div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Resources */}
        {data.showResources && data.resources?.show && filteredResources.length > 0 && (
          <div className="py-16 bg-gray-50 relative mb-8">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{data.resources.title}</h2>
                <p className="text-lg text-gray-600">{data.resources.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource, index) => {
                  const IconComponent = iconMap[resource.icon];
                  const downloadFilename = `${resource.title}.${resource.format?.toLowerCase() || 'pdf'}`;
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
                      <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm flex items-center" onClick={() => downloadFile(resource.link, downloadFilename)}>
                        {data.resources.downloadButton}
                        <Download className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {editMode && <button onClick={() => openEditModal('resources')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}

        {/* CTA Section */}
        {data.showCta && data.cta?.show && (
          <div className="py-16 bg-green-800 text-white relative">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">{data.cta.title}</h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">{data.cta.subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {filteredCtaButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link || '#'}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      button.variant === 'primary'
                        ? 'bg-white text-green-800 hover:bg-gray-100'
                        : 'bg-transparent border border-white text-white hover:bg-white/10'
                    }`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
            {editMode && <button onClick={() => openEditModal('cta')} className="absolute top-4 right-4 bg-white text-green-600 p-2 rounded shadow-lg hover:shadow-xl transition-shadow"><Edit className="h-5 w-5" /></button>}
          </div>
        )}
      </div>

      {/* Edit Labels Button (Global) */}
      {editMode && (
        <>
          <button onClick={() => setSectionVisibilityModal(true)} className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Edit className="h-5 w-5" />
          </button>

          {sectionVisibilityModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
                <ModalHeader title="Manage Section Visibility" onClose={() => setSectionVisibilityModal(false)} />
                <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
                  {Object.entries(sectionDisplayNames).map(([key, label]) => {
                    const visible = data[key] !== false;
                    return (
                      <div key={key} className="flex items-center justify-between border-b border-gray-100 py-3">
                        <div className="flex items-center space-x-3">
                          {visible ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                          <span className="text-sm font-medium text-gray-800">{label}</span>
                        </div>
                        <button onClick={() => toggleSectionVisibility(key)} className={`${visible ? 'bg-green-600' : 'bg-gray-200'} w-12 h-6 rounded-full relative transition-colors`} aria-pressed={visible}>
                          <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${visible ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <ModalFooter onCancel={() => setSectionVisibilityModal(false)} onSave={saveSectionVisibility} />
              </div>
            </div>
          )}

          {/* Labels edit button removed per request */}
        </>
      )}
    </div>
  );
};

export default CanteenPage;