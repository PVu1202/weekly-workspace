// ═══════════════════════════════════════════════════════════════
// THEME — Toggle sáng/tối + Toggle âm thanh
// ═══════════════════════════════════════════════════════════════

function toggleTheme() {
  var body = document.body;
  var isLight = body.classList.toggle('light-mode');
  var icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
  try {
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  } catch (e) {}
  console.log('🎨 Theme:', isLight ? 'light' : 'dark');
}

function toggleSound() {
  window.soundEnabled = !window.soundEnabled;
  localStorage.setItem('ws_sound_enabled', window.soundEnabled ? 'true' : 'false');
  var icon = document.getElementById('soundIcon');
  if (icon) icon.className = window.soundEnabled ? 'fa-solid fa-volume-high text-sm' : 'fa-solid fa-volume-xmark text-sm';
  if (window.soundEnabled && typeof playSound === 'function') playSound('success');
  if (typeof showTaskToast === 'function') {
    showTaskToast(window.soundEnabled ? '🔊 Đã bật âm thanh' : '🔇 Đã tắt âm thanh', '');
  }
  console.log('🔊 Sound:', window.soundEnabled ? 'on' : 'off');
}

(function restoreSoundState() {
  var icon = document.getElementById('soundIcon');
  if (icon && !window.soundEnabled) {
    icon.className = 'fa-solid fa-volume-xmark text-sm';
  }
})();

// Restore theme khi load
(function restoreTheme() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      var icon = document.getElementById('themeIcon');
      if (icon) icon.className = 'fa-solid fa-moon';
    }
  } catch (e) {}
})();

console.log('✅ ui/theme.js loaded');