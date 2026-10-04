// ═══════════════════════════════════════════════════════════════
// STATE — Trạng thái toàn cục của app
// ═══════════════════════════════════════════════════════════════

var firebase = {
  app: null,
  auth: null,
  db: null,
  aiModel: null,
  user: null,
  unsub: null,
  ready: false,
  aiReady: false
};

var state = {
  currentWeekKey: getCurrentWeekCode(),
  selectedWeekDay: getTodayDayKey(),
  selectedProgressWeek: getCurrentWeekCode(),
  priorityFilter: 'all',
  searchQuery: '',
  goals: [],
  reviews: {}
};

var timer = {
  interval: null,
  seconds: 25 * 60,
  running: false
};

var lastAICallAt = 0;
var AI_COOLDOWN_MS = 60 * 1000;
var firestoreSdk = {};

// ⚠️ FIX: soundEnabled phải nằm trên window để các file khác thấy được
window.soundEnabled = localStorage.getItem('ws_sound_enabled') !== 'false';

var chartInstances = { weekly: null, priority: null, byDay: null };
var searchDebounceTimer = null;
var taskToastTimer = null;
var aiToastTimer = null;
var aiToastLastShown = 0;

console.log('🚀 Weekly Workspace - Production mode');
console.log('📅 Tuần hiện tại:', state.currentWeekKey);
console.log('✅ state.js loaded');