/************************************
  SELECTORS AND VARIABLES
************************************/

// DOM ELEMENTS
const cartButton = document.querySelector('.cart-button');
const cartCount = document.getElementById('cart-count');
const cartDrawer = document.querySelector('.cart-drawer');
const closeButton = document.querySelector('.close-button');
const checkoutButton = document.querySelector('.checkout-button');
const productsContainer = document.querySelector('.products-grid');
const notificationModal = document.getElementById('notification-modal');
const notificationMessage = notificationModal.querySelector('.notification-message');
const closeNotification = document.querySelector('.close-notification');
const notificationButton = document.querySelector('.notification-button');
const imagePopupModal = document.getElementById('image-popup-modal');
const popupImage = document.getElementById('popup-image');
const popupPrevButton = document.getElementById('popup-prev-button');
const popupNextButton = document.getElementById('popup-next-button');
const closePopup = document.querySelector('.close-popup');

// CART ARRAY
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// VARIABLES FOR IMAGE POPUP
let currentImageIndex = 0;
let currentProductImages = [];

/************************************
  PRODUCT DATA
************************************/
const products = {
  'Apple watch Series 9 Clone': {
    title: 'Apple watch Series 10 Clone',
    price: 2399,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series9/Series9%20(1).png',
    ],

    description: 'Smartwatch 9 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode, Bluetooth Calling,10 Meter Connectivity Range, Wireless Charger, Splash Resistant(Black, 45 mm).'
  },

  'Series 10 Smartwatch': {
    title: 'Series 10 Smartwatch',
    price: 2499,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10/Series10%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10/Series10%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10/Series10%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10/Series10%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10/Series10%20(5).png',
    ],
    description: 'Smartwatch 10 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger, Splash Resistant (Silver, 45mm).'
  },

  'Milanese Strap': {
    title: 'Series 10 Smartwatch Milanese Strap',
    price: 2199,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Series10Milanese/Series10Milanese%20(4).png',
    ],
    description: 'Smartwatch 10 Generation with 2.09 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger, Splash Resistant (Silver, 45mm).'
  },


  'TX10 Smartwatch': {
    title: 'TX10 Smartwatch',
    price: 699,
    images: [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(8).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(9).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/TX10%20Smartwatch/Untitled%20design%20(10).png',

    ],
    description: 'TX10 PRO MAX Smartwatch with 1.9 inch LCD TFT Display, Sleep Tracking, BP Monitor, Multi Sports Mode Bluetooth Calling, 10 Meter Connectivity Range, Wireless Charger|Black.'
  },

  'Hk 10 Ultra 3_Wi-Fi Amoled Smartwatch': {
    title: 'HK10Hk 10 Ultra 3_Wi-Fi Amoled Smartwatch',
    price: 4999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HK10Ultra3/HK10Ultra3%20(8).png',

    ],
    description: 'Hk 10 Ultra 3_Wi-Fi Amoled Smartwatch, Wi-Fi 6, Sleek Design, Long Battery Life, Bluetooth 5.3, Advanced Health Monitoring and Elegant Design, 32 GB Storage, AI Capabilities, Ip68 Water Resistance.'
  },

  'T10 Ultra Smartwatch 2.09 bigger display': {
    title: 'T10 Ultra Smartwatch 2.09 bigger display',
    price: 999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra1.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra2.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra3.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra4.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra5.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra6.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra7.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra8.png',

    ],
    description: 'T10 Ultra Smartwatch with LCD TFT Display, Orange Alpine Loop, Medium, Fitness Tracker, Action Button, Long Battery Life, Brighter Display.'
  },

  'Fire-Boltt Almighty Smartwatch (Black)': {
    title: 'Fire-Boltt Almighty Smartwatch (Black)',
    price: 2599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Black%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Black%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Black%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Black%20(5).png',

    ],
    description: 'Fire-Boltt Almighty 35.3mm (1.39) AMOLED BT Calling High Res 464*464, Voice Assistance Smartwatch  (Black Strap, Free Size)'
  },

  'Fire-Boltt Almighty Smartwatch (Brown)': {
    title: 'Fire-Boltt Almighty Smartwatch (Brown)',
    price: 2599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Brown%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Brown%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Brown%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Brown%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/FB_Almighty/F_B_Almighty_Brown%20(0).png',

    ],
    description: 'Fire-Boltt Almighty 35.3mm (1.39) AMOLED BT Calling High Res 464*464, Voice Assistance Smartwatch  (Brown Strap, Free Size)'
  },

  'FFIRE-BOLTT TOUCH TO WAKE SMARTWATCH': {
    title: 'FIRE-BOLTT TOUCH TO WAKE SMARTWATCH',
    price: 1199,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(8).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/F.B._T.O.W._Smartwatch/F.B._T.O.W%20(9).png',

    ],
    description: 'Fire-Boltt Ninja touch to Wake SpO2 Smartwatch  (Beige Strap, Regular)'
  },

  'Samsung Watch Ultra Clone': {
    title: 'Samsung Watch Ultra Clone',
    price: 1599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T57/T57_1.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T57/T57_2.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T57/T57_3.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T57/T57_4.png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T57/T57_5.png',

    ],
    description: 'T57 Smartwatch (Watch Ultra Copy) with LCD TFT Display, Wireless Charger, Rotating Crown, BP Monitor, Heart Rate Monitor, Multi Sports Modes (47mm,Orange)'
  },

  'T10 Ultra Smartwatch (Black)': {
    title: 'T10 Ultra Smartwatch (Black)',
    price: 1599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra_Black%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra_Black%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/T10Ultra/T10Ultra_Black%20(4).png',

    ],
    description: 'T10 Ultra Smartwatch with 2.09 Inch Infinite Display, Bluetooth Calling Feature, Black. '
  },

  'Lyne Lancer 16 Smartwatch (Black)': {
    title: 'Lyne Lancer 16 Smartwatch (Black)',
    price: 1999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LL16_Black/LL16_Black%20(6).png',

    ],
    description: 'LYNE Lancer 16 Smart Watch 2.1 with LCD TFT Diaplay, heart rate monitor, activity tracker, IP65 Water resistant'
  },

  'Car Interior AC Vents Cleaning Brush': {
    title: 'Car Interior AC Vents Cleaning Brush',
    price: 199,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MiniCarBrush/MiniCarBrush%20(8).png',

    ],
    description: 'Car Interior AC Vents Cleaning Brush Soft Duster Interior Cleaning Detailing Accessories Dusting Tool for Automotive Accessory Car Cleaning Brush AC Vent (Mini car Brush)'
  },

  'Manual Lint Remover': {
    title: 'Manual Lint Remover',
    price: 199,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LintRemover/LintRemover%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LintRemover/LintRemover%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LintRemover/LintRemover%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LintRemover/LintRemover%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LintRemover/LintRemover%20(5).png',

    ],
    description: 'Portable Lint Remover Reusable Clothes Fabric Shaver for Fabrics Furniture Blue | 1 Manual Lint Remover.'
  },

  'Mini LED Torch': {
    title: 'Mini LED Torch',
    price: 299,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_TORCH/LED_TORCH%20(6).png',

    ],
    description: 'LED Flashlight with COB Light Mini Splash Resistant|Portable LED XPE COB Flashlight with case|USB Rechargeable|3 Modes Pen Clip Light Flashlight|Hanging Rope|Small Size|Black.'
  },

  'Airpods Pro 2nd. gen. (Black)': {
    title: 'Airpods Pro 2nd. gen. (Black)',
    price: 1999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_BLACK/Airpods_Black%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(8).png',

    ],
    description: 'Special Edition Airpods Pro 2 With Active Noise Cancellation, Spatial Audio Wireless Headset Bluetooth Headset (Black, True Wireless)'
  },

  'Airpods Pro 2nd. gen. (White)': {
    title: 'Airpods Pro 2nd. gen. (White)',
    price: 1699,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_WHITE/Airpods_White%20(8).png',

    ],
    description: 'Airpods Pro 2 With Active Noise Cancellation, Spatial Audio Wireless Headset Bluetooth Headset (White, True Wireless)'
  },

  'Airpods Pro 2nd. gen with Display': {
    title: 'Airpods Pro 2nd. gen with Display',
    price: 1699,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/DISPLAY_AIRPODS/Display_Airpods%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/DISPLAY_AIRPODS/Display_Airpods%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/DISPLAY_AIRPODS/Display_Airpods%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/DISPLAY_AIRPODS/Display_Airpods%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/DISPLAY_AIRPODS/Display_Airpods%20(5).png',

    ],
    description: 'Special Airpods Pro 2 with Display, Active Noise Cancellation; Environmental Noise Cancellation, Wall paper, Media Controls, Camera Controller, Spatial Audio Wireless Headset Bluetooth Headset (White, True Wireless)'
  },

  'Boat Airdopes Atom 151': {
    title: 'Boat Airdopes Atom 151',
    price: 1399,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/BOAT_AIRDOPES/Boat_Airdopes%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/BOAT_AIRDOPES/Boat_Airdopes%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/BOAT_AIRDOPES/Boat_Airdopes%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/BOAT_AIRDOPES/Boat_Airdopes%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/BOAT_AIRDOPES/Boat_Airdopes%20(5).png',

    ],
    description: 'Boat Airdopes Atom 151 Bluetooth True Wireless (TWS) in Ear 30 Hours Playback|Low Latency|Voice Assistant|Powerfull bass|IPX4 (Splash & Sweat Proof).'
  },

  'Airpods Pro 2nd. gen.': {
    title: 'Airpods Pro 2nd. gen.',
    price: 499,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_500/Airpods_500%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_500/Airpods_500%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_500/Airpods_500%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/AIRPODS_500/Airpods_500%20(4).png',

    ],
    description: 'Airpods Pro 2 With Active Noise Cancellation, Spatial Audio Wireless Headset Bluetooth Headset (White, True Wireless).'
  },

  'Ultrapods TWS Earbud.': {
    title: 'Ultrapods TWS Earbud.',
    price: 399,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(8).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/ULTRAPODS_PRO/Ultrapods%20Pro%20(9).png',

    ],
    description: 'Ultrapods TWS Earbud Transparent Design, 30 Hrs Playtime with Fast 30 Hrs Playtime with Fast Charging Bluetooth 5.313mm HD BASS Drivers (multicolor).'
  },

  'realme Buds 2 Wired Earphone.': {
    title: 'realme Buds 2 Wired Earphone.',
    price: 249,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_Earphone/MI_EARPHONE%20(7).png',

    ],
    description: 'realme Buds 2 Wired Earphone (Black, In the Ear).'
  },

  'LED Touch Lamp Portable Bluetooth Speaker.': {
    title: 'LED Touch Lamp Portable Bluetooth Speaker.',
    price: 499,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/LED_Speaker/LED_Speaker%20(6).png',

    ],
    description: 'LED Touch Lamp Portable Bluetooth Speaker Lamps with Microphone | LED Touch Bedside Table Lamp | Wireless HiFi Speaker Light, USB Rechargeable SD Card Reader, and Multi-Device Compatibility.'
  },

  'Samsung 25W Type C Charger.': {
    title: 'Samsung 25W Type C Charger.',
    price: 599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Samsung_Charger/Samsung_Adapter%20(7).png',

    ],
    description: 'Samsung 25W Type C Charger for Galaxy A16/M05/A05/A35/M35/F05/M15, F15/A15/A14/M14/F14/A34/M34/F34/S24 Ultra, S23/S23 fe/Z fold/flip/6/5/4/3, Fast Charge for Tab USB C Adapter, White.'
  },

  'MI Type-c Charging Cable1': {
    title: 'MI Type-c Charging Cable',
    price: 199,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_TYPE-C/pixelcut-export%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_TYPE-C/MI_Type-c%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_TYPE-C/MI_Type-c%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_TYPE-C/MI_Type-c%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_TYPE-C/MI_Type-c%20(5).png',

    ],
    description: 'Charging Cable Type-A to USB Type-c 120cm fast Charging cable|Up to 3.0 Amps Fast Charge|480mbps support|Suitable for all Smartphones,tablet and accessories with USB Type-c input.'
  },

  'MI Type-A to Micro USB Cable': {
    title: 'MI Type-A to Micro USB Cable',
    price: 179,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_MICRO_USB_CABLE/MI_Micro%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_MICRO_USB_CABLE/MI_Micro%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_MICRO_USB_CABLE/MI_Micro%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_MICRO_USB_CABLE/MI_Micro%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MI_MICRO_USB_CABLE/MI_Micro%20(5).png',

    ],
    description: 'Charging Cable Type-A to Micro USB 120cm fast Charging cable|480mbps support|Suitable for all Smartphones,tablet and accessories with micro USB input.'
  },

  'MINI USB Night Lamp': {
    title: 'MINI USB Night Lamp',
    price: 39,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/MINI_USB_N.L./MINI_USB_N.L.%20(7).png',

    ],
    description: 'MINI USB Night Lamp(Cool).'
  },

  'HTC Trimmer': {
    title: 'HTC Trimmer',
    price: 599,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HTC_Trimmer/HTC_Trimmer%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HTC_Trimmer/HTC_Trimmer%20(2).png',

    ],
    description: 'H T C trimmer HTC Rechargeable Hair Trimmer AT - 527 Runtime: 45 min Trimmer for Men & Women (Black, Steel, Silver).'
  },

  'Mini Space Electric Room Heater': {
    title: 'Mini Space Electric Room Heater',
    price: 799,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/PORTABLE_HEATER_HANDEL/PORTABLE_HEATER_HANDEL%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/PORTABLE_HEATER_HANDEL/PORTABLE_HEATER_HANDEL%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/PORTABLE_HEATER_HANDEL/PORTABLE_HEATER_HANDEL%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/PORTABLE_HEATER_HANDEL/PORTABLE_HEATER_HANDEL%20(4).png',

    ],
    description: 'Mini Space Electric Room Heater Portable, Ceramic Air Conditioner Fan Heater Small Heater Hot Air Heater for Auto Home Office Desktop with Adjustable Thermostat, Overheat Protection (Black).'
  },

  'Vega Insta Glam Foldable 1000 Watts Hair Dryer': {
    title: 'Vega Insta Glam Foldable 1000 Watts Hair Dryer',
    price: 799,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Vega_Hair_Dryer/Vega_HairDryer%20(7).png',

    ],
    description: 'Vega Insta Glam Foldable 1000 Watts Hair Dryer with 2 Heat & Speed Settings, Detachable Nozzle, Overheat Cut-out, Quick Dry with 1000W, Hair Dryer for Women, VHDH-20, (Made in India), Pink & White.'
  },

  'Ultrapods Max': {
    title: 'Ultrapods Max',
    price: 349,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(5).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(6).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(7).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Ultrapods_Max/Ultrapods_Max%20(8).png',

    ],
    description: 'Ultrapods Ear Buds with Transparent Charging Case,Mic 240 Bluetooth Headset Processor  (Multicolor).'
  },

  'Cromptom Nigella Mixer Grinder 500 watt': {
    title: 'Cromptom Nigella Mixer Grinder 500 watt',
    price: 2999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Cromptom_Nigella/Cromptom_Nigella%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Cromptom_Nigella/Cromptom_Nigella%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Cromptom_Nigella/Cromptom_Nigella%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Cromptom_Nigella/Cromptom_Nigella%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/Cromptom_Nigella/Cromptom_Nigella%20(5).png',

    ],
    description: 'Crompton LIFE ESSENTIAL 5 YEAR WARRANTY 500 W Mixer Grinder  (NIGELLA | 3 Jars | Purple, White).'
  },

  'SURYA HERITAGE 1000 W Dry Iron  (Grey)': {
    title: 'SURYA HERITAGE 1000 W Dry Iron  (Grey)',
    price: 899,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/SURYA_IRON/SURYA_IRON%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/SURYA_IRON/SURYA_IRON%20(2).png',

    ],
    description: 'SURYA HERITAGE 1000 W Dry Iron  (Grey)'
  },

  'Havells aquilla 1000 W Dry Iron  (Orange)': {
    title: 'Havells aquilla 1000 W Dry Iron  (Orange)',
    price: 999,
    images: 
      [
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HAVELLS_AQUILLA_IRON/HEAVELLS_AQUILLA%20(1).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HAVELLS_AQUILLA_IRON/HEAVELLS_AQUILLA%20(2).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HAVELLS_AQUILLA_IRON/HEAVELLS_AQUILLA%20(3).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HAVELLS_AQUILLA_IRON/HEAVELLS_AQUILLA%20(4).png',
      'https://raw.githubusercontent.com/wamiq271801/FUSION-GADGETS/refs/heads/main/images/HAVELLS_AQUILLA_IRON/HEAVELLS_AQUILLA%20(5).png',

    ],
    description: 'Havells aquilla 1000 W Dry Iron  (Orange)'
  },

};
/************************************
  INITIALIZATION
************************************/

