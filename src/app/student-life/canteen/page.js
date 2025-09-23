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
  ChevronRight,
  ArrowRight,
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
  ChefHat
} from 'lucide-react';

const CanteenPage = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const [selectedDay, setSelectedDay] = useState('monday');
  const [cart, setCart] = useState([]);

  const canteenTabs = [
    { id: 'menu', name: 'Menu', icon: Utensils },
    { id: 'nutrition', name: 'Nutrition', icon: Heart },
    { id: 'ordering', name: 'Ordering', icon: ShoppingCart },
    { id: 'contact', name: 'Contact', icon: Phone }
  ];

  const canteenBenefits = [
    {
      icon: Heart,
      title: "Healthy Options",
      description: "Nutritious meals prepared with fresh ingredients"
    },
    {
      icon: Star,
      title: "Quality Food",
      description: "High-quality ingredients and hygienic preparation"
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Efficient service to minimize waiting time"
    },
    {
      icon: Users,
      title: "Student-Friendly",
      description: "Options tailored to student preferences and budgets"
    }
  ];

  const weeklyMenu = {
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
  };

  const nutritionFacts = [
    {
      title: "Balanced Meals",
      description: "All meals are designed to provide balanced nutrition with appropriate portions of carbs, proteins, and fats",
      icon: Apple
    },
    {
      title: "Fresh Ingredients",
      description: "We use fresh, locally sourced ingredients to ensure quality and nutritional value",
      icon: Carrot
    },
    {
      title: "Whole Grains",
      description: "Where possible, we use whole grains for added fiber and nutrients",
      icon: Wheat
    },
    {
      title: "Dairy Options",
      description: "We offer both dairy and non-dairy options to accommodate different dietary needs",
      icon: Milk
    },
    {
      title: "Protein Sources",
      description: "Vegetarian protein sources like lentils, beans, and paneer are regularly included",
      icon: Egg
    },
    {
      title: "Expert Guidance",
      description: "Our menu is developed with guidance from nutrition experts",
      icon: ChefHat
    }
  ];

  const dietaryInfo = [
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
  ];

  const orderingInfo = [
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
  ];

  const resources = [
    {
      title: "Monthly Menu Calendar",
      description: "Complete menu for the entire month",
      format: "PDF",
      size: "1.2 MB",
      icon: Calendar
    },
    {
      title: "Nutrition Guide",
      description: "Detailed nutritional information for all items",
      format: "PDF",
      size: "2.1 MB",
      icon: Heart
    },
    {
      title: "Order Form",
      description: "Printable order form for offline ordering",
      format: "DOCX",
      size: "0.5 MB",
      icon: Download
    },
    {
      title: "Feedback Form",
      description: "Share your feedback and suggestions",
      format: "PDF",
      size: "0.7 MB",
      icon: Users
    }
  ];

  const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday"
  };

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
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-green-900/60 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="School Canteen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">School Canteen</h1>
            <p className="text-xl mb-6 text-gray-200">
              Delicious, nutritious meals for growing minds and bodies
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mx-auto">
              <Utensils className="mr-2 h-5 w-5" />
              View Today's Menu
            </button>
          </div>
        </div>
      </section>

      {/* Canteen Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Our Canteen?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're committed to providing healthy, delicious meals that students love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {canteenBenefits.map((benefit, index) => {
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
            {canteenTabs.map((tab) => {
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
          {/* Menu Tab */}
          {activeTab === 'menu' && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Weekly Menu</h3>
                  <p className="text-gray-600">Delicious and nutritious meals prepared daily</p>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
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
                {Object.keys(dayNames).map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedDay === day
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dayNames[day]}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {weeklyMenu[selectedDay].map(item => (
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
                        {item.isVeg && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Veg</span>}
                        {item.isHealthy && <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Healthy</span>}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">Ingredients: {item.ingredients.join(", ")}</p>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dietary Information */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Dietary Symbols Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dietaryInfo.map((info, index) => (
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nutrition Information</h3>
              <p className="text-gray-600 mb-8">We're committed to supporting student health through nutritious meal options</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {nutritionFacts.map((fact, index) => {
                  const IconComponent = fact.icon;
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
                <h4 className="font-semibold text-blue-800 mb-4">Our Nutrition Philosophy</h4>
                <p className="text-blue-700 mb-4">
                  We believe that healthy eating habits established during school years can last a lifetime. 
                  Our meals are designed to provide the energy and nutrients students need to focus, learn, and grow.
                </p>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>We limit processed foods and artificial ingredients</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>We incorporate fruits and vegetables into every meal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>We offer appropriate portion sizes for different age groups</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                    </div>
                    <span>We accommodate special dietary needs whenever possible</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Ordering Tab */}
          {activeTab === 'ordering' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ordering System</h3>
              <p className="text-gray-600 mb-8">Convenient ways to order and enjoy your meals</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">How to Order</h4>
                  <div className="space-y-6">
                    {orderingInfo.map((info, index) => (
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
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Cart</h4>
                  {cart.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">Your cart is empty</p>
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
                          <span>Total:</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
                          Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-4">Payment Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div className="flex items-center">
                    <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                    </div>
                    <span>Student ID card (cashless system)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                    </div>
                    <span>Pre-paid meal plans</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                    </div>
                    <span>Cash payments</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-yellow-700 rounded-full"></div>
                    </div>
                    <span>Online payments through parent portal</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Canteen Contact</h3>
              <p className="text-gray-600 mb-8">Get in touch with our canteen staff for any queries or special requests</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Canteen Manager</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Mrs. Sunita Patel</p>
                        <p className="text-sm text-gray-600">Canteen Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">+91 98765 43210</p>
                        <p className="text-sm text-gray-600">Mon-Sat, 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-green-600 mr-3" />
                      <p className="font-medium">canteen@stcolumbas.edu</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Canteen Hours</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Breakfast</p>
                        <p className="text-sm text-gray-600">7:30 AM - 8:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Lunch</p>
                        <p className="text-sm text-gray-600">12:00 PM - 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Snacks</p>
                        <p className="text-sm text-gray-600">3:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-gray-600">Ground Floor, Near Main Building</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Special Dietary Requirements</h4>
                <p className="text-green-700 mb-4">
                  We accommodate special dietary needs whenever possible. Please contact the canteen manager at least 24 hours in advance for:
                </p>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Food allergies (nuts, gluten, dairy, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Religious dietary restrictions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Medical dietary requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-green-700 rounded-full"></div>
                    </div>
                    <span>Other special dietary needs</span>
                  </li>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Canteen Resources</h2>
            <p className="text-lg text-gray-600">
              Download menus, nutrition guides, and other helpful documents
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
          <h2 className="text-3xl font-bold mb-4">Have Questions About Our Canteen?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Contact our canteen staff for menu questions, dietary concerns, or feedback
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Canteen Manager
            </button>
            <button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors">
              Provide Feedback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanteenPage;