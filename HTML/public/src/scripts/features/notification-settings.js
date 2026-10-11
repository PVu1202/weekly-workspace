// ═══════════════════════════════════════════════════════════════
// NOTIFICATION SETTINGS — Tùy chỉnh thông báo
// ═══════════════════════════════════════════════════════════════

var DEFAULT_NOTIF_SETTINGS = {
  beforeDeadline: 30,      // phút
  overdue: true,
  dailyEnabled: true,
  dailyTime: '20:00',
  sound: true,
  frequency: 30            // phút — tần suất AI nhắc
};

// ═══ LOAD SETTINGS ═══
function loadNotificationSettings() {
  try {
    var saved = localStorage.getItem('ws_notif_settings');
    if (saved) {
      var parsed = JSON.parse(saved);
      return Object.assign({}, DEFAULT_NOTIF_SETTINGS, parsed);
    }
  } catch(e) {}
  return Object.assign({}, DEFAULT_NOTIF_SETTINGS);
}

// ═══ SAVE SETTINGS ═══
function saveNotificationSettings() {
  var settings = {
    beforeDeadline: parseInt(document.getElementById('notifBeforeDeadline').value, 10),
    overdue: document.getElementById('notifOverdue').checked,
    dailyEnabled: document.getElementById('notifDailyEnabled').checked,
    dailyTime: document.getElementById('notifDailyTime').value,
    sound: document.getElementById('notifSound').checked,
    frequency: parseInt(document.getElementById('notifFrequency').value, 10)
  };
  
  localStorage.setItem('ws_notif_settings', JSON.stringify(settings));
  
  // Sync Firestore
  if (!state.preferences) state.preferences = {};
  state.preferences.notifications = settings;
  if (typeof saveStateToFirestore === 'function') saveStateToFirestore();
  
  console.log('📢 Đã lưu cài đặt thông báo:', settings);
}

// ═══ APPLY SETTINGS VÀO UI ═══
function applyNotificationSettingsUI() {
  var settings = loadNotificationSettings();
  
  var el;
  el = document.getElementById('notifBeforeDeadline');
  if (el) el.value = String(settings.beforeDeadline);
  
  el = document.getElementById('notifOverdue');
  if (el) el.checked = settings.overdue;
  
  el = document.getElementById('notifDailyEnabled');
  if (el) el.checked = settings.dailyEnabled;
  
  el = document.getElementById('notifDailyTime');
  if (el) el.value = settings.dailyTime;
  
  el = document.getElementById('notifSound');
  if (el) el.checked = settings.sound;
  
  el = document.getElementById('notifFrequency');
  if (el) el.value = String(settings.frequency);
}

// ═══ TEST NOTIFICATION ═══
function testNotification() {
  if (!('Notification' in window)) {
    Swal.fire({
      icon: 'error',
      title: 'Không hỗ trợ',
      text: 'Trình duyệt của bạn không hỗ trợ thông báo.',
      background: '#1a1b2e',
      color: '#fff'
    });
    return;
  }
  
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function(p) {
      if (p === 'granted') {
        showTestNotification();
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Chưa cho phép',
          text: 'Bạn cần cho phép thông báo trong cài đặt trình duyệt.',
          background: '#1a1b2e',
          color: '#fff'
        });
      }
    });
    return;
  }
  
  showTestNotification();
}

function showTestNotification() {
  try {
    var notif = new Notification('🔔 Thông báo thử nghiệm', {
      body: 'Đây là thông báo mẫu từ Weekly Workspace',
      icon: '/assets/icons/icon-192.png',
      tag: 'test-notification'
    });
    
    // Play sound nếu bật
    var settings = loadNotificationSettings();
    if (settings.sound && typeof playSound === 'function') {
      playSound('success');
    }
    
    // Auto close sau 5 giây
    setTimeout(function() { notif.close(); }, 5000);
  } catch(e) {
    console.warn('Test notification failed:', e);
    Swal.fire({
      icon: 'warning',
      title: 'Không gửi được',
      text: 'Thử bật thông báo trong cài đặt trình duyệt.',
      background: '#1a1b2e',
      color: '#fff'
    });
  }
}