loadCartFromLocalStorage(); // Load cart data from local storage
generateProductCards(); // Generate product cards
updateCart(); // Update cart display

/************************************
  FUNCTION DEFINITIONS
************************************/

/**
 * Generates product cards dynamically based on the products object.
 */
function generateProductCards() {
  productsContainer.innerHTML = ''; // Clear container before adding products
  for (const productId in products) {
    const product = products[productId];

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <div class="product-image-container">
        <button class="prev-button" data-product="${productId}">&lt;</button>
        <img src="${product.images[0]}"
             alt="${product.title}"
             class="product-image"
             data-product="${productId}"
             data-index="0">
        <button class="next-button" data-product="${productId}">&gt;</button>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">₹${product.price.toFixed(2)}</p>
        <div class="product-buttons">
          <button class="button buy-now-button" data-product="${productId}" tabindex="0" aria-label="Buy Now">Buy Now</button>
          <button class="button add-to-cart-button" data-product="${productId}" tabindex="0" aria-label="Add to Cart">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(productCard);
  }
}

/**
 * Updates the cart display, total amount, and cart count badge.
 */
function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = '';
  let totalAmount = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartCount.style.display = 'none';
    saveCartToLocalStorage(); // Save empty cart to local storage
    return;
  }

  cart.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('cart-item');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${product.title}</h4>
        <p class="cart-item-price">₹${product.price.toFixed(2)}</p>
        <div class="cart-item-quantity-container">
          <label for="quantity-${product.title}">Quantity:</label>
          <input type="number" id="quantity-${product.title}" class="cart-item-quantity" value="${product.quantity}" min="1" max="50" data-product="${product.title}">
        </div>
      </div>
      <button class="remove-button" data-title="${product.title}">Remove</button>
    `;
    cartItemsContainer.appendChild(productElement);
    totalAmount += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  document.getElementById('cartTotalAmount').textContent = `₹${totalAmount.toFixed(2)}`;
  cartCount.textContent = totalQuantity;
  cartCount.style.display = 'inline-block';

  saveCartToLocalStorage(); // Save cart to local storage
}

/**
 * Saves the current cart to local storage.
 */
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Loads the cart from local storage.
 */
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

/**
 * Shows a notification with the given message.
 * @param {string} message - The message to display.
 */
function showNotification(message) {
  notificationMessage.textContent = message;
  notificationModal.style.display = 'block';
  document.body.classList.add('no-scroll'); // Prevent background interaction
}

/**
 * Toggles the visibility of the cart drawer and disables background scrolling.
 * @param {boolean} open - True to open, false to close.
 */
function toggleCartDrawer(open) {
  cartDrawer.classList.toggle('open', open);
  document.body.classList.toggle('no-scroll', open);
}

/**
 * Opens the image popup modal with the current image and disables background scrolling.
 */
function openImagePopup() {
  popupImage.src = currentProductImages[currentImageIndex];
  imagePopupModal.classList.add('open');
  document.body.classList.add('no-scroll');
}

/**
 * Closes the image popup modal and re-enables background scrolling.
 */
function closeImagePopup() {
  imagePopupModal.classList.remove('open');
  document.body.classList.remove('no-scroll');
}

/**
 * Handles adding a product to the cart.
 * @param {string} productId - The ID of the product to add.
 */
function addToCart(productId) {
  const productData = products[productId];
  const existingProduct = cart.find((item) => item.title === productData.title);
  if (existingProduct) {
    if (existingProduct.quantity < 50) {
      existingProduct.quantity++;
    } else {
      showNotification('Maximum quantity reached for this item (50).');
      return;
    }
  } else {
    cart.push({
      title: productData.title,
      price: productData.price,
      image: productData.images[0],
      quantity: 1,
    });
  }
  updateCart();
}

/**
 * Handles removing a product from the cart.
 * @param {string} title - The title of the product to remove.
 */
function removeFromCart(title) {
  cart = cart.filter((product) => product.title !== title);
  updateCart();
}

/**
 * Handles updating the quantity of a product in the cart.
 * @param {Event} event - The event triggered by changing the quantity input.
 */
function updateQuantity(event) {
  const productTitle = event.target.getAttribute('data-product');
  let newQuantity = parseInt(event.target.value, 10);
  if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;
  if (newQuantity > 50) {
    newQuantity = 50;
    showNotification('Maximum quantity for this item is 50.');

  }
  const productInCart = cart.find((product) => product.title === productTitle);
  if (productInCart) {
    productInCart.quantity = newQuantity;
    updateCart();
  }
}

/**
 * Handles the 'Buy Now' functionality, redirecting to WhatsApp with a pre-filled message.
 * @param {string} productId - The ID of the product to buy.
 */
function placeOrderWhatsApp(productId) {
  const productData = products[productId];
  if (!productData) {
    showNotification('Product not found!');
    return;
  }
  const message = `Hello, I want to buy:\n\n${productData.title}\nPrice: ₹${productData.price.toFixed(2)}\n\nPlease provide further details.`;
  const whatsappNumber = '918858763010';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Handles the checkout process for all items in the cart via WhatsApp.
 */
function checkoutCart() {
  if (cart.length === 0) {
    showNotification('Your cart is empty.');
    return;
  }
  let orderSummary = 'Order Summary:\n\n';
  cart.forEach((product) => {
    orderSummary += `${product.title} - ${product.quantity} x ₹${product.price.toFixed(2)}\n`;
  });
  orderSummary += `\nTotal: ₹${document.getElementById('cartTotalAmount').textContent.trim()}`;
  const whatsappNumber = '918858763010';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderSummary)}`;
  window.open(whatsappUrl, '_blank');
}

