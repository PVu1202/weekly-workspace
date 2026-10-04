// ═══════════════════════════════════════════════════════════════
// CONFIG — Firebase + Gemini API
// ═══════════════════════════════════════════════════════════════

var DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbpVMGNtsHKXgq4Toz2HqNW4Brw604Cyw",
  authDomain: "weekly-workspace-3c716.firebaseapp.com",
  projectId: "weekly-workspace-3c716",
  storageBucket: "weekly-workspace-3c716.firebasestorage.app",
  messagingSenderId: "121347494294",
  appId: "1:121347494294:web:b43af6788a04c39a5f4db7",
  measurementId: "G-0PN8G4R5W7"
};

var firebaseConfig = (function() {
  try {
    var saved = localStorage.getItem('gemini_custom_firebase_config');
    return saved ? JSON.parse(saved) : DEFAULT_FIREBASE_CONFIG;
  } catch(e) {
    return DEFAULT_FIREBASE_CONFIG;
  }
})();

var appId = 'gemini-weekly-planner';

// Gemini API key (dùng cho AI Coach)
var GEMINI_API_KEY = 'AQ.Ab8RN6JOFN-K7oCEXzk8xJW60VxcJ6dw33Hr9UPREyrANQHjzQ';

console.log('✅ config.js loaded');