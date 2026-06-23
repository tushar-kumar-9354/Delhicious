import React, { useState, useEffect, useRef } from 'react';

// Reusable Vegetarian Symbol (Green dot inside a green square)
const VegIcon = () => (
  <span className="veg-icon" title="100% Vegetarian">
    <span className="veg-dot"></span>
  </span>
);

const MENU_ITEMS = [
  // Pizzas
  {
    id: 'pizza-margherita',
    category: 'Pizza',
    name: 'Margherita (Plain Cheese Pizza)',
    description: 'Plain Cheese Pizza with premium mozzarella and fresh sauce.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&auto=format&fit=crop',
    prices: { S: '70/-', M: '120/-', L: '220/-' }
  },
  {
    id: 'pizza-simply-veg',
    category: 'Pizza',
    name: 'Simply Veg (Onion Capsicum & Cheese)',
    description: 'Fresh onion, crunchy capsicum, and melted cheese.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop',
    prices: { S: '70/-', M: '120/-', L: '220/-' }
  },
  {
    id: 'pizza-golden-corn',
    category: 'Pizza',
    name: 'Golden Corn Pizza (Sweet Corn & Cheese)',
    description: 'Steamed sweet corn and premium cheese blend.',
    image: '/golden_corn_pizza.png',
    prices: { S: '90/-', M: '140/-', L: '250/-' }
  },
  {
    id: 'pizza-veggie-delight',
    category: 'Pizza',
    name: 'Veggie Delight (Onion, Capsicum, Tomato, Corn & Cheese)',
    description: 'Onion, capsicum, tomato, sweet corn, and premium cheese.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    prices: { S: '90/-', M: '140/-', L: '250/-' }
  },
  {
    id: 'pizza-farmhouse',
    category: 'Pizza',
    name: 'Farmhouse (Onion, Tomato, Capsicum, Corn, Paneer Tikka & Cheese)',
    description: 'Delectable paneer tikka cubes with onion, tomato, capsicum, and corn.',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&auto=format&fit=crop',
    prices: { S: '100/-', M: '170/-', L: '280/-' }
  },
  {
    id: 'pizza-spicy-veg',
    category: 'Pizza',
    name: 'Spicy Veg (All The Veg, Paneer Tikka, Jalapeno & Red Peppria)',
    description: 'Paneer tikka, spicy jalapenos, red peppria, and mixed veggies.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop',
    prices: { S: '120/-', M: '200/-', L: '350/-' },
    spicy: true
  },
  {
    id: 'pizza-veg-overloaded',
    category: 'Pizza',
    name: 'Veg Overloaded (All The Veg, Olive, Jalapeno & Paneer Tikka)',
    description: 'All fresh veggies, black olives, jalapenos, and paneer tikka.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop',
    prices: { S: '140/-', M: '240/-', L: '400/-' }
  },
  {
    id: 'pizza-tandoori-special',
    category: 'Pizza',
    name: 'Tandoori Special (All The Veg, Tandoori Paneer Tika, Jalapeno & Cheese)',
    description: 'Tandoori paneer tika, fiery jalapenos, veggies, and cheese.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop',
    prices: { S: '140/-', M: '240/-', L: '400/-' },
    spicy: true
  },
  {
    id: 'pizza-peppy-paneer',
    category: 'Pizza',
    name: 'Peppy Paneer (Juice Paneer, Crispy, Capsicum & Red Paprika)',
    description: 'Juicy paneer cubes, crispy capsicum, and red paprika.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop',
    prices: { S: '110/-', M: '180/-', L: '320/-' }
  },
  {
    id: 'pizza-pasta-pizza',
    category: 'Pizza',
    name: 'Pasta Pizza (Pasta With Veg All Juice Souces)',
    description: 'Pasta loaded pizza with rich tomato base and melted cheese.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop',
    prices: { S: '140/-', M: '240/-', L: '400/-' }
  },
  {
    id: 'pizza-mushroom-delux',
    category: 'Pizza',
    name: 'Mushroom Delux (Onion, Capsicum, Mushroom, Jalapeno, Tomato & Corn)',
    description: 'Onion, capsicum, mushroom, jalapeno, tomato, and corn.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop',
    prices: { S: '110/-', M: '180/-', L: '320/-' }
  },
  {
    id: 'pizza-chocolate-pizza',
    category: 'Pizza',
    name: 'Chocolate Pizza (Choco Chips With Cheese)',
    description: 'Sweet pizza topped with dark and milk choco chips with cheese.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop',
    prices: { S: '120/-', M: '200/-', L: '350/-' }
  },
  {
    id: 'pizza-delhicious',
    category: 'Pizza',
    name: 'Delhi-cious Pizza (Mix All The Topping Special Dress With Blend Cheese)',
    description: 'Signature special loaded with mixed toppings and premium house cheese blend.',
    image: '/delhicious_special_pizza.png',
    prices: { S: '170/-', M: '300/-', L: '450/-' },
    spicy: true
  },
  {
    id: 'pizza-extra-cheese',
    category: 'Pizza',
    name: 'Extra Cheese',
    description: 'Add an extra layer of gooey, delicious melted cheese to your pizza.',
    image: '/extra_cheese.png',
    prices: { S: '20/-', M: '30/-', L: '60/-' }
  },

  // Garlic Bread
  {
    id: 'gb-plain',
    category: 'Garlic Bread',
    name: 'Cheese Plain Cheese Great Garlic Bread',
    description: 'Baked garlic bread topped with fresh garlic butter and plain cheese.',
    image: '/plain_cheese_garlic_bread.png',
    prices: { '3PC': '80/-', '6PC': '150/-' }
  },
  {
    id: 'gb-topping',
    category: 'Garlic Bread',
    name: 'Cheese & Topping Great Garlic Bread',
    description: 'Garlic bread loaded with mixed vegetable toppings and cheese.',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&auto=format&fit=crop',
    prices: { '3PC': '100/-', '6PC': '180/-' }
  },
  {
    id: 'gb-delhicious',
    category: 'Garlic Bread',
    name: 'Delhi-cious Special Great Garlic Bread',
    description: 'Signature garlic bread loaded with special toppings and extra cheese.',
    image: '/delhicious_special_garlic_bread.png',
    prices: { '3PC': '120/-', '6PC': '220/-' }
  },
  {
    id: 'gb-stuffed',
    category: 'Garlic Bread',
    name: 'Veg Stuffed - Corn, jalapeno, cheese',
    description: 'Freshly baked garlic bread stuffed with sweet corn, jalapenos, and cheese.',
    image: '/veg_stuffed_garlic_bread.png',
    price: '100/-'
  },
  {
    id: 'gb-stuffed-delhicious',
    category: 'Garlic Bread',
    name: 'Delhi-cious Spl.',
    description: 'Chef\'s special stuffed garlic bread with sweet corn, jalapenos, and extra cheese.',
    image: '/delhicious_stuffed_garlic_bread.png',
    price: '120/-',
    spicy: true
  },

  // Sandwich
  {
    id: 'sw-classic',
    category: 'Sandwich',
    name: 'Classic Sandwich',
    description: 'Toasted bread filled with garden veggies and light spread.',
    image: 'https://images.unsplash.com/photo-1521390188846-e2a3a97453a0?w=600&auto=format&fit=crop',
    price: '70/-'
  },
  {
    id: 'sw-aloo-tikki',
    category: 'Sandwich',
    name: 'Aloo Tikki Sandwich',
    description: 'Crispy potato patty sandwich with green chutney and onions.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop',
    price: '90/-'
  },
  {
    id: 'sw-tandoori',
    category: 'Sandwich',
    name: 'Tandoori Sandwich',
    description: 'Spicy tandoori paneer filling in fresh toasted bread.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&auto=format&fit=crop',
    price: '100/-',
    spicy: true
  },

  // Burger
  {
    id: 'burger-aloo-tikki',
    category: 'Burger',
    name: 'Aloo Tikki Burger',
    description: 'Crispy potato patty burger with onion, tomato, and sweet sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    price: '50/-'
  },
  {
    id: 'burger-cheese',
    category: 'Burger',
    name: 'Cheese Burger',
    description: 'Veggie patty layered with melted cheese slice and house sauce.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop',
    price: '70/-'
  },
  {
    id: 'burger-tandoori',
    category: 'Burger',
    name: 'Tandoori Burger',
    description: 'Veggie burger with a sizzling patty and rich tandoori sauce.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop',
    price: '90/-',
    spicy: true
  },
  {
    id: 'burger-delhicious-spl',
    category: 'Burger',
    name: 'Delhicious Spl.',
    description: 'Chef\'s special gourmet burger loaded with double cheese and fresh salad.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop',
    price: '120/-',
    spicy: true
  },

  // Fries
  {
    id: 'fries-salted',
    category: 'Fries',
    name: 'Salted Fries',
    description: 'Classic crispy golden potato fries, lightly salted.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop',
    price: '49/-'
  },
  {
    id: 'fries-peri-peri',
    category: 'Fries',
    name: 'Peri Peri Fries',
    description: 'Golden fries tossed in spicy peri peri seasoning.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop',
    price: '79/-'
  },
  {
    id: 'fries-cheese-loaded',
    category: 'Fries',
    name: 'Cheese Loaded Fries',
    description: 'Crispy fries loaded with cheese sauce and jalapenos.',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=600&auto=format&fit=crop',
    price: '120/-',
    spicy: true
  },

  // Mocktails & Shakes
  {
    id: 'drink-blue-moon',
    category: 'Mocktails & Shakes',
    name: 'Blue Moon Mocktail',
    description: 'Refreshing blue curacao mocktail served chilled.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
    price: '50/-'
  },
  {
    id: 'drink-strawberry',
    category: 'Mocktails & Shakes',
    name: 'Strawberry Mocktail',
    description: 'Sweet and refreshing strawberry syrup blended with lime.',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&auto=format&fit=crop',
    price: '50/-'
  },
  {
    id: 'drink-watermelon',
    category: 'Mocktails & Shakes',
    name: 'Watermelon Mocktail',
    description: 'Cool watermelon mocktail with club soda and ice.',
    image: '/watermelon_mocktail.png',
    price: '50/-'
  },
  {
    id: 'drink-kala-khatta',
    category: 'Mocktails & Shakes',
    name: 'Kala Khatta Mocktail',
    description: 'Traditional sweet and tangy kala khatta flavor mocktail.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
    price: '50/-'
  },
  {
    id: 'drink-virgin-mojito',
    category: 'Mocktails & Shakes',
    name: 'Virgin Mojito',
    description: 'Fresh mint, lime wedges, sugar syrup, and soda.',
    image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=600&auto=format&fit=crop',
    price: '50/-'
  },
  {
    id: 'shake-oreo',
    category: 'Mocktails & Shakes',
    name: 'Oreo Blast Shake',
    description: 'Creamy Oreo blast shake topped with chocolate chips.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop',
    price: '60/-'
  },
  {
    id: 'shake-strawberry-delight',
    category: 'Mocktails & Shakes',
    name: 'Strawberry Delight Shake',
    description: 'Thick shake made with sweet strawberries and rich ice cream.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop',
    price: '60/-'
  },
  {
    id: 'shake-coffee-frappe',
    category: 'Mocktails & Shakes',
    name: 'Coffee Frappe Shake',
    description: 'Blended coffee frappe shake served chilled.',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&auto=format&fit=crop',
    price: '60/-'
  },
  {
    id: 'shake-kitkat',
    category: 'Mocktails & Shakes',
    name: 'Kit-Kat Shake',
    description: 'Creamy vanilla shake blended with crispy Kit-Kat bars.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop',
    price: '60/-'
  },
  {
    id: 'shake-black-current',
    category: 'Mocktails & Shakes',
    name: 'Black Current Shake',
    description: 'Thick black current flavor shake.',
    image: '/black_current_shake.png',
    price: '60/-'
  },

  // Combos
  {
    id: 'combo-burger',
    category: 'Combo',
    name: 'Burger + Fries + Coke',
    description: 'A perfect combo featuring a veggie burger, crispy fries, and a chilled Coke.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    price: '99/-'
  },
  {
    id: 'combo-small-pizza',
    category: 'Combo',
    name: 'Small Pizza + Fries + Coke',
    description: 'Small Margherita pizza served with hot golden fries and a chilled Coke.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&auto=format&fit=crop',
    price: '169/-'
  },
  {
    id: 'combo-medium-pizza',
    category: 'Combo',
    name: 'Medium Pizza + Fries + Coke',
    description: 'Medium Margherita pizza served with a side of crispy fries and a Coke.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop',
    price: '220/-'
  }
];