/**
 * Handles image slider navigation within the product cards.
 * @param {HTMLElement} button - The button clicked ('prev-button' or 'next-button').
 */
function handleImageSlider(button) {
  const productCard = button.closest('.product-card');
  const imageElement = productCard.querySelector('.product-image');
  const productId = button.getAttribute('data-product');
  const product = products[productId];
  let currentIndex = parseInt(imageElement.getAttribute('data-index'), 10);
  currentIndex = button.classList.contains('prev-button')
    ? (currentIndex - 1 + product.images.length) % product.images.length
    : (currentIndex + 1) % product.images.length;
  imageElement.src = product.images[currentIndex];
  imageElement.setAttribute('data-index', currentIndex);
}

/************************************
  EVENT LISTENERS
************************************/

// Event delegation for buttons and images
document.addEventListener('click', (event) => {
  const target = event.target;

  // Handle 'Add to Cart' button
  if (target.classList.contains('add-to-cart-button')) {
    const productId = target.getAttribute('data-product');
    addToCart(productId);
    return;
  }

  // Handle 'Buy Now' button
  if (target.classList.contains('buy-now-button')) {
    const productId = target.getAttribute('data-product');
    placeOrderWhatsApp(productId);
    return;
  }

  // Handle product image click for popup
  if (target.classList.contains('product-image')) {
    const productId = target.getAttribute('data-product');
    const product = products[productId];
    currentProductImages = product.images;
    currentImageIndex = parseInt(target.getAttribute('data-index'), 10);
    openImagePopup();
    return;
  }

  // Handle image slider buttons
  if (target.classList.contains('prev-button') || target.classList.contains('next-button')) {
    handleImageSlider(target);
    return;
  }

  // Handle 'Remove' button in cart
  if (target.classList.contains('remove-button')) {
    const title = target.getAttribute('data-title');
    removeFromCart(title);
    return;
  }

  // Close notification modal when clicking outside content
  if (target === notificationModal) {
    notificationModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  // Close image popup when clicking outside content
  if (target === imagePopupModal) {
    closeImagePopup();
  }
});

// Event listener for updating quantity in cart
document.addEventListener('input', (event) => {
  if (event.target.classList.contains('cart-item-quantity')) {
    updateQuantity(event);
  }
});

// Event listeners for cart drawer
cartButton.addEventListener('click', () => toggleCartDrawer(true));
closeButton.addEventListener('click', () => toggleCartDrawer(false));

// Event listener for checkout button
checkoutButton.addEventListener('click', checkoutCart);

// Event listeners for notification modal
closeNotification.addEventListener('click', () => {
  notificationModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
});
notificationButton.addEventListener('click', () => {
  notificationModal.style.display = 'none';
  document.body.classList.remove('no-scroll');
});

// Event listeners for image popup modal
popupPrevButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
  popupImage.src = currentProductImages[currentImageIndex];
});

popupNextButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % currentProductImages.length;
  popupImage.src = currentProductImages[currentImageIndex];
});

closePopup.addEventListener('click', closeImagePopup);

popupImage.addEventListener('click', (event) => {
  event.stopPropagation();
});

imagePopupModal.addEventListener('click', closeImagePopup);

/************************************
  TOUCH GESTURES FOR POPUP
************************************/

// Add touch gestures for mobile devices
let touchStartX = 0;
let touchEndX = 0;

popupImage.addEventListener('touchstart', handleTouchStart, false);
popupImage.addEventListener('touchmove', handleTouchMove, false);
popupImage.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function handleTouchMove(event) {
  touchEndX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
  if (touchEndX < touchStartX - 50) {
    // Swipe left
    currentImageIndex = (currentImageIndex + 1) % currentProductImages.length;
    popupImage.src = currentProductImages[currentImageIndex];
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right
    currentImageIndex = (currentImageIndex - 1 + currentProductImages.length) % currentProductImages.length;
    popupImage.src = currentProductImages[currentImageIndex];
  }
}

window.addEventListener("popstate", function () {
  if (cartDrawer.classList.contains("open")) {
    toggleCartDrawer(false);
    history.pushState(null, "", location.href); // Prevents going back further
  } else if (imagePopupModal.classList.contains("open")) {
    closeImagePopup();
    history.pushState(null, "", location.href);
  }
});

