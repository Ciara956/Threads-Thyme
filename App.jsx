import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Camera, Package, Shirt, Gift, Search, Menu, X, Upload, Send, Gem, Home, ChevronLeft, CreditCard, Smartphone, Truck, Shield, Clock, CheckCircle } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [customOrder, setCustomOrder] = useState({
    name: '',
    email: '',
    phone: '',
    itemDescription: '',
    category: 'crochet',
    image: null,
    imagePreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeSupportSection, setActiveSupportSection] = useState('shipping');
  const [isFirstTimeShopper, setIsFirstTimeShopper] = useState(true); // Set to false for returning customers
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'mobile-money', // 'mobile-money', 'card', 'paypal', 'cash-on-delivery'
    mobileProvider: 'mtn', // 'mtn', 'airtel'
    deliveryOption: 'before-delivery' // 'before-delivery', 'on-delivery'
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Mock product data with jewelry categories
  const products = [
    {
      id: 1,
      name: "Handmade Crochet Blanket",
      price: 85,
      category: "crochet",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Crochet+Blanket",
      rating: 4.9,
      description: "Cozy handmade blanket perfect for gifts or home decor"
    },
    {
      id: 2,
      name: "Boho Plant Hanger",
      price: 28,
      category: "crochet",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Plant+Hanger",
      rating: 4.8,
      description: "Beautiful boho-style plant hanger for your indoor garden"
    },
    {
      id: 3,
      name: "Vintage Silk Blouse",
      price: 45,
      category: "thrift",
      image: "https://placehold.co/400x400/f5f0e6/c2410c?text=Silk+Blouse",
      rating: 4.7,
      description: "Gorgeous vintage silk blouse from the 1980s"
    },
    {
      id: 4,
      name: "Handmade Gift Box Set",
      price: 35,
      category: "gift",
      image: "https://placehold.co/400x400/fef7ed/d97706?text=Gift+Box",
      rating: 4.9,
      description: "Curated gift box with handmade items and herbal treats"
    },
    {
      id: 5,
      name: "Crochet Market Tote",
      price: 42,
      category: "crochet",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Market+Tote",
      rating: 4.8,
      description: "Sturdy and stylish market tote, perfect for daily use"
    },
    {
      id: 6,
      name: "Retro Denim Jacket",
      price: 65,
      category: "thrift",
      image: "https://placehold.co/400x400/f5f0e6/c2410c?text=Denim+Jacket",
      rating: 4.6,
      description: "Classic vintage denim jacket with unique embroidery"
    },
    {
      id: 7,
      name: "Herbal Scented Candles",
      price: 22,
      category: "gift",
      image: "https://placehold.co/400x400/fef7ed/d97706?text=Thyme+Candles",
      rating: 4.9,
      description: "Hand-poured candles with thyme and lavender essential oils"
    },
    {
      id: 8,
      name: "Crochet Coaster Set",
      price: 18,
      category: "crochet",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Coasters",
      rating: 4.7,
      description: "Set of 6 beautiful handmade coasters"
    },
    {
      id: 9,
      name: "Handmade Seed Bead Necklace",
      price: 48,
      category: "handmade-jewelry",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Seed+Beads",
      rating: 4.8,
      description: "Delicate handmade necklace with seed beads and natural stones"
    },
    {
      id: 10,
      name: "Macrame Bracelet Set",
      price: 32,
      category: "handmade-jewelry",
      image: "https://placehold.co/400x400/e8f5e9/2e7d32?text=Macrame",
      rating: 4.7,
      description: "Set of 3 handcrafted macrame bracelets with wooden beads"
    },
    {
      id: 11,
      name: "Vintage Gold Hoop Earrings",
      price: 65,
      category: "jewelry",
      image: "https://placehold.co/400x400/f5f0e6/c2410c?text=Gold+Hoops",
      rating: 4.9,
      description: "Classic vintage gold hoop earrings from the 1970s"
    },
    {
      id: 12,
      name: "Art Deco Pendant Necklace",
      price: 89,
      category: "jewelry",
      image: "https://placehold.co/400x400/f5f0e6/c2410c?text=Art+Deco",
      rating: 4.8,
      description: "Stunning art deco pendant with genuine amethyst stone"
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Items', icon: Package },
    { id: 'crochet', name: 'Crochet Creations', icon: Camera },
    { id: 'gift', name: 'Gift Shop', icon: Gift },
    { id: 'thrift', name: 'Thrift Treasures', icon: Shirt },
    { id: 'handmade-jewelry', name: 'Handmade Jewelry', icon: Gem },
    { id: 'jewelry', name: 'Vintage Jewelry', icon: Gem }
  ];

  const customCategories = [
    { id: 'crochet', name: 'Custom Crochet Item' },
    { id: 'gift', name: 'Custom Gift Set' },
    { id: 'thrift', name: 'Thrift Item Search' },
    { id: 'handmade-jewelry', name: 'Custom Handmade Jewelry' },
    { id: 'jewelry', name: 'Vintage Jewelry Request' }
  ];

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setCartCount(prev => prev + 1);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    setCartCount(prev => Math.max(0, prev - 1));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomOrder(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomOrder(prev => ({
          ...prev,
          imagePreview: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomOrderChange = (field, value) => {
    setCustomOrder(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitCustomOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const emailContent = `
        New Custom Order Request
        
        Name: ${customOrder.name}
        Email: ${customOrder.email}
        Phone: ${customOrder.phone || 'Not provided'}
        Category: ${customCategories.find(cat => cat.id === customOrder.category)?.name}
        Description: ${customOrder.itemDescription}
        Image: ${customOrder.image ? 'Attached' : 'Not provided'}
      `.trim();
      
      console.log('Email would be sent to threadsandthyme@gmail.com with content:', emailContent);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setCustomOrder({
        name: '',
        email: '',
        phone: '',
        itemDescription: '',
        category: 'crochet',
        image: null,
        imagePreview: null
      });
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      alert('There was an error submitting your order. Please try again.');
    }
  };

  const resetImage = () => {
    setCustomOrder(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }));
  };

  const handleCheckoutChange = (field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateShipping = () => {
    if (isFirstTimeShopper && cartItems.length > 0) {
      return 0; // Free shipping for first-time shoppers
    }
    return cartItems.length > 0 ? 5 : 0;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPaymentSuccess(true);
      setCartItems([]);
      setCartCount(0);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
        setCurrentPage('home');
      }, 5000);
    } catch (error) {
      setIsProcessingPayment(false);
      alert('Payment processing failed. Please try again.');
    }
  };

  // Handle mobile menu close on page change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Footer navigation handler
  const handleFooterNavigation = (page, category = null, supportSection = null) => {
    if (category) {
      setActiveCategory(category);
    }
    if (supportSection) {
      setActiveSupportSection(supportSection);
    }
    setCurrentPage(page);
  };

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-stone-800">
              Threads&Thyme
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`font-medium ${currentPage === 'home' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('shop')} 
              className={`font-medium ${currentPage === 'shop' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setCurrentPage('custom-order')} 
              className={`font-medium ${currentPage === 'custom-order' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
            >
              Custom Order
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              className={`font-medium ${currentPage === 'about' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleFooterNavigation('support', null, 'shipping')} 
              className={`font-medium ${currentPage === 'support' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
            >
              Support
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('cart')} 
              className="p-2 text-stone-700 hover:text-emerald-700 relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-stone-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => setCurrentPage('home')} 
                className={`font-medium text-left ${currentPage === 'home' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('shop')} 
                className={`font-medium text-left ${currentPage === 'shop' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
              >
                Shop
              </button>
              <button 
                onClick={() => setCurrentPage('custom-order')} 
                className={`font-medium text-left ${currentPage === 'custom-order' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
              >
                Custom Order
              </button>
              <button 
                onClick={() => setCurrentPage('about')} 
                className={`font-medium text-left ${currentPage === 'about' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
              >
                About
              </button>
              <button 
                onClick={() => handleFooterNavigation('support', null, 'shipping')} 
                className={`font-medium text-left ${currentPage === 'support' ? 'text-emerald-700' : 'text-stone-700 hover:text-emerald-700'}`}
              >
                Support
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // Cart Page with Payment Options
  const CartPage = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = calculateShipping();
    const total = subtotal + shipping;

    return (
      <div className="py-16 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {paymentSuccess ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Payment Successful!</h2>
              <p className="text-stone-700 text-lg mb-6">
                Thank you for your order! Your items will be shipped soon.
              </p>
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-8">
                <button 
                  onClick={() => setCurrentPage('shop')}
                  className="flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to Shop
                </button>
              </div>
              
              <h2 className="text-3xl font-bold text-stone-900 mb-8">Your Cart & Checkout</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-stone-700 mb-2">Your cart is empty</h3>
                  <p className="text-stone-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <button 
                    onClick={() => setCurrentPage('shop')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-6 mb-8">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center bg-stone-50 rounded-xl p-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="ml-4 flex-1">
                            <h4 className="font-semibold text-stone-900">{item.name}</h4>
                            <p className="text-stone-700 text-sm mb-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-stone-800">${item.price}</span>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleCheckout} className="bg-stone-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-stone-900 mb-6">Checkout Information</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={checkoutData.fullName}
                            onChange={(e) => handleCheckoutChange('fullName', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            value={checkoutData.email}
                            onChange={(e) => handleCheckoutChange('email', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={checkoutData.phone}
                            onChange={(e) => handleCheckoutChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">City *</label>
                          <input
                            type="text"
                            required
                            value={checkoutData.city}
                            onChange={(e) => handleCheckoutChange('city', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                            placeholder="Enter your city"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-stone-700 mb-2">Delivery Address *</label>
                        <textarea
                          required
                          rows={3}
                          value={checkoutData.address}
                          onChange={(e) => handleCheckoutChange('address', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                          placeholder="Enter your full delivery address"
                        />
                      </div>

                      {/* Payment Method Selection */}
                      <div className="mb-6">
                        <h4 className="font-bold text-stone-900 mb-4">Payment Method</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('paymentMethod', 'mobile-money')}
                            className={`p-4 border-2 rounded-xl text-left transition-colors ${
                              checkoutData.paymentMethod === 'mobile-money'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <Smartphone className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="font-medium">Mobile Money</span>
                            </div>
                            <p className="text-sm text-stone-600">MTN or Airtel Mobile Money</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('paymentMethod', 'card')}
                            className={`p-4 border-2 rounded-xl text-left transition-colors ${
                              checkoutData.paymentMethod === 'card'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <CreditCard className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="font-medium">Card Payment</span>
                            </div>
                            <p className="text-sm text-stone-600">Visa, Mastercard, etc.</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('paymentMethod', 'paypal')}
                            className={`p-4 border-2 rounded-xl text-left transition-colors ${
                              checkoutData.paymentMethod === 'paypal'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="font-medium">PayPal</span>
                            </div>
                            <p className="text-sm text-stone-600">Secure PayPal payment</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('paymentMethod', 'cash-on-delivery')}
                            className={`p-4 border-2 rounded-xl text-left transition-colors ${
                              checkoutData.paymentMethod === 'cash-on-delivery'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <Truck className="w-5 h-5 text-emerald-600 mr-2" />
                              <span className="font-medium">Cash on Delivery</span>
                            </div>
                            <p className="text-sm text-stone-600">Pay when your order arrives</p>
                          </button>
                        </div>
                      </div>

                      {/* Mobile Money Provider (if selected) */}
                      {checkoutData.paymentMethod === 'mobile-money' && (
                        <div className="mb-6">
                          <h4 className="font-bold text-stone-900 mb-4">Mobile Money Provider</h4>
                          <div className="flex space-x-4">
                            <button
                              type="button"
                              onClick={() => handleCheckoutChange('mobileProvider', 'mtn')}
                              className={`flex-1 p-4 border-2 rounded-xl text-center transition-colors ${
                                checkoutData.mobileProvider === 'mtn'
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              <div className="font-medium">MTN Mobile Money</div>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCheckoutChange('mobileProvider', 'airtel')}
                              className={`flex-1 p-4 border-2 rounded-xl text-center transition-colors ${
                                checkoutData.mobileProvider === 'airtel'
                                  ? 'border-emerald-500 bg-emerald-50'
                                  : 'border-stone-200 hover:border-stone-300'
                              }`}
                            >
                              <div className="font-medium">Airtel Money</div>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Delivery Timing */}
                      <div className="mb-6">
                        <h4 className="font-bold text-stone-900 mb-4">Payment Timing</h4>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('deliveryOption', 'before-delivery')}
                            className={`flex-1 p-4 border-2 rounded-xl text-center transition-colors ${
                              checkoutData.deliveryOption === 'before-delivery'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="font-medium mb-2">Pay Before Delivery</div>
                            <p className="text-sm text-stone-600">Secure your order now</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCheckoutChange('deliveryOption', 'on-delivery')}
                            className={`flex-1 p-4 border-2 rounded-xl text-center transition-colors ${
                              checkoutData.deliveryOption === 'on-delivery'
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div className="font-medium mb-2">Pay on Delivery</div>
                            <p className="text-sm text-stone-600">Available for Cash on Delivery</p>
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessingPayment}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center"
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing Payment...
                          </>
                        ) : (
                          `Complete Order - $${total.toFixed(2)}`
                        )}
                      </button>
                    </form>
                  </div>
                  
                  <div className="bg-stone-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-4">Order Summary</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-stone-700">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-700">Shipping</span>
                        <span className="font-medium">
                          {isFirstTimeShopper ? (
                            <span className="text-emerald-600">FREE (First order!)</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="border-t border-stone-200 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-stone-900">Total</span>
                        <span className="text-lg font-bold text-stone-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                        <span className="font-medium text-emerald-800">First Order Special!</span>
                      </div>
                      <p className="text-emerald-700 text-sm mt-2">
                        Enjoy free shipping on your first order with us!
                      </p>
                    </div>
                    
                    <div className="text-sm text-stone-600 space-y-2">
                      <p>✓ Secure payment processing</p>
                      <p>✓ Order tracking available</p>
                      <p>✓ 30-day return policy</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  // Home Page (rest of the components remain the same as before)
  const HomePage = () => (
    <div className="bg-gradient-to-r from-emerald-50 to-stone-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6">
            Handcrafted with Love, Curated with Care
          </h2>
          <p className="text-xl text-stone-700 mb-8 leading-relaxed">
            Discover unique crochet creations, thoughtfully curated gifts, and vintage treasures that tell a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              Shop Now
            </button>
            <button 
              onClick={() => setCurrentPage('custom-order')}
              className="bg-white hover:bg-stone-50 text-stone-700 border-2 border-emerald-600 px-8 py-3 rounded-full font-semibold text-lg transition-colors"
            >
              Custom Order
            </button>
          </div>
        </div>
      </div>

      {/* Jewelry Featured Section */}
      <section className="py-16 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-900 mb-4">Jewelry Collection</h3>
            <p className="text-stone-700 text-lg">Handcrafted pieces and vintage treasures to adorn yourself</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-2">Handmade Jewelry</h4>
              <p className="text-stone-700">Unique pieces crafted with love using natural materials and traditional techniques.</p>
            </div>
            
            <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-2">Vintage Jewelry</h4>
              <p className="text-stone-700">Curated collection of authentic vintage and antique jewelry pieces with history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-900 mb-4">What We Offer</h3>
            <p className="text-stone-700 text-lg">Six ways to bring beauty and uniqueness into your life</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-emerald-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-2">Crochet Creations</h4>
              <p className="text-stone-700">Handmade with premium yarns, each piece is a labor of love crafted just for you.</p>
            </div>
            
            <div className="text-center p-6 bg-amber-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-amber-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-2">Gift Shop</h4>
              <p className="text-stone-700">Thoughtfully curated gifts perfect for any occasion, wrapped with care and love.</p>
            </div>
            
            <div className="text-center p-6 bg-rose-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-rose-600" />
              </div>
              <h4 className="text-xl font-semibold text-stone-900 mb-2">Thrift Treasures</h4>
              <p className="text-stone-700">Vintage and secondhand finds that are unique, sustainable, and full of character.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div className="py-16 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-stone-900 mb-4">Shop Our Collection</h3>
          <p className="text-stone-700 text-lg">Handpicked items you'll love</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            let bgColor = 'bg-white text-stone-700 hover:bg-stone-100';
            let activeBg = 'bg-emerald-600 text-white';
            
            if (activeCategory === category.id) {
              if (category.id === 'crochet' || category.id === 'handmade-jewelry') activeBg = 'bg-emerald-600 text-white';
              else if (category.id === 'gift') activeBg = 'bg-amber-600 text-white';
              else if (category.id === 'thrift' || category.id === 'jewelry') activeBg = 'bg-rose-600 text-white';
              else activeBg = 'bg-stone-600 text-white';
              bgColor = activeBg;
            }
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-colors text-sm md:text-base ${bgColor}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border-2 border-stone-200 rounded-full focus:outline-none focus:border-emerald-400 text-stone-900"
          />
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-stone-50">
                    <Heart className="w-5 h-5 text-stone-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-stone-900 mb-2">{product.name}</h4>
                  <p className="text-stone-700 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-stone-600 ml-2">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-stone-800">${product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-stone-600 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Custom Order Page
  const CustomOrderPage = () => (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
        </div>
        
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-stone-900 mb-4">Custom Orders</h3>
          <p className="text-stone-700 text-lg">Have something special in mind? Let's create it together!</p>
        </div>

        <div className="bg-stone-50 rounded-2xl p-8 shadow-lg">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900 mb-2">Order Submitted Successfully!</h4>
              <p className="text-stone-700 mb-6">
                Thank you for your custom order request! We'll review your submission and contact you within 24-48 hours to discuss your project details.
              </p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Submit Another Order
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitCustomOrder} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customOrder.name}
                    onChange={(e) => handleCustomOrderChange('name', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={customOrder.email}
                    onChange={(e) => handleCustomOrderChange('email', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={customOrder.phone}
                  onChange={(e) => handleCustomOrderChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                  placeholder="Enter your phone number (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Order Type *</label>
                <select
                  required
                  value={customOrder.category}
                  onChange={(e) => handleCustomOrderChange('category', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900 bg-white"
                >
                  {customCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Item Description *
                </label>
                <p className="text-sm text-stone-600 mb-2">
                  Describe what you'd like us to create or find for you. Include details like size, colors, materials, or any specific requirements.
                </p>
                <textarea
                  required
                  rows={6}
                  value={customOrder.itemDescription}
                  onChange={(e) => handleCustomOrderChange('itemDescription', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:border-emerald-400 text-stone-900"
                  placeholder="Tell us about your custom request..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Reference Image (Optional)
                </label>
                <p className="text-sm text-stone-600 mb-3">
                  Upload a photo, sketch, or inspiration image to help us understand your vision.
                </p>
                
                {customOrder.imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={customOrder.imagePreview} 
                      alt="Preview" 
                      className="max-h-48 rounded-lg border-2 border-stone-200"
                    />
                    <button
                      type="button"
                      onClick={resetImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                    <Upload className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                    <p className="text-stone-600 mb-2">Drag and drop your image here</p>
                    <p className="text-sm text-stone-500 mb-4">or</p>
                    <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full cursor-pointer inline-block transition-colors">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-stone-500 mt-2">JPG, PNG, or GIF (Max 5MB)</p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Custom Order
                    </>
                  )}
                </button>
                <p className="text-sm text-stone-600 mt-4">
                  Your request will be sent to threadsandthyme@gmail.com
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Home
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-stone-900 mb-6">Our Story</h3>
            <p className="text-stone-700 mb-4 leading-relaxed">
              Threads&Thyme was born from a passion for creating beautiful, meaningful items and giving pre-loved treasures a second chance to shine. 
              Every piece in our collection is chosen with intention and care.
            </p>
            <p className="text-stone-700 mb-6 leading-relaxed">
              As a one-woman shop, I pour my heart into each crochet creation, carefully curate our gift selections, and thoughtfully source vintage pieces 
              that tell a unique story. Sustainability and craftsmanship are at the core of everything we do.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <Camera className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-stone-800 font-medium">Handmade with Love</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <Gift className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-stone-800 font-medium">Sustainable Choices</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://placehold.co/600x400/8bc34a/ffffff?text=Threads%26Thyme+Studio" 
              alt="Threads&Thyme Studio"
              className="rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-2 fill-current" />
                <p className="font-semibold text-stone-900">5.0 Rating</p>
                <p className="text-stone-700 text-sm">From 128 happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Support Page
  const SupportPage = () => {
    const supportSections = [
      {
        id: 'shipping',
        title: 'Shipping Policy',
        icon: Truck,
        content: (
          <>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Standard Shipping</h4>
            <p className="text-stone-700 mb-4">
              We ship all orders within 3-5 business days of purchase. Standard shipping takes 5-7 business days to arrive.
            </p>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Expedited Shipping</h4>
            <p className="text-stone-700 mb-4">
              Need your order faster? We offer expedited shipping for an additional fee. Orders placed before 2 PM EST will ship the same day.
            </p>
            <h4 className="text-xl font-bold text-stone-900 mb-4">First Order Special</h4>
            <p className="text-stone-700 mb-4">
              <span className="text-emerald-600 font-semibold">FREE SHIPPING</span> on your first order with us! Just complete your purchase and we'll waive the shipping fee automatically.
            </p>
            <h4 className="text-xl font-bold text-stone-900 mb-4">International Shipping</h4>
            <p className="text-stone-700">
              We ship internationally! Please note that international orders may be subject to customs fees, taxes, and duties, which are the responsibility of the customer.
            </p>
          </>
        )
      },
      {
        id: 'returns',
        title: 'Returns & Exchanges',
        icon: RotateCcw,
        content: (
          <>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Return Policy</h4>
            <p className="text-stone-700 mb-4">
              We want you to be completely satisfied with your purchase! Returns are accepted within 30 days of delivery for full refund or exchange.
            </p>
            <h4 className="text-xl font-bold text-stone-900 mb-4">Conditions</h4>
            <p className="text-stone-700 mb-4">
              Items must be in original condition with tags attached. Custom orders and personalized items are final sale and cannot be returned.
            </p>
            <h4 className="text-xl font-bold text-stone-900 mb-4">How to Return</h4>
            <p className="text-stone-700">
              Contact us at hello@threadsandthyme.com with your order number and reason for return. We'll provide you with a return shipping label.
            </p>
          </>
        )
      },
      {
        id: 'faq',
        title: 'Frequently Asked Questions',
        icon: HelpCircle,
        content: (
          <>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-stone-700">
                  We accept MTN Mobile Money, Airtel Money, Credit/Debit Cards, PayPal, and Cash on Delivery for your convenience.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-2">Do you offer free shipping?</h4>
                <p className="text-stone-700">
                  Yes! We offer FREE shipping on your first order with us. Just complete your purchase and the shipping fee will be waived automatically.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-2">Can I pay when my order arrives?</h4>
                <p className="text-stone-700">
                  Absolutely! We offer Cash on Delivery payment option. You can choose to pay before delivery or upon receipt of your order.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900 mb-2">How long does custom order processing take?</h4>
                <p className="text-stone-700">
                  Custom orders typically take 2-4 weeks to complete, depending on the complexity of the item and current workload.
                </p>
              </div>
            </div>
          </>
        )
      }
    ];

    const currentSection = supportSections.find(section => section.id === activeSupportSection);
    const Icon = currentSection?.icon;

    return (
      <div className="py-16 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center text-emerald-700 hover:text-emerald-800 font-medium"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Home
            </button>
          </div>
          
          <h2 className="text-3xl font-bold text-stone-900 mb-8">Support Center</h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-stone-50 rounded-xl p-4">
                <h3 className="font-bold text-stone-900 mb-4">Help Topics</h3>
                <ul className="space-y-2">
                  {supportSections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => setActiveSupportSection(section.id)}
                          className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${
                            activeSupportSection === section.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <SectionIcon className="w-5 h-5 mr-3" />
                          {section.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            
            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-stone-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <Icon className="w-8 h-8 text-emerald-600 mr-3" />
                  <h3 className="text-2xl font-bold text-stone-900">{currentSection?.title}</h3>
                </div>
                <div className="prose prose-stone max-w-none">
                  {currentSection?.content}
                </div>
                <div className="mt-8 pt-6 border-t border-stone-200">
                  <h4 className="text-lg font-bold text-stone-900 mb-3">Need More Help?</h4>
                  <p className="text-stone-700 mb-4">
                    If you can't find what you're looking for, our customer support team is here to help!
                  </p>
                  <a 
                    href="mailto:hello@threadsandthyme.com" 
                    className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Threads&Thyme</h4>
            <p className="mb-4">Handcrafted items, curated gifts, and vintage treasures with heart and soul.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">f</span>
              </div>
              <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">ig</span>
              </div>
              <div className="w-8 h-8 bg-stone-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">p</span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-white mb-4">Shop</h5>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleFooterNavigation('shop', 'crochet')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Crochet Creations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('shop', 'gift')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Gift Shop
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('shop', 'thrift')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Thrift Treasures
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('shop', 'handmade-jewelry')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Handmade Jewelry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('shop', 'jewelry')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Vintage Jewelry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('custom-order')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Custom Orders
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-white mb-4">Support</h5>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleFooterNavigation('support', null, 'shipping')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('support', null, 'returns')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('support', null, 'faq')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNavigation('about')} 
                  className="hover:text-white transition-colors text-left block w-full text-left"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-white mb-4">Contact</h5>
            <address className="not-italic space-y-2">
              <p>123 Craft Street</p>
              <p>Creative City, CC 12345</p>
              <p>hello@threadsandthyme.com</p>
              <p>(555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-12 pt-8 text-center">
          <p>&copy; 2025 Threads&Thyme. All rights reserved. Handcrafted with love.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'custom-order' && <CustomOrderPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'support' && <SupportPage />}
      
      <Footer />
    </div>
  );
};

export default App;