// ═══ CHECK DEADLINES THEO SETTINGS MỚI ═══
function checkDeadlinesWithSettings() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  
  var settings = loadNotificationSettings();
  var now = Date.now();
  var lastCheck = Number(localStorage.getItem('ws_deadline_check_v2') || 0);
  
  // Check mỗi 5 phút
  if (now - lastCheck < 5 * 60 * 1000) return;
  localStorage.setItem('ws_deadline_check_v2', String(now));
  
  var upcoming = [];
  var overdue = [];
  
  state.goals.forEach(function(g) {
    if (!g.deadline) return;
    var subs = g.subtasks || [];
    var allDone = subs.length > 0 && subs.every(function(s) { return s.completed; });
    if (allDone) return;
    
    var deadline = new Date(g.deadline).getTime();
    var diffMinutes = (deadline - now) / (1000 * 60);
    
    // Quá hạn
    if (diffMinutes < 0 && settings.overdue) {
      overdue.push(g);
    }
    // Sắp đến hạn (trong khoảng beforeDeadline)
    else if (diffMinutes > 0 && diffMinutes <= settings.beforeDeadline) {
      upcoming.push(g);
    }
  });
  
  // Gửi thông báo
  if (overdue.length > 0) {
    sendNotificationWithSettings(
      '🚨 Task quá hạn',
      overdue.slice(0, 3).map(function(g) { return '• ' + g.title; }).join('\n')
    );
  }
  
  if (upcoming.length > 0) {
    sendNotificationWithSettings(
      '⏰ Sắp đến hạn (' + settings.beforeDeadline + ' phút)',
      upcoming.slice(0, 3).map(function(g) { return '• ' + g.title; }).join('\n')
    );
  }
}

function sendNotificationWithSettings(title, body) {
  try {
    var settings = loadNotificationSettings();
    var notif = new Notification(title, { 
      body: body,
      tag: 'task-reminder'
    });
    
    if (settings.sound && typeof playSound === 'function') {
      playSound('complete');
    }
    
    setTimeout(function() { notif.close(); }, 8000);
  } catch(e) {
    console.warn('Notification failed:', e);
  }
}

// ═══ DAILY SUMMARY REMINDER ═══
function checkDailySummary() {
  var settings = loadNotificationSettings();
  if (!settings.dailyEnabled) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  
  var now = new Date();
  var currentTime = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  
  if (currentTime !== settings.dailyTime) return;
  
  var todayKey = new Date().toISOString().slice(0, 10);
  var lastSent = localStorage.getItem('ws_daily_summary_date');
  if (lastSent === todayKey) return;
  
  localStorage.setItem('ws_daily_summary_date', todayKey);
  
  var ctx = typeof buildAIPlannerContext === 'function' ? buildAIPlannerContext() : null;
  var pending = ctx ? ctx.totalPending : 0;
  
  var body = pending > 0 
    ? 'Bạn còn ' + pending + ' việc chưa xong. Xem lại nào!'
    : '🎉 Hôm nay bạn đã hoàn thành tất cả công việc!';
  
  sendNotificationWithSettings('📊 Tổng kết ngày', body);
}

// ═══ INIT ═══
(function initNotifSettings() {
  setTimeout(function() {
    applyNotificationSettingsUI();
    
    // Check deadlines mỗi 5 phút
    setInterval(checkDeadlinesWithSettings, 5 * 60 * 1000);
    setInterval(checkDailySummary, 60 * 1000);  // Check daily mỗi phút
    
    // Lần đầu sau 10s
    setTimeout(checkDeadlinesWithSettings, 10000);
    setTimeout(checkDailySummary, 15000);
  }, 1500);
})();

// ═══ EXPOSE ═══
window.ww = window.ww || {};
window.ww.saveNotificationSettings = saveNotificationSettings;
window.ww.loadNotificationSettings = loadNotificationSettings;
window.ww.testNotification = testNotification;

console.log('✅ features/notification-settings.js loaded');