// Push a new state into history when opening the cart or popup
function enhanceNavigation() {
  if (cartDrawer.classList.contains("open") || imagePopupModal.classList.contains("open")) {
    history.pushState(null, "", location.href);
  }
}

// Modify functions to push state when opening modals
cartButton.addEventListener("click", () => {
  toggleCartDrawer(true);
  enhanceNavigation();
});

popupImage.addEventListener("click", () => {
  openImagePopup();
  enhanceNavigation();
});

// Function to track modal state in history
function updateHistory() {
  history.pushState({ modalOpen: true }, "", location.href);
}

// Handle back button behavior
window.addEventListener("popstate", function (event) {
  if (cartDrawer.classList.contains("open")) {
    toggleCartDrawer(false);
    history.pushState(null, "", location.href); // Prevent further back navigation
  } else if (imagePopupModal.classList.contains("open")) {
    closeImagePopup();
    history.pushState(null, "", location.href);
  }
});

// Modify existing functions to push state when opening modals
cartButton.addEventListener("click", () => {
  toggleCartDrawer(true);
  updateHistory();
});

popupImage.addEventListener("click", () => {
  openImagePopup();
  updateHistory();
});

// Ensure back button works normally after closing modals
document.addEventListener("click", (event) => {
  if (event.target === cartDrawer) {
    toggleCartDrawer(false);
    history.pushState(null, "", location.href);
  } else if (event.target === imagePopupModal) {
    closeImagePopup();
    history.pushState(null, "", location.href);
  }
});

/* Search Functionality */
const searchInput = document.querySelector('.search-input');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Minimize navbar on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Adjust the scroll threshold as needed
    header.classList.add('minimized');
  } else {
    header.classList.remove('minimized');
  }
});

