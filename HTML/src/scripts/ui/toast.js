// ═══════════════════════════════════════════════════════════════
// TOASTS — Task toast + AI toast
// ═══════════════════════════════════════════════════════════════

var taskToastTimer = null;

function showTaskToast(title, message) {
  var t = document.getElementById('taskToast');
  var tEl = document.getElementById('taskToastTitle');
  var mEl = document.getElementById('taskToastMessage');
  if (!t || !tEl || !mEl) return;
  tEl.innerText = title;
  mEl.innerText = message;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(taskToastTimer);
  taskToastTimer = setTimeout(function() {
    t.classList.remove('show');
  }, 3000);
}

var aiToastTimer = null;
var aiToastLastShown = 0;

function hideAIToast() {
  var t = document.getElementById('aiToast');
  if (t) t.classList.remove('show');
  clearTimeout(aiToastTimer);
}

function showAIToast(title, message, options) {
  options = options || {};
  var t = document.getElementById('aiToast');
  var tEl = document.getElementById('aiToastTitle');
  var mEl = document.getElementById('aiToastMessage');
  if (!t || !tEl || !mEl) return;
  var now = Date.now();
  if (options.silent && now - aiToastLastShown < 15000) return;
  aiToastLastShown = now;
  tEl.innerText = title;
  mEl.innerText = message;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(aiToastTimer);
  aiToastTimer = setTimeout(function() {
    t.classList.remove('show');
  }, options.duration || 7000);
}

console.log('✅ ui/toast.js loaded');