const CATEGORIES = ['All', 'Pizza', 'Garlic Bread', 'Sandwich', 'Burger', 'Fries', 'Mocktails & Shakes', 'Combo'];

// Restrict to exactly 3 popular items
const POPULAR_MEALS = [
  {
    id: 'pizza-delhicious',
    category: 'Pizza',
    name: 'Delhi-cious Pizza (Mix All The Topping Special Dress With Blend Cheese)',
    description: 'Signature special loaded with mixed toppings and premium house cheese blend.',
    image: '/delhicious_special_pizza.png',
    prices: { S: '170/-', M: '300/-', L: '450/-' },
    spicy: true
  },
  {
    id: 'burger-tandoori',
    category: 'Burger',
    name: 'Tandoori Burger',
    description: 'Veggie burger with a sizzling patty and rich tandoori sauce.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop',
    price: '90/-',
    spicy: true
  },
  {
    id: 'gb-stuffed-delhicious',
    category: 'Garlic Bread',
    name: 'Delhi-cious Spl.',
    description: 'Chef\'s special stuffed garlic bread with sweet corn, jalapenos, and extra cheese.',
    image: '/delhicious_stuffed_garlic_bread.png',
    price: '120/-',
    spicy: true
  }
];

function App() {
  const videoRef = useRef(null);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const safetyTimeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const transitionStartedRef = useRef(false);

  // Track if loading was already bypassed/played in the session
  const [transitionCompleted, setTransitionCompleted] = useState(() => {
    return sessionStorage.getItem('delhicious_intro_played') === 'true';
  });
  const [transitionStarted, setTransitionStarted] = useState(() => {
    return sessionStorage.getItem('delhicious_intro_played') === 'true';
  });

  const [firstPlaythroughDone, setFirstPlaythroughDone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') || 'home';
  }); // 'home' | 'menu' | 'preparing' | 'checkout' | 'admin' | 'tracking'
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // New States for Checkout Refinements
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  // Mock Razorpay Simulator States
  const [showMockRazorpayModal, setShowMockRazorpayModal] = useState(false);
  const [mockPaymentTab, setMockPaymentTab] = useState('card');
  const [mockCustomerDetails, setMockCustomerDetails] = useState({ name: '', phone: '', email: '' });

  // Tracking and Admin States
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('delhicious_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [matchingOrders, setMatchingOrders] = useState([]);

  // User Verification States for Tracking
  const [trackingVerificationStep, setTrackingVerificationStep] = useState('initial'); // 'initial' | 'verify' | 'otp' | 'success'
  const [trackingUserPhone, setTrackingUserPhone] = useState('');
  const [trackingUserName, setTrackingUserName] = useState('');
  const [trackingOTP, setTrackingOTP] = useState('');
  const [trackingGeneratedOTP, setTrackingGeneratedOTP] = useState('');
  const [trackingOTPExpiry, setTrackingOTPExpiry] = useState(null);
  const [trackingVerifiedPhone, setTrackingVerifiedPhone] = useState('');
  const [trackingVerifiedName, setTrackingVerifiedName] = useState('');
  const [trackingOTPAttempts, setTrackingOTPAttempts] = useState(0);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'delhicious_orders') {
        const updated = e.newValue ? JSON.parse(e.newValue) : [];
        setOrders(updated);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (activeTrackingOrder) {
      const currentOrder = orders.find(o => o.id === activeTrackingOrder.id);
      if (currentOrder && currentOrder.status !== activeTrackingOrder.status) {
        setActiveTrackingOrder(currentOrder);
      }
    }
  }, [orders, activeTrackingOrder]);

  useEffect(() => {
    if (view !== 'tracking') {
      setActiveTrackingOrder(null);
      setMatchingOrders([]);
      setTrackingIdInput('');
      setTrackingVerificationStep('initial');
      setTrackingUserPhone('');
      setTrackingUserName('');
      setTrackingOTP('');
      setTrackingGeneratedOTP('');
      setTrackingVerifiedPhone('');
      setTrackingVerifiedName('');
    }
  }, [view]);

  // Load Razorpay script dynamically
  useEffect(() => {
    const scriptId = 'razorpay-checkout-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const MIN_TOTAL_MS = 4000; // Minimum 4s display time for loading video

  // Web Audio API initialization to boost volume to 200% (gain of 2.0)
  const initAudioBoost = () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioContextRef.current = audioCtx;

        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 2.0; // Boost to 200%
        gainNodeRef.current = gainNode;

        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (e) {
      console.warn("Web Audio API boost failed or already initialized:", e);
    }
  };

  useEffect(() => {
    // If intro has already played, skip running the video timer altogether
    if (sessionStorage.getItem('delhicious_intro_played') === 'true') {
      return;
    }

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);

      // Attempt unmuted play with Web Audio API boost
      const playUnmuted = () => {
        initAudioBoost();
        video.muted = false;
        setIsMuted(false);
        video.play().catch(error => {
          console.warn("[Autoplay] Unmuted autoplay blocked by browser. Fallback to muted.", error);
          video.muted = true;
          setIsMuted(true);
          video.play().catch(err => console.error("Muted playback failed:", err));
        });
      };

      playUnmuted();

      // Fallback: If blocked, unmute video on first user interaction (click/keypress) without restarting
      const handleUserInteraction = () => {
        if (transitionStartedRef.current) {
          window.removeEventListener('click', handleUserInteraction);
          window.removeEventListener('keydown', handleUserInteraction);
          return;
        }

        if (video.muted) {
          initAudioBoost();
          video.muted = false;
          setIsMuted(false);
          if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
          }
          console.log("[Autoplay Bypass] Unmuted video at 200% volume on user gesture.");
        }
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
      };

      window.addEventListener('click', handleUserInteraction);
      window.addEventListener('keydown', handleUserInteraction);

      // Safety timeout: transition after 15 seconds regardless if video hangs
      safetyTimeoutRef.current = setTimeout(() => {
        console.warn("[Fallback] Safety timeout (15s) reached. Forcing transition.");
        setFirstPlaythroughDone(true);
        triggerTransition();
      }, 15000);

      return () => {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        if (safetyTimeoutRef.current) {
          clearTimeout(safetyTimeoutRef.current);
        }
      };
    }
  }, []);

  // When first playthrough completes, determine when to transition
  const handleFirstPlaythroughDone = () => {
    if (firstPlaythroughDone) return;
    console.log(`[Video] First playthrough finished at ${Date.now() - startTimeRef.current}ms`);
    setFirstPlaythroughDone(true);

    // Enable looping for background continuity if transition is delayed
    if (videoRef.current) {
      videoRef.current.loop = true;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remainingTime = MIN_TOTAL_MS - elapsed;

    if (remainingTime <= 0) {
      triggerTransition();
    } else {
      console.log(`[Transition] Playthrough completed early, waiting ${remainingTime}ms to reach 4s minimum.`);
      setTimeout(() => triggerTransition(), remainingTime);
    }
  };

  const triggerTransition = () => {
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    setTransitionStarted(true);
    transitionStartedRef.current = true;
    console.log(`[Transition] Initiated home page fade out at ${Date.now() - startTimeRef.current}ms`);

    // Once fade out transition is complete (1.2s), pause video, close AudioContext, and complete transition
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.warn("Error closing AudioContext:", e));
        audioContextRef.current = null;
      }
      setTransitionCompleted(true);
      sessionStorage.setItem('delhicious_intro_played', 'true');
      console.log(`[Transition] Completed. Video paused.`);
    }, 1200);
  };

  const handleEnded = () => {
    handleFirstPlaythroughDone();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || firstPlaythroughDone) return;

    if (video.duration && video.currentTime >= video.duration - 0.2) {
      console.log(`[Video] Playthrough detected via timeupdate`);
      handleFirstPlaythroughDone();
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    window.location.href = '/delivery_button.html';
  };

  const handleNavigate = (targetView, anchorId) => {
    setView(targetView);
    if (anchorId) {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  const handleOrderNowClick = () => {
    handleNavigate('home', 'order-form');
  };

  const handleViewMenuClick = (e) => {
    e.preventDefault();
    handleNavigate('menu');
  };

  const handleAddToCart = (item) => {
    const size = item.prices ? (selectedSizes[item.id] || Object.keys(item.prices)[0]) : null;
    const priceStr = item.prices ? item.prices[size] : item.price;
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;

    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id && i.size === size);
      if (existingItem) {
        return prev.map(i =>
          (i.id === item.id && i.size === size)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        size: size,
        priceStr: priceStr,
        priceNum: priceNum,
        image: item.image,
        quantity: 1
      }];
    });
  };

  const updateCartItemQuantity = (id, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeCartItem = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.priceNum * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch address from Nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) {
              setCheckoutAddress(data.display_name);
            } else {
              setCheckoutAddress(`Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`);
            }
          })
          .catch(() => {
            setCheckoutAddress(`Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`);
          });
      },
      () => {
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
      }
    );
  };

  const handlePaymentSuccess = (paymentId, method, name, phone, customOrderId) => {
    setIsProcessingPayment(false);
    setPaymentSuccess(true);

    const newOrderId = customOrderId || `ORD_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newOrder = {
      id: newOrderId,
      items: [...cartItems],
      total: getCartTotal(),
      address: checkoutAddress || "Manual Address Input",
      status: "Confirmed",
      timestamp: new Date().toISOString(),
      customerName: name,
      customerPhone: phone,
      paymentId: paymentId || `pay_mock_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      paymentMethod: method || 'Razorpay Online (Test)',
      paymentStatus: 'Paid'
    };

    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      localStorage.setItem('delhicious_orders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    setOrderSummary(newOrder);
    setActiveTrackingOrder(newOrder);

    setTimeout(() => {
      setPaymentSuccess(false);
      setView('tracking');
      setCartItems([]);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 1500);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.querySelector('input[placeholder="John Doe"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]')?.value || '';
    const paymentMethod = form.querySelector('select').value;
    const totalAmount = getCartTotal();

    if (paymentMethod === 'cash') {
      setIsCartOpen(false);
      setIsProcessingPayment(true);

      setTimeout(() => {
        setIsProcessingPayment(false);
        setPaymentSuccess(true);

        const newOrderId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newOrder = {
          id: newOrderId,
          items: [...cartItems],
          total: totalAmount,
          address: checkoutAddress || "Manual Address Input",
          status: "Confirmed",
          timestamp: new Date().toISOString(),
          customerName: name,
          customerPhone: phone,
          paymentMethod: 'Cash on Delivery',
          paymentStatus: 'To Be Paid'
        };

        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        localStorage.setItem('delhicious_orders', JSON.stringify(updatedOrders));
        setOrderSummary(newOrder);
        setActiveTrackingOrder(newOrder);

        setTimeout(() => {
          setPaymentSuccess(false);
          setView('tracking');
          setCartItems([]);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }, 1500);
      }, 1000);
      return;
    }

    // Online Payment via Razorpay
    setIsProcessingPayment(true);
    let orderData = null;
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: totalAmount })
      });

      if (res.ok) {
        orderData = await res.json();
      }
    } catch (err) {
      console.warn('Backend order generation not available. Falling back to simulator.', err);
    }

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_MOCK_KEY_ID';

    // If key is mock, or no backend order was created, fallback to mock simulator modal
    if (keyId === 'rzp_test_MOCK_KEY_ID' || !orderData || orderData.mock) {
      setMockCustomerDetails({ name, phone, email });
      setIsProcessingPayment(false);
      setShowMockRazorpayModal(true);
      return;
    }

    try {
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Delhicious Pizza Corner',
        description: 'Demo Checkout (Test Mode)',
        image: '/logo.png',
        order_id: orderData.id,
        handler: function (response) {
          handlePaymentSuccess(
            response.razorpay_payment_id,
            'Razorpay Online (SDK)',
            name,
            phone,
            orderData.id
          );
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        notes: {
          address: checkoutAddress
        },
        theme: {
          color: '#b32619'
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        }
      };

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not loaded. Please check your internet connection.');
      }

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setIsProcessingPayment(false);
        alert(`Payment failed: ${resp.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.warn('Error opening Razorpay SDK, falling back to simulator modal:', err.message);
      setMockCustomerDetails({ name, phone, email });
      setIsProcessingPayment(false);
      setShowMockRazorpayModal(true);
    }
  };

  // OTP Verification Functions for Tracking
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleTrackingVerifyPhoneAndName = (e) => {
    e.preventDefault();
    if (!trackingUserPhone || !trackingUserName) {
      alert('Please enter both phone number (last 4 digits) and name');
      return;
    }

    // Validate phone (should be 4 digits)
    if (trackingUserPhone.length !== 4 || !/^\d+$/.test(trackingUserPhone)) {
      alert('Please enter the last 4 digits of your phone number');
      return;
    }

    // Check if any order matches this phone + name combination
    const hasMatchingOrder = orders.some(o => 
      o.customerPhone && o.customerPhone.slice(-4) === trackingUserPhone && 
      o.customerName && o.customerName.toLowerCase() === trackingUserName.toLowerCase()
    );

    if (!hasMatchingOrder) {
      alert('No orders found with this phone number and name combination');
      return;
    }

    // Store verified user info
    setTrackingVerifiedPhone(trackingUserPhone);
    setTrackingVerifiedName(trackingUserName);
    setTrackingVerificationStep('success');
  };

  const handleTrackingSendOTP = (e) => {
    e.preventDefault();
    if (!trackingUserPhone) {
      alert('Please enter the last 4 digits of your phone number');
      return;
    }

    if (trackingUserPhone.length !== 4 || !/^\d+$/.test(trackingUserPhone)) {
      alert('Please enter exactly 4 digits');
      return;
    }

    // Check if any order matches this phone
    const hasMatchingOrder = orders.some(o => 
      o.customerPhone && o.customerPhone.slice(-4) === trackingUserPhone
    );

    if (!hasMatchingOrder) {
      alert('No orders found with this phone number');
      return;
    }

    // Generate OTP and set expiry (5 minutes)
    const newOTP = generateOTP();
    setTrackingGeneratedOTP(newOTP);
    setTrackingOTPExpiry(Date.now() + 5 * 60 * 1000);
    setTrackingOTPAttempts(0);
    setTrackingVerificationStep('otp');
    
    // Show OTP to user (in production, this would be sent via SMS)
    alert(`OTP sent to phone ending in ${trackingUserPhone}\n\nDemo OTP: ${newOTP}\n(Valid for 5 minutes)`);
  };

  const handleTrackingVerifyOTP = (e) => {
    e.preventDefault();
    if (!trackingOTP) {
      alert('Please enter the OTP');
      return;
    }

    // Check if OTP is expired
    if (Date.now() > trackingOTPExpiry) {
      alert('OTP has expired. Please request a new one.');
      setTrackingOTP('');
      setTrackingVerificationStep('initial');
      return;
    }

    // Verify OTP
    if (trackingOTP === trackingGeneratedOTP) {
      setTrackingVerifiedPhone(trackingUserPhone);
      setTrackingVerificationStep('success');
    } else {
      const newAttempts = trackingOTPAttempts + 1;
      setTrackingOTPAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        alert('Maximum OTP attempts exceeded. Please request a new OTP.');
        setTrackingOTP('');
        setTrackingUserPhone('');
        setTrackingVerificationStep('initial');
      } else {
        alert(`Incorrect OTP. ${3 - newAttempts} attempts remaining.`);
        setTrackingOTP('');
      }
    }
  };

  const handleTrackingReset = () => {
    setTrackingVerificationStep('initial');
    setTrackingUserPhone('');
    setTrackingUserName('');
    setTrackingOTP('');
    setTrackingGeneratedOTP('');
    setTrackingOTPExpiry(null);
    setTrackingVerifiedPhone('');
    setTrackingVerifiedName('');
    setTrackingOTPAttempts(0);
    setActiveTrackingOrder(null);
    setMatchingOrders([]);
    setTrackingIdInput('');
  };

  const handleTrackOrderSubmit = (e) => {
    e.preventDefault();
    
    // Filter orders only for the verified user
    let matches = [];
    
    if (trackingVerificationStep === 'success') {
      // Filter by verified user's phone (last 4 digits) and name
      matches = orders.filter(o => 
        o.customerPhone && o.customerPhone.slice(-4) === trackingVerifiedPhone && 
        o.customerName && o.customerName.toLowerCase() === trackingVerifiedName.toLowerCase()
      );
    }
    
    if (matches.length === 0) {
      alert("No orders found for your account.");
      return;
    }

    if (matches.length === 1) {
      setActiveTrackingOrder(matches[0]);
      setMatchingOrders([]);
    } else {
      setMatchingOrders(matches);
      setActiveTrackingOrder(null);
      setView('tracking');
    }
  };

  const handleAdminStatusChange = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('delhicious_orders', JSON.stringify(updated));
  };

  const handleAdminPaymentStatusChange = (orderId, newPaymentStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o);
    setOrders(updated);
    localStorage.setItem('delhicious_orders', JSON.stringify(updated));
  };

  const handleUserCancelOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o);
    setOrders(updated);
    localStorage.setItem('delhicious_orders', JSON.stringify(updated));
    const targetOrder = updated.find(o => o.id === orderId);
    setActiveTrackingOrder(targetOrder);
  };

  return (
    <div className="app-container">

      {/* Loading Screen Overlay */}
      {!transitionCompleted && (
        <div className={`loading-screen ${transitionStarted ? 'fade-out' : ''}`}>
          <video
            ref={videoRef}
            src="/loading.mp4"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            className="background-video"
          />
        </div>
      )}

      {/* Floating Transitioning Logo */}
      <img
        src="/logo.png"
        className={`transition-logo ${transitionStarted ? 'navrouted' : ''} ${view === 'preparing' ? 'hidden' : ''}`}
        alt="Transitioning Logo"
      />

      {/* Home Page Section */}
      <div className={`home-page ${transitionStarted ? 'active' : ''} ${view === 'preparing' ? 'preparing-active' : ''}`}>

        {/* Top Floating Oval Navigation Bar */}
        <nav className={`top-navbar ${transitionStarted ? 'active' : ''} ${view === 'preparing' ? 'hidden' : ''}`}>
          <div className="navbar-logo-area">
            {/* Landing spot placeholder for the logo */}
            <div className="logo-placeholder"></div>
            <span className={`brand-name ${transitionStarted ? 'active' : ''}`}>
              Delhicious <VegIcon />
            </span>
          </div>

          {/* Hamburger toggle button for mobile menu */}
          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => { handleNavigate('home'); setMenuOpen(false); }} className={`nav-link ${view === 'home' ? 'active' : ''}`}>Home</button>
            <button onClick={() => { handleNavigate('menu'); setMenuOpen(false); }} className={`nav-link ${view === 'menu' ? 'active' : ''}`}>Menu</button>
            <button onClick={() => { handleNavigate('home', 'about'); setMenuOpen(false); }} className="nav-link">About</button>
            <button onClick={() => { handleNavigate('home', 'contact'); setMenuOpen(false); }} className="nav-link">Contact</button>
            <button onClick={() => { setView('all-orders'); setMenuOpen(false); }} className={`nav-link ${view === 'all-orders' ? 'active' : ''}`}>📋 All Orders</button>
          </div>
        </nav>

        {/* Scrollable Container for Home Page Content */}
        <div className="home-scroll-container" ref={scrollContainerRef}>

          {view === 'home' && (
            <>
              {/* Hero Section */}
              <header className="hero-section">
                <div className="hero-container">

                  {/* Left Column: Content */}
                  <div className="hero-left">
                    <span className="hero-eyebrow">🍕 CRISPY • JUICY • FRESH</span>
                    <h1 className="hero-headline">
                      Bite Into <span className="highlight">Happiness</span>
                    </h1>
                    <p className="hero-supporting-text">
                      Welcome to <strong>DELHICIOUS PIZZA CORNER</strong>. Handcrafted vegetarian delicacies, oven-fresh pizzas, and loaded snacks. Baked to perfection with the finest ingredients.
                    </p>

                    {/* Vegetarian features in Hero */}
                    <div className="hero-bullets">
                      <span className="hero-bullet-veg">
                        <VegIcon /> 100% Vegetarian
                      </span>
                      <span>🧀 Melted cheese drip</span>
                      <span>🥬 Farm-fresh veggies</span>
                      <span>🔥 Sizzling hot</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-cta-group">
                      <button className="btn-order-now" onClick={() => setView('menu')}>Order Now</button>
                      <button className="link-view-menu" onClick={() => { setView('tracking'); setActiveTrackingOrder(null); }}>Track Order</button>
                    </div>

                    {/* Quality badges */}
                    <div className="quality-checklist">
                      <span className="chk-item">✓ High Quality Ingredients</span>
                      <span className="chk-item">✓ Free Delivery</span>
                      <span className="chk-item">✓ 100% Vegetarian</span>
                    </div>
                  </div>

                  {/* Right Column: Autoplay Hero Video & Badges */}
                  <div className="hero-right">
                    <div className="video-card-wrapper">
                      <video
                        src="/burger_home.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="hero-video hero-image"
                      />

                      {/* Floating Badges */}
                      <div className="floating-badge badge-1">
                        <span className="badge-icon">🍕</span>
                        <div className="badge-details">
                          <strong>100%</strong>
                          <span className="badge-label">Vegetarian</span>
                        </div>
                      </div>

                      <div className="floating-badge badge-2">
                        <span className="badge-icon">🏷️</span>
                        <div className="badge-details">
                          <strong>Free Delivery</strong>
                          <span className="badge-label">Above 300/-</span>
                        </div>
                      </div>

                      <div className="floating-badge badge-3">
                        <span className="badge-icon">🏬</span>
                        <div className="badge-details">
                          <strong>Chattarpur</strong>
                          <span className="badge-label">New Delhi</span>
                        </div>
                      </div>

                      <div className="floating-badge badge-4">
                        <span className="badge-icon">⭐</span>
                        <div className="badge-details">
                          <strong>Top Rated</strong>
                          <span className="badge-label">On Swiggy & Zomato</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </header>

              {/* Special/Popular Meals Section */}
              <section className="popular-meals-section">
                <div className="popular-meals-container">
                  <div className="popular-meals-header">
                    <span className="meals-eyebrow">🔥 OUR SPECIALS</span>
                    <h2 className="meals-title">Most Popular Meals</h2>
                    <p className="meals-subtitle">
                      Our customers' absolute favorites, handcrafted with passion and premium ingredients.
                    </p>
                  </div>

                  <div className="menu-grid">
                    {POPULAR_MEALS.map(item => {
                      const hasSizes = !!item.prices;
                      const currentSize = hasSizes ? (selectedSizes[item.id] || Object.keys(item.prices)[0]) : null;
                      const displayPrice = hasSizes ? item.prices[currentSize] : item.price;

                      return (
                        <div className="menu-card" key={item.id}>
                          <div className="menu-card-image-wrapper">
                            <img src={item.image} alt={item.name} className="menu-card-image" loading="lazy" />
                            {item.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
                          </div>

                          <div className="menu-card-content">
                            <div className="menu-card-header">
                              <h3 className="menu-card-title">
                                <VegIcon /> {item.name}
                              </h3>
                              <span className="menu-card-category">{item.category}</span>
                            </div>
                            <p className="menu-card-desc">{item.description}</p>

                            {hasSizes && (
                              <div className="size-selector-wrapper">
                                <span className="size-label">Select Size:</span>
                                <div className="size-selector">
                                  {Object.keys(item.prices).map(size => (
                                    <button
                                      key={size}
                                      className={`size-btn ${currentSize === size ? 'active' : ''}`}
                                      onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: size }))}
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="menu-card-footer">
                              <div className="menu-card-price">
                                <span className="price-symbol">Rs. </span>
                                <span className="price-value">{displayPrice}</span>
                              </div>
                              <button
                                className="btn-order-item"
                                onClick={() => handleAddToCart(item)}
                              >
                                Add to Cart 🛒
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section className="about-section" id="about">
                <div className="about-container">
                  <div className="about-content">
                    <span className="section-eyebrow">🌱 OUR STORY</span>
                    <h2 className="section-title">DELHICIOUS PIZZA CORNER</h2>
                    <p className="section-text">
                      Welcome to Delhi's ultimate spot for 100% vegetarian culinary indulgence. We are committed to serving delicious, safe, and entirely meat-free meals that bring joy in every bite.
                    </p>
                    <p className="section-text">
                      From fresh, crispy capsicum to rich paneer tikka toppings and our premium blend of melted mozzarella cheese, everything is prepared under strict hygiene standards. Whether you order our signature Delhi-cious Pizza, fresh stuffed garlic bread, or hot combos, you're experiencing a premium vegetarian feast.
                    </p>

                    <div className="about-features">
                      <div className="feature-item">
                        <span className="feature-icon">🟢</span>
                        <strong>100% Vegetarian Kitchen</strong>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🍕</span>
                        <strong>Wood-Fired Taste & Freshness</strong>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🧀</span>
                        <strong>Premium Blend Cheese</strong>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🥦</span>
                        <strong>Farm-Fresh Veggie Toppings</strong>
                      </div>
                    </div>
                  </div>
                  <div className="about-image-wrapper">
                    <img src="/golden_corn_pizza.png" alt="Delhicious Pizza Kitchen" className="about-img" />
                  </div>
                </div>
              </section>


              {/* Contact Section */}
              <section className="contact-section" id="contact">
                <div className="contact-container">
                  <div className="contact-header">
                    <span className="section-eyebrow">📞 GET IN TOUCH</span>
                    <h2 className="section-title">Order Now or Visit Us</h2>
                    <p className="section-subtitle">
                      Enjoy hot and fresh food delivered straight to your doorstep or drop by our kitchen!
                    </p>
                  </div>

                  <div className="contact-grid redesigned-contact-grid">
                    <div className="contact-info-list">
                      <div className="contact-info-item">
                        <div className="contact-info-icon">📞</div>
                        <div className="contact-info-text">
                          <h4>Call for Orders</h4>
                          <p>
                            <a href="tel:9310515739" className="contact-phone-link">9310515739</a>,{' '}
                            <a href="tel:9891737297" className="contact-phone-link">9891737297</a>
                          </p>
                        </div>
                      </div>

                      <div className="contact-info-item">
                        <div className="contact-info-icon">📍</div>
                        <div className="contact-info-text">
                          <h4>Visit Us</h4>
                          <p>A-11, Ambedkar Colony, Andheria More, Chhatarpur, New Delhi</p>
                        </div>
                      </div>

                      <div className="contact-info-item">
                        <div className="contact-info-icon">🚚</div>
                        <div className="contact-info-text">
                          <h4>Delivery Info</h4>
                          <p><strong>FREE HOME DELIVERY</strong> above Rs. 300/- (Up to 3 Km radius)</p>
                        </div>
                      </div>

                      <div className="contact-info-item">
                        <div className="contact-info-icon">📱</div>
                        <div className="contact-info-text">
                          <h4>Order Online</h4>
                          <p>Find us on your favorite food apps:</p>
                          <div className="contact-app-links">
                            <a href="#" className="app-badge zomato">Zomato</a>
                            <a href="#" className="app-badge swiggy">Swiggy</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="contact-map-container">
                      <iframe
                        title="Delhicious Location"
                        src="https://maps.google.com/maps?q=A-11,%20Ambedkar%20Colony,%20Andheria%20More,%20Chhatarpur,%20New%20Delhi&t=&z=16&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '320px', display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer with VintushTech credits */}
              <footer className="app-footer">
                <div className="footer-container">
                  <div className="footer-col brand-col">
                    <h3>Delhicious <VegIcon /></h3>
                    <p>100% Pure Vegetarian kitchen serving delicious pizzas, burgers, and snacks in New Delhi.</p>
                  </div>
                  <div className="footer-col links-col">
                    <h4>Quick Links</h4>
                    <div className="footer-links-grid">
                      <button onClick={() => handleNavigate('home')}>Home</button>
                      <button onClick={() => handleNavigate('menu')}>Menu</button>
                      <button onClick={() => { setView('tracking'); setActiveTrackingOrder(null); }}>Track Order</button>
                      <button onClick={() => handleNavigate('home', 'about')}>About Us</button>
                    </div>
                  </div>
                  <div className="footer-col info-col">
                    <h4>Developed By</h4>
                    <p className="developer-credits">
                      Visit <a href="https://vintushtech.cloud//?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGntJTsRgOzJplmkc8OgLwhRw2wqwQWI2w3QfviiEJIw3Fjkd07yk4Bs22UrNU_aem_6YUNcojj5Cq1ply2eUr76A" target="_blank" rel="noopener noreferrer">VintushTech</a> for a smarter, scalable digital future.
                    </p>
                    <p className="copyright-text">&copy; {new Date().getFullYear()} DELHICIOUS. All Rights Reserved.</p>
                  </div>
                </div>
              </footer>
            </>
          )}

          {view === 'menu' && (
            <div className="menu-section-container">
              <div className="menu-header">
                <span className="menu-eyebrow">😋 CRISPY • JUICY • FRESH</span>
                <h2 className="menu-title">Discover Our Menu</h2>
                <p className="menu-subtitle">
                  Choose from our premium range of fresh pizzas, gourmet burgers, stuffed garlic bread, combos, and drinks.
                </p>
              </div>

              {/* Category selector */}
              <div className="category-tabs-wrapper">
                <div className="category-tabs">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dedicated Menu Grid (with 4-5 items per row configuration) */}
              <div className="menu-grid menu-section-grid">
                {MENU_ITEMS.filter(item => activeCategory === 'All' || item.category === activeCategory).map(item => {
                  const hasSizes = !!item.prices;
                  const currentSize = hasSizes ? (selectedSizes[item.id] || Object.keys(item.prices)[0]) : null;
                  const displayPrice = hasSizes ? item.prices[currentSize] : item.price;

                  return (
                    <div className="menu-card" key={item.id}>
                      <div className="menu-card-image-wrapper">
                        <img src={item.image} alt={item.name} className="menu-card-image" loading="lazy" />
                        {item.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
                      </div>

                      <div className="menu-card-content">
                        <div className="menu-card-header">
                          <h3 className="menu-card-title">
                            <VegIcon /> {item.name}
                          </h3>
                          <span className="menu-card-category">{item.category}</span>
                        </div>
                        <p className="menu-card-desc">{item.description}</p>

                        {hasSizes && (
                          <div className="size-selector-wrapper">
                            <span className="size-label">Select Size:</span>
                            <div className="size-selector">
                              {Object.keys(item.prices).map(size => (
                                <button
                                  key={size}
                                  className={`size-btn ${currentSize === size ? 'active' : ''}`}
                                  onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: size }))}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="menu-card-footer">
                          <div className="menu-card-price">
                            <span className="price-symbol">Rs. </span>
                            <span className="price-value">{displayPrice}</span>
                          </div>
                          <button
                            className="btn-order-item"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart 🛒
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Checkout View */}
          {view === 'checkout' && (
            <div className="checkout-view-container">
              {isProcessingPayment && (
                <div className="payment-loading-overlay">
                  <div className="payment-spinner"></div>
                  <p>Processing Payment...</p>
                </div>
              )}
              {paymentSuccess && (
                <div className="payment-success-toast animate-scale-up">
                  <div className="toast-icon">✅</div>
                  <div className="toast-content">
                    <h3>Payment Successful!</h3>
                    <p>Your delicious order has been confirmed</p>
                    <div className="success-badge">🚀 Order Received</div>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginTop: '8px' }}>Redirecting to tracker...</p>
                  </div>
                </div>
              )}

              <div className="checkout-card">
                <div className="test-mode-badge">
                  <span className="test-mode-badge-dot"></span>
                  <span>Test Mode – No Real Money Involved</span>
                </div>
                <h2 className="checkout-title">Complete Your Order</h2>
                <div className="checkout-summary">
                  <h3>Order Summary</h3>
                  <p>{getCartItemCount()} items | Total: Rs. {getCartTotal()}</p>
                </div>
                <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                  <div className="form-row">
                    <div className="form-group-half">
                      <label>Full Name</label>
                      <input type="text" placeholder="John Doe" required />
                    </div>
                    <div className="form-group-half">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        title="Please enter exactly 10 digits"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group-full">
                    <label>Email Address <span className="optional">(Optional)</span></label>
                    <input type="email" placeholder="john@example.com" />
                  </div>

                  <div className="form-group-full address-group">
                    <label>Delivery Address</label>
                    <div className="address-actions">
                      <button type="button" className="btn-location" onClick={handleFetchLocation}>
                        📍 Use Current Location
                      </button>
                    </div>
                    <textarea
                      rows="3"
                      placeholder="Building name, street, landmark, city, pincode"
                      required
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group-full">
                    <label>Delivery Instructions <span className="optional">(Optional)</span></label>
                    <textarea
                      rows="2"
                      placeholder="e.g. Leave at the door, ring bell..."
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group-full">
                    <label>Payment Method</label>
                    <select required defaultValue="razorpay">
                      <option value="razorpay">Online Payment (Razorpay Test Mode)</option>
                      <option value="cash">Cash on Delivery</option>
                    </select>
                  </div>
                  <div className="checkout-actions">
                    <button type="button" className="btn-cancel" onClick={() => setView('home')}>Cancel</button>
                    <button type="submit" className="btn-pay-now">Proceed to Payment</button>
                  </div>
                </form>
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Floating Cart Button */}
      {view !== 'checkout' && view !== 'preparing' && (
        <button className="floating-cart-btn" onClick={() => setIsCartOpen(true)}>
          🛒
          {getCartItemCount() > 0 && <span className="cart-badge">{getCartItemCount()}</span>}
        </button>
      )}

      {/* Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Happiness Cart 🛒</h2>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="empty-cart-msg">Your cart is empty. Add some happiness!</div>
          ) : (
            cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.size && <span className="cart-item-size">Size: {item.size}</span>}
                  <div className="cart-item-price">Rs. {item.priceNum}</div>
                </div>
                <div className="cart-item-actions">
                  <div className="qty-controls">
                    <button onClick={() => updateCartItemQuantity(item.id, item.size, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItemQuantity(item.id, item.size, 1)}>+</button>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeCartItem(item.id, item.size)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>Rs. {getCartTotal()}</span>
            </div>
            <button className="btn-checkout" onClick={() => { setIsCartOpen(false); setView('checkout'); }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Tracking View & Form */}
      {view === 'tracking' && (
        <div className="preparing-overlay-container">
          {trackingVerificationStep === 'initial' ? (
            // Initial verification selection
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '450px' }}>
              <div className="tracking-initial-video-wrapper">
                <video src="/hero_animation.mp4" autoPlay loop muted playsInline className="delivery-card-video"></video>
                <div className="delivery-card-video-badge">🔍 Live Tracker</div>
              </div>
              <h2>Track Your Order</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px', fontSize: '0.95rem', textAlign: 'center' }}>
                For your security, please verify your identity to view your orders.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <button
                  onClick={() => setTrackingVerificationStep('verify')}
                  className="btn-pay-now"
                  style={{ width: '100%', padding: '14px', borderRadius: '10px' }}
                >
                  📱 Verify with Phone & Name
                </button>
                <button
                  onClick={() => setTrackingVerificationStep('otp-request')}
                  className="btn-pay-now"
                  style={{ width: '100%', padding: '14px', borderRadius: '10px', backgroundColor: '#6e5d54' }}
                >
                  🔐 Send OTP to Phone
                </button>
                <button
                  onClick={() => { setView('home'); handleTrackingReset(); }}
                  className="btn-cancel"
                  style={{ width: '100%', padding: '12px', borderRadius: '10px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : trackingVerificationStep === 'verify' ? (
            // Phone & Name verification form
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '400px' }}>
              <h2>Verify Your Identity</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px', fontSize: '0.9rem' }}>
                Enter the last 4 digits of your phone number and your name to access your orders.
              </p>
              <form onSubmit={handleTrackingVerifyPhoneAndName} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#2d1b11' }}>
                    Last 4 Digits of Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1234"
                    value={trackingUserPhone}
                    onChange={e => setTrackingUserPhone(e.target.value.slice(0, 4))}
                    maxLength="4"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit', width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#2d1b11' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., John Doe"
                    value={trackingUserName}
                    onChange={e => setTrackingUserName(e.target.value)}
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit', width: '100%' }}
                  />
                </div>
                <button type="submit" className="btn-pay-now" style={{ marginTop: '8px' }}>
                  Verify
                </button>
                <button
                  type="button"
                  onClick={() => { setTrackingVerificationStep('initial'); setTrackingUserPhone(''); setTrackingUserName(''); }}
                  className="btn-cancel"
                >
                  Back
                </button>
              </form>
            </div>
          ) : trackingVerificationStep === 'otp-request' ? (
            // OTP request form
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '400px' }}>
              <h2>Send OTP</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px', fontSize: '0.9rem' }}>
                Enter the last 4 digits of your phone number to receive an OTP.
              </p>
              <form onSubmit={handleTrackingSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#2d1b11' }}>
                    Last 4 Digits of Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1234"
                    value={trackingUserPhone}
                    onChange={e => setTrackingUserPhone(e.target.value.slice(0, 4))}
                    maxLength="4"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit', width: '100%' }}
                  />
                </div>
                <button type="submit" className="btn-pay-now">
                  Send OTP
                </button>
                <button
                  type="button"
                  onClick={() => { setTrackingVerificationStep('initial'); setTrackingUserPhone(''); }}
                  className="btn-cancel"
                >
                  Back
                </button>
              </form>
            </div>
          ) : trackingVerificationStep === 'otp' ? (
            // OTP verification form
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '400px' }}>
              <h2>Enter OTP</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px', fontSize: '0.9rem' }}>
                We've sent an OTP to your phone ending in {trackingUserPhone}. This OTP will expire in 5 minutes.
              </p>
              <form onSubmit={handleTrackingVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#2d1b11' }}>
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={trackingOTP}
                    onChange={e => setTrackingOTP(e.target.value.slice(0, 6))}
                    maxLength="6"
                    required
                    style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit', width: '100%', fontSize: '1.2rem', letterSpacing: '4px' }}
                  />
                </div>
                {trackingOTPAttempts > 0 && (
                  <p style={{ fontSize: '0.85rem', color: '#b32619', margin: '0' }}>
                    {3 - trackingOTPAttempts} attempts remaining
                  </p>
                )}
                <button type="submit" className="btn-pay-now">
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => { setTrackingVerificationStep('otp-request'); setTrackingOTP(''); setTrackingUserPhone(''); setTrackingOTPAttempts(0); }}
                  className="btn-cancel"
                >
                  Back
                </button>
              </form>
            </div>
          ) : trackingVerificationStep === 'success' && !activeTrackingOrder && matchingOrders.length === 0 ? (
            // Show orders list after verification
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '500px' }}>
              <div className="tracking-initial-video-wrapper">
                <video src="/hero_animation.mp4" autoPlay loop muted playsInline className="delivery-card-video"></video>
                <div className="delivery-card-video-badge">🔍 Your Orders</div>
              </div>
              <h2>Your Orders</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px', fontSize: '0.95rem' }}>
                Select an order to track its status:
              </p>
              {(() => {
                const userOrders = orders.filter(o => 
                  o.customerPhone && o.customerPhone.slice(-4) === trackingVerifiedPhone && 
                  o.customerName && o.customerName.toLowerCase() === trackingVerifiedName.toLowerCase()
                ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                
                return userOrders.length === 0 ? (
                  <p style={{ color: '#6e5d54', textAlign: 'center', padding: '20px' }}>No orders found.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
                    {userOrders.map(order => (
                      <div
                        key={order.id}
                        onClick={() => { setActiveTrackingOrder(order); handleTrackOrderSubmit({ preventDefault: () => {} }); }}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: '1px solid rgba(45, 27, 17, 0.1)',
                          backgroundColor: '#fffcfb',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = '#b32619';
                          e.currentTarget.style.backgroundColor = '#fff5f5';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'rgba(45, 27, 17, 0.1)';
                          e.currentTarget.style.backgroundColor = '#fffcfb';
                        }}
                      >
                        <div>
                          <strong style={{ color: '#2d1b11' }}>Order #{order.id}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#ab9e96', marginTop: '4px' }}>
                            {new Date(order.timestamp).toLocaleString()}
                          </div>
                          <div style={{ fontSize: '0.9rem', color: '#6e5d54', marginTop: '4px' }}>
                            Items: {order.items ? order.items.length : 0} | Rs. {order.total}
                          </div>
                        </div>
                        <span
                          style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            backgroundColor: order.status === 'Cancelled' ? '#ffe5e5' : '#e6f6f0',
                            color: order.status === 'Cancelled' ? '#b32619' : '#0f8a5f'
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button
                  className="btn-cancel"
                  onClick={handleTrackingReset}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '0.95rem' }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : !activeTrackingOrder && matchingOrders.length > 0 ? (
            <div className="delivery-card animate-scale-up" style={{ maxWidth: '500px' }}>
              <h2>Select Order to Track</h2>
              <p style={{ color: '#6e5d54', marginBottom: '20px' }}>Multiple orders found for this phone number. Please choose one:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
                {matchingOrders.slice().reverse().map(order => (
                  <div
                    key={order.id}
                    onClick={() => setActiveTrackingOrder(order)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(45, 27, 17, 0.1)',
                      backgroundColor: '#fffcfb',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#b32619';
                      e.currentTarget.style.backgroundColor = '#fff5f5';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(45, 27, 17, 0.1)';
                      e.currentTarget.style.backgroundColor = '#fffcfb';
                    }}
                  >
                    <div>
                      <strong style={{ color: '#2d1b11' }}>Order ID: #{order.id}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#ab9e96', marginTop: '4px' }}>
                        {new Date(order.timestamp).toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#6e5d54', marginTop: '4px' }}>
                        Items: {order.items ? order.items.length : 0} | Total: Rs. {order.total}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        backgroundColor: order.status === 'Cancelled' ? '#ffe5e5' : '#e6f6f0',
                        color: order.status === 'Cancelled' ? '#b32619' : '#0f8a5f'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button
                  className="btn-cancel"
                  onClick={() => { setMatchingOrders([]); }}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '0.95rem' }}
                >
                  Back to Search
                </button>
              </div>
            </div>
          ) : (
            <div className="delivery-card animate-scale-up">
              {(activeTrackingOrder.status === 'Preparing' || activeTrackingOrder.status === 'Out for Delivery') && (
                <div className="delivery-card-video-wrapper">
                  <video src="/preparing.mp4" autoPlay loop muted playsInline className="delivery-card-video"></video>
                  <div className="delivery-card-video-badge">
                    {activeTrackingOrder.status === 'Preparing' ? '🍳 Preparing Order' : '🚚 Out for Delivery'}
                  </div>
                </div>
              )}
              <div className="delivery-header">
                {!(activeTrackingOrder.status === 'Preparing' || activeTrackingOrder.status === 'Out for Delivery') && (
                  <div className="success-icon" style={{ color: activeTrackingOrder.status === 'Cancelled' ? '#b32619' : 'inherit' }}>
                    {activeTrackingOrder.status === 'Delivered' ? '✅' :
                      activeTrackingOrder.status === 'Cancelled' ? '❌' : '🎉'}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                  <h2 className="preparing-title" style={{ margin: 0, minWidth: 'fit-content' }}>Order ID: {activeTrackingOrder.id}</h2>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(activeTrackingOrder.id);
                      alert('Order ID copied to clipboard!');
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #b32619',
                      backgroundColor: 'white',
                      color: '#b32619',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = '#b32619';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#b32619';
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="preparing-text">Current Status: <strong style={{ color: activeTrackingOrder.status === 'Cancelled' ? '#b32619' : 'inherit' }}>{activeTrackingOrder.status}</strong></p>
              </div>

              {activeTrackingOrder.status !== 'Cancelled' ? (
                <>
                  <div className="delivery-tracker-container">
                    <div className="tracker-line">
                      <div className="tracker-line-progress" style={{
                        '--tracker-progress': `${activeTrackingOrder.status === 'Confirmed' ? 0 :
                            activeTrackingOrder.status === 'Preparing' ? 33 :
                              activeTrackingOrder.status === 'Out for Delivery' ? 66 :
                                activeTrackingOrder.status === 'Delivered' ? 100 : 0
                          }%`
                      }}></div>
                    </div>
                    {['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                      const statuses = ['Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
                      const currentIdx = statuses.indexOf(activeTrackingOrder.status) >= 0 ? statuses.indexOf(activeTrackingOrder.status) : -1;
                      let stepClass = 'pending';
                      if (idx < currentIdx) stepClass = 'completed';
                      if (idx === currentIdx) stepClass = 'active-pulse';
                      return (
                        <div key={step} className={`tracker-step ${stepClass}`}>
                          <div className="step-icon">{['📝', '🍳', '🚚', '🏠'][idx]}</div>
                          <span>{step}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="delivery-details-box">
                    <div className="estimated-time">
                      <span className="time-icon">
                        {activeTrackingOrder.status === 'Confirmed' ? '📝' :
                          activeTrackingOrder.status === 'Preparing' ? '🍳' :
                            activeTrackingOrder.status === 'Out for Delivery' ? '⏱️' : '🏠'}
                      </span>
                      <strong>
                        {activeTrackingOrder.status === 'Confirmed' ? 'Order Confirmed — Prep starting soon' :
                          activeTrackingOrder.status === 'Preparing' ? 'Preparing — Arriving in 30–40 mins' :
                            activeTrackingOrder.status === 'Out for Delivery' ? 'Out for Delivery — Arriving in 10–15 mins' :
                              'Delivered successfully! Enjoy your meal! 🎉'}
                      </strong>
                    </div>

                    <div className="delivery-summary">
                      <h4>Order Summary</h4>
                      
                      {/* Customer Info Box */}
                      <div style={{ backgroundColor: '#fffcfb', borderLeft: '3px solid #b32619', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#6e5d54', margin: '0 0 6px 0' }}>
                          <strong>📝 Customer:</strong> {activeTrackingOrder.customerName || 'N/A'}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: '#6e5d54', margin: 0 }}>
                          <strong>📱 Phone:</strong> {activeTrackingOrder.customerPhone || 'N/A'}
                        </p>
                      </div>

                      <div className="summary-items-list" style={{ margin: '8px 0 16px 0', borderBottom: '1px solid rgba(45, 27, 17, 0.08)', paddingBottom: '8px' }}>
                        {activeTrackingOrder.items && activeTrackingOrder.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6e5d54', padding: '4px 0' }}>
                            <span>{item.name} {item.size ? `(${item.size})` : ''} x {item.quantity}</span>
                            <span style={{ fontWeight: '600' }}>Rs. {item.priceNum * item.quantity}/-</span>
                          </div>
                        ))}
                      </div>
                      <p><strong>Total Items:</strong> {activeTrackingOrder.items.length}</p>
                      <p>
                        <strong>
                          {activeTrackingOrder.paymentStatus === 'To Be Paid' || (activeTrackingOrder.paymentMethod && activeTrackingOrder.paymentMethod.includes('Cash'))
                            ? 'Amount to be Paid (COD):'
                            : 'Amount Paid (Online):'}
                        </strong>{' '}
                        Rs. {activeTrackingOrder.total}
                      </p>
                      <p><strong>Delivering to:</strong> {activeTrackingOrder.address}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="delivery-details-box" style={{ borderColor: 'rgba(179, 38, 25, 0.2)', backgroundColor: '#fff5f5' }}>
                    <div className="estimated-time" style={{ color: '#b32619', borderColor: 'rgba(179, 38, 25, 0.1)' }}>
                      <span className="time-icon">❌</span>
                      <strong>This order has been cancelled</strong>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#6e5d54', lineHeight: '1.5', marginBottom: '15px' }}>
                      We regret to inform you that your order has been cancelled. If this was unexpected or if you have questions regarding a refund, please reach out to us:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(179, 38, 25, 0.1)' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d1b11' }}>📞 Call: <strong>9310515739</strong> or <strong>9891737297</strong></p>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d1b11' }}>📍 A-11, Ambedkar Colony, Andheria More, Chhatarpur, New Delhi</p>
                    </div>
                  </div>

                  <div className="delivery-summary" style={{ textAlign: 'left', padding: '0 24px 20px 24px' }}>
                    <h4 style={{ marginBottom: '12px', color: '#2d1b11' }}>Order Summary</h4>
                    <div className="summary-items-list" style={{ margin: '8px 0 16px 0', borderBottom: '1px solid rgba(45, 27, 17, 0.08)', paddingBottom: '8px' }}>
                      {activeTrackingOrder.items && activeTrackingOrder.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6e5d54', padding: '4px 0' }}>
                          <span>{item.name} {item.size ? `(${item.size})` : ''} x {item.quantity}</span>
                          <span style={{ fontWeight: '600' }}>Rs. {item.priceNum * item.quantity}/-</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.95rem', color: '#6e5d54', margin: '4px 0' }}><strong>Total Items:</strong> {activeTrackingOrder.items.length}</p>
                    <p style={{ fontSize: '0.95rem', color: '#6e5d54', margin: '4px 0' }}>
                      <strong>
                        {activeTrackingOrder.paymentStatus === 'To Be Paid' || (activeTrackingOrder.paymentMethod && activeTrackingOrder.paymentMethod.includes('Cash'))
                          ? 'Amount to be Paid (COD):'
                          : 'Amount Paid (Online):'}
                      </strong>{' '}
                      Rs. {activeTrackingOrder.total}
                    </p>
                  </div>
                </>
              )}

              <div className="delivery-actions" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center' }}>
                {activeTrackingOrder.status !== 'Cancelled' && activeTrackingOrder.status !== 'Delivered' && (() => {
                  const elapsedMs = Date.now() - new Date(activeTrackingOrder.timestamp).getTime();
                  const tenMinutesMs = 10 * 60 * 1000;
                  const timeLeftMins = Math.max(0, Math.ceil((tenMinutesMs - elapsedMs) / 60000));
                  const canCancel = elapsedMs < tenMinutesMs;

                  return (
                    <div style={{ width: '100%', textAlign: 'center' }}>
                      {canCancel ? (
                        <>
                          <p style={{ fontSize: '0.85rem', color: '#856404', marginBottom: '8px' }}>
                            ⏰ You can cancel this order within the next {timeLeftMins} minute{timeLeftMins !== 1 ? 's' : ''}.
                          </p>
                          <button
                            className="btn-pay-now"
                            style={{ backgroundColor: '#b32619', width: '100%', padding: '14px', borderRadius: '10px', display: 'block', margin: '0 auto 8px auto' }}
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this order?')) {
                                handleUserCancelOrder(activeTrackingOrder.id);
                              }
                            }}
                          >
                            Cancel Order
                          </button>
                        </>
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: '#6e5d54', marginBottom: '8px' }}>
                          🚫 Cancellation is no longer available (10-minute window has passed).
                        </p>
                      )}
                    </div>
                  );
                })()}
                <button
                  className="btn-back-home outline"
                  onClick={() => {
                    setView('home');
                    if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
                  }}
                  style={{ width: '100%' }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Orders View */}
      {view === 'all-orders' && (
        <div className="preparing-overlay-container">
          <div className="delivery-card animate-scale-up" style={{ maxWidth: '900px', width: '100%', maxHeight: '80vh', overflowY: 'auto', padding: '0' }}>
            <div style={{ padding: '30px 30px 20px', borderBottom: '2px solid rgba(45, 27, 17, 0.1)', position: 'sticky', top: 0, backgroundColor: '#fffcfb', zIndex: 10 }}>
              <h2 style={{ margin: 0, color: '#2d1b11', fontSize: '1.6rem' }}>📋 All Orders</h2>
              <p style={{ margin: '8px 0 0', color: '#6e5d54' }}>{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
            </div>
            
            <div style={{ padding: '20px' }}>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6e5d54' }}>
                  <p style={{ fontSize: '1rem' }}>No orders yet. Start ordering now! 🍕</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.slice().reverse().map((order) => (
                    <div
                      key={order.id}
                      onClick={() => { setActiveTrackingOrder(order); setView('tracking'); }}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(45, 27, 17, 0.1)',
                        backgroundColor: '#fffcfb',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '12px',
                        alignItems: 'center'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#b32619';
                        e.currentTarget.style.backgroundColor = '#fff5f5';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(179, 38, 25, 0.15)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(45, 27, 17, 0.1)';
                        e.currentTarget.style.backgroundColor = '#fffcfb';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Order ID */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Order ID</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <strong style={{ color: '#2d1b11', fontSize: '0.95rem' }}>#{order.id}</strong>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(order.id);
                              alert('Order ID copied!');
                            }}
                            style={{
                              padding: '3px 6px',
                              fontSize: '0.7rem',
                              backgroundColor: '#e6f0ff',
                              color: '#0066cc',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      </div>

                      {/* Customer Name */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Customer</div>
                        <div style={{ marginTop: '4px', color: '#2d1b11', fontWeight: '600', fontSize: '0.95rem' }}>
                          {order.customerName || 'N/A'}
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Phone</div>
                        <div style={{ marginTop: '4px', color: '#2d1b11', fontSize: '0.9rem' }}>
                          {order.customerPhone || 'N/A'}
                        </div>
                      </div>

                      {/* Items Count */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Items</div>
                        <div style={{ marginTop: '4px', color: '#2d1b11', fontWeight: '600', fontSize: '0.95rem' }}>
                          {order.items ? order.items.length : 0}
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Amount</div>
                        <div style={{ marginTop: '4px', color: '#b32619', fontWeight: '700', fontSize: '1rem' }}>
                          Rs. {order.total}
                        </div>
                      </div>

                      {/* Date */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Date</div>
                        <div style={{ marginTop: '4px', color: '#6e5d54', fontSize: '0.85rem' }}>
                          {new Date(order.timestamp).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#ab9e96', textTransform: 'uppercase', fontWeight: '600' }}>Status</div>
                        <span
                          style={{
                            display: 'inline-block',
                            marginTop: '4px',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: order.status === 'Cancelled' ? '#ffe5e5' : order.status === 'Delivered' ? '#e6f6f0' : order.status === 'Out for Delivery' ? '#fff3cd' : '#e8f4f8',
                            color: order.status === 'Cancelled' ? '#b32619' : order.status === 'Delivered' ? '#0f8a5f' : order.status === 'Out for Delivery' ? '#856404' : '#0066cc'
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ padding: '15px 30px', borderTop: '1px solid rgba(45, 27, 17, 0.1)', textAlign: 'center' }}>
              <button
                className="btn-cancel"
                onClick={() => setView('home')}
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {view === 'admin' && (
        <div className="admin-dashboard-container animate-scale-up">
          <div className="admin-header">
            <h2>Admin Dashboard</h2>
            <button className="btn-cancel" onClick={() => {
              window.history.replaceState({}, document.title, window.location.pathname);
              setView('home');
            }}>Exit</button>
          </div>
          <div className="admin-orders-list">
            {orders.length === 0 ? <p>No orders found.</p> : orders.map(order => (
              <div key={order.id} className="admin-order-card">
                <div className="order-info">
                  <strong>ID: {order.id}</strong> | {order.customerName} ({order.customerPhone})
                  <br />
                  <small>{new Date(order.timestamp).toLocaleString()}</small>
                </div>
                <div className="order-items">
                  Items: {order.items.length} | Total: Rs. {order.total}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  <div className="order-status-control" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#6e5d54' }}>Status:</span>
                    <select
                      value={order.status}
                      onChange={e => handleAdminStatusChange(order.id, e.target.value)}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="order-payment-control" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#6e5d54' }}>Payment ({order.paymentMethod || 'Online'}):</span>
                    <select
                      value={order.paymentStatus || (order.paymentMethod && order.paymentMethod.includes('Cash') ? 'To Be Paid' : 'Paid')}
                      onChange={e => handleAdminPaymentStatusChange(order.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: (order.paymentStatus === 'Paid' || (!order.paymentStatus && order.paymentMethod && !order.paymentMethod.includes('Cash'))) ? '#d4edda' : '#fff3cd',
                        color: (order.paymentStatus === 'Paid' || (!order.paymentStatus && order.paymentMethod && !order.paymentMethod.includes('Cash'))) ? '#155724' : '#856404',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Paid" style={{ backgroundColor: '#fff', color: '#000' }}>Paid</option>
                      <option value="To Be Paid" style={{ backgroundColor: '#fff', color: '#000' }}>To Be Paid</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Mock Razorpay Simulator Modal */}
      {showMockRazorpayModal && (
        <div className="rzp-mock-overlay">
          <div className="rzp-mock-modal">
            <div className="rzp-mock-header">
              <div className="rzp-mock-header-info">
                <h3>Delhicious Pizza Corner</h3>
                <p>Test Mode Simulator</p>
              </div>
              <div className="rzp-mock-amount-box">
                <span className="rzp-mock-amount-label">Amount</span>
                <span className="rzp-mock-amount">Rs. {getCartTotal()}</span>
              </div>
            </div>
            
            <div className="rzp-mock-body">
              <div className="rzp-mock-sidebar">
                <button
                  className={`rzp-mock-tab ${mockPaymentTab === 'card' ? 'active' : ''}`}
                  onClick={() => setMockPaymentTab('card')}
                >
                  💳 Card
                </button>
                <button
                  className={`rzp-mock-tab ${mockPaymentTab === 'upi' ? 'active' : ''}`}
                  onClick={() => setMockPaymentTab('upi')}
                >
                  📱 UPI / QR
                </button>
                <button
                  className={`rzp-mock-tab ${mockPaymentTab === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setMockPaymentTab('netbanking')}
                >
                  🏛️ Netbanking
                </button>
                <button
                  className={`rzp-mock-tab ${mockPaymentTab === 'wallet' ? 'active' : ''}`}
                  onClick={() => setMockPaymentTab('wallet')}
                >
                  👛 Wallet
                </button>
              </div>
              
              <div className="rzp-mock-content">
                {mockPaymentTab === 'card' && (
                  <div className="rzp-mock-form-group">
                    <label>Card details</label>
                    <input type="text" placeholder="Card Number" defaultValue="4111 1111 1111 1111" disabled />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Expiry" defaultValue="12 / 30" disabled style={{ flex: 1 }} />
                      <input type="password" placeholder="CVV" defaultValue="123" disabled style={{ width: '80px' }} />
                    </div>
                  </div>
                )}
                
                {mockPaymentTab === 'upi' && (
                  <div className="rzp-mock-form-group">
                    <label>UPI Address</label>
                    <input type="text" placeholder="e.g. success@razorpay" defaultValue="success@razorpay" disabled />
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
                      UPI payment will be simulated instantly.
                    </p>
                  </div>
                )}

                {mockPaymentTab === 'netbanking' && (
                  <div className="rzp-mock-form-group">
                    <label>Select Bank</label>
                    <select defaultValue="sbi" disabled>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                    </select>
                  </div>
                )}

                {mockPaymentTab === 'wallet' && (
                  <div className="rzp-mock-form-group">
                    <label>Select Wallet</label>
                    <select defaultValue="paytm" disabled>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                    </select>
                  </div>
                )}

                <div className="rzp-mock-footer">
                  <div className="rzp-mock-badge">
                    ⚠️ Demo Sandbox Simulator - No real money
                  </div>
                  <button
                    className="rzp-mock-btn-pay"
                    onClick={() => {
                      setShowMockRazorpayModal(false);
                      handlePaymentSuccess(
                        `pay_sim_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                        `Razorpay Simulator (${mockPaymentTab.toUpperCase()})`,
                        mockCustomerDetails.name,
                        mockCustomerDetails.phone
                      );
                    }}
                  >
                    Simulate Success Pay
                  </button>
                  <button
                    className="rzp-mock-btn-cancel"
                    onClick={() => {
                      setShowMockRazorpayModal(false);
                    }}
                  >
                    Cancel Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
