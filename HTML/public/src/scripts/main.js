// ═══════════════════════════════════════════════════════════════
// MAIN — Entry point: window.ww + Aliases + Init
// ═══════════════════════════════════════════════════════════════

// ═══ 1. window.ww — Expose handlers cho inline onclick ═══
window.ww = Object.assign(window.ww || {}, {
  // Auth
  switchAuthTab: switchAuthTab,
  handleAuthSubmit: handleAuthSubmit,
  handleGoogleLogin: handleGoogleLogin,
  handleGuestLogin: handleGuestLogin,
  handleLogout: handleLogout,
  openFirebaseConfigModal: openFirebaseConfigModal,
  closeFirebaseConfigModal: closeFirebaseConfigModal,
  saveCustomFirebaseConfig: saveCustomFirebaseConfig,
  resetFirebaseConfig: resetFirebaseConfig,

  // UI
  switchTab: switchTab,
  toggleSidebar: toggleSidebar,
  toggleTheme: toggleTheme,
  toggleSound: toggleSound,
  setPriorityFilter: setPriorityFilter,
  cyclePriority: cyclePriority,
  clearSearch: clearSearch,
  hideAIToast: hideAIToast,

  // Features
  createNewBigGoal: createNewBigGoal,
  toggleSubtask: toggleSubtask,
  deleteGoal: deleteGoal,
  updateActualHours: updateActualHours,
  toggleTimer: toggleTimer,
  resetTimer: resetTimer,

  // Subtasks
  addCustomSubtask: addCustomSubtask,
  deleteSubtask: deleteSubtask,
  editSubtask: editSubtaskInput,

  // Review / Data
  saveWeeklyReview: saveWeeklyReview,
  exportReviewReport: exportReviewReport,
  exportAllData: exportAllData,
  importAllData: importAllData,

  // Stats
  renderStatsDashboard: renderStatsDashboard,

  // Week picker
  setCurrentWeek: function() {
    state.currentWeekKey = getCurrentWeekCode();
    state.selectedProgressWeek = state.currentWeekKey;
    var wp = document.getElementById('weekPicker');
    if (wp) wp.value = state.currentWeekKey;
    if (typeof updateWeekDisplay === 'function') updateWeekDisplay();
    renderAll();
  },
  selectWeekFromProgress: function(w) {
    if (!w) return;
    state.selectedProgressWeek = w;
    var t = getTodayDayKey();
    state.selectedWeekDay = w === state.currentWeekKey ? t : 'Mon';
    renderWeeklyProgressBoard();
  },
  selectWeekDay: function(d) {
    if (!d) return;
    state.selectedWeekDay = d;
    renderWeeklyProgressBoard();
  },

  // AI
  getAIRecommendations: function() { getAIRecommendations(); },
  enableTaskNotifications: enableTaskNotifications
});

// ═══ 2. Alias trực tiếp ra window (cho onclick="xxx()" không cần ww.) ═══
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.handleGoogleLogin = handleGoogleLogin;
window.handleGuestLogin = handleGuestLogin;
window.handleLogout = handleLogout;
window.openFirebaseConfigModal = openFirebaseConfigModal;
window.closeFirebaseConfigModal = closeFirebaseConfigModal;
window.saveCustomFirebaseConfig = saveCustomFirebaseConfig;
window.resetFirebaseConfig = resetFirebaseConfig;

window.switchTab = switchTab;
window.toggleSidebar = toggleSidebar;
window.toggleTheme = toggleTheme;
window.toggleSound = toggleSound;
window.setPriorityFilter = setPriorityFilter;
window.cyclePriority = cyclePriority;
window.clearSearch = clearSearch;

window.createNewBigGoal = createNewBigGoal;
window.toggleSubtask = toggleSubtask;
window.deleteGoal = deleteGoal;
window.updateActualHours = updateActualHours;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;
window.hideAIToast = hideAIToast;

window.enableTaskNotifications = enableTaskNotifications;
window.saveWeeklyReview = saveWeeklyReview;
window.exportReviewReport = exportReviewReport;
window.exportAllData = exportAllData;
window.importAllData = importAllData;

console.log('✅ Đã alias handlers ra window');

// ═══ 3. Init UI ngay ═══
initUI();
renderTimerDisplay();

// ═══ 4. Safety net: tự tắt overlay sau 8s ═══
setTimeout(function() {
  var overlay = document.getElementById('loadingOverlay');
  if (overlay && !overlay.classList.contains('hidden')) {
    console.warn('⚠️ Firebase chậm phản hồi, tự tắt overlay để vào app.');
    overlay.classList.add('hidden');
    var auth = document.getElementById('authScreen');
    if (auth) auth.classList.remove('hidden');
  }
}, 8000);

// ═══ 5. Restore proactive reminders khi load ═══
window.addEventListener('load', function() {
  setTimeout(function() {
    if (localStorage.getItem('weeklyWorkspace_aiNotifications') === 'on'
        && 'Notification' in window
        && Notification.permission === 'granted') {
      var status = document.getElementById('notificationStatus');
      if (status) {
        status.innerText = 'Đang hoạt động';
        status.className = 'text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300';
      }
      sendAIProactiveReminder(true);
      if (window.__aiReminderTimer) clearInterval(window.__aiReminderTimer);
      window.__aiReminderTimer = setInterval(function() {
        sendAIProactiveReminder(false);
      }, 5 * 60 * 1000);
      var s = document.getElementById('aiReminderSummary');
      if (s) s.innerText = 'Đang hoạt động';
    }
  }, 1500);
});

// ═══ 6. Safety net — Runtime errors ═══
window.addEventListener('unhandledrejection', function(event) {
  console.warn('Unhandled async error:', event.reason);
});
window.addEventListener('error', function(event) {
  console.warn('Runtime warning:', event.error || event.message);
});

console.log('✅ Weekly Workspace loaded — Modular mode');