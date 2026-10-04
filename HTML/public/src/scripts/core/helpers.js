// ═══════════════════════════════════════════════════════════════
// HELPERS — Hàm tiện ích dùng chung
// ═══════════════════════════════════════════════════════════════

function getCurrentWeekCode() {
  var d = new Date();
  var date = new Date(d.valueOf());
  var dayNum = (d.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNum + 3);
  var firstThursday = date.valueOf();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  var weekNum = 1 + Math.round((firstThursday - date.valueOf()) / 604800000);
  return d.getFullYear() + '-W' + (weekNum < 10 ? '0' + weekNum : weekNum);
}

function getTodayDayKey() {
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
}

function getDayIndex(d) {
  return { Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6, Sun:7 }[d] || 1;
}

function getDayVN(d) {
  return { Mon:'T2', Tue:'T3', Wed:'T4', Thu:'T5', Fri:'T6', Sat:'T7', Sun:'CN' }[d] || d;
}

function formatWeekLabel(w) {
  var m = String(w || '').match(/(\d{4})-W(\d{1,2})/);
  return m ? 'Tuần ' + parseInt(m[2], 10) + ', ' + m[1] : w;
}

var PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

function sortByPriority(a, b) {
  var pa = PRIORITY_ORDER[a.priority || 'medium'] || 2;
  var pb = PRIORITY_ORDER[b.priority || 'medium'] || 2;
  return pa - pb;
}

function getPriorityLabel(p) {
  return { high: '🔴 Cao', medium: '🟡 Trung', low: '🟢 Thấp' }[p] || '🟡 Trung';
}

function getPriorityClass(p) {
  return { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' }[p] || 'priority-medium';
}

function getPriorityTaskClass(p) {
  return { high: 'priority-high-task', medium: 'priority-medium-task', low: 'priority-low-task' }[p] || '';
}

function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function hideOverlay() {
  var o = document.getElementById('loadingOverlay');
  if (o) o.classList.add('hidden');
}

function setSyncBadge(status) {
  var icon = document.getElementById('syncIcon');
  var text = document.getElementById('syncBadgeText');
  if (!icon || !text) return;
  if (status === 'connected') {
    icon.className = 'fa-solid fa-cloud-check text-gemini-emerald';
    text.className = 'text-emerald-400 font-medium';
    text.innerText = 'Đã đồng bộ Firestore';
  } else if (status === 'connecting') {
    icon.className = 'fa-solid fa-cloud text-amber-400 animate-pulse';
    text.className = 'text-amber-400 font-medium';
    text.innerText = 'Đang kết nối...';
  } else {
    icon.className = 'fa-solid fa-cloud-slash text-rose-400';
    text.className = 'text-rose-400 font-medium';
    text.innerText = 'Lỗi kết nối';
  }
}

function getWeekCodeFromDate(d) {
  var date = new Date(d.valueOf());
  var dayNum = (d.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayNum + 3);
  var firstThursday = date.valueOf();
  date.setMonth(0, 1);
  if (date.getDay() !== 4) date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  var weekNum = 1 + Math.round((firstThursday - date.valueOf()) / 604800000);
  return d.getFullYear() + '-W' + (weekNum < 10 ? '0' + weekNum : weekNum);
}

console.log('✅ helpers.js loaded');