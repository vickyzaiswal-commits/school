
"use client";
import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';

// JSON data structure (this would come from a database in a real application)
const canteenData = {
  hero: {
    title: "School Canteen",
    subtitle: "Delicious, nutritious meals for growing minds and bodies",
    buttonText: "View Today's Menu",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "School Canteen"
  },
  benefits: {
    title: "Why Our Canteen?",
    subtitle: "We're committed to providing healthy, delicious meals that students love",
    items: [
      {
        icon: "Heart",
        title: "Healthy Options",
        description: "Nutritious meals prepared with fresh ingredients"
      },
      {
        icon: "Star",
        title: "Quality Food",
        description: "High-quality ingredients and hygienic preparation"
      },
      {
        icon: "Clock",
        title: "Quick Service",
        description: "Efficient service to minimize waiting time"
      },
      {
        icon: "Users",
        title: "Student-Friendly",
        description: "Options tailored to student preferences and budgets"
      }
    ]
  },
  tabs: [
    { id: "menu", name: "Menu", icon: "Utensils" },
    { id: "nutrition", name: "Nutrition", icon: "Heart" },
    { id: "ordering", name: "Ordering", icon: "ShoppingCart" },
    { id: "contact", name: "Contact", icon: "Phone" }
  ],
  menu: {
    title: "Weekly Menu",
    subtitle: "Delicious and nutritious meals prepared daily",
    searchPlaceholder: "Search menu items...",
    dietaryGuideTitle: "Dietary Symbols Guide",
    weeklyMenu: {
      monday: [
        { id: 1, name: "Vegetable Pulao", category: "main", price: 60, rating: 4.5, ingredients: ["Rice", "Mixed Vegetables", "Spices"], isVeg: true, isHealthy: true },
        { id: 2, name: "Rajma Chawal", category: "main", price: 70, rating: 4.7, ingredients: ["Kidney Beans", "Rice", "Spices"], isVeg: true, isHealthy: true },
        { id: 3, name: "Aloo Paratha", category: "main", price: 40, rating: 4.3, ingredients: ["Whole Wheat", "Potatoes", "Spices"], isVeg: true, isHealthy: true },
        { id: 4, name: "Fresh Fruit Salad", category: "side", price: 30, rating: 4.8, ingredients: ["Seasonal Fruits"], isVeg: true, isHealthy: true },
        { id: 5, name: "Buttermilk", category: "beverage", price: 20, rating: 4.2, ingredients: ["Yogurt", "Water", "Spices"], isVeg: true, isHealthy: true }
      ],
      tuesday: [
        { id: 6, name: "Chole Bhature", category: "main", price: 80, rating: 4.6, ingredients: ["Chickpeas", "Flour", "Spices"], isVeg: true, isHealthy: false },
        { id: 7, name: "Vegetable Biryani", category: "main", price: 65, rating: 4.4, ingredients: ["Rice", "Mixed Vegetables", "Spices"], isVeg: true, isHealthy: true },
        { id: 8, name: "Paneer Sandwich", category: "main", price: 50, rating: 4.5, ingredients: ["Bread", "Paneer", "Vegetables"], isVeg: true, isHealthy: true },
        { id: 9, name: "Green Salad", category: "side", price: 25, rating: 4.3, ingredients: ["Lettuce", "Cucumber", "Tomato"], isVeg: true, isHealthy: true },
        { id: 10, name: "Fresh Lime Soda", category: "beverage", price: 25, rating: 4.1, ingredients: ["Lime", "Soda", "Sugar"], isVeg: true, isHealthy: true }
      ],
      wednesday: [
        { id: 11, name: "Masala Dosa", category: "main", price: 55, rating: 4.7, ingredients: ["Rice", "Lentils", "Potatoes"], isVeg: true, isHealthy: true },
        { id: 12, name: "Vegetable Noodles", category: "main", price: 60, rating: 4.2, ingredients: ["Noodles", "Mixed Vegetables", "Sauces"], isVeg: true, isHealthy: true },
        { id: 13, name: "Pizza Slice", category: "main", price: 45, rating: 4.0, ingredients: ["Flour", "Cheese", "Tomato Sauce"], isVeg: true, isHealthy: false },
        { id: 14, name: "French Fries", category: "side", price: 35, rating: 4.1, ingredients: ["Potatoes", "Oil", "Salt"], isVeg: true, isHealthy: false },
        { id: 15, name: "Mango Lassi", category: "beverage", price: 35, rating: 4.6, ingredients: ["Yogurt", "Mango", "Sugar"], isVeg: true, isHealthy: true }
      ],
      thursday: [
        { id: 16, name: "Palak Paneer with Roti", category: "main", price: 75, rating: 4.8, ingredients: ["Spinach", "Paneer", "Whole Wheat"], isVeg: true, isHealthy: true },
        { id: 17, name: "Vegetable Fried Rice", category: "main", price: 65, rating: 4.3, ingredients: ["Rice", "Mixed Vegetables", "Sauces"], isVeg: true, isHealthy: true },
        { id: 18, name: "Pav Bhaji", category: "main", price: 60, rating: 4.7, ingredients: ["Mixed Vegetables", "Bread", "Spices"], isVeg: true, isHealthy: true },
        { id: 19, name: "Fruit Yogurt", category: "side", price: 30, rating: 4.4, ingredients: ["Yogurt", "Fruits", "Honey"], isVeg: true, isHealthy: true },
        { id: 20, name: "Orange Juice", category: "beverage", price: 30, rating: 4.5, ingredients: ["Fresh Oranges"], isVeg: true, isHealthy: true }
      ],
      friday: [
        { id: 21, name: "Special Thali", category: "main", price: 90, rating: 4.9, ingredients: ["Roti", "Rice", "Dal", "Vegetables", "Salad"], isVeg: true, isHealthy: true },
        { id: 22, name: "Burger", category: "main", price: 50, rating: 4.2, ingredients: ["Bun", "Vegetable Patty", "Vegetables"], isVeg: true, isHealthy: false },
        { id: 23, name: "Macaroni Pasta", category: "main", price: 55, rating: 4.3, ingredients: ["Pasta", "Cheese", "Vegetables"], isVeg: true, isHealthy: true },
        { id: 24, name: "Chocolate muffin", category: "side", price: 25, rating: 4.0, ingredients: ["Flour", "Chocolate", "Sugar"], isVeg: true, isHealthy: false },
        { id: 25, name: "Iced Tea", category: "beverage", price: 25, rating: 4.1, ingredients: ["Tea", "Lemon", "Sugar"], isVeg: true, isHealthy: true }
      ]
    },
    dayNames: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday"
    },
    dietaryInfo: [
      {
        type: "Vegetarian",
        description: "Contains no meat, fish, or poultry products",
        icon: "🥬"
      },
      {
        type: "Healthy Choice",
        description: "Lower in fat, sugar, or calories; higher in nutrients",
        icon: "💚"
      },
      {
        type: "Contains Dairy",
        description: "Contains milk or milk products",
        icon: "🥛"
      },
      {
        type: "Contains Gluten",
        description: "Contains wheat, barley, or rye products",
        icon: "🌾"
      }
    ]
  },
  nutrition: {
    title: "Nutrition Information",
    subtitle: "We're committed to supporting student health through nutritious meal options",
    philosophy: {
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
        icon: "Apple"
      },
      {
        title: "Fresh Ingredients",
        description: "We use fresh, locally sourced ingredients to ensure quality and nutritional value",
        icon: "Carrot"
      },
      {
        title: "Whole Grains",
        description: "Where possible, we use whole grains for added fiber and nutrients",
        icon: "Wheat"
      },
      {
        title: "Dairy Options",
        description: "We offer both dairy and non-dairy options to accommodate different dietary needs",
        icon: "Milk"
      },
      {
        title: "Protein Sources",
        description: "Vegetarian protein sources like lentils, beans, and paneer are regularly included",
        icon: "Egg"
      },
      {
        title: "Expert Guidance",
        description: "Our menu is developed with guidance from nutrition experts",
        icon: "ChefHat"
      }
    ]
  },
  ordering: {
    title: "Ordering System",
    subtitle: "Convenient ways to order and enjoy your meals",
    howToOrderTitle: "How to Order",
    cartTitle: "Your Cart",
    emptyCartMessage: "Your cart is empty",
    totalLabel: "Total",
    checkoutButton: "Checkout",
    paymentOptions: {
      title: "Payment Options",
      options: [
        "Student ID card (cashless system)",
        "Pre-paid meal plans",
        "Cash payments",
        "Online payments through parent portal"
      ]
    },
    orderingInfo: [
      {
        step: 1,
        title: "Pre-order System",
        description: "Place your orders by 10:00 AM for lunch delivery"
      },
      {
        step: 2,
        title: "Online Portal",
        description: "Use our student portal to browse menus and place orders"
      },
      {
        step: 3,
        title: "Meal Cards",
        description: "Use your student ID card for cashless payments"
      },
      {
        step: 4,
        title: "Pickup Points",
        description: "Collect your orders from designated pickup areas"
      }
    ]
  },
  contact: {
    title: "Canteen Contact",
    subtitle: "Get in touch with our canteen staff for any queries or special requests",
    manager: {
      title: "Canteen Manager",
      name: "Mrs. Sunita Patel",
      position: "Canteen Manager",
      phone: "+91 98765 43210",
      phoneHours: "Mon-Sat, 8:00 AM - 4:00 PM",
      email: "canteen@stcolumbas.edu"
    },
    hoursTitle: "Canteen Hours",
    hours: [
      { meal: "Breakfast", time: "7:30 AM - 8:30 AM" },
      { meal: "Lunch", time: "12:00 PM - 2:00 PM" },
      { meal: "Snacks", time: "3:00 PM - 4:00 PM" }
    ],
    location: {
      title: "Location",
      description: "Ground Floor, Near Main Building"
    },
    specialDietary: {
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
    title: "Canteen Resources",
    subtitle: "Download menus, nutrition guides, and other helpful documents",
    items: [
      {
        title: "Monthly Menu Calendar",
        description: "Complete menu for the entire month",
        format: "PDF",
        size: "1.2 MB",
        icon: "Calendar"
      },
      {
        title: "Nutrition Guide",
        description: "Detailed nutritional information for all items",
        format: "PDF",
        size: "2.1 MB",
        icon: "Heart"
      },
      {
        title: "Order Form",
        description: "Printable order form for offline ordering",
        format: "DOCX",
        size: "0.5 MB",
        icon: "Download"
      },
      {
        title: "Feedback Form",
        description: "Share your feedback and suggestions",
        format: "PDF",
        size: "0.7 MB",
        icon: "Users"
      }
    ],
    downloadButton: "Download"
  },
  cta: {
    title: "Have Questions About Our Canteen?",
    subtitle: "Contact our canteen staff for menu questions, dietary concerns, or feedback",
    buttons: [
      { text: "Contact Canteen Manager", style: "primary" },
      { text: "Provide Feedback", style: "secondary" }
    ]
  },
  labels: {
    addToCart: "Add to Cart",
    vegLabel: "Veg",
    healthyLabel: "Healthy",
    ingredientsLabel: "Ingredients"
  }
};

// Map string icon names to Lucide React components
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

const CanteenPage = () => {
  const [activeTab, setActiveTab] = useState(canteenData.tabs[0].id);
  const [selectedDay, setSelectedDay] = useState(Object.keys(canteenData.menu.dayNames)[0]);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative h-96 bg-gradient-to-r from-green-800 to-green-600 text-white overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Optional: Uncomment to show image overlay */}
        {/* <img
          src={canteenData.hero.image}
          alt={canteenData.hero.imageAlt}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        /> */}
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{canteenData.hero.title}</h1>
            <p className="text-xl text-green-100 leading-relaxed">{canteenData.hero.subtitle}</p>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center">
              <Utensils className="mr-2 h-5 w-5" />
              {canteenData.hero.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* Canteen Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{canteenData.benefits.title}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{canteenData.benefits.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {canteenData.benefits.items.map((benefit, index) => {
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
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {canteenData.tabs.map((tab) => {
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

      {/* Tab Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{canteenData.menu.title}</h3>
                  <p className="text-gray-600">{canteenData.menu.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={canteenData.menu.searchPlaceholder}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Day Selector */}
              <div className="flex flex-wrap gap-2 mb-8">
                {Object.keys(canteenData.menu.dayNames).map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedDay === day
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {canteenData.menu.dayNames[day]}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {canteenData.menu.weeklyMenu[selectedDay].map(item => (
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
                        {item.isVeg && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{canteenData.labels.vegLabel}</span>}
                        {item.isHealthy && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{canteenData.labels.healthyLabel}</span>}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{canteenData.labels.ingredientsLabel}: {item.ingredients.join(", ")}</p>
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        {canteenData.labels.addToCart}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dietary Information */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">{canteenData.menu.dietaryGuideTitle}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {canteenData.menu.dietaryInfo.map((info, index) => (
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
          {activeTab === 'nutrition' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{canteenData.nutrition.title}</h3>
              <p className="text-gray-600 mb-8">{canteenData.nutrition.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {canteenData.nutrition.facts.map((fact, index) => {
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
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-4">{canteenData.nutrition.philosophy.title}</h4>
                <p className="text-blue-700 mb-4">{canteenData.nutrition.philosophy.description}</p>
                <ul className="space-y-2 text-sm text-blue-700">
                  {canteenData.nutrition.philosophy.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Ordering Tab */}
          {activeTab === 'ordering' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{canteenData.ordering.title}</h3>
              <p className="text-gray-600 mb-8">{canteenData.ordering.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{canteenData.ordering.howToOrderTitle}</h4>
                  <div className="space-y-6">
                    {canteenData.ordering.orderingInfo.map((info, index) => (
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
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{canteenData.ordering.cartTitle}</h4>
                  {cart.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">{canteenData.ordering.emptyCartMessage}</p>
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
                          <span>{canteenData.ordering.totalLabel}</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                          {canteenData.ordering.checkoutButton}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-4">{canteenData.ordering.paymentOptions.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  {canteenData.ordering.paymentOptions.options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{canteenData.contact.title}</h3>
              <p className="text-gray-600 mb-8">{canteenData.contact.subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{canteenData.contact.manager.title}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">{canteenData.contact.manager.name}</p>
                        <p className="text-sm text-gray-600">{canteenData.contact.manager.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">{canteenData.contact.manager.phone}</p>
                        <p className="text-sm text-gray-600">{canteenData.contact.manager.phoneHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-green-600 mr-3" />
                      <p className="font-medium">{canteenData.contact.manager.email}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{canteenData.contact.hoursTitle}</h4>
                  <div className="space-y-3">
                    {canteenData.contact.hours.map((hour, index) => (
                      <div key={index} className="flex items-center">
                        <Clock className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <p className="font-medium">{hour.meal}</p>
                          <p className="text-sm text-gray-600">{hour.time}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">{canteenData.contact.location.title}</p>
                        <p className="text-sm text-gray-600">{canteenData.contact.location.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">{canteenData.contact.specialDietary.title}</h4>
                <p className="text-green-700 mb-4">{canteenData.contact.specialDietary.description}</p>
                <ul className="space-y-2 text-sm text-green-700">
                  {canteenData.contact.specialDietary.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{canteenData.resources.title}</h2>
            <p className="text-lg text-gray-600">{canteenData.resources.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {canteenData.resources.items.map((resource, index) => {
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
                    {canteenData.resources.downloadButton}
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
          <h2 className="text-3xl font-bold mb-4">{canteenData.cta.title}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">{canteenData.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {canteenData.cta.buttons.map((button, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  button.style === 'primary'
                    ? 'bg-white text-green-800 hover:bg-gray-100'
                    : 'bg-transparent border border-white text-white hover:bg-white/10'
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanteenPage;